---
title: "Why Portfolio Navigation Broke on GitHub Pages"
date: "2026-08-01"
excerpt: "Client-side routing looked correct on paper, but a plain anchor tag still sent visitors to the wrong URL."
---

## The problem

I was building the portfolio with client-side routing in mind, but one of the cards still used a standard anchor tag to navigate to `/experience`. The result was a broken route on GitHub Pages instead of a smooth in-app transition.

## Why it happened

The site was deployed under a project path, which means the app was not living at the root of the domain. A plain `href="/experience"` ignored that path prefix and tried to navigate to the wrong URL entirely.

That makes sense for a static deployment: the browser sees a root-relative URL and leaves the project path behind.

## The fix

The navigation had to respect React Router instead of the browser's full-page navigation behavior.

```jsx
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const MotionLink = motion(Link);

<MotionLink to="/experience">
  {/* card content */}
</MotionLink>
```

Once I changed `href` to `to`, the route started behaving like a real app route rather than a bare URL. The page transitions remained smooth, and the routes resolved correctly.

## The lesson

When a frontend app uses client-side routing, it is easy to forget that HTML links still behave like browser navigation. React Router solves that mismatch by keeping route transitions inside the app instead of forcing a full load.

That is an important detail in portfolio work, especially when deploying to static hosting and keeping the navigation experience polished.