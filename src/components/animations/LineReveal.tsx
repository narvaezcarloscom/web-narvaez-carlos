"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface LineRevealProps {
  className?: string;
  direction?: "left" | "right";
}

export default function LineReveal({
  className = "",
  direction = "left",
}: LineRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!ref.current) return;

      gsap.fromTo(
        ref.current,
        {
          scaleX: 0,
          transformOrigin: direction === "left" ? "left center" : "right center",
        },
        {
          scaleX: 1,
          duration: 1.8,
          ease: "expo.inOut",
          scrollTrigger: {
            trigger: ref.current,
            start: "top 90%",
            once: true,
          },
        }
      );
    },
    { scope: ref }
  );

  return (
    <div
      ref={ref}
      className={`h-[1px] bg-neutral-light ${className}`}
      style={{ transform: "scaleX(0)" }}
    />
  );
}
