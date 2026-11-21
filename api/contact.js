import { sendContact, smtpConfigured, validateContact } from '../backend/contact.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const body = req.body || {};
  if (body.company) {
    return res.status(200).json({ message: "Thanks! I'll be in touch soon." });
  }

  const { data, errors } = validateContact(body);
  if (errors.length) return res.status(400).json({ error: errors[0], errors });

  if (!smtpConfigured) {
    console.error('[contact] SMTP is not configured');
    return res.status(503).json({ error: 'Contact delivery is unavailable right now. Please try WhatsApp instead.' });
  }

  try {
    await sendContact(data);
    return res.status(200).json({ message: "Thanks! Your message is on its way." });
  } catch (err) {
    console.error('[contact] Failed to deliver message:', err.code || err.name);
    return res.status(502).json({ error: 'Your message could not be sent right now. Please try WhatsApp instead.' });
  }
}
