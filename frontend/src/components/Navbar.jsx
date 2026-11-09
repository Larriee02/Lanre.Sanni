import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { navLinks } from '../data/site.js';
import ThemeToggle from './ThemeToggle.jsx';
import BrandLogo from './BrandLogo.jsx';

const linkBase =
  'font-sans text-[17px] lg:text-lg text-ink-soft transition-colors duration-200 hover:text-accent';

function NavItem({ item, onClick, className = '' }) {
  if (item.href) {
    return (
      <a href={item.href} target="_blank" rel="noopener noreferrer" onClick={onClick} className={`${linkBase} ${className}`}>
        {item.label}
      </a>
    );
  }
  return (
    <NavLink
      to={item.to}
      end={item.to === '/'}
      onClick={onClick}
      className={({ isActive }) => `${linkBase} ${isActive ? '!text-accent font-medium' : ''} ${className}`}
    >
      {item.label}
    </NavLink>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <header className="relative z-40">
      <nav className="shell flex h-[104px] items-center justify-between">
        <Link
          to="/"
          aria-label="Lanre Sanni — home"
          className="group -ml-1 inline-flex items-center gap-3"
        >
          <BrandLogo
            variant="badge"
            className="h-16 w-16 sm:h-[72px] sm:w-[72px] transition-transform duration-300 group-hover:scale-105"
          />
        </Link>

        <div className="hidden items-center gap-7 md:flex">
          {navLinks.map((item) => (
            <NavItem key={item.label} item={item} />
          ))}
          <ThemeToggle className="ml-1" />
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            className="-mr-2 p-2 text-ink-soft"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
              {open ? (
                <path d="M6 6l12 12M18 6L6 18" />
              ) : (
                <path d="M3 7h18M3 12h18M3 17h18" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={`fixed inset-x-0 top-[104px] bottom-0 bg-canvas transition-all duration-300 md:hidden ${
          open ? 'visible opacity-100' : 'invisible opacity-0'
        }`}
      >
        <div className="shell flex flex-col gap-2 pt-6">
          {navLinks.map((item, i) => (
            <div
              key={item.label}
              className={`transition-all duration-500 ${open ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'}`}
              style={{ transitionDelay: open ? `${80 + i * 50}ms` : '0ms' }}
            >
              <NavItem item={item} onClick={() => setOpen(false)} className="!font-display !text-4xl !font-medium block py-2" />
            </div>
          ))}
        </div>
      </div>
    </header>
  );
}
