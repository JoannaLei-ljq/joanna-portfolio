import { FaEnvelope, FaGithub, FaLinkedin } from 'react-icons/fa';
import './AboutDesk.css';
import './ContactDesk.css';

const links = [
  { label: 'joannalei0907@gmail.com', href: 'mailto:joannalei0907@gmail.com', Icon: FaEnvelope },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/jingqiao-lei/', Icon: FaLinkedin, external: true },
  { label: 'GitHub', href: 'https://github.com/JoannaLei-ljq', Icon: FaGithub, external: true },
];

export default function ContactDesk() {
  return (
    <section id="contact" className="desk-section ct" aria-labelledby="contact-heading">
      <div className="ds-inner">
        <div className="ct-postcard">
          <div className="ct-message">
            <p className="ds-eyebrow">Contact / Next chapter</p>
            <h2 id="contact-heading">
              Let’s build something <i>useful</i>
              <em aria-hidden="true">.</em>
            </h2>
            <p className="ct-subtitle">
              Have a software engineering opportunity or a project in mind? I’d love to hear from you.
            </p>
            <p className="ct-sign" aria-hidden="true">— Joanna</p>
          </div>
          <div className="ct-address">
            <div className="ct-stamp" aria-hidden="true">
              <span>✦</span>
              Seattle · WA
            </div>
            <p className="ct-to" aria-hidden="true">write to:</p>
            <ul>
              {links.map(({ label, href, Icon, external }) => (
                <li key={label}>
                  <a href={href} {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}>
                    <Icon aria-hidden="true" />
                    <span>{label}</span>
                    {external && <span className="hero-sr-only"> (opens in a new tab)</span>}
                    <span className="ct-arrow" aria-hidden="true">↗</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <p className="ct-footer">Joanna Lei · Seattle, WA · 2026</p>
      </div>
    </section>
  );
}
