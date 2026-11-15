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
    description:
      'Developing B2B styling tools and full-stack workflows, including catalog imports, collection reviews, and Shopify integrations.',
  },
  {
    id: 'karyio',
    company: 'Reignite Life / Karyio',
    initial: 'K',
    role: 'Software Engineer · Volunteer',
    start: ['Apr', '2026'],
    end: 'present',
    range: 'Apr 2026 – Present',
    current: true,
    description:
      'Building an AI-powered caregiving app, with a focus on conversational AI, SwiftUI integration, and voice-assisted care logging.',
  },
  {
    id: 'illuminera',
    company: 'Illuminera',
    initial: 'I',
    role: 'Data Analyst Intern',
    start: ['May', '2024'],
    end: 'Aug 2024',
    range: 'May 2024 – Aug 2024',
    description: 'Automated data processing and built SQL-driven analytics and dashboards to support product decisions.',
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
        <header className="xp-heading">
          <p className="ds-eyebrow">Experience / 2024 — now</p>
          <h2 id="experience-heading">
            Where I’ve <i>worked</i>
            <em aria-hidden="true">.</em>
          </h2>
        </header>

        <div className="xp-layout">
          <div className={`xp-cal xp-tone-${active + 1}`}>
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
                <p className="xp-employer">{job.company}</p>
                <p className="xp-description">{job.description}</p>
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

          <div className="xp-tabs" role="tablist" aria-label="Roles" aria-orientation="vertical" onKeyDown={onKeyDown}>
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
