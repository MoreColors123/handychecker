---
phase: 03-content-build-out-remaining-four-topics
plan: 01
subsystem: content
tags: [eleventy, topics.json, german-copy, voice-spec, content, pwa]

# Dependency graph
requires:
  - phase: 02-interactive-widgets-reference-topic-voice-spec
    provides: bare-array topics.json + one themen.njk pagination template, self-check widget, voice gate, Happi illustration
provides:
  - Complete German kid content for all five v1 topics (Bildschirmzeit + four new)
  - Four new built topic routes with facts → self-check → tips → balance → next-topic cards
  - Zero-stub phase-completeness across the topic graph
affects: [04-qa-hardening-and-launch]

actuals:
  tokens: 4652
  tasks: 3
  commits: 3
  plan_head_before: 208de43819fd4844c0a27558c8260a480fce39c5
  plan_head_after: 7d2cf13682de565c93f7afda36608cca87c290cf

tech-stack:
  added: []
  patterns:
    - "Data-only content expansion: a topic is fully added by editing src/_data/topics.json — zero template/JS/CSS changes (Phase 2 pipeline carries over verbatim)"
    - "Built-page Node verify gate per task (utf8 + entity-decode): structural order, per-fact ≤1 numeral + 2–4 sentence band, 3×3 self-check, 2 tips, hedge marker, Verboten + clause-start imperative scan over facts, zero fetchable external hosts after xmlns-stripping, subpath-safe href/src"

key-files:
  created: []
  modified:
    - src/_data/topics.json

key-decisions:
  - "Schlaf validates the existing family rule (phone sleeps outside the room, fixed bedtime) as an already-working strength; no night-phone/scroll quiz question is permitted (D-01/D-02/D-03)"
  - "Aufmerksamkeit & Fokus validates the homework-without-phone habit; tips introduce short break ideas only and never re-teach phone removal (D-04)"
  - "Körper stays hedged ('kann dazu führen') with no known-complaint assumption; the self-check asks about FEELING, not behavior (D-05)"
  - "Datenschutz & Daten is built concretely on her real apps (Maps, Spotify, Signal, Wikipedia, Google safesearch) with curiosity framing, not fear (D-06)"
  - "All four topics follow the exact reference format: 3 facts (2–3 sentences, ≤1 numeral), 3×3 observational self-check, 2 'Eine Idee von mir' tip invitations, 1 balance section (D-07/D-08)"

patterns-established:
  - "Per-topic calibration guards encoded in the verify script: D-03 night-phone quiz guard, D-04 no phone-removal tips, D-05 feeling-focused quiz, D-06 real-apps presence"
  - "Phase-completeness gate asserts zero stubs + all four section headings on every topic route and an exact route graph (five slug dirs + /themen/index.html)"

requirements-completed: [CONT-01, CONT-02, CONT-03, CONT-04]

coverage:
  - id: D1
    description: "Schlaf topic content (3 facts, 3×3 self-check, 2 tips, balance) calibrated to the family sleep rule; built /themen/schlaf/ page, no stub"
    requirement: "CONT-01"
    verification:
      - kind: integration
        ref: "npm.cmd run build && npm.cmd run check:voice && node %TEMP%/opencode/gsd-verify-03-task1.js"
        status: pass
    human_judgment: false
  - id: D2
    description: "Aufmerksamkeit & Fokus topic content calibrated to the homework-without-phone habit; tips are break ideas only"
    requirement: "CONT-02"
    verification:
      - kind: integration
        ref: "npm.cmd run build && npm.cmd run check:voice && node %TEMP%/opencode/gsd-verify-03-task2.js"
        status: pass
    human_judgment: false
  - id: D3
    description: "Körper topic content, hedged, with a FEELING-focused self-check"
    requirement: "CONT-03"
    verification:
      - kind: integration
        ref: "npm.cmd run build && npm.cmd run check:voice && node %TEMP%/opencode/gsd-verify-03-task2.js"
        status: pass
    human_judgment: false
  - id: D4
    description: "Datenschutz & Daten topic content built on her real apps with curiosity framing; phase-completeness gate (zero stubs, all routes + overview present)"
    requirement: "CONT-04"
    verification:
      - kind: integration
        ref: "npm.cmd run build && npm.cmd run check:voice && node %TEMP%/opencode/gsd-verify-03-task3.js"
        status: pass
    human_judgment: false
  - id: D5
    description: "Kid-appropriate tone, reading level, and per-topic calibration read as warm and non-lecturing to a 10–12-year-old; balance sections counter one-sided anti-phone messaging"
    requirement: "CONT-03"
    verification: []
    human_judgment: true
    rationale: "Automation proves structural shape, the machine voice gate, hedged markers, and calibration guards, but cannot judge whether the copy truly reads as friendly and age-appropriate to the child or whether it lands without fear/guilt. Routes to end-of-phase human UAT (phone-viewport reading)."

duration: 2min
completed: 2026-10-05
status: complete
---

# Phase 3 Plan 01: Content Build-Out Summary

**All five HandyChecker topics now carry complete hedged German kid content — Schlaf, Aufmerksamkeit & Fokus, Körper, and Datenschutz & Daten filled into `topics.json` with zero stub remaining, the voice gate green, and zero third-party requests on every built page.**

## Performance

- **Duration:** 2 min
- **Started:** 2026-10-05T07:55:56Z
- **Completed:** 2026-10-05T07:58:18Z
- **Tasks:** 3
- **Files modified:** 1 (`src/_data/topics.json`)

## Accomplishments
- Four `kommt bald` stubs replaced with complete, calibrated content objects; the phase builds 10 pages with no stub text anywhere (CONT-01).
- Every new topic follows the reference format exactly: facts first (2–3 sentences, ≤1 numeral each), then a 3-question × 3-option observational self-check, then 2 "Eine Idee von mir" tips, then a "Was ist daran eigentlich gut?" balance section (CONT-02, CONT-04).
- Facts are source-informed and hedged; all copy clears the voice spec's Verboten list and the imperative/clause-start scan — including the facts themselves, which `check:voice` does not cover (CONT-03).
- Phase-completeness gate confirms all five topic routes and the `/themen/` overview exist, the route graph is exact, and zero fetchable external hosts remain after stripping SVG `xmlns` declarations (PRIV-01).

## Task Commits

Each task was committed atomically:

1. **Task 1: Tracer — complete Schlaf topic end-to-end + built-page calibration gate** - `4ac223d` (feat)
2. **Task 2: Expansion — complete Aufmerksamkeit & Fokus and Körper** - `ae8e4c3` (feat)
3. **Task 3: Expansion — complete Datenschutz & Daten + phase-completeness gate** - `7d2cf13` (feat)

**Plan metadata:** `docs(03-01): complete content build-out plan` (committed separately after this SUMMARY)

## Files Created/Modified
- `src/_data/topics.json` - The single content source. Filled the four stub objects (`schlaf`, `aufmerksamkeit`, `koerper`, `datenschutz`) with complete `facts`/`selfcheck`/`tips`/`balance`; `bildschirmzeit` left byte-identical. +376/−4 lines.
- `_site/themen/{schlaf,aufmerksamkeit,koerper,datenschutz}/index.html` - Generated build output (not tracked); four new topic pages rendering the new content through the unchanged `themen.njk` pipeline.

## Decisions Made
- Schlaf treats the existing family rule (phone sleeps outside the room, bedtime always fixed) as a strength she already has — never an instruction, and never teaches phone-before-sleep (D-01/D-02/D-03).
- Fokus validates the homework-without-phone habit and its tips introduce only short break ideas (water, stretch, fresh air) — no re-teaching phone removal (D-04).
- Körper stays hedged with no known-complaint assumption; its self-check asks how the body/eyes FEEL, not about behavior she may not have (D-05).
- Datenschutz is built on her concrete apps (Maps, Spotify, Signal, Wikipedia, Google safesearch) with curiosity framing and no internet-danger stories (D-06).
- Kept the array order unchanged (Schlaf, Aufmerksamkeit, Körper, Datenschutz) per CONTEXT discretion.

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered
None. All three tasks passed `npm.cmd run build`, `npm.cmd run check:voice`, and their per-task built-page verify scripts on the first run; the tracer feedback gate re-ran the Task 1 verify end-to-end before expansion and passed.

## Known Stubs
None. The phase-completeness gate asserts zero `kommt bald`/`topic-soon` text on all five topic pages.

## Threat Flags
None. No new network endpoints, auth paths, or file-access patterns were introduced — the four routes reuse the Phase 2 render pipeline unchanged. Threat-register mitigations held: T-03-02 (calibration stays behavioral, no child/family PII), T-03-03 (zero fetchable external hosts after xmlns-stripping), T-03-04 (no stub remains), T-03-SC (zero package installs).

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- Phase 3 content is complete: five topics live, voice gate green, zero stubs, subpath-safe links, zero third-party requests.
- Ready for end-of-phase verification (`/gsd-verify-work`): the remaining human check is a phone-viewport reading for kid-appropriate tone and tap targets (deliverable D5, routed to UAT).
- No blockers.

---
*Phase: 03-content-build-out-remaining-four-topics*
*Completed: 2026-10-05*

## Self-Check: PASSED

- SUMMARY.md found at `.planning/phases/03-content-build-out-remaining-four-topics/03-01-SUMMARY.md`
- Task commits found: `4ac223d`, `ae8e4c3`, `7d2cf13`
- Built pages + voice gate re-verified green
