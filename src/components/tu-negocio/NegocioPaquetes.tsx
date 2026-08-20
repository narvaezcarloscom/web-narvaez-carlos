import Container from "../Container";
import { paquetes } from "../../lib/paquetes-negocio";
import { whatsappHref } from "../../lib/whatsapp";

export default function NegocioPaquetes() {
  return (
    <section id="paquetes" className="border-t border-neutral-light py-20 sm:py-28 md:py-32">
      <Container>
        <div className="mb-14 max-w-2xl md:mb-20">
          <p className="mb-4 text-xs uppercase tracking-[0.25em] text-graphite/40">
            Los paquetes
          </p>
          <h2 className="font-serif editorial-heading text-3xl text-charcoal sm:text-4xl md:text-5xl">
            Tres formas de empezar. La diferencia es{" "}
            <em>lo que el sitio hace por ti.</em>
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-0">
          {paquetes.map((p, i) => (
            <div
              key={p.id}
              className={
                i > 0
                  ? "border-t border-neutral-light pt-12 md:border-l md:border-t-0 md:pl-8 md:pt-0 lg:pl-12"
                  : "md:pr-8 lg:pr-12"
              }
            >
              <div className="mb-4 flex items-baseline gap-4">
                <span className="text-xs uppercase tracking-widest text-graphite/35">
                  0{i + 1}
                </span>
                <h3 className="font-serif editorial-heading text-2xl text-charcoal sm:text-3xl">
                  {p.nombre}
                </h3>
              </div>

              {/* El precio en display serif es la licencia visual que se toma
                  esta pagina frente a /emprendedor: aqui el numero manda. */}
              <p className="font-serif text-5xl leading-none text-charcoal sm:text-6xl">
                ${p.precio.toLocaleString("en-US")}
              </p>

              <p className="mt-5 font-serif text-lg italic leading-snug text-narvaez-red sm:text-xl">
                {p.promesa}
              </p>
              <p className="mt-3 max-w-sm text-sm leading-relaxed text-graphite/70">
                {p.paraQuien}
              </p>

              {p.heredaDe && (
                <p className="mt-8 text-sm font-semibold text-charcoal">
                  Todo lo de {p.heredaDe}, más:
                </p>
              )}

              <ul className={p.heredaDe ? "mt-4 space-y-3" : "mt-8 space-y-3"}>
                {p.incluye.map((punto) => (
                  <li key={punto} className="flex gap-3 text-sm leading-relaxed text-graphite">
                    <span
                      aria-hidden="true"
                      className="mt-2 h-px w-4 shrink-0 bg-graphite/30"
                    />
                    <span>{punto}</span>
                  </li>
                ))}
              </ul>

              <p className="mt-8 border-t border-neutral-light pt-5 text-sm text-graphite/70">
                Anualidad desde el segundo año:{" "}
                <strong className="font-semibold text-charcoal">${p.anualidad}</strong>
              </p>

              <a
                href={whatsappHref(
                  `Hola, me interesa el paquete ${p.nombre} de $${p.precio.toLocaleString("en-US")}.`
                )}
                target="_blank"
                rel="noopener noreferrer"
                data-track-event="package_cta_click"
                data-track-prop-tier={p.id}
                className="mt-6 inline-flex items-center gap-2 border border-charcoal px-6 py-3 text-xs font-medium uppercase tracking-wide text-charcoal transition-colors duration-300 hover:bg-charcoal hover:text-ivory"
              >
                Preguntar por {p.nombre}
              </a>
            </div>
          ))}
        </div>

        {/*
          NO decir "50% para comenzar, 50% al finalizar". El motor comercial
          fija el contado 50/50 con descuento ($750 / $1,120 / $1,500) y reserva
          estos precios para el plan a meses. El PDF marca blanca si lo dice, y
          esa inconsistencia se corrige alla, no aqui.
        */}
        <p className="mt-16 max-w-xl border-t border-neutral-light pt-8 text-sm leading-relaxed text-graphite/70">
          Estos son precios de lista. Pagando de contado el precio baja, y
          también hay plan a meses. Lo vemos en la conversación.
        </p>
      </Container>
    </section>
  );
}
