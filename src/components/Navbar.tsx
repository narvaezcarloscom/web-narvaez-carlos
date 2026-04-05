"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import type { Locale } from "../lib/i18n";
import type { Dictionary } from "../lib/dictionaries/en";
import Container from "./Container";
import ThemeToggle from "./ThemeToggle";

interface NavbarProps {
  lang: Locale;
  dict: Dictionary;
}

export default function Navbar({ lang, dict }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const prefix = lang === "en" ? "" : `/${lang}`;
  const links = [
    { href: `${prefix}/services`, label: dict.nav.services },
    { href: `${prefix}/work`, label: dict.nav.work },
    { href: `${prefix}/about`, label: dict.nav.about },
    { href: `${prefix}/journal`, label: dict.nav.journal },
    { href: `${prefix}/contact`, label: dict.nav.contact },
  ];

  const switchLang = lang === "en" ? "es" : "en";
  const switchHref =
    lang === "en" ? `/es${pathname}` : pathname.replace(/^\/es/, "") || "/";

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-sm" style={{ backgroundColor: "color-mix(in srgb, var(--bg-primary) 90%, transparent)" }}>
        <Container>
          <nav className="flex h-20 items-center justify-between">
            <Link href={`${prefix}/`} aria-label="Narvaez Digital Marketing — Home">
              <svg
                width="38"
                height="37"
                viewBox="5.79 5.88 44.02 42.69"
                xmlns="http://www.w3.org/2000/svg"
                role="img"
                aria-hidden="true"
              >
                <rect x="5.79" y="5.88" width="44.02" height="42.69" rx="3.24" ry="3.24" style={{ fill: "var(--iso-bg)" }} />
                <path d="M41.62,39.42v-19.83c0-4.09-3.21-7.43-7.25-7.62h-.85c-.06,0-.11,0-.16.01-.98.07-1.9.33-2.74.76-2.29,1.11-3.94,3.34-4.23,5.99v.92h5.6c.76,0,1.37.61,1.37,1.36v18.42c0,1.48-1.2,2.68-2.68,2.71h-.06v.33h13.75v-.3c-1.52,0-2.75-1.23-2.75-2.75Z" style={{ fill: "var(--iso-fg)" }} />
                <path d="M14.09,16.86l-2.75,1.22v1.6h1.41c.74,0,1.34.6,1.34,1.34v18.41c0,1.52-1.23,2.75-2.75,2.75v.3h13.76v-.34h-.04c-1.5-.02-2.71-1.22-2.71-2.71v-18.37c0-.76.62-1.38,1.38-1.38h1.37v-7.7l-2.75,1.22-8.26,3.66Z" style={{ fill: "var(--iso-fg)" }} />
              </svg>
            </Link>

            {/* Desktop Nav */}
            <ul className="hidden md:flex items-center gap-10 text-sm list-none m-0 p-0">
              {links.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="link-underline transition-colors"
                    style={{ color: "var(--text-body)" }}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href="https://app.narvaezcarlos.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline transition-colors"
                  style={{ color: "var(--text-body)" }}
                  translate="no"
                >
                  Studio OS
                </a>
              </li>
              <li>
                <Link
                  href={switchHref}
                  className="text-xs uppercase tracking-widest opacity-40 hover:opacity-100 transition-opacity"
                  style={{ color: "var(--text-body)", borderColor: "var(--border-color)", border: "1px solid", padding: "4px 12px" }}
                >
                  {switchLang.toUpperCase()}
                </Link>
              </li>
              <li>
                <ThemeToggle className="opacity-40 hover:opacity-100" />
              </li>
            </ul>

            {/* Mobile Toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden flex flex-col justify-center gap-1.5 w-8 h-8"
              aria-label="Toggle menu"
            >
              <span
                className={`block h-[1.5px] w-full transition-all duration-300 ${
                  isOpen ? "rotate-45 translate-y-[4.5px]" : ""
                }`}
                style={{ backgroundColor: "var(--text-heading)" }}
              />
              <span
                className={`block h-[1.5px] w-full transition-all duration-300 ${
                  isOpen ? "-rotate-45 -translate-y-[4.5px]" : ""
                }`}
                style={{ backgroundColor: "var(--text-heading)" }}
              />
            </button>
          </nav>
        </Container>
      </header>

      {/* Mobile Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-charcoal transition-opacity duration-500 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Close button inside overlay */}
        <div className="absolute top-0 left-0 right-0 px-6 md:px-12 lg:px-20">
          <div className="flex h-20 items-center justify-end">
            <button
              onClick={() => setIsOpen(false)}
              className="flex flex-col justify-center gap-1.5 w-8 h-8"
              aria-label="Close menu"
            >
              <span className="block h-[1.5px] w-full bg-ivory transition-all duration-300 rotate-45 translate-y-[4.5px]" />
              <span className="block h-[1.5px] w-full bg-ivory transition-all duration-300 -rotate-45 -translate-y-[4.5px]" />
            </button>
          </div>
        </div>

        <div className="flex flex-col justify-center items-start h-full px-8 sm:px-10">
          <nav className="flex flex-col gap-6 sm:gap-8">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setIsOpen(false)}
                className="text-ivory font-serif text-4xl sm:text-5xl editorial-heading hover:text-narvaez-red transition-colors duration-300"
              >
                {l.label}
              </Link>
            ))}
            <a
              href="https://app.narvaezcarlos.com"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsOpen(false)}
              className="text-ivory font-serif text-4xl sm:text-5xl editorial-heading hover:text-narvaez-red transition-colors duration-300"
              translate="no"
            >
              Studio OS
            </a>
          </nav>
          <div className="mt-12 sm:mt-16 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
            <span className="text-ivory/50 text-xs sm:text-sm">
              {dict.common.studioLocation}
            </span>
            <div className="flex items-center gap-4">
              <Link
                href={switchHref}
                onClick={() => setIsOpen(false)}
                className="text-xs uppercase tracking-widest text-ivory/40 hover:text-ivory transition-colors border border-ivory/20 px-3 py-1.5"
              >
                {switchLang.toUpperCase()}
              </Link>
              <ThemeToggle className="text-ivory/40 hover:text-ivory" />
            </div>
          </div>
        </div>
      </div>

      <div className="h-20" />
    </>
  );
}
