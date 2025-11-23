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
  liveUrl?: string; // Campo opcional para o Link ao Vivo
}

interface ProjectModalProps {
  project: ProjectType;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const [activeTab, setActiveTab] = useState<"sobre" | "tech">("sobre");
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const dragControls = useDragControls();

  useScrollLock(true);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  const handleDragEnd = (_: any, info: PanInfo) => {
    if (info.offset.y > 150 || info.velocity.y > 500) {
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
      <motion.div
        initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
        animate={{ opacity: 1, backdropFilter: "blur(8px)" }}
        exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
        className="fixed inset-0 z-50 bg-black/80"
        onClick={onClose}
      />

      <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 pointer-events-none">
        <motion.div
          layoutId={`card-${project.id}`}
          ref={ref}
          drag="y"
          dragControls={dragControls} 
          dragListener={false}
          dragConstraints={{ top: 0, bottom: 0 }}
          dragElastic={{ top: 0, bottom: 0.2 }}
          onDragEnd={handleDragEnd}
          className="w-full sm:max-w-4xl h-[90vh] sm:h-[85vh] overflow-hidden rounded-t-[2rem] sm:rounded-3xl bg-[#0A0A0A] border border-white/10 shadow-2xl pointer-events-auto relative flex flex-col"
        >
          {/* Área de Preview (Imagem ou Iframe) */}
          <div 
            onPointerDown={(e) => dragControls.start(e)}
            className="relative h-[40%] sm:h-[50%] w-full shrink-0 group bg-[#050505]"
          >
            {project.liveUrl ? (
              <div className="relative w-full h-full">
                {/* Spinner de Loading enquanto o site carrega */}
                {!iframeLoaded && (
                  <div className="absolute inset-0 flex items-center justify-center z-0">
                    <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                  </div>
                )}
                
                {/* O Site ao Vivo */}
                <iframe
                  src={project.liveUrl}
                  className={`w-full h-full border-0 transition-opacity duration-500 ${iframeLoaded ? 'opacity-100' : 'opacity-0'}`}
                  onLoad={() => setIframeLoaded(true)}
                  title={project.title}
                  // Permissões para garantir que o site funcione bem dentro do iframe
                  sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                />
                
                {/* Botão para abrir em nova aba (caso o iframe bloqueie algo) */}
                <a 
                  href={project.liveUrl} 
                  target="_blank" 
                  rel="noreferrer"
                  className="absolute top-4 right-16 z-30 p-2 rounded-full bg-black/50 text-white/70 hover:bg-white hover:text-black transition-all border border-white/10 backdrop-blur-md flex items-center gap-2 text-xs font-bold px-4"
                >
                  <span className="material-symbols-outlined text-sm">open_in_new</span>
                  Abrir Site
                </a>
              </div>
            ) : (
              <>
                <Image src={project.image} alt={project.title} fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent opacity-90" />
              </>
            )}

            {/* Botão Fechar */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-30 p-2 rounded-full bg-black/50 text-white hover:bg-white hover:text-black transition-all border border-white/10 backdrop-blur-md"
            >
              <span className="material-symbols-outlined text-xl">close</span>
            </button>
          </div>

          {/* Conteúdo do Projeto */}
          <div className="flex-1 flex flex-col overflow-hidden">
            <div className="px-6 sm:px-8 pt-6 pb-2 border-b border-white/10 bg-[#0A0A0A]">
               <motion.h3 layoutId={`title-${project.id}`} className="text-3xl font-bold text-white font-playfair">
                {project.title}
              </motion.h3>
              <motion.p layoutId={`subtitle-${project.id}`} className="text-sm text-gray-400 font-mono mt-1">
                {project.subtitle}
              </motion.p>

              <div className="flex gap-6 mt-4">
                <button 
                  onClick={() => setActiveTab("sobre")}
                  className={`pb-2 text-xs font-bold uppercase tracking-widest transition-colors relative ${activeTab === "sobre" ? "text-white" : "text-gray-500"}`}
                >
                  Sobre
                  {activeTab === "sobre" && <motion.div layoutId="tab-indicator" className="absolute bottom-0 left-0 right-0 h-0.5 bg-white" />}
                </button>
                <button 
                  onClick={() => setActiveTab("tech")}
                  className={`pb-2 text-xs font-bold uppercase tracking-widest transition-colors relative ${activeTab === "tech" ? "text-white" : "text-gray-500"}`}
                >
                  Tecnologias
                  {activeTab === "tech" && <motion.div layoutId="tab-indicator" className="absolute bottom-0 left-0 right-0 h-0.5 bg-white" />}
                </button>
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto custom-scrollbar p-6 sm:p-8 pt-6 bg-[#0A0A0A]" data-lenis-prevent="true">
              <AnimatePresence mode="wait">
                {activeTab === "sobre" && (
                  <motion.div key="sobre" variants={contentVariants} initial="hidden" animate="visible" exit="exit">
                    <p className="text-gray-300 leading-relaxed text-lg font-light">{project.longDescription}</p>
                  </motion.div>
                )}
                {activeTab === "tech" && (
                  <motion.div key="tech" variants={contentVariants} initial="hidden" animate="visible" exit="exit">
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span key={tag} className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-sm text-gray-300 font-mono">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
}