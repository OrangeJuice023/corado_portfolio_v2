/** SINGLE SOURCE OF TRUTH. Real data from resume. [brackets] = optional/verify. */

export const profile = {
  name: "Gervi Corado",
  identity: "Software Engineer • Analytics Engineer • Data Builder",
  tagline: "Building systems that turn complexity into clarity.",
  subheadline:
    "Healthcare Analytics, Data Engineering, Business Intelligence, and Operations Strategy.",
  summary:
    "I build production-grade analytics pipelines, executive dashboards, and software systems that help enterprise organizations understand complexity and make better decisions.",

  siteUrl: "https://portfoliocorado.vercel.app",
  email: "gervicorado@yahoo.com",
  phone: "0905 336 7220",
  location: "Quezon City, Philippines",

  links: {
    github: "https://github.com/OrangeJuice023",
    linkedin: "https://linkedin.com/in/gervi-paulo-corado",
    resumePdf: "/resume.pdf",
  },

  nav: [
    { label: "Home", href: "/" },
    { label: "Systems", href: "/systems" },
    { label: "Certifications", href: "/certifications" },
    { label: "Research & AI", href: "/research" },
    { label: "Writing", href: "/writing" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],

  about: {
    whoIAm:
      "I'm fascinated by complex systems — hospitals, supply chains, organizations, data ecosystems. My work revolves around understanding these systems and building the software and analytics that help people make better decisions.",
    portrait: "/images/portrait.jpg",
    story: [
      "I'm a UP Diliman student who builds production analytics and software systems for enterprise organizations.",
      "I currently lead the Data Analytics division at Dashlabs.ai (YC W21), where I've architected 15+ client analytics platforms for enterprise healthcare providers across the Philippines — and shipped the company's first international deployment in Indonesia. Before that I analyzed supply-chain operations at Aboitiz Foods, evaluated workforce operations at Amazon, and handled finance operations at Etaily.",
      "What ties it together is systems thinking: whether it's a hospital's diagnostic turnaround, a warehouse's production quality, or a workforce's attrition drivers, the job is the same — turn fragmented complexity into something a decision-maker can act on.",
      "I'm largely self-taught as an engineer, and I consider that a feature: every technical skill I have exists because a real problem demanded it. The certifications page documents that journey — from CS50 in 2022 through database administration in 2026.",
    ],
    philosophy:
      "Data doesn't make decisions — people do. The job of a good system is to shorten the distance between a question and a confident answer. Every KPI is an opinion; the craft is making those opinions explicit, inspectable, and useful.",
    interests:
      "[Fitness, reading, and other interests — fill in what you want public]",
    aspirations:
      "Growing as an engineer who builds at the intersection of software, data, and AI — and eventually building products of my own.",
  },

  resume: {
    experience: [
      {
        org: "Dashlabs.ai (YC W21)",
        role: "Data Operations Lead",
        period: "Oct 2025 – Present",
        bullets: [
          "Lead the Data Analytics division, architecting and deploying 15+ client analytics platforms across a team of 7 interns and analysts, with standardized ETL, dashboard deployment, and data-modeling protocols.",
          "Built end-to-end BI platforms for enterprise healthcare clients (Maxicare, Healthway, ARDI, AIC, NHS, One Health, PUDC, UPCare, RG Medical, Shalom, MedClub) on datasets of ~500K–5M+ records per client.",
          "Delivered the company's first international deployment (Klinik Dr. Hondo Supeno, Indonesia).",
          "Engineered healthcare data pipelines with automated cron-based refreshes (Kubernetes CronJobs), consolidating fragmented per-client logs into centralized BigQuery analytics systems.",
          "Built high-granularity Turnaround Time (TAT) dashboards for diagnostic workflows, surfacing bottlenecks and supporting SLA-compliance monitoring.",
          "Authored cohort analytics including a TB Diagnostic Cohort Analysis (HTS → ART → viral-load 95-95-95 funnel).",
        ],
      },
      {
        org: "Amazon (via Extern)",
        role: "Operations & Strategy Extern",
        period: "Dec 2025 – Feb 2026",
        bullets: [
          "Built a Python sentiment-analysis pipeline (Pandas, TextBlob) over 100+ Glassdoor reviews and YouTube transcripts, identifying a 15% sentiment gap between social media and professional review platforms.",
          "Identified three attrition drivers (Physical Strain, Management Communication, Scheduling Friction) via 5-Whys root cause analysis.",
          "Presented a pilot-ready intervention framework to reduce operational risk and improve associate experience.",
        ],
      },
      {
        org: "Aboitiz Foods",
        role: "Supply Chain Analyst Intern",
        period: "Jun 2025 – Aug 2025",
        bullets: [
          "Built a real-time Production Order Quality dashboard (Looker Studio) tracking ~19,000 production orders and 900M+ KG of material to monitor error trends and firming performance.",
          "Conducted Lean-based process reviews at the Iligan Power Plant, identifying bottlenecks and operational risk.",
          "Developed a 10-year projection model for warehouse compliance using trend analysis and 5S/GMP audit data.",
        ],
      },
      {
        org: "Etaily (TPA Operations Corp.)",
        role: "Finance and Accounting Intern",
        period: "Mar 2026 – May 2026",
        bullets: [
          "Maintained vendor documentation compliance (Volopay, Aspire) and supported month-end closing in Zoho.",
          "Assisted PO migration to Oracle NetSuite, validating transactional data integrity during the transition.",
        ],
      },
      {
        org: "UP Engineering Student Council",
        role: "Local Operations Officer",
        period: "Jul 2024 – Jun 2025",
        bullets: [
          "Managed secretariat operations, document security, and logistical coordination for council venues.",
        ],
      },
    ],
    education: [
      {
        org: "University of the Philippines Diliman",
        credential: "UP Diliman student",
        period: "Expected 2028",
      },
    ],
    skills: {
      "Software Engineering": ["TypeScript", "Python", "JavaScript (ES6+)", "React", "HTML / CSS", "C", "C#"],
      "Data & Analytics": ["SQL", "Google BigQuery", "Looker Studio", "Tableau", "Excel", "NLP & Sentiment Analysis"],
      "Data Engineering": ["ETL Pipeline Architecture", "Cohort & Funnel Analysis", "Automated KPI Reporting", "Data Quality Enforcement"],
      "DevOps & Infra": ["Kubernetes (CronJobs)", "Lens", "n8n", "Cron Scheduling", "Google Cloud Platform"],
      "AI Engineering": ["RAG (LlamaIndex)", "OCR (Tesseract, PaddleOCR, EasyOCR)", "LLM Integration (Mistral, Phi-2)", "Prompt Engineering"],
      "Operations & IE": ["Lean & 5S", "GMP Audits", "Root Cause Analysis (5-Whys)", "Process Mapping", "SLA Monitoring"],
    },
  },
} as const;
