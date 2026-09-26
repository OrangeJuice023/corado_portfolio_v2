"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

/** Section index for a case study — highlights the section being read. */
export function CaseStudyNav({
  sections,
  variant = "rail",
}: {
  sections: { id: string; label: string }[];
  variant?: "rail" | "inline";
}) {
  const [active, setActive] = useState(sections[0]?.id);

  useEffect(() => {
    const els = sections
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => el !== null);
    const io = new IntersectionObserver(
      (entries) => {
        const hit = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (hit) setActive(hit.target.id);
      },
      { rootMargin: "-20% 0px -65% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [sections]);

  if (variant === "inline") {
    return (
      <nav aria-label="Case study sections" className="-mx-6 overflow-x-auto px-6 scrollbar-none">
        <ol className="flex w-max gap-2">
          {sections.map((s, i) => (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                className="inline-flex min-h-9 items-center gap-1.5 rounded-full border border-line-strong bg-paper px-3 font-mono text-[0.66rem] uppercase tracking-wider text-ink-soft shadow-raised"
              >
                <span className="text-slate">{String(i + 1).padStart(2, "0")}</span>
                {s.label}
              </a>
            </li>
          ))}
        </ol>
      </nav>
    );
  }

  return (
    <nav aria-label="Case study sections">
      <p className="font-mono text-[0.66rem] uppercase tracking-[0.18em] text-slate">On this page</p>
      <ol className="mt-4 space-y-0.5 border-l border-line-strong">
        {sections.map((s, i) => {
          const on = s.id === active;
          return (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                aria-current={on ? "location" : undefined}
                className={cn(
                  "-ml-px flex items-center gap-2.5 border-l-2 py-1.5 pl-4 text-sm transition-colors duration-200",
                  on ? "border-emerald font-medium text-forest" : "border-transparent text-slate hover:text-forest",
                )}
              >
                <span className="font-mono text-[0.66rem] text-slate">{String(i + 1).padStart(2, "0")}</span>
                {s.label}
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
