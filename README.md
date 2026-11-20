# ZOVETO landing page

The public marketing site for ZOVETO, the veterinary services platform for Ghana. A standalone React application: no backend and no database are needed to run it.

## Run it

Requires **Node.js 20.19 or newer** (check with `node -v`).

```bash
npm install
npm run dev        # opens http://localhost:5173
```

That is all. Optional: `cp .env.example .env` and set `VITE_APP_URL` to where the ZOVETO web application runs. Every "Log in" and "Create account" button links there (default `http://localhost:3000`).

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

Vite · React 19 · TypeScript (strict) · Tailwind CSS v4 · lucide-react icons · Fontsource (Inter and Space Grotesk, bundled, no external font requests) · Vitest + Testing Library · ESLint + Prettier.

## Structure

```
src/
  app/              App root: composes the page from sections
  components/
    layout/         Header (with mobile menu), Footer, SkipLink
    sections/       One file per page section (Hero, Audiences, Features, Plans, Faq…)
    mockups/        Product illustrations (dashboard, phone, donut chart)
    ui/             Reusable primitives (Button, Container, Logo, SectionHeading, StatusTag…)
  content/          All copy and data, typed. Edit text here, not in components.
  config/           Site constants and link builders (appLink, loginLink, registerLink)
  hooks/            Reusable hooks (useDisclosure)
  lib/              Small utilities (cn)
  styles/           Tailwind entry and design tokens
  test/             Test setup
tests/              Unit and component tests
public/             Favicon and robots.txt
```

### Conventions

- **Content is separate from presentation.** Sections read from `src/content/*`, which is typed (`types.ts`). To change wording, plans, FAQ or navigation, edit those files.
- **One section, one file.** Sections are independent. Reorder or remove them in `src/app/app.tsx`.
- **Design tokens live in `src/styles/index.css`.** Use semantic utilities (`bg-surface`, `text-ink`, `text-muted`, `border-line`, `bg-deep`, `bg-mint`). Light and dark mode follow the visitor's system setting automatically.
- **Links into the app go through `src/config/site.ts`**, never hard-coded.
- **Path alias:** `@/` points to `src/`.

## Quality

- Accessible by design: skip link, landmarks, one `h1`, labelled sections, keyboard-operable menu (Escape closes it), native `<details>` FAQ, visible focus, reduced-motion support, 44 px touch targets on controls.
- Tests cover page structure, that every navigation link has a target section, that every sign-up and sign-in button points into the app, the mobile menu, and content integrity.

## Content notes before you publish

- The page describes a product that is built in stages. Features that arrive after the core marketplace (health records, reminders, pharmacy catalogue, finance, offline records, disease documentation, medicine stock) carry `planned: true` in `src/content/features.ts` and `src/content/field-tools.ts`, which shows a "Planned" tag. Remove the flag as each one goes live. The hero, audience, FAQ and fact wording that says "planned" lives in the same folder and needs the same update.
- Payment methods are not named on the page because the payment provider is not decided.
- A **draft privacy notice** ships at `/privacy/` (words in `src/content/privacy.ts`, page in `src/app/privacy-page.tsx`). It states only what this website does today, and tests fail if the code stops matching (cookies, analytics, outside requests, items in local storage). Everything that needs a business or legal decision is shown on the page as "To be confirmed before launch". Finish it with the ZOVETO team and a legal review, then clear those items, set `draft: false` in `src/content/privacy.ts` and remove the `noindex` tag in `privacy/index.html`.
- The terms of use and support contact are not written yet. Set `VITE_TERMS_URL` and `VITE_SUPPORT_EMAIL` (see `.env.example`) when each exists and the footer links to it. Until then the footer says it is not published yet. `VITE_PRIVACY_URL` only needs setting if the privacy notice is published somewhere else.
- Plan prices are intentionally absent. Add them in `src/content/plans.ts` when decided.
- The dashboard and phone illustrations use sample entries and are labelled as such.
- The footer has no legal links. Add Terms and Privacy pages and link them from `src/components/layout/footer.tsx`.

## Deploying

`npm run build` produces a static site in `dist/` that any static host can serve (Netlify, Vercel, Cloudflare Pages, nginx). Set `VITE_APP_URL` in the host's environment before building.

## Using it with the ZOVETO application

This site is separate from the application. Run both locally: the landing page on port 5173 and the application on port 3000. In production, serve the landing page at the main domain (for example `zoveto.com`) and the application at a subdomain (for example `app.zoveto.com`), and set `VITE_APP_URL` accordingly.
