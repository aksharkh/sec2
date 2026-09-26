import { frameworks } from "@/lib/site";
import { KnotMark } from "@/components/ui/Logo";

function Row({ items, reverse = false }: { items: typeof frameworks; reverse?: boolean }) {
  const doubled = [...items, ...items];
  return (
    <div className="group flex overflow-hidden mask-fade-x">
      <ul
        className={`flex shrink-0 items-center gap-10 pr-10 ${reverse ? "animate-marquee-rev" : "animate-marquee"} group-hover:[animation-play-state:paused]`}
      >
        {doubled.map((f, i) => (
          <li key={`${f.slug}-${i}`} aria-hidden={i >= items.length} className="flex shrink-0 items-center gap-10">
            <span className="flex items-baseline gap-3">
              <span className="whitespace-nowrap text-[clamp(1.6rem,3.2vw,2.75rem)] font-medium tracking-[-0.03em] text-bone/85">
                {f.name}
              </span>
              <span className="eyebrow text-[0.62rem] text-fog">{f.region}</span>
            </span>
            <KnotMark className="size-5 text-ice/70" />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function FrameworkMarquee() {
  const half = Math.ceil(frameworks.length / 2);
  return (
    <section aria-label="Frameworks we cover" className="relative border-y border-white/[0.07] bg-ink py-10">
      <div className="container-x mb-8 flex items-center justify-between">
        <p className="eyebrow text-fog">{frameworks.length}+ frameworks · one team</p>
        <p className="eyebrow hidden text-fog sm:block">Certify · Authorise · Regulate · Test</p>
      </div>
      <div className="space-y-5">
        <Row items={frameworks.slice(0, half)} />
        <Row items={frameworks.slice(half)} reverse />
      </div>
    </section>
  );
}
