"use client";

import clsx from "clsx";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { frameworks, industries, pillars, testingServices } from "@/lib/site";
import { stories } from "@/lib/stories";
import { articles } from "@/lib/insights";

type Item = { title: string; group: string; href: string; hint?: string };

const INDEX: Item[] = [
  { title: "Home", group: "Pages", href: "/" },
  { title: "All frameworks", group: "Pages", href: "/compliance" },
  { title: "Framework Finder", group: "Pages", href: "/framework-finder", hint: "Quiz" },
  { title: "Customer stories", group: "Pages", href: "/customers" },
  { title: "Insights", group: "Pages", href: "/insights" },
  { title: "About", group: "Pages", href: "/about" },
  { title: "Careers", group: "Pages", href: "/careers" },
  { title: "Contact", group: "Pages", href: "/contact" },
  ...pillars.map((p) => ({ title: p.title, group: "Services", href: p.href })),
  ...frameworks.map((f) => ({ title: f.name, group: "Frameworks", href: `/compliance/${f.slug}`, hint: f.full })),
  ...testingServices.map((t) => ({ title: t.name, group: "Security testing", href: `/security-testing/${t.slug}` })),
  ...industries.map((i) => ({ title: i.name, group: "Industries", href: `/industries/${i.slug}` })),
  ...stories.map((s) => ({ title: s.company, group: "Customer stories", href: `/customers/${s.slug}`, hint: s.industry })),
  ...articles.map((a) => ({ title: a.title, group: "Insights", href: `/insights/${a.slug}` })),
];

export default function CommandPalette({ open, onClose }: { open: boolean; onClose: () => void }) {
  return <AnimatePresence>{open && <Palette onClose={onClose} />}</AnimatePresence>;
}

function Palette({ onClose }: { onClose: () => void }) {
  const [q, setQ] = useState("");
  const [idx, setIdx] = useState(0);
  const router = useRouter();
  const input = useRef<HTMLInputElement>(null);
  const list = useRef<HTMLUListElement>(null);

  const results = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return INDEX.filter((i) => i.group === "Pages" || i.group === "Services").slice(0, 12);
    return INDEX.filter((i) => `${i.title} ${i.hint ?? ""} ${i.group}`.toLowerCase().includes(s)).slice(0, 14);
  }, [q]);

  useEffect(() => {
    input.current?.focus();
  }, []);

  const go = (href: string) => {
    onClose();
    router.push(href);
  };

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") onClose();
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setIdx((i) => Math.min(results.length - 1, i + 1));
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      setIdx((i) => Math.max(0, i - 1));
    }
    if (e.key === "Enter" && results[idx]) go(results[idx].href);
  };

  useEffect(() => {
    list.current?.querySelector(`[data-i="${idx}"]`)?.scrollIntoView({ block: "nearest" });
  }, [idx]);

  return (
    <motion.div className="fixed inset-0 z-[130] flex items-start justify-center px-4 pt-[12vh]" role="dialog" aria-modal="true" aria-label="Search" data-lenis-prevent>
      <motion.button
        type="button"
        aria-label="Close search"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-ink/70 backdrop-blur-md"
      />
      <motion.div
        initial={{ opacity: 0, y: -16, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -10, scale: 0.98, transition: { duration: 0.15 } }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-2xl overflow-hidden rounded-2xl border border-white/10 bg-ink-2/95 shadow-[0_40px_120px_-20px_rgba(0,0,0,0.8)] backdrop-blur-xl"
        onKeyDown={onKey}
      >
        <div className="flex items-center gap-3 border-b border-white/[0.08] px-5">
          <svg viewBox="0 0 20 20" className="size-4 text-fog" aria-hidden><circle cx="9" cy="9" r="6" stroke="currentColor" strokeWidth="1.6" fill="none" /><path d="M14 14l4 4" stroke="currentColor" strokeWidth="1.6" /></svg>
          <input
            ref={input}
            value={q}
            onChange={(e) => {
              setQ(e.target.value);
              setIdx(0);
            }}
            placeholder="Search frameworks, services, stories…"
            className="h-16 flex-1 bg-transparent text-lg text-bone outline-none placeholder:text-bone/30"
            aria-label="Search"
          />
          <kbd className="rounded-md border border-white/10 px-2 py-1 font-mono text-[0.65rem] text-fog">ESC</kbd>
        </div>
        <ul ref={list} className="max-h-[52vh] overflow-y-auto p-2" role="listbox">
          {results.length === 0 && <li className="px-4 py-10 text-center text-bone/50">No results for “{q}”.</li>}
          {results.map((r, i) => (
            <li key={r.href + r.title} data-i={i} role="option" aria-selected={i === idx}>
              <button
                type="button"
                onMouseEnter={() => setIdx(i)}
                onClick={() => go(r.href)}
                className={clsx(
                  "flex w-full items-center justify-between gap-4 rounded-xl px-4 py-3 text-left transition-colors",
                  i === idx ? "bg-accent text-white" : "text-bone/80",
                )}
              >
                <span className="min-w-0">
                  <span className="block truncate font-medium">{r.title}</span>
                  {r.hint && <span className={clsx("block truncate text-xs", i === idx ? "text-white/70" : "text-bone/40")}>{r.hint}</span>}
                </span>
                <span className={clsx("shrink-0 font-mono text-[0.65rem] uppercase tracking-widest", i === idx ? "text-white/80" : "text-bone/35")}>{r.group}</span>
              </button>
            </li>
          ))}
        </ul>
        <div className="flex items-center justify-between border-t border-white/[0.08] px-5 py-3 font-mono text-[0.65rem] uppercase tracking-widest text-bone/35">
          <span>↑↓ navigate · ↵ open</span>
          <span>⌘K to toggle</span>
        </div>
      </motion.div>
    </motion.div>
  );
}
