import { useEffect, useRef } from 'react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import './DeskHero.css';
import { resumeUrl } from './resume.js';

// The desk is designed for roughly a 1300×800 window. On larger windows it
// scales up as one piece so it keeps filling the first screen.
const DESIGN_WIDTH = 1300;
const DESIGN_HEIGHT = 800;
const MAX_SCALE = 2.6;

export default function DeskHero() {
  const deskRef = useRef(null);

  useEffect(() => {
    const desk = deskRef.current;
    if (!desk) return;

    const fit = () => {
      const { innerWidth: w, innerHeight: h } = window;
      const scale = w <= 720 ? 1 : Math.min(MAX_SCALE, Math.max(1, Math.min(w / DESIGN_WIDTH, h / DESIGN_HEIGHT)));
      desk.style.setProperty('--desk-scale', scale.toFixed(3));
    };

    fit();
    window.addEventListener('resize', fit);
    return () => window.removeEventListener('resize', fit);
  }, []);

  return (
    <section className="desk-hero" aria-labelledby="hero-title">
      <div className="desk" ref={deskRef}>
        <div className="desk-badge" aria-hidden="true">
          <div className="desk-lanyard" />
          <div className="desk-badge-swing">
            <div className="desk-badge-clip"><span /></div>
            <div className="desk-badge-card">
              <div className="desk-badge-head">
                <span className="desk-badge-slot" />
                <span>ID · 2026</span>
              </div>
              <div className="desk-badge-body">
                <div className="desk-badge-photo">
                  <img src="/girl.webp" alt="" width="500" height="500" />
                </div>
                <p className="desk-badge-name">Joanna Lei</p>
                <p className="desk-badge-role">Software Engineer</p>
                <div className="desk-badge-foot">
                  <span>Seattle, WA</span>
                  <span className="desk-badge-bar" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="desk-folder">
          <div className="desk-tab" aria-hidden="true">portfolio_2026</div>
          <div className="desk-sheet">
            <p className="desk-eyebrow">Portfolio / 2026 — Seattle, WA</p>
            <h1 id="hero-title">
              Joanna <i>Lei</i>
              <em aria-hidden="true">.</em>
            </h1>
            <p className="desk-role">Software Engineer</p>
            <p className="desk-intro">
              I build full-stack applications, with a soft spot for applied AI and backend
              systems — and a data analyst’s habit of asking what the problem really is.
            </p>
            <div className="desk-actions">
              <a className="desk-btn desk-btn-main" href="#projects">
                Open my work <span aria-hidden="true">↘</span>
              </a>
              {resumeUrl && (
                <a className="desk-btn desk-btn-ghost" href={resumeUrl} target="_blank" rel="noreferrer">
                  Resume <span aria-hidden="true">↗</span>
                  <span className="desk-sr-only"> (PDF, opens in a new tab)</span>
                </a>
              )}
            </div>
            <div className="desk-socials" aria-label="Professional profiles">
              <a href="https://github.com/JoannaLei-ljq" target="_blank" rel="noreferrer">
                <FaGithub aria-hidden="true" /> GitHub
                <span className="desk-sr-only"> (opens in a new tab)</span>
              </a>
              <a href="https://www.linkedin.com/in/jingqiao-lei/" target="_blank" rel="noreferrer">
                <FaLinkedin aria-hidden="true" /> LinkedIn
                <span className="desk-sr-only"> (opens in a new tab)</span>
              </a>
            </div>
          </div>
        </div>

        <p className="desk-sticky desk-sticky-status">
          <small>status</small>Open to SWE roles ✦
        </p>
        <p className="desk-sticky desk-sticky-now">
          <small>currently</small>Fullstack intern @ fAIshion
        </p>
        <div className="desk-mug" aria-hidden="true" />
      </div>
    </section>
  );
}
