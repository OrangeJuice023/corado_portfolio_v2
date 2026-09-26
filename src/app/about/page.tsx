import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BookOpen, ChefHat, Code2, Dumbbell, Mountain } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { TechStack } from "@/components/TechStack";
import { TopoLines } from "@/components/field/TopoLines";
import { EmphasisMarks, HandUnderline } from "@/components/field/Annotation";
import { profile } from "@/lib/content/profile";

export const metadata: Metadata = pageMetadata({
  title: "About",
  description:
    profile.about.whoIAm,
  path: "/about",
});

/** Visual shorthand for the interests named in profile.about.interests. */
const INTEREST_MARKS = [
  { label: "Gym", Icon: Dumbbell, bg: "bg-forest" },
  { label: "Cooking", Icon: ChefHat, bg: "bg-terracotta" },
  { label: "Books", Icon: BookOpen, bg: "bg-dusk" },
  { label: "Code", Icon: Code2, bg: "bg-emerald" },
  { label: "Hiking", Icon: Mountain, bg: "bg-ochre" },
];

function Label({ children, index, id }: { children: React.ReactNode; index: string; id: string }) {
  return (
    <h2 id={id} className="eyebrow flex items-center gap-3">
      <span className="text-slate">{index}</span>
      {children}
      <span aria-hidden="true" className="h-px w-10 bg-line-strong" />
    </h2>
  );
}

export default function AboutPage() {
  const [lead, ...story] = profile.about.story;

  return (
    <div className="relative isolate">
      <TopoLines fade seed={23} hills={2} className="absolute right-0 top-0 -z-10 h-96 w-full max-w-3xl text-sage/45" />

      <div className="mx-auto max-w-6xl px-6 py-20">
        <div className="max-w-3xl">
          <SectionHeading as="h1" eyebrow="About" title="Who I am" sub={profile.about.whoIAm} />
        </div>

        <div className="mt-14 grid gap-14 lg:grid-cols-[minmax(0,22rem)_1fr] lg:gap-20">
          {/* Field photo */}
          <Reveal className="lg:sticky lg:top-28 lg:self-start">
            <figure className="relative mx-auto max-w-sm -rotate-[1.5deg]">
              <span aria-hidden="true" className="tape-corner -top-3 left-1/2 z-10 -translate-x-1/2 rotate-2" />
              <div className="surface-paper rounded-md p-3 pb-4">
                <div className="overflow-hidden rounded-sm">
                  <Image
                    src={profile.about.portrait}
                    alt={`Portrait of ${profile.name}`}
                    width={900}
                    height={900}
                    priority
                    sizes="(min-width: 1024px) 352px, 90vw"
                    className="h-auto w-full object-cover"
                  />
                </div>
                <figcaption className="font-hand mt-3 flex items-center justify-between px-1 text-xl text-forest">
                  {profile.location}
                  <EmphasisMarks className="h-4 w-6 text-terracotta" />
                </figcaption>
              </div>
            </figure>
          </Reveal>

          <div className="min-w-0 space-y-16">
            <section aria-labelledby="story-h">
              <Label id="story-h" index="01">My Story</Label>
              <p className="font-display mt-6 text-2xl font-medium leading-snug text-charcoal">
                {lead}
              </p>
              <div className="mt-6 space-y-5 text-base leading-[1.8] text-ink-soft">
                {story.map((p) => (
                  <p key={p.slice(0, 32)}>{p}</p>
                ))}
              </div>
            </section>

            <Reveal>
              <section aria-labelledby="philosophy-h" className="surface-paper relative overflow-hidden px-6 py-8 sm:px-10 sm:py-10">
                <div aria-hidden="true" className="field-grid absolute inset-0 opacity-50 [mask-image:linear-gradient(to_bottom,black,transparent)]" />
                <span aria-hidden="true" className="tape-corner -right-4 top-3 rotate-[20deg]" />
                <div className="relative">
                  <Label id="philosophy-h" index="02">Philosophy</Label>
                </div>
                <blockquote className="relative z-[1] mt-8 pl-7 sm:pl-9">
                  <span aria-hidden="true" className="font-hand absolute -top-4 left-0 text-6xl leading-none text-sage">
                    &ldquo;
                  </span>
                  <p className="font-display text-xl font-medium leading-relaxed text-forest sm:text-2xl sm:leading-relaxed">
                    {profile.about.philosophy}
                  </p>
                </blockquote>
              </section>
            </Reveal>

            <section aria-labelledby="tools-h">
              <Label id="tools-h" index="03">Tools I Build With</Label>
              <div className="mt-8">
                <TechStack />
              </div>
            </section>

            <section aria-labelledby="beyond-h">
              <Label id="beyond-h" index="04">Beyond Work</Label>
              <ul aria-hidden="true" className="mt-6 flex flex-wrap gap-4">
                {INTEREST_MARKS.map(({ label, Icon, bg }, k) => (
                  <li key={label} className="flex flex-col items-center gap-2" style={{ transform: `rotate(${(k % 2 ? 1 : -1) * 3}deg)` }}>
                    <span className={`grid h-12 w-12 place-items-center rounded-full text-warm shadow-raised ${bg}`}>
                      <Icon size={20} />
                    </span>
                    <span className="font-hand text-base leading-none text-ink-soft">{label}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 leading-[1.8] text-ink-soft">{profile.about.interests}</p>
              {profile.about.beyondWorkPhotos.length > 0 && (
                <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {profile.about.beyondWorkPhotos.map((src) => (
                    <div key={src} className="surface-paper overflow-hidden rounded-md p-2">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={src} alt="" className="h-40 w-full rounded-sm object-cover" loading="lazy" />
                    </div>
                  ))}
                </div>
              )}
            </section>

            <section aria-labelledby="going-h">
              <Label id="going-h" index="05">Where This Is Going</Label>
              <div className="mt-6 grid grid-cols-[auto_1fr] gap-5">
                <svg viewBox="0 0 24 90" aria-hidden="true" className="h-24 w-6 text-emerald">
                  <path d="M12 2 C 4 22, 20 40, 12 60 S 12 78, 12 84" fill="none" stroke="currentColor" strokeWidth="1.6" strokeDasharray="3 5" strokeLinecap="round" />
                  <circle cx="12" cy="86" r="3.5" fill="currentColor" />
                </svg>
                <p className="self-end leading-[1.8] text-ink-soft">{profile.about.aspirations}</p>
              </div>
            </section>

            <Reveal>
              <div className="border-t border-line pt-10">
                <p className="font-display text-xl leading-snug text-charcoal sm:text-2xl">
                  I enjoy understanding how complex systems work and building tools that
                  help people{" "}
                  <span className="relative inline-block">
                    navigate them more effectively.
                    <HandUnderline className="absolute -bottom-1.5 left-0 h-2 w-full text-sage" />
                  </span>
                </p>
                <Link href="/contact" className="btn btn-primary group mt-8">
                  Get in touch
                  <ArrowRight size={15} className="transition-transform duration-200 group-hover:translate-x-0.5" />
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </div>
  );
}
