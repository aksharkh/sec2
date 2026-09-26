import type { Metadata } from "next";
import PageHero from "@/components/page/PageHero";
import { LinkRows, SectionHead, Steps } from "@/components/page/Blocks";
import Button from "@/components/ui/Button";
import FinalCTA from "@/components/home/FinalCTA";
import { Reveal } from "@/components/ui/Reveal";
import { testingServices } from "@/lib/site";

export const metadata: Metadata = {
  title: "Security testing & penetration testing",
  description: "Application and network penetration testing, vulnerability assessment, source code review, ransomware and phishing exercises from SecureKnots.",
};

const PROOF = [
  { k: "Manual-first", v: "Human testers for the logic flaws automation misses" },
  { k: "Mapped", v: "Findings mapped to PCI DSS, SOC 2, ISO 27001, CSCRF and more" },
  { k: "Retest included", v: "We verify your fixes and reissue the report" },
];

export default function TestingPage() {
  return (
    <>
      <PageHero
        eyebrow="Security testing"
        crumbs={[{ label: "Security Testing", href: "/security-testing" }]}
        size="xl"
        title={["Break it", <><span className="font-serif font-normal italic text-ice">before they do.</span></>]}
        lede="Compliance says you're secure. Testing proves it. Our offensive security team finds the attack paths that matter and shows you exactly how to close them."
      >
        <Button href="/contact" book="Pentesting" size="lg">Scope a test</Button>
      </PageHero>

      <section className="bg-ink pb-24">
        <div className="container-x grid gap-3 md:grid-cols-3">
          {PROOF.map((p, i) => (
            <Reveal key={p.k} delay={i * 0.08} className="rounded-2xl border border-white/[0.08] bg-ink-2 p-7">
              <p className="font-mono text-xs uppercase tracking-widest text-ice">{p.k}</p>
              <p className="mt-4 text-xl leading-snug tracking-tight">{p.v}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-ink pb-28 md:pb-36">
        <div className="container-x">
          <SectionHead eyebrow="Services" lines={["Six ways we test"]} className="mb-14" />
          <LinkRows items={testingServices.map((t) => ({ title: t.name, href: `/security-testing/${t.slug}`, desc: t.blurb }))} />
        </div>
      </section>

      <section className="bg-ink pb-28 md:pb-36">
        <div className="container-x">
          <SectionHead eyebrow="Engagement" lines={[<>Every test, <span className="font-serif font-normal italic text-ice">end to end.</span></>]} className="mb-14" />
          <Steps
            steps={[
              { t: "Scope", d: "Targets, rules of engagement and success criteria agreed up front." },
              { t: "Test", d: "Automated coverage plus deep manual testing by specialists." },
              { t: "Report", d: "Executive summary, technical detail and prioritised fixes." },
              { t: "Retest", d: "Fixes verified and an updated attestation issued." },
            ]}
          />
        </div>
      </section>
      <FinalCTA />
    </>
  );
}
