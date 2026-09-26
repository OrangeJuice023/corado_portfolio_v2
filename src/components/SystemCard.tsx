import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { SystemCase } from "@/lib/content/systems";
import { DomainChip } from "./DomainChip";
import { LiveBadge, StatusMark } from "./StatusMark";
import { cn } from "@/lib/utils";

/**
 * Field-note card. Scan order: org/status → title → problem → solution →
 * impact (highlighted) → disciplines. All copy comes straight from content.
 */
const ROWS = [
  { key: "problem", label: "Problem", mark: "bg-terracotta" },
  { key: "solution", label: "Solution", mark: "bg-emerald" },
] as const;

export function SystemCard({
  system,
  index,
  className,
}: {
  system: SystemCase;
  index?: number;
  className?: string;
}) {
  return (
    <Link
      href={`/systems/${system.slug}`}
      className={cn(
        "surface-paper surface-lift group relative flex h-full min-w-0 cursor-pointer flex-col p-6 sm:p-7",
        className,
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 font-mono text-[0.66rem] uppercase tracking-[0.14em] text-slate">
          <p className="flex flex-wrap gap-x-1.5">
            {system.org.split(" · ").map((part, k, all) => (
              <span key={part} className="whitespace-nowrap">
                {part}
                {k < all.length - 1 && " ·"}
              </span>
            ))}
          </p>
          <p className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1">
            {index !== undefined && (
              <span className="text-slate">No. {String(index + 1).padStart(2, "0")}</span>
            )}
            <StatusMark status={system.status} className="text-ink-soft" />
            {system.liveUrl && <LiveBadge />}
          </p>
        </div>
        <span
          aria-hidden="true"
          className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-line-strong bg-warm text-slate shadow-raised transition-all duration-200 group-hover:border-emerald/40 group-hover:bg-forest group-hover:text-warm"
        >
          <ArrowUpRight
            size={16}
            className="transition-transform duration-200 group-hover:-translate-y-px group-hover:translate-x-px"
          />
        </span>
      </div>

      <h3 className="font-display mt-4 text-xl font-semibold leading-snug text-charcoal transition-colors duration-200 group-hover:text-forest sm:text-[1.35rem]">
        {system.title}
      </h3>

      <dl className="mt-5 space-y-4 text-sm leading-relaxed">
        {ROWS.map((row) => (
          <div key={row.key} className="grid grid-cols-[auto_minmax(0,1fr)] gap-x-3">
            <span aria-hidden="true" className={cn("mt-[0.45rem] h-1.5 w-1.5 rounded-full", row.mark)} />
            <div>
              <dt className="font-mono text-[0.64rem] uppercase tracking-[0.16em] text-slate">
                {row.label}
              </dt>
              <dd className="mt-1 text-ink-soft">{system[row.key]}</dd>
            </div>
          </div>
        ))}
        <div className="grid grid-cols-[auto_minmax(0,1fr)] gap-x-3 rounded-xl border border-dashed border-sage/60 bg-forest-50/60 px-3 py-3">
          <span aria-hidden="true" className="mt-[0.45rem] h-1.5 w-1.5 rounded-full bg-ochre" />
          <div>
            <dt className="font-mono text-[0.64rem] uppercase tracking-[0.16em] text-emerald">Impact</dt>
            <dd className="mt-1 font-medium text-forest">{system.impact[0]}</dd>
          </div>
        </div>
      </dl>

      <ul className="mt-auto flex flex-wrap gap-1.5 pt-6" aria-label="Disciplines">
        {system.domains.map((d) => (
          <DomainChip key={d} domain={d} />
        ))}
      </ul>
    </Link>
  );
}
