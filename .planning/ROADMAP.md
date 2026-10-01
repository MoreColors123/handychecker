# Roadmap: HandyChecker

## Overview

HandyChecker is a small, German-language information site for a 10–12 year old girl about the dangers of smartphone overuse — installable to her home screen like an app, hosted on a free static host, with zero data collection and zero third-party requests. The roadmap follows a strict four-phase dependency chain that mirrors how this class of site is de-risked: (1) foundation shell + PWA identity + first public deploy, (2) interactive widget layer + one reference topic built to print quality (+ voice spec), (3) content build-out of the remaining four topics, (4) offline decision, polish & real-device QA. The first deploy happens in Phase 1 — not last — so the "app feel" requirement can be validated on the real phone before content scale-up. All work is MVP-scoped: v1 ships a coherent, installable, five-topic German site; v2 items (missions, certificate, family contract, share cards, myth-busters, social-media topic) are tracked in REQUIREMENTS.md and land on the Phase 2/3 components with zero architecture change.

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3, 4): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [x] **Phase 1: Foundation Shell, PWA Identity & First Deploy** - Installable PWA shell, design tokens, legal pages, zero-data foundation, first public URL (completed 2026-10-01)
- [ ] **Phase 2: Interactive Widgets + Reference Topic (+ Voice Spec)** - Reusable self-check + tip-box widgets, locked voice spec, one print-quality topic
- [ ] **Phase 3: Content Build-Out — Remaining Four Topics** - Complete German content for all five v1 topics (facts-first, sourced, balanced, hedged)
- [ ] **Phase 4: Offline Decision, Polish & Real-Device QA** - SW decision, real-device install/update validation, shareability, zero-request verification

## Phase Details

### Phase 1: Foundation Shell, PWA Identity & First Deploy

**Goal**: An installable, mobile-first German app shell is live on a real public HTTPS URL — with legal pages in place and the zero-data foundation baked in.
**Mode**: mvp
**Depends on**: Nothing (first phase)
**Requirements**: PWA-01, PWA-02, LEGAL-01, LEGAL-02, PRIV-01
**Success Criteria** (what must be TRUE):
  1. Someone opens the site on a smartphone at its real public HTTPS URL and sees a German, mobile-first home page that lists all five topic areas (Bildschirmzeit & Balance, Schlaf, Aufmerksamkeit & Fokus, Körper, Datenschutz & Daten) as tappable cards.
  2. From any page, within two taps, the reader can reach both an Impressum carrying only the parent's data (§5 DDG-conform) and a child-friendly Datenschutz page that says "hier wird nichts gespeichert – die Seite kann das nicht" plus a short parent note — both live before the first public URL is shared.
  3. A load of any page from a fresh browser profile shows zero requests to third-party domains in the network tab — fonts and assets are system or self-hosted (no Google Fonts, no embeds, no analytics).
  4. The web-app manifest validates and the full icon set (192/512 PNG, maskable SVG, apple-touch-icon 180×180, favicon) plus iOS meta tags are served on every page; a PWA-installability check passes on the manifest members.
  5. On a narrow phone viewport the site renders without horizontal scrolling and every interactive target is at least 48×48 px.

**Plans**: TBD
- [x] 01-01-PLAN.md
- [x] 01-02-PLAN.md
- [x] 01-03-PLAN.md
- [x] 01-04-PLAN.md

**UI hint**: yes

### Phase 2: Interactive Widgets + Reference Topic (+ Voice Spec)

**Goal**: The reusable self-check and tip-box widgets exist, one reference topic is finished to print quality, and the friendly-guide voice spec is locked before any further copy is written.
**Mode**: mvp
**Depends on**: Phase 1
**Requirements**: VOICE-01, SELF-01, TIPS-01
**Success Criteria** (what must be TRUE):
  1. On the reference topic, the reader can answer the self-check ("Wie ist das bei dir?") with descriptive options and receives reflection prompts — never a score, verdict, ranking, or shaming response; the quiz runs entirely client-side.
  2. The reference topic shows a "Was kann ich tun?" tip box with 1–3 concrete, doable actions (e.g. "Handy schläft in der Küche") — efficacy before facts, no lecture text.
  3. A reviewer can open the voice spec + style guide and verify that the reference topic's copy — and all copy written from this point on — follows the guide persona, graded language ("kann dazu führen", never "du bist süchtig"), and no-lecture rules.
  4. The reference topic page presents facts first in short sections (2–3 sentences per idea, at most one number per section), followed by self-check and tip box, with a clear "weiter geht's" path to the next topic.
  5. A 10–12-year-old reader can complete the reference topic end-to-end unaided on a phone, and her answers are never stored or transmitted (in-memory only).

**Plans**: 2/3 plans executed
**Wave 1**
- [x] 02-01-PLAN.md — Voice spec (VOICE-01, gating artifact) + reference topic data layer & pagination tracer (SELF-01/TIPS-01 structure)

**Wave 2** *(blocked on Wave 1 completion)*
- [x] 02-02-PLAN.md — Widget interactivity: pure-CSS :has() reflection reveal + app.js aria-live enhancer (SELF-01/TIPS-01 live)

**Wave 3** *(blocked on Wave 2 completion)*
- [ ] 02-03-PLAN.md — Happi identity site-wide: illustration include, header mark, heroes (D-11/D-12, backlog 999.1)

**UI hint**: yes

### Phase 3: Content Build-Out — Remaining Four Topics

**Goal**: All five v1 topics are live with complete, source-backed German content — each following the facts-first pattern proven in Phase 2, including a balance section and hedged claims.
**Mode**: mvp
**Depends on**: Phase 2
**Requirements**: CONT-01, CONT-02, CONT-03, CONT-04
**Success Criteria** (what must be TRUE):
  1. The site offers complete German content for all five topics — Bildschirmzeit & Balance, Schlaf, Aufmerksamkeit & Fokus, Körper (Haltung/Augen), Datenschutz & Daten — i.e. the Phase 2 reference topic plus the remaining four.
  2. Every topic page follows the facts-first pattern: short sections, 2–3 sentences per idea, at most one number per section, no walls of text.
  3. Every topic's facts cite named pediatric sources (AAP, Mayo Clinic, sleep research) and association-level claims are hedged ("kann dazu führen") — never "du bist süchtig".
  4. Every topic contains a "Was ist daran eigentlich gut?" balance section that counters one-sided anti-phone messaging.

**Plans**: TBD

### Phase 4: Offline Decision, Polish & Real-Device QA

**Goal**: The app is validated on the daughter's real device — installable, fresh after updates, zero data leaks — with shareable links and final mobile polish.
**Mode**: mvp
**Depends on**: Phase 3
**Requirements**: None uniquely (hardware-verification boundary closing PWA-01, PWA-02, PRIV-01 delivered in Phase 1)
**Success Criteria** (what must be TRUE):
  1. On the daughter's actual phone, the site can be added to the home screen via the documented path (in-app "Installieren aufs Handy" page matching her OS) and opens as an app with the proper icon — validated visually on the real device.
  2. After a content change is deployed, the installed app shows the change within a day — the update path works with no stale cache, and the service-worker decision is recorded (default: no SW in v1 unless her device is Android Chrome and the automatic install prompt is wanted).
  3. In standalone mode (no browser chrome), a persistent "Start/Zurück" affordance appears on every page, and the site remains readable and usable at 200% zoom with ≥48 px tap targets.
  4. Sharing a topic link in a messenger shows a proper German title and preview (OG meta tags), and the shared page loads correctly on the phone.
  5. From a fresh device with a clean profile, loading every page shows zero third-party network requests — the zero-data promise is literally true on the live site.

**Plans**: TBD

## Coverage

| Requirement | Phase |
|-------------|-------|
| PWA-01 | Phase 1 |
| PWA-02 | Phase 1 |
| LEGAL-01 | Phase 1 |
| LEGAL-02 | Phase 1 |
| PRIV-01 | Phase 1 |
| VOICE-01 | Phase 2 |
| SELF-01 | Phase 2 |
| TIPS-01 | Phase 2 |
| CONT-01 | Phase 3 |
| CONT-02 | Phase 3 |
| CONT-03 | Phase 3 |
| CONT-04 | Phase 3 |

**Mapped:** 12/12 v1 requirements ✓ — no orphans, no duplicates.

**Coverage note:** Phase 4 carries no unique v1 requirement by design. It is the hardware-verification boundary that closes PWA-01 (real-device install with correct icon), PWA-02 (standalone-mode navigation with ≥48 px targets at 200% zoom), and PRIV-01 (fresh-device zero-request check) — all implemented in Phase 1 — plus the research-mandated offline/SW decision and the shareability polish (OG meta tags) supporting the active "shareable with friends" project requirement.

## Progress

**Execution Order:**
Phases execute in numeric order: 1 → 2 → 3 → 4

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Foundation Shell, PWA Identity & First Deploy | 4/4 | Complete    | 2026-10-01 |
| 2. Interactive Widgets + Reference Topic (+ Voice Spec) | 2/3 | In Progress|  |
| 3. Content Build-Out — Remaining Four Topics | TBD | Not started | - |
| 4. Offline Decision, Polish & Real-Device QA | TBD | Not started | - |

## Backlog

### Phase 999.1: Follow-up — Phase 01 deferred UAT follow-up: Test 4 (BACKLOG)

**Goal:** Resolve the UAT checkpoint deferred during Phase 01 verification
**Source phase:** 01
**Deferred at:** 2026-10-01 during /gsd-verify-work 01 session completion
**Follow-ups:**
- [ ] Test 4: Visible Happi illustration inside the app pages (home/topic pages), not just the app icon — mascot gives the friendly guide a face; natural fit for Phase 2's voice spec + first topic page design (deferred 2026-10-01)

### Phase 999.2: Follow-up — Phase 01 deferred UAT follow-up: Test 5 (BACKLOG)

**Goal:** Resolve the UAT checkpoint deferred during Phase 01 verification
**Source phase:** 01
**Deferred at:** 2026-10-01 during /gsd-verify-work 01 session completion
**Follow-ups:**
- [ ] Test 5: LEGAL-02 launch gate: owner fills the Impressum placeholders with real parent data before sharing the URL (tracked in 01-USER-SETUP.md; prerequisite for sharing, not a Phase-1 code deliverable) (deferred 2026-10-01)
