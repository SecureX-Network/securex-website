# SecureX Public Website

Standalone public marketing website for SecureX, deployed at `securex.sp-net.in`.

Built with React + TypeScript + Vite + Tailwind CSS. Independently deployable to
Vercel — it does **not** depend on the SecureX main application build.

- All public-content pages: Home, About, How It Works, Features, Security, Contact.
- Every "Launch SecureX" CTA links to the main application at `https://app-securex.sp-net.in`.
- No authenticated dashboards or backend secrets live in this frontend.

## Scripts

```bash
npm install
npm run dev          # local dev server
npm run typecheck    # tsc --noEmit
npm run lint         # eslint
npm test             # vitest run
npm run build        # tsc -b && vite build (output: dist/)
npm run preview      # preview the production build
```

## Deployment (Vercel)

- Framework: Vite
- Build command: `npm run build`
- Output directory: `dist`
- SPA rewrites are provided by `vercel.json` so deep links resolve to `index.html`.