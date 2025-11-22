"use client";
import { motion } from "framer-motion";
import MagneticButton from "./ui/MagneticButton";
import AnchorScroll from "./ui/AnchorScroll";
import HyperText from "./ui/HyperText";

export default function Hero() {
  // Variantes de animação com a correção de tipo "as const"
  const textVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1] as const, // Correção crítica para TS
      },
    }),
  };

  return (
    <section className="relative flex h-screen min-h-[700px] w-full flex-col items-center justify-center overflow-hidden bg-transparent font-manrope">
      
      {/* Background Glow sutil (Luz ambiente central) */}
      <div className="absolute top-[-20%] left-[50%] h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-white opacity-[0.03] blur-[120px] pointer-events-none"></div>

      <div className="z-10 flex flex-col items-center text-center px-4">
        
        {/* Badge de Status "Disponível" */}
        <motion.div
          custom={0}
          initial="hidden"
          animate="visible"
          variants={textVariant}
          className="mb-6 flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 backdrop-blur-sm"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500"></span>
          </span>
          <span className="text-xs font-medium uppercase tracking-wider text-gray-300">
            Disponível para Projetos
          </span>
        </motion.div>

        {/* Título Principal */}
        <h1 className="font-playfair text-6xl font-bold leading-[0.9] text-white sm:text-8xl md:text-9xl tracking-tight mix-blend-difference flex flex-col items-center gap-2 sm:gap-4">
          {/* Componente HyperText para o Primeiro Nome */}
          <div className="block">
            <HyperText text="ELIAS" className="text-white" />
          </div>
          
          {/* Sobrenome com animação padrão */}
          <motion.div
            custom={2}
            initial="hidden"
            animate="visible"
            variants={textVariant}
            className="text-gray-500"
          >
            Santos
          </motion.div>
        </h1>

        {/* Subtítulo / Descrição */}
        <motion.p
          custom={3}
          initial="hidden"
          animate="visible"
          variants={textVariant}
          className="mt-8 max-w-lg text-lg font-light leading-relaxed text-gray-400 sm:text-xl"
        >
          Desenvolvedor Fullstack focado em criar experiências digitais que combinam{" "}
          <span className="text-white font-medium">performance técnica</span> com{" "}
          <span className="text-white font-medium">design impecável</span>.
        </motion.p>

        {/* Botão Magnético (CTA) */}
        <motion.div
          custom={4}
          initial="hidden"
          animate="visible"
          variants={textVariant}
          className="mt-10"
        >
          <MagneticButton className="group relative flex items-center justify-center overflow-hidden rounded-full bg-white px-8 py-4 text-black transition-transform hover:scale-105 active:scale-95">
            <span className="relative z-10 text-sm font-bold uppercase tracking-widest">
              Ver Projetos
            </span>
            {/* Efeito hover interno do botão */}
            <div className="absolute inset-0 z-0 bg-gray-200 opacity-0 transition-opacity group-hover:opacity-100"></div>
          </MagneticButton>
        </motion.div>
      </div>

      {/* Indicador de Scroll (Âncora Tech) */}
      <AnchorScroll />
      
    </section>
  );
}