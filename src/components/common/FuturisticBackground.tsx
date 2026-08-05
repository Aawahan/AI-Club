import React, { useEffect, useRef } from "react";

export const FuturisticBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Mouse positions for subtle parallax
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = (e.clientX - width / 2) * 0.05;
      targetMouseY = (e.clientY - height / 2) * 0.05;
    };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", handleResize);

    // Particles array
    const numParticles = Math.min(80, Math.floor(width / 15));
    const particles = Array.from({ length: numParticles }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 1.5 + 0.5,
      speedX: (Math.random() - 0.5) * 0.3,
      speedY: (Math.random() - 0.5) * 0.3,
      alpha: Math.random() * 0.6 + 0.2,
      pulseSpeed: Math.random() * 0.02 + 0.005,
    }));

    // Floating light nodes
    const numNodes = 6;
    const nodes = Array.from({ length: numNodes }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 200 + 100,
      vx: (Math.random() - 0.5) * 0.2,
      vy: (Math.random() - 0.5) * 0.2,
      intensity: Math.random() * 0.08 + 0.03,
    }));

    const render = () => {
      // Smooth lerp mouse
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      ctx.fillStyle = "#000000";
      ctx.fillRect(0, 0, width, height);

      // Render floating light nodes (soft white volumetric glow)
      nodes.forEach((node) => {
        node.x += node.vx;
        node.y += node.vy;

        if (node.x < -100) node.x = width + 100;
        if (node.x > width + 100) node.x = -100;
        if (node.y < -100) node.y = height + 100;
        if (node.y > height + 100) node.y = -100;

        const grad = ctx.createRadialGradient(
          node.x + mouseX * 0.5,
          node.y + mouseY * 0.5,
          0,
          node.x + mouseX * 0.5,
          node.y + mouseY * 0.5,
          node.radius
        );
        grad.addColorStop(0, `rgba(255, 255, 255, ${node.intensity})`);
        grad.addColorStop(1, "rgba(0, 0, 0, 0)");

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(
          node.x + mouseX * 0.5,
          node.y + mouseY * 0.5,
          node.radius,
          0,
          Math.PI * 2
        );
        ctx.fill();
      });

      // Subtle perspective grid lines
      ctx.strokeStyle = "rgba(255, 255, 255, 0.02)";
      ctx.lineWidth = 1;

      const gridSize = 80;
      const startX = (mouseX % gridSize) - gridSize;
      const startY = (mouseY % gridSize) - gridSize;

      for (let x = startX; x < width + gridSize; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }

      for (let y = startY; y < height + gridSize; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Draw moving particles & connections
      particles.forEach((p, index) => {
        p.x += p.speedX;
        p.y += p.speedY;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        p.alpha += Math.sin(Date.now() * p.pulseSpeed) * 0.005;
        p.alpha = Math.max(0.1, Math.min(0.8, p.alpha));

        const px = p.x + mouseX * (p.size * 0.2);
        const py = p.y + mouseY * (p.size * 0.2);

        // Particle dot
        ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha})`;
        ctx.beginPath();
        ctx.arc(px, py, p.size, 0, Math.PI * 2);
        ctx.fill();

        // Connect nearby particles with subtle white lines
        for (let j = index + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 110) {
            ctx.strokeStyle = `rgba(255, 255, 255, ${
              (1 - dist / 110) * 0.12
            })`;
            ctx.beginPath();
            ctx.moveTo(px, py);
            ctx.lineTo(
              p2.x + mouseX * (p2.size * 0.2),
              p2.y + mouseY * (p2.size * 0.2)
            );
            ctx.stroke();
          }
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 bg-black"
    />
  );
};
