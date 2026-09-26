import type { Domain } from "@/lib/content/systems";

/**
 * Visual-only mapping: each discipline gets one muted field accent, used as
 * a small mark (dot / stamp) — never as text color. The hero's six clusters
 * reuse the same accents so the landing scene and the Systems page read as
 * one visual system.
 */
export const ACCENT = {
  forest: "#1b4332",
  emerald: "#2d6a4f",
  sage: "#6f8257",
  terracotta: "#b5654a",
  ochre: "#b8893a",
  dusk: "#5b7a93",
  umber: "#7a6a58",
} as const;

export const domainAccent: Record<Domain, string> = {
  "Software Engineering": ACCENT.forest,
  "Analytics & BI": ACCENT.ochre,
  "Data Engineering": ACCENT.dusk,
  "Data Science & ML": ACCENT.terracotta,
  "Research & Experiments": ACCENT.sage,
  Healthcare: ACCENT.emerald,
  Operations: ACCENT.umber,
};

export const statusAccent = {
  "In Production": ACCENT.emerald,
  Shipped: ACCENT.forest,
  Ongoing: ACCENT.ochre,
  Planned: "#94a3b8",
} as const;
