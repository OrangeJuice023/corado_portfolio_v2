import { metrics } from "@/lib/content/impact";
import { CountUp } from "./CountUp";
import { Reveal } from "./Reveal";

export function ImpactSection() {
  return (
    <section className="bg-forest" aria-label="Impact">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <Reveal>
          <p className="eyebrow !text-sage">Impact</p>
        </Reveal>
        <dl className="mt-10 grid grid-cols-2 gap-x-8 gap-y-12 md:grid-cols-4">
          {metrics.map((m, i) => (
            <Reveal key={m.label} delay={i * 0.07}>
              <div>
                <dt className="sr-only">{m.label}</dt>
                <dd className="font-display text-4xl font-semibold text-warm md:text-5xl">
                  <CountUp value={m.value} prefix={m.prefix} suffix={m.suffix} />
                </dd>
                <p className="mt-2 text-sm leading-snug text-sage">{m.label}</p>
              </div>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}
