---
phase: "02"
slug: "interactive-widgets-reference-topic-voice-spec"
threats_total: 11
threats_closed: 11
threats_open: 0
asvs_level: 1
verdict: SECURED
checked: "2026-10-02"
---

# Phase 02 — Security

> Per-phase security contract: threat register, accepted risks, and audit trail.
> Verify-depth: ASVS L1 (pattern-present in the cited artifact); severity order critical > high > medium > low; `block_on: high` — only high/critical open threats count toward `threats_open`.

---

## Trust Boundaries

| Boundary | Description | Data Crossing |
|----------|-------------|---------------|
| Parent author → build data | `src/_data/topics.json` hand-authored German copy into public repo + built pages | None (no user-input path) |
| Browser DOM → `src/js/app.js` | Self-check radio state / reflection text mirrored into the aria-live region; stepper/quiz visibility | In-memory DOM only; never stored, never sent |
| Build includes → browser | Inline SVG (`happi-illus.svg`) inlined at build time | None (zero request) |
| Build output → browser | Static same-origin HTML/CSS/JS | Nothing (no data collection) |

---

## Threat Register

| Threat ID | Category | Component | Severity | Disposition | Mitigation (location) | Status |
|-----------|----------|-----------|----------|-------------|-----------------------|--------|
| T-02-01 | Tampering | topics.json → rendered HTML (content injection) | medium | mitigate | Nunjucks auto-escape ON; zero `\| safe` in any `.njk` (`src/**/*.njk`); no user-input path; built `<title>` single-escaped (`_site/themen/bildschirmzeit/index.html`), no `&amp;amp;` | closed |
| T-02-02 | Information disclosure | Third-party requests via new topic routes / home retarget | high | mitigate | Zero fetchable external `http(s)` refs across every `_site/**` `.html/.css/.js/.svg/.webmanifest` (xmlns stripped); zero protocol-relative `url()`; every root-absolute `href/src` under `/handychecker/` (all `_site/**/*.html`) | closed |
| T-02-03 | Availability | Pagination collapse → dead topic links | high | mitigate | `src/_data/topics.json` bare array (first byte `[`); all five `_site/themen/<slug>/index.html` routes emitted; every card/link resolves. **Note:** the plan's literal assertion "`_site/themen/index.html` must NOT exist" is superseded by the intentional `/themen/` overview page (`src/themen-index.njk`, quick 261001-mdd); the substantive availability risk (dead links) is absent — see Additive Sweep #1 | closed |
| T-02-04 | Repudiation / PII | Child/family PII in public topic copy | high | mitigate | Copy limited to behavioral calibration in `src/_data/topics.json` (45-Minuten-Deal, 30–60 min variation, Spotify music exemption); keyword scan of all `_site/**/*.html` finds no email/phone/name/school/town; `_site/impressum/index.html` keeps bracketed placeholders, no leaked TODO | closed |
| T-02-05 | Information disclosure | Exfiltration from the self-check via `app.js` | high | mitigate | Architectural absence: `src/js/app.js` AND `_site/js/app.js` contain none of `localStorage`, `sessionStorage`, `document.cookie`, `fetch(`, `XMLHttpRequest`, `sendBeacon`, `WebSocket`, `EventSource`, `eval(`, `new Function`, `postMessage`, no location assignment; state is the radio checked bit | closed |
| T-02-06 | Tampering | Content-as-markup injection via reflection text (`innerHTML`) | medium | mitigate | `src/js/app.js`: text writes via `textContent` only; new nodes via `createElement`/`appendChild`; no `innerHTML`/`insertAdjacentHTML`/`outerHTML`/`document.write` in src or `_site/js/app.js` | closed |
| T-02-07 | Information disclosure | Live region over-hidden suppresses SR announcement | low | accept | `_site/css/site.css` `.selfcheck__live` uses the visually-hidden clip pattern, never `display:none`; hidden only pre-quiz-start via runtime `[hidden]`; accepted residual (AR-02-01) | closed (accepted) |
| T-02-08 | Information disclosure | Third-party/extra request via the illustration | high | mitigate | `src/_includes/happi-illus.svg` inline include only — zero `<img>` tags, zero served SVG file, zero external refs in any `_site/**` file; Happi bg rect dropped, art inlined | closed |
| T-02-09 | Tampering | Template-syntax injection into the SVG include | medium | mitigate | `src/_includes/happi-illus.svg` contains zero `{{` / `{%`; Nunjucks include passes it through verbatim; `src/icons-src/happi-source.svg` untouched | closed |
| T-02-10 | Availability | Header mark crowds/wraps skip link or nav below 48px | medium | mitigate | `src/_includes/header.njk` + `_site/css/site.css`: mark `aria-hidden`, `flex: 0 0 auto`, fixed 32px (not a control); `.back` nav control `min-height: var(--tap-min)` 48px; skip link out-of-flow until focus; `[hidden]`/no-JS full page preserved | closed |
| T-02-SC | Tampering | npm/pip/cargo installs | low | accept | ZERO package installs this phase; `package.json` still pins only `@11ty/eleventy@3.1.6`; the only new script (`check:voice`) adds no dependency; accepted (AR-02-02) | closed (accepted) |

*Status: open · closed · open — below high threshold (non-blocking)*
*Severity: critical > high > medium > low — only open threats at or above `block_on` count toward `threats_open`*
*Disposition: mitigate (implementation required) · accept (documented risk) · transfer (third-party)*

---

## Accepted Risks Log

| Risk ID | Threat Ref | Rationale | Accepted By | Date |
|---------|------------|-----------|-------------|------|
| AR-02-01 | T-02-07 | `.selfcheck__live` is visually hidden with the clip pattern (not `display:none`), so announcements survive; on non-`:has()` engines the visible reveal falls back to a small JS branch — degradation is invisible and content stays readable. ASVS L1 accepted. | Owner (implicit via plan approval) | 2026-10-02 |
| AR-02-02 | T-02-SC | No dependency install occurs in Phase 2; the supply-chain surface is unchanged from the audited Phase 1 lockfile. | Owner (implicit via plan approval) | 2026-10-02 |

---

## Additive Sweep — new surface after the plans

| # | Surface | Verdict | Evidence |
|---|---------|---------|----------|
| 1 | `/themen/` overview page (`themen-index.njk`) + new start page (`index.njk`) | no injection | Static bare-array JSON rendered through Nunjucks auto-escape; no `\| safe`; no user input; no script on either page (`scripts=0`) |
| 2 | Stepper/quiz engine (`app.js`, now ~276 lines vs the planned ~24) | no new attack surface | `textContent` + `createElement`/`appendChild` only; forbidden-token scan clean (see T-02-05/06); no message listeners, no eval, no location writes |
| 3 | Answer locking (disabled radios after first choice) | no leak | `r.disabled = true` keeps the answer in the DOM only; no storage/transmission; reload forgets — privacy by construction |
| 4 | `scripts/voice-check.js` (dev gate) | dev-only, not served | Lives in `scripts/` (not a passthrough dir); absent from `_site/`; no built file references `voice-check`/`check:voice` |
| 5 | `[hidden] { display: none !important }` rule | no static content mis-hidden | `hidden` is set only at runtime by `app.js`; without JS every `[data-step]` is visible; no-JS full page preserved |
| 6 | `.visually-hidden` h1 on `/themen/` | screen-reader sane | Built `/themen/index.html` contains `<h1 class="visually-hidden">Themen</h1>`; clip pattern, present in AT tree |
| 7 | Live region ARIA (review IN-03) | equivalent | Built markup is `<p class="selfcheck__live" role="status">` — `role=status` implies `aria-live=polite` + `aria-atomic=true`; explicit attrs intentionally dropped as redundant |
| 8 | Reference-topic hero absence | informational (non-security) | Built `themen/bildschirmzeit/` ships **1** inline SVG (header mark), not the plan's 2 (mark+hero) — a later quick-task design change (drop topic landing step). No request/attack surface change; zero-request guarantee intact. Flagged for orchestrator, NOT a threat |

---

## Gate Results (CURRENT built output, 2026-10-02)

| Gate | Result |
|------|--------|
| `npm.cmd run build` | exit 0 — 10 files written |
| `npm.cmd run check:voice` | PASSED: 11 copy strings vs 3 Verboten constructions + imperative-start scan |
| Zero fetchable external `http(s)` references (all built files, xmlns stripped) | PASS (0 hits) |
| Zero protocol-relative / external `url()` | PASS |
| Every root-absolute `href`/`src` under `/handychecker/` | PASS |
| Forbidden client tokens (`localStorage`/`sessionStorage`/`document.cookie`/`fetch(`/`XMLHttpRequest`/`innerHTML`/`sendBeacon`/`eval(`/`new Function`/`postMessage`/…) in src AND built JS | PASS (0 hits) |
| Zero `<img>` tags in any built file | PASS |
| No `\| safe` filter in templates; no `&amp;amp;` double-escape | PASS |
| `happi-illus.svg` has no `{{`/`{%`; role=img + title; no bg rect | PASS |
| All 5 slug routes + `/themen/` overview emitted | PASS |
| `voice-check.js` not in `_site/` | PASS |
| No PII (email/phone/name/school/town) in built pages | PASS |
| Inline event handlers / `javascript:` / meta refresh / iframe / form / `target=_blank` | PASS (none) |
| Script referenced only on topic pages (home/overview/legal/404 = 0 scripts) | PASS |

Aggregate check harness: **37 PASS / 0 FAIL** (`gsd-sec-02-sweep.js`) plus 8 additive-sweep checks and 8 markup-hygiene checks all PASS.

---

## Security Audit Trail

| Audit Date | Threats Total | Closed | Open | Run By |
|------------|---------------|--------|------|--------|
| 2026-10-02 | 11 | 11 | 0 | gsd-security-auditor (ASVS L1, severity-filtered; build + src + `_site` grep/walk evidence) |

---

## Sign-Off

- [x] All threats have a disposition (mitigate / accept / transfer)
- [x] Accepted risks documented in Accepted Risks Log
- [x] `threats_open: 0` confirmed
- [x] `verdict: SECURED`
