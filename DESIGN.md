# EQIP homepage: design system and creative direction

The visual system the homepage is built on, so future pages and contributors
(human or agent) stay inside it. Brand values come from the EQIP Brand
Guidelines 1.0 Figma file (Ink, Navy, Paper, Graphite, Signal; Space Grotesk,
Inter, JetBrains Mono). Nothing here overrides that file.

## 1. Creative concept: the estate, made legible

EQIP reads an enterprise software estate and makes its hidden structure visible.
On desktop every section is exactly one screen, so each idea is seen whole.

| Screen | Question it answers | Surface | Signature interaction |
| --- | --- | --- | --- |
| Hero | What does EQIP turn knowledge into? | Ink | Intelligence flow: knowledge, processes, workflows and technology pulse into one core that fills cell by cell, then leave as three outcomes (risk anticipated in Signal). Hover a line to isolate it. |
| The problem | What does the documentation miss? | Paper | Pulses travel the connections no diagram shows; footnotes and systems light their links on hover. |
| The question | What will this change affect? | Paper | A change ripples outwards and touches unmapped parts of the estate. |
| What EQIP makes visible | What does EQIP do? | Ink | Closed loop of four stages; the live stage cycles and its drawing plays. |
| Where it matters | Where does it matter most? | Navy | Index with one stage; auto-advances; each drawing moves (logic in transit, a change's reach, generated code streaming, a diligence scan). |
| Evidence | What do we know before we act? | Ink | Journeys take turns in focus; hovering one lights its trace across five questions. |
| About EQIP | Who is EQIP? | Paper | The core reads each stratum in turn; layers lift on hover. |
| Evidence from the field | Has it worked? | Paper | Hovering a dossier runs a pulse from challenge to change. |
| Closing | What happens next? | Ink | Data travels the traces: arriving at the left, leaving at the right. |

Every section is one screen on desktop down to roughly 1366×640: below 832px of
height the section content scales in steps (`zoom`) so nothing is cut off.
Ambient SVG motion pauses off screen (`AmbientController`) and is removed for
reduced-motion users.

**The trace.** The logo's signal traces (straight runs, 45° jogs, square
terminals; "data arriving, decisions leaving") are the drawing grammar for every
diagram. Diagrams never redraw the logo; they borrow its grammar.

## 2. Logo

The site uses the supplied primary lockup (`src/assets/brand/eqip-logo.svg`)
exactly as drawn, via `next/image`, never below the 120px minimum width. White
letters: Ink and Navy grounds only.

## 3. Brand rules applied

- **Restraint is the signal.** One Signal-blue element per view, marking the
  answer or the live state (the surfaced rule, the live loop stage, a running
  check, the single decisive closing action).
- **Say it big.** One headline per screen. Headlines never end on a lone word.
- **Mono means machine.** JetBrains Mono only for IDs, statuses, labels.
- **Draw systems, not decoration.** Left to right. Labelled nodes. One decision.
- **Gradients live in the logo only.** Every other surface is flat.
- **On Paper**, Signal Deep `#0A84FF` only at 24px+ or as a fill.

## 4. Tokens

Colours, type and spacing are defined in `src/app/globals.css` (`@theme` and
`@utility type-*`). Palette: ink-950 `#070A12`, navy-900/800/700, graphite-700/500/300,
paper-50/100/200/300, signal-400 `#38BDF8`, signal-600 `#0A84FF`, status pass/warn/fail.
Type: Display XL/L/M/S, Heading L/M/S, Body L/M/S (fluid `clamp()`), Mono Label
(+8% tracking), Data, Status.

Layout: 12 columns, 24px gutters, 1440px max, side margin `clamp(20px, 5vw, 96px)`.
`section-screen` makes a section one viewport tall on desktop with content centred.

## 5. Motion

All motion is progressive enhancement and switches off under
`prefers-reduced-motion`.

- Load: hero headline words rise in sequence; the estate scan sweeps once.
- Scroll: section rules draw from the left; headlines rise word by word; blocks
  fade up; diagrams draw their traces. Only elements a client component has armed
  after hydration are ever hidden, so nothing can get stuck invisible.
- Header: hides while reading down, returns on scroll up or keyboard focus;
  a hairline shows reading progress.
- Micro-interactions: arrow swap on buttons, underline growth on text links,
  hover tracing in the estate, note cross-highlighting, loop and index states.
- Easing `cubic-bezier(0.2, 0.7, 0.1, 1)`; no bounce, parallax or scroll hijack.

## 6. Avoid (checked during review, per Impeccable's catalog)

Purple-blue gradients, glows and halos, glassmorphism, decorative grids, icon
tiles, pill badges above headlines, identical card grids, nested cards, side-stripe
cards, gradient text, pulsing dots, blinking cursors, marquees, bouncy easing,
metrics without context, invented logos, testimonials, numbers or claims.

## 7. Content rules

All copy lives in `src/content/site.ts`. The hero description was condensed at
the client's request; everything else is the approved copy. Customer names and
the proof statement stay visible placeholders until approved. Illustrative
diagrams are labelled as illustrative and never show performance data.
