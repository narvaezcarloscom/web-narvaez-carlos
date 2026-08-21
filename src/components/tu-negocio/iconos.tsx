/*
  Iconos de la seccion "Lo que va siempre".

  REGLAS QUE LOS HACEN PERTENECER AL SISTEMA, no adornarlo:

  - TRAZO, NUNCA RELLENO. `strokeWidth` 1.5, el mismo de `DiagonalSlash`. Un
    icono relleno pesa como un logotipo y compite con la tipografia editorial.
  - `currentColor`. El color lo pone quien los usa, asi siguen al tema claro y
    oscuro sin tocar este archivo.
  - NUNCA EN ROJO. El rojo es señal de accion en esta pagina (`UI_QUALITY.md`
    §9). Seis puntos rojos en una grilla de servicios lo gastan y el boton de
    WhatsApp deja de destacar.
  - `aria-hidden`. El titulo que va debajo ya nombra la cosa; anunciarlos dos
    veces solo estorba con lector de pantalla.
  - Cuadricula de 24 y esquinas de 1px de radio, para que los seis se lean como
    una familia y no como seis descargas sueltas.
*/

type Props = { className?: string };

const base = {
  width: 28,
  height: 28,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

/** Dominio a tu nombre — globo con meridiano y paralelo. */
export function IconoDominio({ className }: Props) {
  return (
    <svg {...base} className={className}>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18" />
      <path d="M12 3c2.4 2.5 3.7 5.6 3.7 9s-1.3 6.5-3.7 9c-2.4-2.5-3.7-5.6-3.7-9S9.6 5.5 12 3z" />
    </svg>
  );
}

/** Hosting y respaldo — dos bandejas de servidor apiladas. */
export function IconoHosting({ className }: Props) {
  return (
    <svg {...base} className={className}>
      <rect x="3" y="4.5" width="18" height="6" rx="1" />
      <rect x="3" y="13.5" width="18" height="6" rx="1" />
      <path d="M6.5 7.5h.01" />
      <path d="M6.5 16.5h.01" />
    </svg>
  );
}

/** Correo con el nombre de tu negocio — sobre. */
export function IconoCorreo({ className }: Props) {
  return (
    <svg {...base} className={className}>
      <rect x="3" y="5" width="18" height="14" rx="1" />
      <path d="M3.5 6.5l8.5 6 8.5-6" />
    </svg>
  );
}

/** En ingles y en espanol — dos globos de dialogo conversando. */
export function IconoBilingue({ className }: Props) {
  return (
    <svg {...base} className={className}>
      {/*
        Los dos globos NO se solapan. La primera version los montaba uno sobre
        otro y a 28px se empastaban en una mancha: con solo trazo, sin relleno
        que tape, el de atras se ve cruzar al de adelante. Separados en diagonal
        se leen como dos, y de paso el eje repite la diagonal del sistema.
      */}
      <rect x="2" y="4" width="10.5" height="7" rx="1.5" />
      <path d="M5 11v2.6L8 11" />
      <rect x="12.5" y="12" width="9.5" height="6.5" rx="1.5" />
      <path d="M19 18.5V21l-3-2.5" />
    </svg>
  );
}

/** Formulario con resguardo — escudo con marca de verificacion. */
export function IconoResguardo({ className }: Props) {
  return (
    <svg {...base} className={className}>
      <path d="M12 3l7 2.8v5c0 4.5-2.9 8.3-7 10.2-4.1-1.9-7-5.7-7-10.2v-5L12 3z" />
      <path d="M9 11.8l2.1 2.1 4-4.1" />
    </svg>
  );
}

/** Base tecnica de busqueda local — marcador de mapa. */
export function IconoLocal({ className }: Props) {
  return (
    <svg {...base} className={className}>
      <path d="M12 21.2c4.3-3.9 6.5-7.3 6.5-10.3a6.5 6.5 0 1 0-13 0c0 3 2.2 6.4 6.5 10.3z" />
      <circle cx="12" cy="10.6" r="2.4" />
    </svg>
  );
}
