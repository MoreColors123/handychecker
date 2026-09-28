# Walking Skeleton — HandyChecker

**Phase:** 1 — Foundation Shell, PWA Identity & First Deploy
**Generated:** 2026-09-28
**Status:** Plan — executed when `/gsd-execute-phase 1` runs

## Capability Proven End-to-End

> One sentence: the smallest user-visible capability that exercises the full stack.

**A visitor on a phone opens the German home page at the live public HTTPS URL and sees the five topic areas as big, tappable cards — served as pure static HTML by a subpath-safe Eleventy build with zero third-party requests, installable via a served manifest + Happi icon set, with Impressum and Datenschutz reachable from the footer.**

The phase's layers (config → data → template → CSS → PWA identity → legal pages → deploy) are all touched by this single path: opening the home page is the walking-skeleton slice; every other Phase-1 page (legal, 404) and asset (manifest, icons) is an expansion of the same proven pipeline.

## Architectural Decisions

| Decision | Choice | Rationale |
|---|---|---|
| Framework / SSG | **Eleventy 3.1.6** (CommonJS config, Nunjucks templates) | npm-verified (2026-06-02, Node ≥18; machine has 24.19.0); emits pure HTML with zero client JS; one template system + JSON data file fit the 5-topic content model; only dev dependency. Verified by an actual build this session (01-RESEARCH.md) |
| Data layer | **`src/_data/site.json`** (build-time JSON; no database — by design) | siteName, lang `de`, description, and the five v1 topics drive every page via Nunjucks loops; adding topic 6 = one JSON entry. Static site: no runtime data tier exists (PRIV-01: nothing stored) |
| Auth / accounts | **None — architectural absence** | GDPR Art. 8 (consent age 16 in DE) makes child accounts an anti-feature; no forms, no sessions, no cookies, no analytics, no embeds (PRIV-01) |
| Deployment target | **GitHub Pages via GitHub Actions** (workflow `upload-pages-artifact@v3` → `deploy-pages@v4`); Cloudflare Pages (`*.pages.dev`, pathPrefix `/`) as documented fallback | Free, automatic HTTPS, no personal data processed, public repo accepted by the owner (D-08/D-09); Actions approach builds from source on push, no committed build artifacts. Project-site subpath `https://<user>.github.io/handychecker/` is the reason for subpath-safe links |
| URL scheme | **Subpath-safe everywhere**: `pathPrefix: "/handychecker/"` + the `url` filter on every internal link; manifest uses **relative** paths (`start_url: "."`, `src: "icons/…"`) | GitHub Pages project sites live at `/<repo>/`; hardcoded `/…` links and absolute manifest paths silently break install/CSS on the subpath (01-RESEARCH Pattern 1, verified) |
| PWA identity | **Web App Manifest + 6-file icon set from ONE hand-authored SVG source** (Inkscape CLI exports), iOS meta tags on every page; **no service worker in v1** | Manifest required members per MDN Sep 2026; icons must match `sizes` strings exactly (IHDR-verified) or Android shows a gray globe; SW is a Phase-4 decision (research: SW not required for installability; cache staleness is the only second-order risk — deferred) |
| Design system | **Hand-written `tokens.css` (design tokens) + `site.css` (components)**, light-only warm ginger/cream palette, system font stack | D-05/D-06/D-07: warm & cozy, no dark mode (no smartphone in bed); system fonts = zero external requests (LG München / DSGVO-safe); no Tailwind/build step at this scale |
| Legal | **Static `impressum.njk` (§ 5 DDG, parent placeholders only) + `datenschutz.njk` (child zero-data claim + parent note) + `404.njk`**, footer-linked from every page | D-10: parent's minimal data, never the child's, never invented; launch gate: legal pages live before the first share; one-tap reach from anywhere |
| Directory layout | **Eleventy `src/` → `_site/`**; `src/_data/` (data), `src/icons/` (served assets), `src/icons-src/` (unserved art source), `src/css/` (styles), passthrough for manifest/icons/css; `.github/workflows/deploy.yml` at root | Research-verified structure; the unserved `icons-src/` keeps the authoring SVG out of the published output while keeping one art source for regeneration |

## Stack Touched in Phase 1

- [x] Project scaffold — package.json (Eleventy 3.1.6 pinned, build/dev scripts), eleventy.config.js, .gitignore, lockfile committed (Plan 01-01)
- [x] Routing — home `/`, `/impressum/`, `/datenschutz/`, custom `/404.html`, interim `/themen/<slug>/` links (Plans 01-01/01-02)
- [x] Database — **none by design** (static data file `_data/site.json` is the phase's "read"; there is no write — PRIV-01)
- [x] UI — home page with five ≥48 px tappable topic cards, Happi intro, warm/cozy light styling, in-app Start link + footer legal nav (Plans 01-01/01-02)
- [x] PWA identity — manifest (relative paths, light palette) + 192/512 PNG, maskable SVG, apple-touch-icon 180, favicon set; iOS meta tags on every page (Plan 01-03)
- [x] Deployment — GitHub Actions Pages workflow, live public HTTPS URL with automated live verification; documented local run: `npm.cmd run dev` → http://localhost:8080 (Plan 01-04)

## Out of Scope (Deferred to Later Slices)

- **Service worker / offline** — Phase 4 decision (default no-SW in v1)
- **Topic page content** — Phase 2/3 (Phase 1 ships the cards + a friendly 404 for the interim dead-ends)
- **Interactive widgets** (self-check quiz, tip boxes) — Phase 2, plus `app.js`
- **OG/messenger share previews** — Phase 4
- **Paid/custom domain** — declined (D-02); reversible later via DNS
- **Dark/night theme** — declined (D-06)
- **Accounts, analytics, embeds, cookies, app stores** — permanently out (PRIV-01, out-of-scope table)
- **v2 backlog** — missions, certificate, family contract, share cards, myth-busters, social-media topic (REQUIREMENTS.md)

## Subsequent Slice Plan

Each later phase adds one vertical slice on top of this skeleton without altering its architectural decisions (subpath-safe Eleventy build, data-driven templates, light-only tokens, no-SW, GitHub Pages):

- Phase 2: **Interactive widgets + reference topic** — voice spec (VOICE-01) locked first, then reusable self-check + tip-box widgets and one print-quality topic page under `/themen/<slug>/` (the roots already exist: card links + `_data/site.json` slugs)
- Phase 3: **Content build-out** — the remaining four topics share the Phase-2 page template; `_data/site.json` topics array extended per the established pattern
- Phase 4: **Offline decision, polish & real-device QA** — service-worker decision (default no-SW), standalone-mode navigation polish, OG tags, real-device install/update/zero-request validation on the daughter's Android phone