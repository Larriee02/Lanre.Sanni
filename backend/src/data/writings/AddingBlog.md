---
title: "Adding a Blog to a Static Portfolio (No Backend, No CMS)"
date: "2026-08-08"
excerpt: "Vite's import.meta.glob lets you build a working blog from markdown files alone."
---

## The constraint

My portfolio is a static Vite build on GitHub Pages — no server, no API routes. A blog couldn't fetch posts at runtime; everything had to resolve at build time.

## The approach

Vite's `import.meta.glob` pulls in every markdown file as raw text at build time:

```js
const modules = import.meta.glob("../content/writings/*.md", {
  eager: true,
  query: "?raw",
  import: "default",
});
```

## The gotcha

Most tutorials reach for `gray-matter` to parse frontmatter. I tried that first, and the production build came back with an `eval()` warning and a "buffer externalized" warning — both from `gray-matter`'s YAML engine under the hood.

My frontmatter is simple `key: value` pairs, no nested YAML, so I wrote a ~20-line parser instead and dropped the dependency entirely. That removed both warnings and cut about 200KB off the bundle.