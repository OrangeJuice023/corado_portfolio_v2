import { cn } from "@/lib/utils";

/**
 * Hand-authored-looking contour lines (a terrain map fragment). Deterministic
 * from `seed`, so server and client render identical SVG. Decorative only.
 */

function prng(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

export function contourPath(
  cx: number,
  cy: number,
  r: number,
  wobble: { k: number; a: number; p: number }[],
  steps = 72,
): string {
  let d = "";
  for (let i = 0; i <= steps; i++) {
    const t = (i / steps) * Math.PI * 2;
    let rr = r;
    for (const w of wobble) rr += r * w.a * Math.sin(w.k * t + w.p);
    const x = cx + Math.cos(t) * rr * 1.25;
    const y = cy + Math.sin(t) * rr;
    d += `${i === 0 ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(1)}`;
  }
  return d + "Z";
}

export function TopoLines({
  seed = 7,
  hills = 2,
  rings = 7,
  className,
  stroke = "currentColor",
  fade = false,
}: {
  seed?: number;
  hills?: number;
  rings?: number;
  className?: string;
  stroke?: string;
  /** Fade toward the left so contours never sit under a page's heading. */
  fade?: boolean;
}) {
  const rand = prng(seed);
  const paths: { d: string; dashed: boolean }[] = [];
  for (let h = 0; h < hills; h++) {
    const cx = 60 + rand() * 280;
    const cy = 50 + rand() * 200;
    const wobble = [2, 3, 5].map((k) => ({ k, a: 0.05 + rand() * 0.09, p: rand() * 6.28 }));
    for (let i = 1; i <= rings; i++) {
      paths.push({ d: contourPath(cx, cy, 10 + i * 17, wobble), dashed: i % 4 === 0 });
    }
  }
  return (
    <svg
      viewBox="0 0 400 300"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      focusable="false"
      className={cn(
        "pointer-events-none",
        fade && "[mask-image:linear-gradient(to_left,black_20%,transparent_75%)]",
        className,
      )}
    >
      <g fill="none" stroke={stroke} strokeWidth="0.8" strokeLinecap="round" vectorEffect="non-scaling-stroke">
        {paths.map((p, i) => (
          <path
            key={i}
            d={p.d}
            strokeDasharray={p.dashed ? "3 4" : undefined}
            vectorEffect="non-scaling-stroke"
          />
        ))}
      </g>
    </svg>
  );
}
