"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ProcessDotsProps {
  steps: { label: string; description: string }[];
}

export default function ProcessDots({ steps }: ProcessDotsProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!ref.current) return;

      gsap.fromTo(
        "[data-anim='process-step']",
        { y: 25, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.2,
          ease: "power4.out",
          scrollTrigger: {
            trigger: ref.current,
            start: "top 85%",
            once: true,
          },
        }
      );
    },
    { scope: ref }
  );

  return (
    <div ref={ref} className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-6">
      {steps.map((step, i) => (
        <div
          key={i}
          data-anim="process-step"
          className="flex flex-col items-start"
          style={{ opacity: 0 }}
        >
          {/* Dot — derived from isotipo baseline circles */}
          <div className="flex items-center gap-3 mb-4">
            <div
              className={`w-3 h-3 rounded-full border-[1.5px] transition-colors duration-300 ${
                i === 0
                  ? "bg-narvaez-red border-narvaez-red"
                  : ""
              }`}
              style={i !== 0 ? { borderColor: "var(--text-faint)" } : undefined}
            />
            <span
              className="text-xs uppercase tracking-widest"
              style={{ color: "var(--text-faint)" }}
            >
              0{i + 1}
            </span>
          </div>

          <h3
            className="font-serif text-lg md:text-xl mb-2"
            style={{ color: "var(--text-heading)" }}
          >
            {step.label}
          </h3>
          <p
            className="text-sm leading-relaxed"
            style={{ color: "var(--text-muted)" }}
          >
            {step.description}
          </p>
        </div>
      ))}
    </div>
  );
}
