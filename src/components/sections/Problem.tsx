import { Fragment } from "react";
import { DocumentationGap } from "@/components/diagrams/DocumentationGap";
import { ImpactRipple } from "@/components/diagrams/ImpactRipple";
import { Reveal } from "@/components/motion/Reveal";
import { SplitWords } from "@/components/motion/SplitWords";
import { SectionRule } from "@/components/ui/SectionRule";
import { problem } from "@/content/site";

/** Phrases in the opening paragraph that the diagram annotates, in order. */
const ANNOTATED = [
  "outlived their original teams",
  "connected in ways no diagram captures",
  "buried in code",
  "people’s memory",
];
const NOTES = [
  "Outlived its original team",
  "Connected in ways no diagram captures",
  "Business rule buried in code",
  "Held in people’s memory",
];

/** Splits the verbatim paragraph and places a note marker after each phrase. */
function annotate(text: string) {
  const parts: (string | number)[] = [];
  let rest = text;
  ANNOTATED.forEach((phrase, i) => {
    const at = rest.indexOf(phrase);
    if (at === -1) return;
    parts.push(rest.slice(0, at + phrase.length), i + 1);
    rest = rest.slice(at + phrase.length);
  });
  parts.push(rest);
  return parts;
}

export function Problem() {
  return (
    <>
      {/* Screen 1: what the documentation does not show */}
      <section
        id="what-we-see"
        data-surface="paper"
        data-notes
        aria-labelledby="problem-title"
        className="section-screen bg-paper-100 text-ink-950"
      >
        <div className="shell w-full">
          <SectionRule label={problem.label} tone="light" />

          <div className="mt-10 grid items-start gap-x-6 gap-y-12 lg:mt-12 lg:grid-cols-12">
            <div className="lg:col-span-6 lg:pr-8">
              <Reveal as="h2" kind="words" id="problem-title" className="type-display-s">
                <SplitWords text={problem.headline} />
              </Reveal>
              <Reveal as="p" className="type-body-l mt-8 max-w-[36ch] text-graphite-700" delay={120}>
                {annotate(problem.body[0]).map((part, i) =>
                  typeof part === "number" ? (
                    <sup
                      key={i}
                      aria-hidden
                      data-note={part}
                      className="type-status relative -top-[0.1em] ml-1 inline-flex size-[18px] cursor-default items-center justify-center bg-ink-950 align-super text-paper-100 transition-colors duration-200 hover:bg-signal-600"
                    >
                      {part}
                    </sup>
                  ) : (
                    <Fragment key={i}>{part}</Fragment>
                  ),
                )}
              </Reveal>
            </div>
            <div className="lg:col-span-6 lg:col-start-7">
              <DocumentationGap notes={NOTES} />
            </div>
          </div>
        </div>
      </section>

      {/* Screen 2: the question every change eventually asks */}
      <section
        id="question"
        data-surface="paper"
        aria-labelledby="question-title"
        className="section-screen border-t border-paper-200 bg-paper-100 text-ink-950"
      >
        <div className="shell relative w-full">
          <ImpactRipple className="pointer-events-none absolute top-1/2 right-[clamp(1.25rem,5vw,6rem)] hidden w-[min(26vw,22rem)] -translate-y-1/2 lg:block" />
          <Reveal as="p" className="type-body-l max-w-[34ch] text-graphite-700">
            {problem.body[1]}
          </Reveal>
          <Reveal as="p" kind="words" id="question-title" className="type-display-xl mt-8 max-w-[12ch] md:mt-10" delay={120}>
            <SplitWords text={problem.question} />
          </Reveal>
          <div className="mt-10 grid gap-x-6 md:mt-14 lg:grid-cols-12">
            <Reveal as="p" className="type-heading-m lg:col-span-6 lg:col-start-7" delay={500}>
              <span className="text-graphite-700">{problem.answerLead}</span>{" "}
              <span className="answer-mark text-ink-950">{problem.answer}</span>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
