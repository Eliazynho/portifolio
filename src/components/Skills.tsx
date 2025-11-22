const techStack = [
  "JavaScript", "TypeScript", "React", "Next.js 16", "Node.js", "Tailwind CSS",
  "PostgreSQL", "Docker", "AWS", "Figma", "Prisma", "GraphQL", "NestJS"
];

// Duplicamos a lista para criar o loop infinito sem gaps
const marqueeItems = [...techStack, ...techStack, ...techStack];

export default function Skills() {
  return (
    <section className="bg-bg-dark py-24 overflow-hidden border-y border-white/5">
      <div className="mb-12 text-center px-4">
        <h2 className="font-space text-sm font-bold uppercase tracking-[0.2em] text-gray-500">
          Arsenal Tecnológico
        </h2>
      </div>

      {/* Linha 1 - Esquerda */}
      <div className="relative flex w-full overflow-hidden mb-8">
        <div className="absolute left-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-r from-bg-dark to-transparent"></div>
        <div className="absolute right-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-l from-bg-dark to-transparent"></div>
        
        <div className="flex w-max animate-marquee gap-8 items-center">
          {marqueeItems.map((tech, index) => (
            <div key={`l1-${index}`} className="flex items-center gap-2 px-6 py-3 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 transition-colors cursor-default">
              <span className="w-2 h-2 rounded-full bg-white/20"></span>
              <span className="text-lg font-medium text-gray-300 font-space whitespace-nowrap">{tech}</span>
            </div>
          ))}
        </div>
      </div>

       {/* Linha 2 - Direita (Reverse) */}
       <div className="relative flex w-full overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-r from-bg-dark to-transparent"></div>
        <div className="absolute right-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-l from-bg-dark to-transparent"></div>
        
        <div className="flex w-max animate-marquee-reverse gap-8 items-center">
          {marqueeItems.map((tech, index) => (
            <div key={`l2-${index}`} className="flex items-center gap-2 px-6 py-3 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 transition-colors cursor-default">
               <span className="text-lg font-medium text-gray-400 font-space whitespace-nowrap opacity-60">{tech}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}