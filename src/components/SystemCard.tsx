import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { SystemCase } from "@/lib/content/systems";

export function SystemCard({ system }: { system: SystemCase }) {
  return (
    <Link
      href={`/systems/${system.slug}`}
      className="group flex h-full cursor-pointer flex-col rounded-[18px] border border-line bg-white/55 p-7 transition-all duration-200 hover:-translate-y-0.5 hover:border-emerald/40 hover:shadow-[0_12px_40px_-18px_rgba(27,67,50,0.25)]"
    >
      <div className="flex items-start justify-between gap-4">
        <p className="font-mono text-[0.68rem] uppercase tracking-[0.16em] text-slate">
          {system.org} · {system.status}
          {system.liveUrl && (
            <span className="ml-2 inline-flex items-center gap-1 rounded-full bg-emerald/10 px-2 py-0.5 text-emerald">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald" aria-hidden="true" />
              Live
            </span>
          )}
        </p>
        <ArrowUpRight
          size={18}
          className="shrink-0 text-slate transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-forest"
        />
      </div>

      <h3 className="font-display mt-3 text-xl font-semibold text-charcoal">
        {system.title}
      </h3>

      <dl className="mt-4 space-y-3 text-sm leading-relaxed">
        <div>
          <dt className="font-medium text-forest">Problem</dt>
          <dd className="mt-0.5 text-slate">{system.problem}</dd>
        </div>
        <div>
          <dt className="font-medium text-forest">Solution</dt>
          <dd className="mt-0.5 text-slate">{system.solution}</dd>
        </div>
        <div>
          <dt className="font-medium text-forest">Impact</dt>
          <dd className="mt-0.5 text-slate">{system.impact[0]}</dd>
        </div>
      </dl>

      <ul className="mt-auto flex flex-wrap gap-2 pt-5" aria-label="Disciplines">
        {system.domains.map((d) => (
          <li
            key={d}
            className="rounded-full bg-forest-50 px-2.5 py-1 font-mono text-[0.65rem] uppercase tracking-wider text-emerald"
          >
            {d}
          </li>
        ))}
      </ul>
    </Link>
  );
}
