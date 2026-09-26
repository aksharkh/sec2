"use client";

import { useProgress } from "@/lib/useProgress";
import { useRef } from "react";
import { motion, useTransform, type MotionValue } from "motion/react";
import { Eyebrow } from "@/components/ui/Reveal";

const TEXT =
  "Every framework asks the same questions in a different accent. Who has access? Where does the data live? What happens when something breaks? We answer them once — rigorously — then map that evidence to every standard your customers and regulators ask for.";

const HIGHLIGHT = new Set(["once", "rigorously", "every"]);

function Word({ word, range, progress }: { word: string; range: [number, number]; progress: MotionValue<number> }) {
  const opacity = useTransform(progress, range, [0.14, 1]);
  const clean = word.replace(/[^a-z]/gi, "").toLowerCase();
  const hl = HIGHLIGHT.has(clean);
  return (
    <span className="relative mr-[0.24em] inline-block">
      <motion.span style={{ opacity }} className={hl ? "font-serif italic text-ice" : undefined}>
        {word}
      </motion.span>
    </span>
  );
}

export default function Manifesto() {
  const ref = useRef<HTMLDivElement>(null);
  const scrollYProgress = useProgress(ref, ["start 0.85", "end 0.45"]);
  const words = TEXT.split(" ");

  return (
    <section className="relative bg-ink py-32 md:py-48" aria-label="Our approach">
      <div className="container-x grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-3">
          <Eyebrow>The problem</Eyebrow>
          <p className="mt-5 max-w-[26ch] text-sm leading-relaxed text-fog">
            Most companies run a separate project for each audit. Same controls, same evidence, collected again and again.
          </p>
        </div>
        <div ref={ref} className="lg:col-span-9">
          <p className="text-[clamp(1.75rem,3.6vw,3.5rem)] font-medium leading-[1.12] tracking-[-0.03em]">
            {words.map((w, i) => {
              const start = i / words.length;
              const end = start + 1 / words.length;
              return <Word key={i} word={w} range={[start, end]} progress={scrollYProgress} />;
            })}
          </p>
        </div>
      </div>
    </section>
  );
}
