import { Reveal } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/ButtonLink";
import type { CaseStudy } from "@/content/site";

const STEPS = [
  { key: "challenge", label: "The challenge" },
  { key: "clarity", label: "What became clear" },
  { key: "change", label: "What changed" },
] as const;

/**
 * A case study set as an editorial dossier: identity on top, then the
 * challenge-to-change story as one left-to-right trace. Hovering the dossier
 * lights the trace.
 */
export function CaseDossier({
  study,
  cta,
  headingLevel = "h3",
  wide = false,
  showTitle = true,
}: {
  study: CaseStudy;
  cta?: string;
  headingLevel?: "h2" | "h3";
  /** wide: identity beside the story (case study page). Default: stacked. */
  wide?: boolean;
  showTitle?: boolean;
}) {
  const Heading = headingLevel;
  return (
    <article
      aria-labelledby={`case-${study.slug}`}
      className={`group/dossier grid gap-x-6 gap-y-8 border-t border-ink-950 pt-5 ${wide ? "lg:grid-cols-12" : ""}`}
    >
      <div className={wide ? "lg:col-span-4" : ""}>
        <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
          <p className="type-label whitespace-nowrap text-graphite-700">Case study {study.number}</p>
          <p className="type-body-s text-graphite-700">{study.client}</p>
        </div>
        {showTitle ? (
          <Reveal as={Heading} id={`case-${study.slug}`} className="type-heading-m mt-5 max-w-[20ch]">
            {study.title}
          </Reveal>
        ) : (
          <span id={`case-${study.slug}`} className="sr-only">{study.title}</span>
        )}
      </div>

      <ol className={`relative grid gap-y-8 sm:grid-cols-3 sm:gap-x-5 ${wide ? "lg:col-span-8" : ""}`}>
        <span
          aria-hidden
          className="absolute top-0 right-0 left-0 hidden h-px origin-left bg-paper-300 transition-colors duration-500 group-hover/dossier:bg-ink-950 sm:block"
        />
        {/* A pulse runs the story from challenge to change while you read it */}
        <span aria-hidden className="dossier-runner absolute -top-[3px] hidden size-[7px] -translate-x-1/2 bg-ink-950 sm:block" />
        {STEPS.map((step, i) => (
          <Reveal as="li" key={step.key} className="relative border-t border-paper-300 pt-5 sm:border-t-0" delay={i * 110}>
            <span
              aria-hidden
              className={`absolute -top-[4.5px] left-0 size-2 border border-ink-950 transition-colors duration-500 ${
                i === 1 ? "bg-ink-950" : "bg-paper-100 group-hover/dossier:bg-ink-950"
              }`}
            />
            <p className="type-label text-graphite-700">{step.label}</p>
            <p className="type-body-s mt-3 text-ink-950">{study[step.key]}</p>
          </Reveal>
        ))}
      </ol>

      {cta && (
        <div className={wide ? "lg:col-span-8 lg:col-start-5" : ""}>
          <ButtonLink href={`/case-studies/${study.slug}`} variant="text-dark" arrow>
            {cta}
          </ButtonLink>
        </div>
      )}
    </article>
  );
}
