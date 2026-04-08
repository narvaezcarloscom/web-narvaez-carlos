"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface CookieBannerProps {
  lang?: "en" | "es";
}

type ConsentStatus = "granted" | "denied";

function getStoredConsent(): ConsentStatus | null {
  if (typeof window === "undefined") return null;
  const stored = localStorage.getItem("cookie_consent");
  if (stored === "granted" || stored === "denied") return stored;
  return null;
}

function setStoredConsent(status: ConsentStatus) {
  localStorage.setItem("cookie_consent", status);
  localStorage.setItem("cookie_consent_date", new Date().toISOString());
}

function updateGtagConsent(status: ConsentStatus) {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("consent", "update", {
      analytics_storage: status,
      ad_storage: status,
      ad_user_data: status,
      ad_personalization: status,
    });
  }
}

declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
    dataLayer: Record<string, unknown>[];
  }
}

export default function CookieBanner({ lang = "en" }: CookieBannerProps) {
  const [visible, setVisible] = useState(false);
  const isEn = lang === "en";
  const prefix = isEn ? "" : `/${lang}`;

  useEffect(() => {
    const stored = getStoredConsent();
    if (stored === null) {
      setVisible(true);
    } else if (stored === "granted") {
      updateGtagConsent("granted");
    }
  }, []);

  function handleAccept() {
    setStoredConsent("granted");
    updateGtagConsent("granted");
    setVisible(false);
  }

  function handleDecline() {
    setStoredConsent("denied");
    updateGtagConsent("denied");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label={isEn ? "Cookie consent" : "Consentimiento de cookies"}
      className="fixed bottom-0 left-0 right-0 z-50 border-t border-neutral-light bg-ivory/95 backdrop-blur-sm"
    >
      <div className="mx-auto max-w-7xl px-6 py-4 sm:py-5 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
        <p className="text-sm text-graphite leading-relaxed flex-1">
          {isEn ? (
            <>
              We use cookies to analyze site traffic and improve your experience. Read our{" "}
              <Link href={`${prefix}/privacy`} className="link-underline text-charcoal hover:text-narvaez-red transition-colors">
                Privacy Policy
              </Link>{" "}
              for details.
            </>
          ) : (
            <>
              Usamos cookies para analizar el tráfico del sitio y mejorar tu experiencia. Lee nuestra{" "}
              <Link href={`${prefix}/privacy`} className="link-underline text-charcoal hover:text-narvaez-red transition-colors">
                Política de Privacidad
              </Link>{" "}
              para más detalles.
            </>
          )}
        </p>
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={handleDecline}
            className="px-5 py-2.5 text-xs font-medium uppercase tracking-wide text-graphite hover:text-charcoal border border-neutral-light hover:border-charcoal transition-colors"
          >
            {isEn ? "Decline" : "Rechazar"}
          </button>
          <button
            onClick={handleAccept}
            className="px-5 py-2.5 text-xs font-medium uppercase tracking-wide bg-narvaez-red text-ivory hover:bg-narvaez-red-hover transition-colors"
          >
            {isEn ? "Accept" : "Aceptar"}
          </button>
        </div>
      </div>
    </div>
  );
}

export function CookieSettingsButton({ lang = "en" }: { lang?: "en" | "es" }) {
  const isEn = lang === "en";

  function handleOpen() {
    localStorage.removeItem("cookie_consent");
    localStorage.removeItem("cookie_consent_date");
    window.location.reload();
  }

  return (
    <button
      onClick={handleOpen}
      className="hover:text-graphite transition-colors"
    >
      {isEn ? "Cookie Settings" : "Configuración de Cookies"}
    </button>
  );
}
