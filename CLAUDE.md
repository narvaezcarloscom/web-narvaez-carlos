# Mi Primer Next - Sitio Web de Agencia Digital

Sitio web de agencia de marketing digital (diseno web, SEO, publicidad) construido como proyecto de practica con Next.js.

## Tech Stack

- **Framework**: Next.js 15.5.2 (App Router)
- **Frontend**: React 19.1.0, TypeScript 5
- **Styling**: Tailwind CSS 4 + PostCSS + autoprefixer
- **Font**: Inter (Google Fonts)
- **Linting**: ESLint 9

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
    layout.tsx              # Root layout (Navbar + Footer)
    page.tsx                # Home (Hero component)
    about-us/page.tsx       # Pagina About Us
    contact/
      page.tsx              # Formulario de contacto (client component)
      template.tsx          # Wrapper del layout de contacto
    services/
      layout.tsx            # Layout seccion servicios
      page.tsx              # Lista de servicios
      [id]/
        page.tsx            # Detalle de servicio (dinamico)
        not-found.tsx       # 404 personalizado para IDs invalidos
  components/
    Navbar.tsx, Hero.tsx, Footer.tsx, Container.tsx
  lib/
    services.ts             # Datos hardcodeados de servicios
```

## Arquitectura

- App Router con file-based routing
- Server Components por defecto, `"use client"` solo en contacto
- Rutas dinamicas `[id]` con `generateStaticParams()` y `generateMetadata()`
- Datos en memoria (sin DB/API)
- Path alias: `@/*` → `./src/*`
- Dark mode por clase CSS

## Notas

- Next.js 15 usa async params: `params as Promise<T>` en paginas dinamicas
- Sin base de datos ni APIs externas - datos en `src/lib/services.ts`
- Deploy listo para Vercel
