import { Reveal } from "@/components/motion/Reveal";
import { SplitWords } from "@/components/motion/SplitWords";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { closing, site } from "@/content/site";

const d = (ms: number) => ({ ["--d" as string]: `${ms}ms` });

/** Traces arrive from the left edge and leave at the right: the logo's idea, at page scale. */
function Traces() {
  return (
    <Reveal as="div" kind="draw" aria-hidden="true" className="pointer-events-none absolute inset-0 hidden md:block">
      <svg viewBox="0 0 360 140" data-ambient className="absolute top-[4%] left-0 w-[min(24vw,21rem)] overflow-visible">
        <g fill="none" stroke="#3A404B" strokeWidth={1}>
          <path d="M0 30H190L222 62H330" pathLength={1} className="trace-draw" style={d(0)} />
          <path d="M0 52H176L208 84H300" pathLength={1} className="trace-draw" style={d(140)} />
          <path d="M0 74H162L194 106H268" pathLength={1} className="trace-draw" style={d(280)} />
        </g>
        <g fill="#070A12" stroke="#9AA8BD" strokeWidth={1}>
          <rect x={326} y={58} width={8} height={8} className="fade-on-draw" style={d(900)} />
          <rect x={296} y={80} width={8} height={8} className="fade-on-draw" style={d(1000)} />
          <rect x={264} y={102} width={8} height={8} className="fade-on-draw" style={d(1100)} />
        </g>
        <g className="motion-only" fill="#9AA8BD">
          <rect width={5} height={5} x={-2.5} y={-2.5}>
            <animateMotion path="M0 30H190L222 62H330" dur="3.6s" begin="0.0s" repeatCount="indefinite" />
          </rect>
          <rect width={5} height={5} x={-2.5} y={-2.5}>
            <animateMotion path="M0 52H176L208 84H300" dur="4s" begin="0.6s" repeatCount="indefinite" />
          </rect>
          <rect width={5} height={5} x={-2.5} y={-2.5}>
            <animateMotion path="M0 74H162L194 106H268" dur="4.4s" begin="1.2s" repeatCount="indefinite" />
          </rect>
        </g>
      </svg>
      <svg viewBox="0 0 360 140" data-ambient className="absolute top-[22%] right-0 w-[min(24vw,21rem)] overflow-visible">
        <g fill="none" stroke="#3A404B" strokeWidth={1}>
          <path d="M30 34H138L170 66H360" pathLength={1} className="trace-draw" style={d(600)} />
          <path d="M60 56H152L184 88H360" pathLength={1} className="trace-draw" style={d(740)} />
        </g>
        <g fill="#070A12" stroke="#9AA8BD" strokeWidth={1}>
          <rect x={26} y={30} width={8} height={8} className="fade-on-draw" style={d(560)} />
          <rect x={56} y={52} width={8} height={8} className="fade-on-draw" style={d(700)} />
        </g>
        <g className="motion-only" fill="#9AA8BD">
          <rect width={5} height={5} x={-2.5} y={-2.5}>
            <animateMotion path="M30 34H138L170 66H360" dur="3.2s" begin="0.0s" repeatCount="indefinite" />
          </rect>
          <rect width={5} height={5} x={-2.5} y={-2.5}>
            <animateMotion path="M60 56H152L184 88H360" dur="3.6s" begin="0.6s" repeatCount="indefinite" />
          </rect>
        </g>
      </svg>
    </Reveal>
  );
}

export function Closing() {
  return (
    <section id="contact" aria-labelledby="closing-title" className="section-screen relative overflow-hidden bg-ink-950">
      <Traces />
      <div className="shell relative w-full">
        <div className="grid gap-x-6 lg:grid-cols-12">
          <Reveal as="h2" kind="words" id="closing-title" className="type-display-l text-paper-100 lg:col-span-10 lg:col-start-2">
            <SplitWords text={closing.headline} />
          </Reveal>
        </div>
        <div className="mt-10 grid gap-x-6 md:mt-14 lg:grid-cols-12">
          <div className="lg:col-span-5 lg:col-start-7">
            <Reveal as="p" className="type-body-l text-graphite-300" delay={300}>
              {closing.body}
            </Reveal>
            <Reveal className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-3" delay={420}>
              <ButtonLink href={site.contactHref} variant="signal" arrow>
                {closing.primaryCta}
              </ButtonLink>
              <ButtonLink href={closing.secondaryCta.href} variant="text-light">
                {closing.secondaryCta.label}
              </ButtonLink>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
