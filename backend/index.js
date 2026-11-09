import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';
import { existsSync } from 'node:fs';
import { appendFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = process.env.PORT || 5000;
const FRONTEND_DIST = path.resolve(__dirname, '../frontend/dist');
const INBOX_FILE = path.join(__dirname, 'data', 'messages.jsonl');

const app = express();
app.disable('x-powered-by');
app.set('trust proxy', 1);
app.use(express.json({ limit: '20kb' }));

// Allow deployed frontends (Vercel / Render / localhost) to call this API.
const allowedOrigins = (process.env.CLIENT_ORIGIN || process.env.CORS_ORIGIN || '')
  .split(',')
  .map((o) => o.trim())
  .filter(Boolean);
app.use(
  '/api',
  cors({
    origin: allowedOrigins.length ? allowedOrigins : true,
    methods: ['GET', 'POST'],
  }),
);

/* ---------- Mail transport (optional) ---------- */

const smtpConfigured = Boolean(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS);
const smtpPort = Number(process.env.SMTP_PORT || 465);
const smtpSecure =
  process.env.SMTP_SECURE !== undefined ? process.env.SMTP_SECURE === 'true' : smtpPort === 465;

const transporter = smtpConfigured
  ? nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: smtpPort,
      secure: smtpSecure,
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    })
  : null;

/* ---------- Tiny in-memory rate limiter ---------- */

const WINDOW_MS = 15 * 60 * 1000;
const MAX_REQUESTS = 5;
const hits = new Map();

function rateLimit(req, res, next) {
  const now = Date.now();
  const key = req.ip;
  const recent = (hits.get(key) || []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= MAX_REQUESTS) {
    return res.status(429).json({ error: 'Too many messages. Please try again in a few minutes.' });
  }
  recent.push(now);
  hits.set(key, recent);
  next();
}

/* ---------- Helpers ---------- */

const clean = (v, max) => (typeof v === 'string' ? v.trim().slice(0, max) : '');
const escapeHtml = (s) =>
  s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

function validate(body) {
  const data = {
    firstName: clean(body.firstName, 80),
    lastName: clean(body.lastName, 80),
    phone: clean(body.phone, 40),
    email: clean(body.email, 160),
    budget: clean(body.budget, 40),
    message: clean(body.message, 5000),
  };
  const errors = [];
  if (!data.firstName) errors.push('First name is required.');
  if (!data.lastName) errors.push('Last name is required.');
  if (!/^\S+@\S+\.\S+$/.test(data.email)) errors.push('A valid email is required.');
  if (data.phone && !/^[+\d][\d\s()-]{6,}$/.test(data.phone)) errors.push('Phone number looks invalid.');
  if (data.message.length < 10) errors.push('Message should be at least 10 characters.');
  return { data, errors };
}

/* ---------- Routes ---------- */

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, mail: smtpConfigured ? 'smtp' : 'file' });
});

app.post('/api/contact', rateLimit, async (req, res) => {
  const body = req.body || {};

  // Honeypot field: real users never fill it in. Pretend success for bots.
  if (body.company) return res.json({ message: "Thanks! I'll be in touch soon." });

  const { data, errors } = validate(body);
  if (errors.length) return res.status(400).json({ error: errors[0], errors });

  const entry = { ...data, receivedAt: new Date().toISOString() };

  try {
    if (transporter) {
      const fullName = `${data.firstName} ${data.lastName}`;
      const fromEmail = process.env.CONTACT_FROM_EMAIL || process.env.SMTP_USER;
      const toEmail = process.env.CONTACT_TO || process.env.CONTACT_TO_EMAIL || process.env.SMTP_USER;
      const rows = [
        ['Name', fullName],
        ['Email', data.email],
        ['Phone', data.phone || '—'],
        ['Budget', data.budget || '—'],
      ];
      await transporter.sendMail({
        from: `"Portfolio Contact" <${fromEmail}>`,
        to: toEmail,
        replyTo: `"${fullName}" <${data.email}>`,
        subject: `New portfolio enquiry from ${fullName}`,
        text: `${rows.map(([k, v]) => `${k}: ${v}`).join('\n')}\n\n${data.message}`,
        html: `
          <div style="font-family:Arial,sans-serif;color:#080C14">
            <h2 style="margin:0 0 16px;color:#0D51EF">New portfolio enquiry</h2>
            <table cellpadding="6" style="border-collapse:collapse">
              ${rows.map(([k, v]) => `<tr><td style="color:#647084">${k}</td><td><strong>${escapeHtml(v)}</strong></td></tr>`).join('')}
            </table>
            <p style="white-space:pre-wrap;line-height:1.6;margin-top:20px">${escapeHtml(data.message)}</p>
          </div>`,
      });
    } else {
      // No SMTP configured: keep the message on disk so nothing is lost.
      await mkdir(path.dirname(INBOX_FILE), { recursive: true });
      await appendFile(INBOX_FILE, `${JSON.stringify(entry)}\n`);
      console.log(`[contact] Saved message from ${data.email} to data/messages.jsonl`);
    }
    res.json({ message: "Thanks! Your message is on its way. I'll get back to you soon." });
  } catch (err) {
    console.error('[contact] Failed to deliver message:', err);
    res.status(500).json({ error: 'Your message could not be sent right now. Please try WhatsApp instead.' });
  }
});

app.use('/api', (_req, res) => res.status(404).json({ error: 'Not found' }));

/* ---------- Serve the built React app in production ---------- */

if (existsSync(FRONTEND_DIST)) {
  app.use(express.static(FRONTEND_DIST, { maxAge: '7d', index: false }));
  app.use((req, res, next) => {
    if (req.method !== 'GET') return next();
    res.sendFile('index.html', { root: FRONTEND_DIST });
  });
}

app.listen(PORT, () => {
  console.log(`API listening on http://localhost:${PORT} (mail: ${smtpConfigured ? 'SMTP' : 'file fallback'})`);
});
