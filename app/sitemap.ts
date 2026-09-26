import type { MetadataRoute } from "next";
import { frameworks, industries, site, testingServices } from "@/lib/site";
import { stories } from "@/lib/stories";
import { articles } from "@/lib/insights";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const paths = [
    "",
    "/compliance",
    "/certifications",
    "/government",
    "/privacy",
    "/advisory",
    "/security-testing",
    "/industries",
    "/customers",
    "/insights",
    "/framework-finder",
    "/about",
    "/careers",
    "/contact",
    "/privacy-policy",
    "/terms",
    "/cookies",
    ...frameworks.map((f) => `/compliance/${f.slug}`),
    ...testingServices.map((t) => `/security-testing/${t.slug}`),
    ...industries.map((i) => `/industries/${i.slug}`),
    ...stories.map((s) => `/customers/${s.slug}`),
    ...articles.map((a) => `/insights/${a.slug}`),
  ];
  return paths.map((p) => ({ url: `${site.url}${p}`, lastModified: now, changeFrequency: "monthly", priority: p === "" ? 1 : 0.7 }));
}
