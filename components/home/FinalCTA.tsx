"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import Button from "@/components/ui/Button";
import { KnotMark } from "@/components/ui/Logo";
import { site } from "@/lib/site";

export default function FinalCTA() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  const rotate = useTransform(scrollYProgress, [0, 1], [-90, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.6, 1]);
  const radius = useTransform(scrollYProgress, [0, 0.8], ["48px", "0px"]);
  const inset = useTransform(scrollYProgress, [0, 0.8], ["4vw", "0vw"]);

  return (
    <section ref={ref} className="relative bg-ink" aria-labelledby="cta-title">
      <motion.div style={{ marginInline: inset }} className="relative">
        <motion.div
          style={{ borderRadius: radius }}
          className="relative overflow-hidden bg-lime text-ink"
        >
          <motion.div
            style={{ rotate, scale }}
            className="pointer-events-none absolute -right-[10vw] top-1/2 size-[62vw] -translate-y-1/2 opacity-[0.12] md:size-[48vw]"
            aria-hidden
          >
            <KnotMark className="size-full" />
          </motion.div>

          <div className="container-x relative py-28 md:py-40">
            <p className="eyebrow">Start here</p>
            <h2
              id="cta-title"
              className="mt-8 max-w-[12ch] text-[length:var(--text-display)] font-medium leading-[0.86] tracking-[-0.055em]"
            >
              Let&apos;s tie it <span className="font-serif font-normal italic">together.</span>
            </h2>
            <div className="mt-14 flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
              <p className="max-w-[40ch] text-lg leading-relaxed text-ink/70">
                A 30-minute call with a practitioner. You leave with a clear view of which frameworks matter, in what order,
                and what it will take.
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <Button href="/contact" variant="dark" size="lg">Book a consultation</Button>
                <a
                  href={`mailto:${site.email}`}
                  className="inline-flex h-14 items-center rounded-full border border-ink/25 px-7 font-medium transition-colors hover:bg-ink hover:text-lime"
                >
                  {site.email}
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
