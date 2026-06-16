# Narvaez Digital Marketing — Sitio Web

Sitio web del estudio digital boutique Narvaez Digital Marketing. Estilo editorial, posicionamiento internacional.

## Tech Stack

- **Framework**: Next.js 16.2.2 (App Router)
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
    api/lead-emprendedor/route.ts # API del Programa Emprendedor (form noindex) — sanitiza, honeypot, rate limit, SMTP a mkt@, forward al OS lead-intake webhook
    emprendedor/
      layout.tsx                  # Shell self-contained (fonts, GTM, Consent Mode, Navbar minimalChrome, Footer minimal) — noindex
      page.tsx                    # Landing Spanish-only del Programa Emprendedor Latino (fuera de [lang] para que el QR impreso tenga URL pelada)
      opengraph-image.tsx         # OG dedicado para share en WhatsApp/IG DMs
      gracias/page.tsx            # Thank-you con boton directo a WhatsApp pre-llenado
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
    Navbar.tsx                    # Navegacion principal — prop opcional hideLanguageToggle + minimalChrome (este ultimo deja solo isotipo + ThemeToggle, para campaign landings)
    Hero.tsx                      # Hero del home (GSAP timeline)
    Footer.tsx                    # Footer con slogan + CTA + links legales + Cookie Settings — prop opcional minimal (solo bottom row legal, para campaign landings)
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
    emprendedor/                  # Componentes exclusivos del Programa Emprendedor (ver seccion "Dedicated Campaign Landings")
      EmprendedorHero.tsx
      EmprendedorIncludes.tsx
      EmprendedorProcess.tsx      # Envuelve ProcessDots con los 4 pasos del programa
      EmprendedorCTA.tsx          # Cierre editorial + form inline (no link a /contact)
      EmprendedorForm.tsx         # Client: 5 campos + honeypot invisible + redirect a /gracias con name query param
      UtmAttribution.tsx          # Client: heuristica QR vs digital, persiste en sessionStorage, push a dataLayer
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

### Regla critica de JSON-LD: una entidad, un solo lugar

Cuando varios archivos necesitan referenciar la misma entidad (ej. la Organization aparece en el layout global y queremos asociarle reviews en /trust):

- **NO redefinir la entidad en dos bloques JSON-LD distintos** aunque les des el mismo `@id`. JSON-LD's `@id` es un identificador de grafo, **no una directiva de merge/dedup**. Google y otros parsers **concatenan** los campos en lugar de unificarlos: `sameAs` x2, `aggregateRating` x2, `url` x2, `@type` concatenados. Doble `aggregateRating` dispara el error critico "La reseña tiene varias puntuaciones agregadas" en cualquier Review snippet que apunte a la entidad.
- **Patron correcto**: la entidad se define **exactamente una vez** (en el layout global, con todos sus campos: name, url, sameAs, aggregateRating, address, etc). Las paginas que la mencionan usan `@graph` con entidades top-level que **solo referencian por `@id`**:

  ```ts
  // /trust/page.tsx — pagina que agrega reviews sobre la Organization
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": pageUrl,
        mainEntity: { "@id": `${BASE_URL}/#organization` }, // solo referencia
        about: { "@id": `${BASE_URL}/#organization` },
      },
      ...reviews.map((r) => ({
        "@type": "Review",
        "@id": `${pageUrl}#review-${r.id}`,
        // ... campos del review
        itemReviewed: { "@id": `${BASE_URL}/#organization` }, // solo referencia
      })),
    ],
  };
  ```

- **Validacion**: despues de cualquier cambio que toque schema.org, correr [Google Rich Results Test](https://search.google.com/test/rich-results) contra la URL de produccion. Indicadores de problema: "X elementos no validos", "campo duplicado", "varias puntuaciones agregadas", o multiples "entidades detectadas" para lo que deberia ser una sola entidad. Si aparecen, la causa casi siempre es duplicacion entre bloques JSON-LD — consolidar al patron `@graph` con referencias por `@id`.
- **Historico**: este patron se descubrio en PRs #4 (regresion por intentar consolidar con `@id`) y #5 (fix definitivo con `@graph`). Aplicable a cualquier proyecto futuro que mezcle JSON-LD global + JSON-LD por pagina sobre la misma entidad.

## Contenido vs. animacion (SSR-first)

Regla: todo dato que comunique confianza o sea indexable (cifras, texto, structured data) debe existir en el HTML renderizado en servidor. Las animaciones solo decoran contenido ya presente.

- OK: animar `opacity`/`transform` sobre contenido SSR (`FadeUp`, `TextReveal`, `LineReveal`, `ParallaxImage`).
- NO: reescribir `textContent` desde JS para crear el valor final. Si la animacion necesita partir de 0, el SSR renderiza el valor real y `useGSAP` lo resetea a 0 antes del paint, luego anima de vuelta. Ver `components/animations/CountUp.tsx`.
- Validacion: `curl https://narvaezcarlos.com/<ruta>` debe mostrar las cifras y texto reales sin ejecutar JS. Aplicar antes de cada release que toque componentes animados.

## Dedicated Campaign Landings

Paginas noindex de captacion dirigida (QR impreso, canal cerrado, audiencia especifica). La primera y referencia canonica es `/emprendedor` — Programa Emprendedor Latino, destino del QR del brochure entregado en El Centro de la Raza (Seattle).

### Regla de oro: funnel cerrado

Una campaign landing es **una sola pieza, un solo CTA**. El form inline ES el CTA. NO competing CTAs (`/contact` u otros), NO escape routes (nav links, Studio OS, link a `/work`, etc). Patron Stripe / Linear / Vercel.

Implementacion sin duplicar componentes:
- `Navbar` acepta `minimalChrome={true}` → esconde nav links + Studio OS + lang toggle + hamburger mobile. Solo deja isotipo + ThemeToggle.
- `Footer` acepta `minimal={true}` → esconde el H2 grande + columnas brand/nav/social. Solo deja copyright + Privacy + Terms + Cookie Settings.
- Ambos props son opcionales con default `false`. El resto del sitio (paginas evergreen) no se ve afectado.

### Ubicacion en el routing

Las dedicated landings viven **fuera de `[lang]`** (`app/emprendedor/...`, no `app/[lang]/emprendedor/...`). Razon: el QR impreso apunta a la URL pelada `narvaezcarlos.com/emprendedor` sin prefijo de idioma. Para no romper esa ruta:

- `middleware.ts` excluye `/emprendedor` en el negative lookahead del matcher
- `robots.ts` añade `Disallow: /emprendedor` y `/emprendedor/gracias`
- `sitemap.ts` NO incluye estas rutas (acceso solo por link directo / QR)
- `app/emprendedor/layout.tsx` es self-contained: carga fonts via next/font, theme persistence script, Consent Mode v2, GTM, CookieBanner, Vercel Analytics + Speed Insights. No hereda del `[lang]/layout.tsx` porque no es hijo de ese arbol.

### Copy del landing

Espejo de la pieza impresa (brochure PDF). Voz editorial sin compromisos de tiempo que puedan fallar (NO "te respondemos hoy mismo en horas habiles" — si llega un viernes a las 5pm la promesa se rompe). En su lugar: "Te leemos personalmente y te contactamos para agendar la primera conversacion". La urgencia queda cubierta por el boton WhatsApp en `/gracias` con mensaje pre-llenado.

### Atribucion UTM (heuristica QR vs digital)

`components/emprendedor/UtmAttribution.tsx` corre en mount y aplica esta logica:

- Si la URL trae UTMs → respeta y registra
- Si NO trae UTMs (visita pelada) → asume QR impreso y aplica `utm_source=brochure`, `utm_medium=qr`, `utm_campaign=elcentro`
- Persiste el resultado en `sessionStorage` con clave `emprendedor_attribution`
- Push a `window.dataLayer` con evento `landing_emprendedor_view`

Esto es **heuristica de canal**, no atribucion exacta por lead — alguien podria tipear la URL a mano y caer en el bucket "brochure". Documentado en el codigo. Los UTMs viajan como hidden fields al endpoint en el submit, llegan al email (footer tecnico) y al OS pipeline (en las notas del lead).

### Integracion con NDM Studio OS

`/api/lead-emprendedor` hace dos cosas en orden:

1. **Email a `mkt@narvaezcarlos.com`** via nodemailer (smtp.hostinger.com:465). Si falla → 500 al usuario. Es la red de seguridad por defecto.
2. **Forward al OS webhook** `https://app.narvaezcarlos.com/api/webhooks/lead-intake` con bearer token (`LEAD_INTAKE_SECRET` env var compartida con el OS). Es best-effort en try/catch — si falla, log y sigue. El email fue la red de seguridad.

El OS inserta el lead con `campaign='emprendedor-latino'` en la tabla `leads` (columna agregada en migracion 00038). El pipeline lo renderiza con pill roja "Emprendedor latino" para que el equipo lo identifique de un vistazo. Cualquier campaña futura usa el mismo webhook con un slug distinto — no hay que tocar enums, schema, ni endpoints.

**Tech debt conocido (resiliencia):** hoy el orden email-primero significa que si Hostinger SMTP cae, el form devuelve 500 y el lead se pierde aunque el OS este sano. Tarea pendiente: invertir el orden (forward al OS primero, email best-effort) para que el lead siempre llegue al pipeline mientras al menos uno de los dos canales funcione.

### Env vars requeridas en Vercel (proyecto web-narvaez-carlos)

- `SMTP_USER` = `hello@narvaezcarlos.com` · `SMTP_PASS` (rotables — ver memoria `reference_hostinger_smtp.md`)
- `LEAD_INTAKE_SECRET` (mismo valor que el OS)
- `OS_LEAD_INTAKE_URL` = `https://app.narvaezcarlos.com/api/webhooks/lead-intake`

### Para clonar el patron en una landing futura

1. Decidir el slug de campaña (ej. `feria-utah-2026`) y el slug de URL (ej. `/feria-utah`)
2. Crear `app/<slug>/{layout.tsx, page.tsx, opengraph-image.tsx, gracias/page.tsx}` copiando `/emprendedor` como template
3. Crear `components/<slug>/` con los 5-6 componentes (Hero, Includes, Process, CTA, Form, UtmAttribution si la heuristica de canal es distinta)
4. Excluir la ruta en `middleware.ts` matcher y agregarla al `Disallow` en `robots.ts`
5. En el OS, agregar el slug al map `CAMPAIGN_LABELS` en `src/app/[locale]/(admin)/pipeline/pipeline-client.tsx` para que la pill muestre el label legible
6. El form POSTea al mismo endpoint `/api/lead-emprendedor` o (mejor) creas uno paralelo `/api/lead-<slug>` que envia con `campaign='<slug>'`

## Servicios

1. Web Design & Development (incluye SEO-ready structure)
2. Custom Apps & Platforms
3. Digital Advertising
4. Content & Social Media

## Portafolio

SIRCON, Bloom Sante, SWC Decor, Luxury Appliance Repair, Myan Realty, Yhon Pena

## Notas

- Next.js 16 sigue requiriendo async params: `params as Promise<T>` y `searchParams as Promise<T>` en paginas dinamicas
- Middleware excluye sitemap.xml, robots.txt y `/emprendedor*` (dedicated campaign landings) de la reescritura de idioma
- Theme default es claro (no sigue preferencia del SO)
- Animaciones GSAP: Hero usa timeline propio, subpaginas usan AnimatedDiagonal con ScrollTrigger
- Fundado en 2022, Seattle, Washington
