// Content for security testing services and industry pages.

export const testingContent: Record<
  string,
  { headline: string; overview: string; scope: string[]; method: { t: string; d: string }[]; deliverables: string[] }
> = {
  "application-penetration-testing": {
    headline: "Find the flaws scanners can't.",
    overview: "Manual, methodical testing of web applications, mobile apps and APIs — aligned to OWASP and focused on the business logic attackers actually abuse.",
    scope: ["Web applications", "iOS & Android apps", "REST & GraphQL APIs", "Authentication & session flows", "Business logic & authorisation"],
    method: [
      { t: "Recon & threat model", d: "Map the attack surface and the data that matters." },
      { t: "Automated + manual testing", d: "Tooling for coverage, humans for depth." },
      { t: "Exploitation", d: "Proof-of-concept for every material finding." },
      { t: "Retest", d: "Verify fixes and issue an updated report." },
    ],
    deliverables: ["Executive summary", "Technical findings with CVSS", "Reproduction steps", "Remediation guidance", "Retest letter"],
  },
  "network-penetration-testing": {
    headline: "See your network the way attackers do.",
    overview: "Internal and external infrastructure testing that chains weaknesses into real attack paths — then shows you how to break the chain.",
    scope: ["External perimeter", "Internal network", "Active Directory", "Cloud (AWS, Azure, GCP)", "Wireless & segmentation"],
    method: [
      { t: "Discovery", d: "Hosts, services and exposure." },
      { t: "Exploitation", d: "Controlled exploitation of vulnerabilities." },
      { t: "Lateral movement", d: "Privilege escalation and pivoting." },
      { t: "Segmentation testing", d: "Verify isolation, including for PCI." },
    ],
    deliverables: ["Attack path narrative", "Prioritised findings", "Segmentation results", "Remediation plan", "Retest"],
  },
  "vulnerability-assessment": {
    headline: "Know every weakness, ranked by what matters.",
    overview: "Authenticated and unauthenticated vulnerability assessment across your estate, with false positives removed and risk-based prioritisation.",
    scope: ["Servers & endpoints", "Network devices", "Cloud workloads", "Containers", "Internet-facing assets"],
    method: [
      { t: "Asset discovery", d: "Build an accurate inventory first." },
      { t: "Scanning", d: "Authenticated scans for real depth." },
      { t: "Validation", d: "Manual triage removes noise." },
      { t: "Prioritisation", d: "Exploitability and business context." },
    ],
    deliverables: ["Validated findings", "Risk-ranked remediation list", "Trend dashboard", "Quarterly cadence option"],
  },
  "source-code-review": {
    headline: "Security flaws, caught before they ship.",
    overview: "Secure code review combining static analysis with expert manual review of the code paths that handle authentication, authorisation and sensitive data.",
    scope: ["Authentication & crypto", "Input handling & injection", "Authorisation logic", "Secrets & configuration", "Third-party dependencies"],
    method: [
      { t: "Architecture review", d: "Understand trust boundaries." },
      { t: "SAST", d: "Automated analysis for breadth." },
      { t: "Manual review", d: "Expert eyes on high-risk code." },
      { t: "Developer walkthrough", d: "Fixes explained in your stack." },
    ],
    deliverables: ["Findings mapped to code", "Fix recommendations", "Secure coding guidance", "Developer session"],
  },
  "ransomware-preparedness": {
    headline: "Rehearse the worst day before it happens.",
    overview: "Facilitated tabletop exercises that simulate a realistic ransomware attack — testing decisions, communications and recovery across technical and executive teams.",
    scope: ["Executive leadership", "IT & security operations", "Legal & communications", "Backup & recovery", "Third-party dependencies"],
    method: [
      { t: "Scenario design", d: "Built around your real systems and threats." },
      { t: "Facilitated exercise", d: "Injects that escalate over time." },
      { t: "Recovery validation", d: "Can you actually restore?" },
      { t: "After-action review", d: "Gaps, owners and dates." },
    ],
    deliverables: ["Scenario pack", "After-action report", "Playbook updates", "Improvement roadmap"],
  },
  "phishing-simulation": {
    headline: "Turn your people into a control.",
    overview: "Realistic phishing campaigns with just-in-time training, measuring how your organisation spots and reports attacks over time.",
    scope: ["Email phishing", "Credential harvesting", "Attachment & link payloads", "SMS & voice (vishing)", "Reporting behaviour"],
    method: [
      { t: "Baseline", d: "Measure where you start." },
      { t: "Campaigns", d: "Varied, realistic scenarios." },
      { t: "Training", d: "Short lessons at the moment of failure." },
      { t: "Trend reporting", d: "Click and report rates over time." },
    ],
    deliverables: ["Campaign reports", "Department benchmarks", "Training completion", "Trend dashboard"],
  },
};

export const industryContent: Record<string, { headline: string; intro: string; pains: string[]; programme: { t: string; d: string }[] }> = {
  saas: {
    headline: "Trust is your fastest sales channel.",
    intro: "Enterprise buyers want proof before they sign. We build the programme that turns security reviews from blockers into accelerators.",
    pains: ["Security questionnaires slowing every deal", "SOC 2 requested, ISO required in EMEA", "AI features raising new governance questions"],
    programme: [
      { t: "SOC 2 + ISO 27001", d: "One control set, two reports." },
      { t: "Trust centre content", d: "Public-ready documentation and SOC 3." },
      { t: "Pentest on a cadence", d: "Evidence buyers ask for, every year." },
    ],
  },
  fintech: {
    headline: "Security at the speed of payments.",
    intro: "Card networks, regulators and bank partners all want assurance. We unify PCI, ISO and regulatory requirements into one programme.",
    pains: ["PCI scope creeping across production", "Bank partner due diligence", "RBI, SEBI and DORA obligations stacking up"],
    programme: [
      { t: "PCI DSS v4.0.1", d: "Scope reduction and assessment readiness." },
      { t: "Regulatory frameworks", d: "SEBI CSCRF, DORA and more." },
      { t: "Resilience testing", d: "VAPT and ransomware exercises." },
    ],
  },
  defense: {
    headline: "Contract eligibility, secured.",
    intro: "From CMMC to FedRAMP, the federal market rewards suppliers who can prove security. We get you there with scoping that keeps costs sane.",
    pains: ["CUI spread across the business", "SPRS scores putting renewals at risk", "Federal cloud buyers requiring FedRAMP"],
    programme: [
      { t: "CMMC Level 2", d: "Enclave design and 800-171 implementation." },
      { t: "FedRAMP / StateRAMP", d: "Boundary, SSP and ConMon." },
      { t: "ITAR & EAR", d: "Technology control plans." },
    ],
  },
  healthcare: {
    headline: "Protect patients. Satisfy partners.",
    intro: "Health data is the most sensitive data there is. We build HIPAA, GDPR and ISO programmes that hospitals and payers trust.",
    pains: ["Hospital security reviews", "US and EU privacy rules colliding", "No documented HIPAA risk analysis"],
    programme: [
      { t: "HIPAA risk analysis", d: "Documented, remediated, repeatable." },
      { t: "ISO 27001 + 27701", d: "Certified security and privacy." },
      { t: "SOC 2 + HIPAA", d: "A report partners recognise." },
    ],
  },
  bfsi: {
    headline: "Resilience regulators can see.",
    intro: "Operational resilience is now a board-level obligation. We help banks and insurers meet DORA and build programmes that hold under pressure.",
    pains: ["Hundreds of ICT third parties", "Continuity plans never exercised", "Board reporting in technical jargon"],
    programme: [
      { t: "DORA", d: "Gap closure, register and testing." },
      { t: "ISO 22301", d: "Continuity management, certified." },
      { t: "NIST CSF reporting", d: "Maturity the board understands." },
    ],
  },
  ai: {
    headline: "Govern AI with confidence.",
    intro: "Buyers and regulators are asking how you build, train and deploy AI. ISO 42001 gives you a certifiable answer.",
    pains: ["Model governance questions in every deal", "Unclear training data provenance", "Privacy laws applying to AI pipelines"],
    programme: [
      { t: "ISO 42001", d: "AI management system, certified." },
      { t: "Privacy by design", d: "DPDPA, GDPR and ISO 27701 for AI." },
      { t: "SOC 2 + ISO 27001", d: "The security foundation beneath it." },
    ],
  },
};
