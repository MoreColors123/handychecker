---
phase: 02
status: all_fixed
total: 9
critical: 1
warning: 4
info: 4
recorded: 2026-10-01
---

# Phase 02 — Code Review Disposition

> Per-finding ledger. `open` rows await a decision (fix via `/gsd-code-review 2 --fix`, or hand-edit the Disposition column to `skipped`/`deferred` with a reason). Advisory artifact — never blocks.

| Finding | Title | Severity | Disposition | Source |
|---------|-------|----------|-------------|--------|
| CR-01 | Tip copy embeds bare du-imperatives, violating the voice spec (topics.json) | critical | fixed | 02-REVIEW-FIX.md / 5aad6d7 (+ persistent voice gate scripts/voice-check.js) |
| WR-01 | Self-check reflection "Das klingt gut!" judges an answer (no-right/wrong contract) | warning | fixed | 02-REVIEW-FIX.md / f929348 |
| WR-02 | Impressum live with placeholders + HTML TODO comment emitted into served output | warning | fixed | 02-REVIEW-FIX.md / 9f53d1a (placeholders stay — LEGAL-02 gate) |
| WR-03 | Tap→reflection reveal depends solely on CSS :has() — works-without-JS claim overstated | warning | fixed | 02-REVIEW-FIX.md / 3b02992 (JS fallback added) |
| WR-04 | Home promises five complete topics; four cards lead to "kommt bald" stubs | warning | fixed | 02-REVIEW-FIX.md / b5aae4c (bald badge + softened intro) |
| IN-01 | Dead data-reflection attribute | info | fixed | 02-REVIEW-FIX.md / 18b731c |
| IN-02 | Undefined .topic-soon class | info | fixed | 02-REVIEW-FIX.md / 22d6f9f |
| IN-03 | Redundant triple ARIA on live region | info | fixed | 02-REVIEW-FIX.md / f1d703f |
| IN-04 | No-op radio guard in app.js | info | fixed | 02-REVIEW-FIX.md / 7a8d0b |

**Open: 0 of 9** — all fixed 2026-10-01 (review `4b835da`, fixes `5aad6d7`–`7a8d0b`, fix report `ddce85e`). Human-confirmation flagged by fixer: CR-01/WR-01 copy tone (verify at UAT), WR-03 non-:has() reveal.