// TODO: replace with the real Web3Forms access key from https://web3forms.com
const WEB3FORMS_ACCESS_KEY = "cf8ae417-c63e-4ea2-bb7d-cc915aad0de6";
// TODO: replace with the real GA4 measurement ID (e.g. "G-XXXXXXXXXX")
const GA_MEASUREMENT_ID = "G-WWP1C2YL5M";
const WHATSAPP_NUMBER = "+2349167717741";

const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const services = [
  {
    title: "SaaS application development",
    desc: "Ready-to-use applications that run on secure cloud servers, accessed from browser or mobile app without installation, patching, or infrastructure overhead.",
    detail: "From concept to launch, we build SaaS products that connect your users, data, and recurring revenue model into one secure, easy-to-maintain platform.",
    points: ["Custom business apps", "Subscription products", "Self-service portals"],
  },
  {
    title: "Business automation",
    desc: "We digitize repetitive, time-consuming, and error-prone workflows so approvals, handoffs, reporting, and daily operations keep moving.",
    detail: "We map operations, remove friction, and automate the steps that waste time so your team can focus on higher-value work.",
    points: ["Workflow design", "Process integrations", "Operational dashboards"],
  },
  {
    title: "Cloud solutions",
    desc: "Cloud-based services for email, storage, collaboration, analytics, deployment, and managed infrastructure that scale with what your business actually uses.",
    detail: "We design cloud environments that let your business adapt quickly, stay secure, and make data available to the people who need it most.",
    points: ["Cloud migration", "Managed productivity suites", "Secure deployments"],
  },
];

const faqs = [
  ["How does OHR integrate with our current systems?", "We begin with a workflow audit, then connect the systems worth keeping through APIs, cloud automation, and reporting layers."],
  ["Do we need specialized hardware?", "Most projects run through browser, mobile, and managed cloud infrastructure. If hardware is needed, we make that explicit before build starts."],
  ["How quickly can we see results?", "Focused automations can go live in weeks. Larger SaaS builds are phased so your team gets usable value early."],
  ["Can OHR tailor solutions for our operations?", "Yes. OHR builds around your business process, compliance needs, users, and existing tools."],
  ["We are seeking guidance regarding IT solution consulting services. What initial steps should we undertake?", "IChannel Technologies, an OHR Systems IT consulting firm, specializes in providing expert consulting services customized to meet specific demands. For additional information, please visit <a href=\"https://ichanneltech.com\" target=\"_blank\" rel=\"noopener\">ichanneltech.com</a> or contact us via email at <a href=\"mailto:hello@ichanneltech.com\">hello@ichanneltech.com</a>."],
];

const formFields = [
  { tag: "input", type: "text", name: "name", label: "Full name", required: true },
  { tag: "input", type: "email", name: "email", label: "Email address", required: true },
  { tag: "input", type: "tel", name: "phone", label: "Phone number" },
  { tag: "input", type: "text", name: "company", label: "Company name" },
  { tag: "select", name: "company_size", label: "Company size", required: true, options: ["1-10 employees", "11-50 employees", "51-200 employees", "201+ employees"] },
  { tag: "textarea", name: "message", label: "What would you like to improve?", rows: 3 },
];

const arrow = '<svg width="14" height="14" viewBox="0 0 14 14" fill="none" class="arrow" aria-hidden="true"><path d="M3 11L11 3M11 3H4.5M11 3V9.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';
const videoSources = '<source src="uploads/hero_video-1778514467361.mp4" type="video/mp4" /><source src="assets/hero.mp4" type="video/mp4" />';

function field(f) {
  const id = `field-${f.name}`;
  const common = `id="${id}" name="${f.name}"${f.required ? " required" : ""}`;
  let control;
  if (f.tag === "select") {
    const opts = ["<option value=\"\" disabled selected>" + f.label + "</option>", ...f.options.map((o) => `<option>${o}</option>`)].join("");
    control = `<select ${common}>${opts}</select>`;
  } else if (f.tag === "textarea") {
    control = `<textarea ${common} rows="${f.rows || 3}" placeholder="${f.label}"></textarea>`;
  } else {
    control = `<input ${common} type="${f.type}" placeholder="${f.label}" />`;
  }
  return `<label class="field" for="${id}"><span class="visually-hidden">${f.label}</span>${control}<span class="field-error" aria-live="polite"></span></label>`;
}

document.getElementById("root").innerHTML = `
  <header class="nav">
    <div class="shell nav-inner">
      <a href="#home" class="brand" aria-label="OHR Systems home">
        <img class="logo-light" src="assets/logo-light.svg" alt="OHR Systems" />
        <img class="logo-dark" src="assets/logo-dark.svg" alt="" aria-hidden="true" />
      </a>
      <nav class="nav-links" aria-label="Primary navigation">
        ${["Home", "About", "Services", "Benefits", "Contact"].map((label, index) => `<span class="${index === 0 ? "hide-slash" : "slash"}">/</span><a href="#${label.toLowerCase()}" data-nav="${label.toLowerCase()}">${label}</a>`).join("")}
      </nav>
      <a href="#contact" class="btn btn-dark nav-cta">Contact Us ${arrow}</a>
    </div>
  </header>
  <main id="home">
    <section class="hero">
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
        <div class="hero-media" aria-label="OHR Systems cloud operations video"><video ${reducedMotion ? "" : "autoplay"} muted loop playsinline preload="metadata" poster="assets/hero-fallback.jpg">${videoSources}</video></div>
      </div>
    </section>

    <section id="about" class="section section-split">
      <div class="shell split-grid">
        <div class="reveal image-placeholder about-image">
          <img src="assets/placeholder-about-cloud-coordination-960x600.jpg" alt="About cloud coordination" width="960" height="600" loading="lazy" decoding="async" />
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
          <div class="service-copy" id="service-panel" role="tabpanel" aria-labelledby="service-tab-0"><h3></h3><p></p><p class="service-detail"></p><div class="service-lines"></div></div>
          <div class="service-visual image-placeholder">
            <img src="assets/placeholder-services-dashboard-1200x900.jpg" alt="Services dashboard" width="1200" height="900" loading="lazy" decoding="async" />
          </div>
          <div class="service-index" role="tablist" aria-label="Service selector">${services.map((_, index) => `<button type="button" role="tab" id="service-tab-${index}" aria-controls="service-panel" aria-selected="${index === 0}" tabindex="${index === 0 ? 0 : -1}" data-service="${index}">0${index + 1}.</button>`).join("")}</div>
        </div>
      </div>
    </section>

    <section id="benefits" class="section">
      <div class="shell">
        <div class="reveal section-topline"><div><div class="section-label">/ OHR benefits /</div><h2>Our benefits.</h2></div><a href="#contact" class="btn btn-outline">Work with us</a></div>
        <div class="reveal benefit-grid">
          <article class="benefit-card"><div class="benefit-art image-placeholder"><img src="assets/placeholder-benefit-scalable-900x560.jpg" alt="Scalable architecture" width="900" height="560" loading="lazy" decoding="async" /></div><span>01/</span><h3>Scalable architecture</h3><p>Start lean, then add users, capacity, modules, and integrations as your business grows.</p></article>
          <article class="benefit-card"><div class="benefit-art image-placeholder"><img src="assets/placeholder-benefit-insights-900x560.jpg" alt="Real-time insight dashboards" width="900" height="560" loading="lazy" decoding="async" /></div><span>02/</span><h3>Real-time insight</h3><p>Replace disconnected tools with dashboards that make operational status visible.</p></article>
          <article class="benefit-card"><div class="benefit-art image-placeholder"><img src="assets/placeholder-benefit-support-900x560.jpg" alt="Trusted support" width="900" height="560" loading="lazy" decoding="async" /></div><span>03/</span><h3>Trusted support</h3><p>Implementation, training, monitoring, updates, and ongoing support after launch.</p></article>
        </div>
      </div>
    </section>

    <section class="section video-feature">
      <div class="shell feature-grid">
        <div class="reveal feature-media image-placeholder"><img src="assets/placeholder-ecosystem-1200x900.jpg" alt="Ecosystem feature" width="1200" height="900" loading="lazy" decoding="async" /></div>
        <div class="reveal feature-copy"><div class="section-label">/ How it works /</div><h2>Be the center of your business ecosystem.</h2><p>Connect people, apps, documents, analytics, and customer-facing workflows into one managed operating layer, built around how your team actually works.</p><a href="#contact" class="btn btn-dark">Contact Us ${arrow}</a></div>
      </div>
    </section>

    <section class="cta-band"><div class="reveal cta-panel"><div><div class="section-label">/ Get in touch /</div><h2>Be part of a smarter operation.</h2><p>Tell us what is slowing your business down. We will help you decide what to automate, what to move to the cloud, and what to build next.</p><div class="social-pills"><a href="https://www.facebook.com/ohrsystems">Facebook</a><a href="https://x.com/ohrsystems">X (Twitter)</a><a href="https://www.linkedin.com/company/ohrsystems">LinkedIn</a></div></div></div></section>

    <section class="quote-section"><div class="shell"><div class="reveal"><blockquote>"OHR helped us replace scattered spreadsheets and manual handoffs with one cloud workflow. Our team now sees the status of work without chasing anyone."</blockquote><p>Operations Lead / Floy Publications</p></div></div></section>

    <section class="section faq-section">
      <div class="shell">
        <div class="reveal center-head"><div class="section-label">/ FAQs /</div><h2>Frequently asked questions.</h2></div>
        <div class="reveal faq-list">${faqs.map(([question, answer], index) => `<article class="${index === 0 ? "open" : ""}"><button type="button" aria-expanded="${index === 0}" aria-controls="faq-answer-${index}"><span>${String(index + 1).padStart(2, "0")}.</span><strong>${question}</strong><i>${arrow}</i></button><p id="faq-answer-${index}">${answer}</p></article>`).join("")}</div>
      </div>
    </section>

    <section id="contact" class="section contact-section">
      <div class="shell contact-grid">
        <div class="reveal contact-copy"><div class="section-label">/ Contact us /</div><h2>Connect with us.</h2><p>For inquiry, support, or collaboration, reach OHR Systems in Ibadan or send a project note. We work with teams that want reliable SaaS, business automation, and cloud services.</p><div class="contact-person"><div class="avatar">OH</div><div><strong>OHR Systems</strong><a href="mailto:hello@ohrsystems.ng">hello@ohrsystems.ng</a></div></div><address>Queen Elizabeth Road, Mokola, Ibadan, Oyo State, Nigeria<br /><a href="https://wa.me/2349167717741" target="_blank" rel="noopener">+234916771774</a></address></div>
        <div class="reveal">
          <form class="contact-form" novalidate>
            <input type="hidden" name="access_key" value="${WEB3FORMS_ACCESS_KEY}" />
            <input type="hidden" name="from_name" value="OHR Systems website" />
            <input type="hidden" name="subject" value="New project inquiry from ohrsystems.ng" />
            <!-- Spam traps: bots typically fill every field. Real users never touch these. -->
            <input type="checkbox" name="botcheck" class="visually-hidden" tabindex="-1" autocomplete="off" aria-hidden="true" />
            <div aria-hidden="true" style="position:absolute;left:-9999px;top:auto;width:1px;height:1px;overflow:hidden;">
              <label>Leave this field empty <input type="text" name="website" tabindex="-1" autocomplete="off" /></label>
              <label>Your second email <input type="email" name="email_confirm" tabindex="-1" autocomplete="off" /></label>
            </div>
            ${formFields.map(field).join("")}
            <div class="form-status" role="alert" aria-live="assertive"></div>
            <button type="submit" class="btn btn-dark">Submit ${arrow}</button>
          </form>
        </div>
      </div>
    </section>

  </main>
  <footer class="footer">
    <div class="shell footer-grid">
      <div><a href="#home" class="footer-brand" aria-label="OHR Systems"><img src="assets/logo-dark.svg" alt="OHR Systems" /></a><p>Software, SaaS, cloud services, and business automation for modern operations.</p><div class="footer-social"><a href="https://www.facebook.com/ohrsystems">Facebook</a><a href="https://x.com/ohrsystems">X (Twitter)</a><a href="https://www.linkedin.com/company/ohrsystems">LinkedIn</a></div></div>
      <div class="footer-contact"><a href="mailto:hello@ohrsystems.ng">hello@ohrsystems.ng</a><div class="footer-links"><nav><h4>Main pages</h4><a href="#home">Home</a><a href="#about">About</a><a href="#services">Services</a><a href="#benefits">Benefits</a><a href="privacy.html">Privacy policy</a></nav><nav><h4>Services</h4><a href="#services">SaaS applications</a><a href="#services">Business automation</a><a href="#services">Cloud solutions</a><a href="#contact">Consulting</a></nav><nav><h4>Contact</h4><a href="https://wa.me/2349167717741" target="_blank" rel="noopener">+234916771774</a><a href="#contact">Contact Us</a></nav></div></div>
    </div>
    <div class="shell footer-bottom"><span>Copyright © ${new Date().getFullYear()} OHR Systems</span><a href="privacy.html">Privacy policy</a><span>Empowering business / Cultivating trust</span></div>
  </footer>

  <div class="scroll-progress" aria-hidden="true"><span></span></div>

  <a class="wa-float" href="https://wa.me/${WHATSAPP_NUMBER}" target="_blank" rel="noopener" aria-label="Chat with OHR Systems on WhatsApp">
    <svg viewBox="0 0 32 32" width="28" height="28" aria-hidden="true"><path fill="currentColor" d="M16 3C9.4 3 4 8.4 4 15c0 2.3.7 4.5 1.9 6.4L4 29l7.8-1.9c1.8 1 3.9 1.5 6.2 1.5h.1c6.6 0 12-5.4 12-12S22.6 3 16 3Zm6.9 16.6c-.3.8-1.6 1.5-2.3 1.6-.6.1-1.4.1-2.3-.1-.5-.2-1.2-.4-2.1-.8-3.7-1.6-6.1-5.3-6.3-5.6-.2-.3-1.5-2-1.5-3.7 0-1.8.9-2.7 1.3-3 .3-.4.7-.5 1-.5h.7c.2 0 .5-.1.8.6.3.7 1 2.5 1.1 2.6.1.2.1.4 0 .6-.1.2-.2.4-.3.5-.2.2-.3.4-.5.6-.2.2-.3.4-.2.7.2.3.8 1.4 1.8 2.3 1.3 1.1 2.4 1.5 2.7 1.6.3.1.5.1.7-.1.2-.2.8-1 1.1-1.3.3-.3.5-.3.8-.2.3.1 2 1 2.4 1.1.4.2.6.3.7.5.1.1.1.7-.2 1.6Z"/></svg>
  </a>
`;

const nav = document.querySelector(".nav");
const navItems = [...document.querySelectorAll("[data-nav]")];
const ids = ["home", "about", "services", "benefits", "contact"];

const progressBar = document.querySelector(".scroll-progress > span");
const heroCopy = document.querySelector(".hero-copy");
const heroStats = document.querySelector(".hero-stats");
const heroSection = document.querySelector(".hero");

function setActiveNav() {
  nav.classList.toggle("scrolled", window.scrollY > 18);
  let active = "home";
  ids.forEach((id) => {
    const el = document.getElementById(id);
    if (el && el.getBoundingClientRect().top <= 130) active = id;
  });
  navItems.forEach((item) => item.classList.toggle("active", item.dataset.nav === active));

  if (reducedMotion) return;

  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = docHeight > 0 ? Math.min(1, window.scrollY / docHeight) : 0;
  if (progressBar) progressBar.style.width = (progress * 100).toFixed(2) + "%";

  if (heroSection && heroCopy) {
    const heroHeight = heroSection.offsetHeight;
    const heroProgress = Math.max(0, Math.min(1, window.scrollY / heroHeight));
    const copyShift = heroProgress * 60;
    const fade = 1 - heroProgress * 0.9;
    heroCopy.style.transform = `translate3d(0, ${copyShift}px, 0)`;
    heroCopy.style.opacity = fade.toFixed(3);
    if (heroStats) {
      heroStats.style.transform = `translate3d(0, ${heroProgress * 24}px, 0)`;
    }
  }
}

const serviceButtons = [...document.querySelectorAll("[data-service]")];

function renderService(index) {
  const service = services[index];
  document.querySelector(".service-copy h3").textContent = service.title;
  document.querySelector(".service-copy p").textContent = service.desc;
  document.querySelector(".service-copy .service-detail").textContent = service.detail;
  document.querySelector(".service-lines").innerHTML = service.points.map((point) => `<button type="button" tabindex="-1">${point}</button>`).join("");
  document.querySelector("#service-panel").setAttribute("aria-labelledby", `service-tab-${index}`);
  serviceButtons.forEach((button, i) => {
    const isActive = i === index;
    button.classList.toggle("active", isActive);
    button.setAttribute("aria-selected", isActive);
    button.tabIndex = isActive ? 0 : -1;
  });
}

function countUp(el) {
  const target = Number(el.dataset.count);
  const decimals = Number(el.dataset.decimals || 0);
  const suffix = el.dataset.suffix || "";
  if (reducedMotion) {
    el.textContent = target.toFixed(decimals) + suffix;
    return;
  }
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

serviceButtons.forEach((button, index) => {
  button.addEventListener("click", () => renderService(index));
  button.addEventListener("keydown", (event) => {
    const last = serviceButtons.length - 1;
    let next = index;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") next = index === last ? 0 : index + 1;
    else if (event.key === "ArrowLeft" || event.key === "ArrowUp") next = index === 0 ? last : index - 1;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = last;
    else return;
    event.preventDefault();
    renderService(next);
    serviceButtons[next].focus();
  });
});

document.querySelectorAll(".faq-list article button").forEach((button) => {
  button.addEventListener("click", () => {
    const article = button.closest("article");
    article.classList.toggle("open");
    button.setAttribute("aria-expanded", article.classList.contains("open"));
  });
});

const form = document.querySelector(".contact-form");
const formStatus = form.querySelector(".form-status");
const FORM_RENDERED_AT = Date.now();
const MIN_FILL_SECONDS = 3;
const RATE_LIMIT_KEY = "ohr_last_submit";
const RATE_LIMIT_WINDOW_MS = 60 * 1000;

function showFieldError(input, message) {
  const wrapper = input.closest(".field");
  if (!wrapper) return;
  const slot = wrapper.querySelector(".field-error");
  if (slot) slot.textContent = message;
  input.setAttribute("aria-invalid", "true");
}

function clearFieldError(input) {
  const wrapper = input.closest(".field");
  if (!wrapper) return;
  const slot = wrapper.querySelector(".field-error");
  if (slot) slot.textContent = "";
  input.removeAttribute("aria-invalid");
}

form.querySelectorAll("input, select, textarea").forEach((input) => {
  input.addEventListener("invalid", (event) => {
    event.preventDefault();
    showFieldError(input, input.validationMessage);
  }, true);
  input.addEventListener("input", () => clearFieldError(input));
  input.addEventListener("change", () => clearFieldError(input));
});

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  formStatus.textContent = "";
  formStatus.classList.remove("error");

  // Honeypot trap: if any of these are filled, silently accept and bail.
  const trapped =
    form.querySelector('input[name="botcheck"]').checked ||
    form.querySelector('input[name="website"]').value ||
    form.querySelector('input[name="email_confirm"]').value;

  // Time-trap: bots typically submit instantly. Real users take seconds.
  const elapsed = (Date.now() - FORM_RENDERED_AT) / 1000;

  // Rate limit: same browser can't submit twice within the window.
  const lastSubmit = Number(localStorage.getItem(RATE_LIMIT_KEY) || 0);
  const sinceLast = Date.now() - lastSubmit;

  if (trapped || elapsed < MIN_FILL_SECONDS) {
    // Pretend success so bots don't retry with adjusted strategies.
    form.outerHTML = '<div class="form-success"><strong>Thank you.</strong><span>Your message reached the OHR team. We will get back to you shortly.</span></div>';
    return;
  }

  if (sinceLast < RATE_LIMIT_WINDOW_MS) {
    formStatus.classList.add("error");
    formStatus.textContent = "You just sent a message. Please wait a moment before sending another.";
    return;
  }

  let firstInvalid = null;
  form.querySelectorAll("input:not([tabindex='-1']), select, textarea").forEach((input) => {
    if (!input.checkValidity()) {
      showFieldError(input, input.validationMessage);
      if (!firstInvalid) firstInvalid = input;
    }
  });
  if (firstInvalid) {
    firstInvalid.focus();
    return;
  }

  const submitBtn = form.querySelector("button[type=submit]");
  const originalLabel = submitBtn.innerHTML;
  submitBtn.disabled = true;
  submitBtn.classList.add("form-loading");
  submitBtn.textContent = "Sending…";

  try {
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: new FormData(form),
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok || data.success === false) throw new Error(data.message || "Submission failed");
    localStorage.setItem(RATE_LIMIT_KEY, String(Date.now()));
    form.outerHTML = '<div class="form-success"><strong>Thank you.</strong><span>Your message reached the OHR team. We will get back to you shortly.</span></div>';
  } catch (err) {
    submitBtn.disabled = false;
    submitBtn.classList.remove("form-loading");
    submitBtn.innerHTML = originalLabel;
    formStatus.classList.add("error");
    formStatus.textContent = "Sorry, we could not send your message right now. Please email hello@ohrsystems.ng or try again in a moment.";
  }
});

let scrollTicking = false;
window.addEventListener("scroll", () => {
  if (scrollTicking) return;
  scrollTicking = true;
  requestAnimationFrame(() => {
    setActiveNav();
    scrollTicking = false;
  });
}, { passive: true });
renderService(0);
setActiveNav();

// Hero video fallback — hide video on error so CSS background-image shows through
(function () {
  const vid = document.querySelector(".hero-media video");
  if (!vid) return;

  function fallback() {
    vid.classList.add("video-failed");
  }

  // If the video can't load any source
  vid.addEventListener("error", fallback);
  // Also listen on each <source> for network failures
  vid.querySelectorAll("source").forEach((src) => {
    src.addEventListener("error", () => {
      // Only fallback if ALL sources failed
      const sources = vid.querySelectorAll("source");
      const allFailed = [...sources].every((s) => s.error || !vid.networkState || vid.networkState === 3);
      if (allFailed) fallback();
    });
  });

  // Timeout: if video hasn't started playing within 6s, show fallback image
  let playStarted = false;
  vid.addEventListener("playing", () => { playStarted = true; });
  setTimeout(() => {
    if (!playStarted && vid.readyState < 3) fallback();
  }, 6000);
})();

// Consent + GA4
const CONSENT_KEY = "ohr_consent";
const gpcOptOut = !!navigator.globalPrivacyControl;
const storedConsent = localStorage.getItem(CONSENT_KEY);

function loadAnalytics() {
  if (!GA_MEASUREMENT_ID || GA_MEASUREMENT_ID === "G-XXXXXXXXXX") return;
  const s = document.createElement("script");
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(s);
  window.dataLayer = window.dataLayer || [];
  window.gtag = function () { window.dataLayer.push(arguments); };
  window.gtag("js", new Date());
  window.gtag("config", GA_MEASUREMENT_ID, { anonymize_ip: true });
}

function setConsent(value) {
  localStorage.setItem(CONSENT_KEY, value);
  const bar = document.querySelector(".consent-bar");
  if (bar) bar.remove();
  if (value === "granted") loadAnalytics();
}

function renderConsentBar() {
  const bar = document.createElement("div");
  bar.className = "consent-bar";
  bar.setAttribute("role", "dialog");
  bar.setAttribute("aria-label", "Cookie consent");
  bar.innerHTML = `
    <p>We use cookies for anonymous analytics so we can improve this site. <a href="privacy.html">Privacy policy</a>.</p>
    <div class="consent-actions">
      <button type="button" class="btn btn-outline" data-consent="denied">Decline</button>
      <button type="button" class="btn btn-dark" data-consent="granted">Accept</button>
    </div>
  `;
  document.body.appendChild(bar);
  bar.querySelectorAll("[data-consent]").forEach((b) => b.addEventListener("click", () => setConsent(b.dataset.consent)));
}

if (gpcOptOut) {
  localStorage.setItem(CONSENT_KEY, "denied");
} else if (storedConsent === "granted") {
  loadAnalytics();
} else if (!storedConsent) {
  renderConsentBar();
}
