import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { StoryArt } from "@/components/customers/StoryArt";
import StoryHero from "@/components/customers/StoryHero";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHead } from "@/components/page/Blocks";
import { Arrow } from "@/components/ui/Button";
import FinalCTA from "@/components/home/FinalCTA";
import { frameworks } from "@/lib/site";
import { stories, storyBySlug } from "@/lib/stories";

export function generateStaticParams() {
  return stories.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps<"/customers/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const s = storyBySlug(slug);
  return s ? { title: `${s.company} — customer story`, description: s.summary } : {};
}

export default async function StoryPage({ params }: PageProps<"/customers/[slug]">) {
  const { slug } = await params;
  const s = storyBySlug(slug);
  if (!s) notFound();
  const idx = stories.indexOf(s);
  const next = stories[(idx + 1) % stories.length];

  return (
    <>
      <StoryHero story={s} />

      {/* Stats band */}
      <section className="bg-ink">
        <div className="container-x">
          <dl className="grid border-y border-white/[0.08] md:grid-cols-3">
            {s.stats.map((st, i) => (
              <Reveal key={st.l} delay={i * 0.08} className="border-white/[0.08] py-10 md:border-r md:px-8 md:first:pl-0 md:last:border-r-0">
                <dd className="text-[clamp(3rem,6vw,5.5rem)] font-medium leading-none tracking-[-0.05em] text-ice">{st.v}</dd>
                <dt className="mt-3 max-w-[24ch] text-bone/55">{st.l}</dt>
              </Reveal>
            ))}
          </dl>
        </div>
      </section>

      <section className="bg-ink py-24 md:py-32">
        <div className="container-x grid gap-16 lg:grid-cols-12">
          {/* sidebar facts */}
          <aside className="lg:col-span-3">
            <div className="space-y-6 lg:sticky lg:top-28">
              {[
                ["Company", s.company],
                ["Industry", s.industry],
                ["Region", s.region],
                ["Size", s.size],
              ].map(([k, v]) => (
                <div key={k} className="border-b border-white/[0.08] pb-4">
                  <p className="eyebrow text-fog">{k}</p>
                  <p className="mt-1.5 text-bone">{v}</p>
                </div>
              ))}
              <div>
                <p className="eyebrow mb-3 text-fog">Frameworks</p>
                <div className="flex flex-wrap gap-1.5">
                  {s.frameworks.map((n) => {
                    const f = frameworks.find((x) => x.name === n);
                    return f ? (
                      <Link key={n} href={`/compliance/${f.slug}`} className="rounded-full border border-white/12 px-3 py-1 font-mono text-xs text-bone/75 hover:border-accent hover:text-bone">{n}</Link>
                    ) : (
                      <span key={n} className="rounded-full border border-white/12 px-3 py-1 font-mono text-xs text-bone/75">{n}</span>
                    );
                  })}
                </div>
              </div>
            </div>
          </aside>

          <article className="space-y-24 lg:col-span-9">
            <div>
              <p className="eyebrow text-ice">The challenge</p>
              <p className="mt-6 max-w-[34ch] text-3xl font-medium leading-tight tracking-tight md:text-4xl">{s.summary}</p>
              <ul className="mt-10 space-y-3">
                {s.challenge.map((c, i) => (
                  <Reveal as="li" key={c} delay={i * 0.06} className="flex gap-5 rounded-2xl border border-white/[0.08] p-6 text-lg text-bone/75">
                    <span className="font-mono text-xs text-ice">0{i + 1}</span>
                    {c}
                  </Reveal>
                ))}
              </ul>
            </div>

            <div>
              <p className="eyebrow text-ice">The approach</p>
              <div className="mt-8 grid gap-px overflow-hidden rounded-2xl bg-white/[0.08] md:grid-cols-2">
                {s.approach.map((a, i) => (
                  <Reveal key={a.t} delay={i * 0.06} className="bg-ink p-8">
                    <span className="font-mono text-xs text-ice">0{i + 1}</span>
                    <h3 className="mt-6 text-2xl font-medium tracking-tight">{a.t}</h3>
                    <p className="mt-2 text-bone/55">{a.d}</p>
                  </Reveal>
                ))}
              </div>
            </div>

            <Reveal className="relative overflow-hidden rounded-3xl bg-accent-deep p-10 text-white md:p-16">
              <div aria-hidden className="absolute inset-0 grid-lines opacity-30" />
              <p className="relative font-serif text-7xl leading-none">“</p>
              <blockquote className="relative mt-2 max-w-[28ch] text-3xl font-medium leading-snug tracking-tight md:text-5xl md:leading-[1.1]">{s.quote.text}</blockquote>
              <p className="relative mt-10 text-white/75">
                <span className="font-medium text-white">{s.quote.name}</span> · {s.quote.role}, {s.company}
              </p>
            </Reveal>

            <div>
              <p className="eyebrow text-ice">The results</p>
              <ul className="mt-8 divide-y divide-white/[0.08] border-y border-white/[0.08]">
                {s.results.map((r) => (
                  <Reveal as="li" key={r} className="flex items-center gap-5 py-6 text-2xl font-medium tracking-tight">
                    <span className="grid size-9 shrink-0 place-items-center rounded-full bg-accent">
                      <svg viewBox="0 0 12 12" className="size-3.5 text-white" aria-hidden><path d="M2.5 6.5 5 9l4.5-5.5" stroke="currentColor" strokeWidth="1.6" fill="none" /></svg>
                    </span>
                    {r}
                  </Reveal>
                ))}
              </ul>
            </div>
          </article>
        </div>
      </section>

      {/* Next story */}
      <section className="bg-ink pb-28">
        <div className="container-x">
          <SectionHead eyebrow="Next story" lines={[next.company]} className="mb-10" />
          <Link href={`/customers/${next.slug}`} className="group relative block overflow-hidden rounded-3xl">
            <StoryArt story={next} big className="h-[46vh] min-h-[320px] transition-transform duration-[1.4s] ease-[var(--ease-out-expo)] group-hover:scale-[1.03]" />
            <span className="absolute bottom-6 right-6 inline-flex items-center gap-2 rounded-full bg-bone px-5 py-3 text-sm font-medium text-ink">
              Read next <Arrow />
            </span>
          </Link>
        </div>
      </section>
      <FinalCTA />
    </>
  );
}
