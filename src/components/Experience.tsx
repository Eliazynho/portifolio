"use client"

export default function Experience() {
  const experiences = [
    {
      year: "2025 - Presente",
      role: "Desenvolvedor Frontend",
      company: "Tiketei app",
      desc: ["Desenvolvimento de interfaces modernas e responsivas com React e Next.js.", "Colaboração UX/UI para produtos acessíveis."]
    },
    {
      year: "2025 - Presente",
      role: "Desenvolvedor Frontend",
      company: "Liga labs - Bolsita UPE",
      desc: ["Equipe de sustentação de sistemas",  "Desenvolvimento único usando system design do governo"]
    },
    {
      year: "2025 - 2027",
      role: "Análise e Desenvolvimento de Sistemas",
      company: "Estácio de Sá",
      desc: ["Engenharia de software, algoritmos e estruturas de dados."]
    }
  ];

  return (
    <section className="bg-bg-dark py-24 px-4 sm:px-8 font-inter">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-16 tracking-tight">Jornada Profissional</h2>
        
        <div className="flex flex-col">
          {experiences.map((exp, index) => (
            <div key={index} className="flex group">
              {/* Timeline Line */}
              <div className="flex flex-col items-center mr-6 sm:mr-10">
                <div className={`w-px h-6 ${index === 0 ? 'bg-transparent' : 'bg-white/20'}`}></div>
                <div className="w-[14px] h-[14px] bg-white shrink-0" style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}></div>
                <div className={`w-px flex-1 ${index === experiences.length - 1 ? 'bg-transparent' : 'bg-white/20'}`}></div>
              </div>
              
              {/* Content */}
              <div className="pb-12 pt-1">
                <span className="text-sm font-medium text-gray-500 block mb-1">{exp.year}</span>
                <h3 className="text-xl font-bold text-white mb-1 group-hover:text-gray-300 transition-colors">{exp.role}</h3>
                <p className="text-base text-gray-400 mb-3">{exp.company}</p>
                <ul className="list-disc list-outside ml-4 space-y-1">
                  {exp.desc.map((item, i) => (
                    <li key={i} className="text-gray-500 text-sm leading-relaxed">{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-8">
            <button className="px-8 py-3 bg-white text-black font-bold rounded hover:bg-gray-200 transition-colors"
              onClick={() => window.open("/curriculo.pdf", "_blank")}
            >
                Baixar Currículo Completo
            </button>
        </div>
      </div>
    </section>
  );
}