import { useState } from 'react';
import './AboutDesk.css';
import './SkillsKeyboard.css';

// Where each skill shows up on this site. Only list places the site itself backs up.
const usedIn = {
  Java: ['ReigniteLIFE backend (REST APIs)', 'Distributed Task Queue'],
  Python: ['Fintech Data Platform (sync, reconciliation)', 'Brazilian E-commerce Analytics', 'Customer Retention & Cohort Analysis'],
  Swift: ['ReigniteLIFE care app (iOS)'],
  SwiftUI: ['ReigniteLIFE care app (voice, chat, summaries)'],
  TypeScript: ['CareerForge'],
  JavaScript: ['FoodCraft Plus'],
  SQL: ['Fintech Data Platform', 'Brazilian E-commerce Analytics', 'Data Analyst Intern @ Illuminera'],
  'Spring Boot': ['ReigniteLIFE backend (REST APIs)', 'Distributed Task Queue'],
  PostgreSQL: ['Fintech Data Platform', 'Distributed Task Queue'],
  React: ['Focus Gacha', 'Task Queue dashboard', 'FoodCraft Plus'],
  'Next.js': ['CareerForge'],
  'React Router': ['FoodCraft Plus'],
  'Tailwind CSS': ['CareerForge'],
  Docker: ['Fintech Data Platform', 'Distributed Task Queue (API + 3 workers + Postgres)'],
  dbt: ['Fintech Data Platform (84 data tests)'],
  Airflow: ['Fintech Data Platform (write-audit-publish DAG)'],
  Vite: ['Focus Gacha'],
  Vercel: ['CareerForge', 'Focus Gacha'],
  'LLM APIs': ['CareerForge (Vercel AI SDK + OpenRouter)', 'ReigniteLIFE — AI care assistant'],
  Pandas: ['Brazilian E-commerce Analytics', 'Customer Retention & Cohort Analysis'],
  Matplotlib: ['Brazilian E-commerce Analytics'],
  'Cohort analysis': ['Customer Retention & Cohort Analysis'],
  'Data viz': ['Customer Retention & Cohort Analysis', 'Dashboards @ Illuminera'],
};

// Core keys are the stack I'd most like to be hired for; they get colour.
const core = new Set(['Java', 'Spring Boot', 'PostgreSQL', 'TypeScript', 'React', 'Next.js', 'Python', 'SwiftUI', 'Docker', 'LLM APIs']);

const rows = [
  ['lang', 'Languages', ['Java', 'TypeScript', 'Python', 'Swift', 'JavaScript', 'SQL', 'C++']],
  ['back', 'Backend & data stores', ['Spring Boot', 'PostgreSQL', 'Node.js', 'Express.js', 'REST APIs', 'Redis', 'MongoDB']],
  ['front', 'Frontend & mobile', ['React', 'Next.js', 'SwiftUI', 'React Router', 'Tailwind CSS']],
  ['ops', 'Infrastructure & tooling', ['Docker', 'Airflow', 'AWS', 'GCP', 'Git / GitHub', 'Vercel', 'JUnit', 'Postman']],
  ['ai·data', 'Applied AI & data', ['LLM APIs', 'RAG', 'dbt', 'Pandas', 'Matplotlib', 'Data viz']],
];

// Order of every skill key, used to stagger their pop-in.
const keyOrder = new Map(rows.flatMap(([, , skills]) => skills).map((skill, index) => [skill, index]));

export default function SkillsKeyboard() {
  const [active, setActive] = useState(null);
  const places = active ? usedIn[active] : null;

  return (
    <section id="skills" className="desk-section kb" aria-labelledby="skills-heading">
      <div className="ds-inner">
        <header className="kb-heading" data-reveal>
          <p className="ds-eyebrow">Toolkit</p>
          <h2 id="skills-heading">
            What I <i>work with</i>
            <em aria-hidden="true">.</em>
          </h2>
          <p className="kb-lede">
            <span className="kb-swatch" aria-hidden="true" /> Coloured keys are my core stack. Press any key to see where
            it shows up in my work.
          </p>
        </header>

        <div className="kb-desk">
          <div className="kb-board" data-reveal style={{ '--reveal-delay': '.1s' }} role="group" aria-label="Technical skills">
            {rows.map(([mod, label, skills]) => (
              <div className="kb-row" key={mod} role="group" aria-label={label}>
                <span className="kb-key kb-mod" aria-hidden="true">{mod}</span>
                {skills.map((skill) => (
                  <button
                    key={skill}
                    type="button"
                    style={{ '--k': keyOrder.get(skill) }}
                    className={`kb-key${core.has(skill) ? ' is-core' : ''}${active === skill ? ' is-down' : ''}`}
                    aria-pressed={active === skill}
                    aria-controls="kb-readout"
                    onClick={() => setActive(skill)}
                    onMouseEnter={() => setActive(skill)}
                    onFocus={() => setActive(skill)}
                  >
                    {skill}
                  </button>
                ))}
              </div>
            ))}
            <div className="kb-row kb-row-space" aria-hidden="true">
              <span className="kb-key kb-mod">fn</span>
              <span className="kb-key kb-space">always learning</span>
              <span className="kb-key kb-mod">⌘</span>
            </div>
          </div>

          <aside className="kb-readout" data-reveal style={{ '--reveal-delay': '.3s' }} id="kb-readout" aria-live="polite">
            {active ? (
              <>
                <p className="kb-readout-label">{places ? 'used in' : 'in my toolkit'}</p>
                <p className="kb-readout-skill">{active}</p>
                {places ? (
                  <ul>
                    {places.map((place) => (
                      <li key={place}>{place}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="kb-readout-empty">Not featured in a project on this page — happy to talk about it.</p>
                )}
              </>
            ) : (
              <>
                <p className="kb-readout-label">try it</p>
                <p className="kb-readout-hint">Hover or tap a key to see where I’ve used it ↖</p>
              </>
            )}
          </aside>
        </div>
      </div>
    </section>
  );
}
