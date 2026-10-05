---
phase: 03-content-build-out-remaining-four-topics
reviewed: 2026-10-05T08:03:23Z
depth: standard
files_reviewed: 1
files_reviewed_list:
  - src/_data/topics.json
findings:
  critical: 1
  warning: 1
  info: 2
  total: 4
status: issues_found
---

# Phase 03: Code Review Report

**Reviewed:** 2026-10-05T08:03:23Z
**Depth:** standard
**Files Reviewed:** 1
**Status:** issues_found

## Summary

Reviewed the four new topic entries added to `src/_data/topics.json` — `schlaf`, `aufmerksamkeit`, `koerper`, `datenschutz` — against the voice spec (`docs/stimme-und-stil.md`), the locked calibration decisions D-01..D-08 (`03-CONTEXT.md`), and the plan's structural/calibration gates.

Verified mechanically:

- JSON parses; slugs unchanged (`schlaf`, `aufmerksamkeit`, `koerper`, `datenschutz`); array order preserved.
- `bildschirmzeit` is byte-unchanged (diff `4ac223d~1..HEAD` only deletes the four stub lines and adds four objects; the reference object appears only as unchanged context).
- Each new topic has 3 facts / 3 self-check questions / 3 options per question (ids `a`,`b`,`c`, unique per question) / 2 tips / 1 balance section / balance heading. No duplicate reflections.
- `npm.cmd run build` exits 0; `npm.cmd run check:voice` exits 0 (55 strings, 3 Verboten constructions).
- Built pages: 3 `.fact` sections, 3 fieldsets × 9 radios, 9 reflections, 2 tips, correct heading order, zero `kommt bald`, zero fetchable external `http(s)` after xmlns-stripping, every non-fragment `href`/`src` under `/handychecker/`.
- Manual scan of copy the gate does **not** cover (facts, headings, question texts, option texts, balance, titles): no `Leg/Lass/Probier/Vergiss/Mach/Nimm` clause-starts, no `du sollst`/`du musst`, no `weil du`, no `süchtig`/`zerstört`/`führt zu`; all facts are 3 sentences by `[.!?]`; exactly one number in the whole new corpus ("zehn", written as a word in Schlaf fact 2).
- Calibration: Schlaf validates the existing family rule and never teaches/asks phone-before-bed (D-01..D-03); Aufmerksamkeit tips are break ideas with no phone-removal wording (D-04); Körper quiz asks about feeling and stays hedged (D-05); Datenschutz is built on Maps/Spotify/Signal/Wikipedia/Google-safesearch with curiosity framing (D-06).

The implementation is structurally sound and calibration-compliant. The findings below are **voice-rule** deviations (the self-check reflections praise the chosen answer), one **factual-precision** concern, and two **readability/grammar** nits. No security, privacy, or data-integrity defects were found.

## Narrative Findings (AI reviewer)

### Critical Issues

#### CR-01: Self-check reflections praise/rate the chosen answer (violates D-08 and the voice spec's "nie bewertend/preisend")

**File:** `src/_data/topics.json` — lines 257, 267, 361, 455 (plus evaluative openers at 143, 237, 331, 405, 410, 450)
**Issue:** The reflections are supposed to be purely observational ("Das kennen viele Kinder…", D-08 / voice spec §Selbstcheck-Antworten: "Reflexionen sind beobachtend und ermutigend", "nie ein Punktestand, Urteil, Ranking oder eine Diagnose"). Several reflections instead explicitly rate the option the child picked:

- `aufmerksamkeit` Q3 option a — "**Das ist eine gute Idee** – ein zweiter Blick öffnet oft eine neue Tür."
- `aufmerksamkeit` Q3 option c — "**Auch das ist eine schöne Idee** – manchmal löst sich eine Aufgabe nach einer Pause fast von selbst."
- `koerper` Q3 option c — "**Auch das ist eine schöne Idee** – eine neue Haltung kann sich gleich besser anfühlen."
- `datenschutz` Q3 option c — "**Auch das ist eine gute Idee** – manche Apps merken sich bewusst fast nichts."

The same evaluative register appears as sentence openers — "**Schön** – …" (`schlaf` 143, `aufmerksamkeit` 237, `koerper` 331, `datenschutz` 405 and 450) and "**Praktisch** – …" (`datenschutz` 410). Because these labels attach to *one* option while sibling options get a neutral "Das kennen viele", the reflections imply a preferred/right answer and thereby soften the "jede Antwort ist in Ordnung – es gibt kein Richtig oder Falsch" guarantee. This is a hard voice constraint for this phase. The reference topic `bildschirmzeit` contains no such evaluative reflection, so this is a deviation from the yardstick too.

**Fix:** Recast each evaluative reflection into an observational statement, mirroring the reference topic. Examples:

```text
# aufmerksamkeit Q3a
- "Das ist eine gute Idee – ein zweiter Blick öffnet oft eine neue Tür."
+ "Ein zweiter Blick öffnet oft eine neue Tür – das kennen viele."

# aufmerksamkeit Q3c / koerper Q3c / datenschutz Q3c
- "Auch das ist eine schöne Idee – <reason>"
+ "<reason> – das kennen viele."

# "Schön –" / "Praktisch –" openers
- "Schön – dann hat dein Kopf zwischendurch genug Erholung bekommen."
+ "Das kennen viele – nach einer Pause geht es oft wieder leichter."
```

Remove every judgment/praise word (`gute Idee`, `schöne Idee`, `Schön`, `Praktisch`) from the reflections so no answer is valued above another.

### Warnings

#### WR-01: `datenschutz` fact 3 implies Wikipedia tracks what the child reads (CONT-03 precision)

**File:** `src/_data/topics.json:393`
**Issue:** "…und Wikipedia sammelt fast nur, was du gerade liest." The intended message is that Wikipedia collects very little, but as worded it reads as *"Wikipedia records what you read"* — the opposite of reassuring and factually imprecise (Wikipedia does not build a per-reader profile of articles read; it keeps minimal, non-personalized server logs). For a 10–12-year-old this can create exactly the "something follows me" feeling the topic is trying to de-escalate, and it muddles the contrast the fact is built on ("Manche wissen viel, andere fast nichts").
**Fix:** State the minimal-collection point directly without implying reading-history tracking, e.g. `"…und Wikipedia merkt sich kaum etwas über dich."`

### Info

#### IN-01: `datenschutz` fact 3 packs four clauses into one section (CONT-02 readability)

**File:** `src/_data/topics.json:393`
**Issue:** Fact 3 runs four statement clauses ("Es gibt Apps…: Signal…, und Wikipedia…. / Bei Google… / Das ist der Unterschied: Manche wissen viel…"). The machine gate counts it as 3 `[.!?]` sentences, but on the page it reads as a longer block and is the densest fact in the four new topics, brushing against the "2–3 Sätze pro Idee, keine Textwände" rule.
**Fix:** Trim to the essential contrast, e.g. drop the Google/SafeSearch clause from the fact (SafeSearch is already covered by calibration context and need not appear) so the fact reads as two sentences: `"Es gibt Apps, die sich sehr wenig merken: Signal legt kaum etwas über dich ab, und Wikipedia merkt sich fast nichts. Das ist der Unterschied: Manche wissen viel, andere fast nichts."`

#### IN-02: `koerper` fact 2 has an awkward subject ("der Nacken … spürt diese Haltung")

**File:** `src/_data/topics.json:295`
**Issue:** "Wenn du längere Zeit nach unten aufs Handy schaust, kann der Nacken diese Haltung irgendwann spüren." The neck sensing a posture is grammatically strained for the target reading level; the surrounding German is otherwise clean and simple.
**Fix:** Rephrase, e.g. `"Wenn du längere Zeit nach unten aufs Handy schaust, kann sich dein Nacken irgendwann melden."`

---

_Reviewed: 2026-10-05T08:03:23Z_
_Reviewer: the agent (gsd-code-reviewer)_
_Depth: standard_
