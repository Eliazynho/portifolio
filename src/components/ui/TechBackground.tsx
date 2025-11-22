"use client";
import React, { useEffect, useRef } from "react";

export default function TechBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // Ref para guardar o scroll sem causar re-renderizações (Performance 60FPS)
  const scrollRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    
    const mouse = { x: -1000, y: -1000, radius: 200 };

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    class Particle {
      x: number;
      y: number;
      dx: number;
      dy: number;
      size: number;
      baseX: number;
      baseY: number;

      constructor() {
        this.x = Math.random() * canvas!.width;
        this.y = Math.random() * canvas!.height;
        this.baseX = this.x;
        this.baseY = this.y;
        // Velocidade base aleatória
        this.dx = (Math.random() - 0.5) * 0.5;
        this.dy = (Math.random() - 0.5) * 0.5;
        this.size = Math.random() * 1.5 + 0.5;
      }

      update(scrollFactor: number) {
        // Aumenta a velocidade baseada no scroll (Efeito de Aceleração)
        // scrollFactor vai de 0 (topo) a 1+ (conforme desce)
        const speedMultiplier = 1 + (scrollFactor * 2); 
        
        this.x += this.dx * speedMultiplier;
        this.y += this.dy * speedMultiplier;

        // Rebater nas bordas
        if (this.x < 0 || this.x > canvas!.width) this.dx = -this.dx;
        if (this.y < 0 || this.y > canvas!.height) this.dy = -this.dy;

        // Interação com Mouse
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        this.draw();

        if (distance < mouse.radius) {
            const opacity = 1 - distance / mouse.radius;
            ctx!.beginPath();
            ctx!.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.2})`;
            ctx!.lineWidth = 1;
            ctx!.moveTo(this.x, this.y);
            ctx!.lineTo(mouse.x, mouse.y);
            ctx!.stroke();
            ctx!.closePath();
        }
      }

      draw() {
        ctx!.beginPath();
        ctx!.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx!.fillStyle = "rgba(255, 255, 255, 0.15)";
        ctx!.fill();
      }
    }

    const initParticles = () => {
      particles = [];
      const numberOfParticles = (canvas.width * canvas.height) / 5000; 
      for (let i = 0; i < numberOfParticles; i++) {
        particles.push(new Particle());
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Calcula fator de scroll (0 no topo, aumenta conforme desce)
      // Dividimos por window.innerHeight para normalizar (1.0 = uma tela rolada)
      const scrollFactor = Math.min(scrollRef.current / window.innerHeight, 2);

      particles.forEach((particle) => {
        particle.update(scrollFactor);
      });

      connectParticles(scrollFactor);

      animationFrameId = requestAnimationFrame(animate);
    };

    const connectParticles = (scrollFactor: number) => {
        // A MÁGICA DA TRANSIÇÃO:
        // No topo (scroll 0): distância 80 (rede fechada)
        // Ao descer: distância aumenta até 150 (rede se expande/conecta mais longe)
        const baseDistance = 80;
        const maxScrollBonus = 70; // Quanto aumenta ao rolar
        const maxDistance = baseDistance + (maxScrollBonus * scrollFactor);
        
        for (let a = 0; a < particles.length; a++) {
            for (let b = a; b < particles.length; b++) {
                const dx = particles[a].x - particles[b].x;
                const dy = particles[a].y - particles[b].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < maxDistance) {
                    const opacity = 1 - distance / maxDistance;
                    ctx.beginPath();
                    // Ajustamos a opacidade para que, quando a rede cresce, as linhas fiquem mais sutis
                    // para não poluir o visual sobre o texto
                    ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.05})`; 
                    ctx.lineWidth = 0.5;
                    ctx.moveTo(particles[a].x, particles[a].y);
                    ctx.lineTo(particles[b].x, particles[b].y);
                    ctx.stroke();
                }
            }
        }
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.x;
      mouse.y = e.y;
    };
    
    const handleMouseLeave = () => {
        mouse.x = -1000;
        mouse.y = -1000;
    }

    // Ouvinte de Scroll Otimizado
    const handleScroll = () => {
        scrollRef.current = window.scrollY;
    };

    window.addEventListener("resize", resizeCanvas);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseout", handleMouseLeave);
    window.addEventListener("scroll", handleScroll); // Novo listener

    resizeCanvas();
    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseout", handleMouseLeave);
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 z-0 pointer-events-none bg-transparent"
    />
  );
}