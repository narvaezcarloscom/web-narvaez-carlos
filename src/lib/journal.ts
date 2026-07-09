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
    id: "critique-lives-in-the-arrows",
    title: {
      en: "Critique Lives in the Arrows",
      es: "La crítica vive en las flechas",
    },
    subtitle: {
      en: "How a small studio turns raw ideas into solid pieces — and how it knows when a piece is ready to generalize.",
      es: "Cómo un estudio pequeño convierte ideas crudas en piezas sólidas — y cómo sabe cuándo una pieza puede generalizarse.",
    },
    date: "2026-07-09",
    readTime: { en: "7 min read", es: "7 min de lectura" },
    hideCta: true,
    body: [
      {
        heading: null,
        text: {
          en: "There is a moment I recognize in every project. An idea shows up — I just thought of something — and minutes later I am already writing code. The jump feels productive. It is almost always expensive.",
          es: "Hay un momento que reconozco en cada proyecto. Una idea aparece —se me ocurrió algo— y minutos después ya estoy escribiendo código. El salto se siente productivo. Casi siempre es caro.",
        },
      },
      {
        heading: null,
        text: {
          en: "It is expensive because between I just thought of it and I am already building you skip the only question that matters: what exactly does this piece prove? Without that question answered, what you build has nothing to measure itself against. And what cannot be measured against a goal ends up measured against taste — yours, the client's, whoever spoke loudest in the room. Taste is an unstable judge. It shifts with fatigue, with the hour, with the volume in the meeting.",
          es: "Es caro porque entre se me ocurrió y ya estoy construyendo se salta la única pregunta que importa: ¿qué prueba exactamente esta pieza? Sin esa pregunta respondida, lo que construyes no tiene contra qué medirse. Y lo que no se puede medir contra un objetivo, se termina midiendo contra el gusto —el tuyo, el del cliente, el de quien pasa por ahí. El gusto es un juez inestable. Cambia con el cansancio, con la hora, con quién habló más fuerte en la reunión.",
        },
      },
      {
        heading: null,
        text: {
          en: "At my studio I built a mechanism to stop that jump. It is not a tool or a new board; it is a decision discipline that mounts on top of the workflow I already have. I am writing it down because I think the part that is actually mine can help other people who build things — and because the best way to find out whether a method holds is to expose it.",
          es: "En mi estudio armé un mecanismo para frenar ese salto. No es una herramienta ni un tablero nuevo; es una disciplina de decisión que se monta encima del flujo de trabajo que ya tengo. La escribo aquí porque creo que la parte que sí es mía puede servirle a otra gente que construye cosas —y porque la mejor manera de saber si un método aguanta es exponerlo.",
        },
      },
      {
        heading: { en: "The thesis", es: "La tesis" },
        text: {
          en: "Critique is not an event at the end of the process; it is the gate that controls every transition. That is the whole reframe, and it changes where you put your attention. Most people treat critique as a step: you build, and at the end someone reviews — so critique arrives late, after you have invested, after you have grown attached, after changing course hurts. If instead it lives in the transitions and not the states, nothing advances without passing through it, and it always arrives on time: before you overbuild.",
          es: "La crítica no es un evento al final del proceso; es la compuerta que controla cada transición. Ese es el reencuadre completo, y cambia dónde pones la atención. La mayoría trata la crítica como un paso: construyes, y al final alguien revisa — y así la crítica llega tarde, cuando ya invertiste, cuando ya te encariñaste, cuando cambiar duele. Si en cambio vive en las transiciones y no en los estados, nada avanza sin pasar por ella, y siempre llega a tiempo: antes de que inviertas de más.",
        },
      },
      {
        heading: null,
        text: {
          en: "Put the way it stuck with me: a piece is never in critique. It is in a state, waiting to cross a gate. Critique lives in the arrows, not the boxes.",
          es: "Dicho en la forma que se me quedó grabada: una pieza nunca está en crítica. Está en un estado, esperando cruzar una compuerta. La crítica vive en las flechas, no en las cajas.",
        },
      },
      {
        heading: { en: "How it works", es: "Cómo funciona" },
        text: {
          en: "A piece — a module, an endpoint, a contract, a feature, a document — moves through four states, and critique is the mechanism of the arrows between them. Each arrow carries a question, and it is answered against the stated goal, never against preference.",
          es: "Una pieza —un módulo, un endpoint, un contrato, una feature, un documento— pasa por cuatro estados, y la crítica es el mecanismo de las flechas entre ellos. Cada flecha carga una pregunta, y se responde contra el objetivo declarado, nunca contra la preferencia.",
        },
      },
      {
        heading: null,
        text: {
          en: "In divergence the idea spins and judgment is deferred — the gate asks whether we explored enough or are closing out of fatigue. In reduction to thesis the idea collapses to one sentence the piece has to prove; if it does not fit on a line it is not ready, and this is also where you declare whether it aspires to generalize. In proof of life you build the minimum that proves that one thing — the evidence of the feature, not the whole feature — and a piece that passes here and aspires to nothing more closes here, because staying scoped is a valid ending. And in graduation the solid piece generalizes, if and only if the contract you declared in the thesis survives the second case without being rewritten.",
          es: "En la divergencia la idea gira y se difiere el juicio — la compuerta pregunta si exploramos suficiente o si estamos cerrando por cansancio. En la reducción a tesis se colapsa la idea a una sola frase que la pieza tiene que probar; si no cabe en una línea no está lista, y aquí también se declara si aspira a generalizarse. En la prueba de vida se construye el mínimo que prueba esa única cosa —la evidencia de la feature, no la feature entera— y una pieza que pasa aquí y no aspira a más, cierra aquí, porque quedarse acotada es un final válido. Y en la graduación la pieza sólida se generaliza, si y solo si el contrato que declaraste en la tesis sobrevive el segundo caso sin reescribirse.",
        },
      },
      {
        heading: null,
        text: {
          en: "Under all of it sits one non-negotiable lock: nothing advances without a written goal. The verbal version — I have got it crystal clear in my head — does not count. Writing the thesis takes two minutes and is the first action, before design, before code. Without it, critique has nothing to measure against and decays into taste.",
          es: "Debajo de todo esto hay un candado que no se negocia: nada avanza sin objetivo escrito. La versión verbal —ya lo tengo clarísimo en la cabeza— no cuenta. Escribir la tesis toma dos minutos y es la primera acción, antes del diseño, antes del código. Sin ella, la crítica no tiene contra qué medir y degenera en gusto.",
        },
      },
      {
        heading: {
          en: "Where it comes from (and what is not mine)",
          es: "De dónde viene (y qué no es mío)",
        },
        text: {
          en: "I would rather say up front what I borrowed, because nearly everything above is borrowed. Separating generating from evaluating — deferring judgment during divergence — is classic [design thinking](https://designthinking.ideo.com/), from IDEO. Reducing to the inevitable, holding a strong point of view, and critiquing the built object rather than the abstract idea is the design method Apple made famous under Jony Ive. And the vocabulary I use to classify feedback is lifted straight from [Discussing Design](https://www.oreilly.com/library/view/discussing-design/9781491902394/) by Adam Connor and Aaron Irizarry.",
          es: "Prefiero decir de frente lo que tomé prestado, porque casi todo lo de arriba lo tomé prestado. La separación entre generar y evaluar —diferir el juicio en la divergencia— es [design thinking](https://designthinking.ideo.com/) clásico, de IDEO. La idea de reducir hasta lo inevitable, sostener un punto de vista fuerte y criticar el objeto ya construido en vez de la idea abstracta, es el método que Apple hizo famoso bajo Jony Ive. Y el vocabulario que uso para clasificar feedback es literal de [Discussing Design](https://www.oreilly.com/library/view/discussing-design/9781491902394/), de Adam Connor y Aaron Irizarry.",
        },
      },
      {
        heading: null,
        text: {
          en: "There are closer neighbors still. Writing the thesis before opening code is the same discipline that holds up a design doc or an RFC on any serious engineering team. And shaping a piece before committing to build it was developed far better than I could by Basecamp in [Shape Up](https://basecamp.com/shapeup). Being honest about this does not weaken me: it lets me point precisely at the two things I do think I added.",
          es: "Hay vecinos aún más cercanos. Escribir la tesis antes de abrir código es la misma disciplina que sostiene un design doc o un RFC en cualquier equipo serio de ingeniería. Y moldear una pieza antes de comprometerse a construirla lo desarrolló Basecamp mucho mejor que yo en [Shape Up](https://basecamp.com/shapeup). Ser honesto sobre esto no me debilita: me deja señalar con precisión las dos cosas que sí creo que aporté.",
        },
      },
      {
        heading: {
          en: "One: feedback gets classified before it gets executed",
          es: "Uno: el feedback se clasifica antes de ejecutarse",
        },
        text: {
          en: "Connor and Irizarry distinguish three forms of comment. Reaction is visceral: I do not like the blue. Direction starts with a solution: make it multi-format. Critique analyzes against the goal: this does not prove the thesis because X. Only critique graduates a decision.",
          es: "Connor e Irizarry distinguen tres formas de comentario. La reacción es visceral: no me gusta el azul. La dirección empieza por una solución: hazlo multi-formato. La crítica analiza contra el objetivo: esto no prueba la tesis porque X. Solo la crítica gradúa una decisión.",
        },
      },
      {
        heading: null,
        text: {
          en: "My contribution is not the taxonomy — that is theirs — it is applying it as a mandatory gate over my own work, and over the entire batch of comments, no exceptions. The failure this method exists to stop is concrete: faced with a batch — make it blue and have it generate PDFs — instinct translates the color, the provocative comment, and executes the PDF with no gate, on the excuse that it is just new scope, it does not touch the thesis. If it does not touch the thesis, it does not belong to the minimum: it goes to out-of-scope or to its own piece. Every item gets classified. The provocative one cannot smuggle the other in through the back door.",
          es: "Mi aporte no es la taxonomía —es de ellos— sino aplicarla como compuerta obligatoria sobre mi propio trabajo, y sobre el lote completo de comentarios, sin excepción. La falla que este método existe para frenar es concreta: ante un lote —ponle azul y que genere PDFs— el instinto traduce el color, el comentario provocador, y ejecuta el PDF sin compuerta, con la excusa de que es puro alcance nuevo, no toca la tesis. Si no toca la tesis, no pertenece al mínimo: va a fuera-de-alcance o a su propia pieza. Cada ítem se clasifica. El provocador no puede colar al otro por la puerta de atrás.",
        },
      },
      {
        heading: null,
        text: {
          en: "The real work is translating. Whoever asks almost always gives reaction or direction; turning that into critique-against-goal is the craft. And for feedback to land as critique instead of reflex, I declare the goal before showing the piece. I never present it cold hoping for applause. Applause is not information.",
          es: "El trabajo real es traducir. Quien pide casi siempre da reacción o dirección; convertir eso en crítica-contra-objetivo es el oficio. Y para que el feedback caiga como crítica y no como reflejo, declaro el objetivo antes de mostrar la pieza. Nunca la presento fría esperando aplauso. El aplauso no es información.",
        },
      },
      {
        heading: {
          en: "Two: graduation is declared from the thesis, and it has teeth",
          es: "Dos: la graduación se declara desde la tesis, y tiene dientes",
        },
        text: {
          en: "This is the one that cost me most and that I use most. A piece declares from its thesis whether it aspires to generalize, and the test is concrete: can you name two distinct uses consuming the same internal contract? Not two clients, not two instances of the same case — that proves nothing new — but two distinct consumers: another surface, another pipeline, another system.",
          es: "Esta es la que más me costó y la que más uso. Una pieza declara desde su tesis si aspira a generalizarse, y la prueba es concreta: ¿puedes nombrar dos usos distintos que consumen el mismo contrato interno? No dos clientes ni dos instancias del mismo caso —eso no prueba nada nuevo— sino dos consumidores distintos: otra superficie, otro pipeline, otro sistema.",
        },
      },
      {
        heading: null,
        text: {
          en: "The distinction has consequences. A genuinely generalized piece is a contract three real consumers already use without it ever being rewritten. I have one: a single brand-identity contract — colors, type, logos — read today by three unrelated surfaces, the studio's public site, an internal design tool, and a brand-deck generator. Three distinct consumers, one contract, zero rewrites. A piece that aspires well named its two uses from the start, even if the second does not exist yet. And what this method hunts to kill is the third category: disguised debt, the piece that pretends to be generic with no second use named.",
          es: "La distinción tiene consecuencias. Una pieza genuinamente generalizada es un contrato que ya usan tres consumidores reales sin haberse reescrito ni una vez. Tengo uno así: un mismo contrato de identidad de marca —colores, tipografías, logos— que hoy leen tres superficies sin relación entre sí, el sitio público del estudio, una herramienta interna de diseño y un generador de piezas de marca. Tres consumidores distintos, un contrato, cero reescrituras. Una pieza que aspira bien nombró sus dos usos desde el principio, aunque el segundo todavía no exista. Y lo que este método persigue matar es la tercera categoría: la deuda disfrazada, la pieza que finge ser genérica sin un segundo uso nombrado.",
        },
      },
      {
        heading: null,
        text: {
          en: "We will generalize it later is not a declaration. It is the retrofit that guarantees the abstraction will not hold, because you designed it against one case and asked it to serve cases you never looked at. Graduation is not added afterward. It is designed from the start, or it is not designed.",
          es: "Luego lo generalizamos no es una declaración. Es el retrofit que garantiza que la abstracción no aguante, porque la diseñaste contra un solo caso y le pediste que sirviera a casos que nunca miraste. La graduación no se añade después. Se diseña desde el principio, o no se diseña.",
        },
      },
      {
        heading: { en: "Why I saw it", es: "Por qué lo vi" },
        text: {
          en: "A strong point of view is a rare advantage. It converges fast, does not relitigate what it already knows, cuts noise. I work with one, and it has let me build in months what a committee would take years to argue through.",
          es: "Un punto de vista fuerte es una ventaja rara. Converge rápido, no discute lo que ya sabe, corta el ruido. Yo trabajo con uno y me ha servido para construir en meses lo que a un comité le tomaría años.",
        },
      },
      {
        heading: null,
        text: {
          en: "But a strong point of view has an exact shadow: the criterion you do not debate can become the criterion you do not review. Converging fast and converging well are not the same thing, and late at night, tired, wanting to never reopen a topic, they feel identical. That is where I make the decisions I later struggle to undo.",
          es: "Pero un punto de vista fuerte tiene una sombra exacta: el criterio que no se discute puede volverse el criterio que no se revisa. Convergir rápido y convergir bien no son lo mismo, y de noche, cansado, con ganas de no volver a abrir un tema, se sienten idénticos. Ahí es donde tomo las decisiones que después me cuesta deshacer.",
        },
      },
      {
        heading: null,
        text: {
          en: "I built this method, at bottom, as a counterweight to myself. Not to stall the work — that kills it — but so that something sings, clearly and exactly once, when an irreversible decision looks like it is being born of fatigue rather than judgment. The distinction is fine but decides everything: executing while tired is fine; deciding something irreversible while tired gets flagged and left for a fresh head. The counterweight's rule is flag, never block: it says the thing once, offers to do the executable part now, and lets me decide. A small studio does not get the luxury of the committee that forces you to justify yourself. The counterweight has to be built. This method is mine.",
          es: "Construí este método, en el fondo, como contrapeso a mí mismo. No para frenar el trabajo —eso lo mata— sino para que algo cante, claro y una sola vez, cuando una decisión irreversible parece estar naciendo de la fatiga y no del juicio. La distinción es fina pero decide todo: ejecutar cansado está bien; decidir algo irreversible cansado se señala y se deja para cabeza fresca. La regla del contrapeso es señalar, nunca frenar: dice la cosa una vez, ofrece hacer ya lo ejecutable, y me deja decidir. Un estudio pequeño no tiene el lujo del comité que te obliga a justificarte. El contrapeso hay que construirlo. Este método es el mío.",
        },
      },
      {
        heading: { en: "The close", es: "El cierre" },
        text: {
          en: "It is not a methodology asking you to abandon yours. It is a decision discipline that mounts on top of the PR, review, and demo flow you already run — four questions on four arrows, and one lock that says write the thesis first. Take it, adapt it, argue with it. If you try it on your own work and one of the two rules of my own saves you a refactor, it was worth writing.",
          es: "No es una metodología que pida que abandones la tuya. Es una disciplina de decisión que se monta encima del flujo de PR, revisión y demo que ya usas —cuatro preguntas en cuatro flechas, y un candado que dice: escribe la tesis primero. Tómalo, adáptalo, discútelo. Si lo pruebas sobre tu propio trabajo y una de las dos reglas propias te ahorra un refactor, ya valió la pena escribirlo.",
        },
      },
    ],
  },
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
