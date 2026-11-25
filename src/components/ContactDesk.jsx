import { useRef, useState } from 'react';
import { FaGithub, FaLinkedin, FaRegCopy } from 'react-icons/fa';
import './AboutDesk.css';
import './ContactDesk.css';

const EMAIL = 'joannalei0907@gmail.com';
const LINKEDIN = 'https://www.linkedin.com/in/jingqiao-lei/';
const GITHUB = 'https://github.com/JoannaLei-ljq';

// The closing section mirrors the hero: a paper sheet on the desk, and a
// business card tucked at its left edge where the ID badge sits up top.
// Email lives only on the card; the sheet carries LinkedIn, GitHub and a note.
export default function ContactDesk() {
  const [copied, setCopied] = useState(false);
  const [note, setNote] = useState('');
  const timer = useRef(null);

  // Copy rather than rely on mailto: many visitors have no default mail app.
  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 2400);
    } catch {
      window.location.href = `mailto:${EMAIL}`;
    }
  };

  // No backend yet: the note opens the visitor's mail app, pre-filled.
  const sendNote = (event) => {
    event.preventDefault();
    const body = note.trim();
    if (!body) return;
    const subject = 'Hello from your portfolio';
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <section id="contact" className="desk-section ct" aria-labelledby="contact-heading">
      <div className="ds-inner">
        <div className="ct-desk">
          <div className="ct-stack">
            <div className="ct-card">
              <span className="ct-card-mark" aria-hidden="true">JL</span>
              <p className="ct-card-name">Joanna Lei</p>
              <p className="ct-card-role">Applied AI &amp; Full-Stack</p>
              <div className="ct-card-foot">
                <button type="button" className="ct-card-email" onClick={copyEmail}>
                  <span>{EMAIL}</span>
                  <FaRegCopy aria-hidden="true" />
                  <span className="hero-sr-only"> (copy email address)</span>
                </button>
                <span className="ct-card-city">Seattle, WA</span>
              </div>
              <span className={`ct-copied${copied ? ' is-on' : ''}`} aria-hidden="true">copied ✓</span>
              <span className="hero-sr-only" aria-live="polite">{copied ? 'Email address copied' : ''}</span>
            </div>
          </div>

          <div className="ct-sheet">
            <span className="ct-tab" aria-hidden="true">~/say_hi</span>
            <p className="ds-eyebrow">Before you leave my desk</p>
            <h2 id="contact-heading">
              Let’s ship something <i>useful</i>
              <em aria-hidden="true">.</em>
            </h2>

            <div className="ct-actions">
              <a className="ct-btn ct-btn-main" href={LINKEDIN} target="_blank" rel="noreferrer">
                <FaLinkedin aria-hidden="true" /> Connect with me
                <span className="hero-sr-only"> on LinkedIn (opens in a new tab)</span>
              </a>
              <a className="ct-icon-btn" href={GITHUB} target="_blank" rel="noreferrer" aria-label="GitHub (opens in a new tab)">
                <FaGithub aria-hidden="true" />
              </a>
            </div>

            <form className="ct-note" onSubmit={sendNote}>
              <label htmlFor="ct-note-text">Quick note</label>
              <div className="ct-note-row">
                <textarea
                  id="ct-note-text"
                  rows="2"
                  value={note}
                  onChange={(event) => setNote(event.target.value)}
                  placeholder="Leave a note on my desk…"
                />
                <button type="submit" className="ct-btn" disabled={!note.trim()}>
                  Send <span aria-hidden="true">→</span>
                </button>
              </div>
            </form>
          </div>
        </div>

        <p className="ct-footer">Designed &amp; coded in Seattle · 2026</p>
      </div>
    </section>
  );
}
