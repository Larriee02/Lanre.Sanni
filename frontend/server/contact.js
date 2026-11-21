import nodemailer from 'nodemailer';

export const smtpConfigured = Boolean(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS);
const smtpPort = Number(process.env.SMTP_PORT || 465);
const smtpSecure =
  process.env.SMTP_SECURE !== undefined ? process.env.SMTP_SECURE === 'true' : smtpPort === 465;

const transporter = smtpConfigured
  ? nodemailer.createTransport({
      connectionTimeout: 10_000,
      greetingTimeout: 10_000,
      socketTimeout: 20_000,
      host: process.env.SMTP_HOST,
      port: smtpPort,
      secure: smtpSecure,
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    })
  : null;

const clean = (v, max) => (typeof v === 'string' ? v.trim().slice(0, max) : '');
const escapeHtml = (s) =>
  s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

export function validateContact(body) {
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

export async function sendContact(data) {
  const fullName = `${data.firstName} ${data.lastName}`;
  const fromEmail = process.env.CONTACT_FROM_EMAIL || process.env.SMTP_USER;
  const toEmail = process.env.CONTACT_TO || process.env.CONTACT_TO_EMAIL || process.env.SMTP_USER;
  const rows = [
    ['Name', fullName],
    ['Email', data.email],
    ['Phone', data.phone || '—'],
    ['Budget', data.budget || '—'],
  ];
  const receipt = await transporter.sendMail({
    from: `"Portfolio Contact" <${fromEmail}>`,
    to: toEmail,
    replyTo: { name: fullName, address: data.email },
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
  if (!receipt.accepted.length) throw new Error('SMTP did not accept the message');
}
