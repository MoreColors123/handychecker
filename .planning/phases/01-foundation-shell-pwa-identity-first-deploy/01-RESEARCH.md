# Phase 1: Foundation Shell, PWA Identity & First Deploy - Research

**Researched:** 2026-09-28
**Domain:** Static-site foundation + PWA identity (Eleventy 3.1.6), German legal baseline (§5 DDG), first free-static-host deploy
**Confidence:** HIGH

## Summary

This phase builds the skeleton everything else renders inside: an Eleventy 3.1.6 project (config + passthrough copy + data-driven templates), the warm-cozy light-only design-token system, the German mobile-first home page with five topic cards, the full PWA identity (manifest + five icon variants + iOS meta tags), the two legal pages (Impressum §5 DDG + kindgerechte Datenschutz), and the first public deploy over HTTPS. Every load-bearing claim below was **verified by executing a real Eleventy 3.1.6 build this session** (temp scaffold in `%TEMP%\opencode\eleventy-test`): config syntax, `addPassthroughCopy`, `pathPrefix` + `url` filter, UTF-8 German umlauts through the output, permalink generation, relative-path manifest. Version currency was verified against the npm registry (`@11ty/eleventy` **3.1.6**, published 2026-06-02, `engines: node >=18`), and package legitimacy returned **OK** (236,835 weekly downloads, github.com/11ty repo, no postinstall, not deprecated).

The single most important planning insight: **GitHub Pages project sites live at a subpath (`https://<user>.github.io/handychecker/`), so every internal URL must be subpath-safe.** This means (a) HTML links go through Eleventy's `url` filter with `pathPrefix` set (verified — hardcoded `/...` links silently bypass it), and (b) the manifest — a static passthrough file Eleventy never rewrites — must use **relative paths** (`start_url: "."`, `src: "icons/icon-512.png"`), which the manifest spec resolves against the manifest's own URL (verified against MDN). The prior project research (STACK.md) shows a dark `theme_color: "#121826"` and absolute manifest paths — both are now **superseded** (D-06 locked a light-only theme; the absolute-path example breaks on a subpath).

**Primary recommendation:** Scaffold Eleventy 3.1.6 with `src/` → `_site/`, `pathPrefix: "/handychecker/"` (adjust to the final repo name), the `url` filter on every internal link, a relative-path manifest passed through verbatim, icons generated from **one SVG source via the installed Inkscape 1.4.4** (verified export at exactly 512/192/180/32 px), and deploy via a GitHub Actions workflow (`upload-pages-artifact` + `deploy-pages`) so the SSG build happens on push and no built artifacts are committed.

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions
- **D-01:** Site name is **HandyChecker** (user-approved; replaces the working-title status). — **Reversibility:** costly — renaming later means updating manifest/title/meta on a published URL, but is not contract-breaking pre-launch.
- **D-02:** **No paid domain.** The site lives at the free host's default address (GitHub Pages / equivalent free HTTPS URL). Custom `.de` domain explicitly declined (≈10 €/yr not justified). — **Reversibility:** reversible — a short domain can be added later via DNS.
- **D-03:** The friendly guide is **Happi, a ginger cat** 🧡 — the single narrative anchor across all pages and copy. The cat is the "friendly guide, not a parent" voice embodiment.
- **D-04:** All user-facing copy speaks through/with the guide persona — never a lecture or fear tone. Voice spec (VOICE-01) is Phase 2's job, but the mascot identity is locked now so Phase 1's shell (tokens, home page, favicon/manifest icon motif) matches it.
- **D-05:** Overall mood: **warm & cozy** — warm, friendly palette, rounded shapes, slightly playful, non-clinical, non-scary (fits "ginger cat" accents). Distinctly NOT a bright game-style or a cold minimal look.
- **D-06:** **Light theme only — no dark/night mode.** (No smartphone allowed in bed.) Simplifies the design-token set.
- **D-07:** Palette direction: warm tones echoing the ginger cat (oranges/peaches/cream) with a warm accent for Happi. Design tokens are Phase 1 deliverables.
- **D-08:** **Public source is fine** — GitHub Pages' public-repo model accepted consciously.
- **D-09:** Hosting: free static host with automatic HTTPS (GitHub Pages primary; Cloudflare Pages alternative). No accounts, no data collection, no backend — zero-data rule (PRIV-01) is a hard architectural constraint.
- **D-10:** Legal pages carry **only the parent's minimal data** (Impressum §5 DDG), never the child's; Datenschutzerklärung kindgerecht ("hier wird nichts gespeichert – die Seite kann das nicht") + short parent note. Launch gate: live before the first public URL is shared.
- **D-11:** Subagent spawns must **omit `model=`** — `anthropic/claude-sonnet-5` unavailable in this runtime.
- **D-12:** Windows shell mangles embedded `"` in gsd-tools JSON args — pass via stdin or Node spawn wrapper, never a quoted shell argument.
- **D-13:** Secrets: none exist by design (static site, no backend). No API keys or tokens in the repo or planning docs.

### the agent's Discretion
- Mascot illustration style and exact color hexes (within "warm & cozy + ginger cat").
- Host choice finalization (GitHub Pages vs Cloudflare) — user accepted either; default GitHub Pages unless planning finds a reason to prefer Cloudflare.
- Home page layout detail (cards grid etc.) — standard pattern, planner discretion.

### Deferred Ideas (OUT OF SCOPE)
- No paid domain — declined; add later via DNS if shared widely.
- Dark/night theme — explicitly deferred/declined (no phone in bed). Not a v2 item either.
- OG meta tags / messenger share previews — Phase 4.
- Service worker / offline — Phase 4 decision (default no-SW in v1).
- Missions, certificate, family contract, share cards, myth-busters, social-media topic — v2 backlog (REQUIREMENTS.md).
</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| PWA-01 | Home-Screen-App-Gefühl – Web-App-Manifest + vollständiges Icon-Set (192/512 PNG, maskable SVG, apple-touch-icon 180×180, Favicon) + iOS-Meta-Tags; ohne App-Store installierbar | Manifest required members verified against MDN (2026-09-07); icon generation from one SVG via Inkscape 1.4.4 verified at exact pixel sizes; subpath-safe relative manifest verified through a real build; iOS meta-tag pattern documented |
| PWA-02 | Mobile-first, responsives Layout mit großen Tap-Zielen (≥48 px) und gut lesbarer Schrift | `--tap-min: 48px` token + mobile-first fluid layout pattern below; WCAG 2.5.8 (24 px floor) cited from project research; verified no-JS rendering (Eleventy emits pure HTML) |
| LEGAL-01 | Impressum-Seite (§5-DDG-konform; Eltern-Daten, nie Kind-Daten) | Official §5 DDG statute text verified (gesetze-im-internet.de): a natural person needs name+address and an electronic contact address; items 3–8 only apply conditionally — no legal advice invented |
| LEGAL-02 | Kindgerechte Datenschutzerklärung + kurzer Eltern-Hinweis; Launch-Gate | Zero-data claim is made literally true by PRIV-01 (no third-party requests); child-facing wording pattern documented (`"hier wird nichts gespeichert – die Seite kann das nicht"`) with parent note |
| PRIV-01 | Null Daten – keine Accounts/Analysen/Cookies/Drittanbieter-Einbettungen; selbst gehostete Assets | Architecture enforces by absence: system fonts only, all assets in-repo and self-served (passthrough copy verified); manifest+icons+fonts all same-origin; GitHub Actions deploy builds from source, nothing external at runtime |
</phase_requirements>

## Architectural Responsibility Map

| Capability | Primary Tier | Secondary Tier | Rationale |
|------------|-------------|----------------|-----------|
| Page rendering/templating | Build-time (Eleventy SSG) | — | Generates pure HTML from Nunjucks templates + `_data/site.json`; output is static files — no runtime tier exists |
| PWA identity (manifest, icons, iOS meta) | Static files served by host | Browser install flow | Manifest/icons are files in the published output every page links to; the browser consumes them for install |
| Design system (tokens + components) | Static CSS files (Browser) | Build-time authoring | `tokens.css`/`site.css` are hand-written, passed through the build, rendered in the browser |
| Legal pages (Impressum, Datenschutz) | Static HTML (Browser) | Build-time templates | Two Nunjucks templates → `/impressum/` and `/datenschutz/`; footer links on every page ⇒ ≤1 tap reach (success criterion 2) |
| Zero-data foundation | All tiers, by absence | Host (no injection points) | No external requests possible: every asset is in-repo; no embeds, no font CDN, no analytics (LG München rule) |
| In-app "Start/Zurück" navigation | Browser UI (static pages) | — | Standalone install has no browser chrome; persistent header/footer "Start/Zurück" affordance on every page |
| Deploy pipeline | CI/CD (GitHub Actions / host) | CDN / Static | GitHub Pages Actions workflow (or Cloudflare preset) builds `_site/` and deploys; HTTPS auto |

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| `@11ty/eleventy` | **3.1.6** (npm-verified, published 2026-06-02) | Static site generator (dev-only) | One Nunjucks template + `_data/site.json` renders all pages; `addPassthroughCopy` ships manifest/icons/CSS verbatim; output is pure HTML with zero client JS. Current minor of the 3.x line; `engines: node >=18` (npm `engines` verified). Legitimacy: **OK** (236,835/wk downloads, github.com/11ty, no postinstall) |
| Node.js | ≥18 required; **24.19.0 installed** on this machine | Build runtime | Node 22 LTS was the research-era recommendation; installed 24.19.0 exceeds the ≥18 floor with no compatibility concern (verified: Eleventy 3.1.6 built cleanly on it) |
| Semantic HTML5 + CSS custom properties + vanilla JS (ES2022) | browser-native | The actual site | `lang="de"` documents, `tokens.css` (design tokens) + `site.css` (components), one future `app.js` (Phase 2). No framework, no runtime libraries — deliberate answer: none |
| Web App Manifest (`manifest.webmanifest`) | W3C manifest spec | Installable "home-screen app" identity | Required members (MDN, Sep 2026): `name`/`short_name`, `icons` incl. 192px + 512px, `start_url`, `display` (and/or `display_override`), `prefer_related_applications: false` or absent; HTTPS/localhost only |
| Icon set (5 files from 1 SVG source) | PNG/SVG | Install identity | 192×192 PNG + 512×512 PNG (`purpose: "any"`), maskable SVG (safe zone = circle of Ø 80% of min dimension, MDN), apple-touch-icon 180×180 PNG, favicon.svg + favicon-32.png |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| Inkscape CLI | **1.4.4 installed** (`C:\Program Files\Inkscape\bin\inkscape.com`) | SVG → PNG icon export, exact pixel sizes | Every icon regen after mascot-art changes; one command per size (verified). No ImageMagick/rsvg on this machine — Inkscape is the local path |
| `html-validate` | ^10 (optional, dev-only) | Local HTML lint (`lang="de"`, a11y) | Only if the maintainer wants automated QA; skip for v1 per STACK.md |
| GitHub Actions `actions/upload-pages-artifact` + `actions/deploy-pages` | current | Deploy pipeline | Recommended by GitHub docs for SSG builds (Jekyll-less build process). Alternative: Cloudflare preset `npx @11ty/eleventy` / `_site` |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Eleventy 3.1.6 | Astro 7.3.5 | Astro drags in Vite/esbuild and requires Node ≥22.12 (npm-verified); 8 German content pages don't need islands |
| Eleventy 3.1.6 | Plain hand-written HTML | Acceptable at ≤4 pages; at 5 topics + legal pages + shared header/nav/footer, includes pay for themselves (SUMMARY.md resolves toward Eleventy) |
| Eleventy 3.1.6 | Hugo | Fine alternative if the maintainer preferred a Go binary; Nunjucks + JSON data fit the content model better |
| Hand-written CSS tokens | Tailwind 4.3.3 | Adds a build step and class noise into hand-authored German templates for zero benefit at this scale |
| GitHub Pages | Cloudflare Pages | Cloudflare: no bandwidth cap, private-repo builds, EU edge, `*.pages.dev` URL, PR previews (docs verified 2026-04-21). GitHub Pages: zero-config with an existing GitHub repo. User accepted either (D-09); CONTEXT defaults GitHub Pages |

**Installation:**
```bash
npm init -y
npm install -D @11ty/eleventy@3.1.6
```
**Version verification (executed this session):** `npm view @11ty/eleventy version` → `3.1.6`; `npm view @11ty/eleventy engines` → `{ node: '>=18' }`; `npm view @11ty/eleventy time.modified` → `2026-07-01` (3.1.6 metadata) / package published 2026-06-02.

## Package Legitimacy Audit

| Package | Registry | Age | Downloads | Source Repo | Verdict | Disposition |
|---------|----------|-----|-----------|-------------|---------|-------------|
| `@11ty/eleventy` | npm | 14 yrs (3.1.6 published 2026-06-02) | 236,835/wk (3.1.6) | github.com/11ty/eleventy | OK | Approved |

**Packages removed due to [SLOP] verdict:** none
**Packages flagged as suspicious [SUS]:** none
*No other external packages are installed by this phase. Eleventy is the only runtime/graph dependency and is dev-only.*

## Architecture Patterns

### System Architecture Diagram

```
┌──────────────────────────────────────────────────────────────────────────┐
│            BUILD (maintainer machine — Node 24, Eleventy 3.1.6)           │
│  eleventy.config.js   pathPrefix + addPassthroughCopy + dir mapping       │
│  src/ (templates .njk, _data/site.json, css/, icons/, manifest)           │
│      └─ npm run build ──▶ _site/  (pure HTML + passthrough assets)        │
└───────────────────────────────┬──────────────────────────────────────────┘
                                │ git push (source only; output may be .gitignored)
                                ▼
┌──────────────────────────────────────────────────────────────────────────┐
│   GITHUB PAGES (Actions workflow: checkout → npm ci → build → deploy)     │
│   https://<user>.github.io/handychecker/  (HTTPS only, free)              │
│   serves: / index.html · /themen/<slug>/ · /impressum/ · /datenschutz/    │
│           /manifest.webmanifest · /icons/* · /css/* · /404.html           │
└───────────────────────────────┬──────────────────────────────────────────┘
                                │ HTTPS GET (the only network traffic ever)
                                ▼
┌──────────────────────────────────────────────────────────────────────────┐
│   BROWSER ON HER PHONE                                                    │
│   home page (5 topic cards) → topic pages → footer: Impressum/Datenschutz │
│   manifest + icons ⇒ Android Chrome offers install; iOS Share→"Zum Home-  │
│   Bildschirm" uses apple-touch-icon. ZERO third-party requests anywhere.  │
└──────────────────────────────────────────────────────────────────────────┘
```

### Recommended Project Structure
```
handychecker/                    # repo root (public per D-08)
├── eleventy.config.js           # pathPrefix, addPassthroughCopy, dir map
├── package.json                 # scripts: build = eleventy, dev = eleventy --serve
├── .gitignore                   # node_modules/, _site/
├── .github/workflows/deploy.yml # Pages Actions workflow (or host preset)
└── src/                         # Eleventy input
    ├── _data/site.json          # siteName, lang:"de", description, 5 topics
    ├── _includes/               # (Phase 2) shared header/footer partials
    ├── index.njk                # home: Happi intro + 5 topic cards + in-app nav
    ├── impressum.njk            # → /impressum/index.html
    ├── datenschutz.njk          # → /datenschutz/index.html
    ├── themen/<slug>/index.njk  # Phase 2/3 topics (Phase 1: cards link only)
    ├── 404.njk                  # → /404.html (custom GitHub Pages 404)
    ├── manifest.webmanifest     # relative paths — subpath-safe (see below)
    ├── icons/
    │   ├── icon-192.png         # 192×192 (required Chromium)
    │   ├── icon-512.png         # 512×512 (required Chromium)
    │   ├── icon-maskable.svg    # 512×512, purpose:"maskable", art in 80% safe zone
    │   ├── apple-touch-icon.png # 180×180 (<link rel="apple-touch-icon">)
    │   ├── favicon.svg          # + favicon-32.png (bookmarks)
    │   └── happi-source.svg     # the one hand-authored SVG source (not served)
    └── css/
        ├── tokens.css           # design tokens (colors/spacing/type/tap targets)
        └── site.css             # layout + components (cards, nav, footer)
```

### Pattern 1: Subpath-safe linking — `pathPrefix` + `url` filter + relative manifest
**What:** GitHub Pages project sites serve at `/<repo>/`, not `/`. Eleventy's `pathPrefix` rewrites links **only** when templates use the `url` filter.
**When to use:** Always for a project-site deploy; harmless on a user-site or Cloudflare (`pages.dev` root).
**Verified this session:** with `pathPrefix: "/handychecker/"`, `{{ '/css/tokens.css' | url }}` → `/handychecker/css/tokens.css`, but a hardcoded `href="/css/tokens.css"` stayed `/css/...` (would 404 on the subpath). The manifest is a passthrough file Eleventy never rewrites → use relative values (`"start_url": "."`, `"src": "icons/icon-512.png"`, `"scope": "."`), which the W3C/MDN spec resolves against the manifest's own URL (MDN icons + start_url references verified).
**Example:**
```njk
<link rel="stylesheet" href="{{ '/css/tokens.css' | url }}">
<link rel="manifest" href="{{ '/manifest.webmanifest' | url }}">
<a href="{{ '/' | url }}" class="home-link">⌂ Start</a>
```
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
**Note:** this manifest supersedes STACK.md's example (dark `#121826` colors and absolute `/icons/...` paths) — D-06 locks a light theme; absolute paths break on the subpath.

### Pattern 2: One-SVG-source icon pipeline (no design tooling)
**What:** Hand-author one `happi-source.svg` (ginger-cat motif on the warm-cream background, artwork inside the 80% safe-zone circle); derive every required raster with Inkscape CLI.
**When to use:** Every icon set; re-run the three commands after any mascot art change.
**Verified this session** (Inkscape 1.4.4, Windows):
```bash
"C:\Program Files\Inkscape\bin\inkscape.com" src/icons/happi-source.svg --export-type=png --export-filename=src/icons/icon-512.png --export-width=512 --export-height=512
"C:\Program Files\Inkscape\bin\inkscape.com" src/icons/happi-source.svg --export-type=png --export-filename=src/icons/icon-192.png --export-width=192 --export-height=192
"C:\Program Files\Inkscape\bin\inkscape.com" src/icons/happi-source.svg --export-type=png --export-filename=src/icons/apple-touch-icon.png --export-width=180 --export-height=180
"C:\Program Files\Inkscape\bin\inkscape.com" src/icons/happi-source.svg --export-type=png --export-filename=src/icons/favicon-32.png --export-width=32 --export-height=32
```
Output verified by parsing PNG IHDR: 512×512, 192×192, 180×180, 32×32 — exact match for the manifest `sizes` strings (a wrong `sizes` vs actual pixels breaks Android install icons — PITFALLS Pitfall 8). The maskable SVG is copied through unchanged. Whole set ≈ 34 KB.

### Pattern 3: Manifest check → `<head>` wiring → zero third-party requests
**What:** Every page's `<head>` carries: `<meta charset="utf-8">`, `<meta name="viewport" content="width=device-width, initial-scale=1">`, `<html lang="de">`, `<link rel="manifest">`, `<link rel="icon" href=".../favicon.svg">`, `<link rel="apple-touch-icon" sizes="180x180" href=".../apple-touch-icon.png">`, `<meta name="mobile-web-app-capable" content="yes">` + `<meta name="apple-mobile-web-app-capable" content="yes">` (Apple-documented; community reports the standard `mobile-web-app-capable` spelling being preferred going forward — ship both), `<meta name="apple-mobile-web-app-title" content="HandyChecker">`, and `/css/tokens.css`. All of these are **same-origin** — the zero-request guarantee holds by construction (LG München rule: no Google Fonts, no embeds, ever).
**When to use:** Every page, from the first deploy (PWA-01, success criterion 4; ADR: manifest+icons are a tested deliverable, not a later add-on).

### Pattern 4: Legal pages reachable in ≤1 tap (success criterion 2)
**What:** A persistent `<footer>` with `Impressum` / `Datenschutz` links on **every** page (shared include in Phase 2; two small templates now). From the home page or any topic page, the footer is one tap away ⇒ "within two taps" is exceeded. The 404 page also carries the footer (a lost child still reaches the legal pages and can get home).
**When to use:** Always; the launch gate is "both pages live before the first public URL is shared".

### Anti-Patterns to Avoid
- **Hardcoded absolute `/...` links in templates** — silently bypass `pathPrefix` (verified) → broken CSS/manifest on a project-site subpath. Always `| url`.
- **Absolute paths inside `manifest.webmanifest`** — Eleventy never rewrites passthrough files; absolute `/icons/...`/`start_url: "/"` resolve to the wrong origin on a subpath. Relative is required (spec-verified).
- **Copying STACK.md's dark manifest colors** — `#121826` was written before D-06; light cream/ginger values are locked.
- **Symbolic links in the repo** — GitHub Pages branch-based publishing refuses them (docs); irrelevant with the Actions approach, but don't symlink assets.
- **Skipping the `.nojekyll` file** — only needed for the `gh-pages`-branch publish style (Jekyll would ignore `_`-prefixed paths); not needed with `upload-pages-artifact`.
- **Cookie banners or analytics** — no cookies exist ⇒ a cookie banner would *lie*; nothing to consent to (PITFALLS Pitfall 11).

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Hand-writing PNG icons | Pixel-editing 5 raster sizes | One SVG source + Inkscape CLI export | One art change drains a weekend; Inkscape is already installed (verified) and exports exact pixels |
| Manually prefixing every URL with the repo subpath | String-concatenating `"/handychecker/" + path` | Eleventy `pathPrefix` + `url` filter | Single source of truth; host/root changes are one config line (verified) |
| Hand-porting manifest URL resolution | Reasoning about absolute vs relative per file | Relative manifest paths (`start_url: "."`, `src: "icons/…"`) | Spec resolves them against the manifest URL (MDN-verified); immune to host/root changes |
| A custom "installability checker" script | Re-parsing manifest requirements in JS | Lighthouse PWA/installability audit + a browser DevTools manifest check | Manifest parsing is picky and cross-platform (Pitfall 8); reuse the existing checker |
| A deploy/build orchestrator | Shell scripts for upload/deploy | GitHub Actions `upload-pages-artifact` + `deploy-pages` (or Cloudflare preset) | GitHub-documented flow; free; no credentials in repo (D-13) |
| An analytics "just to see visits" | — | Nothing — ship zero | GDPR Art. 8 + the site's promise is "tracked nothing" (PRIV-01, Anti-Feature) |

**Key insight:** every hand-rolled item above is a *subpath or pixel* failure waiting to happen — both are invisible until the real phone hits the real URL. The standards/tooling path (relative manifest, `url` filter, Inkscape export, Lighthouse) makes success criterion 3–5 checkable rather than asserted.

## Common Pitfalls

### Pitfall 1: GitHub Pages subpath breaks absolute URLs (the #1 gotcha)
**What goes wrong:** CSS, manifest, icons 404 at `https://<user>.github.io/handychecker/icon-512.png` because the link says `/icon-512.png` (origin root).
**Why it happens:** Eleventy output is root-relative by default; `pathPrefix` only affects the `url` filter; manifest is never rewritten; STACK.md's example used absolute paths.
**How to avoid:** `pathPrefix` + `url` filter on every internal link (verified); relative manifest values (verified); smoke-test the *built* `_site/` served under a subpath before the real deploy (`npm run build && npx serve _site`, then open `http://localhost:3000/handychecker/` via a wrapper or Cloudflare preview).
**Warning signs:** `manifest.webmanifest` shows `"/icons/..."` or `"start_url": "/"`; any `href`/`src` in templates lacks the `url` filter.

### Pitfall 2: Manifest passes JSON validation but fails installability
**What goes wrong:** "PWA-installability check passes" on the members but Android renders a gray-globe icon.
**Why it happens:** Missing 192 or 512 entry, `sizes` string ≠ actual pixels, `purpose: "maskable"` artwork bleeding out of the safe zone, `prefer_related_applications` missing/true-ish, or no HTTPS.
**How to avoid:** Use the exact required-member set (MDN-verified list in the Standard Stack table); generate rasters from the SVG at exact sizes (IHDR-verified this session); keep artwork within the Ø-80% safe-zone circle (MDN "Define app icons" verified); serve over the host's HTTPS.
**Warning signs:** Any icon `sizes` not matching its file's real dimensions; only one icon entry.

### Pitfall 3: Windows PowerShell blocks `npm.ps1`/`npx.ps1`
**What goes wrong:** `npm install` or `npx eleventy` fails with "cannot be loaded because running scripts is disabled on this system" (execution policy).
**Why it happens:** This machine's PowerShell execution policy blocks the `.ps1` shims that npm installs.
**How to avoid (verified):** Use `npm.cmd` / `npx.cmd` from PowerShell (works — this research session ran everything that way), or run from cmd/git-bash. Document it once in the plan; not a repo problem.
**Warning signs:** `PSSecurityException` / "UnauthorizedAccess" on npm/npx.

### Pitfall 4: Console shows mojibake for German umlauts (file is fine)
**What goes wrong:** `Get-Content` (PowerShell) or piped builds display `K�rper`/`�`; the site ships *correct* UTF-8.
**Why it happens:** PowerShell's console decodes UTF-8 output as latin-1; the bytes on disk are correct.
**How to avoid (verified):** Verify output with a byte-level check (`node` reading the file as `utf8` and asserting the umlaut strings — all OK this session), not the console. Keep `<meta charset="utf-8">`; never add `charset` attributes elsewhere. Eleventy 3.x defaults to UTF-8 templates (verified).
**Warning signs:** None in the browser; only in terminal displays.

### Pitfall 5: iOS meta tags missing → screenshot-icon / tab-bar launch
**What goes wrong:** On iOS, "Zum Home-Bildschirm" installs with a blurry page screenshot and opens inside Safari chrome.
**Why it happens:** iOS reads `apple-touch-icon` + the web-app-capable tags; manifest icons alone don't control the iOS icon (PITFALLS Anti-Pattern 5).
**How to avoid:** Ship `apple-touch-icon.png` (180×180) + `mobile-web-app-capable`/`apple-mobile-web-app-capable` + `apple-mobile-web-app-title` from the first deploy; document iOS as best-effort (EU behavior unstable post-17.4, per project research) and Android as the primary install path (CONTEXT specifics: target device is Android).
**Warning signs:** No `<link rel="apple-touch-icon">` in the head; trademark: iOS install can't be fully verified from Windows — Phase 4's real-device gate.

## Code Examples

Verified patterns from official sources *and* from this session's executed build (identical shapes to the scaffold that built cleanly on Eleventy 3.1.6):

### eleventy.config.js (executed, working)
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

### Data-driven home page (executed, working — 5 cards from `_data/site.json`)
```njk
---
title: HandyChecker – Finde deine Balance
---
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
<body>
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
</body>
</html>
```

### `_data/site.json` (executed, working)
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

### GitHub Actions Pages workflow (GitHub-documented flow: `upload-pages-artifact` → `deploy-pages`)
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

### 404 page (GitHub-documented: `404.html` in the published output)
```njk
---
title: Hmm, hier stimmt was nicht
permalink: /404.html
---
<!DOCTYPE html>
<html lang="{{ site.lang }}">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>{{ title }}</title></head>
<body>
  <main>
    <h1>Hmm, hier stimmt was nicht 🧡</h1>
    <p>Diese Seite gibt es nicht – aber Happi führt dich zurück.</p>
    <p><a href="{{ '/' | url }}">← zurück zur Startseite</a></p>
  </main>
  <footer>
    <nav aria-label="Rechtliches">
      <a href="{{ '/impressum/' | url }}">Impressum</a>
      <a href="{{ '/datenschutz/' | url }}">Datenschutz</a>
    </nav>
  </footer>
</body>
</html>
```

### German legal baseline — Impressum skeleton (statute-driven, no invented advice; placeholders for the parent's real data)
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
**statute facts** (gesetze-im-internet.de, § 5 DDG (1)): items that are *unconditionally required* are (1) **Name und Anschrift**, bei der sie niedergelassen sind, and (2) **Angaben, die eine schnelle elektronische Kontaktaufnahme und eine unmittelbare Kommunikation ermöglichen, einschließlich der Adresse für die elektronische Post** (E-Mail). Items 3–8 (Aufsichtsbehörde, Handelsregister, reglementierter Beruf, USt-ID/Wirtschafts-ID, Abwicklung/Liquidation, audiovisuelle Mediendienste) apply **only if** the corresponding condition holds — for a natural-person parent with none of those, the minimal conforming Impressum is name+address+E-Mail. The "geschäftsmäßig" threshold (the statute applies to commercial/for-pay digital services) is why the project ships an Impressum anyway per D-10 — a purely private site arguably sits outside §5 DDG, but the parent decided to include one for parent-facing legitimacy. The planner must keep Impressum content as **placeholders** — real data is the parent's to fill in later, never invented and never the child's (D-10, LEGAL-01).

### Child-friendly Datenschutz pattern (child copy + parent note; truthfulness gate = PRIV-01)
```njk
---
title: Datenschutz
---
<!DOCTYPE html>
<html lang="{{ site.lang }}">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>{{ title }} – {{ site.siteName }}</title></head>
<body>
  <main>
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
  </main>
</body>
</html>
```
**Truth gate (verified by architecture):** the claim "hier wird nichts gespeichert – die Seite kann das nicht" is only true if the deployed site fires **zero** third-party requests. This phase's guarantee comes from: system fonts only, all CSS/icons/manifest same-origin, no embeds, no analytics (STACK.md "What NOT to Use"), and a post-build check that the only hosts in `_site/` are same-origin.

### Design tokens — warm & cozy, light only (discretion per D-07; example set, verify contrast in browser)
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
Mobile-first layout rules: fluid single column (cards stack), no fixed widths (`min-width: 0` on grid children), `font-size` in rem, all tap targets ≥ `--tap-min` including a comfortable hit-area on links, `lang="de"` + system font stack (`system-ui`/`Segoe UI`/`Verdana`-family — zero external font requests; German umlauts fully covered). No horizontal scroll is guaranteed by the fluid layout; verify at 320–430 px in DevTools at implementation.

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Impressum under § 5 TMG | § 5 DDG (Digitale-Dienste-Gesetz) | May 2024 (TMG → DDG aufging in das neue Gesetz) | § 5 DDG § (1) now governs Impressum duties; identical items 1–2 baseline (verified against the current statute text) |
| `apple-mobile-web-app-capable` meta tag | `mobile-web-app-capable` (standardized spelling) | iOS 16.4+ era; community reports the Apple-prefixed tag deprecated in favor of the standard | Dec 2026 safe pattern: ship **both** meta tags + `apple-mobile-web-app-title` + `apple-touch-icon` link; zero cost, maximum compatibility |
| Manifest `display` only | `display` **and/or** `display_override` | MDN Sep 2026 requirement list | `display: "standalone"` remains the correct value; `display_override` optional — include `display` alone |
| Absolute manifest paths (old tutorials) | Relative manifest paths | Always correct; *required* on subpath hosts | `start_url: "."` + relative `icons` resolve against the manifest URL (MDN-verified) — immune to root changes |
| Using GitHub Pages' branch/folder publish for SSGs | GitHub Actions `upload-pages-artifact` + `deploy-pages` (build on push; Pages deploys even from private repos, docs) | docs present approach; SSG output isn't at root or `/docs` | No committed build artifacts; source-only repo; `.nojekyll` unnecessary; `GITHUB_TOKEN` pushes don't re-trigger a Pages build — irrelevant here (push *is* the trigger) |

**Deprecated/outdated:**
- **STACK.md's manifest example** (dark `#121826` theme, absolute `/icons/...` paths): superseded by D-06 (light theme) and the subpath-safe relative pattern. The planner should not copy it.
- **`apple-mobile-web-app-status-bar-style`**: legacy Apple tag, no functional effect in modern iOS; skip it.

## Assumptions Log

| # | Claim | Section | Risk if Wrong |
|---|-------|---------|---------------|
| A1 | Warm palette hexes (`#FFF6EC` cream, `#E8863A` ginger, `#4A3728` cocoa, …) | Code Examples / tokens | Low — design discretion (CONTEXT.md explicitly grants hex freedom); adjust before waves; contrast was hand-computed ≈10.5:1 for cocoa-on-cream, needs in-browser confirmation |
| A2 | A GitHub account + repo named `handychecker` will be available/created for the deploy | Environment / Deploy | Medium — cannot be verified from this machine; plan must include creating the repo (`gh` CLI is **not** installed; web UI or a one-time `gh auth login`) or switching to Cloudflare |
| A3 | `mobile-web-app-capable` + `apple-mobile-web-app-capable` both included | Code Examples | Low — redundant tags are harmless; drops whichever the browser ignores |
| A4 | Deploy via Actions-workflow (not branch/folder). The `upload-pages-artifact`/`deploy-pages` action names/versions are current as of this writing | Deploy pattern | Low-Medium — action majors pinned in the YAML (`@v4`); verify at implementation if GitHub renames |
| A5 | Impressum: a natural-person parent with no trade/juridical peculiarities needs only name+address+E-Mail under §5 DDG (1) | Code Examples | Low-Medium — statute-verified as the minimum; the site a parent ships should be validated by the parent (research is not legal advice; D-10 keeps data to placeholders) |
| A6 | System-font stack covers all German umlauts/ß | Standard stack | Very low — settled in STACK.md (HIGH) |
| A7 | No dark mode: manifest `background_color`/`theme_color` use warm light values | Code Examples | Low — if a dark splash ever appears, adjust colors; D-06 locked light-only |
| A8 | Icon art (ginger-cat face) renders acceptably at 32 px favicon | Icon pattern | Low — verify by opening the built favicon in a browser; regenerating is one Inkscape call |

## Open Questions (RESOLVED)

1. **GitHub account + repo name for the deploy**
   - What we know: GitHub Pages is the default (D-08/D-09); project sites live at `https://<user>.github.io/<repo>/`; `pathPrefix` and the manifest use `<repo>` (assumed `handychecker`).
   - What's unclear: whether a GitHub account exists and what the repo will be named; `gh` CLI is not installed on this machine.
   - Recommendation: the plan should make repo creation an explicit early task (web UI or `gh auth login`), keep the repo name `handychecker` (or adjust `pathPrefix` in one line), and keep Cloudflare Pages as the fallback (private repos, no subpath, docs-verified preset).
   - **RESOLVED:** 01-04-PLAN.md Task 2 (checkpoint:human-action — repo creation) + the Cloudflare Pages fallback documented there.
2. **`pathPrefix` value finalization**
   - What we know: verified that `url`-filtered links + relative manifest work under `pathPrefix: "/handychecker/"`.
   - What's unclear: the actual repo name at first push.
   - Recommendation: name the repo `handychecker`; if the URL differs, change one config line. The relative manifest needs **no** change either way.
   - **RESOLVED:** 01-04-PLAN.md (one-line pathPrefix adjustment if the repo name differs; the relative manifest needs no change either way).
3. **Impressum placeholders**
   - What we know: D-10 locks minimal parent data; the plan must not invent identity details.
   - What's unclear: the parent's real name/address/E-Mail (out of scope for an agent to supply).
   - Recommendation: ship the skeleton with bracketed placeholders marked `TODO: parent fills in before first share` — the launch gate (LEGAL-02) enforces completion *before* the URL is shared, not necessarily in-code.
   - **RESOLVED:** 01-02-PLAN.md Task 1 (bracket placeholders) + 01-04-PLAN.md (LEGAL-02 launch gate before any share).

## Environment Availability

> Audited this session (2026-09-28, Windows 11, PowerShell).

| Dependency | Required By | Available | Version | Fallback |
|------------|------------|-----------|---------|----------|
| Node.js | Eleventy build | ✓ | 24.19.0 (≥18 floor verified) | — |
| npm | `npm install` | ✓ (via `npm.cmd`) | 11.17.0 | PowerShell blocks `npm.ps1` shim (execution policy) — use `npm.cmd`/`npx.cmd` (verified working) |
| git | version control / push | ✓ | 2.55.0.windows.3 | — |
| Inkscape CLI | SVG → PNG icon export | ✓ | 1.4.4 `C:\Program Files\Inkscape\bin\inkscape.com` | ImageMagick/rsvg NOT installed; if Inkscape absent on another machine, install it or use a one-shot npx icon generator (flagged human step) |
| Python | (unused — optional `http.server` preview) | ✓ | 3.12.12 | — |
| `gh` CLI | repo creation / auth | ✗ | — | Web UI; plan includes explicit repo-creation task (A2) |
| GitHub account | first public deploy | ✗ unverifiable from this machine | — | Cloudflare Pages fallback (docs-verified preset) |
| ImageMagick (`magick`) | (not needed — Inkscape chosen) | ✗ | — | — |

**Missing dependencies with no fallback:** none — every tool the build needs is present.
**Missing dependencies with fallback:** `gh` CLI / GitHub account (A2 above) — web UI or Cloudflare Pages. `npm.ps1`/`npx.ps1` blocked by PowerShell execution policy — use the `.cmd` shims (verified).

## Validation Architecture

> Skipped: `workflow.nyquist_validation` is explicitly `false` in `.planning/config.json`. (This phase's verification is the five success criteria — browser/DevTools checks, not a test framework.)

## Security Domain

> Included — `security_enforcement: true` (absent defaults to enabled). ASVS level 1. This phase has effectively **no attack surface** (static files, no input, no backend, no secrets by design, D-13) — the security posture is architectural absence plus repo hygiene.

### Applicable ASVS Categories

| ASVS Category | Applies | Standard Control |
|---------------|---------|-----------------|
| V2 Authentication | no — no accounts exist (GDPR Art. 8: consent age 16 DE; accounts are an anti-feature) | N/A |
| V3 Session Management | no — no sessions, no cookies (PRIV-01) | N/A |
| V4 Access Control | no — no user roles/objects | N/A |
| V5 Input Validation | no — zero user input surfaces (no forms, no query-param logic) | N/A |
| V6 Cryptography | no — no client/server crypto; transport TLS is host-provided (GitHub Pages/Cloudflare HTTPS automatic; installability requires it) | Host-provided TLS |
| V8/others | partial — data protection & privacy (PRIV-01), secrets management (D-13) | Zero-data architecture; no secrets in repo |

### Known Threat Patterns for {Phase-1 static shell}

| Pattern | STRIDE | Standard Mitigation |
|---------|--------|---------------------|
| Third-party embeds/fonts firing requests from the child's device (Google Fonts via LG München → IP leakage = DSGVO violation) | Information disclosure | Zero-request rule: system fonts only, all assets in-repo/same-origin; post-build check that `_site/` references no external hosts |
| Child PII in a public repo (GitHub Pages = public; D-08 accepted) | Information disclosure / repudiation | Repo hygiene: no child name/school/town/EXIF; Impressum = parent data only, placeholders (D-10); `.gitignore` for drafts |
| Tampered/broken manifest-icon path on the published URL (icon 404 / gray globe) | Integrity (availability of the install path) | Relative manifest + generated-at-exact-pixel icons (verified); Lighthouse installability check as the acceptance gate |
| Stale installed content after a deploy (cache) | Integrity | Phase 4 concern (no SW in v1; host cache headers default); out of scope but kept on the Risk radar |
| Secrets pasted into (public) source | Information disclosure | None exist by design (D-13); the plan must never add build secrets or API keys |

## Sources

### Primary (HIGH confidence)
- **npm registry** (executed this session): `@11ty/eleventy` **3.1.6**, published 2026-06-02, `engines: { node: '>=18' }`; `package-legitimacy check` → **OK** (236,835/wk, github.com/11ty, no postinstall, not deprecated)
- **Executed build** (this session): Eleventy 3.1.6 scaffold in `%TEMP%\opencode\eleventy-test` — the exact config, templates, data file, manifest, and Inkscape commands in the Code Examples above built cleanly; UTF-8 umlauts byte-verified via Node; `pathPrefix` behavior and relative manifest passthrough verified; PNG dimensions IHDR-verified
- **MDN — Making PWAs installable** (2026-09-07, fetched): required manifest members, HTTPS/localhost requirement, every-page manifest link, SW not required, `beforeinstallprompt` absent on iOS
- **MDN — Manifest icons reference** (fetched): relative `src` resolved against manifest URL; `purpose: "maskable"` safe-zone semantics
- **MDN — start_url reference** (2026-08-31, fetched): relative resolution against manifest URL; `"./"` default; scope inferred from start_url; no identifier-encoding
- **gesetze-im-internet.de — § 5 DDG (1)** (fetched): full statutory text — unconditionally required items (1)–(2), conditional items (3)–(8)
- **GitHub Docs — Configuring a publishing source** (fetched): branch/folder vs Actions workflow recommendation; public-even-if-private warning; GITHUB_TOKEN-build caveat
- **GitHub Docs — Creating a custom 404 page** (fetched): `404.html` in the publishing source
- **Cloudflare Docs — Deploy an Eleventy site** (2026-04-21, fetched): framework preset → `npx @11ty/eleventy` / `_site`, `*.pages.dev`, PR previews
- **web.dev — Adaptive icon support (maskable)** (current URL `/articles/maskable-icon`) + MDN "Define app icons": safe zone = circle with diameter 80% of the icon's minimum dimension

### Secondary (MEDIUM confidence)
- `.planning/research/STACK.md`, `SUMMARY.md`, `ARCHITECTURE.md`, `FEATURES.md`, `PITFALLS.md` (project research, 2026-09-25) — stack rationale, PWA checklist, installability criteria, iOS reality, pitfalls 7–12, LG München, host comparison
- **Apple Developer — Supported Meta Tags (archive)** + community issue (Next.js #74524): `apple-mobile-web-app-capable` still Apple-documented but flagged deprecated in favor of `mobile-web-app-capable` — ship both
- Windows environment probes (this session): Node/npm/git/Inkscape/Python versions, PowerShell execution-policy block on `.ps1` shims

### Tertiary (LOW confidence)
- Stated palette hexes and mascot-art rendering quality at 32 px (A1/A8) — design discretion per CONTEXT.md, verify visually at implementation

## Metadata

**Confidence breakdown:**
- Standard stack: **HIGH** — npm-registry versions, MDN/GitHub/Cloudflare docs fetched this session, Eleventy 3.1.6 actually built
- Architecture: **HIGH** — every pattern in Code Examples was executed (config, passthrough, pathPrefix, relative manifest, icons, UTF-8)
- Pitfalls: **HIGH** for subpath/url-filter/manifest (executed); MEDIUM for platform-specifics (iOS tags, Actions action versions)
- Legal: **HIGH** for the §5 DDG statutory baseline (official text); MEDIUM for applicability interpretation (research is not legal advice)

**Research date:** 2026-09-28
**Valid until:** 2026-10-28 (30 days — Eleventy minor/Node LTS and GitHub Actions action majors are the only fast movers; re-verify action `@v4` majors and the manifest member list at Phase 4)