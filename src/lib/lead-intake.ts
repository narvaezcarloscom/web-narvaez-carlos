import nodemailer from "nodemailer";

/**
 * Nucleo endurecido de captura de leads, compartido por las landings.
 *
 * POR QUE EXISTE ESTE ARCHIVO. `/api/lead-emprendedor` tenia todo esto en un
 * solo archivo con la campana fija. Al aparecer una segunda landing habia tres
 * caminos:
 *
 *   1. Copiar el archivo. Duplica una superficie de seguridad completa: dos
 *      honeypots, dos rate limits, dos sanitizadores. Divergen con el primer
 *      parche que se aplique a uno solo. Rechazado.
 *   2. Generalizar la ruta viva a /api/lead?campaign=. Toca codigo en
 *      produccion que hoy recibe leads reales y cambia la URL que el
 *      formulario de /emprendedor ya llama. Rechazado.
 *   3. Extraer el nucleo aqui y dejar rutas delgadas. Elegido.
 *
 * PENDIENTE: `/api/lead-emprendedor` todavia NO usa este modulo. Sigue con su
 * copia propia. La migracion es un paso aparte porque exige verificar un envio
 * real contra SMTP antes de tocar una captacion que hoy esta viva. Mientras
 * tanto hay duplicacion conocida — si se parchea algo aqui, revisar alla.
 */

export const MAIL_TO = "mkt@narvaezcarlos.com";

/**
 * Rate limit en memoria. Cada instancia de funcion tiene su propio Map y se
 * reinicia en cold start. Suficiente para landings sin enlazar alimentadas por
 * un QR.
 *
 * El store es compartido entre rutas a proposito: el limite es por IP y por
 * hora, no por landing. Alguien que satura una tampoco satura la otra.
 */
type RateLimitEntry = { count: number; resetAt: number };
const rateStore = new Map<string, RateLimitEntry>();
const RATE_LIMIT = { max: 5, windowMs: 60 * 60 * 1000 }; // 5/h por IP

export function checkRate(ip: string): boolean {
  const now = Date.now();
  if (rateStore.size > 1000) {
    for (const [k, v] of rateStore) if (v.resetAt < now) rateStore.delete(k);
  }
  const entry = rateStore.get(ip);
  if (!entry || entry.resetAt < now) {
    rateStore.set(ip, { count: 1, resetAt: now + RATE_LIMIT.windowMs });
    return true;
  }
  if (entry.count >= RATE_LIMIT.max) return false;
  entry.count++;
  return true;
}

export function sanitize(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export function getClientIp(req: Request): string {
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0].trim();
  return req.headers.get("x-real-ip") || "unknown";
}

export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export type Attribution = {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  /** Cual tienda pego el flyer. Solo lo emite /tu-negocio. */
  utm_content?: string;
};

/**
 * Reenvia el lead al pipeline de Studio OS. Best-effort: el correo es la red
 * de seguridad y ya salio antes de llamar aqui, asi que un fallo no pierde el
 * lead.
 */
export async function forwardToOs(payload: {
  name: string;
  email: string;
  phone: string;
  campaign: string;
  /** Campos propios de cada landing. Studio OS los recibe como vienen. */
  extra?: Record<string, string | undefined>;
  attribution?: Attribution;
}): Promise<void> {
  const url = process.env.OS_LEAD_INTAKE_URL;
  const secret = process.env.LEAD_INTAKE_SECRET;
  if (!url || !secret) {
    console.warn(`[${payload.campaign}] OS forward skipped — env not set`);
    return;
  }

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${secret}`,
    },
    body: JSON.stringify({
      name: payload.name,
      email: payload.email,
      phone: payload.phone,
      campaign: payload.campaign,
      source: "website",
      ...payload.extra,
      ...payload.attribution,
    }),
  });

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    console.error(`[${payload.campaign}] OS forward failed ${res.status}: ${body}`);
  }
}

export type EmailRow = { label: string; value: string };

/**
 * Envia el correo interno del lead. Los valores llegan YA sanitizados: esta
 * funcion los interpola en HTML sin volver a escaparlos.
 */
export async function sendLeadEmail(opts: {
  subject: string;
  heading: string;
  rows: EmailRow[];
  /** Bloque de texto largo, si la landing captura alguno. */
  longBlock?: { label: string; text: string };
  origin: string;
  attribution: Attribution;
  consentTimestamp: string;
  ip: string;
  replyTo: string;
  footer: string;
}): Promise<void> {
  const transporter = nodemailer.createTransport({
    host: "smtp.hostinger.com",
    port: 465,
    secure: true,
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
  });

  const rowsHtml = opts.rows
    .map(
      (r) => `
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #EDEDED; color: #666; width: 160px;">${r.label}</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #EDEDED; color: #212121;">${r.value}</td>
            </tr>`
    )
    .join("");

  const longHtml = opts.longBlock
    ? `<div style="margin-top: 24px; padding: 20px; background: #F8F9F5;">
            <p style="color: #666; font-size: 12px; text-transform: uppercase; letter-spacing: 2px; margin: 0 0 12px;">${opts.longBlock.label}</p>
            <p style="color: #212121; line-height: 1.6; margin: 0; white-space: pre-wrap;">${opts.longBlock.text}</p>
          </div>`
    : "";

  const a = opts.attribution;
  const origen = [a.utm_source, a.utm_medium, a.utm_campaign].map((v) => v || "—").join(" / ");
  const tienda = a.utm_content || "—";

  await transporter.sendMail({
    from: `"Narvaez Digital Marketing" <${process.env.SMTP_USER}>`,
    to: MAIL_TO,
    replyTo: opts.replyTo,
    subject: opts.subject,
    html: `
        <div style="font-family: sans-serif; max-width: 600px;">
          <h2 style="color: #212121; margin-bottom: 24px;">${opts.heading}</h2>
          <table style="width: 100%; border-collapse: collapse;">${rowsHtml}
          </table>
          ${longHtml}
          <div style="margin-top: 16px; padding: 12px 20px; background: #f0f0f0; font-size: 11px; color: #999;">
            <p style="margin: 0;"><strong>Origen:</strong> ${origen}</p>
            <p style="margin: 4px 0 0;"><strong>Tienda / contenido:</strong> ${tienda}</p>
            <p style="margin: 4px 0 0;"><strong>Política de Privacidad aceptada:</strong> ${opts.consentTimestamp}</p>
            <p style="margin: 4px 0 0;"><strong>IP:</strong> ${opts.ip}</p>
          </div>
          <p style="color: #999; font-size: 12px; margin-top: 32px;">Enviado desde ${opts.origin}</p>
        </div>
      `,
  });
}
