import type { Metadata } from "next";
import Image from "next/image";
import { BadgeCheck } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { TopoLines } from "@/components/field/TopoLines";
import {
  certifications,
  categoryOrder,
  certCount,
} from "@/lib/content/certifications";
import { ACCENT } from "@/lib/domain-style";

export const metadata: Metadata = {
  alternates: { canonical: "/certifications" },
  title: "Certifications",
  description: `${certCount} verifiable credentials across data engineering, data science, software engineering, and strategy.`,
};

const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

/** Issuer stamp colors — visual grouping only. */
const ISSUER_TONE: Record<string, string> = {
  IBM: ACCENT.dusk,
  DataCamp: ACCENT.emerald,
  HarvardX: ACCENT.terracotta,
  freeCodeCamp: ACCENT.forest,
  "McKinsey & Company": ACCENT.umber,
};
const MONOGRAM: Record<string, string> = {
  IBM: "IBM",
  DataCamp: "DC",
  HarvardX: "HX",
  freeCodeCamp: "fCC",
  "McKinsey & Company": "McK",
};
const initials = (issuer: string) => MONOGRAM[issuer] ?? issuer.slice(0, 2);

export default function CertificationsPage() {
  const groups = categoryOrder
    .map((category) => ({ category, certs: certifications.filter((c) => c.category === category) }))
    .filter((g) => g.certs.length > 0);

  return (
    <div className="relative isolate">
      <TopoLines fade seed={31} className="absolute right-0 top-0 -z-10 h-80 w-full max-w-2xl text-sage/45" />
      <div className="mx-auto max-w-6xl px-6 py-20">
        <SectionHeading
          as="h1"
          eyebrow="Certifications"
          title="Self-taught, with receipts"
          sub={`${certCount} verifiable credentials — from CS50 in 2022 through database administration in 2026. Every credential ID below can be independently verified.`}
        />

        <nav aria-label="Certification categories" className="-mx-6 mt-10 overflow-x-auto px-6 scrollbar-none [mask-image:linear-gradient(to_right,black_85%,transparent)] sm:[mask-image:none]">
          <ul className="flex w-max gap-2 sm:w-auto sm:flex-wrap">
            {groups.map(({ category, certs }) => (
              <li key={category}>
                <a
                  href={`#${slug(category)}`}
                  className="inline-flex min-h-10 items-center gap-2 rounded-full border border-line-strong bg-paper px-4 font-mono text-[0.68rem] uppercase tracking-wider text-ink-soft shadow-raised transition-colors duration-200 hover:border-emerald/40 hover:text-forest"
                >
                  {category}
                  <span className="tabular-nums text-slate">{certs.length}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-14 space-y-16">
          {groups.map(({ category, certs }, gi) => (
            <section
              key={category}
              id={slug(category)}
              aria-labelledby={`${slug(category)}-h`}
              className="scroll-mt-24 border-t border-line pt-8 lg:grid lg:grid-cols-[15rem_1fr] lg:gap-12"
            >
              <Reveal className="lg:sticky lg:top-24 lg:self-start">
                <p className="font-mono text-[0.66rem] tracking-[0.2em] text-slate">
                  {String(gi + 1).padStart(2, "0")} / {String(groups.length).padStart(2, "0")}
                </p>
                <h2 id={`${slug(category)}-h`} className="font-display mt-2 text-xl font-semibold leading-snug text-charcoal">
                  {category}
                </h2>
                <p className="mt-1 text-sm text-slate">
                  {certs.length} credential{certs.length === 1 ? "" : "s"}
                </p>
              </Reveal>

              <div className="mt-6 grid gap-5 md:grid-cols-2 lg:mt-0">
                {certs.map((cert, i) => (
                  <Reveal key={cert.title} delay={(i % 2) * 0.05}>
                    <article className="surface-paper flex h-full flex-col p-6">
                      {cert.image && (
                        <div className="mb-4 flex h-20 items-center">
                          <Image
                            src={cert.image}
                            alt={`${cert.title} badge`}
                            width={80}
                            height={80}
                            className="h-20 w-auto object-contain"
                          />
                        </div>
                      )}
                      <div className="flex items-start gap-4">
                        <span
                          aria-hidden="true"
                          className="grid h-10 w-10 shrink-0 place-items-center rounded-full font-mono text-[0.66rem] font-semibold text-warm shadow-raised"
                          style={{ backgroundColor: ISSUER_TONE[cert.issuer] ?? ACCENT.forest }}
                        >
                          {initials(cert.issuer)}
                        </span>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-start justify-between gap-3">
                            <h3 className="font-display text-base font-semibold leading-snug text-charcoal">
                              {cert.title}
                            </h3>
                            <BadgeCheck size={18} className="mt-0.5 shrink-0 text-emerald" aria-hidden="true" />
                          </div>
                          <p className="mt-1 text-sm text-emerald">{cert.issuer}</p>
                          {cert.date !== "—" && (
                            <p className="mt-2 font-mono text-[0.68rem] uppercase tracking-[0.14em] text-slate">
                              {cert.date}
                              {cert.expires ? ` · expires ${cert.expires}` : ""}
                            </p>
                          )}
                        </div>
                      </div>
                      {cert.credentialId && (
                        <p className="mt-4 break-all rounded-lg bg-warm-200/60 px-3 py-2 font-mono text-[0.68rem] text-ink-soft shadow-pressed">
                          ID: {cert.credentialId}
                        </p>
                      )}
                      {cert.skills && cert.skills.length > 0 && (
                        <ul className="mt-auto flex flex-wrap gap-1.5 pt-4" aria-label="Skills">
                          {cert.skills.map((s) => (
                            <li key={s} className="chip !normal-case !tracking-normal">
                              {s}
                            </li>
                          ))}
                        </ul>
                      )}
                    </article>
                  </Reveal>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
