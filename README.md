# Lanre Sanni — Portfolio Website

A full-stack rebuild of [Lanre Sanni's portfolio](https://lanre-sanni.vercel.app/) styled after the editorial design of [uxfol.io/4127272f](https://uxfol.io/4127272f).

- **Frontend:** React 19 + Vite + Tailwind CSS v4 + React Router + React Markdown
- **Backend:** Node.js + Express 5 + Nodemailer (with automatic local JSONL fallback when SMTP isn't configured)

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

From the root `lanre-portfolio/` directory:

```bash
npm run dev
```

- **Frontend (Vite):** `http://localhost:5173` (proxies `/api/*` requests to port `5000`)
- **Backend (Express):** `http://localhost:5000`

### 2. Frontend-only Mode (No Backend Needed)

If you want to run or deploy only the static frontend:

```bash
cd client
npm run dev      # Local dev server
npm run build    # Production build in client/dist
```

### 3. Production Build (Single Node/Express Server)

Build the React app and let Express serve both the static frontend and `/api/contact`:

```bash
npm run build
npm start
```

Then open `http://localhost:5000`.

---

## Configuring Email Delivery (Optional)

By default, contact form submissions are validated, rate-limited, and saved to `server/data/messages.jsonl` so everything works out of the box without credentials.

To also deliver submissions via email (Nodemailer), copy `server/.env.example` to `server/.env` and fill in your SMTP details:

```env
PORT=5000
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
CONTACT_TO=your-email@gmail.com
```

You can also set your public email address in `client/src/data/site.js` (`profile.email`) to display it in the footer and contact page alongside WhatsApp (`+234 803 512 0129`).
