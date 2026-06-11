"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";

/**
 * Renders the REAL value immediately (server HTML, no-JS, pre-hydration all
 * show the correct number — never a stuck "0"). When scrolled into view,
 * animates 0 → value as a progressive enhancement. Static if reduced motion.
 */
export function CountUp({
  value,
  prefix = "",
  suffix = "",
  duration = 1400,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduced = useReducedMotion();
  const [display, setDisplay] = useState(value); // real value by default
  const animated = useRef(false);

  useEffect(() => {
    if (!inView || reduced || animated.current) return;
    animated.current = true;
    let raf = 0;
    const start = performance.now();
    const step = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay(Math.round(eased * value));
      if (t < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView, value, duration, reduced]);

  return (
    <span ref={ref}>
      {prefix}
      {display.toLocaleString()}
      {suffix}
    </span>
  );
}
