---
phase: 261001-mdd
plan: 01
status: complete
subsystem: site-shell
tags: [eleventy, nunjucks, css, navigation, pwa]
requires: []
provides: [start-page, topics-overview]
affects: [src/index.njk, src/themen-index.njk, src/css/site.css]
tech-stack:
  added: []
  patterns: [eleventy-permalink, nunjucks-url-filter, shared-header-page-url-guard, calc-from-token]
key-files:
  created: [src/themen-index.njk]
  modified: [src/index.njk, src/css/site.css]
key-decisions:
  - "D-01: start page `/` shows only Happi's hero, the greeting, and one Start link"
  - "D-02: new topics overview at `/themen/` (hand-written permalink) owns the topic cards"
  - "D-03: the five topic cards move verbatim from `/` to `/themen/`, `bald` badges included"
  - "D-04: self-check options tightened via calc(var(--space-sm)/2); label vertically centered inside its unchanged >=48px tap box"
metrics:
  duration: "2min"
  completed: 2026-10-01
actuals:
  tokens: 813
  tasks: 2
  commits: 2
  plan_head_before: 6e53c48
  plan_head_after: 9111a88
---

# Phase 261001-mdd Plan 01: Start page + topics overview (+ tighter quiz spacing) Summary

A calm app-like start page at `/` (Happi hero, greeting, one Start button) now hands off to a real
topics overview at `/themen/` that owns the five topic cards (four "bald"), each still linking to its
existing `/themen/<slug>/` page; the self-check answer options are visually tighter while every label
stays a >=48px tap target.

## Tasks

| Task | Name | Commit | Files |
|------|------|--------|-------|
| 1 | Tracer — new start page at `/` and topics overview at `/themen/`, wired end-to-end | `d789b83` | src/index.njk, src/themen-index.njk, src/css/site.css |
| 2 | Tighten self-check option spacing + vertically center label text | `9111a88` | src/css/site.css |

## What Was Built

**Task 1 — navigation restructure (`d789b83`)**
- `src/index.njk` rewritten: frontmatter title kept (`HandyChecker – Finde deine Balance`); `main` now holds only the `.happi-hero` include, `<h1>Ich bin Happi, die Handy-Katze.</h1>`, the two greeting paragraphs, and `<a class="quiz-start" href="{{ '/themen/' | url }}">Start</a>`. The `ul.topic-cards` block is gone.
- `src/themen-index.njk` created (`title: Themen`, `suffixTitle: true`, `permalink: "/themen/"`): hero + h1 + the verbatim two-paragraph overview greeting + the `ul.topic-cards` loop copied verbatim from the old home page (`card`, `card__soon` "bald", `| url` hrefs). No `data-flow`, no `[data-step]`, no `<script>`.
- `src/css/site.css`: `.quiz-start` gained `text-align: center;` and `text-decoration: none;` so the class also reads as a primary button on an `<a>` (no-ops for the `<button>` app.js builds).

**Task 2 — quiz spacing (`9111a88`)**
- `.selfcheck__option` margin `0 0 var(--space-sm)` → `0 0 calc(var(--space-sm) / 2)`.
- `.selfcheck__option label` `display: block` → `display: flex; align-items: center;`; `min-height: var(--tap-min)` and all other label properties unchanged, so the tap surface stays >=48px.
- Radio rule (`margin-top: 7px`) and every other `.selfcheck*` rule untouched.

## Verification Evidence

Final combined gate after both commits (all green):

- `npm.cmd run build` → exit 0; Eleventy writes `_site/index.html`, `_site/themen/index.html`, and the five `_site/themen/<slug>/index.html` pages.
- `npm.cmd run check:voice` → PASSED (11 copy strings vs 3 Verboten constructions + imperative-start scan).
- Task 1 verifier (`gsd-verify-261001-mdd-task1.js`) → **PASS, 29/29 assertions**: built home has hero + both greeting paragraphs + `href="/handychecker/themen/"` + `>Start</a>`, no `topic-cards`, no `← Start`, no `<script>`, title `HandyChecker – Finde deine Balance`; built overview has both greeting strings, `class="topic-cards"`, 5 topic cards, 4 `card__soon`, bildschirmzeit+schlaf hrefs, header `← Start` → `/handychecker/`, title `Themen – HandyChecker`, no `data-flow`/`app.js`/`<script>`; `_site/themen/` exactly six entries (index.html + 5 slugs); no fetchable external reference in any built html/css/js; every root-absolute href/src under `/handychecker/`; `src/js/app.js` unchanged vs HEAD.
- Task 2 verifier (`gsd-verify-261001-mdd-task2.js`) → **PASS, all assertions**: built CSS has the halved margin, flex label with `align-items: center`, `min-height: var(--tap-min)`, unchanged radio rule (`margin-top: 7px`), no `@import`/`url(http`/`prefers-color-scheme`; the last commit touching site.css changed only the two target blocks (5 changed lines).

## Files

| File | Change |
|------|--------|
| `src/index.njk` | Rewritten `main`: hero + h1 + 2 greeting paragraphs + Start link; topic-cards removed |
| `src/themen-index.njk` | Created: `/themen/` overview with hero, greeting, and the five topic cards |
| `src/css/site.css` | `.quiz-start` anchor-safe props; `.selfcheck__option` margin halved; `.selfcheck__option label` flex-centered |

## Decisions Made

- D-01/D-02/D-03 — minimal start page; `/themen/` owns the cards; cards keep their existing `| url` hrefs so the overview is a real hub.
- D-04 — spacing tightened with an existing token only (`calc(var(--space-sm) / 2)`); the label stays the >=48px tap surface, only its text is centered.
- Reused the `quiz-start` class on the start-page `<a>` (inert: `app.js` only queries `.quiz-start` inside `.selfcheck`; the start page ships no script).

## Deviations from Plan

No implementation deviations — the code was built exactly as written. Two **verification-harness refinements** (no source change):

1. **[Verification refinement] Task 1 `class="card"` count scoped to the cards list.** The plan's `fails_when` says the overview must have exactly five `class="card"`. The built overview actually contains **six** because the shared header renders its own `<a class="card" href="/handychecker/">← Start</a>` on `/themen/` (the old home page hid it, which is where "5" came from). The verifier counts `class="card"` inside the `<ul class="topic-cards">` block (intent = five topic cards) and separately asserts the header card — both pass. No implementation change; D-03's mark-up is preserved verbatim.
2. **[Verification refinement] Task 2 diff base.** The first post-commit re-run diffed against `HEAD`, which is empty once the change is committed (0 changed lines), tripping the non-empty guard. The verifier now diffs the **last commit that touched `src/css/site.css`** (`git log -1 -- src/css/site.css`), which stably shows the two target blocks as the only change. No implementation change.

## Issues / Notes

- `_site/` is gitignored; the only untracked file after the task commits is a pre-existing `PROJECT-HANDOFF.md` (not produced by this task, left untouched).
- The four "bald" cards on `/themen/` are the intentional interim state carried over from the old home page (Phase 3 adds the content). Broken-windows ledger entry #1 describes exactly this topic-card interim and now physically points at `src/themen-index.njk` rather than `src/index.njk`; the entry remains accurate. No new stub, skipped test, or unrun verify was introduced, so no new ledger entry was appended.
- No new third-party request, dependency, or script introduced (T-261001-mdd-01/05 hold). Threat register items T-261001-mdd-01..05 all mitigated by the shipping code and the re-run gates.

## Threat Flags

None — both new pages add no network endpoint, auth path, file access, or schema change; the only new route (`/themen/`) is the one already covered by the plan's threat model (T-261001-mdd-04).

## Self-Check: PASSED

- Created files exist: `src/themen-index.njk`, `_site/themen/index.html` ✓
- Commits exist: `d789b83`, `9111a88` ✓
- Measured commits in range: `git rev-list --count 6e53c48..HEAD` = 2 ✓
