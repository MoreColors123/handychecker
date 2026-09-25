# Stack Research

**Domain:** Child-focused, German-language smartphone-safety website ("HandyChecker") — small static site with an installable home-screen "app" feel (PWA-style), zero backend, zero data collection
**Researched:** 2026-09-25
**Confidence:** MEDIUM (versions verified against the npm registry and official docs; the classification seam caps websearch-backed findings at MEDIUM, HIGH only where verified first-party)

## Recommended Stack (TL;DR)

| Layer | Choice | Version | Confidence | Why |
|-------|--------|---------|------------|-----|
| Static site generator | **Eleventy (11ty)** | **3.1.6** | HIGH (npm verified) | One shared template per topic + includes; emits plain HTML with **zero JS in the output**; Node ≥18; the standard minimal SSG for small multi-page sites |
| Runtime (build tool) | **Node.js** | **22 LTS** | HIGH | Eleventy requires ≥18; 22 is current LTS; npm ships with it |
| Output languages | **Semantic HTML5 + one hand-written CSS file + vanilla JS (ES2022)** | — | HIGH | No framework, no asset build step; quiz/tip interactivity is ~100 lines |
| PWA layer | **Web App Manifest + tiny cache-first service worker + PNG/SVG icons** | W3C manifest | HIGH (MDN Sep 2026) | The *only* thing that makes it feel like an installed app (see PWA checklist below) |
| Hosting | **GitHub Pages** (primary) / Cloudflare Pages (alternative) | free tiers | MEDIUM | Free, automatic HTTPS, no personal data processed; Cloudflare has no bandwidth cap, GH Pages ~100 GB/mo |
| Fonts | **System font stack** | — | HIGH (LG München ruling) | Zero third-party requests = the GDPR-safe baseline for a German site; system fonts cover all German umlauts |

---

## Core Technologies

| Technology | Version | Purpose | Why Recommended |
|------------|---------|---------|-----------------|
| Eleventy (`@11ty/eleventy`) | 3.1.6 | Static site generator (dev-only dependency) | One Nunjucks template renders all six topic pages from a JSON data file (facts, questions, tips per topic); includes give a shared header/nav/footer so adding topic #7 never touches the other pages; **output is pure HTML — no client-side framework, no JS runtime**, which matters for a tiny site a parent must maintain for years. Confirmed standard for "simple, stable, fast" small static sites (Sitepoint, CloudCannon, community consensus 2025–2026) |
| Node.js | 22 LTS | Local build/dev runtime | Eleventy 3.x requires Node ≥18 (verified via npm `engines`); 22 is the current LTS line. Needed only on the maintainer's machine, never on the server |
| Semantic HTML5 + CSS + vanilla JS | *none* (browser-native) | The actual site | `lang="de"` documents, one `styles.css` with design-token custom properties, one `app.js` (~100 lines) driving self-check questions and tip boxes. No library can make a 6-page German content site smaller than this |
| Web App Manifest (`manifest.webmanifest`) | W3C manifest spec | Installable "home-screen app" identity | Required members (`name`/`short_name`, `icons` incl. 192 px + 512 px, `start_url`, `display`, `prefer_related_applications: false`) are exactly what Chrome/Samsung Internet need to offer install (MDN, Sep 2026) |
| Service worker (`sw.js`) | — | Install-prompt trigger + light offline | Chrome still requires a **non-empty** `fetch()` handler before it fires the automatic install prompt (developer.chrome.com, 2023-12; empty/no-op handlers ignored since Chrome 112). A ~25-line cache-first worker satisfies this *and* lets her re-open already-visited pages offline (subway, no data) |
| GitHub Pages / Cloudflare Pages | free tier | Hosting behind a real URL | Free static hosting with automatic HTTPS (installability requires HTTPS). GitHub Pages: zero config, free for public repos, free custom domain via DNS (≈100 GB/mo soft cap). Cloudflare Pages: no bandwidth cap, EU data-residency option, no build-minutes limits. Both provide DPAs; for a site that processes no personal data either is GDPR-viable |

## Supporting Libraries

**Deliberate answer: none.** No JS framework, no CSS framework, no icons/emoji library, no animation library. The interactive surface (2–3 self-check components, tip-box toggles) is well under what vanilla code comfortably handles, and every dependency is a maintenance liability on a site built for one child.

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| *(none at runtime)* | — | — | Use a library only when a feature forces it; nothing here does |
| `html-validate` (optional, dev-only) | ^10 | Local HTML lint with `lang="de"`/accessibility feedback | Only if the maintainer wants automated QA; skip for v1 |

## Development Tools

| Tool | Purpose | Notes |
|------|---------|-------|
| Node.js 22 LTS + npm | Run Eleventy build/dev server | Only the maintainer needs it; the deployed site is plain files |
| `npx eleventy` | Build (`--serve` for local dev) | Output dir `_site/`; serve over `http://localhost:8080` (localhost is HTTPS-equivalent for PWA install checks) |
| Browser DevTools | Verify installability | Web App Manifest errors, service worker registration on the **Network → App**/Application tab; test offline via the Network panel |
| git + GitHub | Source control and deploy trigger | Push `_site/` output (or build on the host) — GitHub Pages can publish straight from the repo |
| Icon source (e.g. Maskable.app editor) | Generate safe-zone maskable icon | Keep artwork within the ~80% safe zone or Android renders a broken small-framed icon (community-confirmed) |

## Installation

```bash
# 1. Init a project (Node 22 LTS on the maintainer machine)
npm init -y

# 2. Eleventy is the ONLY dependency, and only at dev time
npm install -D @11ty/eleventy@3.1.6

# 3. Scripts (package.json)
#    "build": "eleventy",
#    "dev":   "eleventy --serve"

# 4. Local dev + build
npm run dev
npm run build      # → _site/  (pure static files)

# 5. Local quick preview of the built site (any of these)
npx serve _site
python -m http.server -d _site
```

Deploy: point GitHub Pages (or Cloudflare Pages/Netlify) at the repo, build command `npm ci && npm run build`, publish directory `_site`. Done — no servers, no databases, no accounts.

## PWA Checklist — "Home-Screen App" Feel (the key requirement)

Verified against **MDN *Making PWAs installable* (updated 2026-09-07)** and the **Chrome installability-criteria blog (2023-12, still current)**. This is not a nice-to-have list; these are the actual installability mechanics in 2026.

### Manifest (`manifest.webmanifest`, linked from every page)

```json
{
  "name": "HandyChecker",
  "short_name": "HandyChecker",
  "description": "Was dein Handy mit dir macht – und wie du gesünder damit umgehst.",
  "lang": "de",
  "start_url": "/",
  "scope": "/",
  "display": "standalone",
  "prefer_related_applications": false,
  "background_color": "#121826",
  "theme_color": "#121826",
  "icons": [
    { "src": "/icons/icon-192.png", "sizes": "192x192", "type": "image/png", "purpose": "any" },
    { "src": "/icons/icon-512.png", "sizes": "512x512", "type": "image/png", "purpose": "any" },
    { "src": "/icons/icon-maskable.svg", "sizes": "512x512", "type": "image/svg+xml", "purpose": "maskable" }
  ]
}
```

- **Required by Chromium** (MDN Sep 2026): `name` *or* `short_name`, `icons` **must contain a 192 px and a 512 px entry**, `start_url`, `display` (and/or `display_override`), and `prefer_related_applications` must be `false` or absent. Meet these and Chrome and Samsung Internet offer install from the menu (Chromium ≥108 mobile / ≥112 desktop) and from the Android install prompt.
- Nice-to-have that materially improves the Android install prompt: `description` and `screenshots` (both shown in the in-prompt UI on Android only).
- `display: "standalone"` = app window without browser chrome = the "app feel".
- `theme_color`/`background_color` should match the site's **dark, night-friendly** scheme (she reads in bed) so the splash + taskbar blend in.

### Icons

| File | Size | Purpose | Used by |
|------|------|---------|---------|
| `icon-192.png` | 192×192 | `any` | Required Chromium installability |
| `icon-512.png` | 512×512 | `any` | Required Chromium installability |
| `icon-maskable.svg` | 512×512 (SVG) | `maskable` | Adaptive Android home-screen icon; **artwork inside the ~80% safe zone** or Android renders a broken small-framed icon |
| `apple-touch-icon.png` | 180×180 | `<link rel="apple-touch-icon">` | iOS "Add to Home Screen" icon (Apple convention) |
| `favicon.svg` / `favicon-32.png` | 32×32 | classic favicon | Bookmarks, browsers |

Chrome/Firefox support SVG `maskable` icons (web.dev *Adaptive icon support*); Lighthouse even audits maskable support. PNG sizes beyond 512 are unnecessary here (192/512 + maskable SVG + apple-touch-icon covers every surface).

### Service worker (`sw.js`)

**Yes, include one — a tiny one.** Two reasons, both verified:

1. **Installability:** menu-install no longer needs a service worker (Chromium 108/112+), but Chrome's *automatic install-prompt algorithm still requires a `fetch()` handler* (developer.chrome.com 2023-12). Chrome **ignores empty/no-op handlers since v112**, so the handler must actually serve/cache — a cache-first worker qualifies.
2. **Real value:** network-first + cache-fallback means every previously visited page still opens offline (data-capped plan, subway, spotty Wi-Fi) — genuinely useful for a child.

~25 lines: on `install`, precache the CSS + manifest; on `fetch`, try network, fall back to cache for same-origin GETs; `self.skipWaiting()`-style version bump on change. Register with `navigator.serviceWorker.register('/sw.js')` on every page (root scope), only over HTTPS (installed GitHub Pages/Cloudflare Pages always serve HTTPS).

### iOS reality (2026)

- **"Add to Home Screen" works for *any* website** (Apple support): Share → Add to Home Screen. It does **not** require a manifest or service worker — but the manifest `icons` + `apple-touch-icon` control which icon and name she sees. This alone *guarantees* the home-screen app feel on an iPhone.
- iOS 16.4+ can install PWAs from the Share menu in any browser (MDN); iOS 26 can turn any website into a PWA from the home-screen icon.
- **Optimization flag:** iOS 17.4 (EU β) reportedly disabled browser PWA installation (DMA context) and the final EU behavior is uncertain as of 2026 — treat *standalone app window* on iOS as best-effort and *home-screen shortcut* as the guaranteed experience. Android Chrome (with Google Mobile Services) is where the full install/WebAPK experience lands.

### Keep it minimal — what the PWA layer must NOT include

- No push notifications (creepy for a child; privacy-hostile)
- No `screenshots` of personal data (optional, Android-only; fine to add a generic screenshot)
- No analytics/tracking of app usage — the site must stay free of *any* data collection
- Optional only: an in-page "Zum Startbildschirm hinzufügen" button via `beforeinstallprompt` (Android-only API; **not supported on iOS** — progressive enhancement, don't gate anything on it)

---

## Alternatives Considered

| Recommended | Alternative | When to Use Alternative |
|-------------|-------------|-------------------------|
| Eleventy 3.1.6 | **Astro 7.3.5** | Only if the site grows into many interactive components/Svelte-style islands. Astro is excellent but drags in a Vite/esbuild toolchain and **requires Node ≥22.12** (npm `engines`, verified) — heavy for 8 pages of German content |
| Eleventy 3.1.6 | **Hugo** | If the maintainer hates Node and prefers a single Go binary. Hugo is fast and fine; Eleventy's Nunjucks includes + JS data files fit the "6 topics from one template" content model more naturally for a JS-literate parent |
| Eleventy 3.1.6 | **Plain hand-written HTML only** | Acceptable at ≤4 pages with no shared nav. At 6 topics + tip boxes + a quiz component, duplicated headers/nav/footers across pages already hurt — includes pay for themselves immediately |
| Hand-written CSS | **Tailwind CSS 4.3.3** | When a team iterates rapidly on large UIs. For a 10-file branded site it adds a build step and class noise into hand-authored German templates for zero benefit (2025–2026 hands-on write-ups converge on this) |
| GitHub Pages | **Cloudflare Pages** | Prefer Cloudflare if you want no bandwidth cap, EU data residency, or integrated KV/analytics-free edge features. Prefer GitHub Pages for zero-config deploys from an existing GitHub repo |
| GitHub Pages / Cloudflare Pages | **Netlify** | Netlify's free tier is fine (has DPAs + great DX) but it *pauses the site when the free bandwidth allowance is exceeded*, which the other two don't — a real consideration for a site shared with a school class |
| System font stack | **Self-hosted WOFF2 font** (e.g., a rounded, kid-friendly open font) | Only if the design truly needs a distinctive display face: self-host the `.woff2` (never a CDN), subset to the Latin/German charset, keep the total self-hosted font files ≤2. Default = system stack, zero risk |
| System font stack | **Google Fonts / any webfont CDN** | **Never.** LG München (3 O 17493/20, Jan 2022): serving Google-hosted fonts transmits the visitor's IP address to Google = GDPR/DSGVO violation; ordered damages + €250k threat for non-compliance. For a German children's site this is disqualifying, not debatable |

## What NOT to Use

| Avoid | Why | Use Instead |
|-------|-----|-------------|
| React / Vue / Svelte / HTMX frameworks | A 6-page informational site needs no client framework; every dependency is future maintenance | Semantic HTML + ~100 lines of vanilla JS |
| Tailwind CSS | Build step + utility-class noise in German content templates; no scale that justifies it | One hand-written `styles.css` with CSS custom-property design tokens |
| Google Fonts, Adobe Fonts, any CDN-hosted font | LG München ruling: IP transmission to a US provider = DSGVO violation; site is aimed at a German child | System font stack (fully covers German umlauts); optional self-hosted WOFF2 |
| Google Analytics, Plausible, Matomo, any analytics | Project requirement: zero data collection. Analytics on a child's site needs consent she can't meaningfully give | Nothing — ship with zero third-party requests; hosting logs suffice |
| Cookies, localStorage/session-state persistence | Unnecessary; cleanliness for a shared family device | Quiz/tip state lives in memory for the current visit; nothing stored, nothing to clear |
| PWABuilder packaging / app stores | Explicitly out of scope; the project wants a bookmarkable URL + home-screen feel, not Play Store listing | Manifest + service worker + home-screen install |
| CMS (WordPress, Decap/Netlify CMS, a headless CMS) | Content is hand-authored German text in Markdown/JSON; a CMS is a second system to maintain | Eleventy data files (JSON) + Markdown |
| Server-side anything (Node server, functions, forms, databases) | No backend per requirements; static host is simpler and free | Static files only |

## Stack Patterns by Variant

**If the target device is Android (Chrome with Google Mobile Services):**
- Invest in the maskable icon (safe zone) + the non-empty service worker — this is the device class that delivers the full "it's a real app" install/WebAPK experience, including the automatic install prompt.

**If the target device is an iPhone:**
- Rely on Share → "Add to Home Screen" (works for any site) as the guaranteed path; polish the icon via manifest + `apple-touch-icon`; treat standalone-window install as best-effort (iOS EU install behavior is uncertain post-17.4).

**If the maintainer wants zero Node tooling:**
- Plain HTML/CSS/JS is defensible at ≤4 pages but not at 6 topics with shared nav — the Eleventy install is one `npm install -D` and one template; keep Eleventy.

**If a topic's content grows (quizzes, more tips):**
- Keep the data-driven model: topics live in `_data/topics.json` (facts/questions/tips), one `topics.njk` template renders every page. Adding topic #7 = adding JSON entries, not a new page.

**German-specific pages (cheap, static):**
- Add minimal `/impressum/` and `/datenschutz/` static pages — standard practice for German sites even when not legally mandatory; they are just two more Eleventy templates, and they make the "no data collection" claim explicit in German (`"Diese Seite speichert keine Daten und nutzt keine Cookies."`).

**Progressive enhancement (school/library computers):**
- Build the self-check as semantic, keyboard-accessible markup that works before JS; `app.js` only upgrades it (reveal answers, score the quiz). No-JS visitors still get the facts.

## Version Compatibility

| Package | Compatible With | Notes |
|---------|-----------------|-------|
| `@11ty/eleventy@3.1.6` | Node ≥18 (npm `engines` verified); Node 22 LTS recommended | Current release Sep 2026; zero runtime JS in output |
| `astro@7.3.5` | Node ≥22.12 (npm `engines` verified) | Avoided here — toolchain weight + Node floor |
| `tailwindcss@4.3.3` | — | Avoided here; listed only for currency (Rust-powered v4 line, Jan 2025+) |
| Service worker behavior | Chrome ≥108 mobile / ≥112 desktop: menu-install without SW; ≥112 ignores empty/no-op SW | Non-empty cache-first handler still needed for the *automatic install prompt* |
| iOS install | iOS ≥16.4 (Share-menu install); Safari 17+ macOS "Add to Dock"; iOS 26 site→PWA | All best-effort standalone; home-screen shortcut universal |
| Manifest | Chromium requires `name`/`short_name`, 192+512 px icons, `start_url`, `display`, `prefer_related_applications:false` (MDN Sep 2026) | HTTPS mandatory for installability |

## Sources

| Source | What was verified | Confidence |
|--------|-------------------|------------|
| npm registry (`registry.npmjs.org/@11ty/eleventy/latest`, `astro/latest`, `tailwindcss/latest`) | Current versions + Node `engines` floors: Eleventy **3.1.6**, Astro **7.3.5**, Tailwind **4.3.3** | HIGH — authoritative, fetched this session |
| MDN — *Making PWAs installable* (updated 2026-09-07, fetched) | Required manifest members, HTTPS requirement, browser support incl. iOS ≥16.4, SW not required for installability | HIGH — first-party docs |
| developer.chrome.com — *Revisiting Chrome's installability criteria* (2023-12, fetched) | Menu-install no longer needs SW fetch handler (108/112+); automatic prompt still does; empty handlers ignored | HIGH — first-party blog |
| MDN — *Define app icons* + web.dev *Adaptive icon support (maskable)* + Lighthouse `maskable-icon-audit` | Icon sizes (192/512), SVG maskable support, safe zone | MEDIUM — docs + community confirmation |
| Apple support — *Turn a website into an app in Safari on iPhone* | "Add to Home Screen" for any website | MEDIUM — vendor help doc |
| LG München 3 O 17493/20 (via activemind.legal, dr-dsgvo.de, decoded.legal, The Register, bitdefender) | Google Fonts → IP transfer → GDPR violation, €100 damages, cease-and-desist | MEDIUM — multiple independent legal analyses agree |
| pressless.io — *We Hosted the Same Site on All 4 Free Hosts in 2026* + freetiers.com + CloudCannon | Free-tier bandwidth/caps: Cloudflare Pages no cap; GitHub Pages ~100 GB/mo; Netlify pauses on overage | MEDIUM — hands-on comparison |
| W3C WCAG 2.2 SC 2.5.8 (Understanding), digital.gov *Size fonts and tap targets*, web.dev *Accessible tap targets* | 24 px SC 2.5.8 AA / 44–48 px practical floor, 16 px base font, reduced-motion, focus visibility | MEDIUM — standards + gov/Google guide |
| 11ty.dev, Sitepoint, CloudCannon Eleventy-vs-Hugo | Eleventy's simplicity/stability positioning for small sites | MEDIUM — docs + reviews |

---

*Stack research for: child-focused German-language smartphone-safety static website (HandyChecker)*
*Researched: 2026-09-25*