---
title: "Editing CSS I Didn't Want to Break: Lessons from a Legacy Stylesheet"
date: "2026-07-10"
excerpt: "Working inside an existing plain-CSS file with min-width and max-width breakpoints already live — and why 'just refactor it' wasn't the right call."
---

## The situation

Paramount Sneakers Store is a plain CSS/JS build — no Tailwind, no CSS-in-JS, just a stylesheet and vanilla JS. By the time I needed to add new responsive behavior, the file already had both `min-width` and `max-width` media queries doing real work: a phone breakpoint at `max-width: 480px`, a tablet breakpoint at `max-width: 768px`.

## Why I didn't just refactor

My first instinct was to reorganize — consolidate the breakpoints, clean up the cascade. But everything in that file was already live and working. Restructuring risked breaking styles I couldn't easily re-test across every screen size at once, for very little real benefit.

## What I did instead

One rule: never edit an existing rule. Only append new, targeted rules underneath the existing media query blocks.

```css
/* existing rule — untouched */
@media (max-width: 768px) {
  .product-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* new rule — appended below, not merged in */
@media (max-width: 768px) {
  .product-grid .badge {
    font-size: 0.75rem;
  }
}
```

Not the cleanest CSS architecture on paper. But the working cascade stayed intact, and every change I made was additive and reversible — delete my block, and the site is exactly as it was before I touched it.