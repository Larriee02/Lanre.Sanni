---
title: "Making Dark Mode Work Without Jank"
date: "2026-09-04"
excerpt: "Dark mode is expected on modern websites, but it is easy to implement it badly. The goal is smooth theme switching without flashing the wrong colors on page load."
---

## The problem I ran into

I added dark mode to my portfolio using `localStorage` and state management, but users would see a flash of light colors before dark mode kicked in on page reload. It looked unpolished, and fixing it required rethinking when to read and apply the theme.

The issue is timing. By default, React loads, initializes state, and renders — all after the page has already painted. In those milliseconds, the browser renders with default styles, then dark mode suddenly applies. That flash breaks the experience.

## The solution: read the theme before rendering

The fix is to check the user's theme preference before React has a chance to render anything:

```jsx
// In your main entry point (main.jsx)
const savedTheme = localStorage.getItem("theme");
if (savedTheme === "dark" || (!savedTheme && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
  document.documentElement.classList.add("dark");
}
```

By adding the theme class to the HTML element in a synchronous script before React renders, the browser applies dark styles immediately. No flash, no jank.

## Using CSS custom properties for flexibility

Instead of managing dark mode with conditional classNames on every element, use CSS variables:

```css
:root {
  --bg-primary: #ffffff;
  --bg-secondary: #f5f5f5;
  --text-primary: #000000;
  --text-secondary: #666666;
  --border-color: #e0e0e0;
}

:root.dark {
  --bg-primary: #1a1a1a;
  --bg-secondary: #2d2d2d;
  --text-primary: #ffffff;
  --text-secondary: #b0b0b0;
  --border-color: #444444;
}

body {
  background-color: var(--bg-primary);
  color: var(--text-primary);
}

.card {
  background-color: var(--bg-secondary);
  border: 1px solid var(--border-color);
}
```

Now your entire theme is defined in one place, and toggling dark mode is just adding or removing a class.

## The React component that manages the toggle

Your component should read the theme on mount and provide a way to toggle it:

```jsx
import { useState, useEffect } from 'react';

export default function ThemeToggle() {
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    // Read the saved theme on mount
    const savedTheme = localStorage.getItem("theme");
    const isDark = savedTheme === "dark" || 
      (savedTheme === null && window.matchMedia("(prefers-color-scheme: dark)").matches);
    setDarkMode(isDark);
  }, []);

  useEffect(() => {
    // Apply the theme to the DOM
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <button onClick={() => setDarkMode(!darkMode)}>
      {darkMode ? "☀️ Light" : "🌙 Dark"}
    </button>
  );
}
```

This pattern separates reading the theme (on mount) from applying it (whenever it changes).

## Respect the system preference as a fallback

If the user has not set a preference, respect their system setting:

```js
const getInitialTheme = () => {
  const saved = localStorage.getItem("theme");
  if (saved) return saved === "dark";
  
  // Respect system preference
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
};
```

This is the difference between a site that feels native and one that imposes a theme.

## Add smooth transitions (but carefully)

Transitions make theme switching feel intentional:

```css
:root {
  --bg-primary: #ffffff;
  --text-primary: #000000;
  transition: background-color 0.2s, color 0.2s;
}

:root.dark {
  --bg-primary: #1a1a1a;
  --text-primary: #ffffff;
}
```

The transition happens only when the theme class changes, not on page load. This keeps the initial render fast while making manual toggles feel smooth.

## Testing both themes

Make sure both light and dark modes look good:

- Contrast is readable (WCAG AA minimum 4.5:1 for text)
- No important content is hidden in either mode
- Images and charts work in both themes
- Form inputs are clearly visible

## The result

A well-implemented dark mode is:

- **Instant**: No flash on page load
- **Respectful**: Honors system preferences
- **Smooth**: Transitions feel intentional
- **Maintainable**: Centralized theme values, not scattered classNames

That is what separates a hastily-added dark mode from a polished feature. The implementation details matter, and they show in the user experience.