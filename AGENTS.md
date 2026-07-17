# AGENTS.md

## Cursor Cloud specific instructions

This is a **Next.js + MySQL** personal portfolio. Standard commands live in `README.md` and `package.json`.

### Services

| Service | How to run | Notes |
|---------|------------|-------|
| Next.js app | `npm run dev` | http://localhost:3000 |
| MySQL | `npm run db:up` or `npm run db:init` | Docker Compose service `mysql` on port `3306` |
| Admin CRUD | http://localhost:3000/admin | Password from `ADMIN_PASSWORD` in `.env.local` (default `admin123`) |

### Non-obvious caveats

- Copy `.env.example` → `.env.local` before first run if the file is missing. The app reads DB + admin password from `.env.local`.
- If Docker is installed but `docker` fails with permission errors on `/var/run/docker.sock`, fix socket permissions (or run the daemon) before `npm run db:init`.
- `npm run db:seed` is idempotent: it creates the table if needed and skips inserting when `portfolio_items` already has rows.
- Home content from MySQL (`force-dynamic`): portfolio, services, technologies, experiences, courses, site_media, site_settings. If MySQL is down, list sections render empty; images/texts fall back to defaults in `src/lib/media.js` and `src/lib/defaultSettings.json`.
- Quote requests (`quote_requests`) are created by `POST /api/contact/quote` (always saved). Email is sent when `CONTACT_SMTP_HOST` + `CONTACT_TO_EMAIL` (or `CONTACT_SMTP_TO`) are set; otherwise `email_status=skipped`. Admin lists them under “Orçamentos recebidos”.
- After pulling schema changes, run `npm run db:seed` (idempotent per table; `site_media` / `site_settings` upsert missing keys without overwriting custom values).
- Production seed (`scripts/deploy-remote.sh`) runs `node /workspace/scripts/seed.js` with cwd `/tmp/seed-work`. Paths inside `seed.js` must use `__dirname`, not `process.cwd()`, so files like `src/lib/defaultSettings.json` resolve under the mounted repo.
- Site images are configurable in `/admin` → “Imagens”. Site copy (hero, about, section titles, nav, SEO, footer, contacts) is in `/admin` → “Textos”. Defaults live in `src/lib/defaultSettings.json`.
- Local paths (`/assets/*`, `/uploads/*`) use `next/image` optimization via `OptimizedImage`; uploads land in `public/uploads/`.
- In `react-icons` v5, Simple Icons no longer exports `SiLinkedin`; use `FaLinkedin` from `react-icons/fa`.
- Hero typewriter uses React Bits `TextType` and persists completion in `sessionStorage` (`portfolio-hero-typed-v1`) so Fast Refresh/HMR does not restart or corrupt the text mid-session.
- Animation helpers live in `src/components/react-bits/` (copied from [React Bits](https://reactbits.dev/), deps: `gsap`, `motion`).
- Side bookmark nav (`SideNav`) targets section ids: `inicio`, `sobre`, `servicos`, `experiencia`, `cursos`, `portfolio`. Desktop: fixed 156px width + 28px right-edge peek. ≤900px: becomes a horizontal bottom bar (do not hide without a replacement).
- Prefer `calc(100% - 32px)` / `clamp()` over raw `90vw` + fixed `50px` side padding to avoid mobile horizontal scroll (Services grid, Experience timeline dots, Portfolio `minmax`).
- `SiteFooter` must stay visible without scroll-triggered fade (`FadeContent`). Do not wrap the footer in opacity-0 enter animations — in prod ScrollTrigger can leave it invisible.
- `FadeContent` scrolls with `window` (no `snap-main-container`). It plays immediately if already in view and has a short fallback so content cannot stay stuck at `autoAlpha: 0`.
- Services cards use a fixed 240px grid + equal min-heights so unequal description lengths do not skew layout.
- Lint (`npm run lint`) may still report `@next/next/no-img-element` in admin previews; public UI uses `OptimizedImage`.
- Unit tests: `npm test` (Node test runner). There is no Jest/CRA test runner anymore.
