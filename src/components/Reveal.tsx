"use client";

import { motion } from "framer-motion";
import { usePrefersReducedMotion } from "@/lib/use-reduced-motion";

/**
 * Scroll-into-view entrance. Meaningful (discovery), not decorative.
 * Reduced motion: shown immediately, no movement. No JS: a <noscript> style
 * in the root layout forces [data-reveal] visible.
 */
export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduced = usePrefersReducedMotion();

  return (
    <motion.div
      data-reveal=""
      className={className}
      initial={{ opacity: 0, y: 18 }}
      {...(reduced
        ? { animate: { opacity: 1, y: 0 }, transition: { duration: 0 } }
        : {
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true, margin: "-60px" },
            transition: { duration: 0.55, delay, ease: [0.21, 0.6, 0.35, 1] },
          })}
    >
      {children}
    </motion.div>
  );
}
