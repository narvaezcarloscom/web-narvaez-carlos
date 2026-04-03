"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface CountUpProps {
  end: number;
  suffix?: string;
  duration?: number;
  className?: string;
}

export default function CountUp({
  end,
  suffix = "",
  duration = 2.4,
  className = "",
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const counterRef = useRef({ value: 0 });

  useGSAP(
    () => {
      if (!ref.current) return;

      gsap.to(counterRef.current, {
        value: end,
        duration,
        ease: "expo.out",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 88%",
          once: true,
        },
        onUpdate: () => {
          if (ref.current) {
            ref.current.textContent =
              Math.round(counterRef.current.value) + suffix;
          }
        },
      });
    },
    { scope: ref }
  );

  return (
    <span ref={ref} className={className}>
      0{suffix}
    </span>
  );
}
