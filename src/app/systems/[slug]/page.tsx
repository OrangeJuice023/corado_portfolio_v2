import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";
import { systems, getSystem } from "@/lib/content/systems";

export function generateStaticParams() {
  return systems.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const system = getSystem(slug);
  return system
    ? { title: system.title, description: system.problem }
    : { title: "System" };
}

function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <section className="mt-12">
      <h2 className="eyebrow">{label}</h2>
      <div className="mt-3 max-w-2xl text-base leading-relaxed text-charcoal">
        {children}
      </div>
    </section>
  );
}

export default async function SystemDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const system = getSystem(slug);
  if (!system) notFound();

  return (
    <article className="mx-auto max-w-4xl px-6 py-20">
      <Link
        href="/systems"
        className="group inline-flex cursor-pointer items-center gap-1.5 text-sm text-slate transition-colors duration-200 hover:text-forest"
      >
        <ArrowLeft size={14} className="transition-transform duration-200 group-hover:-translate-x-0.5" />
        All systems
      </Link>

      <p className="mt-8 font-mono text-xs uppercase tracking-[0.16em] text-slate">
        {system.org} · {system.status}
      </p>
      <h1 className="font-display mt-3 text-h2 font-semibold text-charcoal">
        {system.title}
      </h1>
      <ul className="mt-5 flex flex-wrap gap-2" aria-label="Disciplines">
        {system.domains.map((d) => (
          <li key={d} className="rounded-full bg-forest-50 px-2.5 py-1 font-mono text-[0.65rem] uppercase tracking-wider text-emerald">
            {d}
          </li>
        ))}
      </ul>

      {system.image && (
        <div className="mt-8 overflow-hidden rounded-[18px] border border-line">
          <img
            src={system.image}
            alt={`${system.title} — screenshot`}
            className="h-auto w-full"
            loading="lazy"
          />
        </div>
      )}

      {(system.liveUrl || system.repoUrl) && (
        <div className="mt-6 flex flex-wrap items-center gap-4">
          {system.liveUrl && (
            <a
              href={system.liveUrl}
              target={system.liveUrl.startsWith("http") ? "_blank" : undefined}
              rel={system.liveUrl.startsWith("http") ? "noopener noreferrer" : undefined}
              className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-forest px-5 py-2.5 text-sm font-medium text-warm transition-colors duration-200 hover:bg-emerald"
            >
              <ExternalLink size={14} />
              View Live
            </a>
          )}
          {system.repoUrl && (
            <a
              href={system.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-forest px-5 py-2.5 text-sm font-medium text-forest transition-colors duration-200 hover:bg-forest hover:text-warm"
            >
              <Github size={14} />
              View Source
            </a>
          )}
        </div>
      )}

      <Section label="Problem">{system.problem}</Section>
      <Section label="Context">{system.study.context}</Section>
      <Section label="Solution">{system.solution}</Section>

      {system.study.challenges.length > 0 && (
        <Section label="Challenges">
          <ul className="list-disc space-y-1.5 pl-5">
            {system.study.challenges.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </Section>
      )}

      <Section label="Architecture">{system.study.architecture}</Section>
      <Section label="Results">{system.study.results}</Section>

      <Section label="Impact">
        <ul className="list-disc space-y-1.5 pl-5">
          {system.impact.map((i) => (
            <li key={i}>{i}</li>
          ))}
        </ul>
      </Section>

      {system.study.lessons.length > 0 && (
        <Section label="Lessons Learned">
          <ul className="list-disc space-y-1.5 pl-5">
            {system.study.lessons.map((l) => (
              <li key={l}>{l}</li>
            ))}
          </ul>
        </Section>
      )}

      <Section label="Tech Stack">
        <p className="font-mono text-sm">{system.tech.join(" · ")}</p>
      </Section>
    </article>
  );
}
