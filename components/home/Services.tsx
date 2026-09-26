"use client";

import Link from "next/link";
import clsx from "clsx";
import { motion } from "motion/react";
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

const layout: Record<Pillar, string> = {
  certifications: "lg:col-span-7 lg:row-span-2 min-h-[520px]",
  government: "lg:col-span-5 min-h-[250px]",
  privacy: "lg:col-span-5 min-h-[250px]",
  testing: "lg:col-span-7 min-h-[320px]",
  advisory: "lg:col-span-5 min-h-[320px]",
};

export default function Services() {
  return (
    <section className="relative bg-ink py-28 md:py-40" aria-labelledby="services-title">
      <div className="container-x">
        <div className="mb-16 flex flex-col justify-between gap-8 md:mb-20 lg:flex-row lg:items-end">
          <div>
            <Eyebrow>What we do</Eyebrow>
            <h2
              id="services-title"
              className="mt-6 text-[length:var(--text-section)] font-medium leading-[0.95] tracking-[-0.045em]"
            >
              <RevealLines lines={["Five disciplines.", <>One <span className="font-serif font-normal italic text-ice">accountable</span> team.</>]} />
            </h2>
          </div>
          <Reveal className="max-w-[40ch] text-lg leading-relaxed text-bone/60">
            From first gap assessment to final report and every surveillance audit after — without handing you between
            vendors.
          </Reveal>
        </div>

        <div className="grid gap-3 lg:grid-cols-12">
          {pillars.map((p, idx) => {
            const chips =
              p.id === "testing"
                ? testingServices.slice(0, 4).map((t) => t.name.replace(/ (Testing|Exercise)$/, ""))
                : frameworks.filter((f) => f.pillar === p.id).slice(0, 6).map((f) => f.name);
            const big = p.id === "certifications";
            return (
              <Reveal key={p.id} delay={idx * 0.06} className={clsx(layout[p.id])}>
                <Link
                  href={p.href}
                  onPointerMove={spotlight}
                  className="group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-white/[0.08] bg-ink-2 p-7 transition-colors duration-500 hover:border-white/20 md:p-9"
                >
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    style={{
                      background:
                        "radial-gradient(420px circle at var(--mx) var(--my), rgba(76,125,255,0.16), transparent 60%)",
                    }}
                  />
                  <div className="relative flex items-start justify-between gap-6">
                    <span className="font-mono text-xs text-bone/35">0{idx + 1}</span>
                    <span className="grid size-10 place-items-center rounded-full border border-white/12 transition-all duration-500 group-hover:rotate-[-45deg] group-hover:border-accent group-hover:bg-accent group-hover:text-white">
                      <Arrow />
                    </span>
                  </div>

                  <div className={clsx("relative my-8 flex", big ? "flex-1 items-center justify-center" : "items-center")}>
                    {visuals[p.id]}
                  </div>

                  <div className="relative">
                    <h3 className={clsx("font-medium tracking-[-0.03em]", big ? "text-4xl md:text-5xl" : "text-2xl md:text-3xl")}>
                      {p.title}
                    </h3>
                    <p className="mt-3 max-w-[44ch] text-bone/55">{p.description}</p>
                    <ul className="mt-6 flex flex-wrap gap-1.5">
                      {chips.map((c) => (
                        <li
                          key={c}
                          className="rounded-full border border-white/10 px-2.5 py-1 font-mono text-[0.68rem] text-bone/60"
                        >
                          {c}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
