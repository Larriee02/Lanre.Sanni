---
title: "Performance: The Invisible Feature Nobody Tracks"
date: "2026-09-08"
excerpt: "A fast website is not a feature — it is the baseline. But most portfolios ship without even checking how fast they really are. Here is how to make performance part of your development workflow."
---

## Why performance is invisible

When something works fast, nobody notices. When it is slow, everybody does. This is why performance is easy to ignore — it does not feel like a feature you are building, it feels like something that should just happen.

But performance is a choice. A choice between shipping code as soon as it compiles, or taking the time to measure it, optimize it, and keep it optimized.

## The three numbers you need to know

If you only care about three metrics, care about these:

1. **Largest Contentful Paint (LCP)**: How long until the user sees the main content? Target: under 2.5 seconds.
2. **First Input Delay (FID)**: How long after clicking before the page responds? Target: under 100ms.
3. **Cumulative Layout Shift (CLS)**: How much does the page jump around while loading? Target: under 0.1.

These are Google's Core Web Vitals, and they directly impact user experience and SEO.

## Measuring your actual performance

You cannot optimize what you do not measure. Open your portfolio in Chrome DevTools and run Lighthouse:

```
DevTools > Lighthouse > Generate Report
```

It will give you:
- Performance score (0-100)
- Specific bottlenecks
- Recommendations to fix them

My first Lighthouse run was a 65. Rough. But it gave me a roadmap.

## Bundle size is the foundation

A JavaScript bundle that is 500KB takes longer to download, longer to parse, and longer to execute. For a portfolio, that is unnecessary. Here is how to see what is in your bundle:

```bash
npm install --save-dev webpack-bundle-analyzer
```

```js
// vite.config.js
import { visualizer } from 'rollup-plugin-visualizer';

export default {
  plugins: [visualizer()]
};
```

Now run the build, and it generates a file that shows exactly which packages are taking up space. You might be surprised at what is bloating your bundle.

Common culprits:
- Loading an entire library when you only need one function
- CSS frameworks you are not using
- Polyfills for old browsers you do not target

For my portfolio, I was shipping moment.js (67KB) just to format one date. Replacing it with native date formatting was a 10% bundle reduction.

## Code splitting: load what you need, when you need it

Not every user needs to see your writing page, your projects page, or your experience page on page load. Use React lazy loading:

```jsx
import { lazy, Suspense } from 'react';

const WritingDetailPage = lazy(() => import('../pages/WritingDetailPage'));
const ProjectPage = lazy(() => import('../pages/ProjectPage'));

function App() {
  return (
    <Routes>
      <Route path="/writings/:slug" element={
        <Suspense fallback={<div>Loading...</div>}>
          <WritingDetailPage />
        </Suspense>
      } />
      <Route path="/projects" element={
        <Suspense fallback={<div>Loading...</div>}>
          <ProjectPage />
        </Suspense>
      } />
    </Routes>
  );
}
```

Now the home page loads fast, and users only download the code for the pages they actually visit.

## API caching: do not re-fetch what you already have

Every time the frontend asks for `/api/projects`, the backend processes the request and sends the data over the network. If the user navigates away and back, it happens again. That is wasteful.

```js
const cache = {};

export function useProjects() {
  const [projects, setProjects] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // If we already have it, do not fetch again
    if (cache.projects) {
      setProjects(cache.projects);
      return;
    }

    setLoading(true);
    fetch('/api/projects')
      .then(res => res.json())
      .then(data => {
        cache.projects = data;
        setProjects(data);
      })
      .finally(() => setLoading(false));
  }, []);

  return { projects, loading };
}
```

Now, the second time a user visits the projects page, it loads instantly from memory.

## Images: resize them before shipping

A full-resolution photo for a project card does not need to be 4MB. Use an image optimizer:

```bash
npm install --save-dev imagemin imagemin-mozjpeg
```

Or use a cloud service like Cloudinary or imgix. Reduce a photo from 4MB to 100KB and the user still sees a great image.

```jsx
<img 
  src="project-thumbnail.webp" 
  alt="Project thumbnail"
  width="400"
  height="300"
/>
```

Always specify width and height. It prevents layout shift while the image loads.

## The Vite advantage

Vite is already doing a lot for you:

- Fast dev server with hot module reloading
- Optimized build with code splitting
- CSS preprocessing and minification
- Automatic vendor bundle splitting

But make sure your vite.config is optimized:

```js
export default {
  build: {
    minify: 'terser',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
        },
      },
    },
  },
};
```

## Make performance part of your workflow

Add Lighthouse to your CI/CD pipeline so performance does not regress:

```yaml
# .github/workflows/lighthouse.yml
name: Lighthouse CI
on: [push, pull_request]
jobs:
  lighthouse:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: treosh/lighthouse-ci-action@v9
```

Now every PR shows you if your changes made the site faster or slower.

## The result

A fast portfolio is:

- **Welcoming**: Loads before the user gives up
- **Responsive**: Feels snappy and immediate
- **Professional**: Shows you care about the user experience
- **SEO-friendly**: Ranks higher in search results

Performance is not something you do at the end. It is something you bake in from the start. And it is the difference between a portfolio that feels like a hobby project and one that feels like a professional product.
