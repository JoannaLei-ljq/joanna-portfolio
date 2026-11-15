import { useRef, useState } from 'react';
import './WorkDesk.css';

const featured = [
  {
    slug: 'career-forge',
    name: 'CareerForge',
    discipline: 'Applied AI / Full stack',
    description:
      'AI interview prep in one place: paste a resume and a target role to get feedback, STAR-formatted talking points, predicted questions, and a live mock interview.',
    highlights: [
      ['Built', 'Four tools with mode-specific prompts; an optional job description tailors every answer to one posting.'],
      ['Fast', 'Responses stream token by token (Vercel AI SDK streamText + useChat) instead of waiting on a full reply.'],
      ['Safe', 'Per-IP rate limiting protects the API key on the public demo; the model is configurable via OpenRouter.'],
    ],
    stack: ['Next.js', 'TypeScript', 'Vercel AI SDK', 'Tailwind CSS', 'shadcn/ui'],
    images: [
      { src: '/career-forge-overview.webp', width: 1200, height: 780, label: 'Overview', alt: 'CareerForge home screen with its four tools: Resume Analysis, STAR Rewrite, Question Prediction, Mock Interview' },
      { src: '/career-forge-star.webp', width: 1200, height: 780, label: 'STAR Rewrite', alt: 'CareerForge STAR Rewrite tool turning a work story into Situation, Task, Action, Result' },
    ],
    demo: 'https://career-forge-ochre.vercel.app/',
    github: 'https://github.com/JoannaLei-ljq/career-forge',
  },
  {
    slug: 'task-queue',
    name: 'Distributed Task Queue',
    discipline: 'Backend engineering',
    description:
      'A job queue built from scratch to understand what keeps slow, flaky work (like LLM calls) reliable: priority scheduling, safe concurrent claiming, retries, and dead-letter routing.',
    highlights: [
      ['Safe', 'Workers claim jobs with SELECT … FOR UPDATE SKIP LOCKED, so no job is processed twice — Postgres is both queue and coordinator.'],
      ['Resilient', 'Lock leases recover jobs from crashed workers; failures retry with exponential backoff, then go to a dead-letter queue.'],
      ['Debugged', 'Split claim and finish into separate transactions after READ COMMITTED hid the RUNNING state from other connections.'],
    ],
    stack: ['Java', 'Spring Boot', 'PostgreSQL', 'Docker', 'React'],
    github: 'https://github.com/JoannaLei-ljq/distributed-task-queue',
  },
  {
    slug: 'focus-gacha',
    name: 'Focus Gacha',
    discipline: 'Interactive frontend',
    description:
      'A task picker for when deciding what to do is harder than doing it: pull the handle, get one task, and commit to five minutes.',
    highlights: [
      ['Built', 'Hand-drawn SVG machine with a from-scratch 2D physics loop — capsules fall, bounce, and settle like real ones.'],
      ['Designed', '“Done” stays locked until the five-minute timer finishes; then it turns into an overtime stopwatch.'],
      ['Shipped', 'Stats, achievements, and history persist in localStorage; auto-deploys to Vercel on every push.'],
    ],
    stack: ['React', 'Vite', 'SVG / Physics', 'Web Audio API'],
    images: [{ src: '/focus-gacha.webp', width: 1200, height: 654, alt: 'Focus Gacha capsule machine with the task timer' }],
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
    category: 'Data analytics · team project',
    description:
      'SQL + pandas analysis of ~100k Olist orders: a 3.12% repeat-purchase rate and a November revenue peak pointed to retention as the growth lever.',
    stack: 'SQL · Python · Pandas · Matplotlib',
    github: 'https://github.com/x6zeng/brazilian-ecommerce-analytics',
  },
  {
    name: 'Customer Retention & Cohort Analysis',
    category: 'Data analytics',
    description:
      'Cohort analysis of UK online-retail transactions: tracks acquisition, month-by-month retention, and revenue per cohort to show when customers drop off.',
    stack: 'Python · Pandas · Cohort analysis',
    github: 'https://github.com/JoannaLei-ljq/customer-retention-cohort-analysis',
  },
];

// Stands in for a screenshot: the queue has no UI, so show how jobs flow.
// One or more screenshots, stacked like photos. With two or more, small
// labels underneath bring a different one to the front.
function ProjectPhotos({ images }) {
  const [front, setFront] = useState(0);
  const many = images.length > 1;

  return (
    <div className={`wd-photos${many ? ' is-stack' : ''}`}>
      <div className="wd-photo-stack">
        {images.map((image, index) => (
          <figure
            key={image.src}
            className={`wd-photo${index === front ? ' is-front' : ' is-back'}`}
            aria-hidden={index === front ? undefined : true}
            onClick={index === front ? undefined : () => setFront(index)}
          >
            <img src={image.src} alt={image.alt} width={image.width} height={image.height} loading="lazy" />
          </figure>
        ))}
      </div>
      {many && (
        <div className="wd-shot-tabs" role="group" aria-label="Screenshots">
          {images.map((image, index) => (
            <button
              key={image.src}
              type="button"
              className={index === front ? 'is-active' : ''}
              aria-pressed={index === front}
              onClick={() => setFront(index)}
            >
              {image.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function QueueDiagram() {
  return (
    <svg className="wd-diagram" viewBox="0 0 600 327" role="img" aria-label="Diagram: a REST API adds jobs to a priority queue in PostgreSQL; three workers claim them with SELECT FOR UPDATE SKIP LOCKED; failed jobs retry with exponential backoff and, after the retry limit, go to a dead-letter queue.">
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
        <text x="82" y="120">REST API</text>
        <text x="82" y="137" fontSize="10">POST /jobs</text>
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
        <text x="263" y="259" fontWeight="600">Retry</text>
        <text x="263" y="276" fontSize="10">exp. backoff</text>
        <text x="486" y="275" fontWeight="600">Dead-letter queue</text>
        <text x="480" y="226" fontSize="11" textAnchor="start">on failure</text>
        <text x="366" y="36" fontSize="10">SKIP LOCKED</text>
        <text x="366" y="302" fontSize="11">gives up</text>
        <text x="547" y="128" fontSize="11">→ done ✓</text>
      </g>
    </svg>
  );
}

export default function WorkDesk() {
  const [active, setActive] = useState(0);
  const [detailsOpen, setDetailsOpen] = useState(false);
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
              onClick={() => { setActive(index); setDetailsOpen(false); }}
            >
              <span className="wd-tab-number">0{index + 1}</span>
              {item.name}
            </button>
          ))}
        </div>

        <div className={`wd-folder wd-tone-${active + 1}`} role="tabpanel" id="wd-panel" aria-labelledby={`wd-tab-${project.slug}`}>
          <article className="wd-sheet" key={project.slug}>
            {project.images ? (
              <ProjectPhotos images={project.images} />
            ) : (
              <div className="wd-photos">
                <div className="wd-photo-stack">
                  <figure className="wd-photo is-front">
                    <QueueDiagram />
                  </figure>
                </div>
              </div>
            )}
            <div className="wd-info">
              <p className="wd-meta">
                <span>{project.discipline}</span>
                <span>0{active + 1} / 03</span>
              </p>
              <h3>{project.name}</h3>
              <p className="wd-description">{project.description}</p>
              <button
                type="button"
                className="wd-more"
                aria-expanded={detailsOpen}
                aria-controls="wd-highlights"
                onClick={() => setDetailsOpen(!detailsOpen)}
              >
                {detailsOpen ? 'Hide build notes' : 'How it’s built'} <span aria-hidden="true">{detailsOpen ? '−' : '+'}</span>
              </button>
              <dl className={`wd-highlights${detailsOpen ? ' is-open' : ''}`} id="wd-highlights">
                {project.highlights.map(([label, text]) => (
                  <div key={label}>
                    <dt>{label}</dt>
                    <dd>{text}</dd>
                  </div>
                ))}
              </dl>
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
                  {project.demo ? 'GitHub' : 'Read the build notes'} <span aria-hidden="true">↗</span>
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
