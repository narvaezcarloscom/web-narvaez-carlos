import { getDictionary, type Locale } from "../../lib/i18n";
import Hero from "../../components/Hero";
import ServicesSection from "../../components/ServicesSection";
import WorkPreview from "../../components/WorkPreview";
import AboutPreview from "../../components/AboutPreview";

export default async function Home({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return (
    <>
      <Hero lang={lang} dict={dict} />
      <ServicesSection lang={lang} dict={dict} />
      <WorkPreview lang={lang} dict={dict} />
      <AboutPreview dict={dict} />
    </>
  );
}
