import nodemailer from "nodemailer";

let cachedTransporter = null;

function getTransporter() {
  if (!process.env.SMTP_HOST) return null;
  if (cachedTransporter) return cachedTransporter;

  cachedTransporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: process.env.SMTP_SECURE === "true",
    auth: process.env.SMTP_USER
      ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
      : undefined,
  });

  return cachedTransporter;
}

/**
 * Sends a notification email for a new contact-form submission.
 * No-op (resolves immediately) if SMTP_HOST is not configured —
 * the submission is still saved to disk by the caller either way.
 */
export async function sendContactEmail(entry) {
  const transporter = getTransporter();
  if (!transporter) return;

  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL || to;
  if (!to) return;

  await transporter.sendMail({
    from,
    to,
    replyTo: entry.email,
    subject: `New portfolio contact from ${entry.firstName} ${entry.lastName}`,
    text: [
      `Name: ${entry.firstName} ${entry.lastName}`,
      `Email: ${entry.email}`,
      entry.number ? `Phone: ${entry.number}` : null,
      entry.budget ? `Budget: ${entry.budget}` : null,
      "",
      entry.message,
    ]
      .filter(Boolean)
      .join("\n"),
  });
}
