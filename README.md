# Philosophy & Religion Explorer

An interactive explorer to compare traditions and drill down into key ideas and references.

## Tech Stack
- Vite + React + TypeScript
- Tailwind CSS
- Minimal UI primitives (card, dialog, tabs, etc.)
- Icons: lucide-react
- Deploy: Cloudflare Pages (`wrangler`)

## Local Development
```bash
npm install
npm run dev
# open http://localhost:5173
```

## Build
```bash
npm run build
# output in dist/
```

## Deploy to Cloudflare Pages
```bash
# login once
npx wrangler login
# build then deploy
npm run build
npm run cf:deploy
```

## Project Structure
- `src/pages/Explorer.tsx` — main UI and data model.
- `src/components/ui/*` — minimal UI components.
- `tailwind.config.js` — semantic colors and safelist for dynamic classes.
- `wrangler.jsonc` — Pages config with `pages_build_output_dir: dist`.

## Repo
GitHub: https://github.com/Sum1Solutions/philo-explorer
