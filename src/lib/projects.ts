import type { LocaleText } from "./i18n";

export type Project = {
  id: string;
  name: string;
  tagline: LocaleText;
  year: string;
  category: LocaleText;
  services: LocaleText[];
  url: string;
  image: string;
  /** Optional hero/full-bleed image. Falls back to `image` (the listing thumbnail) when absent. */
  heroImage?: string;
  overview: LocaleText;
  challenge: LocaleText;
  solution: LocaleText;
  results: LocaleText[];
  editorialHeadline?: LocaleText;
  pullQuote?: LocaleText;
  solutionPoints?: LocaleText[];
};

export const projects: Project[] = [
  // — 2026 —
  {
    id: "angle-stone",
    name: "Angle Stone",
    tagline: {
      en: "Stone hardscapes that elevate Seattle's finest outdoor spaces.",
      es: "Paisajismo en piedra que realza los mejores espacios exteriores de Seattle.",
    },
    year: "2026",
    category: {
      en: "Web Design & Development",
      es: "Diseño y Desarrollo Web",
    },
    services: [
      { en: "Web Design", es: "Diseño Web" },
      { en: "SEO", es: "SEO" },
      { en: "Content Strategy", es: "Estrategia de Contenido" },
    ],
    url: "https://anglestonellc.com",
    image: "/work/angle-stone.jpg",
    heroImage: "/work/angle-stone-hero.webp",
    editorialHeadline: {
      en: "Craft that deserved a stage.",
      es: "Un oficio que merecía un escenario.",
    },
    overview: {
      en: "Angle Stone is a Seattle-based outdoor construction company specializing in stone hardscapes, deck installation, irrigation systems, and low-voltage landscape lighting. They serve homeowners across King County — from Seattle and Kirkland to Edmonds, Federal Way, and North Bend — with premium craftsmanship rooted in years of construction experience.",
      es: "Angle Stone es una empresa de construcción exterior con sede en Seattle, especializada en paisajismo en piedra, construcción de terrazas, sistemas de riego e iluminación paisajística de bajo voltaje. Atiende a propietarios en todo el condado de King —desde Seattle y Kirkland hasta Edmonds, Federal Way y North Bend— con un acabado de primera, fruto de años de experiencia en construcción.",
    },
    challenge: {
      en: "Angle Stone had the craft, the client roster, and the portfolio — but their digital presence didn't reflect the caliber of the work. The category is crowded with contractor websites that look interchangeable: stock photos, generic service lists, and no sense of place. They needed a site that could speak to homeowners who care about design as much as durability, and that could anchor their authority across the Seattle metro.",
      es: "Angle Stone tenía el oficio, la cartera de clientes y el portafolio, pero su presencia digital no reflejaba la calidad de su trabajo. La categoría está saturada de sitios de contratistas que se ven iguales: fotos de banco de imágenes, listas de servicios genéricas y ninguna sensación de lugar. Necesitaban un sitio capaz de hablarle a los propietarios que se preocupan por el diseño tanto como por la durabilidad, y que afianzara su autoridad en toda el área metropolitana de Seattle.",
    },
    pullQuote: {
      en: "They needed a site that could speak to homeowners who care about design as much as durability.",
      es: "Necesitaban un sitio capaz de hablarle a los propietarios que se preocupan por el diseño tanto como por la durabilidad.",
    },
    solution: {
      en: "We designed a dark, editorial website that lets the outdoor photography lead. The palette — warm tan accents against deep black — evokes outdoor spaces at dusk, when landscape lighting comes alive. We structured the site around real projects with real client names and real Seattle-area neighborhoods (Kirkland, Lake Tapps, Federal Way), giving prospects immediate geographic proof of authority. A four-step process section communicates craft and transparency, while a video reel showcases the work in motion.",
      es: "Diseñamos un sitio oscuro y editorial donde la fotografía exterior es la protagonista. La paleta —acentos en un tono arena cálido sobre negro profundo— evoca los espacios exteriores al atardecer, cuando cobra vida la iluminación paisajística. Estructuramos el sitio en torno a proyectos reales, con nombres de clientes reales y barrios reales del área de Seattle (Kirkland, Lake Tapps, Federal Way), dando a los prospectos una prueba geográfica inmediata de autoridad. Una sección de proceso en cuatro pasos comunica oficio y transparencia, mientras que un video muestra el trabajo en movimiento.",
    },
    solutionPoints: [
      {
        en: "Editorial dark palette — warm tan against deep black, evoking landscape lighting at dusk",
        es: "Paleta oscura editorial — tono arena cálido sobre negro profundo, que evoca la iluminación paisajística al atardecer",
      },
      {
        en: "Real projects with named clients across Kirkland, Lake Tapps, and Federal Way",
        es: "Proyectos reales con clientes nombrados en Kirkland, Lake Tapps y Federal Way",
      },
      {
        en: "Four-step process section communicating craft and transparency",
        es: "Sección de proceso en cuatro pasos que comunica oficio y transparencia",
      },
      {
        en: "Video reel showcasing the work in motion",
        es: "Video que muestra el trabajo en movimiento",
      },
    ],
    results: [
      {
        en: "Geographic authority anchored in King County service areas",
        es: "Autoridad geográfica afianzada en las zonas de servicio del condado de King",
      },
      {
        en: "Project showcase with named clients and specific neighborhoods",
        es: "Vitrina de proyectos con clientes nombrados y barrios específicos",
      },
      {
        en: "Editorial dark theme matching the craft positioning",
        es: "Tema oscuro editorial coherente con el posicionamiento de oficio",
      },
      {
        en: "Local SEO foundation for the Seattle metro market",
        es: "Base de SEO local para el mercado del área metropolitana de Seattle",
      },
    ],
  },
  {
    id: "avante-group",
    name: "Avante Group",
    tagline: {
      en: "A growth partner connecting Chile's wellness centers with the clients who value them.",
      es: "Un partner de crecimiento que conecta a los centros de bienestar de Chile con los clientes que los valoran.",
    },
    year: "2026",
    category: {
      en: "Web Design & Development",
      es: "Diseño y Desarrollo Web",
    },
    services: [
      { en: "Brand Strategy", es: "Estrategia de Marca" },
      { en: "Web Design", es: "Diseño Web" },
      { en: "Custom Platform", es: "Plataforma a Medida" },
    ],
    url: "https://avantegroup.cl",
    image: "/work/avante-group.jpg",
    heroImage: "/work/avante-group-hero.webp",
    editorialHeadline: {
      en: "A brand returned to its own idea.",
      es: "Una marca devuelta a su propia idea.",
    },
    overview: {
      en: "Avante Group is a Santiago-based growth partner for health, aesthetics, and wellness centers across Chile. More than a conventional marketing agency, it builds exclusive alliances — bringing qualified clients to partner centers through segmented campaigns, with no ad spend required from the partner.",
      es: "Avante Group es un partner de crecimiento con sede en Santiago para centros de salud, estética y bienestar en todo Chile. Más que una agencia de marketing convencional, construye alianzas exclusivas: lleva clientes cualificados a los centros asociados mediante campañas segmentadas, sin que el partner invierta en publicidad.",
    },
    challenge: {
      en: "Avante's founder had a clear idea of what her brand meant — it simply hadn't found the place where it could be understood and built. The work she'd been handed developed the project before it had truly understood it, and the result drifted away from her core idea instead of toward it. For a business built on trust between wellness centers and discerning clients, the brand needed a place that would listen before it designed.",
      es: "La fundadora de Avante tenía clara la idea de lo que su marca significaba; solo que aún no había encontrado el lugar donde pudiera ser entendida y construida. El trabajo que le habían entregado desarrolló el proyecto antes de comprenderlo de verdad, y el resultado se alejaba de su idea central en vez de acercarla. Para un negocio construido sobre la confianza entre centros de bienestar y clientes exigentes, la marca necesitaba un lugar que escuchara antes de diseñar.",
    },
    pullQuote: {
      en: "The idea was sound — it just hadn't found the place to be understood.",
      es: "La idea era sólida; solo no había encontrado el lugar donde ser entendida.",
    },
    solution: {
      en: "We started where the work needed to begin: with her idea. Using the studio's intake methodology — structured through our own platform at app.narvaezcarlos.com — we extracted the essence of the brand before touching a single pixel. The rebrand gave the idea its own register — editorial calm: a cultivated palette, serif typography, and a cinematic scroll hero built around a single bonsai, a quiet metaphor for growth shaped with patience. Beyond the site, we built Avante a custom platform to run the operation: certificate issuance with a unique code and QR per purchase, redemption at partner centers, and a self-management dashboard for vendors, centers, operators, and reports.",
      es: "Empezamos donde el trabajo debía empezar: por su idea. Con la metodología de intake del estudio —estructurada en nuestra propia plataforma en app.narvaezcarlos.com— extrajimos la esencia de la marca antes de tocar un solo píxel. El rebranding le dio a la idea su propio registro —una calma editorial: una paleta cultivada, tipografía serif y un hero cinematográfico construido en torno a un bonsái, una metáfora silenciosa del crecimiento moldeado con paciencia. Más allá del sitio, le construimos a Avante una plataforma a medida para operar el negocio: emisión de certificados con código único y QR por cada compra, canje en los centros asociados, y un dashboard de autogestión para vendedores, centros, operadores y reportes.",
    },
    solutionPoints: [
      {
        en: "Intake methodology run through the studio platform (app.narvaezcarlos.com) to capture the brand's essence before design",
        es: "Metodología de intake ejecutada en la plataforma del estudio (app.narvaezcarlos.com) para captar la esencia de la marca antes de diseñar",
      },
      {
        en: "Editorial rebrand — a cultivated palette and serif typography that finally matched the brand's own idea",
        es: "Rebranding editorial — paleta cultivada y tipografía serif que por fin coincidieron con la idea propia de la marca",
      },
      {
        en: "Cinematic scroll hero built around a single bonsai — growth shaped with intention",
        es: "Hero cinematográfico construido en torno a un bonsái — crecimiento moldeado con intención",
      },
      {
        en: "Custom management platform — unique-code and QR certificates, partner-center redemption, and a self-management dashboard",
        es: "Plataforma de gestión a medida — certificados con código único y QR, canje en centros asociados y dashboard de autogestión",
      },
    ],
    results: [
      {
        en: "A brand that finally reflected its founder's original idea",
        es: "Una marca que por fin reflejó la idea original de su fundadora",
      },
      {
        en: "The confidence to approach the right sector — wellness centers — with credibility",
        es: "La confianza para acercarse al sector correcto —centros de bienestar— con credibilidad",
      },
      {
        en: "First alliance deals closed with wellness centers",
        es: "Primeros tratos de alianza cerrados con centros de bienestar",
      },
      {
        en: "Custom platform handling certificate issuance, QR redemption, and operations end to end",
        es: "Plataforma a medida que gestiona la emisión de certificados, el canje por QR y la operación de punta a punta",
      },
    ],
  },
  // — 2025 —
  {
    id: "sircon",
    name: "SIRCON",
    tagline: {
      en: "Consular operations, streamlined from scan to record.",
      es: "Operaciones consulares, simplificadas del escaneo al registro.",
    },
    year: "2025",
    category: {
      en: "Custom Apps & Platforms",
      es: "Aplicaciones y Plataformas a Medida",
    },
    services: [
      { en: "Custom Platform", es: "Plataforma a Medida" },
      { en: "Dashboard & Analytics", es: "Panel y Analítica" },
      { en: "Workflow Automation", es: "Automatización de Procesos" },
    ],
    url: "https://sircon.app",
    image: "/work/sircon.jpg",
    overview: {
      en: "SIRCON is a white-label consular records management system designed for diplomatic offices and consulates. It automates the extraction, classification, and tracking of application forms — replacing fully manual processes with an intelligent digital workflow.",
      es: "SIRCON es un sistema de marca blanca para la gestión de registros consulares, diseñado para oficinas diplomáticas y consulados. Automatiza la extracción, clasificación y seguimiento de formularios de solicitud, sustituyendo procesos completamente manuales por un flujo de trabajo digital inteligente.",
    },
    challenge: {
      en: "Consular staff processed hundreds of handwritten forms manually — reading each field, typing data into spreadsheets, and tracking application status across disconnected tools. The process was slow, error-prone, and impossible to scale during peak demand periods.",
      es: "El personal consular procesaba cientos de formularios escritos a mano —leyendo cada campo, transfiriendo los datos a hojas de cálculo y haciendo seguimiento del estado de las solicitudes en herramientas desconectadas. El proceso era lento, propenso a errores e imposible de escalar durante los periodos de mayor demanda.",
    },
    solution: {
      en: "We designed and built a complete platform with OCR-powered form scanning that extracts handwritten data automatically, a real-time dashboard with application metrics and classification analytics, and role-based access for consular staff. The system turns a paper-heavy workflow into a fast, searchable, and auditable digital process.",
      es: "Diseñamos y construimos una plataforma completa con escaneo de formularios por OCR que extrae automáticamente los datos escritos a mano, un panel en tiempo real con métricas de solicitudes y analítica de clasificación, y acceso basado en roles para el personal consular. El sistema convierte un flujo de trabajo cargado de papel en un proceso digital rápido, consultable y auditable.",
    },
    results: [
      {
        en: "Automated data extraction from handwritten forms via OCR",
        es: "Extracción automatizada de datos de formularios escritos a mano mediante OCR",
      },
      {
        en: "Real-time dashboard with metrics by type and status",
        es: "Panel en tiempo real con métricas por tipo y estado",
      },
      {
        en: "Role-based access for consular staff",
        es: "Acceso basado en roles para el personal consular",
      },
      {
        en: "Processing time reduced from minutes to seconds per form",
        es: "Tiempo de procesamiento reducido de minutos a segundos por formulario",
      },
    ],
  },
  {
    id: "bloom-sante",
    name: "Bloom Santé",
    tagline: {
      en: "A wellness brand designed to feel like presence, not perfection.",
      es: "Una marca de bienestar diseñada para sentirse como presencia, no como perfección.",
    },
    year: "2025",
    category: {
      en: "Branding & Web Design",
      es: "Identidad de Marca y Diseño Web",
    },
    services: [
      { en: "Brand Identity", es: "Identidad de Marca" },
      { en: "Web Design", es: "Diseño Web" },
      { en: "Content Direction", es: "Dirección de Contenido" },
    ],
    url: "#",
    image: "/work/bloom-sante.jpg",
    heroImage: "/work/bloom-sante-hero.webp",
    overview: {
      en: "Bloom Santé is a curated beauty and wellness brand built around a single conviction — that beauty is not perfection, it is presence. Our work was to translate that philosophy into a complete visual system: the brand identity, the editorial voice, the photographic language, and the digital foundation from which the store would grow.",
      es: "Bloom Santé es una marca curada de belleza y bienestar construida en torno a una sola convicción: la belleza no es perfección, es presencia. Nuestro trabajo fue traducir esa filosofía a un sistema visual completo: la identidad de marca, la voz editorial, el lenguaje fotográfico y la base digital desde la cual crecería la tienda.",
    },
    challenge: {
      en: "The wellness category is saturated with brands that blur into each other — pastel palettes, interchangeable product grids, and promises that feel rehearsed. Bloom Santé needed a visual identity that felt quiet and deliberate, a counter-signal to the noise. Something that would read as a boutique apothecary, not another dropshipping storefront.",
      es: "La categoría de bienestar está saturada de marcas que se confunden entre sí —paletas pastel, retículas de productos intercambiables y promesas que suenan ensayadas. Bloom Santé necesitaba una identidad visual que se sintiera serena y deliberada, una contraseñal frente al ruido. Algo que se leyera como una botica boutique, no como otra tienda de dropshipping.",
    },
    solution: {
      en: "We designed a brand system rooted in burgundy, ivory, and warm neutrals, paired with serif typography that carries the cadence of editorial print. The photographic direction leans into natural light, real skin, and everyday rituals — no stock imagery. Copy is intimate and unhurried, written to be read slowly. Every screen of the digital experience — from hero to product detail to footer — reinforces a single editorial voice that sounds like a letter from a friend, not a sales funnel.",
      es: "Diseñamos un sistema de marca anclado en burdeos, marfil y tonos neutros cálidos, acompañado de una tipografía serif que transmite el ritmo de la prensa editorial. La dirección fotográfica apuesta por la luz natural, la piel real y los rituales cotidianos —sin imágenes de banco. Los textos son íntimos y sin prisa, escritos para leerse despacio. Cada pantalla de la experiencia digital —del hero al detalle del producto y al pie de página— refuerza una sola voz editorial que suena como una carta de un amigo, no como un embudo de ventas.",
    },
    results: [
      {
        en: "Brand identity and visual system that stands apart in the wellness category",
        es: "Identidad de marca y sistema visual que se diferencian en la categoría de bienestar",
      },
      {
        en: "Editorial photographic direction and brand voice",
        es: "Dirección fotográfica editorial y voz de marca",
      },
      {
        en: "Digital foundation ready for product rollout",
        es: "Base digital lista para el lanzamiento de productos",
      },
      {
        en: "Complete design system documented for future growth",
        es: "Sistema de diseño completo documentado para el crecimiento futuro",
      },
    ],
  },
  {
    id: "swc-decor",
    name: "SWC Decor",
    tagline: {
      en: "Wallcoverings that redefine sophisticated interiors.",
      es: "Recubrimientos de pared que redefinen los interiores sofisticados.",
    },
    year: "2025",
    category: {
      en: "Web Design & Development",
      es: "Diseño y Desarrollo Web",
    },
    services: [
      { en: "Web Design", es: "Diseño Web" },
      { en: "SEO", es: "SEO" },
      { en: "Content Strategy", es: "Estrategia de Contenido" },
    ],
    url: "https://swcdecor.com",
    image: "/work/swc-decor.jpg",
    heroImage: "/work/swc-decor-hero.webp",
    overview: {
      en: "SWC Decor is a premium wallcovering company based in Seattle, serving architects and interior designers with exceptional materials. They needed a website that communicated the tactile, high-end nature of their products in a digital format.",
      es: "SWC Decor es una empresa premium de recubrimientos de pared con sede en Seattle, que ofrece materiales excepcionales a arquitectos y diseñadores de interiores. Necesitaban un sitio que comunicara en formato digital la naturaleza táctil y de alta gama de sus productos.",
    },
    challenge: {
      en: "Selling a physical, textural product online is inherently difficult — you cannot feel a wallcovering through a screen. SWC Decor needed to bridge the gap between the digital experience and the sensory reality of their materials, while serving a professional audience of architects and designers.",
      es: "Vender en línea un producto físico y texturizado es difícil por naturaleza —no se puede sentir un recubrimiento de pared a través de una pantalla. SWC Decor necesitaba tender un puente entre la experiencia digital y la realidad sensorial de sus materiales, atendiendo a una audiencia profesional de arquitectos y diseñadores.",
    },
    solution: {
      en: "We created a visually rich website where large-format photography showcases texture and material quality at scale. The design uses generous whitespace and refined typography to mirror the sophistication of the interiors their products inhabit. A product discovery flow serves the professional workflow of specifiers and designers.",
      es: "Creamos un sitio visualmente rico donde la fotografía en gran formato muestra la textura y la calidad de los materiales a escala. El diseño utiliza espacios en blanco generosos y una tipografía depurada para reflejar la sofisticación de los interiores que habitan sus productos. Un flujo de descubrimiento de productos sirve el flujo de trabajo profesional de especificadores y diseñadores.",
    },
    results: [
      {
        en: "Premium digital presence for tactile product category",
        es: "Presencia digital premium para una categoría de productos táctiles",
      },
      {
        en: "Architect and designer-focused user experience",
        es: "Experiencia de usuario enfocada en arquitectos y diseñadores",
      },
      {
        en: "Product discovery optimized for professional workflow",
        es: "Descubrimiento de productos optimizado para el flujo de trabajo profesional",
      },
      {
        en: "Local SEO for Seattle design market",
        es: "SEO local para el mercado de diseño de Seattle",
      },
    ],
  },
  // — 2024 —
  {
    id: "gtr-appliance-repair",
    name: "Luxury Appliance Repair",
    tagline: {
      en: "Luxury appliance repair for Florida's finest homes.",
      es: "Reparación de electrodomésticos de lujo para las mejores residencias de Florida.",
    },
    year: "2024",
    category: {
      en: "Web Design & Development",
      es: "Diseño y Desarrollo Web",
    },
    services: [
      { en: "Web Design", es: "Diseño Web" },
      { en: "SEO", es: "SEO" },
      { en: "Content Strategy", es: "Estrategia de Contenido" },
    ],
    url: "https://gtrappliancerepair.com",
    image: "/work/gtr-appliance-repair.jpg",
    heroImage: "/work/gtr-appliance-repair-hero.webp",
    overview: {
      en: "GTR Appliance Repair is a premium appliance service company based in South Florida, specializing in high-end brands like Sub-Zero, Wolf, and Viking. They needed a digital presence that matched the luxury positioning of their brand and the clientele they serve.",
      es: "GTR Appliance Repair es una empresa premium de servicio de electrodomésticos con sede en el sur de Florida, especializada en marcas de alta gama como Sub-Zero, Wolf y Viking. Necesitaban una presencia digital a la altura del posicionamiento de lujo de su marca y de la clientela que atienden.",
    },
    challenge: {
      en: "The previous website failed to communicate the premium nature of their service. It looked generic, lacked trust signals, and didn't convert visitors into booked appointments. The challenge was to reposition GTR as the go-to luxury appliance repair service in the Florida market.",
      es: "El sitio anterior no lograba comunicar la naturaleza premium de su servicio. Se veía genérico, carecía de señales de confianza y no convertía a los visitantes en citas reservadas. El reto era reposicionar a GTR como el servicio de referencia para la reparación de electrodomésticos de lujo en el mercado de Florida.",
    },
    solution: {
      en: "We designed and developed a custom website with a refined, dark aesthetic that immediately communicates premium quality. The layout emphasizes trust — certified technicians, warranty-backed repairs, and fast discreet service. A clear booking flow reduces friction from visit to appointment.",
      es: "Diseñamos y desarrollamos un sitio a medida con una estética oscura y depurada que comunica de inmediato una calidad premium. El diseño hace énfasis en la confianza —técnicos certificados, reparaciones con garantía y un servicio rápido y discreto. Un flujo de reserva claro reduce la fricción entre la visita y la cita.",
    },
    results: [
      {
        en: "Premium brand perception established",
        es: "Percepción de marca premium establecida",
      },
      {
        en: "Clear conversion path from visit to booking",
        es: "Ruta de conversión clara, de la visita a la reserva",
      },
      {
        en: "Mobile-optimized for on-the-go homeowners",
        es: "Optimizado para móviles, para propietarios en movimiento",
      },
      {
        en: "Local SEO foundation for South Florida market",
        es: "Base de SEO local para el mercado del sur de Florida",
      },
    ],
  },
  {
    id: "myan-realty",
    name: "Myan Realty",
    tagline: {
      en: "Discover your ideal property in the Riviera Maya.",
      es: "Descubre tu propiedad ideal en la Riviera Maya.",
    },
    year: "2024",
    category: {
      en: "Web Design & Development",
      es: "Diseño y Desarrollo Web",
    },
    services: [
      { en: "Web Design", es: "Diseño Web" },
      { en: "SEO", es: "SEO" },
      { en: "Content Strategy", es: "Estrategia de Contenido" },
    ],
    url: "https://myanrealty.com",
    image: "/work/myan-realty.jpg",
    heroImage: "/work/myan-realty-hero.webp",
    overview: {
      en: "Myan Realty is a real estate firm specializing in luxury properties across the Riviera Maya, Mexico. They needed a bilingual platform that could showcase high-end listings to international buyers while conveying the lifestyle and exclusivity of the region.",
      es: "Myan Realty es una firma inmobiliaria especializada en propiedades de lujo en la Riviera Maya, México. Necesitaban una plataforma bilingüe capaz de mostrar propiedades de alta gama a compradores internacionales, transmitiendo a la vez el estilo de vida y la exclusividad de la región.",
    },
    challenge: {
      en: "The real estate market in the Riviera Maya is highly competitive with dozens of agencies targeting the same international buyer. Myan Realty needed to differentiate through design sophistication and a seamless property search experience — not just another listing grid.",
      es: "El mercado inmobiliario de la Riviera Maya es muy competitivo, con decenas de agencias persiguiendo al mismo comprador internacional. Myan Realty necesitaba diferenciarse mediante la sofisticación del diseño y una experiencia de búsqueda de propiedades fluida, no con otra retícula de listados más.",
    },
    solution: {
      en: "We built a bilingual website with immersive photography, an intuitive property search filtered by type and location, and a visual language that mirrors the luxury of the properties themselves. The design prioritizes large imagery, clean typography, and a smooth browsing experience across devices.",
      es: "Construimos un sitio bilingüe con fotografía inmersiva, una búsqueda de propiedades intuitiva filtrada por tipo y ubicación, y un lenguaje visual que refleja el lujo de las propias propiedades. El diseño prioriza las imágenes de gran formato, una tipografía limpia y una experiencia de navegación fluida en todos los dispositivos.",
    },
    results: [
      {
        en: "Bilingual platform serving English and Spanish markets",
        es: "Plataforma bilingüe para los mercados en inglés y español",
      },
      {
        en: "Property search with type and location filters",
        es: "Búsqueda de propiedades con filtros por tipo y ubicación",
      },
      {
        en: "Premium visual identity matching luxury listings",
        es: "Identidad visual premium coherente con los listados de lujo",
      },
      {
        en: "International buyer conversion flow",
        es: "Flujo de conversión para compradores internacionales",
      },
    ],
  },
  {
    id: "yhon-pena",
    name: "Yhon Peña",
    tagline: {
      en: "A photographer's portfolio as refined as his eye.",
      es: "El portafolio de un fotógrafo, tan depurado como su mirada.",
    },
    year: "2024",
    category: {
      en: "Web Design & Development",
      es: "Diseño y Desarrollo Web",
    },
    services: [
      { en: "Web Design", es: "Diseño Web" },
      { en: "Content Strategy", es: "Estrategia de Contenido" },
    ],
    url: "https://yhonpena.com",
    image: "/work/yhon-pena.jpg",
    overview: {
      en: "Yhon Peña is a professional photographer based in Miami specializing in weddings, events, and editorial portraiture. His work captures intimate, cinematic moments — and his website needed to let that work speak without interference.",
      es: "Yhon Peña es un fotógrafo profesional con sede en Miami, especializado en bodas, eventos y retratos editoriales. Su trabajo captura momentos íntimos y cinematográficos, y su sitio debía dejar que esa obra hablara sin interferencias.",
    },
    challenge: {
      en: "Photographers often have websites that compete with their own images — busy layouts, unnecessary UI, slow-loading galleries. Yhon needed a platform that stepped back and let the photography be the protagonist, while still converting visitors into booked clients.",
      es: "Los fotógrafos suelen tener sitios que compiten con sus propias imágenes —layouts recargados, interfaces innecesarias y galerías lentas de cargar. Yhon necesitaba una plataforma que se apartara y dejara que la fotografía fuera la protagonista, sin dejar de convertir a los visitantes en clientes reservados.",
    },
    solution: {
      en: "We designed a minimal, image-forward portfolio where the photography commands every page. Navigation is invisible until needed. Load times are optimized for large-format images. The contact flow is direct — from gallery to inquiry in two clicks.",
      es: "Diseñamos un portafolio minimalista centrado en la imagen, donde la fotografía domina cada página. La navegación es invisible hasta que se necesita. Los tiempos de carga están optimizados para imágenes de gran formato. El flujo de contacto es directo: de la galería a la consulta en dos clics.",
    },
    results: [
      {
        en: "Photography-first design with zero visual competition",
        es: "Diseño centrado en la fotografía, sin competencia visual",
      },
      {
        en: "Fast-loading optimized image galleries",
        es: "Galerías de imágenes optimizadas y de carga rápida",
      },
      {
        en: "Streamlined booking inquiry flow",
        es: "Flujo de consulta y reserva simplificado",
      },
      {
        en: "Mobile experience matching desktop quality",
        es: "Experiencia móvil a la altura de la versión de escritorio",
      },
    ],
  },
];

export function getProject(id: string): Project | undefined {
  return projects.find((p) => p.id === id);
}
