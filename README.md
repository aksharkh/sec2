# SecureKnots — website (v2)

Next.js 16 · React 19 · Tailwind 4 · Motion · GSAP · Lenis · React Three Fiber

```bash
npm install
npm run dev     # http://localhost:3000
```

## Environment (contact & booking forms)

Create `.env.local`:

```
RESEND_API_KEY=re_xxx            # https://resend.com — without it, enquiries are logged to the server console
CONTACT_TO=contact@secureknots.com
CONTACT_FROM="SecureKnots Website <website@secureknots.com>"   # must be a verified Resend sender
```

## Pages

`/` · `/compliance` + 28 framework pages · `/certifications` `/government` `/privacy` `/advisory` ·
`/security-testing` + 6 · `/industries` + 6 · `/customers` + 6 stories · `/insights` + 6 articles ·
`/framework-finder` · `/about` · `/careers` · `/contact` · `/privacy-policy` `/terms` `/cookies` · sitemap.xml · robots.txt

Global overlays: booking modal (any `<Button book>` or element with `data-book`), ⌘K search,
cookie banner, first-visit preloader, page-transition curtain (`app/template.tsx`).

## Structure

```
app/
  layout.tsx        fonts, SEO metadata, JSON-LD, header/footer, smooth scroll
  page.tsx          homepage (section order lives here)
  globals.css       design tokens (@theme) + utilities
  not-found.tsx     branded 404 for pages not built yet
components/
  layout/           Header (mega menu + mobile menu), Footer
  home/             one file per homepage section (Hero, KnotScene, OverlapTool…)
  ui/               Button (magnetic), Reveal, Logo/KnotMark, Cursor, LocalTime
  providers/        SmoothScroll (Lenis ↔ GSAP ScrollTrigger)
lib/site.ts         ALL content: frameworks, services, industries, nav, offices
```

## Design system

| Token | Value | Use |
|---|---|---|
| `ink` | #08090b | primary background |
| `bone` / `paper` | #f1efe8 / #f8f7f3 | light sections, text on dark |
| `accent` / `accent-deep` / `ice` | #4c7dff / #2448e0 / #a9c2ff | cobalt accent, deep blue panels, light-blue highlights |
| Sans | Geist | headings & body |
| Serif | Instrument Serif *italic* | one emphasised word per headline |
| Mono | Geist Mono | labels, numbers |

## Content TODOs (client)
- **Customer stories in `lib/stories.ts` are SAMPLE placeholders** (fictional companies, quotes and figures,
  each labelled "Sample story" on the site). Replace with real, approved case studies before launch.
- Careers practice areas (`app/careers/page.tsx`) and legal pages are templates — confirm/review with counsel
- Insight articles in `lib/insights.ts` are draft guidance — have the team review
- Confirm phone numbers (the live site's `tel:` links don't match the displayed numbers)
- Logo files, client logos, testimonials, case studies, team photos
- Real stats (audits delivered, years, countries) — only real numbers go on the site
