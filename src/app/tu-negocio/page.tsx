import NegocioAttribution from "../../components/tu-negocio/NegocioAttribution";
import NegocioHero from "../../components/tu-negocio/NegocioHero";
import NegocioPuertas from "../../components/tu-negocio/NegocioPuertas";
import NegocioPrueba from "../../components/tu-negocio/NegocioPrueba";
import NegocioPaquetes from "../../components/tu-negocio/NegocioPaquetes";
import NegocioBase from "../../components/tu-negocio/NegocioBase";
import NegocioProceso from "../../components/tu-negocio/NegocioProceso";
import NegocioCTA from "../../components/tu-negocio/NegocioCTA";
import WhatsAppSticky from "../../components/tu-negocio/WhatsAppSticky";

/*
  Orden deliberado. La PRUEBA va tercera, antes de los precios: en frio la
  credibilidad va antes que la oferta. Nadie lee precios de un desconocido.
*/
export default function TuNegocioPage() {
  return (
    <div className="relative">
      <NegocioAttribution />
      <WhatsAppSticky />
      <NegocioHero />
      <NegocioPuertas />
      <NegocioPrueba />
      <NegocioPaquetes />
      <NegocioBase />
      <NegocioProceso />
      <NegocioCTA />
    </div>
  );
}
