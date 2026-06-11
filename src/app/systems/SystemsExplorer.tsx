"use client";

import { useState } from "react";
import { SystemCard } from "@/components/SystemCard";
import { systems, allDomains, type Domain } from "@/lib/content/systems";
import { cn } from "@/lib/utils";

/**
 * One unified list, filtered by DISCIPLINE TAGS — recruiters can scan by
 * craft (Software Engineering, Data Engineering, ...) without the portfolio
 * fragmenting into separate pages.
 */
export function SystemsExplorer() {
  const [active, setActive] = useState<Domain | "All">("All");

  const visible =
    active === "All" ? systems : systems.filter((s) => s.domains.includes(active));

  return (
    <div>
      <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by discipline">
        {(["All", ...allDomains] as const).map((d) => (
          <button
            key={d}
            type="button"
            onClick={() => setActive(d)}
            aria-pressed={active === d}
            className={cn(
              "cursor-pointer rounded-full border px-4 py-1.5 font-mono text-xs uppercase tracking-wider transition-colors duration-200",
              active === d
                ? "border-forest bg-forest text-warm"
                : "border-line bg-transparent text-slate hover:border-emerald hover:text-forest",
            )}
          >
            {d}
          </button>
        ))}
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {visible.map((s) => (
          <SystemCard key={s.slug} system={s} />
        ))}
      </div>
      {visible.length === 0 && (
        <p className="mt-10 text-slate">Nothing in this discipline yet — soon.</p>
      )}
    </div>
  );
}
