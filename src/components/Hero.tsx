"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";
import { ArrowRight } from "lucide-react";
import { LivingNetwork } from "./LivingNetwork";
import { Annotation } from "./field/Annotation";
import { profile } from "@/lib/content/profile";
import { cn } from "@/lib/utils";
import { usePrefersReducedMotion } from "@/lib/use-reduced-motion";

const PHASES = ["Field", "Movement", "Trace", "Build", "Clarity"] as const;

/**
 * Desktop: one sticky viewport — copy on the left stays readable the whole
 * time while the field on the right organizes into a system.
 * Mobile: copy first, then a dedicated sticky scene track so the story gets
 * the whole screen instead of competing with the headline.
 */
export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  const [desktop, setDesktop] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const update = () => setDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const { scrollYProgress: sectionProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const { scrollYProgress: trackProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });
  const progress = desktop ? sectionProgress : trackProgress;

  const [phaseIndex, setPhaseIndex] = useState(0);
  useMotionValueEvent(progress, "change", (v) => {
    setPhaseIndex(Math.min(PHASES.length - 1, Math.floor(v * PHASES.length)));
  });
  const activePhase = reduced ? PHASES.length - 1 : phaseIndex;

  const underline = useTransform(sectionProgress, [0.8, 0.97], [0, 1]);
  const underlineOpacity = useTransform(sectionProgress, [0.8, 0.81], [0, 1]);
  const clarityColor = useTransform(sectionProgress, [0.8, 0.97], ["#1a1a1a", "#1b4332"]);
  const ctaNote = useTransform(sectionProgress, [0.86, 0.96], [0, 1]);
  const legendFill = useTransform(progress, [0, 1], [0, 1]);

  return (
    <section
      ref={sectionRef}
      aria-label="Intro"
      className={cn("relative", !reduced && "lg:h-[260vh]")}
    >
      <div className="lg:sticky lg:top-16 lg:h-[calc(100svh-4rem)] lg:overflow-hidden">
        {/* Paper veil keeps the copy legible over the landscape (desktop). */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 z-[5] hidden w-[58%] bg-gradient-to-r from-warm via-warm/85 to-transparent lg:block"
        />

        <div className="pointer-events-none relative z-10 mx-auto flex max-w-6xl px-6 pb-10 pt-14 sm:pt-20 lg:h-full lg:items-center lg:pb-12 lg:pt-0 short:pb-20">
          <div className="pointer-events-auto max-w-xl lg:max-w-[30rem] xl:max-w-[32rem]">
            <p className="eyebrow flex items-center gap-3 short:tracking-[0.12em]">
              <span aria-hidden="true" className="inline-block h-2 w-2 shrink-0 rounded-full bg-emerald" />
              {profile.identity}
            </p>
            <h1 className="font-display mt-6 text-display font-semibold text-charcoal short:mt-4 short:text-[3.4rem]">
              Building systems that turn complexity into{" "}
              <span className="relative inline-block whitespace-nowrap">
                <motion.span style={{ color: reduced || !desktop ? "#1b4332" : clarityColor }}>
                  clarity.
                </motion.span>
                <svg
                  viewBox="0 0 300 20"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                  focusable="false"
                  className="pointer-events-none absolute -bottom-[0.14em] left-0 h-[0.26em] w-[96%] text-sage"
                >
                  <motion.path
                    d="M4 13 C 60 6, 120 5, 180 9 S 270 14, 296 7"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={6}
                    strokeLinecap="round"
                    vectorEffect="non-scaling-stroke"
                    style={
                      reduced || !desktop
                        ? { pathLength: 1 }
                        : { pathLength: underline, opacity: underlineOpacity }
                    }
                  />
                </svg>
              </span>
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-ink-soft short:mt-4 short:text-base">{profile.subheadline}</p>
            <p className="mt-3 text-base leading-relaxed text-slate short:text-sm">{profile.summary}</p>

            <div className="relative mt-9 short:mt-6 flex flex-wrap items-center gap-x-6 gap-y-4">
              <Link href="/systems" className="btn btn-primary group">
                Explore Systems
                <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-0.5" />
              </Link>
              <Link href="/about" className="link-underline cursor-pointer py-2 text-sm font-medium text-charcoal">
                About Me
              </Link>
              <motion.span
                style={{ opacity: reduced ? 0 : ctaNote }}
                className="absolute left-[17.5rem] top-1/2 hidden -translate-y-1/2 lg:block"
              >
                <Annotation arrow="left" className="-rotate-3 text-xl">
                  start here
                </Annotation>
              </motion.span>
            </div>
          </div>
        </div>

        {/* Scene: mobile gets its own sticky track; desktop fills the viewport. */}
        <div ref={trackRef} data-hero-track="" className={cn("relative lg:static", !reduced && "h-[210svh] lg:h-auto")}>
          <div
            className={cn(
              "overflow-hidden border-t border-line lg:static lg:border-0",
              reduced ? "relative h-[78svh] lg:h-auto" : "sticky top-16 h-[calc(100svh-4rem)] lg:h-auto",
            )}
          >
            <div className="absolute inset-0 z-0">
              <LivingNetwork progress={progress} />
            </div>

            <div aria-hidden="true" className={cn("absolute inset-x-0 bottom-0 z-10 pb-5 lg:pb-7", reduced && "hidden")}>
              <div className="mx-auto flex max-w-6xl items-end justify-between gap-6 pl-6 pr-20 lg:pr-24 xl:pr-6">
                <div className="w-full max-w-md">
                  <ol className="flex justify-between font-mono text-[0.66rem] uppercase tracking-[0.16em]">
                    {PHASES.map((ph, i) => (
                      <li
                        key={ph}
                        className={cn(
                          "flex items-center gap-1.5 transition-colors duration-300",
                          i === activePhase ? "text-forest" : "text-slate",
                          i !== activePhase && "max-sm:hidden",
                        )}
                      >
                        <span className="text-slate">0{i + 1}</span>
                        {ph}
                      </li>
                    ))}
                  </ol>
                  <div className="mt-2 h-px w-full bg-line-strong">
                    <motion.div
                      className="h-px origin-left bg-forest"
                      style={{ scaleX: reduced ? 1 : legendFill }}
                    />
                  </div>
                </div>
                <p className="hidden shrink-0 font-mono text-[0.66rem] uppercase tracking-[0.2em] text-slate lg:block">
                  Scroll — watch the system organize
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
