# EQIP website

Homepage for EQIP, the enterprise software intelligence platform. Built with
Next.js 16 (App Router), TypeScript, Tailwind CSS 4 and a small amount of
client-side React for interactions.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000 (also on your local network)
npm run build      # production build, all routes static
npm run start      # serve the production build
npm run lint
```

## Where things live

| Path | What |
| --- | --- |
| `src/content/site.ts` | All copy, navigation and placeholders (edit here) |
| `src/app/globals.css` | Brand tokens, type scale, layout utilities, motion |
| `src/app/page.tsx` | Homepage section order |
| `src/components/sections/` | One component per section, plus the case study template |
| `src/components/diagrams/` | The estate scan, capability loop, context index, evidence trail and other drawings |
| `src/components/motion/` | `Reveal`, `SplitWords`, `useReducedMotion` |
| `src/assets/brand/eqip-logo.svg` | The supplied EQIP lockup |
| `DESIGN.md` | Creative direction and design rules |

## Before launch

- Set `contactHref` in `src/content/site.ts` to the approved booking link or inbox
  (every "Talk to an Expert" uses it; it currently scrolls to the closing section).
- Replace the proof statement placeholder (`about.proof`) and client names (`field.studies`).
- Replace the case study placeholders in `src/components/sections/CaseStudyPage.tsx`;
  case study pages are `noindex` until then.
- Remove the local-network entry from `allowedDevOrigins` in `next.config.ts` if not needed.

## Design checks

Impeccable's detector can scan for AI-design anti-patterns:

```bash
npx impeccable detect src/
```
