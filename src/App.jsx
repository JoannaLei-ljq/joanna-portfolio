import { useState } from "react";
import './App.css'
import { FaLinkedin, FaEnvelope } from "react-icons/fa";

function App() {
  const [activeTab, setActiveTab] = useState("analytics");
  return (
    <div className="page">
      <nav className="navbar">
        <div className="logo">Joanna</div>
        <div className="nav-links">
          <a href="#about">About</a>
          <a href="#projects">Projects</a>
          <a href="#contact">Contact</a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-left">
            <p className="welcome">Hi there, welcome to my world.</p>

            <p className="description">
              I explore how data, AI, and digital media shape user behavior.
              I’m interested in analytics, storytelling, and building thoughtful digital products.
            </p>

            <div className="icons">
              <a href="https://www.linkedin.com/in/jingqiao-lei/" target="_blank" rel="noreferrer">
                <FaLinkedin />
              </a>

              <a href="mailto:leijingq@usc.edu">
                <FaEnvelope />
              </a>
            </div>
          </div>

          <div className="hero-right">
            <div className="hero-image">
              <img src="/girl.png" alt="Joanna" />
            </div>

            <h1 className="title">Joanna</h1>

            <p className="subtitle">
              Data Analyst · Software Engineer · Digital Media
            </p>
          </div>
        </div>

        <div className="scroll">↓</div>
      </section>

      {/* About Section */}
      <section id="about" className="about">
        <p className="section-label">About</p>
        <h2>Let me introduce myself.</h2>

        <div className="about-intro">
          <div className="profile-image">
            JL
          </div>

          <p>
            I’m a Computer Science graduate with experience across data analytics,
            software development, and digital growth. I enjoy using data to understand
            user behavior, uncover patterns, and turn insights into product or growth
            decisions.
          </p>
        </div>

        <div className="about-grid">
          <div className="about-card">
            <h3>Profile</h3>
            <p>
              I’m interested in roles and projects at the intersection of analytics,
              business strategy, AI, and digital media.
            </p>

            <div className="profile-info">
              <span>Full Name</span>
              <p>Jingqiao Lei / Joanna Lei</p>

              <span>Email</span>
              <p>leijingq@usc.edu</p>
            </div>
          </div>

          <div className="about-card">
            <h3>Education</h3>

            <div className="education-list">
              <div>
                <span>2024 – 2025</span>
                <h4>University of Southern California</h4>
                <p>M.S. in Computer Science</p>
              </div>

              <div>
                <span>2020 – 2024</span>
                <h4>University of California, San Diego</h4>
                <p>B.S. in Applied Mathematics, Minor in Business Economics & Marketing</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="projects">
        <p className="section-label">Projects</p>
        <h2>Selected projects across analytics, engineering, and media.</h2>

        <div className="project-tabs">
          <button
            className={activeTab === "analytics" ? "active" : ""}
            onClick={() => setActiveTab("analytics")}
          >
            Analytics
          </button>

          <button
            className={activeTab === "engineering" ? "active" : ""}
            onClick={() => setActiveTab("engineering")}
          >
            Engineering
          </button>

          <button
            className={activeTab === "media" ? "active" : ""}
            onClick={() => setActiveTab("media")}
          >
            Media
          </button>
        </div>

        <div className="project-grid">
          {activeTab === "analytics" && (
            <>
              <div className="project-card">
                <div className="project-image"></div>

                <div className="project-content">
                  <h4>ASO Growth Analysis</h4>
                  <p>
                    Analyzed App Store keyword performance and user acquisition trends,
                    contributing to a ~20% increase in organic downloads.
                  </p>

                  <div className="project-tags">
                    <span>ASO</span>
                    <span>App Store Connect</span>
                    <span>Marketing Analytics</span>
                    <span>Data Analysis</span>
                  </div>
                </div>
              </div>

              <div className="project-card">
                <div className="project-image"></div>

                <div className="project-content">
                  <h4>Customer Retention & Cohort Analysis</h4>
                  <p>
                    Used cohort analysis on e-commerce transaction data to track how
                    customer engagement and revenue evolve after a first purchase,
                    identifying that most cohorts retain only 20–40% of customers
                    past month one.
                  </p>

                  <div className="project-tags">
                    <span>Python</span>
                    <span>Pandas</span>
                    <span>Cohort Analysis</span>
                    <span>Data Visualization</span>
                  </div>

                  <a
                    className="project-link"
                    href="https://github.com/JoannaLei-ljq/customer-retention-cohort-analysis"
                    target="_blank"
                    rel="noreferrer"
                  >
                    View Project →
                  </a>
                </div>
              </div>
            </>
          )}

          {activeTab === "engineering" && (
            <>
              <div className="project-card">
                <div className="project-image">
                  <img src="/focus-gacha.png" alt="Focus Gacha screenshot" />
                </div>

                <div className="project-content">
                  <h4>Focus Gacha</h4>
                  <p>
                    A task randomizer that turns "what should I work on?" into pulling
                    a gashapon handle. Hand-built SVG machine illustration with a
                    from-scratch 2D physics loop for the capsules, plus a 5-minute
                    commitment timer to beat decision paralysis.
                  </p>

                  <div className="project-tags">
                    <span>React</span>
                    <span>Vite</span>
                    <span>SVG / Physics</span>
                    <span>Web Audio API</span>
                  </div>

                  <a
                    className="project-link"
                    href="https://github.com/JoannaLei-ljq/focus-gacha"
                    target="_blank"
                    rel="noreferrer"
                  >
                    View Project →
                  </a>{" "}
                  <a
                    className="project-link"
                    href="https://focus-gacha.vercel.app/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Live Demo ↗
                  </a>
                </div>
              </div>

              <div className="project-card">
                <div className="project-image"></div>

                <div className="project-content">
                  <h4>Distributed Task Queue</h4>
                  <p>
                    A distributed task queue built from scratch with Java, Spring Boot,
                    and Postgres — safe concurrent job claiming via
                    `SELECT ... FOR UPDATE SKIP LOCKED`, exponential-backoff retries,
                    dead-letter routing, and a React dashboard, all Dockerized.
                  </p>

                  <div className="project-tags">
                    <span>Java</span>
                    <span>Spring Boot</span>
                    <span>PostgreSQL</span>
                    <span>Docker</span>
                  </div>

                  <a
                    className="project-link"
                    href="https://github.com/JoannaLei-ljq/distributed-task-queue"
                    target="_blank"
                    rel="noreferrer"
                  >
                    View Project →
                  </a>
                </div>
              </div>

              <div className="project-card">
                <div className="project-image"></div>

                <div className="project-content">
                  <h4>AI Interview Toolkit</h4>
                  <p>
                    An AI-powered interview prep app with resume analysis, STAR-format
                    story rewriting, predicted interview questions, and a streaming
                    multi-turn mock interviewer with voice input.
                  </p>

                  <div className="project-tags">
                    <span>Next.js</span>
                    <span>TypeScript</span>
                    <span>Vercel AI SDK</span>
                    <span>Tailwind CSS</span>
                  </div>

                  <a
                    className="project-link"
                    href="https://github.com/JoannaLei-ljq/career-forge"
                    target="_blank"
                    rel="noreferrer"
                  >
                    View Project →
                  </a>
                </div>
              </div>

              <div className="project-card">
                <div className="project-image"></div>

                <div className="project-content">
                  <h4>Matchathon Web App</h4>
                  <p>
                    Developed a full-stack web application during a hackathon, focusing
                    on user experience and interactive features. Awarded “Newbie Winner”.
                  </p>

                  <div className="project-tags">
                    <span>Next.js</span>
                    <span>React</span>
                    <span>UI/UX</span>
                    <span>Rapid Prototyping</span>
                  </div>
                </div>
              </div>

              <div className="project-card">
                <div className="project-image"></div>

                <div className="project-content">
                  <h4>Weather Search App</h4>
                  <p>
                    Built a weather application with API integration and cloud-based
                    data handling, enabling real-time search and user-friendly visualization.
                  </p>

                  <div className="project-tags">
                    <span>React</span>
                    <span>API Integration</span>
                    <span>Node.js</span>
                    <span>Cloud</span>
                  </div>
                </div>
              </div>
            </>
          )}

          {activeTab === "media" && (
            <>
              <div className="project-card">
                <div className="project-image"></div>

                <div className="project-content">
                  <h4>Storytelling Video Project</h4>
                  <p>
                    Edited narrative-driven video content exploring themes of personal
                    growth and emotional storytelling for digital audiences.
                  </p>

                  <div className="project-tags">
                    <span>Video Editing</span>
                    <span>Storytelling</span>
                    <span>Content Strategy</span>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </section>

  

      {/* Contact Section */}
      <section id="contact" className="contact">
        <p className="section-label">Contact</p>
        <h2>Let’s connect.</h2>

        <div className="contact-links">
          <a href="mailto:leijingq@usc.edu">Email</a>
          <a href="https://www.linkedin.com/in/jingqiao-lei/" target="_blank" rel="noreferrer">
            LinkedIn
          </a>
        </div>
      </section>
    </div>
  )
}

export default App