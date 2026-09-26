"use client";

import { useProgress } from "@/lib/useProgress";
import clsx from "clsx";
import { useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useSpring, useTransform } from "motion/react";
import { Eyebrow } from "@/components/ui/Reveal";

const STEPS = [
  {
    k: "Assess",
    title: "Map where you stand.",
    body: "Scoping, gap assessment and risk analysis across every framework on your roadmap — one fieldwork cycle, one prioritised plan.",
    out: ["Scope & boundary", "Gap report", "Unified control set"],
  },
  {
    k: "Build",
    title: "Close the gaps, once.",
    body: "Policies, procedures and technical controls implemented alongside your engineers — designed to satisfy many frameworks at the same time.",
    out: ["Policy suite", "Control implementation", "Evidence library"],
  },
  {
    k: "Prove",
    title: "Walk into the audit ready.",
    body: "Readiness reviews, penetration testing and audit support through SOC 2, ISO, PCI, FedRAMP 3PAO or CMMC C3PAO assessments.",
    out: ["Readiness review", "Pentest report", "Audit support"],
  },
  {
    k: "Sustain",
    title: "Stay compliant between audits.",
    body: "Continuous monitoring, quarterly control testing and surveillance audit support — so compliance never becomes a fire drill again.",
    out: ["Continuous monitoring", "Quarterly reviews", "Surveillance audits"],
  },
];

function trefoil(steps = 400) {
  let d = "";
  for (let i = 0; i <= steps; i++) {
    const t = (i / steps) * Math.PI * 2;
    const x = 200 + (Math.sin(t) + 2 * Math.sin(2 * t)) * 52;
    const y = 200 - (Math.cos(t) - 2 * Math.cos(2 * t)) * 52;
    d += `${i ? "L" : "M"}${x.toFixed(1)} ${y.toFixed(1)}`;
  }
  return d;
}
const PATH = trefoil();

export default function Process() {
  const ref = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const scrollYProgress = useProgress(ref, ["start start", "end end"]);
  const smooth = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  const draw = useTransform(smooth, [0.02, 0.92], [0, 1]);
  const spin = useTransform(smooth, [0, 1], [-30, 90]);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setActive(Math.min(STEPS.length - 1, Math.floor(v * STEPS.length * 0.999)));
  });

  const step = STEPS[active];

  return (
    <section ref={ref} className="relative bg-ink-2" style={{ height: `${STEPS.length * 85 + 40}vh` }} aria-labelledby="process-title">
      <div className="sticky top-0 flex h-[100svh] items-center overflow-hidden">
        <div aria-hidden className="grid-lines absolute inset-0 opacity-60 [mask-image:linear-gradient(to_bottom,transparent,#000_30%,#000_70%,transparent)]" />
        <div className="container-x relative grid items-center gap-10 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <Eyebrow>How we work</Eyebrow>
            <h2 id="process-title" className="sr-only">How we work: Assess, Build, Prove, Sustain</h2>

            <div className="mt-8 flex gap-2" role="tablist" aria-label="Process steps">
              {STEPS.map((s, i) => (
                <span
                  key={s.k}
                  role="tab"
                  aria-selected={i === active}
                  className={clsx(
                    "rounded-full border px-3.5 py-1.5 font-mono text-[0.7rem] uppercase tracking-widest transition-all duration-500",
                    i === active
                      ? "border-accent bg-accent text-white"
                      : i < active
                        ? "border-white/20 text-bone/70"
                        : "border-white/10 text-bone/35",
                  )}
                >
                  {s.k}
                </span>
              ))}
            </div>

            <div className="relative mt-10 min-h-[360px] md:min-h-[340px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: 30, filter: "blur(6px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -30, filter: "blur(6px)" }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                  <p className="font-mono text-sm text-ice">0{active + 1} / 0{STEPS.length}</p>
                  <p className="mt-4 text-[clamp(2.25rem,4.6vw,4.5rem)] font-medium leading-[0.98] tracking-[-0.04em]">
                    {step.title}
                  </p>
                  <p className="mt-6 max-w-[48ch] text-lg leading-relaxed text-bone/60">{step.body}</p>
                  <ul className="mt-8 flex flex-wrap gap-2">
                    {step.out.map((o) => (
                      <li key={o} className="flex items-center gap-2 rounded-full bg-white/[0.05] px-3.5 py-2 text-sm text-bone/80">
                        <svg viewBox="0 0 12 12" className="size-3 text-ice" aria-hidden>
                          <path d="M2 6.5 5 9l5-6" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" />
                        </svg>
                        {o}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          <div className="relative hidden aspect-square w-full max-w-[560px] justify-self-end lg:col-span-6 lg:block">
            <motion.svg viewBox="0 0 400 400" className="absolute inset-0 size-full" style={{ rotate: spin }} aria-hidden>
              <path d={PATH} fill="none" stroke="rgba(241,239,232,0.07)" strokeWidth="18" strokeLinejoin="round" />
              <motion.path
                d={PATH}
                fill="none"
                stroke="#7fa0ff"
                strokeWidth="2"
                strokeLinecap="round"
                style={{ pathLength: draw }}
              />
              <motion.path
                d={PATH}
                fill="none"
                stroke="rgba(76,125,255,0.4)"
                strokeWidth="14"
                strokeLinecap="round"
                style={{ pathLength: draw, filter: "blur(8px)" }}
              />
            </motion.svg>
            <div className="absolute inset-0 grid place-items-center">
              <div className="text-center">
                <p className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-bone/40">Programme</p>
                <motion.p className="mt-2 text-6xl font-medium tracking-tight" style={{ fontVariantNumeric: "tabular-nums" }}>
                  {Math.round(((active + 1) / STEPS.length) * 100)}%
                </motion.p>
              </div>
            </div>
          </div>
        </div>

        {/* progress rail */}
        <div className="absolute bottom-10 left-1/2 hidden h-px w-[min(560px,60vw)] -translate-x-1/2 bg-white/10 md:block">
          <motion.div className="h-full origin-left bg-accent" style={{ scaleX: smooth }} />
        </div>
      </div>
    </section>
  );
}
