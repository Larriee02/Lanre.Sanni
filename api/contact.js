// Vercel Serverless Function for POST /api/contact
const clean = (v, max) => (typeof v === 'string' ? v.trim().slice(0, max) : '');

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const body = req.body || {};
  if (body.company) {
    return res.status(200).json({ message: "Thanks! I'll be in touch soon." });
  }

  const data = {
    firstName: clean(body.firstName, 80),
    lastName: clean(body.lastName, 80),
    phone: clean(body.phone, 40),
    email: clean(body.email, 160),
    budget: clean(body.budget, 40),
    message: clean(body.message, 5000),
  };

  if (!data.firstName) return res.status(400).json({ error: 'First name is required.' });
  if (!data.lastName) return res.status(400).json({ error: 'Last name is required.' });
  if (!/^\S+@\S+\.\S+$/.test(data.email)) return res.status(400).json({ error: 'A valid email is required.' });
  if (data.phone && !/^[+\d][\d\s()-]{6,}$/.test(data.phone)) {
    return res.status(400).json({ error: 'Phone number looks invalid.' });
  }
  if (data.message.length < 10) {
    return res.status(400).json({ error: 'Message should be at least 10 characters.' });
  }

  console.log('[contact]', JSON.stringify({ ...data, receivedAt: new Date().toISOString() }));
  return res.status(200).json({
    message: "Thanks! Your message is on its way. I'll get back to you soon.",
  });
}
