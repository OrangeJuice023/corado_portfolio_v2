/**
 * Core content model. One unified list; disciplines are FILTER TAGS so
 * recruiters scan by craft without the portfolio fragmenting into pages.
 * Content sourced from real resume work. [brackets] = optional extra detail.
 */

export type Domain =
  | "Software Engineering"
  | "Analytics & BI"
  | "Data Engineering"
  | "Data Science & ML"
  | "Research & Experiments"
  | "Healthcare"
  | "Operations";

export interface SystemCase {
  slug: string;
  title: string;
  org: string;
  domains: Domain[];
  featured: boolean;
  status: "Shipped" | "In Production" | "Ongoing" | "Planned";
  problem: string;
  solution: string;
  impact: string[];
  tech: string[];
  liveUrl?: string;
  repoUrl?: string;
  study: {
    context: string;
    challenges: string[];
    architecture: string;
    results: string;
    lessons: string[];
  };
}

export const systems: SystemCase[] = [
  {
    slug: "healthcare-intelligence-platform",
    title: "Healthcare Intelligence Platforms",
    org: "Dashlabs.ai",
    domains: ["Healthcare", "Analytics & BI", "Data Engineering"],
    featured: true,
    status: "In Production",
    problem:
      "Enterprise healthcare providers had fragmented per-client data — operations, sales, finance, clinical, diagnostics — with no unified way to see facility-level performance or act on it.",
    solution:
      "End-to-end BI platforms with real-time Looker Studio dashboards over centralized BigQuery, spanning operations, finance, clinical snapshots, medicines dispensed, and patient LTV — with automated executive KPI reporting.",
    impact: [
      "15+ client analytics platforms delivered and maintained",
      "Clients incl. Maxicare, Healthway, ARDI, AIC, NHS, One Health, UPCare",
      "~500K–5M+ records processed per client",
    ],
    tech: ["BigQuery", "Looker Studio", "SQL", "Python", "Kubernetes CronJobs"],
    study: {
      context:
        "As Data Operations Lead at Dashlabs.ai (YC W21), I architected the analytics layer for enterprise healthcare clients across the Philippines, standardizing ETL, dashboard deployment, and data-modeling protocols across a 7-person team.",
      challenges: [
        "Fragmented per-client logs (500K–5M rows) in inconsistent formats",
        "Facility-level granularity required across every branch",
        "Recurring executive reporting that had to stay current automatically",
      ],
      architecture:
        "Per-client ETL consolidates fragmented logs into centralized BigQuery analytics systems, refreshed automatically via Kubernetes CronJobs. Looker Studio dashboards sit on top, segmented by operations, sales, finance, marketing, and clinical views.",
      results:
        "Standardized, automated executive reporting across 15+ enterprise clients with self-refreshing pipelines.",
      lessons: [
        "Standardized protocols across clients matter more than any single clever dashboard.",
        "Every KPI is an opinion — making metric definitions explicit was half the work.",
      ],
    },
  },
  {
    slug: "international-deployment-indonesia",
    title: "First International Deployment",
    org: "Dashlabs.ai",
    domains: ["Healthcare", "Analytics & BI", "Data Engineering"],
    featured: true,
    status: "Shipped",
    problem:
      "The analytics stack was proven domestically, but cross-border rollout was unvalidated — different facility, different context, real risk.",
    solution:
      "Led the company's first international deployment at Klinik Dr. Hondo Supeno in Indonesia, validating the analytics stack for cross-border use.",
    impact: ["Dashlabs' first international analytics deployment"],
    tech: ["BigQuery", "Looker Studio", "SQL", "ETL"],
    study: {
      context:
        "After establishing the domestic analytics platform, I led the rollout that took the stack across borders for the first time.",
      challenges: ["[Localization / data-context differences — add specifics]"],
      architecture: "Adapted the standardized ETL + Looker Studio platform to a new international client context.",
      results: "Validated the analytics stack for cross-border rollout.",
      lessons: ["[A real lesson from the international rollout]"],
    },
  },
  {
    slug: "diagnostic-turnaround-monitoring",
    title: "Diagnostic Turnaround Time Monitoring",
    org: "Dashlabs.ai",
    domains: ["Healthcare", "Analytics & BI", "Operations"],
    featured: true,
    status: "In Production",
    problem:
      "Slow diagnostic turnaround quietly degrades patient outcomes and SLA compliance, but delays were invisible until someone complained.",
    solution:
      "High-granularity Turnaround Time (TAT) dashboards across diagnostic workflows that surface bottlenecks and support SLA-compliance monitoring — plus cohort analytics like a TB Diagnostic Cohort Analysis (HTS → ART → 95-95-95 funnel).",
    impact: [
      "Stage-level bottleneck visibility across diagnostic workflows",
      "TB diagnostic cohort + APE reporting for AIC and ARDI",
    ],
    tech: ["BigQuery", "Looker Studio", "SQL", "Cohort Analysis"],
    study: {
      context:
        "Built for diagnostic operations teams who needed to see where time was lost across multi-stage workflows.",
      challenges: ["Defining stage boundaries consistently", "Funnel/cohort modeling across clinical states"],
      architecture: "TAT instrumentation feeds stage-level metrics into Looker Studio; cohort funnels model patient progression.",
      results: "SLA-compliance monitoring and surfaced bottlenecks across diagnostic pipelines.",
      lessons: ["A diagnostic delay is never just a data problem — it's a workflow problem."],
    },
  },
  {
    slug: "production-order-quality-intelligence",
    title: "Production Order Quality Intelligence",
    org: "Aboitiz Foods",
    domains: ["Operations", "Analytics & BI"],
    featured: true,
    status: "Shipped",
    problem:
      "Industrial production quality issues were detected after the fact — when the cost was already sunk.",
    solution:
      "A real-time Production Order Quality dashboard in Looker Studio tracking ~19,000 production orders and 900M+ KG of material, monitoring error trends and firming performance with executive-level KPI filters.",
    impact: [
      "~19,000 production orders tracked",
      "900M+ KG of material monitored",
      "10-year warehouse compliance projection model",
    ],
    tech: ["Looker Studio", "SQL", "Excel", "Lean / 5S"],
    study: {
      context:
        "As a Supply Chain Analyst Intern at Aboitiz Foods, I built quality intelligence over production data and ran Lean-based reviews at the Iligan Power Plant.",
      challenges: ["High data volume (~19K orders)", "Translating quality signals into firming performance"],
      architecture: "Production-order data feeds a real-time Looker Studio dashboard with custom KPI metrics and interactive filters.",
      results: "Real-time error-trend monitoring plus a 10-year compliance projection from 5S/GMP audit data.",
      lessons: ["The earlier a quality signal surfaces, the cheaper the fix."],
    },
  },
  {
    slug: "amazon-workforce-sentiment",
    title: "Amazon Workforce Sentiment Analysis",
    org: "Amazon (via Extern)",
    domains: ["Data Science & ML", "Operations"],
    featured: true,
    status: "Shipped",
    problem:
      "Amazon Fulfillment Associate attrition is expensive, and the real drivers were buried in unstructured text across review sites and social media.",
    solution:
      "A Python sentiment-analysis pipeline (Pandas, TextBlob) over 100+ Glassdoor reviews and YouTube transcripts, with 5-Whys root cause analysis mapping complaints to warehouse policies.",
    impact: [
      "Found a 15% sentiment gap between social media and professional review platforms",
      "Identified 3 attrition drivers: Physical Strain, Management Communication, Scheduling Friction",
    ],
    tech: ["Python", "Pandas", "TextBlob", "NLP", "5-Whys"],
    study: {
      context:
        "An Operations & Strategy externship analyzing operational challenges experienced by Amazon Fulfillment Associates.",
      challenges: ["Unstructured, noisy text from multiple sources", "Separating signal from platform bias"],
      architecture: "Text ingestion → cleaning → TextBlob sentiment scoring → cohort segmentation by role and tenure → 5-Whys mapping.",
      results: "A pilot-ready intervention framework targeting the highest-friction workforce segments.",
      lessons: ["Where people complain shapes what they say — platform context is itself a variable."],
    },
  },
  {
    slug: "ai-automation-systems",
    title: "AI-Powered Automation & Extraction",
    org: "Independent",
    domains: ["Software Engineering", "Research & Experiments", "Data Science & ML"],
    featured: true,
    status: "Ongoing",
    problem:
      "Knowledge work is full of repetitive document, extraction, and summarization tasks that consume expert hours.",
    solution:
      "LLM-driven automations — RAG pipelines (LlamaIndex), OCR systems (Tesseract, PaddleOCR, EasyOCR), and local LLM integration (Mistral, Phi-2) — that turn unstructured inputs into structured, decision-ready outputs.",
    impact: ["[Pick your strongest 1–2 automations and quantify the hours/throughput]"],
    tech: ["Python", "LlamaIndex (RAG)", "Tesseract / PaddleOCR / EasyOCR", "Mistral / Phi-2", "n8n"],
    repoUrl: "https://github.com/OrangeJuice023",
    study: {
      context: "[Describe your 2 strongest automations: what they ingest, what they output, who uses them]",
      challenges: ["Hallucination control", "Evaluating LLM outputs", "OCR accuracy on messy documents"],
      architecture: "[Retrieval design, OCR pipeline, guardrails, human-in-the-loop points]",
      results: "[Quantified outcome]",
      lessons: ["Guardrails and evals matter more than model choice."],
    },
  },
  {
    slug: "software-engineering-foundations",
    title: "Software Engineering Foundations",
    org: "Independent / CS50",
    domains: ["Software Engineering"],
    featured: true,
    status: "Shipped",
    problem:
      "Becoming an engineer without a CS degree means proving fundamentals through built, working software.",
    solution:
      "Complete full-stack applications: a stock-trading simulator (Python/Flask + live market API), database-backed web apps, and game systems with custom mechanics.",
    impact: [
      "CS50 Finance: full-stack trading simulator with live market data",
      "Minesweeper UP: Python game with custom power-up mechanics",
      "Multiple database-backed Flask applications",
    ],
    tech: ["Python", "Flask", "SQL", "JavaScript", "React", "APIs"],
    repoUrl: "https://github.com/OrangeJuice023",
    study: {
      context:
        "Built through and beyond Harvard's CS50, these projects established software engineering fundamentals: full-stack architecture, databases, API integration, and testing.",
      challenges: ["[Real challenges from building these]"],
      architecture: "[Pick the strongest project and describe its architecture]",
      results: "Working, complete applications — not tutorials.",
      lessons: ["[A real lesson]"],
    },
  },
  {
    slug: "cair-research",
    title: "CAIR Research Track",
    org: "Center for AI Research [verify name]",
    domains: ["Research & Experiments"],
    featured: false,
    status: "Planned",
    problem:
      "Applied AI work raises research questions — evaluation, reliability, human-AI decision-making — that production timelines never leave room for.",
    solution:
      "A research track expected to begin around August–September 2026. Nothing claimed here by design — this section fills in only as real work ships.",
    impact: ["Expected start: Aug–Sep 2026 — no outputs claimed yet"],
    tech: ["TBD"],
    study: {
      context: "Planned, not started. Documented as a transparent roadmap item.",
      challenges: [],
      architecture: "—",
      results: "—",
      lessons: [],
    },
  },
  {
    slug: "portfolio-v2",
    title: "This Portfolio — A Systems Narrative",
    org: "Independent",
    domains: ["Software Engineering", "Research & Experiments"],
    featured: false,
    status: "In Production",
    problem:
      "V1 presented me as a student developer — no longer accurate. The site needed to communicate end-to-end engineering and scale across future paths.",
    solution:
      "A Next.js portfolio organized around problems and outcomes, with a scroll-driven network visualization and a free AI assistant guarded by a two-model safety pipeline.",
    impact: [
      "AI assistant runs on Groq's free tier — $0/month, with policy-based guardrails",
      "Architecture scales across career paths without restructuring",
    ],
    tech: ["Next.js 15", "React 19", "TypeScript", "Tailwind v4", "d3-force", "Groq API"],
    liveUrl: "/",
    repoUrl: "https://github.com/OrangeJuice023/portfolio-v2",
    study: {
      context:
        "V1 used Gemini with no guardrails and framed me as a student developer. V2 is a ground-up rebuild designed to grow with my career.",
      challenges: [
        "Making the Living Network performant on mobile (2D canvas + d3-force, not WebGL)",
        "A genuinely free chatbot API with real guardrails (Groq + gpt-oss-safeguard-20b)",
        "Recruiter-scannable disciplines without fragmenting into separate pages",
      ],
      architecture:
        "Content lives in src/lib/content/ as typed arrays. The chat route is OpenAI-compatible and provider-agnostic; a guardrail model classifies every message against a plain-English policy before the main model runs.",
      results: "Clean build, statically generated pages, AI assistant with defence-in-depth.",
      lessons: [
        "One unified systems model with discipline filters serves both recruiters and the narrative.",
        "A two-model safety pipeline is more inspectable than one model trying to be both safe and useful.",
      ],
    },
  },
];

export const allDomains: Domain[] = [
  "Software Engineering",
  "Analytics & BI",
  "Data Engineering",
  "Data Science & ML",
  "Healthcare",
  "Operations",
  "Research & Experiments",
];

export const featuredSystems = systems.filter((s) => s.featured);
export const getSystem = (slug: string) => systems.find((s) => s.slug === slug);
