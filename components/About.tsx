"use client";

import { SpinningText } from "@/registry/magicui/spinning-text";

export default function About() {
  return (
    <section id="about" className="section">
      <div className="container">
        <div className="about-grid">
          <div className="reveal">
            <div className="avatar-wrap">
              <div className="avatar-ring"></div>
              <div className="avatar">
                <img className="avatar-photo" src="/profile.jpg" alt="Muhammad Hamza" />
              </div>
              <div className="avatar-badge">
                <span className="dot"></span>
                <span>Open to opportunities</span>
              </div>

              <div className="spinning-badge">
                <SpinningText duration={14} fontSize={9.5} radius={52}>
                  {"Full Stack Dev • Open to Work • Next.js • Python • "}
                </SpinningText>
                <div className="spinning-badge-center">→</div>
              </div>
            </div>
          </div>

          <div className="reveal reveal-d1">
            <div className="eyebrow">About</div>
            <h2 className="h-section">
              Engineer, builder,<br />
              <span className="accent">problem-solver.</span>
            </h2>
            <div className="about-bio">
              <p>
                I&apos;m a <strong>full-stack developer based in Karachi</strong> with <strong>2+ years of coding</strong> behind me. I&apos;ve built real projects along the way — from a complete POS system to e-commerce stores and Python tools.
              </p>
              <p>
                Right now I&apos;m <strong>5 months into a full-time job</strong> and doing my <strong>Intermediate from the Karachi Board</strong>. I work end-to-end — Next.js frontends, Express &amp; Python backends, and databases like MySQL and Sanity — and I care about clean, responsive interfaces and code I can actually read later.
              </p>
            </div>

            <div className="about-meta">
              <div className="meta-card">
                <div className="meta-label">Location</div>
                <div className="meta-value"><span className="accent">●</span> Karachi, PK</div>
              </div>
              <div className="meta-card">
                <div className="meta-label">Experience</div>
                <div className="meta-value">2+ years coding</div>
              </div>
              <div className="meta-card">
                <div className="meta-label">Currently</div>
                <div className="meta-value">Job (5 months)</div>
              </div>
              <div className="meta-card">
                <div className="meta-label">Status</div>
                <div className="meta-value"><span className="accent">●</span> Open to work</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
