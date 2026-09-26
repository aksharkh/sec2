import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReadingProgress from "@/components/page/ReadingProgress";
import { Arrow } from "@/components/ui/Button";
import Button from "@/components/ui/Button";
import FinalCTA from "@/components/home/FinalCTA";
import { articleBySlug, articles } from "@/lib/insights";

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: PageProps<"/insights/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const a = articleBySlug(slug);
  return a ? { title: a.title, description: a.excerpt } : {};
}

export default async function ArticlePage({ params }: PageProps<"/insights/[slug]">) {
  const { slug } = await params;
  const a = articleBySlug(slug);
  if (!a) notFound();
  const more = articles.filter((x) => x.slug !== slug).slice(0, 3);

  return (
    <>
      <ReadingProgress />
      <article className="bg-ink pb-24 pt-36 md:pt-44">
        <header className="container-x max-w-4xl">
          <nav className="mb-10 flex gap-2 font-mono text-[0.7rem] uppercase tracking-[0.14em] text-bone/40" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-bone">Home</Link> / <Link href="/insights" className="hover:text-bone">Insights</Link>
          </nav>
          <p className="eyebrow text-ice">{a.tag} · {a.kicker} · {a.minutes} min read</p>
          <h1 className="mt-6 text-[clamp(2.5rem,5vw,4.75rem)] font-medium leading-[1] tracking-[-0.045em] text-balance">{a.title}</h1>
          <p className="mt-6 text-xl leading-relaxed text-bone/60">{a.excerpt}</p>
        </header>
        <div className="container-x mt-16 max-w-3xl space-y-8 text-lg leading-[1.75] text-bone/75">
          {a.body.map((b, i) => (
            <div key={i}>
              {b.h && <h2 className="mb-4 mt-6 text-3xl font-medium leading-tight tracking-tight text-bone">{b.h}</h2>}
              {b.p && <p>{b.p}</p>}
              {b.list && (
                <ul className="mt-4 space-y-2">
                  {b.list.map((l) => (
                    <li key={l} className="flex gap-4">
                      <span className="mt-3 size-1.5 shrink-0 rounded-full bg-accent" />
                      {l}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
          <div className="!mt-16 rounded-3xl bg-accent-deep p-8 text-white md:p-10">
            <p className="text-2xl font-medium tracking-tight">Want this mapped to your environment?</p>
            <p className="mt-2 text-white/75">A 30-minute call with a practitioner, no obligation.</p>
            <div className="mt-6">
              <Button href="/contact" book={a.tag} variant="dark">Book a consultation</Button>
            </div>
          </div>
          <p className="text-sm text-bone/40">This article is general guidance, not legal advice.</p>
        </div>
      </article>
      <section className="border-t border-white/[0.08] bg-ink py-24">
        <div className="container-x">
          <p className="eyebrow mb-8 text-fog">Keep reading</p>
          <div className="grid gap-4 md:grid-cols-3">
            {more.map((m) => (
              <Link key={m.slug} href={`/insights/${m.slug}`} className="group flex flex-col justify-between gap-8 rounded-2xl border border-white/[0.08] p-7 hover:border-accent/60">
                <span>
                  <span className="eyebrow text-fog">{m.tag}</span>
                  <span className="mt-3 block text-xl font-medium leading-snug">{m.title}</span>
                </span>
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
