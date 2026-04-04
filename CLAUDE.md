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
    sitemap.ts                    # Sitemap XML dinamico
    robots.ts                     # robots.txt
    [lang]/
      layout.tsx                  # Layout con Navbar + Footer + JSON-LD + GTM
      page.tsx                    # Home (Hero, Services, Work, About preview)
      about/page.tsx              # About — manifiesto del estudio
      services/
        page.tsx                  # Lista de servicios
        [id]/page.tsx             # Detalle de servicio
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
    Footer.tsx                    # Footer con slogan + CTA
    Container.tsx                 # Wrapper de ancho maximo
    DiagonalSlash.tsx             # Signature Diagonal 24° (estatico, escalable)
    AnimatedDiagonal.tsx          # Signature Diagonal 24° (animado, ScrollTrigger)
    AboutPreview.tsx              # Seccion About en home
    ServicesSection.tsx           # Seccion servicios en home
    WorkPreview.tsx               # Seccion portafolio en home
    ContactForm.tsx               # Formulario de contacto (client component)
    ThemeToggle.tsx               # Toggle claro/oscuro (default: claro)
    CountUp.tsx                   # Animacion de numeros
    GridTexture.tsx               # Textura de fondo sutil
    ProcessDots.tsx               # Pasos del proceso
  lib/
    services.ts                   # Datos de servicios
    projects.ts                   # Datos del portafolio
    journal.ts                    # Datos de articulos
    i18n.ts                       # Sistema de internacionalizacion
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

## Signature Diagonal (24°)

Elemento de identidad visual derivado del logo. Angulo fijo de 24°.

- `DiagonalSlash.tsx`: version estatica, 4 escalas (sm, md, lg, hero)
- `AnimatedDiagonal.tsx`: version animada con stroke reveal (ScrollTrigger)
- Uso en heros: siempre animado (se dibuja como trazo de plumin)
- Uso en secciones/footer: estatico
- Regla: si no responde a 24°, no pertenece al sistema

## SEO / GEO

- JSON-LD global: ProfessionalService + MarketingAgency (founder, servicios, areas, rating)
- JSON-LD en About: AboutPage + Person con sameAs
- Metadata bilingue via `generateMetadata()` en todas las paginas
- Sitemap XML dinamico con todas las rutas EN/ES
- Google Search Console configurado
- GTM: GTM-TXK42CNN

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
