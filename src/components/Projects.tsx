"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import ProjectModal, { ProjectType } from "./ui/ProjectModal";

// Dados Mockados
const projects: ProjectType[] = [
  {
    id: 1,
    title: "Plataforma E-commerce",
    subtitle: "Next.js 14 • Stripe • Tailwind",
    description: "Solução completa de alta conversão.",
    longDescription: "Desenvolvido com arquitetura Edge e Server Components para máxima performance. Integração total com Stripe e gestão de estoque em tempo real.",
    tags: ["React", "Node.js", "PostgreSQL", "Redis"],
    image: "https://images.unsplash.com/photo-1557821552-17105176677c?w=800&q=80"
  },
  {
    id: 2,
    title: "Dashboard Financeiro",
    subtitle: "Vue.js • D3.js • Firebase",
    description: "Visualização de dados complexos simplificada.",
    longDescription: "Renderização de milhares de pontos de dados sem travar o navegador, utilizando Web Workers e algoritmos otimizados.",
    tags: ["Vue.js", "TypeScript", "Serverless"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80"
  },
  {
    id: 3,
    title: "App de Produtividade",
    subtitle: "React Native • GraphQL",
    description: "Gestão de tarefas minimalista offline-first.",
    longDescription: "Focado na experiência mobile com sincronização WatermelonDB, garantindo funcionamento perfeito mesmo sem internet.",
    tags: ["Mobile", "UX/UI", "Offline-First"],
    image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&q=80"
  }
];

export default function Projects() {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const selectedProject = projects.find((p) => p.id === selectedId);

  return (
    <section id="projetos" className="relative min-h-screen w-full py-32 px-4 sm:px-8 bg-transparent font-manrope">
      <div className="mx-auto max-w-7xl">
        
        <div className="mb-16">
          <h2 className="text-5xl font-black tracking-tighter text-white mb-2 mix-blend-difference">
            Projetos
          </h2>
          <p className="text-gray-500 text-lg max-w-md">
            Clique nos cartões para expandir.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <motion.div
              layoutId={`card-${project.id}`}
              key={project.id}
              onClick={() => setSelectedId(project.id)}
              className="group relative cursor-pointer flex flex-col overflow-hidden rounded-2xl bg-[#111] border border-white/10 hover:border-white/30 transition-colors h-[400px]"
            >
              <div className="relative h-full w-full overflow-hidden">
                <Image 
                  src={project.image} 
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-[#111]/20 to-transparent opacity-90" />
              </div>

              <div className="absolute bottom-0 p-6 w-full">
                <motion.h3 
                  layoutId={`title-${project.id}`}
                  className="text-xl font-bold text-white mb-1"
                >
                  {project.title}
                </motion.h3>
                <motion.p 
                  layoutId={`subtitle-${project.id}`}
                  className="text-sm text-gray-400 font-mono mb-3"
                >
                  {project.subtitle}
                </motion.p>
                
                <div className="flex gap-2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0 duration-300">
                   <span className="text-xs font-bold uppercase tracking-widest text-white border-b border-white pb-0.5">Ver Detalhes</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <AnimatePresence>
          {selectedId && selectedProject && (
            <ProjectModal 
              project={selectedProject} 
              onClose={() => setSelectedId(null)} 
            />
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}