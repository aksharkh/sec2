import type { Metadata } from "next";
import LegalPage from "@/components/page/LegalPage";

export const metadata: Metadata = { title: "Cookie policy" };

export default function Page() {
  return (
    <LegalPage
      title="Cookie policy"
      updated="September 2026"
      sections={[
        { h: "What cookies are", p: ["Cookies and similar technologies are small files stored on your device that help websites work and understand how they are used."] },
        { h: "Essential", p: ["Required for the site to function, such as remembering your cookie choice. These cannot be switched off."] },
        { h: "Analytics", p: ["Optional cookies that help us understand how visitors use the site so we can improve it. We only set these if you choose “Accept all”."] },
        { h: "Managing your choice", p: ["You can change your mind at any time by clearing this site's data in your browser, which will show the cookie banner again."] },
      ]}
    />
  );
}
