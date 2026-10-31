"use client";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import DemoBookingModal from "./DemoBookingModal";
const HeroScene = dynamic(() => import("./HeroScene"), { ssr: false });
const CONTACT_EMAIL = "varshit@factoryresolve.com";
const BRAND_NAME = "Factory Resolve";
const NAV_ITEMS = [
  { label: "About", id: "about" },
  { label: "Approach", id: "approach" },
  { label: "Founder", id: "founder" },
];
const FEATURE_TABS = [
  {
    id: "capture",
    label: "Capture",
    kicker: "01 / Capture the signal",
    title: "The right context, from the start.",
    copy: `Work begins on the plant floor. ${BRAND_NAME} gives the first signal a clear home, so the next team gets the detail they need to act.`,
    tags: ["Issue", "Asset", "Context"],
  },
  {
    id: "coordinate",
    label: "Coordinate",
    kicker: "02 / Move the work",
    title: "Every handoff has an owner.",
    copy: "Make the next action obvious. Teams can see where work stands, what is needed, and who carries it forward.",
    tags: ["Team", "Priority", "Owner"],
  },
  {
    id: "learn",
    label: "Learn",
    kicker: "03 / Keep the history",
    title: "Resolution becomes operating memory.",
    copy: "The work does not disappear when the issue closes. A clear history helps the plant spot patterns and make the next shift better.",
    tags: ["Evidence", "Resolution", "Insight"],
  },
];
function Icon({ name, size = 18 }) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": "true",
  };
  const icons = {
    arrow: (
      <>
        <path d="M5 12h14" />
        <path d="m13 6 6 6-6 6" />
      </>
    ),
    arrowUp: (
      <>
        <path d="M5 19 19 5" />
        <path d="M8 5h11v11" />
      </>
    ),
    menu: (
      <>
        <path d="M4 7h16M4 12h16M4 17h16" />
      </>
    ),
    x: (
      <>
        <path d="m6 6 12 12M18 6 6 18" />
      </>
    ),
    lock: (
      <>
        <rect x="5" y="10" width="14" height="10" rx="2" />
        <path d="M8 10V7a4 4 0 0 1 8 0v3" />
      </>
    ),
    plus: (
      <>
        <path d="M12 5v14M5 12h14" />
      </>
    ),
    check: <path d="m5 12 4 4L19 6" />,
  };
  return <svg {...common}>{icons[name] || icons.arrow}</svg>;
}
function Logo({ light = false }) {
  return (
    <a
      className={`logo ${light ? "logo-light" : ""}`}
      href="#top"
      aria-label={`${BRAND_NAME} home`}
    >
      <span className="logo-mark" aria-hidden="true">
        <svg viewBox="0 0 32 32" focusable="false">
          <rect
            className="logo-mark-shell"
            x="1.75"
            y="1.75"
            width="28.5"
            height="28.5"
            rx="8"
          ></rect>
          <path
            className="logo-mark-factory"
            d="M7.5 23V13l4.8 3v-5l4.8 3v-5l7.4 4v10"
          ></path>
          <path className="logo-mark-resolve" d="m9 22.5 3.2 3.2 9.8-10"></path>
          <circle className="logo-mark-dot" cx="7.5" cy="23" r="1.7"></circle>
        </svg>
      </span>
      <span>{BRAND_NAME}</span>
    </a>
  );
}
function ContactModal({ onClose }) {
  const [submitted, setSubmitted] = useState(false);
  function handleSubmit(event) {
    event.preventDefault();
    setSubmitted(true);
  }
  return (
    <div
      className="contact-overlay"
      role="presentation"
      onMouseDown={(event) => event.target === event.currentTarget && onClose()}
    >
      <section
        className="contact-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="contact-title"
      >
        <div className="modal-head">
          <div>
            <p className="eyebrow">
              <span></span> Work with {BRAND_NAME}
            </p>
            <h2 id="contact-title">Start a conversation.</h2>
          </div>
          <button
            className="modal-close"
            type="button"
            aria-label="Close contact form"
            onClick={onClose}
          >
            <Icon name="x" size={19} />
          </button>
        </div>
        {submitted ? (
          <div className="success-state">
            <span className="success-mark">
              <Icon name="check" size={20} />
            </span>
            <h3>Thanks for reaching out.</h3>
            <p>
              Your note is ready for the {BRAND_NAME} team. We’ll follow up with
              the next step.
            </p>
            <button
              className="button button-lime"
              type="button"
              onClick={onClose}
            >
              Done
            </button>
          </div>
        ) : (
          <form className="contact-form" onSubmit={handleSubmit}>
            <label>
              Name
              <input name="name" placeholder="Your name" required />
            </label>
            <label>
              Work email
              <input
                name="email"
                type="email"
                placeholder="you@company.com"
                required
              />
            </label>
            <label>
              Company
              <input name="company" placeholder="Your company" required />
            </label>
            <label>
              What are you working on?
              <textarea
                name="message"
                rows="4"
                placeholder="Tell us a little about your plant or workflow"
                required
              ></textarea>
            </label>
            <button className="button button-lime" type="submit">
              Send to {BRAND_NAME} <Icon name="arrowUp" size={14} />
            </button>
          </form>
        )}
      </section>
    </div>
  );
}
export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [demoOpen, setDemoOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("about");
  const [activeFeature, setActiveFeature] = useState("capture");
  const selectedFeature = FEATURE_TABS.find(
    (feature) => feature.id === activeFeature,
  );
  useEffect(() => {
    if (window.location.hash) {
      window.history.replaceState(
        null,
        "",
        `${window.location.pathname}${window.location.search}`,
      );
    }
    const sections = Array.from(document.querySelectorAll("[data-section]"));
    const observer = new IntersectionObserver(
      (entries) => {
        const current = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) => a.boundingClientRect.top - b.boundingClientRect.top,
          )[0];
        if (current)
          setActiveSection(current.target.getAttribute("data-section"));
      },
      { rootMargin: "-36% 0px -54% 0px", threshold: [0, 0.12] },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    if (!contactOpen) return undefined;
    const handleKeyDown = (event) => {
      if (event.key === "Escape") setContactOpen(false);
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [contactOpen]);
  function openContact() {
    setContactOpen(true);
    setMenuOpen(false);
  }
  function openDemo() {
    setDemoOpen(true);
    setMenuOpen(false);
  }
  function handleInternalNavigation(event) {
    const clickedElement = event.target;
    const link =
      clickedElement instanceof Element
        ? clickedElement.closest('a[href^="#"]')
        : null;
    const targetId = link?.getAttribute("href")?.slice(1);
    const target = targetId ? document.getElementById(targetId) : null;
    if (!link || !target) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
    window.history.replaceState(
      null,
      "",
      `${window.location.pathname}${window.location.search}`,
    );
    setMenuOpen(false);
  }
  return (
    <main id="top" className="site" onClick={handleInternalNavigation}>
      <a className="skip-link" href="#about">
        Skip to content
      </a>
      <header className="header">
        <div className="header-glow"></div>
        <Logo />
        <nav
          className={menuOpen ? "nav is-open" : "nav"}
          aria-label="Main navigation"
        >
          {NAV_ITEMS.map((item) => (
            <a
              className={activeSection === item.id ? "is-active" : ""}
              href={`#${item.id}`}
              key={item.id}
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </a>
          ))}
          <button
            className="header-cta mobile-cta"
            type="button"
            aria-haspopup="dialog"
            onClick={openDemo}
          >
            Book a demo <Icon name="arrowUp" size={14} />
          </button>
        </nav>
        <button
          className="header-cta desktop-cta"
          type="button"
          aria-haspopup="dialog"
          onClick={openDemo}
        >
          Book a demo <Icon name="arrowUp" size={14} />
        </button>
        <button
          className="menu-toggle"
          type="button"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((isOpen) => !isOpen)}
        >
          <Icon name={menuOpen ? "x" : "menu"} size={20} />
        </button>
      </header>
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-inner content-width">
          <div className="hero-copy">
            <p className="eyebrow">
              <span></span> Private operations software for manufacturing
            </p>
            <h1 id="hero-title">
              The flow behind
              <br />
              <em>the factory.</em>
            </h1>
            <p className="hero-description">
              {BRAND_NAME} gives manufacturing teams a clearer way to move work
              across the plant, from the first signal to the final resolution.
            </p>
            <div className="hero-actions">
              <button
                className="button button-lime"
                type="button"
                aria-haspopup="dialog"
                onClick={openDemo}
              >
                Book a demo <Icon name="arrowUp" size={16} />
              </button>
              <a className="under-link" href="#about">
                See what we’re building <Icon name="arrow" size={15} />
              </a>
            </div>
          </div>
          <div className="hero-stage">
            <div className="hero-canvas-wrap">
              <HeroScene />
            </div>
            <div className="stage-chrome">
              <span>Factory Resolve / 01</span>
              <span className="stage-status">
                <i></i> SYSTEM IN MOTION
              </span>
            </div>
            <div className="stage-message">
              <span>
                Make every
                <br />
                <em>handoff count.</em>
              </span>
              <small>Context · Ownership · Evidence</small>
            </div>
            <div className="stage-pill stage-pill-top">
              <span className="pill-index">01</span>
              <span>
                <strong>Signal</strong>
                <small>Captured</small>
              </span>
            </div>
            <div className="stage-pill stage-pill-bottom">
              <span className="pill-index">03</span>
              <span>
                <strong>Learning</strong>
                <small>Compounds</small>
              </span>
            </div>
            <div className="stage-foot">
              <span>Private by design</span>
              <span>Customer-controlled data</span>
            </div>
          </div>
        </div>
        <div className="hero-scroll">
          <span>Scroll to explore</span>
          <i></i>
        </div>
      </section>
      <section className="trust-strip">
        <div className="content-width trust-inner">
          <span>Designed for work that moves between</span>
          <div>
            <b>Production</b>
            <i></i>
            <b>Maintenance</b>
            <i></i>
            <b>Quality</b>
            <i></i>
            <b>Manufacturing IT</b>
          </div>
        </div>
      </section>
      <section
        id="about"
        data-section="about"
        className="about-section content-width"
      >
        <div className="section-heading">
          <p className="section-label">
            01 <span>/</span> About {BRAND_NAME}
          </p>
          <span className="section-side-note">
            A system of record for factory work
          </span>
        </div>
        <div className="about-grid">
          <h2>
            Work should move
            <br />
            as one system.
          </h2>
          <div className="about-copy">
            <p>
              When a request crosses departments, the details that matter can
              get buried in calls, chat threads, email, or a spreadsheet.
            </p>
            <p>
              {BRAND_NAME} is building a dependable operating layer for that
              space between teams, so work keeps its context as it moves.
            </p>
            <a className="text-link" href="#approach">
              How we think about it <Icon name="arrow" size={15} />
            </a>
          </div>
        </div>
        <div className="feature-showcase">
          <div className="feature-nav">
            <span className="feature-nav-label">The work, connected</span>
            {FEATURE_TABS.map((feature) => (
              <button
                className={activeFeature === feature.id ? "is-selected" : ""}
                type="button"
                key={feature.id}
                onClick={() => setActiveFeature(feature.id)}
              >
                <span>
                  <i></i>
                  {feature.label}
                </span>
                <Icon name="arrow" size={15} />
              </button>
            ))}
          </div>
          <div className="feature-detail">
            <p className="feature-kicker">{selectedFeature.kicker}</p>
            <h3>{selectedFeature.title}</h3>
            <p className="feature-copy">{selectedFeature.copy}</p>
            <div className="feature-tags">
              {selectedFeature.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
            <div className="feature-progress">
              <span
                style={{
                  width: `${(FEATURE_TABS.findIndex((feature) => feature.id === activeFeature) + 1) * 33.333}%`,
                }}
              ></span>
            </div>
            <span className="feature-step">
              0
              {FEATURE_TABS.findIndex(
                (feature) => feature.id === activeFeature,
              ) + 1}{" "}
              / 03
            </span>
          </div>
        </div>
      </section>
      <section
        id="approach"
        data-section="approach"
        className="approach-section"
      >
        <div className="content-width">
          <div className="section-heading">
            <p className="section-label">
              03 <span>/</span> Our approach
            </p>
            <span className="section-side-note">
              Built inside the customer boundary
            </span>
          </div>
          <div className="approach-intro">
            <h2>
              Useful at the point
              <br />
              of work.
            </h2>
            <p>
              Strong operational software fits the environment it serves. We
              start with the plant network, the people doing the work, and the
              handoffs that keep production moving.
            </p>
          </div>
          <div className="approach-cards">
            <article>
              <span className="approach-card-number">01</span>
              <span className="approach-card-orb orb-lime"></span>
              <h3>
                Private
                <br />
                by default
              </h3>
              <p>
                Customer-controlled infrastructure. Clear data boundary. No
                public internet required.
              </p>
              <a href="#connect">
                Learn more <Icon name="arrow" size={14} />
              </a>
            </article>
            <article>
              <span className="approach-card-number">02</span>
              <span className="approach-card-orb orb-orange"></span>
              <h3>
                Clear for
                <br />
                every team
              </h3>
              <p>
                A shared flow for capture, routing, execution, validation, and
                resolution.
              </p>
              <a href="#connect">
                Learn more <Icon name="arrow" size={14} />
              </a>
            </article>
            <article>
              <span className="approach-card-number">03</span>
              <span className="approach-card-orb orb-teal"></span>
              <h3>
                Ready to
                <br />
                compound
              </h3>
              <p>
                Turn everyday work into a useful history for better decisions
                and prevention.
              </p>
              <a href="#connect">
                Learn more <Icon name="arrow" size={14} />
              </a>
            </article>
          </div>
        </div>
      </section>
      <section className="flow-section content-width">
        <div className="flow-heading">
          <p className="section-label">Factory Resolve / 003</p>
          <h2>
            One plant.
            <br />
            <em>One clear flow.</em>
          </h2>
          <p>Start focused. Prove the workflow. Expand with evidence.</p>
        </div>
        <div className="flow-path">
          <div className="flow-path-line"></div>
          <div className="flow-path-item">
            <span>01</span>
            <strong>Capture</strong>
            <small>Issue + context</small>
          </div>
          <div className="flow-path-item">
            <span>02</span>
            <strong>Route</strong>
            <small>Team + priority</small>
          </div>
          <div className="flow-path-item">
            <span>03</span>
            <strong>Resolve</strong>
            <small>Action + evidence</small>
          </div>
          <div className="flow-path-item">
            <span>04</span>
            <strong>Learn</strong>
            <small>Aging + recurrence</small>
          </div>
        </div>
      </section>
      <section
        id="founder"
        data-section="founder"
        className="founder-section content-width"
      >
        <div className="section-heading">
          <p className="section-label">
            03 <span>/</span> Founder
          </p>
          <span className="section-side-note">
            The work behind {BRAND_NAME}
          </span>
        </div>
        <div className="founder-grid">
          <div className="founder-card">
            <div className="founder-card-grid"></div>
            <div className="founder-mark">
              B<span>.</span>V
            </div>
            <div className="founder-card-footer">
              <span>Founder</span>
              <strong>B.Varshit</strong>
            </div>
            <span className="founder-card-code">
              Factory Resolve / 01
              <br />
              OPERATING LAYER
            </span>
          </div>
          <div className="founder-copy">
            <p className="eyebrow">
              <span></span> Founder-led
            </p>
            <h2>Built for the people who keep things moving.</h2>
            <p>
              {BRAND_NAME} is founded by B.Varshit with a focused belief:
              manufacturing teams deserve a dependable operating layer that
              matches the importance of their work.
            </p>
            <p>
              We’re starting with the workflows that cross departments, carry
              operational risk, and deserve a complete history.
            </p>
            <button
              className="under-link under-link-dark"
              type="button"
              onClick={openContact}
            >
              Connect with {BRAND_NAME} <Icon name="arrow" size={15} />
            </button>
          </div>
        </div>
      </section>
      <section id="connect" data-section="connect" className="connect-section">
        <div className="content-width connect-inner">
          <div>
            <p className="eyebrow eyebrow-light">
              <span></span> Work with us
            </p>
            <h2>
              Make the workflow
              <br />
              <em>count.</em>
            </h2>
          </div>
          <div>
            <p className="connect-copy">
              We’re looking for manufacturing teams, design partners, and people
              who know the plant from the inside.
            </p>
            <div className="connect-actions">
              <button
                className="button button-lime"
                type="button"
                aria-haspopup="dialog"
                onClick={openDemo}
              >
                Book a demo <Icon name="arrowUp" size={14} />
              </button>
              <a
                className="contact-email-link"
                href={`mailto:${CONTACT_EMAIL}`}
              >
                {CONTACT_EMAIL}
              </a>
            </div>
          </div>
        </div>
      </section>
      <footer className="footer">
        <div className="content-width footer-inner">
          <Logo light />
          <span>Private operations software for manufacturing</span>
          <a className="footer-email" href={`mailto:${CONTACT_EMAIL}`}>
            {CONTACT_EMAIL}
          </a>
          <span>© {BRAND_NAME}</span>
          <a href="#top">
            Back to top <Icon name="arrowUp" size={13} />
          </a>
        </div>
      </footer>
      {contactOpen && <ContactModal onClose={() => setContactOpen(false)} />}
      {demoOpen && (
        <DemoBookingModal
          contactEmail={CONTACT_EMAIL}
          onClose={() => setDemoOpen(false)}
        />
      )}
    </main>
  );
}


