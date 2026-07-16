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
- Home content from MySQL (`force-dynamic`): portfolio, services, technologies, experiences, courses, site_media. If MySQL is down, list sections render empty; site images fall back to defaults in `src/lib/media.js`.
- After pulling schema changes, run `npm run db:seed` (idempotent per table; `site_media` upserts missing keys without overwriting custom URLs).
- Site images are configurable in `/admin` → “Imagens do site”. Local paths (`/assets/*`, `/uploads/*`) use `next/image` optimization via `OptimizedImage`; uploads land in `public/uploads/`.
- In `react-icons` v5, Simple Icons no longer exports `SiLinkedin`; use `FaLinkedin` from `react-icons/fa`.
- Hero typewriter uses React Bits `TextType` and persists completion in `sessionStorage` (`portfolio-hero-typed-v1`) so Fast Refresh/HMR does not restart or corrupt the text mid-session.
- Animation helpers live in `src/components/react-bits/` (copied from [React Bits](https://reactbits.dev/), deps: `gsap`, `motion`).
- Side bookmark nav (`SideNav`) targets section ids: `inicio`, `sobre`, `servicos`, `experiencia`, `cursos`, `portfolio`.
- Services cards use a fixed 240px grid + equal min-heights so unequal description lengths do not skew layout.
- Lint (`npm run lint`) may still report `@next/next/no-img-element` in admin previews; public UI uses `OptimizedImage`.
- Unit tests: `npm test` (Node test runner). There is no Jest/CRA test runner anymore.
