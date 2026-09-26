import type { Metadata } from "next";
import PageHero from "@/components/page/PageHero";
import { SectionHead, Steps } from "@/components/page/Blocks";
import { Reveal } from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";
import Coverage from "@/components/home/Coverage";
import WhyUs from "@/components/home/WhyUs";
import FinalCTA from "@/components/home/FinalCTA";
import Manifesto from "@/components/home/Manifesto";

export const metadata: Metadata = {
  title: "About",
  description: "SecureKnots is a cybersecurity compliance and GRC partner with teams in the United States and India.",
};

const VALUES = [
  { t: "Rigour over theatre", d: "We'd rather find the weakness than write around it. Evidence has to be true, not just tidy." },
  { t: "Once, then everywhere", d: "Every control, policy and artefact should serve as many frameworks as it honestly can." },
  { t: "Engineers are customers too", d: "If a process slows your team down for no security gain, it's a bad process." },
  { t: "Plain language", d: "Boards, founders and auditors should all understand what we tell them." },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About SecureKnots"
        crumbs={[{ label: "About", href: "/about" }]}
        size="xl"
        title={["We tie", <>security <span className="font-serif font-normal italic text-ice">together.</span></>]}
        lede="SecureKnots is a cybersecurity and GRC partner. We help organisations of every size simplify compliance, strengthen resilience and turn security into a strategic advantage."
      >
        <Button href="/careers" variant="ghost" size="lg" arrow={false}>Join the team</Button>
        <Button href="/contact" book size="lg">Work with us</Button>
      </PageHero>

      <section className="bg-bone py-28 text-ink md:py-36">
        <div className="container-x grid gap-16 lg:grid-cols-2">
          <Reveal>
            <p className="eyebrow text-smoke">Our mission</p>
            <p className="mt-6 text-3xl font-medium leading-tight tracking-tight md:text-4xl">
              To simplify compliance, strengthen cybersecurity resilience and empower organisations to meet evolving regulatory and security challenges through practical, business-focused solutions.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="eyebrow text-smoke">Our vision</p>
            <p className="mt-6 text-3xl font-medium leading-tight tracking-tight text-ink/70 md:text-4xl">
              To be a trusted global partner for organisations seeking excellence in governance, risk, compliance and information security — so businesses can thrive with confidence.
            </p>
          </Reveal>
        </div>
      </section>

      <Manifesto />

      <section className="bg-ink pb-28 md:pb-36">
        <div className="container-x">
          <SectionHead eyebrow="What we believe" lines={[<>Four <span className="font-serif font-normal italic text-ice">principles.</span></>]} className="mb-14" />
          <Steps steps={VALUES} />
        </div>
      </section>

      <WhyUs />
      <Coverage />
      <FinalCTA />
    </>
  );
}
