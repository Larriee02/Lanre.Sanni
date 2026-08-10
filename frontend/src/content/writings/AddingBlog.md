---
title: "Adding a Blog to a Portfolio with API Routes and a Backend"
date: "2026-08-10"
excerpt: "This portfolio uses a Vite frontend, Express-backed API routes, and markdown-driven writing to keep content flexible and maintainable."
---

## The project context

This portfolio is not only a frontend. It combines a Vite React app with a backend API layer, which means the UI is fetching structured data from routes like `/api/projects`, `/api/experience`, `/api/writings`, and `/api/contact` instead of depending on a single static source of truth.

That setup gives the project a clean separation of concerns: the frontend handles presentation and interaction, while the backend owns the data and API contracts.

## Why markdown still plays a role

Even with API routes, markdown is still a great format for writing long-form content. It keeps blog posts easy to author, easy to version, and easy to deploy alongside the app.

In this portfolio, we can treat markdown as a content source for blog entries while the backend continues to power the portfolio data. That means the project can support both structured business data and writing content without forcing everything into one single model.

## The approach

Vite's `import.meta.glob` gives us a clean way to compile markdown files into the app at build time:

```js
const modules = import.meta.glob("../content/writings/*.md", {
  eager: true,
  query: "?raw",
  import: "default",
});
```

This is useful when we want blog posts to be available in the app without needing a CMS or a runtime database call. The blog content becomes part of the project itself, which makes it simple to version with Git and deploy with the rest of the portfolio.

## The backend side

The portfolio also takes advantage of a real backend API layer. The frontend is structured so it can call the backend as a normal data source:

```js
app.get("/api/projects", async (req, res) => {
  const projects = await getProjects();
  res.json(projects);
});

app.get("/api/experience", async (req, res) => {
  const experience = await getExperience();
  res.json(experience);
});

app.post("/api/contact", async (req, res) => {
  // validate and store message
});
```

This makes the project extensible. If we want to add more portfolio sections, fetch new data, or integrate a CMS later, the API layer can evolve without rewriting the entire frontend.

## The benefit

The main advantage is flexibility.

- Portfolio data is served through API routes.
- Writing content can live in markdown files.
- The frontend stays clean and reusable.
- The backend can handle validation, email, storage, and future content services.

That is exactly the pattern this project follows: a polished frontend supported by a backend API, with markdown-based blog writing layered in as a maintainable content format.