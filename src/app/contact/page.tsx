import type { Metadata } from "next";
import { Github, Linkedin, Mail, FileText } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { ContactForm } from "@/components/ContactForm";
import { profile } from "@/lib/content/profile";

export const metadata: Metadata = {
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
    <div className="mx-auto max-w-5xl px-6 py-20">
      <SectionHeading
        eyebrow="Contact"
        title="Let's talk systems"
        sub="Whether it's a role, a collaboration, a research idea, or a hard problem — I read everything."
      />

      <div className="mt-12 grid gap-12 lg:grid-cols-2">
        <ul className="space-y-3">
          {channels.map((c) => (
            <li key={c.label}>
              <a
                href={c.href}
                {...(c.href.startsWith("http")
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                className="group flex cursor-pointer items-center gap-4 rounded-[18px] border border-line bg-white/55 p-5 transition-all duration-200 hover:border-emerald/40"
              >
                <c.icon size={20} className="text-emerald" />
                <div>
                  <p className="text-sm font-medium text-charcoal">{c.label}</p>
                  <p className="text-sm text-slate">{c.value}</p>
                </div>
              </a>
            </li>
          ))}
        </ul>
        <ContactForm />
      </div>
    </div>
  );
}
