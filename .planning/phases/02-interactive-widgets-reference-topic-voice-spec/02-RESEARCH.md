# Phase 2: Interactive Widgets + Reference Topic (+ Voice Spec) - Research

**Researched:** 2026-10-01
**Domain:** Reusable vanilla-JS self-check widget + tip box, data-driven Eleventy topic pages, Happi illustration pipeline, voice/style-spec artifact (German kid content on the Phase 1 Eleventy 3.1.6 base)
**Confidence:** HIGH (every load-bearing pattern executed in a real Eleventy 3.1.6 build this session — 39/39 assertions passed)

## Summary

Phase 2 adds the first full topic page (`/handychecker/themen/bildschirmzeit/`), the two reusable widgets it proves (self-check Version A + "Was kann ich tun?" tip box), the voice spec that gates all future copy, and the site-wide visible Happi. **No new packages are needed** — everything is semantic HTML, ~40 lines of vanilla JS, CSS using the existing tokens, and one new Eleventy pagination template. Every recommendation below was **verified by executing a real Eleventy 3.1.6 build this session** (temp scaffold at `%TEMP%\opencode\p2-build-test`, verification script with 39/39 PASS), including the exact Windows/PowerShell verification pattern Phase 1 established (`.cmd` shims, temp `.js` verify payloads).

The single most important architectural insight: **the topic layer becomes fully data-owned.** One `src/_data/topics.json` (a *bare JSON array* — the wrapped form silently breaks pagination, a real failure caught by this session's test) plus one `src/themen.njk` pagination template emit `/themen/<slug>/` for every topic. Phase 3's four remaining topics then cost *zero template work* — pure JSON authoring. The self-check is progressively enhanced beyond "works without JS": the tap→reflection swap runs on **pure CSS `:has()`** (Baseline/Widely available per MDN 2026-08), and the tiny `app.js` adds only the screen-reader announcement via an aria-live region — with **zero persistence of any kind** (answers live in the DOM; a reload forgets them; nothing is ever transmitted), satisfying SELF-01 and success criterion 5 by construction.

Two real bugs were caught and fixed by the session's build test — the planner must encode the fixes: (1) nested Nunjucks loops share `loop.index`, so radio inputs must capture the question index via `{% set qi = loop.index %}` or each option gets a *different* `name`, breaking single-choice exclusivity; (2) `eleventyComputed: title: "{{ topic.title }}"` double-escapes `&` (→ `&amp;amp;`) because computed strings are themselves template-rendered — use `{% set title = topic.title %}` before the head include instead.

**Primary recommendation:** Extend the data model to a bare-array `src/_data/topics.json`, generate all topic pages from one `src/themen.njk` pagination template (`permalink: "/themen/{{ topic.slug }}/"`), build the self-check as fieldset/radio/label/reflection markup with a pure-CSS `:has()` reveal + aria-live `role="status"` enhancer in one generic `src/js/app.js`, derive the Happi illustration as an inline-SVG Nunjucks include (`_includes/happi-illus.svg`, no background rect, `role="img"` + `<title>`) used as home hero + topic hero + 32px header mark on every page, and write the voice spec as an in-repo markdown doc (`docs/stimme-und-stil.md`) with the D-03/D-04/D-07 rules and calibration data baked in.

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions
- **D-01:** First topic = **Bildschirmzeit & Balance** (user choice; most direct phone-habit topic, strongest self-check fit).
- **D-02:** Self-check style **Version A — tap → instant reflection**: she taps one answer option and a friendly per-answer reflection appears immediately below; no button, no score, re-tappable (tapping another answer switches the reflection).
- **D-03:** Self-check answer options MUST be **calibrated to the daughter's real life**: her usage is **30–60 min/day, varies daily**; family rule = **45 minutes device limit**, with **music (Spotify) exempt**. Options anchor to what she knows (e.g. reference the 45-min deal) — descriptive, never judged. The music exemption is a natural balance-section point ("Musik ist was anderes").
- **D-04:** Never a score, verdict, ranking, or shaming — reflection copy is observational and encouraging ("viele Kinder kennen das"), per the anti-lecture guarantee.
- **D-05:** Tip boxes contain **1–2 small, concrete, doable-today solo actions** — e.g. "Leg das Handy nach der Schule eine Stunde in die Küche". No family-proposal actions, no observation-only prompts in v1 tips.
- **D-06:** **Happi narrates as a character** — first person "ich" talking TO her in "du": "Ich hab da mal was ausprobiert…". Maximum warmth, playful guide.
- **D-07:** Voice spec is a **written artifact** (voice spec + style guide page or doc in-repo) that gates all copy from this phase onward: graded language ("kann dazu führen", never "du bist süchtig"), no imperatives/lecture ("du solltest"), no guilt framing, facts first in short sections (2–3 sentences per idea), balance section per topic (CONT-04 pattern: "Was ist daran eigentlich gut?"), no fear/scare messaging, no right/wrong framing.
- **D-08:** Balance section included on the reference topic (e.g. "Was ist daran eigentlich gut?" — what phones are genuinely good for, incl. the music exemption).
- **D-09:** Page-end navigation = **next-topic cards** (the four remaining topic cards below the topic's end + "Zurück zur Startseite") — reuses the existing `.card` pattern; no new UI component.
- **D-10:** Topic page URL under the existing subpath pattern: `/handychecker/themen/bildschirmzeit/` (the Phase 1 home-page cards already link there — CR-01 fix deployed).
- **D-11:** A **visible Happi illustration appears on the reference topic page** — derived from the existing one-SVG-source pipeline (`src/icons-src/happi-source.svg` → larger art), warm & cozy palette, inside the established design tokens. Size/hero placement at planner discretion.
- **D-12:** Happi is also visible on the **start page** AND as a **small recurring Happi mark in the shared header of every page** — planner discretion on exact placement: home hero (larger) + compact header mark everywhere; derived from the same one-SVG-source pipeline; must stay zero-request (same-origin SVG) and not crowd the ≥48px tap-target layout.

### the agent's Discretion
- Exact reflection wording, number of self-check questions (1–3), tip copy, illustration placement/size — within the locked voice rules and calibration data.
- Self-check markup/accessibility pattern (progressive enhancement, works without JS where feasible, ≥48 px tap targets, light theme tokens).

### Deferred Ideas (OUT OF SCOPE)
- Offline missions, certificate, family contract, share cards, myth-busters — v2 backlog (REQUIREMENTS.md).
- Scenario decision games (social-media topic) — deferred with SOCL-01.
- Header "Start/Zurück" standalone-mode affordance — Phase 4 (ROADMAP Phase 4 SC 3). Phase 2's header carries the Happi mark only.
</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| VOICE-01 | Friendly-Guide-Persona + Style-Guide (Voice-Spec) werden definiert, BEVOR die Massen-Kopien geschrieben werden | Voice-spec artifact placement researched (in-repo markdown `docs/stimme-und-stil.md` — the MDN/Mailchimp/GitHub/GitLab convention) + full skeleton content provided below (persona rules, graded-language table, no-lecture rules, D-03 calibration data); must ship in an early plan/wave before topic copy is finalized |
| SELF-01 | Wiederverwendbarer Selbstcheck pro Thema – beschreibende Antwortoptionen, nie bewertet, nie beschämend, rein clientseitig | Complete fieldset/radio/label/reflection markup pattern executed in a real build (39/39 assertions); pure-CSS `:has()` no-JS reveal; aria-live `role="status"` enhancer; **zero persistence by construction** (DOM state only); data lives in `topics.json` → single source of truth for all future topics |
| TIPS-01 | „Was kann ich tun?"-Tipp-Box auf jedem Thema – 1–3 konkrete, machbare Aktionen, Efficacy vor Fakten | Tip-box section pattern verified (`.tips` list in the topic template, data-driven from `topics.json`); copy rules locked by D-05 (1–2 small solo actions) |
| CONT-02/03/04 (pattern obligations) | Facts-first short sections; hedged claims; balance section per topic | Page skeleton verified: facts loop (h2/h3/p sections, ≤1 number each), balance section ("Was ist daran eigentlich gut?" incl. music exemption), structure = intro → facts → self-check → tips → balance → next-topic cards (matches ROADMAP SC 4) |
</phase_requirements>

## Architectural Responsibility Map

| Capability | Primary Tier | Secondary Tier | Rationale |
|------------|-------------|----------------|-----------|
| Topic page rendering (all 5 `/themen/<slug>/` routes) | Build-time (Eleventy pagination template) | — | One `themen.njk` + `topics.json` emits all pages at build; output is static HTML — verified this session |
| Self-check interaction (tap → reflection) | Browser (pure CSS `:has()` reveal) | Browser JS (aria-live announcement only) | The visible swap works with zero JS (CSS checked-state); JS adds only the screen-reader announcement — progressive enhancement, verified pattern |
| Self-check content (questions, options, reflections) | Build-time (`topics.json` → rendered HTML) | — | Content is baked into the page at build (works without JS, single source of truth); NOT data-attributes/JS JSON — verified rendering |
| Tip box | Build-time template + static HTML | — | A styled `<ul>` from `topics.json`; no interactivity needed |
| Zero persistence guarantee (SC 5) | Browser, by absence | — | No storage API of any kind is called; state = radio `checked` in DOM; verified `app.js` contains no storage calls |
| Happi illustration (hero + header mark) | Build-time (inline-SVG include) | Browser CSS (sizing/color) | SVG markup is inlined into every page at build → zero extra requests, CSS-sizeable; verified `<svg` present in built HTML, no `<img>`/file request |
| Voice spec artifact | Repo file (markdown, outside `src/`) | — | Maintainer-facing doc; never served (outside Eleventy input dir); gates copy in review |
| Next-topic navigation (D-09) | Build-time template loop | — | Reuses `.card` class; "others" computed by slug comparison in the loop — verified |

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| `@11ty/eleventy` | **3.1.6** (installed, pinned) — **verified still current 2026-10-01**: `dist-tags.latest = 3.1.6`, published 2026-06-02, `engines: node >=18` [VERIFIED: npm registry this session] | Pagination template + data-driven routes + includes | The Phase 1 base, unchanged; pagination feature is built-in (no plugin) [VERIFIED: 11ty.dev/docs/pagination fetched 2026-10-01 — docs site shows stable v3.1.6, canary 4.0.0-alpha.10] |
| Semantic HTML5 (fieldset/legend/radio/label, `role="status"`) | browser-native | Self-check widget structure | Native radio groups give free single-choice + arrow-key navigation + label-activated tap targets; `role="status"` + `aria-live="polite"` is the MDN-documented pattern for announcing swapped text [CITED: developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Guides/Live_regions — page modified 2026-09-11] |
| Vanilla JS (ES2022, ~40 lines, one file) | browser-native | Screen-reader announcement of the chosen reflection | `textContent`-only DOM updates (no innerHTML — safe with umlauts and quotes); no framework; no-op on pages without widgets [VERIFIED: temp build — app.js passthrough + defer wiring asserted] |
| CSS custom properties + `:has()` | Baseline "Widely available" (MDN 2026-08-11) | No-JS reflection reveal, tap targets, illustration sizing | `:has()` is the first selector that lets pure CSS react to a checked input's parent — the zero-JS reflection mechanism; anchored to small containers per MDN performance guidance [CITED: developer.mozilla.org/en-US/docs/Web/CSS/:has] |
| `src/_data/topics.json` (bare JSON array) | — | Single content source for all topics (facts, selfcheck, tips, balance) | Eleventy global data → pagination over the array; one JSON edit adds/changes a topic; verified that the *wrapped* form (`{"topics":[...]}`) breaks pagination [VERIFIED: temp build — both shapes tested] |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| *(none)* | — | — | No new npm dependency of any kind is installed this phase. No `html-validate`, no icon library, no quiz library. |
| Inkscape CLI 1.4.4 (installed, Phase 1-verified) | — | NOT needed this phase | The illustration is an inline SVG include, not a raster export; keep the Phase 1 icon pipeline untouched |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Bare-array `topics.json` + one pagination template | Extend `site.json`'s topics with full content | site.json would mix site metadata with ~20 KB of German content by Phase 3 and create a second "what topics exist" source (drift risk with `site.topics` vs content). Bare array in its own file = cleaner separation; home-page card loop switches from `site.topics` to `topics` (one-line refactor, verified). |
| Bare-array `topics.json` | `_data/topics/` directory of per-topic files (Eleventy directory data) | Directory data paginates over an *object* (`resolve: values` needed) and loses explicit render order; single array file keeps order = render order (established Phase 1 pattern) and is easier for a parent to read top-to-bottom. |
| Pure-CSS `:has()` reflection + aria-live JS | JS-only reflection swap (data-attributes + event listeners) | JS-only duplicates content into attributes/JS objects (two sources of truth), and a no-JS reader gets nothing. CSS-first means the widget *fully functions* with zero JS; JS only upgrades a11y announcements. MDN: `:has()` Baseline widely available; unsupported browsers simply drop the reveal rule [CITED: MDN :has] — acceptable degradation, and her 2026 phone supports it. |
| Inline-SVG include for Happi | Inkscape PNG raster of a larger illustration | Raster = extra HTTP request, fixed pixel size, not CSS-colorable, needs the metadata-strip pipeline. Inline = zero requests (the mark/hero renders with the page), crisp at any size, colors already the locked token hexes, `<title>`-accessible [VERIFIED: built HTML contains `<svg` markup, zero `<img`/external refs; CITED: MDN SVG in HTML guide — inline SVG is in the DOM/AOM and `<title>` provides the accessible name]. |
| `docs/stimme-und-stil.md` (repo markdown) | Published `/stimme/` page linked in footer | The spec's audience is the maintainer/reviewer (SC 3: "a reviewer can open the voice spec"), not the 10-year-old reader — publishing it would add a non-kid page to a child-facing site. A repo file also sits outside `src/` so Eleventy never serves it. Convention matches MDN/GitHub/GitLab/Mailchimp (style guides live as in-repo markdown). |
| "Kommt bald" stub pages for the 4 content-less topics (recommended) | Pagination `before` callback filtering to content-ready topics only | Stub pages turn today's 404s (live-verified: `https://morecolors123.github.io/handychecker/themen/schlaf/` → 404) into friendly pages and make D-09's next-topic cards honest — Phase 3 then needs *no template changes*. The `before` filter (docs-verified) is the fallback if the planner prefers zero stubs. |

**Installation:**
```bash
# No new packages. Phase 1's pinned dependency is already installed:
npm.cmd ls @11ty/eleventy   # → @11ty/eleventy@3.1.6
```

**Version verification (executed this session):** `npm.cmd view @11ty/eleventy version` → `3.1.6`; `dist-tags.latest` → `3.1.6`; `engines` → `{ node: '>=18' }`; latest 4.0 release is alpha only (4.0.0-alpha.10, 2026-07-01). `package-legitimacy check` → **OK** (237,444 downloads/wk, github.com/11ty/eleventy, no postinstall, not deprecated).

## Package Legitimacy Audit

> **Required** whenever this phase installs external packages. Run the Package Legitimacy Gate protocol before completing this section.

| Package | Registry | Age | Downloads | Source Repo | Verdict | Disposition |
|---------|----------|-----|-----------|-------------|---------|-------------|
| `@11ty/eleventy` (already installed Phase 1; re-verified current) | npm | 14 yrs (3.1.6 published 2026-06-02) | 237,444/wk | github.com/11ty/eleventy | OK | Approved — no new install |

**Packages removed due to [SLOP] verdict:** none
**Packages flagged as suspicious [SUS]:** none
**New packages installed by this phase: none.** Every Phase 2 capability is browser-native (HTML/CSS/JS) or built-in Eleventy (pagination, includes, passthrough copy). No npm install step exists in this phase — and none should be added.

## Architecture Patterns

### System Architecture Diagram

```
┌────────────────────────────────────────────────────────────────────────────┐
│                 BUILD (maintainer machine — Eleventy 3.1.6)                 │
│                                                                            │
│  src/_data/topics.json  (BARE ARRAY — one object per topic:                │
│      slug, title, intro, facts[], selfcheck{questions[options[reflection]]}│
│      tips{items[]}, balance{})                                             │
│         │                                                                  │
│         ▼ pagination: data=topics, size=1, alias=topic                     │
│  src/themen.njk ──permalink "/themen/{{ topic.slug }}/"──▶ 5 topic pages   │
│         │              {% if topic.facts %} guards:                        │
│         │              content-less → "kommt bald" page                    │
│         ▼                                                                  │
│  _includes/happi-illus.svg ──{% include %}──▶ inlined <svg> in home hero,  │
│         (art derived from icons-src/happi-source.svg,                      │
│          background rect dropped)               topic hero + header mark   │
│         ▼                                                                  │
│  src/js/app.js ──passthrough──▶ /js/app.js (defer; aria-live announcer)    │
│                                                                            │
│  src/index.njk ──▶ home (cards loop over `topics`; Happi hero)             │
│  docs/stimme-und-stil.md ──▶ NEVER served (outside src/)                   │
└───────────────────────────────┬────────────────────────────────────────────┘
                                │ git push → GitHub Pages rebuild
                                ▼
┌────────────────────────────────────────────────────────────────────────────┐
│   https://morecolors123.github.io/handychecker/                            │
│   /themen/bildschirmzeit/  (today: 404 → this phase ships it)              │
│   /themen/schlaf|aufmerksamkeit|koerper|datenschutz/  ("kommt bald")       │
│   /js/app.js  /css/*  /manifest  /icons/*   (all same-origin)              │
└───────────────────────────────┬────────────────────────────────────────────┘
                                │ HTTPS GET (zero third-party, ever)
                                ▼
┌────────────────────────────────────────────────────────────────────────────┐
│   BROWSER ON HER PHONE                                                     │
│   reads facts (HTML) → taps a radio answer → CSS :has() reveals the        │
│   reflection instantly (no JS needed) → screen readers get the same text   │
│   announced via the empty role="status" aria-live region filled by app.js  │
│   → tips box → balance section → next-topic cards → "weiter geht's"        │
│   NOTHING stored: state = radio :checked in DOM; reload = forgotten;       │
│   no localStorage, no cookies, no transmission (SC 5 by construction)      │
└────────────────────────────────────────────────────────────────────────────┘
```

### Recommended Project Structure (additions/changes vs Phase 1)
```
handychecker/
├── eleventy.config.js          # + one line: addPassthroughCopy({ "src/js": "js" })
├── docs/
│   └── stimme-und-stil.md      # VOICE-01 artifact (repo markdown, never served)
├── src/
│   ├── _data/
│   │   ├── site.json           # SLIMMED: siteName/lang/description only
│   │   │                       #   (topics moved out — one source of truth)
│   │   └── topics.json         # NEW: bare array, full content per topic
│   ├── _includes/
│   │   ├── head.njk            # unchanged (no script tag here — see Pattern 5)
│   │   ├── header.njk          # NEW: skip link + Happi mark (aria-hidden span)
│   │   ├── happi-illus.svg     # NEW: illustration include (derived from source)
│   │   └── footer.njk          # unchanged
│   ├── index.njk               # card loop: site.topics → topics; Happi hero
│   ├── themen.njk              # NEW: pagination template → /themen/<slug>/
│   ├── js/
│   │   └── app.js              # NEW: ~40 lines, aria-live announcer only
│   ├── css/
│   │   ├── tokens.css          # unchanged (all Phase 2 colors already exist)
│   │   └── site.css            # + self-check/tips/balance/hero/header rules
│   └── icons-src/happi-source.svg  # UNTOUCHED — the one art source
```

### Pattern 1: Data-driven topic routes — one pagination template over a bare-array data file
**What:** `src/themen.njk` paginates over the global `topics` array (from `src/_data/topics.json`) and emits `/themen/<slug>/index.html` for every entry. The template itself emits NO own page (verified: build output contains no `/themen/index.html`).
**When to use:** All topic pages, Phase 2 and Phase 3 — Phase 3 adds topics by appending JSON objects only.
**Verified this session** (real build, Eleventy 3.1.6, this machine):

```jsonc
// src/_data/topics.json — MUST be a bare array.
// A wrapped form { "topics": [ ... ] } makes the global `topics` an OBJECT;
// pagination over an object paginates its KEYS → one page with broken permalink
// (caught by this session's build test: output was a single /themen/index.html).
[
  { "slug": "bildschirmzeit", "title": "Bildschirmzeit & Balance", "intro": "…", "facts": […], "selfcheck": {…}, "tips": {…}, "balance": {…} },
  { "slug": "schlaf", "title": "Schlaf" }   // content-less → "kommt bald" page
]
```

```njk
---
pagination:
  data: topics        # the global data array (11ty.dev/docs/pagination pattern)
  size: 1
  alias: topic        # items[0] becomes `topic` (docs-verified aliasing)
permalink: "/themen/{{ topic.slug }}/"   # template syntax allowed in permalink
suffixTitle: true
---
```
**Verified outputs:** `_site/themen/bildschirmzeit/index.html` … `_site/themen/datenschutz/index.html` (trailing-slash permalink → directory/index.html); `| url` filter still prefix-rewrites links inside these pages (`href="/handychecker/css/tokens.css"` asserted); `{{ ('/themen/' + t.slug + '/') | url }}` → `/handychecker/themen/schlaf/`.

### Pattern 2: Self-check widget — fieldset/radio + pure-CSS reflection + aria-live enhancer
**What:** Version A (D-02) as semantic markup. Each question = one `<fieldset>` with a visible `<legend>` (the question). Each option = radio + `<label for>` + a `<p class="selfcheck__reflection">` sibling, all inside a small `.selfcheck__option` wrapper. The reflection is hidden by CSS and revealed when the sibling radio is checked — **no JS required**. `app.js` only mirrors the chosen label+reflection text into one empty `role="status" aria-live="polite" aria-atomic="true"` paragraph so screen readers announce it.
**When to use:** Every topic's self-check, forever. The widget is 100% generic — it reads nothing topic-specific.
**Verified this session** (all assertions passed):

```njk
{%- if topic.selfcheck %}
<section class="selfcheck" aria-labelledby="selfcheck-h">
  <h2 id="selfcheck-h">{{ topic.selfcheck.heading }}</h2>
  {%- for q in topic.selfcheck.questions %}
  {%- set qi = loop.index %}   {# CRITICAL: capture the QUESTION index here —
     inside the options loop, `loop.index` refers to the OPTION (1..3), which
     gave every radio a different name and broke single-choice exclusivity.
     Caught and fixed by this session's build test. #}
  <fieldset class="selfcheck__group">
    <legend>{{ q.text }}</legend>
    {%- for opt in q.options %}
    <div class="selfcheck__option">
      <input type="radio" id="q{{ qi }}-{{ opt.id }}" name="q{{ qi }}" value="{{ opt.id }}">
      <label for="q{{ qi }}-{{ opt.id }}">{{ opt.text }}</label>
      <p class="selfcheck__reflection" data-reflection>{{ opt.reflection }}</p>
    </div>
    {%- endfor %}
  </fieldset>
  {%- endfor %}
  <p class="selfcheck__live" role="status" aria-live="polite" aria-atomic="true"></p>
</section>
{%- endif %}
```

```css
/* Reflection hidden until its option is checked — pure CSS, works without JS.
   Anchored to the small .selfcheck__option container with a descendant input —
   the MDN-performance-safe shape (no body/:root anchoring). */
.selfcheck__reflection { display: none; }
.selfcheck__option:has(input:checked) .selfcheck__reflection { display: block; }

/* Tap targets (PWA-02 carry-over): the label IS the tap surface */
.selfcheck__option label {
  display: inline-flex; align-items: center;
  min-height: var(--tap-min);              /* 48px token */
  padding: var(--space-sm) var(--space-md);
  border-radius: var(--radius-md); cursor: pointer;
}
.selfcheck__option label:hover { background: var(--color-peach); }
.selfcheck__option input[type="radio"] { width: 24px; height: 24px; accent-color: var(--color-ginger); }
```
**A11y notes (MDN-verified):** the empty live region ships in the *initial markup* — MDN: "The most reliable way to ensure that live regions are registered is to include them in the initial markup" [CITED: MDN Live regions, 2026-09-11]. `role="status"` has implicit live semantics but MDN recommends the redundant `aria-live="polite"` for compatibility. `aria-atomic="true"` makes the whole reflection text announce on each change. Native radios give keyboard arrow-key navigation for free; tapping the ≥48px label activates the radio.
**Degradation:** browsers without `:has()` (pre-2023) simply never show reflections and get no announcements — the facts and tips remain fully readable (acceptable; her device is 2026-modern).

### Pattern 3: `app.js` — the one generic enhancer (no persistence, no data duplication)
**What:** ~40 lines. Finds every `.selfcheck__group`, listens for `change`, copies the checked option's label + reflection text into the section's live region via `textContent` (never `innerHTML` — quote/umlaut-safe and XSS-safe by API choice). No topic-specific logic; loaded with `defer` from the topic template only.
**When to use:** One file serves Phase 2 and every future topic.
**Verified this session:**
```js
// HandyChecker – Selbstcheck-Verbesserer (SELF-01).
// Das Widget funktioniert OHNE dieses Skript (CSS :has() zeigt die Reflexion).
// Dieses Skript NUR: Screenreader-Ankündigung über die aria-live-Region.
// Keine Speicherung: Antworten leben im DOM (Radio checked), Reload = vergessen.
(function () {
  var groups = document.querySelectorAll(".selfcheck__group");
  if (!groups.length) return;
  groups.forEach(function (group) {
    var section = group.closest(".selfcheck");
    var live = section ? section.querySelector(".selfcheck__live") : null;
    if (!live) return;
    group.addEventListener("change", function (e) {
      var input = e.target;
      if (!input.matches('input[type="radio"]')) return;
      var option = input.closest(".selfcheck__option");
      if (!option) return;
      var label = option.querySelector("label");
      var reflection = option.querySelector(".selfcheck__reflection");
      var text = label ? label.textContent.trim() : "";
      if (reflection) text += " – " + reflection.textContent.trim();
      live.textContent = text; // announced; nothing stored, nothing sent
    });
  });
})();
```
**Load placement:** put `<script src="{{ '/js/app.js' | url }}" defer></script>` **directly in `themen.njk`** (after `</main>`, before the footer include) — NOT in the shared head include. Keeps home/legal/404 pages at zero JS (Phase 1's "pure HTML" property) with zero conditional logic in the head. Verified wiring: `src="/handychecker/js/app.js" defer>` present in topic pages; config needs the one-line passthrough `addPassthroughCopy({ "src/js": "js" })`.

### Pattern 4: Happi illustration from the one-SVG-source pipeline — inline-SVG include
**What:** `src/_includes/happi-illus.svg` = a hand-derived variant of `src/icons-src/happi-source.svg`: same art shapes and locked hexes, but the background `<rect>` is **dropped** (page cream shows through) and `<svg role="img"><title>Happi, die Handy-Katze</title>` is added. It is included as markup (`{% include "happi-illus.svg" %}`) — never served as a file, never an `<img>` — so every use costs **zero HTTP requests**, scales crisp, and is CSS-sizeable per context.
**When to use:** home hero (larger, D-12), topic-page hero (D-11), header mark on every page (D-12). The icons pipeline (maskable/favicon/PNGs) stays untouched.
**Verified this session:** built topic page contains exactly two inline `<svg` occurrences (header mark + hero) wrapped in `aria-hidden="true"` spans (decorative — the visible copy carries the meaning); no `<img` and no `happi-illus.svg` file request anywhere; `role="img"` + `<title>` present [CITED: MDN SVG in HTML — inline SVG is in the DOM/AOM, `<title>` = accessible name].

```njk
{# src/_includes/header.njk — extracted so EVERY page (incl. impressum/404) gets the mark #}
  <header class="site-header">
    <a class="skip" href="#inhalt">Zum Inhalt</a>
    <span class="happi-mark" aria-hidden="true">{% include "happi-illus.svg" %}</span>
  </header>
```
```css
.happi-hero svg { width: 160px; height: 160px; }   /* hero: planner-discretion size */
.happi-mark svg { width: 32px; height: 32px; }     /* compact recurring mark */
```
**Constraints:** the mark is `aria-hidden` decoration and NOT a control — it needs no 48px target of its own and must not squeeze the header layout (flex row, mark fixed-size, skip link stays hidden-until-focus). Keep art inside the viewBox; only shapes from the locked palette (`#E8863A`/`#FFD9B8`/`#4A3728`). Nunjucks include of an SVG with no template syntax passes it through verbatim (verified) — keep the file free of `{{`/`{%`.

### Pattern 5: Topic content model (`topics.json` schema) — the parent's single edit point
**What:** One JSON object per topic. Schema proven by the verified build:
```jsonc
{
  "slug": "bildschirmzeit",              // ← route: /themen/<slug>/ (existing cards link here)
  "title": "Bildschirmzeit & Balance",   // h1 + <title> (auto-escaped: & → &amp;)
  "intro": "Ich bin Happi! …",           // Happi-ich narration (D-06)
  "facts": [                             // CONT-02: 2–3 sentences per section, ≤1 number
    { "heading": "…", "text": "…" }
  ],
  "selfcheck": {                         // SELF-01 (Version A, D-02/D-03/D-04)
    "heading": "Wie ist das bei dir?",
    "questions": [
      { "text": "…",
        "options": [
          { "id": "a", "text": "…", "reflection": "…" }   // descriptive; observational
        ] }                                               //   reflection, never judged
    ]
  },
  "tips": {                              // TIPS-01 (D-05: 1–2 small solo actions)
    "heading": "Was kann ich tun?",
    "items": [ { "text": "Leg das Handy nach der Schule …" } ]
  },
  "balance": {                           // CONT-04 (D-08) incl. music exemption (D-03)
    "heading": "Was ist daran eigentlich gut?", "text": "…"
  }
}
```
**Why data-in-build instead of data-attributes or client-side JSON:** content appears ONCE (in the rendered HTML), works with zero JS, and there is no HTML↔JS duplication to keep in sync. The parent edits one file; `npm run build` fails loudly on JSON syntax errors (immediate feedback). This extends the established Phase 1 pattern ("topics owned by data") to full content.

### Pattern 6: Voice spec artifact — `docs/stimme-und-stil.md`
**What:** An in-repo markdown doc (outside `src/` → Eleventy never serves it; GitHub renders it). Placement convention: MDN, GitHub, GitLab, and Mailchimp all keep content style guides as in-repo markdown [VERIFIED: repo layouts observed via websearch 2026-10-01 — mailchimp/content-style-guide, mdn/content writing_style_guide, github/docs style guide, GitLab docguide].
**Skeleton content (planner turns into the task's acceptance criteria; rules verbatim from D-06/D-07 + PITFALLS 1/2/5):**
1. **Persona (D-06):** Happi spricht in der Ich-Form als Figur und duzt die Leserin ("Ich hab da mal was ausprobiert…"); warm, neugierig, humorvoll, konkrete Alltagsbilder (Küche, Schulranzen) statt Statistiken.
2. **Graded language (D-07):** verboten: "du bist süchtig", "Handy macht krank", "zerstört"; stattdessen: "kann dazu führen", "das ist ein Zeichen, dass…", "viele Kinder kennen das". Hedging bei Korrelationsaussagen (CONT-03).
3. **No-lecture rules:** keine Imperative ("du sollst/du musst"), keine Schuld-Frames, kein richtig/falsch, keine Diagnose-Selbsttests ("Bist du süchtig?" ist ein Anti-Feature), keine Angst-Botschaften; Vorschläge als Einladungen ("Probiere aus…").
4. **Structure rules:** Fakten zuerst, 2–3 Sätze pro Idee, maximal eine Zahl pro Abschnitt; jeder Abschnitt endet handlungsorientiert; Balance-Abschnitt pro Thema (CONT-04).
5. **Reflection rules (SELF-01):** Antworten beschreibend, nie bewertet; Reflexionen beobachtend+ermutigend ("viele Kinder kennen das"); nie Punktestand, Urteil, Rang.
6. **Kalibrierung (D-03, family facts — the locked calibration):** Nutzung 30–60 min/Tag, täglich unterschiedlich; Familien-Regel 45 Minuten; Musik (Spotify) ausgenommen — "Musik ist was anderes". Options-/Tip-Copy muss auf diese Realität zeigen, nicht auf generische Medienverbands-Bänder. (Optionaler externer Anker: klicksafe nennt 45–60 min/Tag für 9–12-Jährige — die Familienzahlen regeln aber.)
7. **Per-copy checklist:** [ ] Happi-Ich? [ ] du-Form, keine Imperative? [ ] jede Aussage gehedgt/verifiziert? [ ] ≤1 Zahl pro Abschnitt? [ ] Balance genannt? [ ] keine Angst-/Schuld-Wörter? [ ] Reflexionen ohne Urteil? [ ] Musik-Ausnahme passend erwähnt?
**Gating:** an early plan/wave writes this file; the reference-topic copy is reviewed against it in the same phase (SC 3), and Phase 3 reads it before any copy.

### Anti-Patterns to Avoid
- **Wrapping the topics array in an object** (`{"topics": [...]}` in topics.json) — pagination then paginates object *keys* and the build silently emits one broken `/themen/` page (verified failure mode this session). Bare array only.
- **`eleventyComputed: title: "{{ topic.title }}"`** for page titles — computed *strings* are template-rendered, so `&` in "Bildschirmzeit & Balance" escapes twice (`&amp;amp;`, verified). Use `{% set title = topic.title %}` before `{% include "head.njk" %}`.
- **`loop.index` for radio names inside nested loops** — refers to the *inner* loop; produces `name="q1|q2|q3"` on the three options of one question, breaking radio exclusivity (verified). Capture `{% set qi = loop.index %}` in the question loop.
- **Data-attributes or JS-side JSON for question content** — duplicates content, breaks the no-JS story, drifts from the rendered DOM.
- **Storing answers anywhere** — no localStorage/sessionStorage/cookies/API calls in `app.js` (PRIV-01 + SC 5). Radio state in the DOM *is* the whole state.
- **`innerHTML` for reflection text** — use `textContent` (umlauts/quotes-safe, no markup parsing of content).
- **Making the header Happi mark a link/control** — a decorative identity mark must not shrink the ≥48px guarantee or become an accidental tiny target.
- **Hardcoded absolute `/...` links** — unchanged Phase 1 rule: every internal href/src through `| url` (verified prefixing inside paginated permalink pages too).
- **Separate per-topic .njk templates or per-topic script files** — one template + one generic JS; per-topic copies multiply maintenance for zero benefit.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Single-choice logic | Custom click-tracking JS managing "selected" classes | Native `<input type="radio">` group + `<label for>` | Exclusivity, keyboard nav, form semantics and tap-activation are free and bulletproof (verified markup) |
| Show/hide on selection | JS state machine toggling classes | CSS `:has(input:checked)` descendant rule | Zero JS dependency, instant, no state to desync; Baseline-supported [CITED: MDN :has] |
| Screen-reader announcement | Re-inventing ARIA announcement logic | Empty `role="status" aria-live="polite" aria-atomic="true"` region + `textContent` fill | MDN-documented pattern; region-in-initial-markup is the reliable-registration trick [CITED: MDN Live regions] |
| Routing per topic | Hand-written per-topic pages/dirs | Eleventy pagination + `permalink` with alias | Built-in; one template = N pages (verified) [CITED: 11ty.dev/docs/pagination] |
| Accessible illustration | `<img>` + alt hacks, sprite sheets, SVG-injection scripts | Inline SVG include with `role="img"` + `<title>` | Zero requests, in-DOM accessibility, CSS-colorable [CITED: MDN SVG in HTML] |
| Reusing the topic cards | New "next-topic" component | Existing `.card` class in a loop | D-09 explicitly reuses the Phase 1 component; zero new UI |

**Key insight:** every hand-rolled alternative above either duplicates content (drift risk in a parent-maintained repo), reintroduces JS where CSS suffices (weaker progressive enhancement), or breaks the zero-request/zero-storage guarantees. The verified patterns are all *fewer* moving parts than what they replace.

## Common Pitfalls

### Pitfall 1: Radio exclusivity breaks via nested-loop `loop.index` (FOUND BY THIS SESSION'S BUILD TEST)
**What goes wrong:** `id="q{{ loop.index }}-{{ opt.id }}"` inside the options loop yields `q1-a, q2-b, q3-c` and `name="q1|q2|q3"` — three separate one-option groups. Tapping an answer never deselects the previous one; the widget reads as multi-select, silently.
**Why it happens:** Nunjucks `loop.index` always refers to the innermost active loop.
**How to avoid:** capture the question index before the inner loop: `{% set qi = loop.index %}` then `name="q{{ qi }}"`/`id="q{{ qi }}-{{ opt.id }}"`.
**Warning signs:** built HTML contains `name="q2"`; tapping a second option doesn't move the dot. Verification: assert all three built inputs share `name="q1"` (the session's verify script does exactly this).

### Pitfall 2: `eleventyComputed` double-escapes titles (FOUND BY THIS SESSION'S BUILD TEST)
**What goes wrong:** `<title>Bildschirmzeit &amp;amp; Balance …</title>` renders in the tab.
**Why it happens:** computed-data *strings* are template-rendered first (escaping `&` → `&amp;` inside the computed value), then the page template escapes the value again when interpolating `{{ title }}`.
**How to avoid:** set the title in template scope before the head include: `{% set title = topic.title %}` (top-level `{% set %}` before an include is visible inside it — verified). Never weaken escaping with `| safe`.
**Warning signs:** double `amp;` in any built `<title>`/heading; assertion scripts must decode entities before matching (Phase 1 lesson, extended).

### Pitfall 3: Wrapped data file silently breaks pagination (FOUND BY THIS SESSION'S BUILD TEST)
**What goes wrong:** `topics.json` containing `{"topics": [...]}` makes the global `topics` an object; `pagination: { data: topics }` paginates its keys → one page whose alias is the string `"topics"`, `topic.slug` is undefined, output collapses to a single `/themen/index.html`. No build error is shown.
**Why it happens:** Eleventy paginates objects via `Object.keys` unless `resolve: values` is set (docs behavior); a bare array is the intended shape.
**How to avoid:** topics.json is a bare JSON array, first byte `[`. Add an early build assertion: `_site/themen/bildschirmzeit/index.html` exists AND `_site/themen/index.html` does not.
**Warning signs:** "Wrote 2 files" instead of 6; topic links 404 after deploy.

### Pitfall 4: Entity decoding in verification scripts (Phase 1 lesson, now richer)
**What goes wrong:** verification greps for raw `&`, `"`, or typographic characters and fails against correct HTML.
**Why it happens:** Eleventy 3.x keeps Nunjucks auto-escape ON. Verified escape matrix this session: `&` → `&amp;`; ASCII `"` → `&quot;`; typographic German quotes `„…“` and all umlauts pass through **unescaped** (different codepoints — not in the escape set).
**How to avoid:** decode entities (`&amp;`, `&quot;`/`&#34;`, `&#39;`, `&lt;`, `&gt;`, `&nbsp;`) before string matching; verify umlauts byte-level via Node `fs.readFileSync(…, 'utf8')`, never the PowerShell console (mojibake is display-only). Prefer typographic „…“ in German copy — they pass through raw and are typographically correct.
**Warning signs:** assertions failing only on strings containing `&` or ASCII quotes.

### Pitfall 5: PowerShell quote mangling in verify payloads (D-12, re-confirmed this session)
**What goes wrong:** inline `node -e "…"` payloads with embedded quotes arrive at Node stripped/corrupted.
**How to avoid:** write the exact verify payload to a temp `.js` file and run `node verify.js` (this session ran 39 assertions that way); use `npm.cmd`/`npx.cmd` shims. Multi-line git commit messages via `git commit -F <file>`.
**Warning signs:** `require(fs)`-style crashes, `Unexpected identifier` from -e payloads.

### Pitfall 6: `:has()` degradation is invisible, not broken
**What goes wrong:** on a pre-2023 browser, reflections never appear and no announcement fires — no error, just a missing feature.
**Why it happens:** MDN: if `:has()` is unsupported, the whole rule block is dropped [CITED: MDN :has].
**How to avoid:** accept it (documented degradation; facts/tips unaffected) and do NOT gate anything critical on the reveal. The JS announcement path also degrades silently — both paths are enhancements over the always-readable content.
**Warning signs:** only in old-browser QA; her 2026 device supports `:has()` (Baseline widely available).

### Pitfall 7: Header Happi mark crowding tap targets / layout
**What goes wrong:** a large or flex-growing mark squeezes the skip-link row, or the mark becomes an accidental tap target smaller than 48px.
**How to avoid:** the mark is a fixed-size `aria-hidden` decorative `<span>` (not a link/control — no target-size obligation), `flex` with `flex: 0 0 auto`; page-end navigation stays with the existing cards (D-09); the standalone "Start/Zurück" affordance is Phase 4 scope.
**Warning signs:** header wraps at 320px; mark inside an `<a>` without ≥48px hit area.

### Pitfall 8: Editing the shared head/footer for widget-only needs
**What goes wrong:** script tags or widget CSS hooks added to `head.njk` leak onto home/legal/404 pages (breaking the "pure HTML" property where there are no widgets).
**How to avoid:** the `app.js` script tag lives in `themen.njk` (the only widget-bearing template); all widget styles are plain classes in `site.css` that no-op without markup.
**Warning signs:** `app.js` requested on the home page.

## Code Examples

Verified patterns from official sources *and* from this session's executed build (all snippets above in Patterns 1–4 are the executed code; the temp scaffold `%TEMP%\opencode\p2-build-test\` contains the full working copy: `src/_data/topics.json`, `src/themen.njk`, `src/index.njk`, `src/_includes/{head,header,footer,happi-illus.svg}`, `src/js/app.js`, `src/css/site.css`, `verify.js` — 39/39 assertions PASS via `node verify.js` after `npx.cmd eleventy`).

### Content model excerpt — the calibrated reference topic (D-03 anchored, Happi-voice D-06)
```jsonc
// questions/options: anchor to the family's 45-min deal; descriptive; never judged
"questions": [{
  "text": "Wenn dein Handy-Deal (45 Minuten) für heute durch ist – wie fühlt sich das an?",
  "options": [
    { "id": "a", "text": "Meistens reicht es mir so",
      "reflection": "Klingt gut! Viele Kinder finden, dass 45 Minuten genau die richtige Länge sind – oft ist danach nämlich noch was anderes spannend." },
    { "id": "b", "text": "Oft wär ich gern länger",
      "reflection": "Das kennen viele Kinder – und ich, Happi, kenn das auch vom Futter-Napf! … Dein Deal darf mitwachsen." },
    { "id": "c", "text": "Kommt drauf an, was ich mache",
      "reflection": "Ganz ehrlich: So ist es bei den meisten. … Erwachsene sagen oft \"Schluss für heute!\" – aber du kennst deine Gewohnheiten schon gut!" }
  ]
}]
// tips (D-05): 2 small, doable-today, solo
// balance (D-08): "Musik ist was anderes – die zählt nicht zur Bildschirmzeit dazu…"
```

### Next-topic cards + guard branches (D-09, "weiter geht's")
```njk
{%- if not topic.facts %}
<p class="topic-soon">Das Thema kommt bald – Happi arbeitet schon dran! 🧡</p>
<p><a class="card" href="{{ '/' | url }}">← zurück zur Startseite</a></p>
{%- else %}
<h2>Weiter geht's</h2>
<ul class="topic-cards">
  {%- for t in topics %}{% if t.slug != topic.slug %}
  <li><a class="card" href="{{ ('/themen/' + t.slug + '/') | url }}">{{ t.title }}</a></li>
  {% endif %}{%- endfor %}
  <li><a class="card" href="{{ '/' | url }}">Zurück zur Startseite</a></li>
</ul>
{%- endif %}
```
Verified: current topic excluded, all four others + Start rendered, `| url` prefixes every href.

### Config addition (one line)
```javascript
eleventyConfig.addPassthroughCopy({ "src/js": "js" });   // alongside the existing three copies
```

### Session verification evidence (replicable)
```powershell
# temp scaffold: %TEMP%\opencode\p2-build-test\
npx.cmd eleventy          # → Wrote 6 files: home + 5 topic pages, no /themen/index.html
node verify.js            # → ALL CHECKS PASSED (39 assertions:
                          #    routes, fieldset/radio/labels/reflections/aria-live,
                          #    escape matrix, tips/balance/facts, next-cards, guards,
                          #    inline-svg count, url-filter prefixing, app.js wiring,
                          #    zero-external-hosts gate)
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| JS-driven quiz reveal (data-attributes + listeners) | Pure-CSS `:has()` state reveal + JS only for AT announcements | `:has()` Baseline widely available (MDN 2026-08) | The widget functions with zero JS; JS shrinks to ~40 a11y lines |
| `role="status"` alone | `role="status"` **plus redundant** `aria-live="polite"` | MDN guidance (page 2026-09-11) | Maximizes cross-SR compatibility |
| eleventyComputed string for dynamic titles | Template-scope `{% set %}` before the head include | Observed 3.1.6 behavior this session | Avoids the double-escape trap on `&`-containing German titles |
| Eleventy 3.1.6 | Still 3.1.6 (4.0 only alpha.10 canary) | npm dist-tags verified 2026-10-01 | Stay pinned; no upgrade pressure |
| Wrapped data objects for pagination | Bare-array data files | Verified failure mode this session | Bare array is the reliable shape for `data: topics` |

**Deprecated/outdated:**
- Per-topic hand-written templates/scripts: superseded by the pagination + generic-enhancer pattern (Phase 3 depends on it).
- JS-only "instant feedback" widgets: for THIS project, CSS-first is strictly stronger (no-JS readers get the full interaction).
- Shipping topic pages only for finished content via filtered pagination: the "kommt bald" guard makes D-09's cards honest today and Phase 3 template-free; the pagination `before`-filter remains the fallback (docs-verified feature).

## Assumptions Log

| # | Claim | Section | Risk if Wrong |
|---|-------|---------|---------------|
| A1 | The daughter's phone (2026) supports CSS `:has()` (Baseline widely available) so the no-JS reveal works on-device | Patterns 2/6 | Low — degradation is graceful (reflections hidden); JS announcement also degrades silently; facts/tips always readable |
| A2 | `docs/stimme-und-stil.md` satisfies SC 3 ("a reviewer can open the voice spec") as an in-repo artifact rather than a published page | Pattern 6 | Low — reviewer = owner/parent; repo file is versioned and diffable; if a published page is wanted later it is one more template |
| A3 | "Kommt bald" stub pages for the 4 content-less topics are desirable (vs filtered pagination leaving 404s) | Alternatives / Pattern 1 | Low-Medium — scope judgment; both patterns verified; planner/user confirm; stubs make D-09 cards honest and close WINDOWS.md #1 fully in Phase 3 |
| A4 | Header mark sizing (32px) and hero sizing (160px) are acceptable starting values | Pattern 4 | Low — planner-discretion per D-11/D-12; one CSS line each |
| A5 | Moving `topics` out of `site.json` into `topics.json` (home card loop retarget) is the right refactor timing | Alternatives / Pattern 5 | Low — one-line template change, verified; prevents dual-source drift before Phase 3 multiplies content |
| A6 | Illustration derivative (bg-rect dropped, same shapes/hexes) reads as "derived from the one-SVG-source pipeline" per D-11 | Pattern 4 | Low — alternative is editing happi-source.svg itself (would require regenerating all Phase 1 icons); derivative keeps the icon pipeline untouched |
| A7 | klicksafe's 45–60 min/day (9–12y) band may be cited as external context in the voice spec, but the family's 45-min rule governs copy | Pattern 6 | Low — calibration is locked by D-03 regardless |

## Open Questions

1. **Self-check question count for the reference topic**
   - What we know: CONTEXT discretion allows 1–3 questions; the verified build renders 1 question with 3 options.
   - What's unclear: whether one calibrated question (the 45-min deal) suffices or a second (e.g. music exemption framing) adds value.
   - Recommendation: start with ONE strong calibrated question (session-tested shape); add a second only if the daughter's UAT suggests she wants more. Keep the schema multi-question-ready (already is).
2. **Voice-spec publication surface**
   - What we know: in-repo markdown recommended (A2).
   - What's unclear: whether the owner wants the spec visible as a site page someday.
   - Recommendation: repo doc now; revisit only if a parent-facing "Warum diese Seite so klingt" page is ever requested (v2 "Für Eltern" idea).
3. **"Kommt bald" copy tone** (A3)
   - What we know: guard pattern verified; four stub pages will exist immediately after this phase.
   - What's unclear: exact German wording the owner prefers.
   - Recommendation: keep the Happi-voice sentence from the verified template ("Das Thema kommt bald – Happi arbeitet schon dran! 🧡"); planner confirms or adjusts (it must pass the voice-spec rules it ships alongside).

## Environment Availability

> Audited this session (2026-10-01, Windows 11, PowerShell 5.1). No new dependencies are introduced by this phase.

| Dependency | Required By | Available | Version | Fallback |
|------------|------------|-----------|---------|----------|
| Node.js | Eleventy build (npm scripts) | ✓ | 24.19.0 (≥18 floor, Phase 1-verified) | — |
| npm | build/dev (`npm.cmd`/`npx.cmd` shims) | ✓ | 11.17.0 | `.ps1` shims blocked by execution policy — use `.cmd` (re-verified this session) |
| git | version control (`commit -F` for multi-line messages) | ✓ | 2.55.0.windows.3 | — |
| `@11ty/eleventy` | build | ✓ | 3.1.6 (pinned; still npm latest) | — |
| Inkscape CLI | NOT needed this phase (no rasters) | ✓ (1.4.4, Phase 1-verified) | — | — |
| Browser DevTools | a11y/`aria-live`/tap-target spot checks | ✓ | — | — |
| Real phone | end-to-end UAT (SC 5: "unaided on a phone") | owner-side | — | Desktop DevTools mobile emulation as proxy; real-device check remains the honest gate |

**Missing dependencies with no fallback:** none.
**Missing dependencies with fallback:** real-device UAT (owner/daughter runs the end-to-end read; DevTools emulation covers structure in the meantime).

## Security Domain

> Included — `security_enforcement: true`, ASVS level 1. This phase adds the site's FIRST interactive element; the surface remains architecturally minimal (static files, no backend, no input transmission).

### Applicable ASVS Categories

| ASVS Category | Applies | Standard Control |
|---------------|---------|-----------------|
| V2 Authentication | no — no accounts (GDPR Art. 8; anti-feature per REQUIREMENTS.md) | N/A |
| V3 Session Management | no — no cookies/sessions (PRIV-01) | N/A |
| V4 Access Control | no — public static content | N/A |
| V5 Input Validation | **partial — new**: the self-check collects *selections*; they are never stored/transmitted and never interpolated as markup | `textContent`-only updates in `app.js` (no `innerHTML`); radio `value`s are fixed build-time constants, not user-visible storage |
| V6 Cryptography | no — host TLS (GitHub Pages HTTPS) | Host-provided |
| V8 Data Protection | yes — answers never leave the device (SC 5, PRIV-01) | Zero storage APIs in `app.js` (verified content); DOM-only state |

### Known Threat Patterns for Phase 2 widgets

| Pattern | STRIDE | Standard Mitigation |
|---------|--------|---------------------|
| Content-injection via widget data (XSS if content pipeline ever grew user input) | Tampering | Content is human-authored build-time JSON (no user input exists); `textContent` for any JS-written text; auto-escape stays ON in templates (verified escape matrix) |
| Silent data exfiltration from the self-check (network call) | Information disclosure | Architectural absence: `app.js` performs no `fetch`/storage (verified); zero-external-hosts gate re-proven over all built files incl. `js/app.js` |
| Stale/dead next-topic links (D-09 cards to removed topics) | Availability (trust) | Cards generated from the same `topics` array as the routes — can't desync; stub pages keep every card a real destination |
| Child PII leakage through reflections (family details in public repo) | Information disclosure | Calibration uses the 45-min deal / music exemption — behavioral facts, not identities; repo hygiene rule from Phase 1 unchanged |
| Third-party requests sneaking in via the new JS file | Information disclosure | `app.js` is dependency-free vanilla JS; the built-output zero-host regex gate covers `out/js/app.js` (verified PASS this session) |

## Sources

### Primary (HIGH confidence)
- **Executed Eleventy 3.1.6 build + 39-assertion verify script** (this session, `%TEMP%\opencode\p2-build-test\`): pagination routes over bare-array data, `| url` prefixing inside permalink pages, `{% set %}` title pattern, radio `qi` fix, CSS `:has()` rule presence, aria-live markup, autoescape matrix (`&amp;`/`&quot;`/raw „…“/umlauts), tips/balance/facts rendering, next-topic cards, guards, inline-SVG include ×2, app.js passthrough + defer, zero-external-hosts gate
- **npm registry** (executed this session): `@11ty/eleventy` `3.1.6` = `dist-tags.latest`, published 2026-06-02, `engines node >=18`, 4.0.0 alpha-only; `package-legitimacy check` → OK
- **11ty.dev — Pagination docs** (fetched 2026-10-01, stable v3.1.6 shown): `data`/`size`/`alias`, permalink template syntax with alias, paginating global data files, object-paginates-keys behavior, `resolve: values`, `before` callback, `generatePageOnEmptyData`
- **MDN — ARIA Live regions** (modified 2026-09-11, fetched): region-in-initial-markup registration, polite as default, `role="status"` + redundant `aria-live="polite"`, `aria-atomic` semantics
- **MDN — `:has()`** (modified 2026-08-11, fetched): Baseline widely available; unsupported browsers drop the whole rule; performance guidance (anchor small, constrain inner selectors)
- **MDN — SVG in HTML** (fetched): inline SVG in DOM/AOM, `role="img"`, `<title>` accessible name, `<desc>` for longer text

### Secondary (MEDIUM confidence)
- **WebSearch (2026-10-01), inline-SVG-vs-img**: multiple 2025–26 comparisons (OpenSVG comparison matrix, svgmaker 2025, SVGInject/SO threads) converge: `<img>`-SVG = no page-CSS styling, no currentColor inheritance; inline = full CSS control, no asset caching — consistent with the MDN primary source
- **WebSearch (2026-10-01), style-guide placement**: MDN content repo, GitHub Docs, GitLab docguide, Mailchimp content-style-guide — style/voice guides live as in-repo markdown
- Project research: `.planning/research/FEATURES.md` (self-check patterns, tip-box efficacy, anti-lecture), `.planning/research/PITFALLS.md` (quiz-shaming pitfall 5, lecture voice pitfall 2 — wording gates), `.planning/research/STACK.md` (klicksafe 45–60 min band as external anchor)
- `.planning/phases/01-…/01-01/01-03-SUMMARY.md` — established patterns (autoescape verification discipline, D-12 PowerShell quoting, one-SVG-source pipeline, zero-host gate scope incl. `.svg`)

### Tertiary (LOW confidence)
- Illustration sizing aesthetics (hero 160px / mark 32px starting values) and "kommt bald" wording — planner/user judgment, flagged in A3/A4/A6

## Validation Architecture

> Skipped: `workflow.nyquist_validation` is explicitly `false` in `.planning/config.json`. (Verification = the five Phase 2 success criteria via build assertions + browser/DevTools spot checks + real-device UAT; the session's 39-assertion verify script is the reusable template for plan-level automated checks.)

## Metadata

**Confidence breakdown:**
- Standard stack: **HIGH** — no new deps; Eleventy version/legitimacy re-verified on npm this session; all widget tech is MDN/Baseline-documented
- Architecture: **HIGH** — every pattern (pagination routes, self-check markup, aria-live enhancer, inline-SVG include, guards, next-cards, escape matrix) executed in a real build on this machine with assertions
- Pitfalls: **HIGH** — three pitfalls (radio names, title double-escape, wrapped-data pagination) were *discovered by actual failures* in this session's build, then fixed and re-verified; the rest carry forward from Phase 1's executed lessons
- Voice-spec placement: **MEDIUM** — convention-grounded (in-repo markdown across major docs orgs) but inherently a project-culture choice; content rules are locked by D-04/D-06/D-07 and PITFALLS research

**Research date:** 2026-10-01
**Valid until:** 2026-10-31 (stable pinned stack; re-check only if Eleventy 4.0 leaves alpha or MDN live-region guidance changes)

---
*Research for: HandyChecker Phase 2 — Interactive Widgets + Reference Topic (+ Voice Spec)*
*Executed verification: real Eleventy 3.1.6 build, 39/39 assertions PASS (temp scaffold retained at %TEMP%\opencode\p2-build-test)*