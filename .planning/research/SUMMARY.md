# Project Research Summary

**Project:** HandyChecker — child-focused smartphone-safety website
**Domain:** German-language digital-safety / healthy-screen-time education site (ages 10–12), static PWA-style site
**Researched:** 2026-09-25
**Confidence:** MEDIUM-HIGH

## Executive Summary

HandyChecker is a tiny, child-focused (10–12), German-language educational website that teaches balance with smartphones across six topics (screen time, sleep, attention/focus, body effects, social media & feelings, privacy & data). Every research file converges on the same architecture: **a static site with zero backend, zero accounts, zero data collection, and zero third-party requests, fronted by a PWA-style home-screen shell**. Experts build this class of product as semantic HTML5 + one hand-written CSS design-token system + ~100 lines of vanilla JS that progressively enhances self-check quizzes, served from a free static host behind a Web App Manifest + icon set so it installs to the home screen like an app. The only genuine stack decision is authoring tooling: Eleventy 3.1.6 (one shared Nunjucks template driven by a JSON data file) versus hand-written HTML with a canonical copy-template discipline. Both emit identical pure-HTML output; **Eleventy is the recommended choice here** because six topics with shared nav and years of parent-side content growth make the single dev-only `npm install -D` pay for itself immediately, and ARCHITECTURE's folder structure maps 1:1 onto its output.

The recommended build order is a strict dependency chain: (1) foundation shell + PWA identity + first deploy, (2) widget layer + one reference topic built to print quality, (3) content build-out of the remaining five topics, (4) offline decision / polish / real-device QA. This mirrors how experts de-risk: get the installable "app feel" testable on day one, perfect exactly one topic before mass-producing five clones, and leave the only phase with a second-order failure mode (service-worker cache staleness) for last.

The dominant risks are not technical — they are editorial and legal: **(a) the parent-lecture voice and fear-mongering tone** that would make the child close the site (mitigate with a guide-persona voice spec, a facts-sheet-per-topic gate citing pediatric sources, and a non-parent reviewer on all drafts); **(b) German/EU compliance** — Impressum/Datenschutz, the LG München ruling against Google Fonts (IP leakage = DSGVO violation), GDPR Art. 8 consent age 16, and the GitHub Pages *public-repo* implication for a site about a real child (mitigate with a zero-tracking rule, a privacy-first host choice, and strict repo hygiene); and **(c) iOS PWA reality** — no automatic install prompt on iOS, unstable EU standalone behavior post-iOS 17.4, and picky manifest/icon requirements (mitigate with an explicit install-instructions page, first-device validation, and a pixel-correct 192/512/180 + maskable icon set). One open decision persists across the research: whether to include a ~25-line service worker (STACK recommends it for Android's automatic install prompt + offline reads; PITFALLS recommends skipping it to avoid cache staleness and iOS flakiness) — resolve by checking the daughter's actual device OS before Phase 4.

## Key Findings

### Recommended Stack

Eleventy 3.1.6 (Node 22 LTS, dev-only dependency) generates pure HTML with zero JS in the output; one template + `_data/topics.json` makes adding topic #7 a data edit, not a new page. The shipped product is semantic HTML5 (`lang="de"`), one hand-written CSS file (design tokens + components), and one `app.js` (~100 lines) for self-check interactivity — no framework, no asset build step, no runtime libraries (deliberate answer: none). The PWA layer is a W3C manifest (required: `name`/`short_name`, 192 + 512 px icons, `start_url`, `display`, `prefer_related_applications:false`, HTTPS mandatory) plus `apple-touch-icon` (180×180) and iOS meta tags, and — optionally — a ~25-line cache-first service worker. Hosting: GitHub Pages or Cloudflare Pages (free, automatic HTTPS). Fonts: **system font stack only** — the LG München ruling makes CDN fonts (Google Fonts etc.) disqualifying for a German children's site.

**Core technologies:**
- Eleventy 3.1.6: static site generator (Node ≥18) — one Nunjucks template + JSON data renders all six topic pages; output is pure HTML with zero client-side framework
- Node.js 22 LTS: build-time runtime only, never on the server
- Semantic HTML5 + one CSS file (design tokens) + vanilla JS (ES2022): the entire shipped site, ~100 lines of interactivity
- Web App Manifest + icon set (192/512 PNG, maskable SVG, apple-touch-icon) + optional tiny `sw.js`: the only thing that delivers the "home-screen app" requirement
- GitHub Pages / Cloudflare Pages: free static hosting with automatic HTTPS (installability requires HTTPS)

### Expected Features

Every serious competitor (klicksafe, Internet-ABC, Handysektor, freii, eSafety, Common Sense) ships the same core pattern — age-appropriate German content, an interactive self-check, actionable tips, a friendly guide persona — and none is built for a child to open alone on her own phone. That gap, plus the parent-free "friendly guide" voice, is where HandyChecker competes.

**Must have (v1, table stakes):**
- Six-topic German content, facts-first, short sections (all six topics are Active requirements; structure must not change)
- Reusable self-check quiz component — descriptive "Wie ist das bei dir?" answers, never scored or shaming
- "Was kann ich tun?" tip boxes on every topic — 1–3 concrete actions (efficacy is what makes facts land)
- Mobile-first layout + home-screen-app feel (PWA shell) — on-device-state only
- Impressum + Datenschutzerklärung (kids' version + short parent note) — v1 launch gate at first public URL
- Zero data collection: no accounts, no analytics, no cookies, no third-party embeds — the privacy statement must be literally true
- Friendly guide persona + style guide — the anti-lecture guarantee, defined before mass copy-writing

**Should have (v1.x, differentiators):**
- Offline missions ("Missionen") — per-topic one-off real-world challenges; no streaks/points-for-logging-in (those are anti-features)
- Completion certificate ("Handy-Profi") — localStorage-only, after all six self-checks
- Printable family media contract + sleep pact — child-initiated version of the Pädi-award-winning Internet-ABC tool
- Share-with-friends tip cards — German, messaging-app shareable (no institutional German site does peer sharing)
- Myth-buster / fun-fact callouts ("Stimmt das eigentlich?") — per topic

**Defer (v2+):**
- Scenario decision games in the social-media topic (HIGH complexity, multi-branch)
- Minimal "Für Eltern" page (parental trust aid — NOT a dashboard)
- Static FAQ built only from real questions ("Frag dich selbst")

**Explicit anti-features (non-requirements):** fear/scare messaging, streaks–leaderboards–engagement gamification, accounts/analytics/tracking, third-party embeds, self-diagnosis quizzes ("Bist du süchtig?"), parent-lecture voice, evaluation-style scoring, user-generated content/comments, monetization.

### Architecture Approach

Three "machines" only: a free static file host, the browser on her phone, and one hand-written vanilla-JS enhancer. No server, no database, no outbound data, and — deliberately — no persisted state (each visit is a fresh, judgment-free session; even localStorage progress is an anti-pattern here). Reference structure: `themen/<slug>/index.html` per topic (clean shareable URLs — Anti-Pattern 6 is one giant scrolling page), `css/tokens.css` + `css/site.css`, one generic `js/quiz.js` driven by `data-*` attributes in the HTML, `manifest.webmanifest` + full icon set, and `_templates/` as the non-deployed canonical reference page. Three patterns govern everything: progressive enhancement (semantic HTML works with JS off; quiz.js only upgrades it), "canonical template + copy" as the component system (copy-paste discipline with a documented migration path to Eleventy), and "data lives in HTML, logic stays generic" (one quiz.js serves all six topics).

**Major components:**
1. Content pages — six topic pages + home + 404; static HTML, one folder per topic for shareable URLs
2. Design system — `tokens.css` (colors/spacing/type scale as single source of truth) + `site.css` (cards, tip boxes, quiz, nav); mobile-first, ≥48 px touch targets
3. Self-check widget — `js/quiz.js` generic enhancer reading `data-*` attributes; content lives in markup so the parent edits HTML, never JS
4. PWA identity — manifest + 192/512/maskable/apple-touch icons + iOS meta tags; `apple-touch-icon` is a *must* (iOS ignores manifest icons → blurry screenshot icon)
5. Offline cache (optional, last phase) — ~20-line versioned service worker if included
6. Static host — GitHub Pages / Cloudflare Pages over HTTPS; in-app "Start/Zurück" nav is mandatory (no browser back button in standalone mode)

### Critical Pitfalls

The 12 critical pitfalls split into three clusters: tone/content (1–6), PWA/platform (7–9), legal/privacy/mobile-UX (10–12). Top priorities:

1. **Fear-mongering & parent-lecture voice (Pitfalls 1, 2, 6)** — the owner IS the parent; scare-tone makes kids tune out ("They overdo it. They lie."), and the lecture voice is this author's default failure mode. Avoid with a "facts + agency" editorial rule (graded language: "kann dazu führen", never "du bist süchtig"), third-person/plural guide voice, a "Was ist daran eigentlich gut?" balance section on every topic, and a non-parent reviewer (spouse, teacher, an actual 10–12-year-old) on all drafts.
2. **Inaccurate/overstated health claims (Pitfall 3)** — AAP: no evidence blue light from normal screens damages children's eyes; myopia is associated with near-work AND reduced outdoor time; sleep disruption is the one well-supported claim. Avoid by building a facts sheet per topic from AAP/Mayo/pediatric-sleep sources *before* writing; hedge association-level claims; ship a myth-buster section.
3. **iOS/EU PWA reality + broken manifest (Pitfalls 7, 8)** — iOS has no automatic install prompt (hidden Share → Add to Home Screen path), EU standalone behavior is unstable post-iOS 17.4, and a wrong manifest/icon set yields a "broken" gray-globe icon that kills child trust. Avoid with a dedicated "Installieren aufs Handy" page from the first deploy, visual install validation on the real phone for BOTH OSes, and pixel-correct icons (512/192/180 + maskable) treated as a tested deliverable.
4. **GitHub Pages public-repo + privacy mismatch (Pitfall 10)** — free GitHub Pages is a *public repo*: a site about a real, identifiable child means the entire source is world-readable forever. Avoid by choosing the host for privacy (Cloudflare/Netlify build from private repos) or enforcing strict repo hygiene (site pseudonym, zero identifying info, `.gitignore` drafts, Impressum carries the parent's data — never the child's).
5. **Cache staleness in the installed app (Pitfall 9)** — aggressively cached installed apps keep serving old content after each deploy. Avoid by skipping the SW or using network-first-for-HTML with cache-name versioning, `no-cache`/`must-revalidate` on HTML, hashed asset filenames, and an explicit update-path test (change a headline → deploy → verify the phone shows it within a day).
6. **Standalone-mode UX failures (Pitfall 12)** — the installed app has no browser chrome; a persistent in-app "Start/Zurück" affordance on every page, ≥48×48 px tap targets, and 200%-zoom-safe layout are mandatory, validated on the daughter's actual phone.

## Implications for Roadmap

Four phases in a strict dependency order, matching ARCHITECTURE.md's build order and FEATURES.md's P1 priorities. The first public deployment happens in Phase 1 — not after content — because installability (the Active "app feel" requirement) must be validated on the real device before investment in scale-up.

### Phase 1: Foundation Shell, PWA Identity & First Deploy
**Rationale:** Everything else renders inside this shell, and installability must be testable on day one. The first public URL also triggers the Impressum launch gate, so legal basics ship here.
**Delivers:** Project structure (Eleventy scaffold or plain folders); `tokens.css` + base `site.css`; home page with six topic cards; 404; `manifest.webmanifest` + complete icon set (192/512 PNG, maskable SVG, apple-touch-icon 180×180, favicon) + iOS meta tags; Impressum + Datenschutzerklärung (child version + parent note); deploy pipeline to a privacy-chosen host; repo-hygiene rules.
**Addresses (FEATURES):** PWA home-screen shell (P1), mobile-first base (P1), Impressum/Datenschutz (P1), zero-data foundation (P1).
**Avoids (PITFALLS):** 7 (install instructions + first-device OS check), 8 (manifest/icons as a tested deliverable), 10 (host privacy + repo hygiene decision), 11 (Impressum + zero-tracking rule established).

### Phase 2: Interactive Widget Layer + One Reference Topic (+ Voice Spec)
**Rationale:** Converts "how should a page look and behave?" into a copyable artifact — ARCHITECTURE's "highest-leverage de-risking step." The guide persona + style guide must precede copy (FEATURES: "Phase-1 content artifact"), so the voice spec lands at the head of this phase to gate all copy from here on.
**Delivers:** `js/quiz.js` (one generic, data-driven enhancer), tip-box component (native `<details>`), `install.js` iOS hint; the first topic page end-to-end at print quality (hero → facts → selfcheck → tips → "weiter geht's"); the style guide + guide-persona voice spec; walk the page past the child before mass production.
**Addresses (FEATURES):** Self-check component (P1), tip boxes (P1), guide persona + style guide (P1) — the non-lecturing-voice differentiator.
**Avoids (PITFALLS):** 5 (reflection prompts, no verdicts/scores), 2 (interactive copy must stay non-lecture).
**Implements (ARCHITECTURE):** Pattern 1 progressive enhancement, Pattern 3 data-in-HTML/generic-logic; anti-patterns 2 (no scoring engine) and 4 (one quiz.js — never six bespoke scripts).

### Phase 3: Content Build-Out — Remaining Five Topics
**Rationale:** Depends on Phase 2's stable template; pure content work with zero architecture risk, spreadable over weeks. All six topics are v1 requirements — "the pattern is the skeleton; topics are content instances."
**Delivers:** Topics 2–6 cloned from the reference template with full German copy: source-backed facts → self-check → tip box → "Was ist daran eigentlich gut?" balance section; readability pass (≤12-word sentences, "logo!" / Dein-Spiegel level); tone-checklist review gate per topic.
**Addresses (FEATURES):** Six-topic German content (P1), facts-first pattern (P1).
**Avoids (PITFALLS):** 1 (fear-mongering), 2 (lecture voice), 3 (unverified health claims), 4 (adult German), 6 (one-sided anti-screen message).

### Phase 4: Offline Decision, Polish & Real-Device QA
**Rationale:** The only phase with a second-order failure mode (cache staleness) and it benefits from a settled file inventory (Phase 3 output). Real-device validation is mandatory and cannot be simulated.
**Delivers:** Service-worker decision + implementation (or explicit skip); OG meta tags for WhatsApp link previews (shareability requirement); accessibility + touch-target + 200%-zoom pass; real-device install-path validation on the daughter's phone (both iOS and Android paths documented); update-path test (change → deploy → installed app shows change); final zero-third-party-request verification from a fresh device (network tab clean).
**Avoids (PITFALLS):** 9 (cache staleness), 7 (install validation on real device), 12 (mobile UX on real hardware).

### Phase Ordering Rationale
- **Foundation first** because every later phase renders inside the shell and deploy pipeline, and because installability needs early real-device validation (Pitfalls 7/8).
- **Exactly one topic before the other five** because it turns page design into a copyable artifact and gets the voice/quiz contract validated by the actual reader before mass production.
- **Content build-out third** because it depends on Phase 2's stable template and is the only phase with zero architecture risk — but its gates (tone checklist, facts sheets, readability) are the project's principal quality controls and must not be skipped for speed.
- **Offline/polish/QA last** because the SW decision interacts with a settled asset inventory, and cache staleness is the project's only second-order risk (Pitfall 9).
- **Post-launch features** (missions, certificate, family contract, share cards, myth-busters; v2+ scenario games / Für-Eltern / FAQ) map onto this structure with zero architecture change — content additions on the Phase-2/3 components, so they belong in v1.x backlog rather than new phases.

### Research Flags
Phases likely needing deeper research during phase planning:
- **Phase 2:** Quiz UX (button-triggered vs immediate feedback) deserves a quick prototype test with the actual child; reading-level and feedback-tone pass for interactive copy (content dimension, not architecture).
- **Phase 4:** **Service-worker inclusion is an open conflict between research files** — STACK.md recommends a ~25-line cache-first SW (Chrome's *automatic* install prompt still requires a non-empty `fetch()` handler; offline reading on her data plan), while PITFALLS.md recommends skipping it (unneeded for home-screen install since Chromium 108/112, flakiest iOS feature, primary cause of Pitfall 9 staleness). Recommendation for planning: re-check the daughter's device OS; **default to no SW in v1** (iPhone-primary assumption) and include a strictly network-first, cache-name-versioned SW only if Android Chrome is primary and the automatic prompt is wanted.
- **Phase 4:** Real-device iOS testing cannot be simulated — scheduling constraint, not a research question.
- **Decisions at Phase 1 plan time (not research):** host privacy/repo-visibility choice (GitHub Pages public repo vs Cloudflare/Netlify private-repo); which OS the daughter's phone actually runs (drives icon priorities, install instructions, SW decision).

Phases with standard, well-documented patterns (skip research-phase):
- **Phase 1:** Manifest/HTTPS/static-deploy setup is fully documented (MDN, host docs) — no research needed.
- **Phase 3:** Pure content authoring — enforcement is QA gates, not research.

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Stack | MEDIUM | Versions verified first-party this session (npm registry: Eleventy 3.1.6, Node ≥18; MDN manifest requirements); classification seam caps websearch-backed claims at MEDIUM |
| Features | MEDIUM | Every claim cross-verified across ≥2 independent sources (German + international ecosystem); fear-appeal research HIGH (peer-reviewed meta-analyses) |
| Architecture | HIGH | Core static-site pattern is a solved problem; PWA install specifics cross-checked across MDN, web.dev, Chrome docs, and iOS-focused guides |
| Pitfalls | MEDIUM-HIGH | Pediatric (AAP, Mayo), legal (LG München, GDPR Art. 8), and vendor claims cross-checked; free-tier host limits flagged as shifting |

**Overall confidence:** MEDIUM-HIGH

### Gaps to Address
- **Authoring approach (STACK vs ARCHITECTURE tension):** STACK.md recommends Eleventy from day one; ARCHITECTURE.md recommends plain HTML with copy-template discipline and "add Eleventy only when repetition hurts." **Recommendation: Eleventy from the start** — six topics with shared nav, a JS-literate parent maintainer, and years of content growth make the single dev dependency worth it; ARCHITECTURE's folder structure maps 1:1 onto Eleventy output (`themen/<slug>/` URLs preserved) and its `data-*` quiz contract is generator-agnostic. Resolve explicitly in the Phase 1 plan.
- **Service-worker inclusion:** open conflict between STACK (install prompt + offline) and PITFALLS (cache staleness, iOS flakiness) — device-dependent; default no-SW unless Android Chrome is primary (see Phase 4 flag).
- **Target device OS is unknown:** PITFALLS assumes iPhones dominate for German 10–12-year-olds, but the only fact that matters is the daughter's phone. Check at Phase 1 — it changes icon priorities, install instructions, and the SW decision.
- **Content fact discipline:** health-claim accuracy is a content gate, not a research question — the Phase 3 pipeline needs named trusted sources (AAP, Mayo, pediatric-sleep guidance) and a per-topic fact sheet.
- **Legal posture:** Impressum content (minimal parent data, never the child's name), pseudonym strategy, and repo-hygiene rules need an explicit decision before the first public deploy; the host privacy choice (public vs private repo) is decided in Phase 1.
- **Free-host limit drift:** Netlify credit-based billing (Sept 2025) and similar figures shift; re-verify host limits/privacy at Phase 1 planning rather than trusting 2026 figures blindly.

## Sources

### Primary (HIGH confidence)
- npm registry (registry.npmjs.org) — Eleventy 3.1.6 / Astro 7.3.5 / Tailwind 4.3.3 versions + Node `engines` floors
- MDN *Making PWAs installable* (2026-09-07) — required manifest members, HTTPS requirement, browser support
- developer.chrome.com *Revisiting Chrome's installability criteria* (2023-12) — menu-install without SW ≥108/112; automatic prompt still needs non-empty `fetch()` handler; empty handlers ignored since 112
- AAP (via Renova Hospitals) / Mayo Clinic / Seattle Children's — blue-light evidence, screen-time guidance, healthy relationship with media
- Witte & Allen (2000) + Ruiter et al. (2014) fear-appeal meta-analyses; JH Bloomberg *Risky Business*; EDC *Not Your Mother's Scare Tactics*
- LG München 3 O 17493/20 (multiple independent legal analyses) — Google Fonts IP transmission = DSGVO violation
- GDPR Art. 8 (gdpr-info.eu, European Commission) — German consent age 16; parental-consent duties; COPPA/FTC for US-hosted assets
- NN/G *Children's Websites: Usability Issues* — age bands, 9–12 scanning behavior, font-size floors
- iOS 17.4 EU PWA removal (Feb 2024) → reversal (Mar 2024) — 9to5Mac / TechCrunch / MobiLoud

### Secondary (MEDIUM confidence)
- klicksafe.de / Internet-ABC / Handysektor / fragFINN / SCHAU HIN! — German ecosystem patterns (Lernmodule, Surfschein, Mediennutzungsvertrag Pädi 2015, Bildschirmzeit guidance)
- Villa Schöpflin freii (SWR Aktuell 2025-09, Deutsches Ärzteblatt 2026-03) — anti-lecture design insight, 21-day offline challenge model
- Be Internet Awesome / Interland, Common Sense Media, eSafety Australia — international analogues (no-login stance, certificates, peer tone)
- web.dev *Adaptive icon support (maskable)*; naildrivin5.com, MagicBell — iOS PWA install/icon specifics
- pressless.io / freitiers.com / CloudCannon 2026 free-host comparisons — Cloudflare no bandwidth cap, GitHub Pages ~100 GB/mo, Netlify overage pauses + Sept 2025 credit billing
- IHK München / IT-Recht-Kanzlei / anwalt.org — Impressum duty (§5 DDG), purely-private exemption line, ≤2 clicks reachability

### Tertiary (LOW confidence)
- Community/vendor claims on iOS-26-era web-app behavior in the EU — flagged best-effort, device-dependent
- Single-source UX-for-kids guides (Gapsy, Eleken) — consistent with NN/G but not cross-verified

---
*Research completed: 2026-09-25*
*Ready for roadmap: yes*