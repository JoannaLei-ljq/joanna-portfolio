import { useRef, useState } from 'react';
import './WorkDesk.css';

const featured = [
  {
    slug: 'career-forge',
    name: 'CareerForge',
    discipline: 'Applied AI / Full stack',
    description:
      "Helps job seekers walk into interviews prepared, with AI-driven practice that adapts to the role they're going for.",
    stack: ['Next.js', 'TypeScript', 'Vercel AI SDK', 'Tailwind CSS'],
    image: { src: '/career-forge.webp', width: 1200, height: 654 },
    demo: 'https://career-forge-ochre.vercel.app/',
    github: 'https://github.com/JoannaLei-ljq/career-forge',
  },
  {
    slug: 'task-queue',
    name: 'Distributed Task Queue',
    discipline: 'Backend engineering',
    description:
      'Processes priority-scheduled jobs across multiple workers, with automatic retries and dead-letter routing.',
    stack: ['Java', 'Spring Boot', 'PostgreSQL', 'Docker'],
    github: 'https://github.com/JoannaLei-ljq/distributed-task-queue',
  },
  {
    slug: 'focus-gacha',
    name: 'Focus Gacha',
    discipline: 'Interactive frontend',
    description:
      'Turns the paralysis of choosing a task into a quick, playful pull of the handle, then keeps you accountable with a five-minute timer.',
    stack: ['React', 'Vite', 'SVG / Physics', 'Web Audio API'],
    image: { src: '/focus-gacha.webp', width: 1200, height: 654 },
    demo: 'https://focus-gacha.vercel.app/',
    github: 'https://github.com/JoannaLei-ljq/focus-gacha',
  },
];

const drawer = [
  {
    name: 'FoodCraft Plus',
    category: 'Consumer app',
    description:
      "Suggests recipes from whatever's already in your kitchen, so deciding what to cook stops being the hardest part of cooking.",
    stack: 'React · React Router · React Select',
  },
  {
    name: 'Matchathon Web App',
    category: 'Hackathon project',
    description: 'Connects people quickly through a fast, intuitive interface, built in a weekend hackathon.',
    stack: 'Next.js · React · Rapid prototyping',
  },
  {
    name: 'Brazilian E-commerce Analytics',
    category: 'Data analytics',
    description:
      'Uncovers where a Brazilian e-commerce business loses revenue after the first purchase, pointing to retention as the real growth lever.',
    stack: 'SQL · Python · Pandas · Matplotlib',
    github: 'https://github.com/x6zeng/brazilian-ecommerce-analytics',
  },
  {
    name: 'Customer Retention & Cohort Analysis',
    category: 'Data analytics',
    description:
      'Shows exactly when and why customers stop coming back after their first purchase, so retention efforts can target the moment that matters most.',
    stack: 'Python · Pandas · Cohort analysis',
    github: 'https://github.com/JoannaLei-ljq/customer-retention-cohort-analysis',
  },
];

// Stands in for a screenshot: the queue has no UI, so show how jobs flow.
function QueueDiagram() {
  return (
    <svg className="wd-diagram" viewBox="0 0 600 327" role="img" aria-label="Diagram: producers add jobs to a priority queue in PostgreSQL; several workers process them; failed jobs are retried and, after repeated failures, routed to a dead-letter queue.">
      <defs>
        <marker id="wd-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M0 0 10 5 0 10z" fill="#1c2b45" />
        </marker>
      </defs>
      <rect width="600" height="327" fill="#fbf5e6" />
      <g fontFamily="'JetBrains Mono', ui-monospace, monospace" fontSize="13" fill="#1c2b45" textAnchor="middle">
        <g stroke="#1c2b45" strokeWidth="1.6">
          <rect x="26" y="96" width="112" height="54" rx="8" fill="#fff" />
          <rect x="188" y="78" width="150" height="90" rx="8" fill="#a9c4e4" />
          <rect x="398" y="40" width="98" height="38" rx="8" fill="#fff" />
          <rect x="398" y="104" width="98" height="38" rx="8" fill="#fff" />
          <rect x="398" y="168" width="98" height="38" rx="8" fill="#fff" />
          <rect x="188" y="238" width="150" height="48" rx="8" fill="#fff3a6" />
          <rect x="398" y="246" width="176" height="48" rx="8" fill="#f3c6bd" />
        </g>
        <g stroke="#1c2b45" strokeWidth="1.6" fill="none" markerEnd="url(#wd-arrow)">
          <path d="M138 123H184" />
          <path d="M338 108 394 62" />
          <path d="M338 123H394" />
          <path d="M338 138 394 184" />
          <path d="M447 206V230Q447 262 342 262" strokeDasharray="5 4" />
          <path d="M263 238V172" strokeDasharray="5 4" />
          <path d="M338 276H394" strokeDasharray="5 4" />
        </g>
        <text x="82" y="128">Producers</text>
        <text x="263" y="112" fontWeight="600">Priority queue</text>
        <text x="263" y="132" fontSize="11">PostgreSQL</text>
        <g fill="#fff" stroke="#1c2b45" strokeWidth="1.2">
          <rect x="206" y="142" width="26" height="14" rx="3" />
          <rect x="237" y="142" width="26" height="14" rx="3" />
          <rect x="268" y="142" width="26" height="14" rx="3" />
          <rect x="299" y="142" width="22" height="14" rx="3" fill="#d8e85a" />
        </g>
        <text x="447" y="64">Worker 1</text>
        <text x="447" y="128">Worker 2</text>
        <text x="447" y="192">Worker 3</text>
        <text x="263" y="267" fontWeight="600">Retry</text>
        <text x="486" y="275" fontWeight="600">Dead-letter queue</text>
        <text x="480" y="226" fontSize="11" textAnchor="start">on failure</text>
        <text x="366" y="302" fontSize="11">gives up</text>
        <text x="547" y="128" fontSize="11">→ done ✓</text>
      </g>
    </svg>
  );
}

export default function WorkDesk() {
  const [active, setActive] = useState(0);
  const tabs = useRef([]);
  const project = featured[active];

  const onKeyDown = (event) => {
    const step = { ArrowRight: 1, ArrowLeft: -1 }[event.key];
    if (!step) return;
    event.preventDefault();
    const next = (active + step + featured.length) % featured.length;
    setActive(next);
    tabs.current[next]?.focus();
  };

  return (
    <section id="projects" className="work-desk" aria-labelledby="work-heading">
      <div className="wd-inner">
        <header className="wd-heading">
          <p className="wd-eyebrow">Selected work / 01—03</p>
          <h2 id="work-heading">
            Things I’ve <i>built</i>
            <em aria-hidden="true">.</em>
          </h2>
          <p className="wd-lede">Three projects across applied AI, backend systems, and interactive frontend.</p>
          <p className="wd-hint" aria-hidden="true">pick a folder ↓</p>
        </header>

        <div className="wd-tabs" role="tablist" aria-label="Featured projects" onKeyDown={onKeyDown}>
          {featured.map((item, index) => (
            <button
              key={item.slug}
              ref={(el) => (tabs.current[index] = el)}
              type="button"
              role="tab"
              id={`wd-tab-${item.slug}`}
              aria-selected={active === index}
              aria-controls="wd-panel"
              tabIndex={active === index ? 0 : -1}
              className={`wd-tab wd-tone-${index + 1}${active === index ? ' is-active' : ''}`}
              onClick={() => setActive(index)}
            >
              <span className="wd-tab-number">0{index + 1}</span>
              {item.name}
            </button>
          ))}
        </div>

        <div className={`wd-folder wd-tone-${active + 1}`} role="tabpanel" id="wd-panel" aria-labelledby={`wd-tab-${project.slug}`}>
          <article className="wd-sheet" key={project.slug}>
            <div className="wd-photo">
              {project.image ? (
                <img src={project.image.src} alt={`${project.name} screenshot`} width={project.image.width} height={project.image.height} loading="lazy" />
              ) : (
                <QueueDiagram />
              )}
            </div>
            <div className="wd-info">
              <p className="wd-meta">
                <span>{project.discipline}</span>
                <span>0{active + 1} / 03</span>
              </p>
              <h3>{project.name}</h3>
              <p className="wd-description">{project.description}</p>
              <ul className="wd-stack" aria-label={`${project.name} technologies`}>
                {project.stack.map((tech) => (
                  <li key={tech}>{tech}</li>
                ))}
              </ul>
              <div className="wd-actions">
                {project.demo && (
                  <a className="wd-btn wd-btn-main" href={project.demo} target="_blank" rel="noreferrer">
                    Live demo <span aria-hidden="true">↗</span>
                    <span className="hero-sr-only"> (opens in a new tab)</span>
                  </a>
                )}
                <a className={`wd-btn${project.demo ? '' : ' wd-btn-main'}`} href={project.github} target="_blank" rel="noreferrer">
                  GitHub <span aria-hidden="true">↗</span>
                  <span className="hero-sr-only"> (opens in a new tab)</span>
                </a>
              </div>
            </div>
          </article>
        </div>

        <div className="wd-drawer">
          <h3 id="all-projects">Also in the drawer</h3>
          <p className="wd-drawer-lede">Four more, from consumer apps to data analysis.</p>
          <ul className="wd-cards">
            {drawer.map((item) => (
              <li key={item.name} className="wd-card">
                <p className="wd-card-category">{item.category}</p>
                <h4>{item.name}</h4>
                <p className="wd-card-description">{item.description}</p>
                <p className="wd-card-stack">{item.stack}</p>
                {item.github && (
                  <a href={item.github} target="_blank" rel="noreferrer">
                    GitHub <span aria-hidden="true">↗</span>
                    <span className="hero-sr-only"> (opens in a new tab)</span>
                  </a>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
