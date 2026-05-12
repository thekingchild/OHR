# OHR Systems site — configuration guide

Everything you may need to change is listed here, grouped by what kind of change
it is. The site is a static, no-build vanilla-JS project, so most edits are
just text changes to one of the files at the repo root.

---

## 1. Secrets / IDs you must replace before going live

These are the only things that absolutely have to be replaced before deploying.
Both sit at the top of [`src/site.js`](src/site.js):

```js
// TODO: replace with the real Web3Forms access key from https://web3forms.com
const WEB3FORMS_ACCESS_KEY = "YOUR_WEB3FORMS_ACCESS_KEY";
// TODO: replace with the real GA4 measurement ID (e.g. "G-XXXXXXXXXX")
const GA_MEASUREMENT_ID = "G-XXXXXXXXXX";
const WHATSAPP_NUMBER = "2349167717741";
```

| Constant | What it is | Where to get it |
|---|---|---|
| `WEB3FORMS_ACCESS_KEY` | Access key the contact form posts to. Without this, the form will appear to submit but no email is delivered. | Create a free account at [web3forms.com](https://web3forms.com) → "Create New Form" → copy the access key. Point it at `hello@ohrsystems.ng`. |
| `GA_MEASUREMENT_ID` | Google Analytics 4 measurement ID. Leave it as `G-XXXXXXXXXX` to disable analytics entirely (the consent banner will still show). | analytics.google.com → Admin → Data Streams → Web → copy the "Measurement ID" (starts with `G-`). |
| `WHATSAPP_NUMBER` | International-format number (no `+`, no spaces) used by the floating WhatsApp button. | The phone number you want messages routed to. Currently `+234 916 771 7741`. |

> **Tip:** these constants live in plain JS — there is no `.env` step. Edit the
> file, save, deploy.

---

## 2. Logo

Two SVG files live in [`assets/`](assets/):

- `assets/logo-light.svg` — white version, shown over the dark hero
- `assets/logo-dark.svg` — black version, shown on the scrolled nav, footer,
  privacy page, and 404 page

**To replace the logo:** drop in two new SVG files with the same filenames.
Both should be designed at the same proportions so the swap stays visually
consistent. The CSS sizes them by height (52px in nav, 64px in footer) and
auto-scales width — so the aspect ratio of your SVG drives the on-screen width.

**To change the rendered size**, edit these lines in [`styles.css`](styles.css):

```css
.brand img { width: auto; height: 52px; object-fit: contain; }   /* nav */
.footer-brand img { width: auto; height: 64px; display: block; } /* footer */
```

**Favicon** (the browser tab icon) is still [`assets/logo.png`](assets/logo.png).
To replace, overwrite that file (32×32 minimum recommended) or change the
references in [`index.html`](index.html), [`privacy.html`](privacy.html),
and [`404.html`](404.html):

```html
<link rel="icon" href="assets/logo.png" />
<link rel="apple-touch-icon" href="assets/logo.png" />
```

---

## 3. Social media / rich snippet image (OG image)

When someone shares the site on WhatsApp, Slack, LinkedIn, X, Facebook,
iMessage, etc., this is the image they see.

**File:** [`assets/og-image.jpg`](assets/og-image.jpg)
**Recommended size:** 1200 × 630 pixels (the Facebook / OG standard)
**Format:** JPG or PNG (under ~1 MB for fast preview loads)

**To replace:** save your new image as `assets/og-image.jpg`, overwriting the
existing file. That is the only change you need — every page on the site
already references that exact path.

If you'd rather use a different filename, update these three lines in
[`index.html`](index.html) (the `og:image` and `twitter:image` meta tags) and
the one matching line in [`privacy.html`](privacy.html).

> **After replacing:** clear Facebook/LinkedIn caches so they re-scrape.
> Facebook debugger: [developers.facebook.com/tools/debug](https://developers.facebook.com/tools/debug/)
> LinkedIn inspector: [linkedin.com/post-inspector](https://www.linkedin.com/post-inspector/)

---

## 4. Domain / canonical URLs

The site references `https://ohrsystems.ng/` in several places. If you change
domain, search-and-replace `https://ohrsystems.ng` across these files:

- [`index.html`](index.html) — `<link rel="canonical">`, all `og:url` /
  `og:image`, JSON-LD `@id` and `url` fields
- [`privacy.html`](privacy.html) — `<link rel="canonical">`, OG tags
- [`sitemap.xml`](sitemap.xml) — both `<loc>` entries
- [`robots.txt`](robots.txt) — the `Sitemap:` line

---

## 5. Contact details (phone, email, address)

All contact info is in [`src/site.js`](src/site.js). Search the file for the
current values and replace:

| Value | Found in |
|---|---|
| `hello@ohrsystems.ng` | Contact section, footer, JSON-LD |
| `+2348030655234` / `08030655234` | Contact section, footer, JSON-LD |
| `+234916771774` | Contact section, footer |
| `2349167717741` (WhatsApp) | `WHATSAPP_NUMBER` constant at top |
| `Queen Elizabeth Road, Mokola, Ibadan, Oyo State, Nigeria` | Contact `<address>` |

Also update the postal-address fields in the JSON-LD block in
[`index.html`](index.html) (look for `"@type": "LocalBusiness"`).

---

## 6. Copy (headlines, services, FAQs)

All content the user reads on the home page lives in [`src/site.js`](src/site.js):

- **Services** — the `services` array near the top. Three entries today; add or
  remove items here and the tabbed selector adjusts automatically.
- **FAQs** — the `faqs` array; each entry is `[question, answer]`.
- **Hero, About, Benefits, CTA band, Quote, Contact copy** — these are inline
  in the big template literal that starts with
  `` document.getElementById("root").innerHTML = `... `` ``. Search for the
  text you want to change and edit in place.

---

## 7. Spam protection

The contact form has four layered defences. You usually don't need to touch
any of these, but here's where they live so you can tune them:

1. **Web3Forms `botcheck` honeypot** — invisible checkbox; if a bot ticks it,
   Web3Forms drops the submission server-side. ([src/site.js](src/site.js), name `botcheck`)
2. **Custom honeypots** — two invisible fields named `website` and
   `email_confirm`. Real users never see them; bots auto-fill anything
   labelled "website" or "email". ([src/site.js](src/site.js))
3. **Time-trap** — submissions in less than 3 seconds after page render are
   silently rejected. Tune via the `MIN_FILL_SECONDS` constant.
4. **Rate limit** — the same browser can't submit twice within 60 seconds. Tune
   via `RATE_LIMIT_WINDOW_MS`.

Both honeypot conditions and the time-trap **pretend success** rather than
showing an error, so spam bots don't retry with adjusted strategies.

**If you want stronger protection** (visible CAPTCHA), add Cloudflare Turnstile:

1. Get a site key from [dash.cloudflare.com](https://dash.cloudflare.com) →
   Turnstile.
2. Add to the form (inside the `<form>` tag in [src/site.js](src/site.js)):
   ```html
   <div class="cf-turnstile" data-sitekey="YOUR_SITE_KEY"></div>
   ```
3. Add this `<script>` tag to [`index.html`](index.html) `<head>`:
   ```html
   <script src="https://challenges.cloudflare.com/turnstile/v0/api.js" defer></script>
   ```
4. Web3Forms reads the `cf-turnstile-response` field automatically.

---

## 8. Analytics consent banner

A privacy-friendly cookie banner shows on first visit. If the user clicks
**Accept**, GA4 loads. If they click **Decline** (or their browser sends the
Global Privacy Control signal), GA4 is never loaded.

- Reset for testing: open DevTools → Application → Local Storage → delete
  `ohr_consent`, refresh.
- Disable analytics entirely: leave `GA_MEASUREMENT_ID` as `"G-XXXXXXXXXX"`
  (the loader has a guard that skips loading when the ID is the placeholder).
- Change the banner copy or buttons: search [src/site.js](src/site.js) for
  `renderConsentBar`.

---

## 9. Deployment (Vercel)

The repo has a [`vercel.json`](vercel.json) with security headers and cache
rules. To deploy:

1. Push to GitHub.
2. In [vercel.com/new](https://vercel.com/new), import the repo.
3. Framework Preset: **Other** (it's a static site, no build command).
4. Output Directory: leave blank (Vercel serves the repo root).
5. Add your custom domain in Vercel → Project → Settings → Domains.

After the first deploy, run through [Google's Rich Results Test](https://search.google.com/test/rich-results)
and the [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
with your new URL to verify the OG image + JSON-LD are picked up.

---

## 10. Quick reference — files you'll edit most

| File | What it controls |
|---|---|
| [`src/site.js`](src/site.js) | All page copy, services list, FAQs, form behaviour, spam settings, contact details, secrets |
| [`styles.css`](styles.css) | All visual styling (colours, sizing, layout) |
| [`index.html`](index.html) | SEO meta, OG tags, JSON-LD, GA4 + Web3Forms preconnects |
| [`privacy.html`](privacy.html) | Privacy policy body copy |
| [`assets/og-image.jpg`](assets/og-image.jpg) | Social-share preview image |
| [`assets/logo-light.svg`](assets/logo-light.svg) / [`assets/logo-dark.svg`](assets/logo-dark.svg) | Brand mark |
| [`vercel.json`](vercel.json) | HTTP headers + caching for the deployed site |

---

## 11. Local development

Three preconfigured dev servers in [`.claude/launch.json`](.claude/launch.json):

- **`serve`** — zero-install static server on port 3000 (recommended)
- **`vercel dev`** — local Vercel runtime on port 3001 (honours `vercel.json`)
- **`python http.server`** — built-in Python static server on port 8000

Run any of them from the project root:

```bash
npx serve -l 3000 .
# or
npx vercel dev --listen 3001
# or
python -m http.server 8000
```

Then open the matching localhost URL.
