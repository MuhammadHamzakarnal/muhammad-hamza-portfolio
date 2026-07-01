"use client";

import { useEffect, useRef } from "react";

interface Pt3 { x: number; y: number; z: number; }

function fibSphere(n: number, r: number): Pt3[] {
  const pts: Pt3[] = [];
  const golden = Math.PI * (Math.sqrt(5) - 1);
  for (let i = 0; i < n; i++) {
    const y   = (1 - (i / (n - 1)) * 2) * r;
    const rad = Math.sqrt(r * r - y * y);
    const a   = golden * i;
    pts.push({ x: Math.cos(a) * rad, y, z: Math.sin(a) * rad });
  }
  return pts;
}

function rotY(p: Pt3, a: number): Pt3 {
  return { x: p.x * Math.cos(a) + p.z * Math.sin(a), y: p.y, z: -p.x * Math.sin(a) + p.z * Math.cos(a) };
}
function rotX(p: Pt3, a: number): Pt3 {
  return { x: p.x, y: p.y * Math.cos(a) - p.z * Math.sin(a), z: p.y * Math.sin(a) + p.z * Math.cos(a) };
}

export default function Particles() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Respect reduced-motion; lighten the load massively on phones.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const coarse = window.matchMedia("(pointer: coarse)").matches;

    // Cap DPR so high-density phone screens don't render a 3x-sized canvas.
    const dpr = Math.min(window.devicePixelRatio || 1, coarse ? 1.5 : 2);
    let W = 0, H = 0, R = 0;
    let BASE: Pt3[] = [];

    // Background flat particles
    let bgDots: { x: number; y: number; vx: number; vy: number; r: number }[] = [];

    const resize = () => {
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width  = W * dpr;
      canvas.height = H * dpr;
      canvas.style.width  = W + "px";
      canvas.style.height = H + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      R    = Math.min(Math.min(W, H) * 0.28, 230);
      // Sphere link work is O(n²) per frame — halve the points on phones.
      BASE = fibSphere(coarse ? 90 : 180, R);

      const COUNT = Math.min(coarse ? 32 : 80, Math.floor((W * H) / 18000));
      bgDots = [];
      for (let i = 0; i < COUNT; i++) {
        bgDots.push({
          x:  Math.random() * W,
          y:  Math.random() * H,
          vx: (Math.random() - 0.5) * 0.25,
          vy: (Math.random() - 0.5) * 0.25,
          r:  Math.random() * 1.4 + 0.6,
        });
      }
    };
    resize();
    window.addEventListener("resize", resize);

    // Mouse for bg particles repulsion
    const mouse = { x: -1000, y: -1000, active: false };
    const onMoveM  = (e: MouseEvent) => { mouse.x = e.clientX; mouse.y = e.clientY; mouse.active = true; };
    const onLeaveM = () => { mouse.active = false; };
    window.addEventListener("mousemove",  onMoveM);
    window.addEventListener("mouseleave", onLeaveM);

    // Mouse drag for sphere rotation
    let dragging = false, lastX = 0, lastY = 0;
    let ry = 0, rx = 0.18, targetRy = 0, targetRx = 0.18;
    const onDown = (e: MouseEvent) => { dragging = true;  lastX = e.clientX; lastY = e.clientY; };
    const onUp   = ()               => { dragging = false; };
    const onMove = (e: MouseEvent) => {
      if (!dragging) return;
      targetRy += (e.clientX - lastX) * 0.007;
      targetRx += (e.clientY - lastY) * 0.007;
      lastX = e.clientX; lastY = e.clientY;
    };
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup",   onUp);
    window.addEventListener("mousemove", onMove);

    const LINK = 130, MOUSE_D = 180, SPHERE_LINK = 58;
    let t = 0, raf = 0;

    const tick = () => {
      ctx.clearRect(0, 0, W, H);
      t += 0.012;

      const pcA = (window as any).__particleColors?.a || "253, 230, 138";
      const pcB = (window as any).__particleColors?.b || "212, 175, 55";

      // ── Original flat background particles ───────────
      for (const p of bgDots) {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > W) p.vx *= -1;
        if (p.y < 0 || p.y > H) p.vy *= -1;
        if (mouse.active) {
          const dx = p.x - mouse.x, dy = p.y - mouse.y;
          const d = Math.hypot(dx, dy);
          if (d < MOUSE_D && d > 0) {
            const f = (MOUSE_D - d) / MOUSE_D * 0.6;
            p.x += (dx / d) * f; p.y += (dy / d) * f;
          }
        }
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${pcA}, 0.7)`;
        ctx.fill();
      }
      for (let i = 0; i < bgDots.length; i++) {
        for (let j = i + 1; j < bgDots.length; j++) {
          const a = bgDots[i], b = bgDots[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < LINK) {
            ctx.beginPath();
            ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(${pcA}, ${(1 - d / LINK) * 0.22})`;
            ctx.lineWidth = 0.7;
            ctx.stroke();
          }
        }
      }
      if (mouse.active) {
        for (const p of bgDots) {
          const d = Math.hypot(p.x - mouse.x, p.y - mouse.y);
          if (d < MOUSE_D) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y); ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = `rgba(${pcB}, ${(1 - d / MOUSE_D) * 0.35})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      // ── 3D Sphere ────────────────────────────────────
      if (!dragging) {
        targetRy += 0.0028;
        targetRx  = 0.18 + Math.sin(t * 0.4) * 0.12;
      }
      ry += (targetRy - ry) * 0.06;
      rx += (targetRx - rx) * 0.06;

      const cx = W / 2;
      const cy = H * 0.44;

      const pts = BASE.map(b => {
        const p     = rotY(rotX(b, rx), ry);
        const depth = (p.z / R + 1) / 2;
        return { sx: cx + p.x, sy: cy - p.y, z: p.z, depth };
      });
      const sorted = pts.map((p, i) => ({ ...p, i })).sort((a, b) => a.z - b.z);

      // Sphere connecting lines
      for (let a = 0; a < sorted.length; a++) {
        const pa = sorted[a];
        if (pa.z < -R * 0.05) continue;
        for (let b = a + 1; b < sorted.length; b++) {
          const pb = sorted[b];
          if (pb.z < -R * 0.05) continue;
          const d = Math.hypot(pa.sx - pb.sx, pa.sy - pb.sy);
          if (d < SPHERE_LINK) {
            const alpha = (1 - d / SPHERE_LINK) * 0.18 * ((pa.depth + pb.depth) / 2);
            ctx.beginPath();
            ctx.moveTo(pa.sx, pa.sy); ctx.lineTo(pb.sx, pb.sy);
            ctx.strokeStyle = `rgba(167,139,250,${alpha})`;
            ctx.lineWidth   = 0.6;
            ctx.stroke();
          }
        }
      }

      // Sphere dots
      for (const p of sorted) {
        if (p.z < -R * 0.1) continue;
        ctx.beginPath();
        ctx.arc(p.sx, p.sy, 0.5 + p.depth * 2.0, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(45,212,191,${0.08 + p.depth * 0.72})`;
        ctx.fill();
      }

      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize",    resize);
      window.removeEventListener("mousemove", onMoveM);
      window.removeEventListener("mouseleave",onLeaveM);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup",   onUp);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return <canvas id="particles" ref={ref} />;
}
