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

export const metadata: Metadata = {
  metadataBase: new URL("https://narvaezcarlos.com"),
  title: "Programa Emprendedor Latino · Narvaez Digital Marketing",
  description:
    "Verse profesional, al alcance de quien empieza. Programa del estudio para que el emprendedor latino entre al mercado de Washington con percepción de calidad desde el primer día.",
  robots: { index: false, follow: false },
  openGraph: {
    title: "Verse profesional, al alcance de quien empieza.",
    description:
      "Programa del estudio para que el emprendedor latino entre al mercado de Washington con percepción de calidad desde el primer día.",
    url: "https://narvaezcarlos.com/emprendedor",
    siteName: "Narvaez Digital Marketing",
    locale: "es_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Verse profesional, al alcance de quien empieza.",
    description:
      "Programa del estudio para el emprendedor latino — Narvaez Digital Marketing.",
  },
};

export default async function EmprendedorLayout({
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
