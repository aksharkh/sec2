import type { Metadata } from "next";
import PageHero from "@/components/page/PageHero";
import FrameworkFinder from "@/components/page/FrameworkFinder";

export const metadata: Metadata = {
  title: "Framework Finder",
  description: "Answer four questions to see which compliance frameworks — SOC 2, ISO 27001, FedRAMP, CMMC, PCI DSS, GDPR, DPDPA and more — apply to your business.",
};

export default function FinderPage() {
  return (
    <>
      <PageHero
        eyebrow="Framework Finder"
        crumbs={[{ label: "Framework Finder", href: "/framework-finder" }]}
        title={["Which frameworks", <>apply to <span className="font-serif font-normal italic text-ice">you?</span></>]}
        lede="Four questions. Two minutes. A prioritised starting roadmap you can take to your team."
      />
      <section className="bg-ink pb-28 md:pb-36">
        <div className="container-x">
          <FrameworkFinder />
          <p className="mt-6 text-sm text-bone/40">Guidance only — obligations depend on your specific contracts, data and jurisdictions.</p>
        </div>
      </section>
    </>
  );
}
