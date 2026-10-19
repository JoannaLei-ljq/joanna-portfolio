import { useEffect, useRef, useState } from "react";
import lottie from "lottie-web/build/player/lottie_light";
import './App.css'
import WorkShowcase from './components/WorkShowcase.jsx';
import ProfessionalHero from './components/ProfessionalHero.jsx';
import './components/VisualIdentity.css';
import SiteNavigation from './components/SiteNavigation.jsx';
import AboutEditorial from './components/AboutEditorial.jsx';
import './components/ContactEditorial.css';
import { FaLinkedin, FaEnvelope, FaGithub } from "react-icons/fa";

function ConnectingMark() {
  const containerRef = useRef(null);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const anim = lottie.loadAnimation({
      container: node,
      renderer: "svg",
      loop: true,
      autoplay: !prefersReducedMotion,
      path: "/connecting-dots.json",
    });

    return () => anim.destroy();
  }, []);

  return (
    <div
      className="contact-mark reveal delay-2"
      ref={containerRef}
      role="presentation"
      aria-hidden="true"
    />
  );
}

const PROJECT_TABS = [
  { slug: "software-engineering", label: "Software Engineering" },
  { slug: "data-analytics", label: "Data & Analytics" },
];
const DEFAULT_PROJECT_TAB = PROJECT_TABS[0].slug;

// Reads "#projects/<slug>" from the URL. Returns the slug only if it's a
// known tab — any other hash (e.g. a plain "#projects" nav click, or
// "#about") is treated as "not a tab link" rather than forcing a reset.
function parseTabFromHash() {
  const match = window.location.hash.match(/^#projects\/(.+)$/);
  const slug = match ? match[1] : null;
  return PROJECT_TABS.some((t) => t.slug === slug) ? slug : null;
}

function App() {
  const [activeTab, setActiveTab] = useState(
    () => parseTabFromHash() || DEFAULT_PROJECT_TAB
  );
  const tabRefs = useRef([]);
  const [tabIndicator, setTabIndicator] = useState({ left: 0, width: 0 });

  const selectTab = (slug) => {
    setActiveTab(slug);
    const newHash = `#projects/${slug}`;
    if (window.location.hash !== newHash) {
      window.history.pushState(null, "", newHash);
    }
  };

  const handleTabKeyDown = (e) => {
    const currentIndex = PROJECT_TABS.findIndex((t) => t.slug === activeTab);
    let nextIndex = null;
    if (e.key === "ArrowRight") nextIndex = (currentIndex + 1) % PROJECT_TABS.length;
    else if (e.key === "ArrowLeft") nextIndex = (currentIndex - 1 + PROJECT_TABS.length) % PROJECT_TABS.length;
    else if (e.key === "Home") nextIndex = 0;
    else if (e.key === "End") nextIndex = PROJECT_TABS.length - 1;

    if (nextIndex !== null) {
      e.preventDefault();
      selectTab(PROJECT_TABS[nextIndex].slug);
      tabRefs.current[nextIndex]?.focus();
    }
  };

  // Keep tab state in sync with back/forward navigation and direct hash
  // changes (e.g. pasting a deep link, or editing the URL by hand).
  useEffect(() => {
    const syncFromHash = () => {
      const slug = parseTabFromHash();
      if (slug) setActiveTab(slug);
    };
    window.addEventListener("hashchange", syncFromHash);
    window.addEventListener("popstate", syncFromHash);
    return () => {
      window.removeEventListener("hashchange", syncFromHash);
      window.removeEventListener("popstate", syncFromHash);
    };
  }, []);

  // If the page was opened directly on a deep-linked tab, scroll straight
  // to the Projects section so the shared link lands where it promises to.
  useEffect(() => {
    if (parseTabFromHash()) {
      document.getElementById("projects")?.scrollIntoView({ block: "start" });
    }
  }, []);

  // Slide the tab underline to the active tab instead of snapping.
  useEffect(() => {
    const updateIndicator = () => {
      const activeIndex = PROJECT_TABS.findIndex((t) => t.slug === activeTab);
      const el = tabRefs.current[activeIndex];
      if (el) {
        setTabIndicator({ left: el.offsetLeft, width: el.offsetWidth });
      }
    };
    updateIndicator();
    window.addEventListener("resize", updateIndicator);
    return () => window.removeEventListener("resize", updateIndicator);
  }, [activeTab]);

  useEffect(() => {
    const revealEls = document.querySelectorAll(".reveal");

    if (!("IntersectionObserver" in window)) {
      revealEls.forEach((el) => el.classList.add("in-view"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    );

    revealEls.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="page">
      <SiteNavigation />

      <main>
      <ProfessionalHero />

      {/* Projects Section */}
      <section id="projects" className="projects">
        <WorkShowcase />
        <h2 id="all-projects" className="work-all-heading">All projects</h2>
        <p className="projects-subtitle work-all-intro">
          Browse projects based on the role you're hiring for.
        </p>

        <div
          className="project-tabs reveal delay-3"
          role="tablist"
          aria-label="Project categories"
          onKeyDown={handleTabKeyDown}
        >
          {PROJECT_TABS.map((tab, i) => (
            <button
              key={tab.slug}
              ref={(el) => (tabRefs.current[i] = el)}
              role="tab"
              id={`tab-${tab.slug}`}
              aria-selected={activeTab === tab.slug}
              aria-controls="project-panel"
              tabIndex={activeTab === tab.slug ? 0 : -1}
              className={activeTab === tab.slug ? "active" : ""}
              onClick={() => selectTab(tab.slug)}
            >
              {tab.label}
            </button>
          ))}
          <span
            className="tab-indicator"
            style={{
              transform: `translateX(${tabIndicator.left}px)`,
              width: `${tabIndicator.width}px`,
            }}
            aria-hidden="true"
          />
        </div>

        <div
          className="project-grid"
          role="tabpanel"
          id="project-panel"
          aria-labelledby={`tab-${activeTab}`}
        >
          {activeTab === "data-analytics" && (
            <>
              <div className="project-card">
                <div className="project-image"></div>

                <div className="project-content">
                  <p className="project-category is-data">Data Analytics</p>
                  <h4>Brazilian E-commerce Analytics</h4>
                  <p>
                    Uncovers where a Brazilian e-commerce business loses revenue
                    after the first purchase, pointing to retention as the real
                    growth lever.
                  </p>

                  <div className="project-tags">
                    <span>SQL</span>
                    <span>Python</span>
                    <span>Pandas</span>
                    <span>Matplotlib</span>
                  </div>

                  <a
                    className="project-link"
                    href="https://github.com/x6zeng/brazilian-ecommerce-analytics"
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
                  <p className="project-category is-data">Data Analytics</p>
                  <h4>Customer Retention & Cohort Analysis</h4>
                  <p>
                    Shows exactly when and why customers stop coming back after
                    their first purchase, so retention efforts can target the
                    moment that matters most.
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

          {activeTab === "software-engineering" && (
            <>
              <div className="project-card">
                <div className="project-image">
                  <img
                    src="/career-forge.webp"
                    alt="CareerForge screenshot"
                    width="1200"
                    height="654"
                    loading="lazy"
                  />
                </div>

                <div className="project-content">
                  <p className="project-category">Career Tool</p>
                  <h4>CareerForge</h4>
                  <p>
                    Helps job seekers walk into interviews prepared, with
                    AI-driven practice that adapts to the role they're going for.
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
                  </a>{" "}
                  <a
                    className="project-link"
                    href="https://career-forge-ochre.vercel.app/"
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
                  <p className="project-category">Backend System</p>
                  <h4>Distributed Task Queue</h4>
                  <p>
                    Processes priority-scheduled jobs across multiple workers,
                    with automatic retries and dead-letter routing.
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
                <div className="project-image">
                  <img
                    src="/foodcraft-plus.webp"
                    alt="FoodCraft Plus screenshot"
                    width="1200"
                    height="810"
                    loading="lazy"
                  />
                </div>

                <div className="project-content">
                  <p className="project-category">Consumer App</p>
                  <h4>FoodCraft Plus</h4>
                  <p>
                    Suggests recipes from whatever's already in your kitchen, so
                    deciding what to cook stops being the hardest part of
                    cooking.
                  </p>

                  <div className="project-tags">
                    <span>React</span>
                    <span>React Router</span>
                    <span>React Select</span>
                    <span>JavaScript</span>
                    <span>CSS</span>
                  </div>
                </div>
              </div>

              <div className="project-card">
                <div className="project-image"></div>

                <div className="project-content">
                  <p className="project-category">Hackathon Project</p>
                  <h4>Matchathon Web App</h4>
                  <p>
                    Connects people quickly through a fast, intuitive interface,
                    built in a weekend hackathon.
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
                <div className="project-image">
                  <img
                    src="/focus-gacha.webp"
                    alt="Focus Gacha screenshot"
                    width="1200"
                    height="654"
                    loading="lazy"
                  />
                </div>

                <div className="project-content">
                  <p className="project-category">Productivity Tool</p>
                  <h4>Focus Gacha</h4>
                  <p>
                    Turns the paralysis of choosing a task into a quick, playful
                    pull of the handle, then keeps you accountable with a
                    five-minute timer.
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
            </>
          )}
        </div>
      </section>

      <AboutEditorial />

      {/* Contact Section */}
      <section id="contact" className="contact contact-editorial" aria-labelledby="contact-heading">
        <p className="section-label">Contact / Next chapter</p>
        <div className="contact-heading-row">
          <h2 id="contact-heading">Let’s build<br />something useful.</h2>
          <ConnectingMark />
        </div>
        <p className="contact-subtitle">
          Have a software engineering opportunity or a project in mind?
          I’d love to hear from you.
        </p>

        <div className="contact-links">
          <a className="contact-link" href="mailto:joannalei0907@gmail.com">
            <span className="contact-icon">
              <FaEnvelope />
            </span>
            <span>joannalei0907@gmail.com</span>
          </a>

          <a
            className="contact-link"
            href="https://www.linkedin.com/in/jingqiao-lei/"
            target="_blank"
            rel="noreferrer"
          >
            <span className="contact-icon">
              <FaLinkedin />
            </span>
            <span>LinkedIn</span>
          </a>

          <a
            className="contact-link"
            href="https://github.com/JoannaLei-ljq"
            target="_blank"
            rel="noreferrer"
          >
            <span className="contact-icon">
              <FaGithub />
            </span>
            <span>GitHub</span>
          </a>
        </div>
      </section>
      </main>
    </div>
  )
}

export default App