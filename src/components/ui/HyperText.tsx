"use client";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()_+";

export default function HyperText({ text, className = "" }: { text: string; className?: string }) {
  const [displayText, setDisplayText] = useState(text);
  const [iterations, setIterations] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const scramble = () => {
    let iter = 0;
    
    clearInterval(intervalRef.current as NodeJS.Timeout);

    intervalRef.current = setInterval(() => {
      setDisplayText((prev) =>
        text
          .split("")
          .map((letter, index) => {
            if (index < iter) {
              return text[index];
            }
            return ALPHABET[Math.floor(Math.random() * ALPHABET.length)];
          })
          .join("")
      );

      if (iter >= text.length) {
        clearInterval(intervalRef.current as NodeJS.Timeout);
      }

      iter += 1 / 3; // Velocidade do efeito
    }, 30);
  };

  // Efeito ao carregar
  useEffect(() => {
    scramble();
    return () => clearInterval(intervalRef.current as NodeJS.Timeout);
  }, []);

  return (
    <motion.span
      className={`inline-block cursor-default ${className}`}
      onMouseEnter={scramble} // Efeito também ao passar o mouse
    >
      {displayText}
    </motion.span>
  );
}