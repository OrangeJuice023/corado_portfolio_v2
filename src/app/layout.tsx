import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Caveat } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ChatBot } from "@/components/ChatBot";
import { profile } from "@/lib/content/profile";
import { homeDescription, homeTitle } from "@/lib/seo";

/** Handwriting — reserved for field-note annotations only. */
const caveat = Caveat({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-caveat",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(profile.siteUrl),
  title: {
    default: homeTitle,
    template: `%s — ${profile.fullName}`,
  },
  description: homeDescription,
  applicationName: profile.fullName,
  authors: [{ name: profile.fullName, url: profile.siteUrl }],
  creator: profile.fullName,
  openGraph: {
    title: homeTitle,
    description: homeDescription,
    siteName: profile.fullName,
    type: "website",
    locale: "en_US",
  },
  twitter: { card: "summary", title: homeTitle, description: homeDescription },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable} ${caveat.variable}`}>
      <head>
        <link rel="preconnect" href="https://api.fontshare.com" crossOrigin="" />
        <link
          href="https://api.fontshare.com/v2/css?f[]=clash-display@500,600,700&display=swap"
          rel="stylesheet"
        />
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
      </head>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-full focus:bg-forest focus:px-4 focus:py-2 focus:text-sm focus:text-warm"
        >
          Skip to content
        </a>
        <Navbar />
        <main id="main">{children}</main>
        <Footer />
        <ChatBot />
      </body>
    </html>
  );
}
