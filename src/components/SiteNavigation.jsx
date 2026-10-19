import { useEffect, useRef, useState } from 'react';
import './SiteNavigation.css';
import { resumeUrl } from './resume.js';

const links = [{ id: 'projects', label: 'Work' }, { id: 'about', label: 'About' }, { id: 'contact', label: 'Contact' }];

export default function SiteNavigation() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const toggle = useRef(null);
  const header = useRef(null);

  useEffect(() => {
    let frame;
    const update = () => {
      const threshold = Math.max(100, window.innerHeight * .28);
      let current = '';
      for (const id of ['projects', 'about', 'skills', 'contact']) {
        const section = document.getElementById(id);
        if (section && section.getBoundingClientRect().top <= threshold) current = id === 'skills' ? 'about' : id;
      }
      if (window.scrollY > 100 && window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 4) current = 'contact';
      setActive(current);
      setScrolled(window.scrollY > 24);
    };
    const schedule = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const closeOutside = (event) => {
      if (!header.current?.contains(event.target)) setOpen(false);
    };
    const desktop = window.matchMedia('(min-width: 851px)');
    const closeDesktop = () => setOpen(false);
    document.addEventListener('pointerdown', closeOutside);
    desktop.addEventListener('change', closeDesktop);
    return () => {
      document.removeEventListener('pointerdown', closeOutside);
      desktop.removeEventListener('change', closeDesktop);
    };
  }, [open]);

  const navigate = (event, id) => {
    // Preserve ordinary anchors, modified clicks, and browser hash history.
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    setOpen(false);
    const target = document.getElementById(id);
    if (target) {
      if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1');
      target.focus({ preventScroll: true });
    }
  };

  return (
    <header className={`site-header${scrolled ? ' is-scrolled' : ''}`} ref={header}
      onKeyDown={(event) => {
        if (event.key === 'Escape' && open) {
          event.preventDefault();
          setOpen(false);
          toggle.current?.focus();
        }
      }}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false);
      }}>
      <a className="site-brand" href="#hero-title" aria-label="Joanna Lei, home" onClick={(e) => navigate(e, 'hero-title')}>joanna<span>.</span></a>
      <button ref={toggle} className="site-menu-toggle" type="button" aria-expanded={open} aria-controls="site-nav-links" onClick={() => setOpen(!open)}>{open ? 'Close' : 'Menu'} <span aria-hidden="true">{open ? '−' : '+'}</span></button>
      <nav id="site-nav-links" className={`site-nav${open ? ' is-open' : ''}`} aria-label="Primary">
        {links.slice(0, 2).map(({ id, label }) => <a key={id} href={`#${id}`} aria-current={active === id ? 'location' : undefined} onClick={(e) => navigate(e, id)}>{label}</a>)}
        {resumeUrl ? <a href={resumeUrl} target="_blank" rel="noreferrer">Resume<span className="hero-sr-only"> (PDF, opens in a new tab)</span></a> : <span className="site-resume" aria-disabled="true">Resume <span className="site-resume-note">Unavailable</span></span>}
        <a href="#contact" aria-current={active === 'contact' ? 'location' : undefined} onClick={(e) => navigate(e, 'contact')}>Contact</a>
      </nav>
    </header>
  );
}
