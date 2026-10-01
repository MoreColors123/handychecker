---
phase: 02-interactive-widgets-reference-topic-voice-spec
reviewed: 2026-10-01T15:05:00Z
depth: standard
files_reviewed: 12
files_reviewed_list:
  - eleventy.config.js
  - src/404.njk
  - src/_data/site.json
  - src/_data/topics.json
  - src/_includes/happi-illus.svg
  - src/_includes/header.njk
  - src/css/site.css
  - src/datenschutz.njk
  - src/impressum.njk
  - src/index.njk
  - src/js/app.js
  - src/themen.njk
findings:
  critical: 1
  warning: 4
  info: 4
  total: 9
status: issues_found
---

# Phase 2: Code Review Report

**Reviewed:** 2026-10-01T15:05:00Z
**Depth:** standard
**Files Reviewed:** 12
**Status:** issues_found

## Summary

Reviewed the Phase 2 interactive-widget / reference-topic / identity layer at standard depth. I built the site locally (`_site/`, 9 pages, build exit 0) and inspected the generated HTML for the reference topic (`themen/bildschirmzeit`), a stub topic (`themen/schlaf`), the home page, the 404 page, and the Impressum.

The technical substrate is largely solid and the Phase 1 subpath regression (CR-01) is **not** present: every `href`/`src` in every built file resolves through the `| url` filter to `/handychecker/...`, and there are zero external (`https?://`) runtime references. The self-check widget is pure-CSS `:has()` keyed off a native radio group, persists nothing (no storage / no network), and its JS enhancer is genuinely additive. No injection, secrets, or PII-handling code was found.

The material problems are in the **child-facing copy**, which is the one thing this project's constraints single out as high severity:
1. The "Probiere aus" tips embed bare du-imperatives — a direct violation of the no-imperative voice rule the plan claims to satisfy.
2. One self-check reflection ("Das klingt gut!") judges an answer, violating the "no right/wrong, reflections without judgment" contract.

There are also a live-site compliance defect (placeholder Impressum + a user-visible TODO comment) and a progressive-enhancement gap in the widget.

## Critical Issues

### CR-01: Tips contain bare du-imperatives — violates the no-imperative voice rule

**File:** `src/_data/topics.json:48-49`
**Issue:** Both tip items wrap an imperative command inside the sanctioned "Probiere aus:" invitation:

- `"Probiere aus: Leg dein Handy nach der Schule für eine Stunde in die Küche."` — `Leg …` is a du-imperative.
- `"Probiere aus: Lass dein Handy abends außerhalb deines Zimmers liegen."` — `Lass … liegen` is a du-imperative.

`docs/stimme-und-stil.md` §"Keine Vorträge" states "keine Imperative" and "Vorschläge sind Einladungen („Probiere aus…"), keine Befehle". The embedded clauses are themselves Befehle, so the "Probiere aus:" prefix does not make the sentence imperative-free. `02-01-SUMMARY.md` line 173 claims the tips satisfy the no-imperative rule, but the phase's own verify script only scanned for the three Verboten *word* constructions ("du bist süchtig", "Handy macht krank", "zerstört") and never targeted imperative mood — so this slipped the gate. Project instructions explicitly require weighing voice-constraint violations as high severity.

**Fix:** Rewrite as descriptions/Happi-experiences rather than commands, e.g.:

```json
{ "text": "Probiere aus: Eine Stunde ohne Handy in der Küche fühlt sich für viele Kinder leichter an." },
{ "text": "Probiere aus: Abends darf dein Handy außerhalb deines Zimmers schlafen." }
```

(Keep concrete kitchen/bedroom images but remove the imperative verb.) Extend the phase verify script to flag du-imperative mood, not just the three banned phrases.

## Warnings

### WR-01: Self-check reflection judges an answer ("Das klingt gut!")

**File:** `src/_data/topics.json:29` (rendered at `_site/themen/bildschirmzeit/index.html:109`)
**Issue:** Option `a`'s reflection opens with "Das klingt gut!" — an evaluation of the child's answer. The voice spec §"Selbstcheck-Antworten" requires "Antwortoptionen sind beschreibend, nie bewertet", "Reflexionen sind beobachtend und ermutigend", and "es gibt kein Richtig oder Falsch". Singling out one option for praise creates exactly the right/wrong framing the self-check contract forbids (and one of the three options is left without the same validation). The other two reflections are correctly observing/hedged.

**Fix:** Replace the judgment with an observation, mirroring the tone of the other options, e.g. `"Das kennen viele Kinder so – eine kurze Runde kann danach noch mehr Spaß machen."`

### WR-02: Impressum ships bracketed placeholders and a user-visible TODO on a LIVE site

**File:** `src/impressum.njk:16-21` (rendered at `_site/impressum/index.html:60-66`)
**Issue:** The Impressum is live at `https://morecolors123.github.io/handychecker/` but still contains `[Name der Eltern]`, `[Straße und Hausnummer]`, `[PLZ] [Ort]`, `[E-Mail-Adresse der Eltern]`. The page itself cites "Angaben gemäß § 5 DDG", so an Impressum full of placeholders is legally non-compliant in Germany. Additionally the authoring note `<!-- TODO: Eltern … -->` (line 21) is emitted verbatim into the served HTML and is visible via view-source to anyone. Because the URL is already public, "before the URL is shared" has effectively already passed.

**Fix:** Populate the address/contact fields (or make the page a genuine `noindex`/removed route until filled). Never ship the TODO comment into output — move author notes into a comment stripped by the template (e.g. a Nunjucks `{# … #}` comment, which Eleventy does not emit to HTML) rather than an HTML comment. Note: Nunjucks `{# #}` comments are compile-time and will not appear in `_site`.

### WR-03: Core widget reveal depends on CSS `:has()` with no fallback; the "works without JS" claim is misleading

**File:** `src/css/site.css:142-143`, `src/js/app.js:1-24`, `src/themen.njk:37-39`
**Issue:** The tap → reflection behavior is implemented solely as `.selfcheck__option:has(input:checked) .selfcheck__reflection { display: block; }`. On any engine without `:has()` support (Chrome < 105, Firefox < 121), the reflection is never revealed — and `app.js` does not help, because its `change` handler only writes text into the visually-hidden live region; it never toggles visibility. The comments at `site.css:139` ("pure CSS, works without JS") and `app.js:2` ("Das Widget funktioniert OHNE dieses Skript") are therefore true only for `:has()`-capable browsers, so the stated progressive-enhancement guarantee is overstated and a supported-baseline assumption should be documented (or a one-line JS fallback added).

**Fix:** Either document the `:has()` baseline explicitly and keep the no-JS claim scoped to capable engines, or add a tiny fallback that reveals the reflection on `change` when `CSS.supports('selector(:has(*))')` is false (e.g. set a `.is-revealed` class / `hidden` attribute on the checked option's reflection). A robust minimal fallback in `app.js`:

```js
if (!CSS.supports('selector(:has(*))')) {
  // fallback: reveal the selected option's reflection directly
  option.querySelector('.selfcheck__reflection')?.removeAttribute('hidden');
}
```

(requires the reflection markup to start `hidden` in the non-`:has` path — or simply toggle `style.display`).

### WR-04: Home page promises five complete topics; four cards lead to "kommt bald" stubs

**File:** `src/index.njk:14-19` (stub behavior in `src/themen.njk:70-74`)
**Issue:** The home copy says "Hier findest du fünf Themen rund um dein Handy – mit Fakten, Fragen und echten Tipps", and lists all five topics as prominent cards, but only `bildschirmzeit` has facts/questions/tips; `schlaf`, `aufmerksamkeit`, `koerper`, `datenschutz` render only "Das Thema kommt bald – Happi arbeitet schon dran!". A child tapping four of the five home cards hits a dead end while being told "echte Tipps" are there. The plan (02-01) deliberately created stub routes so next-topic cards always resolve, but the home affordance/copy does not distinguish available from unavailable topics.

**Fix:** Mark stub topics in the home list and/or soften the promise, e.g. render a "bald" badge on cards without `facts` — `{% if topic.facts %}` … `{% else %}<span class="card__soon">bald</span>{% endif %}` — and/or adjust the intro to "Hier wächst Schritt für Schritt dein Handy-Wissen" so the copy matches what is shipped. Define a `.card__soon` style alongside the (currently undefined) `.topic-soon` class.

## Info

### IN-01: Dead `data-reflection` attribute

**File:** `src/themen.njk:39`
**Issue:** `data-reflection` is emitted on every reflection paragraph but never read — `app.js` locates reflections via `.selfcheck__reflection`, not the data attribute. It is dead markup that suggests an abandoned selector strategy.
**Fix:** Remove `data-reflection`, or switch `app.js`/CSS to use it as the single hook if a data-attribute contract is intended.

### IN-02: `.topic-soon` class referenced but never defined

**File:** `src/themen.njk:72`
**Issue:** The stub paragraph uses `class="topic-soon"`, but no `.topic-soon` rule exists in `src/css/site.css` (grep confirms the only occurrence is this usage). Stub pages therefore get default paragraph styling, not the intended distinct "coming soon" look.
**Fix:** Add a `.topic-soon` rule in `site.css`, or drop the unused class.

### IN-03: Redundant ARIA on the live region

**File:** `src/themen.njk:44`
**Issue:** `role="status"` already implies `aria-live="polite"` and `aria-atomic="true"`; combining all three is redundant. Not a correctness bug, but it invites confusion about which attribute actually drives behavior.
**Fix:** Keep `role="status"` and drop the explicit `aria-live`/`aria-atomic`, or drop `role` and keep the explicit live-region attributes — pick one form.

### IN-04: No-op guard in `app.js` change handler

**File:** `src/js/app.js:12-14`
**Issue:** The handler early-returns unless `e.target.matches('input[type="radio"]')`, but `.selfcheck__group` contains only radio inputs, so the guard can never fire. Harmless defensive code, but it is dead in the current markup.
**Fix:** Keep if future-proofing is intended, or remove to reduce noise.

---

## Notes (verified, not defects)

- **Phase 1 subpath regression (CR-01) not present** — all built `href`/`src` values begin with `/handychecker/`; the 404 permalink resolves correctly.
- **Zero third-party requests** — the only `http://` occurrences are the SVG `xmlns` namespaces; no external fetches.
- **Privacy constraints held** — no storage, no cookies, no analytics, no forms; self-check state lives only in the DOM (radio checked), reload forgets.
- **`page.url != "/"` guard** and the 404 page's two Start affordances are treated as known-accepted and not re-flagged.
- Build (`eleventy 3.1.6`) exits 0, emits all nine pages, and does not collapse the `/themen/` pagination (`_site/themen/index.html` correctly absent).

---

_Reviewed: 2026-10-01T15:05:00Z_
_Reviewer: the agent (gsd-code-reviewer)_
_Depth: standard_
