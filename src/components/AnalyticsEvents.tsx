"use client";

import { useEffect } from "react";
import { track } from "@vercel/analytics";

export default function AnalyticsEvents() {
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const el = target.closest<HTMLElement>("[data-track-event]");
      if (!el) return;

      const name = el.dataset.trackEvent;
      if (!name) return;

      const props: Record<string, string> = {};
      for (const key in el.dataset) {
        if (key.startsWith("trackProp")) {
          const propKey = key
            .slice("trackProp".length)
            .replace(/^./, (c) => c.toLowerCase());
          const value = el.dataset[key];
          if (value) props[propKey] = value;
        }
      }

      track(name, props);
    }

    document.addEventListener("click", handleClick, { capture: true });
    return () => {
      document.removeEventListener("click", handleClick, { capture: true });
    };
  }, []);

  return null;
}
