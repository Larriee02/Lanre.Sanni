// Eagerly import every markdown file in content/writings as raw text at build time.
const modules = import.meta.glob("../content/writings/*.md", {
  eager: true,
  query: "?raw",
  import: "default",
});

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

function slugFromPath(path) {
  const file = path.split("/").pop();
  return file.replace(/\.md$/, "");
}

const allWritings = Object.entries(modules)
  .map(([path, raw]) => {
    const { data, content } = parseFrontmatter(raw);
    return {
      slug: slugFromPath(path),
      title: data.title,
      date: data.date,
      excerpt: data.excerpt,
      content,
    };
  })
  .sort((a, b) => new Date(b.date) - new Date(a.date));

export function getAllWritings() {
  return allWritings;
}

export function getWritingBySlug(slug) {
  return allWritings.find((w) => w.slug === slug);
}