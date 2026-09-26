// Insight articles. Educational guidance written for the site — review with the client before launch.

export type Article = {
  slug: string;
  tag: string;
  kicker: string;
  title: string;
  excerpt: string;
  minutes: number;
  body: { h?: string; p?: string; list?: string[] }[];
};

export const articles: Article[] = [
  {
    slug: "soc-2-type-1-vs-type-2",
    tag: "SOC 2",
    kicker: "For SaaS founders",
    title: "SOC 2 Type I vs Type II: which one do you need first?",
    excerpt: "Both reports matter — but the order you get them in can decide whether a deal closes this quarter or next year.",
    minutes: 6,
    body: [
      { p: "Enterprise buyers increasingly ask for a SOC 2 report before they sign. The first question most founders face is whether to pursue a Type I or a Type II report." },
      { h: "What each report proves", p: "A Type I report evaluates whether your controls are suitably designed at a single point in time. A Type II report evaluates whether those controls operated effectively over an observation period, typically three to twelve months." },
      { h: "When Type I makes sense", list: ["A large deal needs evidence this quarter", "You're establishing controls for the first time", "You want a structured dry run before a Type II window"] },
      { h: "When to go straight to Type II", list: ["Controls have been operating for months already", "Your buyers explicitly require Type II", "You want to avoid paying for two separate engagements"] },
      { h: "Our recommendation", p: "If you have a deadline, a Type I followed immediately by a Type II observation window gives you something to share now and the stronger report soon after. Start collecting evidence on day one so the Type II window begins as early as possible." },
    ],
  },
  {
    slug: "cmmc-level-2-readiness",
    tag: "CMMC",
    kicker: "For the Defense Industrial Base",
    title: "CMMC 2.0 Level 2: a readiness checklist for defense suppliers",
    excerpt: "Scoping, documentation and the practices assessors most often find missing.",
    minutes: 8,
    body: [
      { p: "CMMC 2.0 Level 2 aligns to the 110 security requirements in NIST SP 800-171. For most suppliers handling CUI, it will be verified by an authorised C3PAO." },
      { h: "1. Find your CUI", p: "Map where CUI enters, where it's stored and who touches it. Everything that processes, stores or transmits CUI — and everything that protects those assets — is in scope." },
      { h: "2. Shrink the scope", p: "An enclave approach, where CUI lives in a dedicated environment, is often the most cost-effective path for small and mid-sized suppliers." },
      { h: "3. Document properly", list: ["A System Security Plan describing how each requirement is met", "A POA&M for gaps, within the limits CMMC allows", "An accurate SPRS score submitted and maintained"] },
      { h: "4. Watch the usual gaps", list: ["Multi-factor authentication for all relevant access", "FIPS-validated encryption for CUI", "Audit logging and review", "Incident reporting procedures"] },
      { h: "5. Rehearse", p: "A mock assessment against the assessment objectives surfaces weak evidence before the C3PAO does." },
    ],
  },
  {
    slug: "dpdpa-what-to-do-now",
    tag: "DPDPA",
    kicker: "For Indian enterprises",
    title: "India's DPDPA: what data fiduciaries should operationalise now",
    excerpt: "A practical starting point for consent, notices, rights and breach readiness.",
    minutes: 7,
    body: [
      { p: "The Digital Personal Data Protection Act, 2023 creates clear duties for organisations that determine how digital personal data is processed. The DPDP Rules phase in obligations, which makes now the right time to prepare." },
      { h: "Start with a data inventory", p: "You cannot write accurate notices or honour rights without knowing what personal data you hold, why, and where it flows." },
      { h: "Rework notices and consent", list: ["Itemised, plain-language notices", "Consent that is free, specific, informed and unambiguous", "Easy withdrawal, as easy as giving consent"] },
      { h: "Build rights and grievance workflows", p: "Data principals can request access, correction and erasure and must have a grievance channel. Define owners and response times." },
      { h: "Prepare for breaches", p: "Put reasonable security safeguards in place and define how you will intimate the Data Protection Board and affected individuals." },
    ],
  },
  {
    slug: "iso-27001-2022-transition",
    tag: "ISO 27001",
    kicker: "For certified organisations",
    title: "What actually changed in ISO 27001:2022",
    excerpt: "Fewer, reorganised controls — and a handful of genuinely new ones worth taking seriously.",
    minutes: 5,
    body: [
      { p: "ISO/IEC 27001:2022 reorganised Annex A from 114 controls in 14 domains to 93 controls in four themes: organisational, people, physical and technological." },
      { h: "New controls to plan for", list: ["Threat intelligence", "Information security for cloud services", "ICT readiness for business continuity", "Physical security monitoring", "Configuration management", "Information deletion", "Data masking", "Data leakage prevention", "Monitoring activities", "Web filtering", "Secure coding"] },
      { h: "What to do", p: "Update your risk assessment and Statement of Applicability, implement the new controls where relevant, and make sure internal audit covers them before your transition audit." },
    ],
  },
  {
    slug: "pci-dss-4-future-dated",
    tag: "PCI DSS",
    kicker: "For payments teams",
    title: "PCI DSS v4.0.1: the requirements that are now mandatory",
    excerpt: "The future-dated requirements are no longer in the future. Here's where teams stumble.",
    minutes: 6,
    body: [
      { p: "PCI DSS v4.0 introduced requirements that were best practice until 31 March 2025. They are now mandatory for assessments." },
      { h: "Areas that need attention", list: ["Targeted risk analyses to justify control frequencies", "MFA for all access into the cardholder data environment", "Automated mechanisms to detect and protect against phishing", "Management of payment page scripts", "Authenticated internal vulnerability scanning"] },
      { h: "The practical path", p: "Re-scope first. Every system removed from scope is a system you don't have to evidence against the new requirements." },
    ],
  },
  {
    slug: "fedramp-reuse-soc2",
    tag: "FedRAMP",
    kicker: "For cloud providers",
    title: "Reusing SOC 2 for FedRAMP: what carries over and what doesn't",
    excerpt: "A realistic look at the crosswalk from Trust Services Criteria to NIST 800-53.",
    minutes: 7,
    body: [
      { p: "Many cloud companies arrive at FedRAMP with a SOC 2 report. That foundation helps — but FedRAMP is more prescriptive." },
      { h: "What carries over", list: ["Governance, policies and risk management", "Access control and change management processes", "Incident response and vendor management"] },
      { h: "What's new", list: ["A formally defined authorisation boundary", "FIPS-validated cryptography", "Specific configuration baselines", "Monthly continuous monitoring deliverables", "Detailed SSP documentation per control"] },
      { h: "Plan realistically", p: "Treat SOC 2 as a head start, not a shortcut. The documentation and boundary work is where most of the effort goes." },
    ],
  },
];

export const articleBySlug = (slug: string) => articles.find((a) => a.slug === slug);
