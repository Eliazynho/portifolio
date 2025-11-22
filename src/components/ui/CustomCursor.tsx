"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      // Detecta se estamos sobre um link ou botão para aumentar o cursor
      const target = e.target as HTMLElement;
      if (target.tagName === "A" || target.tagName === "BUTTON" || target.closest("a") || target.closest("button")) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", updateMousePosition);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  return (
    <>
      {/* Esconde o cursor padrão em telas grandes */}
      <style jsx global>{`
        @media (min-width: 768px) {
          body {
            cursor: none;
          }
          a, button {
            cursor: none;
          }
        }
      `}</style>

      <motion.div
        className="fixed top-0 left-0 z-[9999] pointer-events-none hidden md:block rounded-full bg-white mix-blend-difference"
        animate={{
          x: mousePosition.x - (isHovering ? 32 : 8), // Centraliza baseado no tamanho
          y: mousePosition.y - (isHovering ? 32 : 8),
          width: isHovering ? 64 : 16, // Aumenta quando passa em links
          height: isHovering ? 64 : 16,
        }}
        transition={{
          type: "spring",
          stiffness: 150,
          damping: 15,
          mass: 0.1
        }}
      />
    </>
  );
}