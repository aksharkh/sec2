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
  uniform float uDive;
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
    float size = uSize * (0.35 + aRand * 0.9) * mix(1.4, 1.0, p) * (1.0 + uDive * 0.8);
    gl_PointSize = min(size * uPixelRatio * (1.0 / max(-mv.z, 0.05)), 48.0 * uPixelRatio);

    vRand = aRand;
    vDepth = smoothstep(-15.0, -7.0, mv.z);
    vAlpha = mix(0.35, 1.0, 1.0 - aRadius * 0.6) * mix(0.45, 1.0, p);
    vAlpha *= smoothstep(0.15, 1.6, -mv.z); // soften particles as they rush past the lens
  }
`;

const fragment = /* glsl */ `
  uniform vec3 uBone;
  uniform vec3 uAccent;
  uniform vec3 uIce;
  uniform float uFade;
  varying float vRand;
  varying float vAlpha;
  varying float vDepth;
  void main() {
    vec2 c = gl_PointCoord - 0.5;
    float d = length(c);
    if (d > 0.5) discard;
    float soft = smoothstep(0.5, 0.0, d);
    // three tiers: cool white body, cobalt strands, bright ice sparks
    vec3 col = vRand > 0.965 ? uIce : (vRand > 0.72 ? uAccent : uBone);
    float a = soft * vAlpha * mix(0.25, 1.0, vDepth) * uFade;
    a *= vRand > 0.965 ? 1.2 : (vRand > 0.72 ? 1.0 : 0.6);
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
  dive,
}: {
  count: number;
  progress: React.RefObject<{ v: number }>;
  dive: React.RefObject<number>;
}) {
  const group = useRef<THREE.Group>(null);
  const mat = useRef<THREE.ShaderMaterial>(null);
  const { gl, pointer, size } = useThree();

  const geometry = useMemo(() => buildGeometry(count), [count]);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uProgress: { value: 0 },
      uPixelRatio: { value: Math.min(gl.getPixelRatio(), 2) },
      uSize: { value: 44 },
      uFade: { value: 1 },
      uDive: { value: 0 },
      uBone: { value: new THREE.Color("#e6ecff") },
      uAccent: { value: new THREE.Color("#3b7bff") },
      uIce: { value: new THREE.Color("#c9d8ff") },
    }),
    [gl],
  );

  // Follow the live colour theme (ThemeSwitcher).
  useEffect(() => {
    const on = (e: Event) => {
      const t = (e as CustomEvent<{ accent: string; ice: string }>).detail;
      uniforms.uAccent.value.set(t.accent);
      uniforms.uIce.value.set(t.ice);
    };
    window.addEventListener("sk-theme", on);
    const css = getComputedStyle(document.documentElement);
    const a = css.getPropertyValue("--color-accent").trim();
    const i = css.getPropertyValue("--color-ice").trim();
    if (a) uniforms.uAccent.value.set(a);
    if (i) uniforms.uIce.value.set(i);
    return () => window.removeEventListener("sk-theme", on);
  }, [uniforms]);

  useFrame((state, delta) => {
    if (!mat.current || !group.current) return;
    const u = mat.current.uniforms;
    const t = state.clock.elapsedTime;
    u.uTime.value += Math.min(delta, 0.05);
    u.uProgress.value = progress.current.v;

    // Dive: scroll pulls the camera from its resting spot straight through the knot's hole.
    const d = dive.current ?? 0;
    const wide = size.width >= 1024;
    const bx = wide ? -2.9 : 0;
    const by = wide ? 0 : -0.6;
    const bz = wide ? 13.2 : 16;
    const center = sstep(0.04, 0.5, d);
    const fly = sstep(0.12, 0.92, d);
    const cam = state.camera;
    cam.position.set(lerp(bx, 0, center), lerp(by, 0, center), lerp(bz, 1.6, fly * fly * (1.2 - 0.2 * fly)));
    cam.lookAt(cam.position.x, cam.position.y, cam.position.z - 10);

    u.uDive.value = d;
    u.uFade.value = 1 - sstep(0.9, 1, d);

    const g = group.current;
    const free = 1 - sstep(0.02, 0.4, d); // pointer + idle motion fade out so the hole lines up
    const targetY = (pointer.x * 0.25 + Math.sin(t * 0.12) * 0.35) * free;
    const targetX = (-pointer.y * 0.18 + 0.35) * free;
    g.rotation.y += (targetY - g.rotation.y) * 0.06;
    g.rotation.x += (targetX - g.rotation.x) * 0.06;
    g.rotation.z = t * 0.03 + d * 2.2;
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

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const sstep = (e0: number, e1: number, x: number) => {
  const t = Math.min(1, Math.max(0, (x - e0) / (e1 - e0)));
  return t * t * (3 - 2 * t);
};

export default function KnotScene({ dive }: { dive: React.RefObject<number> }) {
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
      <Particles count={count} progress={progress} dive={dive} />
    </Canvas>
  );
}
