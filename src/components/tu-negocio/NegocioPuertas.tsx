import Container from "../Container";
import DiagonalSlash from "../DiagonalSlash";

/*
  NOTA DE COPY — leer antes de cambiar esto.

  El PDF marca blanca afirma estos cuatro puntos como hechos de industria
  ("cada vez mas companias te piden tu sitio web para emitir una poliza").
  Aqui estan formulados como RECONOCIMIENTO: le describen al lector algo que ya
  le paso, en vez de aseverar sobre la industria.

  No es suavizar. Es que (a) para este publico el reconocimiento pega mas
  fuerte que una estadistica, y (b) una afirmacion publicitaria sin fuente
  citable en una pagina con la marca del estudio es un riesgo que no hace falta
  correr. Si aparece una fuente, la version aseverativa es mas fuerte.

  El punto de IA si es asercion, y es verificable.

  NOTA DE DISENO (2026-08-20). Esta seccion nacio sobre charcoal a pantalla
  completa, para cortar el scroll en dos. Carlos lo descarto al verlo: el salto
  de contraste era demasiado para el sistema del estudio. Va en ivory como el
  resto de la pagina. El peso lo cargan la escala del titular y las reglas
  horizontales, no el fondo. NO reintroducir el bloque oscuro sin volver a
  pasar por el.
*/
const puertas = [
  {
    n: "01",
    titulo: "Aseguradoras",
    texto:
      "Si te pidieron el sitio web para emitir o renovar la póliza y no lo tenías, ya sabes de qué hablamos.",
  },
  {
    n: "02",
    titulo: "Financiadoras",
    texto:
      "Piden antigüedad. Un sitio que lleva dos años en línea dice algo que una página de Facebook no dice.",
  },
  {
    n: "03",
    titulo: "Bancos",
    texto:
      "Correo con el nombre de tu negocio, no un @gmail. Es de las primeras cosas que miran al abrir la cuenta.",
  },
  {
    n: "04",
    titulo: "Inteligencia artificial",
    texto:
      "Cuando alguien le pregunta a ChatGPT por un techero en Kent, el modelo lee sitios web. Si el tuyo no existe, no hay nada que leer.",
  },
];

export default function NegocioPuertas() {
  return (
    <section className="border-t border-neutral-light py-20 sm:py-28 md:py-32">
      <Container>
        <div className="mb-14 max-w-2xl md:mb-20">
          <p className="mb-6 text-xs uppercase tracking-[0.25em] text-graphite/40">
            Por qué ahora
          </p>
          <DiagonalSlash size="md" className="mb-4 text-graphite/20" />
          <h2 className="font-serif editorial-heading text-3xl text-charcoal sm:text-4xl md:text-5xl">
            Cuatro puertas que hoy se abren con un <em>sitio&nbsp;web.</em>
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-x-10 gap-y-10 sm:grid-cols-2 md:gap-y-14">
          {puertas.map((p) => (
            <div key={p.n} className="border-t border-neutral-light pt-6">
              <div className="mb-3 flex items-baseline gap-4">
                <span className="text-xs uppercase tracking-widest text-graphite/35">
                  {p.n}
                </span>
                <h3 className="font-serif text-2xl text-charcoal sm:text-3xl">
                  {p.titulo}
                </h3>
              </div>
              <p className="max-w-md text-base leading-relaxed text-graphite">
                {p.texto}
              </p>
            </div>
          ))}
        </div>

        <p className="mt-14 max-w-xl border-t border-neutral-light pt-8 font-serif text-xl italic text-charcoal sm:text-2xl md:mt-20">
          Ninguna de las cuatro es publicidad. Las cuatro son operación.
        </p>
      </Container>
    </section>
  );
}
