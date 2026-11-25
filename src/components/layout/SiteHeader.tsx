"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Logo } from "@/components/brand/Logo";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { ctaLabel, nav, site } from "@/content/site";

const SECTION_IDS = ["top", "what-we-see", "question", "visible", "where-it-matters", "evidence", "about", "field", "contact"];

/**
 * Header: solid once the page moves, hidden while reading down, back the
 * moment you scroll up or tab into it. A hairline under it shows progress.
 */
export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const progressRef = useRef<HTMLSpanElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let frame = 0;
    let lastY = window.scrollY;

    const spy = () => {
      frame = 0;
      const line = window.innerHeight * 0.4;
      let current: string | null = null;
      for (const id of SECTION_IDS) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= line) current = id;
      }
      const item = current ? nav.find((n) => n.sections.includes(current)) : undefined;
      setActive(item?.id ?? null);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (progressRef.current) progressRef.current.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`;
    };

    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 8);
      if (y < 120) setHidden(false);
      else if (y > lastY + 4) setHidden(true);
      else if (y < lastY - 4) setHidden(false);
      lastY = y;
      if (!frame) frame = requestAnimationFrame(spy);
    };

    frame = requestAnimationFrame(() => {
      setScrolled(window.scrollY > 8);
      spy();
    });
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [pathname]);

  // Mobile menu: lock scroll, close on Escape, move focus in and back out.
  useEffect(() => {
    if (!open) return;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    panelRef.current?.querySelector<HTMLElement>("a")?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const onResize = () => {
      if (window.innerWidth >= 1024) setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    const toggle = toggleRef.current;
    return () => {
      document.body.style.overflow = overflow;
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
      toggle?.focus();
    };
  }, [open]);

  const solid = scrolled || open;
  const tucked = hidden && !open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-[transform,background-color,border-color] duration-500 ease-[var(--ease-out)] focus-within:translate-y-0 ${
        solid ? "border-graphite-700 bg-ink-950" : "border-transparent bg-ink-950/0"
      } ${tucked ? "-translate-y-full" : "translate-y-0"}`}
    >
      <div className="shell flex h-[var(--header-h)] items-center justify-between gap-6 lg:grid lg:grid-cols-12">
        <Link href="/#top" className="group flex items-center lg:col-span-3" aria-label="EQIP, back to top">
          <Logo priority className="h-auto w-[120px] transition-opacity duration-300 group-hover:opacity-85" />
        </Link>

        <nav aria-label="Primary" className="hidden lg:col-span-6 lg:col-start-4 lg:block xl:col-span-5 xl:col-start-5">
          <ul className="flex items-center gap-7 xl:gap-9">
            {nav.map((item) => {
              const isActive = active === item.id;
              return (
                <li key={item.id}>
                  <Link
                    href={item.href}
                    aria-current={isActive ? "location" : undefined}
                    className={`group relative inline-flex py-2 text-[0.9375rem] whitespace-nowrap transition-colors duration-200 ${
                      isActive ? "text-paper-100" : "text-graphite-300 hover:text-paper-100"
                    }`}
                  >
                    {item.label}
                    <span
                      aria-hidden
                      className={`absolute inset-x-0 -bottom-px h-px origin-left bg-paper-100 transition-transform duration-500 ease-[var(--ease-out)] ${
                        isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100 group-hover:bg-graphite-300"
                      }`}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="hidden lg:col-span-3 lg:col-start-10 lg:flex lg:justify-end">
          <ButtonLink href={site.contactHref} size="sm" variant="solid-light" arrow>
            {ctaLabel}
          </ButtonLink>
        </div>

        <button
          ref={toggleRef}
          type="button"
          className="-mr-2 inline-flex size-11 items-center justify-center text-paper-100 lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X strokeWidth={1.5} className="size-6" /> : <Menu strokeWidth={1.5} className="size-6" />}
        </button>
      </div>

      {/* Reading progress */}
      <span aria-hidden className="absolute inset-x-0 -bottom-px h-px overflow-hidden">
        <span
          ref={progressRef}
          className={`block h-full origin-left bg-paper-100/70 transition-opacity duration-300 ${solid ? "opacity-100" : "opacity-0"}`}
          style={{ transform: "scaleX(0)" }}
        />
      </span>

      <div
        id="mobile-menu"
        ref={panelRef}
        hidden={!open}
        className="fixed inset-x-0 top-[var(--header-h)] bottom-0 overflow-y-auto bg-ink-950 lg:hidden"
      >
        <nav aria-label="Mobile" className="shell flex min-h-full flex-col pt-6 pb-10">
          <ul className="border-t border-graphite-700">
            {nav.map((item, i) => (
              <li key={item.id} className="menu-item border-b border-graphite-700" style={{ ["--i" as string]: i }}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="type-heading-m flex items-center justify-between py-5 text-paper-100"
                >
                  {item.label}
                  <span aria-hidden className="type-label text-graphite-300">
                    {active === item.id ? "Here" : String(i + 1).padStart(2, "0")}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <div className="menu-item mt-auto pt-12" style={{ ["--i" as string]: nav.length }}>
            <ButtonLink href={site.contactHref} variant="solid-light" arrow className="w-full justify-between">
              {ctaLabel}
            </ButtonLink>
          </div>
        </nav>
      </div>
    </header>
  );
}
