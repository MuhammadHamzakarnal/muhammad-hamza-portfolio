"use client";

import { useRef, useState, useEffect, ReactNode } from "react";
import MagicButton from "./MagicButton";
import { useTilt } from "./useTilt";

type Project = {
  num: string;
  name: string;
  desc: string;
  tags: string[];
  status: string;
  feature?: boolean;
  archived?: boolean;
  repo?: string;
  live?: string;
  image?: string;
  images?: string[];
};

const PROJECTS: Project[] = [
  { num: "01", name: "POS System — Full Stack", desc: "My biggest project — a complete Point of Sale system. Next.js frontend, an Express.js REST API and a MySQL database for products, sales and inventory.", tags: ["Next.js", "Express.js", "MySQL"], status: "Private", feature: true, archived: true, images: ["/projects/pos-1.png", "/projects/pos-2.png", "/projects/pos-3.png"] },
  { num: "02", name: "E-Commerce Website", desc: "A full e-commerce marketplace built with Next.js, using Sanity CMS to manage products and content.", tags: ["Next.js", "Sanity CMS", "TypeScript"], status: "Live", repo: "https://github.com/MuhammadHamzakarnal/MarketPlace-Builder-Hackaton", live: "https://market-place-builder-hackaton.vercel.app/" },
  { num: "03", name: "Full-Stack Todo + AI Chatbot", desc: "A todo app with full CRUD plus an integrated AI chatbot that helps you manage and talk about your tasks.", tags: ["Next.js", "AI Chatbot", "Full-Stack"], status: "Live", repo: "https://github.com/MuhammadHamzakarnal/Hackathon-II-Todo_App-_3", live: "https://hackathon-ii-todo-app-3.vercel.app/dashboard" },
  { num: "04", name: "Pak Air Force Jets — Blog", desc: "A blog website written about the Pakistan Air Force's fighter jets. Clean, responsive reading experience built with Next.js.", tags: ["Next.js", "Tailwind", "Blog"], status: "Live", repo: "https://github.com/MuhammadHamzakarnal/Blog-Bebsite-Pak-AirForce", live: "https://blog-website-virid-eight.vercel.app/" },
  { num: "05", name: "Personal Library", desc: "A personal library manager to track books, built with Python. Add, search and organise your reading list.", tags: ["Python", "uv"], status: "Python", repo: "https://github.com/MuhammadHamzakarnal/personal-library" },
  { num: "06", name: "Unit Converter", desc: "A handy Python app that converts between units — length, weight, temperature and more — with a clean, simple interface.", tags: ["Python", "Streamlit"], status: "Python", repo: "https://github.com/MuhammadHamzakarnal/unit-convertor" },
  { num: "07", name: "Password Generator", desc: "A secure password generator built with Python — adjustable length and strength, with one-click copy.", tags: ["Python", "Streamlit"], status: "Python", repo: "https://github.com/MuhammadHamzakarnal/password-generator" },
  { num: "08", name: "Physical AI & Humanoid Robotics", desc: "A learning project exploring the concepts behind physical AI and humanoid robotics, built while studying the book.", tags: ["Python", "AI", "Robotics"], status: "Live", repo: "https://github.com/MuhammadHamzakarnal/humanoid_robotics_textbook", live: "https://hackathon-ai-72ss.vercel.app/" },
];

function Slider({ images, alt, fallback }: { images: string[]; alt: string; fallback: ReactNode }) {
  const [active, setActive] = useState(0);
  const [bad, setBad] = useState<boolean[]>(() => images.map(() => false));

  const good = images.map((_, i) => i).filter((i) => !bad[i]);
  const key = good.join(",");

  // Auto-advance through the working slides
  useEffect(() => {
    if (good.length <= 1) return;
    const id = setInterval(() => {
      setActive((cur) => {
        const pos = good.indexOf(cur);
        return good[(pos + 1) % good.length];
      });
    }, 3200);
    return () => clearInterval(id);
  }, [key]);

  // Keep the active slide on a valid (loaded) image
  useEffect(() => {
    if (bad[active] && good.length) setActive(good[0]);
  }, [key]);

  if (good.length === 0) return <>{fallback}</>;

  return (
    <div className="project-slider">
      {images.map((src, i) => (
        <img
          key={src}
          src={src}
          alt={`${alt} — screenshot ${i + 1}`}
          loading="lazy"
          className={"ps-slide" + (i === active ? " active" : "")}
          style={bad[i] ? { display: "none" } : undefined}
          onError={() => setBad((b) => { const n = [...b]; n[i] = true; return n; })}
        />
      ))}
      {good.length > 1 && (
        <div className="ps-dots">
          {good.map((i) => (
            <button
              key={i}
              type="button"
              aria-label={`Show screenshot ${i + 1}`}
              className={"ps-dot" + (i === active ? " active" : "")}
              onClick={() => setActive(i)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function Thumb({ p }: { p: Project }) {
  const mock = p.feature ? (
    <div className="project-visual">
      <div className="pv-mock">
        <div className="pv-bar teal"></div>
        <div className="pv-bar short"></div>
        <div className="pv-bar shorter"></div>
        <div className="pv-grid">
          <div></div><div></div><div></div>
          <div></div><div></div><div></div>
        </div>
      </div>
      <div className="pv-scan"></div>
    </div>
  ) : null;

  const imgs = p.images ?? (p.image ? [p.image] : []);
  if (imgs.length === 0) return mock;

  return <Slider images={imgs} alt={p.name} fallback={mock} />;
}

function Card({ p, idx }: { p: Project; idx: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useTilt(ref, p.feature ? 5 : 3);
  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${((e.clientX - r.left) / r.width) * 100}%`);
    el.style.setProperty("--my", `${((e.clientY - r.top) / r.height) * 100}%`);
  };
  const slide = p.feature ? "up" : idx % 2 === 1 ? "l" : "r";
  const delay = Math.min(6, idx + 1);

  return (
    <div ref={ref} className={"project-card reveal slide-" + slide + " reveal-d" + delay + (p.feature ? " feature" : "")} onMouseMove={onMove}>
      <div className="project-head">
        <div><div className="project-num">{p.num} / Project</div></div>
        <div className={"project-status" + (p.archived ? " archived" : "")}>
          <span className="dot"></span> {p.status}
        </div>
      </div>
      <h3 className="project-title">{p.name}</h3>
      <p className="project-desc">{p.desc}</p>

      <Thumb p={p} />

      <div className="project-tags">
        {p.tags.map((t) => (<span key={t} className="chip"><span className="lvl"></span>{t}</span>))}
      </div>

      <div className="project-foot">
        <div className="project-links">
          {p.live && <MagicButton size="xs" href={p.live} target="_blank" arrow="↗">Live</MagicButton>}
          {p.repo && <MagicButton size="xs" variant="ghost" href={p.repo} target="_blank" arrow="↗">Code</MagicButton>}
          {!p.live && !p.repo && <span className="project-private">Private project</span>}
        </div>
      </div>
      <span className="project-corner"></span>
    </div>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="section">
      <div className="container">
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <div className="eyebrow reveal" style={{ marginBottom: 18 }}>Selected Work</div>
          <h2 className="h-section reveal reveal-d1">Things I&apos;ve built <span className="accent">recently.</span></h2>
          <p className="lead reveal reveal-d2" style={{ margin: "0 auto" }}>
            Real projects I&apos;ve built while learning — from a full-stack POS system to e-commerce stores and Python tools.
          </p>
        </div>
        <div className="projects-grid">
          {PROJECTS.map((p, i) => (<Card key={p.num} p={p} idx={i} />))}
        </div>
      </div>
    </section>
  );
}
