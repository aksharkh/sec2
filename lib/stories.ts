// ⚠️ SAMPLE CUSTOMER STORIES
// These are illustrative placeholders so the Customers pages can be designed and reviewed.
// Company names, people, quotes and figures are FICTIONAL. Every story has `sample: true`,
// which renders a visible "Sample story" label. Replace each one with a real, client-approved
// case study (and set sample: false) before launch. Never publish invented testimonials.

export type Story = {
  slug: string;
  sample: boolean;
  company: string;
  mark: string; // short wordmark text used for the generated logo
  industry: string;
  region: string;
  size: string;
  frameworks: string[];
  headline: string;
  summary: string;
  hue: number; // drives the generated artwork
  stats: { v: string; l: string }[];
  quote: { text: string; name: string; role: string };
  challenge: string[];
  approach: { t: string; d: string }[];
  results: string[];
};

export const stories: Story[] = [
  {
    slug: "northwind-pay",
    sample: true,
    company: "Northwind Pay",
    mark: "northwind",
    industry: "Fintech & Payments",
    region: "India & UAE",
    size: "250 employees",
    frameworks: ["PCI DSS", "ISO 27001", "SEBI CSCRF"],
    headline: "One programme for PCI DSS, ISO 27001 and SEBI — delivered in a single audit season.",
    summary: "A fast-growing payments platform consolidated three separate compliance projects into one unified control set.",
    hue: 222,
    stats: [
      { v: "3", l: "frameworks, one evidence library" },
      { v: "11 wks", l: "from kickoff to PCI readiness" },
      { v: "−58%", l: "duplicate evidence requests" },
    ],
    quote: {
      text: "We stopped running three audits and started running one programme. Our engineers finally got their sprints back.",
      name: "Aanya Rao",
      role: "Head of Security",
    },
    challenge: [
      "Three consultancies, three spreadsheets and three sets of evidence requests hitting the same engineers.",
      "A card-data environment that had quietly grown to include half the production estate.",
      "A regulator deadline for cyber-resilience reporting landing in the same quarter as the PCI assessment.",
    ],
    approach: [
      { t: "Scope first", d: "Tokenisation and segmentation cut the cardholder data environment to a handful of services." },
      { t: "Unified controls", d: "One control framework mapped to PCI DSS v4.0.1, ISO 27001 Annex A and SEBI CSCRF." },
      { t: "Evidence once", d: "A shared evidence library tagged to every framework, collected on a single calendar." },
      { t: "Prove it", d: "Internal and external penetration tests and ASV scans aligned to both PCI and CSCRF." },
    ],
    results: ["PCI DSS ROC with no major findings", "ISO 27001 Stage 2 passed first time", "CSCRF reporting delivered ahead of deadline"],
  },
  {
    slug: "helix-cloud",
    sample: true,
    company: "Helix Cloud",
    mark: "helix",
    industry: "SaaS & Cloud",
    region: "United States",
    size: "120 employees",
    frameworks: ["SOC 2", "FedRAMP"],
    headline: "From SOC 2 to FedRAMP Moderate readiness — without starting over.",
    summary: "A data-platform startup reused its SOC 2 foundation to build a federal authorisation package.",
    hue: 205,
    stats: [
      { v: "68%", l: "of SOC 2 controls reused for 800-53" },
      { v: "5 mo", l: "to 3PAO readiness" },
      { v: "1", l: "authorisation boundary, clearly defined" },
    ],
    quote: {
      text: "They knew exactly which of our SOC 2 controls would carry into FedRAMP and which wouldn't. No wasted motion.",
      name: "Marcus Hale",
      role: "CTO",
    },
    challenge: [
      "A federal agency sponsor was ready — the security package wasn't.",
      "A multi-tenant architecture with no clear authorisation boundary.",
      "A lean team that couldn't pause product work for a year.",
    ],
    approach: [
      { t: "Boundary design", d: "A dedicated federal environment with clear data flows and inherited cloud controls." },
      { t: "Crosswalk", d: "SOC 2 criteria mapped to NIST 800-53 Rev. 5 Moderate to find genuine gaps." },
      { t: "SSP authoring", d: "System Security Plan and attachments written alongside engineers." },
      { t: "ConMon", d: "Scanning, POA&M and monthly reporting designed to be sustainable." },
    ],
    results: ["3PAO readiness assessment passed", "SSP accepted for review", "Continuous monitoring running monthly"],
  },
  {
    slug: "meridian-health",
    sample: true,
    company: "Meridian Health",
    mark: "meridian",
    industry: "Healthcare & Life Sciences",
    region: "United States & EU",
    size: "400 employees",
    frameworks: ["HIPAA", "ISO 27701", "GDPR"],
    headline: "A single privacy programme across HIPAA, GDPR and ISO 27701.",
    summary: "A telehealth provider unified US and EU privacy obligations and certified its privacy management system.",
    hue: 195,
    stats: [
      { v: "1", l: "privacy programme, two continents" },
      { v: "30 days", l: "average DSR response cut to 7" },
      { v: "0", l: "major nonconformities" },
    ],
    quote: {
      text: "HIPAA and GDPR used to feel like two different companies. Now it's one playbook with local chapters.",
      name: "Dr. Elena Park",
      role: "Chief Privacy Officer",
    },
    challenge: [
      "Separate US and EU teams with conflicting data-handling rules.",
      "Data subject requests handled by email and memory.",
      "Enterprise hospital customers demanding certified evidence.",
    ],
    approach: [
      { t: "Data mapping", d: "Records of processing and PHI flows across every product and vendor." },
      { t: "Rights workflows", d: "Automated intake and fulfilment for access and erasure requests." },
      { t: "Risk analysis", d: "HIPAA security risk analysis and GDPR DPIAs from one method." },
      { t: "Certify", d: "ISO 27701 extension to the existing ISO 27001 ISMS." },
    ],
    results: ["ISO 27701 certified", "HIPAA risk analysis completed and remediated", "DSR response time down to days"],
  },
  {
    slug: "atlas-defense",
    sample: true,
    company: "Atlas Precision",
    mark: "atlas",
    industry: "Defense & GovTech",
    region: "United States",
    size: "180 employees",
    frameworks: ["CMMC", "NIST 800-171", "ITAR"],
    headline: "A CUI enclave that kept a defense manufacturer contract-eligible.",
    summary: "A precision manufacturer scoped CUI into a compact enclave and prepared for CMMC Level 2.",
    hue: 230,
    stats: [
      { v: "−80%", l: "systems in CUI scope" },
      { v: "110", l: "800-171 requirements implemented" },
      { v: "Ready", l: "for C3PAO assessment" },
    ],
    quote: {
      text: "Scoping was the whole game. Shrinking where CUI lives made CMMC achievable for a company our size.",
      name: "Robert Kline",
      role: "VP Operations",
    },
    challenge: [
      "CUI spread across email, file shares and shop-floor systems.",
      "A low SPRS score putting contract renewals at risk.",
      "ITAR technical data shared with a global engineering team.",
    ],
    approach: [
      { t: "Enclave", d: "A dedicated CUI enclave with US-person access controls." },
      { t: "Implement", d: "NIST SP 800-171 requirements with SSP and POA&M." },
      { t: "Train", d: "CUI handling and ITAR awareness for every role." },
      { t: "Mock assess", d: "A full mock assessment against CMMC Level 2 objectives." },
    ],
    results: ["SPRS score substantially improved", "Technology control plan in force", "Mock assessment passed"],
  },
  {
    slug: "lumen-ai",
    sample: true,
    company: "Lumen AI",
    mark: "lumen",
    industry: "AI Companies",
    region: "India & United States",
    size: "90 employees",
    frameworks: ["ISO 42001", "ISO 27001", "DPDPA"],
    headline: "Responsible AI, certified — before the enterprise buyers asked.",
    summary: "An applied-AI company built an AI management system alongside its ISMS to win regulated customers.",
    hue: 250,
    stats: [
      { v: "2", l: "management systems, one team" },
      { v: "14", l: "AI systems impact-assessed" },
      { v: "4 mo", l: "to certification readiness" },
    ],
    quote: {
      text: "ISO 42001 gave our customers a way to trust how we build models, not just how we secure servers.",
      name: "Karthik Iyer",
      role: "Co-founder & CEO",
    },
    challenge: [
      "Enterprise banks asking detailed questions about model governance.",
      "Training data sourced from many places with unclear consent.",
      "No single owner for AI risk.",
    ],
    approach: [
      { t: "AI inventory", d: "Every model, dataset and third-party AI service catalogued." },
      { t: "Impact assessment", d: "Documented effects on individuals and treatment decisions." },
      { t: "Lifecycle controls", d: "Data quality, evaluation and monitoring built into ML pipelines." },
      { t: "Integrate", d: "AIMS and ISMS sharing risk, audit and management review." },
    ],
    results: ["ISO 42001 & 27001 audit-ready", "DPDPA consent flows redesigned", "AI governance board established"],
  },
  {
    slug: "harbor-insure",
    sample: true,
    company: "Harbor Mutual",
    mark: "harbor",
    industry: "Banking & Insurance",
    region: "European Union",
    size: "1,200 employees",
    frameworks: ["DORA", "ISO 22301", "NIST CSF"],
    headline: "DORA gap closure and a resilience programme the board can see.",
    summary: "An EU insurer mapped its ICT third parties and turned continuity plans into rehearsed playbooks.",
    hue: 215,
    stats: [
      { v: "300+", l: "ICT providers in the register" },
      { v: "6", l: "scenario exercises run" },
      { v: "Q1", l: "board-level resilience reporting" },
    ],
    quote: {
      text: "For the first time our board sees ICT risk in the same language as financial risk.",
      name: "Sophie Laurent",
      role: "Chief Risk Officer",
    },
    challenge: [
      "No consolidated register of ICT third-party arrangements.",
      "Continuity plans written years ago and never exercised.",
      "Incident classification that didn't match DORA thresholds.",
    ],
    approach: [
      { t: "Register", d: "Register of information for every ICT third-party arrangement." },
      { t: "Classify", d: "Incident classification and reporting aligned to DORA." },
      { t: "Exercise", d: "Scenario-based continuity exercises with executives." },
      { t: "Report", d: "NIST CSF profile turned into board reporting." },
    ],
    results: ["DORA gaps closed on schedule", "ISO 22301 certification achieved", "Quarterly resilience reporting to the board"],
  },
];

export const storyBySlug = (slug: string) => stories.find((s) => s.slug === slug);
