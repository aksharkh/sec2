import type { Metadata } from "next";
import PageHero from "@/components/page/PageHero";
import { SectionHead, Steps } from "@/components/page/Blocks";
import { Reveal } from "@/components/ui/Reveal";
import { Arrow } from "@/components/ui/Button";
import FinalCTA from "@/components/home/FinalCTA";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Careers", description: "Join SecureKnots — cybersecurity, GRC and offensive security practitioners in the US and India." };

// TODO(client): replace with live roles (or connect an ATS feed). Areas below are the practices we hire into.
const AREAS = [
  { t: "GRC Consultant", d: "Lead SOC 2, ISO 27001 and privacy programmes end to end.", loc: "Bengaluru · Hybrid" },
  { t: "Federal Compliance Specialist", d: "FedRAMP, StateRAMP and CMMC readiness for cloud and defense clients.", loc: "United States · Remote" },
  { t: "Penetration Tester", d: "Application, API, network and cloud offensive testing.", loc: "Bengaluru · Hybrid" },
  { t: "Privacy Consultant", d: "GDPR, DPDPA and ISO 27701 programme design and operation.", loc: "Bengaluru · Hybrid" },
];

export default function CareersPage() {
  return (
    <>
      <PageHero
        eyebrow="Careers"
        crumbs={[{ label: "Careers", href: "/careers" }]}
        size="xl"
        title={["Do the work", <>that <span className="font-serif font-normal italic text-ice">matters.</span></>]}
        lede="We're practitioners who've sat on both sides of the audit table. If you care about real security more than paperwork, you'll fit right in."
      />

      <section className="bg-ink pb-28 md:pb-36">
        <div className="container-x">
          <SectionHead eyebrow="How we work" lines={["Small teams.", <><span className="font-serif font-normal italic text-ice">Real</span> ownership.</>]} className="mb-14" />
          <Steps
            steps={[
              { t: "Own the outcome", d: "You run engagements end to end, not one slice of a spreadsheet." },
              { t: "Learn across frameworks", d: "Federal, global and Indian regulation — often in the same week." },
              { t: "Build, don't just assess", d: "Work with engineers to fix what you find." },
              { t: "Two continents", d: "Collaborate across the US and India." },
            ]}
          />
        </div>
      </section>

      <section className="bg-ink pb-28 md:pb-36">
        <div className="container-x">
          <SectionHead eyebrow="Where we hire" lines={["Practice areas"]} lede="We hire into these practices throughout the year. Tell us which one fits you." className="mb-14" />
          <ul className="border-t border-white/[0.08]">
            {AREAS.map((a, i) => (
              <Reveal as="li" key={a.t} delay={i * 0.05}>
                <a
                  href={`mailto:${site.email}?subject=${encodeURIComponent(`Application — ${a.t}`)}`}
                  className="group grid items-center gap-3 border-b border-white/[0.08] py-8 transition-colors hover:bg-white/[0.02] md:grid-cols-12"
                >
                  <span className="text-2xl font-medium tracking-tight transition-transform duration-500 group-hover:translate-x-2 md:col-span-4 md:text-3xl">{a.t}</span>
                  <span className="text-bone/55 md:col-span-5">{a.d}</span>
                  <span className="font-mono text-xs text-bone/45 md:col-span-2">{a.loc}</span>
                  <span className="flex md:col-span-1 md:justify-end">
                    <span className="grid size-10 place-items-center rounded-full border border-white/15 transition-all group-hover:-rotate-45 group-hover:border-accent group-hover:bg-accent">
                      <Arrow />
                    </span>
                  </span>
                </a>
              </Reveal>
            ))}
          </ul>
          <p className="mt-8 text-bone/50">
            Don&apos;t see your role? Send your CV to <a href={`mailto:${site.email}`} className="text-ice underline">{site.email}</a>.
          </p>
        </div>
      </section>
      <FinalCTA />
    </>
  );
}
