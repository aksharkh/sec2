"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

const KEY = "sk-consent-v1";

export default function CookieBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    let seen: string | null = null;
    try {
      seen = localStorage.getItem(KEY);
    } catch {}
    if (seen) return;
    const t = setTimeout(() => setShow(true), 3200);
    return () => clearTimeout(t);
  }, []);

  const choose = (v: "all" | "essential") => {
    try {
      localStorage.setItem(KEY, JSON.stringify({ v, at: Date.now() }));
    } catch {}
    setShow(false);
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          role="dialog"
          aria-label="Cookie preferences"
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 40, opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-4 left-4 right-4 z-[90] max-w-md rounded-2xl border border-white/10 bg-ink-2/90 p-5 shadow-2xl backdrop-blur-xl sm:right-auto"
        >
          <p className="text-sm font-medium text-bone">We respect your privacy.</p>
          <p className="mt-1.5 text-sm leading-relaxed text-bone/60">
            We use essential cookies to run this site and optional analytics to improve it. See our{" "}
            <Link href="/cookies" className="text-ice underline">cookie policy</Link>.
          </p>
          <div className="mt-4 flex gap-2">
            <button type="button" onClick={() => choose("essential")} className="h-9 flex-1 rounded-full border border-white/15 text-sm text-bone/80 hover:border-white/40">
              Essential only
            </button>
            <button type="button" onClick={() => choose("all")} className="h-9 flex-1 rounded-full bg-accent text-sm font-medium text-white hover:bg-bone hover:text-ink">
              Accept all
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
