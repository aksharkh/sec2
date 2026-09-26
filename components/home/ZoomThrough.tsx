"use client";

import { useProgress } from "@/lib/useProgress";
import { useLayoutEffect, useRef, useState } from "react";
import { motion, useMotionValueEvent, useTransform } from "motion/react";
import { frameworks } from "@/lib/site";

/*
  Scene — "Zoom through".
  A giant word is cut out of an ink curtain. Scrolling scales it around the centre of
  its "O" until the letter's counter swallows the screen, revealing the cobalt world
  behind it: "Comply with many."
*/
export default function ZoomThrough() {
  const ref = useRef<HTMLElement>(null);
  const oRef = useRef<SVGTextElement>(null);
  const [origin, setOrigin] = useState({ x: 250, y: 234 });

  useLayoutEffect(() => {
    const measure = () => {
      try {
        const b = oRef.current?.getExtentOfChar(0);
        if (b && b.width > 0) setOrigin({ x: b.x + b.width * 0.12, y: 330 - 270 * 0.355 });
      } catch {}
    };
    measure();
    document.fonts?.ready.then(measure);
  }, []);

  const p = useProgress(ref, ["start start", "end end"]);
  const scale = useTransform(p, [0.05, 0.6], [1, 90], { clamp: true });
  // exponential feel: slow start, rushing finish
  const eased = useTransform(scale, (s) => 1 + Math.pow((s - 1) / 89, 2.6) * 89);
  const gRef = useRef<SVGGElement>(null);
  const apply = (s: number) =>
    gRef.current?.setAttribute("transform", `translate(${origin.x} ${origin.y}) scale(${s}) translate(${-origin.x} ${-origin.y})`);
  useMotionValueEvent(eased, "change", apply);
  useLayoutEffect(() => apply(eased.get()));
  const curtain = useTransform(p, [0.32, 0.4], [1, 0]);
  const caption = useTransform(p, [0, 0.12], [1, 0]);

  const inner = useTransform(p, [0.2, 0.6], [1.3, 1]);
  const innerO = useTransform(p, [0, 0.3], [0.55, 1]);
  const chipsY = useTransform(p, [0.5, 1], ["10%", "-18%"]);

  const chips = frameworks.slice(0, 18);

  return (
    <section ref={ref} className="relative h-[300vh] bg-accent-deep" aria-label="Assess once, comply with many">
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        {/* The world behind the curtain */}
        <motion.div style={{ scale: inner, opacity: innerO }} className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_40%,#4c7dff_0%,#2448e0_45%,#0b1638_100%)]">
          <div aria-hidden className="absolute inset-0 grid-lines opacity-30" />
          <motion.ul style={{ y: chipsY }} aria-hidden className="absolute inset-0">
            {chips.map((f, i) => {
              const x = (i * 37) % 92;
              const y = (i * 53) % 88;
              return (
                <li
                  key={f.slug}
                  className="absolute rounded-full border border-white/30 bg-white/[0.08] px-4 py-2 font-mono text-xs text-white"
                  style={{ left: `${x + 3}%`, top: `${y + 5}%`, opacity: 0.45 + ((i * 7) % 5) * 0.12 }}
                >
                  {f.name}
                </li>
              );
            })}
          </motion.ul>
          <div className="relative grid h-full place-items-center px-4 text-center text-white">
            <div>
              <p className="eyebrow text-white/70">Assess once</p>
              <p className="mt-6 text-[clamp(3rem,9vw,9.5rem)] font-medium leading-[0.88] tracking-[-0.055em]">
                Comply with
                <br />
                <span className="font-serif font-normal italic">many.</span>
              </p>
              <p className="mx-auto mt-8 max-w-[44ch] text-lg text-white/75">
                One control set, one evidence library, one audit calendar — mapped to every framework on your roadmap.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Ink curtain with the word cut out */}
        <motion.svg
          style={{ opacity: curtain }}
          viewBox="0 0 1000 500"
          preserveAspectRatio="xMidYMid slice"
          className="pointer-events-none absolute inset-0 size-full"
          aria-hidden
        >
          <defs>
            <mask id="zoom-mask" maskUnits="userSpaceOnUse" x="-50000" y="-50000" width="100000" height="100000">
              <rect x="-50000" y="-50000" width="100000" height="100000" fill="white" />
              <g ref={gRef}>
                <text
                  ref={oRef}
                  x="500"
                  y="330"
                  textAnchor="middle"
                  fill="black"
                  style={{ font: "700 270px var(--font-geist-sans)", letterSpacing: "-0.05em" }}
                >
                  ONCE
                </text>
              </g>
            </mask>
          </defs>
          <rect x="-50000" y="-50000" width="100000" height="100000" fill="#08090b" mask="url(#zoom-mask)" />
        </motion.svg>

        <motion.p style={{ opacity: caption }} className="eyebrow absolute inset-x-0 bottom-10 text-center text-bone/45">
          Keep scrolling — step inside
        </motion.p>
      </div>
    </section>
  );
}
