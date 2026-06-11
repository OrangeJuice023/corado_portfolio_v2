import type { Metadata } from "next";
import Image from "next/image";
import { BadgeCheck } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";
import {
  certifications,
  categoryOrder,
  certCount,
} from "@/lib/content/certifications";

export const metadata: Metadata = {
  title: "Certifications",
  description: `${certCount} verifiable credentials across data engineering, data science, software engineering, and strategy.`,
};

export default function CertificationsPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-20">
      <SectionHeading
        eyebrow="Certifications"
        title="Self-taught, with receipts"
        sub={`${certCount} verifiable credentials — from CS50 in 2022 through database administration in 2026. Every credential ID below can be independently verified.`}
      />

      <div className="mt-14 space-y-16">
        {categoryOrder.map((category) => {
          const certs = certifications.filter((c) => c.category === category);
          if (certs.length === 0) return null;
          return (
            <section key={category} aria-label={category}>
              <Reveal>
                <h2 className="eyebrow">{category}</h2>
              </Reveal>
              <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                {certs.map((cert, i) => (
                  <Reveal key={cert.title} delay={i * 0.04}>
                    <article className="flex h-full flex-col rounded-[18px] border border-line bg-white/55 p-6">
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
                      <div className="flex items-start justify-between gap-3">
                        <h3 className="font-display text-base font-semibold leading-snug text-charcoal">
                          {cert.title}
                        </h3>
                        <BadgeCheck size={18} className="mt-0.5 shrink-0 text-emerald" aria-hidden="true" />
                      </div>
                      <p className="mt-1.5 text-sm text-emerald">{cert.issuer}</p>
                      <p className="mt-2 font-mono text-[0.68rem] uppercase tracking-[0.14em] text-slate">
                        {cert.date}
                        {cert.expires ? ` · expires ${cert.expires}` : ""}
                      </p>
                      {cert.credentialId && (
                        <p className="mt-2 break-all font-mono text-[0.68rem] text-slate">
                          ID: {cert.credentialId}
                        </p>
                      )}
                      {cert.skills && cert.skills.length > 0 && (
                        <ul className="mt-auto flex flex-wrap gap-1.5 pt-4" aria-label="Skills">
                          {cert.skills.map((s) => (
                            <li key={s} className="rounded-full bg-forest-50 px-2 py-0.5 font-mono text-[0.62rem] text-emerald">
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
          );
        })}
      </div>
    </div>
  );
}
