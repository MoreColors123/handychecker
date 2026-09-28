---
phase: 01-foundation-shell-pwa-identity-first-deploy
reviewed: 2026-09-28T16:17:34Z
depth: standard
files_reviewed: 16
files_reviewed_list:
  - .github/workflows/deploy.yml
  - .gitignore
  - eleventy.config.js
  - package.json
  - src/404.njk
  - src/_data/site.json
  - src/css/site.css
  - src/css/tokens.css
  - src/datenschutz.njk
  - src/icons-src/happi-source.svg
  - src/icons/favicon.svg
  - src/icons/icon-maskable.svg
  - src/impressum.njk
  - src/index.njk
  - src/manifest.webmanifest
  - tools/strip-png-meta.cjs
findings:
  critical: 1
  warning: 3
  info: 4
  total: 8
status: issues_found
---

# Phase 01: Code Review Report

**Reviewed:** 2026-09-28T16:17:34Z
**Depth:** standard
**Files Reviewed:** 16
**Status:** issues_found

## Summary

Reviewed all 16 changed source files at standard depth, plus empirical verification: ran `eleventy` against the actual build, dumped every `href` in the four built HTML pages, verified PNG IHDR dimensions against the manifest, checked PNG chunk layouts for metadata residue, re-ran the phase's zero-external-host gate, and reproduced the one critical bug with a minimal Nunjucks test.

The phase is in good shape overall: the deploy workflow is secret-free with pinned action majors and minimal permissions (matches plan 01-04 verbatim); the manifest uses relative `start_url`/`scope`/icon paths correctly for the `/handychecker/` subpath; PNG dimensions match manifest `sizes` strings exactly (192/512/180/32); maskable art sits inside the 80% safe zone (max radial extent ≈203.1 px ≤ 204.8); PNGs carry no tEXt/iTXt/zTXt/eXIf chunks (strip tool worked); the zero-external-host gate passes on the real build; German copy, `lang="de"`, §5-DDG placeholders-only and the child zero-data sentence all match the plans; the missing `/themen/` pages are an intentional interim dead-end per plan 01-01.

However, the build's most load-bearing promise — plan 01-01 must-have truth #3, "Every internal href and src in the built home page resolves under the `/handychecker/` subpath" — is violated by all five topic-card links, which are the homepage's primary navigation. That is the single blocker. Three warnings cover two WCAG AA contrast failures and a silently-corrupting edge case in the PNG metadata tool.

## Critical Issues

### CR-01: All five topic-card links build to malformed URLs — Nunjucks filter precedence bug in index.njk

**File:** `src/index.njk:28`
**Issue:** The expression `{{ '/themen/' + topic.slug + '/' | url }}` does not filter the concatenated string. In Nunjucks, the filter binds to the nearest operand, so `url` is applied **only to the trailing `'/'` literal**; the prefix lands at the *end* of the string. Verified twice:

- Built output `_site/index.html` contains `href="/themen/bildschirmzeit/handychecker/"` (and the same shape for all five slugs) — prefix appended after the path instead of prepended.
- Minimal repro with a mock `url` filter: `{{ '/themen/' + topic.slug + '/' | url }}` → `/themen/x/PREFIX/`, while `{{ ('/themen/' + topic.slug + '/') | url }}` → `/PREFIX/themen/x/`.

Consequences on the deployed site (`https://<user>.github.io/handychecker/`): all five topic cards link to `/themen/<slug>/handychecker/` — a path that (a) is outside the app `scope` (`/handychecker/`), (b) 404s now, and (c) **will still 404 after Phase 2/3 creates the real pages**, because those will live at `/handychecker/themen/<slug>/`. This silently defeats plan 01-01's own subpath-safety gate (threat T-01-04, research Pitfall 1) — the plan's verify only asserted the footer/head literals, so the broken card URLs passed the build gate unnoticed.

**Fix:**
```njk
{# Option A: parenthesize so the filter sees the full expression #}
<li><a class="card" href="{{ ('/themen/' + topic.slug + '/') | url }}">{{ topic.title }}</a></li>

{# Option B (clearer): precompute in front of the loop #}
{%- for topic in site.topics -%}
  {%- set topicUrl = '/themen/' + topic.slug + '/' -%}
  <li><a class="card" href="{{ topicUrl | url }}">{{ topic.title }}</a></li>
{%- endfor -%}
```
Then rebuild and assert in the build gate: every `href` in `_site/index.html` must start with `/handychecker/` (the existing check for footer links should be extended to the card links).

## Warnings

### WR-01: Footer legal-nav link contrast fails WCAG AA (3.39:1)

**File:** `src/css/site.css:105-111` (token defined at `src/css/tokens.css:8`)
**Issue:** Footer links use `--color-ginger-deep` (#C96F2A) on the cream page background (#FFF6EC). Computed contrast ratio is **3.39:1**, below the 4.5:1 WCAG AA threshold — these are 18px regular-weight links (not "large text"), used on every page of a site aimed at young readers. Plan 01-01 only verified the cocoa-on-cream ratio; the ginger-deep link color was never contrast-checked.
**Fix:** Either darken the link color, e.g. a new token `--color-ginger-ink: #A85A1C` (≈4.74:1 on cream — verified by the same math), or reuse `var(--color-cocoa)` (≈10.5:1) for footer link text and keep `--color-ginger-deep` for hover backgrounds/borders only.

### WR-02: Skip-link colors fail WCAG AA (white on ginger = 2.66:1)

**File:** `src/css/site.css:78-79` (tokens at `src/css/tokens.css:7,12`)
**Issue:** The visually-hidden-until-focus skip link renders `--color-text-on-ginger` (#FFFFFF) on `--color-ginger` (#E8863A) → **2.66:1**. The element whose entire purpose is keyboard navigation is itself below the AA threshold for its visible state.
**Fix:**
```css
.skip {
  background: var(--color-peach);      /* #FFD9B8 */
  color: var(--color-cocoa);           /* ≈8.5:1 */
}
```
(or cream-on-cocoa ≈10.5:1) — both stay within the warm palette.

### WR-03: strip-png-meta.cjs silently writes a truncated file and reports "clean" for corrupt input

**File:** `tools/strip-png-meta.cjs:27-38`
**Issue:** The chunk loop reads `len = b.readUInt32BE(i)` without validating that the declared chunk fits in the buffer. If the input is truncated *after* a chunk's 8-byte header (or the length field is garbage-but-in-bounds), `subarray` clamps, `i` jumps past the end, the loop exits mid-stream, and the tool **writes the shrunken buffer back over the original file and prints `clean`** — a silently corrupt PNG that could then be committed as an icon. (Truncation *within* the first 4 bytes of a length field instead throws `ERR_OUT_OF_RANGE` — loud, but with a raw stack trace rather than a diagnostic.)
**Fix:** Validate the stream before writing:
```js
let last = "";
while (i < b.length) {
  if (i + 8 > b.length) { console.error(file + ": truncated chunk header"); process.exit(1); }
  const len = b.readUInt32BE(i);
  const end = i + 12 + len;
  if (end > b.length)  { console.error(file + ": chunk overruns file (corrupt/truncated)"); process.exit(1); }
  last = b.toString("ascii", i + 4, i + 8);
  // ... existing strip logic ...
  i = end;
}
if (last !== "IEND") { console.error(file + ": missing IEND — not writing"); process.exit(1); }
fs.writeFileSync(file, Buffer.concat(out));
```

## Info

### IN-01: favicon-32.png is shipped but never referenced

**File:** `src/icons/favicon-32.png` (passthrough-copied to `_site/icons/favicon-32.png`)
**Issue:** Every page head links only `favicon.svg`; `favicon-32.png` is built and deployed but nothing points at it — a dead asset in every deploy.
**Fix:** Either add `<link rel="icon" type="image/png" sizes="32x32" href="{{ '/icons/favicon-32.png' | url }}">` after the SVG icon link (SVG-first with PNG fallback) or delete the file from `src/icons/`.

### IN-02: Canonical PWA head duplicated across four templates — drift already visible

**File:** `src/index.njk:7-19`, `src/404.njk:7-19`, `src/datenschutz.njk:6-18`, `src/impressum.njk:6-18`
**Issue:** The ~13-line head block is copy-pasted in all four templates even though `eleventy.config.js` declares `includes: "_includes"` (currently unused). Drift has already started: `index.njk:18` hardcodes `content="HandyChecker"` for `apple-mobile-web-app-title`, while the other three pages use `{{ site.siteName }}` — same value today, but a rename (plan 01-01 flags the name as costly-to-reverse) would silently miss one page.
**Fix:** Extract the head into `src/_includes/head.njk` and include it with per-page variables; same for the footer legal nav (Pattern 4), which is also duplicated ×4.

### IN-03: deploy.yml depends on an out-of-repo manual setting (Pages source) with no in-workflow assertion

**File:** `.github/workflows/deploy.yml:20-28`
**Issue:** The workflow has no `actions/configure-pages` step. `deploy-pages@v4` fails ("Pages site not enabled") unless the repo's Settings → Pages → Source is set to "GitHub Actions" — which is handled only by the human checklist in plan 01-04 (`user_setup`). If that dashboard step is skipped or a future fork/transfer resets it, every push to `main` fails with a non-obvious error.
**Fix (optional):** Add `- uses: actions/configure-pages@v5` to the build job (optionally with `enablement: true`), or at minimum document the dependency in a comment next to the `deploy` job. The workflow otherwise matches the researched spec exactly: no secrets, minimal permissions (`contents: read`, `pages: write`, `id-token: write`), pinned majors, `concurrency` group — no security findings.

### IN-04: No service worker and no theme-color meta — install-prompt and offline behavior deferred

**File:** `src/manifest.webmanifest` (whole set of pages: heads at `src/*.njk`)
**Issue:** No `sw.js` exists anywhere in the repo and no page carries `<meta name="theme-color">`. Chromium's *menu* install works without a service worker (≥108), so PWA-01's core installability is served; but the **automatic** install prompt still requires a non-empty `fetch()` handler, and offline re-opening of visited pages does not work. Also, outside standalone mode the Android browser chrome tint falls back to defaults without a `theme-color` meta. If both are Phase-2 scope this is fine; the phase plans never promise them — noting so it isn't lost.
**Fix:** Add `<meta name="theme-color" content="#E8863A">` to the (deduplicated, see IN-02) head now; schedule the ~25-line cache-first `sw.js` + registration in the planned next phase.

---

_Reviewed: 2026-09-28T16:17:34Z_
_Reviewer: the agent (gsd-code-reviewer)_
_Depth: standard_