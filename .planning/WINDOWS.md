---
schema_version: 1
open_count: 3
waived_count: 0
fixed_count: 0
total_count: 3
last_updated: 2026-10-01T12:41:52.848Z
---

# Broken Windows Ledger

> Cross-phase defect register. With `workflow.windows_enforce` enabled, `/gsd-ship` blocks while `open_count > 0`.
> Waive with `gsd-tools windows waive <id> "<reason>"` (reason required).
> Mark fixed with `gsd-tools windows fixed <id>`.

| id | phase | kind | file | line | description | status | reason | recorded_at | resolved_at |
|----|-------|------|------|------|-------------|--------|--------|-------------|-------------|
| 1 | 01 | stub | src/index.njk |  | topic-card and footer legal links are intentional interim dead-ends until plan 01-02 (legal pages + custom 404) and Phases 2/3 (topic pages) build them | open |  | 2026-09-28T12:11:35.610Z |  |
| 2 | 01 | stub | src/impressum.njk |  | Impressum parent-data bracket placeholders are intentional (D-10) - parent must replace all four with real data before the first URL share (LEGAL-01 human launch gate, enforced in plan 01-04) | open |  | 2026-09-28T12:23:09.716Z |  |
| 3 | 02 | stub | src/themen.njk |  | Deferred app.js defer tag wired in themen.njk; src/js/app.js file ships in plan 02-02 (documented interim gap, plan 02-01) | open |  | 2026-10-01T12:41:52.848Z |  |

````json
[
  {
    "id": 1,
    "kind": "stub",
    "phase": "01",
    "file": "src/index.njk",
    "line": null,
    "description": "topic-card and footer legal links are intentional interim dead-ends until plan 01-02 (legal pages + custom 404) and Phases 2/3 (topic pages) build them",
    "status": "open",
    "reason": "",
    "recorded_at": "2026-09-28T12:11:35.610Z",
    "resolved_at": null,
    "milestone": null
  },
  {
    "id": 2,
    "kind": "stub",
    "phase": "01",
    "file": "src/impressum.njk",
    "line": null,
    "description": "Impressum parent-data bracket placeholders are intentional (D-10) - parent must replace all four with real data before the first URL share (LEGAL-01 human launch gate, enforced in plan 01-04)",
    "status": "open",
    "reason": "",
    "recorded_at": "2026-09-28T12:23:09.716Z",
    "resolved_at": null,
    "milestone": null
  },
  {
    "id": 3,
    "kind": "stub",
    "phase": "02",
    "file": "src/themen.njk",
    "line": null,
    "description": "Deferred app.js defer tag wired in themen.njk; src/js/app.js file ships in plan 02-02 (documented interim gap, plan 02-01)",
    "status": "open",
    "reason": "",
    "recorded_at": "2026-10-01T12:41:52.848Z",
    "resolved_at": null,
    "milestone": null
  }
]
````
