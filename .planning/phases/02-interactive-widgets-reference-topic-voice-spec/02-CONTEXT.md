# Phase 2: Interactive Widgets + Reference Topic (+ Voice Spec) - Context

**Gathered:** 2026-10-01
**Status:** Ready for planning

<domain>
## Phase Boundary

This phase delivers the **first complete topic page** (Bildschirmzeit & Balance) built to full quality — plus the reusable components it proves: the **self-check widget** (tap → instant reflection), the **"Was kann ich tun?" tip box**, the **voice spec** (Happi's written voice rules gating all future copy), and a **visible Happi illustration** on the page. A real 10–12-year-old can read the reference topic end-to-end on a phone, unaided, and feel informed and encouraged — never lectured.

Scoped requirements: **VOICE-01, SELF-01, TIPS-01** (+ the deferred backlog item: visible Happi illustration). The remaining four topics are Phase 3 — this phase builds ONE topic as the canonical copyable pattern.
</domain>

<decisions>
## Implementation Decisions

### Reference Topic
- **D-01:** First topic = **Bildschirmzeit & Balance** (user choice; most direct phone-habit topic, strongest self-check fit).

### Self-Check Interaction (SELF-01)
- **D-02:** Style **Version A — tap → instant reflection**: she taps one answer option and a friendly per-answer reflection appears immediately below; no button, no score, re-tappable (tapping another answer switches the reflection). Research-favored for the anti-lecture goal (less exam-like than a quiz flow).
- **D-03:** Self-check answer options MUST be **calibrated to the daughter's real life** (user-corrected the research's generic bands): her usage is **30–60 min/day, varies daily**; family rule = **45 minutes device limit**, with **music (Spotify) exempt** ("she can use some apps longer — Spotify to listen to music"). Options anchor to what she knows (e.g. reference the 45-min deal) — descriptive, never judged. The music exemption is a natural balance-section point ("Musik ist was anderes").
- **D-04:** Never a score, verdict, ranking, or shaming — reflection copy is observational and encouraging ("viele Kinder kennen das"), per the anti-lecture guarantee.

### Tips (TIPS-01)
- **D-05:** Tip boxes contain **1–2 small, concrete, doable-today solo actions** (user choice: "Small & concrete") — e.g. "Leg das Handy nach der Schule eine Stunde in die Küche". No family-proposal actions, no observation-only prompts in v1 tips.

### Voice Spec (VOICE-01)
- **D-06:** **Happi narrates as a character** — first person "ich" talking TO her in "du" (user choice: "Happi as character"): "Ich hab da mal was ausprobiert…". Maximum warmth, playful guide.
- **D-07:** Voice spec is a **written artifact** (voice spec + style guide page or doc in-repo) that gates all copy from this phase onward: graded language ("kann dazu führen", never "du bist süchtig"), no imperatives/lecture ("du solltest"), no guilt framing, facts first in short sections (2–3 sentences per idea), balance section per topic (CONT-04 pattern: "Was ist daran eigentlich gut?"), no fear/scare messaging, no right/wrong framing.
- **D-08:** Balance section included on the reference topic (CONT-04 pattern established here; e.g. "Was ist daran eigentlich gut?" — what phones are genuinely good for, incl. the music exemption).

### Page Structure & Navigation
- **D-09:** Page-end navigation = **next-topic cards** (user choice: the four remaining topic cards below the topic's end + "Zurück zur Startseite") — reuses the existing `.card` pattern from Phase 1; no new UI component.
- **D-10:** Topic page URL under the existing subpath pattern: `/handychecker/themen/bildschirmzeit/` (the Phase 1 home-page cards already link there — CR-01 fix deployed).

### Happi Illustration (backlog 999.1 → in scope here)
- **D-11:** A **visible Happi illustration appears on the reference topic page** (user's deferred follow-up, promoted from backlog) — derived from the existing one-SVG-source pipeline (`src/icons-src/happi-source.svg` → larger art export), warm & cozy palette, inside the established design tokens. Size/hero placement at planner discretion (researcher/planner discretion per Phase 1 CONTEXT).

### the agent's Discretion
- Exact reflection wording, number of self-check questions (1–3), tip copy, illustration placement/size — within the locked voice rules and calibration data.
- Self-check markup/accessibility pattern (researcher/planner: progressive enhancement, works without JS where feasible, ≥48 px tap targets, light theme tokens).

### Folded Todos
(none — no pending todos matched)

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Phase definition & requirements
- `.planning/ROADMAP.md` § Phase 2 — Goal, Mode (mvp), success criteria, UI hint
- `.planning/REQUIREMENTS.md` — VOICE-01, SELF-01, TIPS-01 (+ CONT-02/03/04 pattern obligations the reference topic must establish)

### Research
- `.planning/research/FEATURES.md` — self-check patterns (descriptive answers, no scoring), anti-features (Bist-du-süchtig quizzes), tip-box efficacy, anti-lecture research (freii, Common Sense)
- `.planning/research/SUMMARY.md` § Phase 2 — widget layer + reference topic rationale, voice spec before mass copy
- `.planning/research/PITFALLS.md` — quiz-shaming pitfall (reflection prompts, no verdicts), lecture-voice pitfalls 1–6

### Phase 1 established patterns (the codebase this builds on)
- `.planning/phases/01-foundation-shell-pwa-identity-first-deploy/01-RESEARCH.md` — subpath-safe pattern (pathPrefix + url filter + relative manifest), design tokens, data-driven site.json pattern
- `.planning/phases/01-foundation-shell-pwa-identity-first-deploy/01-03-SUMMARY.md` — one-SVG-source icon pipeline (Happi art source for the illustration)
- `.planning/phases/01-foundation-shell-pwa-identity-first-deploy/01-01-SUMMARY.md` — tokens.css/site.css card patterns, mobile-first layout rules

No external specs — requirements fully captured in decisions above.
</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `src/_data/site.json` — data-driven topic model: adding topic content = extending the data file (Pattern: topics owned by data)
- `src/css/tokens.css` + `src/css/site.css` — design tokens (cream/ginger/cocoa, --tap-min 48px, 18px base) and `.card` component (reused for next-topic cards)
- `src/index.njk` + `src/_includes/head.njk`/`footer.njk` — page shell, same-origin PWA head, footer legal nav (partial extraction from review fix IN-02)
- `src/icons-src/happi-source.svg` — the ONE Happi art source (illustration derives from it)

### Established Patterns
- Subpath-safe linking: every internal href through the `| url` filter (CR-01 lesson — parenthesize compound expressions)
- Progressive enhancement + data-in-HTML/generic-JS (research pattern): self-check content lives in markup, logic stays generic
- Zero third-party requests; UTF-8 German; build + node temp-script verification pattern (PowerShell gotchas documented)

### Integration Points
- Home page topic cards already link to `/handychecker/themen/<slug>/` — the reference topic must live exactly there
- Footer legal nav present on every page — topic pages inherit it via the footer partial

</code_context>

<specifics>
## Specific Ideas

- The self-check on Bildschirmzeit anchors to the family's real deal: 45 minutes — options descriptive ("Meistens reicht es mir" / "Oft wär ich gern länger" / "Kommt drauf an, was ich mache"), each with its own Happi reflection.
- The **music exemption** (Spotify) is a gift for the balance section: "Musik ist was anderes — die zählt nicht zur Bildschirmzeit dazu" (calibration D-03).
- Tips calibrated to a 10-year-old's real school day (after-school placement, evening handover).
- Happi's voice: warm, curious, self-deprecating cat humor allowed; concrete everyday imagery (kitchen, school bag) — never abstract statistics.

</specifics>

<deferred>
## Deferred Ideas

- **Visible Happi illustration** — PROMOTED INTO THIS PHASE (backlog 999.1 → D-11); no longer deferred.
- Offline missions, certificate, family contract, share cards, myth-busters — v2 backlog (REQUIREMENTS.md).
- Scenario decision games (social-media topic) — deferred with SOCL-01 until she has social access.

None — discussion stayed within phase scope.

</deferred>

---

*Phase: 2-Interactive Widgets + Reference Topic (+ Voice Spec)*
*Context gathered: 2026-10-01*