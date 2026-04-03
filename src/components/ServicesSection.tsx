"use client";

import { useRef } from "react";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Locale } from "../lib/i18n";
import type { Dictionary } from "../lib/dictionaries/en";
import Container from "./Container";
import { services } from "../lib/services";

gsap.registerPlugin(ScrollTrigger);

interface ServicesSectionProps {
  lang: Locale;
  dict: Dictionary;
}

export default function ServicesSection({ lang, dict }: ServicesSectionProps) {
  const prefix = lang === "en" ? "" : `/${lang}`;
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!ref.current) return;

      const headerTl = gsap.timeline({
        defaults: { ease: "expo.out" },
        scrollTrigger: { trigger: ref.current, start: "top 80%", once: true },
      });

      headerTl
        .fromTo(
          "[data-anim='services-label']",
          { y: 25, opacity: 0 },
          { y: 0, opacity: 1, duration: 1 }
        )
        .fromTo(
          "[data-anim='services-heading']",
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.4 },
          "-=0.7"
        )
        .fromTo(
          "[data-anim='services-desc']",
          { y: 35, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.2 },
          "-=0.9"
        );

      gsap.fromTo(
        "[data-anim='service-card']",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          stagger: 0.2,
          ease: "power4.out",
          scrollTrigger: {
            trigger: "[data-anim='services-grid']",
            start: "top 85%",
            once: true,
          },
        }
      );
    },
    { scope: ref }
  );

  return (
    <section ref={ref} className="py-24 md:py-32">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-16 md:mb-20">
          <div className="md:col-span-4">
            <p
              data-anim="services-label"
              className="text-xs uppercase tracking-widest text-graphite/50 mb-3"
              style={{ opacity: 0 }}
            >
              {dict.services.label}
            </p>
            <h2
              data-anim="services-heading"
              className="font-serif text-4xl md:text-5xl lg:text-6xl editorial-heading"
              style={{ opacity: 0 }}
            >
              {dict.services.heading}
            </h2>
          </div>
          <div className="md:col-span-5 md:col-start-6 flex items-end">
            <p
              data-anim="services-desc"
              className="text-graphite text-base md:text-lg leading-relaxed"
              style={{ opacity: 0 }}
            >
              {dict.services.description}
            </p>
          </div>
        </div>

        <div
          data-anim="services-grid"
          className="grid grid-cols-1 md:grid-cols-2 gap-[1px] bg-neutral-light"
        >
          {services.map((service, i) => (
            <Link
              key={service.id}
              href={`${prefix}/services/${service.id}`}
              data-anim="service-card"
              className="group bg-ivory p-6 sm:p-8 md:p-12 flex flex-col justify-between min-h-[220px] sm:min-h-[280px] hover:bg-neutral-light/50 transition-colors duration-500"
              style={{ opacity: 0 }}
            >
              <div>
                <span className="text-xs text-graphite/40 font-medium">
                  0{i + 1}
                </span>
                <h3 className="font-serif text-2xl md:text-3xl mt-4 mb-4 text-charcoal group-hover:text-narvaez-red transition-colors duration-300">
                  {service.name}
                </h3>
                <p className="text-graphite text-sm leading-relaxed max-w-sm">
                  {service.summary}
                </p>
              </div>
              <div className="mt-8 flex items-center gap-2 text-xs uppercase tracking-wide text-graphite/50 group-hover:text-narvaez-red transition-colors duration-300">
                {dict.services.learnMore}
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 14 14"
                  fill="none"
                  className="transform group-hover:translate-x-1 transition-transform duration-300"
                >
                  <path
                    d="M1 13L13 1M13 1H3M13 1V11"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                </svg>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
