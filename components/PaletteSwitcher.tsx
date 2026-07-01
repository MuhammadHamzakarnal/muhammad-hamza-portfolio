"use client";

import { useEffect, useState } from "react";

const PALETTES = [
  { id: "luxury", name: "Luxury Gold", sub: "Champagne shine", primary: "#d4af37", primaryBright: "#fde68a", secondary: "#b08436", dim: "rgba(212, 175, 55, 0.12)", glow: "rgba(212, 175, 55, 0.10)", glow2: "rgba(253, 230, 138, 0.06)", particleA: "253, 230, 138", particleB: "212, 175, 55" },
  { id: "navy",   name: "Navy Blue", sub: "Deep blue shine", shine: "metal", primary: "#4f7cff", primaryBright: "#bcd2ff", secondary: "#7aa2ff", dim: "rgba(79, 124, 255, 0.12)", glow: "rgba(79, 124, 255, 0.14)", glow2: "rgba(188, 210, 255, 0.08)", particleA: "188, 210, 255", particleB: "79, 124, 255",
    bg: { bg: "#060a18", bg2: "#0a1024", bg3: "#0e1530", card: "#111a38", card2: "#16203f", border: "#22315a", borderBright: "#30457e" } },
  { id: "midnight", name: "Midnight Blue", sub: "Blue + black shine", shine: "metal", primary: "#4d9dff", primaryBright: "#c7e3ff", secondary: "#3b82f6", dim: "rgba(77, 157, 255, 0.12)", glow: "rgba(77, 157, 255, 0.16)", glow2: "rgba(199, 227, 255, 0.07)", particleA: "199, 227, 255", particleB: "77, 157, 255",
    bg: { bg: "#02040a", bg2: "#05080f", bg3: "#080d1a", card: "#0a1020", card2: "#0f1730", border: "#1a2747", borderBright: "#273a64" } },
  { id: "onyx",   name: "Black", sub: "Onyx · platinum shine", shine: "metal", primary: "#c7cfdb", primaryBright: "#f4f7fc", secondary: "#9aa4b6", dim: "rgba(199, 207, 219, 0.12)", glow: "rgba(220, 227, 238, 0.08)", glow2: "rgba(154, 164, 182, 0.05)", particleA: "244, 247, 252", particleB: "154, 164, 182",
    bg: { bg: "#000000", bg2: "#060608", bg3: "#0b0b0f", card: "#0f0f14", card2: "#15151b", border: "#26262e", borderBright: "#37373f" } },
  { id: "cyber",  name: "Cyber",  sub: "Teal · Violet",  primary: "#2dd4bf", primaryBright: "#5eead4", secondary: "#a78bfa", dim: "rgba(45, 212, 191, 0.12)",  glow: "rgba(45, 212, 191, 0.08)",  glow2: "rgba(167, 139, 250, 0.06)", particleA: "94, 234, 212",  particleB: "167, 139, 250" },
  { id: "sunset", name: "Sunset", sub: "Amber · Rose",   primary: "#fb923c", primaryBright: "#fdba74", secondary: "#f472b6", dim: "rgba(251, 146, 60, 0.12)",  glow: "rgba(251, 146, 60, 0.08)",  glow2: "rgba(244, 114, 182, 0.06)", particleA: "253, 186, 116", particleB: "244, 114, 182" },
  { id: "forest", name: "Forest", sub: "Emerald · Lime", primary: "#34d399", primaryBright: "#6ee7b7", secondary: "#a3e635", dim: "rgba(52, 211, 153, 0.12)",  glow: "rgba(52, 211, 153, 0.08)",  glow2: "rgba(163, 230, 53, 0.06)",  particleA: "110, 231, 183", particleB: "163, 230, 53"  },
  { id: "ocean",  name: "Ocean",  sub: "Sky · Indigo",   primary: "#38bdf8", primaryBright: "#7dd3fc", secondary: "#818cf8", dim: "rgba(56, 189, 248, 0.12)",  glow: "rgba(56, 189, 248, 0.08)",  glow2: "rgba(129, 140, 248, 0.06)", particleA: "125, 211, 252", particleB: "129, 140, 248" },
  { id: "royal",  name: "Royal",  sub: "Indigo · Pink",  primary: "#818cf8", primaryBright: "#a5b4fc", secondary: "#f472b6", dim: "rgba(129, 140, 248, 0.12)", glow: "rgba(129, 140, 248, 0.08)", glow2: "rgba(244, 114, 182, 0.06)", particleA: "165, 180, 252", particleB: "244, 114, 182" },
  { id: "mono",   name: "Mono",   sub: "Lime accent",    primary: "#bef264", primaryBright: "#d9f99d", secondary: "#e2e8f0", dim: "rgba(190, 242, 100, 0.12)", glow: "rgba(190, 242, 100, 0.08)", glow2: "rgba(226, 232, 240, 0.04)", particleA: "190, 242, 100", particleB: "226, 232, 240" },
];

// Default (near-black) background — restored for palettes without their own bg.
const DEFAULT_BG = { bg: "#08080c", bg2: "#0c0c14", bg3: "#11111c", card: "#14141f", card2: "#1a1a26", border: "#23232f", borderBright: "#2e2e3e" };

function applyPalette(p: typeof PALETTES[number]) {
  const r = document.documentElement;
  r.style.setProperty("--teal", p.primary);
  r.style.setProperty("--teal-bright", p.primaryBright);
  r.style.setProperty("--teal-dim", p.dim);
  r.style.setProperty("--violet", p.secondary);
  r.style.setProperty("--violet-dim", p.dim);

  const bg = (p as any).bg ?? DEFAULT_BG;
  r.style.setProperty("--bg", bg.bg);
  r.style.setProperty("--bg-2", bg.bg2);
  r.style.setProperty("--bg-3", bg.bg3);
  r.style.setProperty("--card", bg.card);
  r.style.setProperty("--card-2", bg.card2);
  r.style.setProperty("--border", bg.border);
  r.style.setProperty("--border-bright", bg.borderBright);

  (window as any).__particleColors = { a: p.particleA, b: p.particleB };
  document.body.style.backgroundImage =
    `radial-gradient(ellipse 80% 60% at 50% 0%, ${p.glow}, transparent 60%),
     radial-gradient(ellipse 60% 50% at 100% 30%, ${p.glow2}, transparent 60%)`;
  document.body.dataset.palette = p.id;
  document.body.dataset.shine = (p as any).shine ?? "";
}

const DEFAULT_PALETTE = "navy";

export default function PaletteSwitcher() {
  const [active, setActive] = useState(DEFAULT_PALETTE);
  const [open, setOpen] = useState(false);

  // Restore a previously chosen palette (if any) on mount.
  useEffect(() => {
    try {
      const saved = localStorage.getItem("palette-v2");
      if (saved && PALETTES.some((p) => p.id === saved)) setActive(saved);
    } catch {}
  }, []);

  useEffect(() => {
    const p = PALETTES.find((x) => x.id === active);
    if (p) applyPalette(p);
    try { localStorage.setItem("palette-v2", active); } catch {}
  }, [active]);

  return (
    <div className={"palette-switcher" + (open ? " open" : "")}>
      <button className="ps-toggle" onClick={() => setOpen((v) => !v)} aria-label="Theme switcher">
        <span className="ps-toggle-ring"></span>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="13.5" cy="6.5" r="2.5"/>
          <circle cx="17.5" cy="10.5" r="2.5"/>
          <circle cx="8.5" cy="7.5" r="2.5"/>
          <circle cx="6.5" cy="12.5" r="2.5"/>
          <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 8.5-15A4 4 0 0 1 17 11h-3a3 3 0 0 1-3-3V5a3 3 0 0 0-3-3"/>
        </svg>
      </button>
      <div className="ps-panel">
        <div className="ps-head">
          <span className="ps-title">Theme</span>
          <span className="ps-hint">try a palette</span>
        </div>
        <div className="ps-list">
          {PALETTES.map((p) => (
            <button
              key={p.id}
              className={"ps-item" + (active === p.id ? " active" : "")}
              onClick={() => setActive(p.id)}
            >
              <div className="ps-swatch">
                <span style={{ background: p.primary }}></span>
                <span style={{ background: p.secondary }}></span>
              </div>
              <div className="ps-meta">
                <div className="ps-name">{p.name}</div>
                <div className="ps-sub">{p.sub}</div>
              </div>
              <div className="ps-check">{active === p.id ? "●" : ""}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
