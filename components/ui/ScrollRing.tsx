"use client";

import { motion, useScroll, useSpring, useTransform } from "motion/react";

/** Circular scroll-progress indicator; click to return to top. */
export default function ScrollRing() {
  const { scrollYProgress } = useScroll();
  const p = useSpring(scrollYProgress, { stiffness: 120, damping: 25 });
  const pct = useTransform(p, (v) => `${Math.round(v * 100)}`);
  const show = useTransform(scrollYProgress, [0, 0.03], [0, 1]);
  return (
    <motion.button
      type="button"
      aria-label="Back to top"
      style={{ opacity: show }}
      onClick={() => (window.__lenis ? window.__lenis.scrollTo(0) : window.scrollTo({ top: 0, behavior: "smooth" }))}
      className="fixed bottom-5 left-5 z-[94] hidden size-12 place-items-center rounded-full bg-ink-2/80 backdrop-blur md:grid"
    >
      <svg viewBox="0 0 48 48" className="absolute inset-0 size-full -rotate-90">
        <circle cx="24" cy="24" r="21" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="2" />
        <motion.circle cx="24" cy="24" r="21" fill="none" stroke="var(--color-accent)" strokeWidth="2" strokeLinecap="round" style={{ pathLength: p }} />
      </svg>
      <motion.span className="font-mono text-[0.62rem] text-bone/70">{pct}</motion.span>
    </motion.button>
  );
}
