import type { Metadata } from "next";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Research & AI",
  description:
    "Applied AI work today; a research roadmap for later. Nothing claimed before it exists.",
};

/** CURRENT = real applied work. ROADMAP = clearly labeled future, no claims. */
const current = [
  { title: "RAG Pipelines", desc: "Retrieval-augmented systems that ground LLM answers in real documents — built for reliability, not demos." },
  { title: "OCR Systems", desc: "Document intelligence: turning scans and PDFs into structured, queryable data." },
  { title: "LLM Applications", desc: "Production LLM features with guardrails, evaluation, and human-in-the-loop design — including this site's assistant." },
  { title: "Prompt Engineering", desc: "Systematic experiments in instruction design, structured outputs, and failure modes." },
];

const roadmap = [
  "CAIR Research Fellowship",
  "Research Notes",
  "Experimental Prototypes",
  "Publications",
];

export default function ResearchPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-20">
      <SectionHeading
        eyebrow="Research & AI"
        title="Curiosity, applied"
        sub="What's here now is applied AI work I've actually built. The research track below is a roadmap — clearly labeled, with nothing claimed before it exists."
      />

      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {current.map((item, i) => (
          <Reveal key={item.title} delay={i * 0.05}>
            <div className="h-full rounded-[18px] border border-line bg-white/55 p-7">
              <h3 className="font-display text-lg font-semibold text-charcoal">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate">{item.desc}</p>
            </div>
          </Reveal>
        ))}
      </div>

      <div className="mt-20">
        <SectionHeading
          eyebrow="Roadmap — not yet started"
          title="The research track ahead"
          sub="Expected to begin around August–September 2026 with the CAIR fellowship. This section stays empty until real outputs exist — by design."
        />
        <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {roadmap.map((f) => (
            <li
              key={f}
              className="rounded-xl border border-dashed border-sage/60 px-5 py-4 font-mono text-xs uppercase tracking-wider text-slate"
            >
              {f}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
