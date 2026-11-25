import Link from "next/link";
import { ArrowUp } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { ctaLabel, footer, nav, site } from "@/content/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-graphite-700 bg-ink-950">
      <div className="shell pt-20 pb-10 md:pt-28">
        <div className="grid gap-x-6 gap-y-16 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Logo width={168} className="h-auto w-[168px]" />
            <p className="type-heading-m mt-10 max-w-[28ch] text-paper-100">{footer.statement}</p>
          </div>

          <nav aria-label="Footer" className="lg:col-span-2 lg:col-start-9">
            <p className="type-label text-graphite-300">Sections</p>
            <ul className="mt-6 space-y-3">
              {nav.map((item) => (
                <li key={item.id}>
                  <Link
                    href={item.href}
                    className="text-[0.9375rem] text-graphite-300 transition-colors duration-200 hover:text-paper-100"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-2">
            <p className="type-label text-graphite-300">Next step</p>
            <ul className="mt-6 space-y-3">
              <li>
                <Link
                  href={site.contactHref}
                  className="text-[0.9375rem] text-paper-100 underline decoration-graphite-700 underline-offset-[6px] transition-colors duration-200 hover:decoration-paper-100"
                >
                  {ctaLabel}
                </Link>
              </li>
              <li>
                <Link
                  href="/#top"
                  className="group inline-flex items-center gap-2 text-[0.9375rem] text-graphite-300 transition-colors duration-200 hover:text-paper-100"
                >
                  Back to top
                  <ArrowUp
                    aria-hidden
                    strokeWidth={1.75}
                    className="size-4 transition-transform duration-200 group-hover:-translate-y-0.5"
                  />
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="type-label mt-24 flex flex-col gap-3 border-t border-graphite-700 pt-6 text-graphite-300 sm:flex-row sm:justify-between">
          <p>© 2026 EQIP</p>
          <p>Business intelligence</p>
        </div>
      </div>
    </footer>
  );
}
