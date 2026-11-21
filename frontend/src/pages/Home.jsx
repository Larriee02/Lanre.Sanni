import { Link } from 'react-router-dom';
import WritingList from '../components/WritingList.jsx';
import { profile, projects } from '../data/site.js';
import { writings } from '../data/writings.js';

export default function Home() {
  return (
    <div className="shell studio">
      <section className="studio-hero">
        <div>
          <p className="studio-label">{profile.role} · {profile.location}</p>
          <h1>Lanre<br /><em>Sanni</em><span>.</span></h1>
          <p className="intro">I build interfaces and backends for the things people need to do next.</p>
          <div className="hero-links"><a href="#work">Explore my work ↓</a><Link to="/about">About me ↗</Link></div>
        </div>
        <figure className="signal">
          <div className="wave" aria-hidden="true">
            {Array.from({ length: 30 }, (_, i) => <i key={i} style={{ '--turn': i * 3.7 + 'deg', '--offset': (i - 15) * 1.45 + '%' }} />)}
          </div>
          <figcaption><span>Lagos, Nigeria</span><span>6.52° N · 3.38° E</span></figcaption>
        </figure>
      </section>
      <section id="work">
        <h2 className="studio-title">Selected <em>work</em></h2>
        <div className="work-grid">{projects.map(project => (
          <a className="work-piece" key={project.slug} href={project.href} target="_blank" rel="noreferrer">
            <div className="work-frame"><img loading="lazy" src={project.desktopImage} alt={project.name + ' desktop interface'} /></div>
            <p className="studio-label">{project.tags.join(' / ')}</p>
            <h3>{project.name} <span aria-hidden="true">↗</span></h3>
            <p>{project.summary}</p>
          </a>
        ))}</div>
      </section>
      <section className="studio-writing"><h2 className="studio-title">Recent <em>writings</em></h2>
        <WritingList items={writings.slice(0, 3)} /><Link className="journal-link" to="/writings">All writings →</Link>
      </section>
    </div>
  );
}
