import { useEffect, useRef, useState } from 'react';

function getInitialDark() {
  if (typeof document === 'undefined') return false;
  return document.documentElement.classList.contains('dark');
}

export default function ThemeToggle({ className = '' }) {
  const [dark, setDark] = useState(getInitialDark);
  const timerRef = useRef(null);

  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const onSystemChange = (e) => {
      if (!localStorage.getItem('theme')) {
        applyTheme(e.matches, false);
      }
    };
    media.addEventListener('change', onSystemChange);
    return () => {
      media.removeEventListener('change', onSystemChange);
      clearTimeout(timerRef.current);
    };
  }, []);

  const applyTheme = (nextDark, persist = true) => {
    const root = document.documentElement;
    root.classList.add('theme-transition');
    root.classList.toggle('dark', nextDark);
    root.style.colorScheme = nextDark ? 'dark' : 'light';

    const meta = document.getElementById('theme-color-meta');
    if (meta) meta.setAttribute('content', nextDark ? '#000000' : '#FFFFFF');

    if (persist) {
      try {
        localStorage.setItem('theme', nextDark ? 'dark' : 'light');
      } catch {}
    }

    setDark(nextDark);
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      root.classList.remove('theme-transition');
    }, 480);
  };

  return (
    <button
      type="button"
      onClick={() => applyTheme(!dark, true)}
      aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={dark ? 'Switch to light mode' : 'Switch to dark mode'}
      className={`group relative inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-line/30 bg-surface text-ink-soft transition-all duration-300 hover:border-accent hover:text-accent hover:shadow-[0_0_20px_-4px_rgba(13,81,239,0.5)] ${className}`}
    >
      {/* Sun icon (shown in dark mode, rotates in) */}
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`absolute transition-all duration-500 ease-out ${
          dark ? 'scale-100 rotate-0 opacity-100' : 'scale-50 -rotate-90 opacity-0'
        }`}
      >
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
      </svg>

      {/* Moon icon (shown in light mode, rotates in) */}
      <svg
        width="17"
        height="17"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`absolute transition-all duration-500 ease-out ${
          dark ? 'scale-50 rotate-90 opacity-0' : 'scale-100 rotate-0 opacity-100'
        }`}
      >
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
      </svg>
    </button>
  );
}
