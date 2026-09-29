# bibesh-timalsina.me

My personal website — and a sandbox for practicing clean CI/CD.

**Live:** https://www.bibesh-timalsina.me

## Stack

- [Next.js 16](https://nextjs.org) (App Router, static export)
- [shadcn/ui](https://ui.shadcn.com) on Radix + Tailwind CSS v4
- [Motion](https://motion.dev) for small scroll reveals and count-ups (respects reduced-motion)
- Inter via `next/font`

## Project layout

```
frontend/
  app/            layout, page, global styles
  components/     site header, motion helpers, icons
  components/ui/  shadcn/ui primitives
  lib/content.ts  all site copy — edit this to update the site
  public/         headshot (+ optional Resume.pdf)
```

To show a résumé button, drop `Resume.pdf` into `frontend/public/`. The link appears on the next build.

## Development

```bash
cd frontend
nvm use          # Node 22
npm ci
npm run dev      # http://localhost:3000
npm run check    # lint + typecheck + build, same as CI
```

## Workflow

- `main` is always deployable. Work happens on `feature/*` or `fix/*` branches and merges via pull request.
- Commits follow [Conventional Commits](https://www.conventionalcommits.org) (`feat:`, `fix:`, `ci:`, `docs:`, `chore:`).
- **CI** (`.github/workflows/ci.yml`) runs lint, typecheck and build on every PR.
- **Deploy**: pushes to `main` build and deploy to GitHub Pages (`nextjs.yml`); the custom domain is served by Vercel.
