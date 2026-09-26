import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageHero from "@/components/page/PageHero";
import { FAQ, SectionHead, Steps } from "@/components/page/Blocks";
import { Reveal } from "@/components/ui/Reveal";
import Button, { Arrow } from "@/components/ui/Button";
import FinalCTA from "@/components/home/FinalCTA";
import { StoryArt } from "@/components/customers/StoryArt";
import { frameworks, pillars } from "@/lib/site";
import { frameworkContent } from "@/lib/framework-content";
import { stories } from "@/lib/stories";

export function generateStaticParams() {
  return frameworks.map((f) => ({ slug: f.slug }));
}

export async function generateMetadata({ params }: PageProps<"/compliance/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const f = frameworks.find((x) => x.slug === slug);
  if (!f) return {};
  const c = frameworkContent[slug];
  return { title: `${f.name} compliance`, description: c?.overview ?? f.blurb };
}

const STEPS = [
  { t: "Scope & gap assessment", d: "Define the boundary and measure where you stand against every requirement." },
  { t: "Remediate", d: "Policies, procedures and technical controls implemented alongside your team." },
  { t: "Readiness review", d: "A mock audit that surfaces weak evidence before the auditor does." },
  { t: "Audit & sustain", d: "Support through the assessment, then continuous monitoring after." },
];

export default async function FrameworkPage({ params }: PageProps<"/compliance/[slug]">) {
  const { slug } = await params;
  const f = frameworks.find((x) => x.slug === slug);
  const c = frameworkContent[slug];
  if (!f || !c) notFound();

  const pillar = pillars.find((p) => p.id === f.pillar)!;
  const related = frameworks.filter((x) => x.pillar === f.pillar && x.slug !== f.slug).slice(0, 4);
  const cross = frameworks.filter((x) => x.pillar !== f.pillar && ["soc-2", "iso-27001", "nist-csf", "gdpr"].includes(x.slug) && x.slug !== f.slug).slice(0, 2);
  const relatedStories = stories.filter((s) => s.frameworks.some((n) => n.toLowerCase().startsWith(f.name.toLowerCase().split(" ")[0]))).slice(0, 2);

  return (
    <>
      <PageHero
        eyebrow={`${pillar.title} · ${f.region}`}
        crumbs={[{ label: "Compliance", href: "/compliance" }, { label: f.name, href: `/compliance/${f.slug}` }]}
        title={[f.name]}
        size="xl"
        lede={
          <>
            <span className="block text-bone">{c.headline}</span>
            <span className="mt-4 block">{c.overview}</span>
          </>
        }
        aside={
          <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.08]">
            {[
              ["Standard", f.full],
              ["Region", f.region],
              ["Category", pillar.title],
              ["Typical timeline", c.timeline.split("·")[0].trim()],
            ].map(([k, v]) => (
              <div key={k} className="bg-ink-2/90 p-5 backdrop-blur">
                <dt className="eyebrow text-bone/40">{k}</dt>
                <dd className="mt-2 text-[0.95rem] text-bone">{v}</dd>
              </div>
            ))}
          </dl>
        }
      >
        <Button href="/contact" book={f.name} size="lg">Start with {f.name}</Button>
        <Button href="#faq" variant="ghost" size="lg" arrow={false}>Common questions</Button>
      </PageHero>

      {/* Who */}
      <section className="bg-bone py-28 text-ink md:py-36">
        <div className="container-x grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHead light eyebrow="Who needs it" lines={[<>Built for teams <span className="font-serif font-normal italic">like yours.</span></>]} />
          </div>
          <ul className="space-y-3 lg:col-span-7">
            {c.who.map((w, i) => (
              <Reveal as="li" key={w} delay={i * 0.08} className="flex items-start gap-5 rounded-2xl bg-paper p-6 md:p-8">
                <span className="font-mono text-xs text-accent">0{i + 1}</span>
                <span className="text-xl font-medium leading-snug tracking-tight md:text-2xl">{w}</span>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* What it covers */}
      <section className="bg-ink py-28 md:py-36">
        <div className="container-x">
          <SectionHead eyebrow="What it covers" lines={["The requirements,", <><span className="font-serif font-normal italic text-ice">decoded.</span></>]} lede={c.outcome} />
          <div className="mt-16 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {c.areas.map((a, i) => (
              <Reveal key={a.t} delay={i * 0.06} className="group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-ink-2 p-8 transition-colors duration-500 hover:border-accent/50">
                <span aria-hidden className="absolute -right-12 -top-12 size-40 rounded-full bg-accent/0 blur-2xl transition-colors duration-700 group-hover:bg-accent/30" />
                <span className="relative font-mono text-xs text-ice">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="relative mt-8 text-2xl font-medium tracking-tight">{a.t}</h3>
                <p className="relative mt-3 leading-relaxed text-bone/55">{a.d}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* How */}
      <section className="bg-ink pb-28 md:pb-36">
        <div className="container-x">
          <SectionHead eyebrow="How we get you there" lines={[<>From gap to <span className="font-serif font-normal italic text-ice">green.</span></>]} />
          <div className="mt-14">
            <Steps steps={STEPS} />
          </div>
          <Reveal className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-accent-deep px-8 py-6 text-white">
            <span className="eyebrow text-white/70">Typical timeline</span>
            <span className="text-lg">{c.timeline}</span>
          </Reveal>
        </div>
      </section>

      {/* Overlaps */}
      <section className="border-t border-white/[0.08] bg-ink py-28 md:py-36">
        <div className="container-x">
          <SectionHead eyebrow="Reuse your work" lines={[`${f.name} pairs well with`]} lede="Shared controls mean each additional framework costs a fraction of the first." />
          <div className="mt-14 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {[...related, ...cross].slice(0, 6).map((r) => (
              <Link key={r.slug} href={`/compliance/${r.slug}`} className="group flex items-center justify-between rounded-2xl border border-white/[0.08] p-6 transition-colors hover:border-accent/60 hover:bg-white/[0.02]">
                <span>
                  <span className="block text-2xl font-medium tracking-tight">{r.name}</span>
                  <span className="mt-1 block text-sm text-bone/45">{r.blurb}</span>
                </span>
                <Arrow className="shrink-0 text-ice transition-transform group-hover:translate-x-1" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {relatedStories.length > 0 && (
        <section className="bg-ink pb-28 md:pb-36">
          <div className="container-x">
            <SectionHead eyebrow="In practice" lines={["Related customer stories"]} />
            <div className="mt-14 grid gap-4 md:grid-cols-2">
              {relatedStories.map((s) => (
                <Link key={s.slug} href={`/customers/${s.slug}`} className="group overflow-hidden rounded-3xl border border-white/[0.08] bg-ink-2">
                  <div className="overflow-hidden">
                    <StoryArt story={s} className="aspect-[16/9] transition-transform duration-[1.2s] ease-[var(--ease-out-expo)] group-hover:scale-105" />
                  </div>
                  <div className="p-7">
                    <p className="eyebrow text-fog">{s.industry}</p>
                    <p className="mt-3 text-2xl font-medium leading-snug tracking-tight">{s.headline}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section id="faq" className="scroll-mt-24 bg-bone py-28 text-ink md:py-36">
        <div className="container-x grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHead light eyebrow="FAQ" lines={["Common", "questions"]} />
          </div>
          <div className="lg:col-span-8">
            <FAQ light items={c.faqs} />
          </div>
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
