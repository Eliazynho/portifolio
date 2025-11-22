"use client";
import { motion } from "framer-motion";

export default function AnchorScroll() {
  return (
    <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-20 mix-blend-difference">
      
      {/* Texto Vertical Tecnológico */}
      <motion.span 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="text-[10px] font-space uppercase tracking-[0.3em] text-white/50 mb-2 vertical-lr"
      >
        Navegar
      </motion.span>

      {/* Container da Âncora */}
      <a href="#sobre" className="group relative flex flex-col items-center justify-center">
        
        {/* Círculo de Radar (Tech Feel) */}
        <motion.div
          animate={{ scale: [1, 1.5, 1], opacity: [0.1, 0, 0.1] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="absolute h-12 w-12 rounded-full border border-white/30"
        />

        {/* Ícone da Âncora Animado */}
        <motion.div
          animate={{ y: [0, 8, 0] }} // Movimento de flutuar para baixo
          transition={{ 
            duration: 2, 
            repeat: Infinity, 
            ease: "easeInOut",
            repeatType: "loop"
          }}
          className="relative z-10 p-2"
        >
          {/* Usando o ícone Material Symbol 'anchor' */}
          <span className="material-symbols-outlined text-3xl text-white transition-all duration-300 group-hover:text-white group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]">
            anchor
          </span>
        </motion.div>
        
        {/* Rastro (Trail) para dar ideia de profundidade */}
        <motion.div 
           className="mt-[-5px] h-8 w-[1px] bg-gradient-to-b from-white/50 to-transparent"
           animate={{ height: [0, 30, 0], opacity: [0, 1, 0] }}
           transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      </a>
    </div>
  );
}