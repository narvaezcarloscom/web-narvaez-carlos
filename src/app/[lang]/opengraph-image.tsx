import { ImageResponse } from "next/og";
import type { Locale } from "../../lib/i18n";

export const alt = "Narvaez Digital Marketing";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: { lang: Locale };
}) {
  const isEn = params.lang === "en";

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
        {/* Diagonal accent 24° — narvaez-red */}
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

        {/* Top — brand mark */}
        <div
          style={{
            display: "flex",
            fontSize: "28px",
            color: "#212121",
            letterSpacing: "0.04em",
            textTransform: "uppercase",
            fontFamily: "sans-serif",
            fontWeight: 600,
          }}
        >
          Narvaez Digital Marketing
        </div>

        {/* Spacer */}
        <div style={{ flex: 1, display: "flex" }} />

        {/* Headline */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          <div
            style={{
              fontSize: "92px",
              lineHeight: 1.05,
              color: "#212121",
              fontStyle: "italic",
              letterSpacing: "-0.02em",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <span>{isEn ? "Designing with intention" : "Diseñando con intención"}</span>
            <span style={{ color: "#F43B3E" }}>
              {isEn ? "from brand to platform." : "de la marca a la plataforma."}
            </span>
          </div>

          {/* Footer line */}
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
            <span>{isEn ? "Boutique Digital Studio" : "Estudio Digital Boutique"}</span>
            <span>narvaezcarlos.com</span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
