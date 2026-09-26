"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { profile } from "@/lib/content/profile";
import { cn } from "@/lib/utils";

const isActive = (pathname: string, href: string) =>
  pathname === href || pathname.startsWith(`${href}/`);

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const reduced = useReducedMotion();
  const toggleRef = useRef<HTMLButtonElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const items = profile.nav.slice(1);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    const onClick = (e: MouseEvent) => {
      if (!headerRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("click", onClick);
    };
  }, [open]);

  return (
    <header
      ref={headerRef}
      className={cn(
        "sticky top-0 z-50 border-b bg-warm/85 backdrop-blur-md transition-[box-shadow,border-color] duration-300",
        scrolled || open
          ? "border-line-strong shadow-[0_8px_24px_-18px_rgba(27,67,50,0.35)]"
          : "border-line",
      )}
    >
      <nav
        className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6"
        aria-label="Main navigation"
      >
        <Link
          href="/"
          aria-current={pathname === "/" ? "page" : undefined}
          className="group flex items-center gap-2.5 font-display text-lg font-semibold text-forest"
        >
          <Image
            src="/images/logo-mark-512.png"
            alt=""
            width={28}
            height={28}
            priority
            className="h-7 w-7 transition-transform duration-300 group-hover:-rotate-6"
          />
          Gervi Corado
        </Link>

        <ul className="hidden items-center gap-1 lg:flex">
          {items.map((item) => {
            const active = isActive(pathname, item.href);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "relative block rounded-full px-3 py-2 text-sm transition-colors duration-200",
                    active ? "font-medium text-forest" : "text-charcoal hover:bg-warm-200/70 hover:text-forest",
                  )}
                >
                  {item.label}
                  {active && (
                    <svg
                      viewBox="0 0 60 8"
                      preserveAspectRatio="none"
                      aria-hidden="true"
                      className="absolute inset-x-3 -bottom-0.5 h-1.5 w-[calc(100%-1.5rem)] text-sage"
                    >
                      <path
                        d="M2 5 C 15 2, 30 2, 44 4 S 56 6, 58 3"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.4"
                        strokeLinecap="round"
                        vectorEffect="non-scaling-stroke"
                      />
                    </svg>
                  )}
                </Link>
              </li>
            );
          })}
          <li className="ml-3">
            <Link
              href="/resume"
              aria-current={isActive(pathname, "/resume") ? "page" : undefined}
              className={cn(
                "btn btn-sm",
                isActive(pathname, "/resume") ? "btn-primary" : "btn-soft",
              )}
            >
              Resume
            </Link>
          </li>
        </ul>

        <button
          ref={toggleRef}
          type="button"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          className="-mr-2 grid h-11 w-11 cursor-pointer place-items-center rounded-full text-charcoal transition-colors duration-200 hover:bg-warm-200 lg:hidden"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id="mobile-menu"
            key="mobile-menu"
            initial={reduced ? false : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={reduced ? undefined : { height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.21, 0.6, 0.35, 1] }}
            className="overflow-hidden border-t border-line lg:hidden"
          >
            <ul className="mx-auto max-w-6xl px-6 pb-6 pt-2">
              {items.map((item, i) => {
                const active = isActive(pathname, item.href);
                return (
                  <li key={item.href} className="border-b border-line last:border-0">
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "flex min-h-12 items-center gap-4 py-3 text-base",
                        active ? "font-medium text-forest" : "text-charcoal",
                      )}
                    >
                      <span className="w-6 font-mono text-[0.68rem] text-slate">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {item.label}
                      {active && <span aria-hidden="true" className="ml-auto h-2 w-2 rounded-full bg-emerald" />}
                    </Link>
                  </li>
                );
              })}
              <li className="pt-5">
                <Link
                  href="/resume"
                  onClick={() => setOpen(false)}
                  aria-current={isActive(pathname, "/resume") ? "page" : undefined}
                  className="btn btn-primary w-full"
                >
                  Resume
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
