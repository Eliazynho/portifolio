"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion } from "framer-motion";
import { toast } from "sonner";
import MagneticButton from "./ui/MagneticButton";

// Esquema de Validação (Regras)
const formSchema = z.object({
  name: z.string().min(2, "O nome deve ter pelo menos 2 caracteres"),
  email: z.string().email("Digite um e-mail válido"),
  message: z.string().min(10, "A mensagem deve ser mais detalhada (mín. 10 caracteres)"),
});

type FormData = z.infer<typeof formSchema>;

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  // Simulação de envio (Backend)
  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    
    // Simula delay de rede (2 segundos)
    await new Promise((resolve) => setTimeout(resolve, 2000));

    console.log("Dados enviados:", data);
    
    toast.success("Mensagem enviada com sucesso!", {
      description: "Entrarei em contato em breve.",
    });

    reset();
    setIsSubmitting(false);
  };

  return (
    <section id="contato" className="relative min-h-screen flex items-center justify-center py-24 px-4 font-manrope bg-transparent">
      <div className="w-full max-w-5xl">
        
        {/* Cabeçalho */}
        <div className="mb-16 text-center md:text-left">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-white mb-6"
          >
            Vamos Conversar?
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-gray-400 text-lg md:text-xl max-w-2xl font-light"
          >
            Tem um projeto em mente? Estou disponível para transformar ideias complexas em código de alta performance.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          
          {/* Lado Esquerdo: Formulário */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              
              {/* Campo Nome */}
              <div className="group relative">
                <input
                  {...register("name")}
                  type="text"
                  placeholder=" "
                  className="peer w-full bg-transparent border-b border-gray-800 py-4 text-white placeholder-transparent focus:border-white focus:outline-none transition-all duration-300"
                />
                <label className="absolute left-0 -top-3.5 text-sm text-gray-500 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-4 peer-focus:-top-3.5 peer-focus:text-white peer-focus:text-sm cursor-text">
                  Seu Nome
                </label>
                {/* Linha animada inferior */}
                <div className="absolute bottom-0 left-0 w-0 h-px bg-white transition-all duration-500 peer-focus:w-full"></div>
                
                {errors.name && (
                  <motion.span 
                    initial={{ opacity: 0, y: -10 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    className="text-red-500 text-xs mt-2 block font-mono"
                  >
                    {errors.name.message}
                  </motion.span>
                )}
              </div>

              {/* Campo Email */}
              <div className="group relative">
                <input
                  {...register("email")}
                  type="email"
                  placeholder=" "
                  className="peer w-full bg-transparent border-b border-gray-800 py-4 text-white placeholder-transparent focus:border-white focus:outline-none transition-all duration-300"
                />
                <label className="absolute left-0 -top-3.5 text-sm text-gray-500 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-4 peer-focus:-top-3.5 peer-focus:text-white peer-focus:text-sm cursor-text">
                  Seu E-mail
                </label>
                <div className="absolute bottom-0 left-0 w-0 h-px bg-white transition-all duration-500 peer-focus:w-full"></div>

                {errors.email && (
                  <motion.span 
                    initial={{ opacity: 0, y: -10 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    className="text-red-500 text-xs mt-2 block font-mono"
                  >
                    {errors.email.message}
                  </motion.span>
                )}
              </div>

              {/* Campo Mensagem */}
              <div className="group relative">
                <textarea
                  {...register("message")}
                  rows={4}
                  placeholder=" "
                  className="peer w-full bg-transparent border-b border-gray-800 py-4 text-white placeholder-transparent focus:border-white focus:outline-none transition-all duration-300 resize-none"
                ></textarea>
                <label className="absolute left-0 -top-3.5 text-sm text-gray-500 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-4 peer-focus:-top-3.5 peer-focus:text-white peer-focus:text-sm cursor-text">
                  Sobre o que quer conversar?
                </label>
                <div className="absolute bottom-0 left-0 w-0 h-px bg-white transition-all duration-500 peer-focus:w-full"></div>

                {errors.message && (
                  <motion.span 
                    initial={{ opacity: 0, y: -10 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    className="text-red-500 text-xs mt-2 block font-mono"
                  >
                    {errors.message.message}
                  </motion.span>
                )}
              </div>

              {/* Botão de Envio com Loading State */}
              <div className="pt-4">
                <MagneticButton className="w-full md:w-auto">
                    <button 
                        type="submit" 
                        disabled={isSubmitting}
                        className="relative overflow-hidden bg-white text-black px-10 py-4 rounded-full font-bold uppercase tracking-widest hover:bg-gray-200 transition-all disabled:opacity-70 disabled:cursor-not-allowed min-w-[200px]"
                    >
                        {isSubmitting ? (
                            <span className="flex items-center justify-center gap-2">
                                <span className="w-2 h-2 bg-black rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                                <span className="w-2 h-2 bg-black rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                                <span className="w-2 h-2 bg-black rounded-full animate-bounce"></span>
                            </span>
                        ) : (
                            "Enviar Mensagem"
                        )}
                    </button>
                </MagneticButton>
              </div>

            </form>
          </motion.div>

          {/* Lado Direito: Infos e Redes */}
          <motion.div 
             initial={{ opacity: 0, x: 20 }}
             whileInView={{ opacity: 1, x: 0 }}
             transition={{ duration: 0.6, delay: 0.4 }}
             className="flex flex-col justify-between space-y-12"
          >
             <div>
                <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-gray-500 mb-6">Contatos Diretos</h3>
                <div className="space-y-4">
                    <a href="mailto:contato@elias.dev" className="flex items-center gap-4 text-2xl md:text-3xl font-playfair text-white hover:text-gray-300 transition-colors group">
                        <span className="group-hover:translate-x-2 transition-transform duration-300">m10elias10@gmail.com</span>
                        <span className="material-symbols-outlined text-sm opacity-0 group-hover:opacity-100 transition-opacity -rotate-45 group-hover:rotate-0">arrow_forward</span>
                    </a>
                    <p className="text-gray-400 text-lg">+55 (87) 99907-6568</p>
                </div>
             </div>

             <div>
                <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-gray-500 mb-6">Redes Sociais</h3>
                <div className="flex gap-4">
                    {['LinkedIn', 'GitHub', 'Instagram'].map((social) => (
                        <a key={social} href={`${social === 'LinkedIn' ? 'https://www.linkedin.com/in/eliassantos1/' : social === 'GitHub' ? 'https://github.com/Eliazynho' : 'https://www.instagram.com/elias.dev_/'}`} className="px-6 py-3 border border-white/10 rounded-full text-white hover:bg-white hover:text-black transition-all text-sm font-bold uppercase tracking-wider" target="_blank">
                            {social}
                        </a>
                    ))}
                </div>
             </div>

             <div className="p-6 rounded-2xl bg-[#111] border border-white/5 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <span className="material-symbols-outlined text-6xl">code</span>
                </div>
                <p className="text-gray-400 relative z-10 text-sm leading-relaxed">
                    "O design não é apenas o que parece e o que se sente. O design é como funciona."
                    <br/><span className="text-white font-bold mt-2 block">— Steve Jobs</span>
                </p>
             </div>
          </motion.div>

        </div>

        {/* Footer Minimalista */}
        <footer className="mt-32 pt-10 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-gray-600">
            <p>&copy; {new Date().getFullYear()} Elias Santos. Todos os direitos reservados.</p>
            <div className="flex gap-6">
                <a href="#" className="hover:text-white transition-colors">Privacidade</a>
                <a href="#" className="hover:text-white transition-colors">Termos</a>
            </div>
        </footer>

      </div>
    </section>
  );
}