---
phase: 01-foundation-shell-pwa-identity-first-deploy
plan: 04
subsystem: deploy-hosting
tags: [github-pages, github-actions, ci, deploy, https, hosting, pwa, launch]

# Dependency graph
requires:
  - "01-01/01-02/01-03 (Eleventy build pipeline, legal pages + zero-host gate, subpath-safe manifest + Happi icon set — everything the deploy publishes)"
provides:
  - ".github/workflows/deploy.yml - GitHub-documented Pages pipeline (checkout@v4, setup-node@v4 node 22 + npm cache, npm ci, npm run build, upload-pages-artifact@v3 -> deploy-pages@v4, pages/id-token permissions, concurrency group pages, on push main + workflow_dispatch)"
  - "The live public HTTPS deployment: https://morecolors123.github.io/handychecker/ (built by Actions from source, HTTPS, zero third-party requests)"
  - "01-USER-SETUP.md - the phase's human-setup record (repo + Pages source + push auth all done, machine-verified) with the ONE remaining launch-gate action (Impressum parent data)"
  - "Phase 1 completion record: live-URL verification evidence closing ROADMAP success criteria 1-4 (SC5 viewport = human end-of-phase)"
affects: [phase-2 (widgets render inside the deployed shell), phase-3 (topic content ships by push = auto-deploy), phase-4 (real-device install validation on the live URL; OW the launch gate)]

# Actuals (#2632) - same estimateTokens scale (chars/4 over the realized diff).
actuals:
  tokens: 239        # 956 diff chars / 4 over f1321a6..513c2a0 (deploy.yml = 28 insertions; the retrigger commit is empty)
  tasks: 3
  commits: 2         # MEASURED: git rev-list --count f1321a6..513c2a0 (ledger file .git/gsd-plan-head-before-01-04, reconstructed at the pre-Task-1 HEAD)
  plan_head_before: f1321a6cb3405231a3573168d19cfff9a40be829
  plan_head_after: 513c2a007003cf4121125609daf599da2c7c8b72

# Tech tracking
tech-stack:
  added: []          # no new packages - GitHub Actions + Pages are hosting config, not dependencies
  patterns: ["GitHub-documented Pages flow: build job (npm ci + build) -> upload-pages-artifact@v3 (_site) -> deploy job (deploy-pages@v4, environment github-pages, id-token auth)", "push-to-main = deploy trigger; no local deploy step and no committed build artifacts", "empty commit as a workflow_dispatch substitute when the gh CLI is absent", "live-URL verification derives the base URL from git remote get-url origin - never hardcoded"]

key-files:
  created: [.github/workflows/deploy.yml, .planning/phases/01-foundation-shell-pwa-identity-first-deploy/01-USER-SETUP.md]
  modified: []

key-decisions:
  - "Live URL derived from the git origin remote (github.com[:/]<user>/handychecker -> https://morecolors123.github.io/handychecker/) - the URL follows the repo, no hardcoded host in any check"
  - "Deploy retrigger used an empty commit on main (gh CLI not installed; workflow_dispatch needs it) - push-to-main is the documented trigger, so the push itself is the re-run button"
  - "Live content checks decode HTML entities before matching (&amp; -> &): Eleventy 3.x auto-escapes Nunjucks output, so the served home page carries 'Bildschirmzeit &amp; Balance' while the requirement targets rendered text (established 01-01 decision, now applied to live fetches)"
  - "Impressum bracket placeholders remain live by design (prohibition P1 - never invent parent data); LEGAL-02 launch gate stays OPEN and is handed to the owner in 01-USER-SETUP.md"
  - "Task 2 human setup recorded as DONE in 01-USER-SETUP.md with executor-side verification (ls-remote, push success, live deploy) instead of the template's default Incomplete - the setup genuinely completed mid-plan"

patterns-established:
  - "Every push to main deploys: build reproducibility is the deploy contract (npm ci + eleventy, package-lock committed); a green local build + zero-host gate is the pre-push etiquette"
  - "Live-URL verification script shape: poll home for 200 + decoded German content, then deep-check manifest/icon/legal/wiring/third-party - reuse for future deploys"

requirements-completed: [PWA-01, PWA-02, LEGAL-01, LEGAL-02, PRIV-01]  # copied verbatim from 01-04-PLAN.md frontmatter

# Coverage metadata (#1602) - one entry per shipped deliverable.
coverage:
  - id: D1
    description: ".github/workflows/deploy.yml - pinned GitHub-documented Pages pipeline (checkout@v4, setup-node@v4 node 22 + cache npm, npm ci, npm run build, upload-pages-artifact@v3 path _site, deploy-pages@v4, permissions contents read + pages write + id-token write, concurrency pages, on push main + workflow_dispatch), zero secret literals (D-13)"
    requirement: PWA-01
    verification:
      - kind: e2e
        ref: "Task 1 automated token check -> 'OK workflow' (all 15 pinned tokens present; secrets regex clean)"
        status: pass
    human_judgment: false
  - id: D2
    description: "Live German home page at https://morecolors123.github.io/handychecker/ - HTTP 200, 'Hi, ich bin Happi' + all five topic cards (SC1)"
    verification:
      - kind: e2e
        ref: "gsd-0104-live-check.js (temp) -> 'LIVE OK https://morecolors123.github.io/handychecker/' (entity-decoded content match, attempt 1)"
        status: pass
    human_judgment: false
  - id: D3
    description: "Live installability served from the first deploy: manifest.webmanifest parses as JSON with start_url '.' and only relative icon srcs (192 any, 512 any, 512 maskable); icons/icon-192.png is image/png with IHDR exactly 192x192, 6382 bytes (SC4, machine half)"
    requirement: PWA-01
    verification:
      - kind: e2e
        ref: "gsd-0104-live-check.js -> manifest JSON assertions + icon IHDR readUInt32BE(16/20) == 192"
        status: pass
    human_judgment: false
  - id: D4
    description: "Live /impressum/ (§5-DDG statement 'Digitale-Dienste-Gesetz' + [Name der Eltern] placeholder) and /datenschutz/ ('Hier wird nichts gespeichert' + 'Hinweis für Eltern') return 200 with the launch-gate content intact (SC2)"
    requirement: LEGAL-01
    verification:
      - kind: e2e
        ref: "gsd-0104-live-check.js -> impressum/datenschutz content assertions"
        status: pass
    human_judgment: false
  - id: D5
    description: "Zero third-party requests hold on the real URL: fetched live home HTML contains zero http(s):// references after stripping the site's own base URL (PRIV-01 truth gate, SC3 machine half)"
    requirement: PRIV-01
    verification:
      - kind: e2e
        ref: "gsd-0104-live-check.js -> /https?:\\/\\// over base-stripped live home HTML (0 matches)"
        status: pass
    human_judgment: false
  - id: D6
    description: "PWA head wiring (manifest.webmanifest, favicon.svg, apple-touch-icon, mobile-web-app-capable, apple-mobile-web-app-title) present on ALL FOUR live pages: home, /impressum/, /datenschutz/ and the 404 path (SC4 every-page, iOS meta served everywhere)"
    requirement: PWA-01
    verification:
      - kind: e2e
        ref: "gsd-0104-live-check.js -> wiring tokens asserted on 4 live pages (404 fetched as bogus path, body read at status 404)"
        status: pass
    human_judgment: false
  - id: D7
    description: "End-of-phase human checks on the real phone: fresh-browser network tab shows zero third-party requests; Android Chrome offers install (manifest panel clean); narrow viewport (320-430 px) renders without horizontal scroll (SC3/SC4/SC5 human halves)"
    verification: []
    human_judgment: true
    rationale: "Device-class judgment the executor cannot make: needs a physical phone / fresh browser profile with network panel and install prompt, plus visual viewport assessment at 320-430 px. The machine-provable halves of the same criteria are covered in D2-D6."
  - id: D8
    description: "LEGAL-02 launch gate: owner replaces the four Impressum bracket placeholders with real parent data BEFORE the URL is shared (pages are live and verified; the data fill is the owner's)"
    requirement: LEGAL-02
    verification: []
    human_judgment: true
    rationale: "Prohibition P1: the executor must never invent parent personal data. The launch gate is by design a human action - handed over in 01-USER-SETUP.md with the exact placeholders and the rebuild+push command."

# Metrics
duration: 20min
completed: 2026-09-28
status: complete
---

# Phase 1 Plan 04: First Deploy Summary

**The site is live at https://morecolors123.github.io/handychecker/ — deployed by the pinned GitHub Actions Pages pipeline (build from source, artifact upload, deploy-pages), with the full live-URL verification green: German home, subpath-safe manifest, 192×192 PNG icon, legal pages, head wiring on all four pages, zero third-party references.**

## Performance

- **Duration:** ≈20 min executor time across 3 sessions (human-gated Task 2 + the Pages-source step span ~1 h of wall-clock waiting in between)
- **Started:** 2026-09-28T12:43Z (Task 1 commit `e17c3f3`, UTC)
- **Completed:** 2026-09-28T13:53Z (UTC close-out)
- **Tasks:** 3 (Task 1 auto, Task 2 checkpoint:human-action — completed by owner, Task 3 auto)
- **Files changed:** 1 planned (deploy.yml) + 2 planning records (01-USER-SETUP.md, this SUMMARY)

## Accomplishments

- **Deploy workflow:** `.github/workflows/deploy.yml` — the exact GitHub-documented flow from 01-RESEARCH lines 354-382: push to `main` + `workflow_dispatch` triggers, `contents: read` / `pages: write` / `id-token: write`, `concurrency: group: pages, cancel-in-progress`, build job (ubuntu-latest: checkout@v4 → setup-node@v4 with node 22 + npm cache → `npm ci` → `npm run build` → upload-pages-artifact@v3 with `path: _site`) and deploy job (needs build, environment github-pages, deploy-pages@v4). No secrets, no `.nojekyll`, no committed `_site/` (D-13; artifact-authenticated by id-token).
- **Human setup completed and machine-verified:** public repo `MoreColors123/handychecker` (ls-remote + fast-forward first push), Pages Source set to "GitHub Actions" (the first run's deploy job had failed for exactly this expected reason; the retrigger run succeeded), push auth over HTTPS works.
- **Deploy retrigger:** empty commit `513c2a0` pushed to main → the workflow ran and published `_site/` (gh CLI absent → the push-to-main trigger doubles as the re-run button).
- **Live-URL verification — ALL GREEN (attempt 1 after the retrigger, ~2 min):**
  - Home: HTTP 200, "Hi, ich bin Happi", all five topic cards (entity-decoded match) — SC1
  - Manifest: valid JSON, `start_url "."`, three relative icon entries (192 any, 512 any, 512 maskable) — SC4
  - Icon: `icons/icon-192.png` → `image/png`, IHDR exactly 192×192 (6382 bytes) — SC4
  - Legal pages live: `/impressum/` carries "Digitale-Dienste-Gesetz" + `[Name der Eltern]`; `/datenschutz/` carries "Hier wird nichts gespeichert" + "Hinweis für Eltern" — SC2
  - Head wiring (manifest link, favicon.svg, apple-touch-icon, both web-app-capable metas, apple-mobile-web-app-title) on **all four** live pages including the 404 path — SC4 every-page
  - Zero third-party `http(s)://` references in the served home HTML — SC3 machine half (PRIV-01 truth gate holds on the real URL)

## Task Commits

1. **Task 1: Deploy workflow — GitHub Actions Pages pipeline** - `e17c3f3` (feat) - 28 insertions, pinned token check green
2. **Task 2: HUMAN — create public repo + enable Pages source** - no commit (external dashboard actions; verified: repo exists, Pages source set, pushes succeed)
3. **Task 3: Push + live-URL verification** - `513c2a0` (chore, empty) - deploy retrigger; all live checks green (script ran from a temp file per the D-12 shell rule)

**Plan metadata:** `docs(01-04): complete First Deploy plan` commit (this file + STATE/ROADMAP/REQUIREMENTS + 01-USER-SETUP.md)

## Files Created/Modified

- `.github/workflows/deploy.yml` - the Pages Actions pipeline (build on push, artifact upload, Pages deploy)
- `.planning/phases/01-foundation-shell-pwa-identity-first-deploy/01-USER-SETUP.md` - human-setup record (all done ✓) + the ONE remaining launch-gate action
- The live deployment `https://morecolors123.github.io/handychecker/` - produced by the workflow from the pushed source (no build artifacts committed)

## Live URL & Verification Record

**https://morecolors123.github.io/handychecker/** (derived from `git remote get-url origin` → `MoreColors123`)

Checks ran via temp script `gsd-0104-live-check.js` (node's built-in fetch, Node 24; PowerShell strips quotes from `node -e` args — D-12):

| Check | Result |
|-------|--------|
| Home 200 + "Hi, ich bin Happi" + 5 topics (decoded) | PASS (attempt 1) |
| manifest.webmanifest JSON, start_url ".", relative-only icons | PASS (3 icons: 192/512 any, 512 maskable) |
| icons/icon-192.png image/png IHDR 192×192 | PASS (6382 bytes) |
| /impressum/ "[Name der Eltern]" + "Digitale-Dienste-Gesetz" | PASS |
| /datenschutz/ "Hier wird nichts gespeichert" + "Hinweis für Eltern" | PASS |
| Head wiring on home / impressum / datenschutz / 404 | PASS (4/4 pages, 5/5 tokens each) |
| Zero third-party http(s):// in live home HTML | PASS (0 matches) |
| 404 path serves the custom 404 body | PASS (status 404, Happi page body) |

Remaining human checks (device-class): fresh-browser network tab, install prompt on her Android, narrow-viewport no-horizontal-scroll — carried in coverage D7; plus the Impressum data fill before ANY URL share (D8, LEGAL-02 gate).

## Decisions Made

- **Retrigger via empty commit:** the plan's workflow_dispatch re-run needs the gh CLI (absent); the workflow's documented trigger is `push → main`, so `git commit --allow-empty` + push is the faithful re-run mechanism. Message documents its own purpose.
- **Entity decoding in live content checks:** the served home HTML carries `Bildschirmzeit &amp; Balance` (Eleventy auto-escape, established 01-01 decision); checks decode `&amp;/&lt;/&gt;/&quot;/&#39;` before matching the required strings. Strengthened verify, never weakened.
- **Base URL always derived, never hardcoded:** both the check script and the SUMMARY derive the URL from the origin remote.
- **USER-SETUP marked Complete (with the gate open):** all four frontmatter setup items finished and verified; the template's default "Incomplete" would misrepresent reality. The one remaining action is the LEGAL-02 launch gate, tracked as its own checkbox.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] Local branch was `master`, workflow trigger expects `main`**
- **Found during:** Task 2 continuation (pre-push)
- **Issue:** The local repo initialized with the default `master`; the committed workflow triggers only on `main`, and the plan's push command is `git push -u origin main`
- **Fix:** Renamed the branch to `main` (`git branch -m master main`) before configuring the remote and pushing — no content change
- **Verification:** `git branch --show-current` → `main`; first push fast-forwarded onto the empty repo's `main`
- **Committed in:** branch metadata only (no content commit)

**2. [Rule 3 - Tooling] Deploy needed a retrigger after the Pages source was set**
- **Found during:** Task 3 continuation (this session)
- **Issue:** The first workflow run's deploy job failed as expected (Pages source was "None" during the first push); after the owner set Source: "GitHub Actions", nothing re-runs automatically
- **Fix:** Empty commit `513c2a0` pushed to main → workflow ran → site published
- **Files modified:** none (empty commit)
- **Committed in:** 513c2a0

**3. [Rule 3 - Verify refinement] Plan's literal content check would fail against entity-encoded HTML**
- **Found during:** Task 3 (this session)
- **Issue:** The plan's automated check asserts `t.includes("Bildschirmzeit & Balance")` against raw HTML, but Eleventy 3.x serves `&amp;` (established phase decision: "built-content checks decode entities before matching") — the two plan elements cannot both hold
- **Fix:** Live check decodes HTML entities before string matching — matches the phase's established verification convention
- **Files modified:** none (temp verification script only)
- **Committed in:** n/a (temp script)

---

**Total deviations:** 3 (2 × Rule 3 blocking/tooling, 1 × Rule 3 verify refinement)
**Impact on plan:** No scope change — branch rename and retrigger were required to make the planned push→deploy→verify chain work at all; the entity-decode refinement aligns the check with the phase's own decision.

## Issues Encountered

- The first workflow run's deploy job failed exactly as predicted (Pages source not yet set) — resolved by the owner's dashboard step + the empty-commit retrigger; no code change needed.
- `node -e` payloads with embedded quotes fail on PowerShell 5.1 (D-12) — the entire live check ran from a temp .js file.
- The live check found the site already deployed on its first poll (~2 min after the retrigger push) — faster than the plan's 1-2 min estimate, no poll loop exercised.
- 01-04's commit-ledger file was missing (created in a pre-#3968 session); reconstructed at the pre-Task-1 HEAD `f1321a6` so the commits count is measured, not narrated.

## Known Stubs

- `src/impressum.njk` — the four parent-data bracket placeholders (`[Name der Eltern]`, `[Straße und Hausnummer]`, `[PLZ] [Ort]`, `[E-Mail-Adresse der Eltern]`) are **intentional and mandated** (prohibition P1: never invent parent data). Live and verified; the owner replaces them before sharing the URL (01-USER-SETUP.md, LEGAL-02 launch gate). Already tracked in `.planning/WINDOWS.md` entry 2 — no new ledger entry.

No other stubs: the workflow is complete, the live site serves the full Phase-1 shell (no placeholders except the legally-mandated Impressum fields), no TODOs, no dead data sources.

## User Setup Required

**Setup is DONE and machine-verified** — see [01-USER-SETUP.md](./01-USER-SETUP.md) for the completed GitHub configuration record and the **one remaining launch-gate action**: fill the Impressum placeholders with real parent data BEFORE sharing the URL (§ 5 DDG; the executor never invents this data).

## Next Phase Readiness

- **Phase 2 (Widgets)** can build on the deployed shell: every push to main auto-deploys, so topic pages/widgets ship by normal `git push` with no deploy step to invent.
- **Launch gate (open):** owner fills Impressum parent data (01-USER-SETUP.md) before the URL is shared anywhere; device-class human checks (fresh-profile network tab, install prompt, 320-430 px viewport) are carried in coverage D7 for phase close-out/UAT.
- **Phase 4** validates install on the real device against this live URL (ROADMAP coverage note: hardware verification boundary).
- **Zero-host etiquette is now a live contract:** any future content/JS (Phases 2-3) must keep the build + live zero-third-party checks green — the same gate now enforced twice (local `_site/` scan + live fetch).
- STATE advances past plan 4/4 → Phase 01 execution complete; all five phase requirements (PWA-01, PWA-02, LEGAL-01, LEGAL-02, PRIV-01) become completable in REQUIREMENTS.md.

---
*Phase: 01-foundation-shell-pwa-identity-first-deploy*
*Completed: 2026-09-28*
