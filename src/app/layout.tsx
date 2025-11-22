import type { Metadata, Viewport } from "next";
import { 
  Inter, 
  Playfair_Display, 
  Manrope, 
  Newsreader, 
  Space_Grotesk, 
  Public_Sans 
} from "next/font/google";
import "./globals.css";
import ClientProviders from "@/components/ClientProviders";

// Fontes
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });
const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope" });
const newsreader = Newsreader({ subsets: ["latin"], style: "italic", variable: "--font-newsreader" });
const space = Space_Grotesk({ subsets: ["latin"], variable: "--font-space" });
const publicSans = Public_Sans({ subsets: ["latin"], variable: "--font-public" });

// Viewport settings
export const viewport: Viewport = {
  themeColor: "#0A0A0A",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

// Metadata (SEO) - Agora funciona perfeitamente!
export const metadata: Metadata = {
  metadataBase: new URL("https://elias-santos.dev"), 
  title: {
    default: "Elias Santos | Fullstack Developer",
    template: "%s | Elias Santos",
  },
  description: "Portfólio de Elias Santos. Desenvolvedor Fullstack especializado em Next.js, NestJS e soluções de alta performance.",
  keywords: [
    "Elias Santos",
    "Fullstack Developer",
    "Desenvolvedor Web",
    "Next.js 16",
    "React",
    "NestJS",
    "TypeScript",
    "Tailwind CSS",
  ],
  authors: [{ name: "Elias Santos", url: "https://github.com/seu-usuario" }],
  creator: "Elias Santos",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://elias-santos.dev",
    title: "Elias Santos | Fullstack Developer",
    description: "Transformando ideias em código de alta performance.",
    siteName: "Elias.Dev",
    images: [{
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Elias Santos Portfolio",
    }],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  const fontVariables = `${inter.variable} ${playfair.variable} ${manrope.variable} ${newsreader.variable} ${space.variable} ${publicSans.variable}`;

  return (
    <html lang="pt-BR" className="scroll-smooth">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" rel="stylesheet" />
      </head>
      <body
        className={`${fontVariables} antialiased bg-bg-dark text-white selection:bg-white selection:text-black`}
      >
        <ClientProviders>
          {children}
        </ClientProviders>
      </body>
    </html>
  );
}