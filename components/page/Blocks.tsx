"use client";

import Link from "next/link";
import clsx from "clsx";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Eyebrow, Reveal, RevealLines } from "@/components/ui/Reveal";
import { Arrow } from "@/components/ui/Button";

const EASE = [0.16, 1, 0.3, 1] as const;

export function SectionHead({
  eyebrow,
  lines,
  lede,
  light = false,
  className,
  action,
}: {
  eyebrow: string;
  lines: React.ReactNode[];
  lede?: string;
  light?: boolean;
  className?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className={clsx("flex flex-col justify-between gap-8 lg:flex-row lg:items-end", className)}>
      <div>
        <Eyebrow className={light ? "!text-smoke" : undefined}>{eyebrow}</Eyebrow>
        <h2 className="mt-6 text-[length:var(--text-section)] font-medium leading-[0.95] tracking-[-0.045em] text-balance">
          <RevealLines lines={lines} />
        </h2>
      </div>
      {(lede || action) && (
        <Reveal className={clsx("max-w-[42ch] text-lg leading-relaxed", light ? "text-ink/60" : "text-bone/60")}>
          {lede}
          {action && <div className="mt-6">{action}</div>}
        </Reveal>
      )}
    </div>
  );
}

export function FAQ({ items, light = false }: { items: { q: string; a: string }[]; light?: boolean }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <ul className={clsx("divide-y border-y", light ? "divide-ink/10 border-ink/10" : "divide-white/[0.08] border-white/[0.08]")}>
      {items.map((it, i) => (
        <li key={it.q}>
          <button
            type="button"
            aria-expanded={open === i}
            onClick={() => setOpen(open === i ? null : i)}
            className="flex w-full items-center justify-between gap-6 py-6 text-left"
          >
            <span className="text-xl font-medium tracking-tight md:text-2xl">{it.q}</span>
            <span
              className={clsx(
                "grid size-10 shrink-0 place-items-center rounded-full border text-xl transition-all duration-500",
                light ? "border-ink/15" : "border-white/15",
                open === i && "rotate-45 border-accent bg-accent text-white",
              )}
            >
              +
            </span>
          </button>
          <AnimatePresence initial={false}>
            {open === i && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.5, ease: EASE }} className="overflow-hidden">
                <p className={clsx("max-w-[70ch] pb-7 text-lg leading-relaxed", light ? "text-ink/60" : "text-bone/60")}>{it.a}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </li>
      ))}
    </ul>
  );
}

/** Big hover rows — the list pattern used on hubs. */
export function LinkRows({ items }: { items: { title: string; href: string; meta?: string; desc?: string }[] }) {
  return (
    <ul className="border-t border-white/[0.08]">
      {items.map((it, i) => (
        <Reveal as="li" key={it.href} delay={Math.min(i, 8) * 0.03}>
          <Link href={it.href} className="group relative grid items-center gap-3 overflow-hidden border-b border-white/[0.08] py-7 md:grid-cols-12 md:py-9">
            <span aria-hidden className="absolute inset-0 origin-bottom scale-y-0 bg-accent transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:scale-y-100" />
            <span className="relative font-mono text-xs text-bone/35 transition-colors group-hover:text-white/70 md:col-span-1">{String(i + 1).padStart(2, "0")}</span>
            <span className="relative text-3xl font-medium tracking-[-0.03em] transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:translate-x-3 md:col-span-5 md:text-5xl">{it.title}</span>
            <span className="relative text-bone/55 transition-colors group-hover:text-white/85 md:col-span-4">{it.desc}</span>
            <span className="relative flex items-center justify-between gap-4 md:col-span-2 md:justify-end">
              {it.meta && <span className="font-mono text-xs text-bone/40 group-hover:text-white/70">{it.meta}</span>}
              <span className="grid size-11 place-items-center rounded-full border border-white/15 transition-all duration-500 group-hover:-rotate-45 group-hover:border-white group-hover:bg-white group-hover:text-ink">
                <Arrow />
              </span>
            </span>
          </Link>
        </Reveal>
      ))}
    </ul>
  );
}

export function Steps({ steps, light = false }: { steps: { t: string; d: string }[]; light?: boolean }) {
  return (
    <ol className={clsx("grid gap-px overflow-hidden rounded-2xl md:grid-cols-2 lg:grid-cols-4", light ? "bg-ink/10" : "bg-white/[0.08]")}>
      {steps.map((s, i) => (
        <Reveal as="li" key={s.t} delay={i * 0.07} className={clsx("group relative p-8 md:p-10", light ? "bg-paper" : "bg-ink")}>
          <span className={clsx("font-mono text-xs", light ? "text-accent" : "text-ice")}>0{i + 1}</span>
          <h3 className="mt-10 text-2xl font-medium tracking-tight">{s.t}</h3>
          <p className={clsx("mt-3 leading-relaxed", light ? "text-ink/60" : "text-bone/55")}>{s.d}</p>
          <span aria-hidden className="absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-accent transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-x-100" />
        </Reveal>
      ))}
    </ol>
  );
}

export function Chips({ items, light = false }: { items: string[]; light?: boolean }) {
  return (
    <ul className="flex flex-wrap gap-1.5">
      {items.map((c) => (
        <li key={c} className={clsx("rounded-full border px-3 py-1 font-mono text-[0.7rem]", light ? "border-ink/15 text-ink/70" : "border-white/12 text-bone/70")}>
          {c}
        </li>
      ))}
    </ul>
  );
}
