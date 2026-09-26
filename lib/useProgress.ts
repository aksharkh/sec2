"use client";

import { useMotionValue, useMotionValueEvent, useScroll, type MotionValue } from "motion/react";
import type { RefObject } from "react";

type Offset = NonNullable<Parameters<typeof useScroll>[0]>["offset"];

/**
 * Scroll progress for a target element as a plain (non-accelerated) MotionValue.
 * Motion can hand scroll-linked opacity/filter to the browser's ScrollTimeline, which
 * mis-maps multi-stop ranges on tall pinned sections. Copying the value through JS
 * keeps every derived transform exact.
 */
export function useProgress(target: RefObject<HTMLElement | null>, offset: Offset = ["start start", "end end"]): MotionValue<number> {
  const { scrollYProgress } = useScroll({ target, offset });
  const mv = useMotionValue(scrollYProgress.get());
  useMotionValueEvent(scrollYProgress, "change", (v) => mv.set(v));
  return mv;
}
