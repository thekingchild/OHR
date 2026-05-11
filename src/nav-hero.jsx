// Shared building blocks + nav + hero

const Arrow = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 14 14" fill="none" className="arrow" aria-hidden="true">
    <path d="M3 11L11 3M11 3H4.5M11 3V9.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const NAV_LINKS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About Us" },
  { id: "philosophy", label: "Our Philosophy" },
  { id: "services", label: "Our Services" },
  { id: "contact", label: "Contact Us" },
];

function Nav() {
  const [scrolled, setScrolled] = React.useState(false);
  const [active, setActive] = React.useState("home");

  React.useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      const ids = NAV_LINKS.map((n) => n.id);
      let cur = ids[0];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 120) cur = id;
      }
      setActive(cur);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`nav ${scrolled ? "scrolled" : ""}`}>
      <div className="wrap nav-inner">
        <a href="#home" className="nav-logo" aria-label="OHR Systems home">
          <img src="assets/logo.png" alt="OHR Systems" />
        </a>
        <nav className="nav-links">
          {NAV_LINKS.map((n) => (
            <a key={n.id} href={`#${n.id}`} className={active === n.id ? "active" : ""}>
              {n.label}
            </a>
          ))}
        </nav>
        <a href="#contact" className="btn sm solid">
          Book a call <Arrow size={12} />
        </a>
      </div>
    </header>
  );
}

function useCountUp(target, durationMs = 1400, start = false) {
  const [val, setVal] = React.useState(0);
  React.useEffect(() => {
    if (!start) return;
    let raf;
    const t0 = performance.now();
    const tick = (t) => {
      const p = Math.min(1, (t - t0) / durationMs);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(target * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [start, target, durationMs]);
  return val;
}

function Hero() {
  const [ready, setReady] = React.useState(false);
  React.useEffect(() => {
    const t = setTimeout(() => setReady(true), 250);
    return () => clearTimeout(t);
  }, []);

  const clients = useCountUp(120, 1600, ready);
  const uptime = useCountUp(99.9, 1600, ready);
  const projects = useCountUp(280, 1600, ready);
  const years = useCountUp(8, 1600, ready);

  return (
    <section id="home" className="hero">
      <div className="hero-video">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster=""
        >
          <source src="assets/hero.mp4" type="video/mp4" />
        </video>
      </div>

      <div className="wrap hero-content">
        <div className="eyebrow" style={{ color: "rgba(244,241,235,0.7)" }}>
          <span>SaaS · Automation · Cloud</span>
        </div>
        <h1 className="hero-headline">
          Empowering business.<br />
          <em>Cultivating trust.</em>
        </h1>
        <p className="hero-sub">
          OHR Systems delivers ready-to-use software that runs on our cloud — so your team can stop
          maintaining tools and start running the business. Built for productivity, designed for expansion.
        </p>
        <div className="hero-cta">
          <a href="#services" className="btn solid-light">
            Explore services <Arrow />
          </a>
          <a href="#contact" className="btn ghost-dark">
            Talk to us <Arrow />
          </a>
        </div>
      </div>

      <div className="wrap" style={{ position: "relative", zIndex: 2 }}>
        <div className="hero-stats">
          <div className="stat">
            <div className="stat-label">Businesses powered</div>
            <div className="stat-value">{Math.round(clients)}+</div>
          </div>
          <div className="stat">
            <div className="stat-label">Platform uptime</div>
            <div className="stat-value">{uptime.toFixed(1)}%</div>
          </div>
          <div className="stat">
            <div className="stat-label">Workflows automated</div>
            <div className="stat-value">{Math.round(projects)}+</div>
          </div>
          <div className="stat">
            <div className="stat-label">Years delivering</div>
            <div className="stat-value">{Math.round(years)}</div>
          </div>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { Nav, Hero, Arrow, useCountUp });
