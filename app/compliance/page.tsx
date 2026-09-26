import type { Metadata } from "next";
import PageHero from "@/components/page/PageHero";
import FrameworkExplorer from "@/components/page/FrameworkExplorer";
import Button from "@/components/ui/Button";
import OverlapTool from "@/components/home/OverlapTool";
import FinalCTA from "@/components/home/FinalCTA";
import { frameworks } from "@/lib/site";

export const metadata: Metadata = {
  title: "Compliance frameworks",
  description: `Explore the ${frameworks.length}+ compliance frameworks, certifications and regulations SecureKnots delivers — from SOC 2 and ISO 27001 to FedRAMP, CMMC, PCI DSS, GDPR and DPDPA.`,
};

export default function CompliancePage() {
  return (
    <>
      <PageHero
        eyebrow="Compliance"
        crumbs={[{ label: "Compliance", href: "/compliance" }]}
        title={[`${frameworks.length} frameworks.`, <><span className="font-serif font-normal italic text-ice">One</span> programme.</>]}
        lede="Certifications, attestations, federal authorisations and privacy regulations — delivered from a single unified control set, so every audit builds on the last."
      >
        <Button href="/framework-finder" size="lg">Find your frameworks</Button>
        <Button href="/contact" book variant="ghost" size="lg" arrow={false}>Talk to an expert</Button>
      </PageHero>
      <section className="bg-ink pb-28 md:pb-40">
        <div className="container-x">
          <FrameworkExplorer />
        </div>
      </section>
      <OverlapTool />
      <FinalCTA />
    </>
  );
}
