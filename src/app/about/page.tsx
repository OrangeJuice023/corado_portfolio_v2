import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { TechStack } from "@/components/TechStack";
import { profile } from "@/lib/content/profile";

export const metadata: Metadata = {
  title: "About",
  description: profile.about.whoIAm,
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-20">
      <SectionHeading eyebrow="About" title="Who I am" sub={profile.about.whoIAm} />

      <Reveal className="mt-12">
        <div className="overflow-hidden rounded-[18px] border border-line">
          <Image
            src={profile.about.portrait}
            alt={`Portrait of ${profile.name}`}
            width={900}
            height={900}
            priority
            className="h-auto w-full object-cover"
          />
        </div>
      </Reveal>

      <section className="mt-16" aria-label="My story">
        <h2 className="eyebrow">My Story</h2>
        <div className="mt-4 space-y-5 text-base leading-relaxed text-charcoal">
          {profile.about.story.map((p) => (
            <p key={p.slice(0, 32)}>{p}</p>
          ))}
        </div>
      </section>

      <section className="mt-14" aria-label="Philosophy">
        <h2 className="eyebrow">Philosophy</h2>
        <blockquote className="font-display mt-4 border-l-2 border-emerald pl-5 text-xl font-medium leading-relaxed text-forest">
          {profile.about.philosophy}
        </blockquote>
      </section>

      <section className="mt-14" aria-label="Tech stack">
        <h2 className="eyebrow">Tools I Build With</h2>
        <div className="mt-8">
          <TechStack />
        </div>
      </section>

      <section className="mt-14" aria-label="Beyond work">
        <h2 className="eyebrow">Beyond Work</h2>
        <p className="mt-4 leading-relaxed text-charcoal">{profile.about.interests}</p>
        {profile.about.beyondWorkPhotos.length > 0 && (
          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {profile.about.beyondWorkPhotos.map((src) => (
              <div key={src} className="overflow-hidden rounded-xl border border-line">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={src} alt="" className="h-40 w-full object-cover" loading="lazy" />
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="mt-14" aria-label="Where this is going">
        <h2 className="eyebrow">Where This Is Going</h2>
        <p className="mt-4 leading-relaxed text-charcoal">{profile.about.aspirations}</p>
      </section>

      <Reveal className="mt-16">
        <p className="font-display text-lg text-charcoal">
          I enjoy understanding how complex systems work and building tools that
          help people navigate them more effectively.
        </p>
        <Link
          href="/contact"
          className="mt-6 inline-block cursor-pointer rounded-full bg-forest px-6 py-3 text-sm font-medium text-warm transition-colors duration-200 hover:bg-emerald"
        >
          Get in touch
        </Link>
      </Reveal>
    </div>
  );
}
