import Link from "next/link";
import { ArrowRight, Award } from "lucide-react";
import { Hero } from "@/components/Hero";
import { ImpactSection } from "@/components/ImpactSection";
import { SystemCard } from "@/components/SystemCard";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { featuredSystems } from "@/lib/content/systems";
import { certCount, issuers } from "@/lib/content/certifications";
import { profile } from "@/lib/content/profile";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ImpactSection />

      {/* Featured Systems */}
      <section className="mx-auto max-w-6xl px-6 py-24" aria-label="Featured systems">
        <SectionHeading
          eyebrow="Featured Systems"
          title="Systems I've Built"
          sub="Software, analytics, data, and AI systems designed to solve real-world problems. Filter by discipline on the Systems page."
        />
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featuredSystems.map((s, i) => (
            <Reveal key={s.slug} delay={i * 0.05}>
              <SystemCard system={s} />
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-12">
          <Link
            href="/systems"
            className="group inline-flex cursor-pointer items-center gap-2 text-sm font-medium text-forest"
          >
            <span className="link-underline">All systems & case studies</span>
            <ArrowRight size={15} className="transition-transform duration-200 group-hover:translate-x-0.5" />
          </Link>
        </Reveal>
      </section>

      {/* Credentials strip */}
      <section className="border-t border-line bg-white/40" aria-label="Credentials">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <Reveal>
            <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
              <div className="flex items-center gap-4">
                <Award size={28} className="shrink-0 text-emerald" aria-hidden="true" />
                <div>
                  <p className="font-display text-xl font-semibold text-charcoal">
                    {certCount} certifications, earned the hard way
                  </p>
                  <p className="mt-1 text-sm text-slate">
                    {issuers.join(" · ")}
                  </p>
                </div>
              </div>
              <Link
                href="/certifications"
                className="group inline-flex cursor-pointer items-center gap-2 whitespace-nowrap rounded-full border border-forest px-5 py-2.5 text-sm font-medium text-forest transition-colors duration-200 hover:bg-forest hover:text-warm"
              >
                View all credentials
                <ArrowRight size={14} className="transition-transform duration-200 group-hover:translate-x-0.5" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="border-t border-line" aria-label="Contact call to action">
        <div className="mx-auto max-w-6xl px-6 py-24 text-center">
          <Reveal>
            <h2 className="font-display mx-auto max-w-2xl text-h2 font-semibold text-charcoal">
              Complex problem? Let&apos;s untangle it.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-slate">{profile.summary}</p>
            <div className="mt-8 flex items-center justify-center gap-4">
              <Link
                href="/contact"
                className="cursor-pointer rounded-full bg-forest px-6 py-3 text-sm font-medium text-warm transition-colors duration-200 hover:bg-emerald"
              >
                Get in touch
              </Link>
              <Link href="/resume" className="link-underline cursor-pointer text-sm font-medium text-charcoal">
                View resume
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
