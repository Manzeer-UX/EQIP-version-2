import { evidence } from "@/content/site";
import { Reveal } from "@/components/motion/Reveal";

/**
 * A conceptual evidence trail for one change. Each column answers one of the
 * five questions in the copy, read left to right. Illustrative only: the
 * journeys, IDs and states are fictional and not product output.
 */

type Status = "passed" | "running" | "queued";

type TrailRow = {
  journey: string;
  understood: "Understood" | "Partly understood";
  systems: string[];
  check: { status: Status; id: string; note: string };
  risk: { remains: boolean; text: string };
  learning: string;
};

const rows: TrailRow[] = [
  {
    journey: "Place an order",
    understood: "Understood",
    systems: ["Order management", "Pricing engine"],
    check: { status: "passed", id: "TC-0421", note: "Discount and credit paths" },
    risk: { remains: false, text: "None identified" },
    learning: "Pricing path confirmed outside this change",
  },
  {
    journey: "Amend an order",
    understood: "Understood",
    systems: ["Order management", "Billing"],
    check: { status: "passed", id: "TC-0517", note: "Amendment and re-billing" },
    risk: { remains: false, text: "None identified" },
    learning: "Credit hold behaviour written down",
  },
  {
    journey: "Collect payment",
    understood: "Understood",
    systems: ["Billing", "Legacy batch", "ERP finance"],
    check: { status: "running", id: "TC-0603", note: "Tax applied in both copies" },
    risk: { remains: true, text: "RULE-0219 also runs in Legacy batch" },
    learning: "Rationale for RULE-0219 recorded as DEC-0031",
  },
];

const statusStyle: Record<Status, string> = {
  passed: "border-pass/50 text-pass",
  running: "border-signal-400/60 text-signal-400",
  queued: "border-graphite-700 text-graphite-300",
};
const statusSwatch: Record<Status, string> = {
  passed: "bg-pass",
  running: "bg-signal-400",
  queued: "bg-graphite-500",
};

function StatusChip({ status }: { status: Status }) {
  return (
    <span className={`type-status inline-flex items-center gap-1.5 rounded-xs border px-1.5 py-[3px] ${statusStyle[status]}`}>
      <span aria-hidden className={`size-1.5 ${statusSwatch[status]}`} />
      {status}
      {status === "running" && (
        <span aria-hidden className="relative ml-1 inline-block h-px w-6 overflow-hidden bg-navy-700">
          <span className="running-bar absolute inset-y-0 left-0 w-1/3 bg-signal-400" />
        </span>
      )}
    </span>
  );
}

function RiskChip({ remains }: { remains: boolean }) {
  return remains ? (
    <span className="type-status inline-flex items-center gap-1.5 rounded-xs border border-warn/50 px-1.5 py-[3px] text-warn">
      <span aria-hidden className="size-1.5 bg-warn" />
      Remains
    </span>
  ) : (
    <span className="type-status inline-flex items-center gap-1.5 rounded-xs border border-graphite-700 px-1.5 py-[3px] text-graphite-300">
      Clear
    </span>
  );
}

function Understood({ value }: { value: TrailRow["understood"] }) {
  const full = value === "Understood";
  return (
    <span className="type-status inline-flex items-center gap-1.5 text-graphite-300">
      <span aria-hidden className="relative size-2.5 border border-paper-100">
        <span className={`absolute inset-y-0 left-0 bg-paper-100 ${full ? "right-0" : "right-1/2"}`} />
      </span>
      {value}
    </span>
  );
}

const header = "flex items-baseline justify-between gap-6 border-b border-navy-700 px-5 py-3 md:px-7";

export function EvidenceTrail() {
  return (
    <Reveal as="figure" className="border border-navy-700 bg-navy-900" aria-labelledby="trail-title">
      <div className={`${header} flex-wrap`}>
        <p id="trail-title" className="type-label text-paper-100">
          Evidence trail <span className="text-graphite-300">· CHANGE-0412 Regional tax update</span>
        </p>
        <p className="type-status text-graphite-300">Illustrative view · not product data</p>
      </div>

      {/* Wide screens: the five questions as columns, each journey a trace across them. */}
      <div className="hidden lg:block">
        <div role="table" aria-label="Evidence trail by business journey" className="trail-auto">
          <div role="row" className="grid grid-cols-[1.05fr_1.15fr_1fr_1.25fr_1.25fr] gap-x-6 border-b border-navy-700 px-7 pt-5 pb-4">
            {evidence.points.map((p, i) => (
              <div role="columnheader" key={p.key}>
                <p className="type-label text-graphite-300">
                  {String(i + 1).padStart(2, "0")} <span className="text-paper-100">{p.short}</span>
                </p>
                <p className="type-body-s mt-2 text-graphite-300">{p.text}</p>
              </div>
            ))}
          </div>

          {rows.map((row, i) => (
            <Reveal
              as="div"
              delay={160 + i * 140}
              role="row"
              key={row.journey}
              style={{ ["--i" as string]: i }}
              className="trail-row group/row grid grid-cols-[1.05fr_1.15fr_1fr_1.25fr_1.25fr] gap-x-6 border-b border-navy-700 px-7 py-3.5 transition-colors duration-300 last:border-b-0 hover:bg-navy-800"
            >
              <div role="cell" className="trail-cell">
                <p className="type-body-m font-medium text-paper-100">{row.journey}</p>
                <div className="mt-2">
                  <Understood value={row.understood} />
                </div>
              </div>
              <div role="cell" className="trail-cell">
                <ul className="flex flex-wrap gap-1.5">
                  {row.systems.map((s) => (
                    <li key={s} className="type-body-s rounded-xs border border-navy-700 bg-ink-950/40 px-2 py-0.5 text-paper-100">
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
              <div role="cell" className="trail-cell">
                <div className="flex items-center gap-2">
                  <StatusChip status={row.check.status} />
                  <span className="type-data text-graphite-300">{row.check.id}</span>
                </div>
                <p className="type-body-s mt-2 text-graphite-300">{row.check.note}</p>
              </div>
              <div role="cell" className="trail-cell">
                <RiskChip remains={row.risk.remains} />
                <p className={`type-body-s mt-2 ${row.risk.remains ? "text-paper-100" : "text-graphite-300"}`}>{row.risk.text}</p>
              </div>
              <div role="cell" className="trail-cell">
                <p className="type-body-s text-paper-100">{row.learning}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Smaller screens: one block per journey, the five answers stacked. */}
      <ul className="lg:hidden">
        {rows.map((row) => (
          <li key={row.journey} className="border-b border-navy-700 px-5 py-6 last:border-b-0 md:px-7">
            <p className="type-heading-s text-paper-100">{row.journey}</p>
            <dl className="mt-4 grid gap-y-4 sm:grid-cols-[11rem_1fr] sm:gap-x-6">
              <dt className="type-label text-graphite-300">01 Journeys</dt>
              <dd>
                <Understood value={row.understood} />
              </dd>
              <dt className="type-label text-graphite-300">02 Systems</dt>
              <dd className="type-body-s text-paper-100">{row.systems.join(" · ")}</dd>
              <dt className="type-label text-graphite-300">03 Checks</dt>
              <dd className="flex flex-wrap items-center gap-2">
                <StatusChip status={row.check.status} />
                <span className="type-data text-graphite-300">{row.check.id}</span>
                <span className="type-body-s w-full text-graphite-300">{row.check.note}</span>
              </dd>
              <dt className="type-label text-graphite-300">04 Risk</dt>
              <dd className="flex flex-wrap items-center gap-2">
                <RiskChip remains={row.risk.remains} />
                <span className="type-body-s w-full text-paper-100">{row.risk.text}</span>
              </dd>
              <dt className="type-label text-graphite-300">05 Learning</dt>
              <dd className="type-body-s text-paper-100">{row.learning}</dd>
            </dl>
          </li>
        ))}
      </ul>
    </Reveal>
  );
}
