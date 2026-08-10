import { Router } from "express";
import { rateLimit } from "express-rate-limit";
import { z } from "zod";
import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { sendContactEmail } from "../utils/mailer.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const MESSAGES_FILE = path.join(__dirname, "../data/messages.json");

const contactSchema = z.object({
  firstName: z.string().trim().min(1).max(80),
  lastName: z.string().trim().min(1).max(80),
  email: z.string().trim().email().max(200),
  number: z.string().trim().max(40).optional().or(z.literal("")),
  budget: z.string().trim().max(60).optional().or(z.literal("")),
  message: z.string().trim().min(1).max(5000),
  // Honeypot field — real users never fill this in. Bots that
  // auto-fill every input will, and we quietly drop those submissions.
  company: z.string().max(0).optional().or(z.literal("")),
});

// Tighter limiter just for form submissions, on top of the global one.
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Too many submissions. Please try again later." },
});

async function readMessages() {
  try {
    const raw = await readFile(MESSAGES_FILE, "utf-8");
    return JSON.parse(raw);
  } catch (err) {
    if (err.code === "ENOENT") return [];
    throw err;
  }
}

async function appendMessage(entry) {
  const messages = await readMessages();
  messages.push(entry);
  await writeFile(MESSAGES_FILE, JSON.stringify(messages, null, 2), "utf-8");
}

const router = Router();

router.post("/", contactLimiter, async (req, res, next) => {
  try {
    const parsed = contactSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({
        error: "Invalid submission",
        details: parsed.error.flatten().fieldErrors,
      });
    }

    const { company, ...data } = parsed.data;
    if (company) {
      // Honeypot tripped — pretend success so bots don't learn anything.
      return res.status(201).json({ ok: true });
    }

    const entry = { ...data, receivedAt: new Date().toISOString() };
    await appendMessage(entry);

    // Email delivery is best-effort: if SMTP isn't configured, or the
    // send fails, the submission is still saved to messages.json above.
    sendContactEmail(entry).catch((err) =>
      console.error("Failed to send contact email:", err.message)
    );

    res.status(201).json({ ok: true });
  } catch (err) {
    next(err);
  }
});

// Simple protected read endpoint so you can check submissions without
// SSH-ing into the box. Not a real auth system — swap for something
// more robust before this ever handles sensitive data.
router.get("/messages", async (req, res, next) => {
  try {
    const key = req.header("x-admin-key");
    if (!process.env.ADMIN_KEY || key !== process.env.ADMIN_KEY) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    res.json(await readMessages());
  } catch (err) {
    next(err);
  }
});

export default router;
