import Link from "next/link";
import { TopoLines } from "@/components/field/TopoLines";

export default function NotFound() {
  return (
    <div className="relative isolate overflow-hidden">
      <TopoLines seed={404} hills={1} rings={10} className="absolute inset-0 -z-10 h-full w-full text-sage/40" />
      <div className="mx-auto flex max-w-3xl flex-col items-center px-6 py-32 text-center">
        <svg viewBox="0 0 160 60" aria-hidden="true" className="h-14 w-40 text-emerald">
          <path d="M6 44 C 30 10, 52 52, 76 30 S 112 14, 124 36" fill="none" stroke="currentColor" strokeWidth="1.6" strokeDasharray="3 5" strokeLinecap="round" />
          <circle cx="6" cy="44" r="3.5" fill="currentColor" />
          <g stroke="#b5654a" strokeWidth="1.8" strokeLinecap="round">
            <path d="M132 30 L 144 42" />
            <path d="M144 30 L 132 42" />
          </g>
        </svg>
        <p className="eyebrow mt-6">404</p>
        <h1 className="font-display mt-3 text-h2 font-semibold text-charcoal">
          Signal lost in the noise.
        </h1>
        <p className="mt-4 text-ink-soft">This page doesn&apos;t exist — but the system does.</p>
        <Link href="/" className="btn btn-primary mt-8">
          Back home
        </Link>
      </div>
    </div>
  );
}
