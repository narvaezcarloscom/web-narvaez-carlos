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
  body: BodyBlock[];
};

export const articles: Article[] = [
  {
    id: "ethics-as-an-architecture-decision",
    title: {
      en: "Ethics as an Architecture Decision",
      es: "La ética como decisión de arquitectura",
    },
    subtitle: {
      en: "What building an archive for neurodivergent families taught me about where design decisions actually live.",
      es: "Lo que construir un archivo para familias neurodivergentes me enseñó sobre dónde viven de verdad las decisiones de diseño.",
    },
    date: "2026-06-27",
    readTime: { en: "6 min read", es: "6 min de lectura" },
    hideCta: true,
    body: [
      {
        heading: null,
        text: {
          en: "There is an image tag I decided not to write. It was the most obvious component in the project — a gallery of family photographs, the thing every personal site has. I removed it from the system before building it. This was not a content decision made halfway through. It was a constraint set at the foundation, and it changed everything that came after.",
          es: "Hay una etiqueta de imagen que decidí no escribir. Era el componente más obvio del proyecto: una galería de fotos familiares, eso que toda web personal tiene. La saqué del sistema antes de construirla. No fue una decisión de contenido tomada a mitad de camino: fue una restricción puesta en la base, y cambió todo lo que vino después.",
        },
      },
      {
        heading: {
          en: "The theater of accessibility",
          es: "El teatro de la accesibilidad",
        },
        text: {
          en: "In this industry, accessibility almost always arrives late. It is the task that appears in the closing sprint, once the product is already built: alt text, contrast, focus states. A coat of paint over something that has already taken its shape. We treat it as compliance — a box to check before shipping — rather than as the criteria that decides what gets built. Dignity, its close cousin, does not even make the checklist. There is a Lighthouse score for contrast and a linter for alt text, but no audit for whether a system respects the people who appear in it. And that is the question that shapes a product most, if you ask it early enough.",
          es: "En esta industria, la accesibilidad casi siempre llega tarde. Es la tarea que aparece en el sprint de cierre, cuando el producto ya está construido: alt text, contraste, estados de foco. Una capa de pintura sobre algo que ya tomó su forma. La tratamos como cumplimiento —una casilla que marcar antes de entregar— y no como el criterio que decide qué se construye. La dignidad, su prima cercana, ni siquiera entra al checklist. Hay un puntaje de Lighthouse para el contraste y un linter para el alt text, pero ninguna auditoría para saber si un sistema respeta a las personas que aparecen en él. Y es la pregunta que más forma le da a un producto, si uno se la hace a tiempo.",
        },
      },
      {
        heading: { en: "The thesis", es: "La tesis" },
        text: {
          en: "Dignity and accessibility are not layers you add at the end. They are constraints that shape the architecture from the first commit. Move them to the start and you do not build the same thing with better trim. You build something different.",
          es: "La dignidad y la accesibilidad no son capas que se agregan al final. Son restricciones que definen la arquitectura desde el primer commit. Muévelas al inicio y no construyes lo mismo con mejores acabados. Construyes algo distinto.",
        },
      },
      {
        heading: {
          en: "Three decisions that lived in the code",
          es: "Tres decisiones que vivían en el código",
        },
        text: {
          en: "Nuestra Voz Autista is an editorial archive for Spanish-speaking families navigating autism — a companion for people who have just received a diagnosis, not an authority issuing instructions from above. I built it with my wife, Candy. Three decisions show what I mean.",
          es: "Nuestra Voz Autista es un archivo editorial para familias hispanohablantes que viven el autismo: un compañero para quienes acaban de recibir un diagnóstico, no una autoridad que dicta desde arriba. Lo construí con mi esposa, Candy. Tres decisiones muestran lo que quiero decir.",
        },
      },
      {
        heading: null,
        text: {
          en: "The first was removing photography. Instead of images of identifiable faces, the system speaks in a language of abstract compositions. This was not a content rule glued on top of an existing gallery — it changed the component library. Where an <Image> would have gone, a <Composition> stands instead. The constraint became a primitive of the system. What the code makes impossible matters as much as what it makes easy. Building the compositions took longer than dropping in photographs would have. That was the point: the harder path was the one that protected the people the archive is about.",
          es: "La primera fue quitar la fotografía. En lugar de imágenes de rostros identificables, el sistema habla en un lenguaje de composiciones abstractas. Esto no fue una regla de contenido pegada encima de una galería existente: cambió la librería de componentes. Donde habría ido un <Image>, vive un <Composition>. La restricción se volvió una primitiva del sistema. Lo que el código hace imposible importa tanto como lo que hace fácil. Construir las composiciones tomó más tiempo que insertar fotografías. Ese era el punto: el camino difícil era el que protegía a las personas de las que trata el archivo.",
        },
      },
      {
        heading: null,
        text: {
          en: "The second was a forbidden vocabulary, enforced at the level of the system. There are words that appear nowhere in the product — not in production, not in the placeholder text you write at three in the morning without thinking. The language of pity, of battle, of a person to be fixed: it is not discouraged by a style guide someone could quietly ignore. It is outside the corpus by design, the way a type system makes certain states impossible to represent.",
          es: "La segunda fue un vocabulario prohibido, aplicado a nivel de sistema. Hay palabras que no aparecen en ninguna parte del producto: ni en producción, ni en los textos de relleno que uno escribe a las tres de la mañana sin pensar. El lenguaje de la lástima, de la batalla, de la persona que hay que arreglar, no está desalentado por una guía de estilo que alguien podría ignorar en silencio. Está fuera del corpus por diseño, como un sistema de tipos que vuelve ciertos estados imposibles de representar.",
        },
      },
      {
        heading: null,
        text: {
          en: "The third was treating companion, not authority as information architecture. It is not a tagline on the homepage. It is the rule that orders the navigation, the hierarchy, and the voice. A site that positions itself as an expert is structured differently from one that walks beside you. The ethical posture defined the shape of the site before any visual decision. Technical accessibility came along for the ride — [WCAG AAA](https://www.w3.org/WAI/WCAG22/quickref/?levels=aaa) in the body text, not as a target but as the natural consequence of starting there.",
          es: "La tercera fue tratar 'compañero, no autoridad' como arquitectura de información. No es un eslogan en la página de inicio. Es la regla que ordena la navegación, la jerarquía y la voz. Un sitio que se posiciona como experto se estructura distinto a uno que camina a tu lado. La postura ética definió la forma del sitio antes que cualquier decisión visual. La accesibilidad técnica vino con ella: [WCAG AAA](https://www.w3.org/WAI/WCAG22/quickref/?levels=aaa) en el cuerpo del texto, no como meta sino como consecuencia natural de empezar por ahí.",
        },
      },
      {
        heading: { en: "Why I saw it", es: "Por qué lo vi" },
        text: {
          en: "I noticed this because I was standing on both sides at once. As parents, Candy and I saw the need to share information we found relevant for families living something close to our own situation. That was the impulse. But there was something we did not agree with, and it was just as formative: the way, on some platforms, certain parents expose their children in their moments of crisis and deepest vulnerability. For reach. For empathy. Sometimes for clicks. We decided our archive would not trade in that currency.",
          es: "Lo noté porque estaba en los dos lados a la vez. Como padres, Candy y yo veíamos la necesidad de comunicar información que nos parecía relevante para familias que viven una situación parecida a la nuestra. Ese fue el impulso. Pero había algo en lo que no estábamos de acuerdo, y fue igual de formativo: la manera en que, en algunas redes, ciertos padres exponen a sus hijos en sus momentos de crisis y mayor vulnerabilidad. Por alcance. Por empatía. A veces por clics. Decidimos que nuestro archivo no iba a usar esa moneda.",
        },
      },
      {
        heading: null,
        text: {
          en: "That conversation did not happen in a design review. It happened at the kitchen table. And then I had to translate it into code. That is the part I want other builders to see. The ethics did not live on a manifesto page no one reads. They lived at the boundary of a component — the engineer in me taking a parent's conviction and turning it into something the system simply will not let you do. The constraint was not a cost. It was the design.",
          es: "Esa conversación no ocurrió en una reunión de diseño. Ocurrió en la mesa de la cocina. Y después tuve que traducirla a código. Ahí está la parte que quiero que otros constructores vean. La ética no vivía en una página de manifiesto que nadie lee. Vivía en la frontera de un componente: el ingeniero que hay en mí tomando una convicción de padre y convirtiéndola en algo que el sistema, sencillamente, no te deja hacer. La restricción no fue un costo. Fue el diseño.",
        },
      },
      {
        heading: { en: "The close", es: "El cierre" },
        text: {
          en: "Every system encodes a set of values, whether its builder chose them on purpose or not. The question is not whether your architecture has ethics. It is whether you decided them — or left them at their default.",
          es: "Todo sistema codifica un conjunto de valores, los haya elegido su constructor a propósito o no. La pregunta no es si tu arquitectura tiene ética. Es si la decidiste tú, o si la dejaste en su valor por defecto.",
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
