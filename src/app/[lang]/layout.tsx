import type { Metadata } from "next";
import Script from "next/script";
import { Instrument_Serif, Mulish } from "next/font/google";
import { getDictionary, type Locale, locales } from "../../lib/i18n";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import CookieBanner from "../../components/CookieBanner";

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
        ? "Narvaez Digital Marketing · Boutique Studio in Seattle"
        : "Narvaez Digital Marketing · Estudio Boutique en Seattle",
      template: "%s | Narvaez Digital Marketing",
    },
    description: isEn
      ? "Designing with intention — from brand to platform. Boutique digital studio in Seattle serving businesses across the Americas."
      : "Diseñando con intención — de la marca a la plataforma. Estudio digital boutique en Seattle sirviendo negocios en las Américas.",
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
  "@type": ["ProfessionalService", "MarketingAgency"],
  name: "Narvaez Digital Marketing",
  url: BASE_URL,
  logo: `${BASE_URL}/logo.svg`,
  image: `${BASE_URL}/logo.svg`,
  description:
    "Boutique digital studio based in Seattle, serving businesses across the Americas. We design brands, build websites, and develop custom platforms for service-based companies that value clarity, craft, and results.",
  foundingDate: "2022",
  foundingLocation: {
    "@type": "Place",
    name: "Seattle, Washington, US",
  },
  founder: {
    "@type": "Person",
    name: "Carlos A Narvaez Urbina",
    jobTitle: "Founder & Creative Director",
  },
  telephone: "+1-206-981-7078",
  email: "hello@narvaezcarlos.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "1431 Jefferson Ave NE",
    addressLocality: "Renton",
    addressRegion: "WA",
    postalCode: "98056",
    addressCountry: "US",
  },
  areaServed: [
    { "@type": "State", name: "Washington", containedInPlace: { "@type": "Country", name: "US" } },
    { "@type": "State", name: "Florida", containedInPlace: { "@type": "Country", name: "US" } },
    { "@type": "State", name: "Texas", containedInPlace: { "@type": "Country", name: "US" } },
    { "@type": "Country", name: "Mexico" },
    { "@type": "Country", name: "Venezuela" },
    { "@type": "Country", name: "Chile" },
  ],
  knowsLanguage: ["en", "es"],
  priceRange: "$$",
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Digital Services",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Web Design & Development" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Custom Apps & Platforms" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Digital Advertising" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Content & Social Media" } },
    ],
  },
  sameAs: [
    "https://www.facebook.com/narvaezcarloscom/",
    "https://www.instagram.com/narvaezcarloscom/",
    "https://youtube.com/@narvaezcarloscom",
    "https://github.com/narvaezcarloscom",
    "https://www.linkedin.com/in/narvaezcarlos",
  ],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "5.0",
    reviewCount: "23",
    bestRating: "5",
  },
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
        {/* Prevent dark mode flash — runs before first paint */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{if(localStorage.getItem('theme')==='dark')document.documentElement.classList.add('dark')}catch(e){}})()`,
          }}
        />
        {/* Google Consent Mode v2 — default denied before GTM loads */}
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('consent','default',{'analytics_storage':'denied','ad_storage':'denied','ad_user_data':'denied','ad_personalization':'denied','wait_for_update':500});`,
          }}
        />
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
        <CookieBanner lang={lang} />
      </body>
    </html>
  );
}
