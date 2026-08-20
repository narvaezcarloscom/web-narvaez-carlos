import { ImageResponse } from "next/og";

export const alt = "Sitios web para negocios de servicios · King County, WA";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/*
  A diferencia de /sitios, esta pagina SI lleva OG image: se va a pegar en
  anuncios de Meta y se va a compartir por WhatsApp. Sin ella la vista previa
  sale rota, que es justo donde se pierde el clic.
*/
export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#F8F9F5",
          padding: "72px 88px",
          position: "relative",
          fontFamily: "serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "-40px",
            right: "-40px",
            width: "320px",
            height: "8px",
            backgroundColor: "#F43B3E",
            transform: "rotate(24deg)",
            transformOrigin: "center",
          }}
        />

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: "22px",
            color: "#666",
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            fontFamily: "sans-serif",
          }}
        >
          <span>Negocios de servicios</span>
          <span>King County, WA</span>
        </div>

        <div style={{ flex: 1, display: "flex" }} />

        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div
            style={{
              fontSize: "88px",
              lineHeight: 1.05,
              color: "#212121",
              letterSpacing: "-0.04em",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <span>Te lo piden para trabajar.</span>
            <span>
              Ya no es{" "}
              <span style={{ fontStyle: "italic", color: "#F43B3E" }}>opcional.</span>
            </span>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "32px",
              fontSize: "22px",
              color: "#666",
              fontFamily: "sans-serif",
              letterSpacing: "0.02em",
            }}
          >
            <span>Narvaez Digital Marketing · Estudio Digital Boutique</span>
            <span>narvaezcarlos.com/tu-negocio</span>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
