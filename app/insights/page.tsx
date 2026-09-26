import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/page/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { Arrow } from "@/components/ui/Button";
import FinalCTA from "@/components/home/FinalCTA";
import { articles } from "@/lib/insights";

export const metadata: Metadata = { title: "Insights", description: "Guides and field notes on SOC 2, ISO 27001, FedRAMP, CMMC, PCI DSS, DPDPA and more." };

export default function InsightsPage() {
  const [lead, ...rest] = articles;
  return (
    <>
      <PageHero
        eyebrow="Insights"
        crumbs={[{ label: "Insights", href: "/insights" }]}
        size="xl"
        title={["Field notes", <>from the <span className="font-serif font-normal italic text-ice">audit floor.</span></>]}
        lede="Practical guidance on the frameworks, deadlines and decisions that shape security programmes."
      />
      <section className="bg-ink pb-28 md:pb-36">
        <div className="container-x">
          <Reveal>
            <Link href={`/insights/${lead.slug}`} className="group grid overflow-hidden rounded-3xl border border-white/[0.08] bg-ink-2 md:grid-cols-2">
              <div className="relative grid min-h-[320px] place-items-center overflow-hidden bg-accent-deep">
                <div aria-hidden className="absolute inset-0 grid-lines opacity-40 transition-transform duration-[1.2s] ease-[var(--ease-out-expo)] group-hover:scale-110" />
                <span className="relative text-[clamp(4rem,10vw,9rem)] font-medium tracking-[-0.06em] text-white">{lead.tag}</span>
                <span className="absolute left-6 top-6 rounded-full bg-white px-3 py-1 font-mono text-[0.62rem] uppercase tracking-widest text-ink">Featured</span>
              </div>
              <div className="flex flex-col justify-between gap-10 p-8 md:p-12">
                <div>
                  <p className="eyebrow text-fog">{lead.kicker} · {lead.minutes} min read</p>
                  <h2 className="mt-5 text-3xl font-medium leading-tight tracking-tight md:text-4xl">{lead.title}</h2>
                  <p className="mt-4 text-lg text-bone/60">{lead.excerpt}</p>
                </div>
                <span className="inline-flex items-center gap-2 font-medium text-ice">Read guide <Arrow className="transition-transform group-hover:translate-x-1" /></span>
              </div>
            </Link>
          </Reveal>
          <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {rest.map((a, i) => (
              <Reveal key={a.slug} delay={(i % 3) * 0.08}>
                <Link href={`/insights/${a.slug}`} className="group flex h-full flex-col overflow-hidden rounded-3xl border border-white/[0.08] bg-ink-2 transition-colors hover:border-accent/50">
                  <div className="relative grid aspect-[16/10] place-items-center overflow-hidden bg-[#0c1330]">
                    <div aria-hidden className="absolute inset-0 grid-lines opacity-50 transition-transform duration-[1.2s] ease-[var(--ease-out-expo)] group-hover:scale-110" />
                    <span className="relative text-5xl font-medium tracking-[-0.05em] transition-colors duration-500 group-hover:text-ice">{a.tag}</span>
                  </div>
                  <div className="flex flex-1 flex-col justify-between gap-8 p-7">
                    <div>
                      <p className="eyebrow text-fog">{a.kicker} · {a.minutes} min</p>
                      <h3 className="mt-3 text-xl font-medium leading-snug tracking-tight">{a.title}</h3>
                    </div>
                    <span className="inline-flex items-center gap-2 text-sm font-medium text-ice">Read <Arrow className="transition-transform group-hover:translate-x-1" /></span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <FinalCTA />
    </>
  );
}
