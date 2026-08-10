import { Router } from "express";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_FILE = path.join(__dirname, "../data/experience.json");

const router = Router();

router.get("/", async (req, res, next) => {
  try {
    const raw = await readFile(DATA_FILE, "utf-8");
    res.json(JSON.parse(raw));
  } catch (err) {
    next(err);
  }
});

export default router;
