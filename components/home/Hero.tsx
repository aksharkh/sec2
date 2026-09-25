"use client";

import dynamic from "next/dynamic";
import { useRef } from "react";
import { motion, useMotionValueEvent, useScroll, useTransform } from "motion/react";
import Button from "@/components/ui/Button";
import { RevealLines } from "@/components/ui/Reveal";
import LocalTime, { ZoneLabel } from "@/components/ui/LocalTime";
import { site } from "@/lib/site";

const KnotScene = dynamic(() => import("./KnotScene"), { ssr: false });
const EASE = [0.16, 1, 0.3, 1] as const;

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const scroll = useRef(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  useMotionValueEvent(scrollYProgress, "change", (v) => (scroll.current = v));
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "28%"]);
  const contentO = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      ref={ref}
      className="grain relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-ink"
      aria-labelledby="hero-title"
    >
      {/* Atmosphere */}
      <div aria-hidden className="grid-lines absolute inset-0 -z-20 [mask-image:radial-gradient(ellipse_at_60%_45%,#000_10%,transparent_70%)]" />
      <div aria-hidden className="absolute right-[-10%] top-[10%] -z-20 size-[60vw] rounded-full bg-lime/[0.035] blur-[160px]" />
      <div aria-hidden className="absolute inset-0 -z-10">
        <KnotScene scroll={scroll} />
      </div>
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-48 bg-gradient-to-t from-ink to-transparent" />

      <motion.div
        style={{ y: contentY, opacity: contentO }}
        className="container-x relative flex flex-1 flex-col justify-end pb-10 pt-32 lg:justify-center lg:pb-24"
      >
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: EASE, delay: 0.2 }}
          className="mb-8 inline-flex w-fit items-center gap-3 rounded-full border border-white/10 bg-white/[0.03] py-1.5 pl-2 pr-4 backdrop-blur"
        >
          <span className="rounded-full bg-lime px-2 py-0.5 font-mono text-[0.65rem] font-medium uppercase tracking-wider text-ink">
            New
          </span>
          <span className="text-[0.82rem] text-bone/75">ISO 42001 AI governance programmes</span>
        </motion.div>

        <h1
          id="hero-title"
          className="max-w-[14ch] text-[length:var(--text-hero)] font-medium leading-[0.92] tracking-[-0.045em]"
        >
          <RevealLines
            immediate
            delay={0.3}
            lines={[
              "Compliance,",
              <>
                tied <span className="font-serif font-normal italic tracking-[-0.02em] text-lime">together.</span>
              </>,
            ]}
          />
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease: EASE, delay: 0.75 }}
          className="mt-8 max-w-[46ch] text-[length:var(--text-lede)] leading-relaxed text-bone/65 text-pretty"
        >
          SecureKnots unifies FedRAMP, CMMC, SOC&nbsp;2, ISO&nbsp;27001, PCI&nbsp;DSS, DPDPA and 30+ frameworks into one
          audit-ready programme — so you assess once and prove it everywhere you sell.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease: EASE, delay: 0.9 }}
          className="mt-10 flex flex-wrap items-center gap-3"
        >
          <Button href="/contact" size="lg">Book a consultation</Button>
          <Button href="#overlap" variant="ghost" size="lg" arrow={false}>
            See how frameworks overlap
          </Button>
        </motion.div>
      </motion.div>

      {/* Hero footer rail */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 1.3 }}
        className="container-x relative hidden pb-8 md:block"
      >
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
            <span className="relative block h-9 w-[1px] overflow-hidden bg-white/10">
              <motion.span
                className="absolute inset-x-0 top-0 h-3 bg-lime"
                animate={{ y: [-12, 36] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              />
            </span>
            Scroll
          </div>
        </div>
      </motion.div>
    </section>
  );
}
