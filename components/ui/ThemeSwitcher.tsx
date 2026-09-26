"use client";

import clsx from "clsx";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

// Preview tool: swaps the accent palette site-wide by overriding the CSS colour tokens.
// Remove <ThemeSwitcher /> from app/layout.tsx before launch.
export const THEMES = [
  { id: "cobalt", name: "Cobalt", accent: "#4c7dff", deep: "#2448e0", ice: "#a9c2ff" },
  { id: "indigo", name: "Indigo", accent: "#6366f1", deep: "#4338ca", ice: "#c7d2fe" },
  { id: "sky", name: "Arctic Sky", accent: "#0ea5e9", deep: "#0369a1", ice: "#bae6fd" },
  { id: "cyan", name: "Signal Cyan", accent: "#06b6d4", deep: "#0e7490", ice: "#a5f3fc" },
  { id: "teal", name: "Deep Teal", accent: "#14b8a6", deep: "#0f766e", ice: "#99f6e4" },
  { id: "violet", name: "Royal Violet", accent: "#8b5cf6", deep: "#6d28d9", ice: "#ddd6fe" },
  { id: "crimson", name: "Crimson", accent: "#e5484d", deep: "#b4232a", ice: "#fecaca" },
  { id: "amber", name: "Amber Gold", accent: "#e0a526", deep: "#9a6a0b", ice: "#fde68a" },
  { id: "copper", name: "Copper", accent: "#f06d2e", deep: "#b8471a", ice: "#fed7aa" },
  { id: "steel", name: "Steel", accent: "#6b7f99", deep: "#334155", ice: "#cbd5e1" },
] as const;

const KEY = "sk-theme";

function apply(id: string) {
  const t = THEMES.find((x) => x.id === id) ?? THEMES[0];
  const r = document.documentElement.style;
  r.setProperty("--color-accent", t.accent);
  r.setProperty("--color-accent-deep", t.deep);
  r.setProperty("--color-ice", t.ice);
  window.dispatchEvent(new CustomEvent("sk-theme", { detail: t }));
}

export default function ThemeSwitcher() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("cobalt");

  useEffect(() => {
    let saved = "cobalt";
    try {
      saved = localStorage.getItem(KEY) || "cobalt";
    } catch {}
    apply(saved);
    const t = setTimeout(() => setActive(saved), 0);
    return () => clearTimeout(t);
  }, []);

  const choose = (id: string) => {
    setActive(id);
    apply(id);
    try {
      localStorage.setItem(KEY, id);
    } catch {}
  };

  return (
    <div className="fixed bottom-5 right-5 z-[95]" data-lenis-prevent>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.96 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="absolute bottom-16 right-0 w-72 rounded-2xl border border-white/10 bg-ink-2/95 p-4 shadow-2xl backdrop-blur-xl"
          >
            <p className="eyebrow mb-3 text-fog">Colour theme · preview</p>
            <ul className="grid grid-cols-2 gap-1.5">
              {THEMES.map((t) => (
                <li key={t.id}>
                  <button
                    type="button"
                    onClick={() => choose(t.id)}
                    aria-pressed={active === t.id}
                    className={clsx(
                      "flex w-full items-center gap-2.5 rounded-xl border px-2.5 py-2 text-left text-sm transition-colors",
                      active === t.id ? "border-white/40 bg-white/[0.06] text-bone" : "border-transparent text-bone/70 hover:bg-white/[0.04]",
                    )}
                  >
                    <span className="flex shrink-0 -space-x-1.5">
                      {[t.deep, t.accent, t.ice].map((c) => (
                        <span key={c} className="size-4 rounded-full ring-2 ring-ink-2" style={{ background: c }} />
                      ))}
                    </span>
                    {t.name}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label="Change colour theme"
        aria-expanded={open}
        className="grid size-12 place-items-center rounded-full border border-white/15 bg-ink-2/90 shadow-xl backdrop-blur transition hover:scale-105"
      >
        <span className="size-6 rounded-full" style={{ background: "conic-gradient(#4c7dff,#8b5cf6,#e5484d,#e0a526,#14b8a6,#0ea5e9,#4c7dff)" }} />
      </button>
    </div>
  );
}
