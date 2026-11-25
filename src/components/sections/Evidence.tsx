import { EvidenceTrail } from "@/components/diagrams/EvidenceTrail";
import { Reveal } from "@/components/motion/Reveal";
import { SplitWords } from "@/components/motion/SplitWords";
import { SectionRule } from "@/components/ui/SectionRule";
import { evidence } from "@/content/site";

export function Evidence() {
  return (
    <section id="evidence" aria-labelledby="evidence-title" className="section-screen bg-ink-950">
      <div className="shell w-full">
        <SectionRule label={evidence.label} />

        <div className="mt-8 grid items-end gap-x-6 gap-y-6 lg:mt-9 lg:grid-cols-12">
          <Reveal as="h2" kind="words" id="evidence-title" className="type-display-m text-paper-100 lg:col-span-6">
            <SplitWords text={evidence.headline} />
          </Reveal>
          <Reveal as="p" className="type-body-m text-graphite-300 lg:col-span-5 lg:col-start-8" delay={160}>
            {evidence.body}
          </Reveal>
        </div>

        <Reveal as="p" className="type-body-m mt-8 text-paper-100 lg:mt-9" delay={200}>
          {evidence.intro}
        </Reveal>

        {/* The five points, as a list, where the trail stacks on smaller screens. */}
        <ol className="mt-6 grid gap-3 lg:hidden">
          {evidence.points.map((p, i) => (
            <li key={p.key} className="type-body-m flex gap-4 text-graphite-300">
              <span className="type-label pt-1 text-graphite-300">{String(i + 1).padStart(2, "0")}</span>
              <span className="text-paper-100">{p.text}</span>
            </li>
          ))}
        </ol>

        <div className="mt-5 lg:mt-4">
          <EvidenceTrail />
        </div>
      </div>
    </section>
  );
}
