import { Router } from "express";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_FILE = path.join(__dirname, "../data/tools.json");

const router = Router();

// NOTE: icons are intentionally NOT part of this payload — the frontend
// currently renders tool icons as inline JSX/SVG (see
// frontend/src/assets/components/Tools.jsx). This endpoint exists for
// completeness / future use (e.g. an admin panel), but Tools.jsx has not
// been wired to fetch from here yet. See AGENT_HANDOFF.md, item 3.
router.get("/", async (req, res, next) => {
  try {
    const raw = await readFile(DATA_FILE, "utf-8");
    res.json(JSON.parse(raw));
  } catch (err) {
    next(err);
  }
});

export default router;
