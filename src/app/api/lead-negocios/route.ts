import { NextRequest, NextResponse } from "next/server";
import {
  checkRate,
  forwardToOs,
  getClientIp,
  isValidEmail,
  sanitize,
  sendLeadEmail,
} from "../../../lib/lead-intake";
import { OFICIOS } from "../../../lib/paquetes-negocio";

/**
 * Captura de leads de /tu-negocio.
 *
 * Ruta delgada: toda la logica endurecida (honeypot, rate limit, sanitizado,
 * correo, reenvio a Studio OS) vive en `lib/lead-intake.ts`, compartida.
 */
const CAMPAIGN_SLUG = "negocios-servicios";

export async function POST(request: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  // Honeypot — si el bot lleno el campo oculto, fingimos exito para que deje
  // de intentar. Nunca se envia correo ni se reenvia nada.
  if (typeof body.website === "string" && body.website.trim() !== "") {
    return NextResponse.json({ success: true });
  }

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const whatsapp = typeof body.whatsapp === "string" ? body.whatsapp.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const cities = typeof body.cities === "string" ? body.cities.trim() : "";
  const privacyConsent = body.privacy_consent === true;

  // El oficio se valida contra la lista cerrada, no se acepta texto libre: es
  // el campo que despues se agrupa para decidir a que nicho llega el flyer.
  const rawTrade = typeof body.trade === "string" ? body.trade.trim() : "";
  const trade = (OFICIOS as readonly string[]).includes(rawTrade) ? rawTrade : "";

  if (!name || !whatsapp || !email || !trade) {
    return NextResponse.json({ error: "Faltan campos obligatorios." }, { status: 400 });
  }
  if (!isValidEmail(email)) {
    return NextResponse.json({ error: "Correo no válido." }, { status: 400 });
  }
  if (!privacyConsent) {
    return NextResponse.json(
      { error: "Es necesario aceptar la Política de Privacidad." },
      { status: 400 }
    );
  }

  const ip = getClientIp(request);
  if (!checkRate(ip)) {
    return NextResponse.json(
      { error: "Demasiados envíos. Intenta de nuevo en una hora." },
      { status: 429 }
    );
  }

  const str = (k: string) => (typeof body[k] === "string" ? (body[k] as string) : "");
  const attribution = {
    utm_source: str("utm_source") || undefined,
    utm_medium: str("utm_medium") || undefined,
    utm_campaign: str("utm_campaign") || undefined,
    utm_content: str("utm_content") || undefined,
  };

  const consentTimestamp = new Date().toISOString();
  const safeName = sanitize(name);
  const safeWhatsapp = sanitize(whatsapp);
  const safeEmail = sanitize(email);
  const safeTrade = sanitize(trade);
  const safeCities = sanitize(cities || "—");

  // El correo es la red de seguridad: se intenta siempre, y si falla se
  // devuelve error para que la persona reintente en vez de perder el lead.
  try {
    await sendLeadEmail({
      subject: `Negocios de servicios — Lead de ${safeName}`,
      heading: "Nuevo lead · Sitios web para negocios de servicios",
      rows: [
        { label: "Nombre", value: safeName },
        { label: "WhatsApp", value: safeWhatsapp },
        { label: "Correo", value: `<a href="mailto:${safeEmail}">${safeEmail}</a>` },
        { label: "Oficio", value: safeTrade },
        { label: "Ciudades", value: safeCities },
      ],
      origin: "narvaezcarlos.com/tu-negocio",
      attribution: {
        utm_source: attribution.utm_source && sanitize(attribution.utm_source),
        utm_medium: attribution.utm_medium && sanitize(attribution.utm_medium),
        utm_campaign: attribution.utm_campaign && sanitize(attribution.utm_campaign),
        utm_content: attribution.utm_content && sanitize(attribution.utm_content),
      },
      consentTimestamp,
      ip,
      replyTo: email,
      footer: CAMPAIGN_SLUG,
    });
  } catch (err) {
    console.error(`[${CAMPAIGN_SLUG}] email failed:`, err);
    return NextResponse.json(
      { error: "No pudimos enviar tu mensaje. Intenta de nuevo." },
      { status: 500 }
    );
  }

  // Best-effort: el correo ya salio, asi que un fallo aqui no pierde el lead.
  try {
    await forwardToOs({
      name,
      email,
      phone: whatsapp,
      campaign: CAMPAIGN_SLUG,
      extra: { trade, cities: cities || undefined },
      attribution,
    });
  } catch (err) {
    console.error(`[${CAMPAIGN_SLUG}] OS forward error:`, err);
  }

  return NextResponse.json({ success: true });
}
