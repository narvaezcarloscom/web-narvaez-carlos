"use client";

import { useEffect, useRef, useState } from "react";
import { whatsappHref, WA_GENERAL } from "../../lib/whatsapp";

/*
  Barra fija de WhatsApp, solo en movil.

  Aparece cuando el hero sale de cuadro, no antes: mostrarla encima del hero
  taparia el titular en el unico momento en que el visitante decide si se queda.

  Sin GSAP y sin animacion de entrada mas alla de una transicion de opacidad,
  que se anula con prefers-reduced-motion via `motion-reduce`.
*/
export default function WhatsAppSticky() {
  const [pastHero, setPastHero] = useState(false);
  const [consentDecided, setConsentDecided] = useState(true);
  const sentinel = useRef<HTMLDivElement>(null);

  /*
    El banner de cookies es `fixed bottom-0 z-50` y esta barra es z-40: si los
    dos salen a la vez, la barra queda debajo del banner y no se ve. Peor: dos
    barras apiladas en el borde inferior de un telefono se comen media
    pantalla.

    Mientras el visitante no responda el banner, el borde inferior es del
    banner. Se lee el mismo `cookie_consent` de localStorage que escribe
    `CookieBanner`, sin tocar ese componente —que vive en TODO el sitio— y se
    reevalua con un listener de clic que se quita solo al decidirse.
  */
  useEffect(() => {
    const decided = () => {
      try {
        return localStorage.getItem("cookie_consent") !== null;
      } catch {
        return true; // localStorage bloqueado: el banner tampoco persiste
      }
    };

    if (decided()) return;
    setConsentDecided(false);

    const onClick = () => {
      if (decided()) {
        setConsentDecided(true);
        document.removeEventListener("click", onClick);
      }
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  useEffect(() => {
    const node = sentinel.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => setPastHero(!entry.isIntersecting),
      { rootMargin: "-120px 0px 0px 0px" }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const visible = pastHero && consentDecided;

  return (
    <>
      {/* Marca el final del hero. Sin altura: no ocupa espacio. */}
      <div ref={sentinel} aria-hidden="true" className="absolute top-[80vh] h-px w-full" />

      <div
        className={`fixed inset-x-0 bottom-0 z-40 border-t border-neutral-light bg-ivory/95 p-4 backdrop-blur transition-opacity duration-300 motion-reduce:transition-none md:hidden ${
          visible ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <a
          href={whatsappHref(WA_GENERAL)}
          target="_blank"
          rel="noopener noreferrer"
          data-track-event="whatsapp_click"
          data-track-prop-position="sticky"
          className="flex w-full items-center justify-center gap-2 bg-narvaez-red px-6 py-4 text-sm font-medium uppercase tracking-wide text-ivory"
          tabIndex={visible ? 0 : -1}
        >
          Escríbenos por WhatsApp
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path d="M1 13L13 1M13 1H3M13 1V11" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </a>
      </div>
    </>
  );
}
