---
phase: 02-interactive-widgets-reference-topic-voice-spec
verified: 2026-10-02T11:45:00Z
status: passed
score: 22/22 must-haves verified
covered_files:
  - .planning/phases/02-interactive-widgets-reference-topic-voice-spec/02-01-PLAN.md
  - .planning/phases/02-interactive-widgets-reference-topic-voice-spec/02-02-PLAN.md
  - .planning/phases/02-interactive-widgets-reference-topic-voice-spec/02-03-PLAN.md
  - .planning/phases/02-interactive-widgets-reference-topic-voice-spec/02-01-SUMMARY.md
  - .planning/phases/02-interactive-widgets-reference-topic-voice-spec/02-02-SUMMARY.md
  - .planning/phases/02-interactive-widgets-reference-topic-voice-spec/02-03-SUMMARY.md
  - .planning/phases/02-interactive-widgets-reference-topic-voice-spec/02-UAT.md
  - .planning/phases/02-interactive-widgets-reference-topic-voice-spec/02-SECURITY.md
  - src/_data/topics.json
  - src/_data/site.json
  - src/themen.njk
  - src/themen-index.njk
  - src/index.njk
  - eleventy.config.js
  - src/css/site.css
  - src/js/app.js
  - src/_includes/happi-illus.svg
  - src/_includes/header.njk
  - src/impressum.njk
  - src/datenschutz.njk
  - src/404.njk
  - docs/stimme-und-stil.md
  - scripts/voice-check.js
  - package.json
covered_digest: "v2:sha256:8e1eede3a68a3912edb35e7c8269d9cb6f625c50bc6fe638b262b8fa9e3a9350"
behavior_unverified: 0
overrides_applied: 0
re_verification:
  previous_status: human_needed
  previous_score: 17/19
  gaps_closed:
    - "Tap → reflection reveal (pure-CSS :has()) — human-confirmed via 02-UAT.md Test 1 (tap answer, reflection appears instantly, choice locks, never scored)"
    - "app.js aria-live mirroring — human-confirmed via the completed 02-UAT.md device run (guided flow end-to-end)"
    - "Copy tone / never-scored / no-PII / voice-spec-example judgment prohibitions — human-confirmed via 02-UAT.md Tests 2 and 5"
    - "Happi visual quality + 320px layout — human-confirmed via 02-UAT.md Test 3 (re-check passed after ab39aad/283ddb1)"
  gaps_remaining: []
  regressions: []
deferred:
  - truth: "The remaining four topics (Schlaf, Aufmerksamkeit & Fokus, Körper, Datenschutz & Daten) carry complete print-quality content"
    addressed_in: "Phase 3"
    evidence: "Phase 3 goal: 'All five v1 topics are live with complete, source-backed German content — each following the facts-first pattern proven in Phase 2.' Phase 2 intentionally ships one reference topic + four 'kommt bald' guards."
---

# Phase 2: Interactive Widgets + Reference Topic (+ Voice Spec) Verification Report

**Phase Goal:** The reusable self-check and tip-box widgets exist, one reference topic is finished to print quality, and the friendly-guide voice spec is locked before any further copy is written.
**Verified:** 2026-10-02T11:45:00Z
**Status:** passed
**Re-verification:** Yes — after gap closure (the prior 2026-10-01 report was `human_needed` and has since gone stale)
**Mode:** mvp (ROADMAP Phase 2 `Mode: mvp`)

> **Why this report was regenerated.** The prior VERIFICATION.md (2026-10-01T14:58:30Z, `status: human_needed`, `score: 17/19`) predates the UX quick-task rounds (`261001-mdd` start page + `/themen/` overview, dedicated quiz page, single facts step, answer locking, compact back arrow). `gsd_run query verification.status` reports `stale` — source files changed after the last verifier run. This report re-verifies against the current codebase and the completed UAT.

## Goal Achievement

The phase goal is **achieved in the codebase**. All three requirements (VOICE-01, SELF-01, TIPS-01) have real, wired, data-flowing implementations. Every must-have truth is now VERIFIED: the two behavior-dependent truths and the judgment-tier prohibitions that previously routed to human verification were **closed by the completed 02-UAT.md** (6/6 human checks passed, 0 open issues). Fresh machine gates (build, voice gate, 298-assertion built-output walker) all pass. The four remaining topics are intentionally deferred to Phase 3.

### Observable Truths

| # | Truth | Status | Evidence |
|---|-------|--------|----------|
| 1 | `docs/stimme-und-stil.md` exists as the German voice spec with the 7 mandated sections + verbatim Verboten/Stattdessen pairs incl. `kann dazu führen` + locked calibration | ✓ VERIFIED | Fresh file read: all 7 exact headings present in order (+ an additive `## Stepper & Knöpfe` section); 3 Verboten + 3 Stattdessen bullets; `kann dazu führen`, `45 Minuten`, `30–60`, `Spotify` present; 8-item checklist. Lives outside `src/` (never served). |
| 2 | `npm run build` exits 0 and emits all expected routes; no route collision at `/themen/` | ✓ VERIFIED | Fresh build: exit 0, 10 files written (home, **`/themen/` overview**, 5 `/themen/<slug>/`, impressum, datenschutz, 404). The old "NO `/themen/index.html`" assertion is **superseded** by the deliberate overview page (`src/themen-index.njk`, quick `261001-mdd`); it coexists with the slug routes without collision. |
| 3 | Reference `/themen/bildschirmzeit/` presents facts → self-check → 2 tips → balance (music exemption) → "Weiter geht's" cards, now as a linear stepper | ✓ VERIFIED | Built page: `.step--facts` (h1 + 3 `.fact`) → `.quiz` step → `.tips` (2 `<li>`) → `.balance` (Spotify) → `.topic-next` (4 non-self topic cards + `Zurück zur Startseite`). 5 `[data-step]` sections; DOM order asserted. |
| 4 | Built reference copy contains ZERO forbidden (Verboten) constructions | ✓ VERIFIED | `npm.cmd run check:voice` → `Voice gate PASSED: 11 copy string(s) checked against 3 Verboten construction(s) + imperative-start scan.` Zero occurrences in built ref + `topics.json`. |
| 5 | Every internal href/src resolves under `/handychecker/`; title single-escaped, no `&amp;amp;` | ✓ VERIFIED | Walker over all 10 built pages: all root-absolute href/src prefixed `/handychecker/`; no `&amp;amp;`; ref `<title>Bildschirmzeit &amp; Balance – HandyChecker</title>`. |
| 6 | Self-check radios share a name per question group; a `role="status"` live region ships in initial markup | ✓ VERIFIED | Built ref: 3 `.selfcheck__group` fieldsets; 9 radios named `q1`/`q2`/`q3` (3 each). `<p class="selfcheck__live" role="status"></p>` in initial markup. (The old single-`q1` truth is superseded by the 3-question design — exclusivity per name-group holds.) |
| 7 | The four content-less topics emit `kommt bald` guard pages | ✓ VERIFIED | Each of schlaf/aufmerksamkeit/koerper/datenschutz built page contains `kommt bald` and no `.selfcheck__group`. |
| 8 | Tapping an answer reveals its reflection via pure CSS `:has()`; radio-group exclusivity per question | ✓ VERIFIED | Source + built CSS carry `.selfcheck__option:has(input:checked) .selfcheck__reflection{display:block}` + default `display:none`. Runtime behavior **human-confirmed** by 02-UAT.md Test 1 ("tap an answer, reflection appears instantly, choice locks"). Note: app.js now locks the answer after the first pick (radios `disabled`) — the no-JS path keeps radios switchable. |
| 9 | Tap target ≥48px (`min-height: var(--tap-min)`), 24px radio with `accent-color` | ✓ VERIFIED | Built site.css: label `min-height: var(--tap-min)`; radio `width/height: 24px; accent-color: var(--color-ginger)`. |
| 10 | Built `js/app.js` is the generic enhancer: mirrors label+reflection into the `role=status` live region via `textContent` only; zero storage/fetch/XHR/innerHTML | ✓ VERIFIED | Structure + gates VERIFIED (walker): `textContent` used; ZERO `localStorage`/`sessionStorage`/`document.cookie`/`fetch(`/`XMLHttpRequest`/`sendBeacon`/`innerHTML`/`eval(` tokens in src AND built. Runtime AT announcement human-confirmed via the completed UAT device run. app.js is now ~276 lines (stepper + quiz gate + answer locking added) — the aria-live contract is intact (lines 58–62). |
| 11 | `app.js` defer-loads on topic pages only; home/overview/legal/404 ship zero JS | ✓ VERIFIED | Walker: each topic page has `<script src="/handychecker/js/app.js" defer>`; index/themen over/impressum/datenschutz/404 contain no `app.js` reference. |
| 12 | Tips box, balance section, facts sections render as distinct styled blocks | ✓ VERIFIED | Built site.css carries `.tips` (card bg, ≥48px rows), `.balance` (peach + ginger accent border), `.fact`/`.tips`/`.balance` h2 spacing; token-only, zero `@import`/external `url()`, no dark-mode blocks. |
| 13 | Zero external hosts across all built files incl. `js/app.js` | ✓ VERIFIED | Walker over every built `.html/.css/.js/.svg/.webmanifest` (xmlns stripped): zero fetchable external hosts, zero external href/src. |
| 14 | Happi is present site-wide as inline SVG (hero and/or header mark) | ✓ VERIFIED | Home = hero; `/themen/` overview = hero; reference topic + legal/404 = header mark. **Superseded placement:** the topic page hero was dropped with the landing step (quick-task design change) — hero now lives on start + overview, mark on subpages. |
| 15 | `happi-illus.svg` hand-derived: same shapes/hexes, bg rect dropped, `role="img"` + `<title>Happi, die Handy-Katze</title>`, zero template syntax | ✓ VERIFIED | File read + built inline markup: viewBox `0 0 512 512`, ears/head/inner-ears/blush/eyes/nose/whiskers in locked hexes, no `#FFF6EC` bg rect, `role="img"` + title, no `{{`/`{%`. |
| 16 | Inline SVG counts: every built page carries exactly one inline `<svg>`; zero `<img>`; zero external refs | ✓ VERIFIED | Walker: home=1 (hero), overview=1 (hero), topic=1 (mark), legal/404=1 (mark); zero `<img>`. **Supersedes** the old "home+topic=2, others=1" assertion (UAT Test 3 fix removed the start-page mark; topic hero dropped with the landing step). |
| 17 | Header mark is non-interactive `aria-hidden="true"`, 32px, `flex: 0 0 auto` | ✓ VERIFIED | `header.njk`: `<span class="happi-mark" aria-hidden="true">` (not a link/control); CSS `.happi-mark{flex:0 0 auto;width:32px;height:32px}`. Mark intentionally omitted on `/` and `/themen/` (hero sits there instead). |
| 18 | Every non-home page keeps a ≥48px in-app back/Start affordance | ✓ VERIFIED | Every non-home built page carries the compact `.back` arrow (`aria-label="Zurück zur Startseite"`, `min-width/min-height: var(--tap-min)`), right-aligned via `margin-left:auto`; home does not. Supersedes the Phase 1 "Start `.card`" form (UAT Test 3/6 fix). |
| 19 | `header.njk` (skip link + mark + conditional back) included on all templates | ✓ VERIFIED | Walker: every built page has the skip link `href="#inhalt"`; header present on index/themen-index/themen/impressum/datenschutz/404. |
| 20 | Linear stepper: 5 `[data-step]` sections; all facts in the first step; selfcheck heading ends the facts step; quiz is its own step | ✓ VERIFIED | Walker on built ref: `stepCount === 5`; the `.step--facts` wrapper contains all 3 `.fact` and the `#selfcheck-h` heading; `.quiz[data-step]`, `.tips[data-step]`, `.balance[data-step]`, `.topic-next[data-step]` are distinct steps. |
| 21 | Quiz contract: 3 questions × 3 options, per-group exclusivity, reflection blocks, live region, gate hooks | ✓ VERIFIED | Walker: 3 `.selfcheck__group`, 9 radios (q1/q2/q3 ×3), 9 `.selfcheck__reflection`, `role="status"` live region, `.quiz[data-step]` hook; `.quiz-start`/`.quiz-gate` created by app.js and styled in site.css. Human-confirmed in 02-UAT.md Test 1 (Frage x von 3 above the question, gate behind "Los geht's!"). |
| 22 | Zero persistence/transmission tokens in `src/js/app.js` AND built JS | ✓ VERIFIED | Walker scanned both for 15 forbidden tokens (storage/cookie/fetch/XHR/innerHTML/eval/postMessage/WebSocket/…): 0 hits. Reinforced by 02-SECURITY.md T-02-05/T-02-06 (closed). |

**Score:** 22/22 truths verified · behavior_unverified: 0

### Supersessions (design changes accepted via UAT)

| Old plan truth | Current reality | Authority |
|----------------|-----------------|-----------|
| `_site/themen/index.html` must NOT exist | `/themen/` overview page intentionally exists (`src/themen-index.njk`) | UAT Test 6 (two-step entry) |
| Topic page = 2 inline SVG (mark + hero) | Topic page = 1 (mark); hero moved to start + overview | UAT Test 3, quick `ab39aad` |
| Start page = header mark + hero | Start page = hero only (mark removed) | UAT Test 3, `ab39aad` |
| Self-check = 1 calibrated question | 3 questions, own quiz step, gate behind "Los geht's!" | UAT Test 1 |
| "re-tap switches reflection" | app.js locks the answer after first pick (no-JS path still switchable) | UAT Test 1 |
| Non-home pages keep Start `.card` | Compact right-aligned `.back` arrow (≥48px) | UAT Test 3/6, `283ddb1` |
| `app.js` ≈ 24 lines, announcement-only | ~276 lines: announcement + linear stepper + quiz gate + answer locking | quick `261001-l4e`/`261001-mdd`; 02-SECURITY additive sweep #2 |

### Deferred Items

| # | Item | Addressed In | Evidence |
|---|------|-------------|----------|
| 1 | Remaining four topics get complete print-quality content | Phase 3 | Phase 3 goal: "All five v1 topics are live with complete, source-backed German content — each following the facts-first pattern proven in Phase 2." |

### Required Artifacts

| Artifact | Expected | Status | Details |
|----------|----------|--------|---------|
| `docs/stimme-und-stil.md` | German voice spec | ✓ VERIFIED | Present, substantive, outside `src/`. |
| `src/_data/topics.json` | Bare array, 5 entries; ref full, 4 stubs | ✓ VERIFIED | First byte `[`; real German copy; drives 5 routes. |
| `src/themen.njk` | Pagination template + widgets/guards/cards | ✓ VERIFIED | 5 routes; 5 `[data-step]` sections; guards; deferred script tag. |
| `src/themen-index.njk` | `/themen/` overview page | ✓ VERIFIED | Emits `_site/themen/index.html`; hero + topic cards with `bald` badges. |
| `src/index.njk` | Start page (hero + greeting + Start link) | ✓ VERIFIED | Centered entry; Start links to `/themen/`; no app.js. |
| `eleventy.config.js` | `src/js` passthrough | ✓ VERIFIED | Built `_site/js/app.js` exists. |
| `src/css/site.css` | Reveal + widget + stepper + identity styles | ✓ VERIFIED | All selectors present; token-pure, zero external, light-only. |
| `src/js/app.js` | Generic enhancer + stepper + quiz gate | ✓ VERIFIED | `node --check` exit 0; zero banned tokens; built at `_site/js/app.js`. |
| `src/_includes/happi-illus.svg` | Inline SVG include | ✓ VERIFIED | As truth #15. |
| `src/_includes/header.njk` | Shared header partial | ✓ VERIFIED | As truths #17–#19. |
| `scripts/voice-check.js` + `package.json` `check:voice` | Persistent copy gate | ✓ VERIFIED | Runs green. |

### Key Link Verification

| From | To | Via | Status | Details |
|------|----|----|--------|---------|
| `topics.json` bare array | `themen.njk` pagination | `data: topics, size:1, alias: topic` | ✓ WIRED | 5 routes emitted. |
| `topics` global | `themen-index.njk` card loop | url filter | ✓ WIRED | 5 cards + `bald` badges. |
| `{% set qi = loop.index %}` | `name="q{{ qi }}"` | per-question exclusivity | ✓ WIRED | q1/q2/q3, 3 radios each. |
| Verboten list in spec | copy gate | machine parse + scan | ✓ WIRED | `check:voice` green. |
| `.selfcheck__option:has(input:checked) .selfcheck__reflection` | tap→reflection swap | pure CSS | ✓ WIRED (human-confirmed) | Rule present; UAT Test 1 passed. |
| `app.js` | `.selfcheck__group` / `.selfcheck__live` | change listener | ✓ WIRED (human-confirmed) | Contract wired; UAT device run. |
| `[data-flow]` main | `[data-step]` sections | `show()` stepper | ✓ WIRED | 5 steps; shared Weiter. |
| `happi-source.svg` | `happi-illus.svg` | hand-derivation | ✓ WIRED | Same shapes/hexes; bg dropped. |
| `header.njk` | all templates | include | ✓ WIRED | Present on every built page. |
| deferred script tag | passthrough `js/app.js` | `/handychecker/js/app.js` | ✓ WIRED | Topic pages only; file served. |

### Data-Flow Trace (Level 4)

| Artifact | Data Variable | Source | Produces Real Data | Status |
|----------|---------------|--------|--------------------|--------|
| `themen.njk` (ref topic) | `topic.title/facts/selfcheck/tips/balance` | `src/_data/topics.json` | Yes — real German copy (not a stub) | ✓ FLOWING |
| `themen.njk` (stubs) | `topic.title` | `topics.json` | Yes — `kommt bald` guard by design | ✓ FLOWING |
| `themen-index.njk` | `topics` | `topics.json` | Yes — 5 cards + conditional badge | ✓ FLOWING |
| `app.js` | radio label + reflection text | DOM | Yes — reads DOM, `textContent` write only | ✓ FLOWING |

### Behavioral Spot-Checks

| Behavior | Command | Result | Status |
|----------|---------|--------|--------|
| Build emits all routes, no collapse | `npm.cmd run build` | exit 0, "Wrote 10 files" | ✓ PASS |
| Voice gate green | `npm.cmd run check:voice` | "Voice gate PASSED: 11 copy string(s) … 3 Verboten …" | ✓ PASS |
| Built-output contract + privacy walker (298 assertions) | `node …/gsd-verify-02-fresh.js` | `PASS=298 FAIL=0` | ✓ PASS |
| `app.js` syntax | `node --check src/js/app.js` | exit 0 | ✓ PASS |
| Verification report freshness | `gsd_run query verification.status` | `stale` (before this report) — confirms regeneration need | ✓ (addresses staleness) |

### Probe Execution

No phase-declared probe scripts (`scripts/*/tests/probe-*.sh`) exist; this is not a migration/CLI phase. SKIPPED (no probes applicable).

### Requirements Coverage

| Requirement | Source Plan | Description | Status | Evidence |
|-------------|-------------|-------------|--------|----------|
| VOICE-01 | 02-01, 02-03 | Friendly-guide persona + voice spec defined BEFORE mass copy | ✓ SATISFIED | Spec committed before topic copy; 7 sections; copy gate green; UAT Test 5 (spec reviewable) passed. |
| SELF-01 | 02-01, 02-02 | Reusable self-check per topic, descriptive options, never scored/shaming, purely client-side | ✓ SATISFIED | Generic reusable markup + CSS/JS widget; zero persistence/transmission machine-verified; never-scored confirmed by UAT Tests 1/2/5. |
| TIPS-01 | 02-01, 02-02 | "Was kann ich tun?" tip box on every topic, 1–3 concrete doable actions, efficacy before facts | ✓ SATISFIED | 2 invitation-framed tips rendered + styled; tone confirmed by UAT Test 2. |

All three Phase 2 IDs are marked **Complete** in `REQUIREMENTS.md` (Traceability table). No orphaned requirements: REQUIREMENTS.md maps Phase 2 to exactly VOICE-01/SELF-01/TIPS-01, all claimed by plans.

### Anti-Patterns Found

| File | Line | Pattern | Severity | Impact |
|------|------|---------|----------|--------|
| `src/impressum.njk` | 21 | `TODO` in a Nunjucks comment (`{# … #}`) | ⚠️ Warning | Source-only; stripped at build (built `_site/impressum/index.html` has 0 `TODO`). Tied to the `LEGAL-02` launch gate. Not a `TBD`/`FIXME`/`XXX` blocker, and not a Phase 2 goal item. |
| `src/impressum.njk` | 15–19 | Bracketed placeholders (`[Name der Eltern]`, `[PLZ] [Ort]`, `[E-Mail-Adresse der Eltern]`) still served | ℹ️ Info | Pre-existing Phase 1 content; populating real data is the `LEGAL-02` launch gate (owner-supplied). Out of Phase 2 scope. |
| `02-UAT.md` | G-02-3 | Gap entry still records `status: failed` | ℹ️ Info | Superseded by the same file's Test 3 `result: pass` + `fix_note` (fixes `ab39aad`/`283ddb1`); the walker confirms home=1 SVG and right-aligned back arrow. Documentation residue only; no code impact. |

No `TBD`/`FIXME`/`XXX` blockers. No stub/placeholder patterns in any Phase 2-delivered widget, template, CSS, JS, or copy artifact.

### Human Verification Required

None outstanding. The previously-open human items were **closed by the completed `02-UAT.md`** (status `complete`, 6/6 passed, 0 open issues):

1. Guided flow (facts → gated quiz with "Frage x von 3") — **pass** (Test 1)
2. Copy tone: warm guide, never a lecture — **pass** (Test 2)
3. Happi visible (heroes + header mark, right-aligned back arrow) — **pass** (Test 3, re-checked after `ab39aad`/`283ddb1`)
4. Weiter-path + stub honesty ("bald" badges) — **pass** (Test 4)
5. Voice spec + style guide reviewable — **pass** (Test 5)
6. Two-step entry (start → `/themen/` overview) — **pass** (Test 6)

### Gaps Summary

No gaps. Every must-have artifact exists, is substantive, wired, and data-flowing; the build is green; the voice gate passes; the 298-assertion built-output/contract/privacy walker passes; the security audit is SECURED (11/11 threats closed). The phase goal — reusable self-check + tip-box widgets, one print-quality reference topic, and a locked pre-copy voice spec — is present in the codebase. The previously behavior-unverified truths and judgment-tier prohibitions were human-confirmed by the completed 02-UAT.md, so the status is `passed`. The four remaining topics are intentionally deferred to Phase 3.

---

_Verified: 2026-10-02T11:45:00Z_
_Verifier: the agent (gsd-verifier)_
