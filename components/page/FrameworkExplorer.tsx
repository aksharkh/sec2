"use client";

import Link from "next/link";
import clsx from "clsx";
import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Arrow } from "@/components/ui/Button";
import Tilt from "@/components/ui/Tilt";
import { frameworks, pillars, type Pillar } from "@/lib/site";

const REGIONS = ["All", "Global", "US", "EU", "India", "APAC"] as const;

export default function FrameworkExplorer() {
  const [pillar, setPillar] = useState<Pillar | "all">("all");
  const [region, setRegion] = useState<(typeof REGIONS)[number]>("All");
  const [q, setQ] = useState("");

  const list = useMemo(
    () =>
      frameworks.filter(
        (f) =>
          (pillar === "all" || f.pillar === pillar) &&
          (region === "All" || f.region === region) &&
          `${f.name} ${f.full} ${f.blurb}`.toLowerCase().includes(q.toLowerCase()),
      ),
    [pillar, region, q],
  );

  const tabs = [{ id: "all" as const, title: "All" }, ...pillars.filter((p) => p.id !== "testing").map((p) => ({ id: p.id, title: p.title }))];

  return (
    <div>
      <div className="flex flex-col gap-6 border-b border-white/[0.08] pb-8 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap gap-1.5" role="tablist" aria-label="Framework category">
          {tabs.map((t) => (
            <button
              key={t.id}
              role="tab"
              aria-selected={pillar === t.id}
              onClick={() => setPillar(t.id)}
              className={clsx(
                "relative h-10 rounded-full px-4 text-sm transition-colors",
                pillar === t.id ? "text-white" : "text-bone/60 hover:text-bone",
              )}
            >
              {pillar === t.id && <motion.span layoutId="fw-tab" className="absolute inset-0 -z-0 rounded-full bg-accent" transition={{ type: "spring", stiffness: 400, damping: 34 }} />}
              <span className="relative">{t.title}</span>
            </button>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <select
            value={region}
            onChange={(e) => setRegion(e.target.value as (typeof REGIONS)[number])}
            aria-label="Region"
            className="h-10 rounded-full border border-white/12 bg-ink-2 px-4 text-sm text-bone outline-none focus:border-accent"
          >
            {REGIONS.map((r) => (
              <option key={r}>{r}</option>
            ))}
          </select>
          <label className="relative">
            <span className="sr-only">Search frameworks</span>
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search…"
              className="h-10 w-56 rounded-full border border-white/12 bg-transparent pl-10 pr-4 text-sm text-bone outline-none placeholder:text-bone/35 focus:border-accent"
            />
            <svg viewBox="0 0 20 20" className="pointer-events-none absolute left-4 top-1/2 size-3.5 -translate-y-1/2 text-bone/40" aria-hidden>
              <circle cx="9" cy="9" r="6" stroke="currentColor" strokeWidth="1.8" fill="none" />
              <path d="M14 14l4 4" stroke="currentColor" strokeWidth="1.8" />
            </svg>
          </label>
        </div>
      </div>

      <p className="mt-6 font-mono text-xs text-bone/40">{list.length} frameworks</p>
      <motion.ul layout className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <AnimatePresence mode="popLayout">
          {list.map((f) => (
            <motion.li
              key={f.slug}
              layout
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <Tilt className="h-full" radius="rounded-2xl" max={9}>
              <Link
                href={`/compliance/${f.slug}`}
                className="group relative flex h-full min-h-[230px] flex-col justify-between overflow-hidden rounded-2xl border border-white/[0.08] bg-ink-2 p-6 transition-colors duration-500 hover:border-accent/60"
              >
                <span aria-hidden className="absolute inset-x-0 -bottom-full h-full bg-gradient-to-t from-accent/30 to-transparent transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:-translate-y-full" />
                <div className="relative flex items-start justify-between">
                  <span className="rounded-full border border-white/12 px-2.5 py-1 font-mono text-[0.62rem] uppercase tracking-widest text-bone/55">{f.region}</span>
                  <span className="grid size-9 place-items-center rounded-full border border-white/12 transition-all duration-500 group-hover:-rotate-45 group-hover:border-accent group-hover:bg-accent group-hover:text-white">
                    <Arrow />
                  </span>
                </div>
                <div className="relative">
                  <p className="text-3xl font-medium tracking-[-0.03em]">{f.name}</p>
                  <p className="mt-1 text-xs text-bone/40">{f.full}</p>
                  <p className="mt-3 text-sm leading-relaxed text-bone/60">{f.blurb}</p>
                </div>
              </Link>
              </Tilt>
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>
    </div>
  );
}
