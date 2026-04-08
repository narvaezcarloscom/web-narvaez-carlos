import type { Metadata } from "next";
import type { Locale } from "../../../lib/i18n";
import Container from "../../../components/Container";
import AnimatedDiagonal from "../../../components/AnimatedDiagonal";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const isEn = lang === "en";
  return {
    title: isEn ? "Privacy Policy" : "Política de Privacidad",
    description: isEn
      ? "How Narvaez Digital Marketing collects, uses, and protects your personal data."
      : "Cómo Narvaez Digital Marketing recopila, usa y protege tus datos personales.",
  };
}

const LAST_UPDATED = "April 8, 2026";

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;
  const isEn = lang === "en";

  return (
    <>
      <section className="relative pt-16 md:pt-24 pb-16 md:pb-20">
        <Container>
          <div className="max-w-3xl">
            <p className="text-xs uppercase tracking-widest text-graphite/50 mb-4">
              {isEn ? "Legal" : "Legal"}
            </p>
            <AnimatedDiagonal className="text-graphite/20 mb-4" />
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl editorial-heading mb-6">
              {isEn ? "Privacy Policy" : "Política de Privacidad"}
            </h1>
            <p className="text-graphite text-sm">
              {isEn ? `Last updated: ${LAST_UPDATED}` : `Última actualización: ${LAST_UPDATED}`}
            </p>
          </div>
        </Container>
      </section>

      <section className="pb-24 md:pb-32">
        <Container>
          <div className="max-w-3xl prose prose-charcoal">
            {isEn ? <EnglishContent /> : <SpanishContent />}
          </div>
        </Container>
      </section>
    </>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-serif text-2xl md:text-3xl editorial-heading mt-12 mb-4">
      {children}
    </h2>
  );
}

function Paragraph({ children }: { children: React.ReactNode }) {
  return <p className="text-graphite text-base leading-relaxed mb-4">{children}</p>;
}

function ListItem({ children }: { children: React.ReactNode }) {
  return <li className="text-graphite text-base leading-relaxed">{children}</li>;
}

function EnglishContent() {
  return (
    <>
      <Paragraph>
        Narvaez Digital Marketing (&quot;NDM,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) is a registered digital studio based in Washington State, United States. This Privacy Policy explains how we collect, use, disclose, and protect your personal data when you visit our website at narvaezcarlos.com or interact with our services.
      </Paragraph>
      <Paragraph>
        We are committed to protecting your privacy and handling your data with transparency. This policy applies to all visitors, regardless of location, and addresses requirements under applicable laws including GDPR (EU), CCPA/CPRA (California), LFPDPPP (Mexico), and Washington State privacy regulations.
      </Paragraph>

      <SectionTitle>1. Data Controller</SectionTitle>
      <Paragraph>
        The data controller responsible for your personal data is:
      </Paragraph>
      <div className="text-graphite text-base leading-relaxed mb-4 pl-4 border-l-2 border-neutral-light">
        <p className="font-medium text-charcoal">Narvaez Digital Marketing</p>
        <p>1431 Jefferson Ave NE, Renton, WA 98056, United States</p>
        <p>Email: hello@narvaezcarlos.com</p>
      </div>

      <SectionTitle>2. Data We Collect</SectionTitle>
      <Paragraph>We collect the following categories of personal data:</Paragraph>
      <ul className="list-disc pl-6 space-y-2 mb-4">
        <ListItem>
          <strong>Contact form data:</strong> name, email address, company name (optional), selected service (optional), and message content — provided voluntarily when you submit our contact form.
        </ListItem>
        <ListItem>
          <strong>Analytics data:</strong> anonymized usage information such as pages visited, session duration, device type, browser, approximate geographic location, and referral source — collected via Google Analytics 4 through Google Tag Manager, only with your consent.
        </ListItem>
        <ListItem>
          <strong>Cookie preferences:</strong> your cookie consent choice, stored locally on your device.
        </ListItem>
      </ul>
      <Paragraph>
        We do not collect sensitive personal data, financial information, or data from minors.
      </Paragraph>

      <SectionTitle>3. How We Use Your Data</SectionTitle>
      <ul className="list-disc pl-6 space-y-2 mb-4">
        <ListItem>
          <strong>Contact form submissions:</strong> to respond to your inquiry and initiate a potential business relationship. Legal basis: legitimate interest (responding to a direct request) and pre-contractual measures.
        </ListItem>
        <ListItem>
          <strong>Analytics:</strong> to understand how visitors use our website and improve the user experience. Legal basis: consent (opt-in via cookie banner).
        </ListItem>
        <ListItem>
          <strong>Essential cookies:</strong> to remember your theme preference (light/dark mode) and language selection. Legal basis: legitimate interest (site functionality).
        </ListItem>
      </ul>

      <SectionTitle>4. Third-Party Processors</SectionTitle>
      <Paragraph>We share your data with the following service providers, solely for the purposes described above:</Paragraph>
      <ul className="list-disc pl-6 space-y-2 mb-4">
        <ListItem>
          <strong>Vercel Inc.</strong> — website hosting and delivery (San Francisco, CA, USA). <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="link-underline text-charcoal">Privacy Policy</a>
        </ListItem>
        <ListItem>
          <strong>Google LLC</strong> — analytics via Google Analytics 4 and Google Tag Manager (USA). <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="link-underline text-charcoal">Privacy Policy</a>
        </ListItem>
        <ListItem>
          <strong>Hostinger International Ltd.</strong> — email delivery for contact form submissions (Lithuania/USA). <a href="https://www.hostinger.com/privacy-policy" target="_blank" rel="noopener noreferrer" className="link-underline text-charcoal">Privacy Policy</a>
        </ListItem>
      </ul>
      <Paragraph>We do not sell, rent, or trade your personal data to any third party.</Paragraph>

      <SectionTitle>5. Cookies and Tracking Technologies</SectionTitle>
      <Paragraph>Our website uses the following types of cookies:</Paragraph>
      <ul className="list-disc pl-6 space-y-2 mb-4">
        <ListItem>
          <strong>Essential (no consent required):</strong> theme preference (localStorage), language preference, cookie consent status.
        </ListItem>
        <ListItem>
          <strong>Analytics (consent required):</strong> Google Analytics cookies (_ga, _ga_*) — used to measure site traffic and usage patterns. These are only activated if you click &quot;Accept&quot; on the cookie banner.
        </ListItem>
      </ul>
      <Paragraph>
        You can change your cookie preferences at any time using the &quot;Cookie Settings&quot; link in the website footer.
      </Paragraph>

      <SectionTitle>6. International Data Transfers</SectionTitle>
      <Paragraph>
        NDM is based in the United States. If you are visiting from the European Union, your data may be transferred to the United States for processing. We rely on the following mechanisms to ensure adequate protection:
      </Paragraph>
      <ul className="list-disc pl-6 space-y-2 mb-4">
        <ListItem>EU-U.S. Data Privacy Framework (for certified providers)</ListItem>
        <ListItem>Standard Contractual Clauses (SCCs) where applicable</ListItem>
        <ListItem>Processor agreements with all third-party providers</ListItem>
      </ul>

      <SectionTitle>7. Data Retention</SectionTitle>
      <ul className="list-disc pl-6 space-y-2 mb-4">
        <ListItem>
          <strong>Contact form data:</strong> retained in our email system for up to 24 months after the last interaction, or until you request deletion.
        </ListItem>
        <ListItem>
          <strong>Analytics data:</strong> retained by Google Analytics for 14 months (default GA4 setting), in anonymized/aggregated form.
        </ListItem>
        <ListItem>
          <strong>Cookie preferences:</strong> stored on your device until you clear your browser data or change your preferences.
        </ListItem>
      </ul>

      <SectionTitle>8. Your Rights</SectionTitle>
      <Paragraph>Depending on your location, you may have the following rights regarding your personal data:</Paragraph>
      <ul className="list-disc pl-6 space-y-2 mb-4">
        <ListItem><strong>Access:</strong> request a copy of the personal data we hold about you.</ListItem>
        <ListItem><strong>Rectification:</strong> request correction of inaccurate data.</ListItem>
        <ListItem><strong>Erasure:</strong> request deletion of your personal data.</ListItem>
        <ListItem><strong>Restriction:</strong> request that we limit the processing of your data.</ListItem>
        <ListItem><strong>Portability:</strong> request your data in a structured, machine-readable format.</ListItem>
        <ListItem><strong>Objection:</strong> object to processing based on legitimate interest.</ListItem>
        <ListItem><strong>Withdraw consent:</strong> withdraw your consent for analytics cookies at any time via the cookie banner.</ListItem>
      </ul>
      <Paragraph>
        <strong>For EU residents:</strong> these rights are guaranteed under the GDPR (Articles 15–22). You also have the right to lodge a complaint with your local data protection authority.
      </Paragraph>
      <Paragraph>
        <strong>For California residents:</strong> under the CCPA/CPRA, you have the right to know what data we collect, request deletion, and opt out of the sale of personal information. We do not sell your personal information.
      </Paragraph>
      <Paragraph>
        <strong>For Mexico residents:</strong> under the LFPDPPP, you have ARCO rights (Access, Rectification, Cancellation, Opposition). This privacy policy serves as our Aviso de Privacidad.
      </Paragraph>
      <Paragraph>
        To exercise any of these rights, contact us at <a href="mailto:hello@narvaezcarlos.com" className="link-underline text-charcoal">hello@narvaezcarlos.com</a>. We will respond within 30 days.
      </Paragraph>

      <SectionTitle>9. Security</SectionTitle>
      <Paragraph>
        We implement appropriate technical and organizational measures to protect your personal data, including HTTPS encryption, secure hosting on Vercel, access controls, and security headers. However, no method of transmission over the internet is 100% secure.
      </Paragraph>

      <SectionTitle>10. Children&apos;s Privacy</SectionTitle>
      <Paragraph>
        Our website and services are not directed at individuals under the age of 16. We do not knowingly collect personal data from children.
      </Paragraph>

      <SectionTitle>11. Changes to This Policy</SectionTitle>
      <Paragraph>
        We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated revision date. We encourage you to review this page periodically.
      </Paragraph>

      <SectionTitle>12. Contact</SectionTitle>
      <Paragraph>
        For questions about this Privacy Policy or to exercise your data rights, contact us:
      </Paragraph>
      <div className="text-graphite text-base leading-relaxed mb-4 pl-4 border-l-2 border-neutral-light">
        <p>Email: <a href="mailto:hello@narvaezcarlos.com" className="link-underline text-charcoal">hello@narvaezcarlos.com</a></p>
        <p>Narvaez Digital Marketing</p>
        <p>1431 Jefferson Ave NE, Renton, WA 98056, United States</p>
      </div>
    </>
  );
}

function SpanishContent() {
  return (
    <>
      <Paragraph>
        Narvaez Digital Marketing (&quot;NDM,&quot; &quot;nosotros&quot; o &quot;nuestro&quot;) es un estudio digital registrado en el Estado de Washington, Estados Unidos. Esta Política de Privacidad explica cómo recopilamos, usamos, compartimos y protegemos tus datos personales cuando visitas nuestro sitio web en narvaezcarlos.com o interactúas con nuestros servicios.
      </Paragraph>
      <Paragraph>
        Nos comprometemos a proteger tu privacidad y manejar tus datos con transparencia. Esta política aplica a todos los visitantes, independientemente de su ubicación, y aborda los requisitos de las leyes aplicables, incluyendo el RGPD (UE), CCPA/CPRA (California), LFPDPPP (México) y las regulaciones de privacidad del Estado de Washington.
      </Paragraph>

      <SectionTitle>1. Responsable del Tratamiento</SectionTitle>
      <Paragraph>
        El responsable del tratamiento de tus datos personales es:
      </Paragraph>
      <div className="text-graphite text-base leading-relaxed mb-4 pl-4 border-l-2 border-neutral-light">
        <p className="font-medium text-charcoal">Narvaez Digital Marketing</p>
        <p>1431 Jefferson Ave NE, Renton, WA 98056, Estados Unidos</p>
        <p>Correo: hello@narvaezcarlos.com</p>
      </div>

      <SectionTitle>2. Datos que Recopilamos</SectionTitle>
      <Paragraph>Recopilamos las siguientes categorías de datos personales:</Paragraph>
      <ul className="list-disc pl-6 space-y-2 mb-4">
        <ListItem>
          <strong>Datos del formulario de contacto:</strong> nombre, correo electrónico, nombre de empresa (opcional), servicio seleccionado (opcional) y contenido del mensaje — proporcionados voluntariamente al enviar nuestro formulario.
        </ListItem>
        <ListItem>
          <strong>Datos analíticos:</strong> información de uso anonimizada como páginas visitadas, duración de sesión, tipo de dispositivo, navegador, ubicación geográfica aproximada y fuente de referencia — recopilados mediante Google Analytics 4 a través de Google Tag Manager, únicamente con tu consentimiento.
        </ListItem>
        <ListItem>
          <strong>Preferencias de cookies:</strong> tu elección de consentimiento de cookies, almacenada localmente en tu dispositivo.
        </ListItem>
      </ul>
      <Paragraph>
        No recopilamos datos personales sensibles, información financiera ni datos de menores de edad.
      </Paragraph>

      <SectionTitle>3. Cómo Usamos tus Datos</SectionTitle>
      <ul className="list-disc pl-6 space-y-2 mb-4">
        <ListItem>
          <strong>Formulario de contacto:</strong> para responder a tu consulta e iniciar una posible relación comercial. Base legal: interés legítimo (responder a una solicitud directa) y medidas precontractuales.
        </ListItem>
        <ListItem>
          <strong>Analítica:</strong> para comprender cómo los visitantes usan nuestro sitio web y mejorar la experiencia. Base legal: consentimiento (opt-in mediante banner de cookies).
        </ListItem>
        <ListItem>
          <strong>Cookies esenciales:</strong> para recordar tu preferencia de tema (claro/oscuro) e idioma. Base legal: interés legítimo (funcionalidad del sitio).
        </ListItem>
      </ul>

      <SectionTitle>4. Procesadores Externos</SectionTitle>
      <Paragraph>Compartimos tus datos con los siguientes proveedores de servicios, exclusivamente para los fines descritos anteriormente:</Paragraph>
      <ul className="list-disc pl-6 space-y-2 mb-4">
        <ListItem>
          <strong>Vercel Inc.</strong> — alojamiento y distribución del sitio web (San Francisco, CA, EE.UU.). <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="link-underline text-charcoal">Política de Privacidad</a>
        </ListItem>
        <ListItem>
          <strong>Google LLC</strong> — analítica mediante Google Analytics 4 y Google Tag Manager (EE.UU.). <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="link-underline text-charcoal">Política de Privacidad</a>
        </ListItem>
        <ListItem>
          <strong>Hostinger International Ltd.</strong> — envío de correos del formulario de contacto (Lituania/EE.UU.). <a href="https://www.hostinger.com/privacy-policy" target="_blank" rel="noopener noreferrer" className="link-underline text-charcoal">Política de Privacidad</a>
        </ListItem>
      </ul>
      <Paragraph>No vendemos, alquilamos ni comercializamos tus datos personales a terceros.</Paragraph>

      <SectionTitle>5. Cookies y Tecnologías de Rastreo</SectionTitle>
      <Paragraph>Nuestro sitio web utiliza los siguientes tipos de cookies:</Paragraph>
      <ul className="list-disc pl-6 space-y-2 mb-4">
        <ListItem>
          <strong>Esenciales (sin consentimiento requerido):</strong> preferencia de tema (localStorage), preferencia de idioma, estado del consentimiento de cookies.
        </ListItem>
        <ListItem>
          <strong>Analíticas (requieren consentimiento):</strong> cookies de Google Analytics (_ga, _ga_*) — utilizadas para medir el tráfico y patrones de uso del sitio. Solo se activan si haces clic en &quot;Aceptar&quot; en el banner de cookies.
        </ListItem>
      </ul>
      <Paragraph>
        Puedes cambiar tus preferencias de cookies en cualquier momento usando el enlace &quot;Configuración de Cookies&quot; en el pie de página del sitio web.
      </Paragraph>

      <SectionTitle>6. Transferencias Internacionales de Datos</SectionTitle>
      <Paragraph>
        NDM tiene su sede en Estados Unidos. Si nos visitas desde la Unión Europea, tus datos pueden ser transferidos a Estados Unidos para su procesamiento. Utilizamos los siguientes mecanismos para garantizar una protección adecuada:
      </Paragraph>
      <ul className="list-disc pl-6 space-y-2 mb-4">
        <ListItem>Marco de Privacidad de Datos UE-EE.UU. (para proveedores certificados)</ListItem>
        <ListItem>Cláusulas Contractuales Tipo (SCCs) cuando corresponda</ListItem>
        <ListItem>Acuerdos de procesamiento con todos los proveedores externos</ListItem>
      </ul>

      <SectionTitle>7. Retención de Datos</SectionTitle>
      <ul className="list-disc pl-6 space-y-2 mb-4">
        <ListItem>
          <strong>Datos del formulario de contacto:</strong> retenidos en nuestro sistema de correo hasta 24 meses después de la última interacción, o hasta que solicites su eliminación.
        </ListItem>
        <ListItem>
          <strong>Datos analíticos:</strong> retenidos por Google Analytics durante 14 meses (configuración predeterminada de GA4), en forma anonimizada/agregada.
        </ListItem>
        <ListItem>
          <strong>Preferencias de cookies:</strong> almacenadas en tu dispositivo hasta que borres los datos del navegador o cambies tus preferencias.
        </ListItem>
      </ul>

      <SectionTitle>8. Tus Derechos</SectionTitle>
      <Paragraph>Dependiendo de tu ubicación, puedes tener los siguientes derechos sobre tus datos personales:</Paragraph>
      <ul className="list-disc pl-6 space-y-2 mb-4">
        <ListItem><strong>Acceso:</strong> solicitar una copia de los datos personales que tenemos sobre ti.</ListItem>
        <ListItem><strong>Rectificación:</strong> solicitar la corrección de datos inexactos.</ListItem>
        <ListItem><strong>Supresión:</strong> solicitar la eliminación de tus datos personales.</ListItem>
        <ListItem><strong>Limitación:</strong> solicitar que limitemos el tratamiento de tus datos.</ListItem>
        <ListItem><strong>Portabilidad:</strong> solicitar tus datos en un formato estructurado y legible por máquina.</ListItem>
        <ListItem><strong>Oposición:</strong> oponerte al tratamiento basado en interés legítimo.</ListItem>
        <ListItem><strong>Retirar consentimiento:</strong> retirar tu consentimiento para cookies analíticas en cualquier momento mediante el banner de cookies.</ListItem>
      </ul>
      <Paragraph>
        <strong>Para residentes de la UE:</strong> estos derechos están garantizados por el RGPD (Artículos 15–22). También tienes derecho a presentar una reclamación ante tu autoridad local de protección de datos.
      </Paragraph>
      <Paragraph>
        <strong>Para residentes de California:</strong> bajo la CCPA/CPRA, tienes derecho a saber qué datos recopilamos, solicitar su eliminación y optar por no participar en la venta de información personal. No vendemos tu información personal.
      </Paragraph>
      <Paragraph>
        <strong>Para residentes de México:</strong> bajo la LFPDPPP, tienes derechos ARCO (Acceso, Rectificación, Cancelación, Oposición). Esta política de privacidad sirve como nuestro Aviso de Privacidad.
      </Paragraph>
      <Paragraph>
        Para ejercer cualquiera de estos derechos, contáctanos en <a href="mailto:hello@narvaezcarlos.com" className="link-underline text-charcoal">hello@narvaezcarlos.com</a>. Responderemos en un plazo de 30 días.
      </Paragraph>

      <SectionTitle>9. Seguridad</SectionTitle>
      <Paragraph>
        Implementamos medidas técnicas y organizativas adecuadas para proteger tus datos personales, incluyendo cifrado HTTPS, alojamiento seguro en Vercel, controles de acceso y cabeceras de seguridad. Sin embargo, ningún método de transmisión por internet es 100% seguro.
      </Paragraph>

      <SectionTitle>10. Privacidad de Menores</SectionTitle>
      <Paragraph>
        Nuestro sitio web y servicios no están dirigidos a personas menores de 16 años. No recopilamos intencionalmente datos personales de menores.
      </Paragraph>

      <SectionTitle>11. Cambios en esta Política</SectionTitle>
      <Paragraph>
        Podemos actualizar esta Política de Privacidad periódicamente. Los cambios se publicarán en esta página con una fecha de revisión actualizada. Te recomendamos revisar esta página de forma periódica.
      </Paragraph>

      <SectionTitle>12. Contacto</SectionTitle>
      <Paragraph>
        Para preguntas sobre esta Política de Privacidad o para ejercer tus derechos sobre tus datos, contáctanos:
      </Paragraph>
      <div className="text-graphite text-base leading-relaxed mb-4 pl-4 border-l-2 border-neutral-light">
        <p>Correo: <a href="mailto:hello@narvaezcarlos.com" className="link-underline text-charcoal">hello@narvaezcarlos.com</a></p>
        <p>Narvaez Digital Marketing</p>
        <p>1431 Jefferson Ave NE, Renton, WA 98056, Estados Unidos</p>
      </div>
    </>
  );
}
