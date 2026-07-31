import type { MetadataRoute } from "next";

/**
 * Politica explicita de crawlers.
 *
 * Antes este archivo tenia una sola regla `User-agent: *`, lo que dejaba
 * entrar a todos los bots de IA por omision y no por decision. La postura
 * de abajo es deliberada y se apoya en un solo criterio:
 *
 *   El corpus existe para que alguien --humano o maquina-- pueda reconstruir
 *   quien es Carlos con EVIDENCIA ATRIBUIBLE.
 *
 * Los bots que buscan e indexan citan la fuente y devuelven al lector: eso es
 * el corpus funcionando, y se les abre la puerta. Los bots que recolectan para
 * entrenar absorben el texto sin atribucion: no sirven al objetivo declarado y
 * si contradicen la politica de propiedad del estudio, asi que se cierran.
 *
 * Verificado contra la documentacion de cada proveedor el 2026-07-30.
 * Revisar cada trimestre: los nombres y los oficios de estos bots cambian.
 */

/** Rutas cerradas a todo el mundo: internas, privadas o sin valor de indexado. */
const PRIVATE_PATHS = [
  "/api/",
  "/_next/",
  "/admin",
  "/emprendedor",
  "/emprendedor/gracias",
];

/**
 * Bots que citan y enlazan de vuelta. Entran igual que un buscador.
 *
 * - OAI-SearchBot ....... busqueda de ChatGPT
 * - Claude-SearchBot .... busqueda de Claude
 * - PerplexityBot ....... indexado de Perplexity (su doc declara que NO
 *                         alimenta modelos base)
 * - *-User .............. fetch disparado por una persona que pregunto algo.
 *                         Sus proveedores advierten que robots.txt puede no
 *                         aplicarles por ser accion del usuario; se listan
 *                         igual porque esto declara una postura, no impone un
 *                         bloqueo.
 */
const CITING_AI_BOTS = [
  "OAI-SearchBot",
  "ChatGPT-User",
  "Claude-SearchBot",
  "Claude-User",
  "PerplexityBot",
  "Perplexity-User",
];

/**
 * Bots que recolectan para entrenar modelos base. Cerrados.
 *
 * - GPTBot .............. entrenamiento de OpenAI (distinto de OAI-SearchBot,
 *                         que si entra)
 * - ClaudeBot ........... entrenamiento de Anthropic (distinto de
 *                         Claude-SearchBot, que si entra)
 * - CCBot ............... Common Crawl; alimenta el entrenamiento de casi
 *                         todos los modelos grandes
 * - Google-Extended ..... no es un crawler sino un token de control. Segun la
 *                         documentacion de Google, bloquearlo NO afecta la
 *                         inclusion en Google Search ni el ranking; solo
 *                         excluye el contenido del entrenamiento de Gemini.
 */
const TRAINING_BOTS = ["GPTBot", "ClaudeBot", "CCBot", "Google-Extended"];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Buscadores tradicionales y cualquier bot sin regla propia.
      {
        userAgent: "*",
        allow: "/",
        disallow: PRIVATE_PATHS,
      },
      // Bots de IA que citan: mismo trato que un buscador.
      {
        userAgent: CITING_AI_BOTS,
        allow: "/",
        disallow: PRIVATE_PATHS,
      },
      // Bots de IA que entrenan: cerrados.
      {
        userAgent: TRAINING_BOTS,
        disallow: "/",
      },
    ],
    sitemap: "https://narvaezcarlos.com/sitemap.xml",
    host: "https://narvaezcarlos.com",
  };
}
