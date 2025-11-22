"use client";

import React from "react";
import CustomCursor from "@/components/ui/CustomCursor";
import { LenisProvider } from "@/contexts/LenisContext";
import { Toaster } from "sonner"; // <--- Importe aqui

export default function ClientProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LenisProvider>
      <CustomCursor />
      
      {/* Configuração do Toast (Notificações) */}
      <Toaster 
        theme="dark" 
        position="bottom-right" 
        toastOptions={{
          style: {
            background: "#111",
            border: "1px solid #333",
            color: "white",
          }
        }}
      />
      
      <div 
        className="fixed inset-0 z-50 pointer-events-none opacity-[0.03] mix-blend-overlay" 
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
      ></div>
      
      {children}
    </LenisProvider>
  );
}