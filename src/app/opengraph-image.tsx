import { ImageResponse } from "next/og";

// Tamanho recomendado para redes sociais
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function Image() {
  // Podemos usar fontes externas aqui se quiser, mas usaremos padrão para ser rápido
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0A0A0A", // Fundo Preto
          backgroundImage: "radial-gradient(circle at 25px 25px, #333 2%, transparent 0%), radial-gradient(circle at 75px 75px, #333 2%, transparent 0%)", // Padrão de pontos (Dots)
          backgroundSize: "100px 100px",
          color: "white",
        }}
      >
        {/* Container Central */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            border: "1px solid #333",
            padding: "40px 80px",
            borderRadius: "20px",
            backgroundColor: "rgba(0,0,0,0.8)", // Fundo semi-transparente
            boxShadow: "0 0 50px -10px rgba(255,255,255,0.1)", // Glow sutil
          }}
        >
          {/* Ícone / Logo */}
          <div style={{ fontSize: 60, marginBottom: 20 }}>⚓</div>

          {/* Nome */}
          <div
            style={{
              fontSize: 80,
              fontWeight: "bold",
              letterSpacing: "-0.05em",
              marginBottom: 10,
              background: "linear-gradient(to bottom, #fff, #666)", // Gradiente no texto
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            ELIAS.DEV
          </div>

          {/* Cargo */}
          <div
            style={{
              fontSize: 30,
              color: "#999",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
            }}
          >
            Fullstack Developer
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}