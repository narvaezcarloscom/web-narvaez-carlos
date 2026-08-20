# Landing de captación directa para negocios de servicios latinos — `/tu-negocio`

**Fecha:** 2026-08-20
**Ruta:** `/tu-negocio`
**Estado:** construido y en revisión visual con Carlos (rama `feat/landing-tu-negocio`)
**Rama:** `feat/landing-tu-negocio`
**Fase:** 1 de 2. La hoja carta con QR es fase 2 y no se diseña aquí.

---

## 1. Problema

El estudio tiene dos landings de captación y ninguna sirve para esto.

| | Público | Quién cierra | Marca | Precios |
|---|---|---|---|---|
| `/emprendedor` | Quien está dando el primer paso (El Centro de la Raza) | El estudio, por formulario | NDM | No |
| `/sitios` | Cliente de mostrador de Graficolor | **Javier** | Ninguna (marca blanca) | No |
| **`/tu-negocio`** | **Contratista latino ya operando** | **La página, sola** | **NDM** | **Sí** |

El público de esta pieza no es el que empieza: es el que ya tiene clientes, ya
tiene camioneta y ya tiene el problema de que **le están pidiendo un sitio web
para poder trabajar**. Techos, limpieza, jardinería, construcción, pintura,
concreto — el negocio de servicios latino del área de Seattle.

Llega por un QR impreso en una hoja carta pegada en tiendas latinas que
autorizaron la colocación. Más adelante, por campañas de Meta o Google Ads.

**La diferencia operativa que manda sobre todo el diseño:** en `/sitios` no hay
CTA porque Javier cierra en el mostrador. Aquí **no hay Javier**. Es tráfico
frío, sin presentación y sin vendedor. La página cierra sola o no cierra.

## 2. Decisiones tomadas

Cada una se decidió explícitamente con Carlos antes de escribir este documento.

| Decisión | Elección | Por qué |
|---|---|---|
| Precios | **Visibles, los tres** | Tráfico frío sin vendedor. El precio filtra: quien no puede no escribe, quien sí llega calificado. El mismo mercado ya vio esos precios en el mostrador de Javier; esconderlos aquí crea inconsistencia entre canales. |
| CTA principal | **WhatsApp, con formulario secundario** | La persona está de pie en una tienda con el celular en la mano. WhatsApp es un toque; el formulario son seis campos. El formulario queda para quien prefiere escribir y es lo que deja dato estructurado. |
| Geografía | **King County / área de Seattle** | Ahí están las tiendas autorizadas. El spec de `/sitios` ya identificó la cercanía como el factor decisivo de reconocimiento: "esto es de aquí, gente como yo". |
| Indexado | **noindex en v1** | Consistente con las dos hermanas. Ni el QR ni los ads lo necesitan. Evita canibalizar `/services` y deja el copy 100% de conversión en vez de servir a dos amos. Se reconsidera si el nicho prueba. |
| Espina narrativa | **Las puertas cerradas** | Arranca por la presión externa (aseguradoras, financiadoras, bancos, IA). No compite contra "no tengo tiempo para eso" — compite contra "me lo están pidiendo". Descartadas: "donde te buscan" (discurso genérico de agencia, ya lo ignoró) y "el trabajo habla" (funciona en `/sitios` porque Javier argumenta; en frío deja al visitante sin razón para quedarse). |
| Titular | **Confrontativo** | "Te lo piden para trabajar. Ya no es opcional." Descartada la versión cálida del PDF ("Tu negocio ya existe...") — cierra bien una pieza impresa, pero no abre una página en frío. |
| Ruta | **`/tu-negocio`** | Libre: no choca con ninguna de las 36 reglas heredadas de WordPress en `next.config.ts`. Se lee bien como URL de display en Google Ads y se puede teclear. Descartadas `/contratistas` (excluye house cleaning) y `/negocios` (genérica, no dice nada). |
| Fotografía | **Cero stock, cero IA** | El PDF marca blanca usa contratistas generados. En una pieza de la marca del estudio eso contradice la tesis del estudio. La fotografía de esta página son los 12 sitios reales de clientes. |
| Idioma | **Español únicamente** | El flyer va en tiendas latinas. Español neutral LATAM. |
| Bloque oscuro | **Descartado (2026-08-20)** | Las cuatro puertas nacieron sobre charcoal a pantalla completa para cortar el scroll en dos. Carlos lo descartó al verlo construido: el salto de contraste era demasiado para el sistema del estudio. Va en ivory como el resto. El peso lo cargan la escala del titular y las reglas horizontales, no el fondo. **Consecuencia buscada:** el rojo queda reservado a los CTA, que es lo que pide la regla de acento como señal de `UI_QUALITY.md` §9. |

### 2.1 Consecuencia aceptada explícitamente: los precios se vuelven públicos

`canales/graficolor.md` dice hoy, literal: *"No es una oferta pública del
estudio"*, y de los tiers $1,200 y $1,600: *"gradúan al `catalogo-web.md` solo
si venden — mientras tanto se cotizan a mano"*.

Publicar los tres precios en una página de la marca del estudio **gradúa esos
dos tiers de facto**. Se acepta a propósito, con tres consecuencias:

1. `catalogo-web.md` y `canales/graficolor.md` quedan desactualizados en el
   momento en que esta página salga a producción. Hay que actualizarlos.
2. El catálogo público queda $600 / $800 / $1,200 / $1,600 / $2,500, con un
   **hueco de posicionamiento entre $1,600 y $2,500** que alguien va a hacer
   notar. La frontera está documentada (§4 de `graficolor.md`: el canal vende
   sistema, el $2,500 vende diseño) pero no está dicha de cara al público.
3. **Javier no queda socavado.** Vende al mismo precio y su comisión sale igual.
   Conviene decírselo antes de publicar, no después.

## 3. Estructura de la página

```
[barra sticky WhatsApp]  ← solo <768px, aparece después del hero

1  HERO             Titular + promesa + WhatsApp + ancla a paquetes
2  LAS CUATRO PUERTAS   Aseguradoras · Financiadoras · Bancos · IA
3  PRUEBA            Los 12 sitios reales de showcase.ts
4  LOS TRES PAQUETES Presencia $800 · Captación $1,200 · Crecimiento $1,600
5  LA BASE           Lo que va en los tres + la anualidad declarada de frente
6  PROCESO           4 pasos (ProcessDots existente)
7  CIERRE            WhatsApp + formulario
```

**Por qué la prueba va en la posición 3 y no al final.** En frío la
credibilidad va antes que la oferta. Nadie lee precios de un desconocido; lee
precios de alguien que ya le mostró trabajo. Es la corrección al orden clásico
de landing, y la razón por la que el bloque de 12 sitios sube al centro de la
página en vez de quedar de relleno abajo.

## 4. Copy completo

Español neutral LATAM, tuteo. Este es el texto a validar; no hay copy
"pendiente de escribir" en ninguna sección.

### 4.1 Hero

> `NEGOCIOS DE SERVICIOS · KING COUNTY, WA`
>
> # Te lo piden para trabajar. Ya no es opcional.
>
> Aseguradoras, financiadoras y bancos revisan si tu negocio existe en internet
> antes de decir que sí. Construimos el sitio que responde por ti — en inglés y
> en español.
>
> **[Escríbenos por WhatsApp]**  ·  Ver los paquetes ↓

### 4.2 Las cuatro puertas

> `POR QUÉ AHORA`
>
> ## Cuatro puertas que hoy se abren con un sitio web.

| | |
|---|---|
| **Aseguradoras** | Si te pidieron el sitio web para emitir o renovar la póliza y no lo tenías, ya sabes de qué hablamos. |
| **Financiadoras** | Piden antigüedad. Un sitio que lleva dos años en línea dice algo que una página de Facebook no dice. |
| **Bancos** | Correo con el nombre de tu negocio, no un `@gmail`. Es de las primeras cosas que miran al abrir la cuenta. |
| **Inteligencia artificial** | Cuando alguien le pregunta a ChatGPT por un techero en Kent, el modelo lee sitios web. Si el tuyo no existe, no hay nada que leer. |

> Ninguna de las cuatro es publicidad. Las cuatro son operación.

**Nota de compliance — leer antes de cambiar este copy.** El PDF marca blanca
afirma estos cuatro puntos como hechos ("Cada vez más compañías te piden tu
sitio web para emitir o renovar una póliza"). Aquí están reformulados como
**reconocimiento** —le describen al lector algo que ya le pasó— en vez de como
aserción sobre la industria. No es suavizar: para este público el
reconocimiento pega más fuerte que la estadística. Y evita una afirmación
publicitaria sin sustanciación en una página con la marca del estudio.
**Si se quiere la versión aseverativa, hace falta fuente citable.** El punto de
IA sí es aserción, y es verificable.

### 4.3 Prueba

> `TRABAJO REAL`
>
> ## Doce negocios como el tuyo. Todos en línea hoy.
>
> Toca cualquiera para verlo.

Reusa `showcase.ts` y el patrón de tarjeta de `/sitios`, incluido su orden
(cercanía primero, después variedad visual). El público es el mismo y está
parado en el mismo condado, así que el criterio de orden se hereda tal cual.

### 4.4 Los tres paquetes

> `LOS PAQUETES`
>
> ## Tres formas de empezar. La diferencia es lo que el sitio hace por ti.

**Presencia — $800**
> *Que te encuentren y te llamen.*
> - Sitio web de una página, bien hecho
> - En inglés y en español
> - Presentación del negocio y sus servicios
> - Formulario de contacto y botón de WhatsApp
> - Hasta 20 fotos tuyas
> - Ficha de Google Business, hecha contigo
> - 2 rondas de revisión
>
> Anualidad desde el segundo año: **$180**

**Captación — $1,200**
> *Que aparezcas cuando buscan en tu ciudad.*
> Todo lo de Presencia, más:
> - Varias páginas: Inicio, Servicios, Nosotros, Contacto
> - SEO local por ciudad — las ciudades donde de verdad trabajas
> - Sección de área de servicio
> - Preguntas frecuentes preparadas para que la IA las cite
> - Barra de confianza: licencia, años, seguro, cobertura
> - Sección de proceso y bloque de reseñas de Google
> - 3 rondas de revisión
>
> Anualidad desde el segundo año: **$200**

**Crecimiento — $1,600**
> *Que te lleguen solicitudes ya calificadas.*
> Todo lo de Captación, más:
> - Una página por cada servicio, hasta cinco
> - Formulario de presupuesto con detalle: tipo de trabajo, ciudad y plazo
> - El cliente te manda las fotos del trabajo desde su teléfono
> - Galería de proyectos
> - Segunda integración: agenda o WhatsApp Business
> - Hasta 40 fotos con curaduría
> - 3 rondas de revisión
>
> Anualidad desde el segundo año: **$220**

Línea única bajo las tres tarjetas:

> Estos son precios de lista. Pagando de contado el precio baja, y también hay
> plan a meses. Lo vemos en la conversación.

**Por qué esa línea y no "50% para comenzar, 50% al finalizar".** El motor
comercial fija el contado 50/50 en **$750 / $1,120 / $1,500** —es decir, con
descuento— y reserva $800 / $1,200 / $1,600 para el plan a meses. El PDF marca
blanca dice "$800 · 50% para comenzar, 50% al finalizar", que contradice al
motor. **Esa inconsistencia es del PDF, no de esta landing, y se corrige
allá.** Aquí se publica el precio de lista y se remite el desglose a la
conversación, que es lo único consistente con el motor sin llenar la página de
tablas de pago.

### 4.4.1 El CTA de cada paquete

Cada tarjeta cierra con su propio botón a WhatsApp, con el tier ya nombrado en
el mensaje. Es lo que convierte "me interesa" en una conversación que arranca
sabiendo de qué se habla, sin que la persona tenga que explicarse.

| Tier | Botón | Mensaje prellenado |
|---|---|---|
| Presencia | Preguntar por Presencia | `Hola, me interesa el paquete Presencia de $800.` |
| Captación | Preguntar por Captación | `Hola, me interesa el paquete Captación de $1,200.` |
| Crecimiento | Preguntar por Crecimiento | `Hola, me interesa el paquete Crecimiento de $1,600.` |

Los otros dos puntos de WhatsApp de la página usan un mensaje neutro:
`Hola, vi la página de sitios web para negocios de servicios.`

Número, verificado el 2026-08-20 contra el JSON-LD de `[lang]/layout.tsx` y
`/emprendedor/gracias`: **+1 206 981 7078** (`12069817078` en el `wa.me`).

Los tres botones de tier disparan `package_cta_click` con su prop `tier`; los
otros dos disparan `whatsapp_click` con su prop `position`. Un mismo clic no
dispara los dos eventos — el de tier ya implica el destino.

### 4.8 Página de gracias — `/tu-negocio/gracias`

Espeja `/emprendedor/gracias`, que ya existe y funciona. Sin formulario, sin
paquetes, sin volver a vender.

> ## Gracias, {nombre}.
>
> Recibimos tu mensaje. Te escribimos dentro de las próximas 24 horas.
>
> Si prefieres adelantar, escríbenos directo por WhatsApp.
>
> **[Escribir por WhatsApp]**

El nombre llega por query string, como en la hermana. Va en `PRIVATE_PATHS` y
hereda el `noindex` del layout. El botón dispara `whatsapp_click` con
`position: gracias`.

### 4.5 La base

> `EN LOS TRES PAQUETES`
>
> ## Lo que va siempre, sin importar cuál elijas.

- **Dominio a tu nombre** — Es tuyo. Lo administramos bajo resguardo, nunca como rehén.
- **Hosting y respaldo** — Tu sitio disponible y tu información protegida.
- **Correo con el nombre de tu negocio** — Uno, dos o tres según el paquete.
- **En inglés y en español** — No es un extra. Va incluido.
- **Formulario con resguardo** — Validación, consentimiento y protección contra spam.
- **Base técnica de búsqueda local** — Nombre, dirección y teléfono consistentes; velocidad y lectura en el teléfono cuidadas desde el primer día.

> ### La anualidad, dicha de frente.
> A partir del segundo año pagas $180, $200 o $220 al año según tu paquete.
> Cubre el dominio, el hosting, tus correos y el respaldo. No es letra chica:
> es lo que mantiene tu sitio vivo.

### 4.6 Proceso

> `CÓMO FUNCIONA`
>
> ## Cuatro pasos, sin sorpresas.

1. **Conversamos** — Nos cuentas qué haces y en qué ciudades trabajas. Te decimos qué paquete te sirve.
2. **Reunimos** — Fotos, servicios y accesos. Nosotros pulimos las palabras.
3. **Revisas en vivo** — Ves tu sitio funcionando antes de publicar y pides ajustes.
4. **En línea** — Publicamos en tu dominio, a tu nombre, bajo nuestro resguardo.

### 4.7 Cierre

> ## Cuéntanos de tu negocio.
>
> Te leemos personalmente. Si prefieres hablar, escríbenos directo por WhatsApp.
>
> **[Escríbenos por WhatsApp]**

Formulario, debajo:

| Campo | Tipo | Obligatorio |
|---|---|---|
| Nombre | texto | sí |
| WhatsApp | tel | sí |
| Correo electrónico | email | sí |
| ¿Qué tipo de trabajo haces? | select | sí |
| ¿En qué ciudades trabajas? | texto | no |
| Consentimiento de privacidad | checkbox | sí |
| `website` (honeypot) | oculto | — |

Opciones del select: Techos · Limpieza · Jardinería y paisajismo ·
Construcción y remodelación · Pintura · Concreto · Otro.

**El select no es un campo de más: es el dato que dice a qué oficio llega el
flyer de verdad.** Junto con `utm_content` (qué tienda) es lo que decide dónde
imprimir más en la fase 2. Un campo abierto no serviría — no se agrupa.

Botón: **Conversemos**. Destino tras el envío: `/tu-negocio/gracias`.

## 5. Arquitectura

### 5.1 Ruta y aislamiento

`/tu-negocio` es una ruta propia bajo `src/app/`, **fuera** del segmento
`[lang]`. Hermana estructural de `/emprendedor` y `/sitios`.

Verificado el 2026-08-20 contra `next.config.ts`: ninguna de las 36 reglas de
redirect heredadas de WordPress toca `/tu-negocio`. No hay un 301 quemado como
el que inhabilitó `/portafolio` para `/sitios`.

### 5.2 Los cuatro candados de no-indexado

Los mismos cuatro de `/sitios`, cada uno cubriendo un vector distinto:

1. `robots: { index: false, follow: false }` en el `metadata` del layout.
2. `/tu-negocio` y `/tu-negocio/gracias` en `PRIVATE_PATHS` de `src/app/robots.ts`.
3. `tu-negocio` agregado al grupo de exclusión del `matcher` en
   `src/middleware.ts`. **Sin esto la ruta se rompe**: el middleware la
   reescribiría a `/en/tu-negocio`. El matcher ya excluye `emprendedor` y
   `sitios`; se suma al mismo grupo.
4. Ausencia del `sitemap.ts`. El sitemap enumera rutas explícitamente, no las
   descubre. Basta con no agregarla — se documenta aquí para que nadie la
   agregue "por completitud".

Además: **ninguna página del sitio enlaza a `/tu-negocio`**. Las entradas son
el QR impreso y los ads.

### 5.3 Layout — `src/app/tu-negocio/layout.tsx`

Sigue el patrón de `/emprendedor`, **no** el de `/sitios`.

Monta: fuentes del sistema · `Navbar` con `minimalChrome` y
`hideLanguageToggle` · `Footer` `minimal` · **GTM + Google Consent Mode v2** ·
`CookieBanner` · `AnalyticsEvents` · `Analytics` · `SpeedInsights` ·
`metadata` con `robots: noindex, nofollow`.

**Por qué sí lleva GTM y `CookieBanner`, a diferencia de `/sitios`.** Los ads
de Meta y Google necesitan tag de conversión, y el tag entra por GTM. GTM pone
cookies de terceros, así que el banner de consentimiento y los enlaces legales
son obligatorios. En `/sitios` la neutralidad de marca y el cumplimiento
apuntaban en la misma dirección; aquí no, porque la página **sí** lleva la
marca del estudio y **sí** necesita medir conversión. Se paga el banner a
cambio de poder medir.

`opengraph-image`: **sí**, a diferencia de `/sitios`. Esta página se va a pegar
en anuncios de Meta y se va a compartir por WhatsApp; sin OG image la vista
previa sale rota. Se genera con `next/og` siguiendo el patrón existente de
`/emprendedor/opengraph-image.tsx`.

### 5.4 Componentes — `src/components/tu-negocio/`

| Componente | Tipo | Nota |
|---|---|---|
| `NegocioHero.tsx` | server | Reusa `GridTexture` y `DiagonalSlash`. |
| `NegocioPuertas.tsx` | server | Tipográfico, sin foto. Fondo ivory. |
| `NegocioPrueba.tsx` | server | Envuelve el `ShowcaseGrid` existente. |
| `NegocioPaquetes.tsx` | server | Datos desde `src/lib/paquetes-negocio.ts`. |
| `NegocioBase.tsx` | server | La base + el bloque de anualidad. |
| `NegocioProceso.tsx` | server | Reusa `ProcessDots`. |
| `NegocioCTA.tsx` | server | Encabezado + WhatsApp + `NegocioForm`. |
| `NegocioForm.tsx` | **client** | Único cliente del bloque de contenido. |
| `WhatsAppSticky.tsx` | **client** | Móvil, aparece tras pasar el hero (`IntersectionObserver`). |
| `NegocioAttribution.tsx` | **client** | Como `UtmAttribution`, más `utm_content`. |

**`ShowcaseGrid` y `ShowcaseCard` se reusan tal cual, sin copiar.** Ya son
server components sin estado que reciben el array por props. Lo único a revisar
es la clase `group-hover:text-narvaez-red`, que en `/sitios` quedó anotada como
el único rastro de marca; aquí es la marca, así que deja de ser una excepción y
pasa a ser correcto.

### 5.5 Datos — `src/lib/paquetes-negocio.ts`

Archivo nuevo, un solo propósito: los tres tiers tal como se muestran al
público.

```ts
export type PaqueteNegocio = {
  id: "presencia" | "captacion" | "crecimiento";
  nombre: string;
  precio: number;          // precio de lista, en USD
  promesa: string;         // "Que te encuentren y te llamen."
  heredaDe?: string;       // "Presencia" → renderiza "Todo lo de Presencia, más:"
  incluye: string[];
  anualidad: number;       // 180 | 200 | 220
};
```

**No se lee de Studio OS ni del cotizador.** `graficolor.md` es explícito: el
cotizador no conoce el $1,200 ni el $1,600, y esos tiers se cotizan a mano. Una
landing que consultara una API que no tiene los datos mostraría precios
equivocados o nada. Archivo estático, con el número de `graficolor.md` como
fuente, y un comentario en el archivo que apunte ahí para que se actualicen
juntos.

### 5.6 Captura de leads — refactor de `lead-intake`

Hoy `src/app/api/lead-emprendedor/route.ts` contiene, en un solo archivo:
honeypot, rate limit en memoria, sanitizado HTML, plantilla de correo,
reenvío a Studio OS y `CAMPAIGN_SLUG` fijo en `"emprendedor-latino"`.

Tres caminos, y el elegido:

| | Costo |
|---|---|
| Copiar el archivo a `/api/lead-negocios` | Duplica una superficie de seguridad completa. Los dos honeypots y los dos sanitizadores divergen con el primer parche que se aplique a uno solo. Rechazado. |
| Generalizar la ruta viva a `/api/lead?campaign=` | Toca código en producción que hoy recibe leads reales, y cambia la URL que el formulario de `/emprendedor` ya llama. Rechazado. |
| **Extraer el núcleo a `src/lib/lead-intake.ts`** | **Elegido.** Una superficie de seguridad, dos rutas delgadas. `/emprendedor` conserva su URL, su slug y su comportamiento. |

`src/lib/lead-intake.ts` exporta el núcleo parametrizado por campaña:
`checkRate`, `sanitize`, `getClientIp`, `forwardToOs(payload, campaignSlug)` y
el armado del correo. `/api/lead-emprendedor` queda como ruta delgada con
`campaign: "emprendedor-latino"` y **su comportamiento observable no cambia**;
`/api/lead-negocios` es la nueva, con `campaign: "negocios-servicios"` y dos
campos propios (`trade`, `cities`).

Rate limit: 5/h por IP, igual que el existente.

### 5.7 Atribución por tienda

Esta es la pieza que vale dinero en la fase 2.

`NegocioAttribution.tsx` sigue el patrón de `UtmAttribution.tsx` con **una
diferencia: captura también `utm_content`**, que `/emprendedor` no captura.

El QR de cada tienda lleva su propio `utm_content`:

```
narvaezcarlos.com/tu-negocio?utm_source=flyer&utm_medium=qr
  &utm_campaign=tiendas-latinas&utm_content=<slug-de-la-tienda>
```

Así se sabe **cuál tienda convierte** y dónde vale la pena reimprimir. Sin
`utm_content` las tiendas son indistinguibles y la fase 2 se decide a ciegas.

Heurística de respaldo, si la URL llega sin ningún UTM:
`utm_source=flyer`, `utm_medium=qr`, `utm_campaign=tiendas-latinas`,
`utm_content=desconocido`, `resolved_from=heuristic_qr`.

La atribución se persiste en `sessionStorage` y viaja como campos ocultos en el
envío del formulario, igual que en `/emprendedor`.

**Advertencia heredada del spec de `/sitios`:** Vercel Web Analytics agrupa por
ruta y no garantiza desglose por query string. Aquí no importa para los leads
—los UTM viajan en el payload del formulario y en el `dataLayer`, que sí los
conservan— pero **sí importa para las visitas**: el conteo de escaneos por
tienda depende de GA4 vía GTM, no de Vercel Analytics.

## 6. Medición

| Señal | Cómo |
|---|---|
| Visitas | Vercel Analytics + GA4 vía GTM |
| Vista de la landing con atribución | `landing_negocios_view` al `dataLayer`, con los cuatro UTM y `resolved_from` |
| Clic a WhatsApp | `whatsapp_click`, prop `position`: `hero` / `sticky` / `cierre` |
| Interés por tier | `package_cta_click`, prop `tier`: `presencia` / `captacion` / `crecimiento` |
| Lead enviado | `lead_negocios_submit` / `lead_negocios_submit_error` |
| Qué tienda | `utm_content` en el lead y en el evento de vista |
| Qué oficio | Campo `trade` del formulario |

Se usa el mecanismo de delegación que ya existe (`AnalyticsEvents.tsx`, con
atributos `data-track-event` y `data-track-prop-*`). No se agrega librería.

## 7. Verificación

Se corre contra `npm start` (build de producción) antes de dar la fase 1 por
cerrada:

| # | Comprobación |
|---|---|
| 1 | `npm run build` sin errores ni warnings nuevos; `/tu-negocio` prerenderizada estática |
| 2 | `npm run lint` sin errores nuevos |
| 3 | Los tres precios, las tres anualidades y los 12 sitios presentes en el HTML sin ejecutar JS |
| 4 | `<meta name="robots" content="noindex, nofollow">` presente |
| 5 | `/robots.txt` lista `/tu-negocio` y `/tu-negocio/gracias` en `Disallow` |
| 6 | `/sitemap.xml` **no** contiene `/tu-negocio` |
| 7 | `/tu-negocio` responde 200 y no redirige |
| 8 | Ningún `<a>` del resto del sitio apunta a `/tu-negocio` |
| 9 | Barrido visual a 375 / 768 / 1024 / 1440 / 1920 sin scroll horizontal, contra `.claude/UI_QUALITY.md` |
| 10 | El enlace de WhatsApp abre con el número `+1 206 981 7078` y mensaje prellenado |
| 11 | Envío real del formulario: llega el correo, llega el reenvío a Studio OS con `campaign: negocios-servicios`, `trade` y `utm_content` |
| 12 | `/emprendedor` sigue enviando leads correctamente **después** del refactor de `lead-intake` |
| 13 | Honeypot lleno → respuesta 200 sin correo y sin reenvío |
| 14 | El banner de cookies aparece y el consentimiento se propaga a GTM |
| 15 | Con `prefers-reduced-motion`, ninguna animación se dispara |

La #12 no es opcional: es la única que protege de romper una captación que hoy
está viva.

## 8. Fuera de alcance

- **La hoja carta con el QR.** Es la fase 2 y se diseña después de que Carlos
  valide esta página en vivo.
- **Versión en inglés.**
- **Indexado y trabajo de SEO orgánico.**
- **Las campañas de Meta o Google Ads.** La página queda lista para recibirlas;
  la estrategia y el presupuesto se definen aparte.
- **Cargar los tiers al cotizador de Studio OS.** Siguen cotizándose a mano.
- **Corregir el PDF marca blanca** (ver §9).
- **Cambiar el token del rojo** (ver §9).

## 9. Radar — lo que esta pieza destapa y no resuelve

1. **El PDF marca blanca contradice al motor comercial.** Dice "$800 · 50% para
   comenzar, 50% al finalizar"; el motor fija el contado 50/50 en $750 y
   reserva el $800 para el plan a meses. Lo mismo en los otros dos tiers. Se
   corrige en el PDF, no aquí.
2. **El rojo canónico.** `CLAUDE.md` del sitio y el token de `globals.css`
   declaran `#F43B3E`; el rojo canónico cambió a `#d64d48` en julio de 2026 y
   la propagación sigue pendiente. Esta landing usa el token que exista en el
   repo. No se cambia de contrabando dentro de esta pieza — es una decisión de
   sistema, no de landing.
3. **Graduación de los tiers.** Al publicarse, `catalogo-web.md` y
   `canales/graficolor.md` quedan desactualizados y hay que actualizarlos.
4. **El hueco $1,600 → $2,500** del catálogo público queda sin explicación de
   cara al cliente.
5. **Avisarle a Javier antes de publicar**, no después.
6. **Las afirmaciones sobre aseguradoras, financiadoras y bancos** están
   formuladas como reconocimiento por falta de fuente citable. Si aparece una,
   la versión aseverativa es más fuerte.
