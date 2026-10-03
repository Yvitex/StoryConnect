# Story Connect Frontend

Next.js (App Router) frontend for Story Connect.

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Start the dev server on http://localhost:3000 |
| `npm run build` | Production build |
| `npm run lint` | ESLint |
| `npm run typecheck` | `tsc --noEmit` |
| `npm test` | Unit and component tests (Vitest) |
| `npm run test:e2e` | End-to-end tests (Playwright; starts the dev server) |

## Structure

```
src/
  app/
    (auth)/             Auth routes sharing one layout with the brand panel
      register/
        _components/    Components used only by /register
  components/
    auth/brand-panel/   Left-hand brand panel shared by auth pages
    ui/                 Reusable presentational primitives
```
