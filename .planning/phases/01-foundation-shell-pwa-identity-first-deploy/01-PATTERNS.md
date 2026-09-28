# Phase 1: Foundation Shell, PWA Identity & First Deploy - Pattern Map

**Mapped:** 2026-09-28
**Files analyzed:** 19 new files (0 modified — greenfield repo)
**Analogs found:** 0 / 19 — **no existing codebase analogs exist**

## Greenfield Status (verified)

`git ls-files` at repo root returns **only** `.planning/` documents and `AGENTS.md`. A source-extension glob
(`**/*.{njk,webmanifest,css,js,json,yaml,yml,svg,png}`) returns zero files. There is **no existing source code
to copy patterns from** — every file below is net-new, and every analog slot reads **none (greenfield)**.

Per the tracked-source gate (#3645): no analog paths are emitted at all, so no mirror/gitignored-path risk exists.

**Consequence for the planner:** instead of existing-code excerpts, the pattern anchors are the **verified,
executed code examples in `01-RESEARCH.md`** (lines 279–483) — the exact config/templates/data/manifest/CSS that
built cleanly under Eleventy 3.1.6 in a temp scaffold this session. The planner should lift these verbatim and
treat the "Adopted Patterns" section below as the de-facto analog. Do **not** copy the older `STACK.md` manifest
example (dark `#121826`, absolute `/icons/...` paths) — it is explicitly superseded (RESEARCH.md lines 11, 200, 496).

## File Classification

**Legend — Role:** template = Nunjucks page view · data = JSON data source · config = build/deploy/identity config · asset = binary/vector file · style = stylesheet · CI = automation workflow
**Legend — Data Flow:** transform = build-time processing · request-response = static page delivery · file-I/O = generation pipeline · event-driven = git-push trigger

| New File | Role | Data Flow | Closest Analog | Match Quality |
|----------|------|-----------|----------------|---------------|
| `eleventy.config.js` | config | transform | none (greenfield) | — |
| `package.json` | config | transform | none (greenfield) | — |
| `.gitignore` | config | config | none (greenfield) | — |
| `.github/workflows/deploy.yml` | CI | event-driven | none (greenfield) | — |
| `src/_data/site.json` | data | data-file | none (greenfield) | — |
| `src/index.njk` | template | request-response | none (greenfield) | — |
| `src/impressum.njk` | template | request-response | none (greenfield) | — |
| `src/datenschutz.njk` | template | request-response | none (greenfield) | — |
| `src/404.njk` | template | request-response | none (greenfield) | — |
| `src/manifest.webmanifest` | config | request-response | none (greenfield) | — |
| `src/icons/happi-source.svg` | asset | file-I/O | none (greenfield) | — |
| `src/icons/icon-512.png` | asset | file-I/O | none (greenfield) | — |
| `src/icons/icon-192.png` | asset | file-I/O | none (greenfield) | — |
| `src/icons/icon-maskable.svg` | asset | file-I/O | none (greenfield) | — |
| `src/icons/apple-touch-icon.png` | asset | file-I/O | none (greenfield) | — |
| `src/icons/favicon.svg` | asset | file-I/O | none (greenfield) | — |
| `src/icons/favicon-32.png` | asset | file-I/O | none (greenfield) | — |
| `src/css/tokens.css` | style | transform | none (greenfield) | — |
| `src/css/site.css` | style | transform | none (greenfield) | — |

**Not in Phase 1 (explicitly out):** `src/_includes/` partials (research marks "(Phase 2)"), `src/themen/<slug>/index.njk`
(Phase 2/3 — Phase 1 cards only *link* to the URLs), service worker `sw.js` (Phase 4 decision, default no-SW), `.nojekyll`
(not needed with the `upload-pages-artifact` workflow — RESEARCH.md Anti-Patterns). The shared footer that Pattern 4
requires is inlined per-template in Phase 1 (as the research examples do); if the planner prefers a shared include now,
that is a sanctioned convenience, not a pattern break.

## Pattern Assignments

> All excerpts below are the **verified-executed** patterns from `01-RESEARCH.md` (built successfully this session on
> Eleventy 3.1.6). Line numbers refer to `01-RESEARCH.md`, the canonical reference for this phase.

---

### `eleventy.config.js` (config, transform)

**Adopted from:** `01-RESEARCH.md` lines 279–294 (executed, working) — this is the whole file shape.

Imports/boilerplate — CommonJS module exporting the config function (ESM `.mjs` also supported, CJS chosen):

```javascript
// Eleventy 3.1.6 — CommonJS config (works; ESM via .mjs also supported)
module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/manifest.webmanifest");
  eleventyConfig.addPassthroughCopy({ "src/icons": "icons" });
  eleventyConfig.addPassthroughCopy({ "src/css": "css" });

  return {
    pathPrefix: "/handychecker/", // adjust to final repo name; "/" for user-site/Cloudflare
    dir: { input: "src", output: "_site", includes: "_includes", data: "_data" },
    templateFormats: ["njk", "html", "md"],
    htmlTemplateEngine: "njk",
  };
};
```

**Core pattern — subpath-safe build (RESEARCH.md Pattern 1, lines 171–200):** GitHub Pages project sites serve at
`/<repo>/`, so `pathPrefix` must be set and every internal link in templates must go through the `url` filter.
Hardcoded `href="/css/..."` silently bypasses `pathPrefix` and 404s on the subpath (verified). The manifest and
icons/CSS are **passthrough files** Eleventy never rewrites → the manifest must use relative values (below).

---

### `package.json` (config, transform)

**Adopted from:** `01-RESEARCH.md` lines 97–102 (installation) + architecture diagram line 122.

- `npm init -y`, then `npm install -D @11ty/eleventy@3.1.6` (dev-only dependency, Node `>=18` floor; machine has Node 24.19.0 — verified compatible).
- Scripts: `"build": "eleventy"`, `"dev": "eleventy --serve"` (serves `_site/` at `http://localhost:8080`).
- **Environment caveat (Windows, RESEARCH.md Pitfall 3):** PowerShell blocks the `npm.ps1`/`npx.ps1` shims —
  use `npm.cmd` / `npx.cmd` from PowerShell. Document once in the plan; not a repo problem.

---

### `.gitignore` (config, config)

**Adopted from:** project structure (RESEARCH.md line 147). Contents: `node_modules/`, `_site/` (output never committed — the Actions workflow builds on push; source-only repo, per RESEARCH.md primary recommendation).

---

### `.github/workflows/deploy.yml` (CI, event-driven)

**Adopted from:** `01-RESEARCH.md` lines 354–382 (GitHub-documented flow: `upload-pages-artifact` → `deploy-pages`).

```yaml
# .github/workflows/deploy.yml
name: Deploy to GitHub Pages
on: { push: { branches: [main] }, workflow_dispatch: {} }
permissions:
  contents: read
  pages: write
  id-token: write
concurrency: { group: pages, cancel-in-progress: true }
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 22, cache: npm }
      - run: npm ci
      - run: npm run build
      - uses: actions/upload-pages-artifact@v3
        with: { path: _site }
  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment: { name: github-pages, url: ${{ steps.deployment.outputs.page_url }} }
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

**Notes:** pin action majors `@v4`/`@v3` as researched (A4); `.nojekyll` unnecessary with this approach. Cloudflare
Pages is the documented fallback (preset: `npx @11ty/eleventy` / `_site`, `*.pages.dev`, private-repo builds, no
subpath → `pathPrefix: "/"`). Repo creation (`gh` CLI not installed) must be an explicit early task — RESEARCH.md
Open Question 1, Assumption A2.

---

### `src/_data/site.json` (data, data-file)

**Adopted from:** `01-RESEARCH.md` lines 338–352 (executed, working) — the single data source that drives all pages.

```json
{
  "siteName": "HandyChecker",
  "lang": "de",
  "description": "Was dein Handy mit dir macht – und wie du gesünder damit umgehst. Die Seite speichert keine Daten.",
  "topics": [
    { "slug": "bildschirmzeit", "title": "Bildschirmzeit & Balance" },
    { "slug": "schlaf", "title": "Schlaf" },
    { "slug": "aufmerksamkeit", "title": "Aufmerksamkeit & Fokus" },
    { "slug": "koerper", "title": "Körper" },
    { "slug": "datenschutz", "title": "Datenschutz & Daten" }
  ]
}
```

**Core pattern — data-driven pages:** exactly five topics (CONTEXT.md: social-media topic deferred to v2). Adding
topic #6 in a later phase = one JSON entry, not a new template. Home page loops `site.topics` into cards.

---

### `src/index.njk` (template, request-response)

**Adopted from:** `01-RESEARCH.md` lines 296–336 (executed, working) — home page: Happi intro + 5 topic cards + in-app nav.

**Head pattern — same-origin PWA wiring (Pattern 3, lines 214–216; must appear on EVERY page from first deploy):**

```njk
<!DOCTYPE html>
<html lang="{{ site.lang }}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>{{ title }}</title>
  <meta name="description" content="{{ site.description }}">
  <link rel="stylesheet" href="{{ '/css/tokens.css' | url }}">
  <link rel="manifest" href="{{ '/manifest.webmanifest' | url }}">
  <link rel="icon" href="{{ '/icons/favicon.svg' | url }}" type="image/svg+xml">
  <link rel="apple-touch-icon" sizes="180x180" href="{{ '/icons/apple-touch-icon.png' | url }}">
  <meta name="mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-title" content="HandyChecker">
</head>
```

**Core pattern — Happi + five topic cards + footer (Pattern 4):**

```njk
<header><a class="skip" href="#inhalt">Zum Inhalt</a></header>
<main id="inhalt">
  <h1>Hi, ich bin Happi 🧡</h1>
  <p>Hier findest du fünf Themen rund um dein Handy – mit Fakten, Fragen und echten Tipps.
     Nichts wird gespeichert: Diese Seite kann das gar nicht.</p>
  <ul class="topic-cards">
    {%- for topic in site.topics %}
    <li><a class="card" href="{{ '/themen/' + topic.slug + '/' | url }}">{{ topic.title }}</a></li>
    {%- endfor %}
  </ul>
</main>
<footer>
  <nav aria-label="Rechtliches">
    <a href="{{ '/impressum/' | url }}">Impressum</a>
    <a href="{{ '/datenschutz/' | url }}">Datenschutz</a>
  </nav>
</footer>
```

**PWA-02 / success-criterion patterns:** cards are tappable targets ≥ `--tap-min` (48 px); "Start/Zurück"
in-app navigation is mandatory in standalone/installable mode (no browser chrome — RESEARCH.md Specifics); skip link
to `#inhalt` for accessibility.

---

### `src/impressum.njk` (template, request-response)

**Adopted from:** `01-RESEARCH.md` lines 410–432 (statute-driven skeleton; parent data = **placeholders only**, never invented, never the child's — D-10/LEGAL-01).

```njk
---
title: Impressum
---
<!DOCTYPE html>
<html lang="{{ site.lang }}">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>{{ title }} – {{ site.siteName }}</title></head>
<body>
  <main>
    <h1>Impressum</h1>
    <p>Angaben gemäß § 5 DDG (Digitale-Dienste-Gesetz).</p>
    <address>
      [Name der Eltern], [Straße und Hausnummer]<br>
      [PLZ] [Ort], Deutschland
    </address>
    <p>Kontakt: [E-Mail-Adresse der Eltern]</p>
    <p><a href="{{ '/' | url }}">← zurück zur Startseite</a></p>
  </main>
</body>
</html>
```

**Legal baseline (verified against official statute, RESEARCH.md lines 410–433):** § 5 DDG (1) unconditionally
requires only (1) name+address and (2) an electronic contact address; items 3–8 apply conditionally only. For a
natural-person parent with no trade/juridical peculiarities, the minimal conforming Impressum is
name + address + E-Mail. **Planner must keep content as bracketed placeholders** — the parent fills real data in
before the first share (launch gate, LEGAL-02; Open Question 3).

---

### `src/datenschutz.njk` (template, request-response)

**Adopted from:** `01-RESEARCH.md` lines 435–459 (child copy + parent note; truthfulness gate = PRIV-01).

Core child-facing claim + parent note (exact wording is load-bearing — it must be *literally true*):

```njk
<h1>Datenschutz – was passiert mit deinen Daten?</h1>
<p><strong>Hier wird nichts gespeichert – die Seite kann das gar nicht.</strong></p>
<p>Diese Seite fragt dich nicht nach deinem Namen, schickt keine Daten an andere
   Rechner und nutzt keine Cookies. Alles bleibt auf deinem Handy.</p>
<h2>Hinweis für Eltern</h2>
<p>HandyChecker speichert keinerlei personenbezogene Daten. Es gibt keine Konten,
   keine Analysen, keine Tracking-Cookies und keine Einbindungen Dritter
   (z.&nbsp;B. keine externen Schriften oder Videos). Beim Aufruf werden ausschließlich
   die Seiteninhalte dieser Domain geladen. Details: Hosting-Logs des gewählten
   Anbieters. Für den Inhalt verantwortlich: siehe <a href="{{ '/impressum/' | url }}">Impressum</a>.</p>
```

**Truth gate (RESEARCH.md lines 460):** the claim is true only if the deployed site fires **zero** third-party
requests → system fonts only, all assets same-origin, no embeds/analytics, plus a post-build check that the only
hosts referenced in `_site/` are same-origin (PRIV-01, success criterion 3).

---

### `src/404.njk` (template, request-response)

**Adopted from:** `01-RESEARCH.md` lines 384–408 (GitHub-documented custom 404; carries the same footer so a lost
child still reaches legal pages and home).

```njk
---
title: Hmm, hier stimmt was nicht
permalink: /404.html
---
```

Body: friendly Happi message + `← zurück zur Startseite` link (`{{ '/' | url }}`) + the same legal footer nav as
every other page (Pattern 4 — footer on every page, 404 included).

---

### `src/manifest.webmanifest` (config, request-response)

**Adopted from:** `01-RESEARCH.md` lines 181–199 (executed; **relative paths are subpath-safe by construction** — the
single most important pattern of this phase).

```jsonc
// manifest.webmanifest — relative values are subpath-safe by construction
{
  "name": "HandyChecker",
  "short_name": "HandyChecker",
  "lang": "de",
  "start_url": ".",
  "scope": ".",
  "display": "standalone",
  "prefer_related_applications": false,
  "theme_color": "#E8863A",
  "background_color": "#FFF6EC",
  "icons": [
    { "src": "icons/icon-192.png", "sizes": "192x192", "type": "image/png", "purpose": "any" },
    { "src": "icons/icon-512.png", "sizes": "512x512", "type": "image/png", "purpose": "any" },
    { "src": "icons/icon-maskable.svg", "sizes": "512x512", "type": "image/svg+xml", "purpose": "maskable" }
  ]
}
```

**Critical rules (Pitfalls 1–2):** never use absolute paths inside the manifest (Eleventy never rewrites passthrough
files — absolute `"/icons/..."` resolves to the wrong origin on a subpath); `sizes` strings must match actual pixel
dimensions or Android renders a gray-globe icon; required members per MDN Sep 2026 — `name`/`short_name`, 192 px +
512 px icon entries, `start_url`, `display`, `prefer_related_applications:false`. This file **supersedes STACK.md's
dark/absolute example** (D-06 light theme).

---

### `src/icons/*` (asset, file-I/O) — the one-SVG-source pipeline

**Adopted from:** `01-RESEARCH.md` Pattern 2, lines 202–212 (verified with installed Inkscape 1.4.4; PNG dimensions
IHDR-verified at exactly 512/192/180/32 px):

```bash
"C:\Program Files\Inkscape\bin\inkscape.com" src/icons/happi-source.svg --export-type=png --export-filename=src/icons/icon-512.png --export-width=512 --export-height=512
"C:\Program Files\Inkscape\bin\inkscape.com" src/icons/happi-source.svg --export-type=png --export-filename=src/icons/icon-192.png --export-width=192 --export-height=192
"C:\Program Files\Inkscape\bin\inkscape.com" src/icons/happi-source.svg --export-type=png --export-filename=src/icons/apple-touch-icon.png --export-width=180 --export-height=180
"C:\Program Files\Inkscape\bin\inkscape.com" src/icons/happi-source.svg --export-type=png --export-filename=src/icons/favicon-32.png --export-width=32 --export-height=32
```

**File set:** `happi-source.svg` (the one hand-authored SVG source, ginger-cat motif, artwork inside the Ø-80%
safe-zone circle for `maskable`; **not served** — excluded from passthrough since passthrough copies the whole
`src/icons` dir; keep the source file excluded from the served output, e.g. name it outside the served set or
delete-from-output step), `icon-512.png`, `icon-192.png`, `icon-maskable.svg` (copied through unchanged),
`apple-touch-icon.png`, `favicon.svg` + `favicon-32.png`. Content must reflect Happi the ginger cat (D-03/D-07).

---

### `src/css/tokens.css` (style, transform)

**Adopted from:** `01-RESEARCH.md` lines 462–483 (warm & cozy, light-only; hexes are discretion per D-07 — verify
contrast in browser, Assumption A1).

```css
:root {
  --color-cream: #FFF6EC;       /* page background — warm cream */
  --color-peach: #FFD9B8;       /* soft peach accents */
  --color-ginger: #E8863A;      /* Happi's ginger — primary brand */
  --color-ginger-deep: #C96F2A; /* hover/emphasis */
  --color-cocoa: #4A3728;       /* body text (approx. 10.5:1 on cream — verify) */
  --color-accent: #F5B041;      /* warm amber highlights */
  --color-card-bg: #FFFFFF;
  --color-text-on-ginger: #FFFFFF;

  --space-xs: 4px; --space-sm: 8px; --space-md: 16px; --space-lg: 24px; --space-xl: 40px;

  --font-base: 18px;            /* ≥16px floor for 10–12 readers */
  --font-scale-sm: 0.875; --font-scale-md: 1.125; --font-scale-lg: 1.5; --font-scale-xl: 2;

  --tap-min: 48px;              /* success criterion 5: every interactive target ≥48×48 */
  --radius-md: 12px; --radius-lg: 20px;   /* rounded & cozy */
}
```

**Zero-request rule:** system font stack only (no `@font-face` to external hosts — LG München rule). German umlauts
fully covered by system fonts (Assumption A6).

---

### `src/css/site.css` (style, transform)

**Adopted from:** `01-RESEARCH.md` line 483 (mobile-first layout rules) — fluid single column, cards stack, no fixed
widths (`min-width: 0` on grid children), `font-size` in rem, all tap targets ≥ `--tap-min` including comfortable
hit-areas on links, verify at 320–430 px viewports; no horizontal scroll guaranteed by fluid layout. Component set in
Phase 1: `.topic-cards` grid, `.card`, header with skip link, footer legal nav.

---

## Shared Patterns

Cross-cutting patterns the planner must apply across *all* relevant files. Sources are the verified RESEARCH.md
patterns (this phase's de-facto analogs).

### 1. Subpath-safe linking — `pathPrefix` + `url` filter + relative manifest
**Source:** `01-RESEARCH.md` Pattern 1 (lines 171–200); applies to **every** template and the config.
**Apply to:** all `.njk` templates (every internal `href`/`src`/`link`), `eleventy.config.js` (`pathPrefix`),
`manifest.webmanifest` (relative values).
```njk
<link rel="stylesheet" href="{{ '/css/tokens.css' | url }}">
<a href="{{ '/' | url }}" class="home-link">⌂ Start</a>
```

### 2. Same-origin `<head>` wiring on every page
**Source:** `01-RESEARCH.md` Pattern 3 (lines 214–216); applies to every page from the first deploy (PWA-01,
success criterion 4). The head above (`index.njk` section) is the canonical block; reuse on impressum/datenschutz/404
(minus per-page extras). All referenced assets are same-origin → zero-request guarantee holds by construction (PRIV-01).

### 3. Persistent footer — legal pages ≤1 tap
**Source:** `01-RESEARCH.md` Pattern 4 (lines 218–220); applies to `index.njk`, `impressum.njk`, `datenschutz.njk`,
`404.njk`. It exceeds the two-tap success criterion and guarantees a lost child can always get home.

### 4. Zero-data foundation (PRIV-01) — enforced by absence, verified by post-build check
**Sources:** RESEARCH.md lines 214–216, 460, Security Domain table (lines 564–572). System fonts only, all
CSS/icons/manifest same-origin, no embeds/analytics/cookie banners (a cookie banner would *lie* — no cookies exist).
Post-build gate: verify `_site/` references no external hosts. Repo hygiene: no child PII, no EXIF, no secrets (D-13).

### 5. UTF-8 discipline
**Source:** `01-RESEARCH.md` Pitfall 4 (lines 263–266). Eleventy 3.x defaults to UTF-8 templates; keep
`<meta charset="utf-8">`, never add `charset` attributes elsewhere; verify umlauts byte-level via Node, not the
PowerShell console (which shows mojibake for correct files).

### 6. Windows execution shims
**Source:** `01-RESEARCH.md` Pitfall 3 + Environment table (lines 257–261, 531–540). Use `npm.cmd`/`npx.cmd`
(PowerShell blocks `.ps1` shims); Inkscape CLI at `C:\Program Files\Inkscape\bin\inkscape.com`; `gh` CLI absent →
repo creation is a manual/web-UI task; Node 24.19.0 installed (≥18 floor OK).

## No Analog Found

None of the 19 files has a close match in the codebase — by definition: the repo contains no source code
(verified via `git ls-files` and source-extension glob). The planner should use the RESEARCH.md patterns above as
the authoritative implementation reference, **not** STACK.md's superseded dark/absolute manifest example.

## Metadata

**Analog search scope:** repo root `C:\opencode\research01` (git-tracked files only; no `.planning/` artifacts are
source code)
**Files scanned:** 19 tracked files in working tree (0 source code; 18 `.planning/` docs + `AGENTS.md`)
**Pattern extraction date:** 2026-09-28
**Verification basis:** RESEARCH.md patterns were executed end-to-end on Eleventy 3.1.6 this session (temp scaffold
`%TEMP%\opencode\eleventy-test`): config syntax, `addPassthroughCopy`, `pathPrefix`+`url` filter, UTF-8 umlauts,
permalink generation, relative-path manifest — all confirmed working.