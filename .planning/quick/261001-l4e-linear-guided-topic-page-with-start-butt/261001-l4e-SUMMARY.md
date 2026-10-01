---
phase: 261001-l4e
plan: 01
subsystem: topic-page / interactive widgets
tags: [stepper, quiz, progressive-enhancement, voice, privacy]
status: complete
requires:
  - "Phase 2 reference topic (src/themen.njk widget markup, app.js enhancer, :has() CSS reveal)"
  - "Phase 2 voice spec (docs/stimme-und-stil.md)"
provides:
  - "Linear one-step-at-a-time topic flow (data-flow/data-step + app.js stepper engine)"
  - "Gated self-check quiz (Start → one question at a time → per-question Weiter → tips)"
  - "Three calibrated Bildschirmzeit self-check questions"
affects:
  - "Every topic page rendered by themen.njk (all five slugs)"
tech-stack:
  added: []
  patterns:
    - "Runtime-only hide via hidden attribute (no-JS full page preserved)"
    - "createElement/textContent-only DOM injection (no innerHTML, no parsing)"
    - "Selector idempotent injection (.quiz-gate/.quiz-start)"
key-files:
  created: []
  modified:
    - src/themen.njk
    - src/js/app.js
    - src/css/site.css
    - src/_data/topics.json
    - docs/stimme-und-stil.md
decisions:
  - "Stepper and quiz state live in DOM/memory only — zero persistence, zero network"
  - "Quiz-gate sentence uses a German-numeral map so the count is never misstated"
  - "Progress shows 'Frage x von N' (questions only, never performance)"
metrics:
  duration: "~2min"
  completed: "2026-10-01T13:17:29Z"
actuals:
  tokens: 41000
  tasks: 3
  commits: 3
  plan_head_before: 1a99657842bd3d4707c5e46a879aaac7fe785b1b
  plan_head_after: 108771d
---

# Quick 261001-l4e: Linear guided topic page with Start quiz — Summary

Turned the reference topic into an app-like guided flow: intro → each fact → gated
self-check → tips → balance → "Weiter geht's" cards last, one step at a time behind
a ≥48px "Weiter" button. The self-check is now a Start-gated mini-quiz of three
calibrated questions, one at a time, each answer revealing Happi's reflection
instantly, with a "Frage x von N" progress line. Progressive enhancement preserved:
without JS every section still renders in full.

## Tasks

| Task | Name | Commit | Files |
| ---- | ---- | ------ | ----- |
| 1 | Tracer — outer linear stepper end-to-end | `bb70414` | src/themen.njk, src/js/app.js, src/css/site.css |
| 2 | Quiz gate — Start, one question at a time, per-question Weiter, progress | `6a93cfd` | src/js/app.js, src/css/site.css, docs/stimme-und-stil.md |
| 3 | Add two calibrated questions to Bildschirmzeit (three total) | `108771d` | src/_data/topics.json |

## What shipped

- **src/themen.njk** — `<main id="inhalt" data-flow>`; new `.step.step--intro` wrapper; `data-step` on every `.fact`, on `.selfcheck`, `.tips`, `.balance`; new `.topic-next` wrapper around the "Weiter geht's" heading + `.topic-cards`. Stub branch, `{% if %}` guards, radio markup and the deferred script tag untouched.
- **src/js/app.js** — rewritten as an IIFE containing (1) the preserved self-check live-region/`:has()` enhancer unchanged, (2) the stepper engine (early-return without `[data-flow]`, one shared `.stepper-nav` with `.stepper-progress` + `.stepper-next`, `hidden`-attribute stepping, focus management, `show(0)`), and (3) the quiz gate (idempotent `.quiz-gate`/`.quiz-start` injection, pre-start hiding, one-question-at-a-time advance, per-question Weiter reveal on `change`, `Frage x von N` progress, final Weiter exits to the tips step). Only `textContent` writes, only `createElement`/`appendChild` nodes.
- **src/css/site.css** — token-only `.stepper-nav`, `.stepper-progress`, `.stepper-next`, `.quiz-gate`, `.quiz-start` styles; full-width ≥48px primary buttons (cocoa on peach, 2px ginger border); no default rule hides a `[data-step]`/`.step`; no `@import`, no external url, no dark-mode block.
- **src/_data/topics.json** — Bildschirmzeit self-check now has three questions: (1) the existing 45-minute Handy-Deal question untouched, (2) day-to-day variation ("Mal sind es 30 Minuten, mal 60"), (3) what she likes on the phone — chatting, music/Spotify (with the exemption "Musik ist was anderes – die zählt nicht zum Handy-Deal dazu"), videos.
- **docs/stimme-und-stil.md** — new `## Stepper & Knöpfe` section after `## Kalibrierung` documenting the two sanctioned action labels, the progress format, the quiz-gate sentence, and the forward-only/no-judgment rules.

## Verification

All three task verifies PASSED (build green, `check:voice` green), re-run after the
final build. Gates re-proved on the BUILT output:

- built topic page contains `data-flow` and 8 `data-step` markers; all original content intact (h1, three facts, fieldsets, tips, balance, topic cards)
- built `app.js` free of `localStorage`, `sessionStorage`, `document.cookie`, `fetch(`, `XMLHttpRequest`, `innerHTML`; only `textContent` text writes
- built CSS free of `@import`, external `url(`, `prefers-color-scheme`
- zero external hosts across all 12 built files; every built `href`/`src` under `/handychecker/`
- `check:voice` PASSED: 11 copy strings vs 3 Verboten constructions + imperative-start scan
- built page renders 9 radios across 3 fieldsets / 3 name-groups (q1/q2/q3)

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Plan arithmetic error] Task 3 "six radio inputs"**
- **Found during:** Task 3 verify
- **Issue:** The plan's Task 3 acceptance says "six radio inputs across three fieldsets (three `name="q1"`, three `name="q2"`, three `name="q3"`)" — internally inconsistent: three questions × three options = 9 radios. Three name-groups of three each is the substantive requirement.
- **Fix:** Verify asserts the consistent reading (9 radios, 3 fieldsets, 3 name-groups q1/q2/q3) instead of the literal "six".
- **Files modified:** none (verify script only)
- **Commit:** n/a (verify-time)

**2. [Rule 2 - Robustness] Idempotent selector injection for quiz chrome**
- **Found during:** Task 2 verify
- **Issue:** The plan's Task 2 verify requires the built `app.js` to contain the literal selectors `.quiz-gate` and `.quiz-start`. A `className = "quiz-start"` assignment lacks the leading dot.
- **Fix:** Gate/Start nodes are looked up via `querySelector(".quiz-gate")` / `querySelector(".quiz-start")` and created only when absent — idempotent, and naturally contains the selector strings.
- **Files modified:** src/js/app.js
- **Commit:** `6a93cfd`

**3. [Rule 2 - Contrast] Hover state keeps text contrast**
- **Found during:** Task 1
- **Issue:** Plan asked for a hover state on the primary button; a naive ginger/white hover would fail 4.5:1.
- **Fix:** Hover switches background to `--color-accent` (amber), preserving cocoa text well above 4.5:1.
- **Files modified:** src/css/site.css
- **Commit:** `bb70414`

## Known Stubs

None. No hardcoded empty values flow to UI; no placeholder copy; no unwired data source.

## Threat Flags

None beyond the plan's threat model. T-261001-01 (exfiltration), T-261001-02
(injection), T-261001-03 (no-JS availability) and T-261001-04 (PII in copy) all
verified in code: zero persistence/network, textContent+createElement only,
runtime-only hiding with full no-JS fallback, and copy limited to the locked
family calibration facts.

## Decisions Made

- Stepper/quiz state lives in the DOM/memory only (no storage of any kind) — privacy by construction.
- Quiz-gate line derives its number from a German-numeral map so wording stays true if questions are added.
- Progress is about the questions ("Frage x von N"), never performance.

## Issues / Follow-ups

- Human DevTools/phone UAT from the plan's verification section (tap through the flow on a phone-sized viewport, confirm ≥48px targets and no-JS full page) remains for the owner; not automatable here.

## Self-Check: PASSED

- Created/modified files exist: src/themen.njk, src/js/app.js, src/css/site.css, src/_data/topics.json, docs/stimme-und-stil.md ✓
- Commits exist: `bb70414`, `6a93cfd`, `108771d` ✓
