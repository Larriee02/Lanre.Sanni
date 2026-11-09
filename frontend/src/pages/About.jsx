import Reveal from '../components/Reveal.jsx';
import Counter from '../components/Counter.jsx';
import PageHeader from '../components/PageHeader.jsx';
import BrandLogo from '../components/BrandLogo.jsx';
import { experience, intro, profile, skills, stats, story, tools } from '../data/site.js';

function SectionTitle({ children }) {
  return (
    <Reveal as="h2" className="font-display text-[25.6px] font-medium leading-[1.33] md:text-[30.4px] lg:text-[40px] lg:leading-[1.13]">
      {children}
    </Reveal>
  );
}

export default function About() {
  return (
    <>
      <PageHeader eyebrow={`${profile.role} · ${profile.location}`} title="About me.">
        {intro[0]}
      </PageHeader>

      {/* Portrait + story */}
      <section className="shell grid gap-12 py-[60px] lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-10">
            <Reveal>
              <BrandLogo variant="full" />
            </Reveal>
            <div className="mt-10 grid grid-cols-3 gap-6">
              {stats.map((s, i) => (
                <Reveal key={s.label} delay={i * 80}>
                  <p className="font-display text-4xl font-bold text-accent lg:text-5xl">
                    +<Counter target={s.value} />
                  </p>
                  <p className="mt-2 font-label text-[11px] uppercase leading-snug tracking-[0.12em] text-muted">{s.label}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-7">
          <Reveal as="p" className="font-sans text-[20.8px] font-light leading-[1.43] lg:text-[28px]">
            {intro[1]}
          </Reveal>
          <div className="mt-10 space-y-6">
            {story.map((p, i) => (
              <Reveal as="p" key={i} className="font-sans text-[16.8px] leading-[1.67] text-ink-soft lg:text-lg">
                {p}
              </Reveal>
            ))}
            <Reveal as="p" className="font-sans text-[16.8px] leading-[1.67] text-ink lg:text-lg">
              <strong>I'm currently open to remote frontend roles and freelance projects.</strong> If you have something
              interesting, let's build it together.
            </Reveal>
          </div>
          <Reveal className="mt-10 flex flex-wrap gap-4">
            <a
              href={profile.cv}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              View CV
            </a>
            <a
              href={profile.cv}
              download
              className="inline-flex items-center rounded-full border border-ink px-6 py-3 font-label text-sm text-ink transition-colors hover:bg-ink hover:text-canvas"
            >
              Download CV
            </a>
          </Reveal>
        </div>
      </section>

      {/* Skills */}
      <section className="shell py-[60px]">
        <SectionTitle>What I work with</SectionTitle>
        <div className="mt-10 border-t border-line/30">
          {skills.map((s, i) => (
            <Reveal key={s.area} delay={i * 50} className="grid gap-2 border-b border-line/30 py-7 md:grid-cols-12 md:gap-12">
              <h3 className="font-display text-xl font-medium md:col-span-4 lg:text-2xl">{s.area}</h3>
              <p className="font-sans text-base font-light leading-[1.69] text-subtle md:col-span-8 lg:text-lg">{s.detail}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Experience */}
      <section id="experience" className="shell py-[60px]">
        <SectionTitle>Experience</SectionTitle>
        <div className="mt-10 space-y-6">
          {experience.map((job, i) => (
            <Reveal key={job.role} delay={i * 60} className="grid gap-4 bg-surface p-8 md:grid-cols-12 md:gap-12 md:p-10 dark:border dark:border-line/20">
              <div className="md:col-span-4">
                <span className="inline-block rounded-full border border-ink px-3 py-1 font-label text-xs">{job.period}</span>
              </div>
              <div className="md:col-span-8">
                <h3 className="font-display text-2xl font-medium lg:text-[28px]">{job.role}</h3>
                <p className="mt-3 font-sans text-base font-light leading-[1.69] text-subtle lg:text-lg">{job.summary}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Tools */}
      <section id="tools" className="shell py-[60px]">
        <SectionTitle>Tools of the trade</SectionTitle>
        <div className="mt-10 grid grid-cols-1 gap-x-12 sm:grid-cols-2">
          {tools.map((t, i) => (
            <Reveal key={t.name} delay={(i % 2) * 60}>
              <a
                href={t.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between border-b border-line/30 py-5"
              >
                <span className="font-display text-xl font-medium lg:text-2xl">
                  <span className="link-underline">{t.name}</span>
                </span>
                <span className="font-sans text-sm text-muted transition-colors group-hover:text-ink lg:text-base">{t.kind}</span>
              </a>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
