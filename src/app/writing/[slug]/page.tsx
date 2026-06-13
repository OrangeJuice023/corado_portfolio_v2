import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { essays, getEssay, publishedEssays, readingTime } from "@/lib/content/writing";

export function generateStaticParams() {
  return publishedEssays.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const essay = getEssay(slug);
  return essay ? { title: essay.title, description: essay.dek } : { title: "Essay" };
}

export default async function EssayPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const essay = getEssay(slug);
  if (!essay || !essay.published || !essay.body) notFound();

  const paragraphs = essay.body.split(/\n+/).map((p) => p.trim()).filter(Boolean);

  return (
    <article className="mx-auto max-w-2xl px-6 py-20">
      <Link
        href="/writing"
        className="group inline-flex cursor-pointer items-center gap-1.5 text-sm text-slate transition-colors duration-200 hover:text-forest"
      >
        <ArrowLeft size={14} className="transition-transform duration-200 group-hover:-translate-x-0.5" />
        All writing
      </Link>

      <p className="mt-8 eyebrow">{readingTime(essay.body)}</p>
      <h1 className="font-display mt-3 text-h2 font-semibold leading-tight text-charcoal">
        {essay.title}
      </h1>
      <p className="mt-4 text-lg leading-relaxed text-slate">{essay.dek}</p>

      <div className="hairline my-10" />

      <div className="space-y-5 text-[1.05rem] leading-[1.8] text-charcoal">
        {paragraphs.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>

      <div className="hairline my-12" />
      <Link
        href="/writing"
        className="link-underline cursor-pointer text-sm font-medium text-forest"
      >
        Read more essays
      </Link>
    </article>
  );
}
