/**
 * Numero de WhatsApp del estudio.
 *
 * Verificado el 2026-08-20 contra el `telephone` del JSON-LD en
 * `app/[lang]/layout.tsx` y contra `app/emprendedor/gracias/page.tsx`. Es el
 * mismo numero: no hay una linea aparte para campanas.
 */
export const WHATSAPP_NUMBER = "12069817078";

/** Arma el enlace de wa.me con el mensaje ya escrito para el visitante. */
export function whatsappHref(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

/** Mensaje neutro — los puntos de contacto que no hablan de un paquete. */
export const WA_GENERAL = "Hola, vi la página de sitios web para negocios de servicios.";
