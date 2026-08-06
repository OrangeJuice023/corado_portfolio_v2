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
  image?: string; // screenshot — shown on the case-study page
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
    slug: "the-big-one",
    title: "The Big One: Earthquake Loss and Disclosure Audit",
    org: "Independent Research · NCDSPP 2026",
    domains: ["Data Science & ML", "Research & Experiments", "Software Engineering"],
    featured: true,
    status: "Shipped",
    problem:
      "Metro Manila is overdue for a magnitude 7.2 rupture on the West Valley Fault, and public discussion settles on a single cost figure. Single-point estimates hide what matters: three earthquakes within 0.3 magnitude units of each other produced losses five orders of magnitude apart, because exposure and vulnerability dominate outcomes, not magnitude.",
    solution:
      "A two-layer research system. Layer one is a probabilistic loss model pairing mechanistic seismic physics with fragility parameters learned by approximate Bayesian computation, validated out-of-sample. Layer two audits six fault-corridor cities against the eight core obligations of RA 10121, document by document, across 48 evidence cells.",
    impact: [
      "Accepted to the 1st National Conference on Data Science for Public Policy (NCDSPP 2026), UP Diliman",
      "Median direct loss US$45.4B, P10 to P90 range US$14.0B to US$106.4B, reaching 0.95 of the World Bank benchmark without being tuned toward it",
      "Gradient-boosted baseline came in 113x low, turning an assumption about physics-informed ML into a measured result",
      "All six audited cities run disaster offices; only one publishes its plans where an ordinary resident can reach them",
    ],
    tech: [
      "Python",
      "NumPy",
      "pandas",
      "LightGBM",
      "Monte Carlo",
      "Approximate Bayesian Computation",
      "Next.js 14",
      "TypeScript",
      "MapLibre GL",
      "KaTeX",
      "BM25 Retrieval",
      "Groq (Llama 3.3 70B)",
    ],
    liveUrl: "https://the-big-one-swart.vercel.app",
    repoUrl: "https://github.com/OrangeJuice023/the-big-one",
    study: {
      context:
        "PHIVOLCS expects intensity VIII shaking across the corridor. A planner sizing a contingent credit facility needs the range, not the midpoint, because US$14 billion and US$106 billion are different problems. The disclosure audit started as a sanity check and became half the project: a loss estimate is only useful if the institutions expected to act on it can.",
      challenges: [
        "Fragility parameters as expert guesses swung the median by -33%/+43%, too much weight to rest on an assumption",
        "The forward model is a Monte Carlo simulation with no closed-form likelihood, so ordinary Bayesian updating was unavailable",
        "A corpus that documents its own verification failures is a retrieval hazard: explaining why a claim is false requires repeating it",
        "Several audit documents were obtainable only by formal request, the exact channel the paper critiques",
      ],
      architecture:
        "Distance to fault gives shaking intensity via a custom Allen-Wald-Worden (2012) implementation, cross-checked against GEM OpenQuake. Intensity gives a damage fraction through a logistic fragility curve whose parameters are learned by ABC rejection sampling against the 1990 Luzon earthquake (200,000 draws, 76,593 accepted, 38.3%). A nested Monte Carlo decomposes aleatoric from epistemic uncertainty, splitting 65/35 at M7.2. The web layer publishes the full arithmetic with every equation one click from a plain-language explanation, over a 235-chunk BM25 corpus with grounded generation.",
      results:
        "Validated out-of-sample on the 2013 Bohol earthquake, held out entirely: calibrated at M7.7 on Luzon, tested at M7.2 on Bohol, so the model has to generalise across both magnitude and geography. It reproduced observed intensity within one unit at every distance band. An adversarial bound pushing every learned parameter toward a low estimate still gives US$12.1B, so the tens-of-billions conclusion does not rest on the central parameter estimates.",
      lessons: [
        "Uncertainty decomposition changes what a number is for. A range with a stated 65/35 split invites the question a planner actually needs answered: which part could better data fix?",
        "Look at distributions, not summary statistics. My posterior means barely moved and I nearly wrote the data off. The histogram showed the observation had removed the entire upper tail of the fragility midpoint.",
        "Test the alternative you are implicitly arguing against. The gradient-boosted baseline had correctly learned that most earthquakes are cheap, which is true and useless for thirteen million people sitting on a fault.",
        "Compiled summaries are reliable on substance and unreliable on identifiers. Provenance flags caught two wrong statutory citations before they reached the paper.",
        "The interesting finding was not the one I set out to get.",
      ],
    },
  },
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
    featured: false,
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
    slug: "mapa-tingin",
    title: "Mapa-Tingin — Earth Observation Platform",
    org: "Independent",
    domains: ["Software Engineering", "Data Engineering", "Data Science & ML"],
    featured: true,
    status: "Shipped",
    problem:
      "Decision-support tools for environmental risk often prioritize visualization over methodology, producing pretty dashboards built on approximate calculations that can't be defended.",
    solution:
      "A full-stack environmental intelligence platform that ingests live atmospheric data through a five-stage ETL pipeline (ingestion → validation → feature engineering → risk evaluation → persistence) and computes a defensible 0–100 heat-stress risk score — each stage visualized so users see raw data become actionable intelligence.",
    impact: [
      "Heat index computed via the NWS Rothfusz regression, not simplified approximations",
      "Five-stage ETL pipeline with stage-by-stage observability",
      "Live, on-demand environmental assessment for any coordinates",
    ],
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "Recharts", "Leaflet", "MongoDB Atlas", "Open-Meteo API", "Vercel"],
    liveUrl: "https://mapatingin.vercel.app/",
    image: "/images/projects/mapa-tingin.png",
    study: {
      context:
        "An exploration of real-time data processing, feature engineering, and operational dashboard design — built as a cloud-native, serverless application with a telemetry-inspired interface that communicates analytical workflow and system status.",
      challenges: [
        "Database connection pooling and environment management in a serverless architecture",
        "API reliability and dependency compatibility under serverless constraints",
        "Translating raw atmospheric data into normalized, explainable risk tiers",
      ],
      architecture:
        "Open-Meteo observations flow through a five-stage ETL pipeline; the feature-engineering layer computes the heat index (Rothfusz regression) and a 0–100 risk score against established heat-stress thresholds, generating tiered alerts. Processed observations, raw payloads, and pipeline logs persist in MongoDB Atlas for historical analysis and observability. A Leaflet map and live dashboard sit on top.",
      results:
        "A working decision-support system that prioritizes analytical accuracy and explainability over visual presentation.",
      lessons: [
        "Decision-support systems derive credibility from methodology, not visualization — swapping an approximate heat index for the NWS Rothfusz regression improved the platform more than any design change.",
      ],
    },
  },
  {
    slug: "alam-daan",
    title: "Alam Daan — Infrastructure Intelligence System",
    org: "Independent",
    domains: ["Software Engineering", "Data Science & ML", "Research & Experiments", "Operations"],
    featured: true,
    status: "Shipped",
    problem:
      "Philippine LGUs lack a consistent, comparable way to monitor infrastructure deterioration across cities — assessments are manual, subjective, and hard to defend.",
    solution:
      "A research-driven infrastructure intelligence platform that turns street-level imagery and environmental indicators into infrastructure risk assessments, anchored by the Urban Stress Score (USS) — a composite index combining physical decay, built-environment/vegetation indicators, and an infrastructure age proxy.",
    impact: [
      "Designed the Urban Stress Score: a transparent, weighted composite index",
      "Multi-source pipeline: Mapillary imagery, Sentinel-2 (STAC/Element84), OpenStreetMap",
      "VLM pipeline detects potholes, cracking, and utility damage from road imagery",
    ],
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "Leaflet", "Mapillary API", "OpenStreetMap", "STAC / Sentinel-2", "Vision-Language Models", "REST APIs"],
    liveUrl: "https://alam-daan.vercel.app/",
    image: "/images/projects/alam-daan.png",
    study: {
      context:
        "A platform-oriented decision-support system (not a standalone dashboard) for monitoring infrastructure conditions across local government units, with a documented methodology module for reproducibility.",
      challenges: [
        "Designing multi-source geospatial data pipelines that stay consistent across cities",
        "AI-assisted image analysis with results extrapolated across a road network",
        "Documenting weighting logic and assumptions so the index is defensible",
      ],
      architecture:
        "Ingests Mapillary street-level imagery, Sentinel-2 satellite scenes via STAC-compliant APIs (Element84), and OpenStreetMap metadata. A Vision-Language Model pipeline analyzes sampled road imagery for visible deterioration; indicators are mathematically weighted into the Urban Stress Score. A documented API layer exposes image classification, satellite retrieval, and LGU-level stress analysis as services.",
      results:
        "A research-grade environment for infrastructure monitoring with a transparent, reproducible scoring methodology.",
      lessons: [
        "Meaningful intelligence systems emerge from carefully designed methodologies that turn raw observations into interpretable, defensible indicators — not from dashboards alone.",
      ],
    },
  },
  {
    slug: "landas-ai",
    title: "Landas AI — Career Intelligence Platform",
    org: "Independent",
    domains: ["Software Engineering", "Data Science & ML", "Research & Experiments"],
    featured: false,
    status: "Ongoing",
    problem:
      "Platforms like LinkedIn are great for networking and job discovery, but offer little help with a more fundamental question: what career path should someone actually pursue, and how do they get there?",
    solution:
      "An AI-native career intelligence platform for Filipino students and professionals — combining curated industry knowledge, salary intelligence, role-progression frameworks, and AI-assisted analysis into a unified decision-support experience (not a chatbot bolted onto a job board).",
    impact: ["Phase 1 in active development — localized to Philippine labor-market realities"],
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "LLM Integration", "Retrieval Workflows"],
    liveUrl: "https://landas-ai.vercel.app/",
    image: "/images/projects/landas-ai.png",
    study: {
      context:
        "An AI-native product combining structured knowledge systems, retrieval workflows, recommendation logic, and guided user journeys to turn career exploration from passive browsing into actionable planning.",
      challenges: [
        "Balancing AI-generated recommendations with curated domain knowledge so outputs stay practical and grounded",
        "Information architecture for comparing career trajectories and skill gaps",
      ],
      architecture:
        "Structured industry knowledge + salary and role-progression data feed AI-assisted analysis; users explore industries, compare paths, identify skill gaps, and generate personalized development roadmaps.",
      results: "[Phase 1 — add outcomes as they land]",
      lessons: [
        "Building an AI-native product means designing the knowledge and retrieval layer first, not embedding a chatbot last.",
      ],
    },
  },
  {
    slug: "daloy",
    title: "Daloy: Open Stablecoin Flow Intelligence",
    org: "APAC Stellar Hackathon",
    domains: ["Data Engineering", "Analytics & BI", "Software Engineering"],
    featured: true,
    status: "Shipped",
    problem:
      "Philippine OFW remittance corridors move through stablecoin rails with almost no public visibility into flow, and the on-chain data that does exist is polluted by wash trading that makes headline volume meaningless.",
    solution:
      "A zero-cost ELT pipeline ingesting Stellar public data into a BigQuery medallion architecture modelled in dbt, surfacing corridor intelligence through Looker Studio and publishing verifiable daily attestations to a Soroban smart contract on Stellar mainnet.",
    impact: [
      "APAC Stellar Hackathon finalist, solo build",
      "Identified and fixed an $8.8T fake-volume data-validation gap",
      "Statistical anomaly detection for stablecoin peg health",
      "Deployed to Stellar mainnet with daily on-chain attestations",
    ],
    tech: ["BigQuery", "dbt", "Looker Studio", "Soroban", "Stellar Hubble", "SQL"],
    study: {
      context:
        "Built solo for the APAC Stellar Hackathon. The premise was that remittance corridor intelligence should be open and reproducible rather than sitting behind a vendor, and that on-chain publication is what makes an analytics output auditable by someone who does not trust the analyst.",
      challenges: [
        "Headline on-chain volume was inflated by $8.8T of wash trading, so the naive ingest produced numbers that were confidently wrong",
        "Keeping the entire pipeline at zero marginal cost while still running daily",
        "Peg deviations are rare events, so anomaly detection had to be statistical rather than threshold-based",
      ],
      architecture:
        "Stellar Hubble public data lands in BigQuery, modelled through bronze, silver and gold layers in dbt with validation gates at each promotion. Gold tables feed a Looker Studio corridor dashboard, and a daily job hashes the published figures into a Soroban contract on mainnet so any reader can verify that today's numbers match what was attested.",
      results:
        "Mainnet-deployed with verifiable daily attestations, at zero infrastructure cost, and a finalist placement.",
      lessons: [
        "The validation gate caught a fake-volume problem three orders of magnitude larger than the real signal. On public chain data, ingestion without validation is not a shortcut, it is a wrong answer delivered faster.",
        "Publishing an attestation on-chain changes the incentive: the pipeline has to be right on a schedule, not right once for a demo.",
      ],
    },
  },
  {
    slug: "ugat",
    title: "UGAT: Organizational Reasoning Platform",
    org: "Independent",
    domains: ["Software Engineering", "Data Science & ML", "Operations"],
    featured: false,
    status: "Shipped",
    problem:
      "Dashboards report that a metric moved. They do not say why, and the gap between noticing a change and diagnosing its cause is where most organizational analytics stops being useful.",
    solution:
      "A reasoning platform that walks every insight through an explicit loop (observe, form competing hypotheses, weigh evidence, estimate confidence, commit to a diagnosis, recommend an intervention) the way an industrial engineer crossed with a management consultant would.",
    impact: [
      "Executive Translation Layer re-voices every insight for analysts, managers, and executives",
      "Three original behavior metrics: Organizational Friction, Decision Velocity, Dependency Health",
      "Live AI agent constrained to attribute causes to systems rather than individuals",
      "Synthetic org with deliberately planted root causes, so the reasoning is verifiable",
    ],
    tech: ["Next.js", "TypeScript", "React", "Edge API Routes", "Groq (Llama 3.3 70B)", "Vercel"],
    liveUrl: "https://ugat-eta.vercel.app/",
    study: {
      context:
        "Ugat is Filipino for root. The premise is that the useful question is never what happened but why, and that a system which cannot show its reasoning cannot be trusted with a causal claim.",
      challenges: [
        "Evaluating a reasoning system requires knowing the right answer, which is why the demo organization is synthetic and seeded",
        "Confidence estimates invite false precision, so the system expresses strength of evidence rather than inventing a percentage",
        "Causal attribution defaults to blaming people, so the agent is explicitly constrained toward systems",
      ],
      architecture:
        "The company is modelled as an interactive organizational graph carrying department health, dependencies, hidden risks, connected projects, and past incidents. A live agent grounded in that graph reasons on unscripted questions in real time. The Executive Translation Layer takes one diagnosis and renders three registers of the same finding.",
      results:
        "A working reasoning loop over a seeded synthetic organization where planted root causes make the diagnoses checkable rather than plausible-sounding.",
      lessons: [
        "Refusing to fake precise confidence is a feature. A system that says the evidence is weak is more useful than one that says 73%.",
        "The same diagnosis has to speak in three registers or it reaches one audience and dies there.",
      ],
    },
  },
  {
    slug: "labsim",
    title: "LabSim: Synthetic Healthcare Data Science Platform",
    org: "Independent",
    domains: ["Data Science & ML", "Healthcare", "Software Engineering"],
    featured: false,
    status: "Shipped",
    problem:
      "Data science interns learn on clean tutorial datasets and then meet production data that is broken in ways they have never seen. Real diagnostic lab data cannot be handed to them for training.",
    solution:
      "A synthetic healthcare dataset engineered from scratch to reproduce production-like imperfections (broken joins, partial timestamps, messy multilingual records) with ground truth attached, plus nine end-to-end ML projects built on top of it.",
    impact: [
      "Nine end-to-end ML projects spanning classification, regression, clustering, association rules, anomaly detection, NLP, and statistical benchmarking",
      "Generator injects realistic flaws with labels: null foreign keys, ~66% timestamp coverage, zero-value insurance, known financial anomalies",
      "Reusable intern portfolio template, privacy by design with zero real patient data",
    ],
    tech: [
      "Next.js",
      "TypeScript",
      "Tailwind",
      "Three.js",
      "Python",
      "pandas",
      "NumPy",
      "scikit-learn",
      "Faker",
      "Recharts",
    ],
    liveUrl: "https://labsim-ds.vercel.app/",
    study: {
      context:
        "Built for the data science interns I lead at Dashlabs. Teaching on honest, messy data required generating that mess deliberately, with ground truth, so mistakes are diagnosable rather than mysterious.",
      challenges: [
        "Flaws had to be realistic enough to teach but labelled enough to grade against",
        "Negation-aware radiology parsing, where a missed negation inverts the clinical meaning",
        "[How you validated the synthetic data actually resembles production]",
      ],
      architecture:
        "A reproducible Python generator emits the synthetic lab dataset with injected flaws and a ground-truth key. Nine ML project tracks consume it. The front end is a production Next.js site with a scroll-driven Three.js hero visualizing five data sources converging into one schema.",
      results:
        "A reproducible generator with labels, a deployed site, and a reusable portfolio template the interns build against.",
      lessons: [
        "Ground truth is what turns a messy dataset from a frustration into a curriculum.",
      ],
    },
  },
  {
    slug: "himay",
    title: "Himay: AI Data Profiling and Quality Assessment",
    org: "Independent",
    domains: ["Data Engineering", "Software Engineering"],
    featured: false,
    status: "Shipped",
    problem:
      "Analysts build on datasets before establishing whether the data is trustworthy, and the checks that would catch it are tedious enough that they get skipped.",
    solution:
      "A browser-based profiling tool that evaluates a CSV or Excel file on upload: schema inference, missing values, duplicates, statistical summaries, IQR outlier detection, and an AI-assisted analyst report with cleaning recommendations.",
    impact: [
      "Fully client-side processing, so no dataset leaves the browser and no database is required",
      "Schema inference, missing and duplicate detection, IQR outlier analysis, and AI cleaning recommendations in one pass",
      "[Quantify: datasets profiled, or hours saved on a real workflow]",
    ],
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "Recharts", "SheetJS", "Groq (Llama 3.3 70B)"],
    liveUrl: "https://himay-lyart.vercel.app/",
    study: {
      context:
        "Himay is Filipino for to dissect or examine closely. Built out of the same instinct behind the data-quality enforcement I run across client pipelines: the check has to be cheap enough that nobody skips it.",
      challenges: [
        "Client-side processing caps the workable file size, which is the price of the privacy guarantee",
        "LLM-generated quality commentary has to stay tied to computed statistics rather than inventing findings",
      ],
      architecture:
        "SheetJS parses the upload in-browser. Profiling statistics are computed client-side and rendered through Recharts. The computed profile, not the raw data, is what gets sent for AI-assisted commentary.",
      results:
        "Fast, privacy-preserving dataset assessment with no backend dependency.",
      lessons: [
        "Sending the profile instead of the data is what lets the privacy claim and the AI feature coexist.",
      ],
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
    repoUrl: "https://github.com/OrangeJuice023/corado_portfolio_v2",
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
