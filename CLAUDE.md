# Narvaez Digital Marketing — Sitio Web

Sitio web del estudio digital boutique Narvaez Digital Marketing. Estilo editorial, posicionamiento internacional.

## Tech Stack

- **Framework**: Next.js 15.5.2 (App Router)
- **Frontend**: React 19.1.0, TypeScript 5
- **Styling**: Tailwind CSS 4 + PostCSS + autoprefixer
- **Fonts**: Instrument Serif (headings) + Mulish (body) via Google Fonts
- **Animations**: GSAP + ScrollTrigger
- **Linting**: ESLint 9
- **Deploy**: Vercel (dominio: narvaezcarlos.com)

## Comandos

```bash
npm run dev      # Desarrollo → http://localhost:3000
npm run build    # Build produccion
npm start        # Servidor produccion
npm run lint     # ESLint
```

## Estructura

```
src/
  app/
    layout.tsx                    # Root layout (global CSS)
    sitemap.ts                    # Sitemap XML dinamico (incluye paginas legales)
    robots.ts                     # robots.txt
    api/contact/route.ts          # API contacto (sanitizado, consent logging)
    [lang]/
      layout.tsx                  # Layout con Navbar + Footer + JSON-LD + GTM + CookieBanner + Vercel Analytics/Speed Insights
      opengraph-image.tsx         # OG image 1200x630 generado programaticamente (ImageResponse)
      page.tsx                    # Home (Hero, Services, Work, About preview)
      about/page.tsx              # About — manifiesto del estudio
      privacy/page.tsx            # Politica de Privacidad (bilingue, GDPR/CCPA/LFPDPPP)
      terms/page.tsx              # Terminos de Servicio (bilingue)
      trust/page.tsx              # Pagina canonica de evidencia: AggregateRating + Review[] + GMB attribution
      services/
        page.tsx                  # Lista de servicios
        [id]/page.tsx             # Detalle de servicio (incluye RelatedReviews antes de Next service)
      work/
        page.tsx                  # Portafolio
        [id]/page.tsx             # Detalle de proyecto
      journal/
        page.tsx                  # Articulos
        [id]/page.tsx             # Detalle de articulo
      contact/page.tsx            # Formulario de contacto
  components/
    Navbar.tsx                    # Navegacion principal
    Hero.tsx                      # Hero del home (GSAP timeline)
    Footer.tsx                    # Footer con slogan + CTA + links legales + Cookie Settings
    Container.tsx                 # Wrapper de ancho maximo
    DiagonalSlash.tsx             # Signature Diagonal 24° (estatico, escalable)
    AnimatedDiagonal.tsx          # Signature Diagonal 24° (animado, ScrollTrigger)
    AboutPreview.tsx              # Seccion About en home
    ServicesSection.tsx           # Seccion servicios en home
    WorkPreview.tsx               # Seccion portafolio en home
    ContactForm.tsx               # Formulario de contacto (client, con consent checkbox + track)
    CookieBanner.tsx              # Cookie consent banner + CookieSettingsButton
    Breadcrumbs.tsx               # BreadcrumbList JSON-LD (i18n-aware) para paginas internas
    AnalyticsEvents.tsx           # Event delegation client — data-track-event/data-track-prop-*
    ThemeToggle.tsx               # Toggle claro/oscuro (default: claro)
    CountUp.tsx                   # Animacion de numeros
    GridTexture.tsx               # Textura de fondo sutil
    ProcessDots.tsx               # Pasos del proceso
    TrustSignal.tsx               # Badge inline (5.0★ · 23 verified · See all reviews →) — SSR async
    TrustHomeSection.tsx          # Bloque editorial de Home (label, heading, body, 4 metricas, CTA) — SSR async
    RelatedReviews.tsx            # Crossover por servicio: hasta 2 reseñas + link a /trust. Returns null si no hay match
  lib/
    services.ts                   # Datos de servicios
    projects.ts                   # Datos del portafolio
    journal.ts                    # Datos de articulos
    reviews.ts                    # Fuente de verdad: GMB profile + 6 reseñas curadas + temas + getReviewsByService()
    i18n.ts                       # Sistema de internacionalizacion
    seo.ts                        # buildAlternates(path, lang) — canonical + hreflang por pagina
    dictionaries/
      en.ts                       # Diccionario ingles
      es.ts                       # Diccionario español
  middleware.ts                   # Reescritura de rutas por idioma
```

## Arquitectura

- App Router con file-based routing
- Bilingue EN/ES via `[lang]` dynamic segment + middleware
- Server Components por defecto, `"use client"` solo donde es necesario
- Rutas dinamicas `[id]` con `generateStaticParams()` y `generateMetadata()`
- Datos en memoria (sin DB/API) — `services.ts`, `projects.ts`, `journal.ts`
- Path alias: `@/*` → `./src/*`
- Dark mode por clase CSS (`@custom-variant dark` en Tailwind v4), default: claro

## Identidad Visual

- **Paleta**: ivory (#F8F9F5), charcoal (#212121), narvaez-red (#F43B3E)
- **Tipografia**: Instrument Serif (headings, editorial) + Mulish (body, sans)
- **Tono**: editorial, boutique, internacional, autoridad tranquila
- **Slogan**: "designing with intention / from brand to platform"

### Regla tipografica: testimonios y reseñas

Para listas de testimonios/reseñas con citas largas (multiples bloques en una pagina):
- **Cuerpo de la cita** → Mulish (sans). Mas legible en lecturas largas.
- **Nombre del autor** → Instrument Serif display (byline editorial). Refuerza credibilidad del autor.

NO usar Instrument Serif italic en el cuerpo de citas largas. Ese patron (pull quote canonico) solo aplica a UNA cita corta destacada en medio de un articulo, no a una lista de testimonios. Patron alineado con Stripe, Linear y Vercel customer stories.

## Signature Diagonal (24°)

Elemento de identidad visual derivado del logo. Angulo fijo de 24°.

- `DiagonalSlash.tsx`: version estatica, 4 escalas (sm, md, lg, hero)
- `AnimatedDiagonal.tsx`: version animada con stroke reveal (ScrollTrigger)
- Uso en heros: siempre animado (se dibuja como trazo de plumin)
- Uso en secciones/footer: estatico
- Regla: si no responde a 24°, no pertenece al sistema

## SEO / GEO / AEO

- JSON-LD global: ProfessionalService + MarketingAgency (founder, servicios, areas, rating, sameAs incluye GMB)
- JSON-LD en About: AboutPage + Person con sameAs
- JSON-LD BreadcrumbList en todas las paginas internas (services, work, journal, about, contact, privacy, terms, trust)
- JSON-LD en /trust: WebPage > Organization con AggregateRating (5.0/23) + Review[] con publisher:Google + itemReviewed:#organization (cruce IA verificable)
- Metadata bilingue via `generateMetadata()` en todas las paginas con `alternates.canonical` + per-page hreflang via `buildAlternates(path, lang)`
- OG image 1200x630 generado programaticamente con `next/og` (paleta brand + slogan bilingue)
- Twitter card `summary_large_image`
- Sitemap XML dinamico con todas las rutas EN/ES (incluye /privacy, /terms, /trust)
- robots.ts con Disallow para /api/, /_next/, /admin
- Google Search Console configurado
- GTM: GTM-TXK42CNN con Google Consent Mode v2

## Medicion

- **Vercel Analytics** + **Speed Insights** instalados en `[lang]/layout.tsx` (sin cookies, sin consent requerido)
- **Microsoft Clarity** via GTM (consent required, session replay + heatmaps)
- **Event tracking** por delegacion en `AnalyticsEvents.tsx` — atributos `data-track-event` + `data-track-prop-*` en CTAs
- Eventos instrumentados: `cta_click` (footer hero, home_trust_section, trust_footer, about_credibility, service_<id>), `social_click` (Instagram/YouTube/GitHub/LinkedIn), `external_click` (Studio OS, google_business_profile en trust_attribution/trust_review), `lang_toggle` (EN↔ES), `contact_submit`/`contact_submit_error`

## Privacidad y Compliance

- **Privacy Policy** (`/privacy`): bilingue EN/ES, cubre GDPR, CCPA/CPRA, LFPDPPP (Mexico)
- **Terms of Service** (`/terms`): bilingue EN/ES, ley aplicable WA State
- **Cookie Banner** (`CookieBanner.tsx`): accept/decline, guarda en localStorage con timestamp
- **GTM Consent Mode v2**: default denied, se activa solo con consentimiento del usuario
- **Contact Form**: checkbox de consentimiento obligatorio, validacion server-side
- **API `/api/contact`**: sanitizacion HTML de inputs, logging de consent (timestamp + IP)
- **Security Headers**: X-Frame-Options, X-Content-Type-Options, Referrer-Policy, HSTS, Permissions-Policy, X-DNS-Prefetch-Control
- **Footer**: links a Privacy Policy, Terms of Service, y Cookie Settings
- **Jurisdicciones cubiertas**: WA State, CCPA (California), GDPR (EU/España), LFPDPPP (Mexico)
- **Procesadores declarados**: Vercel (hosting + Analytics + Speed Insights), Google (Analytics 4 + GTM), Microsoft (Clarity), Meta (Pixel — Facebook/Instagram Ads), Hostinger SMTP

## Trust & Reviews System

Sistema de evidencia verificable disenado para que tanto humanos como crawlers IA (ChatGPT, Perplexity, AI Overviews, Claude) puedan cruzar las afirmaciones del sitio contra una fuente externa de confianza (Google Business Profile).

### Fuente de verdad: `src/lib/reviews.ts`

Un solo archivo controla todo. Cuando lleguen mas reseñas verificadas a GMB:
1. Actualizar `gmbProfile.reviewCount` y `gmbProfile.ratingValue` si cambia el agregado.
2. Agregar nueva reseña al array `reviews` con `relatedServices: ServiceId[]` (orden = prioridad).
3. Si una reseña aplica a un servicio nuevo, agregarlo al `ServiceId` type union.
4. `reviewThemes` se actualiza desde los filtros visibles en el perfil de GMB.

Texto de reseñas se preserva en idioma original y sin editar (incluso typos como "haves"/"Managment" en la review de Eduardo). La autenticidad es el activo — pulir el texto rompe la señal de "reseña real no editada" que las IA usan para validar.

### Pagina canonica `/trust` (`/[lang]/trust/page.tsx`)

URL unica de evidencia. Estructura editorial sobria (estilo NYT/Stripe):
1. Hero corto: "Trust, verified." / "Confianza, verificada."
2. 4 metricas SSR: 5.0★ / 23 reviews / 45+ sites / 2022
3. Atribucion prominente + link "View all 23 reviews on Google"
4. Tags de temas mas mencionados (Creative 7, Work 7, Web 4, etc)
5. Lista semantica de reseñas (`<figure>` + `<blockquote cite>`)
6. CTA al final

JSON-LD: `WebPage > Organization` con `AggregateRating` + `Review[]` + `publisher: Google` + `itemReviewed: #organization`.

### Cross-source AI verification

El cruce IA ↔ Google se hace por `sameAs`:
- JSON-LD global en `[lang]/layout.tsx` incluye `https://maps.google.com/?cid=11170561863089871042` en `sameAs`
- Las IA siguen ese link, validan el perfil real, y pueden citar "Narvaez Digital Marketing tiene 5.0 ★ verificadas en Google" con la fuente cruzada
- Mantener el CID actualizado si Google reasigna el perfil (improbable pero posible)

### Crossovers (reseñas viven donde viven los claims)

- **Home** (`[lang]/page.tsx`): `<TrustHomeSection lang={lang} />` entre `WorkPreview` y `AboutPreview`. Bloque editorial completo.
- **About** (`[lang]/about/page.tsx`): `<TrustSignal lang={lang} location="about_credibility" />` dentro de la seccion "Credibility" existente.
- **Services [id]** (`[lang]/services/[id]/page.tsx`): `<RelatedReviews lang serviceId={id as ServiceId} location={...} />` antes de "Next service".
  - Filtra automaticamente por `relatedServices`
  - **Returns `null` cuando no hay reseñas que matcheen** — preferir silencio honesto sobre match forzado
  - `custom-apps-platforms` actualmente sin reseñas → bloque no se renderiza
- **Footer**: link "Trust" / "Confianza" junto a Privacy / Terms / Cookies

### Decisiones rechazadas (no volver sobre ellas)

- **Widgets de terceros** (Elfsight, Trustmary, EmbedSocial): rompen SSR-first, agregan cookies de publicidad incompatibles con el Privacy Policy actual, lentos en CWV, $5-15/mes. NO.
- **Google Places API en runtime**: cap de 5 reseñas, requiere atribucion forzada con foto, dependencia de API key + cuota. NO compensa el control editorial perdido.
- **Carrusel animado/rotativo**: rompe SSR-first, contenido inicial oculto, menos scanneable, no encaja con brand editorial. NO.

## Contenido vs. animacion (SSR-first)

Regla: todo dato que comunique confianza o sea indexable (cifras, texto, structured data) debe existir en el HTML renderizado en servidor. Las animaciones solo decoran contenido ya presente.

- OK: animar `opacity`/`transform` sobre contenido SSR (`FadeUp`, `TextReveal`, `LineReveal`, `ParallaxImage`).
- NO: reescribir `textContent` desde JS para crear el valor final. Si la animacion necesita partir de 0, el SSR renderiza el valor real y `useGSAP` lo resetea a 0 antes del paint, luego anima de vuelta. Ver `components/animations/CountUp.tsx`.
- Validacion: `curl https://narvaezcarlos.com/<ruta>` debe mostrar las cifras y texto reales sin ejecutar JS. Aplicar antes de cada release que toque componentes animados.

## Servicios

1. Web Design & Development (incluye SEO-ready structure)
2. Custom Apps & Platforms
3. Digital Advertising
4. Content & Social Media

## Portafolio

SIRCON, Bloom Sante, SWC Decor, Luxury Appliance Repair, Myan Realty, Yhon Pena

## Notas

- Next.js 15 usa async params: `params as Promise<T>` en paginas dinamicas
- Middleware excluye sitemap.xml y robots.txt de la reescritura de idioma
- Theme default es claro (no sigue preferencia del SO)
- Animaciones GSAP: Hero usa timeline propio, subpaginas usan AnimatedDiagonal con ScrollTrigger
- Fundado en 2022, Seattle, Washington
