import type { Metadata } from "next";
import PageHero from "@/components/page/PageHero";
import Industries from "@/components/home/Industries";
import FinalCTA from "@/components/home/FinalCTA";
import { LinkRows, SectionHead } from "@/components/page/Blocks";
import Button from "@/components/ui/Button";
import { industries } from "@/lib/site";

export const metadata: Metadata = {
  title: "Industries",
  description: "Compliance programmes for SaaS, fintech, defense, healthcare, banking and insurance, and AI companies.",
};

export default function IndustriesPage() {
  return (
    <>
      <PageHero
        eyebrow="Industries"
        crumbs={[{ label: "Industries", href: "/industries" }]}
        size="xl"
        title={["Your sector.", <><span className="font-serif font-normal italic text-ice">Your rules.</span></>]}
        lede="Every industry carries its own mix of certifications, regulators and buyer expectations. We start from how your sector actually works."
      >
        <Button href="/contact" book size="lg">Talk to a specialist</Button>
      </PageHero>
      <Industries />
      <section className="bg-ink py-28 md:py-36">
        <div className="container-x">
          <SectionHead eyebrow="All industries" lines={["Find your sector"]} className="mb-14" />
          <LinkRows items={industries.map((i) => ({ title: i.name, href: `/industries/${i.slug}`, desc: i.line, meta: i.frameworks.slice(0, 2).join(" · ") }))} />
        </div>
      </section>
      <FinalCTA />
    </>
  );
}
