/**
 * Adaptive Lanre Sanni (LS) brand logo component.
 * Smoothly cross-fades between the Light-mode (#FFFFFF) and Dark-mode (#000000)
 * logo assets from the LS logo pack whenever the portfolio theme toggles.
 *
 * Variants:
 * - "badge": Prominent icon mark (IMG_4573 light / IMG_4576 dark)
 * - "full":  Full vertical lockup "LANRE SANNI · SOFTWARE ENGINEER" (IMG_4575 light / IMG_4574 dark)
 * - "mark":  Transparent icon mark (IMG_4577) for floating watermarks
 */
export default function BrandLogo({ variant = 'badge', className = '' }) {
  if (variant === 'full') {
    return (
      <div
        className={`relative aspect-square w-full overflow-hidden bg-white dark:bg-black border border-[#0D51EF]/20 shadow-[0_20px_50px_-20px_rgba(13,81,239,0.22)] transition-all duration-500 ${className}`}
      >
        {/* Light mode full lockup (IMG_4575) */}
        <img
          src="/images/logos/ls-full-light.png"
          alt="Lanre Sanni — Software Engineer"
          className="absolute inset-0 h-full w-full object-contain p-2 transition-opacity duration-500 opacity-100 dark:opacity-0"
        />
        {/* Dark mode full lockup (IMG_4574) */}
        <img
          src="/images/logos/ls-full-dark.png"
          alt="Lanre Sanni — Software Engineer"
          className="absolute inset-0 h-full w-full object-contain p-2 transition-opacity duration-500 opacity-0 dark:opacity-100"
        />
      </div>
    );
  }

  if (variant === 'mark') {
    return (
      <img
        src="/images/logos/ls-badge-transparent.png"
        alt="LS logo mark"
        className={`object-contain select-none ${className}`}
      />
    );
  }

  // Default: "badge" (IMG_4573 light on #FFFFFF / IMG_4576 dark on #000000)
  return (
    <span
      className={`relative inline-flex shrink-0 overflow-hidden rounded-2xl bg-white dark:bg-black transition-all duration-500 ${className}`}
    >
      {/* Light mode icon (IMG_4573) */}
      <img
        src="/images/logos/ls-badge-light.png"
        alt="Lanre Sanni logo"
        className="h-full w-full object-contain transition-opacity duration-500 opacity-100 dark:opacity-0"
      />
      {/* Dark mode icon (IMG_4576) */}
      <img
        src="/images/logos/ls-badge-dark.png"
        alt="Lanre Sanni logo"
        className="absolute inset-0 h-full w-full object-contain transition-opacity duration-500 opacity-0 dark:opacity-100"
      />
    </span>
  );
}
