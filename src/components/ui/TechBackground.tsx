"use client";
import React, { useEffect, useRef } from "react";

export default function TechBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    
    // Configuração do Mouse
    const mouse = { x: -1000, y: -1000, radius: 200 }; // Aumentei um pouco o raio de interação

    // Ajuste de tamanho do Canvas
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

      constructor() {
        this.x = Math.random() * canvas!.width;
        this.y = Math.random() * canvas!.height;
        this.dx = (Math.random() - 0.5) * 0.5;
        this.dy = (Math.random() - 0.5) * 0.5;
        this.size = Math.random() * 1.5 + 0.5;
      }

      update() {
        this.x += this.dx;
        this.y += this.dy;

        if (this.x < 0 || this.x > canvas!.width) this.dx = -this.dx;
        if (this.y < 0 || this.y > canvas!.height) this.dy = -this.dy;

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
      // ANTES: / 15000 (poucas)
      // AGORA: / 5000 (3x mais partículas)
      // Ajuste este número se quiser ainda mais ou menos
      const numberOfParticles = (canvas.width * canvas.height) / 5000; 
      
      for (let i = 0; i < numberOfParticles; i++) {
        particles.push(new Particle());
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach((particle) => {
        particle.update();
      });

      connectParticles();

      animationFrameId = requestAnimationFrame(animate);
    };

    const connectParticles = () => {
        // Reduzi a distância de conexão automática para 80 (era 100) para ficar mais limpo
        const maxDistance = 80;
        
        for (let a = 0; a < particles.length; a++) {
            // Otimização: só olha as próximas partículas, não todas
            for (let b = a; b < particles.length; b++) {
                const dx = particles[a].x - particles[b].x;
                const dy = particles[a].y - particles[b].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < maxDistance) {
                    const opacity = 1 - distance / maxDistance;
                    ctx.beginPath();
                    // Reduzi a opacidade das conexões automáticas para não poluir
                    ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.03})`; 
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

    window.addEventListener("resize", resizeCanvas);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseout", handleMouseLeave);

    resizeCanvas();
    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseout", handleMouseLeave);
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