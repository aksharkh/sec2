import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import SmoothScroll from "@/components/providers/SmoothScroll";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Cursor from "@/components/ui/Cursor";
import UIProvider from "@/components/providers/UIProvider";
import Preloader from "@/components/overlays/Preloader";
import ThemeSwitcher from "@/components/ui/ThemeSwitcher";
import { site } from "@/lib/site";
import "./globals.css";

const instrument = localFont({
  src: [
    { path: "./fonts/instrument-serif-latin-400-normal.woff2", style: "normal", weight: "400" },
    { path: "./fonts/instrument-serif-latin-400-italic.woff2", style: "italic", weight: "400" },
  ],
  variable: "--font-instrument",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "SecureKnots — Cybersecurity Compliance & GRC Partner",
    template: "%s — SecureKnots",
  },
  description: site.description,
  keywords: [
    "FedRAMP consulting",
    "CMMC compliance",
    "SOC 2 audit",
    "ISO 27001 certification",
    "PCI DSS",
    "DPDPA compliance",
    "GRC consulting",
    "penetration testing",
  ],
  openGraph: {
    type: "website",
    siteName: site.name,
    title: "SecureKnots — Compliance, tied together.",
    description: site.description,
    url: site.url,
  },
  twitter: {
    card: "summary_large_image",
    title: "SecureKnots — Compliance, tied together.",
    description: site.description,
  },
};

export const viewport: Viewport = {
  themeColor: "#08090b",
  colorScheme: "dark",
};

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: site.name,
  url: site.url,
  email: site.email,
  description: site.description,
  areaServed: ["US", "IN", "EU", "APAC"],
  address: site.offices.map((o) => ({
    "@type": "PostalAddress",
    addressLocality: o.city,
    addressCountry: o.country,
  })),
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable} ${instrument.variable}`}
    >
      <body className="min-h-dvh bg-ink text-bone">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-accent focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to content
        </a>
        <SmoothScroll>
          <UIProvider>
            <Header />
            <main id="main">{children}</main>
            <Footer />
          </UIProvider>
        </SmoothScroll>
        <Preloader />
        <ThemeSwitcher />
        <Cursor />
      </body>
    </html>
  );
}
