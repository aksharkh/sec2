"use client";

import Link from "next/link";
import clsx from "clsx";
import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

type Variant = "accent" | "ghost" | "light" | "dark";

const styles: Record<Variant, string> = {
  accent: "bg-accent text-white hover:bg-bone hover:text-ink shadow-[0_10px_30px_-10px_rgba(76,125,255,0.7)]",
  light: "bg-bone text-ink hover:bg-accent hover:text-white",
  dark: "bg-ink text-bone hover:bg-ink-3",
  ghost: "border border-white/15 text-bone hover:border-white/40 hover:bg-white/[0.04]",
};

export function Arrow({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden className={clsx("size-3.5", className)}>
      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Pill button with a magnetic pull and an arrow that slides through on hover. */
export default function Button({
  href,
  children,
  variant = "accent",
  size = "md",
  className,
  magnetic = true,
  arrow = true,
}: {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  size?: "sm" | "md" | "lg";
  className?: string;
  magnetic?: boolean;
  arrow?: boolean;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 18, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 220, damping: 18, mass: 0.4 });

  function onMove(e: React.PointerEvent) {
    if (!magnetic || e.pointerType !== "mouse" || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * 0.22);
    y.set((e.clientY - (r.top + r.height / 2)) * 0.3);
  }
  function onLeave() {
    x.set(0);
    y.set(0);
  }

  const sizes = {
    sm: "h-9 px-4 text-[0.82rem] gap-2",
    md: "h-12 px-6 text-[0.92rem] gap-3",
    lg: "h-14 px-7 text-base gap-3",
  }[size];

  return (
    <motion.span style={{ x: sx, y: sy }} className="inline-flex">
      <Link
        ref={ref}
        href={href}
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        data-cursor="hover"
        className={clsx(
          "group relative inline-flex items-center justify-center overflow-hidden rounded-full font-medium tracking-tight transition-colors duration-300",
          sizes,
          styles[variant],
          className,
        )}
      >
        <span className="relative">{children}</span>
        {arrow && (
          <span className="relative grid size-4 place-items-center overflow-hidden">
            <Arrow className="transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:translate-x-5" />
            <Arrow className="absolute -translate-x-5 transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:translate-x-0" />
          </span>
        )}
      </Link>
    </motion.span>
  );
}
