import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

function sanitize(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function POST(request: NextRequest) {
  try {
    const { name, email, company, service, message, privacyConsent } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    if (!privacyConsent) {
      return NextResponse.json(
        { error: "Privacy policy consent is required." },
        { status: 400 }
      );
    }

    const safeName = sanitize(name);
    const safeEmail = sanitize(email);
    const safeCompany = company ? sanitize(company) : "";
    const safeService = service ? sanitize(service) : "";
    const safeMessage = sanitize(message);
    const consentTimestamp = new Date().toISOString();

    const transporter = nodemailer.createTransport({
      host: "smtp.hostinger.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Narvaez Digital Marketing" <${process.env.SMTP_USER}>`,
      to: "hello@narvaezcarlos.com",
      replyTo: email,
      subject: `New inquiry from ${safeName}${safeCompany ? ` — ${safeCompany}` : ""}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px;">
          <h2 style="color: #212121; margin-bottom: 24px;">New Project Inquiry</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #EDEDED; color: #666; width: 120px;">Name</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #EDEDED; color: #212121;">${safeName}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #EDEDED; color: #666;">Email</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #EDEDED; color: #212121;"><a href="mailto:${safeEmail}">${safeEmail}</a></td>
            </tr>
            ${safeCompany ? `<tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #EDEDED; color: #666;">Company</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #EDEDED; color: #212121;">${safeCompany}</td>
            </tr>` : ""}
            ${safeService ? `<tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #EDEDED; color: #666;">Service</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #EDEDED; color: #212121;">${safeService}</td>
            </tr>` : ""}
          </table>
          <div style="margin-top: 24px; padding: 20px; background: #F8F9F5;">
            <p style="color: #666; font-size: 12px; text-transform: uppercase; letter-spacing: 2px; margin: 0 0 12px;">Message</p>
            <p style="color: #212121; line-height: 1.6; margin: 0; white-space: pre-wrap;">${safeMessage}</p>
          </div>
          <div style="margin-top: 16px; padding: 12px 20px; background: #f0f0f0; font-size: 11px; color: #999;">
            <p style="margin: 0;">Privacy Policy accepted: ${consentTimestamp}</p>
            <p style="margin: 4px 0 0;">IP: ${request.headers.get("x-forwarded-for") || "unknown"}</p>
          </div>
          <p style="color: #999; font-size: 12px; margin-top: 32px;">Sent from narvaezcarlos.com contact form</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Failed to send message." },
      { status: 500 }
    );
  }
}
