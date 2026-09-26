"use client";

import Link from "next/link";
import clsx from "clsx";
import { useRef } from "react";
import { motion, useTransform } from "motion/react";
import { useProgress } from "@/lib/useProgress";
import { RevealLines } from "@/components/ui/Reveal";

const EASE = [0.16, 1, 0.3, 1] as const;

function Rings() {
  return (
    <svg viewBox="0 0 600 600" className="size-full" aria-hidden>
      {Array.from({ length: 26 }).map((_, i) => (
        <ellipse
          key={i}
          cx="300"
          cy="300"
          rx={280 - i * 5}
          ry={90 + i * 6}
          transform={`rotate(${i * 7} 300 300)`}
          fill="none"
          stroke="currentColor"
          strokeWidth="0.6"
        />
      ))}
    </svg>
  );
}

/** Shared inner-page hero: breadcrumbs, masked headline, lede, actions and a parallax line-art knot. */
export default function PageHero({
  eyebrow,
  title,
  lede,
  crumbs = [],
  children,
  aside,
  tone = "ink",
  size = "lg",
}: {
  eyebrow: string;
  title: React.ReactNode[];
  lede?: React.ReactNode;
  crumbs?: { label: string; href: string }[];
  children?: React.ReactNode;
  aside?: React.ReactNode;
  tone?: "ink" | "cobalt";
  size?: "lg" | "xl";
}) {
  const ref = useRef<HTMLElement>(null);
  const p = useProgress(ref, ["start start", "end start"]);
  const y = useTransform(p, [0, 1], ["0%", "30%"]);
  const rot = useTransform(p, [0, 1], [0, 40]);
  const o = useTransform(p, [0, 0.8], [1, 0]);

  return (
    <section
      ref={ref}
      className={clsx(
        "grain relative isolate overflow-hidden pb-20 pt-36 md:pb-28 md:pt-44",
        tone === "cobalt" ? "bg-[radial-gradient(ellipse_at_70%_0%,#4c7dff_0%,#2448e0_35%,#0b1638_75%,#08090b_100%)]" : "bg-ink",
      )}
    >
      <div aria-hidden className="grid-lines absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_70%_30%,#000_10%,transparent_70%)]" />
      {tone === "ink" && <div aria-hidden className="absolute -right-[15%] -top-[20%] -z-10 size-[55vw] rounded-full bg-accent/[0.12] blur-[140px]" />}
      <motion.div
        aria-hidden
        style={{ y, rotate: rot }}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.6, ease: EASE }}
        className="absolute -right-[12vw] top-[4vh] -z-10 size-[64vw] max-w-[900px] text-ice/25 md:size-[48vw]"
      >
        <Rings />
      </motion.div>

      <motion.div style={{ opacity: o }} className="container-x">
        {crumbs.length > 0 && (
          <motion.nav
            aria-label="Breadcrumb"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
            className="mb-10 flex flex-wrap items-center gap-2 font-mono text-[0.7rem] uppercase tracking-[0.14em] text-bone/40"
          >
            <Link href="/" className="hover:text-bone">Home</Link>
            {crumbs.map((c) => (
              <span key={c.href} className="flex items-center gap-2">
                <span>/</span>
                <Link href={c.href} className="hover:text-bone">{c.label}</Link>
              </span>
            ))}
          </motion.nav>
        )}
        <div className={clsx("grid gap-12", aside && "lg:grid-cols-12 lg:items-end")}>
          <div className={clsx(aside && "lg:col-span-7")}>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: EASE, delay: 0.15 }}
              className="eyebrow inline-flex items-center gap-2.5 text-bone/60"
            >
              <span className="size-1.5 rounded-full bg-accent" />
              {eyebrow}
            </motion.p>
            <h1
              className={clsx(
                "mt-6 font-medium leading-[0.92] tracking-[-0.05em] text-balance",
                size === "xl" ? "text-[length:var(--text-display)]" : "text-[length:var(--text-hero)]",
              )}
            >
              <RevealLines immediate delay={0.2} lines={title} />
            </h1>
            {lede && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: EASE, delay: 0.55 }}
                className="mt-8 max-w-[52ch] text-[length:var(--text-lede)] leading-relaxed text-bone/65 text-pretty"
              >
                {lede}
              </motion.div>
            )}
            {children && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: EASE, delay: 0.7 }}
                className="mt-10 flex flex-wrap items-center gap-3"
              >
                {children}
              </motion.div>
            )}
          </div>
          {aside && (
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, ease: EASE, delay: 0.6 }}
              className="lg:col-span-5"
            >
              {aside}
            </motion.div>
          )}
        </div>
      </motion.div>
    </section>
  );
}
