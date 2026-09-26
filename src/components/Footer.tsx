import Link from "next/link";
import { Github, Linkedin, Mail } from "lucide-react";
import { profile } from "@/lib/content/profile";
import { TopoLines } from "./field/TopoLines";

export function Footer() {
  const social = [
    { href: profile.links.github, label: "GitHub", Icon: Github, external: true },
    { href: profile.links.linkedin, label: "LinkedIn", Icon: Linkedin, external: true },
    { href: `mailto:${profile.email}`, label: "Email", Icon: Mail, external: false },
  ];

  return (
    <footer className="relative isolate overflow-hidden border-t border-line">
      <TopoLines seed={29} hills={1} rings={8} className="absolute -bottom-24 -right-24 -z-10 h-80 w-[36rem] text-sage/40" />
      <div className="mx-auto grid max-w-6xl gap-10 px-6 pb-28 pt-14 sm:pb-14 md:grid-cols-[1.4fr_1fr_auto]">
        <div>
          <p className="font-display text-lg font-semibold text-forest">Gervi Corado</p>
          <p className="mt-1 text-sm text-ink-soft">{profile.tagline}</p>
          <p className="mt-4 font-mono text-[0.66rem] uppercase tracking-[0.16em] text-slate">
            {profile.location}
          </p>
        </div>

        <nav aria-label="Footer">
          <ul className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
            {profile.nav.slice(1).map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="link-underline text-ink-soft transition-colors duration-200 hover:text-forest">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex flex-col items-start gap-4 md:items-end">
          <div className="flex items-center gap-2">
            {social.map(({ href, label, Icon, external }) => (
              <a
                key={label}
                href={href}
                {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                aria-label={label}
                className="grid h-11 w-11 cursor-pointer place-items-center rounded-full border border-line-strong bg-paper text-slate shadow-raised transition-colors duration-200 hover:border-emerald/40 hover:text-forest"
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
          <Link href="/contact" className="link-underline text-sm font-medium text-charcoal">
            Get in touch
          </Link>
        </div>
      </div>
    </footer>
  );
}
