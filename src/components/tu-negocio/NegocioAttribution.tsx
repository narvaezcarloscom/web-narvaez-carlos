"use client";

import { useEffect } from "react";

/*
  Lee los UTM de la URL al montar. Sigue el patron de
  `components/emprendedor/UtmAttribution.tsx` con UNA diferencia que importa:
  captura tambien `utm_content`.

  Por que importa: el QR de cada tienda lleva su propio `utm_content`, asi que
  este campo es lo unico que dice CUAL tienda convierte y donde vale la pena
  reimprimir en la fase 2. Sin el, las tiendas son indistinguibles.

    /tu-negocio?utm_source=flyer&utm_medium=qr
      &utm_campaign=tiendas-latinas&utm_content=<slug-de-la-tienda>

  Si la URL llega sin ningun UTM, se aplica una heuristica de canal: el QR
  impreso puede quedar sin parametros, y alguien tambien puede teclear la URL a
  mano. Es una heuristica de CANAL, no atribucion por lead.

  OJO: Vercel Web Analytics agrupa por ruta y no garantiza desglose por query
  string. Para los LEADS no importa —los UTM viajan en el payload del
  formulario y en el dataLayer, que si los conservan—, pero el conteo de
  VISITAS por tienda depende de GA4 via GTM.
*/

const STORAGE_KEY = "negocio_attribution";

export type Attribution = {
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  utm_content: string;
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

export default function NegocioAttribution() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const utm_source = params.get("utm_source") || "";
    const utm_medium = params.get("utm_medium") || "";
    const utm_campaign = params.get("utm_campaign") || "";
    const utm_content = params.get("utm_content") || "";

    const hasAny = utm_source || utm_medium || utm_campaign || utm_content;

    const attribution: Attribution = hasAny
      ? { utm_source, utm_medium, utm_campaign, utm_content, resolved_from: "url" }
      : {
          utm_source: "flyer",
          utm_medium: "qr",
          utm_campaign: "tiendas-latinas",
          utm_content: "desconocido",
          resolved_from: "heuristic_qr",
        };

    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(attribution));
    } catch {
      // sessionStorage puede estar bloqueado en navegacion privada.
    }

    const w = window as typeof window & { dataLayer?: Record<string, unknown>[] };
    w.dataLayer = w.dataLayer || [];
    w.dataLayer.push({
      event: "landing_negocios_view",
      utm_source: attribution.utm_source,
      utm_medium: attribution.utm_medium,
      utm_campaign: attribution.utm_campaign,
      utm_content: attribution.utm_content,
      attribution_resolved_from: attribution.resolved_from,
    });
  }, []);

  return null;
}
