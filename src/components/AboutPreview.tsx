"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Dictionary } from "../lib/dictionaries/en";
import Container from "./Container";
import CountUp from "./animations/CountUp";

gsap.registerPlugin(ScrollTrigger);

interface AboutPreviewProps {
  dict: Dictionary;
}

export default function AboutPreview({ dict }: AboutPreviewProps) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!ref.current) return;

      gsap.fromTo(
        "[data-anim='about-line']",
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.4,
          stagger: 0.2,
          ease: "expo.out",
          scrollTrigger: {
            trigger: "[data-anim='about-statement']",
            start: "top 80%",
            once: true,
          },
        }
      );

      gsap.fromTo(
        "[data-anim='about-body']",
        { y: 35, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          stagger: 0.18,
          ease: "power4.out",
          scrollTrigger: {
            trigger: "[data-anim='about-right']",
            start: "top 85%",
            once: true,
          },
        }
      );

      gsap.fromTo(
        "[data-anim='value']",
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power4.out",
          scrollTrigger: {
            trigger: "[data-anim='values']",
            start: "top 90%",
            once: true,
          },
        }
      );

      gsap.fromTo(
        "[data-anim='stat']",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.15,
          ease: "power4.out",
          scrollTrigger: {
            trigger: "[data-anim='stats']",
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
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          {/* Left — Statement */}
          <div className="md:col-span-7">
            <p
              data-anim="about-line"
              className="text-xs uppercase tracking-widest text-graphite/50 mb-6"
              style={{ opacity: 0 }}
            >
              {dict.about.label}
            </p>
            <h2
              data-anim="about-statement"
              className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl editorial-heading leading-[1.1]"
            >
              {dict.about.heading.map((line, i) => (
                <span key={i} data-anim="about-line" className="block" style={{ opacity: 0 }}>
                  {i === 2 ? <>{line.split(" ").slice(0, -1).join(" ")} <em>{line.split(" ").slice(-1)}</em></> : line}
                </span>
              ))}
            </h2>
          </div>

          {/* Right — Description */}
          <div
            data-anim="about-right"
            className="md:col-span-4 md:col-start-9 flex flex-col justify-end"
          >
            <p
              data-anim="about-body"
              className="text-graphite text-base leading-relaxed mb-6"
              style={{ opacity: 0 }}
            >
              {dict.about.body1}
            </p>
            <p
              data-anim="about-body"
              className="text-graphite text-base leading-relaxed"
              style={{ opacity: 0 }}
            >
              {dict.about.body2}
            </p>

            {/* Values */}
            <div
              data-anim="values"
              className="mt-10 grid grid-cols-2 gap-x-6 gap-y-4 text-xs uppercase tracking-widest text-charcoal"
            >
              {dict.about.values.map((v) => (
                <span key={v} data-anim="value" style={{ opacity: 0 }}>{v}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Stats */}
        <div
          data-anim="stats"
          className="mt-20 md:mt-24 pt-12 border-t border-neutral-light grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          <div data-anim="stat" style={{ opacity: 0 }}>
            <p className="font-serif text-3xl sm:text-4xl md:text-5xl text-charcoal">
              <CountUp end={100} suffix="%" duration={2.4} />
            </p>
            <p className="text-xs text-graphite/50 mt-3 uppercase tracking-widest">
              Client satisfaction
            </p>
          </div>
          <div data-anim="stat" style={{ opacity: 0 }}>
            <p className="font-serif text-3xl sm:text-4xl md:text-5xl text-charcoal">
              <CountUp end={45} suffix="+" duration={2} />
            </p>
            <p className="text-xs text-graphite/50 mt-3 uppercase tracking-widest">
              Websites built
            </p>
          </div>
          <div data-anim="stat" style={{ opacity: 0 }}>
            <p className="font-serif text-3xl sm:text-4xl md:text-5xl text-charcoal">
              <CountUp end={4} suffix="+" duration={1.6} />
            </p>
            <p className="text-xs text-graphite/50 mt-3 uppercase tracking-widest">
              Years of experience
            </p>
          </div>
          <div data-anim="stat" style={{ opacity: 0 }}>
            <p className="font-serif text-3xl sm:text-4xl md:text-5xl text-charcoal">
              <CountUp end={3} suffix="" duration={1.4} />
            </p>
            <p className="text-xs text-graphite/50 mt-3 uppercase tracking-widest">
              HubSpot certifications
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
