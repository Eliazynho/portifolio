import { ImageResponse } from "next/og";

// Configurações da imagem
export const size = {
  width: 32,
  height: 32,
};
export const contentType = "image/png";

// Geração da Imagem
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#0A0A0A", // Fundo Preto
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "20%", // Bordas arredondadas
          border: "1px solid #333",
        }}
      >
        {/* SVG da Âncora - Agora sim podemos mudar a cor! */}
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 22C17.5228 22 22 17.5228 22 12V6H20V12C20 16.4183 16.4183 20 12 20C7.58172 20 4 16.4183 4 12V6H2V12C2 17.5228 6.47715 22 12 22Z"
            // 👇 MUDE A COR AQUI (Ex: white, #FFD700, etc)
            fill="white" 
          />
          <path
            d="M11 2H13V7H11V2Z"
            fill="white" // Mesma cor aqui
          />
          <path
            d="M7 7H17V9H7V7Z"
            fill="white" // Mesma cor aqui
          />
          <circle cx="12" cy="4.5" r="1.5" fill="white" />
        </svg>
      </div>
    ),
    {
      ...size,
    }
  );
}