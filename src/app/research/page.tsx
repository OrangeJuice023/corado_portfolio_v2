import type { Metadata } from "next";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Research & AI",
  description:
    "Applied AI work: retrieval, agent reasoning, and production LLM systems, grounded in shipped projects.",
};

/** Every entry ties to a real, shipped system. No roadmap, no unclaimed work. */
const current = [
  {
    title: "Retrieval & Grounded Generation",
    desc: "BM25 retrieval over a 235-chunk corpus grounds every claim in The Big One's query layer in a source document, not model memory. The corpus documents its own verification failures, which turned out to be a retrieval hazard worth designing around.",
    link: "/systems/the-big-one",
  },
  {
    title: "Agent Reasoning & Guardrails",
    desc: "UGAT runs a live agent through an explicit reasoning loop (hypotheses, evidence, confidence, diagnosis) constrained to attribute causes to systems rather than people. This site's own assistant runs the same two-model pattern: a guardrail model classifies every message against a plain-English policy before the main model responds.",
    link: "/systems/ugat",
  },
  {
    title: "Multi-Provider LLM Routing",
    desc: "Landas AI routes through Gemini with an OpenRouter fallback so a single provider outage doesn't take down career recommendations. Himay and LabSim both run on Groq's free tier, the same constraint that shaped this site's chat architecture.",
    link: "/systems/landas-ai",
  },
  {
    title: "Applied Statistical Learning",
    desc: "The Big One's loss model learns fragility parameters via approximate Bayesian computation rather than expert guesses, then validates out-of-sample against an earthquake the model never saw. A gradient-boosted baseline, trained to test the alternative, came in 113x low.",
    link: "/systems/the-big-one",
  },
];

export default function ResearchPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-20">
      <SectionHeading
        eyebrow="Research & AI"
        title="Curiosity, applied"
        sub="Retrieval, agent reasoning, and statistical learning — each tied to a system that actually shipped."
      />

      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {current.map((item, i) => (
          <Reveal key={item.title} delay={i * 0.05}>
            <a href={item.link} className="block h-full rounded-[18px] border border-line bg-white/55 p-7 transition hover:border-sage/60">
              <h3 className="font-display text-lg font-semibold text-charcoal">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate">{item.desc}</p>
            </a>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
