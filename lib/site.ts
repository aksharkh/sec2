// Central content model for the SecureKnots site.
// Every page (nav, footer, framework pages, homepage modules) reads from here,
// so adding a framework or changing a phone number happens in one place.

export const site = {
  name: "SecureKnots",
  tagline: "Security by design. Compliance, tied together.",
  description:
    "SecureKnots is a cybersecurity compliance and GRC partner for FedRAMP, CMMC, SOC 2, ISO 27001, PCI DSS, GDPR, DPDPA and 30+ frameworks — with teams in the United States and India.",
  url: "https://secureknots.com",
  email: "contact@secureknots.com",
  // TODO(client): confirm numbers — the live site's tel: links do not match the displayed numbers.
  offices: [
    {
      id: "us",
      city: "Delaware",
      country: "United States",
      label: "Americas HQ",
      phone: "+1 302 608 6708",
      tel: "+13026086708",
      timeZone: "America/New_York",
      tz: "ET",
    },
    {
      id: "in",
      city: "Bengaluru",
      country: "India",
      label: "India & APAC Delivery",
      phone: "+91 80 3165 8865",
      tel: "+918031658865",
      timeZone: "Asia/Kolkata",
      tz: "IST",
    },
  ],
} as const;

export type Pillar =
  | "certifications"
  | "government"
  | "privacy"
  | "testing"
  | "advisory";

export type Framework = {
  slug: string;
  name: string;
  full: string;
  pillar: Pillar;
  region: "Global" | "US" | "EU" | "India" | "APAC";
  blurb: string;
};

export const frameworks: Framework[] = [
  // Certifications & attestations
  { slug: "soc-2", name: "SOC 2", full: "SOC 2 Type I & II", pillar: "certifications", region: "Global", blurb: "Trust Services Criteria attestation for SaaS and service organisations." },
  { slug: "soc-1", name: "SOC 1", full: "SOC 1 (SSAE 18)", pillar: "certifications", region: "Global", blurb: "Controls over financial reporting for service organisations." },
  { slug: "soc-3", name: "SOC 3", full: "SOC 3", pillar: "certifications", region: "Global", blurb: "A public-facing trust report built on your SOC 2." },
  { slug: "iso-27001", name: "ISO 27001", full: "ISO/IEC 27001:2022", pillar: "certifications", region: "Global", blurb: "The international standard for information security management." },
  { slug: "iso-27701", name: "ISO 27701", full: "ISO/IEC 27701", pillar: "certifications", region: "Global", blurb: "Privacy information management layered on ISO 27001." },
  { slug: "iso-42001", name: "ISO 42001", full: "ISO/IEC 42001", pillar: "certifications", region: "Global", blurb: "Responsible governance for AI management systems." },
  { slug: "iso-22301", name: "ISO 22301", full: "ISO 22301", pillar: "certifications", region: "Global", blurb: "Business continuity management that holds under pressure." },
  { slug: "iso-20000", name: "ISO 20000", full: "ISO/IEC 20000-1", pillar: "certifications", region: "Global", blurb: "IT service management, measured and certified." },
  { slug: "iso-9001", name: "ISO 9001", full: "ISO 9001", pillar: "certifications", region: "Global", blurb: "Quality management systems." },
  { slug: "iso-41001", name: "ISO 41001", full: "ISO 41001", pillar: "certifications", region: "Global", blurb: "Facility management systems." },
  { slug: "pci-dss", name: "PCI DSS", full: "PCI DSS v4.0.1", pillar: "certifications", region: "Global", blurb: "Protect cardholder data across the payment ecosystem." },
  // Government & defense
  { slug: "fedramp", name: "FedRAMP", full: "FedRAMP", pillar: "government", region: "US", blurb: "Authorisation to sell cloud services to US federal agencies." },
  { slug: "stateramp", name: "StateRAMP", full: "StateRAMP / GovRAMP", pillar: "government", region: "US", blurb: "Cloud security verification for state and local government." },
  { slug: "cmmc", name: "CMMC", full: "CMMC 2.0", pillar: "government", region: "US", blurb: "Cybersecurity maturity for the Defense Industrial Base." },
  { slug: "nist-800-53", name: "NIST 800-53", full: "NIST SP 800-53 Rev. 5", pillar: "government", region: "US", blurb: "The control catalogue behind federal security programmes." },
  { slug: "itar", name: "ITAR", full: "International Traffic in Arms Regulations", pillar: "government", region: "US", blurb: "Controls for defense articles and technical data." },
  { slug: "ear", name: "EAR", full: "Export Administration Regulations", pillar: "government", region: "US", blurb: "Compliance for dual-use exports and technology." },
  // Privacy & regulatory
  { slug: "gdpr", name: "GDPR", full: "General Data Protection Regulation", pillar: "privacy", region: "EU", blurb: "Lawful, transparent processing of EU personal data." },
  { slug: "dora", name: "DORA", full: "Digital Operational Resilience Act", pillar: "privacy", region: "EU", blurb: "ICT risk and resilience for EU financial entities." },
  { slug: "ccpa", name: "CCPA", full: "CCPA / CPRA", pillar: "privacy", region: "US", blurb: "Consumer privacy rights for California residents." },
  { slug: "hipaa", name: "HIPAA", full: "HIPAA", pillar: "privacy", region: "US", blurb: "Safeguards for protected health information." },
  { slug: "dpdpa", name: "DPDPA", full: "Digital Personal Data Protection Act, 2023", pillar: "privacy", region: "India", blurb: "India's personal data protection law, operationalised." },
  { slug: "sebi-cscrf", name: "SEBI CSCRF", full: "SEBI Cybersecurity & Cyber Resilience Framework", pillar: "privacy", region: "India", blurb: "Cyber resilience for SEBI-regulated entities." },
  { slug: "pdpa", name: "PDPA", full: "Personal Data Protection Act", pillar: "privacy", region: "APAC", blurb: "Data protection obligations across Singapore and APAC." },
  // Advisory
  { slug: "nist-csf", name: "NIST CSF", full: "NIST Cybersecurity Framework 2.0", pillar: "advisory", region: "Global", blurb: "A common language for cyber risk, from board to engineer." },
  { slug: "itgc", name: "ITGC", full: "IT General Controls", pillar: "advisory", region: "Global", blurb: "Access, change and operations controls auditors rely on." },
  { slug: "risk-assessment", name: "Risk Assessment", full: "Cyber Risk Assessment", pillar: "advisory", region: "Global", blurb: "Know what matters, what's exposed and what to fix first." },
  { slug: "unified-audits", name: "Unified Audits", full: "Unified Security Audits", pillar: "advisory", region: "Global", blurb: "One audit cycle mapped to many frameworks." },
];

export const testingServices = [
  { slug: "application-penetration-testing", name: "Application Penetration Testing", blurb: "Web, mobile and API testing that goes beyond scanners." },
  { slug: "network-penetration-testing", name: "Network Penetration Testing", blurb: "Internal and external attack paths, proven and prioritised." },
  { slug: "vulnerability-assessment", name: "Network Vulnerability Testing", blurb: "Methodical discovery of the weaknesses hiding in plain sight." },
  { slug: "source-code-review", name: "Source Code Review", blurb: "Secure code review that finds what runtime testing misses." },
  { slug: "ransomware-preparedness", name: "Ransomware Preparedness Exercise", blurb: "Tabletop simulations so the first time isn't the real time." },
  { slug: "phishing-simulation", name: "Phishing Response Exercise", blurb: "Realistic campaigns that turn employees into a control." },
];

export const pillars: {
  id: Pillar;
  title: string;
  short: string;
  href: string;
  description: string;
}[] = [
  { id: "certifications", title: "Certifications & Attestations", short: "Certify", href: "/certifications", description: "SOC, ISO and PCI programmes from readiness to report." },
  { id: "government", title: "Government & Defense", short: "Authorise", href: "/government", description: "FedRAMP, StateRAMP, CMMC, NIST 800-53, ITAR and EAR." },
  { id: "privacy", title: "Privacy & Regulatory", short: "Regulate", href: "/privacy", description: "GDPR, DPDPA, HIPAA, CCPA, DORA, SEBI and PDPA." },
  { id: "testing", title: "Security Testing", short: "Test", href: "/security-testing", description: "Offensive testing that proves your controls actually work." },
  { id: "advisory", title: "GRC Advisory", short: "Advise", href: "/advisory", description: "Risk, governance and unified audit programmes." },
];

export const industries = [
  { slug: "saas", name: "SaaS & Cloud", line: "Close enterprise deals faster with a trust story buyers believe.", frameworks: ["SOC 2", "ISO 27001", "ISO 42001", "GDPR"] },
  { slug: "fintech", name: "Fintech & Payments", line: "Protect every transaction without slowing a single one.", frameworks: ["PCI DSS", "SOC 1", "DORA", "SEBI CSCRF"] },
  { slug: "defense", name: "Defense & GovTech", line: "Win federal and DIB contracts with authorisation in hand.", frameworks: ["FedRAMP", "CMMC", "NIST 800-53", "ITAR"] },
  { slug: "healthcare", name: "Healthcare & Life Sciences", line: "Keep patient data private and auditors satisfied.", frameworks: ["HIPAA", "ISO 27701", "SOC 2", "GDPR"] },
  { slug: "bfsi", name: "Banking & Insurance", line: "Operational resilience regulators can see and trust.", frameworks: ["DORA", "ISO 22301", "ITGC", "NIST CSF"] },
  { slug: "ai", name: "AI Companies", line: "Govern models and data before regulation forces your hand.", frameworks: ["ISO 42001", "ISO 27701", "DPDPA", "SOC 2"] },
];

export type NavLink = { name: string; href: string; desc?: string };
export type NavItem = {
  label: string;
  href: string;
  groups?: { title: string; items: NavLink[] }[];
  feature?: { eyebrow: string; title: string; href: string; cta: string };
};

const fw = (p: Pillar, n?: number): NavLink[] =>
  frameworks
    .filter((f) => f.pillar === p)
    .slice(0, n)
    .map((f) => ({ name: f.name, href: `/compliance/${f.slug}` }));

export const navigation: NavItem[] = [
  {
    label: "Compliance",
    href: "/compliance",
    groups: [
      { title: "Certifications", items: fw("certifications", 8) },
      { title: "Government & Defense", items: fw("government") },
      { title: "Privacy & Regulatory", items: fw("privacy") },
      { title: "GRC Advisory", items: fw("advisory") },
    ],
    feature: { eyebrow: "Framework Finder", title: "Not sure which frameworks apply to you?", href: "/framework-finder", cta: "Find out in 2 minutes" },
  },
  {
    label: "Security Testing",
    href: "/security-testing",
    groups: [{ title: "Offensive Security", items: testingServices.map((t) => ({ name: t.name, href: `/security-testing/${t.slug}`, desc: t.blurb })) }],
    feature: { eyebrow: "Security Testing", title: "Compliance says you're secure. Testing proves it.", href: "/security-testing", cta: "Explore testing" },
  },
  {
    label: "Industries",
    href: "/industries",
    groups: [{ title: "Who we serve", items: industries.map((i) => ({ name: i.name, href: `/industries/${i.slug}`, desc: i.line })) }],
    feature: { eyebrow: "Industries", title: "Frameworks mapped to how your sector actually works.", href: "/industries", cta: "See all industries" },
  },
  { label: "Customers", href: "/customers" },
  {
    label: "Resources",
    href: "/insights",
    groups: [
      {
        title: "Learn",
        items: [
          { name: "Insights", href: "/insights", desc: "Guides and field notes from the audit floor." },
          { name: "Customer stories", href: "/customers", desc: "How teams unified their compliance." },
          { name: "Framework Finder", href: "/framework-finder", desc: "Which frameworks apply to you?" },
          { name: "All frameworks", href: "/compliance", desc: "Every standard and regulation we cover." },
        ],
      },
      {
        title: "Company",
        items: [
          { name: "About SecureKnots", href: "/about", desc: "Our mission, approach and people." },
          { name: "Careers", href: "/careers", desc: "Join a team of practitioners." },
          { name: "Contact", href: "/contact", desc: "Talk to an expert." },
        ],
      },
    ],
    feature: { eyebrow: "Customer stories", title: "See how teams tied their compliance together.", href: "/customers", cta: "Read stories" },
  },
];
