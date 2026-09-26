import type { Metadata } from "next";
import PageHero from "@/components/page/PageHero";
import { FeaturedCarousel, LogoWall, QuoteWall, StoryGrid } from "@/components/customers/CustomersHub";
import Button from "@/components/ui/Button";
import FinalCTA from "@/components/home/FinalCTA";
import { stories } from "@/lib/stories";

export const metadata: Metadata = {
  title: "Customer stories",
  description: "How security and compliance teams unified their frameworks with SecureKnots.",
};

export default function CustomersPage() {
  const hasSamples = stories.some((s) => s.sample);
  return (
    <>
      <PageHero
        eyebrow="Customer stories"
        crumbs={[{ label: "Customers", href: "/customers" }]}
        size="xl"
        title={["Proof,", <>not <span className="font-serif font-normal italic text-ice">promises.</span></>]}
        lede="How security and compliance teams replaced a patchwork of audits with one programme — and got back to building."
      >
        <Button href="/contact" book size="lg">Start your story</Button>
      </PageHero>
      {hasSamples && (
        <div className="bg-ink">
          <p className="container-x pb-8 font-mono text-[0.68rem] uppercase tracking-widest text-bone/35">
            Stories marked “Sample story” are illustrative placeholders pending client-approved case studies.
          </p>
        </div>
      )}
      <FeaturedCarousel />
      <LogoWall />
      <StoryGrid />
      <QuoteWall />
      <FinalCTA />
    </>
  );
}
