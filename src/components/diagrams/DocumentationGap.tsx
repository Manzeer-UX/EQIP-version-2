import { Reveal } from "@/components/motion/Reveal";
import { ScrollRegion } from "@/components/ui/ScrollRegion";

/**
 * "As documented" versus "as it runs": the official diagram (solid) and the
 * connections nobody drew (dashed), with numbered notes that tie back to the
 * paragraph beside it. Hovering a note highlights its place in the drawing.
 */

const INK = "#070A12";
const MUTED = "#646B78";
const FILL = "#FBFAF7";

type Box = { x: number; y: number; w: number; label: string; dashed?: boolean; note?: number };

const nodes: Record<string, Box> = {
  portal: { x: 0, y: 40, w: 152, label: "Customer portal" },
  orders: { x: 214, y: 40, w: 172, label: "Order management" },
  billing: { x: 448, y: 40, w: 152, label: "Billing" },
  pricing: { x: 0, y: 186, w: 152, label: "Pricing engine" },
  erp: { x: 448, y: 186, w: 152, label: "ERP finance" },
  legacy: { x: 214, y: 332, w: 172, label: "Legacy batch", note: 1 },
  manual: { x: 448, y: 332, w: 152, label: "Month-end step", dashed: true, note: 4 },
};
const H = 44;

const documented = [
  { d: "M152 62H214", link: "portal orders" },
  { d: "M386 62H448", link: "orders billing" },
  { d: "M584 84V186", link: "billing erp" },
];

const undocumented: { d: string; link: string; note?: number }[] = [
  { d: "M300 84V202L294 208H152", link: "orders pricing" },
  { d: "M340 84V332", link: "orders legacy" },
  { d: "M76 230V348L82 354H214", link: "pricing legacy" },
  { d: "M386 354H416L422 348V214L428 208H448", link: "legacy erp", note: 2 },
  { d: "M524 230V332", link: "erp manual" },
];

function Marker({ x, y, n }: { x: number; y: number; n: number }) {
  return (
    <g data-note-target={n} transform={`translate(${x} ${y})`} className="fade-on-draw" style={{ ["--d" as string]: `${900 + n * 120}ms` }}>
      <rect className="note-box" width={18} height={18} fill={INK} />
      <text x={9} y={13} textAnchor="middle" className="font-mono" fontSize={10.5} fontWeight={500} fill="#F4F1EA">
        {n}
      </text>
    </g>
  );
}

export function DocumentationGap({ notes }: { notes: string[] }) {
  return (
    <Reveal as="figure" kind="draw" aria-labelledby="doc-gap-caption">
      <div className="mb-5 flex flex-wrap items-center gap-x-8 gap-y-2 border-b border-paper-300 pb-3">
        <span className="type-label flex items-center gap-3 text-graphite-700">
          <svg width="28" height="2" aria-hidden className="overflow-visible">
            <line x1="0" y1="1" x2="28" y2="1" stroke={INK} strokeWidth="1" />
          </svg>
          Documented
        </span>
        <span className="type-label flex items-center gap-3 text-graphite-700">
          <svg width="28" height="2" aria-hidden className="overflow-visible">
            <line x1="0" y1="1" x2="28" y2="1" stroke={MUTED} strokeWidth="1" strokeDasharray="3 4" />
          </svg>
          In no diagram
        </span>
      </div>

      <ScrollRegion label="Documentation gap diagram" minWidth="34rem">
        <svg
          viewBox="0 0 600 392"
          data-ambient
          className="block h-auto w-full overflow-visible"
          role="img"
          aria-label="Diagram of seven connected systems. Three connections are documented; five are not drawn in any diagram."
        >
          <g fill="none" strokeWidth={1}>
            {documented.map((e, i) => (
              <path key={e.d} d={e.d} data-link={e.link} pathLength={1} stroke={INK} className="gap-link trace-draw" style={{ ["--d" as string]: `${i * 140}ms` }} />
            ))}
            {undocumented.map((u, i) => (
              <path
                key={u.d}
                d={u.d}
                stroke={MUTED}
                strokeDasharray="3 4"
                data-note-target={u.note}
                data-link={u.link}
                className="gap-link note-line fade-on-draw"
                style={{ ["--d" as string]: `${520 + i * 110}ms` }}
              />
            ))}
          </g>

          {/* Rule buried in code, hanging off Billing */}
          <g data-note-target={3} className="fade-on-draw" style={{ ["--d" as string]: "760ms" }}>
            <path d="M476 84V112" stroke={MUTED} strokeDasharray="2 3" fill="none" />
            <rect className="note-frame" x={462} y={112} width={96} height={24} fill={FILL} stroke={MUTED} strokeDasharray="3 3" />
            <text x={472} y={128} className="font-mono" fontSize={10.5} fontWeight={500} letterSpacing="0.06em" fill={INK}>
              RULE-0219
            </text>
          </g>

          {Object.entries(nodes).map(([key, n]) => (
            <g key={key} transform={`translate(${n.x} ${n.y})`} data-note-target={n.note} data-node={key} className="gap-node">
              <rect
                className="note-frame"
                width={n.w}
                height={H}
                fill={n.dashed ? "transparent" : FILL}
                stroke={n.dashed ? MUTED : INK}
                strokeDasharray={n.dashed ? "3 4" : undefined}
              />
              <text x={14} y={27} className="font-sans" fontSize={14} fill={INK}>
                {n.label}
              </text>
            </g>
          ))}

          {/* The undocumented connections are live: slow pulses travel along them. */}
          <g className="motion-only" fill={MUTED}>
            {undocumented.map((u, i) => (
              <rect key={u.d} width={5} height={5} x={-2.5} y={-2.5}>
                <animateMotion path={u.d} dur={`${5.5 + i * 0.8}s`} begin={`${(i * 1.1).toFixed(1)}s`} repeatCount="indefinite" />
              </rect>
            ))}
          </g>

          <Marker x={190} y={310} n={1} />
          <Marker x={430} y={262} n={2} />
          <Marker x={436} y={115} n={3} />
          <Marker x={582} y={310} n={4} />
        </svg>
      </ScrollRegion>

      <figcaption id="doc-gap-caption" className="mt-6">
        <ol className="grid gap-x-8 gap-y-2 sm:grid-cols-2">
          {notes.map((note, i) => (
            <li
              key={note}
              data-note={i + 1}
              className="type-body-s flex cursor-default items-baseline gap-3 text-graphite-700 transition-colors duration-200 hover:text-ink-950"
            >
              <span aria-hidden className="type-status inline-flex size-[18px] shrink-0 items-center justify-center bg-ink-950 text-paper-100">
                {i + 1}
              </span>
              <span>{note}</span>
            </li>
          ))}
        </ol>
      </figcaption>
    </Reveal>
  );
}
