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
    title: isEn ? "Terms of Service" : "Términos de Servicio",
    description: isEn
      ? "Terms and conditions governing the use of narvaezcarlos.com and Narvaez Digital Marketing services."
      : "Términos y condiciones que rigen el uso de narvaezcarlos.com y los servicios de Narvaez Digital Marketing.",
  };
}

const LAST_UPDATED = "April 8, 2026";

export default async function TermsPage({
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
              Legal
            </p>
            <AnimatedDiagonal className="text-graphite/20 mb-4" />
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl editorial-heading mb-6">
              {isEn ? "Terms of Service" : "Términos de Servicio"}
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
        These Terms of Service (&quot;Terms&quot;) govern your access to and use of the website narvaezcarlos.com (&quot;Website&quot;) operated by Narvaez Digital Marketing (&quot;NDM,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;), a registered business in Washington State, United States. By accessing or using our Website, you agree to be bound by these Terms.
      </Paragraph>

      <SectionTitle>1. Services</SectionTitle>
      <Paragraph>
        NDM is a boutique digital studio that provides web design and development, custom applications and platforms, digital advertising, and content and social media services. The Website serves as an informational platform about our studio and services, and provides a contact form to initiate business inquiries.
      </Paragraph>
      <Paragraph>
        Specific project engagements are governed by separate agreements, including a Master Service Agreement (MSA) and Statement of Work (SOW), which take precedence over these Terms in case of conflict.
      </Paragraph>

      <SectionTitle>2. Use of the Website</SectionTitle>
      <Paragraph>You agree to use our Website only for lawful purposes and in a manner that does not:</Paragraph>
      <ul className="list-disc pl-6 space-y-2 mb-4">
        <ListItem>Violate any applicable local, state, national, or international law or regulation.</ListItem>
        <ListItem>Infringe on the rights of others, including intellectual property rights.</ListItem>
        <ListItem>Attempt to gain unauthorized access to any part of the Website or its systems.</ListItem>
        <ListItem>Transmit any harmful code, malware, or disruptive content.</ListItem>
        <ListItem>Use automated systems (bots, scrapers) to extract data from the Website without prior written consent.</ListItem>
      </ul>

      <SectionTitle>3. Intellectual Property</SectionTitle>
      <Paragraph>
        All content on this Website — including but not limited to text, design, graphics, logos, icons, images, code, and the overall look and feel — is the property of Narvaez Digital Marketing and is protected by United States and international copyright, trademark, and other intellectual property laws.
      </Paragraph>
      <Paragraph>
        The NDM name, logo, and diagonal slash mark are trademarks of Narvaez Digital Marketing. You may not use, reproduce, or distribute any content from this Website without our prior written permission.
      </Paragraph>
      <Paragraph>
        Project case studies displayed in our portfolio are shown with client authorization and remain the intellectual property of their respective owners where applicable.
      </Paragraph>

      <SectionTitle>4. Contact Form and Communications</SectionTitle>
      <Paragraph>
        When you submit information through our contact form, you represent that the information provided is accurate and that you have the authority to share it. We will use the information solely to respond to your inquiry, as described in our Privacy Policy.
      </Paragraph>
      <Paragraph>
        Submitting a contact form does not create a contractual relationship or obligation on our part. Any project engagement requires a separate written agreement.
      </Paragraph>

      <SectionTitle>5. Third-Party Links</SectionTitle>
      <Paragraph>
        Our Website may contain links to third-party websites and services (including social media platforms). These links are provided for convenience only. We do not control, endorse, or assume responsibility for the content, privacy policies, or practices of any third-party sites.
      </Paragraph>

      <SectionTitle>6. Disclaimer of Warranties</SectionTitle>
      <Paragraph>
        The Website is provided &quot;as is&quot; and &quot;as available&quot; without warranties of any kind, either express or implied, including but not limited to implied warranties of merchantability, fitness for a particular purpose, and non-infringement. We do not warrant that the Website will be uninterrupted, error-free, or free of harmful components.
      </Paragraph>

      <SectionTitle>7. Limitation of Liability</SectionTitle>
      <Paragraph>
        To the maximum extent permitted by applicable law, Narvaez Digital Marketing shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits, data, or goodwill, arising out of or in connection with your use of the Website.
      </Paragraph>
      <Paragraph>
        Our total liability for any claim arising from these Terms or your use of the Website shall not exceed $100 USD.
      </Paragraph>

      <SectionTitle>8. Indemnification</SectionTitle>
      <Paragraph>
        You agree to indemnify and hold harmless Narvaez Digital Marketing, its owner, and its contractors from any claims, damages, losses, or expenses (including reasonable attorney fees) arising from your use of the Website or violation of these Terms.
      </Paragraph>

      <SectionTitle>9. Governing Law and Disputes</SectionTitle>
      <Paragraph>
        These Terms are governed by the laws of the State of Washington, United States, without regard to conflict of law principles. Any dispute arising from these Terms shall be resolved in the courts located in King County, Washington.
      </Paragraph>
      <Paragraph>
        Before initiating any legal proceeding, you agree to attempt to resolve disputes informally by contacting us at hello@narvaezcarlos.com. We will make good-faith efforts to resolve any issue within 30 days.
      </Paragraph>

      <SectionTitle>10. Changes to These Terms</SectionTitle>
      <Paragraph>
        We may update these Terms from time to time. Changes will be posted on this page with an updated revision date. Your continued use of the Website after changes constitutes acceptance of the revised Terms.
      </Paragraph>

      <SectionTitle>11. Severability</SectionTitle>
      <Paragraph>
        If any provision of these Terms is found to be unenforceable or invalid, that provision shall be limited or eliminated to the minimum extent necessary, and the remaining provisions shall continue in full force and effect.
      </Paragraph>

      <SectionTitle>12. Contact</SectionTitle>
      <Paragraph>
        For questions about these Terms of Service, contact us:
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
        Estos Términos de Servicio (&quot;Términos&quot;) rigen tu acceso y uso del sitio web narvaezcarlos.com (&quot;Sitio Web&quot;) operado por Narvaez Digital Marketing (&quot;NDM,&quot; &quot;nosotros&quot; o &quot;nuestro&quot;), un negocio registrado en el Estado de Washington, Estados Unidos. Al acceder o usar nuestro Sitio Web, aceptas estar sujeto a estos Términos.
      </Paragraph>

      <SectionTitle>1. Servicios</SectionTitle>
      <Paragraph>
        NDM es un estudio digital boutique que ofrece servicios de diseño y desarrollo web, aplicaciones y plataformas a medida, publicidad digital, y contenido y redes sociales. El Sitio Web sirve como plataforma informativa sobre nuestro estudio y servicios, y proporciona un formulario de contacto para iniciar consultas de negocio.
      </Paragraph>
      <Paragraph>
        Los proyectos específicos se rigen por acuerdos separados, incluyendo un Acuerdo Marco de Servicios (MSA) y una Declaración de Trabajo (SOW), que prevalecen sobre estos Términos en caso de conflicto.
      </Paragraph>

      <SectionTitle>2. Uso del Sitio Web</SectionTitle>
      <Paragraph>Aceptas usar nuestro Sitio Web únicamente para fines lícitos y de manera que no:</Paragraph>
      <ul className="list-disc pl-6 space-y-2 mb-4">
        <ListItem>Viole cualquier ley o regulación local, estatal, nacional o internacional aplicable.</ListItem>
        <ListItem>Infrinja los derechos de terceros, incluidos los derechos de propiedad intelectual.</ListItem>
        <ListItem>Intente obtener acceso no autorizado a cualquier parte del Sitio Web o sus sistemas.</ListItem>
        <ListItem>Transmita código dañino, malware o contenido disruptivo.</ListItem>
        <ListItem>Use sistemas automatizados (bots, scrapers) para extraer datos del Sitio Web sin consentimiento previo por escrito.</ListItem>
      </ul>

      <SectionTitle>3. Propiedad Intelectual</SectionTitle>
      <Paragraph>
        Todo el contenido de este Sitio Web — incluyendo pero no limitado a texto, diseño, gráficos, logotipos, íconos, imágenes, código y la apariencia general — es propiedad de Narvaez Digital Marketing y está protegido por las leyes de derechos de autor, marcas registradas y otras leyes de propiedad intelectual de Estados Unidos e internacionales.
      </Paragraph>
      <Paragraph>
        El nombre NDM, el logotipo y la marca diagonal son marcas comerciales de Narvaez Digital Marketing. No puedes usar, reproducir o distribuir ningún contenido de este Sitio Web sin nuestro permiso previo por escrito.
      </Paragraph>
      <Paragraph>
        Los casos de estudio de proyectos mostrados en nuestro portafolio se presentan con autorización del cliente y siguen siendo propiedad intelectual de sus respectivos dueños cuando corresponda.
      </Paragraph>

      <SectionTitle>4. Formulario de Contacto y Comunicaciones</SectionTitle>
      <Paragraph>
        Al enviar información a través de nuestro formulario de contacto, declaras que la información proporcionada es precisa y que tienes la autoridad para compartirla. Usaremos la información únicamente para responder a tu consulta, según se describe en nuestra Política de Privacidad.
      </Paragraph>
      <Paragraph>
        El envío de un formulario de contacto no crea una relación contractual ni obligación de nuestra parte. Cualquier proyecto requiere un acuerdo escrito separado.
      </Paragraph>

      <SectionTitle>5. Enlaces a Terceros</SectionTitle>
      <Paragraph>
        Nuestro Sitio Web puede contener enlaces a sitios web y servicios de terceros (incluyendo plataformas de redes sociales). Estos enlaces se proporcionan por conveniencia. No controlamos, respaldamos ni asumimos responsabilidad por el contenido, políticas de privacidad o prácticas de sitios de terceros.
      </Paragraph>

      <SectionTitle>6. Exclusión de Garantías</SectionTitle>
      <Paragraph>
        El Sitio Web se proporciona &quot;tal cual&quot; y &quot;según disponibilidad&quot; sin garantías de ningún tipo, ya sean expresas o implícitas, incluyendo pero no limitado a garantías implícitas de comerciabilidad, idoneidad para un propósito particular y no infracción. No garantizamos que el Sitio Web sea ininterrumpido, libre de errores o libre de componentes dañinos.
      </Paragraph>

      <SectionTitle>7. Limitación de Responsabilidad</SectionTitle>
      <Paragraph>
        En la máxima medida permitida por la ley aplicable, Narvaez Digital Marketing no será responsable por daños indirectos, incidentales, especiales, consecuentes o punitivos, ni por pérdida de beneficios, datos o buena voluntad, que surjan de o en conexión con tu uso del Sitio Web.
      </Paragraph>
      <Paragraph>
        Nuestra responsabilidad total por cualquier reclamación derivada de estos Términos o tu uso del Sitio Web no excederá $100 USD.
      </Paragraph>

      <SectionTitle>8. Indemnización</SectionTitle>
      <Paragraph>
        Aceptas indemnizar y mantener indemne a Narvaez Digital Marketing, su propietario y sus contratistas de cualquier reclamación, daño, pérdida o gasto (incluidos honorarios razonables de abogados) que surjan de tu uso del Sitio Web o violación de estos Términos.
      </Paragraph>

      <SectionTitle>9. Ley Aplicable y Disputas</SectionTitle>
      <Paragraph>
        Estos Términos se rigen por las leyes del Estado de Washington, Estados Unidos, sin considerar principios de conflicto de leyes. Cualquier disputa derivada de estos Términos se resolverá en los tribunales ubicados en el Condado de King, Washington.
      </Paragraph>
      <Paragraph>
        Antes de iniciar cualquier procedimiento legal, aceptas intentar resolver las disputas de manera informal contactándonos en hello@narvaezcarlos.com. Haremos esfuerzos de buena fe para resolver cualquier problema en un plazo de 30 días.
      </Paragraph>

      <SectionTitle>10. Cambios en estos Términos</SectionTitle>
      <Paragraph>
        Podemos actualizar estos Términos periódicamente. Los cambios se publicarán en esta página con una fecha de revisión actualizada. Tu uso continuado del Sitio Web después de los cambios constituye la aceptación de los Términos revisados.
      </Paragraph>

      <SectionTitle>11. Divisibilidad</SectionTitle>
      <Paragraph>
        Si alguna disposición de estos Términos se considera inaplicable o inválida, dicha disposición se limitará o eliminará en la medida mínima necesaria, y las disposiciones restantes continuarán en pleno vigor y efecto.
      </Paragraph>

      <SectionTitle>12. Contacto</SectionTitle>
      <Paragraph>
        Para preguntas sobre estos Términos de Servicio, contáctanos:
      </Paragraph>
      <div className="text-graphite text-base leading-relaxed mb-4 pl-4 border-l-2 border-neutral-light">
        <p>Correo: <a href="mailto:hello@narvaezcarlos.com" className="link-underline text-charcoal">hello@narvaezcarlos.com</a></p>
        <p>Narvaez Digital Marketing</p>
        <p>1431 Jefferson Ave NE, Renton, WA 98056, Estados Unidos</p>
      </div>
    </>
  );
}
