import { useState } from 'react';
import './WorkShowcase.css';

const featured = [
  {
    name: 'CareerForge', discipline: 'Applied AI / Full Stack',
    description: "Helps job seekers walk into interviews prepared, with AI-driven practice that adapts to the role they're going for.",
    stack: ['Next.js', 'TypeScript', 'Vercel AI SDK', 'Tailwind CSS'],
    image: '/career-forge.webp',
    demo: 'https://career-forge-ochre.vercel.app/',
    github: 'https://github.com/JoannaLei-ljq/career-forge',
  },
  {
    name: 'Distributed Task Queue', discipline: 'Backend Engineering',
    description: 'Processes priority-scheduled jobs across multiple workers, with automatic retries and dead-letter routing.',
    stack: ['Java', 'Spring Boot', 'PostgreSQL', 'Docker'],
    github: 'https://github.com/JoannaLei-ljq/distributed-task-queue',
  },
  {
    name: 'Focus Gacha', discipline: 'Interactive Frontend',
    description: 'Turns the paralysis of choosing a task into a quick, playful pull of the handle, then keeps you accountable with a five-minute timer.',
    stack: ['React', 'Vite', 'SVG / Physics', 'Web Audio API'],
    image: '/focus-gacha.webp',
    demo: 'https://focus-gacha.vercel.app/',
    github: 'https://github.com/JoannaLei-ljq/focus-gacha',
  },
];

function ProjectPreview({ project, number }) {
  return (
    <article className="work-preview">
      <div className="work-preview-media">
        {project.image ? (
          <img src={project.image} alt={`${project.name} screenshot`} width="1200" height="654" loading="lazy" />
        ) : (
          <div className="work-placeholder">
            <span>Backend Engineering / Java · Spring Boot</span>
            <strong>Distributed<br />Task Queue<span className="work-placeholder-period">.</span></strong>
            <span className="work-placeholder-caption">Project screenshot unavailable</span>
          </div>
        )}
      </div>
      <div className="work-preview-meta"><span>{project.discipline}</span><span>{number} / 03</span></div>
      <h3>{project.name}</h3>
      <p className="work-preview-description">{project.description}</p>
      <ul className="work-stack" aria-label={`${project.name} technologies`}>
        {project.stack.map((tech) => <li key={tech}>{tech}</li>)}
      </ul>
      <div className="work-actions">
        {project.demo && <a href={project.demo} target="_blank" rel="noreferrer" aria-label={`Open ${project.name} live demo in a new tab`}>Live demo <span aria-hidden="true">↗</span></a>}
        <a href={project.github} target="_blank" rel="noreferrer" aria-label={`Open ${project.name} GitHub repository in a new tab`}>GitHub <span aria-hidden="true">↗</span></a>
      </div>
    </article>
  );
}

export default function WorkShowcase() {
  const [active, setActive] = useState(0);
  return (
    <div className="work-showcase">
      <header className="work-heading">
        <p className="work-eyebrow">Selected projects / 01—03</p>
        <h2>Selected Work<span aria-hidden="true">.</span></h2>
        <p>A selection across applied AI, backend systems, and interactive frontend development.</p>
      </header>
      <div className="work-desktop">
        <div className="work-index">
          <p className="work-index-hint">Explore the work</p>
          <ol aria-label="Featured projects">
            {featured.map((project, index) => (
              <li key={project.name} className={active === index ? 'is-active' : ''}>
                <a href={project.demo || project.github} target="_blank" rel="noreferrer"
                  onMouseEnter={() => setActive(index)} onFocus={() => setActive(index)}
                  aria-label={`${project.name}: open ${project.demo ? 'live demo' : 'GitHub repository'} in a new tab`}>
                  <span className="work-index-number">0{index + 1}</span>
                  <span><strong>{project.name}</strong><span className="work-index-discipline">{project.discipline}</span></span>
                  <span className="work-index-arrow" aria-hidden="true">↗</span>
                </a>
              </li>
            ))}
          </ol>
          <a className="work-browse" href="#all-projects">Browse all seven projects <span aria-hidden="true">↓</span></a>
        </div>
        <div className="work-preview-stage" aria-label="Featured project preview">
          <ProjectPreview key={active} project={featured[active]} number={`0${active + 1}`} />
        </div>
      </div>
      <div className="work-mobile">
        {featured.map((project, index) => <ProjectPreview key={project.name} project={project} number={`0${index + 1}`} />)}
      </div>
    </div>
  );
}
