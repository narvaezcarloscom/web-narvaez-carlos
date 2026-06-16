# Portfolio System — Roadmap

Documento de trabajo. Define la propuesta de solución para tener un portafolio en `narvaezcarlos.com` que esté a la altura del studio.

**Owner:** Carlos Narvaez
**Estado:** En desarrollo (Sesión 1 completada — 2026-06-15)

---

## Por qué este proyecto

El portafolio actual (`/work` listado + `/work/[id]` detalle) funciona pero **no comunica la categoría** en la que NDM quiere competir. El listado se ve como cualquier portafolio de freelancer, y el detalle es un layout de blog con sidebar — no un case study editorial. Para clientes que pagan por web design boutique (Angle Stone, SWC Decor, Bloom Santé), el portafolio es la prueba más fuerte que ofrece el sitio. Tiene que verse mejor que el trabajo que vendemos.

**Referencia visual:** Pentagram, Stripe Customer Stories, Linear Customers, Vercel Customer Stories. Editorial, photography-first, narrativa clara (challenge → solution → result), no contractor-website-style.

---

## Sesión 1 — Case Study Template (completada)

Rediseño completo del template `/work/[id]` con 9 bloques editoriales. **Angle Stone** como caso de prueba.

### Archivos modificados

- `src/app/[lang]/work/[id]/page.tsx` — reescrito (template nuevo)
- `src/lib/projects.ts` — type `Project` exportado + campos opcionales `editorialHeadline`, `pullQuote`, `solutionPoints`
- `src/lib/dictionaries/en.ts` — labels nuevos: `client`, `scrollHint`, `ctaHeading`, `ctaButton`, `keyDecisions`
- `src/lib/dictionaries/es.ts` — mismos labels en ES neutral LATAM

### Bloques del template (orden)

1. **Hero 100vh** — `next/Image` full-bleed + overlay `rgba(0,0,0,0.45)` + título centrado en serif XL + scroll indicator
2. **Metadata bar** sticky `top-20 z-10` — CLIENT / CATEGORY / SERVICES / YEAR + LIVE SITE
3. **Intro editorial** grid 35/65 — label OVERVIEW + dash rojo + `editorialHeadline` (col izq) / overview (col der)
4. **The Challenge** `bg-neutral-light/40` — texto + `pullQuote` con borde izquierdo rojo
5. **Full-bleed image** `h-[60vh]` — imagen sin overlay (actualmente reusa `project.image`)
6. **The Solution** grid 35/65 — solution + lista numerada de `solutionPoints`
7. **Results** `bg-charcoal` 2×2 — números 01–04 en `font-serif` rojo grande + texto
8. **CTA strip** `bg-narvaez-red` — heading + botón outline a `/contact`
9. **Next project** — flecha rojo que se separa en hover

### Validaciones

- `tsc --noEmit` limpio
- `npm run build` → 14 rutas `/work/[id]` prerenderizadas
- SSR test (curl contra producción de build): contenido editorial completo presente sin JS, EN y ES
- Tracking events agregados: `external_click` (live site), `cta_click` (contact)

### Decisiones tomadas

- **Optional fields, graceful degradation.** `editorialHeadline`, `pullQuote`, `solutionPoints` son opcionales. Si faltan, el template oculta el bloque correspondiente sin romper. Esto permite migrar caso por caso sin bloquear builds.
- **Sticky metadata bar** anclado a `top-20` (justo debajo de la navbar `h-20`). Si se siente ruidoso visualmente cuando ambos están visibles, revisar en sesión 2.
- **Imagen única reutilizada.** Hero y bloque 5 usan `project.image`. Pragmático mientras no llegan los assets nuevos. Para asset separado, agregar `mockup?: string` al type `Project`.

---

## Sesión 2 — Siguientes pasos

### Bloque A — Migrar el resto de proyectos al template nuevo

El template funciona para los 7 proyectos pero solo Angle Stone tiene `editorialHeadline`, `pullQuote`, `solutionPoints`. Los otros 6 (SIRCON, Bloom Santé, SWC Decor, Luxury Appliance Repair, Myan Realty, Yhon Peña) se renderizan con bloques parciales (challenge sin pull-quote, solution sin bullets, intro sin headline editorial).

**Acción:** redactar para cada proyecto:
- `editorialHeadline` — frase corta, autoral, que resume la decisión central del proyecto
- `pullQuote` — frase del challenge que merece destacarse (puede extraerse del texto existente)
- `solutionPoints[]` — 3–4 decisiones concretas extraídas del solution

Esto es trabajo de copywriting + curación. Puede hacerse con `/copywriter` agent en bloque.

### Bloque B — Listado `/work` editorial

El listado actual (`/work/page.tsx`) probablemente sigue un patrón de grid simple. Para que el primer punto de contacto con el portafolio comunique boutique, hace falta revisitar:
- Hero del listado (heading + descripción)
- Layout de las tarjetas (asimétrico tipo Pentagram vs grid uniforme)
- Filtros opcionales (por categoría, por año)
- Cómo se ve en mobile

**Pendiente:** auditar estado actual antes de proponer rediseño.

### Bloque C — Assets reales

Para que el template brille, hace falta fotografía a la altura. Por proyecto:
- **`hero.jpg`** (1920×1080+): foto de ambiente/mood del trabajo (no screenshot de UI). Para Angle Stone: foto del trabajo de hardscape en una propiedad real. Para Bloom Santé: still life de producto con luz natural. Etc.
- **`mockup-desktop.jpg`** (1200×800): screenshot real del sitio entregado, idealmente en un frame de browser.
- **`mockup-mobile.jpg`** opcional (800×1200): si queremos mostrar versión móvil.

**Pendiente:**
- ¿Tenemos derechos de uso sobre fotografías de los proyectos entregados?
- ¿Vale la pena contratar a un fotógrafo para hacer una sesión de los 7 trabajos?
- Alternativa intermedia: usar Puppeteer/Playwright para auto-screenshots de los sitios live (resuelve mockup-desktop pero no hero).

### Bloque D — JSON-LD por case study

Cada case study debería tener `CreativeWork` o `Project` schema markup propio (no solo metadata genérica). Esto refuerza la cosecha de citas por IA (Perplexity, ChatGPT) cuando alguien busca "agencias que han hecho sitios para empresas de stone hardscapes en Seattle" o similar.

**Referencia:** patrón JSON-LD documentado en `CLAUDE.md` — usar `@graph` con referencia por `@id` a la `Organization` global. No redefinir la organización en cada page.

### Bloque E — RelatedReviews en case studies

El componente `RelatedReviews` ya existe y se usa en `/services/[id]`. Tiene sentido agregarlo a `/work/[id]` antes del bloque "Next project": muestra reseñas reales de proyectos similares por categoría. Refuerza confianza en el momento de máxima fricción (justo después de leer el caso, antes de hacer click a contact).

**Decisión pendiente:** ¿filtrar por `serviceId` derivado de `project.category`, o agregar campo `relatedServices: ServiceId[]` al type `Project`?

### Bloque F — Microinteracciones

El template actual es estático (sin GSAP). Agregar animaciones discretas usando los componentes existentes (`FadeUp`, `TextReveal`, `LineReveal`):
- Fade-up en el bloque overview cuando entra al viewport
- TextReveal en `editorialHeadline`
- LineReveal en los borders de los results
- ParallaxImage suave en el bloque 5

**Regla del CLAUDE.md:** SSR-first. Animaciones solo decoran contenido ya presente. No usar JS para escribir el `editorialHeadline` desde cero.

---

## Decisiones abiertas (siguiente sesión)

1. **Orden de prioridad** — ¿migrar los 6 proyectos restantes al template nuevo (sesión copywriting) o trabajar primero el listado `/work`?
2. **Assets** — definir estrategia de imágenes antes de invertir en copywriting que dependa del visual.
3. **Sticky metadata bar** — confirmar si se mantiene o si introduce ruido visual con la navbar. Verlo en mobile.
4. **Variantes del template** — ¿necesitamos templates distintos para *Web Design* vs *Custom Apps & Platforms*? Bloom Santé y Yhon Peña no encajan bien con bloques de "Live site" (proyectos de branding o portafolio) — quizás un tipo `project.kind` que ajuste qué bloques se renderizan.

---

## Cómo retomar en próxima sesión

1. Leer este documento.
2. `git log --oneline` para ver el commit del avance Sesión 1.
3. `npm run dev` y abrir `/en/work/angle-stone` — referencia visual de lo que está listo.
4. Decidir qué bloque (A/B/C/D/E/F) atacar en función de prioridad acordada con Carlos.
5. Si el bloque es A (migración de proyectos): invocar `/copywriter` con el contenido actual de `projects.ts` y pedirle redactar `editorialHeadline` + `pullQuote` + `solutionPoints` para los 6 proyectos pendientes en EN. Carlos revisa, traduce/aprueba ES.

---

## Inspiración de referencia

- pentagram.com/work — listado editorial, fotografía protagonista, sin filtros visibles
- stripe.com/customers — case studies como ensayos cortos, datos verificables
- linear.app/customers — narrativa de problema → solución, citas reales
- vercel.com/customers — métricas duras + storytelling

El estándar es ese. No competir con contractor sites — competir con boutique studios.
