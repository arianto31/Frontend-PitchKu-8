# PitchKu — Frontend

Next.js frontend for PitchKu, an AI-powered business presentation generator built for Indonesian SMEs (UMKM).

## Stack

- Next.js 16 (App Router), TypeScript strict
- Tailwind CSS v4 (design tokens via `@theme` in `globals.css`, not `tailwind.config.js`)
- `motion` (Framer Motion) for animation — entrance sequences, scroll-linked reveals, mouse-parallax tilt
- Fonts: Schibsted Grotesk (display), Public Sans (UI/body), IBM Plex Mono (functional data — file names, version numbers)

## Running Locally

```bash
npm install
cp .env.local.example .env.local
# fill in NEXT_PUBLIC_API_BASE_URL to point at your backend
npm run dev
```

## Feature Status

Complete and wired to the real backend:
- Landing page, with scroll-driven and entrance animation throughout
- Signup / Login / Logout (proxied through the backend, which itself proxies Supabase Auth — the frontend never holds a Supabase key)
- Brand Kit: logo upload, color picker, saved identity used across every generated deck
- Dashboard: project list (duplicate/delete), create new project
- Wizard: generate outline → review/edit/reorder outline → generate content → slide preview → export to PPTX/PDF

**Known limitation:** the backend has no endpoint to re-fetch an outline or a generated deck after the fact — only the initial generation call returns it. If the browser is refreshed mid-wizard, in-progress state is lost and must be regenerated (this doesn't affect already-completed projects, since export reads directly from the backend's stored data). See `docs/CONVENTIONS.md` in the backend repo for the full reasoning.

## Design System

See the comments in `src/app/globals.css` for the full rationale behind the color and
typography tokens. In short:
- `--color-paper` / `--color-ink` — paper and ink, deliberately not cream or flat black
- `--color-press` — the primary accent, used with restraint (buttons, focus states)
- `--color-gold` — a secondary accent, used sparingly for a single highlight moment per view
- `--color-forest` — a bold solid color block, spent once per page rather than scattered

Border radius is intentionally inconsistent: `--radius-sheet` stays sharp on structural
elements (cards, panels), while `--radius-control` is reserved for interactive controls.
This is a deliberate departure from the "uniform rounded-card" look that makes a lot of
SaaS UI feel templated.