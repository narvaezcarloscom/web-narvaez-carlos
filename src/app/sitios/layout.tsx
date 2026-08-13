import type { Metadata } from "next";
import { Instrument_Serif, Mulish } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import AnalyticsEvents from "../../components/AnalyticsEvents";

/**
 * Layout de /sitios — la landing que abre el QR del mostrador de
 * Graficolor Printing.
 *
 * A diferencia del resto del sitio, esta pagina NO monta `Navbar` ni `Footer`.
 * Esos componentes llevan el isotipo, el copyright del estudio y los links
 * legales; cualquiera de los tres delata quien esta detras. La pagina es
 * neutral a proposito: Javier es quien cierra con el cliente, y nada en
 * pantalla debe estorbarle.
 *
 * Tampoco monta GTM ni Microsoft Clarity. Esa omision no es solo de marca:
 * sin esos scripts la pagina no pone cookies de terceros, y sin cookies no
 * hace falta banner de consentimiento ni links a la politica de privacidad
 * --que son justo los links que llevarian el nombre del estudio. La
 * neutralidad de marca y el cumplimiento de privacidad apuntan aqui en la
 * misma direccion.
 *
 * La unica medicion es Vercel Analytics, que no usa cookies. `AnalyticsEvents`
 * despacha con `track()` de @vercel/analytics, no con dataLayer, asi que los
 * eventos funcionan sin GTM.
 *
 * Sin script de tema: la pagina debe verse identica en el celular de cualquier
 * desconocido. Siempre claro.
 */

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
  title: "Sitios web para negocios de servicios",
  description:
    "Sitios reales de negocios de construcción, oficios y comida, en línea hoy.",
  // Uno de los cuatro candados de no-indexado. Los otros tres: PRIVATE_PATHS en
  // robots.ts, la exclusion del matcher en middleware.ts, y la ausencia de la
  // ruta en sitemap.ts.
  robots: { index: false, follow: false },
};

export default function PortafolioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body
        className={`${instrumentSerif.variable} ${mulish.variable} font-sans min-h-screen antialiased`}
      >
        {children}
        <AnalyticsEvents />
        <Analytics />
      </body>
    </html>
  );
}
