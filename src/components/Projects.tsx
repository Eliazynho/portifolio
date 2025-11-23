"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import ProjectModal, { ProjectType } from "./ui/ProjectModal";

const projects: ProjectType[] = [
  {
    id: 1,
    title: "Aether Forecast",
    subtitle: "Frontend • Weather • Creative Coding",
    description: "Dashboard climático imersivo com visualização de dados em tempo real.",
    longDescription: "Uma experiência visual focada em micro-interações e design glassmorphism. O Aether consome múltiplas APIs para entregar previsões meteorológicas precisas, qualidade do ar e dados astronômicos, tudo empacotado em uma interface Next.js 16 fluida.",
    tags: ["Next.js", "Tailwind v4", "Framer Motion", "Open-Meteo"],
    image: "/aether.png", // Mantemos a imagem para o card fechado
    liveUrl: "https://aether-forecast.vercel.app/" // URL AO VIVO
  },
  {
    id: 2,
    title: "Nexus API",
    subtitle: "Backend • NestJS • Banking Core",
    description: "API robusta para transações financeiras com concorrência e idempotência.",
    longDescription: "Backend 'Serverless-ready' construído com NestJS. Implementa padrões avançados de engenharia como chaves de idempotência (Redis), transações ACID (PostgreSQL) e documentação automática via Swagger. Projetado para alta integridade financeira.",
    tags: ["NestJS", "PostgreSQL", "Redis", "Swagger", "Prisma"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
    liveUrl: "https://little-cassandra-elias-dev-08e10a56.koyeb.app/api" // Aponta para o Swagger
  },
  {
    id: 3,
    title: "Nexus Web",
    subtitle: "Fullstack • Internet Banking • UX",
    description: "A interface do cliente para o ecossistema Nexus.",
    longDescription: "Aplicação completa de Internet Banking que consome a Nexus API. Focada em UX de alto nível, com atualizações de saldo em tempo real (Polling), gráficos de fluxo de caixa e transferências instantâneas via PIX.",
    tags: ["Next.js 16", "React Query", "Recharts", "Axios"],
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&q=80",
    liveUrl: "https://nexus-app-nine.vercel.app/" // URL AO VIVO
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
            Projetos em Destaque
          </h2>
          <p className="text-gray-500 text-lg max-w-md">
            Clique para interagir com as aplicações ao vivo.
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
                  className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-60 group-hover:opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/40 to-transparent" />
                
                {/* Badge "Live Preview" */}
                <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-green-500/20 border border-green-500/30 backdrop-blur-md flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-green-400">Live</span>
                </div>
              </div>

              <div className="absolute bottom-0 p-6 w-full z-10">
                <motion.h3 
                  layoutId={`title-${project.id}`}
                  className="text-2xl font-bold text-white mb-1 font-playfair"
                >
                  {project.title}
                </motion.h3>
                <motion.p 
                  layoutId={`subtitle-${project.id}`}
                  className="text-xs text-gray-400 font-mono mb-3 uppercase tracking-wider"
                >
                  {project.subtitle}
                </motion.p>
                <p className="text-sm text-gray-500 line-clamp-2 mb-4">
                  {project.description}
                </p>
                
                <div className="flex gap-2 items-center text-white text-xs font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0 duration-300">
                   <span>Ver Aplicação</span>
                   <span className="material-symbols-outlined text-sm">arrow_forward</span>
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