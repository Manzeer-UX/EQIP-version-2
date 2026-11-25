"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { useReducedMotion } from "@/components/motion/useReducedMotion";

type Item = { key: string; number: string; title: string; body: string; glyph: ReactNode };

/**
 * The four capabilities as one closed loop. While the section is in view the
 * active stage advances on its own; hovering or focusing a stage takes over.
 * One Signal marker travels the loop: the live state.
 */
export function CapabilityLoop({ items }: { items: Item[] }) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [inView, setInView] = useState(false);
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!inView || paused || reduced) return;
    const t = window.setInterval(() => setActive((a) => (a + 1) % items.length), 3400);
    return () => window.clearInterval(t);
  }, [inView, paused, reduced, items.length]);

  return (
    <div
      ref={ref}
      className="mt-12 lg:mt-14"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      {/* The loop: forward along the top, returning beneath. */}
      <div aria-hidden className="relative mb-8 hidden h-9 lg:block">
        <span className="absolute top-3.5 right-0 left-0 h-px bg-graphite-700" />
        <span className="absolute top-3.5 right-0 h-[1.25rem] w-px border-r border-dashed border-graphite-700" />
        <span className="absolute top-[2.125rem] right-0 left-0 h-px border-t border-dashed border-graphite-700" />
        <span className="absolute top-3.5 left-0 h-[1.25rem] w-px border-l border-dashed border-graphite-700" />
        <div className="absolute inset-x-0 top-0 grid grid-cols-4 gap-x-6">
          {items.map((it, i) => (
            <span
              key={it.key}
              className={`type-status inline-flex size-7 items-center justify-center border transition-colors duration-500 ${
                reduced || i === active ? "border-paper-100 bg-paper-100 text-ink-950" : "border-graphite-700 bg-ink-950 text-graphite-300"
              }`}
            >
              {it.number}
            </span>
          ))}
        </div>
        {/* Signal marker: the live stage */}
        <div className="pointer-events-none absolute inset-x-0 top-0 grid grid-cols-4 gap-x-6">
          <span
            className="col-start-1 block h-7 transition-transform duration-700 ease-[var(--ease-in-out)]"
            style={{ transform: `translateX(calc(${active} * (100% + 1.5rem)))` }}
          >
            <span className="absolute top-[0.6875rem] left-10 size-2 bg-signal-400" />
          </span>
        </div>
      </div>

      <ol className="grid gap-x-6 gap-y-12 md:grid-cols-2 lg:grid-cols-4">
        {items.map((it, i) => {
          const isActive = reduced || i === active;
          return (
            <li
              key={it.key}
              className={`cap-col group ${isActive ? "is-active" : ""}`}
              onMouseEnter={() => setActive(i)}
            >
              <button
                type="button"
                className="block w-full cursor-default text-left outline-none"
                onFocus={() => setActive(i)}
                aria-pressed={i === active}
                aria-label={`${it.number} ${it.title}`}
              >
                <span className="cap-glyph block border-t border-graphite-700 pt-5 lg:border-t-0 lg:pt-0">{it.glyph}</span>
              </button>
              <p className="type-label mt-6 text-graphite-300 lg:hidden">{it.number}</p>
              <h3 className={`type-heading-s mt-2 transition-colors duration-500 lg:mt-7 ${isActive ? "text-paper-100" : "text-graphite-300"}`}>
                {it.title}
              </h3>
              <p className="type-body-s mt-3 max-w-[30ch] text-graphite-300">{it.body}</p>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
