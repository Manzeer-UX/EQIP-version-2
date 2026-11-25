/**
 * "What will this change affect?" as a drawing: one change (the solid
 * square) sends ripples outwards, and each ripple touches parts of the estate
 * nobody mapped (dashed). Pure CSS motion; still for reduced-motion users.
 */

const C = 140;
const UNKNOWN = [
  { x: 52, y: 70 },
  { x: 214, y: 46 },
  { x: 236, y: 182 },
  { x: 86, y: 222 },
  { x: 170, y: 252 },
  { x: 28, y: 150 },
  { x: 250, y: 112 },
];

export function ImpactRipple({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 280 280" className={className} aria-hidden data-ambient>
      {[0, 1.4, 2.8].map((d) => (
        <rect
          key={d}
          x={C - 130}
          y={C - 130}
          width={260}
          height={260}
          fill="none"
          stroke="#070A12"
          strokeWidth={1}
          className="ripple-sq"
          style={{ ["--d" as string]: `${d}s` }}
        />
      ))}
      {UNKNOWN.map((u) => {
        const dist = Math.max(Math.abs(u.x - C), Math.abs(u.y - C)) / 130;
        return (
          <rect
            key={`${u.x}-${u.y}`}
            x={u.x - 7}
            y={u.y - 7}
            width={14}
            height={14}
            fill="none"
            stroke="#646B78"
            strokeDasharray="2 2"
            className="ripple-hit"
            style={{ ["--d" as string]: `${(dist * 3.4).toFixed(2)}s` }}
          />
        );
      })}
      <rect x={C - 9} y={C - 9} width={18} height={18} fill="#070A12" />
      <text x={C} y={C + 32} textAnchor="middle" className="font-mono" fontSize={9.5} fontWeight={500} letterSpacing="0.08em" fill="#3A404B">
        CHANGE
      </text>
    </svg>
  );
}
