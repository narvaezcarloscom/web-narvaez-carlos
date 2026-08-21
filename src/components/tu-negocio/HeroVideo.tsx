"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/*
  Video de fondo del hero. Tres clips de oficio encadenados en bucle.

  PROTOTIPO. El material es generado (fal.ai / Veo 3.1 Fast). La decision de si
  la regla de "cero stock, cero IA" de esta pagina admite una textura ambiental
  detras de un titular esta ABIERTA y es de Carlos. No publicar como final sin
  cerrarla. Ver la spec, §2 y §9.

  POR QUE DOS <video> Y NO UNO. Con un solo elemento hay que cambiarle el `src`
  en cada corte, y eso dispara `abort` + `emptied`: el elemento se queda un
  instante sin fotograma y asoma el poster. Un parpadeo cada 8 segundos, medido
  en el navegador, no en teoria. Con dos elementos apilados, el siguiente clip
  ya esta cargado y decodificado cuando le toca: el corte es un cruce de
  opacidad, no una recarga.

  LO QUE ESTE COMPONENTE TIENE QUE RESOLVER:

  1. PRIMER PINTADO. El poster es la capa base y esta siempre. Los videos
     entran encima cuando pueden reproducir. Nadie ve un hueco negro.

  2. PESO EN DATOS MOVILES. Esta pagina se abre de pie en una tienda. El
     segundo elemento no precarga nada hasta que el primero YA esta
     reproduciendo, asi que la primera pantalla cuesta un archivo, no dos.

  3. REDUCED MOTION. Con `prefers-reduced-motion: reduce` los videos no se
     montan: se queda el poster. Es la regla 1 de GSAP_MOTION.md y aplica igual
     aunque esto no sea GSAP.

  4. AHORRO DE DATOS. Se respeta `navigator.connection.saveData` y las
     conexiones lentas: poster y nada mas.
*/

const CLIPS = [
  "/tu-negocio/hero-techos.mp4",
  "/tu-negocio/hero-limpieza.mp4",
  "/tu-negocio/hero-jardineria.mp4",
];

const POSTER = "/tu-negocio/hero-poster.jpg";

/** Debe coincidir con `duration-1000` de la clase del <video>. */
const CRUCE_MS = 1000;

type Conexion = { saveData?: boolean; effectiveType?: string };

export default function HeroVideo() {
  const [reproducir, setReproducir] = useState(false);
  const [arrancado, setArrancado] = useState(false);
  const [activo, setActivo] = useState(0);
  /*
    Los dos clips montados y cual toca despues, TODO en un mismo estado.

    El contador vivia en un `useRef` que se incrementaba dentro del updater de
    `setState`. React en modo estricto invoca ese updater dos veces, asi que el
    contador avanzaba de dos en dos y `jardineria` no se reproducia nunca —
    verificado en el navegador, no deducido. Peor: en produccion, sin modo
    estricto, el comportamiento habria sido otro.

    Este updater es puro: llamarlo dos veces con el mismo `prev` da el mismo
    resultado. No meter refs mutables aqui.
  */
  const [cola, setCola] = useState({ a: 0, b: 1, proximo: 2 });

  const refA = useRef<HTMLVideoElement>(null);
  const refB = useRef<HTMLVideoElement>(null);
  const temporizadores = useRef<number[]>([]);

  // Sin esto, un cambio de fuente puede dispararse despues de desmontar.
  useEffect(() => {
    const pendientes = temporizadores;
    return () => pendientes.current.forEach(window.clearTimeout);
  }, []);

  useEffect(() => {
    // El poster no es un estado de carga: para estos casos es el resultado.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const nav = navigator as Navigator & { connection?: Conexion };
    const c = nav.connection;
    if (c?.saveData) return;
    if (c?.effectiveType && ["slow-2g", "2g", "3g"].includes(c.effectiveType)) return;

    setReproducir(true);
  }, []);

  useEffect(() => {
    if (!reproducir) return;
    refA.current?.play().catch(() => {
      // Autoplay bloqueado por el navegador: nos quedamos con el poster.
      // No es un error, es una politica del dispositivo.
    });
  }, [reproducir]);

  const alTerminar = useCallback(
    (indice: number) => {
      if (indice !== activo) return;

      const otro = indice === 0 ? 1 : 0;
      const v = otro === 0 ? refA.current : refB.current;
      if (v) {
        v.currentTime = 0;
        v.play().catch(() => {});
      }
      setActivo(otro);

      /*
        El cambio de fuente espera a que TERMINE el cruce.

        Cambiarla de una deja al elemento saliente sin fotograma mientras
        todavia se ve a media opacidad: el hueco aparece a mitad del cruce, que
        es justo lo que los dos <video> existen para evitar. Medido en el
        navegador. CRUCE_MS tiene que seguir a `duration-1000` de la clase.
      */
      const t = window.setTimeout(() => {
        setCola((prev) => ({
          a: indice === 0 ? prev.proximo % CLIPS.length : prev.a,
          b: indice === 1 ? prev.proximo % CLIPS.length : prev.b,
          proximo: prev.proximo + 1,
        }));
      }, CRUCE_MS);
      temporizadores.current.push(t);
    },
    [activo]
  );

  const clase = (indice: number) =>
    `absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 motion-reduce:transition-none ${
      reproducir && activo === indice ? "opacity-100" : "opacity-0"
    }`;

  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      {/* Capa base: siempre presente, nunca hay hueco. */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${POSTER})` }}
      />

      {reproducir && (
        <>
          <video
            ref={refA}
            className={clase(0)}
            src={CLIPS[cola.a]}
            muted
            playsInline
            preload="auto"
            onPlaying={() => setArrancado(true)}
            onEnded={() => alTerminar(0)}
          />
          <video
            ref={refB}
            className={clase(1)}
            src={CLIPS[cola.b]}
            muted
            playsInline
            // No pide un byte hasta que el primero ya esta en pantalla.
            preload={arrancado ? "auto" : "none"}
            onEnded={() => alTerminar(1)}
          />
        </>
      )}

      {/*
        VELO DE LEGIBILIDAD — y por que va en `style` y no en clases Tailwind.

        La primera version usaba `bg-gradient-to-r from-charcoal/85 ...`. No
        pintaba nada: en este proyecto `charcoal` NO es un token de Tailwind.
        El bloque `@theme` de globals.css solo declara `narvaez-red`;
        `.bg-charcoal` y `.text-charcoal` son clases escritas a mano con
        `!important`, y una clase a mano no genera las variantes con opacidad
        (`bg-charcoal/85`) ni los pasos de degradado. Medido en el navegador:
        `backgroundImage` daba `none`. El texto se leia por suerte de la
        imagen, no por diseno.

        Con valores literales el velo no depende de que exista un token. Va
        oscuro en los dos temas a proposito: el hero tiene que verse igual en
        el telefono de cualquier desconocido.

        EL REPARTO NO ES SIMETRICO, y responde al encuadre:
          - Izquierda: el sujeto, bajo el titular display. Tipografia grande
            aguanta fondo con detalle, asi que se veila menos y la cara se ve.
          - Derecha: cielo y follaje, bajo el parrafo y el CTA. Texto chico
            necesita mas proteccion, asi que ahi cierra mas.
        En movil el contenido se ancla abajo, asi que ademas cierra por abajo.
      */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to right, rgba(20,20,20,0.62) 0%, rgba(20,20,20,0.66) 45%, rgba(20,20,20,0.80) 100%)",
        }}
      />
      <div
        className="absolute inset-0 md:hidden"
        style={{
          background:
            "linear-gradient(to bottom, rgba(20,20,20,0.10) 0%, rgba(20,20,20,0.35) 55%, rgba(20,20,20,0.62) 100%)",
        }}
      />
    </div>
  );
}
