import type { Metadata } from "next";
import Script from "next/script";
import { Instrument_Serif, Mulish } from "next/font/google";
import { getDictionary, type Locale, locales } from "../../lib/i18n";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-instrument",
  display: "swap",
});

const mulish = Mulish({
  subsets: ["latin"],
  variable: "--font-mulish",
  display: "swap",
});

const BASE_URL = "https://narvaezcarlos.com";

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const isEn = lang === "en";
  return {
    title: {
      default: isEn
        ? "Narvaez Digital Marketing | Boutique Digital Studio in Seattle"
        : "Narvaez Digital Marketing | Estudio Digital Boutique en Seattle",
      template: "%s | Narvaez Digital Marketing",
    },
    description: isEn
      ? "Boutique digital studio helping service-based businesses build clear brands, effective digital presence, and high-performing websites."
      : "Estudio digital boutique que ayuda a empresas de servicios a construir marcas claras, presencia digital efectiva y sitios web de alto rendimiento.",
    metadataBase: new URL(BASE_URL),
    openGraph: {
      title: "Narvaez Digital Marketing",
      url: BASE_URL,
      siteName: "Narvaez Digital Marketing",
      locale: isEn ? "en_US" : "es_ES",
      type: "website",
    },
    alternates: {
      languages: {
        en: `${BASE_URL}/`,
        es: `${BASE_URL}/es`,
      },
    },
  };
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Narvaez Digital Marketing",
  url: BASE_URL,
  logo: `${BASE_URL}/logo.svg`,
  description:
    "Boutique digital studio helping service-based businesses build clear brands, effective digital presence, and high-performing websites.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Seattle",
    addressRegion: "WA",
    addressCountry: "US",
  },
  sameAs: [
    "https://instagram.com/narvaezcarloscom/",
    "https://youtube.com/@narvaezcarloscom",
    "https://github.com/narvaezcarloscom",
    "https://linkedin.com/in/narvaezcarlos",
  ],
};

export default async function LangLayout({
  params,
  children,
}: {
  params: Promise<{ lang: string }>;
  children: React.ReactNode;
}) {
  const { lang: rawLang } = await params;
  const lang = (rawLang === "es" ? "es" : "en") as Locale;
  const dict = await getDictionary(lang);

  return (
    <html lang={lang}>
      <head>
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${instrumentSerif.variable} ${mulish.variable} font-sans min-h-screen antialiased`}
      >
        {/* Google Tag Manager */}
        <Script id="gtm" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-TXK42CNN');`}
        </Script>

        <div className="min-h-screen flex flex-col">
          <Navbar lang={lang} dict={dict} />
          <main className="flex-1">{children}</main>
          <Footer lang={lang} dict={dict} />
        </div>
      </body>
    </html>
  );
}
