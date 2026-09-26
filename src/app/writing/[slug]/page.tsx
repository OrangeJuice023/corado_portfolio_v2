import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { essays, getEssay, publishedEssays, readingTime } from "@/lib/content/writing";
import { HandUnderline } from "@/components/field/Annotation";

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
  return essay
    ? { title: essay.title, description: essay.dek, alternates: { canonical: `/writing/${essay.slug}` } }
    : { title: "Essay" };
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
  const idx = publishedEssays.findIndex((e) => e.slug === essay.slug);
  const next = publishedEssays[idx + 1];
  const number = essays.findIndex((e) => e.slug === essay.slug) + 1;

  return (
    <>
      <div aria-hidden="true" className="read-progress" />
      <article className="mx-auto max-w-2xl px-6 py-16 sm:py-20">
        <Link
          href="/writing"
          className="group inline-flex min-h-10 cursor-pointer items-center gap-1.5 text-sm text-slate transition-colors duration-200 hover:text-forest"
        >
          <ArrowLeft size={14} className="transition-transform duration-200 group-hover:-translate-x-0.5" />
          All writing
        </Link>

        <p className="mt-8 eyebrow flex items-center gap-3">
          <span className="text-slate">Essay {String(number).padStart(2, "0")}</span>
          <span aria-hidden="true" className="h-px w-8 bg-line-strong" />
          {readingTime(essay.body)}
        </p>
        <h1 className="font-display mt-4 text-h2 font-semibold leading-tight text-charcoal">
          {essay.title}
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-ink-soft">{essay.dek}</p>

        <HandUnderline className="my-10 h-3 w-28 text-sage" />

        <div className="space-y-6 text-[1.075rem] leading-[1.85] text-charcoal [&>p:first-child]:text-[1.2rem] [&>p:first-child]:leading-[1.75]">
          {paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>

        <div className="hairline my-12" />
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Link href="/writing" className="link-underline cursor-pointer text-sm font-medium text-forest">
            Read more essays
          </Link>
          {next && (
            <Link href={`/writing/${next.slug}`} className="btn btn-soft group max-w-full">
              <span className="truncate">{next.title}</span>
              <ArrowRight size={14} className="shrink-0 transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>
          )}
        </div>
      </article>
    </>
  );
}
