import { IntelligenceFlow } from "@/components/diagrams/IntelligenceFlow";
import { SplitWords } from "@/components/motion/SplitWords";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { hero, site } from "@/content/site";

const delay = (ms: number) => ({ ["--delay" as string]: `${ms}ms` });

/** Index of each line's first word, so the word stagger runs across all three lines. */
const lineStarts = hero.headline.map((_, i) =>
  hero.headline.slice(0, i).reduce((n, line) => n + line.split(" ").length, 0),
);

export function Hero() {
  return (
    <section
      id="top"
      aria-labelledby="hero-title"
      className="hero-fit relative overflow-hidden bg-ink-950 pt-[calc(var(--header-h)+2.5rem)] pb-12 lg:flex lg:min-h-svh lg:flex-col lg:justify-center lg:pt-[var(--header-h)] lg:pb-6"
    >
      <div className="shell grid items-center gap-x-6 gap-y-14 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <h1 id="hero-title" className="type-hero load-words text-paper-100">
            {hero.headline.map((line, i) => (
              <span key={line} className="lg:block lg:whitespace-nowrap">
                <SplitWords text={line} start={lineStarts[i]} keepLast={false} />
                {i < hero.headline.length - 1 ? " " : null}
              </span>
            ))}
          </h1>

          <p className="hero-copy type-body-l load-rise mt-8 max-w-[40ch] text-graphite-300 md:mt-10" style={delay(520)}>
            {hero.description}
          </p>

          <div className="hero-ctas load-rise mt-9 flex flex-wrap items-center gap-x-8 gap-y-3" style={delay(640)}>
            <ButtonLink href={site.contactHref} variant="solid-light" arrow>
              {hero.primaryCta}
            </ButtonLink>
            <ButtonLink href={hero.secondaryCta.href} variant="text-light">
              {hero.secondaryCta.label}
            </ButtonLink>
          </div>

          <p
            className="hero-tag type-body-s load-fade mt-14 flex max-w-[34ch] items-start gap-3 text-graphite-300 lg:mt-16"
            style={delay(900)}
          >
            <span aria-hidden className="mt-[0.55em] h-px w-8 shrink-0 bg-graphite-500" />
            {hero.supportingLine}
          </p>
        </div>

        {/* The hero sentence, animated. Sized by the screen's height so the hero is always one screen. */}
        <div className="load-fade lg:col-span-5" style={delay(200)}>
          <div className="mx-auto w-full max-w-[34rem] lg:mr-0 lg:ml-auto lg:max-w-[min(100%,calc((100svh-var(--header-h)-4rem)*1.077))]">
            <IntelligenceFlow />
          </div>
        </div>
      </div>
    </section>
  );
}
