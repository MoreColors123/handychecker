---
phase: 261001-mdd
plan: 01
type: execute
wave: 1
depends_on: []
files_modified:
  - src/index.njk
  - src/themen-index.njk
  - src/css/site.css
autonomous: true
requirements:
  - QUICK-261001-mdd

estimate:
  tokens: 14000
  raw_tokens: 14000
  tasks: 2
  confidence: low

must_haves:
  truths:
    - "Opening `/` on a phone shows ONLY Happi's icon (the hero), the greeting, and one clearly visible Start button; no topic cards, no quiz, no other controls (D-01, D-03)."
    - "Tapping Start navigates to `/themen/`, which shows Happi's icon, the overview greeting (verbatim), and the five topic cards — four of them carrying the 'bald' badge — exactly as the cards appeared on the old home page (D-02, D-03)."
    - "Each topic card on the overview page still links to its existing `/themen/<slug>/` page, so the new overview is a real hub and not a dead end."
    - "The start page keeps its existing document title; the overview page's title is 'Themen – HandyChecker' (built via head.njk's `title` + `suffixTitle` mechanism)."
    - "The shared header renders the '← Start' card on the overview page but still hides it on the start page (the `page.url != \"/\"` guard), so the start page has exactly one navigation affordance and the overview has a way back."
    - "The self-check answer options on the topic page have visibly less vertical space between them, while every option's label stays a ≥48px tap target (D-04)."
    - "No new third-party request, dependency, or script is introduced: the overview page ships no JS, app.js is untouched, and every built href/src is same-origin under /handychecker/."
  artifacts:
    - src/index.njk
    - src/themen-index.njk
    - src/css/site.css
  key_links:
    - "src/index.njk Start link ↔ src/themen-index.njk `permalink: \"/themen/\"` ↔ built `_site/themen/index.html` (the one navigation path)"
    - "src/index.njk (topic-cards removed) ↔ src/themen-index.njk (topic-cards loop with `card__soon`) — the cards move, the markup is preserved"
    - "src/themen-index.njk card hrefs `{{ ('/themen/' + topic.slug + '/') | url }}` ↔ existing built `_site/themen/<slug>/index.html` pages"
    - "src/css/site.css `.quiz-start` anchor-safe additions ↔ the start page Start link (`text-decoration: none`, `text-align: center`)"
    - "src/css/site.css `.selfcheck__option` spacing change ↔ unchanged `.selfcheck__option label { min-height: var(--tap-min) }` (tap target preserved, D-04)"
    - "src/_includes/header.njk `page.url != \"/\"` guard ↔ start page (hidden) vs overview page (shown)"
---

<objective>
Restructure the entry experience: turn `/` into a minimal start page (Happi's icon, the greeting, one Start button) and create a new topics overview page at `/themen/` that owns the topic cards. Also tighten the vertical spacing between the self-check answer options.

Purpose: the current home page dumps the greeting and all topic cards on one screen; the user wants a calm, app-like opening with a single clear action (Start), a second screen where the child chooses a topic, and a tighter quiz. Locked decisions D-01 to D-04 (2026-10-01).

Output: a rewritten `src/index.njk`, a new `src/themen-index.njk` served at `/themen/`, and a small spacing/centering change in `src/css/site.css`.
</objective>

<execution_context>
@C:/Users/FDK-DELL-XPS-8940/.config/opencode/gsd-core/workflows/execute-plan.md
@C:/Users/FDK-DELL-XPS-8940/.config/opencode/gsd-core/templates/summary.md
</execution_context>

<context>
@.planning/STATE.md
@src/index.njk
@src/themen.njk
@src/_includes/header.njk
@src/_includes/head.njk
@src/_data/topics.json
@src/css/site.css
@docs/stimme-und-stil.md

This is a quick task (single plan, two tasks). It builds directly on the Phase 2 shipped templates (`src/themen.njk` pagination, `src/_includes/header.njk` shared header with the `page.url` guard, `src/_includes/head.njk` title mechanism) and the existing `.happi-hero`, `.topic-cards`, `.card`, `.card__soon`, and `.quiz-start` styles in `src/css/site.css`.

Grounded facts (verified this session against a real build):
- Eleventy `pathPrefix` is `/handychecker/`; it rewrites `| url` output but NOT the output directory. Built pages live at `_site/index.html`, `_site/themen/<slug>/index.html`, `_site/css/site.css`, `_site/js/app.js`.
- `themen.njk` pagination emits only `/themen/<slug>/` (5 slug dirs today). A hand-written `permalink: "/themen/"` template writes `_site/themen/index.html` — no collision.
- `header.njk` shows the `← Start` card when `page.url != "/"`; the overview's pre-pathPrefix URL is `/themen/`, so the card appears there automatically.
- `head.njk` builds `<title>{{ title }}{% if suffixTitle %} – {{ site.siteName }}{% endif %}</title>`.
- `app.js` early-returns unless `[data-flow]` exists and only queries `.quiz-start` INSIDE `.selfcheck`; reusing the `quiz-start` class on a plain start-page link is inert (the start page includes no script at all).
- Established verify pattern on this Windows/PowerShell project: `npm.cmd run build` plus a temp Node script at `%TEMP%\opencode\gsd-verify-261001-mdd-taskN.js` that reads the BUILT files as UTF-8 and decodes HTML entities before matching. Never inline `node -e` payloads with double quotes.
</context>

<tasks>

<task type="tracer">
  <name>Task 1: Tracer — new start page at `/` and topics overview at `/themen/`, wired end-to-end (home → Start → overview → existing topic page)</name>
  <files>
    - src/index.njk
    - src/themen-index.njk
    - src/css/site.css
  </files>
  <read_first>
    - src/index.njk — the current home page to rewrite; note the frontmatter (`title: HandyChecker – Finde deine Balance`), the `happi-hero` include, and the `ul.topic-cards` loop whose markup (including `{% if not topic.facts %}<span class="card__soon">bald</span>{% endif %}`) must move verbatim to the overview page.
    - src/themen.njk — the pagination template; its `permalink: "/themen/{{ topic.slug }}/"` proves `/themen/<slug>/` routes exist and do NOT occupy `/themen/`. Note it carries `<main data-flow>` and the deferred app.js; the new overview must carry NEITHER.
    - src/_includes/header.njk — the `page.url != "/"` guard that will automatically show `← Start` on `/themen/` and hide it on `/`.
    - src/_includes/head.njk — the `title` + `suffixTitle` contract for the page title.
    - src/_data/topics.json — the five topics; the `facts` key is absent on four of them (drives the `card__soon` badge).
    - src/css/site.css — the existing `.happi-hero`, `.topic-cards`, `.card`, `.card__soon`, and `.quiz-start` rules to reuse; these pages introduce no new layout concepts.
    - docs/stimme-und-stil.md — voice rules; the new copy is the user's verbatim German text and contains no imperatives.
  </read_first>
  <acceptance_criteria>
    - `src/index.njk` keeps its existing frontmatter (`title: HandyChecker – Finde deine Balance`) and body skeleton (header include → `main id="inhalt"` → footer include) but its `main` contains ONLY: `<div class="happi-hero">{% include "happi-illus.svg" %}</div>`, an `<h1>Ich bin Happi, die Handy-Katze.</h1>`, a paragraph `Hier wächst Schritt für Schritt dein Handy-Wissen – mit Fakten, Fragen und echten Tipps.`, a paragraph `Nichts wird gespeichert: Diese Seite kann das gar nicht.`, and a Start link `<a class="quiz-start" href="{{ '/themen/' | url }}">Start</a>` (D-01). The `ul.topic-cards` block is removed from this file (D-03).
    - `src/themen-index.njk` is new, with frontmatter `title: Themen`, `suffixTitle: true`, `permalink: "/themen/"`. Its body follows the index skeleton (header include → `main id="inhalt"` → footer include) with NO `data-flow`, NO `[data-step]`, and NO `<script>` tag. Its `main` contains: the `happi-hero` include, an `<h1>Ich bin Happi, die Handy-Katze.</h1>`, a paragraph `Ich hab da mal was ausprobiert: Wenn ich zu lange auf den Bildschirm schaue, werde ich ganz kribbelig im Kopf.`, a paragraph `Deshalb schauen wir zusammen, wie das bei dir ist – ganz ohne Vorwürfe. Welches Thema möchtest du zuerst anschauen?`, and then the topic-cards list copied verbatim from the old home page: `<ul class="topic-cards">{%- for topic in topics %}<li><a class="card" href="{{ ('/themen/' + topic.slug + '/') | url }}">{{ topic.title }}{% if not topic.facts %}<span class="card__soon">bald</span>{% endif %}</a></li>{%- endfor %}</ul>` (D-02, D-03).
    - `src/css/site.css` adds anchor-safe properties to the existing `.quiz-start` rule so it also reads as a primary button when used on an `<a>`: `text-decoration: none;` and `text-align: center;`. No other `.quiz-start` property changes; no new hex, no new dependency.
    - Built `_site/themen/index.html` exists and `_site/themen/` contains exactly six entries: `index.html` plus the five slug directories (route coexistence proven).
    - Built `_site/index.html` contains the hero, both greeting strings, and `href="/handychecker/themen/"` with link text `Start`; it contains no `topic-cards` and no `← Start`.
    - Built `_site/themen/index.html` contains the greeting strings, `class="topic-cards"`, exactly five `class="card"`, exactly four `class="card__soon"`, the `href="/handychecker/themen/bildschirmzeit/"` (and the other four slug hrefs), and the header `← Start` card pointing at `/handychecker/`; its title is `Themen – HandyChecker`.
    - No built HTML/CSS/JS file gains a fetchable external reference (`src="http…`, `href="http…`, or `url(http…)`); every root-absolute `href`/`src` stays under `/handychecker/`. The inline SVG `xmlns="http://www.w3.org/2000/svg"` is a namespace declaration, not a fetchable reference, and is exempt.
    - `src/js/app.js` is not modified.
  </acceptance_criteria>
  <action>
Prove the whole new navigation path first: a calm start page at `/` whose single Start button lands on a real overview page at `/themen/`, whose cards still reach the existing topic pages.

In `src/index.njk` (D-01), keep the frontmatter title and the include skeleton, and replace the `main` contents with exactly: the `.happi-hero` include, `<h1>Ich bin Happi, die Handy-Katze.</h1>`, the paragraph `Hier wächst Schritt für Schritt dein Handy-Wissen – mit Fakten, Fragen und echten Tipps.`, the paragraph `Nichts wird gespeichert: Diese Seite kann das gar nicht.`, and `<a class="quiz-start" href="{{ '/themen/' | url }}">Start</a>`. Delete the `ul.topic-cards` block from this file. Keep the copy character-for-character (German en-dash `–`, umlauts, colon) — do not paraphrase.

Create `src/themen-index.njk` (D-02) with frontmatter `title: Themen`, `suffixTitle: true`, `permalink: "/themen/"`, and the same include skeleton. Its `main id="inhalt"` carries NO `data-flow` and the file has NO script tag (it is pure static content, so it never activates the stepper or the quiz). Place the `.happi-hero` include, then `<h1>Ich bin Happi, die Handy-Katze.</h1>`, then the two paragraphs carrying the verbatim overview greeting, then the `ul.topic-cards` list moved verbatim from the old home page — including the `{% if not topic.facts %}<span class="card__soon">bald</span>{% endif %}` badge and the `| url` card href (D-03). Use `| url` for every href so the pages stay subpath-safe.

In `src/css/site.css`, add `text-decoration: none;` and `text-align: center;` to the existing `.quiz-start` rule (the class is now also used by an `<a>` on the start page; the properties are no-ops for the `<button>` created by app.js). Do not duplicate the rule or introduce a new colour/class.

Do NOT touch `src/themen.njk`, `src/_includes/*.njk`, `src/js/app.js`, `src/_data/*`, or `eleventy.config.js`.
  </action>
  <verify>
    <automated>npm.cmd run build && node "%TEMP%\opencode\gsd-verify-261001-mdd-task1.js"</automated>
    <fails_when>The temp verify script (author it first; Node UTF-8 reads, decode HTML entities before matching, PowerShell console mangles umlauts) reports any of — build exit non-zero; `_site/index.html` missing; built home missing `class="happi-hero"`, the h1 `Ich bin Happi, die Handy-Katze.`, or either greeting paragraph; built home missing `href="/handychecker/themen/"` or the `>Start</a>` link text; built home still containing `topic-cards`; built home containing `← Start`; built home `<title>` not `HandyChecker – Finde deine Balance`; `_site/themen/index.html` missing; built overview missing the greeting strings; built overview missing `class="topic-cards"`; the count of `class="card"` on the overview not equal to 5; the count of `class="card__soon"` not equal to 4; built overview missing `href="/handychecker/themen/bildschirmzeit/"` or `href="/handychecker/themen/schlaf/"` (only two slugs need be asserted, since the loop is shared); built overview missing the `← Start` header card (`href="/handychecker/"`); built overview `<title>` not `Themen – HandyChecker`; built overview containing `data-flow` or `/js/app.js`; `_site/themen/` not containing exactly six entries (index.html + five slug dirs); any built `.html`/`.css`/`.js` containing a fetchable external reference (`src="http`, `href="http`, `url(http`); any root-absolute built `href`/`src` not starting with `/handychecker/`; `src/js/app.js` differing from HEAD.</fails_when>
  </verify>
  <done>On a phone, `/` shows only Happi's icon, the greeting, and a Start button; Start lands on `/themen/` with Happi's icon, the overview greeting, and the five topic cards (four "bald"); each card still opens its topic page; the start page keeps its title, the overview is titled "Themen – HandyChecker", and the header's "← Start" shows only on the overview. Build is green, no external request or dependency added, app.js untouched. Committed.</done>
</task>

<task type="auto">
  <name>Task 2: Tighten the self-check option spacing and vertically center the label text (≥48px tap target preserved)</name>
  <files>
    - src/css/site.css
  </files>
  <read_first>
    - src/css/site.css — the `.selfcheck__option` block (currently `display: grid; grid-template-columns: auto minmax(0, 1fr); column-gap: var(--space-sm); align-items: start; margin: 0 0 var(--space-sm);`) and the `.selfcheck__option label` block (`display: block; min-height: var(--tap-min); padding: var(--space-sm) var(--space-md); …`). The radio rule (`margin-top: 7px`) is intentionally left as-is.
    - src/css/tokens.css — `--space-sm: 8px`, `--tap-min: 48px`; the change uses these tokens only.
  </read_first>
  <acceptance_criteria>
    - In `src/css/site.css`, `.selfcheck__option` margin becomes `margin: 0 0 calc(var(--space-sm) / 2);` (halving the vertical gap between answer options, D-04). Literally the value `calc(var(--space-sm) / 2)`.
    - `.selfcheck__option label` becomes a vertical-centering flex box: `display: flex;` and `align-items: center;` (replacing the former `display: block;`), so a single-line label's text centers inside its ≥48px tap box and no longer leaves visual slack below it. `min-height: var(--tap-min);` and the existing padding/radius/cursor/hover rules remain unchanged, so the tap target is still ≥48px (D-04).
    - The `.selfcheck__option input[type="radio"]` rule is unchanged (`margin-top: 7px` stays — it keeps the radio aligned toward the first text line for multi-line options).
    - No new hex values, no new external reference, no `@import`, no `prefers-color-scheme` block, no fixed pixel widths introduced. Only the two described edits.
    - `npm.cmd run build` exits 0; `npm.cmd run check:voice` still passes.
  </acceptance_criteria>
  <action>
Reduce the self-check spacing in `src/css/site.css` (D-04). In the `.selfcheck__option` rule, change `margin: 0 0 var(--space-sm);` to `margin: 0 0 calc(var(--space-sm) / 2);`. In the `.selfcheck__option label` rule, change `display: block;` to `display: flex;` and add `align-items: center;`, keeping `min-height: var(--tap-min);` and all other label properties exactly as they are — the label remains the ≥48px tap surface, only its text is now vertically centered. Leave the radio rule (`margin-top: 7px`) and every other `.selfcheck*` rule untouched. Change nothing else in the stylesheet.
  </action>
  <verify>
    <automated>npm.cmd run build && npm.cmd run check:voice && node "%TEMP%\opencode\gsd-verify-261001-mdd-task2.js"</automated>
    <fails_when>The temp verify script reports any of — build non-zero or check:voice non-zero; built `_site/css/site.css` missing `margin: 0 0 calc(var(--space-sm) / 2);`; built CSS missing `display: flex;` or `align-items: center;` inside the `.selfcheck__option label` block; built CSS's `.selfcheck__option label` block missing `min-height: var(--tap-min);`; built CSS containing `@import`, a `url(http`, or `prefers-color-scheme`; built CSS changed anywhere outside `.selfcheck__option` and `.selfcheck__option label` (compare the rest of the file byte-for-byte against `src/css/site.css` HEAD by asserting the two target blocks are the only diffs, or by asserting the shipped file still contains the unchanged `.selfcheck__option input[type="radio"]` rule with `margin-top: 7px`).</fails_when>
  </verify>
  <done>Answer options sit closer together and single-line label text is vertically centered in its still-≥48px tap box; the radio alignment, the build, and the voice gate are unchanged and green. Committed.</done>
</task>

</tasks>

<threat_model>
## Trust Boundaries

| Boundary | Description |
|----------|-------------|
| Browser → static site | The new pages are static, hand-authored German content; there is no user input, form, query parameter, or script on either new page |
| Hand-authored copy → public repo/site | The greeting texts and card titles are trusted human input rendered at build time with Nunjucks auto-escape ON |
| Eleventy route space → deployed output | `/themen/` (hand-written) coexists with pagination-emitted `/themen/<slug>/`; a collision would overwrite a built page |

## STRIDE Threat Register

| Threat ID | Category | Component | Severity | Disposition | Mitigation Plan |
|-----------|----------|-----------|----------|-------------|-----------------|
| T-261001-mdd-01 | Information disclosure | New pages / start button | low | mitigate | Neither new page adds a script, cookie, or network call; the start page ships no JS at all; the zero-external-reference gate is re-run over every built file and every root-absolute href/src must stay under /handychecker/ |
| T-261001-mdd-02 | Tampering | Nunjucks templates / injected copy | medium | mitigate | Copy is verbatim human-authored text; Nunjucks auto-escape stays ON (head.njk unchanged); no `| safe` filter is introduced anywhere |
| T-261001-mdd-03 | Availability | Progressive enhancement | medium | mitigate | The overview page deliberately carries no `data-flow` and no app.js, so no-no-JS regression is possible there; the start page has a single `<a>` link; built pages are asserted to contain the full static content |
| T-261001-mdd-04 | Tampering | Route collision `/themen/index.html` vs pagination | medium | mitigate | Verify asserts `_site/themen/` contains exactly six entries (index + five slugs) and that a real build resolves both the overview and every existing topic page |
| T-261001-mdd-05 | Elevation / availability | Reusing `.quiz-start` might drag the quiz into the start page | low | accept | `app.js` is not included on either new page and early-returns without `[data-flow]`; `.quiz-start` carries no JS hook; the CSS additions are presentational only |
| T-261001-mdd-SC | Tampering | npm/pip/cargo installs | low | accept | ZERO package installs in this plan; the dependency set is unchanged (Eleventy only, already installed) |
</threat_model>

<verification>
- `npm.cmd run build` (and `npm.cmd run check:voice` after Task 2) must stay green.
- Each task's temp verify reads the BUILT output (`_site/index.html`, `_site/themen/index.html`, `_site/css/site.css`) as UTF-8 and decodes HTML entities before matching.
- Task 1 proves the end-to-end path and route coexistence; Task 2 proves the spacing/tap-target change and that nothing else in the stylesheet moved.
- Both tasks re-run the zero-fetchable-external-reference and `href`/`src` under `/handychecker/` gates.
- Human check (end of task): on a phone-sized viewport open `/`, confirm only icon + greeting + Start; tap Start; confirm the overview shows the greeting and five cards; open the Bildschirmzeit topic and confirm the quiz options are tighter but still comfortably tappable (≥48px), with JS on and off.
</verification>

<success_criteria>
- `/` is a minimal start page: Happi's icon, the greeting, and one Start button (D-01).
- `/themen/` is a real topics overview page: Happi's icon, the verbatim greeting, and the five topic cards with the four "bald" badges (D-02, D-03).
- The old home page no longer shows the cards; the cards live on the overview and still link to every topic (D-03).
- Self-check options are tighter with ≥48px tap targets and vertically centered label text (D-04).
- No new dependency, script, or external request; `app.js` and all other templates untouched; build and voice gate green.
</success_criteria>

<output>
Create `.planning/quick/261001-mdd-start-page-and-topics-overview-page-plus/261001-mdd-SUMMARY.md` when done.
</output>
