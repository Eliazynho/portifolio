import { useEffect } from "react";
import { useLenis } from "@/contexts/LenisContext";

export default function useScrollLock(isLocked: boolean) {
  const { lenis } = useLenis();

  useEffect(() => {
    // Se não tivermos o Lenis ou não for para travar, não faz nada
    if (!lenis) return;

    if (isLocked) {
      // 1. Trava o Lenis (Scroll Suave)
      lenis.stop();
      // 2. Trava o CSS nativo (para garantir)
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden"; // Trava o html também
    } else {
      // 1. Destrava o Lenis
      lenis.start();
      // 2. Destrava o CSS
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    }

    // Limpeza ao desmontar
    return () => {
      if (isLocked) { // Só destrava se foi esse componente que travou
         lenis.start();
         document.body.style.overflow = "";
         document.documentElement.style.overflow = "";
      }
    };
  }, [isLocked, lenis]);
}