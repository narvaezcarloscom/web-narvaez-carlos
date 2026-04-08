"use client";

import { useState } from "react";
import Link from "next/link";

interface ContactFormProps {
  lang?: "en" | "es";
}

export default function ContactForm({ lang = "en" }: ContactFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [service, setService] = useState("");
  const [message, setMessage] = useState("");
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState(false);

  const isEn = lang === "en";
  const prefix = isEn ? "" : `/${lang}`;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSending(true);
    setError(false);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, company, service, message, privacyConsent: privacyAccepted }),
      });

      if (res.ok) {
        setSubmitted(true);
        setName("");
        setEmail("");
        setCompany("");
        setService("");
        setMessage("");
      } else {
        setError(true);
      }
    } catch {
      setError(true);
    } finally {
      setSending(false);
    }
  }

  if (submitted) {
    return (
      <div className="py-16 border-t border-neutral-light">
        <h2 className="font-serif text-3xl md:text-4xl editorial-heading mb-4">
          Thank you.
        </h2>
        <p className="text-graphite text-lg">
          We received your message and will be in touch within 24 hours.
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="mt-8 link-underline text-sm text-graphite hover:text-charcoal"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="border-t border-neutral-light">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
        <div className="border-b border-neutral-light py-6 md:py-8 md:pr-8 md:border-r">
          <label className="block text-xs uppercase tracking-widest text-graphite/50 mb-3">
            Name
          </label>
          <input
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="Your name"
            className="w-full bg-transparent text-charcoal text-lg outline-none placeholder:text-graphite/30"
          />
        </div>

        <div className="border-b border-neutral-light py-6 md:py-8 md:pl-8">
          <label className="block text-xs uppercase tracking-widest text-graphite/50 mb-3">
            Email
          </label>
          <input
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="your@email.com"
            className="w-full bg-transparent text-charcoal text-lg outline-none placeholder:text-graphite/30"
          />
        </div>

        <div className="border-b border-neutral-light py-6 md:py-8 md:pr-8 md:border-r">
          <label className="block text-xs uppercase tracking-widest text-graphite/50 mb-3">
            Company
          </label>
          <input
            name="company"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            placeholder="Your company"
            className="w-full bg-transparent text-charcoal text-lg outline-none placeholder:text-graphite/30"
          />
        </div>

        <div className="border-b border-neutral-light py-6 md:py-8 md:pl-8">
          <label className="block text-xs uppercase tracking-widest text-graphite/50 mb-3">
            Service
          </label>
          <select
            name="service"
            value={service}
            onChange={(e) => setService(e.target.value)}
            className="w-full bg-transparent text-charcoal text-lg outline-none appearance-none cursor-pointer"
          >
            <option value="">Select a service</option>
            <option value="Web Design & Development">Web Design & Development</option>
            <option value="Custom Apps & Platforms">Custom Apps & Platforms</option>
            <option value="Digital Advertising">Digital Advertising</option>
            <option value="Content & Social Media">Content & Social Media</option>
          </select>
        </div>
      </div>

      <div className="border-b border-neutral-light py-6 md:py-8">
        <label className="block text-xs uppercase tracking-widest text-graphite/50 mb-3">
          Message
        </label>
        <textarea
          name="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          rows={4}
          placeholder="Tell us about your project..."
          className="w-full bg-transparent text-charcoal text-lg outline-none placeholder:text-graphite/30 resize-none"
        />
      </div>

      {error && (
        <p className="pt-4 text-narvaez-red text-sm">
          {isEn
            ? "Something went wrong. Please try again or email us directly at hello@narvaezcarlos.com"
            : "Algo salió mal. Intenta de nuevo o escríbenos directamente a hello@narvaezcarlos.com"}
        </p>
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
            {isEn ? (
              <>
                I have read and accept the{" "}
                <Link href={`${prefix}/privacy`} target="_blank" className="link-underline text-charcoal hover:text-narvaez-red transition-colors">
                  Privacy Policy
                </Link>
                . I consent to the processing of my data to respond to my inquiry.
              </>
            ) : (
              <>
                He leído y acepto la{" "}
                <Link href={`${prefix}/privacy`} target="_blank" className="link-underline text-charcoal hover:text-narvaez-red transition-colors">
                  Política de Privacidad
                </Link>
                . Consiento el tratamiento de mis datos para responder a mi consulta.
              </>
            )}
          </span>
        </label>
      </div>

      <div className="pt-4">
        <button
          type="submit"
          disabled={sending || !privacyAccepted}
          className="inline-flex items-center gap-2 bg-narvaez-red text-ivory px-8 py-4 text-sm font-medium tracking-wide uppercase hover:bg-narvaez-red-hover transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {sending
            ? (isEn ? "Sending..." : "Enviando...")
            : (isEn ? "Send message" : "Enviar mensaje")}
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
