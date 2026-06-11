"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { useScroll, useTransform, motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { LivingNetwork } from "./LivingNetwork";
import { profile } from "@/lib/content/profile";

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const [progress, setProgress] = useState(0);
  useEffect(() => scrollYProgress.on("change", setProgress), [scrollYProgress]);

  const copyOpacity = useTransform(scrollYProgress, [0, 0.45], [1, 0]);
  const copyY = useTransform(scrollYProgress, [0, 0.45], [0, -36]);

  return (
    <section ref={sectionRef} className="relative h-[220vh]" aria-label="Intro">
      <div className="sticky top-0 flex h-screen flex-col overflow-hidden">
        <LivingNetwork progress={progress} />

        <motion.div
          style={{ opacity: copyOpacity, y: copyY }}
          className="relative z-10 mx-auto flex max-w-4xl flex-1 flex-col items-center justify-center px-6 text-center"
        >
          <p className="eyebrow mb-6">{profile.identity}</p>
          <h1 className="font-display text-display font-semibold text-charcoal">
            Building systems that turn complexity into clarity.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-slate">
            {profile.subheadline}
          </p>
          <p className="mt-3 max-w-2xl text-base text-slate">
            {profile.summary}
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/systems"
              className="group inline-flex cursor-pointer items-center gap-2 rounded-full bg-forest px-6 py-3 text-sm font-medium text-warm transition-colors duration-200 hover:bg-emerald"
            >
              Explore Systems
              <ArrowRight
                size={16}
                className="transition-transform duration-200 group-hover:translate-x-0.5"
              />
            </Link>
            <Link
              href="/about"
              className="link-underline cursor-pointer text-sm font-medium text-charcoal"
            >
              About Me
            </Link>
          </div>
        </motion.div>

        <p className="relative z-10 pb-8 text-center font-mono text-[0.68rem] uppercase tracking-[0.2em] text-slate">
          Scroll — watch the system organize
        </p>
      </div>
    </section>
  );
}
