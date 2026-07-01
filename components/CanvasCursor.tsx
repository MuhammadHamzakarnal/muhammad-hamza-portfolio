"use client";

import { useEffect, useRef } from "react";

export default function CanvasCursor() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // Cursor trails make no sense on touch devices — skip entirely to avoid
    // touchmove particle spam and per-frame DOM reads that jank mobile scroll.
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let W = 0, H = 0;
    const dpr = window.devicePixelRatio || 1;
    const resize = () => {
      W = window.innerWidth; H = window.innerHeight;
      canvas.width = W * dpr; canvas.height = H * dpr;
      canvas.style.width = W + "px"; canvas.style.height = H + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const getColors = () => {
      const p = document.body.dataset.palette || "midnight";
      switch (p) {
        case "luxury":   return { fill: "#fff4b8", stroke: "#d4af37" };
        case "navy":     return { fill: "#dbe6ff", stroke: "#4f7cff" };
        case "midnight": return { fill: "#c7e3ff", stroke: "#4d9dff" };
        case "onyx":     return { fill: "#f4f7fc", stroke: "#c7cfdb" };
        case "cyber":    return { fill: "#ccfbf1", stroke: "#2dd4bf" };
        case "sunset":   return { fill: "#fed7aa", stroke: "#fb923c" };
        case "forest":   return { fill: "#bbf7d0", stroke: "#34d399" };
        case "ocean":    return { fill: "#bae6fd", stroke: "#38bdf8" };
        case "royal":    return { fill: "#ddd6fe", stroke: "#818cf8" };
        case "mono":     return { fill: "#f1f5f9", stroke: "#bef264" };
        default:         return { fill: "#c7e3ff", stroke: "#4d9dff" };
      }
    };

    class P {
      initialLife = Math.floor(Math.random() * 60 + 60);
      life = this.initialLife;
      vx = (Math.random() < 0.5 ? -1 : 1) * (Math.random() / 10);
      vy = -0.4 + Math.random() * -1;
      x: number; y: number; base = 4;
      constructor(x: number, y: number) { this.x = x; this.y = y; }
      update(c: { fill: string; stroke: string }) {
        this.x += this.vx; this.y += this.vy;
        this.vx += ((Math.random() < 0.5 ? -1 : 1) * 2) / 75;
        this.vy -= Math.random() / 600;
        this.life--;
        const scale = 0.2 + (this.initialLife - this.life) / this.initialLife;
        ctx!.fillStyle = c.fill;
        ctx!.strokeStyle = c.stroke;
        ctx!.lineWidth = 1;
        ctx!.beginPath();
        ctx!.arc(this.x - (this.base / 2) * scale, this.y - this.base / 2, this.base * scale, 0, 2 * Math.PI);
        ctx!.stroke(); ctx!.fill(); ctx!.closePath();
      }
    }

    const particles: P[] = [];
    const onMove = (e: MouseEvent) => particles.push(new P(e.clientX, e.clientY));
    const onTouch = (e: TouchEvent) => {
      for (let i = 0; i < e.touches.length; i++) {
        particles.push(new P(e.touches[i].clientX, e.touches[i].clientY));
      }
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("touchmove", onTouch, { passive: true });

    let raf = 0;
    const loop = () => {
      ctx.clearRect(0, 0, W, H);
      const c = getColors();
      for (const p of particles) p.update(c);
      for (let i = particles.length - 1; i >= 0; i--) {
        if (particles[i].life < 0) particles.splice(i, 1);
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("touchmove", onTouch);
      cancelAnimationFrame(raf);
    };
  }, []);

  return <canvas id="cursor-canvas" ref={ref} />;
}
