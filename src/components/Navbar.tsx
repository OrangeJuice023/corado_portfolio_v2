"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { profile } from "@/lib/content/profile";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-warm/85 backdrop-blur-md">
      <nav
        className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6"
        aria-label="Main navigation"
      >
        <Link href="/" className="font-display text-lg font-semibold text-forest">
          Gervi Corado
        </Link>

        <ul className="hidden items-center gap-6 lg:flex">
          {profile.nav.slice(1).map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={cn(
                  "link-underline text-sm transition-colors duration-200",
                  pathname === item.href
                    ? "font-medium text-forest"
                    : "text-charcoal hover:text-forest",
                )}
              >
                {item.label}
              </Link>
            </li>
          ))}
          <li>
            <Link
              href="/resume"
              className="cursor-pointer rounded-full border border-forest px-4 py-1.5 text-sm font-medium text-forest transition-colors duration-200 hover:bg-forest hover:text-warm"
            >
              Resume
            </Link>
          </li>
        </ul>

        <button
          type="button"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          className="cursor-pointer p-2 lg:hidden"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {open && (
        <ul className="border-t border-line px-6 pb-6 pt-2 lg:hidden">
          {[...profile.nav.slice(1), { label: "Resume", href: "/resume" }].map(
            (item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "block py-3 text-base",
                    pathname === item.href
                      ? "font-medium text-forest"
                      : "text-charcoal",
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ),
          )}
        </ul>
      )}
    </header>
  );
}
