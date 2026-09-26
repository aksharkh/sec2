import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageHero from "@/components/page/PageHero";
import { SectionHead } from "@/components/page/Blocks";
import { Reveal } from "@/components/ui/Reveal";
import Button, { Arrow } from "@/components/ui/Button";
import FinalCTA from "@/components/home/FinalCTA";
import { StoryArt } from "@/components/customers/StoryArt";
import { frameworks, industries } from "@/lib/site";
import { industryContent } from "@/lib/services-content";
import { stories } from "@/lib/stories";

export function generateStaticParams() {
  return industries.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({ params }: PageProps<"/industries/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const i = industries.find((x) => x.slug === slug);
  return i ? { title: `${i.name} compliance`, description: industryContent[slug]?.intro } : {};
}

export default async function IndustryPage({ params }: PageProps<"/industries/[slug]">) {
  const { slug } = await params;
  const ind = industries.find((x) => x.slug === slug);
  const c = industryContent[slug];
  if (!ind || !c) notFound();
  const fws = frameworks.filter((f) => ind.frameworks.includes(f.name));
  const story = stories.find((s) => s.industry === ind.name);

  return (
    <>
      <PageHero
        eyebrow={ind.name}
        crumbs={[{ label: "Industries", href: "/industries" }, { label: ind.name, href: `/industries/${slug}` }]}
        size="xl"
        title={[c.headline]}
        lede={c.intro}
      >
        <Button href="/contact" book size="lg">Talk to a specialist</Button>
      </PageHero>

      <section className="bg-bone py-28 text-ink md:py-36">
        <div className="container-x grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHead light eyebrow="Sound familiar?" lines={[<>What we <span className="font-serif font-normal italic">hear</span> most.</>]} />
          </div>
          <ul className="space-y-3 lg:col-span-7">
            {c.pains.map((p, i) => (
              <Reveal as="li" key={p} delay={i * 0.08} className="rounded-2xl bg-paper p-7 text-2xl font-medium tracking-tight md:text-3xl">
                <span className="mr-4 font-serif text-accent">“</span>
                {p}
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-ink py-28 md:py-36">
        <div className="container-x">
          <SectionHead eyebrow="The programme" lines={[<>What we <span className="font-serif font-normal italic text-ice">build.</span></>]} className="mb-14" />
          <div className="grid gap-3 md:grid-cols-3">
            {c.programme.map((p, i) => (
              <Reveal key={p.t} delay={i * 0.08} className="rounded-2xl border border-white/[0.08] bg-ink-2 p-8">
                <span className="font-mono text-xs text-ice">0{i + 1}</span>
                <h3 className="mt-10 text-3xl font-medium tracking-tight">{p.t}</h3>
                <p className="mt-3 text-bone/55">{p.d}</p>
              </Reveal>
            ))}
          </div>
          <div className="mt-16">
            <p className="eyebrow mb-6 text-fog">Key frameworks</p>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {fws.map((f) => (
                <Link key={f.slug} href={`/compliance/${f.slug}`} className="group flex items-center justify-between rounded-2xl border border-white/[0.08] p-6 hover:border-accent/60">
                  <span className="text-2xl font-medium tracking-tight">{f.name}</span>
                  <Arrow className="text-ice transition-transform group-hover:translate-x-1" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {story && (
        <section className="bg-ink pb-28 md:pb-36">
          <div className="container-x">
            <Link href={`/customers/${story.slug}`} className="group grid overflow-hidden rounded-3xl border border-white/[0.08] bg-ink-2 md:grid-cols-2">
              <div className="overflow-hidden">
                <StoryArt story={story} className="h-full min-h-[320px] transition-transform duration-[1.2s] ease-[var(--ease-out-expo)] group-hover:scale-105" />
              </div>
              <div className="flex flex-col justify-between gap-10 p-8 md:p-12">
                <div>
                  <p className="eyebrow text-fog">Customer story</p>
                  <p className="mt-5 text-3xl font-medium leading-tight tracking-tight">{story.headline}</p>
                </div>
                <span className="inline-flex items-center gap-2 font-medium text-ice">
                  Read the story <Arrow className="transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          </div>
        </section>
      )}
      <FinalCTA />
    </>
  );
}
