import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight, ExternalLink, Github } from "lucide-react";
import { systems, getSystem } from "@/lib/content/systems";
import { DomainChip } from "@/components/DomainChip";
import { LiveBadge, StatusMark } from "@/components/StatusMark";
import { CaseStudyNav } from "@/components/CaseStudyNav";
import { TopoLines } from "@/components/field/TopoLines";
import { cn } from "@/lib/utils";

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
    ? {
        title: system.title,
        description: system.problem,
        alternates: { canonical: `/systems/${system.slug}` },
      }
    : { title: "System" };
}

function Section({
  id,
  index,
  label,
  children,
}: {
  id: string;
  index: number;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24 border-t border-line pt-8 first:border-t-0 first:pt-0" aria-labelledby={`${id}-h`}>
      <h2 id={`${id}-h`} className="eyebrow flex items-center gap-3">
        <span className="text-slate">{String(index).padStart(2, "0")}</span>
        {label}
      </h2>
      <div className="mt-4 max-w-[68ch] text-base leading-[1.75] text-charcoal">{children}</div>
    </section>
  );
}

/** Callout for the two framing sections (Problem / Solution). */
function Callout({ tone, children }: { tone: "problem" | "solution"; children: React.ReactNode }) {
  return (
    <div
      className={cn(
        "rounded-2xl border px-5 py-5 text-[1.05rem] leading-[1.7] sm:px-6",
        tone === "problem"
          ? "border-terracotta/25 bg-terracotta/[0.05]"
          : "border-emerald/25 bg-forest-50/70",
      )}
    >
      {children}
    </div>
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

  const i = systems.indexOf(system);
  const prev = systems[i - 1];
  const next = systems[i + 1];
  const { study } = system;

  const sections = [
    { id: "problem", label: "Problem" },
    { id: "context", label: "Context" },
    { id: "solution", label: "Solution" },
    ...(study.challenges.length > 0 ? [{ id: "challenges", label: "Challenges" }] : []),
    { id: "architecture", label: "Architecture" },
    { id: "results", label: "Results" },
    { id: "impact", label: "Impact" },
    ...(study.lessons.length > 0 ? [{ id: "lessons", label: "Lessons Learned" }] : []),
    { id: "tech", label: "Tech Stack" },
  ];
  const n = (id: string) => sections.findIndex((s) => s.id === id) + 1;

  return (
    <>
      <div aria-hidden="true" className="read-progress" />
      <article className="relative isolate">
        <TopoLines fade seed={i + 5} className="absolute right-0 top-0 -z-10 h-80 w-full max-w-3xl text-sage/40" />

        <div className="mx-auto max-w-6xl px-6 pb-20 pt-12 lg:pt-16">
          <Link
            href="/systems"
            className="group inline-flex min-h-10 cursor-pointer items-center gap-1.5 text-sm text-slate transition-colors duration-200 hover:text-forest"
          >
            <ArrowLeft size={14} className="transition-transform duration-200 group-hover:-translate-x-0.5" />
            All systems
          </Link>

          <header className="mt-6 max-w-4xl">
            <p className="flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-xs uppercase tracking-[0.16em] text-slate">
              <span className="text-slate">No. {String(i + 1).padStart(2, "0")}</span>
              <span>{system.org}</span>
              <StatusMark status={system.status} className="text-ink-soft" />
              {system.liveUrl && <LiveBadge />}
            </p>
            <h1 className="font-display mt-4 text-h2 font-semibold text-charcoal">{system.title}</h1>
            <ul className="mt-5 flex flex-wrap gap-2" aria-label="Disciplines">
              {system.domains.map((d) => (
                <DomainChip key={d} domain={d} />
              ))}
            </ul>

            {(system.liveUrl || system.repoUrl) && (
              <div className="mt-7 flex flex-wrap items-center gap-3">
                {system.liveUrl && (
                  <a
                    href={system.liveUrl}
                    target={system.liveUrl.startsWith("http") ? "_blank" : undefined}
                    rel={system.liveUrl.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="btn btn-primary"
                  >
                    <ExternalLink size={14} />
                    View Live
                  </a>
                )}
                {system.repoUrl && (
                  <a href={system.repoUrl} target="_blank" rel="noopener noreferrer" className="btn btn-soft">
                    <Github size={14} />
                    View Source
                  </a>
                )}
              </div>
            )}
          </header>

          {system.image && (
            <figure className="relative mt-12">
              <span aria-hidden="true" className="tape-corner -left-4 -top-2 z-10 -rotate-6" />
              <span aria-hidden="true" className="tape-corner -right-4 -top-2 z-10 rotate-6" />
              <div className="surface-paper overflow-hidden p-2 sm:p-3">
                <Image
                  src={system.image}
                  alt={`${system.title} — screenshot`}
                  width={1600}
                  height={1000}
                  sizes="(min-width: 1152px) 1104px, 100vw"
                  className="h-auto w-full rounded-[12px] border border-line"
                />
              </div>
              <figcaption className="mt-3 font-mono text-[0.7rem] uppercase tracking-[0.16em] text-ink-soft">
                Fig. 01 — {system.title}
              </figcaption>
            </figure>
          )}

          <div className="mt-10 lg:hidden">
            <CaseStudyNav sections={sections} variant="inline" />
          </div>

          <div className="mt-10 grid gap-12 lg:mt-16 lg:grid-cols-[13rem_1fr] lg:gap-16">
            <aside className="hidden lg:block">
              <div className="sticky top-24 space-y-8">
                <CaseStudyNav sections={sections} />
                <dl className="space-y-3 border-t border-line pt-6 text-sm">
                  <div>
                    <dt className="font-mono text-[0.66rem] uppercase tracking-[0.18em] text-slate">Organization</dt>
                    <dd className="mt-1 text-ink-soft">{system.org}</dd>
                  </div>
                  <div>
                    <dt className="font-mono text-[0.66rem] uppercase tracking-[0.18em] text-slate">Status</dt>
                    <dd className="mt-1 text-ink-soft">
                      <StatusMark status={system.status} />
                    </dd>
                  </div>
                </dl>
              </div>
            </aside>

            <div className="min-w-0 space-y-12">
              <Section id="problem" index={n("problem")} label="Problem">
                <Callout tone="problem">{system.problem}</Callout>
              </Section>
              <Section id="context" index={n("context")} label="Context">
                <p>{study.context}</p>
              </Section>
              <Section id="solution" index={n("solution")} label="Solution">
                <Callout tone="solution">{system.solution}</Callout>
              </Section>

              {study.challenges.length > 0 && (
                <Section id="challenges" index={n("challenges")} label="Challenges">
                  <ul className="space-y-3">
                    {study.challenges.map((c) => (
                      <li key={c} className="grid grid-cols-[auto_1fr] gap-3">
                        <span aria-hidden="true" className="mt-[0.8em] h-px w-4 bg-terracotta" />
                        <span>{c}</span>
                      </li>
                    ))}
                  </ul>
                </Section>
              )}

              <Section id="architecture" index={n("architecture")} label="Architecture">
                <div className="field-grid rounded-2xl border border-line bg-paper/70 px-5 py-5 sm:px-6">
                  <p className="font-mono text-[0.66rem] uppercase tracking-[0.18em] text-emerald" aria-hidden="true">
                    System sketch
                  </p>
                  <p className="mt-2">{study.architecture}</p>
                </div>
              </Section>
              <Section id="results" index={n("results")} label="Results">
                <p>{study.results}</p>
              </Section>

              <Section id="impact" index={n("impact")} label="Impact">
                <ul className="grid gap-3">
                  {system.impact.map((item) => (
                    <li key={item} className="surface-paper grid grid-cols-[auto_1fr] gap-3 px-4 py-3.5">
                      <ArrowUpRight size={16} aria-hidden="true" className="mt-1 text-ochre" />
                      <span className="font-medium text-forest">{item}</span>
                    </li>
                  ))}
                </ul>
              </Section>

              {study.lessons.length > 0 && (
                <Section id="lessons" index={n("lessons")} label="Lessons Learned">
                  <ol className="space-y-4">
                    {study.lessons.map((l, k) => (
                      <li key={l} className="grid grid-cols-[auto_1fr] gap-4">
                        <span
                          aria-hidden="true"
                          className="font-hand grid h-8 w-8 place-items-center rounded-full border-[1.5px] border-emerald/60 text-lg leading-none text-emerald"
                        >
                          {k + 1}
                        </span>
                        <span className="pt-0.5">{l}</span>
                      </li>
                    ))}
                  </ol>
                </Section>
              )}

              <Section id="tech" index={n("tech")} label="Tech Stack">
                <ul className="flex flex-wrap gap-2" aria-label="Technologies">
                  {system.tech.map((t) => (
                    <li key={t} className="rounded-full border border-line-strong bg-paper px-3 py-1 font-mono text-xs text-ink-soft shadow-raised">
                      {t}
                    </li>
                  ))}
                </ul>
              </Section>
            </div>
          </div>

          <nav aria-label="More systems" className="mt-20 grid gap-4 border-t border-line pt-10 sm:grid-cols-2">
            {prev ? (
              <Link href={`/systems/${prev.slug}`} className="surface-paper surface-lift group block p-5">
                <span className="flex items-center gap-1.5 font-mono text-[0.66rem] uppercase tracking-[0.18em] text-slate">
                  <ArrowLeft size={12} className="transition-transform duration-200 group-hover:-translate-x-0.5" />
                  Previous system
                </span>
                <span className="font-display mt-2 block font-semibold text-charcoal group-hover:text-forest">{prev.title}</span>
              </Link>
            ) : (
              <span className="hidden sm:block" />
            )}
            {next && (
              <Link href={`/systems/${next.slug}`} className="surface-paper surface-lift group block p-5 sm:text-right">
                <span className="flex items-center gap-1.5 font-mono text-[0.66rem] uppercase tracking-[0.18em] text-slate sm:justify-end">
                  Next system
                  <ArrowRight size={12} className="transition-transform duration-200 group-hover:translate-x-0.5" />
                </span>
                <span className="font-display mt-2 block font-semibold text-charcoal group-hover:text-forest">{next.title}</span>
              </Link>
            )}
          </nav>
        </div>
      </article>
    </>
  );
}
