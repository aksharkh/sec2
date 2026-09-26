"use client";

import clsx from "clsx";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Field } from "@/components/overlays/BookingModal";

const REASONS = ["New compliance programme", "Audit readiness", "Security testing", "Partnership", "Something else"];
const EASE = [0.16, 1, 0.3, 1] as const;

export default function ContactForm() {
  const [reason, setReason] = useState(REASONS[0]);
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [error, setError] = useState("");

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());
    setState("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, topics: [reason], source: "contact-page" }),
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
    <div className="relative rounded-3xl border border-white/[0.08] bg-ink-2 p-6 sm:p-10">
      <AnimatePresence mode="wait">
        {state === "done" ? (
          <motion.div key="ok" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="flex min-h-[480px] flex-col justify-center">
            <motion.svg viewBox="0 0 52 52" className="size-16 text-accent" aria-hidden>
              <motion.circle cx="26" cy="26" r="24" fill="none" stroke="currentColor" strokeWidth="2" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.8, ease: EASE }} />
              <motion.path d="M15 27l7 7 15-16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.5, delay: 0.6 }} />
            </motion.svg>
            <h2 className="mt-8 text-4xl font-medium tracking-tight">Thank you.</h2>
            <p className="mt-3 max-w-[40ch] text-lg text-bone/60">We&apos;ve got your message. A practitioner will reply within one business day.</p>
          </motion.div>
        ) : (
          <motion.form key="f" onSubmit={submit} className="space-y-6" exit={{ opacity: 0 }}>
            <fieldset>
              <legend className="eyebrow mb-3 text-fog">I&apos;m interested in</legend>
              <div className="flex flex-wrap gap-2">
                {REASONS.map((r) => (
                  <button
                    key={r}
                    type="button"
                    aria-pressed={reason === r}
                    onClick={() => setReason(r)}
                    className={clsx("rounded-full border px-4 py-2 text-sm transition-colors", reason === r ? "border-accent bg-accent text-white" : "border-white/12 text-bone/70 hover:border-white/30")}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </fieldset>
            <div className="grid gap-5 sm:grid-cols-2">
              <Field name="name" label="Full name" required autoComplete="name" />
              <Field name="email" type="email" label="Work email" required autoComplete="email" />
              <Field name="company" label="Company" autoComplete="organization" />
              <Field name="phone" type="tel" label="Phone" autoComplete="tel" />
            </div>
            <label className="block">
              <span className="eyebrow mb-2 block text-fog">How can we help?</span>
              <textarea
                name="message"
                rows={5}
                required
                className="w-full resize-none rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-bone outline-none transition focus:border-accent focus:bg-white/[0.05]"
              />
            </label>
            <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
            {state === "error" && <p className="text-sm text-red-300">{error}</p>}
            <button
              type="submit"
              disabled={state === "sending"}
              className="group inline-flex h-14 w-full items-center justify-center gap-3 rounded-full bg-accent font-medium text-white shadow-[0_10px_30px_-10px_rgba(76,125,255,0.8)] transition hover:bg-bone hover:text-ink disabled:opacity-60 sm:w-auto sm:px-8"
            >
              {state === "sending" ? "Sending…" : "Send message"}
              <svg viewBox="0 0 16 16" className="size-3.5 transition-transform group-hover:translate-x-1" aria-hidden><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" fill="none" /></svg>
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
