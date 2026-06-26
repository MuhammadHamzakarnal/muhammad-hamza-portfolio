"use client";

import { useEffect } from "react";
import MagicButton from "./MagicButton";
import Counter from "./Counter";

export default function Home() {
  useEffect(() => {
    const update = () => {
      const el = document.getElementById("local-time");
      if (!el) return;
      const now = new Date();
      const utc = now.getTime() + now.getTimezoneOffset() * 60000;
      const pkt = new Date(utc + 5 * 3600000);
      const hh = String(pkt.getHours()).padStart(2, "0");
      const mm = String(pkt.getMinutes()).padStart(2, "0");
      el.textContent = `${hh}:${mm}`;
    };
    update();
    const i = setInterval(update, 1000);
    return () => clearInterval(i);
  }, []);

  const goto = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section id="home" className="section hero">
      <div className="hero-wrap">
        <div className="hero-grid" aria-hidden="true">
          <div className="hero-grid-plane" />
        </div>
        <div className="container hero-split">
          <div className="hero-left">
            <div className="hero-pill reveal in">
              <span className="status"></span>
              <span className="status-text">Open to roles & projects</span>
              <span className="sep">·</span>
              <span>2026</span>
            </div>

            <h1 className="hero-title-left reveal in reveal-d1">
              Full Stack<br />
              <span className="grad">Developer</span><br />
              <span className="muted">building with Next.js.</span>
            </h1>

            <p className="hero-desc-left reveal in reveal-d2">
              I&apos;m a student developer learning fast and building real projects — clean, responsive Next.js frontends and full-stack apps with Express, Python and MySQL. Code, with craft.
            </p>

            <div className="hero-ctas reveal in reveal-d3" style={{ justifyContent: "flex-start" }}>
              <MagicButton href="#projects" onClick={(e) => { e.preventDefault(); goto("projects"); }}>View Projects</MagicButton>
              <MagicButton href="#contact" onClick={(e) => { e.preventDefault(); goto("contact"); }}>Let&apos;s talk</MagicButton>
            </div>
          </div>

          <div className="hero-right">
            <div className="profile-card reveal in reveal-d2">
              <div className="pc-glow"></div>
              <div className="pc-head">
                <div className="pc-window-dots"><span></span><span></span><span></span></div>
                <div className="pc-file">~/portfolio</div>
                <div className="pc-status"><span className="pc-status-dot"></span><span>ONLINE</span></div>
              </div>

              <div className="pc-code">
                <div className="pc-code-line"><span className="ln">1</span><span className="t-kw">const</span><span className="t-pun"> </span><span className="t-var">dev</span><span className="t-pun"> = </span><span className="t-pun">{"{"}</span></div>
                <div className="pc-code-line"><span className="ln">2</span><span className="t-ind"></span><span className="t-prop">name</span><span className="t-pun">: </span><span className="t-str">&quot;Muhammad Hamza&quot;</span><span className="t-pun">,</span></div>
                <div className="pc-code-line"><span className="ln">3</span><span className="t-ind"></span><span className="t-prop">role</span><span className="t-pun">: </span><span className="t-str">&quot;Full Stack Developer&quot;</span><span className="t-pun">,</span></div>
                <div className="pc-code-line"><span className="ln">4</span><span className="t-ind"></span><span className="t-prop">stack</span><span className="t-pun">: [</span><span className="t-str">&quot;Next.js&quot;</span><span className="t-pun">, </span><span className="t-str">&quot;React&quot;</span><span className="t-pun">, </span><span className="t-str">&quot;TS&quot;</span><span className="t-pun">],</span></div>
                <div className="pc-code-line"><span className="ln">5</span><span className="t-ind"></span><span className="t-prop">location</span><span className="t-pun">: </span><span className="t-str">&quot;Karachi, PK&quot;</span><span className="t-pun">,</span></div>
                <div className="pc-code-line"><span className="ln">6</span><span className="t-ind"></span><span className="t-prop">experience</span><span className="t-pun">: </span><span className="t-str">&quot;2+ years&quot;</span><span className="t-pun">,</span></div>
                <div className="pc-code-line"><span className="ln">7</span><span className="t-ind"></span><span className="t-prop">available</span><span className="t-pun">: </span><span className="t-bool">true</span><span className="t-pun">,</span></div>
                <div className="pc-code-line"><span className="ln">8</span><span className="t-ind"></span><span className="t-prop">building</span><span className="t-pun">: </span><span className="t-str">&quot;POS System (Full-Stack)&quot;</span><span className="t-pun">,</span></div>
                <div className="pc-code-line"><span className="ln">9</span><span className="t-ind"></span><span className="t-prop">time</span><span className="t-pun">: </span><span className="t-str">&quot;<span id="local-time">--:--</span> GMT+5&quot;</span><span className="t-pun">,</span></div>
                <div className="pc-code-line"><span className="ln">10</span><span className="t-ind"></span><span className="t-prop">passion</span><span className="t-pun">: </span><span className="t-str">&quot;∞&quot;</span></div>
                <div className="pc-code-line"><span className="ln">11</span><span className="t-pun">{"}"}</span><span className="pc-caret"></span></div>
              </div>

              <a className="pc-cta" href="#contact" onClick={(e) => { e.preventDefault(); goto("contact"); }}>
                <div className="pc-cta-content">
                  <div className="pc-cta-label">Get in touch</div>
                  <div className="pc-cta-email">0310muhammadhamza356@gmail.com</div>
                </div>
                <div className="pc-cta-arrow">→</div>
              </a>
            </div>
          </div>
        </div>

        <div className="hero-fullband">
          <div className="container">
            <div className="hero-marquee reveal in reveal-d4">
              <div className="marquee-strip">
                <div className="marquee-track">
                  {Array(2).fill(0).map((_, i) => (
                    <span key={i} style={{ display: "contents" }}>
                      {["Next.js","React","TypeScript","JavaScript","Tailwind","ShadCN UI","Express.js","Python","MySQL","Sanity CMS","JWT"].map((t, j) => (
                        <span key={j} style={{ display: "contents" }}>
                          <span>{t}</span>
                          <span className="dot">●</span>
                        </span>
                      ))}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="hero-stats reveal in reveal-d5">
              <div className="hero-stat">
                <div className="hero-stat-num"><Counter to={2} /><span className="accent">+</span></div>
                <div className="hero-stat-label">Years coding</div>
              </div>
              <div className="hero-stat">
                <div className="hero-stat-num"><Counter to={7} /><span className="accent">+</span></div>
                <div className="hero-stat-label">Projects built</div>
              </div>
              <div className="hero-stat">
                <div className="hero-stat-num"><Counter to={5} /></div>
                <div className="hero-stat-label">Certifications</div>
              </div>
              <div className="hero-stat">
                <div className="hero-stat-num"><Counter to={12} /><span className="accent">+</span></div>
                <div className="hero-stat-label">Technologies</div>
              </div>
            </div>
          </div>
        </div>

        <div className="scroll-hint">
          <span>Scroll</span>
          <span className="line"></span>
        </div>
      </div>
    </section>
  );
}
