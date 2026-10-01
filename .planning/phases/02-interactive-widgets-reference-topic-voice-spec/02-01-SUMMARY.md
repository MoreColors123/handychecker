---
phase: 02-interactive-widgets-reference-topic-voice-spec
plan: 01
subsystem: content-voice-spec-and-topic-data-layer
tags: [eleventy, nunjucks, pagination, bare-array-data, self-check, voice-spec, german, accessibility, aria-live, progressive-enhancement]

# Dependency graph
requires:
  - phase: 01-foundation-shell-pwa-identity-first-deploy
    provides: "Eleventy 3.1.6 build (pathPrefix /handychecker/, passthrough copies, dir map), design tokens + site.css .card pattern, head/footer includes, data-driven topic model, build+temp-script verify discipline"
provides:
  - "docs/stimme-und-stil.md — the German voice spec (VOICE-01 gating artifact; 7 sections; machine-parseable Verboten list)"
  - "src/_data/topics.json — bare-array single source of truth for all five topics (reference topic full; 4 'kommt bald' stubs)"
  - "src/themen.njk — one pagination template emitting every /themen/<slug>/ route (Phase 3 adds topics with zero template work)"
  - "reference topic markup: facts-first sections, self-check (fieldset/radio/label/reflection + aria-live region), tips box, balance section w/ music exemption, next-topic cards"
  - "home card loop retargeted to the topics global; src/js passthrough wired for plan 02-02"
affects: ["02-02 (widget interactivity: :has() reveal + app.js wire into existing markup)", "02-03 (Happi identity: illustration include into existing heroes/header)", "phase-3 content build-out (append JSON objects only)", "phase-4 QA (zero-request + real-device checks extend these routes)"]

# Actuals (#2632) — same estimateTokens scale (chars/4 over the realized diff).
actuals:
  tokens: 2726          # 10,903 diff chars / 4 (realized production diff this plan)
  tasks: 2
  commits: 2            # MEASURED: git rev-list --count d6681bf..HEAD (#3968)
  plan_head_before: d6681bf4dd5a6d0dd2d6d671e666994b63624e7e
  plan_head_after: d4077d003bfdb4bbc7557450ecd3e0b5d605e0c2

# Tech tracking
tech-stack:
  added: []   # zero new packages this phase (browser-native + built-in Eleventy)
  patterns:
    - "Bare-array data file + pagination {data,size:1,alias} → N routes; NEVER wrap the array in an object (Pitfall 3)"
    - "Template-scope {% set title = topic.title %} before the head include (never eleventyComputed) to avoid &amp;amp; double-escape (Pitfall 2)"
    - "{% set qi = loop.index %} captured in the question loop so nested option loops share name=\"q{{ qi }}\" (radio exclusivity, Pitfall 1)"
    - "Fieldset/legend + radio + label + reflection markup with role=status/aria-live=polite/aria-atomic=true live region in initial markup"
    - "Content-less guard branch ({% if topic.facts %}) → friendly 'kommt bald' stub so D-09 next-topic cards always resolve"
    - "Voice-spec Verboten list as the machine-readable data source for the copy gate (data-driven verification)"
    - "Window namespace identifiers (SVG xmlns) are stripped before the fetchable-reference zero-host gate (Phase 1 01-03 discipline)"

key-files:
  created:
    - docs/stimme-und-stil.md
    - src/_data/topics.json
    - src/themen.njk
  modified:
    - src/_data/site.json
    - src/index.njk
    - eleventy.config.js

key-decisions:
  - "Voice spec lives at docs/stimme-und-stil.md (outside src/, never served; repo markdown convention) — the VOICE-01 gating artifact"
  - "topics.json is a bare JSON array (first byte '[') — the wrapped object form silently collapses pagination to one broken page"
  - "Self-check ships ONE calibrated question (the 45-minute deal) with three descriptive options; schema is multi-question-ready via the questions array"
  - "Reference topic: 3 facts sections (0 numerals each), 2 invitation-framed solo tips, balance section with the Spotify music exemption"
  - "Home card loop retargeted site.topics → topics global; site.json slimmed to siteName/lang/description (single source of truth, A5)"
  - "app.js <script defer> tag wired in themen.njk now (file ships 02-02) — mirrors Phase 1's documented interim dead-end discipline"

patterns-established:
  - "Pattern 1: bare-array data + Eleventy pagination = data-owned routes (Phase 3 = pure JSON authoring)"
  - "Pattern 2: self-check widget is 100% generic markup (fieldset/radio/label/reflection + live region), no topic-specific logic"
  - "Pattern 3: one pagination template guards full vs stub content with {% if topic.facts %}"
  - "Pattern 4: voice spec's Verboten list is the single machine source for every future copy gate"

requirements-completed: [VOICE-01, SELF-01, TIPS-01]  # copied verbatim from 02-01-PLAN.md frontmatter; REQUIREMENTS.md checkboxes deferred by the shared-ID gate (VOICE-01/SELF-01/TIPS-01 are shared with plans 02-02/02-03)

# Coverage metadata (#1602) — one entry per shipped deliverable.
coverage:
  - id: D1
    description: "docs/stimme-und-stil.md — German voice spec with the seven mandated sections (Persona / Abgestufte Sprache / Keine Vorträge / Aufbau / Selbstcheck-Antworten / Kalibrierung / Checkliste pro Text), verbatim Verboten/Stattdessen pairs, D-03 calibration data, 8-item per-copy checklist; lives outside src/ so Eleventy never serves it"
    requirement: VOICE-01
    verification:
      - kind: e2e
        ref: "node gsd-verify-02-01-task1.js -> 26/26 assertions PASS (7 headings in order, >=3+3 bullets, literal 'kann dazu führen', 45 Minuten/30-60/Spotify, >=6 checklist items)"
        status: pass
    human_judgment: true
    rationale: "SC 3 is a reviewer action — a human must open the spec and judge that it is usable as the anti-lecture copy gate (automation proves structure, not voice adequacy)."
  - id: D2
    description: "Bare-array src/_data/topics.json (5 entries) + src/themen.njk pagination emitting all five /themen/<slug>/ routes; NO collapsed /themen/index.html"
    requirement: SELF-01
    verification:
      - kind: e2e
        ref: "npm.cmd run build && node gsd-verify-02-01-task2.js -> 5 routes exist, no _site/themen/index.html; gsd-verify-02-01-task2-supp.js -> first byte '[', 5-entry array, slug order"
        status: pass
    human_judgment: false
  - id: D3
    description: "Reference /themen/bildschirmzeit/ page: h1 'Bildschirmzeit & Balance', Happi-ich intro, 3 facts sections (<=1 numeral each), self-check 'Wie ist das bei dir?' (3 radios all name=q1, 3 labels, 3 reflections, aria-live region), 'Was kann ich tun?' (exactly 2 tips), 'Was ist daran eigentlich gut?' (Musik + Spotify exemption), 'Weiter geht's' (4 other cards + Zurück zur Startseite)"
    requirement: TIPS-01
    verification:
      - kind: e2e
        ref: "node gsd-verify-02-01-task2.js -> all reference-page structure assertions PASS"
        status: pass
    human_judgment: false
  - id: D4
    description: "Four 'kommt bald' guard stub pages (schlaf/aufmerksamkeit/koerper/datenschutz) so every D-09 next-topic card is a real destination"
    verification:
      - kind: e2e
        ref: "node gsd-verify-02-01-task2.js -> each stub page contains 'kommt bald'"
        status: pass
    human_judgment: false
  - id: D5
    description: "Subpath safety (every internal href/src starts with /handychecker/) and zero-external-host gate over every built file including the new topic routes"
    requirement: SELF-01
    verification:
      - kind: e2e
        ref: "node gsd-verify-02-01-task2.js -> href/src prefix gate PASS; zero fetchable http(s) references PASS (xmlns namespaces stripped)"
        status: pass
    human_judgment: false
  - id: D6
    description: "Data-driven copy gate: the built reference page AND topics.json contain ZERO occurrences of every Verboten construction parsed from docs/stimme-und-stil.md"
    requirement: VOICE-01
    verification:
      - kind: e2e
        ref: "node gsd-verify-02-01-task2.js -> parsed 3 Verboten constructions; all six page/json checks PASS"
        status: pass
    human_judgment: false
  - id: D7
    description: "Self-check tap→reflection behavior on the real device and the end-to-end unaided read by a 10-12yo (SC 1/SC 5); app.js enhancer + CSS :has() land in plan 02-02"
    verification: []
    human_judgment: true
    rationale: "Interactivity and real-device UAT are end-of-phase human checks (human_verify_mode: end-of-phase); this plan ships the markup and wires the deferred script tag."

# Metrics
duration: 2min
completed: 2026-10-01
status: complete
---

# Phase 2 Plan 01: Voice Spec + Reference-Topic Data-Layer Tracer Summary

**German voice spec (`docs/stimme-und-stil.md`, VOICE-01) plus the phase tracer — a bare-array `topics.json` driving one pagination template that emits all five `/themen/<slug>/` routes, with the complete Bildschirmzeit reference widget markup (facts → self-check → tips → balance → next-topic cards) and four `kommt bald` guards**

## Performance

- **Duration:** 2 min
- **Started:** 2026-10-01T12:39:58Z
- **Completed:** 2026-10-01T12:41:22Z
- **Tasks:** 2 (1 auto voice spec + 1 tracer)
- **Files modified:** 6 (3 created, 3 modified)

## Accomplishments

- **Voice spec shipped before any copy is finalized** (VOICE-01): `docs/stimme-und-stil.md` with the seven mandated sections, the verbatim Verboten/Stattdessen graded-language pairs, the locked D-03 calibration (30–60 min/day varying, 45-min family rule, Spotify exempt), and an 8-item per-copy checklist. Its machine-parseable Verboten list is now the data source for this and every future copy gate.
- **Phase tracer proven end-to-end**: a bare-array `src/_data/topics.json` + one `src/themen.njk` pagination template emit all five topic routes — and (critically) **no collapsed `/themen/index.html`** (Pitfall 3 defeated). Phase 3 can now add topics with pure JSON authoring and zero template work.
- **Reference topic built to the D-01..D-09 pattern**: Happi-ich intro, three facts-first sections (≤1 numeral each), the one calibrated self-check question with three descriptive options and encouraging observational reflections (`name="q1"` radio exclusivity correct — Pitfall 1 defeated, `&amp;amp;` double-escape absent — Pitfall 2 defeated), two invitation-framed solo tips, a balance section carrying the music exemption, and next-topic cards to the other four topics + home.
- **Four `kommt bald` guard stubs** make every next-topic card a real destination (no live 404s); home card loop retargeted to the `topics` global; `src/js` passthrough wired for plan 02-02.
- **Gates green**: build exits 0; every internal href/src is subpath-safe under `/handychecker/`; zero fetchable external references in any built file; zero forbidden constructions in the reference page or `topics.json`.

## Task Commits

Each task was committed atomically:

1. **Task 1: Voice spec — docs/stimme-und-stil.md (VOICE-01 gating artifact)** - `f341798` (feat)
2. **Task 2: Tracer — bare-array topics.json + themen.njk routes + reference topic + home retarget** - `d4077d0` (feat)

**Plan metadata:** (docs: complete plan) — see the final metadata commit.

**Tracer feedback gate:** re-ran Task 2's full `<verify>` end-to-end after the commit (`npm.cmd run build && node gsd-verify-02-01-task2.js` → ALL CHECKS PASSED) — passed; logged "Tracer verified end-to-end — expanding" (no expansion tasks exist in this plan).

## Files Created/Modified

- `docs/stimme-und-stil.md` — **created**: the German voice spec (VOICE-01 gating artifact; outside `src/`, never served)
- `src/_data/topics.json` — **created**: bare-array single source of truth (reference topic full content + 4 stubs)
- `src/themen.njk` — **created**: pagination template → all `/themen/<slug>/` routes; widget markup + guards + deferred app.js tag
- `src/_data/site.json` — **modified**: slimmed to `siteName`/`lang`/`description` (topics moved out)
- `src/index.njk` — **modified**: card loop retargeted `site.topics` → `topics` global
- `eleventy.config.js` — **modified**: +1 passthrough line `{ "src/js": "js" }`

## Decisions Made

- Voice spec is an in-repo markdown doc outside `src/` (never served) — the reviewer-facing gating artifact per SC 3.
- `topics.json` is a bare JSON array (first byte `[`); the wrapped object form silently collapses pagination.
- Self-check ships ONE calibrated question; the `questions` array keeps the schema multi-question-ready.
- Facts sections carry zero numerals (stricter than the ≤1 rule) to keep the reference copy clearly CONT-02 compliant.
- Tips are framed as invitations ("Probiere aus: …") to satisfy the voice spec's no-imperative rule while staying concrete and solo.
- `app.js` script tag wired now in `themen.njk` (file lands in 02-02) — documented interim gap, same discipline as Phase 1's dead-end topic links.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Zero-external-host verify regex false-positived on the SVG xmlns namespace**
- **Found during:** Task 2 (first verify run)
- **Issue:** The naive `https?://` host regex matched the required, never-fetched `xmlns="http://www.w3.org/2000/svg"` namespace name in the two built icon SVGs — the exact false-positive Phase 1's 01-03 SUMMARY already documented.
- **Fix:** The verify script now strips `xmlns[:…]="…"` declarations before the *fetchable-reference* host check (matches Phase 1's established zero-host walker discipline). No repo file changed.
- **Files modified:** verify payload only (temp script `gsd-verify-02-01-task2.js`; no repo file)
- **Verification:** re-ran → "zero external http(s) references in any built file PASS"
- **Committed in:** n/a (verification tooling fix; no repo change)

---

**Total deviations:** 1 auto-fixed (1 bug — verification tooling only)
**Impact on plan:** The verify tooling was aligned to the Phase 1-documented discipline; the shipped deliverables match the plan exactly. No scope creep.

## Issues Encountered

- PowerShell 5.1 renders German umlauts as console mojibake; all UTF-8 assertions were done byte-level via Node reads (on-disk content correct) — the established Phase 1 discipline.
- `$BEFORE..HEAD` is parsed as a PowerShell range operator; commit counting required quoting the range string (`"$BEFORE..HEAD"`). Recorded for future executors.
- An untracked `PROJECT-HANDOFF.md` at the repo root appeared during the session — not created by this plan; left untouched.
- `.planning/STATE.md` and `.planning/state.json` were already modified by the planning/orchestrator step before this plan ran; not staged by the task commits.

## Known Stubs

- `src/themen.njk` wires `<script src="{{ '/js/app.js' | url }}" defer></script>` but `src/js/app.js` ships in **plan 02-02** — a documented interim dead-end (the tag is present and subpath-correct; the file is created next wave). Recorded in `.planning/WINDOWS.md`.
- The four non-reference topics (`schlaf`, `aufmerksamkeit`, `koerper`, `datenschutz`) intentionally render `kommt bald` guard pages until Phase 3 supplies their content — by design, and this makes the D-09 next-topic cards honest today.

## Threat Flags

None — no new security-relevant surface. Content is human-authored build-time JSON (no user-input path); the template keeps Nunjucks auto-escape ON (no `| safe`); assets are same-origin; the deferred `app.js` is dependency-free. Threat register items T-02-01..T-02-04 addressed by the existing gates (auto-escape, zero-host walker, bare-array assertion, PII-free calibration copy).

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- **Plan 02-02 (widget interactivity)** plugs directly into the shipped markup: add the CSS `:has(input:checked)` reveal + create `src/js/app.js` (the defer tag and passthrough are already wired).
- **Plan 02-03 (Happi identity)** adds the inline-SVG include into the existing home/topic structure.
- **Phase 3** appends topic objects to `topics.json` with zero template changes.
- Build gate `npm.cmd run build` is green with all five routes emitted and no `/themen/index.html`.
- REQUIREMENTS.md: VOICE-01/SELF-01/TIPS-01 marking deferred by the shared-ID gate until sibling plans 02-02/02-03 complete.
- Outstanding human checks carried to end-of-phase: self-check tap→reflection behavior and the real-device unaided read (D7).

---
*Phase: 02-interactive-widgets-reference-topic-voice-spec*
*Completed: 2026-10-01*

## Self-Check: PASSED

- SUMMARY.md exists: `.planning/phases/02-interactive-widgets-reference-topic-voice-spec/02-01-SUMMARY.md` ✓
- `docs/stimme-und-stil.md` exists ✓
- `src/_data/topics.json` exists ✓
- `src/themen.njk` exists ✓
- Commit `f341798` (Task 1 — voice spec) found in git log ✓
- Commit `d4077d0` (Task 2 — tracer) found in git log ✓
- `npm.cmd run build` green at close; measured `commits: 2` from ledger `d6681bf..HEAD` ✓
- WINDOWS.md ledger entry appended (deferred app.js tag, entry #3) ✓
