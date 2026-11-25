import { Reveal } from "@/components/motion/Reveal";
import { SplitWords } from "@/components/motion/SplitWords";
import { CaseDossier } from "@/components/sections/CaseDossier";
import { SectionRule } from "@/components/ui/SectionRule";
import { field } from "@/content/site";

export function Field() {
  return (
    <section id="field" data-surface="paper" aria-labelledby="field-title" className="section-screen bg-paper-100 text-ink-950">
      <div className="shell w-full">
        <SectionRule label={field.label} tone="light" />

        <Reveal as="h2" kind="words" id="field-title" className="type-display-s mt-10 lg:mt-12">
          <SplitWords text={field.headline} />
        </Reveal>

        <div className="mt-10 grid gap-x-12 gap-y-14 lg:mt-14 lg:grid-cols-2 xl:gap-x-16">
          {field.studies.map((study) => (
            <CaseDossier key={study.slug} study={study} cta={field.cta} />
          ))}
        </div>
      </div>
    </section>
  );
}
