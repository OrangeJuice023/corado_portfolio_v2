/** Essay metadata. `published: false` renders as "Coming soon". */
export interface Essay {
  slug: string;
  title: string;
  dek: string;
  published: boolean;
  date?: string;
}

export const essays: Essay[] = [
  { slug: "every-kpi-is-an-opinion", title: "Every KPI Is an Opinion", dek: "Metrics feel objective. They're not — and pretending otherwise is how dashboards lose trust.", published: false },
  { slug: "data-doesnt-make-decisions", title: "Data Doesn't Make Decisions", dek: "People do. Systems should shorten the distance between a question and a confident answer.", published: false },
  { slug: "what-healthcare-taught-me-about-systems", title: "What Healthcare Taught Me About Systems", dek: "A diagnostic delay is never just a data problem.", published: false },
  { slug: "why-dashboards-fail", title: "Why Dashboards Fail", dek: "Most dashboards answer questions nobody asked.", published: false },
  { slug: "hidden-cost-of-information-silos", title: "The Hidden Cost of Information Silos", dek: "Silos don't just slow you down — they make organizations stupid.", published: false },
  { slug: "leading-analysts-while-still-a-student", title: "Leading Analysts While Still a Student", dek: "What I learned managing a team before graduating.", published: false },
  { slug: "building-before-youre-ready", title: "Building Before You're Ready", dek: "The case for shipping past your comfort zone.", published: false },
  { slug: "operations-lessons-from-amazon", title: "Operations Lessons from Amazon", dek: "What the world's most demanding operation teaches about data discipline.", published: false },
  { slug: "self-taught-by-necessity", title: "Self-Taught by Necessity", dek: "From CS50 to production systems: what 17 certifications actually taught me.", published: false },
];
