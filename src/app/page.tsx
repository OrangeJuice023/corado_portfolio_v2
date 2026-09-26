import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Award } from "lucide-react";
import { Hero } from "@/components/Hero";
import { ImpactSection } from "@/components/ImpactSection";
import { SystemCard } from "@/components/SystemCard";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { TopoLines } from "@/components/field/TopoLines";
import { featuredSystems, systems, allDomains } from "@/lib/content/systems";
import { certCount, issuers } from "@/lib/content/certifications";
import { profile } from "@/lib/content/profile";
import { domainAccent } from "@/lib/domain-style";
import { homeDescription, homeTitle, siteJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: { absolute: homeTitle },
  description: homeDescription,
  alternates: { canonical: "/" },
  openGraph: {
    title: homeTitle,
    description: homeDescription,
    url: "/",
    siteName: profile.fullName,
    type: "profile",
    locale: "en_US",
  },
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        // JSON-LD: escape "<" so the payload can never close the script tag.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(siteJsonLd()).replace(/</g, "\\u003c") }}
      />
      <Hero />
      <ImpactSection />

      {/* Featured Systems */}
      <section className="mx-auto max-w-6xl px-6 py-24" aria-label="Featured systems">
        <div className="flex flex-col gap-8">
          <SectionHeading
            index="02"
            eyebrow="Featured Systems"
            title="Systems I've Built"
            sub="Software, analytics, data, and AI systems designed to solve real-world problems. Filter by discipline on the Systems page."
          />
          <Reveal>
            <ul className="flex flex-wrap gap-2" aria-label="Browse systems by discipline">
              {allDomains.map((d) => (
                <li key={d}>
                  <Link
                    href={`/systems?discipline=${encodeURIComponent(d)}`}
                    className="inline-flex min-h-8 items-center gap-1.5 rounded-full border border-line-strong bg-paper px-3 py-1 font-mono text-[0.66rem] uppercase tracking-wider text-ink-soft transition-colors duration-200 hover:border-emerald/40 hover:text-forest"
                  >
                    <span
                      aria-hidden="true"
                      className="inline-block h-1.5 w-1.5 rounded-full"
                      style={{ backgroundColor: domainAccent[d] }}
                    />
                    {d}
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {featuredSystems.map((s, i) => (
            <Reveal key={s.slug} delay={(i % 2) * 0.06} className="min-w-0">
              <SystemCard system={s} index={systems.indexOf(s)} />
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-12">
          <Link href="/systems" className="btn btn-soft group">
            <span>All systems & case studies</span>
            <ArrowRight size={15} className="transition-transform duration-200 group-hover:translate-x-0.5" />
          </Link>
        </Reveal>
      </section>

      {/* Credentials strip */}
      <section className="border-t border-line" aria-label="Credentials">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <Reveal>
            <div className="surface-paper relative flex flex-col items-start justify-between gap-6 overflow-hidden p-6 sm:p-8 md:flex-row md:items-center">
              <div aria-hidden="true" className="field-grid absolute inset-y-0 right-0 w-1/3 opacity-60 [mask-image:linear-gradient(to_left,black,transparent)]" />
              <div className="relative flex items-center gap-5">
                <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-forest text-warm shadow-raised">
                  <Award size={24} aria-hidden="true" />
                </span>
                <div>
                  <p className="font-display text-xl font-semibold text-charcoal">
                    {certCount} certifications, earned the hard way
                  </p>
                  <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-1 font-mono text-[0.68rem] uppercase tracking-wider text-slate">
                    {issuers.map((iss) => (
                      <li key={iss} className="flex items-center gap-1.5 whitespace-nowrap">
                        <span aria-hidden="true" className="h-1 w-1 rounded-full bg-sage" />
                        {iss}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <Link href="/certifications" className="btn btn-soft group relative whitespace-nowrap">
                View all credentials
                <ArrowRight size={14} className="transition-transform duration-200 group-hover:translate-x-0.5" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="relative isolate overflow-hidden border-t border-line" aria-label="Contact call to action">
        <TopoLines seed={19} hills={2} rings={9} className="absolute inset-0 -z-10 h-full w-full text-sage/40" />
        <div className="mx-auto max-w-6xl px-6 py-24">
          <Reveal>
            <div className="surface-paper relative mx-auto max-w-3xl px-6 py-14 text-center sm:px-12">
              <span aria-hidden="true" className="tape-corner -left-5 -top-2 -rotate-12" />
              <span aria-hidden="true" className="tape-corner -right-5 -top-2 rotate-12" />
              <h2 className="font-display mx-auto max-w-2xl text-h2 font-semibold text-charcoal">
                Complex problem? Let&apos;s untangle it.
              </h2>
              <p className="mx-auto mt-4 max-w-xl leading-relaxed text-ink-soft">{profile.summary}</p>
              <div className="relative mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-4">
                <Link href="/contact" className="btn btn-primary">
                  Get in touch
                </Link>
                <Link href="/resume" className="link-underline cursor-pointer py-2 text-sm font-medium text-charcoal">
                  View resume
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
