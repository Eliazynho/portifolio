"use client";
import { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence, PanInfo, useDragControls } from "framer-motion";
import Image from "next/image";
import useScrollLock from "@/hooks/useScrollLock";

export interface ProjectType {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  longDescription: string;
  tags: string[];
  image: string;
}

interface ProjectModalProps {
  project: ProjectType;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const [activeTab, setActiveTab] = useState<"sobre" | "tech">("sobre");
  const ref = useRef<HTMLDivElement>(null);
  
  // Controle manual de gestos
  const dragControls = useDragControls();

  // Trava o scroll da página de trás
  useScrollLock(true);

  // Fechar com ESC
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  // Detecta se o usuário arrastou o card para baixo para fechar
  const handleDragEnd = (_: any, info: PanInfo) => {
    const DRAG_THRESHOLD = 150; // Distância necessária para fechar
    const VELOCITY_THRESHOLD = 500; // Velocidade do "flick"

    if (info.offset.y > DRAG_THRESHOLD || info.velocity.y > VELOCITY_THRESHOLD) {
      onClose();
    }
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 10, filter: "blur(4px)" },
    visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.3 } },
    exit: { opacity: 0, y: -10, filter: "blur(4px)", transition: { duration: 0.2 } }
  };

  return (
    <>
      {/* Backdrop (Fundo escuro) */}
      <motion.div
        initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
        animate={{ opacity: 1, backdropFilter: "blur(8px)" }}
        exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
        className="fixed inset-0 z-50 bg-black/60"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Wrapper Centralizado */}
      <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 pointer-events-none">
        <motion.div
          layoutId={`card-${project.id}`}
          ref={ref}
          // Configurações de Drag (Arrastar)
          drag="y"
          dragControls={dragControls} 
          dragListener={false} // DESATIVA o arrasto automático em todo o card (Correção Principal 1)
          dragConstraints={{ top: 0, bottom: 0 }}
          dragElastic={{ top: 0, bottom: 0.2 }}
          onDragEnd={handleDragEnd}
          className="w-full sm:max-w-2xl h-[85vh] sm:h-auto sm:max-h-[90vh] overflow-hidden rounded-t-[2rem] sm:rounded-3xl bg-[#0A0A0A] border border-white/10 shadow-2xl pointer-events-auto relative flex flex-col"
        >
          {/* Background Noise */}
          <div 
            className="absolute inset-0 z-0 opacity-[0.05] pointer-events-none mix-blend-overlay" 
            style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
          />

          {/* --- ÁREAS QUE INICIAM O ARRASTO (DRAG) --- */}

          {/* 1. Handle Mobile (Barra de topo) */}
          <div 
            onPointerDown={(e) => dragControls.start(e)} 
            className="absolute top-3 left-1/2 -translate-x-1/2 w-12 h-1.5 bg-white/20 rounded-full sm:hidden z-30 cursor-grab active:cursor-grabbing touch-none" 
          />

          {/* Botão Fechar */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-30 p-2 rounded-full bg-black/40 text-white hover:bg-white hover:text-black transition-all border border-white/10 backdrop-blur-md hidden sm:flex"
          >
            <span className="material-symbols-outlined text-xl">close</span>
          </button>

          {/* 2. Imagem do Projeto (Arrastar pela imagem funciona) */}
          <div 
            onPointerDown={(e) => dragControls.start(e)}
            className="relative h-60 sm:h-72 w-full shrink-0 group cursor-grab active:cursor-grabbing touch-none"
          >
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/40 to-transparent" />
          </div>

          {/* Header do Conteúdo */}
          <div className="px-6 sm:px-8 pt-6 pb-2 z-10 relative">
             <motion.h3 layoutId={`title-${project.id}`} className="text-3xl md:text-4xl font-bold text-white font-playfair leading-tight">
              {project.title}
            </motion.h3>
            <motion.p layoutId={`subtitle-${project.id}`} className="text-sm sm:text-base text-green-400 font-mono mt-1">
              {project.subtitle}
            </motion.p>

            {/* Navegação de Abas */}
            <div className="flex gap-6 mt-6 border-b border-white/10">
              <button 
                onClick={() => setActiveTab("sobre")}
                className={`pb-3 text-sm font-bold uppercase tracking-widest transition-colors relative ${activeTab === "sobre" ? "text-white" : "text-gray-500 hover:text-gray-300"}`}
              >
                Sobre
                {activeTab === "sobre" && <motion.div layoutId="tab-indicator" className="absolute bottom-0 left-0 right-0 h-0.5 bg-white" />}
              </button>
              <button 
                onClick={() => setActiveTab("tech")}
                className={`pb-3 text-sm font-bold uppercase tracking-widest transition-colors relative ${activeTab === "tech" ? "text-white" : "text-gray-500 hover:text-gray-300"}`}
              >
                Tecnologias
                {activeTab === "tech" && <motion.div layoutId="tab-indicator" className="absolute bottom-0 left-0 right-0 h-0.5 bg-white" />}
              </button>
            </div>
          </div>

          {/* --- ÁREA DE SCROLL (CONTEÚDO) --- */}
          
          <div 
            // ATRIBUTO MÁGICO: Diz ao Lenis para ignorar essa div e deixar o navegador rolar nativamente
            data-lenis-prevent="true" 
            className="flex-1 overflow-y-auto custom-scrollbar p-6 sm:p-8 pt-4 relative z-10 overscroll-contain"
            // Impede que o clique aqui inicie o arrasto do modal acidentalmente
            onPointerDown={(e) => e.stopPropagation()} 
          >
            <AnimatePresence mode="wait">
              {activeTab === "sobre" && (
                <motion.div
                  key="sobre"
                  variants={contentVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="space-y-6"
                >
                  <p className="text-gray-300 leading-relaxed text-lg font-light">
                    {project.longDescription}
                  </p>
                  <div className="pt-4 flex flex-col sm:flex-row gap-3">
                    <button className="flex-1 bg-white text-black font-bold py-3.5 rounded-lg hover:bg-gray-200 transition-transform active:scale-95 flex items-center justify-center gap-2">
                      <span>Ver Demo Ao Vivo</span>
                      <span className="material-symbols-outlined text-sm">arrow_outward</span>
                    </button>
                    <button className="flex-1 border border-white/20 text-white font-bold py-3.5 rounded-lg hover:bg-white/10 transition-transform active:scale-95 flex items-center justify-center gap-2">
                      <span className="material-symbols-outlined text-lg">code</span>
                      <span>Repositório</span>
                    </button>
                  </div>
                </motion.div>
              )}

              {activeTab === "tech" && (
                <motion.div
                  key="tech"
                  variants={contentVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                       <h4 className="text-white font-bold mb-3 flex items-center gap-2">
                         <span className="material-symbols-outlined text-green-400">layers</span>
                         Stack Principal
                       </h4>
                       <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                          <span key={tag} className="px-2.5 py-1 bg-black/40 border border-white/10 rounded text-xs text-gray-300 font-mono">
                            {tag}
                          </span>
                        ))}
                       </div>
                    </div>
                    <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                       <h4 className="text-white font-bold mb-3 flex items-center gap-2">
                         <span className="material-symbols-outlined text-blue-400">dns</span>
                         Arquitetura
                       </h4>
                       <ul className="space-y-2">
                         <li className="text-sm text-gray-400 flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-gray-500" />Server Components</li>
                         <li className="text-sm text-gray-400 flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-gray-500" />Edge Runtime</li>
                         <li className="text-sm text-gray-400 flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-gray-500" />PostgreSQL (Neon)</li>
                       </ul>
                    </div>
                  </div>
                  <div className="rounded-xl bg-[#050505] border border-white/10 p-4 font-mono text-xs sm:text-sm overflow-x-auto">
                    <div className="flex gap-1.5 mb-3">
                      <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50" />
                      <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
                      <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50" />
                    </div>
                    <code className="text-gray-400">
                      <span className="text-purple-400">const</span> <span className="text-blue-400">Code</span> = () ={">"} <span className="text-green-400">"Works!"</span>;
                    </code>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </>
  );
}