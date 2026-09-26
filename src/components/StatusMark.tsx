import type { SystemCase } from "@/lib/content/systems";
import { statusAccent } from "@/lib/domain-style";
import { cn } from "@/lib/utils";

/** Status as a field marker: colored dot + mono label. "In Production" breathes. */
export function StatusMark({
  status,
  className,
}: {
  status: SystemCase["status"];
  className?: string;
}) {
  return (
    <span className={cn("inline-flex items-center gap-1.5", className)}>
      <span
        aria-hidden="true"
        className={cn(
          "inline-block h-1.5 w-1.5 rounded-full",
          status === "In Production" && "animate-soft-pulse",
        )}
        style={{ backgroundColor: statusAccent[status] }}
      />
      {status}
    </span>
  );
}

/** "Live" badge for systems with a public deployment. */
export function LiveBadge({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full bg-emerald/10 px-2 py-0.5 text-emerald",
        className,
      )}
    >
      <span aria-hidden="true" className="inline-block h-1.5 w-1.5 rounded-full bg-emerald" />
      Live
    </span>
  );
}
