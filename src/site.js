// Google Analytics 4 measurement ID. Analytics only load after the visitor accepts cookies.
const GA_MEASUREMENT_ID = "G-WWP1C2YL5M";

// All page content lives in index.html. This file only adds behaviour.
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const nav = document.querySelector(".nav");
const navItems = [...document.querySelectorAll("[data-nav]")];
const ids = ["home", "about", "services", "benefits", "contact"];

// Mobile menu (shown below 980px wide)
const menuToggle = document.querySelector(".nav-toggle");
const mobileMenu = document.getElementById("mobile-menu");

function setMenu(open) {
  menuToggle.setAttribute("aria-expanded", open);
  menuToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  mobileMenu.hidden = !open;
  nav.classList.toggle("menu-open", open);
}

menuToggle.addEventListener("click", () => setMenu(menuToggle.getAttribute("aria-expanded") !== "true"));
mobileMenu.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => setMenu(false)));
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !mobileMenu.hidden) {
    setMenu(false);
    menuToggle.focus();
  }
});
window.matchMedia("(min-width: 981px)").addEventListener("change", (event) => {
  if (event.matches) setMenu(false);
});

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
  serviceButtons.forEach((button, i) => {
    const isActive = i === index;
    button.classList.toggle("active", isActive);
    button.setAttribute("aria-selected", isActive);
    button.tabIndex = isActive ? 0 : -1;
    document.getElementById(button.getAttribute("aria-controls")).hidden = !isActive;
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
setActiveNav();

// Hero video: a small portrait cut on phones, the full video on larger screens,
// and just the still image for reduced-motion or data-saver visitors.
(function () {
  const vid = document.querySelector(".hero-media video");
  if (!vid) return;
  const saveData = navigator.connection && navigator.connection.saveData;
  if (reducedMotion || saveData) return;
  const isPhone = window.matchMedia("(max-width: 620px)").matches;
  vid.addEventListener("error", () => vid.classList.add("video-failed"));
  vid.src = isPhone ? vid.dataset.srcMobile : vid.dataset.src;
  vid.play().catch(() => {});
})();

const yearEl = document.querySelector("[data-year]");
if (yearEl) yearEl.textContent = new Date().getFullYear();

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
