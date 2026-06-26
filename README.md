# Muhammad Hamza — Portfolio (Next.js)

Personal developer portfolio built with **Next.js 14 App Router + TypeScript**. Plain CSS (no Tailwind) using CSS variables, theme-aware via `data-palette` on `<body>`.

## Run locally

```bash
cd nextjs
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build for production

```bash
npm run build
npm start
```

## Deploy to Vercel (recommended)

```bash
# Option A — push to GitHub, then import on vercel.com/new
git init && git add . && git commit -m "init"
git remote add origin https://github.com/<you>/portfolio.git
git push -u origin main

# Option B — Vercel CLI
npx vercel
```

## Structure

```
nextjs/
├── app/
│   ├── layout.tsx        ← root layout, Google Fonts
│   ├── page.tsx          ← assembles all sections
│   └── globals.css       ← all styles (CSS variables + theme overrides)
├── components/
│   ├── Navbar.tsx
│   ├── Home.tsx          ← hero + JSON profile card + stats
│   ├── About.tsx
│   ├── Skills.tsx        ← bento grid
│   ├── Projects.tsx
│   ├── Contact.tsx
│   ├── Footer.tsx
│   ├── MagicButton.tsx
│   ├── PaletteSwitcher.tsx
│   ├── Particles.tsx     ← canvas particle network
│   ├── CanvasCursor.tsx  ← bubble cursor
│   ├── PageLoader.tsx
│   ├── ScrollProgress.tsx
│   ├── RevealObserver.tsx
│   ├── Counter.tsx
│   └── useTilt.ts        ← 3D tilt hook
├── package.json
├── tsconfig.json
└── next.config.js
```

## Notes

- **Themes** — 7 palettes (Luxury Gold default). Click the bottom-right swatch button to switch live.
- **Fonts** — Loaded via `next/font/google` for zero-CLS.
- **Animations** — IntersectionObserver-based reveals, CSS keyframes, requestAnimationFrame canvas effects. No animation library dependency.
- **No Tailwind** — Original styles work as-is. To migrate to Tailwind later, the CSS variables in `:root` map cleanly to `tailwind.config.js > theme.extend.colors`.

## What to customize

1. **Name + content** — `components/Home.tsx`, `About.tsx`, `Projects.tsx`, `Contact.tsx`
2. **Project list** — `PROJECTS` array in `components/Projects.tsx`
3. **Skills chips** — arrays in `components/Skills.tsx`
4. **Default theme** — change `useState("luxury")` in `components/PaletteSwitcher.tsx`
5. **Email** — replace `hamza@example.dev` in `Contact.tsx` + `Home.tsx`
