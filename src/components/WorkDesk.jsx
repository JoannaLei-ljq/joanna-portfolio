import { useRef, useState } from 'react';
import './WorkDesk.css';

const featured = [
  {
    slug: 'career-forge',
    name: 'CareerForge',
    discipline: 'Applied AI / Full stack',
    description: 'AI interview prep: resume feedback, STAR rewrites, and live mock interviews.',
    highlights: [
      'Streams every answer token by token, tailored to any job description',
      'Rate-limited public demo; the model is configurable through OpenRouter',
    ],
    stack: ['Next.js', 'TypeScript', 'Vercel AI SDK', 'Tailwind CSS'],
    images: [
      { src: '/career-forge-overview.webp', width: 1200, height: 780, label: 'Overview', alt: 'CareerForge home screen with its four tools: Resume Analysis, STAR Rewrite, Question Prediction, Mock Interview' },
      { src: '/career-forge-star.webp', width: 1200, height: 780, label: 'STAR Rewrite', alt: 'CareerForge STAR Rewrite tool turning a work story into Situation, Task, Action, Result' },
    ],
    demo: 'https://career-forge-ochre.vercel.app/',
    github: 'https://github.com/JoannaLei-ljq/career-forge',
  },
  {
    slug: 'fintech-data-platform',
    name: 'Fintech Data Platform',
    discipline: 'Data & backend engineering',
    description: 'A payments pipeline where every number is tested, reconciled, and published atomically.',
    highlights: [
      'Write-audit-publish with dbt and Airflow — a failed run never reaches users',
      'A concurrency fuzz test found 221 lost rows; the fix brought it to zero',
    ],
    stack: ['PostgreSQL', 'Python', 'dbt', 'Airflow'],
    images: [
      { diagram: 'pipeline', label: 'Architecture' },
      { src: '/fintech-airflow-runs.webp', width: 743, height: 360, label: 'Airflow runs', alt: 'Two Airflow runs of payments_v2_pipeline: one where every task succeeds, and one with an injected dbt failure where reconcile, publish and report never run' },
    ],
    github: 'https://github.com/JoannaLei-ljq/fintech-data-platform',
  },
  {
    slug: 'task-queue',
    name: 'Distributed Task Queue',
    discipline: 'Backend engineering',
    description: 'A Postgres-backed job queue with safe concurrent workers, retries, and dead-letter routing.',
    highlights: [
      'Workers claim jobs in parallel with SKIP LOCKED, so two never grab the same one',
      'Jobs held by a crashed worker return to the queue when their lease expires',
    ],
    stack: ['Java', 'Spring Boot', 'PostgreSQL', 'Docker'],
    diagram: 'queue',
    github: 'https://github.com/JoannaLei-ljq/distributed-task-queue',
  },
];

const drawer = [
  {
    name: 'Focus Gacha',
    category: 'Interactive frontend',
    description: 'A gacha-style task picker with a hand-drawn SVG machine and custom physics.',
    stack: 'React · SVG physics · Web Audio',
    demo: 'https://focus-gacha.vercel.app/',
    github: 'https://github.com/JoannaLei-ljq/focus-gacha',
  },
  {
    name: 'FoodCraft Plus',
    category: 'Consumer app',
    description: 'Suggests recipes from the ingredients already in your kitchen.',
    stack: 'React · React Router',
  },
  {
    name: 'Brazilian E-commerce Analytics',
    category: 'Data analytics · team project',
    description: 'Analyzed ~100k orders and found a 3.12% repeat-purchase rate.',
    stack: 'SQL · Python · Pandas',
    github: 'https://github.com/x6zeng/brazilian-ecommerce-analytics',
  },
  {
    name: 'Customer Retention & Cohort Analysis',
    category: 'Data analytics',
    description: 'Cohort analysis showing when online-retail customers stop coming back.',
    stack: 'Python · Pandas',
    github: 'https://github.com/JoannaLei-ljq/customer-retention-cohort-analysis',
  },
];

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
            key={image.src || image.diagram}
            className={`wd-photo${index === front ? ' is-front' : ' is-back'}`}
            aria-hidden={index === front ? undefined : true}
            onClick={index === front ? undefined : () => setFront(index)}
          >
            {image.diagram === 'pipeline' ? (
              <PipelineDiagram />
            ) : (
              <img src={image.src} alt={image.alt} width={image.width} height={image.height} loading="lazy" />
            )}
          </figure>
        ))}
      </div>
      {many && (
        <div className="wd-shot-tabs" role="group" aria-label="Screenshots">
          {images.map((image, index) => (
            <button
              key={image.src || image.diagram}
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

// The pipeline has no UI either: show write → audit → publish.
function PipelineDiagram() {
  return (
    <svg className="wd-diagram" viewBox="0 0 600 327" role="img" aria-label="Diagram: payments are written to a PostgreSQL OLTP database through write functions, synced into raw tables with a transaction-ID watermark, built by dbt into a candidate schema, independently reconciled, and only then published to marts in one transaction. If any step fails, the published marts stay as the last good run.">
      <defs>
        <marker id="wd-arrow-p" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M0 0 10 5 0 10z" fill="#1c2b45" />
        </marker>
      </defs>
      <rect width="600" height="327" fill="#fbf5e6" />
      <g fontFamily="'JetBrains Mono', ui-monospace, monospace" fill="#1c2b45" textAnchor="middle">
        <text x="300" y="30" fontSize="11" opacity=".7">Airflow · sync → dbt build → reconcile → publish</text>
        <g stroke="#1c2b45" strokeWidth="1.6">
          <rect x="20" y="58" width="140" height="62" rx="8" fill="#a9c4e4" />
          <rect x="200" y="58" width="110" height="62" rx="8" fill="#fff" />
          <rect x="350" y="58" width="230" height="62" rx="8" fill="#fff3a6" />
          <rect x="350" y="178" width="230" height="58" rx="8" fill="#fff" />
          <rect x="20" y="178" width="200" height="58" rx="8" fill="#dbe88a" />
        </g>
        <g stroke="#1c2b45" strokeWidth="1.6" fill="none" markerEnd="url(#wd-arrow-p)">
          <path d="M160 89H196" />
          <path d="M310 89H346" />
          <path d="M465 120V174" />
          <path d="M350 207H224" />
        </g>
        <text x="90" y="85" fontSize="13" fontWeight="600">PostgreSQL</text>
        <text x="90" y="103" fontSize="10">OLTP · write fns</text>
        <text x="255" y="85" fontSize="13" fontWeight="600">raw.*</text>
        <text x="255" y="103" fontSize="10">xid watermark</text>
        <text x="465" y="85" fontSize="13" fontWeight="600">dbt build</text>
        <text x="465" y="103" fontSize="10">marts_candidate · tests</text>
        <text x="465" y="203" fontSize="13" fontWeight="600">reconcile</text>
        <text x="465" y="221" fontSize="10">OLTP ↔ raw ↔ candidate</text>
        <text x="120" y="203" fontSize="13" fontWeight="600">marts.*</text>
        <text x="120" y="221" fontSize="10">published in one txn</text>
        <text x="287" y="198" fontSize="10">if valid</text>
        <text x="300" y="282" fontSize="11">✗ any step fails → marts stay as the last good run</text>
        <text x="300" y="304" fontSize="10" opacity=".7">313 pytest · 84 dbt data tests · 112 acceptance checks</text>
      </g>
    </svg>
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
        <header className="wd-heading" data-reveal>
          <p className="wd-eyebrow">Selected work / 01—03</p>
          <h2 id="work-heading">
            Things I’ve <i>built</i>
            <em aria-hidden="true">.</em>
          </h2>
          <p className="wd-lede">Three projects across applied AI, data correctness, and backend systems.</p>
          <p className="wd-hint" aria-hidden="true">pick a folder ↓</p>
        </header>

        <div className="wd-tabs" data-reveal style={{ '--reveal-delay': '.1s' }} role="tablist" aria-label="Featured projects" onKeyDown={onKeyDown}>
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

        <div className={`wd-folder wd-tone-${active + 1}`} data-reveal style={{ '--reveal-delay': '.18s' }} role="tabpanel" id="wd-panel" aria-labelledby={`wd-tab-${project.slug}`}>
          <article className="wd-sheet" key={project.slug}>
            {project.images ? (
              <ProjectPhotos images={project.images} />
            ) : (
              <div className="wd-photos">
                <div className="wd-photo-stack">
                  <figure className="wd-photo is-front">
                    {project.diagram === 'pipeline' ? <PipelineDiagram /> : <QueueDiagram />}
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
              <ul className="wd-points">
                {project.highlights.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
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

        <div className="wd-drawer" data-reveal>
          <h3 id="all-projects">Also in the drawer</h3>
          <p className="wd-drawer-lede">Four more, from interactive frontend to data analysis.</p>
          <ul className="wd-cards">
            {drawer.map((item) => (
              <li key={item.name} className="wd-card">
                <p className="wd-card-category">{item.category}</p>
                <h4>{item.name}</h4>
                <p className="wd-card-description">{item.description}</p>
                <p className="wd-card-stack">{item.stack}</p>
                {(item.demo || item.github) && (
                  <p className="wd-card-links">
                    {item.demo && (
                      <a href={item.demo} target="_blank" rel="noreferrer">
                        Live demo <span aria-hidden="true">↗</span>
                        <span className="hero-sr-only"> (opens in a new tab)</span>
                      </a>
                    )}
                    {item.github && (
                      <a href={item.github} target="_blank" rel="noreferrer">
                        GitHub <span aria-hidden="true">↗</span>
                        <span className="hero-sr-only"> (opens in a new tab)</span>
                      </a>
                    )}
                  </p>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
