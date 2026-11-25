import Link from "next/link";
import type { Metadata } from "next";
import { CaseDossier } from "@/components/sections/CaseDossier";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { ctaLabel, field, site, type CaseStudy } from "@/content/site";

export function caseStudyMetadata(study: CaseStudy): Metadata {
  return {
    title: study.title,
    description: study.challenge,
    alternates: { canonical: `/case-studies/${study.slug}` },
    // Kept out of search until the full write-up is approved.
    robots: { index: false, follow: true },
  };
}

/** Case study template. Uses only approved copy; the long form is a placeholder. */
export function CaseStudyPage({ study }: { study: CaseStudy }) {
  const others = field.studies.filter((s) => s.slug !== study.slug);
  return (
    <>
      <section className="bg-ink-950 pt-[calc(4.5rem+clamp(3rem,7vw,6rem))] pb-[clamp(4rem,8vw,7rem)]">
        <div className="shell">
          <Link href="/#field" className="type-label text-graphite-300 transition-colors duration-200 hover:text-paper-100">
            ← {field.label}
          </Link>
          <h1 className="type-display-l load-rise mt-10 max-w-[14ch] text-paper-100">{study.title}</h1>
          <p className="type-body-l load-rise mt-8 max-w-[44ch] text-graphite-300" style={{ ["--delay" as string]: "120ms" }}>
            {study.challenge}
          </p>
        </div>
      </section>

      <section data-surface="paper" className="bg-paper-100 py-[clamp(4.5rem,9vw,8rem)] text-ink-950">
        <div className="shell">
          <CaseDossier study={study} headingLevel="h2" wide showTitle={false} />

          <div className="mt-20 grid gap-x-6 lg:grid-cols-12">
            <div className="border border-dashed border-graphite-500 p-6 md:p-8 lg:col-span-8 lg:col-start-5">
              <p className="type-status text-graphite-700">Full case study · awaiting approval</p>
              <p className="type-heading-s mt-4 text-graphite-700">
                [Insert the approved long-form case study here: context, approach, evidence produced, and outcome, using only verified and client-approved information.]
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-ink-950 py-[clamp(4.5rem,9vw,8rem)]">
        <div className="shell grid gap-x-6 gap-y-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="type-label text-graphite-300">Next</p>
            {others.map((s) => (
              <Link key={s.slug} href={`/case-studies/${s.slug}`} className="group mt-6 block">
                <span className="type-label text-graphite-300">Case study {s.number}</span>
                <span className="type-heading-l mt-3 block text-paper-100 underline decoration-graphite-700 decoration-1 underline-offset-8 transition-colors duration-200 group-hover:decoration-paper-100">
                  {s.title}
                </span>
              </Link>
            ))}
          </div>
          <div className="flex items-end lg:col-span-4 lg:col-start-9 lg:justify-end">
            <ButtonLink href={site.contactHref} variant="solid-light" arrow>
              {ctaLabel}
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
