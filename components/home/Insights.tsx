import Link from "next/link";
import { Eyebrow, Reveal, RevealLines } from "@/components/ui/Reveal";
import Button, { Arrow } from "@/components/ui/Button";
import { articles } from "@/lib/insights";

const GUIDES = articles.slice(0, 3);

export default function Insights() {
  return (
    <section className="relative bg-bone py-28 text-ink md:py-40" aria-labelledby="insights-title">
      <div className="container-x">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <Eyebrow className="!text-smoke">Insights</Eyebrow>
            <h2 id="insights-title" className="mt-6 text-[length:var(--text-section)] font-medium leading-[0.95] tracking-[-0.045em]">
              <RevealLines lines={["Field notes from", <>the <span className="font-serif font-normal italic">audit</span> floor.</>]} />
            </h2>
          </div>
          <Button href="/insights" variant="dark" size="md">All insights</Button>
        </div>

        <div className="mt-16 grid gap-4 md:grid-cols-3">
          {GUIDES.map((g, i) => (
            <Reveal key={g.slug} delay={i * 0.08}>
              <Link
                href={`/insights/${g.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-2xl bg-paper transition-shadow duration-500 hover:shadow-[0_30px_60px_-30px_rgba(8,9,11,0.35)]"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-ink">
                  <div className="absolute inset-0 grid-lines opacity-70 transition-transform duration-[1.2s] ease-[var(--ease-out-expo)] group-hover:scale-110" />
                  <div className="absolute inset-0 grid place-items-center">
                    <span className="text-[clamp(3rem,6vw,5.5rem)] font-medium tracking-[-0.05em] text-bone transition-colors duration-500 group-hover:text-ice">
                      {g.tag}
                    </span>
                  </div>
                  <span className="absolute left-5 top-5 rounded-full bg-accent px-2.5 py-1 font-mono text-[0.62rem] uppercase tracking-wider text-white">
                    Guide
                  </span>
                </div>
                <div className="flex flex-1 flex-col justify-between gap-8 p-6 md:p-7">
                  <div>
                    <p className="eyebrow text-smoke">{g.kicker}</p>
                    <h3 className="mt-3 text-xl font-medium leading-snug tracking-tight md:text-2xl">{g.title}</h3>
                  </div>
                  <span className="inline-flex items-center gap-2 text-sm font-medium">
                    Read guide
                    <Arrow className="transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
