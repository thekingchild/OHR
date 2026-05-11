// Testimonials, Contact, Footer

const TESTIMONIALS = [
  {
    quote:
      "OHR moved our entire back office onto cloud apps in under six weeks. We stopped chasing receipts and started chasing growth.",
    name: "Adaeze Okafor",
    role: "COO, Lagos-based logistics firm",
    initials: "AO",
  },
  {
    quote:
      "What we like is that they don't disappear after launch. The platform runs, they look after it, and we get back the hours we used to spend firefighting.",
    name: "Babatunde Adeyemi",
    role: "Director of Operations, retail group",
    initials: "BA",
  },
  {
    quote:
      "We had three disconnected systems and a lot of spreadsheets. Now it's one cloud workflow — onboarding to billing — and everyone can see where things are.",
    name: "Chiamaka Nwankwo",
    role: "Founder, fintech startup",
    initials: "CN",
  },
];

function Testimonials() {
  return (
    <section id="testimonials" className="testimonials section-pad">
      <div className="wrap">
        <SectionHead
          tag="What clients say"
          title="Boring infrastructure. Better days."
        />
        <Reveal className="tm-grid">
          {TESTIMONIALS.map((t) => (
            <figure key={t.name} className="tm">
              <blockquote className="tm-quote">"{t.quote}"</blockquote>
              <figcaption className="tm-foot">
                <div className="tm-ava">{t.initials}</div>
                <div>
                  <div className="tm-name">{t.name}</div>
                  <div className="tm-role">{t.role}</div>
                </div>
              </figcaption>
            </figure>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

function Contact() {
  const [state, setState] = React.useState({
    name: "",
    email: "",
    company: "",
    interest: "SaaS Application Development",
    message: "",
  });
  const [sent, setSent] = React.useState(false);
  const update = (k) => (e) => setState((s) => ({ ...s, [k]: e.target.value }));
  const submit = (e) => {
    e.preventDefault();
    if (!state.name || !state.email) return;
    setSent(true);
  };

  return (
    <section id="contact" className="contact section-pad dark">
      <div className="wrap">
        <Reveal>
          <div className="eyebrow" style={{ color: "var(--fg-dim-on-dark)", marginBottom: 24 }}>
            Contact us
          </div>
        </Reveal>
        <div className="contact-grid">
          <Reveal>
            <h2 className="h-section">
              Tell us what's <em>slowing you down.</em>
            </h2>
            <p className="lede" style={{ marginTop: 22, color: "var(--fg-dim-on-dark)" }}>
              A 30-minute call. We listen to the operation, point at the bottlenecks, and tell you
              honestly whether SaaS, automation or cloud is the answer — or whether it isn't.
            </p>
            <div className="contact-meta">
              <a href="mailto:hello@ohrsystems.ng">
                <span>Email</span><span>hello@ohrsystems.ng</span>
              </a>
              <a href="tel:+2340000000000">
                <span>Phone</span><span>+234 (0) — — — — —</span>
              </a>
              <a href="#">
                <span>Office</span><span>Lagos, Nigeria</span>
              </a>
            </div>
          </Reveal>

          <Reveal>
            {sent ? (
              <div className="form-success">
                <div className="mono" style={{ color: "var(--accent-on-dark)", marginBottom: 10 }}>
                  Message received
                </div>
                <div style={{ fontSize: 20, letterSpacing: "-0.01em", marginBottom: 6 }}>
                  Thanks, {state.name.split(" ")[0]}.
                </div>
                <div style={{ color: "var(--fg-dim-on-dark)", fontSize: 14.5 }}>
                  We'll be in touch on {state.email} within one business day.
                </div>
              </div>
            ) : (
              <form className="form" onSubmit={submit}>
                <div className="field-row">
                  <div className="field">
                    <label htmlFor="f-name">Full name</label>
                    <input id="f-name" required type="text" placeholder="Your name" value={state.name} onChange={update("name")} />
                  </div>
                  <div className="field">
                    <label htmlFor="f-email">Email</label>
                    <input id="f-email" required type="email" placeholder="you@company.com" value={state.email} onChange={update("email")} />
                  </div>
                </div>
                <div className="field">
                  <label htmlFor="f-company">Company</label>
                  <input id="f-company" type="text" placeholder="Where do you work?" value={state.company} onChange={update("company")} />
                </div>
                <div className="field">
                  <label htmlFor="f-interest">I'm interested in</label>
                  <select id="f-interest" value={state.interest} onChange={update("interest")}>
                    <option>SaaS Application Development</option>
                    <option>Business Automation</option>
                    <option>Cloud Solutions</option>
                    <option>Not sure yet — let's talk</option>
                  </select>
                </div>
                <div className="field">
                  <label htmlFor="f-msg">A few lines about your operation</label>
                  <textarea id="f-msg" rows="3" placeholder="What are you trying to solve?" value={state.message} onChange={update("message")} />
                </div>
                <button type="submit" className="btn solid-light">
                  Send message <Arrow />
                </button>
              </form>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <Reveal>
          <h2 className="footer-mark">OHR Systems.</h2>
        </Reveal>
        <div className="footer-grid">
          <div className="footer-col">
            <h5>/ Get in touch</h5>
            <ul>
              <li><a href="mailto:hello@ohrsystems.ng">hello@ohrsystems.ng</a></li>
              <li><a href="#">Lagos, Nigeria</a></li>
              <li><a href="#contact">Start a project →</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h5>/ Site</h5>
            <ul>
              <li><a href="#home">Home</a></li>
              <li><a href="#about">About us</a></li>
              <li><a href="#philosophy">Our philosophy</a></li>
              <li><a href="#services">Our services</a></li>
              <li><a href="#contact">Contact us</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h5>/ Services</h5>
            <ul>
              <li><a href="#services">SaaS Application Development</a></li>
              <li><a href="#services">Business Automation</a></li>
              <li><a href="#services">Cloud Solutions</a></li>
              <li><a href="#solutions">Solutions</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h5>/ Social</h5>
            <ul>
              <li><a href="#">LinkedIn ↗</a></li>
              <li><a href="#">X / Twitter ↗</a></li>
              <li><a href="#">Instagram ↗</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <div>© {new Date().getFullYear()} OHR Systems</div>
          <div>Empowering business · Cultivating trust</div>
        </div>
      </div>
    </footer>
  );
}

Object.assign(window, { Testimonials, Contact, Footer });
