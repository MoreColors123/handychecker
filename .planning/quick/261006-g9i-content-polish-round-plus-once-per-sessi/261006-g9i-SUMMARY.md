---
phase: 261006-g9i
plan: 01
subsystem: content + client
tags: [content, voice, privacy, session-storage, pwa]
status: complete
requires: []
provides:
  - de-personalized child-facing copy (A1–A11)
  - one "Eine Idee von mir" tip opener per page (A12)
  - varied self-check reflection openers (A13)
  - session-only topic completion marker + "Noch einmal" replay (B1–B4)
  - session-scoped privacy promise copy (C1–C3)
affects:
  - src/_data/topics.json
  - src/js/app.js
  - src/index.njk
  - src/datenschutz.njk
  - README.md
tech-stack:
  added: []
  patterns:
    - "scoped sessionStorage key 'hc-done' (getItem/setItem/removeItem only)"
    - "DOM built only with createElement + textContent"
key-files:
  created: []
  modified:
    - src/_data/topics.json
    - src/js/app.js
    - src/index.njk
    - src/datenschutz.njk
    - README.md
decisions:
  - "Decision D: sessionStorage is allowed ONLY as getItem/setItem/removeItem of the single key 'hc-done'; all broader persistence/transmission/markup tokens stay banned"
  - "A finished topic is shown directly on its final 'Weiter geht's' step; 'Noch einmal' clears the marker and calls location.reload() for a fresh DOM restart"
metrics:
  duration: "~3.5 min"
  completed: "2026-10-06"
actuals:
  tokens: 6600
  tasks: 3
  commits: 3
---

# Phase 261006-g9i Plan 01: Content Polish Round + Once-Per-Session Topic Completion Summary

Applied the 2026-10-06 content-polish round (de-personalized claims, one tip opener per page, varied reflection openers) and added a session-scoped topic-completion marker with a "Noch einmal" replay path, aligning the start page, Datenschutz page and README to the real session-only storage behaviour.

## Tasks

| Task | Name | Commit | Files |
| ---- | ---- | ------ | ----- |
| 1 | Content polish A1–A12 — de-personalize claims, soften copy, one tip opener per page | `efddd46` | `src/_data/topics.json` |
| 2 | Reflection opener diversity A13 — at most one "kennen viele" family opener per topic | `1047fcf` | `src/_data/topics.json` |
| 3 | Once-per-session completion marker + replay, and promise-copy alignment (B1–B4, C1–C3, D) | `b4c70f9` | `src/js/app.js`, `src/index.njk`, `src/datenschutz.njk`, `README.md` |

## What changed

### Task 1 — Content polish (A1–A12)
- `bildschirmzeit`: "eine halbe Stunde weg" (A1); question and reflection no longer reference a personal "Handy-Deal (45 Minuten)" (A2/A3); Spotify sentence rewritten (A4).
- `schlaf`: general age range "Zehn- bis Zwölfjährige brauchen 9 bis 10 Stunden Schlaf" instead of "in deinem Alter … zehn Stunden" (A5); the rule fact reframed as a general "Schutzschild" rather than "deine Regel" (A6); reflection de-personalized (A7); "Bei euch geht es nicht darum …" → "Es geht nicht darum …" (A8).
- `aufmerksamkeit`: homework fact heading + text generalized ("Ohne Unterbrechungen denkt der Kopf zu Ende"), balance fully rewritten (A9/A11); tip verb softened (A10).
- All five topics: the second tip now opens with "Oder auch das:" while the first keeps "Eine Idee von mir:" (A12).

### Task 2 — Reflection opener diversity (A13)
- Replaced the overused "Das kennen viele …" family opener across all topics with varied, observational openers ("Da bist du in guter Gesellschaft", "Das geht vielen so", "Das erleben viele", "So ist es bei manchen", "Viele Kinder wissen das", or a bare observation). Exactly one family opener remains per topic. Question/option text, ids and JSON shape untouched.

### Task 3 — Session marker + replay + promise copy (B1–B4, C1–C3, D)
- `advanceQuiz()` sets `sessionStorage.setItem("hc-done", "1")` once the last question is passed.
- On load, if `sessionStorage.getItem("hc-done")` is set, the page skips the guided flow and shows only the final `.topic-next` step, injecting a `Noch einmal` button (`createElement`/`textContent`, class `quiz-start replay`) immediately after `ul.topic-cards`; clicking it calls `sessionStorage.removeItem("hc-done")` then `location.reload()`.
- All three storage calls are wrapped in `try/catch`; no other key, persistence, transmission or markup-parsing API was introduced. No-JS output is unchanged (logic is JS-only).
- Promise copy updated: `index.njk` and `datenschutz.njk` now say "nichts **dauerhaft** gespeichert" (C1/C2); a kid-simple marker paragraph added to Datenschutz; the parents' note discloses the session-only marker key (C2); README German + English bullets now state session-only storage (C3).

## Verification

| Gate | Result |
| ---- | ------ |
| `npm.cmd run build` | PASS (10 files written) |
| `npm.cmd run check:voice` | PASS (55 strings, 3 Verboten, imperative scan) |
| Task 1 verify (A-texts, no `Handy-Deal`/`45 Minuten`, one tip opener per topic, built-page integrity, subpath/external-host) | PASS |
| Task 2 verify (family opener ≤1/topic, a/b/c ids, distinct reflections, ≤2 sentences, no Verboten/imperative, 3×3 fieldsets) | PASS |
| Task 3 verify (three scoped calls + `location.reload`, exactly 3 `sessionStorage` occurrences, forbidden tokens absent, C1–C3 strings present, old absolute claim gone, structure intact) | PASS |

## Deviations from Plan

**1. [Rule 3 - Blocking] Subpath/external-reference check exempts XML namespace and in-page fragments**
- **Found during:** Task 1 (verify authoring)
- **Issue:** The plan's `fails_when` literally requires every `href`/`src` to begin with `/handychecker/` and forbids any `http://` substring. The shipped baseline already contains `href="#inhalt"` (skip link) and the inline SVG `xmlns="http://www.w3.org/2000/svg"`, so the literal check would fail on unchanged, correct code. Decision 01-03 already established that the `xmlns` identifier is a required XML namespace name (never fetched).
- **Fix:** The verify treats the `xmlns` namespace declaration as a non-reference and allows in-page `#…` fragments, while still asserting no fetchable external host and that all real `href`/`src` values start with `/handychecker/`.
- **Files modified:** temp verify scripts only (not committed)
- **Commit:** n/a (verification tooling)

**2. [Rule 2 - Auto-add] app.js header comment updated for accuracy**
- **Found during:** Task 3
- **Issue:** The module header comment claimed "Keine Speicherung" (no storage at all), which the new session marker makes inaccurate.
- **Fix:** Comment updated to describe the single session-scoped `hc-done` marker. No behavioural change; no forbidden token introduced.
- **Files modified:** `src/js/app.js`
- **Commit:** `b4c70f9`

## Auth Gates

None.

## Known Stubs

None. All rewritten copy is real, data-driven content; no placeholder text or unwired data sources were introduced.

## Threat Flags

None beyond the plan's threat register. The session marker is a generic, session-scoped boolean with no personal data (T-261006-01, accept); the scoped-token gate (T-261006-02, D) is asserted by the Task 3 verify; the replay button is built with `createElement`/`textContent` (T-261006-03); and the promise copy now matches actual behaviour (T-261006-04).

## Issues / Pending

- **Human check pending (not blocking):** On a phone-sized viewport, finish one topic's self-check, reopen that topic in the same tab and confirm it opens on the final step with the "Noch einmal" button; click it and confirm the guided flow restarts; open another topic and confirm its guided flow still runs; disable JavaScript and confirm the full page still renders. This is the plan's end-of-task human check and is left for the orchestrator/UAT step.

## Self-Check: PASSED

- All five modified files exist and contain the expected changes.
- Commits `efddd46`, `1047fcf`, `b4c70f9` exist on `main`.
- Build and voice gate green; all three task verify scripts PASS at final HEAD.
