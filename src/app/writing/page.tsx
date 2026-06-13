import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { essays, readingTime } from "@/lib/content/writing";

export const metadata: Metadata = {
  title: "Writing",
  description: "Essays on data, systems, organizations, and decision-making.",
};

export default function WritingPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-20">
      <SectionHeading
        eyebrow="Writing"
        title="Thinking, not just execution"
        sub="Essays on data, systems, organizations, and the decisions they shape."
      />

      <ul className="mt-12">
        {essays.map((e, i) => (
          <Reveal key={e.slug} delay={i * 0.04}>
            <li className="border-b border-line first:border-t">
              {e.published ? (
                <Link
                  href={`/writing/${e.slug}`}
                  className="group block cursor-pointer py-7"
                >
                  <div className="flex items-start justify-between gap-4">
                    <h2 className="font-display text-xl font-semibold text-charcoal transition-colors duration-200 group-hover:text-forest">
                      {e.title}
                    </h2>
                    <ArrowUpRight
                      size={18}
                      className="mt-1 shrink-0 text-slate transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-forest"
                    />
                  </div>
                  <p className="mt-1.5 text-sm leading-relaxed text-slate">{e.dek}</p>
                  <p className="mt-2.5 font-mono text-[0.68rem] uppercase tracking-[0.16em] text-sage">
                    {readingTime(e.body)}
                  </p>
                </Link>
              ) : (
                <div className="py-7">
                  <h2 className="font-display text-xl font-semibold text-charcoal">
                    {e.title}
                  </h2>
                  <p className="mt-1.5 text-sm leading-relaxed text-slate">{e.dek}</p>
                  <p className="mt-2.5 font-mono text-[0.68rem] uppercase tracking-[0.16em] text-sage">
                    Coming soon
                  </p>
                </div>
              )}
            </li>
          </Reveal>
        ))}
      </ul>
    </div>
  );
}
