"use client";

import { motion, useScroll, useSpring, useTransform, useVelocity } from "motion/react";

/** Skews its children in the direction and speed of scrolling — the page feels physical. */
export default function VelocitySkew({ children, max = 8 }: { children: React.ReactNode; max?: number }) {
  const { scrollY } = useScroll();
  const v = useSpring(useVelocity(scrollY), { stiffness: 300, damping: 50 });
  const skew = useTransform(v, [-3000, 0, 3000], [max, 0, -max], { clamp: true });
  return <motion.div style={{ skewX: skew }}>{children}</motion.div>;
}
