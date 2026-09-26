import type { Metadata } from "next";
import PageHero from "@/components/page/PageHero";
import ContactForm from "@/components/page/ContactForm";
import { FAQ, SectionHead } from "@/components/page/Blocks";
import LocalTime, { ZoneLabel } from "@/components/ui/LocalTime";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Contact", description: "Talk to a SecureKnots practitioner about compliance, audits or security testing." };

const FAQS = [
  { q: "How quickly will you respond?", a: "Within one business day. Our teams in the US and India cover most working hours worldwide." },
  { q: "What happens on the first call?", a: "A 30-minute conversation with a practitioner about your goals, deadlines and current state. You leave with a clear view of which frameworks matter and what it will take." },
  { q: "Do you work with startups?", a: "Yes. We right-size programmes for seed-stage companies as well as regulated enterprises." },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        crumbs={[{ label: "Contact", href: "/contact" }]}
        title={["Let's talk."]}
        size="xl"
        lede="Tell us what you're working on. A practitioner — not a sales script — will get back to you within one business day."
      />
      <section className="bg-ink pb-28 md:pb-36">
        <div className="container-x grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <ContactForm />
          </div>
          <div className="space-y-4 lg:col-span-5">
            <a href={`mailto:${site.email}`} className="group block rounded-3xl bg-accent-deep p-8 text-white">
              <p className="eyebrow text-white/70">Email</p>
              <p className="mt-3 text-2xl font-medium tracking-tight group-hover:underline md:text-3xl">{site.email}</p>
            </a>
            {site.offices.map((o) => (
              <div key={o.id} className="rounded-3xl border border-white/[0.08] bg-ink-2 p-8">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="eyebrow text-fog">{o.label}</p>
                    <p className="mt-3 text-2xl font-medium tracking-tight">{o.city}, {o.country}</p>
                  </div>
                  <p className="text-right font-mono text-sm text-bone/60">
                    <LocalTime timeZone={o.timeZone} /> <ZoneLabel timeZone={o.timeZone} fallback={o.tz} />
                  </p>
                </div>
                <a href={`tel:${o.tel}`} className="mt-6 inline-block text-lg text-ice hover:underline">{o.phone}</a>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="bg-bone py-28 text-ink md:py-36">
        <div className="container-x grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHead light eyebrow="FAQ" lines={["Before you", "reach out"]} />
          </div>
          <div className="lg:col-span-8">
            <FAQ light items={FAQS} />
          </div>
        </div>
      </section>
    </>
  );
}
