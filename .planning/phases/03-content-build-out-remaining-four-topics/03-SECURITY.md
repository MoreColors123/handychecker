---
phase: "03"
slug: "content-build-out-remaining-four-topics"
threats_total: 6
threats_closed: 6
threats_open: 0
asvs_level: 1
verdict: SECURED
checked: "2026-10-07"
---

# Phase 03 — Security

> Per-phase security contract: threat register, accepted risks, and audit trail.
> Verify-depth: ASVS L1 (pattern-present in the cited artifact); severity order critical > high > medium > low; `block_on: high` — only high/critical open threats count toward `threats_open`.

---

## Trust Boundaries

| Boundary | Description | Data Crossing |
|----------|-------------|---------------|
| Parent author → build data | Hand-authored German copy in `src/_data/topics.json` into the public repo and built pages | None (no user-input path) |
| Build output → browser | Static same-origin HTML/CSS/JS only; the four new routes reuse the Phase 2 render pipeline unchanged | Nothing (no data collection) |
| Repo (public) → reader | Calibration facts about a real child must stay behavioral, never identifying | Behavioral calibration only (no identifiers) |
| Browser session → `src/js/app.js` | Session-scoped "topic done" markers (`hc-done-<slug>`) via `sessionStorage` | Non-PII booleans, same-origin, never transmitted; cleared when the browser closes |

---

## Threat Register

| Threat ID | Category | Component | Severity | Disposition | Mitigation (location) | Status |
|-----------|----------|-----------|----------|-------------|-----------------------|--------|
| T-03-01 | Tampering | `topics.json` → rendered HTML (content injection if the pipeline ever accepted input) | medium | mitigate | Human-authored build-time JSON (no user-input path); Nunjucks auto-escape stays ON (no autoescape override in `eleventy.config.js`); zero `\| safe` filter in any `.njk` (`src/**/*.njk`); voice gate rejects forbidden copy | closed |
| T-03-02 | Information disclosure | Child/family PII leaking into public topic copy or repo | high | mitigate | Calibration stays behavioral (family sleep rule, homework habit, her app list) — no name, school, town, or exact schedule; grep of `_site/**/*.html` finds no email/phone/name/school/town; `prohibitions` recorded in `03-01-PLAN.md`; human UAT Test 5 = pass | closed |
| T-03-03 | Information disclosure | New routes introducing third-party requests | high | mitigate | Zero fetchable external `http(s)` after xmlns-stripping across all five built topic pages (0 hits); every asset same-origin under `/handychecker/` (LG München rule, PRIV-01) | closed |
| T-03-04 | Availability | A topic left as a "kommt bald" stub or a fact section left incomplete | high | mitigate | Build emits all five routes + overview; zero `kommt bald`/`topic-soon` hits in `_site/**/*.html`; independent walker confirms 3 facts / 3×3 self-check / 2 tips / balance on every new topic | closed |
| T-03-SC | Tampering | npm/pip/cargo installs | low | accept | ZERO package installs this phase; `package.json` still pins only `@11ty/eleventy@3.1.6`; accepted (AR-03-01) | closed (accepted) |
| T-03-05 | Information disclosure | Session markers written to `sessionStorage` (`hc-done-<slug>`) by the later guided-flow UX rounds | low | accept | Same-origin booleans only (which topic was finished this visit); never transmitted (no `fetch`/`XHR`/`sendBeacon`); cleared when the browser closes; not a cookie. Privacy copy stays accurate ("nicht dauerhaft gespeichert … Schließt du den Browser, ist alles wieder weg"; "keine Cookies"; "keine Einbindungen Dritter"). Accepted residual (AR-03-02) | closed (accepted) |

*Status: open · closed · open — below high threshold (non-blocking)*
*Severity: critical > high > medium > low — only open threats at or above `block_on` count toward `threats_open`*
*Disposition: mitigate (implementation required) · accept (documented risk) · transfer (third-party)*

---

## Accepted Risks Log

| Risk ID | Threat Ref | Rationale | Accepted By | Date |
|---------|------------|-----------|-------------|------|
| AR-03-01 | T-03-SC | No dependency install occurs in Phase 3; the supply-chain surface is unchanged from the audited Phase 2 lockfile (`@11ty/eleventy@3.1.6` only). | Owner (implicit via plan approval) | 2026-10-07 |
| AR-03-02 | T-03-05 | `sessionStorage` "topic done" markers are a deliberate UX decision (once-per-session completion) taken in quick task `261006-g9i` after the Phase-3 threat register was authored. The data is a same-origin boolean per topic, carries no PII, is never sent off-device, and expires with the browser session — so the project's "no data collection / no tracking" guarantee and the Datenschutz copy both hold. ASVS L1 accepted. | Owner (implicit via UAT Test 6 + guided-flow UX rounds) | 2026-10-07 |

---

## Additive Sweep — new surface after the plans

The Phase-3 threat register was authored at plan time, before the later guided-flow/polish UX rounds. The following surface was added afterwards and is verified here rather than assumed:

| # | Surface | Verdict | Evidence |
|---|---------|---------|----------|
| 1 | Guided flow in `src/js/app.js` (facts → quiz gate → one question at a time → tips → balance → topic cards) | no new network/attack surface | DOM-only state (`hidden`, `disabled`, checked radio); `textContent` + `createElement`/`appendChild` only; no `innerHTML`/`insertAdjacentHTML`/`eval`/`postMessage`; no message listeners; no location writes |
| 2 | Session markers `hc-done-<slug>` in `sessionStorage` | accepted residual T-03-05 / AR-03-02 | Same-origin, non-PII boolean per topic; not transmitted; cleared on browser close; "Noch einmal" removes all `hc-done-*` keys; generic legacy `hc-done` key migrated/removed on load |
| 3 | `"Noch einmal"` replay button + done-topic filtering | no leak | Button clears `sessionStorage` markers only; no storage beyond the marker keys; no transmission |
| 4 | Cache-busting of CSS/JS (`site.cacheVersion`) | improves freshness; no surface change | Query-string version on same-origin `/handychecker/` assets only; no third-party host |
| 5 | Borderless buttons / centered footer / `darfst`→`kannst` copy | presentation + copy only | No markup/script semantics change; voice gate still green |
| 6 | `docs/` copy polish (`261006-g9i`) touched `topics.json` only | no surface change | Still human-authored build-time JSON through the unchanged render pipeline |

---

## Gate Results (CURRENT built output, 2026-10-07)

| Gate | Result |
|------|--------|
| `npm.cmd run build` | exit 0 — 10 files written |
| `npm.cmd run check:voice` | PASSED: 55 copy strings vs 3 Verboten constructions + imperative-start scan |
| Zero fetchable external `http(s)` references (built topic pages, xmlns stripped) | PASS (0 hits) |
| No `\| safe` filter in any `.njk`; autoescape not disabled | PASS |
| No inline event handlers / `javascript:` / `<iframe>` in built pages | PASS (0 hits) |
| Forbidden client tokens (`fetch(`/`XMLHttpRequest`/`sendBeacon`/`WebSocket`/`EventSource`/`eval(`/`new Function`/`postMessage`/`innerHTML`/`document.cookie`/`document.write`) in src AND built JS | PASS (0 hits; only documented `sessionStorage` markers) |
| Zero `kommt bald` / `topic-soon` stubs | PASS (0 hits) |
| No PII (email/phone/name/school/town) in built pages | PASS |
| `package.json` dependencies | PASS (only `@11ty/eleventy@3.1.6`) |
| Full-corpus voice scan (all JSON strings) | PASS (170 strings, 0 failures) |

---

## Security Audit Trail

| Audit Date | Threats Total | Closed | Open | Run By |
|------------|---------------|--------|------|--------|
| 2026-10-07 | 6 | 6 | 0 | the agent (secure-phase workflow, ASVS L1, severity-filtered; build + src + `_site` grep/walk evidence) |

---

## Sign-Off

- [x] All threats have a disposition (mitigate / accept / transfer)
- [x] Accepted risks documented in Accepted Risks Log
- [x] `threats_open: 0` confirmed
- [x] `verdict: SECURED`
