"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Pauses the SMIL animations of any <svg data-ambient> while it is off
 * screen, and resumes them when it scrolls back into view. Keeps the page's
 * ambient motion free when nobody is looking at it.
 */
export function AmbientController() {
  const pathname = usePathname();

  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          const svg = e.target as SVGSVGElement;
          if (typeof svg.pauseAnimations !== "function") continue;
          if (e.isIntersecting) svg.unpauseAnimations();
          else svg.pauseAnimations();
        }
      },
      { rootMargin: "120px 0px" },
    );
    const observe = () => document.querySelectorAll<SVGSVGElement>("svg[data-ambient]").forEach((svg) => io.observe(svg));
    observe();
    // Client components (like the hero) may add ambient SVGs after mount.
    const t = window.setTimeout(observe, 1500);
    return () => {
      window.clearTimeout(t);
      io.disconnect();
    };
  }, [pathname]);

  return null;
}
