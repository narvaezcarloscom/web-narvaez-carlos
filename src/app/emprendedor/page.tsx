import EmprendedorHero from "../../components/emprendedor/EmprendedorHero";
import EmprendedorIncludes from "../../components/emprendedor/EmprendedorIncludes";
import EmprendedorProcess from "../../components/emprendedor/EmprendedorProcess";
import EmprendedorCTA from "../../components/emprendedor/EmprendedorCTA";
import UtmAttribution from "../../components/emprendedor/UtmAttribution";

export default function EmprendedorPage() {
  return (
    <>
      <UtmAttribution />
      <EmprendedorHero />
      <EmprendedorIncludes />
      <EmprendedorProcess />
      <EmprendedorCTA />
    </>
  );
}
