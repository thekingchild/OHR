// About, Philosophy, Services, Solutions, Benefits

function Reveal({ children, as: Tag = "div", className = "", ...rest }) {
  const ref = React.useRef(null);
  const [show, setShow] = React.useState(false);
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setShow(true);
            io.disconnect();
          }
        }
      },
      { threshold: 0.12 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <Tag ref={ref} className={`reveal ${show ? "in" : ""} ${className}`} {...rest}>
      {children}
    </Tag>
  );
}

function SectionHead({ tag, title, lede }) {
  return (
    <Reveal className="sec-head">
      <div>
        <span className="eyebrow">{tag}</span>
      </div>
      <div>
        <h2 className="h-section">{title}</h2>
        {lede ? <p className="lede" style={{ marginTop: 18 }}>{lede}</p> : null}
      </div>
    </Reveal>
  );
}

function About() {
  return (
    <section id="about" className="section-pad">
      <div className="wrap">
        <SectionHead
          tag="About us"
          title="A team of cloud experts, on your bench."
        />
        <div className="about-grid">
          <Reveal className="about-text">
            <p className="lede">
              We specialise in implementing and managing SaaS solutions for growing businesses —
              taking the weight of cloud transitions, integrations, and day-to-day platform
              operations off your team.
            </p>
            <p>
              With deep experience across SaaS, automation and cloud infrastructure, we ensure a
              seamless move to cloud-based platforms so companies can focus on their core
              operations without worrying about technical issues.
            </p>
            <p>
              The result: software that's ready when you are, scaled to what you actually use, and
              looked after by people who've done this many times before.
            </p>
          </Reveal>
          <Reveal className="about-card">
            <div>
              <div className="mono" style={{ marginBottom: 18 }}>What you get</div>
              <h3 className="h-card" style={{ marginBottom: 10 }}>
                Software, ready out of the box.
              </h3>
              <p style={{ color: "var(--fg-dim)", fontSize: 14.5, margin: 0 }}>
                No installations, no updates, no infrastructure to babysit. Access everything from a
                browser or mobile app, pay only for what you use.
              </p>
            </div>
            <div className="about-pill-row">
              <span className="pill">Browser-first</span>
              <span className="pill">Pay as you grow</span>
              <span className="pill">Always on</span>
              <span className="pill">Mobile ready</span>
              <span className="pill">Managed for you</span>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Philosophy() {
  return (
    <section id="philosophy" className="philosophy section-pad dark">
      <div className="wrap">
        <Reveal>
          <div className="eyebrow" style={{ color: "var(--fg-dim-on-dark)", marginBottom: 24 }}>
            Our philosophy
          </div>
        </Reveal>
        <div className="phil-grid">
          <Reveal>
            <h2 className="phil-quote">
              Helping businesses transition from traditional operations to <em>digital models</em>{" "}
              — using cutting-edge technology to increase productivity and reach new opportunities.
            </h2>
          </Reveal>
          <Reveal>
            <p className="lede" style={{ color: "var(--fg-dim-on-dark)" }}>
              We don't sell tools and walk away. We partner — diagnosing where time is leaking,
              what's repetitive, and which manual processes are slowing you down — then put the
              right cloud and automation in place so your people can focus on the work that matters.
            </p>
          </Reveal>
        </div>

        <Reveal className="phil-points">
          {[
            {
              n: "01",
              h: "Empowering businesses",
              p: "Give every team the same operational leverage as the largest players in their market.",
            },
            {
              n: "02",
              h: "Cultivating trust",
              p: "Long-term partnerships, transparent operations, and platforms you can rely on.",
            },
            {
              n: "03",
              h: "Encouraging expansion",
              p: "Build infrastructure that scales as your ambitions grow — never the other way round.",
            },
          ].map((x) => (
            <div key={x.n}>
              <div className="phil-num">/ {x.n}</div>
              <h4>{x.h}</h4>
              <p>{x.p}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

const SERVICES = [
  {
    n: "01",
    title: "SaaS Application Development",
    desc: "Ready-to-use software that runs on our cloud servers. No installations, no updates, no managing — access it from any browser or mobile app, pay only for what you use.",
  },
  {
    n: "02",
    title: "Business Automation",
    desc: "We help you transform how you run operations by creating solutions that automate tasks which are repetitive, time-consuming, or error-prone — so your team can focus on real work.",
  },
  {
    n: "03",
    title: "Cloud Solutions",
    desc: "Cloud-based services giving you access to email, storage, collaboration, analytics and more — from any device with an internet connection, on a pay-for-what-you-use model.",
  },
];

function Services() {
  return (
    <section id="services" className="section-pad">
      <div className="wrap">
        <SectionHead
          tag="What we do"
          title="Three things we do well — all of them in the cloud."
        />
        <Reveal className="svc-list">
          {SERVICES.map((s) => (
            <a key={s.n} href="#contact" className="svc-row">
              <div className="svc-num">/ {s.n}</div>
              <div className="svc-name">{s.title}</div>
              <div className="svc-desc">{s.desc}</div>
              <div className="svc-arrow"><Arrow size={14} /></div>
            </a>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

function Solutions() {
  return (
    <section id="solutions" className="section-pad" style={{ background: "var(--bg-2)" }}>
      <div className="wrap">
        <SectionHead
          tag="Solutions"
          title="Built for the operations that keep a business moving."
          lede="A few of the ways teams put our cloud and automation work into practice."
        />
        <Reveal className="sol-grid">
          <div className="sol-card wide dark">
            <div>
              <span className="sol-tag">Featured · Workflow</span>
              <h4>Document & approval automation</h4>
              <p>
                Replace email chains and shared spreadsheets with structured approvals that route
                themselves, log every action, and surface bottlenecks in real time.
              </p>
            </div>
            <div className="slot" style={{ marginTop: 22, height: 140 }}>
              [ Workflow diagram — drop screenshot ]
            </div>
          </div>

          <div className="sol-card third">
            <span className="sol-tag">Cloud · Productivity</span>
            <h4>Email, storage & collaboration suite</h4>
            <p>Managed inboxes, shared drives, and a single place for documents and chat — set up and supported by us.</p>
            <div className="pulse" style={{ marginTop: "auto" }}>
              <span className="pulse-dot" /> uptime · 99.98%
            </div>
          </div>

          <div className="sol-card third">
            <span className="sol-tag">Analytics</span>
            <h4>Operations dashboards</h4>
            <p>One view of the metrics that matter — pulled directly from your tools, refreshed automatically.</p>
            <div style={{ height: 70, marginTop: "auto" }}>
              <div className="bars">
                <span className="dim" style={{ height: "30%" }} />
                <span className="dim" style={{ height: "45%" }} />
                <span style={{ height: "55%" }} />
                <span className="dim" style={{ height: "35%" }} />
                <span style={{ height: "72%" }} />
                <span className="accent" style={{ height: "95%" }} />
              </div>
            </div>
          </div>

          <div className="sol-card third">
            <span className="sol-tag">Automation</span>
            <h4>Customer onboarding flows</h4>
            <p>From signup to provisioning to first invoice — no manual hand-offs, no missed steps.</p>
          </div>

          <div className="sol-card wide">
            <div>
              <span className="sol-tag">Industries</span>
              <h4>Wherever the operation is too manual.</h4>
              <p>
                We've shipped cloud and automation work across finance, logistics, healthcare,
                retail and the public sector — different problems, the same underlying answer.
              </p>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 22 }}>
              {["Financial services", "Logistics", "Healthcare", "Retail", "Education", "Public sector", "Manufacturing"].map((x) => (
                <span key={x} className="pill">{x}</span>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Benefits() {
  return (
    <section id="benefits" className="section-pad">
      <div className="wrap">
        <SectionHead
          tag="Why OHR"
          title="The day-to-day difference, measured."
        />
        <Reveal className="ben-grid">
          <div className="ben">
            <div className="ben-vis" style={{ display: "grid", placeItems: "center" }}>
              <div className="ring"><div>62%</div></div>
            </div>
            <div className="ben-num">/ 01</div>
            <h4>Less time on busywork</h4>
            <p>Teams typically reclaim more than half of the hours spent on repetitive tasks within the first quarter of going live.</p>
          </div>
          <div className="ben">
            <div className="ben-vis">
              <div className="bars">
                <span className="dim" style={{ height: "25%" }} />
                <span className="dim" style={{ height: "35%" }} />
                <span style={{ height: "48%" }} />
                <span style={{ height: "62%" }} />
                <span className="accent" style={{ height: "82%" }} />
                <span className="accent" style={{ height: "94%" }} />
              </div>
            </div>
            <div className="ben-num">/ 02</div>
            <h4>Scales with you</h4>
            <p>Pay for what you use today. Add capacity, users and features as your business grows — without re-platforming.</p>
          </div>
          <div className="ben">
            <div className="ben-vis" style={{ display: "grid", placeItems: "center", gap: 14, gridAutoFlow: "row" }}>
              <div className="pulse" style={{ fontSize: 13 }}>
                <span className="pulse-dot" /> all systems operational
              </div>
              <div style={{ fontFamily: "Geist Mono, monospace", fontSize: 11, color: "var(--fg-dim)", letterSpacing: "0.08em" }}>
                avg. response · 14 min
              </div>
            </div>
            <div className="ben-num">/ 03</div>
            <h4>Looked after, always</h4>
            <p>Real humans monitoring, real humans responding. Managed services with SLAs that match what your business actually needs.</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

Object.assign(window, { About, Philosophy, Services, Solutions, Benefits, Reveal, SectionHead });
