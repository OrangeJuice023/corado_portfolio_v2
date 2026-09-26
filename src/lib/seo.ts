import type { Metadata } from "next";
import { profile } from "@/lib/content/profile";

/**
 * Per-route metadata: unique title/description plus a canonical and Open
 * Graph URL for that route. Paths are relative — Next resolves them against
 * metadataBase (profile.siteUrl). Next replaces (not merges) a parent's
 * openGraph, so every route supplies its own.
 */
export function pageMetadata({
  title,
  description,
  path,
  type = "website",
}: {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
}): Metadata {
  const fullTitle = `${title} — ${profile.fullName}`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: fullTitle,
      description,
      url: path,
      siteName: profile.fullName,
      type,
      locale: "en_US",
    },
    twitter: { card: "summary", title: fullTitle, description },
  };
}

export const homeTitle = `${profile.fullName} — ${profile.identity.split(" • ").join(", ")}`;

export const homeDescription =
  "Software engineer, analytics engineer, and data builder based in Quezon City, Philippines — building analytics pipelines, dashboards, and software systems that turn complexity into clarity.";

/** schema.org Person + WebSite, built only from facts already on the site. */
export function siteJsonLd() {
  const url = profile.siteUrl;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${url}/#website`,
        url,
        name: profile.fullName,
        description: homeDescription,
        inLanguage: "en",
        publisher: { "@id": `${url}/#person` },
      },
      {
        "@type": "Person",
        "@id": `${url}/#person`,
        name: profile.fullName,
        alternateName: profile.name,
        url,
        image: `${url}${profile.about.portrait}`,
        jobTitle: profile.identity.split(" • "),
        description: profile.about.whoIAm,
        email: `mailto:${profile.email}`,
        address: {
          "@type": "PostalAddress",
          addressLocality: "Quezon City",
          addressCountry: "PH",
        },
        sameAs: [profile.links.github, profile.links.linkedin],
      },
    ],
  };
}
