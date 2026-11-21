import express from 'express';
import cors from 'cors';
import { sendContact, smtpConfigured, validateContact } from './contact.js';
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

/* ---------- Tiny in-memory rate limiter ---------- */

const WINDOW_MS = 15 * 60 * 1000;
const MAX_REQUESTS = 5;
const hits = new Map();

setInterval(() => {
  const cutoff = Date.now() - WINDOW_MS;
  for (const [ip, timestamps] of hits) {
    if (timestamps.at(-1) <= cutoff) hits.delete(ip);
  }
}, WINDOW_MS).unref();

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

/* ---------- Routes ---------- */

const localInboxEnabled = process.env.NODE_ENV !== 'production';
const mailMode = smtpConfigured ? 'smtp' : localInboxEnabled ? 'file' : 'unavailable';

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, mail: mailMode });
});

app.post('/api/contact', rateLimit, async (req, res) => {
  const body = req.body || {};

  // Honeypot field: real users never fill it in. Pretend success for bots.
  if (body.company) return res.json({ message: "Thanks! I'll be in touch soon." });

  const { data, errors } = validateContact(body);
  if (errors.length) return res.status(400).json({ error: errors[0], errors });

  if (mailMode === 'unavailable') {
    return res.status(503).json({ error: 'Contact delivery is unavailable right now. Please try WhatsApp instead.' });
  }

  try {
    if (smtpConfigured) {
      await sendContact(data);
    } else {
      const entry = { ...data, receivedAt: new Date().toISOString() };
      await mkdir(path.dirname(INBOX_FILE), { recursive: true });
      await appendFile(INBOX_FILE, `${JSON.stringify(entry)}\n`);
    }
    res.json({ message: smtpConfigured ? "Thanks! Your message is on its way." : 'Your message was saved to the local inbox.' });
  } catch (err) {
    console.error('[contact] Failed to deliver message:', err.code || err.name);
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
  console.log(`API listening on http://localhost:${PORT} (mail: ${mailMode})`);
});
