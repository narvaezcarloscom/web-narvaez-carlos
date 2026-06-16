"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { readAttribution } from "./UtmAttribution";

export default function EmprendedorForm() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [email, setEmail] = useState("");
  const [businessDescription, setBusinessDescription] = useState("");
  const [isOperating, setIsOperating] = useState<"" | "yes" | "no">("");
  const [website, setWebsite] = useState(""); // honeypot — must stay empty
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSending(true);
    setError(null);

    const attribution = readAttribution();

    try {
      const res = await fetch("/api/lead-emprendedor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          whatsapp,
          email,
          business_description: businessDescription,
          is_operating: isOperating || undefined,
          privacy_consent: privacyAccepted,
          website, // honeypot
          utm_source: attribution?.utm_source,
          utm_medium: attribution?.utm_medium,
          utm_campaign: attribution?.utm_campaign,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error || "Algo salió mal. Intenta de nuevo.");
        setSending(false);
        return;
      }

      router.push(`/emprendedor/gracias?name=${encodeURIComponent(name)}`);
    } catch {
      setError("No pudimos enviar tu mensaje. Intenta de nuevo.");
      setSending(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="border-t border-neutral-light">
      {/* Honeypot — hidden from humans and screen readers, but bots will fill it.
          If filled, the endpoint silently rejects. */}
      <div aria-hidden="true" style={{ position: "absolute", left: "-9999px", width: "1px", height: "1px", overflow: "hidden" }}>
        <label htmlFor="website-emp">
          Sitio web (no llenar)
          <input
            id="website-emp"
            name="website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
          />
        </label>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
        <div className="border-b border-neutral-light py-6 md:py-8 md:pr-8 md:border-r">
          <label className="block text-xs uppercase tracking-widest text-graphite/50 mb-3">
            Nombre
          </label>
          <input
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="Tu nombre"
            className="w-full bg-transparent text-charcoal text-lg outline-none placeholder:text-graphite/30"
          />
        </div>

        <div className="border-b border-neutral-light py-6 md:py-8 md:pl-8">
          <label className="block text-xs uppercase tracking-widest text-graphite/50 mb-3">
            WhatsApp
          </label>
          <input
            name="whatsapp"
            type="tel"
            value={whatsapp}
            onChange={(e) => setWhatsapp(e.target.value)}
            required
            placeholder="+1 206 555 0123"
            className="w-full bg-transparent text-charcoal text-lg outline-none placeholder:text-graphite/30"
          />
        </div>

        <div className="border-b border-neutral-light py-6 md:py-8 md:pr-8 md:border-r md:col-span-2">
          <label className="block text-xs uppercase tracking-widest text-graphite/50 mb-3">
            Correo electrónico
          </label>
          <input
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="tu@correo.com"
            className="w-full bg-transparent text-charcoal text-lg outline-none placeholder:text-graphite/30"
          />
        </div>
      </div>

      <div className="border-b border-neutral-light py-6 md:py-8">
        <label className="block text-xs uppercase tracking-widest text-graphite/50 mb-3">
          Cuéntanos un poco de tu negocio
        </label>
        <textarea
          name="business_description"
          value={businessDescription}
          onChange={(e) => setBusinessDescription(e.target.value)}
          required
          rows={3}
          placeholder="Ej.: vendo arepas en eventos los fines de semana / instalo paneles solares / asesoría contable para latinos"
          className="w-full bg-transparent text-charcoal text-lg outline-none placeholder:text-graphite/30 resize-none"
        />
      </div>

      <div className="border-b border-neutral-light py-6 md:py-8">
        <p className="block text-xs uppercase tracking-widest text-graphite/50 mb-4">
          ¿Tu negocio ya está operando?{" "}
          <span className="lowercase tracking-normal text-graphite/40">(opcional)</span>
        </p>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-6">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="radio"
              name="is_operating"
              value="yes"
              checked={isOperating === "yes"}
              onChange={() => setIsOperating("yes")}
              className="h-4 w-4 accent-narvaez-red cursor-pointer"
            />
            <span className="text-base text-charcoal">Sí, ya tengo clientes</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="radio"
              name="is_operating"
              value="no"
              checked={isOperating === "no"}
              onChange={() => setIsOperating("no")}
              className="h-4 w-4 accent-narvaez-red cursor-pointer"
            />
            <span className="text-base text-charcoal">Todavía no, estoy arrancando</span>
          </label>
        </div>
      </div>

      {error && (
        <p className="pt-4 text-narvaez-red text-sm">{error}</p>
      )}

      <div className="pt-6 pb-2">
        <label className="flex items-start gap-3 cursor-pointer group">
          <input
            type="checkbox"
            checked={privacyAccepted}
            onChange={(e) => setPrivacyAccepted(e.target.checked)}
            className="mt-1 h-4 w-4 shrink-0 accent-narvaez-red cursor-pointer"
            required
          />
          <span className="text-sm text-graphite leading-relaxed">
            He leído y acepto la{" "}
            <Link href="/es/privacy" target="_blank" className="link-underline text-charcoal hover:text-narvaez-red transition-colors">
              Política de Privacidad
            </Link>
            . Consiento el tratamiento de mis datos para responder a mi consulta.
          </span>
        </label>
      </div>

      <div className="pt-6">
        <button
          type="submit"
          disabled={sending || !privacyAccepted}
          className="inline-flex items-center gap-2 bg-narvaez-red text-ivory px-8 py-4 text-sm font-medium tracking-wide uppercase hover:bg-narvaez-red-hover transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {sending ? "Enviando..." : "Conversemos"}
          {!sending && (
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="ml-1">
              <path d="M1 13L13 1M13 1H3M13 1V11" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          )}
        </button>
      </div>
    </form>
  );
}
