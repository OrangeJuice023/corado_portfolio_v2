import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ChatBot } from "@/components/ChatBot";
import { profile } from "@/lib/content/profile";

export const metadata: Metadata = {
  metadataBase: new URL(profile.siteUrl),
  title: {
    default: `${profile.name} — Software & Data Systems`,
    template: `%s — ${profile.name}`,
  },
  description: profile.summary,
  authors: [{ name: profile.name, url: profile.siteUrl }],
  openGraph: {
    title: `${profile.name} — Software & Data Systems`,
    description: profile.summary,
    url: profile.siteUrl,
    siteName: profile.name,
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <head>
        <link rel="preconnect" href="https://api.fontshare.com" crossOrigin="" />
        <link
          href="https://api.fontshare.com/v2/css?f[]=clash-display@500,600,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Navbar />
        <main id="main">{children}</main>
        <Footer />
        <ChatBot />
      </body>
    </html>
  );
}
