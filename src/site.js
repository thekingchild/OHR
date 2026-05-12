const services = [
  {
    title: "SaaS application development",
    desc: "Ready-to-use applications that run on secure cloud servers, accessed from browser or mobile app without installation, patching, or infrastructure overhead.",
    points: ["Custom business apps", "Subscription products", "Self-service portals"],
  },
  {
    title: "Business automation",
    desc: "We digitize repetitive, time-consuming, and error-prone workflows so approvals, handoffs, reporting, and daily operations keep moving.",
    points: ["Workflow design", "Process integrations", "Operational dashboards"],
  },
  {
    title: "Cloud solutions",
    desc: "Cloud-based services for email, storage, collaboration, analytics, deployment, and managed infrastructure that scale with what your business actually uses.",
    points: ["Cloud migration", "Managed productivity suites", "Secure deployments"],
  },
];

const faqs = [
  ["How does OHR integrate with our current systems?", "We begin with a workflow audit, then connect the systems worth keeping through APIs, cloud automation, and reporting layers."],
  ["Do we need specialized hardware?", "Most projects run through browser, mobile, and managed cloud infrastructure. If hardware is needed, we make that explicit before build starts."],
  ["How quickly can we see results?", "Focused automations can go live in weeks. Larger SaaS builds are phased so your team gets usable value early."],
  ["Can OHR tailor solutions for our operations?", "Yes. OHR builds around your business process, compliance needs, users, and existing tools."],
];

const arrow = '<svg width="14" height="14" viewBox="0 0 14 14" fill="none" class="arrow" aria-hidden="true"><path d="M3 11L11 3M11 3H4.5M11 3V9.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';
const videoSources = '<source src="uploads/hero_video-1778514467361.mp4" type="video/mp4" /><source src="assets/hero.mp4" type="video/mp4" />';

document.getElementById("root").innerHTML = `
  <header class="nav">
    <div class="shell nav-inner">
      <a href="#home" class="brand" aria-label="OHR Systems home"><img src="assets/logo.png" alt="OHR Systems" /><span>OHR Systems</span></a>
      <nav class="nav-links" aria-label="Primary navigation">
        ${["Home", "About", "Services", "Benefits", "Contact"].map((label, index) => `<span class="${index === 0 ? "hide-slash" : "slash"}">/</span><a href="#${label.toLowerCase()}" data-nav="${label.toLowerCase()}">${label}</a>`).join("")}
      </nav>
      <a href="#contact" class="btn btn-dark nav-cta">Start a project ${arrow}</a>
    </div>
  </header>
  <main>
    <section id="home" class="hero">
      <div class="shell hero-shell">
        <div class="hero-inner">
          <div class="hero-copy">
            <h1>Build smarter systems that move your business forward.</h1>
            <p>OHR Systems turns everyday operations into connected cloud workflows, custom SaaS products, and automation your team can trust.</p>
            <div class="hero-actions">
              <a href="#services" class="btn btn-light">Explore services ${arrow}</a>
              <a href="#contact" class="btn btn-glass">Contact us ${arrow}</a>
            </div>
          </div>
          <div class="hero-stats" aria-label="OHR Systems proof points">
            <div><span>Businesses supported</span><strong data-count="120" data-suffix="+">0</strong></div>
            <div><span>Managed uptime</span><strong data-count="99.9" data-decimals="1" data-suffix="%">0</strong></div>
            <div><span>Workflows automated</span><strong data-count="280" data-suffix="+">0</strong></div>
            <div><span>Cloud support</span><strong data-count="24" data-suffix="/7">0</strong></div>
          </div>
        </div>
        <div class="hero-media" aria-label="OHR Systems cloud operations video"><video autoplay muted loop playsinline preload="auto" poster="uploads/logo-1778514623161.png">${videoSources}</video></div>
      </div>
    </section>

    <section id="about" class="section section-split">
      <div class="shell split-grid">
        <div class="reveal image-placeholder about-image">
          <img src="assets/placeholder-about-cloud-coordination-960x600.jpg" alt="About cloud coordination placeholder, 960 by 600 JPG" />
        </div>
        <div class="reveal split-copy">
          <div class="section-label">/ What makes OHR different /</div>
          <h2>Bridging business operations and cloud execution.</h2>
          <p>OHR Systems helps businesses transition from traditional operations to digital models. We implement and manage SaaS solutions, cloud services, and automation workflows so your teams can focus on core operations without worrying about technical issues.</p>
          <a href="#services" class="btn btn-dark">Explore services ${arrow}</a>
        </div>
      </div>
    </section>

    <section id="services" class="section soft-section">
      <div class="shell">
        <div class="reveal center-head"><div class="section-label">/ Solutions /</div><h2>Our services.</h2></div>
        <div class="reveal service-stage">
          <div class="service-copy"><h3></h3><p></p><div class="service-lines"></div></div>
          <div class="service-visual image-placeholder">
            <img src="assets/placeholder-services-dashboard-1200x900.jpg" alt="Services dashboard image placeholder, 1200 by 900 JPG" />
          </div>
          <div class="service-index" aria-label="Service selector">${services.map((_, index) => `<button type="button" data-service="${index}">0${index + 1}.</button>`).join("")}</div>
        </div>
      </div>
    </section>

    <section id="benefits" class="section">
      <div class="shell">
        <div class="reveal section-topline"><div><div class="section-label">/ OHR benefits /</div><h2>Our benefits.</h2></div><a href="#contact" class="btn btn-outline">Work with us</a></div>
        <div class="reveal benefit-grid">
          <article class="benefit-card"><div class="benefit-art image-placeholder"><img src="assets/placeholder-benefit-scalable-900x560.jpg" alt="Scalable architecture image placeholder, 900 by 560 JPG" /></div><span>01/</span><h3>Scalable architecture</h3><p>Start lean, then add users, capacity, modules, and integrations as your business grows.</p></article>
          <article class="benefit-card"><div class="benefit-art image-placeholder"><img src="assets/placeholder-benefit-insights-900x560.jpg" alt="Real-time insight image placeholder, 900 by 560 JPG" /></div><span>02/</span><h3>Real-time insight</h3><p>Replace disconnected tools with dashboards that make operational status visible.</p></article>
          <article class="benefit-card"><div class="benefit-art image-placeholder"><img src="assets/placeholder-benefit-support-900x560.jpg" alt="Trusted support image placeholder, 900 by 560 JPG" /></div><span>03/</span><h3>Trusted support</h3><p>Implementation, training, monitoring, updates, and ongoing support after launch.</p></article>
        </div>
      </div>
    </section>

    <section class="section video-feature">
      <div class="shell feature-grid">
        <div class="reveal feature-media image-placeholder"><img src="assets/placeholder-ecosystem-1200x900.jpg" alt="Ecosystem feature image placeholder, 1200 by 900 JPG" /></div>
        <div class="reveal feature-copy"><div class="section-label">/ Watch video /</div><h2>Be the center of your business ecosystem.</h2><p>Connect people, apps, documents, analytics, and customer-facing workflows into one managed operating layer, built around how your team actually works.</p><a href="#contact" class="btn btn-dark">Start a project ${arrow}</a></div>
      </div>
    </section>

    <section class="cta-band"><div class="reveal cta-panel"><div><div class="section-label">/ Get in touch /</div><h2>Be part of a smarter operation.</h2><p>Tell us what is slowing your business down. We will help you decide what to automate, what to move to the cloud, and what to build next.</p><div class="social-pills"><a href="https://www.facebook.com/ohrsystems">Facebook</a><a href="https://x.com/ohrsystems">X (Twitter)</a><a href="https://www.linkedin.com/company/ohrsystems">LinkedIn</a></div></div></div></section>

    <section class="quote-section"><div class="shell"><div class="reveal"><blockquote>"OHR helped us replace scattered spreadsheets and manual handoffs with one cloud workflow. Our team now sees the status of work without chasing anyone."</blockquote><p>Operations Lead / Growing services company</p></div></div></section>

    <section class="section faq-section">
      <div class="shell">
        <div class="reveal center-head"><div class="section-label">/ FAQs /</div><h2>Frequently asked questions.</h2></div>
        <div class="reveal faq-list">${faqs.map(([question, answer], index) => `<article class="${index === 0 ? "open" : ""}"><button type="button"><span>${String(index + 1).padStart(2, "0")}.</span><strong>${question}</strong><i>${arrow}</i></button><p>${answer}</p></article>`).join("")}</div>
      </div>
    </section>

    <section id="contact" class="section contact-section">
      <div class="shell contact-grid">
        <div class="reveal contact-copy"><div class="section-label">/ Contact us /</div><h2>Connect with us.</h2><p>For inquiry, support, or collaboration, reach OHR Systems in Ibadan or send a project note. We work with teams that want reliable SaaS, business automation, and cloud services.</p><div class="contact-person"><div class="avatar">OH</div><div><strong>OHR Systems</strong><a href="mailto:hello@ohrsystems.ng">hello@ohrsystems.ng</a></div></div><address>Queen Elizabeth Road, Mokola, Ibadan, Oyo State, Nigeria<br /><a href="tel:+2348030655234">08030655234</a> / <a href="tel:+234916771774">+234916771774</a></address></div>
        <div class="reveal"><form class="contact-form"><input required type="text" placeholder="Full name" /><input required type="email" placeholder="Email address" /><input type="tel" placeholder="Phone number" /><input type="text" placeholder="Company name" /><select required><option value="" disabled selected>Company size</option><option>1-10 employees</option><option>11-50 employees</option><option>51-200 employees</option><option>201+ employees</option></select><textarea rows="3" placeholder="What would you like to improve?"></textarea><button type="submit" class="btn btn-dark">Request a demo ${arrow}</button></form></div>
      </div>
    </section>

  </main>
  <footer class="footer">
    <div class="shell footer-grid">
      <div><a href="#home" class="footer-brand"><img src="assets/logo.png" alt="" /><strong>OHR Systems</strong></a><p>Software, SaaS, cloud services, and business automation for modern operations.</p><div class="footer-social"><a href="https://www.facebook.com/ohrsystems">Facebook</a><a href="https://x.com/ohrsystems">X (Twitter)</a><a href="https://www.linkedin.com/company/ohrsystems">LinkedIn</a></div></div>
      <div class="footer-contact"><a href="mailto:hello@ohrsystems.ng">hello@ohrsystems.ng</a><div class="footer-links"><nav><h4>Main pages</h4><a href="#home">Home</a><a href="#about">About</a><a href="#services">Services</a><a href="#benefits">Benefits</a><a href="privacy.html">Privacy policy</a></nav><nav><h4>Services</h4><a href="#services">SaaS applications</a><a href="#services">Business automation</a><a href="#services">Cloud solutions</a><a href="#contact">Consulting</a></nav><nav><h4>Contact</h4><a href="tel:+2348030655234">08030655234</a><a href="tel:+234916771774">+234916771774</a><a href="#contact">Start a project</a></nav></div></div>
    </div>
    <div class="shell footer-bottom"><span>Copyright © ${new Date().getFullYear()} OHR Systems</span><span>Empowering business / Cultivating trust</span></div>
  </footer>
`;

const nav = document.querySelector(".nav");
const navItems = [...document.querySelectorAll("[data-nav]")];
const ids = ["home", "about", "services", "benefits", "contact"];

function setActiveNav() {
  nav.classList.toggle("scrolled", window.scrollY > 18);
  let active = "home";
  ids.forEach((id) => {
    const el = document.getElementById(id);
    if (el && el.getBoundingClientRect().top <= 130) active = id;
  });
  navItems.forEach((item) => item.classList.toggle("active", item.dataset.nav === active));
}

function renderService(index) {
  const service = services[index];
  document.querySelector(".service-copy h3").textContent = service.title;
  document.querySelector(".service-copy p").textContent = service.desc;
  document.querySelector(".service-lines").innerHTML = service.points.map((point) => `<button type="button">${point}</button>`).join("");
  document.querySelectorAll("[data-service]").forEach((button) => button.classList.toggle("active", Number(button.dataset.service) === index));
}

function countUp(el) {
  const target = Number(el.dataset.count);
  const decimals = Number(el.dataset.decimals || 0);
  const suffix = el.dataset.suffix || "";
  const start = performance.now();
  const duration = 1450;
  function tick(now) {
    const progress = Math.min(1, (now - start) / duration);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = (target * eased).toFixed(decimals) + suffix;
    if (progress < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("in");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));
document.querySelectorAll("[data-count]").forEach(countUp);
document.querySelectorAll("[data-service]").forEach((button) => button.addEventListener("click", () => renderService(Number(button.dataset.service))));
document.querySelectorAll(".faq-list article button").forEach((button) => {
  button.addEventListener("click", () => button.closest("article").classList.toggle("open"));
});
document.querySelector(".contact-form").addEventListener("submit", (event) => {
  event.preventDefault();
  event.currentTarget.outerHTML = '<div class="form-success"><strong>Thank you.</strong><span>Your message is ready for the OHR team. We will get back to you shortly.</span></div>';
});
window.addEventListener("scroll", setActiveNav, { passive: true });
renderService(0);
setActiveNav();
