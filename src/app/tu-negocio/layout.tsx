import type { Metadata } from "next";
import Script from "next/script";
import { Instrument_Serif, Mulish } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { getDictionary } from "../../lib/i18n";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import CookieBanner from "../../components/CookieBanner";
import AnalyticsEvents from "../../components/AnalyticsEvents";

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

/*
  A DIFERENCIA DE /sitios, esta pagina SI monta GTM y CookieBanner.

  Los anuncios de Meta y Google necesitan tag de conversion, y el tag entra por
  GTM. GTM pone cookies de terceros, asi que el banner de consentimiento y los
  enlaces legales son obligatorios. En /sitios la neutralidad de marca y el
  cumplimiento apuntaban en la misma direccion; aqui no, porque esta pagina si
  lleva la marca del estudio y si necesita medir conversion.

  noindex, candado 1 de 4. Los otros tres: PRIVATE_PATHS en robots.ts, la
  exclusion del matcher en middleware.ts, y la ausencia del sitemap.
*/
export const metadata: Metadata = {
  metadataBase: new URL("https://narvaezcarlos.com"),
  title: "Sitios web para negocios de servicios · King County, WA",
  description:
    "Te lo piden las aseguradoras para renovar tu póliza, los bancos para abrirte la cuenta y las financiadoras para aprobarte. Sitios web profesionales para negocios de servicios latinos en el área de Seattle.",
  robots: { index: false, follow: false },
  openGraph: {
    title: "Tu sitio web dejó de ser opcional.",
    description:
      "Sitios web profesionales para negocios de servicios latinos en King County, WA. En inglés y en español.",
    url: "https://narvaezcarlos.com/tu-negocio",
    siteName: "Narvaez Digital Marketing",
    locale: "es_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tu sitio web dejó de ser opcional.",
    description:
      "Sitios web para negocios de servicios latinos en King County, WA.",
  },
};

export default async function TuNegocioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const dict = await getDictionary("es");

  return (
    <html lang="es">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{if(localStorage.getItem('theme')==='dark')document.documentElement.classList.add('dark')}catch(e){}})()`,
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){window.dataLayer=window.dataLayer||[];window.gtag=function(){dataLayer.push(arguments);};var s='denied';try{var v=localStorage.getItem('cookie_consent');if(v==='granted')s='granted';}catch(e){}window.gtag('consent','default',{'analytics_storage':s,'ad_storage':s,'ad_user_data':s,'ad_personalization':s,'wait_for_update':500});})();`,
          }}
        />
      </head>
      <body
        className={`${instrumentSerif.variable} ${mulish.variable} font-sans min-h-screen antialiased`}
      >
        <Script id="gtm" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-TXK42CNN');`}
        </Script>

        <div className="min-h-screen flex flex-col">
          <Navbar lang="es" dict={dict} hideLanguageToggle minimalChrome />
          <main className="flex-1">{children}</main>
          <Footer lang="es" dict={dict} minimal />
        </div>
        <CookieBanner lang="es" />
        <AnalyticsEvents />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
