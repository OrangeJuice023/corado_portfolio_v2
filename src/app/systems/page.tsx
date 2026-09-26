import type { Metadata } from "next";
import { SectionHeading } from "@/components/SectionHeading";
import { TopoLines } from "@/components/field/TopoLines";
import { SystemsExplorer } from "./SystemsExplorer";

export const metadata: Metadata = {
  alternates: { canonical: "/systems" },
  title: "Systems",
  description:
    "Software, analytics, data, and AI systems — one body of work, filterable by discipline.",
};

export default function SystemsPage() {
  return (
    <div className="relative isolate">
      <TopoLines
        fade seed={11}
        className="absolute right-0 top-0 -z-10 h-72 w-full max-w-2xl text-sage/50"
      />
      <div className="mx-auto max-w-6xl px-6 py-20">
        <SectionHeading
          as="h1"
          eyebrow="Systems"
          title="One body of work, many disciplines"
          sub="Every system here exists because something real was broken. Filter by discipline — software engineering, analytics, data engineering, ML — to find the work most relevant to you."
        />
        <div className="mt-12">
          <SystemsExplorer />
        </div>
      </div>
    </div>
  );
}
