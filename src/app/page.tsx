import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Contact from "@/components/Contact";
import TechBackground from "@/components/ui/TechBackground";

export default function Home() {
  return (
    <main className="relative flex min-h-screen flex-col bg-bg-dark text-white selection:bg-white selection:text-black overflow-x-hidden">
      
      {/* Background Tecnológico Ativo em toda a página */}
      <TechBackground />
      
      {/* Conteúdo (z-index maior para ficar sobre o canvas) */}
      <div className="relative z-10">
        <Hero />
        <About />
        <Experience />
        <Skills />
        <Projects />
        <Contact />
      </div>
    </main>
  );
}