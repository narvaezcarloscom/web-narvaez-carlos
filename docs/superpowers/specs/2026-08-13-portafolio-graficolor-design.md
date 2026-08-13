# Landing de portafolio para el mostrador de Graficolor Printing

**Fecha:** 2026-08-13
**Ruta:** `/portafolio`
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
| Dominio | **`narvaezcarlos.com/portafolio`** | No se compra dominio nuevo. La URL menciona un nombre que al cliente no le dice nada; el costo y la infraestructura de un dominio neutro no se justifican para un piloto de un solo punto de venta. |
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

`/portafolio` es una ruta propia bajo `src/app/`, **fuera** del segmento
`[lang]`. Hermana estructural de `/emprendedor`, que ya usa este patrón.

No colisiona con nada: el portafolio público del sitio vive en `/work` y
`/es/work`.

### 3.2 Los cuatro candados de no-indexado

Los cuatro, no uno. Cada uno cubre un vector distinto:

1. **`robots: { index: false, follow: false }`** en el `metadata` del layout —
   le habla al crawler que ya llegó a la página.
2. **`/portafolio` en `PRIVATE_PATHS`** de `src/app/robots.ts` — le habla al
   crawler antes de que llegue. El array ya alimenta las tres reglas del archivo
   (`*`, bots de IA que citan, bots de entrenamiento), así que basta agregarlo
   una vez.
3. **Exclusión del `matcher`** en `src/middleware.ts` — sin esto, el middleware
   reescribe `/portafolio` a `/en/portafolio` y la ruta rompe. El matcher ya
   excluye `emprendedor`; se agrega `portafolio` al mismo grupo.
4. **Ausencia del `sitemap.ts`** — el sitemap enumera rutas explícitamente, no
   las descubre. Basta con no agregarla. Se documenta aquí para que nadie la
   agregue "por completitud" en el futuro.

Además: **ninguna página del sitio enlaza a `/portafolio`**. El único camino de
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

**Los 8 candidatos** (rubro y ciudad se confirman al capturar cada sitio):

| id | Sitio | Rubro aproximado |
|---|---|---|
| `spm-services` | spmservicesllc.com | Servicios generales |
| `191-construction` | 191construction.com | Construcción |
| `north-beam-framing` | northbeamframing.com | Enmarcado estructural |
| `big-house-gc` | bighousegcllc.com | Contratista general |
| `angle-stone` | anglestonellc.com | Piedra y encimeras |
| `ceja-paint` | cejapaint.com | Pintura |
| `latinus-foods` | latinusfoods.com | Food truck |
| `shark-bite-ceviches` | sharkbiteceviches.com | Comida |

### 3.4 Layout autónomo — `src/app/portafolio/layout.tsx`

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

### 3.5 Componentes — `src/components/portafolio/`

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

### 3.6 Página — `src/app/portafolio/page.tsx`

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

**Destino:** `/public/portafolio/<id>.<ext>`

**Formato:** se captura PNG. La conversión a `.webp` es deseable pero no
bloqueante — Vercel Image Optimization sirve WebP/AVIF en tiempo de respuesta
sin importar el formato fuente. Si hay `cwebp` o equivalente disponible, se
convierte; si no, se entrega PNG y lo que recibe el usuario es idéntico.

**Render:** `next/image` con `width`/`height` explícitos y `sizes` responsive.
Las primeras 4 tarjetas van con `priority` para que el above-the-fold entre
rápido con datos móviles; las otras 4 con carga diferida.

**Punto de control:** después de capturar las 8, se presentan juntas para
curaduría antes de armar la página. Un sitio que no represente bien el trabajo
sale.

## 5. Medición

| Señal | Cómo |
|---|---|
| Visitas | Vercel Analytics (automático, sin cookies) |
| Qué sitio abren | Evento `showcase_click` con prop `site: <id>` |
| Origen del escaneo | El QR impreso apunta a `/portafolio?ref=graficolor` |

El parámetro `ref` no lo lee ningún código: es una marca de origen para lectura
humana en los logs, y cuesta cero ponerla.

**Advertencia:** Vercel Web Analytics agrupa las visitas por ruta y no garantiza
desglose por query string. Mientras Graficolor sea el único punto de venta esto
da igual, porque todo el tráfico de `/portafolio` viene del QR. Si mañana se
imprime el mismo QR en otro lado y hace falta separar fuentes de verdad, la
forma confiable es una ruta distinta (`/portafolio/g`), no un parámetro. No se
construye ahora — se anota para no descubrirlo tarde.

## 6. Verificación

Antes de dar esto por terminado:

1. `npm run build` pasa sin errores ni warnings nuevos.
2. `npm run lint` limpio.
3. `curl` a la ruta muestra los 8 nombres y rubros en el HTML sin ejecutar JS
   (regla SSR-first del proyecto).
4. El HTML servido contiene `<meta name="robots" content="noindex, nofollow">`.
5. `/robots.txt` en el deploy incluye `/portafolio` en el `Disallow` de las tres
   reglas.
6. `/sitemap.xml` **no** contiene `/portafolio`.
7. `/portafolio` responde 200 y **no** redirige a `/en/portafolio`.
8. Ningún `<a>` del sitio principal apunta a `/portafolio`.
9. Inspección visual en 375px y 1440px: sin scroll horizontal, tarjetas
   legibles, área de toque cómoda en móvil.
10. Las 8 tarjetas abren el sitio correcto en pestaña nueva.

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
