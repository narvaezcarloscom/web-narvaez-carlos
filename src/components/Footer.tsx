import Link from "next/link";
import type { Locale } from "../lib/i18n";
import type { Dictionary } from "../lib/dictionaries/en";
import Container from "./Container";
import DiagonalSlash from "./DiagonalSlash";
import { CookieSettingsButton } from "./CookieBanner";

const socialLinks = [
  { label: "Instagram", href: "https://instagram.com/narvaezcarloscom/" },
  { label: "YouTube", href: "https://youtube.com/@narvaezcarloscom" },
  { label: "GitHub", href: "https://github.com/narvaezcarloscom" },
  { label: "LinkedIn", href: "https://linkedin.com/in/narvaezcarlos" },
];

interface FooterProps {
  lang: Locale;
  dict: Dictionary;
}

export default function Footer({ lang, dict }: FooterProps) {
  const prefix = lang === "en" ? "" : `/${lang}`;
  const navLinks = [
    { label: dict.nav.services, href: `${prefix}/services` },
    { label: dict.nav.work, href: `${prefix}/work` },
    { label: dict.nav.journal, href: `${prefix}/journal` },
    { label: dict.nav.contact, href: `${prefix}/contact` },
  ];

  return (
    <footer className="border-t border-neutral-light mt-auto">
      <Container>
        <div className="py-16 md:py-24">
          <div className="mb-16 md:mb-24">
            <h2 className="font-serif text-3xl sm:text-4xl md:text-6xl lg:text-7xl editorial-heading text-charcoal">
              {dict.footer.heading}
              <br />
              <span className="italic">{dict.footer.headingItalic}</span>
            </h2>
            <div className="mt-8">
              <Link
                href={`${prefix}/contact`}
                className="inline-flex items-center gap-2 bg-narvaez-red text-ivory px-8 py-4 text-sm font-medium tracking-wide uppercase hover:bg-narvaez-red-hover transition-colors duration-300"
              >
                {dict.footer.cta}
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="ml-1">
                  <path d="M1 13L13 1M13 1H3M13 1V11" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-sm text-graphite">
            <div>
              <p className="font-medium text-charcoal uppercase tracking-wide text-xs mb-4">
                {dict.footer.brand}
              </p>
              <div className="flex items-center gap-3 leading-relaxed">
                <span>designing with intention</span>
                <DiagonalSlash size="sm" className="text-graphite/20 shrink-0" />
                <span>from brand to platform</span>
              </div>
            </div>
            <div>
              <p className="font-medium text-charcoal uppercase tracking-wide text-xs mb-4">
                {dict.footer.navigation}
              </p>
              <ul className="space-y-2 list-none m-0 p-0">
                {navLinks.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="link-underline hover:text-charcoal transition-colors">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="font-medium text-charcoal uppercase tracking-wide text-xs mb-4">
                {dict.footer.connect}
              </p>
              <ul className="space-y-2 list-none m-0 p-0">
                {socialLinks.map((l) => (
                  <li key={l.href}>
                    <a href={l.href} target="_blank" rel="noopener noreferrer" className="link-underline hover:text-charcoal transition-colors">
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-16 pt-8 border-t border-neutral-light flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-xs text-graphite/60">
            <p>&copy; {new Date().getFullYear()} Narvaez Digital Marketing. {dict.footer.rights}</p>
            <div className="flex items-center gap-4">
              <Link href={`${prefix}/privacy`} className="hover:text-graphite transition-colors">
                {dict.footer.privacy}
              </Link>
              <span className="text-graphite/30">|</span>
              <Link href={`${prefix}/terms`} className="hover:text-graphite transition-colors">
                {dict.footer.terms}
              </Link>
              <span className="text-graphite/30">|</span>
              <CookieSettingsButton lang={lang} />
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}
