"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { SystemCard } from "@/components/SystemCard";
import { systems, allDomains, type Domain } from "@/lib/content/systems";
import { domainAccent } from "@/lib/domain-style";
import { cn } from "@/lib/utils";

/**
 * One unified list, filtered by DISCIPLINE TAGS — recruiters can scan by
 * craft (Software Engineering, Data Engineering, ...) without the portfolio
 * fragmenting into separate pages. The active filter is mirrored to
 * ?discipline= so a filtered view can be linked to.
 */
type Filter = Domain | "All";

const counts = Object.fromEntries(
  allDomains.map((d) => [d, systems.filter((s) => s.domains.includes(d)).length]),
) as Record<Domain, number>;

export function SystemsExplorer() {
  const [active, setActive] = useState<Filter>("All");
  const reduced = useReducedMotion();

  useEffect(() => {
    const q = new URLSearchParams(window.location.search).get("discipline");
    if (q && (allDomains as string[]).includes(q)) setActive(q as Domain);
  }, []);

  function select(d: Filter) {
    setActive(d);
    const url = new URL(window.location.href);
    if (d === "All") url.searchParams.delete("discipline");
    else url.searchParams.set("discipline", d);
    window.history.replaceState(null, "", url);
  }

  const visible =
    active === "All" ? systems : systems.filter((s) => s.domains.includes(active));

  return (
    <div>
      <div className="-mx-6 overflow-x-auto px-6 pb-2 scrollbar-none [mask-image:linear-gradient(to_right,black_85%,transparent)] sm:mx-0 sm:overflow-visible sm:px-0 sm:[mask-image:none]">
        <div
          className="flex w-max gap-2 sm:w-auto sm:flex-wrap"
          role="group"
          aria-label="Filter by discipline"
        >
          {(["All", ...allDomains] as const).map((d) => {
            const on = active === d;
            return (
              <button
                key={d}
                type="button"
                onClick={() => select(d)}
                aria-pressed={on}
                className={cn(
                  "inline-flex min-h-10 shrink-0 cursor-pointer items-center gap-2 rounded-full border px-3.5 py-2 font-mono text-[0.7rem] uppercase tracking-wider transition-all duration-200",
                  on
                    ? "border-forest/30 bg-warm-200 text-forest shadow-pressed"
                    : "border-line-strong bg-paper text-ink-soft shadow-raised hover:-translate-y-px hover:border-emerald/40 hover:text-forest",
                )}
              >
                <span
                  aria-hidden="true"
                  className={cn("inline-block h-1.5 w-1.5 rounded-full", d === "All" && "bg-forest")}
                  style={d === "All" ? undefined : { backgroundColor: domainAccent[d] }}
                />
                {d}
                <span className={cn("tabular-nums", on ? "text-emerald" : "text-slate")}>
                  {d === "All" ? systems.length : counts[d]}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <p className="mt-6 font-mono text-[0.7rem] uppercase tracking-[0.16em] text-ink-soft" aria-live="polite">
        Showing {visible.length} of {systems.length} systems
        {active !== "All" && <> · {active}</>}
      </p>

      <motion.div layout={!reduced} className="mt-6 grid gap-6 md:grid-cols-2">
        <AnimatePresence mode="popLayout" initial={false}>
          {visible.map((s) => (
            <motion.div
              key={s.slug}
              className="min-w-0"
              layout={!reduced}
              initial={reduced ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduced ? undefined : { opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.3, ease: [0.21, 0.6, 0.35, 1] }}
            >
              <SystemCard system={s} index={systems.indexOf(s)} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
      {visible.length === 0 && (
        <p className="mt-10 text-slate">Nothing in this discipline yet — soon.</p>
      )}
    </div>
  );
}
