# Philo Explorer – Engineering Plan

Last updated: 2025-08-15 06:23 EDT

## 1) Project structure, dependencies, documentation

- __Framework__: React 18 + TypeScript + Vite
- __Styling__: Tailwind CSS; shadcn-style primitives in `src/components/ui/`
- __Key files__:
  - `src/pages/Explorer.tsx` – main SPA component (data model, UI, state)
  - `src/main.tsx` – entry point; renders `Explorer`
  - `index.html` – Vite HTML shell
  - `tailwind.config.js` – Tailwind + safelist for dynamic color classes
  - `vite.config.ts` – Vite + React + tsconfig paths plugin
  - `wrangler.jsonc` – Cloudflare Pages config (`dist`)
  - `README.md`, `CLAUDE.md` – usage and assistant guidance
- __Dependencies__ (`package.json`):
  - runtime: `react`, `react-dom`, `@radix-ui/react-tooltip`, `lucide-react`
  - dev: `vite`, `@vitejs/plugin-react`, `vite-tsconfig-paths`, `typescript`, `tailwindcss`, `postcss`, `autoprefixer`, `wrangler`
- __Scripts__:
  - `dev` (Vite dev server), `build` (Vite build), `preview`, `cf:deploy`, `cf:dev`

## 2) Architecture & design of (SPA) “endpoints”

- __SPA, no routing__: All navigation via React state. No backend endpoints.
- __Data model__ (in `Explorer.tsx`):
  - `Tradition` interface and `DATA: Tradition[]`
  - Core aspects: `reality`, `self`, `problem`, `response`, `aim` (`RowKey`)
- __State__ (in `Explorer.tsx`):
  - `selectedId`, `selectedTradition`, `selectedAspect`
  - `query`, `cutoffYear`, `timelineScale`, `timelineView`, `timelineFocusYear`, `hoveredTradition`
- __Computed/memos__:
  - `timeline` (sorted by `firstYear`)
  - `searchResults` with match locations; auto-select behavior
- __UI layout__:
  - Three-pane dashboard in a single component
  - Timeline interactions and aspect comparison
  - Tooltips via `@radix-ui/react-tooltip`
- __Build & deploy__:
  - Vite outputs to `dist/`; Cloudflare Pages via wrangler

## 3) UI/UX design, state management, testing

- __UI/UX__:
  - Three-pane layout; clear, student-friendly copy
  - Color-coded traditions; responsive Tailwind utilities
  - Educational tooltips for terms (BCE/CE, family categories)
- __State management__:
  - React hooks with `useMemo`, `useCallback`, `useEffect` to optimize re-renders
  - Derived data for search and timeline
- __Testing__:
  - No test setup present. Consider adding:
    - Unit tests (Vitest + React Testing Library)
    - Type checks in CI

## 4) Quality & scalability assessment

- __Strengths__:
  - Simple SPA with static data; minimal dependencies
  - Tailwind with safelist to support dynamic color classes
  - Clear separation of concerns in a single file for MVP
- __Risks / Scalability__:
  - `Explorer.tsx` is very large (>1,000 LOC). As features grow:
    - Split into subcomponents: Timeline, TraditionList, DetailPane, ComparePane, SearchBar
    - Extract `DATA` into `src/data/traditions.ts` for maintainability
    - Centralize types in `src/types.ts`
  - Add tests and linting for regression safety
  - Consider routing if future pages emerge

## 5) Next steps

- __Run locally__: `npm install && npm run dev` (Vite, likely on 5173)
- __Add tests__: Vitest + RTL baseline smoke tests
- __Refactor__: Extract components and data modules
- __CI__: Add GitHub Actions for typecheck, build, (future) tests

## 6) Notes for future contributors

- Dynamic Tailwind classes rely on safelist in `tailwind.config.js`. Maintain if adding new color palettes.
- No environment variables required for local run.
- Deployment requires Cloudflare account + wrangler login.
