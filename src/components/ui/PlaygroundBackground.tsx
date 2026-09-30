"use client";

import { useEffect, useRef } from "react";

interface Orb {
  x: number;
  y: number;
  r: number;
  color: string;
  vx: number;
  vy: number;
  alpha: number;
}

export function PlaygroundBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf: number;
    let w = 0;
    let h = 0;

    const COLORS = [
      "rgba(139, 92, 246,",   // violet
      "rgba(236, 72, 153,",   // pink
      "rgba(56, 189, 248,",   // sky
    ];

    const orbs: Orb[] = [];

    const resize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };

    const initOrbs = () => {
      orbs.length = 0;
      const count = Math.min(4, Math.floor(w / 400));
      for (let i = 0; i < count; i++) {
        orbs.push({
          x: Math.random() * w,
          y: Math.random() * h,
          r: 300 + Math.random() * 200,
          color: COLORS[i % COLORS.length],
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          alpha: 0.06 + Math.random() * 0.06,
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);

      for (const orb of orbs) {
        orb.x += orb.vx;
        orb.y += orb.vy;

        if (orb.x < -orb.r) orb.x = w + orb.r;
        if (orb.x > w + orb.r) orb.x = -orb.r;
        if (orb.y < -orb.r) orb.y = h + orb.r;
        if (orb.y > h + orb.r) orb.y = -orb.r;

        const grad = ctx.createRadialGradient(orb.x, orb.y, 0, orb.x, orb.y, orb.r);
        grad.addColorStop(0, `${orb.color} ${orb.alpha})`);
        grad.addColorStop(1, `${orb.color} 0)`);

        ctx.beginPath();
        ctx.arc(orb.x, orb.y, orb.r, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
      }

      raf = requestAnimationFrame(draw);
    };

    resize();
    initOrbs();
    draw();

    window.addEventListener("resize", () => { resize(); initOrbs(); });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-100"
      style={{ mixBlendMode: "screen" }}
      aria-hidden="true"
    />
  );
}
