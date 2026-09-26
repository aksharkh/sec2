"use client";

import { useProgress } from "@/lib/useProgress";
import dynamic from "next/dynamic";
import { useRef } from "react";
import { motion, useMotionValueEvent, useTransform } from "motion/react";
import Button from "@/components/ui/Button";
import { RevealLines } from "@/components/ui/Reveal";
import LocalTime, { ZoneLabel } from "@/components/ui/LocalTime";
import { site } from "@/lib/site";

const KnotScene = dynamic(() => import("./KnotScene"), { ssr: false });
const EASE = [0.16, 1, 0.3, 1] as const;

/*
  Scene 1 — "The Dive".
  The section is 340vh tall; its stage is pinned. As you scroll, the camera flies
  through the knot's centre, a statement rushes toward you, and the frame blooms
  into light before handing over to the next section.
*/
export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const dive = useRef(0);
  const p = useProgress(ref, ["start start", "end end"]);
  useMotionValueEvent(p, "change", (v) => (dive.current = v));

  // Headline pushes toward the viewer and dissolves
  const hScale = useTransform(p, [0, 0.3], [1, 1.35]);
  const hOpacity = useTransform(p, [0, 0.22], [1, 0]);
  const hBlur = useTransform(p, [0, 0.25], ["blur(0px)", "blur(12px)"]);
  const railOpacity = useTransform(p, [0, 0.08], [1, 0]);

  // Mid-dive statement: approaches, holds, then flies past
  const s1Scale = useTransform(p, [0.3, 0.52, 0.72], [0.55, 1, 2.6]);
  const s1Opacity = useTransform(p, [0.3, 0.42, 0.62, 0.72], [0, 1, 1, 0]);
  const s1Blur = useTransform(p, [0.62, 0.72], ["blur(0px)", "blur(16px)"]);

  // Final bloom
  const bloom = useTransform(p, [0.8, 0.93, 1], [0, 0.95, 0]);
  const bloomScale = useTransform(p, [0.8, 1], [0.25, 2.8]);
  const exitInk = useTransform(p, [0.93, 1], [0, 1]);

  return (
    <section ref={ref} className="relative h-[340vh] bg-ink" aria-labelledby="hero-title">
      <div className="grain sticky top-0 h-[100svh] overflow-hidden">
        {/* atmosphere */}
        <div aria-hidden className="grid-lines absolute inset-0 [mask-image:radial-gradient(ellipse_at_60%_45%,#000_10%,transparent_70%)]" />
        <div aria-hidden className="absolute right-[-10%] top-[10%] size-[60vw] rounded-full bg-accent/[0.09] blur-[160px]" />
        <div aria-hidden className="absolute inset-0">
          <KnotScene dive={dive} />
        </div>

        {/* bloom into light, then into ink */}
        <motion.div
          aria-hidden
          style={{ opacity: bloom, scale: bloomScale }}
          className="pointer-events-none absolute left-1/2 top-1/2 size-[70vmax] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(169,194,255,0.9)_0%,rgba(76,125,255,0.6)_28%,rgba(36,72,224,0.25)_50%,transparent_68%)] mix-blend-screen"
        />
        <motion.div aria-hidden style={{ opacity: exitInk }} className="pointer-events-none absolute inset-0 bg-ink" />

        {/* Opening headline */}
        <motion.div
          style={{ scale: hScale, opacity: hOpacity, filter: hBlur }}
          className="container-x relative flex h-full origin-[20%_55%] flex-col justify-end pb-28 pt-32 lg:justify-center lg:pb-16"
        >
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: EASE, delay: 0.2 }}
            className="mb-8 inline-flex w-fit items-center gap-3 rounded-full border border-white/10 bg-white/[0.03] py-1.5 pl-2 pr-4 backdrop-blur"
          >
            <span className="rounded-full bg-accent px-2 py-0.5 font-mono text-[0.65rem] font-medium uppercase tracking-wider text-white">New</span>
            <span className="text-[0.82rem] text-bone/75">ISO 42001 AI governance programmes</span>
          </motion.div>

          <h1 id="hero-title" className="max-w-[14ch] text-[length:var(--text-hero)] font-medium leading-[0.92] tracking-[-0.045em]">
            <RevealLines
              immediate
              delay={0.3}
              lines={["Compliance,", <>tied <span className="font-serif font-normal italic tracking-[-0.02em] text-ice">together.</span></>]}
            />
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease: EASE, delay: 0.75 }}
            className="mt-8 max-w-[46ch] text-[length:var(--text-lede)] leading-relaxed text-bone/65 text-pretty"
          >
            SecureKnots unifies FedRAMP, CMMC, SOC&nbsp;2, ISO&nbsp;27001, PCI&nbsp;DSS, DPDPA and 30+ frameworks into one audit-ready
            programme — so you assess once and prove it everywhere you sell.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease: EASE, delay: 0.9 }}
            className="mt-10 flex flex-wrap items-center gap-3"
          >
            <Button href="/contact" book size="lg">Book a consultation</Button>
            <Button href="/framework-finder" variant="ghost" size="lg" arrow={false}>Find your frameworks</Button>
          </motion.div>
        </motion.div>

        {/* Mid-dive statement */}
        <motion.div
          aria-hidden
          style={{ scale: s1Scale, opacity: s1Opacity, filter: s1Blur }}
          className="pointer-events-none absolute inset-0 grid place-items-center px-4 text-center"
        >
          <p className="text-[clamp(2.5rem,8vw,8.5rem)] font-medium leading-[0.9] tracking-[-0.05em]">
            Thirty frameworks.
            <br />
            <span className="font-serif font-normal italic text-ice">One knot.</span>
          </p>
        </motion.div>

        {/* bottom rail */}
        <motion.div style={{ opacity: railOpacity }} className="container-x absolute inset-x-0 bottom-0 hidden pb-8 md:block">
          <div className="flex items-end justify-between border-t border-white/[0.08] pt-5 text-[0.78rem] text-bone/50">
            <div className="flex gap-10">
              {site.offices.map((o) => (
                <div key={o.id} className="font-mono">
                  <span className="eyebrow block text-bone/35">{o.city}</span>
                  <span className="mt-1 block text-bone/80">
                    <LocalTime timeZone={o.timeZone} seconds /> <ZoneLabel timeZone={o.timeZone} fallback={o.tz} className="text-bone/40" />
                  </span>
                </div>
              ))}
              <div className="font-mono">
                <span className="eyebrow block text-bone/35">Coverage</span>
                <span className="mt-1 block text-bone/80">US · EU · India · APAC</span>
              </div>
            </div>
            <div className="flex items-center gap-3 font-mono uppercase tracking-[0.14em]">
              Scroll to dive in
              <span className="relative block h-9 w-[1px] overflow-hidden bg-white/10">
                <motion.span className="absolute inset-x-0 top-0 h-3 bg-accent" animate={{ y: [-12, 36] }} transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }} />
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
