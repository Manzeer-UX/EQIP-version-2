/**
 * Compact drawings, one per capability, in the trace grammar. No labels: the
 * title and sentence beside each drawing carry the words. Elements with
 * .cap-anim / .cap-trace replay when their capability becomes active.
 */

const RULE = "#3A404B";
const MID = "#646B78";
const MUTED = "#9AA8BD";
const PAPER = "#F4F1EA";
const INK = "#070A12";

const d = (ms: number) => ({ ["--d" as string]: `${ms}ms` });

function Sq({ x, y, fill = INK, stroke = MUTED, delay = 0, dashed = false }: { x: number; y: number; fill?: string; stroke?: string; delay?: number; dashed?: boolean }) {
  return <rect x={x - 3.5} y={y - 3.5} width={7} height={7} fill={fill} stroke={stroke} strokeDasharray={dashed ? "2 2" : undefined} className="cap-anim" style={d(delay)} />;
}

/** 01 Understand: an application opened up, its hidden structure surfaced. */
export function UnderstandGlyph() {
  return (
    <svg viewBox="0 0 260 150" className="block h-auto w-full overflow-visible" aria-hidden>
      <rect x={8} y={14} width={150} height={122} fill="none" stroke={RULE} strokeDasharray="3 4" />
      <g fill="none" strokeWidth={1}>
        <path d="M64 39H88" stroke={MID} pathLength={1} className="cap-trace" style={d(200)} />
        <path d="M44 46V66" stroke={MID} pathLength={1} className="cap-trace" style={d(260)} />
        <path d="M76 73H86L92 79V81H96" stroke={MID} pathLength={1} className="cap-trace" style={d(320)} />
        <path d="M50 80V104" stroke={MID} pathLength={1} className="cap-trace" style={d(380)} />
        <path d="M118 88V105L112 111H100" stroke={MID} pathLength={1} className="cap-trace" style={d(440)} />
        <path d="M140 39H230" stroke={RULE} pathLength={1} className="cap-trace" style={d(520)} />
        <path d="M140 81H150L156 75H230" stroke={PAPER} pathLength={1} className="cap-trace" style={d(600)} />
        <path d="M100 111H230" stroke={RULE} strokeDasharray="3 4" className="cap-anim" style={d(680)} />
      </g>
      {[
        [24, 32, 40],
        [88, 32, 52],
        [24, 66, 52],
        [40, 104, 60],
      ].map(([x, y, w], i) => (
        <rect key={i} x={x} y={y} width={w} height={14} fill={INK} stroke={MUTED} className="cap-anim" style={d(80 + i * 60)} />
      ))}
      <rect x={96} y={74} width={44} height={14} fill={PAPER} className="cap-anim" style={d(320)} />
      <Sq x={236} y={39} delay={700} />
      <Sq x={236} y={75} fill={PAPER} stroke={PAPER} delay={780} />
      <Sq x={236} y={111} dashed delay={860} />
    </svg>
  );
}

/** 02 Preserve: every rule carried through the change. */
export function PreserveGlyph() {
  const ys = [42, 64, 86, 108];
  return (
    <svg viewBox="0 0 260 150" className="block h-auto w-full overflow-visible" aria-hidden>
      <rect x={8} y={20} width={90} height={110} fill={INK} stroke={MUTED} />
      <rect x={162} y={20} width={90} height={110} fill={INK} stroke={MUTED} />
      {ys.map((y, i) => (
        <g key={y}>
          <rect x={20} y={y - 2} width={56 - i * 6} height={4} fill={i === 2 ? PAPER : MID} />
          <path d={`M98 ${y}H162`} stroke={i === 2 ? PAPER : RULE} fill="none" pathLength={1} className="cap-trace" style={d(150 + i * 120)} />
          <Sq x={98} y={y} fill={i === 2 ? PAPER : INK} stroke={i === 2 ? PAPER : MUTED} delay={100 + i * 120} />
          <rect x={174} y={y - 2} width={56 - i * 6} height={4} fill={i === 2 ? PAPER : MID} className="cap-anim" style={d(650 + i * 120)} />
        </g>
      ))}
    </svg>
  );
}

/** 03 Validate: attention weighted outwards from the change. */
export function ValidateGlyph() {
  const cols = 10;
  const rows = 5;
  const size = 14;
  const gap = 8;
  const change = { c: 6, r: 2 };
  const fills = [PAPER, MUTED, MID, RULE, "transparent"];
  const cells = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const dist = Math.max(Math.abs(c - change.c), Math.abs(r - change.r));
      const level = Math.min(dist, 4);
      cells.push(
        <rect
          key={`${c}-${r}`}
          x={20 + c * (size + gap)}
          y={20 + r * (size + gap)}
          width={size}
          height={size}
          fill={fills[level]}
          stroke={level === 4 ? RULE : "none"}
          className="cap-anim"
          style={d(60 + (Math.abs(c - change.c) + Math.abs(r - change.r)) * 55)}
        />,
      );
    }
  }
  const bx = 20 + (change.c - 1) * (size + gap) - 5;
  const by = 20 + (change.r - 1) * (size + gap) - 5;
  const bs = 3 * (size + gap) - gap + 10;
  const k = 7;
  return (
    <svg viewBox="0 0 260 150" className="block h-auto w-full overflow-visible" aria-hidden>
      {cells}
      <rect x={20 + change.c * (size + gap) - 3} y={20 + change.r * (size + gap) - 3} width={size + 6} height={size + 6} fill="none" stroke={PAPER} />
      <path
        d={`M${bx} ${by + k}V${by}H${bx + k} M${bx + bs - k} ${by}H${bx + bs}V${by + k} M${bx + bs} ${by + bs - k}V${by + bs}H${bx + bs - k} M${bx + k} ${by + bs}H${bx}V${by + bs - k}`}
        fill="none"
        stroke={PAPER}
        className="cap-anim"
        style={d(520)}
      />
    </svg>
  );
}

/** 04 Evolve: blind spots close release by release. */
export function EvolveGlyph() {
  const xs = [28, 78, 128, 178, 228];
  return (
    <svg viewBox="0 0 260 150" className="block h-auto w-full overflow-visible" aria-hidden>
      <path d="M8 134H252" stroke={RULE} fill="none" pathLength={1} className="cap-trace" style={d(0)} />
      {xs.map((x, i) => (
        <g key={x}>
          {Array.from({ length: 4 }).map((_, k) => {
            const known = k <= i - (i === 4 ? 1 : 0) || (i === 4 && k < 4);
            return (
              <rect
                key={k}
                x={x - 7}
                y={104 - k * 22}
                width={14}
                height={14}
                fill={known ? PAPER : "none"}
                stroke={known ? "none" : MID}
                strokeDasharray={known ? undefined : "2 3"}
                className="cap-anim"
                style={d(120 + i * 110 + k * 40)}
              />
            );
          })}
          <Sq x={x} y={134} fill={i === 4 ? PAPER : INK} stroke={i === 4 ? PAPER : MUTED} delay={100 + i * 110} />
        </g>
      ))}
    </svg>
  );
}

export const capabilityGlyphs = {
  understand: UnderstandGlyph,
  preserve: PreserveGlyph,
  validate: ValidateGlyph,
  evolve: EvolveGlyph,
} as const;
