"use client";

import { useRef } from "react";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Locale } from "../lib/i18n";
import type { Dictionary } from "../lib/dictionaries/en";
import Container from "./Container";
import { projects } from "../lib/projects";

gsap.registerPlugin(ScrollTrigger);

interface WorkPreviewProps {
  lang: Locale;
  dict: Dictionary;
}

export default function WorkPreview({ lang, dict }: WorkPreviewProps) {
  const prefix = lang === "en" ? "" : `/${lang}`;
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!ref.current) return;

      gsap.fromTo(
        "[data-anim='work-heading']",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.4,
          ease: "expo.out",
          scrollTrigger: { trigger: ref.current, start: "top 75%", once: true },
        }
      );

      gsap.fromTo(
        "[data-anim='project-row']",
        { y: 25, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.12,
          ease: "power4.out",
          scrollTrigger: {
            trigger: "[data-anim='project-list']",
            start: "top 80%",
            once: true,
          },
        }
      );

    },
    { scope: ref }
  );

  return (
    <section ref={ref} className="py-24 md:py-32 bg-charcoal">
      <Container>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16 md:mb-20">
          <div data-anim="work-heading" style={{ opacity: 0 }}>
            <p className="text-xs uppercase tracking-widest text-ivory/30 mb-3">
              {dict.work.label}
            </p>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl editorial-heading text-ivory">
              {dict.work.heading}
            </h2>
          </div>
          <Link
            href={`${prefix}/work`}
            data-anim="work-heading"
            className="mt-6 md:mt-0 link-underline text-sm text-ivory/60 hover:text-ivory transition-colors"
            style={{ opacity: 0 }}
          >
            {dict.work.viewAll}
          </Link>
        </div>

        <div data-anim="project-list" className="border-t border-ivory/10">
          {projects.slice(0, 5).map((project, i) => (
            <Link
              key={project.id}
              href={`${prefix}/work/${project.id}`}
              data-anim="project-row"
              className="group border-b border-ivory/10 py-6 md:py-8 flex items-center justify-between hover:border-ivory/30 transition-colors duration-300"
              style={{ opacity: 0 }}
            >
              <div className="flex items-baseline gap-6">
                <span className="text-xs text-ivory/20 font-medium w-6">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-serif text-xl md:text-2xl lg:text-3xl text-ivory group-hover:text-narvaez-red transition-colors duration-300">
                  {project.name}
                </h3>
              </div>
              <div className="hidden md:flex items-center gap-8 text-xs text-ivory/40">
                <span>{project.category}</span>
                <span>{project.year}</span>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  className="transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300"
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
