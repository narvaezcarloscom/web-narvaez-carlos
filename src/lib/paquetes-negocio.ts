/**
 * Los tres paquetes que muestra /tu-negocio.
 *
 * FUENTE DE VERDAD: `sandbox/studio-comercial/canales/graficolor.md` §2 y §3.
 * Si un precio, una anualidad o un alcance cambia alla, cambia aqui. No al
 * reves.
 *
 * POR QUE ESTATICO Y NO DESDE STUDIO OS: el cotizador de Studio OS no conoce
 * el $1,200 ni el $1,600 — `graficolor.md` es explicito en que esos dos tiers
 * se cotizan a mano y viven como anexo del canal, no como SKU formales. Una
 * landing que consultara esa API mostraria precios equivocados o nada.
 *
 * PRECIO DE LISTA, NO DE CONTADO. El motor comercial fija el contado 50/50 en
 * $750 / $1,120 / $1,500 —con descuento— y reserva $800 / $1,200 / $1,600 para
 * el plan a meses. La pagina publica lista y remite el desglose a la
 * conversacion. No agregar aqui una linea de "50% y 50%": contradiria al
 * motor. (El PDF marca blanca si la tiene; esa inconsistencia se corrige alla.)
 */
export type PaqueteNegocio = {
  id: "presencia" | "captacion" | "crecimiento";
  nombre: string;
  /** Precio de lista en USD. */
  precio: number;
  /** Lo que el sitio hace por el negocio. El eje real de la escalera. */
  promesa: string;
  /** Para quien es, en una linea. */
  paraQuien: string;
  /** Nombre del tier anterior. Renderiza "Todo lo de X, mas:". */
  heredaDe?: string;
  incluye: string[];
  /** Anualidad desde el segundo ano, en USD. */
  anualidad: number;
};

export const paquetes: PaqueteNegocio[] = [
  {
    id: "presencia",
    nombre: "Presencia",
    precio: 800,
    promesa: "Que te encuentren y te llamen.",
    paraQuien: "Para el negocio que todavía no tiene nada en internet.",
    incluye: [
      "Sitio web de una página, bien hecho",
      "En inglés y en español",
      "Presentación del negocio y sus servicios",
      "Formulario de contacto y botón de WhatsApp",
      "Hasta 20 fotos tuyas",
      "Ficha de Google Business, hecha contigo",
      "2 rondas de revisión",
    ],
    anualidad: 180,
  },
  {
    id: "captacion",
    nombre: "Captación",
    precio: 1200,
    promesa: "Que aparezcas cuando buscan en tu ciudad.",
    paraQuien: "Para el que ya trabaja en varias ciudades y quiere salir en cada una.",
    heredaDe: "Presencia",
    incluye: [
      "Varias páginas: Inicio, Servicios, Nosotros, Contacto",
      "SEO local por ciudad — las ciudades donde de verdad trabajas",
      "Sección de área de servicio",
      "Preguntas frecuentes preparadas para que la IA las cite",
      "Barra de confianza: licencia, años, seguro, cobertura",
      "Sección de proceso y bloque de reseñas de Google",
      "3 rondas de revisión",
    ],
    anualidad: 200,
  },
  {
    id: "crecimiento",
    nombre: "Crecimiento",
    precio: 1600,
    promesa: "Que te lleguen solicitudes ya calificadas.",
    paraQuien: "Para el que quiere dejar de cotizar por teléfono y empezar a cotizar con fotos.",
    heredaDe: "Captación",
    incluye: [
      "Una página por cada servicio, hasta cinco",
      "Formulario de presupuesto con detalle: tipo de trabajo, ciudad y plazo",
      "El cliente te manda las fotos del trabajo desde su teléfono",
      "Galería de proyectos",
      "Segunda integración: agenda o WhatsApp Business",
      "Hasta 40 fotos con curaduría",
      "3 rondas de revisión",
    ],
    anualidad: 220,
  },
];

/** Oficios del select del formulario. Es el dato que dice a que nicho llega el flyer. */
export const OFICIOS = [
  "Techos",
  "Limpieza",
  "Jardinería y paisajismo",
  "Construcción y remodelación",
  "Pintura",
  "Concreto",
  "Otro",
] as const;
