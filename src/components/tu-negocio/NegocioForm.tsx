"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { readAttribution } from "./NegocioAttribution";
import { OFICIOS } from "../../lib/paquetes-negocio";

export default function NegocioForm() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [email, setEmail] = useState("");
  const [trade, setTrade] = useState("");
  const [cities, setCities] = useState("");
  const [website, setWebsite] = useState(""); // honeypot — debe quedar vacio
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSending(true);
    setError(null);

    const attribution = readAttribution();

    try {
      const res = await fetch("/api/lead-negocios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          whatsapp,
          email,
          trade,
          cities,
          privacy_consent: privacyAccepted,
          website, // honeypot
          utm_source: attribution?.utm_source,
          utm_medium: attribution?.utm_medium,
          utm_campaign: attribution?.utm_campaign,
          utm_content: attribution?.utm_content,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error || "Algo salió mal. Intenta de nuevo.");
        setSending(false);
        return;
      }

      router.push(`/tu-negocio/gracias?name=${encodeURIComponent(name)}`);
    } catch {
      setError("No pudimos enviar tu mensaje. Intenta de nuevo.");
      setSending(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="border-t border-neutral-light">
      {/* Honeypot — invisible para humanos y lectores de pantalla. Si viene
          lleno, el endpoint finge exito y no envia nada. */}
      <div
        aria-hidden="true"
        style={{ position: "absolute", left: "-9999px", width: "1px", height: "1px", overflow: "hidden" }}
      >
        <label htmlFor="website-neg">
          Sitio web (no llenar)
          <input
            id="website-neg"
            name="website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
          />
        </label>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="border-b border-neutral-light py-6 md:border-r md:py-8 md:pr-8">
          <label htmlFor="neg-name" className="mb-3 block text-xs uppercase tracking-widest text-graphite/50">
            Nombre
          </label>
          <input
            id="neg-name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="Tu nombre"
            className="w-full bg-transparent text-lg text-charcoal outline-none placeholder:text-graphite/30"
          />
        </div>

        <div className="border-b border-neutral-light py-6 md:py-8 md:pl-8">
          <label htmlFor="neg-wa" className="mb-3 block text-xs uppercase tracking-widest text-graphite/50">
            WhatsApp
          </label>
          <input
            id="neg-wa"
            name="whatsapp"
            type="tel"
            value={whatsapp}
            onChange={(e) => setWhatsapp(e.target.value)}
            required
            placeholder="+1 206 555 0123"
            className="w-full bg-transparent text-lg text-charcoal outline-none placeholder:text-graphite/30"
          />
        </div>

        <div className="border-b border-neutral-light py-6 md:col-span-2 md:py-8">
          <label htmlFor="neg-email" className="mb-3 block text-xs uppercase tracking-widest text-graphite/50">
            Correo electrónico
          </label>
          <input
            id="neg-email"
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="tu@correo.com"
            className="w-full bg-transparent text-lg text-charcoal outline-none placeholder:text-graphite/30"
          />
        </div>
      </div>

      {/* El oficio es el dato que dice a que nicho llega el flyer de verdad.
          Un campo abierto no serviria: no se agrupa. */}
      <div className="border-b border-neutral-light py-6 md:py-8">
        <label htmlFor="neg-trade" className="mb-3 block text-xs uppercase tracking-widest text-graphite/50">
          ¿Qué tipo de trabajo haces?
        </label>
        <select
          id="neg-trade"
          name="trade"
          value={trade}
          onChange={(e) => setTrade(e.target.value)}
          required
          className="w-full cursor-pointer bg-transparent text-lg text-charcoal outline-none"
        >
          <option value="" disabled>
            Selecciona tu oficio
          </option>
          {OFICIOS.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
      </div>

      <div className="border-b border-neutral-light py-6 md:py-8">
        <label htmlFor="neg-cities" className="mb-3 block text-xs uppercase tracking-widest text-graphite/50">
          ¿En qué ciudades trabajas?{" "}
          <span className="lowercase tracking-normal text-graphite/40">(opcional)</span>
        </label>
        <input
          id="neg-cities"
          name="cities"
          value={cities}
          onChange={(e) => setCities(e.target.value)}
          placeholder="Ej.: Renton, Kent, Auburn"
          className="w-full bg-transparent text-lg text-charcoal outline-none placeholder:text-graphite/30"
        />
      </div>

      {error && <p className="pt-4 text-sm text-narvaez-red">{error}</p>}

      <div className="pb-2 pt-6">
        <label className="group flex cursor-pointer items-start gap-3">
          <input
            type="checkbox"
            checked={privacyAccepted}
            onChange={(e) => setPrivacyAccepted(e.target.checked)}
            className="mt-1 h-4 w-4 shrink-0 cursor-pointer accent-narvaez-red"
            required
          />
          <span className="text-sm leading-relaxed text-graphite">
            He leído y acepto la{" "}
            <Link
              href="/es/privacy"
              target="_blank"
              className="link-underline text-charcoal transition-colors hover:text-narvaez-red"
            >
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
          data-track-event="lead_negocios_submit"
          className="inline-flex items-center gap-2 bg-narvaez-red px-8 py-4 text-sm font-medium uppercase tracking-wide text-ivory transition-colors duration-300 hover:bg-narvaez-red-hover disabled:cursor-not-allowed disabled:opacity-50"
        >
          {sending ? "Enviando..." : "Conversemos"}
          {!sending && (
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="ml-1" aria-hidden="true">
              <path d="M1 13L13 1M13 1H3M13 1V11" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          )}
        </button>
      </div>
    </form>
  );
}
