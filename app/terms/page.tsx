import type { Metadata } from "next";
import LegalPage from "@/components/page/LegalPage";

export const metadata: Metadata = { title: "Terms of use" };

export default function Page() {
  return (
    <LegalPage
      title="Terms of use"
      updated="September 2026"
      sections={[
        { h: "Using this website", p: ["By using secureknots.com you agree to these terms. If you do not agree, please do not use the site."] },
        { h: "Information, not advice", p: ["Content on this website, including guides and the Framework Finder, is general information and not legal, audit or professional advice for your specific situation."] },
        { h: "Intellectual property", p: ["The content, design and marks on this site belong to SecureKnots or its licensors and may not be reused without permission."] },
        { h: "Acceptable use", p: ["You must not misuse the site, attempt to gain unauthorised access, or interfere with its operation."] },
        { h: "Liability", p: ["To the extent permitted by law, SecureKnots is not liable for losses arising from use of this website."] },
        { h: "Changes", p: ["We may update these terms from time to time. The latest version will always be on this page."] },
      ]}
    />
  );
}
