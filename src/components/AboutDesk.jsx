import './AboutDesk.css';
import './AboutBoard.css';

const terminal = [
  ['whoami', ['Joanna Lei · software engineer · Seattle, WA']],
  ['path --history', ['applied math → data analytics → computer science → full-stack']],
  ['now', ['fullstack intern @ fAIshion', 'volunteer engineer @ Karyio']],
  ['looking-for', ['SWE roles · full-stack · backend · applied AI']],
];
// TODO(Joanna): one real line about life outside code (a hobby, Juno…) could go in the terminal as `$ off-hours`.

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
          <article className="ab-win ab-main">
            <div className="ab-bar" aria-hidden="true"><span className="ab-dots"><i /><i /><i /></span>about_me.md</div>
            <div className="ab-main-body">
              <div className="ab-avatar">
                <img src="/girl.webp" alt="Illustration of Joanna working at a laptop" width="500" height="500" loading="lazy" />
              </div>
              <div>
                <p className="ds-eyebrow">About / Joanna Lei</p>
                <h2 id="about-heading">
                  A little more <i>about me</i>
                  <em aria-hidden="true">.</em>
                </h2>
                <p className="ab-lead">
                  I’m a software engineer in Seattle who builds full-stack products — often with an AI piece in them.
                </p>
                <p>
                  My path ran through applied math and data analytics before software, so I start with the problem and
                  the numbers, then choose the simplest approach that fits the people using it.
                </p>
              </div>
            </div>
          </article>

          <div className="ab-win ab-term" role="group" aria-label="Quick facts">
            <div className="ab-bar" aria-hidden="true"><span className="ab-dots"><i /><i /><i /></span>~/joanna — zsh</div>
            <dl className="ab-term-body">
              {terminal.map(([cmd, lines]) => (
                <div key={cmd}>
                  <dt><span aria-hidden="true">$ </span>{cmd}</dt>
                  {lines.map((line) => (
                    <dd key={line}><span aria-hidden="true">→ </span>{line}</dd>
                  ))}
                </div>
              ))}
            </dl>
          </div>

          <div className="ab-win ab-edu">
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
