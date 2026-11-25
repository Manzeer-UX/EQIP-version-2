import { Reveal } from "@/components/motion/Reveal";
import { ScrollRegion } from "@/components/ui/ScrollRegion";
/**
 * The accumulated record of an organisation, drawn as strata with a single
 * fault, and one core reading through every layer. Restrained, on Paper.
 */

const INK = "#070A12";
const LINE = "#CFC8BA";
const TEXT = "#3A404B";

const d = (ms: number) => ({ ["--d" as string]: `${ms}ms` });

export function Strata({ layers }: { layers: string[] }) {
  const top = 70;
  const band = 84;
  const faultX = 300;
  const drop = 14;
  const coreX = 438;
  const fills = ["transparent", "rgba(230,225,214,0.55)", "#E6E1D6", "#CFC8BA"];
  const coreEnd = top + layers.length * band + drop + 22;
  const READ = 5; // seconds for one pass down the core

  const boundary = (y: number) => `M0 ${y}H${faultX}L${faultX + drop} ${y + drop}H520`;
  const bandShape = (y: number) =>
    `M0 ${y}H${faultX}L${faultX + drop} ${y + drop}H520V${y + band + drop}H${faultX + drop}L${faultX} ${y + band}H0Z`;

  return (
    <Reveal as="figure" kind="draw" aria-label="Four layers of accumulated decisions, read through by one continuous core.">
      <ScrollRegion label="Strata diagram" minWidth="26rem">
        <svg viewBox="0 0 520 470" className="block h-auto w-full overflow-visible" aria-hidden>
        {layers.map((label, i) => (
          <g key={`f${i}`} className="strata-layer">
            <path d={bandShape(top + i * band)} fill={fills[i]} className="strata-fill fade-on-draw" style={d(i * 120)} />
            <text
              x={0}
              y={top + i * band + band / 2 + 6}
              className="fade-on-draw font-sans"
              style={d(300 + i * 120)}
              fontSize={15}
              fill={i === 0 ? INK : TEXT}
            >
              {label}
            </text>
          </g>
        ))}
        <g fill="none" strokeWidth={1}>
          {Array.from({ length: layers.length + 1 }).map((_, i) => (
            <path
              key={`b${i}`}
              d={boundary(top + i * band)}
              pathLength={1}
              stroke={i === 0 ? INK : LINE}
              className="trace-draw"
              style={d(100 + i * 130)}
            />
          ))}
          <path d={`M${coreX} 24V${coreEnd}`} pathLength={1} stroke={INK} className="trace-draw" style={d(700)} />
        </g>

        {Array.from({ length: layers.length + 1 }).map((_, i) => (
          <rect
            key={`t${i}`}
            x={coreX - 4}
            y={top + i * band + drop - 4}
            width={8}
            height={8}
            fill={i === 0 ? INK : "#F4F1EA"}
            stroke={INK}
            className={i === 0 ? "fade-on-draw" : "strata-tick fade-on-draw"}
            style={{
              ...d(900 + i * 120),
              ["--d" as string]: `${(((top + i * band + drop - 24) / (coreEnd - 24)) * READ).toFixed(2)}s`,
            }}
          />
        ))}

        {/* The core reads every layer, top to bottom */}
        <rect className="motion-only" x={-4} y={-4} width={8} height={8} fill={INK}>
          <animateMotion path={`M${coreX} 24V${coreEnd}`} dur={`${READ}s`} repeatCount="indefinite" />
        </rect>

        <g className="fade-on-draw" style={d(1400)}>
          <rect x={coreX - 6} y={12} width={12} height={12} fill={INK} />
          <text x={coreX - 16} y={22} textAnchor="end" className="font-mono" fontSize={10.5} fontWeight={500} letterSpacing="0.08em" fill={INK}>
            INTELLIGENCE LAYER
          </text>
        </g>
      </svg>
      </ScrollRegion>
    </Reveal>
  );
}
