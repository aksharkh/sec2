"use client";

import Link from "next/link";
import clsx from "clsx";
import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Arrow } from "@/components/ui/Button";
import { useUI } from "@/components/providers/UIProvider";
import { frameworks } from "@/lib/site";

type Q = { id: string; q: string; hint: string; multi: boolean; options: { id: string; label: string }[] };

const QUESTIONS: Q[] = [
  {
    id: "market",
    q: "Where do you sell or operate?",
    hint: "Choose all that apply.",
    multi: true,
    options: [
      { id: "us-fed", label: "US federal government" },
      { id: "us-state", label: "US state & local government" },
      { id: "us", label: "US commercial" },
      { id: "eu", label: "European Union" },
      { id: "in", label: "India" },
      { id: "apac", label: "Singapore / APAC" },
    ],
  },
  {
    id: "industry",
    q: "Which best describes you?",
    hint: "Pick one.",
    multi: false,
    options: [
      { id: "saas", label: "SaaS / cloud" },
      { id: "fintech", label: "Fintech / payments" },
      { id: "health", label: "Healthcare / life sciences" },
      { id: "defense", label: "Defense / manufacturing" },
      { id: "bfsi", label: "Banking / insurance / securities" },
      { id: "ai", label: "AI / ML company" },
    ],
  },
  {
    id: "data",
    q: "What sensitive data do you handle?",
    hint: "Choose all that apply.",
    multi: true,
    options: [
      { id: "cards", label: "Payment card data" },
      { id: "phi", label: "Health information" },
      { id: "pii", label: "Consumer personal data" },
      { id: "cui", label: "Defense / controlled data (CUI)" },
      { id: "fin", label: "Customers' financial data" },
      { id: "ml", label: "AI models & training data" },
    ],
  },
  {
    id: "driver",
    q: "Who's asking for proof?",
    hint: "Choose all that apply.",
    multi: true,
    options: [
      { id: "enterprise", label: "Enterprise customers" },
      { id: "gov", label: "Government buyers" },
      { id: "regulator", label: "A regulator" },
      { id: "board", label: "Our board or investors" },
      { id: "proactive", label: "Nobody yet — we're getting ahead" },
    ],
  },
];

type Rec = { slug: string; level: "Essential" | "Recommended" | "Consider"; why: string };

function recommend(a: Record<string, string[]>): Rec[] {
  const has = (k: string, v: string) => a[k]?.includes(v);
  const out = new Map<string, Rec>();
  const add = (slug: string, level: Rec["level"], why: string) => {
    const prev = out.get(slug);
    const rank = { Essential: 0, Recommended: 1, Consider: 2 };
    if (!prev || rank[level] < rank[prev.level]) out.set(slug, { slug, level, why });
  };
  if (has("market", "us-fed")) add("fedramp", "Essential", "Cloud services sold to US federal agencies require FedRAMP authorisation.");
  if (has("market", "us-state")) add("stateramp", "Recommended", "Many state and local buyers require StateRAMP / GovRAMP status.");
  if (has("data", "cui") || has("industry", "defense")) {
    add("cmmc", "Essential", "DoD suppliers handling FCI or CUI need CMMC.");
    add("itar", "Consider", "Defense technical data may be ITAR-controlled.");
  }
  if (has("data", "cards") || has("industry", "fintech")) add("pci-dss", has("data", "cards") ? "Essential" : "Recommended", "Anyone storing, processing or transmitting card data must meet PCI DSS.");
  if (has("data", "phi") || has("industry", "health")) add("hipaa", "Essential", "Handling US health information for covered entities requires HIPAA safeguards.");
  if (has("market", "eu") && (has("data", "pii") || has("data", "phi"))) add("gdpr", "Essential", "Processing personal data of people in the EU brings GDPR obligations.");
  else if (has("market", "eu")) add("gdpr", "Recommended", "Operating in the EU usually involves some personal data processing.");
  if (has("market", "in") && (has("data", "pii") || has("data", "fin"))) add("dpdpa", "Essential", "India's DPDPA applies to digital personal data processed in India.");
  if (has("market", "in") && has("industry", "bfsi")) add("sebi-cscrf", "Recommended", "SEBI-regulated entities must meet the Cybersecurity & Cyber Resilience Framework.");
  if (has("market", "eu") && has("industry", "bfsi")) add("dora", "Essential", "EU financial entities and their ICT providers fall under DORA.");
  if (has("market", "apac")) add("pdpa", "Recommended", "Singapore's PDPA governs personal data collected there.");
  if (has("market", "us") && has("data", "pii")) add("ccpa", "Consider", "Large US consumer businesses may be subject to CCPA/CPRA.");
  if (has("driver", "enterprise") || has("industry", "saas")) {
    add("soc-2", has("market", "us") ? "Essential" : "Recommended", "Enterprise buyers — especially in the US — expect a SOC 2 report.");
    add("iso-27001", has("market", "eu") || has("market", "in") || has("market", "apac") ? "Essential" : "Recommended", "ISO 27001 is the default expectation outside the US.");
  }
  if (has("data", "fin")) add("soc-1", "Consider", "If you affect customers' financial reporting, their auditors may ask for SOC 1.");
  if (has("data", "ml") || has("industry", "ai")) add("iso-42001", "Recommended", "ISO 42001 gives buyers a certifiable answer on AI governance.");
  if ((has("data", "pii") || has("data", "phi")) && out.has("iso-27001")) add("iso-27701", "Consider", "Extend ISO 27001 to privacy and map it to GDPR and DPDPA.");
  if (has("driver", "board") || has("driver", "proactive")) add("nist-csf", "Recommended", "NIST CSF gives leadership a clear maturity picture and roadmap.");
  if (out.size >= 3) add("unified-audits", "Recommended", "With several frameworks, a unified audit programme avoids duplicate work.");
  if (out.size === 0) add("risk-assessment", "Essential", "Start with a risk assessment to decide which frameworks matter most.");
  const rank = { Essential: 0, Recommended: 1, Consider: 2 };
  return [...out.values()].sort((x, y) => rank[x.level] - rank[y.level]);
}

const EASE = [0.16, 1, 0.3, 1] as const;

export default function FrameworkFinder() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string[]>>({});
  const { openBooking } = useUI();
  const done = step >= QUESTIONS.length;
  const q = QUESTIONS[Math.min(step, QUESTIONS.length - 1)];
  const recs = useMemo(() => (done ? recommend(answers) : []), [done, answers]);
  const sel = answers[q.id] ?? [];

  const toggle = (id: string) => {
    setAnswers((a) => {
      const cur = a[q.id] ?? [];
      const next = q.multi ? (cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id]) : [id];
      return { ...a, [q.id]: next };
    });
    if (!q.multi) setTimeout(() => setStep((s) => s + 1), 280);
  };

  return (
    <div className="rounded-[28px] border border-white/[0.08] bg-ink-2 p-6 sm:p-10 md:p-14">
      <div className="flex items-center justify-between gap-6">
        <p className="font-mono text-xs uppercase tracking-widest text-bone/45">
          {done ? "Your results" : `Question ${step + 1} of ${QUESTIONS.length}`}
        </p>
        <div className="flex flex-1 max-w-xs gap-1.5">
          {QUESTIONS.map((_, i) => (
            <span key={i} className="h-1 flex-1 overflow-hidden rounded-full bg-white/10">
              <motion.span className="block h-full bg-accent" initial={false} animate={{ width: i < step ? "100%" : "0%" }} transition={{ duration: 0.5, ease: EASE }} />
            </span>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {!done ? (
          <motion.div key={q.id} initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={{ duration: 0.5, ease: EASE }} className="mt-10">
            <h2 className="text-[clamp(2rem,4vw,3.5rem)] font-medium leading-[1] tracking-[-0.04em]">{q.q}</h2>
            <p className="mt-3 text-bone/50">{q.hint}</p>
            <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {q.options.map((o, i) => {
                const on = sel.includes(o.id);
                return (
                  <motion.button
                    key={o.id}
                    type="button"
                    aria-pressed={on}
                    onClick={() => toggle(o.id)}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05, duration: 0.5, ease: EASE }}
                    className={clsx(
                      "group flex min-h-[96px] items-center justify-between gap-4 rounded-2xl border p-6 text-left text-lg font-medium tracking-tight transition-colors duration-300",
                      on ? "border-accent bg-accent text-white" : "border-white/10 text-bone/85 hover:border-white/30 hover:bg-white/[0.03]",
                    )}
                  >
                    {o.label}
                    <span className={clsx("grid size-7 shrink-0 place-items-center rounded-full border transition-all", on ? "border-white bg-white text-accent" : "border-white/20")}>
                      {on && <svg viewBox="0 0 12 12" className="size-3" aria-hidden><path d="M2.5 6.5 5 9l4.5-5.5" stroke="currentColor" strokeWidth="1.8" fill="none" /></svg>}
                    </span>
                  </motion.button>
                );
              })}
            </div>
            <div className="mt-10 flex items-center justify-between">
              <button type="button" onClick={() => setStep((s) => Math.max(0, s - 1))} disabled={step === 0} className="text-sm text-bone/50 hover:text-bone disabled:opacity-30">
                ← Back
              </button>
              {q.multi && (
                <button
                  type="button"
                  onClick={() => setStep((s) => s + 1)}
                  disabled={sel.length === 0}
                  className="inline-flex h-12 items-center gap-3 rounded-full bg-bone px-6 font-medium text-ink transition hover:bg-accent hover:text-white disabled:opacity-30"
                >
                  {step === QUESTIONS.length - 1 ? "See my frameworks" : "Next"} <Arrow />
                </button>
              )}
            </div>
          </motion.div>
        ) : (
          <motion.div key="results" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: EASE }} className="mt-10">
            <h2 className="text-[clamp(2rem,4vw,3.5rem)] font-medium leading-[1] tracking-[-0.04em]">
              Your framework <span className="font-serif font-normal italic text-ice">roadmap.</span>
            </h2>
            <p className="mt-3 max-w-[60ch] text-bone/55">A starting point based on your answers. We&apos;ll confirm scope and order on a call.</p>
            <ul className="mt-10 space-y-3">
              {recs.map((r, i) => {
                const f = frameworks.find((x) => x.slug === r.slug)!;
                return (
                  <motion.li key={r.slug} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 + i * 0.07, duration: 0.6, ease: EASE }}>
                    <Link href={`/compliance/${r.slug}`} className="group grid items-center gap-4 rounded-2xl border border-white/[0.08] p-5 transition-colors hover:border-accent/60 md:grid-cols-[9rem_14rem_1fr_auto] md:p-6">
                      <span
                        className={clsx(
                          "w-fit rounded-full px-3 py-1 font-mono text-[0.65rem] uppercase tracking-widest",
                          r.level === "Essential" ? "bg-accent text-white" : r.level === "Recommended" ? "border border-ice/50 text-ice" : "border border-white/15 text-bone/55",
                        )}
                      >
                        {r.level}
                      </span>
                      <span className="text-2xl font-medium tracking-tight">{f.name}</span>
                      <span className="text-bone/55">{r.why}</span>
                      <Arrow className="hidden text-ice transition-transform group-hover:translate-x-1 md:block" />
                    </Link>
                  </motion.li>
                );
              })}
            </ul>
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => openBooking({ topic: frameworks.find((x) => x.slug === recs[0]?.slug)?.name })}
                className="inline-flex h-14 items-center gap-3 rounded-full bg-accent px-7 font-medium text-white shadow-[0_10px_30px_-10px_rgba(76,125,255,0.8)] hover:bg-bone hover:text-ink"
              >
                Review this roadmap with an expert <Arrow />
              </button>
              <button
                type="button"
                onClick={() => {
                  setAnswers({});
                  setStep(0);
                }}
                className="h-14 rounded-full border border-white/15 px-7 text-bone/80 hover:border-white/40"
              >
                Start over
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
