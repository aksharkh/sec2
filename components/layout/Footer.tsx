import Link from "next/link";
import { KnotMark } from "@/components/ui/Logo";
import LocalTime, { ZoneLabel } from "@/components/ui/LocalTime";
import { frameworks, industries, pillars, site, testingServices } from "@/lib/site";

const cols = [
  {
    title: "Compliance",
    links: frameworks
      .filter((f) => ["soc-2", "iso-27001", "pci-dss", "fedramp", "cmmc", "hipaa", "gdpr", "dpdpa"].includes(f.slug))
      .map((f) => ({ label: f.name, href: `/compliance/${f.slug}` })),
  },
  {
    title: "Services",
    links: [
      ...pillars.map((p) => ({ label: p.title, href: p.href })),
      { label: "Framework Finder", href: "/framework-finder" },
    ],
  },
  {
    title: "Testing",
    links: testingServices.slice(0, 5).map((s) => ({ label: s.name.replace(" Exercise", ""), href: `/security-testing/${s.slug}` })),
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Industries", href: "/industries" },
      { label: "Insights", href: "/insights" },
      { label: "Careers", href: "/careers" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/[0.07] bg-ink pt-20">
      <div className="container-x">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="max-w-[22ch] text-3xl font-medium leading-[1.1] tracking-tight">
              Many frameworks.{" "}
              <span className="font-serif italic text-lime">One programme.</span>
            </p>
            <a
              href={`mailto:${site.email}`}
              className="mt-8 inline-block border-b border-white/20 pb-1 text-lg transition-colors hover:border-lime hover:text-lime"
            >
              {site.email}
            </a>
            <div className="mt-10 grid max-w-sm grid-cols-2 gap-6">
              {site.offices.map((o) => (
                <div key={o.id}>
                  <p className="eyebrow text-fog">{o.label}</p>
                  <p className="mt-2 text-bone">{o.city}, {o.country === "United States" ? "USA" : o.country}</p>
                  <a href={`tel:${o.tel}`} className="mt-1 block text-sm text-bone/60 hover:text-bone">
                    {o.phone}
                  </a>
                  <p className="mt-1 font-mono text-xs text-bone/40">
                    <LocalTime timeZone={o.timeZone} /> <ZoneLabel timeZone={o.timeZone} fallback={o.tz} />
                  </p>
                </div>
              ))}
            </div>
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-10 sm:grid-cols-4 lg:col-span-8">
            {cols.map((c) => (
              <div key={c.title}>
                <p className="eyebrow mb-5 text-fog">{c.title}</p>
                <ul className="space-y-3">
                  {c.links.map((l) => (
                    <li key={l.href}>
                      <Link
                        href={l.href}
                        className="text-[0.92rem] text-bone/70 transition-colors hover:text-bone"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="mt-20 flex flex-wrap gap-2">
          {industries.map((i) => (
            <Link
              key={i.slug}
              href={`/industries/${i.slug}`}
              className="rounded-full border border-white/10 px-3 py-1 text-xs text-bone/50 transition-colors hover:border-white/30 hover:text-bone"
            >
              {i.name}
            </Link>
          ))}
        </div>
      </div>

      {/* Oversized wordmark */}
      <div className="relative mt-16 select-none" aria-hidden>
        <div className="container-x flex items-end gap-[1.5vw]">
          <KnotMark className="mb-[0.6vw] size-[9vw] shrink-0 text-lime" />
          {/* SVG text with textLength always fits the row exactly, at any width */}
          <svg viewBox="0 0 1000 190" className="block h-auto min-w-0 flex-1 overflow-visible">
            <defs>
              <linearGradient id="wm" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#f1efe8" />
                <stop offset="1" stopColor="#f1efe8" stopOpacity="0.06" />
              </linearGradient>
            </defs>
            <text
              x="0"
              y="172"
              textLength="1000"
              lengthAdjust="spacingAndGlyphs"
              fill="url(#wm)"
              style={{ font: "600 228px var(--font-geist-sans)", letterSpacing: "-0.06em" }}
            >
              SecureKnots
            </text>
          </svg>
        </div>
      </div>

      <div className="container-x flex flex-col gap-4 border-t border-white/[0.07] py-7 text-xs text-bone/45 sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} SecureKnots. All rights reserved.</p>
        <div className="flex gap-6">
          <Link href="/privacy-policy" className="hover:text-bone">Privacy</Link>
          <Link href="/terms" className="hover:text-bone">Terms</Link>
          <Link href="/cookies" className="hover:text-bone">Cookies</Link>
        </div>
      </div>
    </footer>
  );
}
