import type { LocaleText } from "./i18n";

/**
 * Journal content is bilingual-capable. A field may be a plain string (legacy /
 * English-only posts, rendered the same on both routes) or a { en, es } object
 * for posts written natively in both languages. Resolve every field through
 * `localizeText` at render time.
 */
type Localizable = string | LocaleText;

type BodyBlock = {
  heading: Localizable | null;
  /** May contain inline links in Markdown form: [label](url). */
  text: Localizable;
};

export type Article = {
  id: string;
  title: Localizable;
  subtitle: Localizable;
  date: string;
  readTime: Localizable;
  spotifyEpisodeId?: string;
  /** Suppresses the site sales CTA for depth pieces where a funnel is tonally wrong. */
  hideCta?: boolean;
  /** Optional cross-link to the IG carousel that shares this thesis (the "show" to this "tell"). */
  instagramUrl?: string;
  body: BodyBlock[];
};

export const articles: Article[] = [
  {
    id: "from-brand-book-to-brand-vivo",
    title: {
      en: "From Brand Book to Brand Vivo",
      es: "Del Brand Book al Brand Vivo",
    },
    subtitle: {
      en: "For decades a brand was a document you preserved. Now agents read it before they speak for you — and a PDF can't answer.",
      es: "Durante décadas una marca fue un documento que se preservaba. Hoy los agentes la leen antes de hablar por ti — y un PDF no responde.",
    },
    date: "2026-06-28",
    readTime: { en: "7 min read", es: "7 min de lectura" },
    hideCta: true,
    instagramUrl: "https://www.instagram.com/p/DZyHYpekpp-/",
    body: [
      {
        heading: null,
        text: {
          en: "A brand book is written to be opened. Someone pulls it off a shelf, turns to the page on color, and checks the hex value against what they are about to ship. For thirty years that was the job: a document a human consults to keep a brand consistent. The document still works. The problem is that it is no longer the only thing reading your brand.",
          es: "Un brand book se escribe para abrirse. Alguien lo baja de un estante, busca la página del color y compara el valor hex contra lo que está a punto de publicar. Durante treinta años ese fue el trabajo: un documento que un humano consulta para mantener una marca consistente. El documento sigue funcionando. El problema es que ya no es lo único que lee tu marca.",
        },
      },
      {
        heading: {
          en: "A new reader walked into the room",
          es: "Un nuevo lector entró a la sala",
        },
        text: {
          en: "For most of branding's history, the audience for a brand book was a person: a designer, a marketer, an agency picking up an account. They read, interpreted, and applied. That audience hasn't left. But it is no longer alone. Increasingly, the thing reaching for your brand is a system — an agent drafting a product description in your voice, a model generating an on-brand asset, an assistant answering a customer as if it were you. These readers do not open a document and interpret it. They query a source and act on what it returns. And a sixty-page PDF, to a system, is almost opaque: a flat artifact built for eyes, not for runtime.",
          es: "Durante casi toda la historia del branding, el público de un brand book fue una persona: un diseñador, alguien de marketing, una agencia que recibía una cuenta. Leían, interpretaban, aplicaban. Ese público no se ha ido. Pero ya no está solo. Cada vez más, lo que busca tu marca es un sistema: un agente que redacta una descripción de producto en tu voz, un modelo que genera una pieza on-brand, un asistente que le responde a un cliente como si fuera tu marca. Estos lectores no abren un documento para interpretarlo. Consultan una fuente y actúan sobre lo que reciben. Y un PDF de sesenta páginas, para un sistema, es casi opaco: un artefacto plano hecho para ojos, no para tiempo de ejecución.",
        },
      },
      {
        heading: { en: "The thesis", es: "La tesis" },
        text: {
          en: "A brand can no longer be only a document that preserves an identity. It has to be a system that participates in one. We started calling that Brand Vivo — a brand identity that exists as live, queryable context rather than a static file. The brand book described the brand. Brand Vivo is the brand, available to be read and acted on in real time, by a person or a machine.",
          es: "Una marca ya no puede ser solo un documento que preserva una identidad. Tiene que ser un sistema que participa en ella. A eso empezamos a llamarlo Brand Vivo: una identidad de marca que existe como contexto vivo y consultable, no como un archivo estático. El brand book describía la marca. El Brand Vivo es la marca, disponible para ser leída y accionada en tiempo real, por una persona o por una máquina.",
        },
      },
      {
        heading: {
          en: "What \"living\" actually means",
          es: "Qué significa \"vivo\", en concreto",
        },
        text: {
          en: "Living is not a metaphor here; it is an architecture. The difference between a brand book and a Brand Vivo is the difference between a document and an interface. A document is read once and goes stale the moment the brand evolves. An interface is queried each time it is needed and returns the current answer. Concretely: instead of a PDF that states the primary color, the brand exposes its color as data a system can request. Instead of a page describing tone of voice, the voice is encoded as rules a model can apply while it writes. Instead of a logo locked in an asset folder, the mark is served, in the right format, to whatever is asking. The emerging shorthand for this is a brand exposed through a protocol an AI can call at runtime — the same way software has always exposed an API. The brand stops being a file you send and becomes a service you connect to.",
          es: "Aquí \"vivo\" no es una metáfora; es una arquitectura. La diferencia entre un brand book y un Brand Vivo es la diferencia entre un documento y una interfaz. Un documento se lee una vez y queda obsoleto en el momento en que la marca evoluciona. Una interfaz se consulta cada vez que hace falta y devuelve la respuesta vigente. En concreto: en lugar de un PDF que declara el color primario, la marca expone su color como un dato que un sistema puede pedir. En lugar de una página que describe el tono de voz, la voz se codifica como reglas que un modelo aplica mientras escribe. En lugar de un logo encerrado en una carpeta de assets, la marca se sirve, en el formato correcto, a lo que sea que pregunte. La forma corta que empieza a usarse para esto es una marca expuesta a través de un protocolo que una IA puede invocar en tiempo de ejecución — igual que el software siempre expuso una API. La marca deja de ser un archivo que envías y pasa a ser un servicio al que te conectas.",
        },
      },
      {
        heading: null,
        text: {
          en: "This changes where consistency lives. In the brand-book era, consistency was a discipline: it depended on whether a human remembered to open the manual and follow it. Half the work of guarding a brand was catching the moments someone didn't. When the brand is a queryable system, consistency becomes a property of the source. The system cannot return an off-brand color, because the only color it can return is the right one. What used to be held up by vigilance is now held up by architecture.",
          es: "Esto cambia dónde vive la consistencia. En la era del brand book, la consistencia era una disciplina: dependía de si un humano se acordaba de abrir el manual y seguirlo. La mitad del trabajo de cuidar una marca era atrapar los momentos en que alguien no lo hacía. Cuando la marca es un sistema consultable, la consistencia pasa a ser una propiedad de la fuente. El sistema no puede devolver un color fuera de marca, porque el único color que puede devolver es el correcto. Lo que antes se sostenía por vigilancia ahora se sostiene por arquitectura.",
        },
      },
      {
        heading: {
          en: "We are not the only ones seeing this",
          es: "No somos los únicos que lo vemos",
        },
        text: {
          en: "This is not a private observation. The field is converging on it from several directions. Responsestudios framed it bluntly — the brand book is dead, long live the Brand MCP Server — naming the protocol shift directly. Platforms like Frontify and Glama are building product in the same direction, turning brand assets and guidelines into systems that other software can consume. We are not claiming to have invented the idea. We are naming the version of it we practice, from the seat of a studio that already ships it. Inside Studio OS — the platform we built to run the studio and give every client a living home for their brand — a brand is not a file someone downloads once and never opens again; it is something the client can reach, query, and put to work. We build brands that way today, and we are building toward the near future in which reading a brand directly, in real time, is simply how every system expects to work. The deliverable is no longer a manual. It is a capacity.",
          es: "Esta no es una observación privada. El campo está convergiendo hacia ella desde varias direcciones. Responsestudios lo formuló sin rodeos —el brand book está muerto, larga vida al Brand MCP Server—, nombrando directamente el cambio de protocolo. Plataformas como Frontify y Glama construyen producto en la misma dirección, convirtiendo assets y lineamientos de marca en sistemas que otro software puede consumir. No decimos haber inventado la idea. Le ponemos nombre a la versión que practicamos, desde la silla de un estudio que ya la entrega. Dentro de Studio OS —la plataforma que construimos para operar el estudio y darle a cada cliente un hogar vivo para su marca— una marca no es un archivo que alguien descarga una vez y no vuelve a abrir; es algo que el cliente puede alcanzar, consultar y poner a trabajar. Construimos marcas así hoy, y avanzamos hacia el futuro cercano en el que leer una marca directamente, en tiempo real, sea simplemente como todo sistema espera funcionar. El entregable ya no es un manual. Es una capacidad.",
        },
      },
      {
        heading: {
          en: "Why I saw it from where I was standing",
          es: "Por qué lo vi desde donde estaba",
        },
        text: {
          en: "I noticed this in the middle of a transition, which is usually the only place you can notice anything. For years I worked as a freelancer: a project began, I delivered files, the project ended. A brand, in that model, is naturally a deliverable — a folder you hand over and walk away from. The day I started turning the freelance practice into a studio, the unit of work changed under me. To scale, you stop producing documents and start producing systems: things that keep running after you leave the room. And once you are building systems for everything else, a brand that is still just a folder starts to look like the one part of the operation that was never wired in.",
          es: "Lo noté en medio de una transición, que suele ser el único lugar desde donde se nota algo. Durante años trabajé como freelancer: un proyecto empezaba, yo entregaba archivos, el proyecto terminaba. Una marca, en ese modelo, es naturalmente un entregable — una carpeta que pasas a otra mano y de la que te alejas. El día que empecé a convertir la práctica freelance en un estudio, la unidad de trabajo cambió debajo de mí. Para escalar, dejas de producir documentos y empiezas a producir sistemas: cosas que siguen funcionando después de que sales de la sala. Y cuando ya estás construyendo sistemas para todo lo demás, una marca que sigue siendo solo una carpeta empieza a verse como la única parte de la operación que nunca se conectó.",
        },
      },
      {
        heading: null,
        text: {
          en: "I think I saw it early because I came to this through engineering. I graduated as an informatics engineer in 2006, years before I migrated and rebuilt a career in the United States, and an engineer's instinct is to ask what a thing is at runtime, not only what it looks like on a page. A brand book always looked, to that instinct, like documentation for a system nobody had built yet. Brand Vivo is what happens when you finally build the system. Had I stayed in freelance mode, handing over folders, I suspect I would have arrived at this years later, if at all. You see a paradigm from the middle of the change, not from either side of it.",
          es: "Creo que lo vi temprano porque llegué a esto desde la ingeniería. Me gradué como ingeniero en informática en 2006, años antes de migrar y reconstruir una carrera en Estados Unidos, y el instinto de un ingeniero es preguntar qué es una cosa en tiempo de ejecución, no solo cómo se ve en una página. Un brand book siempre me pareció, desde ese instinto, documentación de un sistema que nadie había construido todavía. El Brand Vivo es lo que pasa cuando por fin construyes el sistema. Si me hubiera quedado en modo freelance, entregando carpetas, sospecho que habría llegado a esto años después, o nunca. Un paradigma se ve desde el medio del cambio, no desde ninguno de sus lados.",
        },
      },
      {
        heading: { en: "The close", es: "El cierre" },
        text: {
          en: "The brand book is not dead. It was the right tool for a room full of human readers, and that room still exists. But it is no longer the whole audience. When the things acting on your behalf can no longer read you, your identity doesn't break loudly — it just quietly stops showing up in the places you were never watching. A brand used to be something you preserved. Now it is something that participates, or doesn't. The question is no longer what your brand looks like in a book. It is what your brand can answer when something asks.",
          es: "El brand book no está muerto. Fue la herramienta correcta para una sala llena de lectores humanos, y esa sala todavía existe. Pero ya no es todo el público. Cuando las cosas que actúan en tu nombre dejan de poder leerte, tu identidad no se rompe con ruido — simplemente deja de aparecer, en silencio, en los lugares que nunca estabas mirando. Una marca solía ser algo que se preservaba. Ahora es algo que participa, o no. La pregunta ya no es cómo se ve tu marca en un libro. Es qué puede responder tu marca cuando algo le pregunta.",
        },
      },
    ],
  },
  {
    id: "the-bridge-between-markets",
    title: "The Bridge Between Markets",
    subtitle: "Why selling Mexican real estate to U.S. buyers keeps failing — and what a Buyer Persona 360 framework reveals.",
    date: "2025-12-02",
    readTime: "8 min read",
    spotifyEpisodeId: "6O6WVycHFWJVVLtqAklmJa",
    body: [
      {
        heading: null,
        text: "Selling real estate in Mexico to buyers living in the United States is not a commercial challenge. It is a cultural one. Firms have tried campaigns with marginal results for years. The problem is structural: a fundamental disconnect between how Mexican developers communicate and how buyers navigating dual cultural identities actually evaluate purchases.",
      },
      {
        heading: "The market no one is serving",
        text: "Mexican and Mexican-American populations in the U.S. represent one of the largest migrant groups in the world. They have emotional, cultural, and familial ties to Mexico — but fundamentally different purchasing behaviors than domestic Mexican buyers. Very few firms have developed strategies for this market. The supply-demand gap is genuine blue ocean.",
      },
      {
        heading: "Why campaigns keep failing",
        text: "Four structural causes: cultural misalignment — communication built from Mexican consumer mindsets, ignoring U.S.-based behavior. Incorrect contact methods — cold calls and WhatsApp generate zero response in U.S. markets. Poor nurturing — American leads need sequences, trust-building, legal clarity, bilingual processes. And the most critical: absent buyer personas. All Latinos treated as one homogeneous segment.",
      },
      {
        heading: "Five buyers, not one",
        text: "Our Buyer Persona 360 methodology analyzes six dimensions — demographic, idiomatic, psychographic, behavioral, cultural, and financial — and reveals five distinct profiles. The stable immigrant motivated by family legacy. The worker dreaming of return, where purchase validates personal sacrifice. The Mexican-American with heightened authenticity sensitivity. The American married to a Mexican, evaluating schools and security. And the U.S. investor seeking ROI and legal clarity in English.",
      },
      {
        heading: "Communication in phases",
        text: "Each profile requires different language, different channels, different timing. Phase one targets emotional buyers in Spanish with human, accessible messaging. Phase two addresses bicultural profiles with bilingual content emphasizing legality and professionalism. Phase three serves premium investors with 100% English materials — PDFs, ROI comparatives, extended informational sessions. Mexico has the supply. The United States has the demand. The key is building the right bridge.",
      },
    ],
  },
  {
    id: "your-footer-is-a-sales-tool",
    title: "Your Footer Is a Sales Tool",
    subtitle: "The most undervalued component on every page of your website.",
    date: "2025-09-26",
    readTime: "4 min read",
    body: [
      {
        heading: null,
        text: "Your footer appears on every single page of your website. It is the one element guaranteed to be seen by every visitor who scrolls past your content. And yet, most businesses treat it as a dumping ground for legal links and a copyright notice.",
      },
      {
        heading: "A permanent landing page",
        text: "A well-designed footer summarizes your value proposition and guides visitors to action — on every page, without being asked. A highlighted CTA. Clear, clickable contact information. A single line that communicates what you do and where you operate. This is not decoration. It is a conversion mechanism that works silently across your entire site.",
      },
      {
        heading: "Trust signals belong here",
        text: "Footers are the ideal placement for credibility markers: certifications, association logos, quality seals. A brief testimonial. A media mention. These elements do not interrupt the reading experience — they reinforce it at the moment the visitor reaches the end of your content and decides whether to take the next step.",
      },
      {
        heading: "Your quietest closer",
        text: "The footer is not an afterthought. It is a strategic asset that generates conversions, reinforces credibility, connects your digital ecosystem, and projects your brand consistently across every page. Design it with the same intention you give your hero section.",
      },
    ],
  },
  {
    id: "q4-is-not-a-season",
    title: "Q4 Is Not a Season. It Is a Strategy.",
    subtitle: "The fourth quarter concentrates more consumer spending than any other period. Most businesses still improvise through it.",
    date: "2024-10-07",
    readTime: "5 min read",
    body: [
      {
        heading: null,
        text: "The fourth quarter of the year concentrates Black Friday, Cyber Monday, and the entire holiday season into a twelve-week window. Consumer spending peaks. Competition for attention intensifies. And most businesses enter this period without a structured plan — reacting to dates instead of executing against a strategy.",
      },
      {
        heading: "Start with what you already know",
        text: "Before optimizing anything, audit your year-to-date performance. Which campaigns drove actual conversions — not impressions, conversions. Which channels produced returns relative to spend. Which months were strongest and why. This analysis eliminates guesswork and focuses your remaining budget on what has already proven to work.",
      },
      {
        heading: "The email advantage",
        text: "Email remains the highest-ROI direct channel available. Segment your lists by behavior, not demographics. Personalize offers based on past engagement. Implement automation for follow-up sequences. A well-timed email series during Q4 outperforms most paid campaigns — at a fraction of the cost.",
      },
      {
        heading: "Real-time or nothing",
        text: "Q4 moves fast. Static campaigns underperform. Monitor daily. Adjust budgets based on what converts, not what was planned in September. Reallocate spend from underperforming channels within hours, not weeks. The businesses that finish the year strong are the ones that treat Q4 as a live operation, not a pre-scheduled calendar.",
      },
    ],
  },
  {
    id: "design-is-a-process",
    title: "Design Is a Process, Not a Deliverable",
    subtitle: "The five stages that separate functional websites from expensive mistakes.",
    date: "2024-09-24",
    readTime: "4 min read",
    body: [
      {
        heading: null,
        text: "Every website we build follows a structured process. Not because process is sacred — but because skipping stages is how projects become expensive, delayed, and misaligned with business objectives. Understanding the framework gives clients a clear picture of where their investment goes.",
      },
      {
        heading: "Sketch and wireframe: structure before style",
        text: "The first two stages are about decisions, not aesthetics. Sketches put ideas on paper quickly — element distribution, content hierarchy, page flow. Wireframes add precision: how content blocks interact, where buttons live, how the user moves through information. No colors, no typography, no images. Just the skeleton. This is where most usability problems are caught and solved — before they become expensive to fix.",
      },
      {
        heading: "Mockup and prototype: vision becomes tangible",
        text: "Once the structure is validated, the design comes to life. Colors, typefaces, images, and visual identity give the page its personality. The client sees their brand on screen for the first time. Then the prototype makes it interactive — buttons click, sections scroll, navigation works. This is the moment for final adjustments in usability and aesthetics, before a single line of production code is written.",
      },
      {
        heading: "Implementation: where craft matters",
        text: "When the prototype is approved, development begins. This is not uploading files to a server. It is building a site that is fast, secure, and accessible from any device. Performance testing. Speed optimization. Security configuration. Analytics setup. The implementation phase determines whether a beautiful design actually performs in the real world — or just looks good in a presentation.",
      },
    ],
  },
];

export function getArticle(id: string) {
  return articles.find((a) => a.id === id);
}
