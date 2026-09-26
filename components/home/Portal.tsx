"use client";

import { useProgress } from "@/lib/useProgress";
import clsx from "clsx";
import { useRef, useState } from "react";
import { motion, useMotionValueEvent, useTransform, type MotionValue } from "motion/react";
import { Eyebrow } from "@/components/ui/Reveal";

/*
  Scene — "The Portal".
  A small window floats in the dark. As you scroll it opens to fill the whole screen,
  and the programme inside comes to life: readiness climbs, controls tick over, audits land.
*/

const FW = [
  { n: "SOC 2 Type II", v: 100, c: "#a9c2ff" },
  { n: "ISO 27001", v: 94, c: "#7ea2ff" },
  { n: "PCI DSS v4.0.1", v: 86, c: "#4c7dff" },
  { n: "DPDPA", v: 72, c: "#3a5ff0" },
  { n: "ISO 42001", v: 58, c: "#2448e0" },
];

const TASKS = [
  "Quarterly access review — production",
  "Vendor risk: payment processor re-assessed",
  "Incident response tabletop completed",
  "Encryption key rotation evidenced",
  "Security awareness training — 98% complete",
  "Pentest findings retested & closed",
];

function Bar({ v, c, p, i }: { v: number; c: string; p: MotionValue<number>; i: number }) {
  const w = useTransform(p, [0.45 + i * 0.03, 0.8 + i * 0.03], ["0%", `${v}%`]);
  return (
    <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/[0.07]">
      <motion.div className="h-full rounded-full" style={{ width: w, background: c }} />
    </div>
  );
}

export default function Portal() {
  const ref = useRef<HTMLElement>(null);
  const p = useProgress(ref, ["start start", "end end"]);

  // window → full screen
  const insetY = useTransform(p, [0, 0.4], [26, 0]);
  const insetX = useTransform(p, [0, 0.4], [30, 0]);
  const radius = useTransform(p, [0, 0.4], [36, 0]);
  const clip = useTransform([insetY, insetX, radius] as MotionValue<number>[], ([y, x, r]) => `inset(${y}% ${x}% round ${r}px)`);
  const innerScale = useTransform(p, [0, 0.4], [0.86, 1]);
  const sideText = useTransform(p, [0, 0.18], [1, 0]);
  const sideX = useTransform(p, [0, 0.25], ["0%", "-30%"]);
  const sideXr = useTransform(p, [0, 0.25], ["0%", "30%"]);

  const [health, setHealth] = useState(62);
  const [done, setDone] = useState(0);
  useMotionValueEvent(p, "change", (v) => {
    const k = Math.min(1, Math.max(0, (v - 0.45) / 0.45));
    setHealth(Math.round(62 + k * 32));
    setDone(Math.min(TASKS.length, Math.floor(Math.max(0, (v - 0.5) / 0.4) * (TASKS.length + 1))));
  });

  return (
    <section ref={ref} className="relative h-[320vh] bg-ink" aria-labelledby="portal-title">
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        {/* flanking copy, visible while the window is small */}
        <motion.div style={{ opacity: sideText, x: sideX }} className="container-x absolute inset-x-0 top-[12%] z-10 hidden md:block">
          <Eyebrow>The programme view</Eyebrow>
          <h2 id="portal-title" className="mt-5 max-w-[12ch] text-[length:var(--text-section)] font-medium leading-[0.95] tracking-[-0.045em]">
            See <span className="font-serif font-normal italic text-ice">everything.</span>
          </h2>
        </motion.div>
        <motion.p style={{ opacity: sideText, x: sideXr }} className="container-x absolute inset-x-0 bottom-[10%] z-10 hidden text-right text-lg text-bone/55 md:block">
          <span className="ml-auto block max-w-[34ch]">Every framework, control, owner and audit date — in one live view your board can read.</span>
        </motion.p>

        <motion.div style={{ clipPath: clip }} className="absolute inset-0 bg-[#0c1330]">
          <motion.div style={{ scale: innerScale }} className="absolute inset-0 flex">
            <div aria-hidden className="absolute inset-0 grid-lines opacity-40" />
            <div aria-hidden className="absolute -right-[10%] -top-[20%] size-[60vw] rounded-full bg-accent/25 blur-[120px]" />

            {/* sidebar */}
            <aside className="relative hidden w-64 shrink-0 flex-col border-r border-white/[0.07] p-6 pt-24 lg:flex">
              <p className="eyebrow text-white/40">Programme</p>
              <ul className="mt-5 space-y-1 text-sm">
                {["Overview", "Frameworks", "Controls", "Evidence", "Risks", "Vendors", "Audits", "Policies"].map((t, i) => (
                  <li key={t} className={clsx("rounded-lg px-3 py-2", i === 0 ? "bg-white/10 text-white" : "text-white/50")}>{t}</li>
                ))}
              </ul>
              <div className="mt-auto rounded-xl border border-white/10 p-4">
                <p className="text-xs text-white/50">Next audit</p>
                <p className="mt-1 font-medium text-white">ISO 27001 surveillance</p>
                <p className="mt-2 font-mono text-xs text-ice">in 41 days</p>
              </div>
            </aside>

            {/* main */}
            <div className="relative flex-1 overflow-hidden p-5 pt-24 sm:p-8 sm:pt-24 lg:p-10 lg:pt-24">
              <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                  <p className="eyebrow text-white/40">Illustrative programme view</p>
                  <p className="mt-2 text-2xl font-medium tracking-tight text-white sm:text-3xl">Good morning — here&apos;s where you stand.</p>
                </div>
                <div className="flex gap-2">
                  <span className="rounded-full border border-white/15 px-3 py-1.5 font-mono text-[0.68rem] text-white/60">Q4 · 2026</span>
                  <span className="rounded-full bg-accent px-3 py-1.5 font-mono text-[0.68rem] text-white">Live</span>
                </div>
              </div>

              <div className="mt-8 grid gap-4 lg:grid-cols-3">
                {/* health ring */}
                <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6">
                  <p className="text-sm text-white/55">Programme health</p>
                  <div className="relative mx-auto mt-4 size-40">
                    <svg viewBox="0 0 100 100" className="size-full -rotate-90">
                      <circle cx="50" cy="50" r="42" stroke="rgba(255,255,255,0.08)" strokeWidth="7" fill="none" />
                      <circle cx="50" cy="50" r="42" stroke="url(#hg)" strokeWidth="7" fill="none" strokeLinecap="round" strokeDasharray={`${(health / 100) * 264} 264`} />
                      <defs>
                        <linearGradient id="hg" x1="0" x2="1">
                          <stop offset="0" stopColor="#2448e0" />
                          <stop offset="1" stopColor="#a9c2ff" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <div className="absolute inset-0 grid place-items-center text-center">
                      <div>
                        <p className="text-4xl font-medium tracking-tight text-white" style={{ fontVariantNumeric: "tabular-nums" }}>{health}%</p>
                        <p className="text-xs text-white/45">audit-ready</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* frameworks */}
                <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6 lg:col-span-2">
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-white/55">Framework readiness</p>
                    <p className="font-mono text-xs text-white/40">5 active</p>
                  </div>
                  <ul className="mt-5 space-y-4">
                    {FW.map((f, i) => (
                      <li key={f.n} className="grid grid-cols-[8.5rem_1fr_3rem] items-center gap-4 text-sm">
                        <span className="text-white/80">{f.n}</span>
                        <Bar v={f.v} c={f.c} p={p} i={i} />
                        <span className="text-right font-mono text-xs text-white/55">{f.v}%</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* tasks */}
                <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6 lg:col-span-2">
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-white/55">Control activity</p>
                    <p className="font-mono text-xs text-ice">{done}/{TASKS.length} complete</p>
                  </div>
                  <ul className="mt-4 divide-y divide-white/[0.06]">
                    {TASKS.map((t, i) => (
                      <li key={t} className="flex items-center gap-3 py-2.5 text-sm">
                        <span className={clsx("grid size-5 place-items-center rounded-full border transition-all duration-500", i < done ? "border-accent bg-accent" : "border-white/20")}>
                          {i < done && (
                            <svg viewBox="0 0 12 12" className="size-3 text-white" aria-hidden><path d="M2.5 6.5 5 9l4.5-5.5" stroke="currentColor" strokeWidth="1.6" fill="none" /></svg>
                          )}
                        </span>
                        <span className={clsx("transition-colors duration-500", i < done ? "text-white/85" : "text-white/40")}>{t}</span>
                        <span className="ml-auto hidden font-mono text-[0.65rem] text-white/35 sm:block">SOC 2 · ISO · PCI</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* evidence */}
                <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6">
                  <p className="text-sm text-white/55">Evidence reuse</p>
                  <p className="mt-4 text-5xl font-medium tracking-tight text-white">1 → 5</p>
                  <p className="mt-2 text-sm text-white/50">Each artefact collected once and mapped to every active framework.</p>
                  <div className="mt-6 flex gap-1.5">
                    {Array.from({ length: 24 }).map((_, i) => (
                      <span key={i} className="h-10 flex-1 rounded-sm" style={{ background: `rgba(76,125,255,${0.15 + ((i * 7) % 10) / 14})` }} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
