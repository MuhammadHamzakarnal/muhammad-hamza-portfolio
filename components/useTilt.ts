"use client";

import { useEffect } from "react";

export function useTilt(ref: React.RefObject<HTMLElement>, max = 4) {
  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(hover: none)").matches) return;
    let raf = 0, rx = 0, ry = 0, tx = 0, ty = 0;
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      tx = ((e.clientY - r.top) / r.height - 0.5) * -max * 2;
      ty = ((e.clientX - r.left) / r.width - 0.5) * max * 2;
      if (!raf) raf = requestAnimationFrame(loop);
    };
    const onLeave = () => { tx = 0; ty = 0; if (!raf) raf = requestAnimationFrame(loop); };
    const loop = () => {
      rx += (tx - rx) * 0.12;
      ry += (ty - ry) * 0.12;
      el.style.transform = `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg)`;
      if (Math.abs(rx - tx) > 0.05 || Math.abs(ry - ty) > 0.05) raf = requestAnimationFrame(loop);
      else raf = 0;
    };
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
      if (raf) cancelAnimationFrame(raf);
      el.style.transform = "";
    };
  }, [ref, max]);
}
