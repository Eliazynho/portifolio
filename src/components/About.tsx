export default function About() {
  return (
    <section id="sobre" className="w-full bg-bg-card py-24 px-4 sm:px-8">
      <div className="mx-auto max-w-4xl flex flex-col items-center">
        <h2 className="font-newsreader italic text-5xl sm:text-6xl font-medium mb-12 text-center text-white">
          Sobre Mim
        </h2>

        <div className="space-y-8 text-lg sm:text-xl font-inter text-gray-400 font-light leading-relaxed max-w-2xl text-center">
          <p>
            Sou Elias Santos, um desenvolvedor Fullstack JavaScript apaixonado por construir soluções digitais elegantes e eficientes. Com uma base sólida em tecnologias modernas, meu foco é transformar ideias complexas em experiências de usuário intuitivas.
          </p>
          <p>
            Minha jornada na tecnologia é impulsionada pela busca incessante por desafios e pela paixão pela fidelidade e superação em cada projeto que abraço.
          </p>
          <p>
            Acredito que a melhor tecnologia é aquela que resolve problemas reais, combinando código limpo com um design que encanta.
          </p>
        </div>

        {/* Separator Icon */}
        <div className="my-16 flex items-center justify-center gap-4 w-full max-w-xs opacity-30">
          <div className="h-px w-full bg-white"></div>
          <span className="material-symbols-outlined text-2xl">anchor</span>
          <div className="h-px w-full bg-white"></div>
        </div>
      </div>
    </section>
  );
}