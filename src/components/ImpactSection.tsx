import { metrics } from "@/lib/content/impact";
import { CountUp } from "./CountUp";
import { Reveal } from "./Reveal";
import { TopoLines } from "./field/TopoLines";

export function ImpactSection() {
  return (
    <section className="relative isolate overflow-hidden bg-forest" aria-label="Impact">
      <TopoLines seed={3} hills={3} rings={8} className="absolute inset-0 -z-10 h-full w-full text-sage/15" />
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-24">
        <Reveal>
          <p className="eyebrow flex items-center gap-3 !text-sage">
            <span aria-hidden="true" className="inline-block h-2 w-2 rounded-full bg-sage" />
            Impact
            <span aria-hidden="true" className="h-px w-16 bg-sage/30" />
          </p>
        </Reveal>
        <dl className="mt-10 grid grid-cols-2 border-t border-sage/20 md:grid-cols-4">
          {metrics.map((m, i) => (
            <Reveal
              key={m.label}
              delay={i * 0.07}
              className="flex flex-col-reverse justify-end border-b border-sage/20 py-8 pr-4 odd:border-r even:pl-4 md:border-b-0 md:border-r md:px-6 md:first:pl-0 md:last:border-r-0 md:even:pl-6"
            >
              <dt className="mt-3 max-w-[14rem] text-sm leading-snug text-sage">
                {m.label}
                <span aria-hidden="true" className="mt-4 block font-mono text-[0.66rem] tracking-[0.2em] text-sage/60">
                  {String(i + 1).padStart(2, "0")} / {String(metrics.length).padStart(2, "0")}
                </span>
              </dt>
              <dd className="font-display text-4xl font-semibold tabular-nums text-warm md:text-5xl">
                <CountUp
                  value={m.value}
                  prefix={m.prefix}
                  suffix={m.suffix}
                  suffixClassName={m.suffix && m.suffix.length > 2 ? "ml-1 text-[0.5em] tracking-normal" : undefined}
                />
              </dd>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}
