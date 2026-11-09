import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Reveal from '../components/Reveal.jsx';
import { formatDate, getWriting, writings } from '../data/writings.js';
import NotFound from './NotFound.jsx';

export default function WritingPost() {
  const { slug } = useParams();
  const post = getWriting(slug);

  useEffect(() => {
    if (post) document.title = `${post.title} — Lanre Sanni`;
    return () => {
      document.title = 'Lanre Sanni — Full Stack Developer';
    };
  }, [post]);

  if (!post) return <NotFound />;

  const index = writings.indexOf(post);
  const next = writings[(index + 1) % writings.length];

  return (
    <article className="shell pt-10 pb-[60px] md:pt-16">
      <div className="mx-auto max-w-[760px]">
        <Reveal>
          <Link to="/writings" className="font-sans text-base text-ink-soft transition-colors hover:text-accent">
            ← All writings
          </Link>
        </Reveal>
        <Reveal as="p" delay={40} className="mt-10 font-label text-xs uppercase tracking-[0.14em] text-muted">
          {formatDate(post.date)} · {post.minutes} min read
        </Reveal>
        <Reveal as="h1" delay={80} className="mt-4 font-display text-[34.4px] font-bold leading-[1.15] tracking-tight md:text-[43.6px] lg:text-[56px]">
          {post.title}
        </Reveal>
        <Reveal as="p" delay={120} className="mt-6 font-sans text-[19.2px] font-light leading-[1.42] text-muted lg:text-2xl lg:leading-[1.35]">
          {post.excerpt}
        </Reveal>

        <div className="my-12 h-px bg-line/30" />

        <Reveal
          className="prose prose-lg dark:prose-invert max-w-none font-sans prose-headings:font-display prose-headings:font-medium prose-headings:tracking-tight prose-headings:text-ink prose-h2:mt-12 prose-h2:text-[28px] prose-p:text-ink-soft prose-p:leading-[1.75] prose-a:text-ink prose-a:decoration-accent prose-a:decoration-2 prose-strong:text-ink prose-li:text-ink-soft prose-code:rounded prose-code:bg-card prose-code:px-1.5 prose-code:py-0.5 prose-code:font-normal prose-code:text-ink prose-code:before:content-none prose-code:after:content-none prose-pre:rounded-none prose-pre:bg-[#181A1E] prose-pre:text-[14px] dark:prose-pre:border dark:prose-pre:border-line/25 [&_pre_code]:bg-transparent [&_pre_code]:p-0 [&_pre_code]:text-[#F2F3F5]"
        >
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.content}</ReactMarkdown>
        </Reveal>

        {next && next !== post && (
          <Reveal className="mt-20 border-t border-line/30 pt-10">
            <p className="font-label text-xs uppercase tracking-[0.14em] text-muted">Read next</p>
            <Link to={`/writings/${next.slug}`} className="group mt-3 block">
              <span className="font-display text-[25.6px] font-medium leading-snug lg:text-[34px]">
                <span className="link-underline">{next.title}</span> →
              </span>
            </Link>
          </Reveal>
        )}
      </div>
    </article>
  );
}
