import Reveal from './Reveal.jsx';

/**
 * Studio-lit 3D MacBook Pro + iPhone mockup matching the reference UXfolio presentation,
 * tinted with the Lanre Sanni royal-blue (#0D51EF -> #0637B6) studio palette.
 */
export default function ProjectCard({ project, index = 0 }) {
  const desktopSrc = project.desktopImage || project.image;
  const mobileSrc = project.mobileImage || project.image;
  const flip = index % 2 === 1;

  const laptopTransform = flip
    ? 'perspective(1300px) rotateX(6deg) rotateY(15deg) rotateZ(-2deg)'
    : 'perspective(1300px) rotateX(6deg) rotateY(-15deg) rotateZ(2deg)';

  const phoneTransform = flip
    ? 'perspective(1100px) rotateX(4deg) rotateY(-14deg) rotateZ(5deg)'
    : 'perspective(1100px) rotateX(4deg) rotateY(14deg) rotateZ(-5deg)';

  return (
    <a
      href={project.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Open ${project.name} live site`}
      className="group block"
    >
      <Reveal delay={(index % 2) * 80}>
        <div
          className="relative aspect-square overflow-hidden border border-[#0D51EF]/15 bg-gradient-to-br from-[#EAF0FC] via-[#F3F6FD] to-[#E3ECFB] transition-colors duration-500 group-hover:border-[#0D51EF]/40 dark:border-[#0D51EF]/25 dark:from-[#050A14] dark:via-[#091224] dark:to-[#04070F]"
        >
          {/* Subtle royal-blue studio ambient light */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                'radial-gradient(circle at 50% 42%, rgba(13,81,239,0.12) 0%, rgba(6,55,182,0.03) 65%, transparent 100%)',
            }}
          />

          {/* 3D Mockup Stage */}
          <div className="relative flex h-full w-full items-center justify-center p-6 sm:p-10 transition-transform duration-700 ease-out group-hover:scale-[1.035]">
            {/* MacBook Pro Mockup */}
            <div
              className={`relative w-[84%] transition-transform duration-700 ease-out ${
                flip ? ' -translate-x-[5%]' : 'translate-x-[5%]'
              }`}
              style={{ transform: laptopTransform, transformStyle: 'preserve-3d' }}
            >
              {/* Laptop Display Lid */}
              <div className="relative mx-auto w-[88%] rounded-t-[14px] bg-[#0B0C0F] p-[2.4%] pb-[3%] shadow-[0_25px_50px_-12px_rgba(6,24,68,0.5)] ring-1 ring-white/15">
                {/* Camera notch */}
                <div className="absolute left-1/2 top-0 z-20 h-[6px] w-[14%] -translate-x-1/2 rounded-b-[4px] bg-[#0B0C0F]">
                  <span className="absolute left-1/2 top-1/2 h-1 w-1 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#1F2937]" />
                </div>

                {/* Screen Viewport (16:10) */}
                <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[4px] bg-[#080C14]">
                  <img
                    src={desktopSrc}
                    alt={`${project.name} desktop preview`}
                    loading="lazy"
                    className="h-full w-full object-cover object-top"
                  />
                  {/* Subtle glass reflection */}
                  <div
                    className="pointer-events-none absolute inset-0"
                    style={{
                      background:
                        'linear-gradient(125deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.02) 38%, transparent 45%)',
                    }}
                  />
                </div>

                {/* Bottom bezel brand bar */}
                <div className="mt-[1.2%] flex justify-center">
                  <span className="h-[2px] w-8 rounded-full bg-white/10" />
                </div>
              </div>

              {/* Laptop Aluminum Keyboard Deck + Base */}
              <div className="relative mx-auto -mt-[1px] w-full">
                {/* Upper angled keyboard deck */}
                <div
                  className="mx-auto h-3.5 sm:h-4 w-[96%] rounded-t-[2px] bg-gradient-to-b from-[#E3E5EA] via-[#C8CBD2] to-[#AEB2BC] shadow-inner"
                  style={{
                    clipPath: 'polygon(4.2% 0%, 95.8% 0%, 100% 100%, 0% 100%)',
                  }}
                >
                  {/* Recessed dark keyboard well hint */}
                  <div
                    className="mx-auto h-[55%] w-[82%] bg-[#18191D]/85"
                    style={{
                      clipPath: 'polygon(2% 15%, 98% 15%, 100% 100%, 0% 100%)',
                    }}
                  />
                </div>

                {/* Front aluminum lip + thumb notch */}
                <div className="relative mx-auto h-2 sm:h-2.5 w-[96%] rounded-b-[10px] bg-gradient-to-r from-[#8D919B] via-[#D4D7DF] to-[#838791] shadow-[0_14px_24px_-4px_rgba(0,0,0,0.45)]">
                  <div className="absolute left-1/2 top-0 h-1 w-[14%] -translate-x-1/2 rounded-b-[4px] bg-[#6E727B]" />
                </div>

                {/* Soft studio floor shadow */}
                <div className="mx-auto mt-1 h-4 w-[90%] rounded-full bg-[#061844]/30 blur-md dark:bg-black/75" />
              </div>
            </div>

            {/* Floating iPhone Mockup */}
            <div
              className={`absolute bottom-[14%] z-20 w-[23%] sm:w-[22%] transition-transform duration-700 ease-out group-hover:-translate-y-1.5 ${
                flip ? 'right-[6%] sm:right-[7%]' : 'left-[6%] sm:left-[7%]'
              }`}
              style={{ transform: phoneTransform }}
            >
              <div className="relative rounded-[18px] sm:rounded-[22px] bg-[#101115] p-[3.5px] sm:p-[5px] shadow-[0_24px_38px_-10px_rgba(6,24,68,0.55)] ring-1 ring-white/25">
                {/* Dynamic Island */}
                <div className="absolute left-1/2 top-[6px] sm:top-[8px] z-20 h-[4px] sm:h-[5px] w-[28%] -translate-x-1/2 rounded-full bg-black" />

                {/* Phone Screen (9:19.5) */}
                <div className="relative aspect-[9/19.2] w-full overflow-hidden rounded-[14px] sm:rounded-[17px] bg-[#080C14]">
                  <img
                    src={mobileSrc}
                    alt={`${project.name} mobile preview`}
                    loading="lazy"
                    className="h-full w-full object-cover object-top"
                  />
                  <div
                    className="pointer-events-none absolute inset-0"
                    style={{
                      background:
                        'linear-gradient(135deg, rgba(255,255,255,0.14) 0%, transparent 42%)',
                    }}
                  />
                </div>

                {/* Home indicator bar */}
                <div className="absolute bottom-[5px] left-1/2 h-[2px] w-[32%] -translate-x-1/2 rounded-full bg-white/50" />
              </div>
            </div>
          </div>

          {/* External link hover badge in signature LS blue */}
          <span className="absolute right-5 top-5 z-30 flex h-11 w-11 items-center justify-center rounded-full bg-[#0D51EF] text-white opacity-0 shadow-md transition-all duration-300 translate-y-1 group-hover:translate-y-0 group-hover:opacity-100">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M7 17L17 7M8 7h9v9" />
            </svg>
          </span>
        </div>
      </Reveal>
      <Reveal delay={(index % 2) * 80 + 60} className="pt-8">
        <h3 className="font-display text-[25.6px] font-medium leading-[1.33] transition-colors group-hover:text-accent sm:text-[30.4px] lg:text-[40px] lg:leading-[1.4]">
          <span className="link-underline">{project.name}</span>
        </h3>
        <p className="mt-3 font-sans text-[17.6px] font-light leading-[1.6] text-subtle lg:text-xl lg:leading-[1.75]">
          {project.summary}
        </p>
      </Reveal>
    </a>
  );
}
