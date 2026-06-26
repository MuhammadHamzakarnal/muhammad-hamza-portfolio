"use client";

import { useRef, ReactNode } from "react";
import { useTilt } from "./useTilt";

const ICON: Record<string, ReactNode> = {
  layers: (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2 2 7l10 5 10-5-10-5z"/><path d="m2 17 10 5 10-5"/><path d="m2 12 10 5 10-5"/></svg>),
  server: (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="6" rx="1"/><rect x="2" y="15" width="20" height="6" rx="1"/><path d="M6 7h.01M6 19h.01"/></svg>),
  db: (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14a9 3 0 0 0 18 0V5"/><path d="M3 12a9 3 0 0 0 18 0"/></svg>),
  cloud: (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M17.5 19a4.5 4.5 0 1 0-1.4-8.78A7 7 0 1 0 5 16"/><path d="m12 12 4 4M16 12l-4 4"/></svg>),
  tools: (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>),
  zap: (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z"/></svg>),
  code: (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>),
};

function Tile({ className, slide = "l", delay = 1, children }: { className: string; slide?: string; delay?: number; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  useTilt(ref, 4);
  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${((e.clientX - r.left) / r.width) * 100}%`);
    el.style.setProperty("--my", `${((e.clientY - r.top) / r.height) * 100}%`);
  };
  return (
    <div ref={ref} className={`bento-tile reveal slide-${slide} reveal-d${delay} ${className}`} onMouseMove={onMove}>
      {children}
    </div>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="section">
      <div className="container">
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <div className="eyebrow reveal" style={{ marginBottom: 18 }}>Skills &amp; Stack</div>
          <h2 className="h-section reveal reveal-d1">What I work with <span className="accent">daily.</span></h2>
          <p className="lead reveal reveal-d2" style={{ margin: "0 auto" }}>
            A focused stack I&apos;m learning deeply and using to build real, full-stack projects — plus certified skills beyond the keyboard.
          </p>
        </div>

        <div className="bento">
          <Tile className="tile-frontend" slide="l" delay={1}>
            <div className="tile-head"><div className="tile-icon">{ICON.layers}</div><div className="tile-num">01 / Frontend</div></div>
            <div className="tile-title">Frontend Engineering</div>
            <div className="tile-desc">Where I&apos;m strongest — building clean, responsive interfaces. Next.js App Router is my home base.</div>
            <div className="chip-grid">
              {["Next.js (App Router)","React.js","TypeScript","JavaScript","HTML5 / CSS3","Tailwind CSS","ShadCN UI","Responsive Design"].map(c => (
                <span key={c} className="chip"><span className="lvl"></span>{c}</span>
              ))}
            </div>
          </Tile>

          <Tile className="tile-backend" slide="r" delay={1}>
            <div className="tile-head"><div className="tile-icon violet">{ICON.server}</div><div className="tile-num">02 / Backend</div></div>
            <div className="tile-title">Backend &amp; APIs</div>
            <div className="tile-desc">Learning the server side — building APIs and auth, with Python and the Next.js backend.</div>
            <div className="chip-grid">
              {["Python","uv (pkg manager)","Next.js Backend","Express.js","JWT Auth","Streamlit"].map(c => (
                <span key={c} className="chip violet"><span className="lvl"></span>{c}</span>
              ))}
            </div>
          </Tile>

          <Tile className="tile-db" slide="l" delay={2}>
            <div className="tile-head"><div className="tile-icon">{ICON.db}</div><div className="tile-num">03 / Data</div></div>
            <div className="tile-title">Databases</div>
            <div className="chip-grid">
              {["MySQL","Sanity CMS"].map(c => (
                <span key={c} className="chip"><span className="lvl"></span>{c}</span>
              ))}
            </div>
          </Tile>

          <Tile className="tile-cloud" slide="up" delay={3}>
            <div className="tile-head"><div className="tile-icon violet">{ICON.zap}</div><div className="tile-num">04 / Beyond Code</div></div>
            <div className="tile-title">General Skills &amp; Safety</div>
            <div className="chip-grid">
              {["MS Office (Word/Excel/PPT)","FireFighter-1 Certified","First Aid & CPR Certified"].map(c => (
                <span key={c} className="chip violet"><span className="lvl"></span>{c}</span>
              ))}
            </div>
          </Tile>

          <Tile className="tile-tools" slide="r" delay={4}>
            <div className="tile-head"><div className="tile-icon">{ICON.tools}</div><div className="tile-num">05 / Toolkit</div></div>
            <div className="tile-title">Daily Tools</div>
            <div className="chip-grid">
              {["Git","GitHub","VS Code","Vercel"].map(c => (
                <span key={c} className="chip"><span className="lvl"></span>{c}</span>
              ))}
            </div>
          </Tile>

          <Tile className="tile-design" slide="l" delay={5}>
            <div className="tile-head"><div className="tile-icon">{ICON.code}</div><div className="tile-num">06 / Code</div></div>
            <div className="tile-title">How I write code</div>
            <div className="tile-desc">Typed end-to-end, error-handled, observable. No clever one-liners that you can&apos;t read at 3am.</div>
            <div className="code-mini">
              <div><span className="cc">// idempotent · typed · observable</span></div>
              <div><span className="ck">export async function</span> <span className="cf">createOrder</span>(</div>
              <div>{"  "}input: <span className="cf">OrderInput</span></div>
              <div>): <span className="ck">Promise</span>{"<"}<span className="cf">Result</span>{">"} {"{"}</div>
              <div>{"  "}<span className="ck">const</span> v = <span className="cf">validate</span>(input);</div>
              <div>{"  "}<span className="ck">return</span> db.<span className="cf">tx</span>(<span className="ck">async</span> (t) =&gt; {"{"} ... {"}"});</div>
              <div>{"}"}</div>
            </div>
          </Tile>

          <Tile className="tile-stats" slide="r" delay={6}>
            <div className="tile-head"><div className="tile-icon violet">{ICON.zap}</div><div className="tile-num">07 / Credentials</div></div>
            <div className="tile-title">Certifications &amp; Training</div>
            <div className="tile-desc">Certified programs across tech, AI and safety.</div>
            <div className="chip-grid">
              {[
                "AI & Web 3.0 — Governor House Karachi (Ongoing)",
                "CPR — Pakistan Life Savers Programme",
                "First Aid — Civil Defence Karachi",
                "FireFighter-1 — Civil Defence Karachi",
                "MS Office — Young Liaquatabad Welfare Org",
              ].map(c => (
                <span key={c} className="chip violet"><span className="lvl"></span>{c}</span>
              ))}
            </div>
          </Tile>
        </div>
      </div>
    </section>
  );
}
