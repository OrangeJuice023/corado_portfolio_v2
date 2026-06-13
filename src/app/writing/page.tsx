/**
 * Essays. `published: true` essays get a full reading page at /writing/[slug].
 * `body` is plain text: each non-empty line renders as its own paragraph,
 * preserving the short-line cadence. No em dashes by design.
 */
export interface Essay {
  slug: string;
  title: string;
  dek: string;
  published: boolean;
  body?: string;
}

export const essays: Essay[] = [
  {
    slug: "every-kpi-is-an-opinion",
    title: "Every KPI Is an Opinion",
    dek: "Metrics feel objective. They aren't. A KPI is an opinion expressed mathematically.",
    published: true,
    body: `Metrics feel objective. They are not.

The moment an organization decides to measure something, it has already made a judgment about what matters.

Revenue growth. Customer satisfaction. Utilization rates. Wait times. Conversion rates. Every KPI reflects a decision about which outcomes deserve attention and which outcomes can be ignored.

That is why I have always found it strange when people describe dashboards as "objective."

The numbers may be objective. The decision to display those numbers rarely is.

A hospital that optimizes patient throughput may improve efficiency while increasing staff burnout. A business that optimizes revenue may sacrifice customer trust. A team that optimizes speed may unintentionally reduce quality.

None of those outcomes are visible from the KPI itself. They are embedded in the assumptions behind it.

One of the first lessons I learned working with data is that metrics influence behavior. People naturally move toward whatever gets measured.

Show a team average handling time and they will try to reduce it. Show a sales team revenue and they will maximize it. Show executives a dashboard every Monday and that dashboard eventually becomes the organization's definition of reality.

This creates a responsibility that many analysts underestimate. Building dashboards is not just a technical task. It is a design decision.

The analyst decides which questions deserve attention. The analyst decides which metrics are highlighted. The analyst decides what the organization sees first. In many ways, dashboards shape conversations long before meetings begin.

That is why good analytics starts with context rather than visualization. Before building charts, analysts should ask: What behavior are we trying to encourage? What decisions will this support? What unintended consequences could emerge?

A KPI is never just a number. It is an opinion expressed mathematically.

The organizations that understand this build trust. The organizations that pretend otherwise eventually discover that even the most beautiful dashboard can lead people in the wrong direction.`,
  },
  {
    slug: "data-doesnt-make-decisions",
    title: "Data Doesn't Make Decisions",
    dek: "People do. Good systems shorten the distance between a question and a confident answer.",
    published: true,
    body: `People do.

The analytics industry sometimes talks about data as if it possesses magical properties. Collect enough information and good decisions will naturally emerge. Build enough dashboards and organizations will become intelligent. Store enough data and uncertainty disappears.

Reality is less exciting. Data does not make decisions. People do.

A dashboard cannot approve a strategy. A machine learning model cannot accept accountability. A report cannot exercise judgment. All of those tools exist for one reason: to help humans make better choices.

That distinction matters because many organizations become obsessed with information while neglecting decision-making.

I have seen teams spend months building reports that nobody acts on. I have seen dashboards viewed thousands of times without changing a single outcome. I have seen organizations accumulate enormous amounts of data while remaining completely uncertain about what to do next.

The problem was not information. The problem was clarity.

The best systems I have encountered do not overwhelm people with data. They reduce the distance between a question and a confident answer.

Every dashboard should make a decision easier. Every report should reduce uncertainty. Every analytical process should help people move forward.

If it does not, then it does not matter how sophisticated the technology is. Its value remains theoretical.

Organizations do not become better because they know more. They become better because they decide better. Data is simply one of the tools that helps them get there.`,
  },
  {
    slug: "what-healthcare-taught-me-about-systems",
    title: "What Healthcare Taught Me About Systems",
    dek: "Most failures come from systems, not individuals. A diagnostic delay is never just a data problem.",
    published: true,
    body: `Healthcare taught me that outcomes rarely have a single cause.

When people hear about a delayed diagnosis, a missed appointment, or a treatment failure, they often search for someone to blame. A doctor. A nurse. An administrator. A patient.

The reality is usually more complicated. Most failures emerge from systems rather than individuals.

A diagnostic delay is rarely just a data problem. Information may have arrived late. Communication may have broken down. Processes may have introduced unnecessary friction. Technology may have failed to support the people using it. Ownership may have been unclear.

Each issue appears small in isolation. Together, they become significant.

Working around healthcare systems changed how I think about organizations. Problems that appear personal are often structural. People operate within environments, and those environments determine what is easy, difficult, and impossible.

This perspective extends far beyond hospitals. Businesses experience the same phenomenon. Universities experience it. Governments experience it. Startups experience it.

When outcomes consistently fall short of expectations, the instinct is often to focus on individuals. But sustainable improvement usually comes from examining the system surrounding them.

The most effective organizations are not the ones with perfect people. They are the ones with resilient systems.

Healthcare taught me that lesson better than any textbook ever could.`,
  },
  {
    slug: "why-dashboards-fail",
    title: "Why Dashboards Fail",
    dek: "Most dashboards answer questions nobody asked. The best ones are communication projects, not visualization projects.",
    published: true,
    body: `Most dashboards answer questions nobody asked.

That may sound harsh. But after seeing countless analytics projects, it remains the most common reason dashboards fail.

Organizations often approach dashboards backward. Someone requests reporting. An analyst builds visualizations. Charts get delivered. Nobody uses them. Weeks later everyone wonders why adoption is low.

The answer is usually simple. The dashboard solved the wrong problem.

The best dashboards are not visualization projects. They are communication projects. Their purpose is to answer questions that decision-makers genuinely have.

Yet many analysts spend more time discussing colors, layouts, and chart types than understanding stakeholder needs. Discovery matters more than design.

The most important dashboard conversation happens before development begins. What decision is being made? What information is missing? Who will use this? How often? What action should occur after viewing it?

Without those questions, dashboards become digital decorations.

Useful analytics requires curiosity. The analyst's responsibility is not merely to build reports. It is to understand the business problem well enough to ask better questions than the client initially asked.

Great dashboards emerge from great conversations. Everything else is formatting.`,
  },
  {
    slug: "hidden-cost-of-information-silos",
    title: "The Hidden Cost of Information Silos",
    dek: "Silos don't just slow organizations down. They make them stupid.",
    published: true,
    body: `Information silos do not just slow organizations down. They make organizations stupid.

That sounds extreme until you watch it happen.

One team has data. Another team has context. A third team has decision-making authority. None of them communicate effectively.

As a result, everyone operates with partial knowledge. Departments begin optimizing locally rather than globally. People solve symptoms rather than causes. The same problems get discussed repeatedly because no one possesses the full picture.

The damage is often invisible. Meetings become longer. Projects become slower. Decisions become less accurate. Trust gradually declines. The organization accumulates knowledge but struggles to generate understanding.

The irony is that most silos are not technological problems. They are organizational problems. The data usually exists. Access often exists. The missing ingredient is communication.

Healthy organizations treat information as a shared asset. Knowledge moves freely. Context travels with data. Teams understand how their decisions affect one another.

When information flows, intelligence emerges. When information gets trapped, even talented organizations become inefficient.

The cost of silos is not measured in databases. It is measured in decisions.`,
  },
  {
    slug: "leading-analysts-while-still-a-student",
    title: "Leading Analysts While Still a Student",
    dek: "Managing seven analysts before finishing my degree taught me that responsibility arrives before confidence.",
    published: true,
    body: `Managing seven analysts while still completing a degree taught me something unexpected. Responsibility arrives before confidence.

I used to believe leadership was something people earned after accumulating enough experience. Then I found myself leading projects while still worrying about deadlines, exams, and course requirements.

Reality does not wait for readiness. Opportunities appear first. Growth follows.

The experience forced me to develop skills no classroom could fully teach. Communication. Prioritization. Conflict resolution. Expectation management. Decision-making under uncertainty.

Most importantly, it taught me that leadership is not about knowing everything. It is about creating enough clarity for others to move forward.

UP Diliman reinforced this lesson. Being surrounded by ambitious and capable people changes your perspective. You quickly realize that nobody has everything figured out. Even the people you admire most are still learning.

That realization is strangely liberating. It removes the pressure to be perfect. Instead, it encourages progress.

Looking back, one idea captures the entire experience. Sometimes all it takes is a leap of faith. Not blind confidence. Just enough courage to move before certainty arrives.`,
  },
  {
    slug: "building-before-youre-ready",
    title: "Building Before You're Ready",
    dek: "My first real project was a messy Discord bot. Building creates learning faster than preparation does.",
    published: true,
    body: `My first successful project was a Discord bot. Not an AI system. Not a geospatial platform. Not a data pipeline. Just a simple Discord bot.

The code was messy. The design was questionable. The implementation was far from elegant. But it worked.

That project taught me a lesson I still carry today. Building creates learning faster than preparation does.

Many aspiring developers spend years preparing to build. Tutorial after tutorial. Course after course. Certification after certification. Yet they never create anything.

The fear is understandable. Nobody wants to look inexperienced. Nobody wants to fail publicly. But waiting for readiness is often the biggest obstacle to growth.

The projects that shaped my career all began before I felt qualified. The knowledge came afterward.

Technology rewards action. You learn databases by building databases. You learn deployment by deploying. You learn systems by creating systems.

Progress rarely comes from confidence. Confidence usually comes from progress.`,
  },
  {
    slug: "operations-lessons-from-amazon",
    title: "Operations Lessons from Amazon",
    dek: "Scale isn't a technology challenge. It's a systems challenge.",
    published: true,
    body: `Before studying Amazon's fulfillment operations, I thought scale was primarily a technology challenge. I was wrong. Scale is a systems challenge.

Technology matters. Automation matters. Machine learning matters. But none of those things work without disciplined processes connecting them.

What fascinated me most about Amazon's operations was not the robotics. It was the consistency.

Every scan exists for a reason. Every workflow exists for a reason. Every quality control step exists because someone identified a failure mode and built a process to prevent it.

The lesson applies far beyond logistics. Organizations often celebrate exceptional performance. But sustainable success comes from reliable systems.

The best operations do not depend on heroic effort. They depend on predictable execution.

That mindset influenced how I build technology. The goal is not to create systems that succeed when everything goes right. The goal is to create systems that continue working when things inevitably go wrong.

Great operations are invisible. People only notice them when they fail. The challenge is designing them so they rarely do.`,
  },
];

export const publishedEssays = essays.filter((e) => e.published);
export const getEssay = (slug: string) => essays.find((e) => e.slug === slug);

/** Rough reading time from the body word count. */
export function readingTime(body?: string): string {
  if (!body) return "";
  const words = body.trim().split(/\s+/).length;
  return `${Math.max(1, Math.round(words / 200))} min read`;
}
