import { Strata } from "@/components/diagrams/Strata";
import { Reveal } from "@/components/motion/Reveal";
import { SplitWords } from "@/components/motion/SplitWords";
import { SectionRule } from "@/components/ui/SectionRule";
import { about } from "@/content/site";

export function About() {
  return (
    <section id="about" data-surface="paper" aria-labelledby="about-title" className="section-screen bg-paper-100 text-ink-950">
      <div className="shell w-full">
        <SectionRule label={about.label} tone="light" />

        <div className="mt-10 grid items-center gap-x-6 gap-y-12 lg:mt-12 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <Reveal as="h2" kind="words" id="about-title" className="type-display-s max-w-[16ch]">
              <SplitWords text={about.headline} />
            </Reveal>
            <Reveal as="p" className="type-body-l mt-8 max-w-[40ch] text-ink-950" delay={120}>
              {about.body[0]}
            </Reveal>
            <Reveal as="p" className="type-body-m mt-5 max-w-[46ch] text-graphite-700" delay={200}>
              {about.body[1]}
            </Reveal>

            {/* Proof statement: stays visibly a placeholder until approved. */}
            <Reveal
              delay={280}
              className={`mt-8 max-w-[40rem] p-5 md:p-6 ${
                about.proof.approved ? "border-t border-ink-950 px-0 md:px-0" : "border border-dashed border-graphite-500"
              }`}
            >
              {!about.proof.approved && <p className="type-status text-graphite-700">Proof statement · awaiting approval</p>}
              <p className={`type-body-l ${about.proof.approved ? "text-ink-950" : "mt-3 text-graphite-700"}`}>{about.proof.text}</p>
            </Reveal>
          </div>

          <div className="lg:col-span-5 lg:col-start-8 lg:[&_svg]:max-h-[calc(100svh-var(--header-h)-9rem)]">
            <Strata layers={about.strata} />
          </div>
        </div>
      </div>
    </section>
  );
}
