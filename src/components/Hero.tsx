"use client";

import { useRef } from "react";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import type { Locale } from "../lib/i18n";
import type { Dictionary } from "../lib/dictionaries/en";
import Container from "./Container";
import GridTexture from "./GridTexture";
import DiagonalSlash from "./DiagonalSlash";

interface HeroProps {
  lang: Locale;
  dict: Dictionary;
}

export default function Hero({ lang, dict }: HeroProps) {
  const prefix = lang === "en" ? "" : `/${lang}`;
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!ref.current) return;

      const tl = gsap.timeline({
        defaults: { ease: "expo.out" },
        delay: 0.2,
      });

      tl.fromTo(
        "[data-anim='label']",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2 }
      )
        .fromTo(
          "[data-anim='heading'] > *",
          { y: 80, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.6, stagger: 0.18 },
          "-=0.8"
        )
        .fromTo(
          "[data-anim='body']",
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.4 },
          "-=1.0"
        )
        .fromTo(
          "[data-anim='cta']",
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.2 },
          "-=0.8"
        )
        .fromTo(
          "[data-anim='scroll']",
          { opacity: 0 },
          { opacity: 1, duration: 1.5 },
          "-=0.5"
        );
    },
    { scope: ref }
  );

  return (
    <section ref={ref} className="relative min-h-[85vh] sm:min-h-[90vh] flex items-center pt-10 sm:pt-0">
      <GridTexture />
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-end">
          <div className="md:col-span-8">
            <p
              data-anim="label"
              className="text-xs sm:text-sm uppercase tracking-wide text-graphite/60 mb-4 sm:mb-6"
              style={{ opacity: 0 }}
            >
              {dict.hero.label}
            </p>
            <DiagonalSlash className="text-graphite/20 mb-4 sm:mb-6" />
            <h1
              data-anim="heading"
              className="font-serif text-[2.5rem] sm:text-5xl md:text-7xl lg:text-8xl xl:text-[7rem] editorial-heading text-charcoal"
            >
              {dict.hero.heading.map((line, i) => (
                <span key={i} className="block" style={{ opacity: 0 }}>
                  {i === 1 ? <>{line.split(" ").slice(0, -1).join(" ")} <em>{line.split(" ").slice(-1)}</em></> : line}
                </span>
              ))}
            </h1>
          </div>

          <div className="md:col-span-4 md:pb-2">
            <p
              data-anim="body"
              className="text-sm sm:text-base md:text-lg text-graphite leading-relaxed max-w-md"
              style={{ opacity: 0 }}
            >
              {dict.hero.body}
            </p>
            <div
              data-anim="cta"
              className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6"
              style={{ opacity: 0 }}
            >
              <Link
                href={`${prefix}/contact`}
                className="inline-flex items-center gap-2 bg-narvaez-red text-ivory px-7 py-3.5 text-sm font-medium tracking-wide uppercase hover:bg-narvaez-red-hover transition-colors duration-300"
              >
                {dict.hero.cta}
              </Link>
              <Link
                href={`${prefix}/work`}
                className="link-underline text-sm text-graphite hover:text-charcoal transition-colors"
              >
                {dict.hero.ctaSecondary}
              </Link>
            </div>
          </div>
        </div>

        <div
          data-anim="scroll"
          className="mt-12 sm:mt-20 lg:mt-32 flex items-center gap-3 text-graphite/40 text-xs uppercase tracking-widest"
          style={{ opacity: 0 }}
        >
          <span className="w-8 h-[1px] bg-graphite/30" />
          {dict.hero.scroll}
        </div>
      </Container>
    </section>
  );
}
