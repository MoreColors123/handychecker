# Architecture Research

**Domain:** Small German-language informational PWA website for children (10–12) about smartphone overuse
**Researched:** 2026-09-25
**Confidence:** HIGH (core static-site pattern is a solved problem; PWA install specifics cross-checked across MDN, web.dev, Chrome docs, and iOS-focused guides)

## Standard Architecture

The site has exactly three "machines": a static file host, a browser, and one hand-written JavaScript enhancer. There is no server-side logic, no database, no accounts, and — by design — no outbound data. Everything the child interacts with (quizzes, tip boxes) exists in the page itself.

### System Overview

```
┌──────────────────────────────────────────────────────────────────────┐
│                    FREE STATIC HOST (GitHub Pages / Netlify)          │
│                    HTTPS-only, serves pre-built files                 │
│  ┌────────────────────────────────────────────────────────────────┐  │
│  │  Static files (the entire product)                              │  │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────────────┐  │  │
│  │  │  Content      │  │  Assets       │  │  PWA shell           │  │  │
│  │  │  index.html   │  │  css/ (tokens │  │  manifest.webmanifest│  │  │
│  │  │  themen/*/    │  │  + components)│  │  icons/ (192, 512,   │  │  │
│  │  │  index.html   │  │  js/ (quiz.js,│  │  apple-touch-icon)   │  │  │
│  │  │  (6 topics)   │  │  install.js)  │  │  sw.js (Phase D)     │  │  │
│  │  │  404.html     │  │  fonts/ (opt) │  │                      │  │  │
│  │  └──────────────┘  └──────────────┘  └──────────────────────┘  │  │
│  └────────────────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────────────────┘
        │  HTTPS GET (only network traffic that ever happens)
        ▼
┌──────────────────────────────────────────────────────────────────────┐
│                        BROWSER ON HER PHONE                          │
│  ┌───────────────┐   ┌────────────────────┐   ┌──────────────────┐   │
│  │ Home screen   │   │ Page render        │   │ quiz.js          │   │
│  │ (installed    │──▶│ topics / facts /   │──▶│ reads DOM, writes│   │
│  │  via manifest)│   │ tip boxes          │   │ feedback region  │   │
│  └───────────────┘   └────────────────────┘   └──────────────────┘   │
│                     all interaction stays on-device; nothing uploads │
└──────────────────────────────────────────────────────────────────────┘
```

Key architectural truth: **the "backend" is a folder of files on a free CDN.** Every future-feature question ("can we add X?") should be answered against that constraint before anything else.

### Component Responsibilities

| Component | Responsibility | Typical Implementation |
|-----------|----------------|------------------------|
| Content pages | All German text: 6 topic pages + home + 404 | Hand-written static HTML, one folder per topic (`themen/<slug>/index.html`) — no templating engine |
| Design system | Look & feel, reading comfort for 10–12, mobile-first layout | `css/tokens.css` (colors, spacing, type scale) + `css/site.css` (layout, components: cards, tip boxes, quiz) — plain CSS, no framework |
| Self-check widget | Turns quiz HTML into an interactive question | `js/quiz.js` — single generic vanilla-JS enhancer; zero frameworks, zero network |
| Tip boxes ("Das kannst du tun") | Present actionable advice; no JS needed | HTML `<details>/<summary>` styled via `site.css`; progressively enhanced content that opens/closes natively |
| PWA identity | Home-screen install on Android + iOS | `manifest.webmanifest` (Android/Chrome) + `apple-touch-icon` + `apple-mobile-web-app-*` meta tags (iOS) + `icons/` |
| Offline cache (optional, Phase D) | Lets her read the site without data | `sw.js` — ~20-line service worker with runtime caching; versioned cache name |
| Static host | Serve files over HTTPS for free, real URL | GitHub Pages (git-push) or Netlify Drop (drag-and-drop) — both free, both HTTPS |

## Recommended Project Structure

Chosen so that each of the six topics is *identical in shape* (a proven template copied and filled with new content) and so a migration to a generator later (if the site grows) is a one-to-one folder mapping.

```
handychecker/
├── index.html                    # Home: friendly intro + 6 topic cards + install hint
├── manifest.webmanifest          # PWA installability (name, icons, start_url, display)
├── sw.js                         # Optional offline runtime caching (Phase D, ~20 lines)
├── 404.html                      # Friendly German "hmm, hier stimmt was nicht" page
├── themen/                       # Six topic pages, one folder each (clean shareable URLs)
│   ├── bildschirmzeit/index.html # Screen time & balance
│   ├── schlaf/index.html         # Sleep
│   ├── aufmerksamkeit/index.html # Attention & focus
│   ├── koerper/index.html        # Body effects (posture, eyes)
│   ├── gefuehle/index.html       # Social media & feelings (comparison, FOMO)
│   └── privat/index.html         # Privacy & data
├── css/
│   ├── tokens.css                # Design tokens: colors, spacing, type scale (single source of truth)
│   └── site.css                  # Layout + components (cards, nav, tip boxes, quiz, buttons)
├── js/
│   ├── quiz.js                   # Generic self-check enhancer (reads data-attributes, vanilla)
│   └── install.js                # Gentle one-time iOS "Add to Home Screen" hint (only widget with logic variation)
├── icons/
│   ├── icon-192.png              # Required by manifest installability criteria
│   ├── icon-512.png              # Required by manifest installability criteria
│   ├── icon-512-maskable.png     # Safe-zone icon for Android
│   └── apple-touch-icon.png      # 180×180 — iOS uses THIS, not the manifest icons
├── fonts/                        # Only if a self-hosted webfont is added (keep optional)
└── _templates/                   # NOT deployed: canonical reference page + header/footer snippets
                                   # for copy-paste when authoring new topics (see Pattern 2)
```

### Structure Rationale

- **`themen/<slug>/index.html` — one folder per topic:** gives every topic its own shareable URL (she sends `…/schlaf/` to a friend), keeps each topic self-contained, and makes a future static-generator migration mechanical (folder → data file).
- **`css/tokens.css` separate from `site.css`:** tokens are the only thing that should stay consistent site-wide (the visual identity); components can evolve per page. A 10-year-old shouldn't see a site that changes color from page to page.
- **`js/quiz.js` as the only real logic file:** all six quizzes are the *same widget* fed by different content. One generic enhancer instead of six bespoke scripts — this is the site's biggest duplication risk (see Anti-Pattern 4).
- **`_templates/` kept out of the served root:** it documents the "component API" (which sections a topic page has, in which order) without shipping it. If the parent later chooses Eleventy, this folder becomes the layout.
- **`icons/` has both manifest icons AND `apple-touch-icon.png`:** iOS ignores the manifest icon for home-screen install; without the apple-touch-icon the phone renders a blurry screenshot instead. This is a *must*, not a nice-to-have, because the target device is likely an iPhone.

## Architectural Patterns

### Pattern 1: Progressive Enhancement for Widgets

**What:** Interactive elements are authored as plain, semantic HTML that works without JavaScript (radios and labels, `<details>` tip boxes). A single generic script then *enhances* them in place. No JS = content still readable and answerable; JS on = instant feedback.
**When to use:** Always here. The child's phone may be old, on a slow connection, or have JS hiccups; the content must never depend on a script to be seen.
**Trade-offs:** Slightly more HTML markup per question vs. a JS-rendered widget; in exchange the parent can edit quiz content in plain HTML without touching JS, and SEO/accessibility get fully static content.

**Example:**
```html
<!-- in themen/schlaf/index.html — the "Check dich selbst" section -->
<section class="selfcheck" data-quiz="schlaf">
  <h2>Check dich selbst</h2>

  <div class="quiz-q" data-correct="a">
    <p class="quiz-q__text">Wie viel Schlaf brauchst du ungefähr in deinem Alter?</p>
    <label><input type="radio" name="q-schlaf-1" value="a"> 9–11 Stunden</label>
    <label><input type="radio" name="q-schlaf-1" value="b"> 4–5 Stunden</label>
    <label><input type="radio" name="q-schlaf-1" value="c"> Das ist ganz egal</label>
    <button type="button" class="quiz-q__check" hidden>Antwort prüfen</button>
    <p class="quiz-q__feedback" aria-live="polite" hidden></p>
  </div>
  <!-- …2–4 more questions… -->
</section>
```

```javascript
// js/quiz.js — ONE file serves all six topics
document.querySelectorAll('.quiz-q').forEach((q) => {
  const check = q.querySelector('.quiz-q__check');
  const fb = q.querySelector('.quiz-q__feedback');
  check.hidden = false;
  check.addEventListener('click', () => {
    const chosen = q.querySelector('input[type="radio"]:checked');
    const correct = chosen && chosen.value === q.dataset.correct;
    fb.hidden = false;
    // Friendly-guide tone, never "Falsch!" — see PROJECT.md voice decision
    fb.textContent = correct
      ? 'Genau richtig! Stark, dass du das weißt. 💪'
      : 'Na, fast! Lies den Tipp unten nochmal – dann klappt es beim nächsten Mal.';
  });
});
```

### Pattern 2: "Canonical Template + Copy" as the Component System

**What:** Since there's no build step, the component system is a *discipline*: one fully-built topic page lives in `_templates/` as the canonical example of every section (hero, facts, selfcheck, tips, "weiter geht's"). New topics are created by copying it and swapping content — headers, footer, nav, and section order never get re-designed per page.
**When to use:** 2–8 near-identical pages with a single author. This is the exact "start simple, add tooling when it hurts" threshold: copy-paste is tolerable up to roughly a dozen pages.
**Trade-offs:** Manual sync of header/footer changes across 7–8 files (a 30-second find-replace). Less elegant than a real template engine, but zero toolchain, zero build, and zero maintenance burden. The moment this hurts more than a generator costs, the folder structure above maps 1:1 onto Eleventy/Astro (per-topic folders become layouts + content files).

### Pattern 3: Data Lives in the HTML, Logic Is Generic

**What:** All quiz content (questions, answers, correct values, feedback snippets) lives in the markup; `quiz.js` contains no site-specific content. The same holds for tip boxes (pure HTML) and facts (pure HTML).
**When to use:** Any content the parent will edit — text belongs with text, not in JavaScript strings or a data layer that doesn't exist.
**Trade-offs:** The visible `data-correct` attribute is "cheating-visible" to anyone reading source — irrelevant here, since there's no scoring to protect and a kid inspecting the page is a great sign.

## Data Flow

### Request Flow

```
[She taps the home-screen icon or opens a link]
    ↓ (standalone window; start_url from manifest)
[Static host (HTTPS)]  ── serves the pre-built file for that path ──▶  [Browser]
    ↓                                                                     ↓
[HTML parses] ──▶ [css/ applies design system] ──▶ [quiz.js enhances .quiz-q]
                                                                           ↓
                                                   [Feedback appears in aria-live region]
                                                   NOTHING is uploaded. No cookies.
                                                   No analytics. No localStorage.
```

### State Management

There is none, and that is deliberate. No quiz progress, no "days since…" counters, no persisted scores. Each visit is a fresh, judgment-free session. Persisting anything would (a) violate the no-data-collection privacy constraint and (b) create the dossier-feel that contradicts the friendly-guide voice.

### Key Data Flows

1. **Content-to-screen (one-way):** static files → browser render. The only data flow that exists.
2. **Widget interaction (stays on-device):** her click → `quiz.js` reads the checked radio + `data-correct` → writes one string into the feedback element. No network, no storage, no state.
3. **Install flow (browser-mediated):** browser reads `manifest.webmanifest` (Android: automatic install prompt) or she uses Safari's Share → "Zum Home-Bildschirm" (iOS: manual, no prompt exists) → icon + title come from `apple-touch-icon.png` and `apple-mobile-web-app-title` → subsequent opens are a standalone window. Mitigated by `install.js` showing a gentle one-time hint on iOS (AirBnB-style instruction card, not a nagging banner).

## Scaling Considerations

| Scale | Architecture Adjustments |
|-------|--------------------------|
| 1–100 readers (her, friends, class) | None. Plain static files on a free host. This is the entire design target. |
| 100–10k readers (goes mildly viral in German schools) | Still none architecturally — static files ride CDN edges for free on both suggested hosts. Only watch-free-tier bandwidth if she tells a whole school. |
| 10k–100k+ readers | Optionally move to Cloudflare Pages and enable custom caching headers. Still zero backend. This site will *never* need dynamic infrastructure unless the goal changes. |

### Scaling Priorities

1. **First bottleneck — content staleness, not load:** the site fails only if the parent stops updating it. Keep the authoring path this simple (edit HTML, push, done) or it won't get refreshed.
2. **Second bottleneck — asset bloat:** heavy images/fonts on a child's low-end phone. Keep the whole site well under ~1 MB first paint; self-host any font as WOFF2.
3. **Third bottleneck — service-worker cache staleness:** a cache-first SW can serve a stale page forever. Version the cache name on every release (or use runtime caching, see Pattern in Phase D) so fresh content actually reaches the phone.

## Anti-Patterns

### Anti-Pattern 1: A JavaScript Framework (React/Vue/Astro/Next) for 8 Pages

**What people do:** Reach for the tool they know; scaffold a SPA for a content site.
**Why it's wrong:** Adds a 100+ MB node_modules, a build pipeline, bundle weight on a child's phone, and a 1.8 GiB toolchain footprint *just to serve text*. Every security/maintenance update becomes a chore; the site's entire selling point is "fire and forget".
**Do this instead:** Hand-written HTML/CSS/JS. If the parent prefers writing Markdown, add Eleventy (a single `npx eleventy` build) — but only when the pain of editing raw HTML actually appears.

### Anti-Pattern 2: A Quiz "Engine" with Scores, Leaderboards, and Progress Persistence

**What people do:** Treat self-check questions as gamification — scoring, streaks, storage of results.
**Why it's wrong:** Contradicts the friendly-guide/core-value ("never a lecture" — a scoreboard *is* a lecture), invites data-collection creep on a child-aimed site, and multiplies logic for zero learning value.
**Do this instead:** Per-question gentle feedback, no aggregate score, nothing stored. The feedback itself *is* the lesson (Pattern 1).

### Anti-Pattern 3: Third-Party Requests (Analytics, CDN Fonts, Comment Widgets, Ad Scripts)

**What people do:** Drop in Google Analytics, hosted fonts, a Disqus widget — because every marketing tutorial says so.
**Why it's wrong:** A child-focused German site with an explicit no-data-collection constraint has no business firing requests to third parties (GDPR/DSGVO optics aside, it's simply against the stated privacy promise). It also slows the phone.
**Do this instead:** Zero external requests. System font stack or self-hosted WOFF2; no analytics (or a privacy-respecting log-free static host if the parent insists on "visited counts" — which is unnecessary).

### Anti-Pattern 4: Six Bespoke Quiz Implementations

**What people do:** Copy the first quiz's JS into topic 2, tweak it, then topics 3–6 diverge; fixing a bug means fixing it six times.
**Why it's wrong:** Guaranteed drift, six times the maintenance.
**Do this instead:** One `quiz.js`, data-driven via `data-*` attributes in the HTML (Pattern 1). New topic = new markup, zero new code.

### Anti-Pattern 5: Forgetting iOS Install Metadata

**What people do:** Install the PWA on Android in testing, ship it, then the iPhone shows a tiny screenshot thumbnail and the site opens with Safari chrome.
**Why it's wrong:** The actual target device is most likely an iPhone; Android-success ≠ iOS-success. No `apple-touch-icon` means iOS renders the page's screenshot as the icon; no `apple-mobile-web-app-capable` means it opens in the Safari tab, not a fullscreen app.
**Do this instead:** Ship `apple-touch-icon.png` (180×180) + `apple-mobile-web-app-capable`, `apple-mobile-web-app-title`, and `apple-mobile-web-app-status-bar-style` meta tags from the first deploy, and test "Zum Home-Bildschirm" on a real iOS device before calling the PWA done.

### Anti-Pattern 6: One Giant Scrolling Page for All Six Topics

**What people do:** Pick "one-pager" (which genuinely wins for landing pages) and stack six topics vertically.
**Why it's wrong:** Research consistently favors single-page for *short* sites; with six distinct topics × facts × quizzes × tips, the page becomes an un-findable wall of scroll — and she can't send a friend the *sleep* page, only "scroll down a lot in this one URL".
**Do this instead:** Home = short index of six clickable cards (the "one-pager" convenience); each topic = its own short page with sticky section nav. Shareability (a stated requirement) demands topic-level URLs.

### Anti-Pattern 7: LocalStorage "Progress" or "Reminders"

**What people do:** Persist quiz completions, or schedule nudge notifications.
**Why it's wrong:** Even benign on-device persistence is a foot in the door toward tracking behavior, and web push on iOS isn't supported anyway. A parental-built site that snoops (even locally) breaks trust and scope.
**Do this instead:** Stateless by design. Her reward is reading and feeling informed, not a fake progress bar.

## Integration Points

### External Services

| Service | Integration Pattern | Notes |
|---------|---------------------|-------|
| GitHub Pages | Git push → `docs/` or root of repo; HTTPS auto | Free, needs a GitHub account; URLs `user.github.io/handychecker/` (custom .de domain optional, ~10 €/yr) |
| Netlify Drop | Drag-and-drop the folder; HTTPS auto | Free tier generous (100 GB/mo bandwidth); slightly friendlier for a non-git deploy |
| (Nothing else) | — | No analytics, no fonts CDN, no comment service. The architecture's privacy story is enforced by *absence*. |

### Internal Boundaries

| Boundary | Communication | Notes |
|----------|---------------|-------|
| Pages ↔ `site.css` | Class names defined in `tokens.css`/`site.css` | Keep section/component class names stable across topic pages (Pattern 2). Renaming a class = touch every page |
| `themen/*` ↔ `quiz.js` | `data-quiz` / `data-correct` attributes | Contract: quiz.js is generic; all content lives in HTML. Don't start hard-coding topic names in the script |
| `manifest.webmanifest` ↔ `icons/` | File paths in manifest | Icon files must exist exactly where referenced; missing 192/512 = no install prompt on Android |
| `index.html`/`theme pages` ↔ `apple-touch-icon.png` | `<link rel="apple-touch-icon">` in `<head>` | iOS reads this, not the manifest; only needed if she's on iPhone — include it anyway (cost is one file) |
| `sw.js` ↔ static assets (Phase D) | Cache list + runtime cache fallback | Never rely on a hand-maintained precache list alone; new pages must be cached on first visit via runtime caching or they'll never work offline |

## Build Order (Roadmap Implications)

The build is a dependency chain: the shell must exist before widgets have anything to enhance, one topic must be *perfect* before the other five clone it.

1. **Phase 1 — Foundation shell & PWA identity.** Folder structure, `tokens.css` + `site.css` start, home page with six topic cards, manifest + all icons + iOS meta tags, 404, deploy to the free host. *Everything depends on this; installability ships on day one so the "app feel" is testable from the start.*
2. **Phase 2 — Widget layer + one reference topic.** `quiz.js`, tip-box component, `install.js`; build the first topic page end-to-end (print-quality template: hero → facts → selfcheck → tips → next link). *Defines the component contract that topics 2–6 will copy; walk it past the child before mass-producing.*
3. **Phase 3 — Content build-out.** Clone the reference template for the remaining five topics; author all German content and quizzes. *Depends on Phase 2's stable template; pure content work — can be spread over weeks with zero architecture risk.*
4. **Phase 4 — Offline, polish, real-device QA.** `sw.js` runtime caching (cache-name versioned per release), iOS/Android install-path verification on a real phone, accessibility + reading-level pass, share-link check (e.g., WhatsApp link previews need OG meta tags — add them here or in Phase 1). *SW wants the final asset inventory (Phase 3) but is independent of Phase 2's contract.*

**Phase ordering rationale:**
- Foundation first because every later phase renders inside the shell and deploy pipeline.
- Exactly one topic before the other five because it converts "how should a page look and behave?" into a copyable artifact — the highest-leverage de-risking step in the whole project.
- Offline last because it's the only phase with a second-order failure mode (cache staleness) and it benefits from a settled file list.
- `install.js` (iOS hint) could move to Phase 1 as a stub if the parent wants the install story complete early — but a dummy version nagging a 10-year-old before content exists is worse than none; build it after Phase 2 proves the page is worth installing.

**Research flags for phases:**
- Phase 1: No research needed — standard manifest/HTTPS setup, well-documented.
- Phase 2: Needs a child-appropriate reading-level and feedback-tone pass (content dimension, not architecture); quiz UX (button- vs immediate-feedback) worth a quick prototype test with the actual child.
- Phase 3: Pure content authoring — the only "research" is writing German copy at the right Lesestufe.
- Phase 4: Service worker caching strategy (cache-first-with-versioning vs network-first-for-HTML) deserves a decision at plan time; real-device iOS testing is mandatory and cannot be simulated.

## Sources

- Making PWAs installable — MDN (manifest members required; service worker explicitly *not* an installability requirement) — MEDIUM (cross-checked)
- What does it take to be installable? — web.dev (install criteria incl. 192px + 512px icons, display modes) — MEDIUM (cross-checked)
- Web app manifest does not meet installability requirements — Chrome for Developers / Lighthouse — MEDIUM
- Getting 'Save to Home Screen' to Kinda Work on iOS — naildrivin5.com (apple-touch-icon sizes, apple-mobile-web-app-* meta tags, viewport) — MEDIUM
- PWA iOS Limitations and Safari Support 2026 — MagicBell (no automatic install prompt on iOS; manual Share-menu flow; service worker matrix) — MEDIUM
- The theory versus the practice of "static websites" — Hacker News (2023) + alexwlchan "How I create static websites for tiny archives" (2025) + SimplyStatic "How to Start Building a Static Website" (2026) — MEDIUM (consensus: plain HTML/CSS/JS is the right default for tiny sites; add tooling only when repetition hurts)
- One-page vs multi-page site analyses — UX StackExchange, Network Solutions, ICDSoft, Slickplan — MEDIUM (single-page wins on mobile *for short content*; distinct topic areas favor separate URLs)
- Simple JavaScript Quiz tutorial — SitePoint (static-site quiz mechanics; question array / DOM traversal, no backend) — MEDIUM

---
*Architecture research for: HandyChecker (child-focused smartphone-safety website, German)*
*Researched: 2026-09-25*