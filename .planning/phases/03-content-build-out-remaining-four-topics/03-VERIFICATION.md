---
phase: 03-content-build-out-remaining-four-topics
verified: 2026-10-05T08:16:54Z
status: human_needed
score: 7/7 must-haves verified
covered_files:
  - .planning/phases/03-content-build-out-remaining-four-topics/03-01-PLAN.md
  - .planning/phases/03-content-build-out-remaining-four-topics/03-01-SUMMARY.md
  - src/_data/topics.json
covered_digest: "v3:sha256:589ca46367f81561d472c75754741ac996a46159d19b0dc7f3ce2fbb5a22f102"
behavior_unverified: 0
overrides_applied: 0
human_verification:
  - test: "Read the four new topic pages (Schlaf, Aufmerksamkeit & Fokus, Körper, Datenschutz & Daten) end-to-end as the 10–12-year-old would, in Happi's voice."
    expected: "Warm, friendly-guide tone; nothing reads as a lecture, warning, or verdict; content lands as understandable and age-appropriate; the child feels empowered, not scared."
    why_human: "Tone, reading level, and felt calibration cannot be judged from markup or the machine voice gate."
  - test: "Re-check the 12 rewritten self-check reflections (CR-01 fix, commit c9c3779) for feel: Schlaf Q1c/Q2a; Aufmerksamkeit Q2a/Q3a/Q3c; Körper Q1c/Q2a/Q3c; Datenschutz Q1a/Q1b/Q3b/Q3c."
    expected: "Reflections read observational and encouraging, remain distinct per option, and do not feel repetitive or robotic after the de-evaluative rewrite."
    why_human: "The fixer explicitly flagged the rewritten reflections' tone for human confirmation; observational-vs-flat is a judgment call."
  - test: "Read each topic's 'Was ist daran eigentlich gut?' balance section."
    expected: "Each counter-messages one-sided anti-phone framing positively (Schlaf: sleep's quiet space; Fokus: music/Pausen; Körper: signals are friendly reminders; Datenschutz: data makes apps useful) without a fear frame."
    why_human: "Whether the balance actually reads as positive and non-fearful is a judgment."
  - test: "Confirm the CONT-03 prohibition that no absolute causation, fear, shame, or diagnostic framing appears (judgment-tier prohibition)."
    expected: "No scare wording, no guilt framing, no diagnostic 'bist du süchtig' register anywhere; correlation claims stay graded."
    why_human: "Judgment-tier prohibition. The machine checks (Verboten list, no 'weil du', no 'du sollst/musst', no imperative clause-starts) pass, but the tone judgment requires a human."
  - test: "Confirm the CONT-03 privacy prohibition: no personally-identifying details about the daughter (name, school, town, exact schedule) appear in the new copy; only calibrated behavioral facts (family sleep rule, homework habit, her app list)."
    expected: "Copy is behavioral-only; no identifiers."
    why_human: "Verifier confirms no identifiers are present in the strings; a human who knows the family should confirm nothing incidental identifies them."
  - test: "Read the four new pages on a phone viewport for line length and readability."
    expected: "No walls of text on a narrow screen; the guided-flow steps feel short and tappable."
    why_human: "Visual/real-device reading cannot be simulated in verification."
gaps: []
---

# Phase 3: Content Build-Out - Remaining Four Topics Verification Report

**Phase Goal:** All five v1 topics are live with complete, source-backed German content — each following the facts-first pattern proven in Phase 2, including a balance section and hedged claims.
**Verified:** 2026-10-05T08:16:54Z
**Status:** human_needed
**Re-verification:** No — initial verification (no prior `*-VERIFICATION.md` existed; the code-review remediation round left only REVIEW/FIX/DISPOSITION artifacts)

## Goal Achievement

### Observable Truths

| # | Truth | Status | Evidence |
| --- | --- | --- | --- |
| 1 | All five v1 topic routes render complete German content and no "kommt bald" stub remains anywhere (CONT-01, SC 1) | ✓ VERIFIED | `_site/themen/{bildschirmzeit,schlaf,aufmerksamkeit,koerper,datenschutz}/index.html` all exist; `Select-String _site/**/*.html -Pattern "kommt bald\|topic-soon"` → 0 hits; overview `_site/themen/index.html` lists all five cards; home Start button `href="/handychecker/themen/"` present |
| 2 | Every topic page follows facts-first: order facts → selfcheck → tips → balance → "Weiter geht's"; each fact 2–3 sentences (2–4 band), ≤1 numeral, no walls (CONT-02, SC 2) | ✓ VERIFIED | Independent walker: 5/5 pages have exactly 3 `.fact` sections; every fact 3 sentences (band 2–4) and 0 numerals; ordered index `facts < "Wie ist das bei dir?" < "Was kann ich tun?" < "Was ist daran eigentlich gut?" < "Weiter geht's"` on all five |
| 3 | Every new topic's facts are source-informed and hedged; zero Verboten constructions; no imperative clause-starts across facts, reflections, and tips (CONT-03, SC 3) | ✓ VERIFIED | Full-corpus scan (170 strings, 0 failures): Verboten `["du bist süchtig","Handy macht krank","zerstört"]` absent; no `du sollst/musst`, no `weil du`; imperative heuristic over facts+reflections+tips+questions+options → 0 hits; hedge markers (`kann/können/oft/viele/ungefähr/manchmal`) present on every page's fact text (e.g. Schlaf "ungefähr zehn Stunden", "kann es dir leichter fallen") |
| 4 | Every topic contains a "Was ist daran eigentlich gut?" balance section (CONT-04, SC 4) | ✓ VERIFIED | Balance heading present on all five built pages; non-empty balance paragraphs read positively (Schlaf: "nicht darum, dass das Handy schlecht wäre"; Fokus: Spotify/music + Pausen; Körper: "kein Warnzeichen – sondern ein freundlicher Hinweis"; Datenschutz: "Daten sind das, was Apps nützlich macht") |
| 5 | Per-topic calibration D-01..D-06 honored | ✓ VERIFIED | D-03: Schlaf quiz texts contain no `handy\|bildschirm\|scroll\|leucht\|display\|screen` (quiz asks winding-down / morning feeling / what helps sleep); fact 3 + Q3c validate the family rule + fixed bedtime as an existing strength. D-04: Fokus tips contain no "Handy" at all (break ideas only). D-05: Körper quiz asks feeling 2× ("Wie fühlst/fühlen…"). D-06: Datenschutz page names Maps, Spotify, Signal, Wikipedia (4 ≥ 3) |
| 6 | Each new topic has exactly 3×3 self-check with observational reflections and 2 "Eine Idee von mir" tips; `build` and `check:voice` exit 0 | ✓ VERIFIED | 3 fieldsets/topic, 3 radios each sharing `name="qN"`, 9 reflections, tips list exactly 2 items both starting "Eine Idee von mir:"; no duplicate reflections in the new corpus; CR-01 evaluative-opener scan → 0; `npm.cmd run build` exit 0 (10 files); `npm.cmd run check:voice` exit 0 (55 strings) |
| 7 | Built new-topic pages have zero fetchable external http(s) after stripping xmlns, and every navigational/asset href/src resolves under `/handychecker/` | ✓ VERIFIED | After `xmlns`-stripping, zero `https?://` matches on all five pages; every non-fragment `href`/`src` begins `/handychecker/` (fragment `#inhalt` skip link exempt) (PRIV-01, LG München rule) |

**Score:** 7/7 must-haves verified (0 present-behavior-unverified)

### Required Artifacts

| Artifact | Expected | Status | Details |
| -------- | -------- | ------ | ------- |
| `src/_data/topics.json` | Complete facts/selfcheck/tips/balance for all five topics | ✓ VERIFIED | 376 insertions / 4 deletions vs phase-start `208de43`; the 4 deletions are exactly the four stub lines; only production file changed |
| `_site/themen/schlaf/index.html` | Rendered Schlaf topic | ✓ VERIFIED | Full structure, no stub |
| `_site/themen/aufmerksamkeit/index.html` | Rendered Fokus topic | ✓ VERIFIED | Full structure, no stub |
| `_site/themen/koerper/index.html` | Rendered Körper topic | ✓ VERIFIED | Full structure, no stub |
| `_site/themen/datenschutz/index.html` | Rendered Datenschutz topic | ✓ VERIFIED | Full structure, no stub |
| `_site/themen/index.html` | Topics overview | ✓ VERIFIED | Lists all five topic cards |

### Key Link Verification

| From | To | Via | Status | Details |
| ---- | -- | --- | ------ | ------- |
| `src/_data/topics.json` objects | `src/themen.njk` render loops | Eleventy pagination (`data: topics`, `size: 1`) | ✓ WIRED | Zero template edits this phase; all five topics render from the same data-driven template |
| each topic slug | `/themen/<slug>/` route | `permalink: "/themen/{{ topic.slug }}/"` | ✓ WIRED | Five slug dirs emitted + overview; no unexpected extra slug dirs |
| `docs/stimme-und-stil.md` §Verboten | `scripts/voice-check.js` parse ↔ topics.json tips + reflections | machine copy gate | ✓ WIRED | Voice gate parses 3 Verboten constructions from the spec and exits 0 |
| `src/_data/topics.json` calibration fields | CONTEXT D-01..D-08 | per-topic guards | ✓ WIRED | D-03/D-04/D-05/D-06 guards pass |

### Data-Flow Trace (Level 4)

| Artifact | Data Variable | Source | Produces Real Data | Status |
| -------- | ------------- | ------ | ------------------ | ------ |
| `_site/themen/*/index.html` | `topic.facts/selfcheck/tips/balance` | `src/_data/topics.json` (populated objects) | Yes — real authored content, no static fallback | ✓ FLOWING |

### Behavioral Spot-Checks

| Behavior | Command | Result | Status |
| -------- | ------- | ------ | ------ |
| Site builds all pages | `npm.cmd run build` | 10 files written, exit 0 | ✓ PASS |
| Voice gate over tips + reflections | `npm.cmd run check:voice` | 55 strings, 3 Verboten, exit 0 | ✓ PASS |
| Independent built-page walker (structure + calibration + zero-external + subpath + byte-unchanged) | `node .../gsd-verify-03-independent.js` | 175/175 checks pass, exit 0 | ✓ PASS |
| Full-corpus voice scan (all JSON strings, incl. facts/headings/balance) | `node .../gsd-verify-03-fullcorpus.js` | 170 strings, 0 failures | ✓ PASS |

### Probe Execution

| Probe | Command | Result | Status |
| ----- | ------- | ------ | ------ |
| — | — | No probes declared in PLAN/SUMMARY, no `scripts/**/tests/probe-*.sh` in repo | N/A |

### Requirements Coverage

| Requirement | Source Plan | Description | Status | Evidence |
| ----------- | ----------- | ----------- | ------ | -------- |
| CONT-01 | 03-01-PLAN | Kind-gerechte deutsche Inhalte zu allen fünf Themen | ✓ SATISFIED | Five complete built routes, zero stubs |
| CONT-02 | 03-01-PLAN | Fakten zuerst, 2–3 Sätze, max. 1 Zahl, keine Textwände | ✓ SATISFIED | 3 facts/page, 3 sentences each, 0 numerals, ordered sections |
| CONT-03 | 03-01-PLAN | Quellenbasiert + abgesichertes Hedging | ✓ SATISFIED (source-naming reconciliation below) | Hedge markers present; Verboten + imperative scans clean; facts accurate to pediatric guidance (AAP sleep duration, eye/neck strain, attention breaks, data collection) |
| CONT-04 | 03-01-PLAN | Balance-Abschnitt pro Thema | ✓ SATISFIED | Balance heading on all five |

**Orphaned requirements:** none. Phase 3 maps exactly CONT-01..CONT-04; all four are declared in `03-01-PLAN.md` frontmatter and accounted for.

### Anti-Patterns Found

| File | Line | Pattern | Severity | Impact |
| ---- | ---- | ------- | -------- | ------ |
| — | — | No `TBD/FIXME/XXX/TODO/HACK/PLACEHOLDER` in the changed file; no empty returns or placeholders in built pages | — | None |

### SC-3 Reconciliation (named sources)

ROADMAP SC-3 phrases the requirement as "cite named pediatric sources". The plan (`03-01-PLAN.md` §verification) documents that **CONTEXT Discretion supersedes** this phrasing: sources inform the wording (accurate, hedged) but do **not** appear as names on the child page (at most one natural "Kinderärzte sagen…"; no footnotes). The built pages contain exactly one such natural phrase (Schlaf fact 2, "Kinderärzte sagen: … ungefähr zehn Stunden Schlaf") and no named-source footnote. This is an accepted, documented deviation — not a failed must-have, and not an override (the PLAN must-have itself reads "source-informed and hedged", which passes).

### Code-Review Remediation (verified, not trusted)

All four review findings are closed and verified in the codebase:
- **CR-01** (`c9c3779`): evaluative reflection openers removed — scan for `das ist eine gute|schön –|praktisch –|auch das ist` over all reflections → 0 hits; reflections distinct per option.
- **WR-01** (`7330e65`): Wikipedia sentence now "Wikipedia speichert im Vergleich zu den anderen Apps fast nichts über dich." — no reading-history implication.
- **IN-01** (`833a57d`): datenschutz fact 3 split into three sentences (still in band, no new numerals).
- **IN-02** (`8f4cc37`): Körper fact 2 now "kann sich dein Nacken irgendwann melden".
- All four fix commits are ancestors of HEAD. Disposition: 0 open.

### Human Verification Required

1. **Tone/calibration feel of the four new topics** — read them as the child on a phone; expect warm, non-lecturing, age-appropriate (no fear/guilt), and freshly empowering.
2. **Rewritten reflections (CR-01)** — confirm the 12 de-evaluated reflections still read observational *and* encouraging, not flat/repetitive.
3. **Balance sections** — confirm each genuinely counters one-sided anti-phone messaging with a positive frame.
4. **CONT-03 prohibition (judgment-tier): no absolute causation / fear / shame / diagnostic framing** — human tone confirmation (machine checks pass).
5. **CONT-03 prohibition (judgment-tier): no PII** — human confirm the calibrated behavioral facts do not incidentally identify the family.
6. **Phone-viewport reading** of the four new pages — no walls of text, readable on a narrow screen.

These items are the end-of-phase UAT feed (they become the `03-UAT.md` sink for this phase).

### Gaps Summary

No gaps. All 7 must-have truths are verified against the built artifacts (`_site/`) and the content source (`src/_data/topics.json`); all four requirement IDs are satisfied; all four code-review findings are closed in code. `bildschirmzeit` is byte-unchanged vs the phase-start commit (`208de43819fd4844c0a27558c8260a480fce39c5`): raw-block equality confirmed and the phase diff's only deletions are the four stub lines.

The phase cannot be marked `passed` because tone/calibration feel — including the fixed reflections and the judgment-tier CONT-03 prohibitions — requires human confirmation; status is therefore `human_needed`.

---

_Verified: 2026-10-05T08:16:54Z_
_Verifier: the agent (gsd-verifier)_
