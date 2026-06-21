import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  opacity: number;
  fadeSpeed: number;
  type: 'gold' | 'bokeh' | 'floral' | 'pollen';
  rotation?: number;
  rotationSpeed?: number;
  wobble?: number;
  wobbleSpeed?: number;
}

export const Particles: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Initialize particles
    const initParticles = () => {
      particles = [];
      const particleCounts = {
        gold: Math.min(25, Math.floor(width / 50)),
        bokeh: Math.min(10, Math.floor(width / 150)),
        pollen: Math.min(30, Math.floor(width / 40)),
        floral: Math.min(15, Math.floor(width / 80)),
      };

      // 1. Golden shimmers
      for (let i = 0; i < particleCounts.gold; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.4,
          vy: -Math.random() * 0.5 - 0.2, // Move upwards
          size: Math.random() * 2 + 1,
          color: `rgba(${212 + Math.random() * 40}, ${175 + Math.random() * 30}, 55, `,
          opacity: Math.random() * 0.6 + 0.2,
          fadeSpeed: 0.005 + Math.random() * 0.005,
          type: 'gold',
          wobble: Math.random() * Math.PI,
          wobbleSpeed: 0.01 + Math.random() * 0.02,
        });
      }

      // 2. Large soft bokeh circles
      for (let i = 0; i < particleCounts.bokeh; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.2,
          vy: -Math.random() * 0.2 - 0.05,
          size: Math.random() * 60 + 40,
          color: 'rgba(248, 232, 220, ', // Matches cream-beige background
          opacity: Math.random() * 0.15 + 0.05,
          fadeSpeed: 0.002 + Math.random() * 0.003,
          type: 'bokeh',
        });
      }

      // 3. Delicate floating pollen
      for (let i = 0; i < particleCounts.pollen; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.3 + 0.1, // Slight wind drift to the right
          vy: -Math.random() * 0.3 - 0.1,
          size: Math.random() * 1.5 + 0.5,
          color: 'rgba(255, 255, 255, ',
          opacity: Math.random() * 0.5 + 0.1,
          fadeSpeed: 0.008 + Math.random() * 0.008,
          type: 'pollen',
        });
      }

      // 4. Soft drifting floral fragments
      for (let i = 0; i < particleCounts.floral; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: -Math.random() * 0.4 - 0.1,
          size: Math.random() * 5 + 3,
          color: Math.random() > 0.5 ? 'rgba(199, 154, 146, ' : 'rgba(75, 47, 37, ', // Blush pink or henna brown
          opacity: Math.random() * 0.4 + 0.1,
          fadeSpeed: 0.004 + Math.random() * 0.004,
          type: 'floral',
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.02,
          wobble: Math.random() * Math.PI,
          wobbleSpeed: 0.005 + Math.random() * 0.01,
        });
      }
    };

    // Draw custom floral/petal shape
    const drawPetal = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number, angle: number) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(angle);
      ctx.beginPath();
      // Draw a simple elegant organic droplet/leaf shape
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(size / 2, -size / 2, size, -size / 4, size, 0);
      ctx.bezierCurveTo(size, size / 4, size / 2, size / 2, 0, 0);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    };

    // Render loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        // Move particle
        p.x += p.vx;
        p.y += p.vy;

        // Apply wobble for realistic drifting
        if (p.wobble !== undefined && p.wobbleSpeed !== undefined) {
          p.wobble += p.wobbleSpeed;
          p.x += Math.sin(p.wobble) * 0.2;
        }

        // Shimmer opacity
        if (p.type === 'gold') {
          p.opacity += (Math.random() - 0.5) * 0.05;
          p.opacity = Math.max(0.1, Math.min(p.opacity, 0.95));
        }

        // Wrap around boundaries
        if (p.y + p.size < 0) {
          p.y = height + p.size;
          p.x = Math.random() * width;
        }
        if (p.x - p.size > width) {
          p.x = -p.size;
        } else if (p.x + p.size < 0) {
          p.x = width + p.size;
        }

        // Draw particle
        ctx.fillStyle = `${p.color}${p.opacity})`;

        if (p.type === 'bokeh') {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.x < width ? p.size : 1, 0, Math.PI * 2);
          ctx.fill();
        } else if (p.type === 'floral') {
          if (p.rotation !== undefined && p.rotationSpeed !== undefined) {
            p.rotation += p.rotationSpeed;
            drawPetal(ctx, p.x, p.y, p.size, p.rotation);
          }
        } else {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    // Resize handler
    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initParticles();
    };

    window.addEventListener('resize', handleResize);
    initParticles();
    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="particles-canvas" />;
};
