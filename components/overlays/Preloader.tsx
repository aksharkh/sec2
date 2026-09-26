"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

function trefoil() {
  let d = "";
  for (let i = 0; i <= 240; i++) {
    const t = (i / 240) * Math.PI * 2;
    d += `${i ? "L" : "M"}${(50 + (Math.sin(t) + 2 * Math.sin(2 * t)) * 13).toFixed(2)} ${(50 - (Math.cos(t) - 2 * Math.cos(2 * t)) * 13).toFixed(2)}`;
  }
  return d;
}
const PATH = trefoil();
const KEY = "sk-intro-seen";

/** First-visit intro: the knot draws itself while a counter runs, then the curtain lifts. */
export default function Preloader() {
  const [show, setShow] = useState(true);
  const [n, setN] = useState(0);

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem(KEY) === "1";
    } catch {}
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (seen || reduce) {
      const t = setTimeout(() => setShow(false), 0);
      return () => clearTimeout(t);
    }
    window.__lenis?.stop();
    const start = performance.now();
    const DUR = 1900;
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / DUR);
      setN(Math.round((1 - Math.pow(1 - p, 3)) * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
      else
        setTimeout(() => {
          try {
            sessionStorage.setItem(KEY, "1");
          } catch {}
          setShow(false);
          window.__lenis?.start();
        }, 250);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="pre"
          className="fixed inset-0 z-[300] flex items-center justify-center bg-ink"
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 1, ease: [0.83, 0, 0.17, 1] }}
          initial={{ clipPath: "inset(0 0 0% 0)" }}
          aria-hidden
        >
          <div className="flex flex-col items-center">
            <svg viewBox="0 0 100 100" className="size-28 md:size-36">
              <path d={PATH} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="2.2" />
              <motion.path
                d={PATH}
                fill="none"
                stroke="#4c7dff"
                strokeWidth="2.2"
                strokeLinecap="round"
                style={{ pathLength: n / 100 }}
              />
            </svg>
            <p className="mt-8 font-mono text-xs uppercase tracking-[0.3em] text-bone/50">SecureKnots</p>
          </div>
          <p className="absolute bottom-8 right-8 font-mono text-[clamp(3rem,10vw,8rem)] font-light leading-none tracking-[-0.06em] text-bone/90" style={{ fontVariantNumeric: "tabular-nums" }}>
            {String(n).padStart(3, "0")}
          </p>
          <p className="absolute bottom-10 left-8 max-w-[22ch] text-sm text-bone/40">Tying frameworks together…</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
