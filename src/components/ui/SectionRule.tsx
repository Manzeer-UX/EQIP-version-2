import type { ReactNode } from "react";
import { Reveal } from "@/components/motion/Reveal";

/**
 * Running header that opens each section: a hairline that draws in from the
 * left with the section name in Mono Label. It replaces floating eyebrows
 * and is the transition between sections.
 */
export function SectionRule({
  label,
  aside,
  tone = "dark",
  className = "",
}: {
  label: string;
  aside?: ReactNode;
  tone?: "dark" | "light";
  className?: string;
}) {
  const line = tone === "dark" ? "bg-graphite-700" : "bg-paper-300";
  const text = tone === "dark" ? "text-graphite-300" : "text-graphite-700";
  return (
    <Reveal kind="rule" className={`relative flex items-baseline justify-between gap-6 pt-4 ${className}`}>
      <span aria-hidden className={`rule-line absolute inset-x-0 top-0 h-px ${line}`} />
      <p className={`rule-label type-label ${text}`}>{label}</p>
      {aside ? <div className={`rule-label type-label ${text}`}>{aside}</div> : null}
    </Reveal>
  );
}
