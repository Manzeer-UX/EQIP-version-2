import { ContextIndex } from "@/components/diagrams/ContextIndex";
import { contextVisuals } from "@/components/diagrams/ContextVisuals";
import { Reveal } from "@/components/motion/Reveal";
import { SplitWords } from "@/components/motion/SplitWords";
import { ScrollRegion } from "@/components/ui/ScrollRegion";
import { SectionRule } from "@/components/ui/SectionRule";
import { contexts } from "@/content/site";

export function Contexts() {
  const items = contexts.items.map((item) => {
    const Visual = contextVisuals[item.key];
    return {
      ...item,
      visual: (
        <ScrollRegion label={`${item.title} diagram`} minWidth="28rem">
          <Visual />
        </ScrollRegion>
      ),
    };
  });

  return (
    <section id="where-it-matters" aria-labelledby="contexts-title" className="section-screen bg-navy-900">
      <div className="shell w-full">
        <SectionRule label={contexts.label} />

        <Reveal as="h2" kind="words" id="contexts-title" className="type-display-m mt-10 max-w-[18ch] text-paper-100 lg:mt-12">
          <SplitWords text={contexts.headline} />
        </Reveal>

        <div className="mt-10 lg:mt-12">
          <ContextIndex items={items} />
        </div>
      </div>
    </section>
  );
}
