# Landing de portafolio para el mostrador de Graficolor Printing

**Fecha:** 2026-08-13
**Ruta:** `/sitios`
**Estado:** diseño aprobado, pendiente de plan de implementación

---

## 1. Problema

Javier, de Graficolor Printing, atiende clientes en su mostrador y va a referir
trabajo de sitios web al estudio. Ya existe un banner impreso en la oficina con
un código QR ("ESCANEA PARA VER NUESTRO TRABAJO"). Falta la página que ese QR
abre.

El público es dueño de negocio de servicios en Washington — contratista,
enmarcador, pintor, food truck. Está de pie frente a un mostrador, con el
celular en la mano, con poco tiempo y probablemente con datos móviles. La página
tiene que cargar rápido, verse bien en un teléfono cualquiera y comunicar una
sola cosa: *estos son sitios reales de negocios como el tuyo*.

## 2. Decisiones tomadas

Cada una se decidió explícitamente antes de escribir este documento.

| Decisión | Elección | Por qué |
|---|---|---|
| Conversión | **Sin CTA de captura** | Javier cierra. La página es material de venta, no un formulario. Un CTA propio competiría con él como primer contacto. |
| Marca | **Neutral, sin marca visible** | Marca blanca en el sentido operativo: nada en la página debe estorbarle a Javier para cerrar con el cliente. Ni isotipo NDM, ni logo Graficolor, ni firma. |
| Dominio | **`narvaezcarlos.com/sitios`** | No se compra dominio nuevo. La URL menciona un nombre que al cliente no le dice nada; el costo y la infraestructura de un dominio neutro no se justifican para un piloto de un solo punto de venta. |
| Acuerdo comercial | **Referido** | Javier presenta, el cliente dice que sí, Javier conecta. El estudio cierra y factura. No es reventa, así que no hace falta contrato de subcontratación para lanzar esto. |
| Estructura | **Grilla editorial** | 8 tarjetas escaneables de un vistazo. Descartada la lista vertical grande: 8 scrolls largos no los completa alguien parado en un mostrador. |
| Curaduría | **Se decide viendo las capturas** | Se capturan los 8, Carlos revisa juntos, saca los que no representen bien el trabajo antes de armar la página. |
| Idioma | **Español únicamente** | El público de Graficolor es hispanohablante. Español neutral LATAM. |

### Riesgo aceptado explícitamente

Sin CTA, la única señal medible es *cuántos escanearon y qué miraron*. El cierre
solo se ve cuando Javier escribe. Es una decisión consciente, no un descuido: si
en tres meses el tráfico existe pero los referidos no, la hipótesis a revisar es
la conversación de mostrador, no la página.

## 3. Arquitectura

### 3.1 Ruta y aislamiento

`/sitios` es una ruta propia bajo `src/app/`, **fuera** del segmento
`[lang]`. Hermana estructural de `/emprendedor`, que ya usa este patrón.

**Por qué `/sitios` y no `/portafolio`.** El diseño original pedía
`/portafolio`. No sirve: `next.config.ts` arrastra un redirect heredado de la
época de WordPress, `/portafolio → /work`, **permanente (301)**.

Borrar la regla no arregla nada. Un 301 lo cachea el navegador de forma
indefinida: cualquiera que haya visitado esa URL alguna vez tiene guardado
"esto va a /work" y su celular no vuelve a preguntarle al servidor. La URL está
quemada como destino de esta landing, sin importar qué diga el código.

Borrarla además tendría costo: cualquier enlace viejo que apunte a
`/portafolio` dejaría de llegar al portafolio real y caería en una página sin
marca y sin indexar.

`/sitios` está libre y no choca con ninguna de las ~30 reglas heredadas. El
portafolio público del sitio sigue viviendo en `/work` y `/es/work`.

### 3.2 Los cuatro candados de no-indexado

Los cuatro, no uno. Cada uno cubre un vector distinto:

1. **`robots: { index: false, follow: false }`** en el `metadata` del layout —
   le habla al crawler que ya llegó a la página.
2. **`/sitios` en `PRIVATE_PATHS`** de `src/app/robots.ts` — le habla al
   crawler antes de que llegue. El array ya alimenta las tres reglas del archivo
   (`*`, bots de IA que citan, bots de entrenamiento), así que basta agregarlo
   una vez.
3. **Exclusión del `matcher`** en `src/middleware.ts` — sin esto, el middleware
   reescribe `/sitios` a `/en/sitios` y la ruta rompe. El matcher ya
   excluye `emprendedor`; se agrega `portafolio` al mismo grupo.
4. **Ausencia del `sitemap.ts`** — el sitemap enumera rutas explícitamente, no
   las descubre. Basta con no agregarla. Se documenta aquí para que nadie la
   agregue "por completitud" en el futuro.

Además: **ninguna página del sitio enlaza a `/sitios`**. El único camino de
entrada es el QR impreso.

### 3.3 Datos — `src/lib/showcase.ts`

Archivo nuevo, un solo propósito. Forma de cada entrada:

```ts
export type ShowcaseSite = {
  id: string;        // slug estable, usado en el nombre de archivo y en el evento
  name: string;      // nombre comercial tal como lo usa el negocio
  url: string;       // URL pública, con https://
  industry: string;  // rubro en español neutro — "Construcción general"
  location: string;  // ciudad y estado — "Renton, WA"
  image: string;     // ruta bajo /public
};
```

**Por qué no se reutiliza `projects.ts`:** solo 2 de los 8 sitios están ahí
(Angle Stone y Latinus), y ese archivo carga campos de case study — `challenge`,
`solution`, `results`, `pullQuote`, `clientLocation` para JSON-LD — que aquí no
tienen uso. Meter estos 8 ahí obligaría a llenar campos vacíos o a hacer los
existentes opcionales, degradando un tipo que hoy es estricto. Además `projects.ts`
alimenta el sitemap público: cualquier entrada nueva ahí aparecería indexada, que
es exactamente lo contrario de lo que esta página necesita.

Los textos van en `string` plano, no `LocaleText`. La página es monolingüe y el
tipo bilingüe solo agregaría ruido.

**Los 8 sitios**, en el orden en que se renderizan. Rubro y ciudad verificados
en cada sitio el 2026-08-13, no inferidos del dominio.

| # | id | Rubro | Dónde |
|---|---|---|---|
| 1 | `big-house-gc` | Pintura, techos y siding | Renton, WA |
| 2 | `north-beam-framing` | Enmarcado de madera | Seattle, WA |
| 3 | `angle-stone` | Paisajismo y mampostería | Federal Way, WA |
| 4 | `ceja-paint` | Pintura residencial | Seattle, WA |
| 5 | `shark-bite-ceviches` | Ceviches y mariscos | Seattle, WA |
| 6 | `spm-services` | Concreto comercial e industrial | Oklahoma |
| 7 | `191-construction` | Concreto industrial | Houston, TX |
| 8 | `latinus-foods` | Comida venezolana | Utah |

**El orden es una decisión, no el resultado de una lista.** Las primeras cuatro
tarjetas son lo único que ve alguien en un celular antes de hacer scroll, y
quien escanea este QR está parado en Renton. Si esas cuatro dicen Renton,
Seattle, Seattle, Seattle, el mensaje es *"esto es de aquí, gente como yo"*. Si
la primera dice Oklahoma, el mensaje es *"esto es de otro lado"* — y se pierde
el reconocimiento que hace que el cliente le pregunte a Javier.

Los tres de fuera del estado no son relleno. Puestos después de los locales
dejan de leerse como "no son de aquí" y pasan a leerse como alcance. Es la
misma información contando una historia distinta según el orden.

Angle Stone va tercero y no último por una razón de conjunto: es el más
atractivo de los ocho y levanta la percepción de todo lo que lo rodea.

### 3.4 Layout autónomo — `src/app/sitios/layout.tsx`

**No usa `Navbar` ni `Footer` compartidos.** Esos componentes llevan el isotipo,
el copyright del estudio y los links legales; cualquiera de los tres rompe la
neutralidad.

Lo que el layout **sí** monta:
- Las fuentes del sistema (Instrument Serif + Mulish) — la neutralidad es de
  marca, no de calidad; el diseño sigue siendo bueno.
- `<Analytics />` de Vercel.
- `<AnalyticsEvents />` para los eventos de clic.
- `metadata` con `title` neutro y `robots: { index: false, follow: false }`.

Lo que el layout **no** monta, y por qué:

| Omitido | Razón |
|---|---|
| `Navbar` / `Footer` | Llevan marca. |
| GTM | Pone cookies de terceros. |
| Microsoft Clarity | Igual, y llega vía GTM. |
| `CookieBanner` | Sin cookies de terceros, no hay nada que consentir. |
| `ThemeToggle` y el script de tema | La página debe verse idéntica en el celular de cualquier desconocido. Siempre claro. |
| `SpeedInsights` | No aporta a una página de un solo componente; se puede agregar después si hace falta. |
| `opengraph-image` | Nadie va a compartir esto en redes. Es una página de mostrador. |

**Consecuencia deliberada:** al no cargar GTM ni Clarity, la página no pone
cookies de terceros. Sin cookies no hace falta banner de consentimiento ni links
a la política de privacidad — que es justo lo que se necesitaba, porque esos
links llevan el nombre del estudio. La neutralidad de marca y el cumplimiento de
privacidad apuntan en la misma dirección; no hay que negociar entre las dos.

Verificado en el código: `AnalyticsEvents.tsx` usa `track()` de
`@vercel/analytics`, no `dataLayer`. Los eventos funcionan sin GTM.

### 3.5 Componentes — `src/components/sitios/`

**`ShowcaseGrid.tsx`** (server component)
Recibe el array de sitios y renderiza la grilla. 2 columnas en móvil, 3 en
tablet, 4 en desktop. Sin estado, sin `"use client"`.

**`ShowcaseCard.tsx`** (server component)
Recibe un `ShowcaseSite`. Renderiza un `<a>` que envuelve la tarjeta completa —
el área de toque es toda la tarjeta, no solo el texto, porque el usuario tiene
un pulgar y prisa.

```
<a href={url} target="_blank" rel="noopener noreferrer"
   data-track-event="showcase_click"
   data-track-prop-site={id}>
  <Image ... />
  <h2>{name}</h2>
  <p>{industry} · {location}</p>
</a>
```

`rel="noopener noreferrer"` no es opcional: `target="_blank"` sin él le da al
sitio destino acceso a `window.opener`.

Ambos reusan `Container` y los tokens de Tailwind del design system existente.

### 3.6 Página — `src/app/sitios/page.tsx`

Server component estático. Encabezado + grilla. Nada más.

**Copy** (español neutral LATAM):

> ## Sitios web para negocios de servicios
>
> Todos estos son sitios reales, en línea hoy. Toca cualquiera para verlo.

El `<title>` de la pestaña es el mismo encabezado, sin sufijo de estudio.

## 4. Imágenes

**Captura:** Playwright, viewport 1440×900, above-the-fold, mismo encuadre para
las 8. Encuadre consistente es lo que hace que la grilla se lea como un sistema
y no como ocho capturas sueltas.

**Recorte a 16:9 (1440×810).** A 900px de alto casi todos los sitios dejaban
asomar una franja de la sección siguiente: una barra a medio cortar en 191
Construction, una fila de iconos en Ceja Paint, el titular del bloque de abajo
en Shark Bite. Cada una parecía un defecto distinto; el problema era uno solo.
Recortar los 810px de arriba corta el hero justo donde termina, en los ocho.
**Toda captura nueva va a 1440×810.**

Excepción registrada: SPM Services se captura con `scrollTo(0, 250)`. Su tarjeta
de hero queda partida a la mitad desde el tope de la página, y a diferencia de
las franjas de abajo eso sí se lee como error de render. Su header es `sticky`,
así que el logo y la navegación siguen en cuadro.

**Destino:** `/public/sitios/<id>.webp`

**Formato:** captura PNG → `cwebp -q 78`. Las ocho pesan ~580 KB juntas. Vercel
Image Optimization sirve WebP/AVIF en tiempo de respuesta de todos modos, así
que el formato fuente importa poco; el WebP en repo es para no cargar 8 MB de
PNG al git.

**Render:** `next/image` con `fill` dentro de un contenedor `aspect-video`, más
`sizes` responsive. Las primeras 4 tarjetas van con `priority` para que el
above-the-fold entre rápido con datos móviles; las otras 4 con carga diferida.

**Punto de control:** después de capturar las 8, se presentan juntas para
curaduría antes de armar la página. Un sitio que no represente bien el trabajo
sale. *Resultado del 2026-08-13: las 8 entran, ninguna se descartó.*

## 5. Medición

| Señal | Cómo |
|---|---|
| Visitas | Vercel Analytics (automático, sin cookies) |
| Qué sitio abren | Evento `showcase_click` con prop `site: <id>` |
| Origen del escaneo | El QR impreso apunta a `/sitios?ref=graficolor` |

El parámetro `ref` no lo lee ningún código: es una marca de origen para lectura
humana en los logs, y cuesta cero ponerla.

**Advertencia:** Vercel Web Analytics agrupa las visitas por ruta y no garantiza
desglose por query string. Mientras Graficolor sea el único punto de venta esto
da igual, porque todo el tráfico de `/sitios` viene del QR. Si mañana se
imprime el mismo QR en otro lado y hace falta separar fuentes de verdad, la
forma confiable es una ruta distinta (`/sitios/g`), no un parámetro. No se
construye ahora — se anota para no descubrirlo tarde.

## 6. Verificación

Corrida contra `npm start` (build de producción) el 2026-08-13:

| # | Comprobación | Resultado |
|---|---|---|
| 1 | `npm run build` sin errores ni warnings nuevos | ✅ `/sitios` prerenderizada estática |
| 2 | `npm run lint` | ✅ 0 errores (2 warnings preexistentes en `Hero.tsx` y `ParallaxImage.tsx`, ajenos a este trabajo) |
| 3 | Los 8 nombres, rubros y ciudades en el HTML sin ejecutar JS | ✅ los 8 |
| 4 | `<meta name="robots" content="noindex, nofollow">` | ✅ presente |
| 5 | `/robots.txt` lista `/sitios` en `Disallow` | ✅ en las 2 reglas que enumeran rutas (la tercera, la de bots de entrenamiento, es `Disallow: /` y no enumera) |
| 6 | `/sitemap.xml` **no** contiene `/sitios` | ✅ 0 coincidencias |
| 7 | `/sitios` responde 200 y no redirige | ✅ 200, 0 redirects |
| 8 | Ningún `<a>` del sitio apunta a `/sitios` | ✅ 0 enlaces |
| 9 | Inspección visual a 375px y 1440px | ✅ sin scroll horizontal, tarjeta completa como área de toque |
| 10 | Sin GTM, Clarity ni links legales en el HTML | ✅ 0 coincidencias |

**Único rastro de marca en el código fuente:** la clase CSS
`group-hover:text-narvaez-red` en `ShowcaseCard.tsx`. Es un nombre de clase de
Tailwind, no aparece en pantalla, y en un dispositivo táctil el `hover` ni
siquiera se dispara. Se deja a propósito: la neutralidad pedida es operativa
—que nada estorbe a Javier para cerrar— no forense. Queda anotado para que
nadie afirme "cero rastros" sin matiz.

**Errores de consola en local:** dos, ambos de `_vercel/insights/script.js`
(404). Vercel Analytics no existe fuera de un deploy de Vercel. Se resuelven
solos al desplegar; no indican nada roto.

## 7. Fuera de alcance

Explícitamente no se construye ahora:

- Formulario de captura o botón de WhatsApp (decisión de diseño, no omisión).
- Versión en inglés.
- Página de detalle por sitio — cada tarjeta va al sitio real, no a un case study.
- Dominio neutro propio o subdominio de Graficolor. Se reconsidera si el piloto
  funciona o si el acuerdo pasa de referido a reventa.
- Contrato escrito con Javier. No lo necesita un acuerdo de referido para
  arrancar; sí lo necesitaría una reventa.
- Rediseño del banner impreso.
