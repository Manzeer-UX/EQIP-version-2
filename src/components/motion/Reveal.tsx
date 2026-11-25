"use client";

import { useEffect, useRef, type CSSProperties, type ElementType, type ReactNode } from "react";

/**
 * Scroll reveal for one element. Server HTML is always fully visible; only
 * after this element has hydrated, and only if it starts below the fold, is
 * it armed (data-state="armed") and hidden until it scrolls into view.
 * kind="draw" draws the traces inside the element instead of fading it.
 */

type Arm = { el: HTMLElement; show: () => void };
const armed = new Set<Arm>();
let io: IntersectionObserver | null = null;
let sweepTimer = 0;

function release(arm: Arm) {
  arm.show();
  armed.delete(arm);
  io?.unobserve(arm.el);
}

function sweep() {
  sweepTimer = 0;
  const limit = window.innerHeight * 0.92;
  armed.forEach((arm) => {
    if (arm.el.getBoundingClientRect().top < limit) release(arm);
  });
}

function onScroll() {
  // Safety net for throttled observers: never leave content hidden in view.
  if (!sweepTimer) sweepTimer = window.setTimeout(sweep, 160);
}

function track(arm: Arm) {
  if (!io) {
    io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          armed.forEach((a) => {
            if (a.el === entry.target) release(a);
          });
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.1 },
    );
    window.addEventListener("scroll", onScroll, { passive: true });
  }
  armed.add(arm);
  io.observe(arm.el);
  return () => {
    armed.delete(arm);
    io?.unobserve(arm.el);
  };
}

type RevealProps = {
  as?: ElementType;
  /** reveal: fade and rise. draw: draw traces inside. words: split-word headline. rule: section rule. */
  kind?: "reveal" | "draw" | "words" | "rule";
  /** Stagger for reveals, in ms. */
  delay?: number;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
  id?: string;
  role?: string;
  [key: `aria-${string}`]: string | undefined;
};

export function Reveal({ as: Tag = "div", kind = "reveal", delay, style, children, ...rest }: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!("IntersectionObserver" in window)) return;
    if (el.getBoundingClientRect().top <= window.innerHeight * 0.95) return;

    el.setAttribute("data-state", "armed");
    const untrack = track({ el, show: () => el.removeAttribute("data-state") });
    return () => {
      untrack();
      el.removeAttribute("data-state");
    };
  }, []);

  const mergedStyle = delay ? ({ ...style, ["--reveal-delay" as string]: `${delay}ms` } as CSSProperties) : style;
  const marker = { [`data-${kind === "reveal" ? "reveal" : kind === "draw" ? "draw" : `reveal-${kind}`}`]: "" };

  return (
    <Tag ref={ref} style={mergedStyle} {...marker} {...rest}>
      {children}
    </Tag>
  );
}
