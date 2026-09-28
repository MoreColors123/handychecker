---
schema_version: 1
open_count: 1
waived_count: 0
fixed_count: 0
total_count: 1
last_updated: 2026-09-28T12:11:35.610Z
---

# Broken Windows Ledger

> Cross-phase defect register. With `workflow.windows_enforce` enabled, `/gsd-ship` blocks while `open_count > 0`.
> Waive with `gsd-tools windows waive <id> "<reason>"` (reason required).
> Mark fixed with `gsd-tools windows fixed <id>`.

| id | phase | kind | file | line | description | status | reason | recorded_at | resolved_at |
|----|-------|------|------|------|-------------|--------|--------|-------------|-------------|
| 1 | 01 | stub | src/index.njk |  | topic-card and footer legal links are intentional interim dead-ends until plan 01-02 (legal pages + custom 404) and Phases 2/3 (topic pages) build them | open |  | 2026-09-28T12:11:35.610Z |  |

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
  }
]
````
