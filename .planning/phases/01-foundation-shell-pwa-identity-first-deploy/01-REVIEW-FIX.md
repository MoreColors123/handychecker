---
phase: 01-foundation-shell-pwa-identity-first-deploy
fixed_at: 2026-10-01T10:05:10Z
review_path: .planning/phases/01-foundation-shell-pwa-identity-first-deploy/01-REVIEW.md
iteration: 1
findings_in_scope: 8
fixed: 8
skipped: 0
status: all_fixed
---

# Phase 01: Code Review Fix Report

**Fixed at:** 2026-10-01T10:05:10Z
**Source review:** `.planning/phases/01-foundation-shell-pwa-identity-first-deploy/01-REVIEW.md`
**Iteration:** 1

**Summary:**
- Findings in scope: 8 (fix_scope: all — 1 critical, 3 warnings, 4 info)
- Fixed: 8
- Skipped: 0

All fixes were applied in the **main checkout** on branch `main` (`workflow.use_worktrees: false` — the project's documented opt-out, so no worktree was created). Each finding is one atomic commit.

## Fixed Issues

### CR-01: All five topic-card links build to malformed URLs — Nunjucks filter precedence bug

**Files modified:** `src/index.njk`
**Commit:** `c36e300`
**Status:** fixed (verified empirically against build output — see Verification)
**Applied fix:** Parenthesized the concatenation so the `url` filter binds to the whole expression: `{{ ('/themen/' + topic.slug + '/') | url }}` (review Option A — minimal one-line change). Rebuilt and asserted the built output: all five card hrefs changed from `/themen/<slug>/handychecker/` (verified broken pre-fix) to `/handychecker/themen/<slug>/`. The reviewer's suggested extended build-gate check (every href/src must start with `/handychecker/`) is now part of the fix verification and passes on all four pages.

### WR-01: Footer legal-nav link contrast fails WCAG AA (3.39:1)

**Files modified:** `src/css/tokens.css`, `src/css/site.css`
**Commit:** `929ab5f`
**Applied fix:** Added new token `--color-ginger-ink: #A85A1C` and switched `footer nav a` color to it. Contrast recomputed programmatically with the WCAG 2.x relative-luminance formula: **4.74:1** on cream #FFF6EC (was 3.39:1) — passes the 4.5:1 AA threshold, matching the review's math. `--color-ginger-deep` remains in use for the skip-link focus outline.

### WR-02: Skip-link colors fail WCAG AA (white on ginger = 2.66:1)

**Files modified:** `src/css/site.css`
**Commit:** `9ba494a`
**Applied fix:** Skip link now renders cocoa (#4A3728) on peach (#FFD9B8) — recomputed at **8.49:1** (review estimated ≈8.5:1). The 3px `:focus-visible` outline (ginger-deep) sits 2px outside the element on the cream page background = 3.39:1 ≥ 3:1 WCAG 1.4.11 non-text minimum, so it was left unchanged.

### WR-03: strip-png-meta.cjs silently writes a truncated file and reports "clean"

**Files modified:** `tools/strip-png-meta.cjs`
**Commit:** `3634f70`
**Applied fix:** Chunk loop now validates before any write: rejects truncated chunk headers (< 8 trailing bytes), rejects chunks whose declared length overruns the file, and refuses to write unless the final chunk is `IEND`. Corrupt input now exits 1 with a diagnostic and leaves the file untouched. `node --check` passes. Verified with 15 behavioral tests against real icon bytes: valid PNG → exit 0, "clean", output byte-identical (sha256); PNG with injected tEXt → stripped, structure intact; truncated-mid-chunk / missing-IEND / short-trailing-header → exit 1 with the right diagnostic and the file provably unmodified.

### IN-02: Canonical PWA head duplicated across four templates — drift already visible

**Files modified:** `src/_includes/head.njk` (new), `src/_includes/footer.njk` (new), `src/index.njk`, `src/404.njk`, `src/datenschutz.njk`, `src/impressum.njk`
**Commit:** `b169151`
**Applied fix:** Extracted the 13-line head into `src/_includes/head.njk` and the legal-nav footer into `src/_includes/footer.njk`; all four templates now include them. Title suffix is data-driven: subpages set `suffixTitle: true` in frontmatter, the partial appends `– {{ site.siteName }}`; the home page (whose title already contains the name) omits the flag — so a future rename touches only `site.json`. The `apple-mobile-web-app-title` drift (index hardcoding `HandyChecker`) is fixed: it now renders `{{ site.siteName }}` everywhere.

### IN-01: favicon-32.png is shipped but never referenced

**Files modified:** `src/_includes/head.njk`
**Commit:** `e667b9a`
**Applied fix:** Added `<link rel="icon" type="image/png" sizes="32x32" href="{{ '/icons/favicon-32.png' | url }}">` before the existing SVG icon link in the shared head (canonical PNG-first/SVG-last order — legacy browsers fall back to the PNG, modern browsers take the SVG). Present on all four built pages; `_site/icons/favicon-32.png` confirmed shipped.

### IN-03: deploy.yml depends on an out-of-repo manual setting (Pages source) with no in-workflow assertion

**Files modified:** `.github/workflows/deploy.yml`
**Commit:** `b066edf`
**Applied fix:** Added `actions/configure-pages@v5` to the build job (before `upload-pages-artifact`) plus a comment documenting the one-time Settings → Pages → Source = "GitHub Actions" dependency. Deliberately did **not** use `enablement: true`: enabling Pages via the action requires widening GITHUB_TOKEN permissions beyond the minimal set the review explicitly praised, and the live repo already has Pages enabled — the step's value is the early, clear failure signal on forks/transfers.

### IN-04: No service worker and no theme-color meta — install-prompt and offline behavior deferred

**Files modified:** `src/_includes/head.njk`
**Commit:** `f1e4b06`
**Applied fix:** Added `<meta name="theme-color" content="#E8863A">` to the shared head (matches manifest `theme_color`; present on all four built pages). **Not** in scope of this fix, per the review's own guidance: the ~25-line cache-first `sw.js` + registration remains scheduled for the planned next phase — no service worker was added.

## Skipped Issues

None — all 8 in-scope findings were fixed.

## Verification

**Where it ran:** main checkout (`C:\opencode\research01`, branch `main`) — no worktree was created because `workflow.use_worktrees` is `false` in `.planning/config.json`. Node v24.19.0, Eleventy 3.1.6 (`npm.cmd run build`).

- **Pre-fix baseline:** rebuilt and snapshotted `_site/` before any edit; CR-01's broken hrefs reproduced in the baseline (`/themen/<slug>/handychecker/` ×5).
- **CR-01:** post-fix build asserts all 5 card hrefs = `/handychecker/themen/<slug>/`, and an extended gate asserts **every** href/src on all four built pages starts with `/handychecker/` (in-page `#inhalt` anchors exempt). This is empirical output-level proof of the precedence fix, not just a syntax check.
- **WR-01 / WR-02:** contrast ratios computed programmatically (WCAG 2.x formula): 4.74:1 and 8.49:1 — both pass; the pre-fix failures (3.39:1, 2.66:1) reproduced for sanity.
- **WR-03:** `node --check` + 15/15 behavioral tests (happy path byte-identical; strip still works; all three corruption classes rejected with exit 1 and file untouched).
- **IN-02:** `git diff --no-index` of rebuilt pages vs pre-fix snapshot: 404/datenschutz/impressum differ only by 4 whitespace-only lines from the include directives (0 content changes); index adds only the CR-01 href fixes. `<title>` of every page byte-identical to pre-fix.
- **Final gate:** 40/40 checks pass (subpath rule ×4 pages, icon/theme-color/app-title presence ×4, title regression ×4, footer nav ×4, 5 correct card slugs, 9 shipped assets, manifest JSON + `theme_color`/`start_url`/`scope` intact).
- **Git:** working tree clean; 8 atomic commits, each listing its files: `c36e300`, `929ab5f`, `9ba494a`, `3634f70`, `b169151`, `e667b9a`, `b066edf`, `f1e4b06`. Nothing pushed (orchestrator pushes after this report).

**Deferred (tracked, not a fix gap):** `sw.js` + registration for the automatic install prompt and offline support — next-phase scope per IN-04 and the phase plans.

---

_Fixed: 2026-10-01T10:05:10Z_
_Fixer: the agent (gsd-code-fixer)_
_Iteration: 1_
