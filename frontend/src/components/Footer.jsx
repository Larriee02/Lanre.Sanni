import { Link } from 'react-router-dom';
import Reveal from './Reveal.jsx';
import BrandLogo from './BrandLogo.jsx';
import { navLinks, profile, socials } from '../data/site.js';

const footerLink = 'font-sans text-base text-ink-soft transition-colors hover:text-accent';

export default function Footer() {
  const contactLine = profile.email || profile.phoneDisplay;
  const contactHref = profile.email ? `mailto:${profile.email}` : profile.whatsapp;

  return (
    <footer className="shell pt-16 pb-14 md:pt-[60px]">
      <Reveal>
        <p className="font-sans text-lg">
          <span aria-hidden="true">👋</span> Get in touch at
        </p>
        <a
          href={contactHref}
          target={profile.email ? undefined : '_blank'}
          rel="noopener noreferrer"
          className="mt-2 inline-block font-display text-[25px] font-bold leading-tight sm:text-[30px] lg:text-[40px] link-underline"
        >
          {contactLine}
        </a>
      </Reveal>

      <Reveal delay={80} className="mt-8">
        <Link to="/contact" className="btn-primary">
          Contact Me
        </Link>
      </Reveal>

      <Reveal delay={120} className="mt-14">
        <div className="h-px w-full bg-line/60" />
      </Reveal>

      <div className="mt-8 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <Reveal className="flex flex-wrap gap-x-6 gap-y-2">
          {navLinks.map((item) =>
            item.href ? (
              <a key={item.label} href={item.href} target="_blank" rel="noopener noreferrer" className={footerLink}>
                {item.label}
              </a>
            ) : (
              <Link key={item.label} to={item.to} className={footerLink}>
                {item.label}
              </Link>
            ),
          )}
        </Reveal>
        <Reveal delay={60} className="flex flex-wrap gap-x-6 gap-y-2">
          {socials.map((s) => (
            <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className={footerLink}>
              {s.label}
            </a>
          ))}
        </Reveal>
      </div>

      <div className="mt-10 flex items-center gap-4">
        <BrandLogo variant="badge" className="h-14 w-14 sm:h-16 sm:w-16" />
        <p className="font-sans text-sm text-muted">
          © {new Date().getFullYear()} {profile.name}. {profile.role} · {profile.location}.
        </p>
      </div>
    </footer>
  );
}
