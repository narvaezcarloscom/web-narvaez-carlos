import type { Dictionary } from "./en";

const es: Dictionary = {
  nav: {
    services: "Servicios",
    work: "Proyectos",
    journal: "Journal",
    contact: "Contacto",
  },
  hero: {
    label: "Estudio Digital Boutique — Seattle, WA",
    labelWords: ["Estudio", "Digital", "Boutique"],
    heading: ["Construimos marcas", "que comunican", "con claridad."],
    body: "Ayudamos a empresas de servicios a verse tan bien como el trabajo que hacen — con estrategia, diseño y tecnología que realmente convierte.",
    cta: "Iniciar un proyecto",
    ctaSecondary: "Ver nuestro trabajo",
    scroll: "Scroll",
  },
  services: {
    label: "Lo que hacemos",
    heading: "Servicios",
    description:
      "Combinamos estrategia, diseño y tecnología para ayudar a empresas de servicios a construir bases digitales sólidas — marcas que comunican con claridad, convierten efectivamente y crecen de forma sostenible.",
    learnMore: "Conocer más",
    pageHeading: ["Estrategia, diseño", "y tecnología —", "trabajando juntos."],
    pageDescription:
      "Ayudamos a empresas de servicios a construir bases digitales sólidas a través de trabajo enfocado e intencional en cuatro disciplinas clave.",
    capabilities: "Capacidades",
    allServices: "Todos los servicios",
    nextService: "Siguiente servicio",
  },
  work: {
    label: "Trabajo seleccionado",
    heading: "Proyectos recientes",
    viewAll: "Ver todos los proyectos",
    pageHeading: ["Proyectos construidos", "con intención."],
    pageDescription:
      "Cada proyecto comienza con un objetivo claro y termina con un resultado medible. Esta es una selección de nuestro trabajo reciente para empresas de servicios.",
    allProjects: "Todos los proyectos",
    nextProject: "Siguiente proyecto",
    year: "Año",
    category: "Categoría",
    servicesLabel: "Servicios",
    liveSite: "Sitio en vivo",
    visitWebsite: "Visitar sitio web",
    overview: "Resumen",
    challenge: "El desafío",
    solution: "La solución",
    results: "Resultados",
  },
  about: {
    label: "Acerca del estudio",
    heading: [
      "Una buena marca no es decoración.",
      "Es estructura, claridad,",
      "e intención.",
    ],
    body1:
      "Narvaez Digital Marketing es un estudio digital boutique especializado en ayudar a empresas de servicios a construir bases digitales sólidas.",
    body2:
      "Nuestro trabajo combina estrategia, diseño y tecnología para crear marcas y experiencias digitales que comunican con claridad, generan conversiones efectivas y crecen de forma sostenible.",
    values: ["Claridad", "Estructura", "Elegancia", "Estrategia"],
  },
  journal: {
    label: "Journal",
    heading: ["Pensando en", "voz alta."],
    description:
      "Perspectivas sobre branding, estrategia y las decisiones que definen cómo las empresas se presentan en línea.",
    listen: "Escuchar este artículo",
    published: "Publicado",
    readingTime: "Tiempo de lectura",
    nextArticle: "Siguiente artículo",
    ctaText: "¿Tienes un proyecto que necesita este tipo de pensamiento?",
    ctaButton: "Iniciar una conversación",
  },
  contact: {
    label: "Contacto",
    heading: ["Iniciemos una", "conversación."],
    description:
      "Cuéntanos sobre tu proyecto. Te responderemos en menos de 24 horas para agendar una consulta gratuita.",
    name: "Nombre",
    namePlaceholder: "Tu nombre",
    email: "Correo",
    emailPlaceholder: "tu@correo.com",
    company: "Empresa",
    companyPlaceholder: "Tu empresa",
    service: "Servicio",
    servicePlaceholder: "Selecciona un servicio",
    message: "Mensaje",
    messagePlaceholder: "Cuéntanos sobre tu proyecto...",
    submit: "Enviar mensaje",
    thankYou: "Gracias.",
    thankYouBody:
      "Recibimos tu mensaje y nos pondremos en contacto en menos de 24 horas.",
    sendAnother: "Enviar otro mensaje",
    emailLabel: "Correo",
    location: "Ubicación",
    connect: "Conecta",
    availability: "Disponibilidad",
    hours: "Lun — Vie, 9am — 6pm PST",
  },
  footer: {
    heading: "Construyamos algo",
    headingItalic: "juntos.",
    cta: "Iniciar un proyecto",
    brand: "Narvaez Digital Marketing",
    studio: "Estudio digital boutique",
    location: "Seattle, WA",
    navigation: "Navegación",
    connect: "Conecta",
    rights: "Todos los derechos reservados.",
    privacy: "Política de Privacidad",
  },
  common: {
    startProject: "Iniciar un proyecto",
    startYourProject: "Inicia tu proyecto",
    studioLocation: "Seattle, WA — Estudio Digital Boutique",
  },
} as const;

export default es;
