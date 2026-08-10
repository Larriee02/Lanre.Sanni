---
title: "Editing CSS Without Breaking a Working UI"
date: "2026-07-10"
excerpt: "When a site is already live, the safest move is to add small, scoped improvements rather than refactoring the whole styling system."
---

## The situation

A lot of frontend work happens in environments where the styling works but is not perfectly organized. In these situations, the smart move is not to rewrite everything from scratch — it is to preserve the current behavior and add only the changes needed for the next requirement.

That principle mattered in a project where the page had existing responsive rules, already working on different screen sizes. The goal was not to fully redesign the stylesheet, but to extend it safely.

## Why I didn't just refactor

My instinct was to clean the CSS up and consolidate the breakpoints. But that would have changed a cascade that was already doing real work. The risk was not theoretical; it was the kind of change that can silently break layout across multiple devices.

Instead of improving the structure at the cost of stability, I chose to keep the original rules intact and append only targeted additions.

## What I did instead

The rule was simple: never edit an existing rule unless it was necessary. Instead, add a smaller override beneath the relevant media query block.

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

This approach works well in real projects because it is additive, easy to review, and easy to roll back. If the new change causes a problem, it is isolated to a small block instead of a large stylesheet rewrite.

## The lesson

In frontend work, safe iteration often beats elegant cleanup. The goal is not to make the code look perfect on the first pass; it is to ship a working product and improve the system without breaking the experience users already rely on.