import { Reveal } from "./Reveal";

export function SectionHeading({
  eyebrow,
  title,
  sub,
}: {
  eyebrow: string;
  title: string;
  sub?: string;
}) {
  return (
    <Reveal>
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="font-display mt-3 text-h2 font-semibold text-charcoal">
        {title}
      </h2>
      {sub && <p className="mt-4 max-w-2xl text-base text-slate">{sub}</p>}
    </Reveal>
  );
}
