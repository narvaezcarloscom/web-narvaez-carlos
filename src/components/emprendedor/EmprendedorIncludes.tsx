import Container from "../Container";
import DiagonalSlash from "../DiagonalSlash";

// La base va en toda opción. Es el piso del estudio, no un extra.
const base = [
  {
    title: "Tu dominio, a tu nombre",
    description:
      "El dominio es tuyo. Lo administramos bajo resguardo — nunca como rehén.",
  },
  {
    title: "Base de búsqueda local",
    description:
      "Nombre, dirección y teléfono consistentes: la base para aparecer en Google.",
  },
  {
    title: "Fundamento técnico",
    description:
      "Estructura, velocidad y lectura en el teléfono cuidadas desde el primer día.",
  },
  {
    title: "Formulario con resguardo",
    description:
      "Captura de contactos con validación, consentimiento y protección contra spam.",
  },
  {
    title: "Anualidad de mantenimiento",
    description:
      "Tu sitio vivo y cuidado por el estudio, sin que tengas que aprender nada técnico.",
  },
];

// Dos formas de empezar. Se diferencian por alcance y por para quién son —
// no por precio. La conversación con nosotros recomienda la que corresponde.
const options = [
  {
    name: "Arranque",
    forWho: "Para quien está dando el primer paso y quiere estar en línea con dignidad, sin complicarse.",
    scope: [
      "Diseño del estudio, brandeado con tu identidad.",
      "Estructura editorial lista para colocar tu historia.",
      "Contacto simple y botón directo de WhatsApp.",
      "Publicado en tu dominio, bajo nuestro resguardo.",
    ],
  },
  {
    name: "Presencia",
    forWho: "Para quien ya tiene clientes y quiere una presencia más amplia, que sostenga el crecimiento.",
    scope: [
      "Secciones ampliadas: historia, servicios, galería y prueba social.",
      "Apoyo de copy del estudio — pulimos tus palabras.",
      "Ficha de Google Business y SEO local por zona.",
      "Sitio bilingüe, español e inglés.",
      "Una integración a tu medida: agenda, WhatsApp Business o captura de leads.",
    ],
  },
];

export default function EmprendedorIncludes() {
  return (
    <section className="py-20 sm:py-28 md:py-32 border-t border-neutral-light">
      <Container>
        {/* Encabezado — enmarca el programa como conversación, no como tienda */}
        <div className="max-w-2xl mb-16 md:mb-20">
          <p className="text-xs uppercase tracking-[0.25em] text-graphite/40 mb-6">
            El programa
          </p>
          <DiagonalSlash size="md" className="text-graphite/20 mb-4" />
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl editorial-heading text-charcoal mb-6">
            Un sitio profesional, hecho para <em>crecer contigo.</em>
          </h2>
          <p className="text-base md:text-lg text-graphite leading-relaxed">
            No es una plantilla genérica ni un favor. Es un producto del estudio,
            construido con los mismos estándares con los que servimos a empresas.
            No eliges de un menú: conversamos, entendemos tu momento y te
            recomendamos{" "}
            <strong className="font-semibold text-charcoal italic">
              la forma de empezar que te corresponde.
            </strong>
          </p>
        </div>

        {/* La base — común a toda opción */}
        <div className="border-t border-neutral-light pt-12 md:pt-16 mb-16 md:mb-24">
          <p className="text-xs uppercase tracking-[0.25em] text-graphite/40 mb-8">
            La base, en toda opción
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-8">
            {base.map((item) => (
              <div key={item.title}>
                <h3 className="font-sans text-base font-semibold text-charcoal mb-2">
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed text-graphite">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Dos formas de empezar — diferenciadas por alcance y para quién */}
        <div className="border-t border-neutral-light pt-12 md:pt-16">
          <p className="text-xs uppercase tracking-[0.25em] text-graphite/40 mb-10">
            Dos formas de empezar
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-8">
            {options.map((option, index) => (
              <div
                key={option.name}
                className={
                  index === 1
                    ? "md:pl-8 md:border-l border-neutral-light"
                    : undefined
                }
              >
                <div className="flex items-baseline gap-4 mb-4">
                  <DiagonalSlash
                    size="sm"
                    className={
                      index === 1
                        ? "text-narvaez-red/40"
                        : "text-graphite/25"
                    }
                  />
                  <h3 className="font-serif text-2xl sm:text-3xl editorial-heading text-charcoal">
                    {option.name}
                  </h3>
                </div>
                <p className="text-base text-graphite leading-relaxed mb-8 max-w-md">
                  {option.forWho}
                </p>
                <ul className="space-y-3">
                  {option.scope.map((point) => (
                    <li
                      key={point}
                      className="flex gap-3 text-sm leading-relaxed text-graphite"
                    >
                      <span
                        aria-hidden="true"
                        className="mt-2 h-px w-4 shrink-0 bg-graphite/30"
                      />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="mt-12 text-sm text-graphite/60 leading-relaxed max-w-xl">
            ¿No sabes cuál es la tuya? Es exactamente lo que resolvemos juntos en
            la primera conversación.
          </p>
        </div>
      </Container>
    </section>
  );
}
