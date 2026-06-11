import type { Metadata } from "next";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { essays } from "@/lib/content/writing";

export const metadata: Metadata = {
  title: "Writing",
  description: "Essays on data, systems, and decision-making.",
};

export default function WritingPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-20">
      <SectionHeading
        eyebrow="Writing"
        title="Thinking, not just execution"
        sub="Essays on data, systems, organizations, and decisions. Published pieces open; the rest are in the queue."
      />

      <ul className="mt-12">
        {essays.map((e, i) => (
          <Reveal key={e.slug} delay={i * 0.04}>
            <li className="border-b border-line py-7 first:pt-0">
              <h2 className="font-display text-xl font-semibold text-charcoal">
                {e.title}
              </h2>
              <p className="mt-1.5 text-sm leading-relaxed text-slate">{e.dek}</p>
              <p className="mt-2.5 font-mono text-[0.68rem] uppercase tracking-[0.16em] text-sage">
                {e.published && e.date ? e.date : "Coming soon"}
              </p>
            </li>
          </Reveal>
        ))}
      </ul>
    </div>
  );
}
