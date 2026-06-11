import Link from "next/link";
import { Github, Linkedin, Mail } from "lucide-react";
import { profile } from "@/lib/content/profile";

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-6 py-12 sm:flex-row sm:items-center">
        <div>
          <p className="font-display text-lg font-semibold text-forest">
            Gervi Corado
          </p>
          <p className="mt-1 text-sm text-slate">{profile.tagline}</p>
        </div>
        <div className="flex items-center gap-5">
          <a
            href={profile.links.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="cursor-pointer text-slate transition-colors duration-200 hover:text-forest"
          >
            <Github size={20} />
          </a>
          <a
            href={profile.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="cursor-pointer text-slate transition-colors duration-200 hover:text-forest"
          >
            <Linkedin size={20} />
          </a>
          <a
            href={`mailto:${profile.email}`}
            aria-label="Email"
            className="cursor-pointer text-slate transition-colors duration-200 hover:text-forest"
          >
            <Mail size={20} />
          </a>
          <Link href="/contact" className="link-underline text-sm font-medium text-charcoal">
            Get in touch
          </Link>
        </div>
      </div>
    </footer>
  );
}
