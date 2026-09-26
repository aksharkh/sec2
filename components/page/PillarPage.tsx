import PageHero from "@/components/page/PageHero";
import { LinkRows, SectionHead, Steps } from "@/components/page/Blocks";
import Button from "@/components/ui/Button";
import FinalCTA from "@/components/home/FinalCTA";
import { frameworks, pillars, type Pillar } from "@/lib/site";

const COPY: Record<Exclude<Pillar, "testing">, { title: React.ReactNode[]; lede: string; steps: { t: string; d: string }[] }> = {
  certifications: {
    title: ["Certifications", <><span className="font-serif font-normal italic text-ice">that close deals.</span></>],
    lede: "SOC, ISO and PCI programmes designed once and reused everywhere — from readiness through report and every surveillance audit after.",
    steps: [
      { t: "Readiness", d: "Gap assessment against the standard and your customers' expectations." },
      { t: "Implement", d: "A management system and controls your team can actually run." },
      { t: "Audit", d: "Support through Stage 1/2, SOC fieldwork or QSA assessment." },
      { t: "Surveil", d: "Internal audits and evidence refreshes between cycles." },
    ],
  },
  government: {
    title: ["Government", <>& <span className="font-serif font-normal italic text-ice">defense.</span></>],
    lede: "FedRAMP, StateRAMP, CMMC, NIST 800-53, ITAR and EAR — the authorisations and controls that open public-sector and defense markets.",
    steps: [
      { t: "Boundary", d: "Define exactly which systems, data and people are in scope." },
      { t: "Baseline", d: "Implement NIST-based controls with documentation that survives review." },
      { t: "Assess", d: "Prepare for 3PAO, C3PAO or agency assessment with a full mock review." },
      { t: "Monitor", d: "Continuous monitoring, POA&M and annual reassessment." },
    ],
  },
  privacy: {
    title: ["Privacy &", <><span className="font-serif font-normal italic text-ice">regulation.</span></>],
    lede: "GDPR, DPDPA, HIPAA, CCPA, DORA, SEBI and PDPA — one privacy and resilience programme with local chapters for every jurisdiction you operate in.",
    steps: [
      { t: "Map", d: "Records of processing, data flows and third parties." },
      { t: "Design", d: "Notices, consent, rights and DPIA processes." },
      { t: "Operate", d: "Workflows, training and vendor oversight." },
      { t: "Evidence", d: "Documentation and certification such as ISO 27701." },
    ],
  },
  advisory: {
    title: ["GRC", <><span className="font-serif font-normal italic text-ice">advisory.</span></>],
    lede: "Risk assessments, NIST CSF maturity, IT general controls and unified audit programmes — the strategy layer that ties every framework together.",
    steps: [
      { t: "Assess", d: "Risk and maturity measured against a recognised framework." },
      { t: "Prioritise", d: "A roadmap ranked by risk reduction per rupee or dollar." },
      { t: "Unify", d: "A common control framework across every standard." },
      { t: "Report", d: "Board-ready metrics that show progress." },
    ],
  },
};

export default function PillarPage({ id }: { id: Exclude<Pillar, "testing"> }) {
  const p = pillars.find((x) => x.id === id)!;
  const c = COPY[id];
  const list = frameworks.filter((f) => f.pillar === id);
  return (
    <>
      <PageHero eyebrow={p.title} crumbs={[{ label: p.title, href: p.href }]} title={c.title} size="xl" lede={c.lede}>
        <Button href="/contact" book size="lg">Book a consultation</Button>
        <Button href="/framework-finder" variant="ghost" size="lg" arrow={false}>Framework Finder</Button>
      </PageHero>
      <section className="bg-ink pb-28 md:pb-36">
        <div className="container-x">
          <SectionHead eyebrow="Frameworks" lines={[`${list.length} standards we deliver`]} className="mb-14" />
          <LinkRows items={list.map((f) => ({ title: f.name, href: `/compliance/${f.slug}`, desc: f.blurb, meta: f.region }))} />
        </div>
      </section>
      {c.steps.length > 0 && (
        <section className="bg-ink pb-28 md:pb-36">
          <div className="container-x">
            <SectionHead eyebrow="Our approach" lines={[<>How it <span className="font-serif font-normal italic text-ice">works.</span></>]} className="mb-14" />
            <Steps steps={c.steps} />
          </div>
        </section>
      )}
      <FinalCTA />
    </>
  );
}
