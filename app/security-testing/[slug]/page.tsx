import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageHero from "@/components/page/PageHero";
import { SectionHead, Steps } from "@/components/page/Blocks";
import { Reveal } from "@/components/ui/Reveal";
import Button, { Arrow } from "@/components/ui/Button";
import FinalCTA from "@/components/home/FinalCTA";
import { testingServices } from "@/lib/site";
import { testingContent } from "@/lib/services-content";

export function generateStaticParams() {
  return testingServices.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: PageProps<"/security-testing/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const t = testingServices.find((x) => x.slug === slug);
  return t ? { title: t.name, description: testingContent[slug]?.overview } : {};
}

export default async function TestingService({ params }: PageProps<"/security-testing/[slug]">) {
  const { slug } = await params;
  const t = testingServices.find((x) => x.slug === slug);
  const c = testingContent[slug];
  if (!t || !c) notFound();
  const others = testingServices.filter((x) => x.slug !== slug);

  return (
    <>
      <PageHero
        eyebrow="Security testing"
        crumbs={[{ label: "Security Testing", href: "/security-testing" }, { label: t.name, href: `/security-testing/${slug}` }]}
        title={[t.name]}
        lede={
          <>
            <span className="block text-bone">{c.headline}</span>
            <span className="mt-4 block">{c.overview}</span>
          </>
        }
      >
        <Button href="/contact" book="Pentesting" size="lg">Scope this test</Button>
      </PageHero>

      <section className="bg-bone py-28 text-ink md:py-36">
        <div className="container-x grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHead light eyebrow="In scope" lines={["What we test"]} />
          </div>
          <ul className="grid gap-3 sm:grid-cols-2 lg:col-span-7">
            {c.scope.map((s, i) => (
              <Reveal as="li" key={s} delay={i * 0.05} className="flex items-center gap-4 rounded-2xl bg-paper p-6">
                <span className="grid size-8 shrink-0 place-items-center rounded-full bg-accent text-white">
                  <svg viewBox="0 0 12 12" className="size-3" aria-hidden><path d="M2.5 6.5 5 9l4.5-5.5" stroke="currentColor" strokeWidth="1.6" fill="none" /></svg>
                </span>
                <span className="text-lg font-medium tracking-tight">{s}</span>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-ink py-28 md:py-36">
        <div className="container-x">
          <SectionHead eyebrow="Methodology" lines={[<>How we <span className="font-serif font-normal italic text-ice">work.</span></>]} className="mb-14" />
          <Steps steps={c.method} />
        </div>
      </section>

      <section className="bg-ink pb-28 md:pb-36">
        <div className="container-x grid gap-10 rounded-3xl border border-white/[0.08] bg-ink-2 p-8 md:grid-cols-2 md:p-14">
          <div>
            <p className="eyebrow text-ice">Deliverables</p>
            <p className="mt-5 text-4xl font-medium leading-tight tracking-tight">What you get at the end.</p>
          </div>
          <ul className="divide-y divide-white/[0.08]">
            {c.deliverables.map((d) => (
              <li key={d} className="flex items-center justify-between py-4 text-lg">
                {d}
                <span className="size-1.5 rounded-full bg-accent" />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-t border-white/[0.08] bg-ink py-24">
        <div className="container-x">
          <p className="eyebrow mb-8 text-fog">Other testing services</p>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {others.map((o) => (
              <Link key={o.slug} href={`/security-testing/${o.slug}`} className="group flex flex-col justify-between gap-6 rounded-2xl border border-white/[0.08] p-5 transition-colors hover:border-accent/60">
                <span className="font-medium leading-snug">{o.name}</span>
                <Arrow className="text-ice transition-transform group-hover:translate-x-1" />
              </Link>
            ))}
          </div>
        </div>
      </section>
      <FinalCTA />
    </>
  );
}
