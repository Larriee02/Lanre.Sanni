import Reveal from './Reveal.jsx';

/** Page title block used on inner pages (About, Writings, Contact). */
export default function PageHeader({ eyebrow, title, children }) {
  return (
    <section className="shell pt-10 pb-12 md:pt-16 md:pb-16">
      {eyebrow && (
        <Reveal
          as="p"
          className="mb-5 inline-block rounded-full border border-[#0D51EF]/25 bg-[#0D51EF]/10 px-3.5 py-1 font-label text-xs font-medium text-accent"
        >
          {eyebrow}
        </Reveal>
      )}
      <Reveal as="h1" delay={60} className="font-display text-[44.8px] font-bold leading-[1.13] tracking-tight md:text-[59.2px] md:leading-[1.06] lg:text-[88px]">
        {title}
      </Reveal>
      {children && (
        <Reveal
          delay={120}
          className="mt-6 max-w-[1000px] font-sans text-[19.2px] font-light leading-[1.42] text-muted md:text-[20.8px] lg:text-2xl lg:leading-[1.35]"
        >
          {children}
        </Reveal>
      )}
    </section>
  );
}
