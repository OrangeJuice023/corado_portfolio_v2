import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import Link from "next/link";
import { ArrowRight, Download } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { TopoLines } from "@/components/field/TopoLines";
import { profile } from "@/lib/content/profile";
import { certCount, issuers } from "@/lib/content/certifications";

export const metadata: Metadata = pageMetadata({
  title: "Resume",
  description:
    `${profile.fullName} — experience, education, and skills. Interactive timeline plus PDF.`,
  path: "/resume",
});

function Label({ children, index, id }: { children: React.ReactNode; index: string; id: string }) {
  return (
    <h2 id={id} className="eyebrow flex items-center gap-3">
      <span className="text-slate">{index}</span>
      {children}
      <span aria-hidden="true" className="h-px w-10 bg-line-strong" />
    </h2>
  );
}

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/** "Mon YYYY" → sortable key (year * 12 + month); unparseable → -Infinity (sorts last). */
function monthKey(text: string | undefined): number {
  if (!text || /present/i.test(text)) return Number.POSITIVE_INFINITY;
  const [mon, year] = text.trim().split(/\s+/);
  const y = Number(year);
  const m = MONTHS.indexOf(mon);
  return Number.isFinite(y) && m >= 0 ? y * 12 + m : Number.NEGATIVE_INFINITY;
}

/** Most recent start first; ties broken by later end, then original order (stable sort). */
function byRecency(a: { period: string }, b: { period: string }): number {
  const [aStart, aEnd] = a.period.split(/\s+[–-]\s+/);
  const [bStart, bEnd] = b.period.split(/\s+[–-]\s+/);
  const ks = monthKey(bStart) - monthKey(aStart);
  if (ks !== 0 && !Number.isNaN(ks)) return ks;
  const ke = monthKey(bEnd) - monthKey(aEnd);
  return Number.isNaN(ke) ? 0 : ke;
}

export default function ResumePage() {
  const { education, skills } = profile.resume;
  // Rendered most-recent-first by start date, independent of source order.
  const experience = [...profile.resume.experience].sort(byRecency);

  return (
    <div className="relative isolate">
      <TopoLines fade seed={43} className="absolute right-0 top-0 -z-10 h-80 w-full max-w-2xl text-sage/45" />
      <div className="mx-auto max-w-3xl px-6 py-20">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            as="h1"
            eyebrow="Resume"
            title="The trajectory"
            sub="Interactive version below; PDF if you need the classic."
          />
          <a href={profile.links.resumePdf} download className="btn btn-soft">
            <Download size={15} />
            Download PDF
          </a>
        </div>

        <section className="mt-16" aria-labelledby="exp-h">
          <Label id="exp-h" index="01">Experience</Label>
          <ol className="mt-8 border-l border-dashed border-sage">
            {experience.map((job, i) => (
              <li key={job.org} className="relative pb-12 pl-8 last:pb-0">
                <Reveal delay={Math.min(i, 3) * 0.06}>
                  <span
                    aria-hidden="true"
                    className="absolute -left-[7px] top-1 h-3.5 w-3.5 rounded-full border-2 border-warm bg-emerald shadow-raised"
                  />
                  <p className="font-mono text-[0.68rem] uppercase tracking-[0.16em] text-slate">
                    {job.period}
                  </p>
                  <div className="surface-paper mt-3 p-5 sm:p-6">
                    <h3 className="font-display text-lg font-semibold text-charcoal">{job.org}</h3>
                    <p className="text-sm text-emerald">{job.role}</p>
                    <ul className="mt-4 space-y-2 text-sm leading-relaxed text-ink-soft">
                      {job.bullets.map((b) => (
                        <li key={b} className="grid grid-cols-[auto_1fr] gap-3">
                          <span aria-hidden="true" className="mt-[0.6rem] h-1 w-1 rounded-full bg-sage-deep" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </section>

        <section className="mt-16" aria-labelledby="edu-h">
          <Label id="edu-h" index="02">Education</Label>
          {education.map((e) => (
            <div key={e.org} className="surface-paper mt-6 p-5 sm:p-6">
              <h3 className="font-display text-lg font-semibold text-charcoal">{e.org}</h3>
              <p className="text-sm text-charcoal">{e.credential}</p>
              <p className="mt-1 font-mono text-[0.68rem] uppercase tracking-[0.16em] text-slate">
                {e.period}
              </p>
            </div>
          ))}
        </section>

        <section className="mt-16" aria-labelledby="cert-h">
          <Label id="cert-h" index="03">Certifications</Label>
          <p className="mt-5 text-sm leading-relaxed text-charcoal">
            {certCount} verifiable credentials from {issuers.join(", ")}.
          </p>
          <Link
            href="/certifications"
            className="group mt-3 inline-flex min-h-10 cursor-pointer items-center gap-2 text-sm font-medium text-forest"
          >
            <span className="link-underline">View all with credential IDs</span>
            <ArrowRight size={14} className="transition-transform duration-200 group-hover:translate-x-0.5" />
          </Link>
        </section>

        <section className="mt-16" aria-labelledby="skills-h">
          <Label id="skills-h" index="04">Skills</Label>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {Object.entries(skills).map(([group, items]) => (
              <div key={group} className="rounded-2xl border border-dashed border-line-strong p-5">
                <h3 className="text-sm font-medium text-forest">{group}</h3>
                <ul className="mt-3 flex flex-wrap gap-1.5">
                  {items.map((s) => (
                    <li key={s} className="chip !text-[0.68rem] !normal-case !tracking-normal">
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
