/**
 * One drawing per context, on Navy. Paper marks what matters; no signal
 * blue here, because four drawings share one view.
 */

const NAVY = "#0F1724";
const RULE = "#3A404B";
const MUTED = "#9AA8BD";
const PAPER = "#F4F1EA";

const d = (ms: number) => ({ ["--d" as string]: `${ms}ms` });

function Label({ x, y, children, fill = MUTED, anchor }: { x: number; y: number; children: string; fill?: string; anchor?: "start" | "middle" | "end" }) {
  return (
    <text x={x} y={y} textAnchor={anchor} className="font-mono" fontSize={10.5} fontWeight={500} letterSpacing="0.08em" fill={fill}>
      {children}
    </text>
  );
}

function Box({ x, y, w, h = 40, label, tone = "default", delay = 0 }: { x: number; y: number; w: number; h?: number; label: string; tone?: "default" | "lit" | "solid"; delay?: number }) {
  return (
    <g transform={`translate(${x} ${y})`} className="fade-on-draw" style={d(delay)}>
      <rect width={w} height={h} fill={tone === "solid" ? PAPER : NAVY} stroke={tone === "default" ? RULE : PAPER} />
      <text x={12} y={h / 2 + 5} className="font-sans" fontSize={13.5} fill={tone === "solid" ? "#070A12" : PAPER}>
        {label}
      </text>
    </g>
  );
}

function Sq({ x, y, tone = "default", delay = 0 }: { x: number; y: number; tone?: "default" | "lit" | "ghost"; delay?: number }) {
  return (
    <rect
      x={x - 4}
      y={y - 4}
      width={8}
      height={8}
      fill={tone === "lit" ? PAPER : NAVY}
      stroke={tone === "ghost" ? MUTED : tone === "lit" ? PAPER : MUTED}
      strokeDasharray={tone === "ghost" ? "2 2" : undefined}
      className="fade-on-draw"
      style={d(delay)}
    />
  );
}

/** Modernisation: business logic re-homed from legacy layers into the new architecture. */
export function MigrationVisual() {
  const left = ["Screens", "Batch jobs", "Database"];
  const right = ["Web app", "Services", "Data platform"];
  const y = (i: number) => 34 + i * 56;
  const traces = [
    { from: 0, to: 0, lit: false },
    { from: 1, to: 1, lit: true, tag: "RULE-0219" },
    { from: 2, to: 1, lit: true, tag: "RULE-0107" },
    { from: 2, to: 2, lit: false },
  ];
  const paths = traces.map((t, i) => {
    const y1 = y(t.from) + 20;
    const y2 = y(t.to) + 20;
    const mx = 240 + (i - 1.5) * 10;
    return y1 === y2 ? `M150 ${y1}H330` : `M150 ${y1}H${mx - 6}L${mx} ${y1 + (y2 > y1 ? 6 : -6)}V${y2 + (y2 > y1 ? -6 : 6)}L${mx + 6} ${y2}H330`;
  });
  return (
    <svg viewBox="0 0 480 208" data-ambient className="block h-auto w-full overflow-visible" role="img" aria-label="Business rules move from legacy screens, batch jobs and database into the web app, services and data platform of the new architecture. None are left behind.">
      <Label x={0} y={14}>LEGACY</Label>
      <Label x={480} y={14} anchor="end">MODERN</Label>
      <g fill="none" strokeWidth={1}>
        {traces.map((t, i) => (
          <path key={i} d={paths[i]} pathLength={1} className="trace-draw" style={d(240 + i * 140)} stroke={t.lit ? PAPER : RULE} />
        ))}
      </g>
      {/* Business logic in transit: nothing is left behind */}
      <g className="motion-only">
        {paths.map((p, i) => (
          <rect key={p} width={5} height={5} x={-2.5} y={-2.5} fill={traces[i].lit ? PAPER : MUTED}>
            <animateMotion path={p} dur={`${2.6 + i * 0.3}s`} begin={`${(i * 0.45).toFixed(2)}s`} repeatCount="indefinite" />
          </rect>
        ))}
      </g>
      {left.map((l, i) => (
        <Box key={l} x={0} y={y(i)} w={150} label={l} delay={i * 80} />
      ))}
      {right.map((l, i) => (
        <Box key={l} x={330} y={y(i)} w={150} label={l} tone={i === 1 ? "lit" : "default"} delay={700 + i * 80} />
      ))}
      {traces.map((t, i) => (
        <Sq key={i} x={150} y={y(t.from) + 20} tone={t.lit ? "lit" : "default"} delay={200 + i * 80} />
      ))}
      <g className="fade-on-draw" style={d(900)}>
        <Label x={240} y={y(1) + 12} anchor="middle" fill={PAPER}>RULE-0219</Label>
        <Label x={240} y={y(2) + 2} anchor="middle" fill={PAPER}>RULE-0107</Label>
      </g>
    </svg>
  );
}

/** Enterprise change: the reach of one change, mapped before release. */
export function ChangeVisual() {
  const systems = ["Pricing engine", "Billing", "Legacy batch"];
  const ys = [20, 84, 148];
  const ends = ["CUSTOMERS", "OPERATIONS", "COMPLIANCE"];
  return (
    <svg viewBox="0 0 480 208" data-ambient className="block h-auto w-full overflow-visible" role="img" aria-label="One change reaches three systems. Its effect on customers, operations and compliance is mapped before release.">
      <g fill="none" strokeWidth={1}>
        {ys.map((y, i) => (
          <path
            key={i}
            d={y + 20 === 104 ? "M128 104H176" : `M128 104H146L152 ${104 + (y + 20 > 104 ? 6 : -6)}V${y + 20 + (y + 20 > 104 ? -6 : 6)}L158 ${y + 20}H176`}
            pathLength={1}
            className="trace-draw"
            style={d(200 + i * 120)}
            stroke={PAPER}
          />
        ))}
        {ys.map((y, i) => (
          <path key={`o${i}`} d={`M306 ${y + 20}H352`} pathLength={1} className="trace-draw" style={d(620 + i * 120)} stroke={RULE} />
        ))}
        <path d="M352 6V202" stroke={MUTED} strokeDasharray="3 4" className="fade-on-draw" style={d(500)} />
      </g>
      {/* The reach of the change, traced to the release line */}
      <g className="motion-only" fill={PAPER}>
        {ys.map((y, i) => {
          const p = y + 20 === 104 ? "M128 104H352" : `M128 104H146L152 ${104 + (y + 20 > 104 ? 6 : -6)}V${y + 20 + (y + 20 > 104 ? -6 : 6)}L158 ${y + 20}H352`;
          return (
            <rect key={y} width={5} height={5} x={-2.5} y={-2.5}>
              <animateMotion path={p} dur="2.8s" begin={`${(i * 0.35).toFixed(2)}s`} repeatCount="indefinite" />
            </rect>
          );
        })}
      </g>
      <Box x={0} y={84} w={128} label="CHANGE-0412" tone="solid" />
      {systems.map((s, i) => (
        <Box key={s} x={176} y={ys[i]} w={130} label={s} tone="lit" delay={380 + i * 100} />
      ))}
      {ends.map((e, i) => (
        <g key={e}>
          <Sq x={352} y={ys[i] + 20} tone="ghost" delay={760 + i * 100} />
          <g className="fade-on-draw" style={d(820 + i * 100)}>
            <Label x={368} y={ys[i] + 24}>{e}</Label>
          </g>
        </g>
      ))}
      <g className="fade-on-draw" style={d(560)}>
        <Label x={360} y={0} fill={PAPER}>BEFORE RELEASE</Label>
      </g>
    </svg>
  );
}

/** AI-generated software: an independent check of behaviour against intent. */
export function AIVisual() {
  const ticks = Array.from({ length: 40 }, (_, i) => 108 + i * 9.4);
  const checks = [150, 234, 318, 402];
  const differs = 318;
  return (
    <svg viewBox="0 0 480 208" data-ambient className="block h-auto w-full overflow-visible" role="img" aria-label="Generated code arrives quickly on one track. Intended behaviour sits on another. Independent checks compare the two and flag where behaviour differs.">
      <Label x={0} y={52}>GENERATED</Label>
      <Label x={0} y={162}>INTENDED</Label>
      <path d="M108 48H480" pathLength={1} className="trace-draw" style={d(100)} fill="none" stroke={RULE} />
      <g className="tick-stream">
        {ticks.map((x, i) => (
          <path key={i} d={`M${x} 40V56`} stroke={MUTED} className="fade-on-draw" style={d(160 + i * 14)} />
        ))}
      </g>
      <path d="M108 158H480" pathLength={1} className="trace-draw" style={d(300)} fill="none" stroke={RULE} />
      {checks.map((x, i) => {
        const bad = x === differs;
        return (
          <g key={x}>
            <path d={`M${x} 154V62`} fill="none" stroke={bad ? PAPER : MUTED} strokeDasharray="3 4" className="fade-on-draw" style={d(700 + i * 140)} />
            <rect x={x - 6} y={152} width={12} height={12} fill={NAVY} stroke={PAPER} className="fade-on-draw" style={d(600 + i * 140)} />
            {bad ? (
              <g className="fade-on-draw" style={d(1250)}>
                <rect x={x - 7} y={41} width={14} height={14} fill={PAPER} />
                <path d={`M${x - 3} 45L${x + 3} 51M${x + 3} 45L${x - 3} 51`} stroke="#070A12" strokeWidth={1.5} />
                <Label x={x + 14} y={92} fill={PAPER}>DIFFERS FROM INTENT</Label>
              </g>
            ) : (
              <rect x={x - 3} y={45} width={6} height={6} fill={PAPER} className="fade-on-draw" style={d(800 + i * 140)} />
            )}
          </g>
        );
      })}
      <g className="fade-on-draw" style={d(900)}>
        <Label x={108} y={196}>INDEPENDENT CHECKS</Label>
      </g>
    </svg>
  );
}

/** Due diligence: condition, complexity and risk located inside one application. */
export function DiligenceVisual() {
  const modules = [
    { x: 0, y: 24, w: 148, h: 104, label: "Billing core", tone: "complex" },
    { x: 148, y: 24, w: 92, h: 64, label: "Batch", tone: "risk" },
    { x: 240, y: 24, w: 56, h: 64, label: "API", tone: "plain" },
    { x: 148, y: 88, w: 148, h: 40, label: "Reports", tone: "plain" },
    { x: 0, y: 128, w: 84, h: 72, label: "Auth", tone: "plain" },
    { x: 84, y: 128, w: 120, h: 72, label: "Integrations", tone: "complex" },
    { x: 204, y: 128, w: 92, h: 72, label: "Admin", tone: "plain" },
  ];
  const legend = [
    { key: "CONDITION", value: "Known", swatch: "plain" },
    { key: "COMPLEXITY", value: "Mapped", swatch: "complex" },
    { key: "RISK", value: "Located", swatch: "risk" },
  ];
  const fill = (t: string) => (t === "risk" ? PAPER : t === "complex" ? RULE : NAVY);
  return (
    <svg viewBox="0 0 480 208" data-ambient className="block h-auto w-full overflow-visible" role="img" aria-label="An application broken into modules. Complex modules and the riskiest module are marked before acquisition, migration or investment.">
      <Label x={0} y={12}>APPLICATION UNDER REVIEW</Label>
      {modules.map((m, i) => (
        <g key={m.label} className="fade-on-draw" style={d(120 + i * 90)}>
          <rect x={m.x} y={m.y} width={m.w} height={m.h} fill={fill(m.tone)} stroke={m.tone === "risk" ? PAPER : "#646B78"} />
          <text x={m.x + 10} y={m.y + 21} className="font-sans" fontSize={12.5} fill={m.tone === "risk" ? "#070A12" : PAPER}>
            {m.label}
          </text>
        </g>
      ))}
      <line x1={0} y1={24} x2={0} y2={200} stroke={PAPER} strokeWidth={1.5} className="module-scan motion-only" />
      <g transform="translate(336 40)">
        {legend.map((l, i) => (
          <g key={l.key} transform={`translate(0 ${i * 52})`} className="fade-on-draw" style={d(800 + i * 140)}>
            <rect width={12} height={12} y={2} fill={fill(l.swatch)} stroke={l.swatch === "plain" ? "#646B78" : l.swatch === "risk" ? PAPER : "none"} />
            <Label x={22} y={12}>{l.key}</Label>
            <text x={22} y={32} className="font-sans" fontSize={13.5} fill={PAPER}>
              {l.value}
            </text>
          </g>
        ))}
      </g>
    </svg>
  );
}

export const contextVisuals = {
  migration: MigrationVisual,
  change: ChangeVisual,
  ai: AIVisual,
  diligence: DiligenceVisual,
} as const;
