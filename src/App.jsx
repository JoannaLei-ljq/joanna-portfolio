import { useEffect } from 'react';
import './App.css';
import SiteNavigation from './components/SiteNavigation.jsx';
import DeskHero from './components/DeskHero.jsx';
import WorkDesk from './components/WorkDesk.jsx';
import ExperiencePlanner from './components/ExperiencePlanner.jsx';
import AboutDesk from './components/AboutDesk.jsx';
import SkillsKeyboard from './components/SkillsKeyboard.jsx';
import ContactDesk from './components/ContactDesk.jsx';

// Sections fade/slide in the first time they scroll into view. Off for
// reduced-motion users and when IntersectionObserver isn't available.
// The flag is a data attribute, not a class: React rewrites className on
// re-render (e.g. switching folders), which would hide the element again.
function useScrollReveal() {
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce || !('IntersectionObserver' in window)) return;
    const root = document.documentElement;
    root.classList.add('reveal-on');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.dataset.revealed = '';
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -8% 0px' },
    );
    const targets = [...document.querySelectorAll('[data-reveal]')];
    targets.forEach((el) => observer.observe(el));

    // Belt and braces: also reveal on scroll by position, so content can
    // never stay hidden if the observer misbehaves in some browser.
    let last = 0;
    const check = () => {
      const limit = window.innerHeight * 0.95;
      targets.forEach((el) => {
        if (!('revealed' in el.dataset) && el.getBoundingClientRect().top < limit) {
          el.dataset.revealed = '';
        }
      });
    };
    // Throttled by time rather than requestAnimationFrame, which some
    // browsers pause for background or embedded pages.
    const onScroll = () => {
      const now = Date.now();
      if (now - last > 80) { last = now; check(); }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    const settle = setTimeout(check, 1200);

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      clearTimeout(settle);
      root.classList.remove('reveal-on');
    };
  }, []);
}

function App() {
  useScrollReveal();
  return (
    <div className="page">
      <SiteNavigation />
      <main>
        <DeskHero />
        <WorkDesk />
        <ExperiencePlanner />
        <AboutDesk />
        <SkillsKeyboard />
        <ContactDesk />
      </main>
    </div>
  );
}

export default App;
