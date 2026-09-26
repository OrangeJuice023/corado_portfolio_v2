"use client";

import { useSyncExternalStore } from "react";

/**
 * Hydration-safe prefers-reduced-motion. The server snapshot is `false`, so
 * hydration always matches the server HTML; React then re-renders with the
 * real preference. (framer-motion's useReducedMotion reads the client value
 * during hydration, and React 19 does not patch the resulting attribute
 * mismatch — which left reduced-motion users with invisible content.)
 */
const QUERY = "(prefers-reduced-motion: reduce)";

function subscribe(cb: () => void) {
  const mq = window.matchMedia(QUERY);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
}

export function usePrefersReducedMotion(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(QUERY).matches,
    () => false,
  );
}
