"use client";

import clsx from "clsx";
import { motion, useInView, type Variants } from "motion/react";
import { useRef } from "react";

const EASE = [0.16, 1, 0.3, 1] as const;

/** Fade-and-rise on enter. */
export function Reveal({
  children,
  delay = 0,
  y = 28,
  className,
  as = "div",
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: "div" | "li" | "section" | "p" | "span";
}) {
  const M = motion[as];
  return (
    <M
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 1.1, ease: EASE, delay }}
    >
      {children}
    </M>
  );
}

const lineVariants: Variants = {
  hidden: { y: "108%" },
  show: (i: number) => ({ y: "0%", transition: { duration: 1.15, ease: EASE, delay: i * 0.085 } }),
};

/**
 * Masked line-by-line headline reveal. Pass lines as an array so the break points
 * are art-directed rather than left to the browser.
 */
export function RevealLines({
  lines,
  className,
  lineClassName,
  delay = 0,
  immediate = false,
}: {
  lines: React.ReactNode[];
  className?: string;
  lineClassName?: string;
  delay?: number;
  immediate?: boolean;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const show = immediate || inView;
  return (
    <span ref={ref} className={clsx("block", className)}>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden pb-[0.08em] -mb-[0.08em]">
          <motion.span
            className={clsx("block will-change-transform", lineClassName)}
            variants={lineVariants}
            initial="hidden"
            animate={show ? "show" : "hidden"}
            custom={i + delay / 0.085}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

export function Eyebrow({
  children,
  className,
  dot = true,
}: {
  children: React.ReactNode;
  className?: string;
  dot?: boolean;
}) {
  return (
    <span className={clsx("eyebrow inline-flex items-center gap-2.5 text-fog", className)}>
      {dot && <span className="size-1.5 rounded-full bg-accent" />}
      {children}
    </span>
  );
}
