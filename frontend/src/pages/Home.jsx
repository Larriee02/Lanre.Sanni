import { Link } from 'react-router-dom';
import Reveal from '../components/Reveal.jsx';
import ProjectCard from '../components/ProjectCard.jsx';
import WritingList from '../components/WritingList.jsx';
import BrandLogo from '../components/BrandLogo.jsx';
import { projects, stats } from '../data/site.js';
import { writings } from '../data/writings.js';

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="shell flex min-h-[300px] flex-col justify-center pt-10 pb-16 md:min-h-[365px] md:pt-16 md:pb-24">
        <Reveal as="h1" className="font-display text-[44.8px] font-bold leading-[1.13] tracking-tight md:text-[59.2px] md:leading-[1.06] lg:text-[88px]">
          Hi, I'm <span className="text-accent">Lanre.</span>
        </Reveal>
        <Reveal
          as="p"
          delay={100}
          className="mt-6 max-w-[1120px] font-sans text-[19.2px] font-light leading-[1.42] md:text-[20.8px] lg:text-2xl lg:leading-[1.35]"
        >
          <span className="text-muted">
            Full Stack Developer &amp; builder of things that actually feel finished. Currently, I'm based in Lagos, Nigeria,
            shipping clean interfaces, solid backends and the small details that make products feel human, and I'm open to
          </span>{' '}
          <strong className="font-bold text-ink">remote roles &amp; freelance projects.</strong>
        </Reveal>
      </section>

      {/* Projects */}
      <section id="work" className="shell py-[60px]">
        <div className="grid gap-x-12 gap-y-20 md:grid-cols-2 md:gap-y-24">
          {projects.map((project, i) => (
            <ProjectCard key={project.slug} project={project} index={i} />
          ))}

          {/* Fills the empty grid cell with a brand + stats card that switches between light (#FFF) and dark (#000) to match the LS logo pack. */}
          <Reveal delay={80} className="hidden md:block">
            <Link
              to="/about"
              className="group relative flex aspect-square flex-col justify-between overflow-hidden border border-[#0D51EF]/20 bg-white p-10 text-[#080C14] shadow-[0_24px_50px_-22px_rgba(13,81,239,0.16)] transition-all duration-500 hover:border-[#0D51EF]/55 dark:border-[#0D51EF]/30 dark:bg-black dark:text-[#F8FAFC]"
            >
              {/* Subtle transparent LS watermark (IMG_4577) in the background corner */}
              <BrandLogo
                variant="mark"
                className="pointer-events-none absolute -right-12 -top-12 h-80 w-80 opacity-[0.07] transition-transform duration-700 group-hover:scale-110 dark:opacity-[0.12]"
              />

              <div className="relative z-10 flex items-center justify-between">
                <BrandLogo variant="badge" className="h-20 w-20 sm:h-24 sm:w-24" />
                <span className="rounded-full border border-[#0D51EF]/25 bg-[#0D51EF]/10 px-3.5 py-1 font-label text-xs uppercase tracking-[0.18em] text-accent">
                  More about me
                </span>
              </div>

              <div className="relative z-10">
                <p className="font-display text-[36px] lg:text-[40px] font-medium leading-[1.15]">
                  {stats[1].value} projects shipped. {stats[2].value} clients worldwide. {stats[0].value} months of building.
                </p>
                <span className="mt-8 inline-flex items-center gap-2 font-sans text-lg font-medium text-accent">
                  Read my story
                  <svg className="transition-transform duration-300 group-hover:translate-x-1" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </span>
              </div>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Writings */}
      <section className="shell py-[60px]">
        <div className="flex items-end justify-between gap-6">
          <Reveal as="h2" className="font-display text-[25.6px] font-medium leading-[1.33] md:text-[30.4px] lg:text-[40px] lg:leading-[1.13]">
            Recent writings
          </Reveal>
          <Reveal delay={60}>
            <Link to="/writings" className="font-sans text-base text-ink-soft transition-colors hover:text-accent lg:text-lg">
              View all →
            </Link>
          </Reveal>
        </div>
        <WritingList items={writings.slice(0, 3)} className="mt-10" />
      </section>
    </>
  );
}
