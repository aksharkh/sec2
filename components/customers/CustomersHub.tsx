"use client";

import Link from "next/link";
import clsx from "clsx";
import { useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { StoryArt, Wordmark } from "@/components/customers/StoryArt";
import { SectionHead } from "@/components/page/Blocks";
import { Reveal } from "@/components/ui/Reveal";
import { Arrow } from "@/components/ui/Button";
import { stories } from "@/lib/stories";

const EASE = [0.16, 1, 0.3, 1] as const;

export function FeaturedCarousel() {
  const track = useRef<HTMLDivElement>(null);
  const wrap = useRef<HTMLDivElement>(null);
  const featured = stories.slice(0, 4);
  return (
    <section className="bg-ink pb-24" aria-label="Featured stories">
      <div ref={wrap} className="overflow-hidden">
        <motion.div
          ref={track}
          drag="x"
          dragConstraints={wrap}
          dragElastic={0.08}
          className="flex cursor-grab gap-4 pl-[max(1rem,calc((100vw-1480px)/2+3.5rem))] pr-[4vw] active:cursor-grabbing"
        >
          {featured.map((s, i) => (
            <motion.article
              key={s.slug}
              initial={{ opacity: 0, x: 80 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: EASE, delay: i * 0.1 }}
              className="group relative w-[86vw] shrink-0 overflow-hidden rounded-3xl border border-white/[0.08] bg-ink-2 md:w-[62vw] lg:w-[46vw]"
            >
              <div className="pointer-events-none overflow-hidden">
                <StoryArt story={s} big className="aspect-[16/9] transition-transform duration-[1.4s] ease-[var(--ease-out-expo)] group-hover:scale-105" />
              </div>
              <div className="grid gap-6 p-7 md:grid-cols-[1fr_auto] md:items-end md:p-9">
                <div>
                  <p className="eyebrow text-fog">{s.industry} · {s.frameworks.join(" · ")}</p>
                  <h3 className="mt-3 text-2xl font-medium leading-snug tracking-tight md:text-3xl">{s.headline}</h3>
                </div>
                <div className="flex items-end gap-6 md:flex-col md:items-end md:gap-4">
                  <p className="text-right">
                    <span className="block text-4xl font-medium tracking-tight text-ice">{s.stats[0].v}</span>
                    <span className="block max-w-[18ch] text-xs text-bone/45">{s.stats[0].l}</span>
                  </p>
                  <Link href={`/customers/${s.slug}`} draggable={false} className="inline-flex items-center gap-2 rounded-full bg-bone px-5 py-2.5 text-sm font-medium text-ink transition hover:bg-accent hover:text-white">
                    Read story <Arrow />
                  </Link>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
      <p className="container-x mt-6 font-mono text-[0.68rem] uppercase tracking-widest text-bone/35">← Drag to explore →</p>
    </section>
  );
}

export function LogoWall() {
  const doubled = [...stories, ...stories, ...stories];
  return (
    <section className="border-y border-white/[0.08] bg-ink py-12" aria-label="Customers">
      <div className="flex overflow-hidden mask-fade-x">
        <ul className="flex shrink-0 animate-marquee items-center gap-16 pr-16">
          {doubled.map((s, i) => (
            <li key={i} aria-hidden={i >= stories.length} className="shrink-0 text-bone/45 transition-colors hover:text-bone">
              <Wordmark story={s} className="!text-bone/50 text-2xl" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function StoryGrid() {
  const [ind, setInd] = useState("All");
  const [fw, setFw] = useState("All");
  const industriesList = ["All", ...Array.from(new Set(stories.map((s) => s.industry)))];
  const fwList = ["All", ...Array.from(new Set(stories.flatMap((s) => s.frameworks)))];
  const list = stories.filter((s) => (ind === "All" || s.industry === ind) && (fw === "All" || s.frameworks.includes(fw)));

  return (
    <section className="bg-ink py-28 md:py-36">
      <div className="container-x">
        <SectionHead eyebrow="All stories" lines={[<>Filter by what <span className="font-serif font-normal italic text-ice">matters to you.</span></>]} />
        <div className="mt-12 grid gap-6 lg:grid-cols-[260px_1fr]">
          <aside className="space-y-8 lg:sticky lg:top-28 lg:self-start">
            {[
              { t: "Industry", list: industriesList, v: ind, set: setInd },
              { t: "Framework", list: fwList, v: fw, set: setFw },
            ].map((g) => (
              <div key={g.t}>
                <p className="eyebrow mb-3 text-fog">{g.t}</p>
                <div className="flex flex-wrap gap-1.5 lg:flex-col lg:items-start">
                  {g.list.map((x) => (
                    <button
                      key={x}
                      type="button"
                      aria-pressed={g.v === x}
                      onClick={() => g.set(x)}
                      className={clsx(
                        "rounded-full px-3.5 py-1.5 text-sm transition-colors",
                        g.v === x ? "bg-accent text-white" : "text-bone/60 hover:bg-white/[0.05] hover:text-bone",
                      )}
                    >
                      {x}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </aside>
          <motion.ul layout className="grid gap-4 md:grid-cols-2">
            <AnimatePresence mode="popLayout">
              {list.map((s) => (
                <motion.li key={s.slug} layout initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.96 }} transition={{ duration: 0.5, ease: EASE }}>
                  <Link href={`/customers/${s.slug}`} className="group flex h-full flex-col overflow-hidden rounded-3xl border border-white/[0.08] bg-ink-2 transition-colors hover:border-accent/50">
                    <div className="overflow-hidden">
                      <StoryArt story={s} className="aspect-[16/10] transition-transform duration-[1.2s] ease-[var(--ease-out-expo)] group-hover:scale-105" />
                    </div>
                    <div className="flex flex-1 flex-col justify-between gap-8 p-7">
                      <div>
                        <p className="eyebrow text-fog">{s.industry}</p>
                        <p className="mt-3 text-xl font-medium leading-snug tracking-tight md:text-2xl">{s.headline}</p>
                      </div>
                      <div className="flex items-end justify-between gap-4 border-t border-white/[0.08] pt-5">
                        <div className="flex gap-6">
                          {s.stats.slice(0, 2).map((st) => (
                            <p key={st.l}>
                              <span className="block text-2xl font-medium tracking-tight">{st.v}</span>
                              <span className="block max-w-[16ch] text-xs text-bone/45">{st.l}</span>
                            </p>
                          ))}
                        </div>
                        <span className="grid size-10 shrink-0 place-items-center rounded-full border border-white/15 transition-all duration-500 group-hover:-rotate-45 group-hover:border-accent group-hover:bg-accent group-hover:text-white">
                          <Arrow />
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.li>
              ))}
            </AnimatePresence>
            {list.length === 0 && <li className="py-20 text-center text-bone/50 md:col-span-2">No stories match those filters yet.</li>}
          </motion.ul>
        </div>
      </div>
    </section>
  );
}

export function QuoteWall() {
  return (
    <section className="bg-bone py-28 text-ink md:py-36">
      <div className="container-x">
        <SectionHead light eyebrow="In their words" lines={["What teams say"]} />
        <div className="mt-14 columns-1 gap-4 md:columns-2 lg:columns-3">
          {stories.map((s, i) => (
            <Reveal key={s.slug} delay={(i % 3) * 0.08} className="mb-4 break-inside-avoid rounded-3xl bg-paper p-8">
              <p className="font-serif text-5xl leading-none text-accent">“</p>
              <p className={clsx("mt-2 font-medium leading-snug tracking-tight", i % 2 ? "text-xl" : "text-2xl")}>{s.quote.text}</p>
              <div className="mt-8 flex items-center gap-3">
                <span className="grid size-10 place-items-center rounded-full text-sm font-medium text-white" style={{ background: `hsl(${s.hue} 80% 50%)` }}>
                  {s.quote.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                </span>
                <span className="text-sm">
                  <span className="block font-medium">{s.quote.name}</span>
                  <span className="block text-ink/50">{s.quote.role}, {s.company}</span>
                </span>
              </div>
              {s.sample && <p className="mt-5 font-mono text-[0.6rem] uppercase tracking-widest text-ink/35">Sample story</p>}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
