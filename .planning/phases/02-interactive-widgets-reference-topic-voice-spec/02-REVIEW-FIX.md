---
phase: 02-interactive-widgets-reference-topic-voice-spec
fixed_at: 2026-10-01T00:00:00Z
review_path: .planning/phases/02-interactive-widgets-reference-topic-voice-spec/02-REVIEW.md
iteration: 1
findings_in_scope: 9
fixed: 9
skipped: 0
status: all_fixed
---

# Phase 02: Code Review Fix Report

**Fixed at:** 2026-10-01
**Source review:** `.planning/phases/02-interactive-widgets-reference-topic-voice-spec/02-REVIEW.md`
**Iteration:** 1

**Summary:**
- Findings in scope: 9 (1 critical, 4 warning, 4 info)
- Fixed: 9
- Skipped: 0

**Verification environment:** `workflow.use_worktrees` is `false` in `.planning/config.json`, so all edits and commits happened directly in the **main checkout** (`main`), not an isolated worktree. Every gate below ran in the main checkout against `_site/` and is reproducible from the current tree.

## Fixed Issues

### CR-01: Tips contain bare du-imperatives — violates the no-imperative voice rule

**Files modified:** `src/_data/topics.json`, `scripts/voice-check.js`, `package.json`
**Commit:** `5aad6d7`
**Applied fix:** Rewrote both tips as Happi-voiced invitations with no imperative verb, keeping the concrete kitchen/bedroom images and the solo/doable-today shape (D-05):
- `"Eine Idee von mir: Nach der Schule darf dein Handy eine Stunde in der Küche wohnen."`
- `"Eine Idee von mir: Abends darf dein Handy außerhalb deines Zimmers schlafen."`

Extended the voice gate into a persistent in-repo script, `scripts/voice-check.js` (`npm.cmd run check:voice`). It now (a) parses the Verboten list from `docs/stimme-und-stil.md` and scans all tip/reflection copy for those constructions, and (b) scans for **du-imperatives at clause starts** (`Leg|Lass|Probier(e)?|Vergiss|Mach|Nimm`), splitting on sentence punctuation, colons, and spaced dashes. It strips the spec-sanctioned `"Probiere aus:"` invitation wrapper first so an imperative embedded after the colon (the exact CR-01 shape) is still caught, while the sanctioned invitation itself is allowed. A sanity run confirmed it flags the old `"Probiere aus: Leg …"` / `"Probiere aus: Lass …"` copy and passes the new copy.
**Requires human verification:** copy/voice change — the machine gate proves rule-compliance, not that the tone feels right to a 10–12-year-old. Confirm the two tips read as warm invitations, not disguised instructions.

### WR-01: Self-check reflection judges an answer ("Das klingt gut!")

**Files modified:** `src/_data/topics.json`
**Commit:** `f929348`
**Applied fix:** Replaced the evaluating opener with an observation mirroring the other options' tone: `"Das kennen viele Kinder so – eine kurze Runde kann danach noch mehr Spaß machen."` No option is singled out for praise; the reflection now reads as "here's what many kids experience + a gentle idea".
**Requires human verification:** copy/voice change (semantic — the gate cannot judge tone).

### WR-02: Impressum ships bracketed placeholders and a user-visible TODO on a LIVE site

**Files modified:** `src/impressum.njk`
**Commit:** `9f53d1a`
**Applied fix:** Moved the author TODO from an HTML `<!-- … -->` comment to a Nunjucks `{# … #}` comment, which Eleventy strips at compile time. Verified: the built `_site/impressum/index.html` contains **0** occurrences of `TODO` and no literal `{#`. The bracketed placeholders themselves were deliberately left in place — populating real address/contact data is the `LEGAL-02` launch gate and the owner must supply it (inventing data was out of scope).

### WR-03: Core widget reveal depends on CSS `:has()` with no fallback

**Files modified:** `src/js/app.js`, `src/css/site.css`
**Commit:** `3b02992`
**Applied fix:** Added a tiny, additive enhancement in `app.js`: capability detection via `CSS.supports("selector(:has(*))")`; when unsupported, the `change` handler hides all sibling reflections and shows only the chosen one via inline `style.display`. The pure-CSS `:has()` path remains primary. No storage, `textContent`-only, no network. Scoped the comments in `app.js` and `site.css` so the "works without JS" claim is now explicitly limited to `:has()`-capable browsers (Chrome ≥105, Firefox ≥121), with the JS fallback documented.
**Requires human verification:** adds a branch of interactive logic (`!hasHas`); syntax-checked and structurally verified only — confirm reveal/switch behavior on a non-`:has()` engine.

### WR-04: Home page promises five complete topics; four cards lead to "kommt bald" stubs

**Files modified:** `src/index.njk`, `src/css/site.css`
**Commit:** `b5aae4c`
**Applied fix:** Added a visible `bald` badge (`<span class="card__soon">`) to every home card whose topic has no `facts` yet, and softened the intro to "Hier wächst Schritt für Schritt dein Handy-Wissen – mit Fakten, Fragen und echten Tipps." Cards were kept (D-09 keeps next-topic cards). Added the new `.card__soon` style. Verified in built output: the four stub cards carry the badge, the reference topic does not.

### IN-01: Dead `data-reflection` attribute

**Files modified:** `src/themen.njk`
**Commit:** `18b731c`
**Applied fix:** Removed the unused `data-reflection` attribute; `app.js` and CSS continue to use the `.selfcheck__reflection` class as the single hook. Verified absent from built topic pages.

### IN-02: `.topic-soon` class referenced but never defined

**Files modified:** `src/css/site.css`
**Commit:** `22d6f9f`
**Applied fix:** Added a `.topic-soon` rule (scaled font, ginger-ink accent, 600 weight) so stub pages get the intended distinct coming-soon look. Verified present in built `_site/css/site.css`.

### IN-03: Redundant ARIA on the live region

**Files modified:** `src/themen.njk`
**Commit:** `f1d703f`
**Applied fix:** Kept the single `role="status"` form (which implies `aria-live="polite"` and `aria-atomic="true"`) and dropped the redundant explicit attributes. Verified the built reference page renders exactly `<p class="selfcheck__live" role="status"></p>`.

### IN-04: No-op guard in `app.js` change handler

**Files modified:** `src/js/app.js`
**Commit:** `7a78d0b`
**Applied fix:** Removed the `if (!input.matches('input[type="radio"]')) return;` guard, which could never fire given `.selfcheck__group` contains only radios. Handler behavior unchanged.

## Verification Evidence

- `npm.cmd run build` → exit 0, "Copied 10 Wrote 9 files (v3.1.6)".
- `npm.cmd run check:voice` (new persistent gate) → `Voice gate PASSED: 5 copy string(s) checked against 3 Verboten construction(s) + imperative-start scan.`
- `node --check src/js/app.js` → exit 0 (before WR-03 and IN-04 commits).
- Final walk over all built files: 9 HTML pages; zero external `http(s)` references (SVG `xmlns` stripped); zero absolute external `href`/`src`; all internal links prefixed `/handychecker/`; no `innerHTML`/`fetch(`/storage tokens in built `app.js`; no `Das klingt gut` / `Probiere aus: Leg` / `data-reflection` in the built reference topic; home has 4 `card__soon` badges; built Impressum has 0 `TODO`.

---

_Fixed: 2026-10-01_
_Fixer: the agent (gsd-code-fixer)_
_Iteration: 1_
