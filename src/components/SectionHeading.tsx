import { Reveal } from "./Reveal";
import { cn } from "@/lib/utils";

/**
 * Editorial section heading with a field-note eyebrow:
 *   ● 01 — EYEBROW ————
 * Use `as="h1"` for a page's top heading so every route has one h1.
 */
export function SectionHeading({
  eyebrow,
  title,
  sub,
  index,
  as: Heading = "h2",
  tone = "light",
  className,
}: {
  eyebrow: string;
  title: string;
  sub?: string;
  index?: string;
  as?: "h1" | "h2";
  tone?: "light" | "dark";
  className?: string;
}) {
  const dark = tone === "dark";
  return (
    <Reveal className={className}>
      <p className={cn("eyebrow flex items-center gap-3", dark && "!text-sage")}>
        <span
          aria-hidden="true"
          className={cn("inline-block h-2 w-2 shrink-0 rounded-full", dark ? "bg-sage" : "bg-emerald")}
        />
        {index && (
          <span className={dark ? "text-sage/70" : "text-slate"}>
            {index} <span aria-hidden="true">—</span>
          </span>
        )}
        <span>{eyebrow}</span>
        <span
          aria-hidden="true"
          className={cn("h-px w-10 shrink-0 sm:w-16", dark ? "bg-sage/30" : "bg-line-strong")}
        />
      </p>
      <Heading
        className={cn(
          "font-display mt-4 text-h2 font-semibold",
          dark ? "text-warm" : "text-charcoal",
        )}
      >
        {title}
      </Heading>
      {sub && (
        <p className={cn("mt-4 max-w-2xl text-base leading-relaxed", dark ? "text-sage" : "text-ink-soft")}>
          {sub}
        </p>
      )}
    </Reveal>
  );
}
