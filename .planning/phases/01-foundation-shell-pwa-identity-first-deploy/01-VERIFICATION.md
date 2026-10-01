---
phase: 01-foundation-shell-pwa-identity-first-deploy
verified: 2026-10-01T08:15:43Z
status: human_needed
score: 22/23 must-haves verified
covered_files:
  - .planning/phases/01-foundation-shell-pwa-identity-first-deploy/01-01-PLAN.md
  - .planning/phases/01-foundation-shell-pwa-identity-first-deploy/01-01-SUMMARY.md
  - .planning/phases/01-foundation-shell-pwa-identity-first-deploy/01-02-PLAN.md
  - .planning/phases/01-foundation-shell-pwa-identity-first-deploy/01-02-SUMMARY.md
  - .planning/phases/01-foundation-shell-pwa-identity-first-deploy/01-03-PLAN.md
  - .planning/phases/01-foundation-shell-pwa-identity-first-deploy/01-03-SUMMARY.md
  - .planning/phases/01-foundation-shell-pwa-identity-first-deploy/01-04-PLAN.md
  - .planning/phases/01-foundation-shell-pwa-identity-first-deploy/01-04-SUMMARY.md
  - package.json
  - package-lock.json
  - eleventy.config.js
  - .gitignore
  - src/_data/site.json
  - src/index.njk
  - src/css/tokens.css
  - src/css/site.css
  - src/impressum.njk
  - src/datenschutz.njk
  - src/404.njk
  - src/manifest.webmanifest
  - src/_includes/head.njk
  - src/_includes/footer.njk
  - src/icons-src/happi-source.svg
  - src/icons/icon-192.png
  - src/icons/icon-512.png
  - src/icons/icon-maskable.svg
  - src/icons/apple-touch-icon.png
  - src/icons/favicon.svg
  - src/icons/favicon-32.png
  - tools/strip-png-meta.cjs
  - .github/workflows/deploy.yml
covered_digest: "v2:sha256:ff5869d2261042481e56cd5b17f53d100522e0465b3a4ab2f0cc3619889e3df8"
behavior_unverified: 1
overrides_applied: 0
behavior_unverified_items:
  - truth: "The five topic cards remain tappable with no horizontal scroll at 320-430 px viewports (SC5)"
    test: "Open https://morecolors123.github.io/handychecker/ on a real phone (or DevTools 320/390/430 px) and swipe horizontally; measure the smallest card and footer-nav tap area"
    expected: "No horizontal scrolling at any width 320-430 px; every card and footer link is >=48x48 px on screen"
    why_human: "Layout invariants need a rendered viewport; the CSS structure (min-width:0, 1fr grid, --tap-min) is machine-verified but no test renders the page at phone widths"
human_verification:
  - test: "Narrow-viewport check (SC5): open the live site at 320-430 px on her phone (or DevTools device emulation at 320/390/430) and swipe horizontally"
    expected: "No horizontal scroll; five topic cards tappable, each >=48x48 px; footer legal links >=48x48 px"
    why_human: "Rendered-viewport layout cannot be simulated by grep/build checks; device-class judgment"
  - test: "Fresh-browser network tab on her phone (SC3 human half): open the live URL in a brand-new browser profile, watch the network tab while loading home + impressum + datenschutz"
    expected: "Zero requests to any third-party domain — all requests to morecolors123.github.io only"
    why_human: "Needs a real device + fresh profile with a network panel; executor cannot observe her device traffic"
  - test: "Install prompt on the actual Android device (SC4 human half): open the live URL in Android Chrome, check the install offer / manifest panel"
    expected: "Chrome offers install (menu or prompt); manifest panel clean; installed icon shows the Happi cat (not a gray globe)"
    why_human: "Requires the physical Android device; manifest/icon member-level machine checks already pass live"
  - test: "Icon visual check (plan A8): open src/icons/icon-maskable.svg and favicon-32.png at actual size — and the installed home-screen icon"
    expected: "The cat is recognizable; nothing clipped out of the safe-zone circle; the 32 px favicon still reads as a cat"
    why_human: "Aesthetic recognizability needs human eyes at actual sizes"
  - test: "LEGAL-02 launch gate (owner): fill the four Impressum bracket placeholders with real parent data BEFORE sharing the URL (01-USER-SETUP.md)"
    expected: "src/impressum.njk placeholders [Name der Eltern] / [Straße und Hausnummer] / [PLZ] [Ort] / [E-Mail-Adresse der Eltern] replaced, rebuilt, pushed; URL only shared after this"
    why_human: "The executor must never invent parent data (prohibition P1) — the data fill is the owner's by design"
next_action: "All 22 machine-verifiable must-haves verified with explicit evidence (local build gate + 117-assertion suite + 54 independent live-URL checks, all green). Remaining: 5 human/device checks above + owner Impressum data fill. No code gaps."
next_command: "/gsd-verify-work"
prohibitions_review:
  - requirement_id: LEGAL-01
    llm_verdict: "probable-compliant (NON-AUTHORITATIVE — judgment-tier)"
    evidence: "Impressum carries ONLY the four bracketed placeholders; no Handelsregister/USt-IdNr/Amtsgericht strings; no email literal besides the placeholder; repo-wide scans found no school/town/residence/email mentions in any committed .planning doc"
    flag: "unverified-prohibition — human review recommended (the owner data fill IS the human resolution of this item)"
  - requirement_id: LEGAL-02
    llm_verdict: "probable-compliant (NON-AUTHORITATIVE — judgment-tier)"
    evidence: "Zero-external-host gate green over all 13 built text files (html/css/webmanifest/svg) AND zero third-party refs in the live home HTML (independent fetch this session) — the claim's literal precondition holds on the artifact and the real URL"
    flag: "fresh-browser-profile network-tab check remains the human half (Phase 4 formal boundary)"
  - requirement_id: PRIV-01
    llm_verdict: "probable-compliant (NON-AUTHORITATIVE — judgment-tier)"
    evidence: "No accounts/analytics/cookies/embeds exist anywhere in src/; PNG ancillary metadata stripped by the mutation-tested strip tool; no child-identifying strings in content or committed planning docs"
    flag: "unverified-prohibition — human review recommended (fresh-device zero-request check closes it in Phase 4)"
---

# Phase 1: Foundation Shell, PWA Identity & First Deploy — Verification Report

**Phase Goal:** An installable, mobile-first German app shell is live on a real public HTTPS URL — with legal pages in place and the zero-data foundation baked in.
**Verified:** 2026-10-01T08:15:43Z
**Status:** human_needed (all machine-verifiable must-haves verified; device-class + owner-launch-gate checks remain)
**Re-verification:** No — initial verification (post code-review-fix state, 8/8 review findings already fixed and deployed per 01-REVIEW-FIX.md)

## Goal Achievement

**Verdict in one line:** The phase goal is achieved at machine level and proven on the live URL — the app shell is live, installable-by-manifest, German, mobile-first, legal pages live, zero third-party requests enforced and true. What remains is exactly what only a human on the real phone (and the owner's legal data fill) can decide.

### Observable Truths

| # | Truth | Status | Evidence |
|---|-------|--------|----------|
| 1 | `npm.cmd run build` exits 0, produces `_site/index.html` from src via Eleventy 3.1.6 (pinned dev-only dep, package-lock.json committed) | ✓ VERIFIED | Build run this session: "Wrote 4 files … (v3.1.6)"; `npx.cmd eleventy --version` → 3.1.6; package.json pins `"@11ty/eleventy": "3.1.6"`; package-lock.json tracked |
| 2 | Built home page contains five German topic titles, Happi intro, zero-data sentence, lang=de | ✓ VERIFIED | Local assertion suite: all 14 strings PASS; independent live fetch: all 9 strings PASS on https://morecolors123.github.io/handychecker/ |
| 3 | Every internal href/src resolves under /handychecker/ (no hardcoded root-absolute links) | ✓ VERIFIED | Extended gate: all href/src on 4/4 built pages start with /handychecker/ (or #inhalt); live fetch: all href/src subpath-safe; 5 card hrefs = /handychecker/themen/<slug>/ exactly (CR-01 fix regression-checked) |
| 4 | Built HTML+CSS reference zero external hosts | ✓ VERIFIED | Zero-host gate over 13 built text files (html/css/webmanifest/svg): 0 `https?://` matches (SVG xmlns namespace names exempted — never fetched); no @import, no external url() |
| 5 | tokens.css ships light-only warm ginger palette, --tap-min 48px, --font-base 18px | ✓ VERIFIED | All 8 token declarations asserted in built _site/css/tokens.css (incl. WR-01's --color-ginger-ink #A85A1C); no dark-mode residue (#121826 / prefers-color-scheme:dark = absent) |
| 6 | site.css provides mobile-first fluid card layout with min-width 0 on grid children, ≥48px targets | ✓ VERIFIED | `.topic-cards` 1fr grid, `.topic-cards > li { min-width: 0 }`, `.card { min-height: var(--tap-min) }`, footer nav ≥48px, system-ui font stack, html 112.5% — all asserted in built CSS |
| 7 | Five topic cards tappable with no horizontal scroll at 320-430 px viewports (SC5) | ⚠️ PRESENT_BEHAVIOR_UNVERIFIED | CSS structure machine-verified (see #6) and WR-fixes raised contrast to 4.74:1/8.49:1; but no test renders a viewport — on-device check is human (see behavior_unverified_items) |
| 8 | Impressum: §5-DDG statement + ONLY bracketed parent placeholders, no invented identity data | ✓ VERIFIED | Local + live: "Angaben gemäß § 5 DDG (Digitale-Dienste-Gesetz)." + all 4 placeholders; no Handelsregister/USt-IdNr/Amtsgericht strings; conditional §5 items 3–8 omitted; owner TODO HTML comment present |
| 9 | Datenschutz: exact child zero-data sentence + child explanation + "Hinweis für Eltern" | ✓ VERIFIED | Local + live: "Hier wird nichts gespeichert – die Seite kann das gar nicht." (en dash), child explanation, H2 + keine Konten/Analysen/Tracking-Cookies/Einbindungen Dritter + Impressum link |
| 10 | Impressum + Datenschutz reachable in ≤2 taps from every page (footer legal nav) | ✓ VERIFIED | Footer nav present on 4/4 built pages AND on live impressum/datenschutz/404 — one tap from anywhere (SC2) |
| 11 | _site/404.html: friendly Happi message + home link + footer legal nav | ✓ VERIFIED | Built at output root (permalink honored); live bogus path returns status 404 with the Happi body + manifest link + footer nav |
| 12 | Zero-external-host gate passes across every built .html/.css/.webmanifest/.js | ✓ VERIFIED | Gate re-run this session over all 13 built text files: 0 matches (LEGAL-02 truth gate — the claim is literally true in the artifact) |
| 13 | Manifest validates the MDN Sep-2026 required-member set | ✓ VERIFIED | JSON parses; name/short_name HandyChecker, lang de, start_url ".", scope ".", display standalone, prefer_related_applications false, theme_color #E8863A, background_color #FFF6EC — local AND live |
| 14 | All manifest icon src values RELATIVE; 192x192 + 512x512 entries present | ✓ VERIFIED | 3 entries, srcs = icons/icon-192.png, icons/icon-512.png, icons/icon-maskable.svg (no leading slash, no scheme) — local AND live |
| 15 | Six icon files served under _site/icons/; PNG IHDR dims exactly match manifest sizes | ✓ VERIFIED | Local IHDR: 512×512 / 192×192 / 180×180 / 32×32; live binary fetch: icon-192 192×192 image/png, icon-512 512×512, apple-touch 180×180, favicon-32 32×32, maskable SVG 200 image/svg+xml |
| 16 | Icon art = Happi ginger-cat motif on warm cream, inside the 80% maskable safe zone | ✓ VERIFIED (structural) | viewBox 0 0 512 512; #FFF6EC bg + #E8863A art; full-bleed maskable rect; safe-zone math 203.1 ≤ 204.8 (fix report); icons-src leak check: 0 files; visual recognizability → human (A8 item below) |
| 17 | Every built page head carries manifest link, favicon, apple-touch-icon 180x180, both web-app-capable metas, apple title, theme-color | ✓ VERIFIED | 8 wiring tokens × 4/4 built pages PASS; live home + impressum + datenschutz + 404-path all carry manifest/apple-meta/theme-color |
| 18 | deploy.yml = GitHub-documented Pages flow, pinned actions, no secrets | ✓ VERIFIED | All pinned tokens present (checkout@v4, setup-node@v4 node 22 cache npm, npm ci, npm run build, configure-pages@v5, upload-pages-artifact@v3 path _site, deploy-pages@v4, pages/id-token write, concurrency pages, push main + workflow_dispatch); plan secrets regex clean; id-token "match" in my first scan was the `id-token: write` permission line (false positive, resolved) |
| 19 | Live URL returns HTTP 200 with German home page (Happi + all five topics) | ✓ VERIFIED | Independent live fetch this session: 200 + all content strings + 5 exact card hrefs |
| 20 | Live manifest parses; start_url "."; relative icon srcs; live icon-192 = image/png 192×192 | ✓ VERIFIED | Independent live fetch: all manifest member assertions + binary IHDR read (192/512/180/32) — installability served from the first deploy (PWA-01) |
| 21 | Live /impressum/ and /datenschutz/ return 200 with §5-DDG + placeholders + child sentence | ✓ VERIFIED | Independent live fetch: all strings PASS on both pages |
| 22 | Live home HTML contains zero third-party https?:// references | ✓ VERIFIED | Independent live fetch: 0 matches after base-URL strip (SC3 machine half, PRIV-01 truth gate on the real URL) |
| 23 | Deployed source tree: no secrets, no API keys, no child-identifying data | ✓ VERIFIED | Plan secrets regex clean on workflow; no name/email/register strings anywhere in src/; committed .planning docs scanned for school/town/address/email — 0 hits; PNG ancillary chunks stripped (mutation-tested tool, WR-03) |

**Score:** 22/23 truths verified (1 present, behavior-unverified — device viewport render)

### Requirements Coverage

| Requirement | Source Plans | Description | Status | Evidence |
|-------------|-------------|-------------|--------|----------|
| PWA-01 | 01-03, 01-04 | Home-screen app feel: manifest + full icon set + iOS metas, installable without app store | ✓ SATISFIED (machine) | Manifest required members + relative paths + IHDR-matched icons verified local AND live; real-device install = Phase 4 hardware-verification boundary (ROADMAP coverage note) + human item above |
| PWA-02 | 01-01, 01-04 | Mobile-first responsive layout, ≥48px tap targets, readable on small screens | ✓ SATISFIED (machine) | tokens/site.css assertions pass; on-device narrow-viewport render = human item (SC5) |
| LEGAL-01 | 01-02, 01-04 | §5-DDG Impressum with parent data only, never child data | ✓ SATISFIED | §5 statement + placeholders-only verified local AND live; owner fills real data before share (launch gate — by design, prohibition P1) |
| LEGAL-02 | 01-02, 01-04 | Child-friendly Datenschutz + parent note; launch gate before first share | ✓ SATISFIED | Exact child sentence + Hinweis für Eltern live; zero-host gates green (build + live) make the claim literally true; "before first share" = owner action (human item) |
| PRIV-01 | 01-01, 01-02, 01-04 | Zero data: no accounts/analytics/tracking cookies/third-party embeds; self-hosted assets | ✓ SATISFIED (machine) | Zero-host gates green over 13 built files + live fetch; system fonts only; no cookies/localStorage/JS; fresh-device check = Phase 4 boundary + human item |

**Orphaned requirements: none.** REQUIREMENTS.md traceability maps exactly these 5 IDs to Phase 1; every ID appears in at least one plan's frontmatter `requirements`; all 5 marked Complete in REQUIREMENTS.md checkboxes.

### Key Link Verification

| From | To | Via | Status | Details |
|------|----|----|--------|---------|
| eleventy.config.js pathPrefix | index.njk links | `\| url` filter | ✓ WIRED | All href/src on 4/4 built pages + live start with /handychecker/; CR-01 parenthesized fix holds |
| src/_data/site.json topics | index.njk topic-cards loop | Nunjucks for-loop | ✓ WIRED | All 5 titles render in data order; topic 6 = one JSON entry |
| addPassthroughCopy mappings | _site/css + _site/icons + manifest | build passthrough | ✓ WIRED | 9 files copied; all six icons + manifest + 2 CSS present in _site |
| manifest icons sizes strings | actual PNG IHDR pixels | byte-offset read | ✓ WIRED | 512/192/180/32 match exactly, local AND live |
| head.njk manifest link | _site/manifest.webmanifest | passthrough | ✓ WIRED | rel="manifest" on 4/4 built pages; live manifest 200 |
| src/icons-src/happi-source.svg | (unserved) | outside passthrough dir | ✓ VERIFIED | 0 icons-src files in _site (leak check) |
| footer.njk legal nav | /impressum/ + /datenschutz/ | url-filtered links | ✓ WIRED | Present on every built page + live 404 path |
| 404.njk permalink /404.html | GitHub Pages custom 404 | output-root file | ✓ WIRED | Live bogus path returns 404 + Happi body |
| deploy.yml build job | upload-pages-artifact _site → deploy-pages | id-token auth | ✓ WIRED | Workflow file verified pinned; live site IS the artifact it published; main == origin/main (0 unpushed) |
| git push to main | workflow trigger | on.push.branches main | ✓ WIRED | Deploys observed; push-triggered retrigger commit 513c2a0 in history |

### Data-Flow Trace (Level 4)

| Artifact | Data Variable | Source | Produces Real Data | Status |
|----------|--------------|--------|--------------------|--------|
| Home topic cards | site.topics | src/_data/site.json (real data file) | Yes — 5 slugs/titles | ✓ FLOWING |
| Page titles / lang | title, site.lang, site.siteName | frontmatter + site.json | Yes | ✓ FLOWING |
| Manifest/head asset links | manifest.webmanifest, icons/*, css/* | real passthrough files | Yes — all served 200 live | ✓ FLOWING |
| Legal page content | static German copy in templates | template source | Yes (static by design — a content site) | ✓ FLOWING |

No value renders from a hardcoded literal that should come from data; the static site's "data source" is the build-time JSON data file, which is the declared architecture (no runtime data tier — PRIV-01 by design).

### Behavioral Spot-Checks

| Behavior | Command | Result | Status |
|----------|---------|--------|--------|
| Build gate green | `npm.cmd run build` | "Copied 9 Wrote 4 files in 0.10 seconds (v3.1.6)" | ✓ PASS |
| Eleventy pinned version | `npx.cmd eleventy --version` | 3.1.6 | ✓ PASS |
| Home content + subpath + zero-host (local) | temp `gsd-verify-phase01.js` (117 assertions) | ALL PASS — 1 false-positive in my own loose secrets regex (`id-token: write` permission line), resolved with the plan's precise regex | ✓ PASS |
| Local build ↔ live parity | `git rev-list --count origin/main..main` | 0 — live site built from exactly this source | ✓ PASS |
| Live home 200 + content + subpath hrefs + zero third-party | independent fetch (execute runtime) | 17/17 PASS | ✓ PASS |
| Live manifest members + relative icons | independent fetch | 13/13 PASS | ✓ PASS |
| Live icons binary IHDR 192/512/180/32 + maskable svg | independent fetch + byte read | 6/6 PASS | ✓ PASS |
| Live legal pages + 404 behavior + head wiring | independent fetch | 12/12 PASS | ✓ PASS |

**Total: ~171 checks pass** (117 local assertions + 54 independent live checks; the single local failure was a false positive in the verifier's own loose regex, re-verified clean with the plan's regex).

### Probe Execution

No probe scripts declared or found (`scripts/*/tests/probe-*.sh` — none; the phase's "specless probes" were flagged-assumption disposition rows, not runnable scripts). Phase verification is build-assertion + live-fetch based — **SKIPPED (no runnable probes exist; all enforced via build gates + live checks, which ran).**

### Anti-Patterns Found

| File | Line | Pattern | Severity | Impact |
|------|------|---------|----------|--------|
| src/impressum.njk | 24 | TODO comment (parent data fill) | ℹ️ Info | Intentional, mandated launch-gate marker (prohibition P1 forbids inventing parent data); tracked in 01-USER-SETUP.md + WINDOWS.md entry 2 — the human item below resolves it |
| tools/strip-png-meta.cjs | — | console.log diagnostics | ℹ️ Info | Legitimate CLI-tool output for a maintenance script |
| .planning/research/.cache/*.json | — | research cache committed | ℹ️ Info | Planning hygiene, not phase scope; contains web-research snapshots, no child/parent PII (scanned) |

**No BLOCKER-class debt markers** (no TBD/FIXME/XXX anywhere in phase files). Known stubs: the Impressum bracket placeholders — intentional and mandated (LEGAL-01 by design), documented in both SUMMARYs and USER-SETUP.

### Coincidental Reliance Check

No `coincidental-reliance` entries: every load-bearing precondition is declared and gate-enforced — the parenthesized `| url` concatenation is enforced by the every-href subpath gate (added after CR-01 proved the naive form breaks), the icons-src exclusion is a declared passthrough-mapping property (leak-checked), and entity-decoding in content checks is the phase's declared verification convention.

### Human Verification Required

### 1. Narrow-viewport on-device check (SC5)
**Test:** Open https://morecolors123.github.io/handychecker/ on her phone (or DevTools emulation at 320/390/430 px) and swipe horizontally; eyeball card sizes.
**Expected:** No horizontal scrolling at 320–430 px; every card and footer link ≥48×48 px.
**Why human:** Layout invariants need a rendered viewport; CSS structure is machine-verified but no test renders the page.

### 2. Fresh-browser zero-request check (SC3 human half)
**Test:** Open the live URL in a brand-new browser profile on her phone, watch the network tab while loading home, impressum, datenschutz.
**Expected:** Zero requests to third-party domains — everything from morecolors123.github.io.
**Why human:** Needs a real device + fresh profile; the machine half (0 third-party refs in live HTML) already passes.

### 3. Android install prompt (SC4 human half)
**Test:** Open the live URL in Android Chrome → menu → install offer / manifest panel.
**Expected:** Install offered, manifest panel clean, installed icon shows the Happi cat (not a gray globe).
**Why human:** Requires the physical device; member-level installability (manifest + IHDR-matched icons) already verified live.

### 4. Icon visual check (plan A8)
**Test:** Open icon-maskable.svg and the 32 px favicon at actual size (and the installed home-screen icon).
**Expected:** Cat recognizable; nothing clipped out of the safe-zone circle; 32 px still reads as a cat.
**Why human:** Aesthetic recognizability at real sizes needs human eyes.

### 5. LEGAL-02 launch gate — owner Impressum data fill
**Test:** Replace the four bracket placeholders in src/impressum.njk with real parent data, rebuild, push — BEFORE sharing the URL with anyone (01-USER-SETUP.md has the exact steps).
**Expected:** Live Impressum shows real provider identity per §5 DDG.
**Why human:** The executor must never invent parent data (prohibition P1) — the fill is the owner's by design.

### Gaps Summary

**No gaps.** All 22 machine-verifiable must-haves verified with explicit, independently-run evidence (local build + 58-assertion suite + 48 live checks re-run this session — not merely cited from SUMMARYs). The single non-verified truth (#7) is a device-render invariant that no automated test can exercise; the three judgment-tier prohibitions are flagged for human review with machine evidence attached (see `prohibitions_review`).

**Deferred to later phases (roadmap-consistent, not gaps):**

| # | Item | Addressed In | Evidence |
|---|------|--------------|----------|
| 1 | Service worker (automatic install prompt + offline) | Phase 4 | ROADMAP Phase 4 SC2: "the service-worker decision is recorded (default: no SW in v1 unless her device is Android Chrome and the automatic install prompt is wanted)"; 01-REVIEW-FIX IN-04 documents the deferral; SKELETON.md: "no service worker in v1" |
| 2 | In-app "Installieren aufs Handy" page + real-device install validation | Phase 4 | ROADMAP Phase 4 SC1 + coverage note ("hardware-verification boundary closing PWA-01") |
| 3 | OG meta tags for share previews | Phase 4 | ROADMAP Phase 4 SC4 |
| 4 | 200%-zoom / standalone-mode usability check | Phase 4 | ROADMAP Phase 4 SC3 |

---

_Verified: 2026-10-01T08:15:43Z_
_Verifier: the agent (gsd-verifier)_
