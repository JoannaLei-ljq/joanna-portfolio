import { useState } from 'react';
import './AboutDesk.css';
import './SkillsKeyboard.css';

// Where each skill shows up on this site. Only list places the site itself backs up.
const usedIn = {
  Java: ['Distributed Task Queue'],
  Python: ['Brazilian E-commerce Analytics', 'Customer Retention & Cohort Analysis'],
  TypeScript: ['CareerForge'],
  JavaScript: ['FoodCraft Plus'],
  SQL: ['Brazilian E-commerce Analytics', 'Data Analyst Intern @ Illuminera'],
  'Spring Boot': ['Distributed Task Queue'],
  PostgreSQL: ['Distributed Task Queue'],
  React: ['Focus Gacha', 'Task Queue dashboard', 'FoodCraft Plus', 'Matchathon'],
  'Next.js': ['CareerForge', 'Matchathon'],
  'React Router': ['FoodCraft Plus'],
  'Tailwind CSS': ['CareerForge'],
  Docker: ['Distributed Task Queue (API + 3 workers + Postgres)'],
  Vite: ['Focus Gacha'],
  Vercel: ['CareerForge', 'Focus Gacha'],
  'LLM APIs': ['CareerForge (Vercel AI SDK + OpenRouter)', 'Karyio — conversational AI'],
  Pandas: ['Brazilian E-commerce Analytics', 'Customer Retention & Cohort Analysis'],
  Matplotlib: ['Brazilian E-commerce Analytics'],
  'Cohort analysis': ['Customer Retention & Cohort Analysis'],
  'Data viz': ['Customer Retention & Cohort Analysis', 'Dashboards @ Illuminera'],
};

// Core keys are the stack I'd most like to be hired for; they get colour.
const core = new Set(['Java', 'Spring Boot', 'PostgreSQL', 'TypeScript', 'React', 'Next.js', 'Python', 'Docker', 'LLM APIs']);

const rows = [
  ['lang', 'Languages', ['Java', 'TypeScript', 'Python', 'JavaScript', 'SQL', 'C++']],
  ['back', 'Backend & data stores', ['Spring Boot', 'PostgreSQL', 'Node.js', 'Express.js', 'REST APIs', 'Redis', 'MongoDB']],
  ['front', 'Frontend', ['React', 'Next.js', 'React Router', 'Tailwind CSS']],
  ['ops', 'Infrastructure & tooling', ['Docker', 'AWS', 'GCP', 'Git / GitHub', 'Vercel', 'Vite', 'JUnit', 'Postman']],
  ['ai·data', 'Applied AI & data', ['LLM APIs', 'RAG', 'Pandas', 'Matplotlib', 'Cohort analysis', 'Data viz']],
];

export default function SkillsKeyboard() {
  const [active, setActive] = useState(null);
  const places = active ? usedIn[active] : null;

  return (
    <section id="skills" className="desk-section kb" aria-labelledby="skills-heading">
      <div className="ds-inner">
        <header className="kb-heading">
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
          <div className="kb-board" role="group" aria-label="Technical skills">
            {rows.map(([mod, label, skills]) => (
              <div className="kb-row" key={mod} role="group" aria-label={label}>
                <span className="kb-key kb-mod" aria-hidden="true">{mod}</span>
                {skills.map((skill) => (
                  <button
                    key={skill}
                    type="button"
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

          <aside className="kb-readout" id="kb-readout" aria-live="polite">
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
