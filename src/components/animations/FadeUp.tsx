"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface FadeUpProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  stagger?: number;
}

export default function FadeUp({
  children,
  className = "",
  delay = 0,
  stagger = 0,
}: FadeUpProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!ref.current) return;

      const targets = stagger ? ref.current.children : ref.current;

      gsap.fromTo(
        targets,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          delay,
          stagger: stagger || 0,
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
    <div ref={ref} className={className} style={stagger ? undefined : { opacity: 0 }}>
      {children}
    </div>
  );
}
