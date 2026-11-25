"use client";

import { useEffect, useMemo, useRef, useState, type PointerEvent } from "react";
import { useReducedMotion } from "@/components/motion/useReducedMotion";

/**
 * Hero visual: the estate reader. An enterprise estate resolves as a scan
 * passes, data keeps moving through it, and a reader frame works through
 * three findings: an undocumented rule, a dependency no diagram shows, and a
 * system nobody owns. Hovering a system locks the reader onto it and traces
 * its whole dependency chain. Illustrative: every name and ID is fictional.
 */

type Kind = "channel" | "service" | "core" | "rule" | "legacy";
type N = { id: string; x: number; y: number; w: number; h: number; kind: Kind; label: string; code: string };
type Box = { x0: number; y0: number; x1: number; y1: number };

const W = 600;
const H = 600;

const ZONES = [
  { x: 0, w: 114, label: "CHANNELS" },
  { x: 122, w: 142, label: "SERVICES" },
  { x: 272, w: 164, label: "CORE SYSTEMS" },
  { x: 444, w: 156, label: "RULES · LEGACY" },
];

const NODES: N[] = [
  { id: "c1", x: 10, y: 60, w: 94, h: 26, kind: "channel", label: "Web portal", code: "CH-01" },
  { id: "c2", x: 10, y: 164, w: 94, h: 26, kind: "channel", label: "Mobile app", code: "CH-02" },
  { id: "c3", x: 10, y: 272, w: 94, h: 26, kind: "channel", label: "Partner API", code: "CH-03" },
  { id: "c4", x: 10, y: 380, w: 94, h: 26, kind: "channel", label: "Contact centre", code: "CH-04" },
  { id: "c5", x: 10, y: 488, w: 94, h: 26, kind: "channel", label: "Branch system", code: "CH-05" },
  { id: "s1", x: 132, y: 44, w: 122, h: 40, kind: "service", label: "Identity", code: "SVC-002" },
  { id: "s2", x: 132, y: 136, w: 122, h: 40, kind: "service", label: "Orders", code: "SVC-011" },
  { id: "s3", x: 132, y: 228, w: 122, h: 40, kind: "service", label: "Pricing", code: "SVC-017" },
  { id: "s4", x: 132, y: 320, w: 122, h: 40, kind: "service", label: "Payments", code: "SVC-023" },
  { id: "s5", x: 132, y: 412, w: 122, h: 40, kind: "service", label: "Claims intake", code: "SVC-031" },
  { id: "s6", x: 132, y: 504, w: 122, h: 40, kind: "service", label: "Notifications", code: "SVC-040" },
  { id: "k1", x: 282, y: 82, w: 144, h: 72, kind: "core", label: "Billing", code: "APP-047" },
  { id: "k2", x: 282, y: 212, w: 144, h: 72, kind: "core", label: "Policy admin", code: "APP-031" },
  { id: "k3", x: 282, y: 342, w: 144, h: 72, kind: "core", label: "ERP finance", code: "APP-052" },
  { id: "k4", x: 282, y: 472, w: 144, h: 72, kind: "core", label: "Data warehouse", code: "APP-060" },
  { id: "r1", x: 454, y: 44, w: 118, h: 24, kind: "rule", label: "Credit hold", code: "RULE-0342" },
  { id: "r2", x: 454, y: 82, w: 118, h: 24, kind: "rule", label: "Volume discount", code: "RULE-0107" },
  { id: "r3", x: 454, y: 120, w: 118, h: 24, kind: "rule", label: "Late-payment grace", code: "RULE-0388" },
  { id: "r4", x: 454, y: 164, w: 118, h: 24, kind: "rule", label: "Regional tax exception", code: "RULE-0219" },
  { id: "r5", x: 454, y: 236, w: 118, h: 24, kind: "rule", label: "Refund approval", code: "RULE-0410" },
  { id: "r6", x: 454, y: 290, w: 118, h: 24, kind: "rule", label: "Month-end close", code: "RULE-0455" },
  { id: "l1", x: 454, y: 372, w: 132, h: 56, kind: "legacy", label: "Legacy batch", code: "APP-008" },
  { id: "l2", x: 454, y: 484, w: 132, h: 56, kind: "legacy", label: "Mainframe ledger", code: "APP-003" },
];

const EDGES: { a: string; b: string; hidden?: boolean }[] = [
  { a: "c1", b: "s1" }, { a: "c1", b: "s2" }, { a: "c2", b: "s2" }, { a: "c2", b: "s3" }, { a: "c3", b: "s3" },
  { a: "c3", b: "s4" }, { a: "c4", b: "s4" }, { a: "c4", b: "s5" }, { a: "c5", b: "s5" }, { a: "c5", b: "s6" },
  { a: "s1", b: "k1" }, { a: "s2", b: "k1" }, { a: "s2", b: "k2" }, { a: "s3", b: "k1" }, { a: "s3", b: "k2" },
  { a: "s4", b: "k3" }, { a: "s4", b: "k1" }, { a: "s5", b: "k2" }, { a: "s5", b: "k4" }, { a: "s6", b: "k4" },
  { a: "k1", b: "r1" }, { a: "k1", b: "r2" }, { a: "k1", b: "r3" }, { a: "k1", b: "r4" }, { a: "k2", b: "r5" },
  { a: "k3", b: "r6" }, { a: "k3", b: "l1", hidden: true }, { a: "k4", b: "l2" }, { a: "l1", b: "r4" },
];

const FINDINGS = [
  {
    tab: "Undocumented rule",
    code: "RULE-0219",
    title: "Regional tax exception",
    detail: "Runs in Billing and Legacy batch. Documented nowhere.",
    target: "r4",
    nodes: ["r4", "k1", "l1"],
    edges: [23, 28],
  },
  {
    tab: "Hidden dependency",
    code: "APP-052 → APP-008",
    title: "ERP finance relies on Legacy batch",
    detail: "A month-end dependency drawn in no diagram.",
    target: "edge",
    nodes: ["k3", "l1"],
    edges: [26],
  },
  {
    tab: "Knowledge at risk",
    code: "APP-008",
    title: "Legacy batch",
    detail: "No recorded owner. Its original team has moved on.",
    target: "l1",
    nodes: ["l1"],
    edges: [26, 28],
  },
];

const byId = new Map(NODES.map((n) => [n.id, n]));
const node = (id: string) => byId.get(id)!;

function route(a: N, b: N, i: number) {
  const y1 = a.y + a.h / 2;
  const y2 = b.y + b.h / 2;
  if (a.id === "l1" && b.id === "r4") {
    // The legacy copy of the rule: up the right-hand margin.
    return `M${a.x + a.w} ${y1}H588L594 ${y1 - 6}V${y2 + 6}L588 ${y2}H${b.x + b.w}`;
  }
  const x1 = a.x + a.w;
  const x2 = b.x;
  if (Math.abs(y2 - y1) < 1) return `M${x1} ${y1}H${x2}`;
  const mx = (x1 + x2) / 2 + ((i % 3) - 1) * 4;
  const r = Math.min(6, Math.abs(y2 - y1) / 2);
  const s = y2 > y1 ? 1 : -1;
  return `M${x1} ${y1}H${mx - r}L${mx} ${y1 + s * r}V${y2 - s * r}L${mx + r} ${y2}H${x2}`;
}

const PATHS = EDGES.map((e, i) => route(node(e.a), node(e.b), i));
const HIDDEN_MID = { x: 444, y: 389 };

function chainOf(id: string) {
  const nodes = new Set([id]);
  const edges = new Set<number>();
  const walk = (start: string, down: boolean) => {
    const queue = [start];
    while (queue.length) {
      const cur = queue.shift()!;
      EDGES.forEach((e, i) => {
        const [from, to] = down ? [e.a, e.b] : [e.b, e.a];
        if (from !== cur) return;
        edges.add(i);
        if (!nodes.has(to)) {
          nodes.add(to);
          queue.push(to);
        }
      });
    }
  };
  walk(id, true);
  walk(id, false);
  return { nodes, edges };
}

const pad = (n: N, p = 7): Box => ({ x0: n.x - p, y0: n.y - p, x1: n.x + n.w + p, y1: n.y + n.h + p });

/* Load sequence: the scan reveals the estate left to right. */
const SCAN_START = 700;
const SCAN_DUR = 2400;
const at = (x: number) => Math.round(SCAN_START + (x / W) * SCAN_DUR);
const READY_AT = SCAN_START + SCAN_DUR + 300;
const RUN = 5200;

const PACKET_EDGES = [1, 3, 6, 9, 11, 13, 16, 18, 21, 23, 27, 28];

export function EstateScan() {
  const reduced = useReducedMotion();
  const [ready, setReady] = useState(false);
  const [finding, setFinding] = useState(0);
  const [chosen, setChosen] = useState(false);
  const [hover, setHover] = useState<string | null>(null);
  const [inside, setInside] = useState(false);
  const [inView, setInView] = useState(true);
  const svgRef = useRef<SVGSVGElement>(null);
  const figRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const t = window.setTimeout(() => setReady(true), reduced ? 0 : READY_AT);
    return () => window.clearTimeout(t);
  }, [reduced]);

  useEffect(() => {
    const fig = figRef.current;
    const svg = svgRef.current;
    if (!fig || !("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(([e]) => {
      setInView(e.isIntersecting);
      if (!svg) return;
      if (e.isIntersecting) svg.unpauseAnimations();
      else svg.pauseAnimations();
    });
    io.observe(fig);
    return () => io.disconnect();
  }, []);

  const f = FINDINGS[finding];
  const chain = useMemo(() => (hover ? chainOf(hover) : null), [hover]);
  const running = ready && !chosen && !reduced && inView && !inside;

  // What the reader frame is locked onto.
  const box: Box = hover
    ? pad(node(hover))
    : f.target === "edge"
      ? { x0: HIDDEN_MID.x - 22, y0: HIDDEN_MID.y - 22, x1: HIDDEN_MID.x + 22, y1: HIDDEN_MID.y + 22 }
      : pad(node(f.target));
  const tagText = hover ? `${node(hover).code}  ${node(hover).label}` : f.code;
  const tagW = Math.round(tagText.length * 6.3 + 14);
  const tagX = Math.min(Math.max(box.x0, 0), W - tagW);
  const tagY = box.y0 - 22 < 0 ? box.y1 + 4 : box.y0 - 22;

  const onMove = (e: PointerEvent<SVGSVGElement>) => {
    const svg = svgRef.current;
    const ctm = svg?.getScreenCTM();
    if (!svg || !ctm) return;
    const p = new DOMPoint(e.clientX, e.clientY).matrixTransform(ctm.inverse());
    const hit = NODES.find((n) => p.x >= n.x - 6 && p.x <= n.x + n.w + 6 && p.y >= n.y - 6 && p.y <= n.y + n.h + 6);
    setHover(hit ? hit.id : null);
  };

  const showFinding = ready && !hover;
  const litNode = (id: string) => (chain ? chain.nodes.has(id) : showFinding && f.nodes.includes(id));
  const litEdge = (i: number) => (chain ? chain.edges.has(i) : showFinding && f.edges.includes(i));
  const dimNode = (id: string) => (chain ? !chain.nodes.has(id) : false);
  const dimEdge = (i: number) => (chain ? !chain.edges.has(i) : false);

  return (
    <figure
      ref={figRef}
      className="relative"
      aria-label="Illustrative business estate being read by EQIP. Channels, services, core systems, business rules and legacy systems resolve into one connected map. Three findings are surfaced: an undocumented rule, a dependency drawn in no diagram, and a system with no recorded owner."
      onPointerEnter={() => setInside(true)}
      onPointerLeave={(e) => {
        setInside(false);
        // On touch, keep the tapped system read until another tap.
        if (e.pointerType === "mouse") setHover(null);
      }}
    >
      <svg
        ref={svgRef}
        viewBox={`0 0 ${W} ${H}`}
        className="block h-auto w-full touch-manipulation overflow-visible select-none"
        aria-hidden
        onPointerMove={onMove}
        onPointerDown={onMove}
      >
        {/* Zones */}
        {ZONES.map((z, i) => (
          <g key={z.label} className="scan-unknown">
            <rect x={z.x} y={24} width={z.w} height={H - 24} fill="#0F1724" fillOpacity={0.7} stroke="#152033" />
            <text x={z.x + 10} y={14} className="font-mono" fontSize={9.5} fontWeight={500} letterSpacing="0.08em" fill={i === 3 ? "#9AA8BD" : "#646B78"}>
              {z.label}
            </text>
          </g>
        ))}

        {/* Connections: faint while unknown, drawn in as the scan passes */}
        <g fill="none">
          {PATHS.map((d, i) => (
            <path key={`u${i}`} d={d} stroke="#243044" strokeDasharray="2 5" className="scan-unknown" />
          ))}
          {PATHS.map((d, i) => {
            const e = EDGES[i];
            const lit = litEdge(i);
            const isSignal = showFinding && finding === 1 && i === 26;
            const from = node(e.a);
            const stroke = isSignal ? "#38BDF8" : lit ? "#F4F1EA" : e.hidden ? "#646B78" : "#3A404B";
            const common = {
              d,
              stroke,
              strokeWidth: lit || isSignal ? 1.5 : 1,
              strokeOpacity: dimEdge(i) ? 0.22 : 1,
              style: { transition: "stroke 300ms, stroke-opacity 300ms, stroke-width 300ms", ["--at" as string]: `${at(from.x + from.w)}ms` },
            };
            return e.hidden ? (
              <path key={`k${i}`} {...common} strokeDasharray="4 4" className="scan-unknown" />
            ) : (
              <path key={`k${i}`} {...common} pathLength={1} className="scan-trace" />
            );
          })}
        </g>

        {/* Systems */}
        {NODES.map((n) => {
          const lit = litNode(n.id);
          const isTarget = showFinding && f.target === n.id;
          const signalFill = isTarget && finding === 0;
          const signalStroke = isTarget && finding === 2;
          const hovered = hover === n.id;
          const big = n.kind === "core" || n.kind === "legacy";
          const fill = signalFill ? "#38BDF8" : big ? "#152033" : "#0F1724";
          const stroke = signalFill || signalStroke ? "#38BDF8" : hovered || lit ? "#F4F1EA" : big || n.kind === "service" ? "#646B78" : "#3A404B";
          const bar = lit || hovered ? "#9AA8BD" : "#243044";
          return (
            <g key={n.id} style={{ opacity: dimNode(n.id) ? 0.28 : 1, transition: "opacity 300ms" }}>
              <rect x={n.x} y={n.y} width={n.w} height={n.h} fill="none" stroke="#3A404B" strokeDasharray="3 4" className="scan-unknown" />
              <g className="scan-node" style={{ ["--at" as string]: `${at(n.x)}ms` }}>
                <rect
                  x={n.x}
                  y={n.y}
                  width={n.w}
                  height={n.h}
                  fill={fill}
                  stroke={stroke}
                  strokeWidth={signalStroke || hovered ? 1.5 : 1}
                  style={{ transition: "fill 300ms, stroke 300ms" }}
                />
                {n.kind === "channel" && <rect x={n.x + 9} y={n.y + 11} width={n.w * 0.45} height={3} fill={bar} />}
                {n.kind === "service" && (
                  <>
                    <rect x={n.x + 10} y={n.y + 11} width={n.w * 0.5} height={3} fill={lit || hovered ? "#F4F1EA" : "#3A404B"} />
                    <rect x={n.x + 10} y={n.y + 20} width={n.w * 0.68} height={3} fill={bar} />
                    <rect x={n.x + 10} y={n.y + 29} width={n.w * 0.34} height={3} fill={bar} />
                    <rect x={n.x + n.w - 16} y={n.y + 9} width={6} height={6} fill={lit || hovered ? "#F4F1EA" : "#3A404B"} />
                  </>
                )}
                {n.kind === "core" && (
                  <>
                    <text x={n.x + 10} y={n.y + 17} className="font-mono" fontSize={9} fontWeight={500} letterSpacing="0.06em" fill={lit || hovered ? "#F4F1EA" : "#646B78"}>
                      {n.code}
                    </text>
                    <rect x={n.x + 10} y={n.y + 25} width={n.w * 0.55} height={3} fill={bar} />
                    {Array.from({ length: 8 }).map((_, k) => (
                      <rect
                        key={k}
                        x={n.x + 10 + (k % 8) * 15}
                        y={n.y + 44}
                        width={10}
                        height={10}
                        fill={k % 3 === 2 ? "#243044" : lit || hovered ? "#F4F1EA" : "#646B78"}
                        style={{ transition: "fill 300ms" }}
                      />
                    ))}
                  </>
                )}
                {n.kind === "rule" && (
                  <text
                    x={n.x + 9}
                    y={n.y + 16}
                    className="font-mono"
                    fontSize={9.5}
                    fontWeight={500}
                    letterSpacing="0.06em"
                    fill={signalFill ? "#070A12" : lit || hovered ? "#F4F1EA" : "#9AA8BD"}
                    style={{ transition: "fill 300ms" }}
                  >
                    {n.code}
                  </text>
                )}
                {n.kind === "legacy" && (
                  <>
                    <text x={n.x + 10} y={n.y + 17} className="font-mono" fontSize={9} fontWeight={500} letterSpacing="0.06em" fill={lit || hovered ? "#F4F1EA" : "#646B78"}>
                      {n.code}
                    </text>
                    {[0, 1, 2].map((k) => (
                      <rect key={k} x={n.x + 10} y={n.y + 26 + k * 8} width={n.w * (0.7 - k * 0.18)} height={3} fill={bar} />
                    ))}
                    {signalStroke && (
                      <g>
                        <rect x={n.x + n.w - 20} y={n.y + 8} width={12} height={12} fill="#38BDF8" />
                        <text x={n.x + n.w - 14} y={n.y + 17.5} textAnchor="middle" className="font-mono" fontSize={9.5} fontWeight={700} fill="#070A12">
                          ?
                        </text>
                      </g>
                    )}
                  </>
                )}
              </g>
            </g>
          );
        })}

        {/* Data moving through the estate */}
        {ready &&
          !reduced &&
          PACKET_EDGES.map((edgeIndex, i) => (
            <rect key={edgeIndex} width={4} height={4} x={-2} y={-2} fill="#F4F1EA" opacity={dimEdge(edgeIndex) ? 0.15 : 0.9}>
              <animateMotion dur={`${2.6 + (i % 4) * 0.55}s`} begin={`${(i * 0.37).toFixed(2)}s`} repeatCount="indefinite" path={PATHS[edgeIndex]} />
            </rect>
          ))}

        {/* One-time scan sweep */}
        <g className="scan-line" style={{ ["--dur" as string]: `${SCAN_DUR}ms`, ["--start" as string]: `${SCAN_START}ms` }}>
          <line x1={0} y1={24} x2={0} y2={H} stroke="#F4F1EA" strokeWidth={1} />
          <rect x={-3} y={21} width={6} height={6} fill="#F4F1EA" />
        </g>

        {/* The reader frame: corners converge on what is being read */}
        {ready && (
          <g pointerEvents="none">
            {[
              { d: "M0 10V0H10", x: box.x0, y: box.y0 },
              { d: "M-10 0H0V10", x: box.x1, y: box.y0 },
              { d: "M0 -10V0H-10", x: box.x1, y: box.y1 },
              { d: "M10 0H0V-10", x: box.x0, y: box.y1 },
            ].map((c, k) => (
              <path
                key={k}
                d={c.d}
                fill="none"
                stroke="#F4F1EA"
                strokeWidth={1.5}
                className="reader-corner"
                style={{ transform: `translate(${c.x}px, ${c.y}px)` }}
              />
            ))}
            <g className="reader-corner" style={{ transform: `translate(${tagX}px, ${tagY}px)` }}>
              <rect width={tagW} height={17} fill="#F4F1EA" />
              <text x={7} y={12} className="font-mono" fontSize={9.5} fontWeight={500} letterSpacing="0.04em" fill="#070A12">
                {tagText}
              </text>
            </g>
          </g>
        )}
      </svg>

      {/* Findings: what the reader has surfaced */}
      <figcaption className="mt-4">
        <div role="group" aria-label="Findings" className="grid grid-cols-3 gap-px border-y border-graphite-700 bg-graphite-700">
          {FINDINGS.map((item, i) => {
            const on = i === finding;
            return (
              <button
                key={item.tab}
                type="button"
                aria-pressed={on}
                onClick={() => {
                  setFinding(i);
                  setChosen(true);
                }}
                className={`group relative bg-ink-950 px-3 py-2.5 text-left transition-colors duration-300 ${on ? "text-paper-100" : "text-graphite-300 hover:text-paper-100"}`}
              >
                <span className="type-status block">{String(i + 1).padStart(2, "0")}</span>
                <span className="mt-0.5 block text-[0.8125rem] leading-tight">{item.tab}</span>
                <span aria-hidden className="absolute inset-x-0 -top-px h-px overflow-hidden">
                  {on && running ? (
                    <span
                      key={finding}
                      className="progress-run block h-full bg-paper-100"
                      style={{ ["--run" as string]: `${RUN}ms` }}
                      onAnimationEnd={() => setFinding((v) => (v + 1) % FINDINGS.length)}
                    />
                  ) : on ? (
                    <span className="block h-full bg-paper-100" />
                  ) : null}
                </span>
              </button>
            );
          })}
        </div>
        <div className="mt-3 flex items-start justify-between gap-6">
          <p className="min-h-[2.6rem]">
            <span className="type-status mr-2 text-graphite-300">{f.code}</span>
            <span className="type-body-s text-paper-100">
              <span className="font-medium">{f.title}.</span> <span className="text-graphite-300">{f.detail}</span>
            </span>
          </p>
          <span className="type-status hidden shrink-0 text-graphite-500 xl:inline">Illustrative · hover to read a system</span>
        </div>
      </figcaption>
    </figure>
  );
}
