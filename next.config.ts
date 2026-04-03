import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // WordPress portfolio → Work
      { source: "/portafolio", destination: "/work", permanent: true },
      { source: "/portafolio/", destination: "/work", permanent: true },

      // WordPress blog → Journal
      { source: "/blog-marketing-digital", destination: "/journal", permanent: true },
      { source: "/blog-marketing-digital/", destination: "/journal", permanent: true },

      // WordPress blog posts → Journal articles
      { source: "/buyer-personas-inmobiliario-mexico-eeuu", destination: "/journal/the-bridge-between-markets", permanent: true },
      { source: "/buyer-personas-inmobiliario-mexico-eeuu/", destination: "/journal/the-bridge-between-markets", permanent: true },
      { source: "/como-convertir-el-footer-de-tu-sitio-web-en-un-espacio-estrategico", destination: "/journal/your-footer-is-a-sales-tool", permanent: true },
      { source: "/como-convertir-el-footer-de-tu-sitio-web-en-un-espacio-estrategico/", destination: "/journal/your-footer-is-a-sales-tool", permanent: true },
      { source: "/estrategia-de-marketing-digital-cuarto-trimestre", destination: "/journal/q4-is-not-a-season", permanent: true },
      { source: "/estrategia-de-marketing-digital-cuarto-trimestre/", destination: "/journal/q4-is-not-a-season", permanent: true },
      { source: "/etapas-en-el-proceso-del-diseno-web", destination: "/journal/design-is-a-process", permanent: true },
      { source: "/etapas-en-el-proceso-del-diseno-web/", destination: "/journal/design-is-a-process", permanent: true },

      // WordPress projects → Work
      { source: "/proyectos/gtr-appliance-repair", destination: "/work/gtr-appliance-repair", permanent: true },
      { source: "/proyectos/gtr-appliance-repair/", destination: "/work/gtr-appliance-repair", permanent: true },
      { source: "/proyectos/rigos-remodeling", destination: "/work/rigos-remodeling", permanent: true },
      { source: "/proyectos/rigos-remodeling/", destination: "/work/rigos-remodeling", permanent: true },
      { source: "/proyectos/arepa-fusion", destination: "/work/arepa-fusion", permanent: true },
      { source: "/proyectos/arepa-fusion/", destination: "/work/arepa-fusion", permanent: true },
      { source: "/proyectos/dianas-house-cleaning-llc", destination: "/work/dianas-cleaning-llc", permanent: true },
      { source: "/proyectos/dianas-house-cleaning-llc/", destination: "/work/dianas-cleaning-llc", permanent: true },
      { source: "/proyectos/ceja-paint-llc", destination: "/work", permanent: true },
      { source: "/proyectos/ceja-paint-llc/", destination: "/work", permanent: true },
      { source: "/proyectos/2063", destination: "/work/jasons-hood", permanent: true },
      { source: "/proyectos/2063/", destination: "/work/jasons-hood", permanent: true },
      { source: "/proyectos/:slug", destination: "/work", permanent: true },

      // WordPress pages
      { source: "/contacto", destination: "/contact", permanent: true },
      { source: "/contacto/", destination: "/contact", permanent: true },
      { source: "/politica-privacidad", destination: "/privacy", permanent: true },
      { source: "/politica-privacidad/", destination: "/privacy", permanent: true },

      // WordPress system URLs
      { source: "/wp-admin", destination: "/", permanent: true },
      { source: "/wp-admin/:path*", destination: "/", permanent: true },
      { source: "/wp-login.php", destination: "/", permanent: true },
      { source: "/wp-content/:path*", destination: "/", permanent: false },
      { source: "/feed", destination: "/journal", permanent: true },
      { source: "/feed/", destination: "/journal", permanent: true },
    ];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        ],
      },
    ];
  },
};

export default nextConfig;
