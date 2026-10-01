---
phase: 02
status: issues_found
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
| CR-01 | Tip copy embeds bare du-imperatives, violating the voice spec (topics.json) | critical | open | |
| WR-01 | Self-check reflection "Das klingt gut!" judges an answer (no-right/wrong contract) | warning | open | |
| WR-02 | Impressum live with placeholders + HTML TODO comment emitted into served output | warning | open | |
| WR-03 | Tap→reflection reveal depends solely on CSS :has() — works-without-JS claim overstated | warning | open | |
| WR-04 | Home promises five complete topics; four cards lead to "kommt bald" stubs | warning | open | |
| IN-01 | Dead data-reflection attribute | info | open | |
| IN-02 | Undefined .topic-soon class | info | open | |
| IN-03 | Redundant triple ARIA on live region | info | open | |
| IN-04 | No-op radio guard in app.js | info | open | |

**Open: 9 of 9** (1 critical, 4 warning, 4 info) — recorded 2026-10-01 after the phase-02 review pass (`4b835da`).