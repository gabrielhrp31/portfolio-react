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
- Home content from MySQL (`force-dynamic`): portfolio, services, technologies, experiences, courses. If MySQL is down, those sections render empty instead of crashing.
- After pulling schema changes, run `npm run db:seed` (idempotent per table) so new tables get created and seeded.
- In `react-icons` v5, Simple Icons no longer exports `SiLinkedin`; use `FaLinkedin` from `react-icons/fa`.
- Lint (`npm run lint`) may report `@next/next/no-img-element` warnings for existing `<img>` usage; that is expected for this UI.
- Unit tests: `npm test` (Node test runner). There is no Jest/CRA test runner anymore.
