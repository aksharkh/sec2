// Long-form content for each framework page. Keyed by slug from lib/site.ts.
// Keep claims factual and general — this is guidance, not legal advice.

export type FrameworkContent = {
  headline: string;
  overview: string;
  who: string[];
  areas: { t: string; d: string }[];
  timeline: string;
  outcome: string;
  faqs: { q: string; a: string }[];
};

const soc: Omit<FrameworkContent, "headline" | "overview" | "outcome"> = {
  who: [
    "SaaS and cloud providers selling to mid-market and enterprise buyers",
    "Service organisations that store, process or transmit customer data",
    "Teams answering long security questionnaires in every sales cycle",
  ],
  areas: [
    { t: "Security (Common Criteria)", d: "Access, change management, risk, monitoring and incident response — required in every report." },
    { t: "Availability", d: "Capacity, backup, recovery and resilience commitments made to customers." },
    { t: "Confidentiality", d: "Protection of information designated as confidential across its lifecycle." },
    { t: "Processing Integrity", d: "Complete, valid, accurate and timely system processing." },
    { t: "Privacy", d: "Collection, use, retention and disposal of personal information." },
  ],
  timeline: "Readiness in 6–12 weeks · Type I point-in-time · Type II over a 3–12 month observation window",
  faqs: [
    { q: "Type I or Type II first?", a: "Type I proves controls are designed correctly at a point in time and is often the fastest way to unblock a deal. Type II proves they operated effectively over a period and is what most enterprise buyers ultimately require." },
    { q: "Do you perform the audit?", a: "SOC reports must be issued by an independent licensed CPA firm. We prepare you, run readiness, manage evidence and support you through the audit with the firm of your choice." },
  ],
};

const iso = (std: string, focus: string): Omit<FrameworkContent, "headline" | "overview" | "outcome" | "areas"> => ({
  who: [
    `Organisations whose customers, partners or tenders require ${std} certification`,
    `Teams that want a management-system approach to ${focus}`,
    "Companies expanding into EU, Middle East and APAC markets where ISO is the default",
  ],
  timeline: "Gap assessment in 2–3 weeks · implementation 2–6 months · Stage 1 and Stage 2 certification audits",
  faqs: [
    { q: "Who issues the certificate?", a: "An accredited certification body. We build and operate the management system with you, run internal audits and support you through Stage 1 and Stage 2." },
    { q: "Can this share work with other frameworks?", a: "Yes. Most ISO management-system clauses (context, leadership, risk, internal audit, management review) are common across standards, so we build them once and extend them." },
  ],
});

export const frameworkContent: Record<string, FrameworkContent> = {
  "soc-2": {
    headline: "Turn security reviews into a sales advantage.",
    overview:
      "SOC 2 is the AICPA attestation that tells customers your controls around security, availability, confidentiality, processing integrity and privacy are designed well — and actually work. We take you from zero to report without derailing your roadmap.",
    ...soc,
    outcome: "A clean SOC 2 report, an evidence library you reuse every year, and faster security reviews.",
  },
  "soc-1": {
    headline: "Give your customers' auditors what they need.",
    overview:
      "SOC 1 (SSAE 18) reports on controls relevant to your customers' financial reporting. If you run payroll, billing, payments or financial processing for others, their auditors will ask for it.",
    ...soc,
    areas: [
      { t: "Control objectives", d: "Defined around the transaction flows that affect customer financial statements." },
      { t: "IT general controls", d: "Access, change management and computer operations supporting those flows." },
      { t: "Complementary user entity controls", d: "The controls your customers must operate for the picture to be complete." },
      { t: "Subservice organisations", d: "Carve-out or inclusive treatment of the vendors you rely on." },
    ],
    outcome: "A SOC 1 Type I or II report your customers' auditors can rely on.",
  },
  "soc-3": {
    headline: "A trust report you can publish.",
    overview:
      "SOC 3 is a general-use summary of your SOC 2 examination — built for your website and marketing, without the sensitive detail of a full SOC 2 report.",
    ...soc,
    outcome: "A public SOC 3 report and seal alongside your SOC 2.",
  },
  "iso-27001": {
    headline: "The global standard for information security.",
    overview:
      "ISO/IEC 27001:2022 defines an Information Security Management System (ISMS) — a risk-driven way to run security that is certified by an accredited body and recognised worldwide.",
    ...iso("ISO 27001", "information security"),
    areas: [
      { t: "ISMS clauses 4–10", d: "Context, leadership, planning, support, operation, evaluation and improvement." },
      { t: "Risk assessment & treatment", d: "A repeatable method that drives your Statement of Applicability." },
      { t: "Annex A — 93 controls", d: "Organisational, people, physical and technological controls, selected by risk." },
      { t: "Internal audit & management review", d: "The feedback loop that keeps certification alive." },
    ],
    outcome: "An ISO 27001 certificate, a living ISMS and a clear surveillance-audit rhythm.",
  },
  "iso-27701": {
    headline: "Extend your ISMS into privacy.",
    overview:
      "ISO/IEC 27701 adds a Privacy Information Management System on top of ISO 27001, giving you certifiable evidence of how you handle personal data as a controller or processor.",
    ...iso("ISO 27701", "privacy"),
    areas: [
      { t: "PIMS requirements", d: "Privacy-specific extensions to ISO 27001 clauses and controls." },
      { t: "Controller controls", d: "Lawful basis, consent, notices and data subject rights." },
      { t: "Processor controls", d: "Customer instructions, sub-processors and cross-border transfers." },
      { t: "Mapping to GDPR & DPDPA", d: "Reuse one privacy programme across regulations." },
    ],
    outcome: "ISO 27701 certification and a privacy programme mapped to GDPR and DPDPA.",
  },
  "iso-42001": {
    headline: "Govern AI before regulation governs you.",
    overview:
      "ISO/IEC 42001 is the first certifiable management-system standard for artificial intelligence. It helps you develop, provide or use AI responsibly — with impact assessments, lifecycle controls and clear accountability.",
    ...iso("ISO 42001", "AI governance"),
    areas: [
      { t: "AI policy & roles", d: "Accountability for AI systems from board to engineer." },
      { t: "AI risk & impact assessment", d: "Effects on individuals, groups and society — documented and treated." },
      { t: "AI system lifecycle", d: "Data quality, development, verification, deployment and monitoring controls." },
      { t: "Third-party & supplier AI", d: "Governance over models and services you consume." },
    ],
    outcome: "An AI management system that is certifiable and aligned with emerging AI regulation.",
  },
  "iso-22301": {
    headline: "Keep operating when things go wrong.",
    overview:
      "ISO 22301 specifies a Business Continuity Management System — so disruptions are anticipated, rehearsed and recovered from within the tolerances your customers expect.",
    ...iso("ISO 22301", "business continuity"),
    areas: [
      { t: "Business impact analysis", d: "Prioritised activities, RTOs and RPOs." },
      { t: "Continuity strategies", d: "People, sites, technology, suppliers and information." },
      { t: "Plans & procedures", d: "Incident response, continuity and recovery playbooks." },
      { t: "Exercising & testing", d: "Scenario exercises that prove the plans work." },
    ],
    outcome: "ISO 22301 certification and continuity plans your teams have actually rehearsed.",
  },
  "iso-20000": {
    headline: "IT service management, certified.",
    overview:
      "ISO/IEC 20000-1 sets requirements for a Service Management System — how you plan, deliver and improve IT services to agreed levels.",
    ...iso("ISO 20000", "IT service management"),
    areas: [
      { t: "Service portfolio", d: "Catalogue, capacity and service level management." },
      { t: "Relationship & agreement", d: "Business relationship, supplier and SLA management." },
      { t: "Resolution & fulfilment", d: "Incident, request and problem management." },
      { t: "Assurance", d: "Availability, continuity and information security." },
    ],
    outcome: "An ISO 20000 certificate and measurably better service delivery.",
  },
  "iso-9001": {
    headline: "Quality that customers can verify.",
    overview:
      "ISO 9001 is the world's most widely used quality management standard — a framework for consistent products and services and continual improvement.",
    ...iso("ISO 9001", "quality"),
    areas: [
      { t: "Customer focus", d: "Requirements, satisfaction and feedback loops." },
      { t: "Process approach", d: "Defined, measured and improved processes." },
      { t: "Risk-based thinking", d: "Opportunities and risks that affect quality." },
      { t: "Continual improvement", d: "Nonconformity, corrective action and review." },
    ],
    outcome: "ISO 9001 certification and a quality system that isn't just paperwork.",
  },
  "iso-41001": {
    headline: "Facility management, systematised.",
    overview:
      "ISO 41001 defines a management system for facility management — aligning workplace services with organisational strategy, safety and sustainability goals.",
    ...iso("ISO 41001", "facility management"),
    areas: [
      { t: "FM strategy & policy", d: "Aligning facilities with organisational objectives." },
      { t: "Stakeholder needs", d: "Occupants, owners, regulators and service providers." },
      { t: "Service delivery", d: "Planning, integration and performance of FM services." },
      { t: "Performance evaluation", d: "Monitoring, audit and management review." },
    ],
    outcome: "ISO 41001 certification and a measurable facility management programme.",
  },
  "pci-dss": {
    headline: "Protect every card, every transaction.",
    overview:
      "PCI DSS v4.0.1 is the global standard for any entity that stores, processes or transmits cardholder data. We scope it tightly, reduce what's in scope, and get you to a clean ROC or SAQ.",
    who: [
      "Merchants, payment facilitators and payment gateways",
      "Service providers handling cardholder data on behalf of others",
      "Fintechs and SaaS platforms embedding payments",
    ],
    areas: [
      { t: "Scope & segmentation", d: "Cardholder data environment defined and minimised." },
      { t: "12 requirements", d: "Network security, data protection, vulnerability management, access, monitoring and policy." },
      { t: "v4.0 changes", d: "Customised approach, targeted risk analyses and new MFA and phishing requirements." },
      { t: "Testing", d: "ASV scans and internal and external penetration tests." },
    ],
    timeline: "Scoping in 1–2 weeks · remediation 2–4 months · annual assessment (ROC by a QSA or SAQ)",
    outcome: "A reduced PCI scope, a remediated environment and a smooth QSA assessment.",
    faqs: [
      { q: "ROC or SAQ?", a: "It depends on your merchant or service-provider level and how you handle card data. We determine the right validation path during scoping." },
      { q: "How do we reduce scope?", a: "Tokenisation, network segmentation and outsourcing card capture to validated providers can dramatically shrink the environment you must protect and assess." },
    ],
  },
  fedramp: {
    headline: "Your path to the US federal market.",
    overview:
      "FedRAMP standardises security authorisation for cloud services used by US federal agencies. We guide you through boundary definition, NIST 800-53 control implementation, documentation and 3PAO assessment readiness.",
    who: [
      "Cloud service providers selling SaaS, PaaS or IaaS to federal agencies",
      "Vendors with an agency sponsor or pursuing the FedRAMP 20x path",
      "Companies already SOC 2 or ISO certified that want to reuse that work",
    ],
    areas: [
      { t: "Authorisation boundary", d: "What's in, what's out, and how data flows across it." },
      { t: "NIST 800-53 Rev. 5 baselines", d: "Low, Moderate or High control implementation." },
      { t: "System Security Plan", d: "SSP and attachments written to survive review." },
      { t: "Continuous monitoring", d: "Monthly scanning, POA&M and annual assessment." },
    ],
    timeline: "Readiness 3–6 months · 3PAO assessment · agency or programme authorisation",
    outcome: "An authorisation-ready package and a ConMon programme you can sustain.",
    faqs: [
      { q: "Are you a 3PAO?", a: "No — assessments must be performed by an accredited Third Party Assessment Organization. We prepare you so the 3PAO assessment goes smoothly." },
      { q: "Can we reuse SOC 2 or ISO work?", a: "Much of it. Policies, risk management, access and change controls map directly into NIST 800-53 families, which shortens readiness." },
    ],
  },
  stateramp: {
    headline: "Sell cloud to state and local government.",
    overview:
      "StateRAMP (now GovRAMP) verifies the security of cloud solutions used by US state and local governments, built on NIST 800-53 and closely aligned with FedRAMP.",
    who: [
      "Cloud providers serving state agencies, counties, cities and education",
      "Vendors responding to RFPs that require StateRAMP status",
      "FedRAMP providers extending into state markets",
    ],
    areas: [
      { t: "Security category", d: "Impact level selection aligned to data sensitivity." },
      { t: "Control implementation", d: "NIST 800-53 based baselines and documentation." },
      { t: "Progressing & ready status", d: "Snapshot, ready and authorised pathways." },
      { t: "Continuous monitoring", d: "Ongoing reporting to maintain status." },
    ],
    timeline: "Readiness 2–5 months · 3PAO assessment · StateRAMP / GovRAMP review",
    outcome: "StateRAMP-ready documentation and a clear path to authorised status.",
    faqs: [
      { q: "Is StateRAMP the same as FedRAMP?", a: "They share a NIST 800-53 foundation, and FedRAMP work can often be leveraged, but programmes, processes and reviewers differ." },
      { q: "What is GovRAMP?", a: "StateRAMP rebranded as GovRAMP. The purpose — security verification for state and local government cloud services — remains the same." },
    ],
  },
  cmmc: {
    headline: "Stay eligible for defense contracts.",
    overview:
      "CMMC 2.0 verifies that Defense Industrial Base suppliers protect Federal Contract Information and Controlled Unclassified Information. We help you scope CUI, implement NIST SP 800-171 and prepare for self or C3PAO assessment.",
    who: [
      "DoD prime contractors and subcontractors handling FCI or CUI",
      "Manufacturers, engineering and IT firms in the defense supply chain",
      "Companies facing DFARS 7012, 7019, 7020 and 7021 clauses",
    ],
    areas: [
      { t: "Level 1 — Foundational", d: "17 practices protecting FCI, with annual self-assessment." },
      { t: "Level 2 — Advanced", d: "110 NIST SP 800-171 requirements for CUI, typically C3PAO assessed." },
      { t: "Scoping & enclaves", d: "Minimise where CUI lives to minimise cost." },
      { t: "SSP, POA&M & SPRS", d: "Documentation and scoring that stand up to assessment." },
    ],
    timeline: "Gap assessment 2–4 weeks · remediation 3–9 months · self or C3PAO assessment",
    outcome: "A defensible SPRS score, CUI enclave design and assessment readiness.",
    faqs: [
      { q: "Which level do we need?", a: "It depends on the information in your contracts. FCI only generally means Level 1; CUI generally means Level 2. We confirm during scoping." },
      { q: "Are you a C3PAO?", a: "No. We prepare you for assessment by an authorised C3PAO and help you avoid common findings." },
    ],
  },
  "nist-800-53": {
    headline: "The control catalogue behind federal security.",
    overview:
      "NIST SP 800-53 Rev. 5 is the comprehensive catalogue of security and privacy controls that underpins FedRAMP, StateRAMP and many federal programmes — and a strong backbone for any mature security programme.",
    who: [
      "Federal contractors and agencies",
      "Cloud providers pursuing FedRAMP or StateRAMP",
      "Enterprises wanting a rigorous, well-documented control baseline",
    ],
    areas: [
      { t: "20 control families", d: "From Access Control to Supply Chain Risk Management." },
      { t: "Baselines", d: "Low, Moderate and High tailored to impact." },
      { t: "Control tailoring", d: "Scoping, compensating controls and organisation-defined parameters." },
      { t: "Assessment (800-53A)", d: "Procedures that prove each control is effective." },
    ],
    timeline: "Baseline mapping 3–4 weeks · phased implementation · continuous assessment",
    outcome: "A documented, tailored control baseline ready for federal assessment.",
    faqs: [
      { q: "Is 800-53 a certification?", a: "No — it's a control catalogue. It becomes an authorisation or assessment through programmes such as FedRAMP or agency ATOs." },
      { q: "How is it different from 800-171?", a: "800-171 is a subset focused on protecting CUI in non-federal systems; 800-53 is the full catalogue for federal information systems." },
    ],
  },
  itar: {
    headline: "Control defense technical data with confidence.",
    overview:
      "ITAR governs the export of defense articles, services and related technical data on the US Munitions List. We help you build the technical and procedural controls that keep ITAR data with authorised US persons.",
    who: ["Defense manufacturers and engineering firms", "Cloud and IT providers hosting ITAR data", "Companies with foreign-national employees or partners"],
    areas: [
      { t: "Technical data identification", d: "Classify what is ITAR-controlled and where it lives." },
      { t: "Access controls", d: "US-person restrictions across systems, cloud and facilities." },
      { t: "Technology control plan", d: "Documented procedures, training and monitoring." },
      { t: "Incident & disclosure", d: "Handling potential violations responsibly." },
    ],
    timeline: "Assessment 2–4 weeks · controls implementation 1–3 months",
    outcome: "A technology control plan and systems configured for ITAR data.",
    faqs: [
      { q: "Do you provide legal export advice?", a: "No. We implement the security and procedural controls; classification and licensing decisions should involve your export counsel." },
      { q: "Can ITAR data live in the cloud?", a: "It can, in environments designed for it with appropriate access and encryption controls. We help you design and verify those controls." },
    ],
  },
  ear: {
    headline: "Export compliance for dual-use technology.",
    overview:
      "The Export Administration Regulations control dual-use items, software and technology. We help you put the security controls, screening and records in place to support your export compliance programme.",
    who: ["Technology and semiconductor companies", "Software firms with encryption or controlled technology", "Organisations collaborating with foreign persons"],
    areas: [
      { t: "Controlled technology inventory", d: "Where EAR-controlled data and software live." },
      { t: "Deemed exports", d: "Access controls for foreign-person employees and visitors." },
      { t: "Screening & records", d: "Restricted-party screening and recordkeeping." },
      { t: "Training & audit", d: "Keeping the programme effective over time." },
    ],
    timeline: "Assessment 2–3 weeks · implementation 1–3 months",
    outcome: "Security controls and processes that support your EAR compliance programme.",
    faqs: [
      { q: "Do you classify items (ECCN)?", a: "Classification is a legal and engineering determination; we work alongside your counsel and focus on the security and process controls." },
      { q: "What's a deemed export?", a: "Releasing controlled technology to a foreign person in the US is treated as an export to their home country, so access controls matter." },
    ],
  },
  gdpr: {
    headline: "Privacy by design across the EU and beyond.",
    overview:
      "The GDPR governs how personal data of people in the EU is processed. We operationalise it — from records of processing to DPIAs, transfers and data subject rights — so privacy becomes a process, not a panic.",
    who: ["Companies offering goods or services to people in the EU", "Processors handling EU personal data for customers", "Businesses with EU employees or monitoring EU users"],
    areas: [
      { t: "Records of processing", d: "What you collect, why, where it goes and how long you keep it." },
      { t: "Lawful basis & notices", d: "Consent, contracts and legitimate interests done properly." },
      { t: "DPIAs & privacy by design", d: "Assessing high-risk processing before it ships." },
      { t: "Transfers & processors", d: "SCCs, DPAs and vendor oversight." },
      { t: "Data subject rights", d: "Access, erasure and portability workflows that meet deadlines." },
    ],
    timeline: "Assessment 3–4 weeks · programme build 2–4 months · ongoing operation",
    outcome: "A working privacy programme with the documentation regulators expect.",
    faqs: [
      { q: "Do we need a DPO?", a: "Only in certain cases, such as large-scale monitoring or special-category data. We help you decide and can support the role." },
      { q: "Is there a GDPR certification?", a: "Formal GDPR certifications are limited; ISO 27701 is a widely used way to evidence your privacy management system." },
    ],
  },
  dora: {
    headline: "Digital operational resilience for EU finance.",
    overview:
      "DORA applies to EU financial entities and their critical ICT providers. It requires ICT risk management, incident reporting, resilience testing and third-party risk oversight.",
    who: ["EU banks, insurers, investment firms and payment institutions", "ICT third-party providers serving EU financial entities", "Fintechs expanding into the EU"],
    areas: [
      { t: "ICT risk management", d: "Governance, identification, protection, detection, response and recovery." },
      { t: "Incident reporting", d: "Classification and timely reporting of major ICT incidents." },
      { t: "Resilience testing", d: "From vulnerability scans to threat-led penetration testing." },
      { t: "Third-party risk", d: "Register of information and contractual requirements." },
    ],
    timeline: "Gap assessment 3–4 weeks · remediation roadmap · ongoing testing",
    outcome: "A DORA gap closure plan, an ICT third-party register and a tested resilience programme.",
    faqs: [
      { q: "Does DORA apply to non-EU vendors?", a: "Indirectly — EU financial customers must flow requirements down to ICT providers, and critical providers can be directly overseen." },
      { q: "How does it relate to ISO 27001?", a: "ISO 27001 and 22301 cover much of the ground; DORA adds specific reporting, testing and third-party obligations." },
    ],
  },
  ccpa: {
    headline: "Privacy rights for Californians, operationalised.",
    overview:
      "The CCPA, as amended by the CPRA, gives California residents rights over their personal information. We help you map data, update notices and build request workflows.",
    who: ["For-profit businesses meeting CCPA thresholds", "Companies selling or sharing personal information", "Service providers and contractors to covered businesses"],
    areas: [
      { t: "Data inventory", d: "Categories, sources, purposes and disclosures." },
      { t: "Notices & opt-outs", d: "Notice at collection and 'Do Not Sell or Share' mechanisms." },
      { t: "Consumer requests", d: "Know, delete, correct and limit — verified and on time." },
      { t: "Contracts", d: "Service provider and contractor terms." },
    ],
    timeline: "Assessment 2–3 weeks · implementation 1–3 months",
    outcome: "Compliant notices, working request workflows and updated vendor contracts.",
    faqs: [
      { q: "Do we meet the thresholds?", a: "Thresholds include annual revenue and the volume of consumers' data you handle. We assess applicability first." },
      { q: "Does it overlap with GDPR?", a: "Significantly. A single privacy programme can meet both with jurisdiction-specific extensions." },
    ],
  },
  hipaa: {
    headline: "Safeguard health data, prove it to partners.",
    overview:
      "HIPAA's Security and Privacy Rules require covered entities and business associates to protect PHI. We run the required risk analysis, implement safeguards and prepare you for partner due diligence.",
    who: ["Healthcare providers, plans and clearinghouses", "Health-tech and SaaS companies acting as business associates", "Vendors signing BAAs with healthcare customers"],
    areas: [
      { t: "Security risk analysis", d: "The required, documented assessment of risks to ePHI." },
      { t: "Administrative safeguards", d: "Policies, workforce training and contingency planning." },
      { t: "Technical safeguards", d: "Access control, audit logs, integrity and transmission security." },
      { t: "Breach notification", d: "Procedures that meet notification obligations." },
    ],
    timeline: "Risk analysis 3–5 weeks · remediation 1–4 months · annual review",
    outcome: "A documented risk analysis, implemented safeguards and partner-ready evidence.",
    faqs: [
      { q: "Is there a HIPAA certification?", a: "There is no official government certification. Many organisations use HITRUST, SOC 2 + HIPAA or ISO 27001 to evidence their programme." },
      { q: "Are we a business associate?", a: "If you create, receive, maintain or transmit PHI for a covered entity, very likely yes." },
    ],
  },
  dpdpa: {
    headline: "India's data protection law, operationalised.",
    overview:
      "The Digital Personal Data Protection Act, 2023 sets obligations for Data Fiduciaries processing digital personal data in India. We help you build consent, notice, rights and breach processes ahead of enforcement.",
    who: ["Indian businesses processing digital personal data", "Global companies offering goods or services to people in India", "Significant Data Fiduciaries with enhanced obligations"],
    areas: [
      { t: "Notice & consent", d: "Clear, itemised notices and consent managers." },
      { t: "Data principal rights", d: "Access, correction, erasure and grievance redressal." },
      { t: "Security safeguards & breach", d: "Reasonable safeguards and breach intimation." },
      { t: "Processors & children's data", d: "Contracts, verifiable parental consent and restrictions." },
    ],
    timeline: "Assessment 3–4 weeks · programme build 2–4 months",
    outcome: "A DPDPA-ready privacy programme mapped to your existing GDPR or ISO work.",
    faqs: [
      { q: "When does DPDPA apply?", a: "The Act is law and the DPDP Rules phase in obligations. Building now avoids a rush when obligations take effect." },
      { q: "Can we reuse GDPR work?", a: "Much of it — data mapping, rights workflows and security safeguards transfer well, with India-specific changes to consent and notices." },
    ],
  },
  "sebi-cscrf": {
    headline: "Cyber resilience for SEBI-regulated entities.",
    overview:
      "SEBI's Cybersecurity and Cyber Resilience Framework sets graded requirements for market infrastructure institutions, intermediaries and other regulated entities in India's securities market.",
    who: ["Stock brokers, depository participants and intermediaries", "Market infrastructure institutions", "Asset managers and other SEBI-regulated entities"],
    areas: [
      { t: "Governance", d: "Board-approved policy, roles and cyber risk oversight." },
      { t: "Identify & protect", d: "Asset inventory, access control and data protection." },
      { t: "Detect, respond & recover", d: "SOC monitoring, incident response and recovery." },
      { t: "Audits & reporting", d: "Periodic cyber audits, VAPT and compliance reporting." },
    ],
    timeline: "Gap assessment 2–4 weeks · remediation roadmap · periodic audits",
    outcome: "CSCRF gap closure, audit readiness and a reporting rhythm your board can rely on.",
    faqs: [
      { q: "Which category are we?", a: "CSCRF grades entities by size and criticality; obligations scale accordingly. We confirm your category in the assessment." },
      { q: "Do you perform VAPT?", a: "Yes — our security testing team performs vulnerability assessment and penetration testing aligned to the framework." },
    ],
  },
  pdpa: {
    headline: "Data protection across Singapore and APAC.",
    overview:
      "Singapore's PDPA and similar APAC laws govern the collection, use and disclosure of personal data. We build programmes that meet local requirements while reusing your global privacy work.",
    who: ["Organisations collecting personal data in Singapore", "Companies expanding across APAC markets", "Processors serving APAC customers"],
    areas: [
      { t: "Consent & purpose", d: "Notification, consent and purpose limitation." },
      { t: "Access & correction", d: "Handling individual requests." },
      { t: "Protection & retention", d: "Reasonable security and retention limits." },
      { t: "Breach notification", d: "Assessing and notifying data breaches." },
    ],
    timeline: "Assessment 2–3 weeks · implementation 1–3 months",
    outcome: "A PDPA-compliant programme aligned with your global privacy baseline.",
    faqs: [
      { q: "Do we need a DPO?", a: "Singapore's PDPA requires organisations to designate someone responsible for compliance. We can help define and support the role." },
      { q: "Does it cover other APAC countries?", a: "We extend the same programme to other APAC regimes with local adjustments." },
    ],
  },
  "nist-csf": {
    headline: "One language for cyber risk.",
    overview:
      "The NIST Cybersecurity Framework 2.0 organises security outcomes into Govern, Identify, Protect, Detect, Respond and Recover — a common language from the boardroom to the SOC.",
    who: ["Organisations building or maturing a security programme", "Boards that want measurable cyber risk reporting", "Critical infrastructure and regulated sectors"],
    areas: [
      { t: "Govern", d: "Strategy, roles, policy and supply chain risk." },
      { t: "Identify & Protect", d: "Assets, risk, access, data security and awareness." },
      { t: "Detect & Respond", d: "Monitoring, analysis and incident management." },
      { t: "Recover", d: "Restoration and communication after incidents." },
    ],
    timeline: "Maturity assessment 3–4 weeks · target profile · 12–24 month roadmap",
    outcome: "Current and target profiles and a prioritised roadmap leadership can fund.",
    faqs: [
      { q: "Is CSF a certification?", a: "No. It's a voluntary framework used to assess and communicate maturity — and it maps cleanly to ISO 27001 and NIST 800-53." },
      { q: "What changed in 2.0?", a: "CSF 2.0 added the Govern function and broadened its scope beyond critical infrastructure to all organisations." },
    ],
  },
  itgc: {
    headline: "The controls every auditor relies on.",
    overview:
      "IT General Controls cover access, change management and IT operations — the foundation that financial auditors, SOX programmes and SOC 1 reports depend on.",
    who: ["Companies preparing for IPO or SOX", "Organisations with financial-statement audits", "Service organisations pursuing SOC 1"],
    areas: [
      { t: "Logical access", d: "Provisioning, reviews, privileged access and terminations." },
      { t: "Change management", d: "Authorisation, testing and segregation of duties." },
      { t: "IT operations", d: "Job scheduling, backups and incident handling." },
      { t: "Program development", d: "SDLC controls for in-scope systems." },
    ],
    timeline: "Walkthroughs 2–3 weeks · remediation · testing cycles",
    outcome: "ITGCs that survive external audit without surprises.",
    faqs: [
      { q: "Do you test ITGCs for SOX?", a: "We design, document and pre-test ITGCs and support your internal audit and external auditors." },
      { q: "Which systems are in scope?", a: "Systems that support financially significant processes — ERP, billing, payroll and their supporting infrastructure." },
    ],
  },
  "risk-assessment": {
    headline: "Know what matters. Fix it first.",
    overview:
      "A structured cyber risk assessment identifies your crown jewels, the threats they face and the controls that matter most — producing a prioritised plan instead of a long list.",
    who: ["Leadership teams setting security priorities", "Organisations required to perform annual risk assessments", "Companies preparing for any certification"],
    areas: [
      { t: "Asset & data mapping", d: "What you have and what it's worth." },
      { t: "Threat & vulnerability analysis", d: "Realistic scenarios for your business." },
      { t: "Likelihood & impact", d: "Quantitative or qualitative scoring you can defend." },
      { t: "Treatment plan", d: "Owners, dates and budgets." },
    ],
    timeline: "2–5 weeks depending on scope",
    outcome: "A risk register, heatmap and treatment plan tied to budget.",
    faqs: [
      { q: "Which methodology?", a: "We align to ISO 27005, NIST SP 800-30 or FAIR-style quantification depending on your needs." },
      { q: "How often should we do this?", a: "At least annually, and whenever your business, technology or threat landscape changes significantly." },
    ],
  },
  "unified-audits": {
    headline: "One audit cycle. Many frameworks.",
    overview:
      "Unified security audits combine fieldwork and evidence across multiple frameworks — so your teams answer each question once and every standard gets what it needs.",
    who: ["Organisations holding three or more certifications or attestations", "Teams suffering audit fatigue", "Companies planning to add new frameworks"],
    areas: [
      { t: "Common control framework", d: "One control set mapped to every requirement." },
      { t: "Shared evidence library", d: "Collected once, tagged to many frameworks." },
      { t: "Coordinated calendar", d: "Aligned audit windows and surveillance cycles." },
      { t: "Single reporting view", d: "Status across every framework in one place." },
    ],
    timeline: "Mapping 3–6 weeks · rolled into your next audit cycle",
    outcome: "Fewer audit hours, fewer duplicate requests and one source of truth.",
    faqs: [
      { q: "Does each framework still get its own report?", a: "Yes. Certification bodies and CPA firms issue their own reports; we coordinate evidence and timing so the work is shared." },
      { q: "How much time does it save?", a: "It depends on overlap. Frameworks like SOC 2 and ISO 27001 share a large proportion of controls, so savings can be significant." },
    ],
  },
};
