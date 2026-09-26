"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useTransform } from "motion/react";
import { useProgress } from "@/lib/useProgress";
import { RevealLines } from "@/components/ui/Reveal";
import { StoryArt } from "@/components/customers/StoryArt";
import type { Story } from "@/lib/stories";

const EASE = [0.16, 1, 0.3, 1] as const;

/** Story hero: headline, then the cover art expands from a card to full-bleed as you scroll. */
export default function StoryHero({ story }: { story: Story }) {
  const ref = useRef<HTMLDivElement>(null);
  const p = useProgress(ref, ["start end", "end end"]);
  const inset = useTransform(p, [0, 1], [8, 0]);
  const radius = useTransform(p, [0, 1], [32, 0]);
  const clip = useTransform([inset, radius], ([i, r]: number[]) => `inset(0 ${i}% round ${r}px)`);
  const scale = useTransform(p, [0, 1], [1.15, 1]);

  return (
    <>
      <section className="bg-ink pb-16 pt-36 md:pt-44">
        <div className="container-x">
          <motion.nav initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-10 flex gap-2 font-mono text-[0.7rem] uppercase tracking-[0.14em] text-bone/40" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-bone">Home</Link> / <Link href="/customers" className="hover:text-bone">Customers</Link> / <span>{story.company}</span>
          </motion.nav>
          <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: EASE, delay: 0.1 }} className="eyebrow text-ice">
            {story.company} · {story.industry}
            {story.sample && <span className="ml-3 rounded-full border border-white/20 px-2 py-0.5 text-bone/50">Sample story</span>}
          </motion.p>
          <h1 className="mt-6 max-w-[22ch] text-[clamp(2.5rem,5.5vw,5.75rem)] font-medium leading-[0.98] tracking-[-0.045em]">
            <RevealLines immediate delay={0.2} lines={[story.headline]} />
          </h1>
        </div>
      </section>
      <div ref={ref} className="bg-ink">
        <motion.div style={{ clipPath: clip }} className="overflow-hidden">
          <motion.div style={{ scale }}>
            <StoryArt story={story} big className="h-[78svh]" />
          </motion.div>
        </motion.div>
      </div>
    </>
  );
}
