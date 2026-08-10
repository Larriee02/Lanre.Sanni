---
title: "Why My Portfolio Links Kept 404ing on GitHub Pages"
date: "2026-08-01"
excerpt: "A plain <a> tag ignored my router's basename and sent visitors to the wrong URL entirely."
---

## The problem

I had a card component linking to `/experience` using a normal anchor tag. Clicking it 404'd — not "wrong page," actually missing.

## Why

My site is deployed at `bxxjay.github.io/template`, so my router has `basename="/template"` set. A plain `<a href="/experience">` has no idea that basename exists — it triggers a full browser navigation straight to `bxxjay.github.io/experience`, one level up from where the route actually lives.

## The fix

Swap the raw anchor for React Router's `Link`, wrapped to keep Framer Motion animations:

```jsx
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const MotionLink = motion(Link);

<MotionLink to="/experience">
  {/* card content */}
</MotionLink>
```

`href` became `to`, and navigation started working immediately.