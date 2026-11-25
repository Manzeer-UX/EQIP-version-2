"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { useReducedMotion } from "@/components/motion/useReducedMotion";

type Item = { key: string; number: string; title: string; body: string; visual: ReactNode };

const RUN = 6500;

/**
 * Where confidence matters: every context listed at once, one drawing on the
 * stage. Advances on its own while in view (a hairline shows the time left);
 * hover pauses it, and choosing a context stops it.
 */
export function ContextIndex({ items }: { items: Item[] }) {
  const [active, setActive] = useState(0);
  const [chosen, setChosen] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [inView, setInView] = useState(false);
  const reduced = useReducedMotion();
  const auto = !chosen && !reduced;
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const running = auto && inView && !hovering;

  return (
    <div ref={ref} className="grid items-center gap-x-6 gap-y-12 lg:grid-cols-12">
      <ol
        className="border-t border-navy-700 lg:col-span-5"
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
      >
        {items.map((it, i) => {
          const on = i === active;
          return (
            <li key={it.key} className="border-b border-navy-700">
              <button
                type="button"
                aria-pressed={on}
                aria-controls="context-stage"
                onClick={() => {
                  setActive(i);
                  setChosen(true);
                }}
                onFocus={() => setActive(i)}
                className="group relative grid w-full grid-cols-[2.75rem_1fr] gap-x-3 py-4 text-left lg:py-5"
              >
                <span className={`type-label pt-1.5 transition-colors duration-300 ${on ? "text-paper-100" : "text-graphite-300"}`}>
                  {it.number}
                </span>
                <span>
                  <span
                    className={`type-heading-s flex items-center gap-3 transition-colors duration-300 ${
                      on ? "text-paper-100" : "text-graphite-300 group-hover:text-paper-100"
                    }`}
                  >
                    {it.title}
                    <span
                      aria-hidden
                      className={`hidden size-1.5 shrink-0 bg-paper-100 transition-opacity duration-300 lg:inline-block ${on ? "opacity-100" : "opacity-0"}`}
                    />
                  </span>
                  <span className="ctx-body type-body-s mt-1.5 block max-w-[44ch] text-graphite-300">{it.body}</span>
                </span>
                {/* Time left before the next context */}
                <span aria-hidden className="absolute inset-x-0 -bottom-px hidden h-px overflow-hidden lg:block">
                  {on && auto && (
                    <span
                      key={active}
                      className={`progress-run block h-full bg-paper-100 ${running ? "" : "is-paused"}`}
                      style={{ ["--run" as string]: `${RUN}ms` }}
                      onAnimationEnd={() => setActive((a) => (a + 1) % items.length)}
                    />
                  )}
                </span>
              </button>

              {/* Small screens: the drawing sits under its context. */}
              <div className="pb-8 lg:hidden">{it.visual}</div>
            </li>
          );
        })}
      </ol>

      <div id="context-stage" className="hidden lg:col-span-6 lg:col-start-7 lg:grid">
        {items.map((it, i) => (
          <div
            key={it.key}
            className="ctx-panel [grid-area:1/1]"
            data-active={i === active ? "true" : "false"}
            aria-hidden={i !== active}
          >
            {it.visual}
            <p className="type-status mt-6 flex justify-between text-graphite-300">
              <span>
                {it.number} / {String(items.length).padStart(2, "0")}
              </span>
              <span>Illustrative</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
