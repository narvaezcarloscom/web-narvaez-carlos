import Container from "../Container";
import DiagonalSlash from "../DiagonalSlash";

const includes = [
  {
    title: "Sitio de una página",
    description:
      "Diseño editorial a medida de tu negocio, rápido y legible en el teléfono.",
  },
  {
    title: "Tu dominio, a tu nombre",
    description:
      "El dominio es tuyo. Lo administramos bajo resguardo — nunca como rehén.",
  },
  {
    title: "Base de búsqueda local",
    description:
      "Nombre, dirección y teléfono consistente: la base para aparecer en Google.",
  },
  {
    title: "Guía de ficha de Google",
    description:
      "Te preparamos para ganar en búsqueda local, con asesoría incluida.",
  },
  {
    title: "Resguardo del estudio",
    description:
      "Tu sitio vivo y cuidado, sin que tengas que aprender nada técnico.",
  },
  {
    title: "Facilidades de pago",
    description:
      "Planes pensados para que la calidad esté a tu alcance hoy.",
  },
];

export default function EmprendedorIncludes() {
  return (
    <section className="py-20 sm:py-28 md:py-32 border-t border-neutral-light">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16">
          <div className="md:col-span-5">
            <p className="text-xs uppercase tracking-[0.25em] text-graphite/40 mb-6">
              El programa
            </p>
            <DiagonalSlash size="md" className="text-graphite/20 mb-4" />
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl editorial-heading text-charcoal mb-6">
              Un sitio profesional, hecho para <em>crecer contigo.</em>
            </h2>
            <p className="text-base md:text-lg text-graphite leading-relaxed max-w-md">
              No es una plantilla genérica ni un favor. Es un producto del estudio,
              construido con los mismos estándares con los que servimos a empresas
              — pensado para que tu marca{" "}
              <strong className="font-semibold text-charcoal italic">
                se vea, se encuentre y venda.
              </strong>
            </p>
          </div>

          <div className="md:col-span-7">
            <p className="text-xs uppercase tracking-[0.25em] text-graphite/40 mb-8">
              Qué incluye
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-8">
              {includes.map((item) => (
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
        </div>
      </Container>
    </section>
  );
}
