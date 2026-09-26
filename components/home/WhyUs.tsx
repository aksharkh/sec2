"use client";

import { useEffect, useRef } from "react";
import { animate, useInView } from "motion/react";
import { Eyebrow, Reveal, RevealLines } from "@/components/ui/Reveal";
import { frameworks, testingServices } from "@/lib/site";

function Count({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });
  useEffect(() => {
    if (!inView || !ref.current) return;
    const el = ref.current;
    const c = animate(0, to, {
      duration: 1.8,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => (el.textContent = `${Math.round(v)}${suffix}`),
    });
    return () => c.stop();
  }, [inView, to, suffix]);
  return (
    <span ref={ref} style={{ fontVariantNumeric: "tabular-nums" }}>
      0{suffix}
    </span>
  );
}

const FACTS = [
  { n: Math.floor(frameworks.length / 5) * 5, s: "+", label: "Frameworks & regulations covered" },
  { n: testingServices.length, s: "", label: "Offensive security disciplines" },
  { n: 2, s: "", label: "Delivery hubs — USA & India" },
  { n: 1, s: "", label: "Unified control set for all of it" },
];

const REASONS = [
  {
    t: "Unified by default",
    d: "One control set, mapped to every framework you need. Evidence collected once, reused everywhere.",
  },
  {
    t: "Practitioner-led",
    d: "Consultants drawn from established cybersecurity and compliance firms — people who have sat on both sides of the audit table.",
  },
  {
    t: "Engineer-friendly",
    d: "We work in your cloud, your ticketing and your repos, alongside your team — not in a separate spreadsheet universe.",
  },
  {
    t: "Right-sized",
    d: "Cost-effective programmes that fit a seed-stage startup as well as a regulated enterprise.",
  },
];

export default function WhyUs() {
  return (
    <section className="relative bg-ink py-28 md:py-40" aria-labelledby="why-title">
      <div className="container-x">
        <Eyebrow>Why SecureKnots</Eyebrow>
        <h2 id="why-title" className="mt-6 max-w-[18ch] text-[length:var(--text-section)] font-medium leading-[0.95] tracking-[-0.045em]">
          <RevealLines lines={["Less audit theatre.", <>More <span className="font-serif font-normal italic text-ice">actual</span> security.</>]} />
        </h2>

        <dl className="mt-20 grid grid-cols-2 border-t border-white/[0.08] lg:grid-cols-4">
          {FACTS.map((f, i) => (
            <Reveal
              key={f.label}
              delay={i * 0.08}
              className="border-b border-white/[0.08] py-10 pr-6 odd:border-r lg:border-b-0 lg:border-r lg:last:border-r-0 lg:[&:not(:first-child)]:pl-8"
            >
              <dd className="text-[clamp(3.5rem,7vw,7rem)] font-medium leading-none tracking-[-0.06em]">
                <Count to={f.n} suffix={f.s} />
              </dd>
              <dt className="mt-4 max-w-[20ch] text-sm text-bone/55">{f.label}</dt>
            </Reveal>
          ))}
        </dl>

        <div className="mt-20 grid gap-px overflow-hidden rounded-2xl bg-white/[0.08] md:grid-cols-2">
          {REASONS.map((r, i) => (
            <Reveal key={r.t} delay={i * 0.06} className="group bg-ink p-8 transition-colors duration-500 hover:bg-ink-2 md:p-12">
              <div className="flex items-start gap-6">
                <span className="mt-1 font-mono text-xs text-ice">0{i + 1}</span>
                <div>
                  <h3 className="text-2xl font-medium tracking-tight md:text-3xl">{r.t}</h3>
                  <p className="mt-3 max-w-[46ch] leading-relaxed text-bone/55">{r.d}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
