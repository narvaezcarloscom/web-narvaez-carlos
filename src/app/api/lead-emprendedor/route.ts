import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

const CAMPAIGN_SLUG = "emprendedor-latino";
const MAIL_TO = "mkt@narvaezcarlos.com";

// Simple in-memory rate limit. Each function instance has its own Map (resets
// on cold starts). Good enough for an unlisted landing fed by a printed QR.
type RateLimitEntry = { count: number; resetAt: number };
const rateStore = new Map<string, RateLimitEntry>();
const RATE_LIMIT = { max: 5, windowMs: 60 * 60 * 1000 }; // 5/h per IP

function checkRate(ip: string): boolean {
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

function sanitize(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function getClientIp(req: NextRequest): string {
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0].trim();
  return req.headers.get("x-real-ip") || "unknown";
}

async function forwardToOs(payload: {
  name: string;
  email: string;
  whatsapp: string;
  business_description: string;
  is_operating?: "yes" | "no";
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
}): Promise<void> {
  const url = process.env.OS_LEAD_INTAKE_URL;
  const secret = process.env.LEAD_INTAKE_SECRET;
  if (!url || !secret) {
    console.warn("[lead-emprendedor] OS forward skipped — env not set");
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
      phone: payload.whatsapp,
      business_description: payload.business_description,
      is_operating: payload.is_operating,
      campaign: CAMPAIGN_SLUG,
      source: "website",
      utm_source: payload.utm_source,
      utm_medium: payload.utm_medium,
      utm_campaign: payload.utm_campaign,
    }),
  });

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    console.error(`[lead-emprendedor] OS forward failed ${res.status}: ${body}`);
  }
}

export async function POST(request: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  // Honeypot — if the bot filled the hidden field, fake a success so it stops
  // trying. We never email or forward.
  if (typeof body.website === "string" && body.website.trim() !== "") {
    return NextResponse.json({ success: true });
  }

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const whatsapp = typeof body.whatsapp === "string" ? body.whatsapp.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const businessDescription =
    typeof body.business_description === "string"
      ? body.business_description.trim()
      : "";
  const isOperating =
    body.is_operating === "yes" || body.is_operating === "no"
      ? body.is_operating
      : undefined;
  const privacyConsent = body.privacy_consent === true;

  if (!name || !whatsapp || !email || !businessDescription) {
    return NextResponse.json({ error: "Faltan campos obligatorios." }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
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

  const utm_source = typeof body.utm_source === "string" ? body.utm_source : "";
  const utm_medium = typeof body.utm_medium === "string" ? body.utm_medium : "";
  const utm_campaign = typeof body.utm_campaign === "string" ? body.utm_campaign : "";

  const consentTimestamp = new Date().toISOString();
  const safeName = sanitize(name);
  const safeWhatsapp = sanitize(whatsapp);
  const safeEmail = sanitize(email);
  const safeBusiness = sanitize(businessDescription);
  const safeOperating = isOperating === "yes" ? "Sí, ya tiene clientes" : isOperating === "no" ? "Todavía no, está arrancando" : "—";
  // Internal-only product suggestion for Candy — derived from is_operating.
  // NEVER shown to the lead (not on the page, /gracias, or WhatsApp). Only
  // appears in this internal email. A hint for the sales conversation, not a quote.
  const productSuggestion =
    isOperating === "no"
      ? "Landing de arranque ($600)"
      : isOperating === "yes"
      ? "Landing intermedio ($800)"
      : "Sin sugerencia (no respondió)";
  const safeUtmSource = sanitize(utm_source || "—");
  const safeUtmMedium = sanitize(utm_medium || "—");
  const safeUtmCampaign = sanitize(utm_campaign || "—");

  // Email is the safety net — always attempt, even if OS forward fails later.
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.hostinger.com",
      port: 465,
      secure: true,
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    });

    await transporter.sendMail({
      from: `"Narvaez Digital Marketing" <${process.env.SMTP_USER}>`,
      to: MAIL_TO,
      replyTo: email,
      subject: `Programa Emprendedor — Lead de ${safeName}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px;">
          <h2 style="color: #212121; margin-bottom: 24px;">Nuevo lead · Programa Emprendedor</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #EDEDED; color: #666; width: 140px;">Nombre</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #EDEDED; color: #212121;">${safeName}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #EDEDED; color: #666;">WhatsApp</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #EDEDED; color: #212121;">${safeWhatsapp}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #EDEDED; color: #666;">Correo</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #EDEDED; color: #212121;"><a href="mailto:${safeEmail}">${safeEmail}</a></td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #EDEDED; color: #666;">Operando</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #EDEDED; color: #212121;">${safeOperating}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #EDEDED; color: #666;">Producto sugerido (propuesta)</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #EDEDED; color: #212121;">${productSuggestion}</td>
            </tr>
          </table>
          <div style="margin-top: 24px; padding: 20px; background: #F8F9F5;">
            <p style="color: #666; font-size: 12px; text-transform: uppercase; letter-spacing: 2px; margin: 0 0 12px;">Cuéntanos un poco de tu negocio</p>
            <p style="color: #212121; line-height: 1.6; margin: 0; white-space: pre-wrap;">${safeBusiness}</p>
          </div>
          <div style="margin-top: 16px; padding: 12px 20px; background: #f0f0f0; font-size: 11px; color: #999;">
            <p style="margin: 0;"><strong>Origen:</strong> ${safeUtmSource} / ${safeUtmMedium} / ${safeUtmCampaign}</p>
            <p style="margin: 4px 0 0;"><strong>Política de Privacidad aceptada:</strong> ${consentTimestamp}</p>
            <p style="margin: 4px 0 0;"><strong>IP:</strong> ${ip}</p>
          </div>
          <p style="color: #999; font-size: 12px; margin-top: 32px;">Enviado desde narvaezcarlos.com/emprendedor</p>
        </div>
      `,
    });
  } catch (err) {
    console.error("[lead-emprendedor] email failed:", err);
    return NextResponse.json(
      { error: "No pudimos enviar tu mensaje. Intenta de nuevo." },
      { status: 500 }
    );
  }

  // Forward to OS pipeline. Best-effort: email already succeeded, so even if
  // this fails the lead is not lost — the team sees it in their inbox.
  try {
    await forwardToOs({
      name,
      email,
      whatsapp,
      business_description: businessDescription,
      is_operating: isOperating,
      utm_source: utm_source || undefined,
      utm_medium: utm_medium || undefined,
      utm_campaign: utm_campaign || undefined,
    });
  } catch (err) {
    console.error("[lead-emprendedor] OS forward error:", err);
  }

  return NextResponse.json({ success: true });
}
