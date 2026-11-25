"use client";

import { useState, useSyncExternalStore } from "react";
import { useReducedMotion } from "@/components/motion/useReducedMotion";

/**
 * Hero visual: the hero sentence, animated. Four kinds of knowledge arrive
 * from the left, fill one core of actionable intelligence cell by cell, and
 * leave as three outcomes. Signal marks the outcome that matters most here:
 * risk anticipated. Minimal by design: lines, squares, one rhythm.
 */

const W = 560;
const H = 520;
const T = 6; // seconds per cycle
const BEGIN = 1.9; // after the draw-in

const INPUTS = [
  { label: "ORGANISATIONAL KNOWLEDGE", short: "Knowledge", y: 96, d: "M8 96H98L224 222" },
  { label: "BUSINESS PROCESSES", short: "Processes", y: 196, d: "M8 196H172L224 248" },
  { label: "OPERATIONAL WORKFLOWS", short: "Workflows", y: 324, d: "M8 324H172L224 272" },
  { label: "TECHNOLOGY", short: "Technology", y: 424, d: "M8 424H98L224 298" },
];

const OUTPUTS = [
  { label: "ANTICIPATE RISKS", y: 140, d: "M336 236H352L448 140H548", signal: true },
  { label: "INFORMED DECISIONS", y: 260, d: "M336 260H548", signal: false },
  { label: "EVOLVE WITH CONFIDENCE", y: 380, d: "M336 284H352L448 380H548", signal: false },
];

const CORE = { x: 224, y: 204, s: 112 };
// Fill order for the 16 cells, so the core builds up organically rather than row by row.
const ORDER = [5, 10, 0, 15, 6, 3, 12, 9, 1, 14, 7, 8, 2, 13, 4, 11];
const STATIC_LIT = new Set([0, 1, 2, 4, 5, 6, 8, 9, 10, 13, 15]);

const k = (s: number) => Math.min(1, Math.max(0, s / T)).toFixed(4);
const subscribe = () => () => {};

type Focus = { kind: "in" | "out"; i: number } | { kind: "core" } | null;

export function IntelligenceFlow() {
  const reduced = useReducedMotion();
  const isClient = useSyncExternalStore(subscribe, () => true, () => false);
  const animate = isClient && !reduced;
  const [focus, setFocus] = useState<Focus>(null);

  const inLit = (i: number) => !focus || focus.kind === "core" || (focus.kind === "in" && focus.i === i);
  const outLit = (i: number) => !focus || focus.kind === "core" || (focus.kind === "out" && focus.i === i);
  const strong = (kind: "in" | "out", i: number) => focus !== null && (focus.kind === "core" || (focus.kind === kind && focus.i === i));

  return (
    <figure
      className="relative"
      aria-label="Organisational knowledge, business processes, operational workflows and technology flow into one core of actionable intelligence, which produces three outcomes: anticipated risks, informed decisions, and change with confidence."
    >
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="block h-auto w-full overflow-visible select-none"
        aria-hidden
        data-ambient
        onMouseLeave={() => setFocus(null)}
      >
        {/* Inputs */}
        {INPUTS.map((input, i) => {
          const lit = inLit(i);
          const on = strong("in", i);
          const depart = BEGIN + i * 0.12;
          return (
            <g key={input.label} style={{ opacity: lit ? 1 : 0.32, transition: "opacity 300ms" }}>
              <text
                x={8}
                y={input.y - 14}
                className="scan-node font-mono"
                style={{ ["--at" as string]: `${300 + i * 90}ms`, transition: "fill 300ms" }}
                fontSize={10}
                fontWeight={500}
                letterSpacing="0.08em"
                fill={on ? "#F4F1EA" : "#9AA8BD"}
              >
                {input.label}
              </text>
              <path
                d={input.d}
                fill="none"
                stroke={on ? "#F4F1EA" : "#646B78"}
                strokeWidth={on ? 1.5 : 1}
                pathLength={1}
                className="scan-trace"
                style={{ ["--at" as string]: `${400 + i * 90}ms`, transition: "stroke 300ms, stroke-width 300ms" }}
              />
              <rect x={4} y={input.y - 4} width={8} height={8} fill="#070A12" stroke="#9AA8BD" className="scan-node" style={{ ["--at" as string]: `${300 + i * 90}ms` }}>
                {animate && (
                  <animate
                    attributeName="fill"
                    values="#070A12;#070A12;#F4F1EA;#070A12;#070A12"
                    keyTimes={`0;${k(depart - BEGIN)};${k(depart - BEGIN + 0.12)};${k(depart - BEGIN + 0.5)};1`}
                    dur={`${T}s`}
                    begin={`${BEGIN}s`}
                    repeatCount="indefinite"
                  />
                )}
              </rect>
              {/* Wide invisible hit area */}
              <path d={input.d} fill="none" stroke="transparent" strokeWidth={22} onMouseEnter={() => setFocus({ kind: "in", i })} />
              {animate && (
                <rect width={6} height={6} x={-3} y={-3} fill="#F4F1EA" opacity={0}>
                  <animateMotion
                    path={input.d}
                    dur={`${T}s`}
                    begin={`${BEGIN}s`}
                    repeatCount="indefinite"
                    calcMode="linear"
                    keyPoints="0;0;1;1"
                    keyTimes={`0;${k(i * 0.12)};${k(i * 0.12 + 1.3)};1`}
                  />
                  <animate
                    attributeName="opacity"
                    values="0;0;1;1;0;0"
                    keyTimes={`0;${k(i * 0.12)};${k(i * 0.12 + 0.05)};${k(i * 0.12 + 1.25)};${k(i * 0.12 + 1.32)};1`}
                    dur={`${T}s`}
                    begin={`${BEGIN}s`}
                    repeatCount="indefinite"
                  />
                </rect>
              )}
            </g>
          );
        })}

        {/* Core: actionable intelligence, built cell by cell */}
        <g className="scan-node" style={{ ["--at" as string]: "900ms" }} onMouseEnter={() => setFocus({ kind: "core" })}>
          <rect x={CORE.x} y={CORE.y} width={CORE.s} height={CORE.s} fill="#0F1724" stroke="#F4F1EA" strokeWidth={1}>
            {animate && (
              <animate
                attributeName="stroke-width"
                values="1;1;2.5;1;1"
                keyTimes={`0;${k(2.45)};${k(2.6)};${k(2.95)};1`}
                dur={`${T}s`}
                begin={`${BEGIN}s`}
                repeatCount="indefinite"
              />
            )}
          </rect>
          {Array.from({ length: 16 }).map((_, c) => {
            const order = ORDER.indexOf(c);
            const on = 1.35 + order * 0.07;
            return (
              <rect
                key={c}
                x={CORE.x + 11 + (c % 4) * 24}
                y={CORE.y + 11 + Math.floor(c / 4) * 24}
                width={18}
                height={18}
                fill={animate ? "#243044" : STATIC_LIT.has(c) ? "#F4F1EA" : "#243044"}
              >
                {animate && (
                  <animate
                    attributeName="fill"
                    values="#243044;#243044;#F4F1EA;#F4F1EA;#243044;#243044"
                    keyTimes={`0;${k(on)};${k(on + 0.14)};0.8;0.9;1`}
                    dur={`${T}s`}
                    begin={`${BEGIN}s`}
                    repeatCount="indefinite"
                  />
                )}
              </rect>
            );
          })}
          <text
            x={CORE.x + CORE.s / 2}
            y={CORE.y + CORE.s + 24}
            textAnchor="middle"
            className="font-mono"
            fontSize={10}
            fontWeight={500}
            letterSpacing="0.08em"
            fill={focus?.kind === "core" ? "#F4F1EA" : "#9AA8BD"}
            style={{ transition: "fill 300ms" }}
          >
            ACTIONABLE INTELLIGENCE
          </text>
        </g>

        {/* Outcomes */}
        {OUTPUTS.map((out, j) => {
          const lit = outLit(j);
          const on = strong("out", j);
          const leave = 2.75 + j * 0.1;
          const arrive = leave + 1.1;
          const flash = out.signal ? "#38BDF8" : "#F4F1EA";
          return (
            <g key={out.label} style={{ opacity: lit ? 1 : 0.32, transition: "opacity 300ms" }}>
              <path
                d={out.d}
                fill="none"
                stroke={on ? "#F4F1EA" : "#646B78"}
                strokeWidth={on ? 1.5 : 1}
                pathLength={1}
                className="scan-trace"
                style={{ ["--at" as string]: `${1100 + j * 90}ms`, transition: "stroke 300ms, stroke-width 300ms" }}
              />
              <text
                x={552}
                y={out.y - 14}
                textAnchor="end"
                className="scan-node font-mono"
                style={{ ["--at" as string]: `${1300 + j * 90}ms`, transition: "fill 300ms" }}
                fontSize={10}
                fontWeight={500}
                letterSpacing="0.08em"
                fill={out.signal ? "#38BDF8" : on ? "#F4F1EA" : "#9AA8BD"}
              >
                {out.label}
              </text>
              <rect
                x={544}
                y={out.y - 4}
                width={8}
                height={8}
                fill={animate ? "#070A12" : out.signal ? "#38BDF8" : "#070A12"}
                stroke={out.signal ? "#38BDF8" : "#9AA8BD"}
                className="scan-node"
                style={{ ["--at" as string]: `${1300 + j * 90}ms` }}
              >
                {animate && (
                  <animate
                    attributeName="fill"
                    values={`#070A12;#070A12;${flash};${flash};#070A12;#070A12`}
                    keyTimes={`0;${k(arrive)};${k(arrive + 0.08)};0.86;0.94;1`}
                    dur={`${T}s`}
                    begin={`${BEGIN}s`}
                    repeatCount="indefinite"
                  />
                )}
              </rect>
              <path d={out.d} fill="none" stroke="transparent" strokeWidth={22} onMouseEnter={() => setFocus({ kind: "out", i: j })} />
              {animate && (
                <rect width={6} height={6} x={-3} y={-3} fill={out.signal ? "#38BDF8" : "#F4F1EA"} opacity={0}>
                  <animateMotion
                    path={out.d}
                    dur={`${T}s`}
                    begin={`${BEGIN}s`}
                    repeatCount="indefinite"
                    calcMode="linear"
                    keyPoints="0;0;1;1"
                    keyTimes={`0;${k(leave)};${k(arrive)};1`}
                  />
                  <animate
                    attributeName="opacity"
                    values="0;0;1;1;0;0"
                    keyTimes={`0;${k(leave)};${k(leave + 0.05)};${k(arrive - 0.05)};${k(arrive)};1`}
                    dur={`${T}s`}
                    begin={`${BEGIN}s`}
                    repeatCount="indefinite"
                  />
                </rect>
              )}
            </g>
          );
        })}
      </svg>
    </figure>
  );
}
