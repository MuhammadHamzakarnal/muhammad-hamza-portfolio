"use client";

import { useState, FormEvent } from "react";
import MagicButton from "./MagicButton";

const MailIcon = (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>);
const GhIcon = (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.4 5.4 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>);
const LnIcon = (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>);

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setSent(true);
    setTimeout(() => { setSent(false); setForm({ name: "", email: "", message: "" }); }, 3500);
  };

  return (
    <section id="contact" className="section">
      <div className="container">
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <div className="eyebrow reveal" style={{ marginBottom: 18 }}>Contact</div>
          <h2 className="h-section reveal reveal-d1">Got something <span className="accent">to build?</span></h2>
        </div>

        <div className="contact-card reveal reveal-d2">
          <div className="contact-grid">
            <div>
              <h3 className="contact-title">Let&apos;s start a <span className="accent">conversation.</span></h3>
              <p className="contact-blurb">Open to full-time roles, freelance projects, and interesting collaborations. Best response time on email — I reply within a day, usually faster.</p>

              <div className="contact-links">
                <a className="contact-row" href="mailto:0310muhammadhamza356@gmail.com"><span className="icon">{MailIcon}</span><div className="meta"><div className="label">Email</div><div className="value">0310muhammadhamza356@gmail.com</div></div></a>
                <a className="contact-row" href="https://github.com/MuhammadHamzakarnal" target="_blank" rel="noopener noreferrer"><span className="icon">{GhIcon}</span><div className="meta"><div className="label">GitHub</div><div className="value">github.com/MuhammadHamzakarnal</div></div></a>
                <a className="contact-row" href="https://www.linkedin.com/in/muhammad-hamza-7a72432b5/" target="_blank" rel="noopener noreferrer"><span className="icon">{LnIcon}</span><div className="meta"><div className="label">LinkedIn</div><div className="value">linkedin.com/in/muhammad-hamza</div></div></a>
              </div>
            </div>

            <form className="form" onSubmit={submit}>
              <div className="field-row">
                <div className="field"><label>Your name</label><input type="text" placeholder="Jane Doe" value={form.name} onChange={set("name")} /></div>
                <div className="field"><label>Email</label><input type="email" placeholder="you@company.com" value={form.email} onChange={set("email")} /></div>
              </div>
              <div className="field"><label>Project type</label><input type="text" placeholder="Full-time role, freelance project, etc." /></div>
              <div className="field"><label>Tell me about it</label><textarea placeholder="A short brief, timeline, budget if you have one…" value={form.message} onChange={set("message")} /></div>

              <MagicButton type="submit" onClick={submit as any}>{sent ? "Sent ✓" : "Send message"}</MagicButton>

              <div className={"success" + (sent ? " show" : "")}>— Message received. I&apos;ll reply within a day.</div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
