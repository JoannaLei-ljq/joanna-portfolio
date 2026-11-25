import { useRef, useState } from 'react';
import './AboutDesk.css';
import './ExperiencePlanner.css';

const jobs = [
  {
    id: 'faishion',
    company: 'fAIshion Inc.',
    initial: 'f',
    role: 'Fullstack Developer Intern',
    start: ['Aug', '2026'],
    end: 'present',
    range: 'Aug 2026 – Present',
    current: true,
    about: 'AI-powered fashion creative platform',
    points: [
      'Shipped a Next.js app that turns a brand\'s products into AI campaign and ad images.',
      'Developed per-image billing and bulk product imports with Prisma and PostgreSQL.',
    ],
  },
  {
    id: 'reignitelife',
    company: 'ReigniteLIFE',
    initial: 'R',
    role: 'Software Engineer Intern',
    start: ['Apr', '2026'],
    end: 'present',
    range: 'Apr 2026 – Present',
    current: true,
    about: 'Nonprofit for ALS/MND research and care',
    points: [
      'Implemented backend features for care-team permissions and RAG.',
      'Shipped SwiftUI iOS features, including AI chat and voice.',
    ],
  },
  {
    id: 'martspec',
    company: 'Martspec',
    initial: 'M',
    role: 'Business Analyst Intern',
    start: ['May', '2025'],
    end: 'Feb 2026',
    range: 'May 2025 – Feb 2026',
    about: 'App marketing & acquisition analytics',
    points: [
      'Built reusable Python and SQL ETL workflows for app and campaign data.',
      'Led an ASO keyword strategy to improve search visibility and downloads.',
    ],
  },
  {
    id: 'illuminera',
    company: 'Illuminera',
    initial: 'I',
    role: 'Data Analyst Intern',
    start: ['May', '2024'],
    end: 'Aug 2024',
    range: 'May 2024 – Aug 2024',
    about: 'Data analytics',
    points: [
      'Built Python pipelines to clean and standardize user behavior data.',
      'Defined retention metrics for BI dashboards used by product and marketing.',
    ],
  },
];

export default function ExperiencePlanner() {
  const [active, setActive] = useState(0);
  const tabs = useRef([]);
  const job = jobs[active];

  const onKeyDown = (event) => {
    const step = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 }[event.key];
    if (!step) return;
    event.preventDefault();
    const next = (active + step + jobs.length) % jobs.length;
    setActive(next);
    tabs.current[next]?.focus();
  };

  return (
    <section id="experience" className="desk-section xp" aria-labelledby="experience-heading">
      <div className="ds-inner">
        <header className="xp-heading" data-reveal>
          <p className="ds-eyebrow">Experience / 2024 — now</p>
          <h2 id="experience-heading">
            Where I’ve <i>worked</i>
            <em aria-hidden="true">.</em>
          </h2>
        </header>

        <div className="xp-layout">
          <div className={`xp-cal xp-tone-${active + 1}`} data-reveal style={{ '--reveal-delay': '.1s' }}>
            <div className="xp-rings" aria-hidden="true">
              {Array.from({ length: 14 }, (_, i) => <span key={i} />)}
            </div>

            <article className="xp-page" key={job.id} role="tabpanel" id="xp-panel" aria-labelledby={`xp-tab-${job.id}`}>
              <div className="xp-date-block" aria-hidden="true">
                <span className="xp-date-month">{job.start[0]}</span>
                <span className="xp-date-year">{job.start[1]}</span>
                <span className="xp-date-end">→ {job.end}</span>
              </div>
              <div className="xp-page-body">
                <p className="xp-range">{job.range}</p>
                <h3>{job.role}</h3>
                <p className="xp-employer">
                  {job.company}
                  <span className="xp-about">{job.about}</span>
                </p>
                <ul className="xp-points">
                  {job.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </div>

              <div className="xp-badge" aria-hidden="true">
                <span className="xp-badge-clip" />
                <div className="xp-badge-card">
                  <span className="xp-badge-initial">{job.initial}</span>
                  <span className="xp-badge-company">{job.company}</span>
                  <span className="xp-badge-role">{job.role}</span>
                  {job.current && <span className="xp-badge-current">current</span>}
                </div>
              </div>
            </article>
          </div>

          <div className="xp-tabs" data-reveal style={{ '--reveal-delay': '.22s' }} role="tablist" aria-label="Roles" aria-orientation="vertical" onKeyDown={onKeyDown}>
            {jobs.map((item, index) => (
              <button
                key={item.id}
                ref={(el) => (tabs.current[index] = el)}
                type="button"
                role="tab"
                id={`xp-tab-${item.id}`}
                aria-selected={active === index}
                aria-controls="xp-panel"
                tabIndex={active === index ? 0 : -1}
                className={`xp-tab xp-tone-${index + 1}${active === index ? ' is-active' : ''}`}
                onClick={() => setActive(index)}
              >
                <span className="xp-tab-range">{item.range}</span>
                <span className="xp-tab-company">{item.company}</span>
                <span className="xp-tab-role">{item.role}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
