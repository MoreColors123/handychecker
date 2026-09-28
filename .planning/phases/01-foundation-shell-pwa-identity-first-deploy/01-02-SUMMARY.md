---
phase: 01-foundation-shell-pwa-identity-first-deploy
plan: 02
subsystem: site-legal-pages
tags: [eleventy, nunjucks, ddg-impressum, datenschutz, custom-404, privacy-gate, german]

# Dependency graph
requires:
  - "01-01 (Eleventy 3.1.6 build pipeline, src/_data/site.json data values, tokens.css/site.css, canonical Pattern-3 head, Pattern-4 footer legal nav)"
provides:
  - "/impressum/ - §5-DDG Impressum with the four bracketed parent placeholders ONLY (no invented identity data) + parent TODO HTML comment"
  - "/datenschutz/ - exact child zero-data claim ('Hier wird nichts gespeichert – die Seite kann das gar nicht.'), child explanation, 'Hinweis für Eltern' section with Impressum link"
  - "/404.html at the _site/ output root (GitHub-documented custom-404 location): Happi message, url-filtered home link, footer legal nav"
  - "Zero-external-host truth gate re-proven over the enlarged build: 0 http(s) references across all 6 built .html/.css files"
affects: [01-03 (manifest/icons must keep the zero-host gate green; gate will then also scan .webmanifest), 01-04 (deploy + live-URL gates + parent data fill), phase-2 widgets (footer/nav skeleton reuse), phase-3 content build-out]

# Actuals (#2632) — same estimateTokens scale (chars/4 over the realized diff).
actuals:
  tokens: 1356        # 5,422 diff chars / 4 over 88e2cc0..fbc7330 (3 Nunjucks templates, 121 insertions)
  tasks: 2
  commits: 2          # MEASURED: git rev-list --count 88e2cc0..HEAD (#3968)
  plan_head_before: 88e2cc06e157a5ba649188662b8af6ff4fa4efef
  plan_head_after: fbc73301548f13c2b525bac7cd441c4602d79493

# Tech tracking
tech-stack:
  added: []
  patterns: ["canonical Pattern-3 head reused verbatim on every page (incl. the site.css link from 01-01)", "in-app Start link reuses the existing .card class (>=48px tap target) instead of new header CSS", "permalink: /404.html lands at the _site/ output root - Eleventy 3.1.6 does NOT apply pathPrefix to permalinks", "bracket-placeholder-only legal content + parent TODO HTML comment (D-10 launch gate)"]

key-files:
  created: [src/impressum.njk, src/datenschutz.njk, src/404.njk]
  modified: []

key-decisions:
  - "In-app Start link styled with the existing .card class instead of adding header CSS - keeps the >=48px tap-target guarantee (PWA-02) with zero scope creep beyond the plan's three template files"
  - "404 carries its home link as the main-content card (research skeleton) while impressum/datenschutz carry a header Start card - every page has an obvious one-tap path home"
  - "Impressum omits the conditional §5-DDG items 3-8 (register/court/USt-ID) - a natural-person parent needs only name+address+email placeholders (statute-derived, RESEARCH lines 410-433)"

patterns-established:
  - "Legal-page skeleton: canonical head + header (skip link [+ Start]) + main + footer legal nav - any further page starts from this shape"
  - "The zero-external-host gate is a per-plan re-run obligation over the whole _site/ tree, not a one-time 01-01 assertion"

requirements-completed: [LEGAL-01, LEGAL-02, PRIV-01]  # copied verbatim from 01-02-PLAN.md frontmatter; REQUIREMENTS.md marking deferred by the ready-ids gate (shared with sibling plans 01-03/01-04)

# Coverage metadata (#1602) — one entry per shipped deliverable.
coverage:
  - id: D1
    description: "src/impressum.njk -> _site/impressum/index.html: 'Angaben gemäß § 5 DDG (Digitale-Dienste-Gesetz).' + the four bracketed parent placeholders inside <address> + Kontakt line, conditional §5 items 3-8 omitted, parent TODO HTML comment, canonical head, Start link, footer legal nav; zero invented identity data (prohibition P1 / T-02-01)"
    requirement: LEGAL-01
    verification:
      - kind: e2e
        ref: "gsd-verify-01-02-task1.js -> 'OK legal pages' (§5 statement + all four bracketed placeholders matched in built HTML)"
        status: pass
      - kind: grep
        ref: "gsd-verify-01-02-task1-extra.js -> no Handelsregister/USt-IdNr/Amtsgericht/Aufsichtsbehörde strings; no email literal besides the placeholder; no child data fields"
        status: pass
    human_judgment: false
  - id: D2
    description: "src/datenschutz.njk -> _site/datenschutz/index.html: exact child sentence 'Hier wird nichts gespeichert – die Seite kann das gar nicht.' (en dash, <strong> on its own paragraph), child explanation paragraph, <h2>Hinweis für Eltern</h2> stating no Konten/Analysen/Tracking-Cookies/Einbindungen Dritter + Impressum link"
    requirement: LEGAL-02
    verification:
      - kind: e2e
        ref: "gsd-verify-01-02-task1.js -> all 6 required datenschutz strings matched incl. 'Hinweis für Eltern', 'keine Konten', 'keine Analysen', 'keine Tracking-Cookies'"
        status: pass
    human_judgment: false
  - id: D3
    description: "src/404.njk -> _site/404.html at the output root (permalink /404.html honored): Happi h1 + one sentence, url-filtered '← zurück zur Startseite' card link, canonical head, footer legal nav"
    verification:
      - kind: e2e
        ref: "gsd-verify-01-02-task2.js + gsd-verify-01-02-task2-extra.js -> 404 strings, /handychecker/* footer links, full head element set, home link, file at _site/404.html"
        status: pass
    human_judgment: false
  - id: D4
    description: "Zero-external-host truth gate over the whole build (re-run in THIS plan per acceptance criterion 3): 0 http(s):// occurrences across all 6 built .html/.css files - the Datenschutz zero-data claim is literally true in the shipped artifact (T-02-02 / PRIV-01)"
    requirement: PRIV-01
    verification:
      - kind: e2e
        ref: "gsd-verify-01-02-task2.js -> 'OK zero-host gate over 6 files'"
        status: pass
    human_judgment: false
  - id: D5
    description: "Legal pages reachable in one tap from every page: footer legal nav (url-filtered Impressum + Datenschutz) proven present on home, impressum, datenschutz AND 404 - success criterion 2 closed at build level"
    verification:
      - kind: e2e
        ref: "gsd-verify-01-02-plan-gate.js -> PASS on all four built pages"
        status: pass
    human_judgment: false
  - id: D6
    description: "Parent replaces the four real Impressum placeholders before the URL is first shared; live-URL zero-request check on the real phone"
    requirement: LEGAL-01
    verification: []
    human_judgment: true
    rationale: "Human launch gate documented in this plan's Flagged Assumptions and enforced in plan 01-04 (live-URL fetch checks + parent data fill before first share); not automatable at build time by design (D-10: the data is the parent's, never invented)"

# Metrics
duration: 8min
completed: 2026-09-28
status: complete
---

# Phase 1 Plan 02: Legal Pages + Zero-Host Gate Summary

**§5-DDG Impressum with bracketed parent placeholders only, child-friendly Datenschutz carrying the literal zero-data claim, the GitHub-Pages custom 404, and the build-wide zero-external-host truth gate re-proven over all 6 built files**

## Performance

- **Duration:** 8 min (466 s)
- **Started:** 2026-09-28T12:14:01Z
- **Completed:** 2026-09-28T12:21:47Z
- **Tasks:** 2 (both type=auto)
- **Plan artifacts:** 4 (3 source templates + the re-proven zero-host gate)

## Accomplishments

- `/impressum/` built from `src/impressum.njk`: the exact §5-DDG statement, the four bracketed parent placeholders (`[Name der Eltern]`, `[Straße und Hausnummer]`, `[PLZ] [Ort]`, `[E-Mail-Adresse der Eltern]`) inside `<address>`, a parent-facing HTML TODO comment (never visible child copy), conditional §5 items 3-8 correctly omitted — zero invented identity data anywhere
- `/datenschutz/` built from `src/datenschutz.njk`: the load-bearing child sentence "Hier wird nichts gespeichert – die Seite kann das gar nicht." (en dash, strong on its own paragraph), the child explanation, and `<h2>Hinweis für Eltern</h2>` with no Konten/Analysen/Tracking-Cookies/Einbindungen Dritter plus a link to the Impressum
- `/404.html` built from `src/404.njk` at the `_site/` output root (GitHub-documented custom-404 location — Eleventy 3.1.6 does **not** apply pathPrefix to permalinks): Happi 🧡 message, one-tap url-filtered home card, footer legal nav — interim `/themen/` dead-ends now land somewhere friendly
- Zero-external-host truth gate re-run over the enlarged build: **0 `http(s)://` references across all 6 built `.html`/`.css` files** — the Datenschutz zero-data claim is literally true in the shipped artifact (LEGAL-02/PRIV-01)
- Footer legal nav proven present on **every** built page (home, impressum, datenschutz, 404) — legal pages reachable in one tap from anywhere; canonical Pattern-3 head (manifest/favicon/apple-touch-icon links, both web-app-capable metas) carried on all three new pages

## Task Commits

Each task was committed atomically:

1. **Task 1: Legal pages — §5-DDG Impressum (parent-placeholders only) and child-friendly Datenschutz** - `48ef0e5` (feat) — 2 files, 86 insertions
2. **Task 2: Custom 404 + the zero-external-host truth gate over the whole build** - `fbc7330` (feat) — 1 file, 35 insertions

## Files Created/Modified

- `src/impressum.njk` - §5-DDG Impressum: statute-derived minimal fields as the four bracketed placeholders only, parent TODO comment, canonical head, in-app Start link, footer legal nav
- `src/datenschutz.njk` - Child zero-data claim + explanation + Eltern-Hinweis (no accounts/analytics/tracking cookies/third-party embeds), Impressum link, canonical head/footer
- `src/404.njk` - Happi 404 with permalink `/404.html`, url-filtered home card, canonical head, footer legal nav

## Decisions Made

- **Start link reuses `.card`**: the new in-app "Start" header link is styled with the existing card class (≥48px tap target, warm rounding) instead of adding a header-nav CSS block — keeps PWA-02's tap-target guarantee with zero changes outside the plan's file list.
- **404 permalink location verified empirically**: built and confirmed `_site/404.html` at the output root (pathPrefix does not prefix permalinks in Eleventy 3.1.6) — the GitHub Pages custom-404 contract holds.
- **Conditional §5-DDG items omitted**: no register, court, or USt-ID fields fabricated for a natural-person parent — minimal conforming Impressum is name+address+email placeholders (statute facts from 01-RESEARCH lines 410-433).
- **Verify payloads as temp script files**: PowerShell 5.1 strips embedded `"` from `node -e` args (D-12 class, 01-01 lesson) — all verify payloads ran byte-identical from temp `.js` files.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] PowerShell mangled the multi-line commit message**
- **Found during:** Task 1 (first commit attempt)
- **Issue:** A here-string commit message with embedded double quotes was torn apart by the Windows shell (same D-12 mangling class as the verify payloads) — git treated message fragments as pathspecs and the commit aborted
- **Fix:** Commit messages written to temp `.txt` files and applied via `git commit -F <file>` (ASCII-only message text to avoid console-encoding mojibake)
- **Files modified:** none (tooling only; repo unchanged)
- **Verification:** commit `48ef0e5` landed cleanly; re-used for Task 2's commit `fbc7330`
- **Committed in:** n/a (verification tooling; no repo change)

---

**Total deviations:** 1 auto-fixed (blocking, tooling-only — no planned scope touched)
**Impact on plan:** None — both tasks shipped exactly as planned; all acceptance criteria proven.

## Issues Encountered

- PowerShell 5.1 quote-mangling applies to `node -e` payloads AND multi-line commit messages alike — both mitigated with temp files (01-01 lesson generalized; see Deviations).
- 01-01's documented interim `/themen/` topic-card dead-ends remain open (Phases 2/3 build those pages) — they now resolve to the new friendly 404 instead of a browser default; still tracked in `.planning/WINDOWS.md` entry 1.
- New ledger entry: the Impressum's four parent-data placeholders are intentionally unfilled until the parent replaces them before the first share (`.planning/WINDOWS.md` entry 2, LEGAL-01 human launch gate).

## Known Stubs

- `src/impressum.njk` carries the four bracketed parent-data placeholders + the parent TODO comment — **intentional and plan-mandated** (D-10: the data is the parent's, never invented). The page itself is complete; the DATA is the launch-gate human step owned by plan 01-04. Recorded in `.planning/WINDOWS.md` (entry 2) so `/gsd-ship` blocks until it is resolved or waived.

## User Setup Required

- **Before the first share of the URL:** the parent replaces the four bracketed placeholders in `src/impressum.njk` with real data (name, street, PLZ+city, parent email) — the in-file TODO comment marks the spot. Nothing else: no accounts, keys, or external services are involved (D-13).

## Next Phase Readiness

- Plan 01-03 drops `src/manifest.webmanifest` + `src/icons/*` into the already-wired passthrough dirs — zero config edits; the zero-host gate must be re-run there (it will then scan `.webmanifest` too).
- Plan 01-04 adds the deploy workflow + live-URL gates; the parent data fill (this plan's placeholder stub) and the on-device checks are the end-of-phase human steps.
- Footer legal links now resolve to built pages; only the `/themen/` topic cards remain interim dead-ends (WINDOWS.md entry 1, resolved in Phases 2/3).
- REQUIREMENTS.md: LEGAL-01/LEGAL-02/PRIV-01 stay checkbox-blocked by the shared-ID gate (LEGAL-01/02 also declared by 01-04; PRIV-01 also by 01-01 [done]/01-03) — plan-level completion is recorded in this SUMMARY's `requirements-completed`.

---
*Phase: 01-foundation-shell-pwa-identity-first-deploy*
*Completed: 2026-09-28*

## Self-Check: PASSED

- SUMMARY.md exists: `.planning/phases/01-foundation-shell-pwa-identity-first-deploy/01-02-SUMMARY.md` ✓
- Commit `48ef0e5` (Task 1 — legal pages) found in git log ✓
- Commit `fbc7330` (Task 2 — 404 + zero-host gate) found in git log ✓
- All 3 created source files exist (`src/impressum.njk`, `src/datenschutz.njk`, `src/404.njk`) ✓
- `npm.cmd run build` green at close; measured `commits: 2` from ledger `88e2cc0..HEAD` ✓
- Zero-host gate green over 6 built files; footer legal nav proven on all 4 built pages ✓
- WINDOWS.md entry 2 appended for the intentional Impressum placeholders (open_count: 2) ✓
