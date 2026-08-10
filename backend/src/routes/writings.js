import { Router } from "express";
import { readFile, readdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const WRITINGS_DIR = path.join(__dirname, "../data/writings");

const FRONTMATTER = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/;

function parseFrontmatter(raw) {
  const match = raw.match(FRONTMATTER);
  if (!match) return { data: {}, content: raw };

  const [, block, content] = match;
  const data = {};
  for (const line of block.split(/\r?\n/)) {
    const i = line.indexOf(":");
    if (i === -1) continue;
    const key = line.slice(0, i).trim();
    let value = line.slice(i + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    data[key] = value;
  }
  return { data, content: content.trim() };
}

async function loadAllWritings() {
  const files = await readdir(WRITINGS_DIR);
  const mdFiles = files.filter((f) => f.endsWith(".md"));

  const writings = await Promise.all(
    mdFiles.map(async (file) => {
      const raw = await readFile(path.join(WRITINGS_DIR, file), "utf-8");
      const { data, content } = parseFrontmatter(raw);
      return {
        slug: file.replace(/\.md$/, ""),
        title: data.title,
        date: data.date,
        excerpt: data.excerpt,
        content,
      };
    })
  );

  return writings.sort((a, b) => new Date(b.date) - new Date(a.date));
}

const router = Router();

// List view omits the full `content` body to keep the payload light.
router.get("/", async (req, res, next) => {
  try {
    const writings = await loadAllWritings();
    res.json(writings.map(({ content, ...meta }) => meta));
  } catch (err) {
    next(err);
  }
});

router.get("/:slug", async (req, res, next) => {
  try {
    const writings = await loadAllWritings();
    const writing = writings.find((w) => w.slug === req.params.slug);
    if (!writing) return res.status(404).json({ error: "Writing not found" });
    res.json(writing);
  } catch (err) {
    next(err);
  }
});

export default router;
