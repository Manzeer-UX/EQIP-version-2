import { CapabilityLoop } from "@/components/diagrams/CapabilityLoop";
import { capabilityGlyphs } from "@/components/diagrams/CapabilityGlyphs";
import { Reveal } from "@/components/motion/Reveal";
import { SplitWords } from "@/components/motion/SplitWords";
import { SectionRule } from "@/components/ui/SectionRule";
import { visible } from "@/content/site";

export function Capabilities() {
  const items = visible.capabilities.map((c) => {
    const Glyph = capabilityGlyphs[c.key];
    return { key: c.key, number: c.number, title: c.title, body: c.body, glyph: <Glyph /> };
  });

  return (
    <section id="visible" aria-labelledby="visible-title" className="section-screen bg-ink-950">
      <div className="shell w-full">
        <SectionRule label={visible.label} />

        <div className="mt-10 grid items-end gap-x-6 gap-y-8 lg:mt-12 lg:grid-cols-12">
          <Reveal as="h2" kind="words" id="visible-title" className="type-display-m text-paper-100 lg:col-span-7">
            <span className="block">
              <SplitWords text={visible.headline[0]} />{" "}
            </span>
            <span className="block text-graphite-300">
              <SplitWords text={visible.headline[1]} start={3} />
            </span>
          </Reveal>
          <Reveal className="lg:col-span-5" delay={200}>
            <p className="type-body-m text-paper-100">{visible.body[0]}</p>
            <p className="type-body-s mt-3 text-graphite-300">{visible.body[1]}</p>
          </Reveal>
        </div>

        <CapabilityLoop items={items} />
      </div>
    </section>
  );
}
