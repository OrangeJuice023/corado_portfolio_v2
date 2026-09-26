import { cn } from "@/lib/utils";

/**
 * Field-note primitives: hand-drawn underline, curved arrow, emphasis ticks,
 * and a handwritten margin note. All decorative (aria-hidden) — anything a
 * reader must know lives in real text elsewhere.
 */

export function HandUnderline({
  className,
  strokeWidth = 3,
}: {
  className?: string;
  strokeWidth?: number;
}) {
  return (
    <svg
      viewBox="0 0 300 20"
      preserveAspectRatio="none"
      aria-hidden="true"
      focusable="false"
      className={cn("pointer-events-none", className)}
    >
      <path
        d="M4 13 C 60 6, 120 5, 180 9 S 270 14, 296 7"
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

export function CurvedArrow({
  className,
  flip = false,
}: {
  className?: string;
  flip?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 60 40"
      aria-hidden="true"
      focusable="false"
      className={cn("pointer-events-none", className)}
      style={flip ? { transform: "scaleX(-1)" } : undefined}
    >
      <g fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 6 C 14 30, 34 36, 54 28" />
        <path d="M45 22 L 55 28 L 45 34" />
      </g>
    </svg>
  );
}

/** The little "\ | /" marks illustrators put above a speaking figure. */
export function EmphasisMarks({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 30 18"
      aria-hidden="true"
      focusable="false"
      className={cn("pointer-events-none", className)}
    >
      <g stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
        <path d="M5 14 L 2 5" />
        <path d="M15 13 L 15 2" />
        <path d="M25 14 L 28 5" />
      </g>
    </svg>
  );
}

export function Annotation({
  children,
  className,
  arrow,
}: {
  children: React.ReactNode;
  className?: string;
  arrow?: "left" | "right";
}) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "font-hand pointer-events-none inline-flex select-none items-end gap-1 text-lg leading-none text-emerald",
        className,
      )}
    >
      {arrow === "left" && <CurvedArrow flip className="h-6 w-9 -scale-y-100" />}
      <span>{children}</span>
      {arrow === "right" && <CurvedArrow className="h-6 w-9 -scale-y-100" />}
    </span>
  );
}
