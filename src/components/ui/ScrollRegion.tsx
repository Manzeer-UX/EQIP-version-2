"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Keeps a diagram at a readable minimum width on small screens by letting it
 * scroll sideways, bleeding to the screen edges. Only when it actually
 * overflows does it become a focusable, labelled region for keyboard users.
 */
export function ScrollRegion({
  label,
  minWidth,
  children,
}: {
  label: string;
  /** Minimum rendered width below the md breakpoint, e.g. "32rem". */
  minWidth: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => {
      if (el.scrollWidth > el.clientWidth + 1) {
        el.tabIndex = 0;
        el.setAttribute("role", "region");
        el.setAttribute("aria-label", label);
      } else {
        el.removeAttribute("tabindex");
        el.removeAttribute("role");
        el.removeAttribute("aria-label");
      }
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [label]);

  return (
    <div
      ref={ref}
      // contain: inline-size stops the diagram's minimum width from widening parent grids.
      className="-mx-[clamp(1.25rem,5vw,6rem)] overflow-x-auto overscroll-x-contain px-[clamp(1.25rem,5vw,6rem)] pb-2 [contain:inline-size] [scrollbar-width:thin] md:mx-0 md:overflow-visible md:px-0 md:pb-0"
    >
      <div className="min-w-[var(--min-w)] md:min-w-0" style={{ ["--min-w" as string]: minWidth }}>
        {children}
      </div>
    </div>
  );
}
