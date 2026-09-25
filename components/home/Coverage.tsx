"use client";

import { motion } from "motion/react";
import { Eyebrow, Reveal, RevealLines } from "@/components/ui/Reveal";
import LocalTime, { ZoneLabel } from "@/components/ui/LocalTime";
import { frameworks, site } from "@/lib/site";

const REGIONS = [
  { r: "US", label: "United States" },
  { r: "EU", label: "European Union" },
  { r: "India", label: "India" },
  { r: "APAC", label: "Asia-Pacific" },
  { r: "Global", label: "Global standards" },
] as const;

export default function Coverage() {
  return (
    <section className="relative overflow-hidden bg-bone py-28 text-ink md:py-40" aria-labelledby="coverage-title">
      <div className="container-x">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Eyebrow className="!text-smoke">Where we work</Eyebrow>
            <h2 id="coverage-title" className="mt-6 text-[length:var(--text-section)] font-medium leading-[0.95] tracking-[-0.045em]">
              <RevealLines lines={["Two continents.", <>Always <span className="font-serif font-normal italic">moving.</span></>]} />
            </h2>
          </div>
          <Reveal className="self-end text-lg leading-relaxed text-ink/60 lg:col-span-5">
            Teams in the United States and India mean your programme keeps moving across time zones — with local depth in
            US federal, EU and Indian regulation.
          </Reveal>
        </div>

        {/* The two offices, tied by an arc */}
        <div className="relative mt-20 grid gap-4 md:grid-cols-2">
          <svg
            viewBox="0 0 1000 200"
            preserveAspectRatio="none"
            className="pointer-events-none absolute -top-24 left-[12%] hidden h-40 w-[76%] md:block"
            aria-hidden
          >
            <path id="arc" d="M0 190 C 250 -40, 750 -40, 1000 190" fill="none" stroke="rgba(8,9,11,0.18)" strokeDasharray="4 8" />
            <motion.circle
              r="6"
              fill="#08090b"
              initial={{ offsetDistance: "0%" }}
              animate={{ offsetDistance: ["0%", "100%"] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", repeatType: "reverse" }}
              style={{ offsetPath: "path('M0 190 C 250 -40, 750 -40, 1000 190')" }}
            />
          </svg>

          {site.offices.map((o, i) => (
            <Reveal key={o.id} delay={i * 0.1}>
              <div className="group relative overflow-hidden rounded-3xl bg-paper p-8 md:p-10">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="eyebrow text-smoke">{o.label}</p>
                    <p className="mt-3 text-3xl font-medium tracking-tight md:text-4xl">{o.city}</p>
                    <p className="text-ink/50">{o.country}</p>
                  </div>
                  <span className="relative mt-1 flex size-3">
                    <span className="absolute inset-0 animate-pulse-dot rounded-full bg-lime" />
                    <span className="relative size-3 rounded-full border border-ink/40 bg-lime" />
                  </span>
                </div>
                <p className="mt-12 font-mono text-[clamp(3rem,7vw,6rem)] font-light leading-none tracking-[-0.06em]">
                  <LocalTime timeZone={o.timeZone} />
                  <ZoneLabel timeZone={o.timeZone} fallback={o.tz} className="ml-3 align-top text-base tracking-normal text-ink/40" />
                </p>
                <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-ink/10 pt-6 text-sm">
                  <a href={`tel:${o.tel}`} className="font-medium hover:underline">{o.phone}</a>
                  <a href={`mailto:${site.email}`} className="text-ink/55 hover:text-ink">{site.email}</a>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Regional coverage table */}
        <div className="mt-20 divide-y divide-ink/10 border-y border-ink/10">
          {REGIONS.map((reg, i) => {
            const list = frameworks.filter((f) => f.region === reg.r);
            return (
              <Reveal key={reg.r} delay={i * 0.04}>
                <div className="grid gap-4 py-6 md:grid-cols-12 md:items-center">
                  <p className="flex items-baseline gap-4 md:col-span-4">
                    <span className="font-mono text-xs text-ink/35">0{i + 1}</span>
                    <span className="text-xl font-medium tracking-tight">{reg.label}</span>
                  </p>
                  <ul className="flex flex-wrap gap-1.5 md:col-span-7">
                    {list.map((f) => (
                      <li key={f.slug}>
                        <a
                          href={`/compliance/${f.slug}`}
                          className="inline-block rounded-full border border-ink/12 px-3 py-1 text-sm text-ink/75 transition-colors hover:border-ink hover:bg-ink hover:text-bone"
                        >
                          {f.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                  <p className="text-right font-mono text-sm text-ink/40 md:col-span-1">{String(list.length).padStart(2, "0")}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
