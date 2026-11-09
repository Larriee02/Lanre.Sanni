import { Link } from 'react-router-dom';
import Reveal from './Reveal.jsx';
import { formatDate } from '../data/writings.js';

export default function WritingList({ items, className = '' }) {
  return (
    <ul className={`border-t border-line/25 ${className}`}>
      {items.map((post, i) => (
        <Reveal as="li" key={post.slug} delay={i * 60} className="border-b border-line/25">
          <Link
            to={`/writings/${post.slug}`}
            className="group grid gap-3 py-8 md:grid-cols-[200px_1fr_auto] md:items-start md:gap-10"
          >
            <span className="font-label text-xs uppercase tracking-[0.14em] text-muted md:pt-2">
              {formatDate(post.date)}
            </span>
            <div>
              <h3 className="font-display text-[22px] font-medium leading-snug transition-colors group-hover:text-accent md:text-[28px]">
                <span className="link-underline">{post.title}</span>
              </h3>
              <p className="mt-2 max-w-3xl font-sans text-base font-light leading-[1.69] text-subtle md:text-lg">
                {post.excerpt}
              </p>
            </div>
            <span className="hidden h-11 w-11 items-center justify-center rounded-full border border-line/30 text-ink transition-all duration-300 group-hover:border-accent group-hover:bg-accent group-hover:text-white md:flex">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M7 17L17 7M8 7h9v9" />
              </svg>
            </span>
          </Link>
        </Reveal>
      ))}
    </ul>
  );
}
