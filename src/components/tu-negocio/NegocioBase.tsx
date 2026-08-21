import Container from "../Container";
import DiagonalSlash from "../DiagonalSlash";
import {
  IconoBilingue,
  IconoCorreo,
  IconoDominio,
  IconoHosting,
  IconoLocal,
  IconoResguardo,
} from "./iconos";

const base = [
  {
    Icono: IconoDominio,
    titulo: "Dominio a tu nombre",
    texto: "Es tuyo. Lo administramos bajo resguardo, nunca como rehén.",
  },
  {
    Icono: IconoHosting,
    titulo: "Hosting y respaldo",
    texto: "Tu sitio disponible y tu información protegida.",
  },
  {
    Icono: IconoCorreo,
    titulo: "Correo con el nombre de tu negocio",
    texto: "Uno, dos o tres según el paquete.",
  },
  {
    Icono: IconoBilingue,
    titulo: "En inglés y en español",
    texto: "No es un extra. Va incluido.",
  },
  {
    Icono: IconoResguardo,
    titulo: "Formulario con resguardo",
    texto: "Validación, consentimiento y protección contra spam.",
  },
  {
    Icono: IconoLocal,
    titulo: "Base técnica de búsqueda local",
    texto:
      "Nombre, dirección y teléfono consistentes; velocidad y lectura en el teléfono cuidadas desde el primer día.",
  },
];

export default function NegocioBase() {
  return (
    <section className="border-t border-neutral-light py-20 sm:py-28 md:py-32">
      <Container>
        <div className="mb-14 max-w-2xl md:mb-16">
          <p className="mb-4 text-xs uppercase tracking-[0.25em] text-graphite/40">
            En los tres paquetes
          </p>
          <h2 className="font-serif editorial-heading text-3xl text-charcoal sm:text-4xl md:text-5xl">
            Lo que va siempre, sin importar <em>cuál elijas.</em>
          </h2>
        </div>

        <div
          style={{ color: "var(--text-muted)" }}
          className="grid grid-cols-1 gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3"
        >
          {base.map(({ Icono, titulo, texto }) => (
            <div key={titulo}>
              {/* Gris apagado, no rojo: el rojo es señal de accion en esta pagina. */}
              <Icono className="mb-4" />
              <h3 className="mb-2 font-sans text-base font-semibold text-charcoal">
                {titulo}
              </h3>
              <p className="text-sm leading-relaxed text-graphite">{texto}</p>
            </div>
          ))}
        </div>

        {/*
          La anualidad va dicha de frente, no en letra chica. `graficolor.md` es
          explicito: la pieza de mostrador la declara y esta tambien. Es lo que
          sostiene la renta recurrente sin sorpresas en el ano 2.
        */}
        <div className="mt-16 border-t border-neutral-light pt-12 md:mt-20">
          <div className="max-w-2xl">
            <DiagonalSlash size="sm" className="mb-4 text-narvaez-red/40" />
            <h3 className="mb-4 font-serif editorial-heading text-2xl text-charcoal sm:text-3xl">
              La anualidad, dicha <em>de frente.</em>
            </h3>
            <p className="text-base leading-relaxed text-graphite">
              A partir del segundo año pagas $180, $200 o $220 al año según tu
              paquete. Cubre el dominio, el hosting, tus correos y el respaldo.
              No es letra chica: es lo que mantiene tu sitio vivo.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
