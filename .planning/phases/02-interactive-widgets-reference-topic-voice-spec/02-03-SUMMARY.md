---
phase: 02-interactive-widgets-reference-topic-voice-spec
plan: 03
subsystem: happi-identity-layer-inline-svg
tags: [eleventy, nunjucks, inline-svg, includes, header-partial, mascot-identity, a11y, aria-hidden, zero-request, accessibility, german]

# Dependency graph
requires:
  - phase: 02-interactive-widgets-reference-topic-voice-spec
    provides: "02-01: themen.njk/index.njk structure + topics.json; 02-02: site.css widget styling + app.js (this plan appends header/hero rules to the same site.css)"
  - phase: 01-foundation-shell-pwa-identity-first-deploy
    provides: "src/icons-src/happi-source.svg (the ONE art source, untouched), design tokens (--tap-min 48px, cream/ginger/cocoa), head/footer includes, build+temp-script verify discipline"
provides:
  - "src/_includes/happi-illus.svg — inline-SVG include derived from the one art source (bg rect dropped, role=img + <title>Happi, die Handy-Katze</title>, zero template syntax)"
  - "src/_includes/header.njk — shared header partial: skip link + 32px aria-hidden Happi mark + conditional Start .card (Phase 1 preserved on every non-home page)"
  - "src/index.njk / src/themen.njk — 160px .happi-hero on the home page and the full-content reference topic only (D-11/D-12)"
  - "src/impressum.njk / src/datenschutz.njk / src/404.njk — wired to the shared header (skip link + mark + Start card)"
  - "src/css/site.css — .site-header flex row, .happi-mark (32px flex 0 0 auto), .happi-hero (160px)"
affects: ["phase-3 (every future topic inherits header mark + hero with zero template work)", "phase-4 (standalone Start/Zurück nav extends the same header.njk partial; real-device visual QA extends this identity layer)"]

# Actuals (#2632) — same estimateTokens scale (chars/4 over the realized diff).
actuals:
  tokens: 1722          # 6,889 diff chars / 4 (realized production diff this plan)
  tasks: 2
  commits: 2            # MEASURED: git rev-list --count 9906c9a..HEAD (#3968)
  plan_head_before: 9906c9a756a63f0f7428f77616ed20cbeb0f845c
  plan_head_after: cfadf2390f15b01033b26b64fbd18d691ee7214c

# Tech tracking
tech-stack:
  added: []   # zero new packages (inline SVG + built-in Nunjucks includes)
  patterns:
    - "Inline-SVG include: one art source derives a markup variant ({% include \"happi-illus.svg\" %}) inlined into every page — zero HTTP requests, CSS-sizeable, no served asset"
    - "Shared header partial extracted so EVERY template (incl. themen/404) gets skip link + mark; a page.url guard keeps the Phase 1 in-app Start card on all non-home pages"
    - "Decorative-vs-meaningful split: header mark span is aria-hidden (decoration, no target-size obligation); the hero keeps the include's role=img + single <title> as its accessible name"
    - "Include comment hygiene: the SVG include must not contain a literal image-element tag string (any naive image-tag walker would false-positive)"
    - "Sizing via fixed px on decorative icons only (.happi-mark 32px / .happi-hero 160px) — never fixed width on layout containers"

key-files:
  created:
    - src/_includes/happi-illus.svg
    - src/_includes/header.njk
  modified:
    - src/css/site.css
    - src/index.njk
    - src/themen.njk
    - src/impressum.njk
    - src/datenschutz.njk
    - src/404.njk

key-decisions:
  - "The illustration is an inline-SVG include (never served, never an image element) — the whole identity layer adds zero HTTP requests (PRIV-01, T-02-08)"
  - "happi-illus.svg is hand-derived from happi-source.svg: same shapes/hexes, only the background rect dropped — the Phase 1 icon pipeline stays untouched (A6)"
  - "One header.njk partial on all five templates; the Start card is guarded by page.url != \"/\" (pre-pathPrefix value), so home drops it while impressum/datenschutz/404/themen keep the Phase 1 affordance"
  - "Header mark is aria-hidden decoration (flex 0 0 auto, 32px) — not a control, no target-size obligation, never crowds the skip link or ≥48px Start card (Pitfall 7)"
  - "Hero placement: home hero at the top of main; topic hero after the h1 inside the {% if topic.facts %} branch, so stub/legal/404 pages carry the mark only"
  - "404 keeps its in-main '← zurück zur Startseite' card AND the header Start card (both affordances expected per plan-checker advisory; preserves the 404 recovery copy 'aber Happi führt dich zurück')"
  - "The include comment was reworded to avoid a literal image-element tag string — keeps every zero-image-tag walker (this phase and future) honest"

patterns-established:
  - "Pattern 1: one art source → one inline include → mark+hero+ (future) every surface; identical look everywhere, zero extra requests"
  - "Pattern 2: header identity (skip link + decorative mark + conditional nav card) lives in one partial; pages stay declarative (template-only include)"
  - "Pattern 3: the zero-image/zero-external-host walker covers every built file incl. inlined markup — the identity layer cannot regress the no-data promise"

requirements-completed: [VOICE-01]  # copied verbatim from 02-03-PLAN.md frontmatter; REQUIREMENTS.md checkbox marked complete now that the shared-ID gate (02-01 + 02-03) is satisfied

# Coverage metadata (#1602) — one entry per shipped deliverable.
coverage:
  - id: D1
    description: "src/_includes/happi-illus.svg — hand-derived inline-SVG include: viewBox 0 0 512 512, all art shapes and locked hexes (#E8863A/#FFD9B8/#4A3728), background rect dropped, role=img + <title>Happi, die Handy-Katze</title>, zero Nunjucks template syntax, no width forcing"
    requirement: VOICE-01
    verification:
      - kind: e2e
        ref: "npm.cmd run build && node gsd-verify-02-03-task1.js -> 30/30 PASS (viewBox, role=img, title text, bg-rect dropped, 2 ear polygons, head r=152, whiskers, no {{/{%-, no width=)"
        status: pass
    human_judgment: false
  - id: D2
    description: "src/_includes/header.njk — shared header partial: skip link + <span class=\"happi-mark\" aria-hidden=\"true\"> wrapping the illustration include + Start .card guarded by page.url != \"/\""
    requirement: VOICE-01
    verification:
      - kind: e2e
        ref: "node gsd-verify-02-03-task1.js -> header skip link, aria-hidden mark span, happi-illus include, page.url guard, .card + url filter + '← Start' PASS"
        status: pass
    human_judgment: false
  - id: D3
    description: "src/css/site.css — .site-header flex row (skip hidden-until-focus, mark never stretches), .happi-mark 32px flex 0 0 auto, .happi-hero 160px; token-pure, zero external url()/@import, no new hexes, no dark-mode rules"
    requirement: VOICE-01
    verification:
      - kind: e2e
        ref: "node gsd-verify-02-03-task1.js -> .happi-mark/.happi-hero/.site-header present, 32px/160px widths, flex 0 0 auto, no @import, no external url() PASS"
        status: pass
    human_judgment: false
  - id: D4
    description: "All five templates wired to the shared header (skip link + mark everywhere; Start card on every non-home page) and heroes added on the home page and the full-content reference topic — verified by walking all 9 built .html files"
    requirement: VOICE-01
    verification:
      - kind: e2e
        ref: "npm.cmd run build && node gsd-verify-02-03-task2.js -> 66/66 PASS (per-page mark span/aria-hidden/skip link; non-home Start card; home lacks Start; svg counts exactly 2 on home+bildschirmzeit and 1 elsewhere; head wiring manifest/apple-touch-icon/favicon intact; app.js only on topic pages)"
        status: pass
    human_judgment: false
  - id: D5
    description: "Zero-request / zero-data promise intact site-wide: ZERO image-element tags and ZERO fetchable external references in any built file (including the newly inlined SVG markup and comments)"
    requirement: VOICE-01
    verification:
      - kind: e2e
        ref: "node gsd-verify-02-03-task2.js -> 'ZERO image-element tags in any built file' PASS; 'ZERO fetchable external references in any built file' PASS (xmlns namespaces stripped)"
        status: pass
    human_judgment: false
  - id: D6
    description: "Visual identity check: Happi renders warm & cozy standing as a recognizable cat at hero size on the start page and the reference topic, and the 32px header mark looks good at 320px without crowding the skip link / Start card"
    verification: []
    human_judgment: true
    rationale: "SC requires a human to confirm the mascot reads as a charming cat at hero size and that the compact header mark does not crowd the mobile layout — automation proves structure, counts, and the zero-request gates, not visual charm or felt layout at 320px (end-of-phase human_verify_mode: end-of-phase)."

# Metrics
duration: 1min
completed: 2026-10-01
status: complete
---

# Phase 2 Plan 03: Happi Identity — Inline-SVG Include + Shared Header + Heroes Summary

**Happi is now visible site-wide with zero new requests: one inline-SVG include (derived from the untouched one-art-source) renders a 160px hero on the start page and the reference topic plus a 32px decorative mark in a new shared `header.njk` on every built page — skip-to-content and the Phase 1 Start card preserved, verified by a 9-page walker**

## Performance

- **Duration:** ~1 min
- **Started:** 2026-10-01T12:46:16Z
- **Completed:** 2026-10-01T12:47:24Z
- **Tasks:** 2 (both `type="auto"`)
- **Files modified:** 8 (2 created, 6 modified)

## Accomplishments

- **Happi becomes the site's mascot without a single new request** (D-11/D-12, backlog 999.1 resolved): `src/_includes/happi-illus.svg` is an inline-SVG include hand-derived from `src/icons-src/happi-source.svg` — identical art shapes and locked hexes, only the warm-cream background rect dropped (page cream shows through), `role="img"` + `<title>Happi, die Handy-Katze</title>` added, and **zero Nunjucks template syntax** so the include passes through byte-identical.
- **A shared header partial now anchors the identity on every page**: `src/_includes/header.njk` carries the skip link, the `aria-hidden` 32px Happi mark, and the Phase 1 in-app Start card guarded by `page.url != "/"` — so home drops the card while impressum, datenschutz, 404 and every topic page keep the ≥48px affordance.
- **Heroes land exactly where the decisions say**: the 160px `.happi-hero` appears on the home page (top of main) and on the reference topic `bildschirmzeit` (inside the `{% if topic.facts %}` branch) — stub/legal/404 pages carry the compact mark only. The walker confirms the inline-svg counts: **exactly 2** on home + full topic, **exactly 1** everywhere else.
- **The zero-data promise holds on every page**: the site-wide walker proves **ZERO image-element tags** and **ZERO fetchable external references** across all 9 built `.html` files plus assets, and the Phase 1 head-wiring (manifest / apple-touch-icon / favicon / theme-color) is unchanged on every page.
- **Layout safety (Pitfall 7)**: the mark is `flex: 0 0 auto` at a fixed 32px — decoration, not a control, no target-size obligation — and the Start card keeps its `min-height: var(--tap-min)` 48px, so the header does not wrap or crowd at 320px.

## Task Commits

Each task was committed atomically:

1. **Task 1: happi-illus.svg include + header.njk partial + header/hero CSS** - `e447c73` (feat)
2. **Task 2: wire header into all five templates + Happi heroes** - `cfadf23` (feat)

**Plan metadata:** (docs: complete plan) — see the final metadata commit.

## Files Created/Modified

- `src/_includes/happi-illus.svg` — **created**: the inline-SVG include (bg rect dropped, role=img + title, zero template syntax)
- `src/_includes/header.njk` — **created**: shared header (skip link + 32px aria-hidden mark + conditional Start .card)
- `src/css/site.css` — **modified**: `.site-header` flex row, `.happi-mark` (32px, flex 0 0 auto), `.happi-hero` (160px)
- `src/index.njk` — **modified**: header replaced by the include; home hero added
- `src/themen.njk` — **modified**: header include added; topic hero added in the full-content branch
- `src/impressum.njk` — **modified**: inline header replaced by the include
- `src/datenschutz.njk` — **modified**: inline header replaced by the include
- `src/404.njk` — **modified**: inline header replaced by the include (in-main recovery card kept)

## Decisions Made

- The illustration ships as an inline include (never served, never an image element) — the identity layer adds zero HTTP requests.
- Only the background rect is dropped from the source art; the Phase 1 icon pipeline (maskable/favicon/PNGs) stays untouched (A6).
- The Start card guard uses the pre-pathPrefix `page.url != "/"`, so it appears on impressum/datenschutz/404 and all topic pages but not home.
- The header mark is `aria-hidden` decoration; the hero keeps the include's `role="img"` + single `<title>` as its accessible name — no duplicate visible labels.
- **404 double-Start choice (per plan-checker advisory):** kept BOTH the header Start card and the in-main `← zurück zur Startseite` card. The advisory states the walker passes either way; keeping both preserves the 404's recovery copy ("aber Happi führt dich zurück") and its prominent in-page link. Documented here as the logged choice.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] SVG include comment contained a literal image-element tag string**
- **Found during:** Task 2 (the zero-image-tag walker over every built file)
- **Issue:** The `happi-illus.svg` explanatory comment literally contained the string `<img>` ("never served, never an `<img>`"). Because the include is inlined into every page, the literal `<img>` appeared in all 9 built files and tripped the plan's own "ZERO image-element tags" gate (and would trip any future naive walker).
- **Fix:** Reworded the comment to "never served, never an image element" — same intent, no literal tag string in the output.
- **Files modified:** `src/_includes/happi-illus.svg`
- **Verification:** re-ran → `66/66 assertions PASS`, "ZERO image-element tags in any built file" PASS
- **Committed in:** `cfadf23` (Task 2 commit)

---

**Total deviations:** 1 auto-fixed (1 bug — include comment hygiene; no scope change to the deliverables)
**Impact on plan:** The deliverables match the plan exactly; the fix keeps the zero-image/zero-request gate honest for this phase and future ones.

## Issues Encountered

- The Task 2 walker initially failed on the literal `<img>` inside the include comment (see deviation 1) — resolved by rewording the comment; not a product defect.
- PowerShell 5.1 renders the German em-dash/umlaut and arrow characters as console mojibake; all content was read byte-level via Node (UTF-8 on disk correct — the established Phase 1 discipline).
- An untracked `PROJECT-HANDOFF.md` sits at the repo root (not created by this plan; left untouched).
- Git warned `LF will be replaced by CRLF` on the modified files (standard Windows autocrlf notice; content committed as written, verified byte-level by Node).

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- **This is the last plan of Phase 2** — the phase goal (reference topic + self-check + tips + voice spec + visible Happi identity) is complete and ready for `/gsd-verify-work` / phase verification.
- **Phase 4** extends the same `header.njk` partial for the standalone Start/Zurück affordance; the mark is flex-anchored and additive, so a future persistent affordance slots in without touching pages.
- **Carried end-of-phase human checks:** the visual identity check (D6: Happi recognizable/cute at hero size; header mark clean at 320px) plus the earlier-carried self-check tap→reflection and unaided-read checks.
- REQUIREMENTS.md: VOICE-01 marked complete (shared-ID gate satisfied by 02-01 + 02-03); SELF-01/TIPS-01 were marked at 02-02.

## Self-Check: PASSED

- SUMMARY.md exists: `.planning/phases/02-interactive-widgets-reference-topic-voice-spec/02-03-SUMMARY.md` ✓
- `src/_includes/happi-illus.svg` exists + committed (`e447c73`) ✓
- `src/_includes/header.njk` exists + committed (`e447c73`) ✓
- `src/css/site.css` modified + committed (`e447c73`) ✓
- Five templates wired + committed (`cfadf23`) ✓
- `npm.cmd run build` green; Task 1 verify 30/30, Task 2 verify 66/66 ✓
- Measured `commits: 2` from ledger `9906c9a..HEAD` ✓

---
*Phase: 02-interactive-widgets-reference-topic-voice-spec*
*Completed: 2026-10-01*
