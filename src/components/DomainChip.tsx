import type { Domain } from "@/lib/content/systems";
import { domainAccent } from "@/lib/domain-style";
import { cn } from "@/lib/utils";

/** Discipline tag with its field-accent dot. */
export function DomainChip({
  domain,
  as: Tag = "li",
  className,
}: {
  domain: Domain;
  as?: "li" | "span";
  className?: string;
}) {
  return (
    <Tag className={cn("chip", className)}>
      <span
        aria-hidden="true"
        className="inline-block h-1.5 w-1.5 shrink-0 rounded-full"
        style={{ backgroundColor: domainAccent[domain] }}
      />
      {domain}
    </Tag>
  );
}
