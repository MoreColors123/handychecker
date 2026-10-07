---
phase: 03-content-build-out-remaining-four-topics
verified: 2026-10-07T08:24:30Z
status: passed
score: 7/7 must-haves verified
covered_files:
  - .planning/phases/03-content-build-out-remaining-four-topics/03-01-PLAN.md
  - .planning/phases/03-content-build-out-remaining-four-topics/03-01-SUMMARY.md
  - src/_data/topics.json
covered_digest: "v2:sha256:bbfba2dd6bc6673c27e782e99910b86f1eedffd3b02877b283a6aad3e404168b"
behavior_unverified: 0
overrides_applied: 2
overrides:
  - must_have: "Every new topic page follows the facts-first pattern: short sections in the order facts → self-check → tips → balance → 'Weiter geht's', 2–3 sentences per idea, at most one numeral per fact section, no walls of text (CONT-02, ROADMAP SC 2)"
    reason: "Sub-clause 'at most one numeral per fact section' is not met literally: Schlaf fact 2 reads 'Kinderärzte sagen: Zehn- bis Zwölfjährige brauchen 9 bis 10 Stunden Schlaf.' — a single age-appropriate sleep-duration RANGE ('9 bis 10') that the digit-counting gate sees as two numerals. Every other part of this truth (section order, 2-3 sentences per idea, no walls, no stubs) is verified on all five pages. The change is a deliberate, locked quick-task decision (261006-g9i A5, 2026-10-06) that supersedes the Phase-3 plan's 'exactly one numeral' wording; the intent (one digestible numeric datum per fact, no walls of numbers) is preserved, and the human UAT explicitly re-checked 'one number max per fact section' as passing on the post-change content (03-UAT.md Test 4)."
    accepted_by: "owner (locked decision A5, quick task 261006-g9i)"
    accepted_at: "2026-10-06T09:49:05Z"
  - must_have: "Each new topic has exactly 3 self-check questions × 3 options with observational, never-scored reflections, and 2 tip invitations phrased 'Eine Idee von mir: …' (D-07/D-08); npm.cmd run build and npm.cmd run check:voice both exit 0"
    reason: "Sub-clause '2 tip invitations phrased \"Eine Idee von mir: …\"' is not met literally: on every topic (all five, including the reference topic) the second tip now opens with 'Oder auch das:' instead of 'Eine Idee von mir:'. Both tips remain Happi invitations ('Oder auch das:' is the same invitation voice) and the rest of the truth is verified (3×3 self-check with observational reflections on all five; exactly 2 tips; build exit 0; check:voice exit 0). The change is a deliberate, locked quick-task decision (261006-g9i A12, 2026-10-06) that supersedes the Phase-3 plan's wording to avoid a repeated opener; the human UAT re-checked tips-are-invitations tone as passing (03-UAT.md Test 1)."
    accepted_by: "owner (locked decision A12, quick task 261006-g9i)"
    accepted_at: "2026-10-06T09:49:05Z"
re_verification:
  previous_status: human_needed
  previous_score: 7/7
  gaps_closed:
    - "The 6 human-verification items from the previous report are closed GREEN by the completed 03-UAT.md (6 passed, 0 issues, status complete, updated 2026-10-07T10:04:19Z) — tone/calibration, rewritten reflections, balance feel, CONT-03 fear/shame/diagnostic prohibition, CONT-03 PII prohibition, and phone-viewport readability are all human-confirmed."
  gaps_remaining: []
  regressions: []
gaps: []
advisory:
  - finding: "The historical machine check 'bildschirmzeit raw block byte-unchanged vs phase start' / 'parsed object deep-equal' now FAILS."
    category: other
    reason: "This is NOT a Phase-3 must-have. Phase 3 shipped the reference topic byte-identical (verified 2026-10-05); it was edited afterwards by a later global UX round — quick task 261006-g9i A12 rewrote the reference topic's second tip opener to 'Oder auch das:' (commit efddd46, 2026-10-06). The old byte-unchanged evidence is therefore obsolete, not a regression of any Phase-3 truth. Confirmed deterministically: `git diff 208de43 HEAD -- src/_data/topics.json` shows bildschirmzeit touch-points only from commits after the phase's SUMMARY documented it byte-identical."
    evidence_status: "also deterministic (git): git log --since=2026-10-05T08:16:54Z -- src/_data/topics.json lists efddd46/1047fcf/1284026"
---

# Phase 3: Content Build-Out — Remaining Four Topics Verification Report

**Phase Goal:** All five v1 topics are live with complete, source-backed German content — each following the facts-first pattern proven in Phase 2, including a balance section and hedged claims.
**Verified:** 2026-10-07T08:24:30Z
**Status:** passed
**Re-verification:** Yes — initial report (2026-10-05) was regenerated because its `covered_digest` no longer matched current source (later UX/polish rounds changed `src/_data/topics.json`). This report judges the CURRENT codebase at HEAD `5e453ed`, not the historical narrative.

## Goal Achievement

### Observable Truths

| # | Truth | Status | Evidence |
| --- | --- | --- | --- |
| 1 | All five v1 topic routes (`/themen/bildschirmzeit\|schlaf\|aufmerksamkeit\|koerper\|datenschutz/`) render complete German content and NO "kommt bald" stub remains anywhere (CONT-01, SC 1) | ✓ VERIFIED | `_site/themen/` holds exactly the five slug dirs + the overview `index.html`; a recursive walk of every `_site/**/*.html` finds **0** `kommt bald`/`topic-soon` hits; `npm.cmd run build` exits 0 writing 10 files; overview page renders exactly 5 `.card`s; home Start button `href="/handychecker/themen/"` present |
| 2 | Every topic page follows facts-first: order facts → self-check → tips → balance → "Weiter geht's"; 2–3 sentences per idea; at most one numeral per fact section; no walls (CONT-02, SC 2) | ✓ PASSED (override) | Order verified on all five (facts step < "Wie ist das bei dir?" < "Was kann ich tun?" < "Was ist daran eigentlich gut?" < "Weiter geht's"); every fact 2–3 sentences (band 2–4); no stub. **Override:** Schlaf fact 2 carries 2 numerals ("9 bis 10") — a single sleep-duration range; deliberate locked decision A5, see Adjudication below |
| 3 | Every new topic's facts are source-informed and hedged; ZERO occurrences of the voice spec's Verboten constructions; correlation claims graded (CONT-03, SC 3) | ✓ VERIFIED | Full-corpus scan of **170** strings from `topics.json` (facts + headings + questions + options + reflections + tips + balance): **0** failures — Verboten `["du bist süchtig","Handy macht krank","zerstört"]` absent, no `du sollst/musst`, no `weil du`, no imperative clause-starts; hedge markers (`kann/können/oft/viele/manche/ungefähr/meist`) present in every topic's fact text; `npm.cmd run check:voice` exit 0 (55 strings, 3 Verboten) |
| 4 | Every topic contains a "Was ist daran eigentlich gut?" balance section that counters one-sided anti-phone messaging (CONT-04, SC 4) | ✓ VERIFIED | Balance heading present on all five built pages; non-empty positive paragraphs (Schlaf: sleep gets its quiet place, "nicht darum, dass das Handy schlecht wäre"; Fokus: music can help focus + Pausen; Körper: "kein Warnzeichen – sondern ein freundlicher Hinweis"; Datenschutz: "Daten sind das, was Apps nützlich macht"; Bildschirmzeit: music exception) |
| 5 | Per-topic calibration D-01..D-06 honored | ✓ VERIFIED | D-03: Schlaf quiz text contains no `handy\|bildschirm\|scroll\|leucht\|display\|screen` → no night-phone-screen question; rule still validated as a strength (heading "Deine Regel ist schon eine echte Stärke"; Q3c "Eine feste Zeit …"). D-04: Fokus tips contain no `Handy\s*(weg\|weglegen)` (break ideas only). D-05: Körper quiz asks feeling 2×. D-06: Datenschutz names Maps, Spotify, Signal, Wikipedia (4 ≥ 3) with curiosity framing. (Note: locked decision A6 later de-personalized the Schlaf rule fact from "bei dir…" to a general rule — the calibration intent is preserved; see Adjudication) |
| 6 | Each new topic has exactly 3×3 self-check with observational reflections and 2 "Eine Idee von mir:" tips; `build` and `check:voice` exit 0 (D-07/D-08) | ✓ PASSED (override) | 3 fieldsets × 3 radios, names shared per group (`q1/q2/q3`) on all five; 9 `.selfcheck__reflection` paragraphs per page; tips list exactly 2 items; `npm.cmd run build` exit 0 (10 files); `npm.cmd run check:voice` exit 0. **Override:** the second tip's opener is "Oder auch das:" on all five pages — deliberate locked decision A12, see Adjudication |
| 7 | Built new-topic pages carry zero fetchable external http(s) after xmlns-stripping, and every navigational/asset internal href/src resolves under `/handychecker/` (fragments exempt) (PRIV-01, LG München rule) | ✓ VERIFIED | After stripping `xmlns(:…)?="…"` namespace declarations, **0** fetchable `http(s)://` matches on all five pages; every non-fragment `href`/`src` begins `/handychecker/` (the only fragment href is the header skip link `#inhalt`) |

**Score:** 7/7 truths verified (5 VERIFIED + 2 PASSED (override)); 0 present-behavior-unverified.

### Adjudication of the Known Deviations

These three items are exactly why the stale machine checks now report `TOTAL=175 PASS=167 FAIL=8`. Each is adjudicated against the must-have, not blindly failed.

| # | Deviation | Found by | Verdict | Rationale |
| --- | --- | --- | --- | --- |
| 1 | `[schlaf] fact 2 ≤1 numeral` → numerals=2 ("9 bis 10") | independent walker; my fresh walker | **DEVIATION (accepted → override)** | The must-have's literal "at most one numeral per fact section" is not met; the word "Zehn- bis Zwölfjährige" contributes none, but the sleep range contributes two digits. It is a deliberate, documented locked change (261006-g9i A5, 2026-10-06) that supersedes the Phase-3 plan's "exactly one numeral / ungefähr zehn Stunden" wording. Intent (one digestible numeric datum, no walls of numbers) is preserved; the human UAT re-checked "one number max per fact section" as passing on the post-change content. Recorded as accepted override on truth 2. **Not a regression.** |
| 2 | `[tip 2] is a Happi invitation` → "Oder auch das:" on all five topics (and the reference topic) | independent walker; my fresh walker | **DEVIATION (accepted → override)** | The Phase-3 truth requires both tips phrased "Eine Idee von mir: …". Locked decision A12 (261006-g9i, 2026-10-06) deliberately gave each page ONE "Eine Idee von mir:" opener and ONE "Oder auch das:" opener to avoid a repeated opener — applied to all five topics including the reference topic. Both remain Happi invitations; the reference-topic change is also why the historical "bildschirmzeit byte-unchanged" check fails (see #3). Recorded as accepted override on truth 6. **Not a regression.** |
| 3 | `bildschirmzeit raw block byte-unchanged vs phase start` / `parsed object deep-equal` FAIL | independent walker | **NOT A MUST-HAVE / obsolete evidence** | The byte-unchanged checks were Phase-3 *execution evidence*, not a must-have truth. Phase 3 did ship the reference topic byte-identical (old report, 2026-10-05). It was edited afterwards by the same global UX round (A12 rewrote its second tip to "Oder auch das:"). The evidence is obsolete; no Phase-3 truth is violated. Recorded under `advisory`. |

No other failures exist beyond these eight sub-checks (1 numeral + 5 tip-2 openers + 2 byte-unchanged); all remaining 167 machine checks pass.

### Deferred Items

None. No identified gap is deferred to a later milestone phase; the only divergences are the accepted overrides above.

### Advisory (New Scope, Unevidenced)

Re-verification ran, so this section is present even though it is effectively empty of blockers.

| # | Finding | Category | Why Advisory |
| --- | --- | --- | --- |
| 1 | `bildschirmzeit` no longer byte-identical to the Phase-3 phase-start snapshot | other | Not a Phase-3 must-have; a later global UX round (261006-g9i A12) legitimately edited the reference topic. New-scope relative to Phase-3's contract; documented, not blocking. |

### Required Artifacts

| Artifact | Expected | Status | Details |
| -------- | -------- | ------ | ------- |
| `src/_data/topics.json` | Complete `facts`/`selfcheck`/`tips`/`balance` for all five topics | ✓ VERIFIED | Bare JSON array, 5 objects; four former stubs fully populated; no debt markers; real authored content (no placeholders) |
| `_site/themen/schlaf/index.html` | Rendered Schlaf topic, no stub | ✓ VERIFIED | Full structure, 3 facts / 3×3 self-check / 2 tips / balance / next-cards |
| `_site/themen/aufmerksamkeit/index.html` | Rendered Fokus topic, no stub | ✓ VERIFIED | Full structure, no stub |
| `_site/themen/koerper/index.html` | Rendered Körper topic, no stub | ✓ VERIFIED | Full structure, no stub |
| `_site/themen/datenschutz/index.html` | Rendered Datenschutz topic, no stub | ✓ VERIFIED | Full structure, no stub |
| `_site/themen/index.html` | Topics overview | ✓ VERIFIED | Lists all five topic cards (`themen-index.njk` permalink `/themen/`) |

**Artifacts:** 6/6 verified.

### Key Link Verification

| From | To | Via | Status | Details |
| ---- | -- | --- | ------ | ------- |
| `src/_data/topics.json` objects | `src/themen.njk` render loops | Eleventy pagination (`data: topics`, `size: 1`) | ✓ WIRED | All five topics render from the same data-driven template; zero template edits this phase |
| each topic slug | `/themen/<slug>/` route | `permalink: "/themen/{{ topic.slug }}/"` | ✓ WIRED | Exactly five slug dirs emitted + `/themen/` overview; no unexpected extra slug dirs |
| `docs/stimme-und-stil.md` §Verboten | `scripts/voice-check.js` parse ↔ `topics.json` tips + reflections | machine copy gate | ✓ WIRED | Voice gate parses 3 Verboten constructions and exits 0 (55 strings) |
| `src/_data/topics.json` calibration fields | CONTEXT D-01..D-08 | per-topic guards | ✓ WIRED | D-03/D-04/D-05/D-06 guards pass (see truth 5) |

### Data-Flow Trace (Level 4)

| Artifact | Data Variable | Source | Produces Real Data | Status |
| -------- | ------------- | ------ | ------------------ | ------ |
| `_site/themen/*/index.html` | `topic.facts/selfcheck/tips/balance` | `src/_data/topics.json` (populated objects) | Yes — real authored German content, no static fallback | ✓ FLOWING |

### Behavioral Spot-Checks

| Behavior | Command | Result | Status |
| -------- | ------- | ------ | ------ |
| Site builds all pages | `npm.cmd run build` | 10 files written, exit 0 | ✓ PASS |
| Voice gate over tips + reflections | `npm.cmd run check:voice` | 55 strings, 3 Verboten, imperative scan, exit 0 | ✓ PASS |
| Full-corpus voice scan (all JSON strings incl. facts/headings/balance) | `node .../gsd-verify-03-fullcorpus.js` | 170 strings, 0 failures, exit 0 | ✓ PASS |
| Fresh independent walker (current HEAD, structure + order + counts + calibration + zero-external + subpath) | `node %TEMP%/opencode/fresh-verify-03.js` | 1 failure only — `[schlaf] fact2 numerals=2` (the accepted override); all five routes, orders, 3×3, tips, balance, calibration, zero-external, subpath PASS | ✓ PASS (with documented override) |
| Historical independent walker (adjudicated) | `node .../gsd-verify-03-independent.js` | 167/175; the 8 failures are exactly the 3 known deviations (1 numeral + 5 tip-2 + 2 byte-unchanged) | ✓ PASS after adjudication |

### Probe Execution

| Probe | Command | Result | Status |
| ----- | ------- | ------ | ------ |
| — | — | No probes declared in PLAN/SUMMARY; no `scripts/**/tests/probe-*.sh` exists in the repo | N/A |

### Requirements Coverage

| Requirement | Source Plan | Description | Status | Evidence |
| ----------- | ----------- | ----------- | ------ | -------- |
| CONT-01 | 03-01-PLAN | Kind-gerechte deutsche Inhalte zu allen fünf Themen | ✓ SATISFIED | Five complete built routes, zero stubs |
| CONT-02 | 03-01-PLAN | Fakten zuerst, 2–3 Sätze pro Idee, max. 1 Zahl pro Abschnitt, keine Textwände | ✓ SATISFIED (one accepted deviation — Schlaf sleep-range) | 3 facts/page, 2–3 sentences each, ordered sections; see override on truth 2 |
| CONT-03 | 03-01-PLAN | Quellenbasiert + abgesichertes Hedging | ✓ SATISFIED | Hedge markers present; Verboten + imperative scans clean; wording accurate to pediatric guidance (AAP sleep duration, eye/neck strain, attention breaks, data collection) |
| CONT-04 | 03-01-PLAN | Balance-Abschnitt pro Thema | ✓ SATISFIED | Balance heading + positive paragraph on all five |

**Orphaned requirements:** none. Phase 3 maps exactly CONT-01..CONT-04; all four are declared in `03-01-PLAN.md` frontmatter and accounted for.

### SC-3 Reconciliation (named sources)

ROADMAP SC-3 phrases the requirement as "cite named pediatric sources". The plan (`03-01-PLAN.md` §verification) documents that **CONTEXT Discretion supersedes** this phrasing: sources inform the wording (accurate, hedged) but do **not** appear as names on the child page (at most one natural "Kinderärzte sagen…"; no footnotes). The built pages contain exactly one such natural phrase (Schlaf fact 2, "Kinderärzte sagen: …") and no named-source footnote. Accepted, documented deviation — not a failed must-have.

### Anti-Patterns Found

| File | Line | Pattern | Severity | Impact |
| ---- | ---- | ------- | -------- | ------ |
| — | — | No `TBD/FIXME/XXX/TODO/HACK/PLACEHOLDER` in `src/_data/topics.json` or `src/themen.njk` / `src/_includes/*.njk`; no empty returns, hardcoded-empty props, or placeholder renders in the built pages | — | None |

**Anti-patterns:** 0 blockers, 0 warnings.

### Human Verification — Reconciled (not outstanding)

The previous report left 6 human-verification items. All 6 are now closed GREEN by the completed `03-UAT.md` (status `complete`, 6 passed / 0 issues, updated 2026-10-07T10:04:19Z):

1. Tone/calibration feel of the four new topics — UAT Test 1 (pass).
2. Rewritten self-check reflections observational, not evaluative — UAT Test 2 (pass).
3. Balance sections genuinely positive — UAT Test 3 (pass).
4. CONT-03 prohibition: no fear/shame/diagnostic framing — UAT Test 4 (pass).
5. CONT-03 prohibition: no personal data — UAT Test 5 (pass).
6. Phone-viewport readability — UAT Test 6 (pass).

No human-only items remain outstanding, so the overall status is `passed` (not `human_needed`).

### Gaps Summary

**No gaps found.** All seven must-have truths resolve to VERIFIED or PASSED (override); all artifacts exist and are substantive; all key links are wired; data flows from `topics.json` into the built pages; requirements CONT-01..CONT-04 are satisfied; zero debt markers and zero blockers.

The phase goal — "All five v1 topics are live with complete, source-backed German content, facts-first, each with a balance section and hedged claims" — is achieved in the current codebase. The only divergences from the Phase-3 plan's literal wording (a sleep-duration numeral range; one of two tip openers) are deliberate, documented locked decisions from quick task 261006-g9i, carry preserved intent, and are recorded as accepted overrides. The obsolete `bildschirmzeit` byte-unchanged evidence is advisory only.

---

_Verified: 2026-10-07T08:24:30Z_
_Verifier: the agent (gsd-verifier)_
