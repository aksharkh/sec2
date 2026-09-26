import clsx from "clsx";
import type { Story } from "@/lib/stories";

/** Generated cover art for a story: a hue-shifted gradient with knot line-work and the company wordmark. */
export function StoryArt({ story, className, big = false }: { story: Story; className?: string; big?: boolean }) {
  const h = story.hue;
  const seed = story.slug.length;
  return (
    <div
      className={clsx("relative overflow-hidden", className)}
      style={{
        background: `radial-gradient(120% 90% at ${20 + (seed * 7) % 60}% 0%, hsl(${h} 90% 62%) 0%, hsl(${h + 8} 85% 40%) 38%, hsl(${h + 14} 70% 14%) 78%, #07090f 100%)`,
      }}
    >
      <div aria-hidden className="absolute inset-0 grid-lines opacity-25" />
      <svg aria-hidden viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 size-full opacity-40 mix-blend-screen">
        {Array.from({ length: 18 }).map((_, i) => (
          <ellipse
            key={i}
            cx={200 + Math.sin(seed + i) * 30}
            cy={150}
            rx={170 - i * 4}
            ry={40 + i * 5}
            transform={`rotate(${i * 11 + seed * 9} 200 150)`}
            fill="none"
            stroke="white"
            strokeWidth="0.5"
          />
        ))}
      </svg>
      <div className="absolute inset-0 grid place-items-center">
        <Wordmark story={story} className={big ? "text-[clamp(2.5rem,6vw,5rem)]" : "text-3xl"} />
      </div>
      {story.sample && (
        <span className="absolute left-4 top-4 rounded-full border border-white/25 bg-black/30 px-2.5 py-1 font-mono text-[0.6rem] uppercase tracking-widest text-white/80 backdrop-blur">
          Sample story
        </span>
      )}
    </div>
  );
}

export function Wordmark({ story, className }: { story: Story; className?: string }) {
  return (
    <span className={clsx("inline-flex items-center gap-2 font-semibold tracking-[-0.04em] text-white", className)}>
      <svg viewBox="0 0 20 20" className="size-[0.8em]" aria-hidden>
        <path d={["M10 1 19 10 10 19 1 10Z", "M10 2a8 8 0 1 0 0.01 0Z", "M2 18 10 2l8 16Z"][story.slug.length % 3]} fill="currentColor" opacity="0.9" />
      </svg>
      {story.mark}
    </span>
  );
}
