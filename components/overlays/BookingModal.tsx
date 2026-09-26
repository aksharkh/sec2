"use client";

import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { KnotMark } from "@/components/ui/Logo";
import { site } from "@/lib/site";

const TOPICS = ["SOC 2", "ISO 27001", "PCI DSS", "FedRAMP", "CMMC", "HIPAA", "GDPR", "DPDPA", "ISO 42001", "Pentesting", "Not sure yet"];
const EASE = [0.16, 1, 0.3, 1] as const;

export default function BookingModal({ open, topic, onClose }: { open: boolean; topic?: string; onClose: () => void }) {
  return (
    <AnimatePresence>
      {open && <Dialog key="booking" topic={topic} onClose={onClose} />}
    </AnimatePresence>
  );
}

function Dialog({ topic, onClose }: { topic?: string; onClose: () => void }) {
  const [picked, setPicked] = useState<string[]>(topic ? [topic] : []);
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [error, setError] = useState("");
  const first = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const t = setTimeout(() => first.current?.focus(), 350);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      clearTimeout(t);
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());
    setState("sending");
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, topics: picked, source: "booking-modal" }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Something went wrong");
      setState("done");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setState("error");
    }
  }

  return (
    <motion.div className="fixed inset-0 z-[120] flex items-end justify-center sm:items-center sm:p-6" role="dialog" aria-modal="true" aria-labelledby="book-title" data-lenis-prevent>
      <motion.button
        type="button"
        aria-label="Close"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-ink/70 backdrop-blur-md"
      />
      <motion.div
        initial={{ y: 60, opacity: 0, scale: 0.97 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 40, opacity: 0, scale: 0.98, transition: { duration: 0.25 } }}
        transition={{ duration: 0.7, ease: EASE }}
        className="relative grid max-h-[92svh] w-full max-w-5xl overflow-hidden rounded-t-3xl border border-white/10 bg-ink-2 shadow-2xl sm:rounded-3xl md:grid-cols-[0.9fr_1.1fr]"
      >
        {/* Left panel */}
        <div className="relative hidden overflow-hidden bg-accent-deep p-10 md:flex md:flex-col md:justify-between">
          <KnotMark className="pointer-events-none absolute -bottom-24 -right-24 size-96 text-white/15" />
          <div aria-hidden className="absolute inset-0 grid-lines opacity-40" />
          <div className="relative">
            <p className="eyebrow text-white/70">Book a consultation</p>
            <h2 id="book-title" className="mt-5 text-4xl font-medium leading-[1] tracking-[-0.04em] text-white">
              30 minutes with a <span className="font-serif italic">practitioner.</span>
            </h2>
          </div>
          <ul className="relative space-y-4 text-white/85">
            {["Which frameworks apply — and in what order", "A realistic timeline and effort estimate", "Where your existing work can be reused"].map((t) => (
              <li key={t} className="flex gap-3 text-[0.95rem]">
                <span className="mt-2 size-1.5 shrink-0 rounded-full bg-white" />
                {t}
              </li>
            ))}
          </ul>
          <p className="relative font-mono text-xs text-white/60">No sales script. No obligation.</p>
        </div>

        {/* Form */}
        <div className="relative overflow-y-auto p-6 sm:p-10">
          <button
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            className="absolute right-5 top-5 grid size-10 place-items-center rounded-full border border-white/12 text-bone/70 transition hover:rotate-90 hover:border-white/40 hover:text-bone"
          >
            <svg viewBox="0 0 12 12" className="size-3" aria-hidden><path d="M2 2l8 8M10 2l-8 8" stroke="currentColor" strokeWidth="1.5" /></svg>
          </button>

          <AnimatePresence mode="wait">
            {state === "done" ? (
              <motion.div key="done" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex min-h-[420px] flex-col items-start justify-center">
                <motion.svg viewBox="0 0 52 52" className="size-16 text-accent" aria-hidden>
                  <motion.circle cx="26" cy="26" r="24" fill="none" stroke="currentColor" strokeWidth="2" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.8, ease: EASE }} />
                  <motion.path d="M15 27l7 7 15-16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.5, delay: 0.6 }} />
                </motion.svg>
                <h3 className="mt-8 text-3xl font-medium tracking-tight">Request received.</h3>
                <p className="mt-3 max-w-[40ch] text-bone/60">A SecureKnots practitioner will reply within one business day to find a time that suits you.</p>
                <button type="button" onClick={onClose} className="mt-8 rounded-full bg-bone px-6 py-3 text-sm font-medium text-ink">Close</button>
              </motion.div>
            ) : (
              <motion.form key="form" onSubmit={submit} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-6">
                <div className="md:hidden">
                  <p className="eyebrow text-ice">Book a consultation</p>
                  <h2 className="mt-3 text-3xl font-medium tracking-tight">Talk to a practitioner.</h2>
                </div>
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field ref={first} name="name" label="Full name" required autoComplete="name" />
                  <Field name="email" type="email" label="Work email" required autoComplete="email" />
                  <Field name="company" label="Company" required autoComplete="organization" />
                  <Field name="phone" type="tel" label="Phone (optional)" autoComplete="tel" />
                </div>
                <fieldset>
                  <legend className="eyebrow mb-3 text-fog">What are you working on?</legend>
                  <div className="flex flex-wrap gap-2">
                    {TOPICS.map((t) => {
                      const on = picked.includes(t);
                      return (
                        <button
                          key={t}
                          type="button"
                          aria-pressed={on}
                          onClick={() => setPicked((p) => (on ? p.filter((x) => x !== t) : [...p, t]))}
                          className={clsx(
                            "rounded-full border px-3.5 py-1.5 text-sm transition-colors",
                            on ? "border-accent bg-accent text-white" : "border-white/12 text-bone/70 hover:border-white/30 hover:text-bone",
                          )}
                        >
                          {t}
                        </button>
                      );
                    })}
                  </div>
                </fieldset>
                <label className="block">
                  <span className="eyebrow mb-2 block text-fog">Anything we should know?</span>
                  <textarea
                    name="message"
                    rows={3}
                    className="w-full resize-none rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-bone outline-none transition focus:border-accent focus:bg-white/[0.05]"
                    placeholder="Deadlines, customers asking, current certifications…"
                  />
                </label>
                {/* honeypot */}
                <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
                {state === "error" && <p className="text-sm text-red-300">{error}</p>}
                <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                  <p className="max-w-[36ch] text-xs text-bone/40">
                    By submitting you agree to our privacy policy. Prefer email? <a href={`mailto:${site.email}`} className="underline">{site.email}</a>
                  </p>
                  <button
                    type="submit"
                    disabled={state === "sending"}
                    className="group inline-flex h-12 items-center gap-3 rounded-full bg-accent px-6 font-medium text-white shadow-[0_10px_30px_-10px_rgba(76,125,255,0.8)] transition hover:bg-bone hover:text-ink disabled:opacity-60"
                  >
                    {state === "sending" ? "Sending…" : "Request a call"}
                    <svg viewBox="0 0 16 16" className="size-3.5 transition-transform group-hover:translate-x-1" aria-hidden><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" fill="none" /></svg>
                  </button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
}

type FieldProps = React.InputHTMLAttributes<HTMLInputElement> & { label: string; ref?: React.Ref<HTMLInputElement> };

export function Field({ label, ref, className, ...props }: FieldProps) {
  return (
    <label className={clsx("group block", className)}>
      <span className="eyebrow mb-2 block text-fog">{label}</span>
      <input
        ref={ref}
        {...props}
        className="h-12 w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 text-bone outline-none transition placeholder:text-bone/30 focus:border-accent focus:bg-white/[0.05]"
      />
    </label>
  );
}
