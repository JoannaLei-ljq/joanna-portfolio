import './AboutEditorial.css';

const skillGroups = [
  ['Languages', ['Java', 'Python', 'TypeScript', 'JavaScript', 'SQL', 'C++']],
  ['Backend & databases', ['Spring Boot', 'Node.js', 'Express.js', 'REST APIs', 'PostgreSQL', 'Redis', 'MongoDB']],
  ['Frontend', ['React', 'Next.js', 'React Router', 'Tailwind CSS']],
  ['Infrastructure & tooling', ['Docker', 'AWS', 'GCP', 'Git / GitHub', 'Vite', 'Vercel', 'JUnit', 'Postman']],
  ['Applied AI', ['RAG', 'LLM API Integration']],
  ['Data foundations', ['Pandas', 'Matplotlib', 'Cohort Analysis', 'Data Visualization']],
];

export default function AboutEditorial() {
  return (
    <>
      <section id="about" className="about about-editorial" aria-labelledby="about-heading">
        <div className="about-editorial-inner">
          <header className="about-editorial-heading">
            <p className="section-label">About / Joanna Lei</p>
            <h2 id="about-heading">A little more<br />about me<span>.</span></h2>
          </header>
          <div className="about-editorial-profile">
            <div className="about-editorial-copy">
              <p className="about-editorial-lead">I’m Joanna, a Computer Science graduate in Seattle focused on software engineering.</p>
              <p>I’m drawn to the decisions behind the code: understanding what people need, making a workflow clearer, and choosing an approach that fits the problem.</p>
              <p>My background in mathematics, business, and data analytics helps me look beyond the implementation: understand the problem, question assumptions, and consider the people using the product.</p>
            </div>
            <figure className="about-portrait-placeholder" aria-hidden="true">
              <div className="about-portrait-space" aria-hidden="true"><span>JL<span className="about-portrait-dot">.</span></span></div>
              <figcaption hidden>Personal portrait or illustration — reserved for a future asset.</figcaption>
            </figure>
          </div>
          <section className="about-editorial-row about-experience" id="experience" aria-labelledby="experience-heading">
            <div className="about-row-label"><span>01 / Background</span><h3 id="experience-heading">Experience</h3></div>
            <ol className="about-experience-timeline" aria-label="Professional experience">
              <li>
                <p className="about-timeline-date">Aug 2026 – Present</p>
                <div className="about-timeline-entry">
                  <h4>Fullstack Developer Intern</h4>
                  <p className="about-timeline-employer">fAIshion Inc.</p>
                  <p>Developing B2B styling tools and full-stack workflows, including catalog imports, collection reviews, and Shopify integrations.</p>
                </div>
              </li>
              <li>
                <p className="about-timeline-date">Apr 2026 – Present</p>
                <div className="about-timeline-entry">
                  <h4>Software Engineer · Volunteer</h4>
                  <p className="about-timeline-employer">Reignite Life / Karyio</p>
                  <p>Building an AI-powered caregiving app, with a focus on conversational AI, SwiftUI integration, and voice-assisted care logging.</p>
                </div>
              </li>
              <li>
                <p className="about-timeline-date">May 2024 – Aug 2024</p>
                <div className="about-timeline-entry">
                  <h4>Data Analyst Intern</h4>
                  <p className="about-timeline-employer">Illuminera</p>
                  <p>Automated data processing and built SQL-driven analytics and dashboards to support product decisions.</p>
                </div>
              </li>
            </ol>
          </section>
          <section className="about-editorial-row about-education" aria-labelledby="education-heading">
            <div className="about-row-label"><span>02 / Foundations</span><h3 id="education-heading">Education</h3></div>
            <div className="about-education-records">
              <article><p className="about-record-date">2023 – 2025</p><h4>University of Southern California</h4><p>M.S. in Computer Science</p></article>
              <article><p className="about-record-date">2019 – 2023</p><h4>University of California, San Diego</h4><p>B.S. in Applied Mathematics, Minor in Business Economics &amp; Marketing</p></article>
            </div>
          </section>
        </div>
      </section>
      <section id="skills" className="skills skills-editorial" aria-labelledby="skills-heading">
        <div className="about-editorial-inner">
          <div className="about-editorial-row skills-editorial-row">
            <div className="about-row-label"><span>03 / Toolkit</span><h2 id="skills-heading">Technical Skills</h2><p>Backend and full-stack tools, supported by applied AI and data experience.</p></div>
            <dl className="skills-index">
              {skillGroups.map(([label, skills], index) => (
                <div className="skills-index-row" key={label}>
                  <dt><span className="skills-index-number" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span><span>{label}</span></dt>
                  <dd><ul>{skills.map((skill) => <li key={skill}>{skill}</li>)}</ul></dd>
                </div>
              ))}
            </dl>
          </div>
          <aside hidden className="about-beyond" aria-labelledby="beyond-heading">
            <div><p className="section-label">A different kind of building</p><h3 id="beyond-heading">Beyond the Code</h3></div>
            <div><p>There’s room for playful ideas, too. Focus Gacha explores a different way to choose a task, with a five-minute timer.</p><a href="https://focus-gacha.vercel.app/" target="_blank" rel="noreferrer">Explore Focus Gacha <span aria-hidden="true">↗</span><span className="hero-sr-only"> (opens in a new tab)</span></a><p className="about-personal-placeholder">Personal interests — details to be added.</p></div>
          </aside>
        </div>
      </section>
    </>
  );
}
