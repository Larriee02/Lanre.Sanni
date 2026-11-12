// Single source of truth for portfolio content.
// All copy below is taken from Lanre Sanni's original portfolio.

export const profile = {
  firstName: 'Lanre',
  name: 'Lanre Sanni',
  role: 'Full Stack Developer',
  location: 'Lagos, Nigeria',
  cv: '/Lanre.Sanni.pdf',
  email: 'lanresanni0@gmail.com',
  phoneDisplay: '+234 803 512 0129',
  whatsapp: 'https://wa.me/2348035120129',
};

export const socials = [
  { label: 'WhatsApp', href: 'https://wa.me/2348035120129' },
  { label: 'X (Twitter)', href: 'https://x.com/_lanre__?s=11' },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/lanre.sanni_?igsh=NDBxNHZndHNzazdp&utm_source=qr',
  },
  { label: 'GitHub', href: 'https://github.com/Larriee02' },
];

export const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Writings', to: '/writings' },
  { label: 'Resume', href: '/Lanre.Sanni.pdf' },
  { label: 'Contact', to: '/contact' },
];

export const projects = [
  {
    slug: 'lsm-rescue-and-towing',
    name: 'LSM Rescue & Towing',
    summary:
      'A dispatch and landing platform for a Lagos based towing service, built to help stranded drivers request 24/7 roadside rescue quickly and with confidence.',
    image: '/images/LSM.jpg',
    desktopImage: '/images/lsm-desktop.png',
    mobileImage: '/images/lsm-mobile.png',
    href: 'https://sanniabdulroheem-sketch.github.io/LSM-tow/',
    tags: ['Dispatch', 'Landing page', 'Local business'],
  },
  {
    slug: 'medicare',
    name: 'Medicare',
    summary:
      'A healthcare appointment booking platform that lets patients find available slots and book visits, while giving providers a clear view of their schedule.',
    image: '/images/Medicare.jpg',
    desktopImage: '/images/medicare-desktop.png',
    mobileImage: '/images/medicare-mobile.png',
    href: 'https://larriee02.github.io/Health-care-appointment-system/',
    tags: ['Healthcare', 'Booking system', 'Dashboard'],
  },
  {
    slug: 'extreme-flow-spa',
    name: 'Extreme Flow Spa',
    summary:
      'An e-commerce website for a wellness spa, presenting services clearly and making it simple for clients to browse treatments and get booked in.',
    image: '/images/Extreme-flow.jpg',
    desktopImage: '/images/spa-desktop.png',
    mobileImage: '/images/spa-mobile.png',
    href: 'https://larriee02.github.io/Extreme-flow2/',
    tags: ['E-commerce', 'Spa services', 'Wellness'],
  },
];

export const stats = [
  { value: 22, label: 'Months of experience' },
  { value: 15, label: 'Projects completed' },
  { value: 7, label: 'Worldwide clients' },
];

export const intro = [
  "I'm Lanre Sanni, a full stack developer who likes shipping things that actually feel finished, clean interfaces, solid backends, and the small details that make a product feel human instead of generic.",
  'I work across React, Node.js/Express, Tailwind CSS, and both MongoDB and PostgreSQL, and I care as much about how something feels to use as how well it runs under the hood.',
];

export const story = [
  'I got into development the way a lot of people do, curiosity turned into obsession.',
  'What kept me here is the craft: taking an idea, a business problem, or a rough proposal document and turning it into something real people can click through, trust, and use.',
  "I recently completed a Backend Development program (Node.js/Express track), sharpening my backend fundamentals, and I've carried that into a portfolio of full stack projects that mirror real world problems, from fintech dashboards to healthcare booking systems to logistics platforms for local businesses here in Lagos.",
  "I've built and shipped projects like a dispatch and landing page platform for a Lagos based towing service, a fintech dashboard with real time analytics, an apartment rental platform for World Cup visitors, and a healthcare booking system, each one an exercise in solving a real problem, not just checking a technical box.",
  "When I'm not writing code, I'm usually thinking about how tech can solve very specific, very local problems, the kind that don't show up in generic SaaS templates but matter a lot to the people dealing with them.",
];

export const skills = [
  {
    area: 'Frontend',
    detail:
      "React, Tailwind CSS, Framer Motion. I lean toward editorial, intentional design over generic templates. Typography and motion aren't afterthoughts for me.",
  },
  {
    area: 'Backend',
    detail: 'Node.js, Express, RESTful APIs, JWT authentication, email services (Nodemailer).',
  },
  {
    area: 'Databases',
    detail: 'MongoDB and PostgreSQL, depending on what the project actually needs.',
  },
  { area: 'Deployment', detail: 'GitHub Pages, Render, Vercel.' },
];

export const experience = [
  {
    role: 'Freelance Software Engineer',
    period: 'May 2025 — Present',
    summary:
      'Built multiple websites for clients, including e-commerce platforms, portfolio sites, and business websites. I worked closely with clients to understand their requirements and delivered customized solutions using modern web technologies. This experience allowed me to develop strong skills in front-end and back-end development, as well as project management and client communication.',
  },
  {
    role: 'Backend Development Program — TechCrush',
    period: 'Node.js / Express track',
    summary:
      'Completed an intensive backend program focused on Node.js and Express, sharpening fundamentals in API design, authentication, databases, and building reliable server-side applications.',
  },
];

export const tools = [
  { name: 'HTML5', kind: 'Markup Language', href: 'https://developer.mozilla.org/en-US/docs/Web/HTML' },
  { name: 'CSS3', kind: 'Styling Language', href: 'https://developer.mozilla.org/en-US/docs/Web/CSS' },
  {
    name: 'JavaScript',
    kind: 'Programming Language',
    href: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
  },
  { name: 'TypeScript', kind: 'Typed JavaScript', href: 'https://www.typescriptlang.org' },
  { name: 'React', kind: 'UI Library', href: 'https://react.dev' },
  { name: 'Next.js', kind: 'React Framework', href: 'https://nextjs.org' },
  { name: 'Tailwind CSS', kind: 'Utility CSS Framework', href: 'https://tailwindcss.com' },
  { name: 'TanStack Query', kind: 'Data Fetching Library', href: 'https://tanstack.com/query' },
  { name: 'Node.js', kind: 'JavaScript Runtime', href: 'https://nodejs.org' },
  { name: 'Git', kind: 'Version Control', href: 'https://git-scm.com' },
];

export const budgets = ['Under $500', '$500 - $1,000', '$1,000 - $3,000', '$3,000 - $5,000', '$5,000+', "Let's discuss"];
