"use client";

import { useProgress } from "@/lib/useProgress";
import Link from "next/link";
import clsx from "clsx";
import { useRef } from "react";
import { motion, useTransform, type MotionValue } from "motion/react";
import { Eyebrow, Reveal, RevealLines } from "@/components/ui/Reveal";
import { Arrow } from "@/components/ui/Button";
import { frameworks, pillars, testingServices, type Pillar } from "@/lib/site";

function spotlight(e: React.PointerEvent<HTMLElement>) {
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
  e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
}

/* ---------- small, looping visuals — pure CSS/SVG so they cost nothing ---------- */

function Seals() {
  return (
    <div className="relative size-60 md:size-80" aria-hidden>
      {[0, 1, 2, 3].map((i) => (
        <motion.svg
          key={i}
          viewBox="0 0 200 200"
          className="absolute inset-0"
          animate={{ rotate: i % 2 ? -360 : 360 }}
          transition={{ duration: 40 + i * 12, repeat: Infinity, ease: "linear" }}
        >
          <circle
            cx="100"
            cy="100"
            r={96 - i * 18}
            fill="none"
            stroke={i === 1 ? "#7fa0ff" : "rgba(241,239,232,0.25)"}
            strokeWidth={i === 1 ? 1.4 : 1}
            strokeDasharray={i === 0 ? "2 6" : i === 1 ? "60 14" : i === 2 ? "1 4" : "30 8"}
          />
        </motion.svg>
      ))}
      <div className="absolute inset-0 grid place-items-center">
        <span className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-ice">Certified</span>
      </div>
    </div>
  );
}

function Boundary() {
  return (
    <div className="relative h-32 w-full overflow-hidden rounded-lg border border-white/10" aria-hidden>
      <div className="absolute inset-0 [background-image:radial-gradient(rgba(241,239,232,0.22)_1px,transparent_1px)] [background-size:14px_14px]" />
      <div className="absolute inset-4 rounded-md border border-dashed border-accent/60" />
      <motion.div
        className="absolute inset-y-0 w-24 bg-gradient-to-r from-transparent via-accent/25 to-transparent"
        animate={{ x: ["-30%", "520%"] }}
        transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut" }}
      />
      <span className="absolute bottom-2 right-3 font-mono text-[0.6rem] uppercase tracking-widest text-ice">
        ATO boundary
      </span>
    </div>
  );
}

function Redacted() {
  const rows = [
    [38, 22, 30],
    [18, 44, 20],
    [30, 16, 40],
    [24, 34, 18],
  ];
  return (
    <div className="w-full max-w-md space-y-2.5" aria-hidden>
      {rows.map((r, i) => (
        <div key={i} className="flex gap-2">
          {r.map((w, j) => (
            <motion.span
              key={j}
              className="h-3 rounded-sm"
              style={{ width: `${w}%` }}
              animate={{
                backgroundColor:
                  (i + j) % 3 === 0
                    ? ["rgba(241,239,232,0.18)", "#7fa0ff", "#7fa0ff", "rgba(241,239,232,0.18)"]
                    : ["rgba(241,239,232,0.18)", "rgba(241,239,232,0.18)"],
              }}
              transition={{ duration: 4, repeat: Infinity, delay: (i + j) * 0.35, times: [0, 0.2, 0.7, 1] }}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

function Terminal() {
  const lines = [
    ["$", "sk-scan --scope api.acme.io"],
    ["›", "enumerating 142 endpoints"],
    ["›", "auth bypass check ........ ok"],
    ["!", "IDOR  /v2/invoices/{id}  HIGH"],
    ["›", "report → remediation plan"],
  ];
  return (
    <div className="w-full rounded-lg border border-white/10 bg-black/40 p-4 font-mono text-[0.72rem] leading-6" aria-hidden>
      <div className="mb-3 flex gap-1.5">
        <span className="size-2 rounded-full bg-white/15" />
        <span className="size-2 rounded-full bg-white/15" />
        <span className="size-2 rounded-full bg-white/15" />
      </div>
      {lines.map(([p, t], i) => (
        <motion.p
          key={i}
          initial={{ opacity: 0, x: -6 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.6 }}
          transition={{ delay: 0.3 + i * 0.45, duration: 0.4 }}
          className={clsx("whitespace-nowrap", p === "!" ? "text-ice" : "text-bone/60")}
        >
          <span className="mr-2 text-bone/30">{p}</span>
          {t}
        </motion.p>
      ))}
    </div>
  );
}

function Heatmap() {
  const hot = new Set([4, 8, 9, 13, 14, 19]);
  return (
    <div className="grid w-40 grid-cols-5 gap-1" aria-hidden>
      {Array.from({ length: 25 }).map((_, i) => (
        <motion.span
          key={i}
          className="aspect-square rounded-[3px]"
          initial={{ backgroundColor: "rgba(241,239,232,0.06)" }}
          whileInView={{
            backgroundColor: hot.has(i) ? "#7fa0ff" : `rgba(241,239,232,${0.06 + ((i * 7) % 5) * 0.05})`,
          }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.03, duration: 0.6 }}
        />
      ))}
    </div>
  );
}

const visuals: Record<Pillar, React.ReactNode> = {
  certifications: <Seals />,
  government: <Boundary />,
  privacy: <Redacted />,
  testing: <Terminal />,
  advisory: <Heatmap />,
};


const TONES = ["#0e1a44", "#112058", "#15266b", "#1a2d80", "#1f3596"];

function StackCard({ i, n, progress }: { i: number; n: number; progress: MotionValue<number> }) {
  const p = pillars[i];
  const chips =
    p.id === "testing"
      ? testingServices.map((t) => t.name.replace(/ (Testing|Exercise)$/, ""))
      : frameworks.filter((f) => f.pillar === p.id).map((f) => f.name);
  const target = 1 - (n - i) * 0.035;
  const scale = useTransform(progress, [i / n, 1], [1, target]);
  const dim = useTransform(progress, [i / n, Math.min(1, (i + 1) / n)], [0, i === n - 1 ? 0 : 0.35]);
  return (
    <div className="sticky top-0 flex h-[100svh] items-center justify-center" style={{ paddingTop: `calc(12vh + ${i * 22}px)` }}>
      <motion.div
        style={{ scale, background: TONES[i] }}
        className="relative w-full max-w-[1400px] origin-top overflow-hidden rounded-[28px] border border-white/10"
      >
        <Link
          href={p.href}
          onPointerMove={spotlight}
          className="group relative grid h-[min(76vh,680px)] gap-8 p-7 md:grid-cols-2 md:p-12"
        >
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            style={{ background: "radial-gradient(520px circle at var(--mx) var(--my), rgba(169,194,255,0.14), transparent 60%)" }}
          />
          <span aria-hidden className="absolute inset-0 grid-lines opacity-40" />
          <div className="relative flex flex-col justify-between">
            <div className="flex items-center gap-4">
              <span className="font-mono text-sm text-ice">0{i + 1}</span>
              <span className="h-px w-10 bg-white/20" />
              <span className="eyebrow text-white/60">{p.short}</span>
            </div>
            <div>
              <h3 className="text-[clamp(2.25rem,4.6vw,4.75rem)] font-medium leading-[0.95] tracking-[-0.045em] text-white">{p.title}</h3>
              <p className="mt-5 max-w-[42ch] text-lg text-white/65">{p.description}</p>
              <ul className="mt-7 flex flex-wrap gap-1.5">
                {chips.map((c) => (
                  <li key={c} className="rounded-full border border-white/15 bg-white/[0.04] px-3 py-1 font-mono text-[0.7rem] text-white/75">{c}</li>
                ))}
              </ul>
              <span className="mt-8 inline-flex items-center gap-3 font-medium text-white">
                <span className="grid size-11 place-items-center rounded-full bg-white text-ink transition-transform duration-500 group-hover:-rotate-45">
                  <Arrow />
                </span>
                Explore {p.short.toLowerCase()}
              </span>
            </div>
          </div>
          <div className="relative hidden items-center justify-center md:flex">
            <div className="flex w-full max-w-lg scale-110 justify-center">{visuals[p.id]}</div>
          </div>
        </Link>
        <motion.div aria-hidden style={{ opacity: dim }} className="pointer-events-none absolute inset-0 bg-ink" />
      </motion.div>
    </div>
  );
}

export default function Services() {
  const ref = useRef<HTMLDivElement>(null);
  const scrollYProgress = useProgress(ref, ["start start", "end end"]);
  return (
    <section className="relative bg-ink pt-28 md:pt-40" aria-labelledby="services-title">
      <div className="container-x">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <div>
            <Eyebrow>What we do</Eyebrow>
            <h2 id="services-title" className="mt-6 text-[length:var(--text-section)] font-medium leading-[0.95] tracking-[-0.045em]">
              <RevealLines lines={["Five disciplines.", <>One <span className="font-serif font-normal italic text-ice">accountable</span> team.</>]} />
            </h2>
          </div>
          <Reveal className="max-w-[40ch] text-lg leading-relaxed text-bone/60">
            From first gap assessment to final report and every surveillance audit after — without handing you between vendors.
          </Reveal>
        </div>
      </div>
      <div ref={ref} className="container-x relative pb-[10vh]">
        {pillars.map((_, i) => (
          <StackCard key={i} i={i} n={pillars.length} progress={scrollYProgress} />
        ))}
      </div>
    </section>
  );
}
