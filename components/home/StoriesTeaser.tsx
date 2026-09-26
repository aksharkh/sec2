"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Eyebrow, RevealLines } from "@/components/ui/Reveal";
import Button, { Arrow } from "@/components/ui/Button";
import { StoryArt } from "@/components/customers/StoryArt";
import { stories } from "@/lib/stories";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function StoriesTeaser() {
  const [i, setI] = useState(0);
  const s = stories[i];
  return (
    <section className="relative overflow-hidden bg-ink py-28 md:py-40" aria-labelledby="stories-title">
      <div className="container-x">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <Eyebrow>Customer stories</Eyebrow>
            <h2 id="stories-title" className="mt-6 text-[length:var(--text-section)] font-medium leading-[0.95] tracking-[-0.045em]">
              <RevealLines lines={["Tied together,", <>in the <span className="font-serif font-normal italic text-ice">real world.</span></>]} />
            </h2>
          </div>
          <Button href="/customers" variant="ghost">All stories</Button>
        </div>

        <div className="mt-16 grid gap-6 lg:grid-cols-12">
          <div className="relative overflow-hidden rounded-3xl lg:col-span-7">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.div
                key={s.slug}
                initial={{ clipPath: "inset(0 0 0 100%)" }}
                animate={{ clipPath: "inset(0 0 0 0%)" }}
                exit={{ opacity: 0.4 }}
                transition={{ duration: 0.9, ease: [0.83, 0, 0.17, 1] }}
              >
                <StoryArt story={s} big className="aspect-[4/3] w-full lg:aspect-auto lg:h-[560px]" />
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex flex-col justify-between rounded-3xl border border-white/[0.08] bg-ink-2 p-8 md:p-10 lg:col-span-5">
            <AnimatePresence mode="wait">
              <motion.div key={s.slug} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.5, ease: EASE }}>
                <p className="eyebrow text-fog">{s.industry} · {s.region}</p>
                <blockquote className="mt-6 text-2xl font-medium leading-snug tracking-tight text-bone md:text-[1.7rem]">
                  <span className="font-serif text-4xl text-ice">“</span>
                  {s.quote.text}
                </blockquote>
                <p className="mt-6 text-sm text-bone/55">
                  {s.quote.name} · {s.quote.role}, {s.company}
                </p>
                <dl className="mt-10 grid grid-cols-3 gap-4 border-t border-white/[0.08] pt-6">
                  {s.stats.map((st) => (
                    <div key={st.l}>
                      <dt className="sr-only">{st.l}</dt>
                      <dd className="text-2xl font-medium tracking-tight md:text-3xl">{st.v}</dd>
                      <dd className="mt-1 text-xs leading-snug text-bone/45">{st.l}</dd>
                    </div>
                  ))}
                </dl>
              </motion.div>
            </AnimatePresence>
            <div className="mt-10 flex items-center justify-between">
              <Link href={`/customers/${s.slug}`} className="group inline-flex items-center gap-2 font-medium text-ice">
                Read the story <Arrow className="transition-transform group-hover:translate-x-1" />
              </Link>
              <div className="flex gap-2">
                {stories.map((st, k) => (
                  <button
                    key={st.slug}
                    type="button"
                    onClick={() => setI(k)}
                    aria-label={`Show ${st.company}`}
                    className={`h-1.5 rounded-full transition-all duration-500 ${k === i ? "w-8 bg-accent" : "w-1.5 bg-white/25 hover:bg-white/50"}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
