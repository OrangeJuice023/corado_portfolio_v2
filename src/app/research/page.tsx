import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { TopoLines } from "@/components/field/TopoLines";
import { getSystem } from "@/lib/content/systems";

export const metadata: Metadata = {
  alternates: { canonical: "/research" },
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
    <div className="relative isolate">
      <TopoLines fade seed={37} className="absolute right-0 top-0 -z-10 h-80 w-full max-w-2xl text-sage/45" />
      <div className="mx-auto max-w-6xl px-6 py-20">
        <SectionHeading
          as="h1"
          eyebrow="Research & AI"
          title="Curiosity, applied"
          sub="Retrieval, agent reasoning, and statistical learning — each tied to a system that actually shipped."
        />

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {current.map((item, i) => {
            const system = getSystem(item.link.replace("/systems/", ""));
            return (
              <Reveal key={item.title} delay={(i % 2) * 0.06}>
                <Link href={item.link} className="surface-paper surface-lift group flex h-full flex-col p-7">
                  <div className="flex items-start justify-between gap-4">
                    <span className="font-mono text-[0.66rem] tracking-[0.2em] text-slate">
                      {String(i + 1).padStart(2, "0")} / {String(current.length).padStart(2, "0")}
                    </span>
                    <span
                      aria-hidden="true"
                      className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-line-strong bg-warm text-slate shadow-raised transition-all duration-200 group-hover:bg-forest group-hover:text-warm"
                    >
                      <ArrowUpRight size={16} />
                    </span>
                  </div>
                  <h2 className="font-display mt-3 text-xl font-semibold text-charcoal transition-colors duration-200 group-hover:text-forest">
                    {item.title}
                  </h2>
                  <p className="mb-6 mt-3 text-sm leading-relaxed text-ink-soft">{item.desc}</p>
                  {system && (
                    <p className="mt-auto flex items-center gap-2 border-t border-dashed border-sage/60 pt-4 font-mono text-[0.64rem] uppercase tracking-[0.14em] text-emerald">
                      <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-ochre" />
                      <span className="sr-only">Related system: </span>
                      {system.title}
                    </p>
                  )}
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </div>
  );
}
