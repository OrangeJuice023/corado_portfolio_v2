import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Download } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { profile } from "@/lib/content/profile";
import { certCount, issuers } from "@/lib/content/certifications";

export const metadata: Metadata = {
  title: "Resume",
  description: "Experience, education, and skills — interactive timeline plus PDF.",
};

export default function ResumePage() {
  const { experience, education, skills } = profile.resume;

  return (
    <div className="mx-auto max-w-3xl px-6 py-20">
      <div className="flex flex-wrap items-start justify-between gap-6">
        <SectionHeading
          eyebrow="Resume"
          title="The trajectory"
          sub="Interactive version below; PDF if you need the classic."
        />
        <a
          href={profile.links.resumePdf}
          download
          className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-forest px-5 py-2.5 text-sm font-medium text-forest transition-colors duration-200 hover:bg-forest hover:text-warm"
        >
          <Download size={15} />
          Download PDF
        </a>
      </div>

      <section className="mt-16" aria-label="Experience">
        <h2 className="eyebrow">Experience</h2>
        <ol className="mt-6 space-y-0 border-l border-line">
          {experience.map((job, i) => (
            <Reveal key={job.org} delay={i * 0.06}>
              <li className="relative pb-10 pl-8 last:pb-0">
                <span
                  aria-hidden="true"
                  className="absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full bg-emerald"
                />
                <p className="font-mono text-[0.68rem] uppercase tracking-[0.16em] text-slate">
                  {job.period}
                </p>
                <h3 className="font-display mt-1 text-lg font-semibold text-charcoal">
                  {job.org}
                </h3>
                <p className="text-sm text-emerald">{job.role}</p>
                <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-charcoal">
                  {job.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              </li>
            </Reveal>
          ))}
        </ol>
      </section>

      <section className="mt-16" aria-label="Education">
        <h2 className="eyebrow">Education</h2>
        {education.map((e) => (
          <div key={e.org} className="mt-5">
            <h3 className="font-display text-lg font-semibold text-charcoal">{e.org}</h3>
            <p className="text-sm text-charcoal">{e.credential}</p>
            <p className="mt-1 font-mono text-[0.68rem] uppercase tracking-[0.16em] text-slate">
              {e.period}
            </p>
          </div>
        ))}
      </section>

      <section className="mt-16" aria-label="Certifications">
        <h2 className="eyebrow">Certifications</h2>
        <p className="mt-4 text-sm leading-relaxed text-charcoal">
          {certCount} verifiable credentials from {issuers.join(", ")}.
        </p>
        <Link
          href="/certifications"
          className="group mt-3 inline-flex cursor-pointer items-center gap-2 text-sm font-medium text-forest"
        >
          <span className="link-underline">View all with credential IDs</span>
          <ArrowRight size={14} className="transition-transform duration-200 group-hover:translate-x-0.5" />
        </Link>
      </section>

      <section className="mt-16" aria-label="Skills">
        <h2 className="eyebrow">Skills</h2>
        <div className="mt-6 space-y-6">
          {Object.entries(skills).map(([group, items]) => (
            <div key={group}>
              <h3 className="text-sm font-medium text-forest">{group}</h3>
              <ul className="mt-2 flex flex-wrap gap-2">
                {items.map((s) => (
                  <li
                    key={s}
                    className="rounded-full bg-forest-50 px-3 py-1 font-mono text-xs text-emerald"
                  >
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
