"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function AnimatedDiagonal({
  className = "",
  size = "md",
}: {
  className?: string;
  size?: "sm" | "md" | "lg" | "hero";
}) {
  const ref = useRef<SVGSVGElement>(null);

  const dimensions = {
    sm: { width: 24, height: 10.69 },
    md: { width: 40, height: 17.81 },
    lg: { width: 64, height: 28.5 },
    hero: { width: 96, height: 42.75 },
  };

  const { width, height } = dimensions[size];
  const strokeLength = Math.ceil(Math.sqrt(width ** 2 + height ** 2)) + 1;

  useGSAP(() => {
    if (!ref.current) return;
    const line = ref.current.querySelector("line");
    if (!line) return;

    gsap.fromTo(
      line,
      { strokeDashoffset: strokeLength },
      {
        strokeDashoffset: 0,
        duration: 0.8,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 85%",
          once: true,
        },
      }
    );
  });

  return (
    <svg
      ref={ref}
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <line
        x1="0"
        y1={height}
        x2={width}
        y2="0"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeDasharray={strokeLength}
        strokeDashoffset={strokeLength}
      />
    </svg>
  );
}
