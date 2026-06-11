import type { Metadata } from "next";
import { SectionHeading } from "@/components/SectionHeading";
import { SystemsExplorer } from "./SystemsExplorer";

export const metadata: Metadata = {
  title: "Systems",
  description:
    "Software, analytics, data, and AI systems — one body of work, filterable by discipline.",
};

export default function SystemsPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-20">
      <SectionHeading
        eyebrow="Systems"
        title="One body of work, many disciplines"
        sub="Every system here exists because something real was broken. Filter by discipline — software engineering, analytics, data engineering, ML — to find the work most relevant to you."
      />
      <div className="mt-12">
        <SystemsExplorer />
      </div>
    </div>
  );
}
