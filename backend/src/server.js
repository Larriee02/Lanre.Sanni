import "dotenv/config";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { rateLimit } from "express-rate-limit";

import projectsRouter from "./routes/projects.js";
import experienceRouter from "./routes/experience.js";
import writingsRouter from "./routes/writings.js";
import toolsRouter from "./routes/tools.js";
import contactRouter from "./routes/contact.js";
import { notFound, errorHandler } from "./middleware/errorHandler.js";

const app = express();
const PORT = process.env.PORT || 5000;

// --- Security & parsing middleware ---------------------------------
app.use(helmet());
app.use(express.json({ limit: "10kb" }));

const allowedOrigins = (process.env.CORS_ORIGIN || "http://localhost:5173")
  .split(",")
  .map((o) => o.trim())
  .filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow same-origin / server-to-server calls with no Origin header
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error("Not allowed by CORS"));
    },
  })
);

app.use(morgan(process.env.NODE_ENV === "production" ? "combined" : "dev"));

// Global rate limit — generous, just to blunt abuse. The /api/contact
// route has its own tighter limiter (see routes/contact.js).
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 300,
    standardHeaders: true,
    legacyHeaders: false,
  })
);

// --- Routes ----------------------------------------------------------
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", uptime: process.uptime() });
});

app.use("/api/projects", projectsRouter);
app.use("/api/experience", experienceRouter);
app.use("/api/writings", writingsRouter);
app.use("/api/tools", toolsRouter);
app.use("/api/contact", contactRouter);

// --- 404 + error handling --------------------------------------------
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Portfolio API listening on http://localhost:${PORT}`);
});

export default app;
