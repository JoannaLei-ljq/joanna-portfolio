import './AboutDesk.css';
import './AboutBoard.css';

const terminal = [
  ['whoami', ['Joanna Lei · software engineer · Seattle, WA']],
  ['path --history', ['applied math → data analytics → computer science → full-stack']],
  ['now', ['fullstack intern @ fAIshion', 'software engineer intern @ ReigniteLIFE']],
  ['looking-for', ['SWE roles · full-stack · backend · applied AI']],
];
// TODO(Joanna): one real line about life outside code (a hobby, Juno…) could go in the terminal as `$ off-hours`.

// The tail of the last terminal line types out letter by letter.
const TYPED_TAIL = 'ied AI';

function TypedLine({ text }) {
  const head = text.slice(0, -TYPED_TAIL.length);
  return (
    <>
      <span aria-hidden="true">
        {head}
        <span className="ab-typed" style={{ '--chars': `${TYPED_TAIL.length}ch`, '--chars-n': TYPED_TAIL.length }}>
          {TYPED_TAIL}
        </span>
      </span>
      <span className="hero-sr-only">{text}</span>
    </>
  );
}

const education = [
  {
    folder: 'usc/',
    school: 'University of Southern California',
    degree: 'M.S. Computer Science',
    date: '2023 – 2025',
  },
  {
    folder: 'ucsd/',
    school: 'University of California, San Diego',
    degree: 'B.S. Applied Mathematics · Minors in Business Economics and Marketing',
    date: '2019 – 2023',
  },
];

export default function AboutDesk() {
  return (
      <section id="about" className="desk-section ab" aria-labelledby="about-heading">
        <div className="ds-inner ab-desktop">
          <article className="ab-win ab-main" data-reveal="window">
            <div className="ab-bar" aria-hidden="true"><span className="ab-dots"><i /><i /><i /></span>about_me.md</div>
            <div className="ab-main-body">
              <div className="ab-avatar">
                <img src="/joanna-about-sport-portrait.jpg" alt="Joanna smiling in a light blue sweatshirt with white sleeve stripes" width="400" height="400" loading="lazy" />
              </div>
              <div>
                <p className="ds-eyebrow">About / Joanna Lei</p>
                <h2 id="about-heading">
                  A little more <i>about me</i>
                  <em aria-hidden="true">.</em>
                </h2>
                <p className="ab-lead">
                  My route to software engineering ran through applied mathematics, business, and data analytics,
                  and that mix still shapes how I work.
                </p>
                <p>
                  I like to understand why a problem matters before deciding how to solve it, look at it from more
                  than one angle, and build the simplest thing that actually helps.
                </p>
              </div>
            </div>
          </article>

          <div className="ab-win ab-term" data-reveal="window" style={{ '--reveal-delay': '.18s' }} role="group" aria-label="Quick facts">
            <div className="ab-bar" aria-hidden="true"><span className="ab-dots"><i /><i /><i /></span>~/joanna — zsh</div>
            <dl className="ab-term-body">
              {terminal.map(([cmd, lines], index) => (
                <div key={cmd} style={{ '--line': index }}>
                  <dt><span aria-hidden="true">$ </span>{cmd}</dt>
                  {lines.map((line) => (
                    <dd key={line}>
                      <span aria-hidden="true">→ </span>
                      {line.endsWith(TYPED_TAIL) ? <TypedLine text={line} /> : line}
                    </dd>
                  ))}
                </div>
              ))}
            </dl>
          </div>

          <div className="ab-win ab-edu" data-reveal="window" style={{ '--reveal-delay': '.32s' }}>
            <div className="ab-bar" aria-hidden="true"><span className="ab-dots"><i /><i /><i /></span>education/</div>
            <h3 className="ab-sr">Education</h3>
            <table className="ab-files">
              <thead>
                <tr><th scope="col">Name</th><th scope="col">Degree</th><th scope="col">Years</th></tr>
              </thead>
              <tbody>
                {education.map((item) => (
                  <tr key={item.folder}>
                    <th scope="row">
                      <span className="ab-folder" aria-hidden="true" />
                      <span className="ab-file-name">{item.folder}</span>
                      <span className="ab-file-school">{item.school}</span>
                    </th>
                    <td>{item.degree}</td>
                    <td className="ab-file-date">{item.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
  );
}
