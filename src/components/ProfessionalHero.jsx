import { FaGithub, FaLinkedin } from 'react-icons/fa';
import './ProfessionalHero.css';
import { resumeUrl } from './resume.js';

export default function ProfessionalHero() {
  return (
    <section className="professional-hero" aria-labelledby="hero-title">
      <div className="professional-hero-inner">
        <div className="professional-hero-main">
          <p className="professional-hero-eyebrow">Seattle, WA / Open to SWE roles</p>
          <h1 id="hero-title">Joanna <span className="hero-name-last">Lei<span className="hero-name-period" aria-hidden="true">.</span></span></h1>
          <p className="professional-hero-role">Software Engineer</p>
          <p className="professional-hero-intro">I build full-stack applications, with interests in applied AI and backend engineering. My experience in data analytics brings a business-oriented perspective to the problems I work on.</p>
          <div className="professional-hero-actions">
            <a className="professional-hero-work" href="#projects">View My Work <span aria-hidden="true">↘</span></a>
            {resumeUrl ? <a href={resumeUrl} target="_blank" rel="noreferrer">Resume <span aria-hidden="true">↗</span><span className="hero-sr-only"> (PDF, opens in a new tab)</span></a> : <button type="button" disabled aria-describedby="hero-resume-note">Resume <span aria-hidden="true">↓</span></button>}
          </div>
          {!resumeUrl && <p className="professional-hero-resume-note" id="hero-resume-note">Resume download is not available yet.</p>}
          <div className="professional-hero-socials" aria-label="Professional profiles">
            <a href="https://github.com/JoannaLei-ljq" target="_blank" rel="noreferrer"><FaGithub aria-hidden="true" /> GitHub <span className="hero-sr-only">(opens in a new tab)</span><span aria-hidden="true">↗</span></a>
            <a href="https://www.linkedin.com/in/jingqiao-lei/" target="_blank" rel="noreferrer"><FaLinkedin aria-hidden="true" /> LinkedIn <span className="hero-sr-only">(opens in a new tab)</span><span aria-hidden="true">↗</span></a>
          </div>
        </div>
        <aside className="professional-hero-aside" aria-label="Areas of focus">
          <img src="/girl.webp" alt="Illustration of Joanna working at a laptop" width="500" height="500" />
          <p className="professional-hero-aside-label">Where I focus</p>
          <ol>
            <li><span>01</span>Full-stack development</li>
            <li><span>02</span>Applied AI</li>
            <li><span>03</span>Backend engineering</li>
          </ol>
        </aside>
        <div className="professional-hero-footer"><span>From ideas to useful products.</span><a href="#projects">Explore selected work <span aria-hidden="true">↓</span></a></div>
      </div>
    </section>
  );
}
