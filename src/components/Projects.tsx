"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import ProjectModal, { ProjectType } from "./ui/ProjectModal";

// Dados Atualizados com o projeto "Aether"
const projects: ProjectType[] = [
  {
    id: 1,
    title: "Aether",
    subtitle: "Frontend • Creative Coding • Weather",
    description: "Dashboard climático imersivo com animações fluidas e dados em tempo real.",
    longDescription: "Uma experiência de visualização climática que une 'Creative Coding' com dados meteorológicos precisos. Diferente de dashboards comuns, o Aether foca em micro-interações, fluidez de animações e uma estética 'Glassmorphism' profunda. Construído com arquitetura 'Zero-Backend' consumindo múltiplas APIs da Open-Meteo simultaneamente.",
    tags: ["Next.js 16", "Tailwind CSS v4", "Framer Motion", "Open-Meteo API", "TypeScript"],
    // 👇 Dica: Tire um print do projeto rodando e salve como 'aether.png' na pasta public
    image: "/aether.png" 
  },
  {
    id: 2,
    title: "Nexus API (Em Breve)",
    subtitle: "Backend • NestJS • Microservices",
    description: "Arquitetura de microsserviços escalável para sistemas financeiros.",
    longDescription: "Focado em performance e segurança, este projeto backend demonstrará o uso de filas (RabbitMQ), caching (Redis) e autenticação JWT robusta. (Projeto em desenvolvimento para o portfólio).",
    tags: ["NestJS", "PostgreSQL", "Docker", "Redis", "RabbitMQ"],
    image: "https://images.unsplash.com/photo-1558494949-ef526b0042a0?w=800&q=80" // Placeholder
  },
  {
    id: 3,
    title: "SaaS Starter (Em Breve)",
    subtitle: "Fullstack • Next.js • Stripe",
    description: "Plataforma completa de assinatura com gestão de usuários e pagamentos.",
    longDescription: "A união perfeita entre um frontend responsivo e um backend seguro. Inclui autenticação (NextAuth), integração com Stripe para pagamentos recorrentes e painel administrativo.",
    tags: ["Next.js 15", "Prisma", "Stripe", "Tailwind", "Supabase"],
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80" // Placeholder
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
            Projetos Selecionados
          </h2>
          <p className="text-gray-500 text-lg max-w-md">
            Uma coleção de experimentos, ferramentas e soluções completas.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <motion.div
              layoutId={`card-${project.id}`}
              key={project.id}
              onClick={() => setSelectedId(project.id)}
              className="group relative cursor-pointer flex flex-col overflow-hidden rounded-2xl bg-[#111] border border-white/10 hover:border-white/30 transition-colors h-[450px]"
            >
              {/* Imagem com Overlay */}
              <div className="relative h-full w-full overflow-hidden">
                <Image 
                  src={project.image} 
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-60 group-hover:opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/40 to-transparent" />
              </div>

              {/* Conteúdo do Card */}
              <div className="absolute bottom-0 p-8 w-full z-10">
                <motion.div 
                  layoutId={`category-${project.id}`}
                  className="mb-2 flex gap-2"
                >
                  {/* Mostra apenas a primeira tag como 'categoria' */}
                  <span className="px-2 py-1 rounded border border-white/10 bg-white/5 text-[10px] font-bold uppercase tracking-wider text-white/70">
                    {project.tags[0]}
                  </span>
                </motion.div>

                <motion.h3 
                  layoutId={`title-${project.id}`}
                  className="text-3xl font-bold text-white mb-1 font-playfair"
                >
                  {project.title}
                </motion.h3>
                
                <motion.p 
                  layoutId={`subtitle-${project.id}`}
                  className="text-sm text-gray-400 font-mono mb-4 line-clamp-2"
                >
                  {project.description}
                </motion.p>
                
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-4 group-hover:translate-y-0 duration-300 delay-75">
                   <span className="text-xs font-bold uppercase tracking-widest text-white border-b border-white pb-0.5">Ver Estudo de Caso</span>
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