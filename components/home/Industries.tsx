"use client";

import Link from "next/link";
import { useLayoutEffect, useRef, useState } from "react";
import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { Eyebrow } from "@/components/ui/Reveal";
import { Arrow } from "@/components/ui/Button";
import { industries } from "@/lib/site";

function Pattern({ seed }: { seed: number }) {
  // Each industry gets its own line-art signature, generated from the index.
  const n = 22;
  return (
    <svg viewBox="0 0 400 400" className="absolute -right-16 -top-16 size-[26rem] opacity-[0.22] transition-all duration-[1.2s] ease-[var(--ease-out-expo)] group-hover:rotate-12 group-hover:opacity-50" aria-hidden>
      {Array.from({ length: n }).map((_, i) => {
        const k = i / n;
        if (seed % 3 === 0)
          return <circle key={i} cx="200" cy="200" r={20 + k * 180} fill="none" stroke="currentColor" strokeWidth="0.7" strokeDasharray={i % 2 ? "2 5" : undefined} />;
        if (seed % 3 === 1)
          return <ellipse key={i} cx="200" cy="200" rx={180} ry={20 + k * 160} transform={`rotate(${k * 180} 200 200)`} fill="none" stroke="currentColor" strokeWidth="0.6" />;
        return <rect key={i} x={200 - (20 + k * 170)} y={200 - (20 + k * 170)} width={(20 + k * 170) * 2} height={(20 + k * 170) * 2} rx={k * 60} transform={`rotate(${k * 45} 200 200)`} fill="none" stroke="currentColor" strokeWidth="0.6" />;
      })}
    </svg>
  );
}

function Card({ ind, i }: { ind: (typeof industries)[number]; i: number }) {
  return (
    <Link
      href={`/industries/${ind.slug}`}
      className="group relative flex h-[min(68vh,560px)] w-[82vw] shrink-0 snap-start flex-col justify-between overflow-hidden rounded-3xl border border-white/[0.08] bg-ink-3 p-8 text-bone transition-colors duration-500 hover:border-accent/40 sm:w-[60vw] md:p-10 lg:w-[34vw]"
    >
      <span className="text-ice/80">
        <Pattern seed={i} />
      </span>
      <div className="relative flex items-center justify-between">
        <span className="font-mono text-xs text-bone/40">{String(i + 1).padStart(2, "0")} / {String(industries.length).padStart(2, "0")}</span>
        <span className="grid size-10 place-items-center rounded-full border border-white/15 transition-all duration-500 group-hover:border-accent group-hover:bg-accent group-hover:text-white">
          <Arrow />
        </span>
      </div>
      <div className="relative">
        <h3 className="text-[clamp(2rem,3.4vw,3.25rem)] font-medium leading-[0.98] tracking-[-0.04em]">{ind.name}</h3>
        <p className="mt-4 max-w-[34ch] text-bone/60">{ind.line}</p>
        <ul className="mt-8 flex flex-wrap gap-1.5">
          {ind.frameworks.map((f) => (
            <li key={f} className="rounded-full bg-white/[0.06] px-3 py-1 font-mono text-[0.7rem] text-bone/75">
              {f}
            </li>
          ))}
        </ul>
      </div>
    </Link>
  );
}

export default function Industries() {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);

  useLayoutEffect(() => {
    const measure = () => {
      if (!track.current) return;
      setDistance(Math.max(0, track.current.scrollWidth - window.innerWidth));
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (track.current) ro.observe(track.current);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  const { scrollYProgress } = useScroll({ target: section, offset: ["start start", "end end"] });
  const x = useSpring(useTransform(scrollYProgress, [0, 1], [0, -distance]), { stiffness: 140, damping: 30, mass: 0.4 });

  return (
    <>
      {/* Desktop / tablet: vertical scroll drives a horizontal track */}
      <section
        ref={section}
        className="relative hidden bg-ink md:block"
        style={{ height: `calc(100svh + ${distance}px)` }}
        aria-labelledby="industries-title"
      >
        <div className="sticky top-0 flex h-[100svh] flex-col justify-center overflow-hidden">
          <div className="container-x mb-10 flex items-end justify-between gap-8">
            <div>
              <Eyebrow>Industries</Eyebrow>
              <h2 id="industries-title" className="mt-5 text-[length:var(--text-section)] font-medium leading-[0.95] tracking-[-0.045em]">
                Built for how <span className="font-serif font-normal italic text-ice">your</span> sector works.
              </h2>
            </div>
            <div className="hidden h-px w-48 bg-white/10 lg:block">
              <motion.div className="h-full origin-left bg-accent" style={{ scaleX: scrollYProgress }} />
            </div>
          </div>
          <motion.div ref={track} style={{ x }} className="flex gap-4 pl-[max(1rem,calc((100vw-1480px)/2+3.5rem))] pr-[4vw] will-change-transform">
            {industries.map((ind, i) => (
              <Card key={ind.slug} ind={ind} i={i} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* Mobile: native swipe with snap */}
      <section className="bg-ink py-24 md:hidden" aria-labelledby="industries-title-m">
        <div className="container-x">
          <Eyebrow>Industries</Eyebrow>
          <h2 id="industries-title-m" className="mt-5 text-[length:var(--text-section)] font-medium leading-[0.95] tracking-[-0.045em]">
            Built for how <span className="font-serif font-normal italic text-ice">your</span> sector works.
          </h2>
        </div>
        <div className="mt-10 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-4 [scrollbar-width:none]" data-lenis-prevent>
          {industries.map((ind, i) => (
            <Card key={ind.slug} ind={ind} i={i} />
          ))}
        </div>
      </section>
    </>
  );
}
