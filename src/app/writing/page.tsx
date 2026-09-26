import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { TopoLines } from "@/components/field/TopoLines";
import { essays, readingTime } from "@/lib/content/writing";

export const metadata: Metadata = pageMetadata({
  title: "Writing",
  description:
    "Essays on data, systems, organizations, and decision-making.",
  path: "/writing",
});

export default function WritingPage() {
  return (
    <div className="relative isolate">
      <TopoLines fade seed={41} className="absolute right-0 top-0 -z-10 h-80 w-full max-w-2xl text-sage/45" />
      <div className="mx-auto max-w-3xl px-6 py-20">
        <SectionHeading
          as="h1"
          eyebrow="Writing"
          title="Thinking, not just execution"
          sub="Essays on data, systems, organizations, and the decisions they shape."
        />

        <ol className="mt-12">
          {essays.map((e, i) => {
            const num = (
              <span aria-hidden="true" className="font-mono text-[0.68rem] tabular-nums text-slate">
                {String(i + 1).padStart(2, "0")}
              </span>
            );
            return (
              <li key={e.slug} className="border-b border-line first:border-t">
                <Reveal delay={Math.min(i, 4) * 0.04}>
                  {e.published ? (
                    <Link
                      href={`/writing/${e.slug}`}
                      className="group -mx-4 grid cursor-pointer grid-cols-[2rem_1fr_auto] gap-x-3 rounded-2xl px-4 py-7 transition-colors duration-200 hover:bg-paper sm:grid-cols-[2.5rem_1fr_auto]"
                    >
                      <span className="pt-1.5">{num}</span>
                      <div>
                        <h2 className="font-display text-xl font-semibold leading-snug text-charcoal transition-colors duration-200 group-hover:text-forest">
                          {e.title}
                        </h2>
                        <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">{e.dek}</p>
                        <p className="mt-3 flex items-center gap-2 font-mono text-[0.66rem] uppercase tracking-[0.16em] text-sage-deep">
                          <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-sage" />
                          {readingTime(e.body)}
                        </p>
                      </div>
                      <span
                        aria-hidden="true"
                        className="mt-0.5 grid h-9 w-9 place-items-center rounded-full border border-line-strong bg-warm text-slate shadow-raised transition-all duration-200 group-hover:bg-forest group-hover:text-warm"
                      >
                        <ArrowUpRight size={16} />
                      </span>
                    </Link>
                  ) : (
                    <div className="grid grid-cols-[2rem_1fr] gap-x-3 py-7 sm:grid-cols-[2.5rem_1fr]">
                      <span className="pt-1.5">{num}</span>
                      <div>
                        <h2 className="font-display text-xl font-semibold text-charcoal">{e.title}</h2>
                        <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">{e.dek}</p>
                        <p className="mt-3 font-mono text-[0.66rem] uppercase tracking-[0.16em] text-sage-deep">
                          Coming soon
                        </p>
                      </div>
                    </div>
                  )}
                </Reveal>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}
