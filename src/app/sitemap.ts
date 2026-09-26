import type { MetadataRoute } from "next";
import { profile } from "@/lib/content/profile";
import { systems } from "@/lib/content/systems";
import { publishedEssays } from "@/lib/content/writing";

/** Public, canonical routes only — no API routes, no ?discipline= variants. */
export default function sitemap(): MetadataRoute.Sitemap {
  const url = (path: string) => (path === "/" ? profile.siteUrl : `${profile.siteUrl}${path}`);
  return [
    { url: url("/"), changeFrequency: "monthly", priority: 1 },
    { url: url("/systems"), changeFrequency: "monthly", priority: 0.9 },
    ...systems.map((s) => ({ url: url(`/systems/${s.slug}`), changeFrequency: "monthly" as const, priority: 0.8 })),
    { url: url("/about"), changeFrequency: "yearly", priority: 0.7 },
    { url: url("/resume"), changeFrequency: "monthly", priority: 0.7 },
    { url: url("/research"), changeFrequency: "monthly", priority: 0.6 },
    { url: url("/certifications"), changeFrequency: "monthly", priority: 0.6 },
    { url: url("/writing"), changeFrequency: "monthly", priority: 0.6 },
    ...publishedEssays.map((e) => ({ url: url(`/writing/${e.slug}`), changeFrequency: "yearly" as const, priority: 0.5 })),
    { url: url("/contact"), changeFrequency: "yearly", priority: 0.5 },
  ];
}
