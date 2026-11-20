# ZOVETO landing page and demo workspace

The public marketing site and role-based local demo for ZOVETO, a veterinary services platform in development for Ghana. This frontend needs no backend to run.

## Run it

Requires **Node.js 20.19 or newer** (check with `node -v`).

```bash
npm install
npm run dev        # opens http://localhost:5173
```

That is all. The landing page, sign-in and registration screens, and role-based demo workspaces run together at `http://localhost:5173`. Optionally set `VITE_APP_URL` if the application is hosted on a separate origin.

| Command             | What it does                                          |
| ------------------- | ----------------------------------------------------- |
| `npm run dev`       | Development server with hot reload                    |
| `npm run build`     | Type-check and create the production build in `dist/` |
| `npm run preview`   | Serve the production build locally                    |
| `npm run lint`      | ESLint                                                |
| `npm run typecheck` | TypeScript, no output                                 |
| `npm test`          | Vitest and Testing Library                            |
| `npm run format`    | Prettier (with Tailwind class sorting)                |

In VS Code, accept the recommended extensions (Tailwind CSS IntelliSense, Prettier, ESLint). Format on save is already configured.

## Stack

Vite · React 19 · TypeScript (strict) · Tailwind CSS v4 · lucide-react icons · Fontsource Inter (bundled, no external font requests) · Vitest + Testing Library · ESLint + Prettier.

## Structure

```
src/
  app/              Route switch for the landing page, demo access and workspaces
  components/
    dashboard/      Role-specific navigation, workspace shell and summary charts
    layout/         Header, Footer and SkipLink
    pages/          Landing, demo sign-in and workspace pages
    sections/       Landing-page sections
    ui/             Reusable interface primitives
  data/             Versioned sample workspace and local persistence
  auth/             Browser-only demo session (no password storage)
  content/          All copy and data, typed. Edit text here, not in components.
  config/           Site constants and link builders (appLink, loginLink, registerLink)
  hooks/            Reusable hooks for navigation, motion and local data
  lib/              Small utilities for routes, themes and CSS classes
  styles/           Tailwind entry and design tokens
  test/             Test setup
tests/              Unit and component tests
public/             Favicon, robots.txt and local images
```

### Conventions

- **Content is separate from presentation.** Sections read from `src/content/*`, which is typed (`types.ts`). To change wording, plans, FAQ or navigation, edit those files.
- **One section, one file.** Sections are independent. Reorder or remove them in `src/app/app.tsx`.
- **Design tokens live in `src/styles/index.css`.** Use semantic utilities (`bg-surface`, `text-ink`, `text-muted`, `border-line`, `bg-deep`, `bg-forest`, `bg-sage`, `bg-cream`). The main palette uses deep green `#123B35`, teal `#167C6A` and grey `#646E73`, with warm light surfaces.
- **Theme:** the landing page follows the saved or system light/dark preference. The sign-in and demo workspaces stay light for consistent readability.
- **Links into the app go through `src/config/site.ts`**, never hard-coded.
- **Legal links:** set `VITE_PRIVACY_URL`, `VITE_TERMS_URL` and `VITE_SUPPORT_EMAIL` to show published policies and support contact in the footer. Missing links are identified as unpublished.
- **Demo limits:** Sign-in only creates a browser-local demo session. Sample data is stored in this browser's `localStorage`; it is not secure, shared with a server, or synchronized across devices. No real authentication, clinical records, payments, pharmacy orders, or notifications are provided.
- **Path alias:** `@/` points to `src/`.

## Quality

- Accessible by design: skip link, landmarks, one `h1`, labelled sections, keyboard-operable menu (Escape closes it), native `<details>` FAQ, visible focus, reduced-motion support, 44 px touch targets on controls.
- Tests cover page structure, that every navigation link has a target section, that every sign-up and sign-in button points into the app, the mobile menu, and content integrity.

## Content notes before you publish

- The page describes a product in development. Pharmacy listings, offline access, Mobile Money payments and paid plans are identified as planned features rather than available today. Update `src/content` as their status changes.
- Plan prices are intentionally absent. Add them in `src/content/plans.ts` when decided.
- The hero photograph is stored locally in `public/images/veterinary-care.jpg`.
- Configure legal links before launch. The footer will not invent policy URLs or a support address.

## Deploying

`npm run build` produces a static site in `dist/` that any static host can serve (Netlify, Vercel, Cloudflare Pages, nginx). Set `VITE_APP_URL` in the host's environment before building.

## Demo workspaces

Use the sign-in or registration page to select a farmer, animal keeper, veterinary professional or pharmacy workspace. In development, an admin preview is also available. Workspaces share the same sample data in the current browser so local changes appear across roles and tabs. Use **Export data** to download a JSON snapshot or **Reset demo** to restore the original sample records. Do not enter real personal, payment or animal health information.
