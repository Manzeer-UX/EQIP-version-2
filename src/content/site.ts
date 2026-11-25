/**
 * All homepage copy lives here so it can be reviewed and edited in one place.
 * Copy is taken verbatim from the approved content brief. Items marked
 * PLACEHOLDER must be replaced with approved information before launch.
 */

export const site = {
  name: "EQIP",
  domain: "https://eqipqa.ai",
  /**
   * PLACEHOLDER: destination for every "Talk to an Expert" action.
   * Replace with the approved booking URL or sales inbox (for example a
   * scheduling link or `mailto:` address). Until then it scrolls to the
   * closing section.
   */
  contactHref: "/#contact",
  metaTitle: "EQIP: Enterprise business intelligence",
  metaDescription:
    "Connect organisational knowledge, business processes, operational workflows and technology to create actionable intelligence. Enabling enterprises to anticipate risks, make informed decisions and evolve with confidence.",
} as const;

export type NavItem = { label: string; href: string; id: string; sections: string[] };

/** `sections` lists the section ids that keep this item active while scrolling. */
export const nav: NavItem[] = [
  { label: "What We See", href: "/#what-we-see", id: "what-we-see", sections: ["what-we-see", "question", "visible"] },
  { label: "Where It Matters", href: "/#where-it-matters", id: "where-it-matters", sections: ["where-it-matters"] },
  { label: "Evidence", href: "/#evidence", id: "evidence", sections: ["evidence", "field"] },
  { label: "About EQIP", href: "/#about", id: "about", sections: ["about"] },
];

export const ctaLabel = "Talk to an Expert";

export const hero = {
  headline: ["Know your business", "before it becomes", "a risk."],
  /** Supplied by the client. */
  description:
    "Connect organisational knowledge, business processes, operational workflows and technology to create actionable intelligence. Enabling enterprises to anticipate risks, make informed decisions and evolve with confidence.",
  primaryCta: "Talk to an Expert",
  secondaryCta: { label: "Explore the Evidence", href: "/#evidence" },
  supportingLine: "Business intelligence for organisations that cannot afford to guess.",
};

export const problem = {
  label: "The problem",
  headline: "Your business remembers more than your documentation does.",
  body: [
    "Across every enterprise are applications that have outlived their original teams, systems connected in ways no diagram captures, and business rules buried in code, processes, and people’s memory.",
    "That is manageable—until a transformation, migration, acquisition, or rapid release asks a simple question:",
  ],
  question: "What will this change affect?",
  answerLead: "For too many organisations, the honest answer is:",
  answer: "we do not know yet.",
};

export const visible = {
  label: "What EQIP makes visible",
  headline: ["Clarity before change.", "Confidence after it."],
  body: [
    "EQIP brings together the evidence already distributed across your business estate: how applications behave, where dependencies sit, what business rules matter, and where change creates risk.",
    "It gives leaders and delivery teams a clearer basis for decisions that are usually made under pressure.",
  ],
  capabilities: [
    {
      number: "01",
      key: "understand",
      title: "Understand what you own",
      body: "Surface the real behaviour, relationships, and hidden knowledge within complex applications.",
    },
    {
      number: "02",
      key: "preserve",
      title: "Preserve what matters",
      body: "Protect the business logic and institutional memory that should not be lost during change.",
    },
    {
      number: "03",
      key: "validate",
      title: "Validate what changes",
      body: "Focus attention on the parts of the estate where confidence is most needed.",
    },
    {
      number: "04",
      key: "evolve",
      title: "Evolve without blind spots",
      body: "Make modernisation, releases, and investment decisions with a living view of business reality.",
    },
  ],
} as const;

export const contexts = {
  label: "Where confidence matters most",
  headline: "When the cost of being wrong is high.",
  items: [
    {
      number: "01",
      key: "migration",
      title: "Modernisation and migration",
      body: "Move from legacy platforms without leaving critical business logic behind.",
    },
    {
      number: "02",
      key: "change",
      title: "Enterprise change",
      body: "Understand the likely impact of a change before it reaches customers, operations, or compliance teams.",
    },
    {
      number: "03",
      key: "ai",
      title: "AI-generated and AI-assisted business",
      body: "As business is created faster, maintain an independent view of whether it behaves as intended.",
    },
    {
      number: "04",
      key: "diligence",
      title: "Technology due diligence",
      body: "See the condition, complexity, and risk within an application before you acquire, migrate, or invest in it.",
    },
  ],
} as const;

export const evidence = {
  label: "Evidence",
  headline: "Confidence should be visible.",
  body: "EQIP does not ask teams to rely on a black box or a reassuring dashboard. It helps create a traceable view of what is known, what has changed, what has been validated, and where attention is still needed.",
  intro: "The result is a conversation grounded in evidence:",
  points: [
    { key: "journeys", short: "Journeys", text: "Which business journeys are understood." },
    { key: "systems", short: "Systems & dependencies", text: "Which systems and dependencies are affected." },
    { key: "checks", short: "Checks", text: "What has been checked before a release or transition." },
    { key: "risk", short: "Risk", text: "Where risk remains and why." },
    { key: "learning", short: "Learning", text: "What the organisation has learned for the next decision." },
  ],
} as const;

export const about = {
  label: "About EQIP",
  headline: "Enterprise software is never just business.",
  body: [
    "It is the accumulated record of how an organisation operates: exceptions made for customers, rules shaped by regulation, decisions taken during growth, and workarounds that became essential.",
    "EQIP is built for that reality. We combine deep quality and business assurance experience with a modern intelligence layer designed for estates that are complex, consequential, and constantly changing.",
  ],
  /** PLACEHOLDER: replace with the approved proof statement. */
  proof: {
    approved: false,
    text: "[Insert approved proof statement here: e.g., “Built on more than [X] years of experience supporting enterprise business quality and transformation.”]",
  },
  strata: [
    "Workarounds that became essential",
    "Decisions taken during growth",
    "Rules shaped by regulation",
    "Exceptions made for customers",
  ],
};

export type CaseStudy = {
  number: string;
  slug: string;
  title: string;
  /** PLACEHOLDER: approved client name, or keep anonymised. */
  client: string;
  challenge: string;
  clarity: string;
  change: string;
};

export const field = {
  label: "Evidence from the field",
  headline: "The work speaks for itself.",
  cta: "Read the case study",
  studies: [
    {
      number: "01",
      slug: "enterprise-erp-modernisation",
      title: "Enterprise ERP modernisation",
      client: "[Client name pending approval]",
      challenge:
        "A business-critical transformation depended on workflows spread across legacy systems, changing requirements, and multiple operational teams.",
      clarity:
        "The organisation gained a more complete view of critical journeys, dependencies, and release risk before go-live.",
      change:
        "Teams could focus validation where it mattered most and move into rollout with a defensible basis for confidence.",
    },
    {
      number: "02",
      slug: "regulated-industry-release-assurance",
      title: "Regulated industry release assurance",
      client: "[Client name pending approval]",
      challenge:
        "A high-impact release introduced change across customer, policy, and calculation workflows.",
      clarity:
        "The team could connect requirements, application behaviour, and validation evidence in one view.",
      change:
        "Release conversations shifted from opinion and status reporting to evidence and informed decision-making.",
    },
  ] satisfies CaseStudy[],
};

export const closing = {
  headline: "The next change should not depend on what someone happens to remember.",
  body: "Bring the intelligence already inside your business into view. Understand what matters, preserve what works, and change with confidence.",
  primaryCta: "Talk to an Expert",
  secondaryCta: { label: "See EQIP in Context", href: "/#where-it-matters" },
};

export const footer = {
  statement:
    "EQIP helps organisations understand, preserve, validate, and continuously evolve their business with confidence.",
};
