# Lanre Sanni — Portfolio Website

A full-stack rebuild of [Lanre Sanni's portfolio](https://lanre-sanni.vercel.app/) styled after the editorial design of [uxfol.io/4127272f](https://uxfol.io/4127272f).

- **Frontend:** React 19 + Vite + Tailwind CSS v4 + React Router + React Markdown
- **Backend:** Node.js + Express 5 + Nodemailer (with a JSONL inbox for local development)

---

## Project Structure

```text
lanre-portfolio/
├── frontend/                   # React + Tailwind CSS frontend (Vite)
│   ├── public/
│   │   ├── images/             # LS logos, favicon, and project device screenshots
│   │   └── Lanre.Sanni.pdf     # Viewable & downloadable CV
│   └── src/
│       ├── components/         # Navbar, Footer, BrandLogo, ThemeToggle, ProjectCard, WritingList, Counter, Reveal, Layout
│       ├── content/writings/   # 10 full Markdown blog posts
│       ├── data/               # site.js (single source of truth) & writings.js loader
│       └── pages/              # Home, About, Writings, WritingPost, Contact, NotFound
├── backend/                    # Node.js + Express contact API & static host
│   ├── index.js                # /api/health, /api/contact + SPA static serving
│   └── .env.example            # Optional SMTP and CORS configuration
├── api/                        # Serverless /api/contact function for Vercel deployments
├── vercel.json                 # Vercel build & SPA rewrite configuration
└── package.json                # Root scripts to run both frontend and backend
```

---

## Quick Start

### 1. Development (Frontend + Backend)

Use Node.js 24 LTS. From the repository root:

```bash
npm run install:all
npm run dev
```

- **Frontend (Vite):** `http://localhost:5173` (proxies `/api/*` requests to port `5000`)
- **Backend (Express):** `http://localhost:5000`

### 2. Frontend-only Mode (No Backend Needed)

If you want to run or deploy only the static frontend:

```bash
cd frontend
npm ci
npm run dev      # Local dev server
npm run build    # Production build in frontend/dist
```

### 3. Production Build (Single Node/Express Server)

Build the React app and let Express serve both the static frontend and `/api/contact`:

```bash
npm run build
npm start
```

Then open `http://localhost:5000`.

---

## Contact delivery

For local development without SMTP, Express saves submissions to `backend/data/messages.jsonl`. To test email delivery, copy `backend/.env.example` to `backend/.env` and fill in your SMTP settings.

Hosted email delivery requires `SMTP_HOST`, `SMTP_USER`, and `SMTP_PASS`. Set `SMTP_PORT` and `SMTP_SECURE` to match your provider, typically port 465 with implicit TLS or port 587 with STARTTLS. Set `CONTACT_TO` (or `CONTACT_TO_EMAIL`) to choose the recipient and `CONTACT_FROM_EMAIL` to choose the sender. Both addresses default to `SMTP_USER`. Keep the SMTP credentials in the hosting provider's server environment.

- **Vercel.** Use the repository root or `frontend` as the project root and leave `VITE_API_URL` unset to use the included same-origin `/api/contact` function. Add SMTP settings in the Vercel project for the environments that should send mail.
- **Single Express server.** Set `NODE_ENV=production` and configure SMTP when hosting the built frontend and API together.

Without SMTP, valid production submissions receive HTTP 503. Express reports the configured delivery mode at `/api/health`.

Set `profile.email` in `frontend/src/data/site.js` to display a public contact email.
