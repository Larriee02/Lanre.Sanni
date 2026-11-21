import { smtpConfigured } from '../server/contact.js';

export default function handler(_req, res) {
  res.setHeader('Cache-Control', 'no-store');
  res.status(200).json({ ok: true, mail: smtpConfigured ? 'smtp' : 'unavailable' });
}
