---
phase: 02-interactive-widgets-reference-topic-voice-spec
plan: 02
subsystem: widget-interactivity-and-interaction-enhancer
tags: [css, has-selector, progressive-enhancement, aria-live, accessibility, app.js, self-check, tips, privacy-by-construction, german]

# Dependency graph
requires:
  - phase: 02-interactive-widgets-reference-topic-voice-spec
    provides: "02-01: reference-topic widget markup (fieldset/radio/label/reflection + role=status live region), src/js passthrough, deferred app.js script tag in themen.njk"
  - phase: 01-foundation-shell-pwa-identity-first-deploy
    provides: "design tokens (--tap-min 48px, --color-peach, --color-ginger, --radius-md/lg), site.css .card pattern, build+temp-script verify discipline"
provides:
  - "src/css/site.css — pure-CSS :has(input:checked) tap→reflection reveal, >=48px tap targets, .selfcheck card frame, visually-hidden live region, .tips action rows, .balance counterview, .fact readability"
  - "src/js/app.js — the one generic ~24-line aria-live enhancer (textContent-only, zero storage/network/innerHTML), passthrough-served at /handychecker/js/app.js"
affects: ["02-03 (Happi identity: adds CSS reaches for the illustration include into the now-styled topic shell)", "phase-3 (all future topics inherit the reusable widget + tips + balance styling with zero new CSS)", "phase-4 QA (real-device tap test + 320-430px tap-target/no-scroll check extend these rules)"]

# Actuals (#2632) — same estimateTokens scale (chars/4 over the realized diff).
actuals:
  tokens: 1278          # 5,111 diff chars / 4 (realized diff this plan)
  tasks: 2
  commits: 2            # MEASURED: git rev-list --count 7fd1331..HEAD (#3968)
  plan_head_before: 7fd13316cf7cf674e0e7eabb8c8b2c0148fed209
  plan_head_after: a8825c7495e43e50de821728f24c7b4ea696213a

# Tech tracking
tech-stack:
  added: []   # zero new packages (browser-native CSS :has() + vanilla JS)
  patterns:
    - "Pure-CSS reveal: .selfcheck__option:has(input:checked) .selfcheck__reflection { display:block } — anchored to the small option container, never body/:root (MDN performance-safe shape)"
    - "Radio + <label> as the >=48px tap surface (min-height var(--tap-min)); native radios give exclusive selection + keyboard nav for free"
    - "reveal-only enhancer: app.js never drives the visible swap — it only mirrors the chosen text into the initial-markup role=status live region via textContent"
    - "Live region visually-hidden with the clip/clip-path pattern (never display:none, which can suppress SR announcements)"
    - "Privacy by construction: the radio checked bit IS the whole state; no storage/network/innerHTML tokens anywhere in the phase's only client JS"

key-files:
  created:
    - src/js/app.js
  modified:
    - src/css/site.css

key-decisions:
  - "Reflection reveal is 100% CSS (:has()) so the widget works with zero JS; app.js is an announcement-only enhancement"
  - "The label — not the input — is the tap surface, sized to the existing --tap-min 48px token (PWA-02 carry-over); radio is 24px with accent-color var(--color-ginger)"
  - "Live region uses the visually-hidden clip pattern, not display:none (MDN: display:none can suppress live-region announcements)"
  - "app.js copies label + ' – ' + reflection into the live region via textContent only — umlaut/quote-safe and injection-free; zero storage/network/innerHTML (SC 5, PRIV-01)"
  - "Fact sections are styled via the real markup class .fact (the plan's prose said '.topic-facts', but 02-01's themen.njk emits class=\"fact\") — the styling targets the shipped class"
  - "All new CSS is token-pure, zero-external, light-only, and free of fixed-width traps (320px-safe)"

patterns-established:
  - "Pattern 1: interaction state is the DOM (radio checked) — no persistence, reload forgets; the CSS reveal and the SR announcement both read the same DOM truth with no duplication"
  - "Pattern 2: one generic enhancer serves every future topic; content lives in markup, JS stays topic-agnostic"
  - "Pattern 3: build-output verification runs against _site/ disk paths (pathPrefix applies to URLs, not passthrough disk paths) and decodes nothing external for the zero-host walker"

requirements-completed: [SELF-01, TIPS-01]  # copied verbatim from 02-02-PLAN.md frontmatter; REQUIREMENTS.md checkboxes governed by the shared-ID gate

# Coverage metadata (#1602) — one entry per shipped deliverable.
coverage:
  - id: D1
    description: "Pure-CSS tap→reflection reveal in src/css/site.css: .selfcheck__reflection { display:none } default + .selfcheck__option:has(input:checked) .selfcheck__reflection { display:block }, anchored to the option container; label as inline-flex >=48px surface; 24px ginger accent-color radio (SELF-01, D-02/D-04)"
    requirement: SELF-01
    verification:
      - kind: e2e
        ref: "npm.cmd run build && node gsd-verify-02-02-task1.js -> 24/24 PASS (reveal rules present, anchored to .selfcheck__option, min-height var(--tap-min), accent-color var(--color-ginger), 24px radio)"
        status: pass
    human_judgment: false
  - id: D2
    description: "Reference-topic content styling: .selfcheck card frame + fieldset spacing, .tips distinct action-row block (card bg, >=48px padded rows), .balance peach/accent counterview, .fact readability headings — token-only, zero-external, light-only, no fixed-width traps"
    requirement: TIPS-01
    verification:
      - kind: e2e
        ref: "node gsd-verify-02-02-task1.js -> .selfcheck/.tips/.balance/.fact selectors present; no @import/url()/hex/prefers-color-scheme; no fixed px width on layout containers PASS"
        status: pass
    human_judgment: true
    rationale: "SC 2 is a presentation judgment — a human must confirm the tip box reads as things-she-can-DO (not more facts) and the balance block reads positive/warm on the real page (end-of-phase check)."
  - id: D3
    description: "src/js/app.js — the ~24-line generic IIFE aria-live enhancer: querySelectorAll('.selfcheck__group'), change listener with radio guard, closest .selfcheck__option walk, label + ' – ' + reflection written via textContent into .selfcheck__live; built at /handychecker/js/app.js"
    requirement: SELF-01
    verification:
      - kind: e2e
        ref: "node gsd-verify-02-02-task2.js -> structure assertions + zero forbidden tokens (localStorage/sessionStorage/document.cookie/fetch(/XMLHttpRequest/innerHTML) in BOTH src and built; textContent used; no https?:// in the asset PASS"
        status: pass
    human_judgment: false
  - id: D4
    description: "Script tag placement: built reference topic page references <script src=\"/handychecker/js/app.js\" defer>; built home/impressum/datenschutz/404 contain NO app.js reference (Pitfall 8 — zero-JS preserved outside widget pages)"
    requirement: SELF-01
    verification:
      - kind: e2e
        ref: "node gsd-verify-02-02-task2.js -> topic page tag/defer present; all four non-topic pages free of 'app.js' PASS"
        status: pass
    human_judgment: false
  - id: D5
    description: "Zero-external-host gate re-proven over every built file INCLUDING the new /js/app.js (xmlns namespace names stripped before matching)"
    requirement: SELF-01
    verification:
      - kind: e2e
        ref: "node gsd-verify-02-02-task2.js -> zero fetchable external references in any built file (incl. app.js) PASS"
        status: pass
    human_judgment: false
  - id: D6
    description: "Real-device tap test: tap each option and see the reflection swap with no score/verdict; 320-430px viewport keeps >=48px tap targets with no horizontal scroll (SC 1/SC 5)"
    verification: []
    human_judgment: true
    rationale: "Real-device UAT is an end-of-phase human check (human_verify_mode: end-of-phase); automation proves the rules ship, not the felt interaction."

# Metrics
duration: 1min
completed: 2026-10-01
status: complete
---

# Phase 2 Plan 02: Widget Interactivity — :has() Reveal + aria-live Enhancer Summary

**The reference topic's self-check now comes alive: a pure-CSS `:has(input:checked)` reveal swaps a friendly per-answer reflection on tap with zero JavaScript, a tiny generic `app.js` mirrors that text into the initial-markup `role=status` live region for screen readers via `textContent` only, and the tips/balance/facts blocks are styled into distinct warm token-pure cards — answers live in the DOM, never stored, never transmitted**

## Performance

- **Duration:** 1 min
- **Started:** 2026-10-01T14:43:45Z
- **Completed:** 2026-10-01T14:44:27Z
- **Tasks:** 2 (both `type="auto"`)
- **Files modified:** 2 (1 created, 1 modified)

## Accomplishments

- **Tap → instant reflection works with zero JS** (SELF-01, D-02/D-04): `src/css/site.css` now carries the research-verified `.selfcheck__option:has(input:checked) .selfcheck__reflection { display: block }` reveal, anchored to the small option container (MDN performance-safe shape). Tapping a second option switches the reflection via native radio exclusivity — no button, no score, no verdict, re-tappable.
- **Tap targets and the widget shell are warm and safe**: the `<label>` is the tap surface at `min-height: var(--tap-min)` (48px), the radio is 24px with `accent-color: var(--color-ginger)`, and the section reads as one cozy card. The `role=status` live region uses the visually-hidden clip pattern — never `display:none`, which can suppress announcements.
- **The reference topic reads as distinct blocks** (TIPS-01, D-05/D-08): the "Was kann ich tun?" tips box is a card with full-width padded action rows (≥48px), the balance section is a peach/accent counterview, and the facts sections get breathing room — all from existing tokens, no new hexes, no imports, light-only, 320px-safe.
- **`app.js` ships as the one generic enhancer** (SELF-01, SC 5): a ~24-line IIFE that finds `.selfcheck__group`, listens for `change`, walks to the chosen `.selfcheck__option` and writes `label + " – " + reflection` into `.selfcheck__live` via `textContent`. It is provably free of `localStorage`/`sessionStorage`/`document.cookie`/`fetch(`/`XMLHttpRequest`/`innerHTML` in both source and built output — privacy by construction.
- **Zero-JS property preserved outside widget pages** (Pitfall 8): the deferred script tag resolves only on topic pages; home/impressum/datenschutz/404 contain no `app.js` reference. The zero-external-host gate re-proved green over all built files including the new JS asset.

## Task Commits

Each task was committed atomically:

1. **Task 1: Widget + content styling in site.css** - `3194742` (feat)
2. **Task 2: app.js generic aria-live enhancer** - `a8825c7` (feat)

**Plan metadata:** (docs: complete plan) — see the final metadata commit.

## Files Created/Modified

- `src/css/site.css` — **modified** (+124 lines): `:has()` reveal, ≥48px tap targets, `.selfcheck` frame + fieldset spacing, visually-hidden `.selfcheck__live`, `.tips` action rows, `.balance` counterview, `.fact`/heading readability
- `src/js/app.js` — **created** (24 lines): the generic textContent-only aria-live enhancer

## Decisions Made

- Reveal is 100% CSS; `app.js` is announcement-only — the visible swap never depends on JS (progressive enhancement).
- The label (not the radio) is the tap surface at the existing 48px token; radio stays 24px ginger-accented.
- Live region uses the visually-hidden clip pattern, not `display:none`.
- `app.js` writes with `textContent` only — umlaut/quote-safe, no markup-parsing path (SC 5 / T-02-06).
- Fact styling targets the real shipped class `.fact` (plan prose said `.topic-facts`; 02-01's template emits `class="fact"`).

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] Built-asset disk paths differ from the URL-prefixed paths named in the plan**
- **Found during:** Task 1 verify authoring
- **Issue:** The plan's `fails_when` referenced the built file as `/handychecker/css/site.css` (and `/handychecker/js/app.js`). Eleventy's `pathPrefix` applies to output URLs, not to passthrough-copy disk destinations; the built files actually live at `_site/css/site.css` and `_site/js/app.js`.
- **Fix:** The verify scripts read the on-disk built files (`_site/css/site.css`, `_site/js/app.js`) and separately assert the topic-page `<script>` tag carries the `/handychecker/js/app.js` URL — proving both the disk artifact and the served URL contract. No repo file changed.
- **Files modified:** verify payloads only (temp scripts; no repo file)
- **Verification:** re-ran → 24/24 and 29/29 PASS
- **Committed in:** n/a (verification tooling only)

**2. [Rule 3 - Blocking] Facts selector class name in the plan prose vs. shipped markup**
- **Found during:** Task 1 implementation
- **Issue:** Task 1 acceptance prose refers to `.topic-facts` sections, but 02-01's `src/themen.njk` emits `<section class="fact">` (not `topic-facts`).
- **Fix:** Styled the actual shipped class `.fact` (and its `h2`) so the readability requirement is met against real markup; the reveal/section selectors otherwise match the plan verbatim. No template change.
- **Files modified:** `src/css/site.css`
- **Verification:** `node gsd-verify-02-02-task1.js` asserts `.fact {` present PASS
- **Committed in:** `3194742`

---

**Total deviations:** 2 auto-fixed (both Rule 3 — 1 verification-tooling path alignment, 1 selector-name alignment). No scope creep.
**Impact on plan:** Both alignments make the verification target the artifacts as actually shipped; deliverables match the plan's intent exactly.

## Issues Encountered

- Git warned `LF will be replaced by CRLF` on both files (standard Windows autocrlf notice; content committed as written, verified byte-level by Node).

## Known Stubs

None introduced by this plan. This plan **resolves** the previously-recorded deferred stub: the `app.js` `<script defer>` tag wired in 02-01's `themen.njk` now points at a real shipped file (`src/js/app.js` → `_site/js/app.js`). The four non-reference topic pages intentionally remain `kommt bald` stubs until Phase 3 (unchanged, by design).

## Threat Flags

None — no new security-relevant surface beyond the planned trust boundary. T-02-05 (exfiltration) mitigated by architectural absence (grep gate: zero fetch/XHR/storage); T-02-06 (content-as-markup injection) mitigated by textContent-only writes; T-02-07 (live-region over-hiding) accepted with the visually-hidden clip pattern. The zero-external-host gate stays green.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- **Plan 02-03 (Happi identity)** can add the illustration include + reaches into the now-styled topic shell; the widget/content CSS is reusable across all future topics with no new styles.
- **End-of-phase human checks** carried: tap each option on a real device (reflection swaps, no score/verdict, re-tappable) and a 320–430px viewport check (≥48px targets, no horizontal scroll).
- REQUIREMENTS.md: SELF-01/TIPS-01 marking governed by the shared-ID gate (shared with 02-01/02-03); VOICE-01 remains blocked pending 02-03.

## Self-Check: PASSED

- SUMMARY.md exists ✓
- `src/css/site.css` modified + committed (`3194742`) ✓
- `src/js/app.js` created + committed (`a8825c7`) ✓
- `npm.cmd run build` green; Task 1 verify 24/24, Task 2 verify 29/29 ✓
- Measured `commits: 2` from ledger `7fd1331..HEAD` ✓

---
*Phase: 02-interactive-widgets-reference-topic-voice-spec*
*Completed: 2026-10-01*
