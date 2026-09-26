"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

const KEY = "sk-intro-seen";
const WORD = "SecureKnots";
const STEPS = ["Assess", "Certify", "Authorise", "Comply"];
const EXPO = [0.16, 1, 0.3, 1] as const;
const QUINT = [0.83, 0, 0.17, 1] as const;

/*
  Brand intro (first visit per session).
  A hairline draws across the screen while a precise counter runs; the wordmark rises
  letter by letter through a mask, a small ticker cycles the four verbs of the practice,
  then the screen splits open horizontally to reveal the site.
*/
export default function Preloader() {
  const [show, setShow] = useState(true);
  const [n, setN] = useState(0);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem(KEY) === "1";
    } catch {}
    if (seen || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const t = setTimeout(() => setShow(false), 0);
      return () => clearTimeout(t);
    }
    window.__lenis?.stop();
    const start = performance.now();
    const DUR = 2300;
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / DUR);
      // ease with a deliberate hesitation around 70% — feels like real work being done
      const e = p < 0.7 ? 0.82 * (1 - Math.pow(1 - p / 0.7, 3)) : 0.82 + 0.18 * Math.pow((p - 0.7) / 0.3, 2);
      setN(Math.round(e * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
      else {
        setExiting(true);
        setTimeout(() => {
          try {
            sessionStorage.setItem(KEY, "1");
          } catch {}
          setShow(false);
          window.__lenis?.start();
        }, 700);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const step = Math.min(STEPS.length - 1, Math.floor((n / 100) * STEPS.length));

  return (
    <AnimatePresence>
      {show && (
        <motion.div key="pre" className="fixed inset-0 z-[300]" aria-hidden exit={{ opacity: 1 }} transition={{ duration: 1.1 }}>
          {/* two halves that part */}
          {[0, 1].map((h) => (
            <motion.div
              key={h}
              className="absolute inset-x-0 bg-ink"
              style={{ top: h ? "50%" : 0, height: "50%" }}
              initial={{ y: 0 }}
              exit={{ y: h ? "100%" : "-100%" }}
              transition={{ duration: 1.05, ease: QUINT, delay: 0.05 }}
            />
          ))}

          <motion.div
            className="absolute inset-0"
            animate={exiting ? { opacity: 0, y: -20, filter: "blur(6px)" } : { opacity: 1 }}
            transition={{ duration: 0.6, ease: EXPO }}
          >
            {/* hairline grid */}
            <div className="absolute inset-0 grid-lines opacity-40 [mask-image:radial-gradient(ellipse_at_center,#000_20%,transparent_70%)]" />

            {/* wordmark */}
            <div className="absolute inset-0 grid place-items-center px-6">
              <div className="text-center">
                <p className="flex overflow-hidden text-[clamp(2.75rem,9vw,8.5rem)] font-medium leading-[1] tracking-[-0.055em] text-bone">
                  {WORD.split("").map((c, i) => (
                    <motion.span
                      key={i}
                      className={i >= 6 ? "text-bone/35" : undefined}
                      initial={{ y: "110%", rotate: 8 }}
                      animate={{ y: "0%", rotate: 0 }}
                      transition={{ duration: 1.1, ease: EXPO, delay: 0.15 + i * 0.045 }}
                    >
                      {c}
                    </motion.span>
                  ))}
                </p>
                <div className="mx-auto mt-6 h-px w-full max-w-[min(80vw,52rem)] bg-white/[0.08]">
                  <div className="h-full origin-left bg-accent" style={{ transform: `scaleX(${n / 100})` }} />
                </div>
                <div className="mt-6 flex h-5 items-center justify-center gap-3 overflow-hidden font-mono text-[0.7rem] uppercase tracking-[0.3em] text-bone/45">
                  <span className="size-1.5 rounded-full bg-accent" />
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={step}
                      initial={{ y: 14, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -14, opacity: 0 }}
                      transition={{ duration: 0.35, ease: EXPO }}
                    >
                      {STEPS[step]}
                    </motion.span>
                  </AnimatePresence>
                </div>
              </div>
            </div>

            {/* corners */}
            <div className="container-x absolute inset-x-0 top-0 flex justify-between pt-7 font-mono text-[0.68rem] uppercase tracking-[0.2em] text-bone/35">
              <span>Security by design</span>
              <span>Est. Delaware · Bengaluru</span>
            </div>
            <div className="container-x absolute inset-x-0 bottom-0 flex items-end justify-between pb-7">
              <span className="font-mono text-[0.68rem] uppercase tracking-[0.2em] text-bone/35">Loading experience</span>
              <span className="font-mono text-[clamp(1.5rem,3vw,2.5rem)] font-light tracking-[-0.04em] text-bone" style={{ fontVariantNumeric: "tabular-nums" }}>
                {String(n).padStart(3, "0")}
                <span className="text-bone/35">%</span>
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
