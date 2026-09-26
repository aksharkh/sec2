import Link from "next/link";
import { site } from "@/lib/site";

// NOTE: Template legal copy. Have the client's counsel review and finalise before launch.
export default function LegalPage({ title, updated, sections }: { title: string; updated: string; sections: { h: string; p: string[] }[] }) {
  return (
    <article className="bg-ink pb-28 pt-36 md:pt-44">
      <div className="container-x grid gap-14 lg:grid-cols-12">
        <aside className="lg:col-span-3">
          <div className="lg:sticky lg:top-28">
            <p className="eyebrow text-fog">Legal</p>
            <ul className="mt-4 space-y-2 text-sm">
              {[
                ["Privacy policy", "/privacy-policy"],
                ["Terms of use", "/terms"],
                ["Cookie policy", "/cookies"],
              ].map(([l, h]) => (
                <li key={h}>
                  <Link href={h} className="text-bone/60 hover:text-bone">{l}</Link>
                </li>
              ))}
            </ul>
          </div>
        </aside>
        <div className="max-w-3xl lg:col-span-9">
          <h1 className="text-[clamp(2.75rem,6vw,5.5rem)] font-medium leading-[0.95] tracking-[-0.05em]">{title}</h1>
          <p className="mt-4 font-mono text-xs uppercase tracking-widest text-bone/40">Last updated {updated}</p>
          <div className="mt-14 space-y-12">
            {sections.map((s, i) => (
              <section key={s.h}>
                <h2 className="flex gap-4 text-2xl font-medium tracking-tight">
                  <span className="font-mono text-sm text-ice">{String(i + 1).padStart(2, "0")}</span>
                  {s.h}
                </h2>
                {s.p.map((p) => (
                  <p key={p} className="mt-4 text-lg leading-relaxed text-bone/65">{p}</p>
                ))}
              </section>
            ))}
            <p className="border-t border-white/[0.08] pt-8 text-bone/55">
              Questions? Contact us at <a className="text-ice underline" href={`mailto:${site.email}`}>{site.email}</a>.
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}
