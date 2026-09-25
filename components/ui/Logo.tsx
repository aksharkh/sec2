import Link from "next/link";
import clsx from "clsx";

// A trefoil knot — the simplest non-trivial knot — drawn from its parametric form.
// It echoes the 3D knot in the hero, so the brand mark and the hero share one idea.
function trefoilPath(size = 32, pad = 3.2) {
  const pts: [number, number][] = [];
  const steps = 180;
  for (let i = 0; i <= steps; i++) {
    const t = (i / steps) * Math.PI * 2;
    pts.push([Math.sin(t) + 2 * Math.sin(2 * t), Math.cos(t) - 2 * Math.cos(2 * t)]);
  }
  const s = (size - pad * 2) / 6;
  return (
    pts
      .map(([x, y], i) => `${i ? "L" : "M"}${(size / 2 + x * s).toFixed(2)} ${(size / 2 - 0.35 + y * s * 0.97).toFixed(2)}`)
      .join(" ") + "Z"
  );
}
const TREFOIL = trefoilPath();

export function KnotMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden className={className}>
      <path d={TREFOIL} stroke="currentColor" strokeWidth={2.1} strokeLinejoin="round" />
    </svg>
  );
}

export default function Logo({ className, tone = "light" }: { className?: string; tone?: "light" | "dark" }) {
  return (
    <Link
      href="/"
      aria-label="SecureKnots home"
      className={clsx(
        "group inline-flex items-center gap-2.5 font-medium tracking-tight",
        tone === "light" ? "text-bone" : "text-ink",
        className,
      )}
    >
      <span className="relative grid size-8 place-items-center">
        <KnotMark className="size-8 transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:rotate-[120deg]" />
      </span>
      <span className="text-[1.05rem]">
        Secure<span className="text-fog">Knots</span>
      </span>
    </Link>
  );
}
