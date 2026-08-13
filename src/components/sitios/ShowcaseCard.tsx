import Image from "next/image";
import type { ShowcaseSite } from "../../lib/showcase";

interface ShowcaseCardProps {
  site: ShowcaseSite;
  /**
   * Las primeras tarjetas cargan con prioridad: son el above-the-fold de un
   * celular con datos moviles, que es el unico escenario real de esta pagina.
   */
  priority?: boolean;
}

export default function ShowcaseCard({ site, priority = false }: ShowcaseCardProps) {
  return (
    <a
      href={site.url}
      target="_blank"
      // Sin `noopener` el sitio destino recibe acceso a window.opener.
      rel="noopener noreferrer"
      data-track-event="showcase_click"
      data-track-prop-site={site.id}
      className="group block"
    >
      {/*
        16:9 no es decorativo: las capturas se recortaron a esa proporcion
        porque a 1440x900 casi todos los sitios dejaban asomar una franja de la
        seccion siguiente (una barra a medio cortar, una fila de iconos, el
        titulo del bloque de abajo). Recortar arriba corta el hero justo donde
        termina. Si se agrega un sitio nuevo, su captura va a 1440x810.
      */}
      <div className="relative aspect-video overflow-hidden rounded-sm bg-[var(--bg-secondary)] ring-1 ring-[var(--border-color)]">
        <Image
          src={site.image}
          alt={`Sitio web de ${site.name}`}
          fill
          sizes="(max-width: 767px) 50vw, (max-width: 1023px) 33vw, 25vw"
          priority={priority}
          className="object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.03]"
        />
      </div>

      <h2 className="mt-4 font-serif text-lg md:text-xl editorial-heading text-charcoal group-hover:text-narvaez-red transition-colors duration-300">
        {site.name}
      </h2>
      <p className="mt-1 text-xs md:text-sm text-[var(--text-muted)]">
        {site.industry} · {site.location}
      </p>
    </a>
  );
}
