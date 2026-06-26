"use client";

import { useEffect, useState } from "react";
import MagicButton from "./MagicButton";

export default function Navbar() {
  const [active, setActive] = useState("home");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const sections = ["home", "about", "skills", "projects", "contact"];
    const onScroll = () => {
      let current = "home";
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top < window.innerHeight * 0.35) current = id;
      }
      setActive(current);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "skills", label: "Skills" },
    { id: "projects", label: "Projects" },
  ];

  const go = (id: string) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <nav className="nav">
        <div className="nav-pill">
          <a className="logo" href="#home" onClick={(e) => { e.preventDefault(); go("home"); }}>
            <span className="logo-dot"></span>
            <span>Hamza<span style={{ color: "var(--teal)" }}>.</span>dev</span>
          </a>
          <div className="nav-links">
            {links.map((l) => (
              <a key={l.id} href={"#" + l.id} className={"nav-link" + (active === l.id ? " active" : "")} onClick={(e) => { e.preventDefault(); go(l.id); }}>{l.label}</a>
            ))}
          </div>
          <div className="nav-cta-wrap">
            <MagicButton size="sm" href="#contact" onClick={(e) => { e.preventDefault(); go("contact"); }}>
              Contact
            </MagicButton>
          </div>
          <button className={"nav-burger" + (open ? " open" : "")} aria-label="menu" onClick={() => setOpen((v) => !v)}>
            <span></span><span></span>
          </button>
        </div>
      </nav>
      <div className={"mobile-menu" + (open ? " open" : "")}>
        {[...links, { id: "contact", label: "Contact" }].map((l) => (
          <a key={l.id} href={"#" + l.id} className={"nav-link" + (active === l.id ? " active" : "")} onClick={(e) => { e.preventDefault(); go(l.id); }}>{l.label}</a>
        ))}
      </div>
    </>
  );
}
