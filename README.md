# SecureKnots — website (v2)

Next.js 16 · React 19 · Tailwind 4 · Motion · GSAP · Lenis · React Three Fiber

```bash
npm install
npm run dev     # http://localhost:3000
```

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
| `lime` | #d6ff3d | the single accent — CTAs, highlights |
| Sans | Geist | headings & body |
| Serif | Instrument Serif *italic* | one emphasised word per headline |
| Mono | Geist Mono | labels, numbers |

## Content TODOs (client)
- Confirm phone numbers (the live site's `tel:` links don't match the displayed numbers)
- Logo files, client logos, testimonials, case studies, team photos
- Real stats (audits delivered, years, countries) — only real numbers go on the site
