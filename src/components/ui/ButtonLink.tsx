import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";

type Variant = "solid-light" | "solid-dark" | "signal" | "text-light" | "text-dark";

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  /** solid-light: Paper fill on dark grounds. solid-dark: Ink fill on Paper. signal: the one decisive action. */
  variant?: Variant;
  size?: "md" | "sm";
  className?: string;
  arrow?: boolean;
};

const base =
  "group relative inline-flex items-center gap-2.5 font-sans font-medium whitespace-nowrap transition-[background-color,color,box-shadow] duration-300 ease-[var(--ease-out)] active:translate-y-px";

const variants: Record<Variant, string> = {
  "solid-light": "rounded-xs bg-paper-100 text-ink-950 hover:bg-white",
  "solid-dark": "rounded-xs bg-ink-950 text-paper-100 hover:bg-navy-800",
  signal: "rounded-xs bg-signal-400 text-ink-950 hover:bg-paper-100",
  "text-light": "link-grow text-paper-100 [--line:var(--color-graphite-700)] [--line-hover:var(--color-paper-100)]",
  "text-dark": "link-grow text-ink-950 [--line:var(--color-paper-300)] [--line-hover:var(--color-ink-950)]",
};

const sizes = {
  md: "h-12 px-5 text-[0.9375rem]",
  sm: "h-10 px-4 text-[0.875rem]",
};

/** Arrow that slides out and is replaced from the left on hover. */
function SwapArrow() {
  return (
    <span aria-hidden className="relative inline-flex size-4 shrink-0 overflow-hidden">
      <ArrowRight
        strokeWidth={1.75}
        className="absolute inset-0 size-4 transition-transform duration-300 ease-[var(--ease-out)] group-hover:translate-x-full"
      />
      <ArrowRight
        strokeWidth={1.75}
        className="absolute inset-0 size-4 -translate-x-full transition-transform duration-300 ease-[var(--ease-out)] group-hover:translate-x-0"
      />
    </span>
  );
}

/** Internal routes and "/#section" anchors use next/link; mail and external links use <a>. */
export function ButtonLink({
  href,
  children,
  variant = "solid-light",
  size = "md",
  className = "",
  arrow = false,
}: ButtonLinkProps) {
  const isText = variant.startsWith("text");
  const classes = `${base} ${variants[variant]} ${isText ? "h-12 text-[0.9375rem]" : sizes[size]} ${className}`;
  const content = (
    <>
      <span>{children}</span>
      {arrow && <SwapArrow />}
    </>
  );

  if (href.startsWith("mailto:") || href.startsWith("tel:") || href.startsWith("http")) {
    return (
      <a href={href} className={classes}>
        {content}
      </a>
    );
  }
  return (
    <Link href={href} className={classes}>
      {content}
    </Link>
  );
}
