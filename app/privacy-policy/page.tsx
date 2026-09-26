import type { Metadata } from "next";
import LegalPage from "@/components/page/LegalPage";

export const metadata: Metadata = { title: "Privacy policy" };

export default function Page() {
  return (
    <LegalPage
      title="Privacy policy"
      updated="September 2026"
      sections={[
        { h: "Who we are", p: ["SecureKnots provides cybersecurity compliance, GRC consulting and security testing services. This policy explains how we handle personal information collected through this website."] },
        { h: "What we collect", p: ["Information you give us, such as your name, work email, company, phone number and message when you contact us or book a consultation.", "Technical information such as device, browser and usage data collected through essential cookies and, if you consent, analytics cookies."] },
        { h: "How we use it", p: ["To respond to enquiries, provide and improve our services, operate and secure this website, and meet legal obligations. We do not sell personal information."] },
        { h: "Sharing", p: ["We share information only with service providers who help us operate (for example email and hosting providers) under appropriate contracts, or where required by law."] },
        { h: "International transfers", p: ["We operate in the United States and India. Where information is transferred across borders we apply appropriate safeguards."] },
        { h: "Retention", p: ["We keep personal information only as long as needed for the purposes above or as required by law."] },
        { h: "Your rights", p: ["Depending on where you live — including under the GDPR, CCPA/CPRA and India's DPDPA — you may have rights to access, correct, delete or restrict use of your information, and to withdraw consent. Contact us to exercise them."] },
      ]}
    />
  );
}
