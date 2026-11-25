import { useEffect, useRef } from 'react';
import { FaEnvelope, FaGithub, FaLinkedin } from 'react-icons/fa';
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
          <div className="desk-badge-swing">
            <div className="desk-lanyard" />
            <svg className="desk-clasp" viewBox="0 0 40 64" focusable="false">
              <rect x="9" y="2" width="22" height="10" rx="3" />
              <rect x="17" y="11" width="6" height="8" rx="2" />
              <path d="M20 19c-8 0-12 6-12 13v8c0 9 5 15 12 15s12-6 12-15v-8c0-7-4-13-12-13z" />
              <path className="desk-clasp-gate" d="M26 30v10" />
              <circle cx="20" cy="58" r="5" />
            </svg>
            <div className="desk-badge-card">
              <div className="desk-badge-head">
                <span className="desk-badge-slot" />
                <span>ID</span>
                <span>SWE · 2026</span>
              </div>
              <div className="desk-badge-body">
                <div className="desk-badge-photo">
                  <img src="/joanna-badge-professional-ivory.jpg" alt="" width="400" height="400" />
                </div>
                <p className="desk-badge-name">Joanna Lei</p>
                <p className="desk-badge-role">Software Engineer</p>
                <div className="desk-badge-foot">
                  <span>USC ’25</span>
                  <span className="desk-badge-bar" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="desk-folder">
          <div className="desk-tab" aria-hidden="true">~/joanna</div>
          <div className="desk-sheet">
            <p className="desk-eyebrow">M.S. Computer Science, USC · Seattle, WA</p>
            <h1 id="hero-title">
              Joanna <i>Lei</i>
              <em aria-hidden="true">.</em>
            </h1>
            <p className="desk-role">Applied AI &amp; Full-Stack</p>
            <p className="desk-intro">
              I build full-stack applications and backend systems, with a focus on applied AI. I
              enjoy designing reliable workflows and turning complex ideas into practical software
              that people can actually use.
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
            <div className="desk-socials" aria-label="Contact and profiles">
              <a href="mailto:joannalei0907@gmail.com">
                <FaEnvelope aria-hidden="true" /> joannalei0907@gmail.com
              </a>
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
          <small>status</small>Open to SDE roles ✦
        </p>
        <p className="desk-sticky desk-sticky-now">
          <small>currently</small>Fullstack intern @ fAIshion
        </p>
        {/* Top-down latte on a saucer. */}
        <svg className="desk-mug" viewBox="0 0 140 120" aria-hidden="true" focusable="false">
          <ellipse cx="64" cy="66" rx="54" ry="50" className="desk-mug-saucer" />
          <path d="M104 52c14-2 24 6 24 16s-10 18-24 16" className="desk-mug-handle" />
          <circle cx="64" cy="62" r="40" className="desk-mug-rim" />
          <circle cx="64" cy="62" r="32" className="desk-mug-coffee" />
          <circle cx="64" cy="62" r="25" className="desk-mug-crema" />
          <path d="M64 76c-9-6-14-11-14-17 0-4 3-7 7-7 3 0 5 2 7 4 2-2 4-4 7-4 4 0 7 3 7 7 0 6-5 11-14 17z" className="desk-mug-art" />
          <path d="M40 44a32 32 0 0 1 18-12" className="desk-mug-shine" />
          <g className="desk-mug-steam">
            <path d="M52 30c-6-8 6-12 0-20s6-12 0-18" />
            <path d="M70 26c-6-8 6-12 0-20s6-12 0-18" />
          </g>
        </svg>
      </div>
    </section>
  );
}
