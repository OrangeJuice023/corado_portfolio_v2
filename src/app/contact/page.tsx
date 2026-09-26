import type { Metadata } from "next";
import { ArrowUpRight, Github, Linkedin, Mail, FileText } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { ContactForm } from "@/components/ContactForm";
import { TopoLines } from "@/components/field/TopoLines";
import { profile } from "@/lib/content/profile";

export const metadata: Metadata = {
  alternates: { canonical: "/contact" },
  title: "Contact",
  description: "Get in touch with Gervi Corado.",
};

const channels = [
  { label: "Email", href: `mailto:${profile.email}`, icon: Mail, value: profile.email },
  { label: "LinkedIn", href: profile.links.linkedin, icon: Linkedin, value: "Connect" },
  { label: "GitHub", href: profile.links.github, icon: Github, value: "OrangeJuice023" },
  { label: "Resume", href: "/resume", icon: FileText, value: "Interactive + PDF" },
];

export default function ContactPage() {
  return (
    <div className="relative isolate">
      <TopoLines fade seed={47} className="absolute right-0 top-0 -z-10 h-80 w-full max-w-2xl text-sage/45" />
      <div className="mx-auto max-w-5xl px-6 py-20">
        <SectionHeading
          as="h1"
          eyebrow="Contact"
          title="Let's talk systems"
          sub="Whether it's a role, a collaboration, a research idea, or a hard problem — I read everything."
        />

        <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_1.15fr] lg:gap-14">
          <div>
            <ul className="space-y-3">
              {channels.map((c) => (
                <li key={c.label}>
                  <a
                    href={c.href}
                    {...(c.href.startsWith("http")
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    className="surface-paper surface-lift group flex cursor-pointer items-center gap-4 p-5"
                  >
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-forest-50 text-emerald">
                      <c.icon size={19} aria-hidden="true" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-charcoal">{c.label}</p>
                      <p className="truncate text-sm text-slate">{c.value}</p>
                    </div>
                    <ArrowUpRight
                      size={16}
                      aria-hidden="true"
                      className="shrink-0 text-slate transition-all duration-200 group-hover:-translate-y-px group-hover:translate-x-px group-hover:text-forest"
                    />
                  </a>
                </li>
              ))}
            </ul>
            <p className="mt-6 font-mono text-[0.66rem] uppercase tracking-[0.16em] text-slate">
              {profile.location}
            </p>
          </div>
          <div className="surface-paper relative p-6 sm:p-8">
            <span aria-hidden="true" className="tape-corner -top-2 right-8 rotate-3" />
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
}
