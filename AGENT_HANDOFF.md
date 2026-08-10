# Agent Handoff Notes

Read this before making changes. It tells you what's actually wired up vs.
still static, what decisions were made and why, and a prioritized TODO list.

## Stack (as requested)

- Frontend: React 19, Vite, Tailwind CSS v4, Framer Motion, React Router — JS (no TS)
- Backend: Node.js, Express, ESM (`"type": "module"` in `backend/package.json`) — JS (no TS)

Both `package.json` files already declare these; nothing needs migrating.

## Where this came from

The frontend was an existing static portfolio template (uploaded as
`template.zip`) — a solo-page site (`pages/Home.jsx`) with several
sub-pages (Experience, Projects, Tools, Writings). It had **no backend**:
all content was hardcoded in components, and the contact form just opened
a WhatsApp deep link.

This pass added a proper backend and started wiring the frontend to it.
The visual design, animations, and routing structure were left untouched —
only data-fetching and the contact form were changed.

## What is actually wired end-to-end right now

1. **Contact form** (`frontend/src/assets/components/Contact.jsx`) → `POST /api/contact`
   - Validated server-side with `zod` (`backend/src/routes/contact.js`)
   - Rate-limited (5 requests / 15 min per IP)
   - Has a honeypot field (`company`) for basic bot filtering
   - Saved to `backend/src/data/messages.json` on every valid submission
   - Optionally emailed via `nodemailer` if `SMTP_*` env vars are set (see `backend/src/utils/mailer.js`) — **not required**, submissions are safe either way
   - Readable via `GET /api/contact/messages` with header `x-admin-key: <ADMIN_KEY>`
   - **On any failure**, the frontend falls back to the original WhatsApp-link behavior, so this can never leave the user with a dead form.

2. **Projects section** (`frontend/src/assets/components/Projects.jsx`) → `GET /api/projects`
   - Fetches on mount, falls back to a hardcoded array (identical content) if the request fails.

3. **Experience section** (`frontend/src/assets/components/Experience.jsx`, the homepage teaser) → `GET /api/experience`
   - Same fetch-with-fallback pattern as Projects.

## What is NOT wired yet (static, on purpose — ran out of scope/budget, not because it's hard)

These are all straightforward — same fetch-with-fallback pattern as above —
and are the natural next steps:

1. **`frontend/src/assets/components/ExperienceExt.jsx`** (the full
   `/experience` page) still has its own hardcoded copy of the experience
   list. Should fetch from `GET /api/experience` too. Currently the
   homepage teaser and the full page could drift out of sync since one is
   live-fetched and the other isn't — fix this first.

2. **Writings / blog** (`frontend/src/lib/writing.js`,
   `WritingsIndex.jsx`, `WritingDetail.jsx`, `pages/WritingsPage.jsx`,
   `pages/WritingDetailPage.jsx`) still use Vite's `import.meta.glob` to
   read markdown files bundled at **build time** from
   `frontend/src/content/writings/*.md`. The backend already has an
   equivalent — and now canonical — copy of these files at
   `backend/src/data/writings/*.md`, served via `GET /api/writings` and
   `GET /api/writings/:slug` (`backend/src/routes/writings.js` reuses the
   exact same frontmatter-parsing logic as the old frontend lib, so the
   output shape matches).
   **Important:** the two markdown copies (`frontend/src/content/writings/`
   and `backend/src/data/writings/`) are currently duplicated and will
   drift. Decide on one source of truth: either delete the frontend copy
   and switch `WritingsIndex.jsx`/`WritingDetail.jsx` to fetch from the
   API (recommended, since it makes adding a post a backend-only change
   with no rebuild), or delete the backend copy and drop the
   `/api/writings` routes if you'd rather keep the blog fully static.

3. **Tools section** (`frontend/src/assets/components/Tools.jsx`) is
   intentionally left static. Each tool's icon is inline JSX/SVG, which
   doesn't serialize to JSON cleanly. `backend/src/routes/tools.js` and
   `backend/src/data/tools.json` exist with name/description/url only (no
   icons) as a starting point, but nothing consumes them yet. Either (a)
   leave Tools.jsx fully static — it rarely changes — or (b) pick an icon
   library available at runtime (e.g. render by name from
   `lucide-react`, which is already a dependency) and map icon names in
   the JSON to components.

4. **About / Services / Header / Sidenav / Footer** — no dynamic content,
   nothing to wire.

## Design decisions worth knowing about

- **Fetch-with-fallback, not fetch-or-die.** Every component that hits the
  API keeps its original hardcoded data as a fallback and swallows fetch
  errors (logged to console only). This means the site never breaks or
  shows a blank section if the backend is down or not deployed — it just
  silently reverts to static content. Keep this pattern for any new API
  wiring unless there's a strong reason to require the backend.
- **`backend/src/data/*.json` is the "database.**" There's no real DB yet.
  This is fine for a low-traffic portfolio. If that ever changes, the
  routes in `backend/src/routes/` are already isolated enough that
  swapping `readFile`/`writeFile` for a real DB client (SQLite, Postgres,
  etc.) only touches those files.
- **`vite.config.js`'s `base` was changed from `'/template/'` to `'/'`.**
  The original repo was deployed to GitHub Pages at a `/template/`
  subpath, which also meant image `src`/`href` paths were hardcoded with
  that prefix. Those were updated to root-relative paths
  (`/images/...`). If you deploy to a subpath again, revert both.
- **CORS is allow-listed via `CORS_ORIGIN`** in `backend/.env` (comma
  separated), not wide open. Update it per environment.
- **The admin key for reading contact messages (`ADMIN_KEY`) is a single
  shared secret in a header** — intentionally minimal. Do not reuse this
  pattern anywhere real auth is needed (e.g. a future admin dashboard) —
  swap for sessions/JWT first.

## Environment files

Neither `.env` is committed (both `.gitignore`d). Copy the `.env.example`
in each app before running:

```bash
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
```

`backend/.env` works with all defaults except you should change
`ADMIN_KEY`. SMTP fields can stay empty — email sending is optional.

## Suggested next steps, in priority order

1. Wire `ExperienceExt.jsx` to `GET /api/experience` (see item 1 above) — highest priority, avoids content drift.
2. Decide the writings source-of-truth (item 2) and wire accordingly.
3. Add a couple of backend tests (none exist yet — no test runner is configured either; `vitest` or Node's built-in `node:test` would both fit an ESM project like this with minimal setup).
4. Consider moving `backend/src/data/*.json` to a real database once/if the content needs to be editable without a redeploy.
5. Add a minimal admin UI (or just document using `curl`/Postman with `x-admin-key`) for reading `/api/contact/messages` day to day.
