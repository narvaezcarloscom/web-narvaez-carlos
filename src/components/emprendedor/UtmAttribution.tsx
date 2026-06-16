"use client";

import { useEffect } from "react";

// Reads UTM params from the URL on mount. If none are present, applies a
// brochure/QR heuristic — the printed QR points to the clean /emprendedor URL
// without UTMs. This is a CHANNEL heuristic, not a per-lead attribution: a
// visitor could also type the URL by hand, which is rare but possible.
// Resolved attribution is persisted in sessionStorage so the form submit
// can include it as hidden fields, and a custom event is pushed to the
// dataLayer for whatever GTM tags decide to fire on it.

const STORAGE_KEY = "emprendedor_attribution";

export type Attribution = {
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  resolved_from: "url" | "heuristic_qr";
};

export function readAttribution(): Attribution | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Attribution) : null;
  } catch {
    return null;
  }
}

export default function UtmAttribution() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const utm_source = params.get("utm_source") || "";
    const utm_medium = params.get("utm_medium") || "";
    const utm_campaign = params.get("utm_campaign") || "";

    const hasAny = utm_source || utm_medium || utm_campaign;

    const attribution: Attribution = hasAny
      ? {
          utm_source,
          utm_medium,
          utm_campaign,
          resolved_from: "url",
        }
      : {
          utm_source: "brochure",
          utm_medium: "qr",
          utm_campaign: "elcentro",
          resolved_from: "heuristic_qr",
        };

    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(attribution));
    } catch {
      // ignore — sessionStorage may be blocked in private browsing
    }

    const w = window as typeof window & { dataLayer?: Record<string, unknown>[] };
    w.dataLayer = w.dataLayer || [];
    w.dataLayer.push({
      event: "landing_emprendedor_view",
      utm_source: attribution.utm_source,
      utm_medium: attribution.utm_medium,
      utm_campaign: attribution.utm_campaign,
      attribution_resolved_from: attribution.resolved_from,
    });
  }, []);

  return null;
}
