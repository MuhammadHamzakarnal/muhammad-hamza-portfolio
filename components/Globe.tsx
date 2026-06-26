"use client";

import { useEffect, useRef } from "react";

interface Pt3 { x: number; y: number; z: number; }

function toSphere(lat: number, lon: number, r: number): Pt3 {
  const phi   = (90 - lat) * (Math.PI / 180);
  const theta = lon        * (Math.PI / 180);
  return {
    x:  r * Math.sin(phi) * Math.cos(theta),
    y:  r * Math.cos(phi),
    z:  r * Math.sin(phi) * Math.sin(theta),
  };
}

function rotY(p: Pt3, a: number): Pt3 {
  return {
    x:  p.x * Math.cos(a) + p.z * Math.sin(a),
    y:  p.y,
    z: -p.x * Math.sin(a) + p.z * Math.cos(a),
  };
}

function project(p: Pt3, cx: number, cy: number) {
  return { x: cx + p.x, y: cy - p.y, vis: p.z > -10 };
}

const CITIES = [
  { lat: 24.86,  lon:  67.01, name: "Karachi, PK" },
  { lat: 25.20,  lon:  55.27, name: "Dubai, UAE"  },
  { lat: 37.77,  lon: -122.4, name: "San Francisco, US" },
];

function drawArc(
  ctx: CanvasRenderingContext2D,
  cx: number, cy: number,
  a: Pt3, b: Pt3,
  R: number,
  progress: number
) {
  if (a.z < -30 && b.z < -30) return;
  const steps = 48;
  const visible: { x: number; y: number }[] = [];

  for (let i = 0; i <= Math.floor(steps * progress); i++) {
    const t = i / steps;
    const ix = a.x * (1 - t) + b.x * t;
    const iy = a.y * (1 - t) + b.y * t;
    const iz = a.z * (1 - t) + b.z * t;
    const len = Math.sqrt(ix * ix + iy * iy + iz * iz) || 1;
    const lift = R * 1.18;
    const nx = (ix / len) * lift;
    const ny = (iy / len) * lift;
    const nz = (iz / len) * lift;
    if (nz < -20) continue;
    visible.push({ x: cx + nx, y: cy - ny });
  }

  if (visible.length < 2) return;
  ctx.beginPath();
  ctx.moveTo(visible[0].x, visible[0].y);
  for (let i = 1; i < visible.length; i++) ctx.lineTo(visible[i].x, visible[i].y);
  ctx.strokeStyle = "rgba(167,139,250,0.55)";
  ctx.lineWidth   = 1.2;
  ctx.stroke();

  // Moving dot on arc tip
  const tip = visible[visible.length - 1];
  ctx.beginPath();
  ctx.arc(tip.x, tip.y, 2.5, 0, Math.PI * 2);
  ctx.fillStyle = "#a78bfa";
  ctx.fill();
}

export default function Globe() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const SIZE = 280;
    const DPR  = window.devicePixelRatio || 1;
    canvas.width  = SIZE * DPR;
    canvas.height = SIZE * DPR;
    canvas.style.width  = SIZE + "px";
    canvas.style.height = SIZE + "px";
    ctx.scale(DPR, DPR);

    const cx = SIZE / 2, cy = SIZE / 2;
    const R  = 108;

    // Pre-generate surface dots
    const DOTS: Pt3[] = [];
    for (let lat = -80; lat <= 80; lat += 9) {
      const step = Math.max(9, Math.round(9 / (Math.cos(lat * Math.PI / 180) || 0.1)));
      for (let lon = -180; lon < 180; lon += step) {
        DOTS.push(toSphere(lat, lon, R));
      }
    }

    let rot = 0;
    let pulse = 0;
    let arcProgress = 0;
    let raf = 0;

    // Mouse drag
    let dragging = false, lastX = 0;
    const onDown = (e: MouseEvent) => { dragging = true; lastX = e.clientX; };
    const onUp   = ()              => { dragging = false; };
    const onMove = (e: MouseEvent) => {
      if (dragging) { rot += (e.clientX - lastX) * 0.006; lastX = e.clientX; }
    };
    canvas.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup",   onUp);
    window.addEventListener("mousemove", onMove);

    const draw = () => {
      ctx.clearRect(0, 0, SIZE, SIZE);
      rot   += 0.0025;
      pulse += 0.04;
      arcProgress = Math.min(1, arcProgress + 0.004);

      // Outer glow ring
      const grd = ctx.createRadialGradient(cx, cy, R * 0.88, cx, cy, R * 1.22);
      grd.addColorStop(0, "rgba(45,212,191,0.07)");
      grd.addColorStop(1, "rgba(45,212,191,0)");
      ctx.beginPath();
      ctx.arc(cx, cy, R * 1.22, 0, Math.PI * 2);
      ctx.fillStyle = grd;
      ctx.fill();

      // Surface dots
      for (const d of DOTS) {
        const p = rotY(d, rot);
        const q = project(p, cx, cy);
        if (!q.vis) continue;
        const depth   = (p.z / R + 1) / 2;
        const alpha   = 0.08 + depth * 0.45;
        const dotSize = 0.8 + depth * 0.6;
        ctx.beginPath();
        ctx.arc(q.x, q.y, dotSize, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(45,212,191,${alpha})`;
        ctx.fill();
      }

      // Rotated city positions
      const rotated = CITIES.map(c => rotY(toSphere(c.lat, c.lon, R), rot));

      // Arcs: Karachi → Dubai, Karachi → US
      drawArc(ctx, cx, cy, rotated[0], rotated[1], R, arcProgress);
      drawArc(ctx, cx, cy, rotated[0], rotated[2], R, arcProgress);

      // City markers
      for (let i = 0; i < CITIES.length; i++) {
        const p = rotated[i];
        if (p.z < 0) continue;
        const q = project(p, cx, cy);

        // Outer pulse ring
        const ps    = (Math.sin(pulse - i * 1.3) + 1) / 2;
        const pRing = 5 + ps * 9;
        ctx.beginPath();
        ctx.arc(q.x, q.y, pRing, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(45,212,191,${0.55 - ps * 0.4})`;
        ctx.lineWidth   = 1;
        ctx.stroke();

        // Inner dot
        ctx.beginPath();
        ctx.arc(q.x, q.y, 3.5, 0, Math.PI * 2);
        ctx.fillStyle = "#2dd4bf";
        ctx.shadowColor = "#2dd4bf";
        ctx.shadowBlur  = 8;
        ctx.fill();
        ctx.shadowBlur  = 0;
      }

      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      canvas.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup",   onUp);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return <canvas ref={canvasRef} className="globe-canvas" />;
}
