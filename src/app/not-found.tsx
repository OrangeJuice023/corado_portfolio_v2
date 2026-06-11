import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-3xl flex-col items-center px-6 py-32 text-center">
      <p className="eyebrow">404</p>
      <h1 className="font-display mt-3 text-h2 font-semibold text-charcoal">
        Signal lost in the noise.
      </h1>
      <p className="mt-4 text-slate">This page doesn&apos;t exist — but the system does.</p>
      <Link
        href="/"
        className="mt-8 cursor-pointer rounded-full bg-forest px-6 py-3 text-sm font-medium text-warm transition-colors duration-200 hover:bg-emerald"
      >
        Back home
      </Link>
    </div>
  );
}
