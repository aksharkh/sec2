"use client";

import clsx from "clsx";
import { useMemo, useState } from "react";
import { AnimatePresence, motion, useSpring, useTransform } from "motion/react";
import { useEffect } from "react";
import { Eyebrow, RevealLines } from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";

// Common control domains and which frameworks materially address each one.
// Deliberately coarse: this is a conversation starter, not a crosswalk.
const DOMAINS = [
  "Governance & policy",
  "Risk assessment",
  "Access control & identity",
  "Asset & data inventory",
  "Encryption & data protection",
  "Logging & monitoring",
  "Vulnerability management",
  "Change & configuration",
  "Incident response",
  "Business continuity",
  "Third-party risk",
  "Security awareness",
  "Privacy & data rights",
  "Physical security",
] as const;

const MAP: Record<string, number[]> = {
  "SOC 2": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 13],
  "ISO 27001": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
  "PCI DSS": [0, 1, 2, 3, 4, 5, 6, 7, 8, 10, 11, 13],
  HIPAA: [0, 1, 2, 3, 4, 5, 8, 9, 10, 11, 12, 13],
  FedRAMP: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 13],
  CMMC: [0, 1, 2, 3, 4, 5, 6, 7, 8, 11, 13],
  GDPR: [0, 1, 2, 3, 4, 8, 10, 12],
  DPDPA: [0, 3, 4, 8, 10, 12],
};
const ALL = Object.keys(MAP);

function Counter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const s = useSpring(value, { stiffness: 90, damping: 20 });
  const t = useTransform(s, (v) => `${Math.round(v)}${suffix}`);
  useEffect(() => s.set(value), [s, value]);
  return <motion.span style={{ fontVariantNumeric: "tabular-nums" }}>{t}</motion.span>;
}

export default function OverlapTool() {
  const [selected, setSelected] = useState<string[]>(["SOC 2", "ISO 27001", "GDPR"]);

  const toggle = (f: string) =>
    setSelected((s) => (s.includes(f) ? (s.length > 1 ? s.filter((x) => x !== f) : s) : [...s, f]));

  const stats = useMemo(() => {
    const counts = DOMAINS.map((_, i) => selected.filter((f) => MAP[f].includes(i)).length);
    const separate = selected.reduce((n, f) => n + MAP[f].length, 0);
    const unified = counts.filter((c) => c > 0).length;
    const shared = counts.filter((c) => c === selected.length).length;
    const saved = separate ? Math.round((1 - unified / separate) * 100) : 0;
    return { counts, separate, unified, shared, saved };
  }, [selected]);

  return (
    <section id="overlap" className="relative scroll-mt-20 bg-bone py-28 text-ink md:py-40" aria-labelledby="overlap-title">
      <div className="container-x">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <Eyebrow className="!text-smoke">Assess once · comply with many</Eyebrow>
            <h2
              id="overlap-title"
              className="mt-6 text-[length:var(--text-section)] font-medium leading-[0.95] tracking-[-0.045em]"
            >
              <RevealLines lines={["Your frameworks", <>overlap <span className="font-serif font-normal italic">more</span></>, "than you think."]} />
            </h2>
            <p className="mt-6 max-w-[42ch] text-lg leading-relaxed text-ink/60 text-pretty">
              Pick the frameworks on your roadmap. Watch how many control domains they share — and how much duplicate
              work one unified programme removes.
            </p>

            <div className="mt-10">
              <p className="eyebrow mb-4 text-smoke">Select frameworks</p>
              <div className="flex flex-wrap gap-2" role="group" aria-label="Frameworks">
                {ALL.map((f) => {
                  const on = selected.includes(f);
                  return (
                    <button
                      key={f}
                      type="button"
                      aria-pressed={on}
                      onClick={() => toggle(f)}
                      className={clsx(
                        "relative h-10 rounded-full border px-4 text-sm font-medium transition-colors duration-300",
                        on ? "border-ink bg-ink text-bone" : "border-ink/15 text-ink/70 hover:border-ink/40 hover:text-ink",
                      )}
                    >
                      <span className="flex items-center gap-2">
                        <span
                          className={clsx(
                            "size-1.5 rounded-full transition-colors",
                            on ? "bg-lime" : "bg-ink/25",
                          )}
                        />
                        {f}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <dl className="mt-12 grid grid-cols-3 border-t border-ink/12">
              <div className="border-r border-ink/12 py-6 pr-4">
                <dt className="eyebrow text-smoke">Separate audits</dt>
                <dd className="mt-3 text-4xl font-medium tracking-tight md:text-5xl">
                  <Counter value={stats.separate} />
                </dd>
                <dd className="mt-1 text-xs text-ink/50">control domains to evidence</dd>
              </div>
              <div className="border-r border-ink/12 px-4 py-6">
                <dt className="eyebrow text-smoke">Unified</dt>
                <dd className="mt-3 text-4xl font-medium tracking-tight md:text-5xl">
                  <Counter value={stats.unified} />
                </dd>
                <dd className="mt-1 text-xs text-ink/50">with SecureKnots</dd>
              </div>
              <div className="py-6 pl-4">
                <dt className="eyebrow text-smoke">Duplication cut</dt>
                <dd className="mt-3 text-4xl font-medium tracking-tight md:text-5xl">
                  <span className="relative">
                    <span className="absolute -inset-x-1 bottom-1 top-1/2 -z-0 bg-lime" aria-hidden />
                    <span className="relative"><Counter value={stats.saved} suffix="%" /></span>
                  </span>
                </dd>
                <dd className="mt-1 text-xs text-ink/50">of evidence requests</dd>
              </div>
            </dl>
            <p className="mt-4 text-xs leading-relaxed text-ink/45">
              Illustrative, based on common control domains. Real overlap depends on scope — we&apos;ll map yours precisely.
            </p>
          </div>

          <div className="lg:col-span-7 lg:pl-8">
            <div className="flex items-center justify-between border-b border-ink/12 pb-4">
              <p className="eyebrow text-smoke">Control domains</p>
              <p className="eyebrow text-smoke">
                <span className="text-ink">{stats.shared}</span> shared by all {selected.length}
              </p>
            </div>
            <ul className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
              {DOMAINS.map((d, i) => {
                const c = stats.counts[i];
                const full = c === selected.length;
                return (
                  <motion.li
                    key={d}
                    layout
                    className={clsx(
                      "relative flex items-center justify-between overflow-hidden rounded-xl border px-4 py-3.5 transition-colors duration-500",
                      full
                        ? "border-ink bg-ink text-bone"
                        : c > 0
                          ? "border-ink/12 bg-paper text-ink"
                          : "border-dashed border-ink/12 bg-transparent text-ink/35",
                    )}
                  >
                    <span className="flex items-center gap-3 text-[0.92rem] font-medium tracking-tight">
                      <span className={clsx("font-mono text-[0.65rem]", full ? "text-lime" : "text-ink/35")}>
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {d}
                    </span>
                    <span className="flex items-center gap-1" aria-label={`${c} of ${selected.length} frameworks`}>
                      <AnimatePresence initial={false}>
                        {selected.map((f) =>
                          MAP[f].includes(i) ? (
                            <motion.span
                              key={f}
                              initial={{ scale: 0, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              exit={{ scale: 0, opacity: 0 }}
                              transition={{ type: "spring", stiffness: 500, damping: 28 }}
                              title={f}
                              className={clsx("size-2 rounded-full", full ? "bg-lime" : "bg-ink/70")}
                            />
                          ) : null,
                        )}
                      </AnimatePresence>
                    </span>
                  </motion.li>
                );
              })}
            </ul>
            <div className="mt-8 flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-ink p-6 text-bone">
              <p className="max-w-[36ch] text-[0.95rem] leading-snug text-bone/80">
                Want the exact control-by-control crosswalk for{" "}
                <span className="text-bone">{selected.join(", ")}</span>?
              </p>
              <Button href="/contact" size="sm">Get my crosswalk</Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
