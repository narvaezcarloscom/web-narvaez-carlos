/**
 * Sitios que se muestran en /sitios — la landing del mostrador de Graficolor
 * Printing.
 *
 * La ruta NO es /portafolio: next.config.ts tiene un 301 heredado de WordPress
 * que manda /portafolio a /work. Un 301 se cachea de forma indefinida en el
 * navegador, asi que esa URL esta quemada aunque se borre la regla.
 *
 * Este archivo existe aparte de `projects.ts` por dos razones:
 *
 *   1. `projects.ts` alimenta el sitemap publico. Cualquier entrada ahi queda
 *      indexada, que es exactamente lo contrario de lo que esta pagina
 *      necesita.
 *   2. Ese tipo carga campos de case study (challenge, solution, results,
 *      clientLocation para JSON-LD) que aqui no tienen uso. Reusarlo obligaria
 *      a llenar campos vacios o a relajar un tipo que hoy es estricto.
 *
 * Los textos van en espanol plano, no `LocaleText`: la pagina es monolingue.
 *
 * ORDEN: importa y es deliberado. Responde a dos criterios, en este orden de
 * prioridad:
 *
 *   1. CERCANIA. Primero el area de Seattle, despues el resto del pais. Las
 *      primeras cuatro tarjetas son lo unico que ve alguien en un celular
 *      antes de hacer scroll, y el publico de este QR esta parado en Renton.
 *      Puestos despues de los locales, los de fuera del estado dejan de leerse
 *      como "no son de aqui" y pasan a leerse como alcance.
 *
 *   2. VARIEDAD VISUAL dentro del bloque local. Dos familias de foto se
 *      repiten y hay que mantenerlas separadas:
 *
 *        - TECHOS (big-house, all-mighty, bardales): tejado gris, cielo,
 *          operario con arnes. Van en las posiciones 1, 4 y 7.
 *        - INTERIORES (esm, darios): cuarto terminado, luz plana. Van en las
 *          posiciones 6 y 9.
 *
 *      Lo que se cumple, verificado a 375 / 800 / 1440: DOS FOTOS DE LA MISMA
 *      FAMILIA NUNCA QUEDAN CONTIGUAS. Que no es lo mismo que "nunca en la
 *      misma fila": a 4 columnas la primera fila lleva big-house y all-mighty,
 *      con dos tarjetas de por medio. Eso pasa --lo que canta es el par
 *      pegado, no la coincidencia de fila-- y ademas esas dos fotos son muy
 *      distintas entre si (tejado oscuro al atardecer contra cielo azul).
 *
 * Al agregar un sitio nuevo, respeta los dos criterios en ese orden. Y ojo con
 * el conteo: 12 cierra exacto en 2, 3 y 4 columnas. El 13 deja huerfanas.
 */
export type ShowcaseSite = {
  /** Slug estable. Es el nombre del archivo de imagen y el valor del evento. */
  id: string;
  /** Nombre comercial tal como lo usa el negocio. */
  name: string;
  /** URL publica del sitio, con protocolo. */
  url: string;
  /** Rubro en espanol neutro. Lo que hace el negocio, no lo que le hicimos. */
  industry: string;
  /** Ciudad y estado, verificados en el propio sitio. */
  location: string;
  /** Ruta bajo /public. Todas 1440x900, mismo encuadre. */
  image: string;
};

export const showcaseSites: ShowcaseSite[] = [
  {
    id: "big-house-gc",
    name: "Big House General Construction",
    url: "https://bighousegcllc.com/",
    industry: "Pintura, techos y siding",
    location: "Renton, WA",
    image: "/sitios/big-house-gc.webp",
  },
  {
    id: "north-beam-framing",
    name: "NorthBeam Framing",
    url: "https://northbeamframing.com/",
    industry: "Enmarcado de madera",
    location: "Seattle, WA",
    image: "/sitios/north-beam-framing.webp",
  },
  {
    id: "angle-stone",
    name: "Angle Stone",
    url: "https://anglestonellc.com/",
    industry: "Paisajismo y mampostería",
    location: "Federal Way, WA",
    image: "/sitios/angle-stone.webp",
  },
  {
    id: "all-mighty-roofing",
    name: "All Mighty Roofing",
    url: "https://allmightyroofingllc.com/",
    industry: "Techos",
    location: "Seattle, WA",
    image: "/sitios/all-mighty-roofing.webp",
  },
  {
    id: "ceja-paint",
    name: "Ceja Paint",
    url: "https://cejapaint.com/",
    industry: "Pintura residencial",
    location: "Seattle, WA",
    image: "/sitios/ceja-paint.webp",
  },
  {
    id: "esm-construction",
    name: "ESM Construction & Remodeling",
    url: "https://esmconstructionwa.com/",
    industry: "Construcción y remodelación",
    location: "Seattle, WA",
    image: "/sitios/esm-construction.webp",
  },
  {
    id: "bardales-roofing",
    name: "Bardales Roofing",
    url: "https://bardalesroofing.com/",
    industry: "Techos",
    location: "Seattle, WA",
    image: "/sitios/bardales-roofing.webp",
  },
  {
    id: "shark-bite-ceviches",
    name: "Shark Bite Ceviches",
    url: "https://sharkbiteceviches.com/",
    industry: "Ceviches y mariscos",
    location: "Seattle, WA",
    image: "/sitios/shark-bite-ceviches.webp",
  },
  {
    id: "darios-renovation",
    name: "Dario's Renovation",
    url: "https://dariosrenovation.com/",
    industry: "Remodelación residencial y comercial",
    location: "Burien, WA",
    image: "/sitios/darios-renovation.webp",
  },
  {
    id: "spm-services",
    name: "SPM Services",
    url: "https://spmservicesllc.com/",
    industry: "Concreto comercial e industrial",
    location: "Oklahoma",
    image: "/sitios/spm-services.webp",
  },
  {
    id: "191-construction",
    name: "191 Construction",
    url: "https://191construction.com/",
    industry: "Concreto industrial",
    location: "Houston, TX",
    image: "/sitios/191-construction.webp",
  },
  {
    id: "latinus-foods",
    name: "Latinus Foods",
    url: "https://latinusfoods.com/",
    industry: "Comida venezolana",
    location: "Utah",
    image: "/sitios/latinus-foods.webp",
  },
];
