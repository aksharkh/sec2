"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { gsap } from "gsap";

/*
  The hero knot.
  ~60k particles live on a (2,3) torus knot tube. On load they start scattered
  (the "tangle" of disconnected frameworks) and pull tight into the knot — the brand
  story told without words. Positions are computed on the GPU from four scalars
  per particle, so the CPU does nothing per frame except update uniforms.
*/

const vertex = /* glsl */ `
  uniform float uTime;
  uniform float uProgress;
  uniform float uPixelRatio;
  uniform float uSize;
  attribute float aT;
  attribute float aAngle;
  attribute float aRadius;
  attribute float aRand;
  attribute vec3 aScatter;
  varying float vRand;
  varying float vAlpha;
  varying float vDepth;

  const float TAU = 6.28318530718;

  vec3 knot(float t) {
    float phi = t * TAU;
    float r = cos(3.0 * phi) + 2.2;
    return vec3(r * cos(2.0 * phi), r * sin(2.0 * phi), -sin(3.0 * phi) * 1.15) * 0.92;
  }

  void main() {
    float speed = 0.004 + aRand * 0.006;
    float t = fract(aT + uTime * speed);
    float e = 0.0015;
    vec3 P  = knot(t);
    vec3 Pa = knot(t + e);
    vec3 Pb = knot(t - e);
    vec3 T = normalize(Pa - Pb);
    vec3 A = Pa + Pb - 2.0 * P;
    vec3 N = normalize(A - dot(A, T) * T);
    vec3 B = cross(T, N);

    float ang = aAngle + uTime * (0.15 + aRand * 0.25);
    float tube = 0.52 * pow(aRadius, 0.6);
    vec3 tight = P + (cos(ang) * N + sin(ang) * B) * tube;

    // Loose state: drifting cloud.
    vec3 loose = aScatter;
    loose += 0.35 * vec3(
      sin(uTime * 0.35 + aScatter.y * 1.3),
      cos(uTime * 0.3 + aScatter.z * 1.1),
      sin(uTime * 0.25 + aScatter.x * 1.2)
    );

    float d = aRand * 0.45;
    float p = smoothstep(d, d + 0.55, uProgress);
    p = p * p * (3.0 - 2.0 * p);
    vec3 pos = mix(loose, tight, p);

    vec4 mv = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mv;
    float size = uSize * (0.35 + aRand * 0.9) * mix(1.4, 1.0, p);
    gl_PointSize = size * uPixelRatio * (1.0 / -mv.z);

    vRand = aRand;
    vDepth = smoothstep(-15.0, -7.0, mv.z);
    vAlpha = mix(0.35, 1.0, 1.0 - aRadius * 0.6) * mix(0.45, 1.0, p);
  }
`;

const fragment = /* glsl */ `
  uniform vec3 uBone;
  uniform vec3 uLime;
  uniform float uFade;
  varying float vRand;
  varying float vAlpha;
  varying float vDepth;
  void main() {
    vec2 c = gl_PointCoord - 0.5;
    float d = length(c);
    if (d > 0.5) discard;
    float soft = smoothstep(0.5, 0.0, d);
    vec3 col = vRand > 0.94 ? uLime : uBone;
    float a = soft * vAlpha * mix(0.25, 1.0, vDepth) * uFade;
    a *= vRand > 0.94 ? 1.0 : 0.75;
    gl_FragColor = vec4(col, a);
  }
`;

// Deterministic PRNG so geometry building stays a pure function of `count`.
function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function buildGeometry(count: number) {
  const rand = mulberry32(1337);
  const g = new THREE.BufferGeometry();
  const aT = new Float32Array(count);
  const aAngle = new Float32Array(count);
  const aRadius = new Float32Array(count);
  const aRand = new Float32Array(count);
  const aScatter = new Float32Array(count * 3);
  const pos = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    aT[i] = rand();
    aAngle[i] = rand() * Math.PI * 2;
    aRadius[i] = rand();
    aRand[i] = rand();
    // Scatter inside a wide, flattened sphere shell
    const u = rand() * 2 - 1;
    const th = rand() * Math.PI * 2;
    const r = 3.5 + rand() * 5.5;
    const s = Math.sqrt(1 - u * u);
    aScatter[i * 3] = r * s * Math.cos(th) * 1.4;
    aScatter[i * 3 + 1] = r * s * Math.sin(th) * 0.9;
    aScatter[i * 3 + 2] = r * u * 0.8;
  }
  g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
  g.setAttribute("aT", new THREE.BufferAttribute(aT, 1));
  g.setAttribute("aAngle", new THREE.BufferAttribute(aAngle, 1));
  g.setAttribute("aRadius", new THREE.BufferAttribute(aRadius, 1));
  g.setAttribute("aRand", new THREE.BufferAttribute(aRand, 1));
  g.setAttribute("aScatter", new THREE.BufferAttribute(aScatter, 3));
  g.boundingSphere = new THREE.Sphere(new THREE.Vector3(), 12);
  return g;
}

function Particles({
  count,
  progress,
  scroll,
}: {
  count: number;
  progress: React.RefObject<{ v: number }>;
  scroll: React.RefObject<number>;
}) {
  const group = useRef<THREE.Group>(null);
  const mat = useRef<THREE.ShaderMaterial>(null);
  const { gl, pointer } = useThree();

  const geometry = useMemo(() => buildGeometry(count), [count]);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uProgress: { value: 0 },
      uPixelRatio: { value: Math.min(gl.getPixelRatio(), 2) },
      uSize: { value: 44 },
      uFade: { value: 1 },
      uBone: { value: new THREE.Color("#f1efe8") },
      uLime: { value: new THREE.Color("#d6ff3d") },
    }),
    [gl],
  );

  useFrame((state, delta) => {
    if (!mat.current || !group.current) return;
    const u = mat.current.uniforms;
    u.uTime.value += Math.min(delta, 0.05);
    u.uProgress.value = progress.current.v;
    const s = scroll.current ?? 0;
    u.uFade.value = 1 - s * 0.7;
    const g = group.current;
    const targetY = pointer.x * 0.25 + state.clock.elapsedTime * 0.05;
    const targetX = -pointer.y * 0.18 + 0.35 + s * 0.9;
    g.rotation.y += (targetY - g.rotation.y) * 0.04;
    g.rotation.x += (targetX - g.rotation.x) * 0.04;
    g.rotation.z = state.clock.elapsedTime * 0.03;
    const sc = 1 + s * 0.35;
    g.scale.setScalar(sc);
    g.position.y = s * 1.2;
  });

  return (
    <group ref={group}>
      <points geometry={geometry} frustumCulled={false}>
        <shaderMaterial
          ref={mat}
          vertexShader={vertex}
          fragmentShader={fragment}
          uniforms={uniforms}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
}

function Rig() {
  const { camera, size } = useThree();
  useEffect(() => {
    // Push the knot right on wide screens so it sits beside the headline.
    const wide = size.width >= 1024;
    camera.position.set(wide ? -2.9 : 0, wide ? 0 : -0.6, wide ? 13.2 : 16);
    camera.lookAt(wide ? -2.9 : 0, wide ? 0 : -0.6, 0);
  }, [camera, size.width]);
  return null;
}

export default function KnotScene({ scroll }: { scroll: React.RefObject<number> }) {
  const progress = useRef({ v: 0 });
  const count = useMemo(() => {
    if (typeof window === "undefined") return 40000;
    const small = window.innerWidth < 768;
    return small ? 26000 : 64000;
  }, []);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      progress.current.v = 1;
      return;
    }
    const tw = gsap.to(progress.current, { v: 1, duration: 3.6, ease: "power3.inOut", delay: 0.35 });
    return () => {
      tw.kill();
    };
  }, []);

  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ fov: 35, near: 0.1, far: 60, position: [0, 0, 13] }}
      gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
      style={{ position: "absolute", inset: 0 }}
    >
      <Rig />
      <Particles count={count} progress={progress} scroll={scroll} />
    </Canvas>
  );
}
