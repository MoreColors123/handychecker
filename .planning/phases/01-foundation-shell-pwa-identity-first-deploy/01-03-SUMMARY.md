---
phase: 01-foundation-shell-pwa-identity-first-deploy
plan: 03
subsystem: pwa-identity
tags: [pwa, web-app-manifest, svg, inkscape, icons, maskable, favicon, german]

# Dependency graph
requires:
  - "01-01 (passthrough config already wired: addPassthroughCopy src/manifest.webmanifest + { src/icons: icons }; Pattern-3 head on every template; build pipeline)"
provides:
  - "src/manifest.webmanifest - subpath-safe required-member manifest (relative start_url/scope/icon srcs, locked light palette), served byte-equal at _site/manifest.webmanifest"
  - "Complete Happi icon set served under _site/icons/: icon-192.png, icon-512.png (any), icon-maskable.svg (maskable, full-bleed), apple-touch-icon.png 180x180, favicon.svg + favicon-32.png"
  - "src/icons-src/happi-source.svg - the ONE hand-authored Happi ginger-cat art source (never served, outside the passthrough dir)"
  - "tools/strip-png-meta.cjs - reproducible PNG metadata-hygiene step for every future icon regen"
affects: [01-04 (first deploy + live-URL installability checks; relative manifest needs no change), phase-2 widgets (Happi motif + tokens reuse), phase-3 content]

# Actuals (#2632) - same estimateTokens scale (chars/4 over the realized diff).
actuals:
  tokens: 1807        # 7,226 diff chars / 4 over fff19b2..HEAD (3 SVGs + manifest + strip script = 111 insertions; the ~30KB of PNG binary content is invisible to a git char diff)
  tasks: 3
  commits: 3          # MEASURED: git rev-list --count fff19b2..HEAD (#3968)
  plan_head_before: fff19b2665c5bb972ce5ec0ed488914c53e15bb4
  plan_head_after: c64ce151a6740b4bce20f5c57958fa25d252495a

# Tech tracking
tech-stack:
  added: []           # no new packages - Inkscape 1.4.4 is a local CLI, not a dependency
  patterns: ["one-SVG-source icon pipeline (hand-authored happi-source.svg -> 4 Inkscape exports + strip step)", "subpath-safe relative manifest (Pattern 1 - passthrough file never rewritten)", "maskable safe zone as a programmatic proof (max art radius <= 204.8 from center)", "PNG metadata hygiene strip step after every Inkscape regen (T-03-03)", "zero-host gate scope extended to .webmanifest/.svg with namespace-identifier exemption"]

key-files:
  created: [src/icons-src/happi-source.svg, src/icons/icon-maskable.svg, src/icons/favicon.svg, src/icons/icon-192.png, src/icons/icon-512.png, src/icons/apple-touch-icon.png, src/icons/favicon-32.png, tools/strip-png-meta.cjs, src/manifest.webmanifest]
  modified: []

key-decisions:
  - "Head circle r=152 at (256,272) instead of the action's approximate ~r180 at (256,256): the 204.8px safe-zone cap leaves an r180 head no ear room (tips could poke only ~25px past the head edge - not a cat); r152 centered 16px low yields real ear tips at 203.1 from center while honoring the binding constraints (recognizable cat, art inside the safe zone, locked hexes)"
  - "Inkscape 1.4.4 stamps every PNG export with a tEXt Software chunk and has no CLI flag to suppress it; tools/strip-png-meta.cjs (committed) strips only ancillary metadata chunks, never IHDR/IDAT - shipped binaries stay metadata-clean (T-03-03) and the strip is a documented step of the regen pipeline"
  - "Task 1 verify refined where the plan contradicted itself: xmlns=http://www.w3.org/2000/svg is a required XML namespace NAME (never fetched), so the raw http:// substring test was replaced by a fetchable-reference test (<image/<use/xlink:href/url(/@import/<script/href=) plus an xmlns requirement"
  - "Task 3 verify strengthened beyond the plan's literal block: byte-equal passthrough proof, lang de, exact three-tuple icon set, manifest sizes strings vs real PNG IHDR pixels cross-check, and an icons-src/happi-source leak check over the full build"
  - "Manifest carries the minimal member set only - no description, screenshots, share_target or shortcuts - keeping the install prompt privacy-minimal (T-03-04)"

patterns-established:
  - "One-SVG-source icon pipeline: edit src/icons-src/happi-source.svg, re-run the four Inkscape export commands, then node tools/strip-png-meta.cjs src/icons/*.png - never hand-resize or pixel-edit a PNG"
  - "Maskable icon contract: background rect MUST be full-bleed (the crop shows cream, not transparency); foreground art stays inside the 80% circle and is proven programmatically"
  - "Zero-host gate scope now includes .webmanifest and .svg; SVGs permit only the two w3.org namespace identifiers"

requirements-completed: [PWA-01]  # copied verbatim from 01-03-PLAN.md frontmatter; REQUIREMENTS.md marking deferred by the shared-ID gate (PWA-01 also declared by plan 01-04)

# Coverage metadata (#1602) - one entry per shipped deliverable.
coverage:
  - id: D1
    description: "src/icons-src/happi-source.svg - the ONE hand-authored Happi ginger-cat source (cream #FFF6EC full-bleed bg, ginger #E8863A head/ears, peach #FFD9B8 inner ears + blush, cocoa #4A3728 eyes/nose/smile/whiskers); never served (no icons-src mapping, nothing from it in _site/ over the full build)"
    verification:
      - kind: e2e
        ref: "gsd-verify-01-03-task1.js -> viewBox/xmlns/no-fetchable-refs + 'max art radius 203.1 <= 204.8'; task3 leak check over _site/"
        status: pass
    human_judgment: false
  - id: D2
    description: "src/icons/icon-maskable.svg - same art with FULL-BLEED background (maskable crop shows cream, not transparency), foreground art inside the safe zone"
    requirement: PWA-01
    verification:
      - kind: e2e
        ref: "gsd-verify-01-03-task1.js -> full-bleed rect + safe-zone proof; task3 -> served at _site/icons/icon-maskable.svg"
        status: pass
    human_judgment: false
  - id: D3
    description: "src/icons/favicon.svg - simplified face (head, ears, eyes, smile at stroke 14; whiskers/inner ears/blush dropped) so it still reads as a cat at 32px (Assumption A8)"
    verification:
      - kind: e2e
        ref: "gsd-verify-01-03-task1.js (structure + safe zone) + task3 (served at _site/icons/favicon.svg)"
        status: pass
    human_judgment: false
  - id: D4
    description: "Four PNG rasters IHDR-verified at exactly 512x512 / 192x192 / 180x180 / 32x32, all derived from happi-source.svg via Inkscape 1.4.4 CLI, metadata chunks stripped (clean chunk sets)"
    requirement: PWA-01
    verification:
      - kind: e2e
        ref: "gsd-verify-01-03-task2.js -> 'OK png dims' (IHDR + chunk-walk); 192px raster visually confirmed as the Happi face"
        status: pass
    human_judgment: false
  - id: D5
    description: "src/manifest.webmanifest - valid JSON with the exact locked members (name/short_name HandyChecker, lang de, start_url '.', scope '.', display standalone, prefer_related_applications false, #E8863A/#FFF6EC) and exactly three relative icon entries; byte-equal passthrough at _site/manifest.webmanifest"
    requirement: PWA-01
    verification:
      - kind: e2e
        ref: "gsd-verify-01-03-task3.js -> all member/value/relative-path/exact-tuple assertions + byte-equality"
        status: pass
    human_judgment: false
  - id: D6
    description: "Pattern-3 head wiring re-asserted on every built page (manifest link, favicon.svg, apple-touch-icon 180x180, both web-app-capable metas, apple-mobile-web-app-title) + zero-external-host gate over 9 built text files (html/css/webmanifest/svg)"
    verification:
      - kind: e2e
        ref: "gsd-verify-01-03-task3.js -> 'head on 4 built page(s)'; gsd-verify-01-03-plan-gate.js -> 'OK zero-host gate over 9 built text files'"
        status: pass
    human_judgment: false
  - id: D7
    description: "A8 human visual check: icon-maskable.svg + favicon at actual size in a browser - cat recognizable, nothing clipped out of the safe-zone circle, 32px favicon reads as a cat"
    verification: []
    human_judgment: true
    rationale: "End-of-phase human check per the plan's <human-check>; structural/safe-zone guarantees are machine-proven in D1-D4 (203.1 <= 204.8; 32px favicon simplified per plan). The on-screen cat quality judgment needs human eyes at close-out."

# Metrics
duration: 11min
completed: 2026-09-28
status: complete
---

# Phase 1 Plan 03: PWA Identity (Happi Icons + Manifest) Summary

**The complete PWA identity: one hand-authored Happi ginger-cat SVG source driving a six-file icon set (192/512 PNG, full-bleed maskable SVG, 180px apple-touch-icon, simplified favicon) via the verified Inkscape 1.4.4 pipeline, plus a subpath-safe web-app manifest with the locked light palette - all member-checked over the built site with the zero-host gate re-proven across 9 built files**

## Performance

- **Duration:** 11 min
- **Started:** 2026-09-28T12:26:42Z
- **Completed:** 2026-09-28T12:38:01Z
- **Tasks:** 3 (all type=auto)
- **Files changed:** 9 (8 planned + 1 deviation script)

## Accomplishments

- **One art source:** `src/icons-src/happi-source.svg` - Happi the ginger cat (D-03) hand-authored from primitive shapes on the warm cream background: ginger head + ears (#E8863A), peach inner ears + blush (#FFD9B8), cocoa eyes/nose/smile/whiskers (#4A3728). Lives outside the passthrough dir, so it is never served. Foreground art programmatically proven inside the maskable safe zone (max radius 203.1 <= 204.8).
- **Maskable + favicon:** `icon-maskable.svg` (same art, full-bleed background so the Android crop shows cream) and `favicon.svg` (simplified face, whiskers/inner ears/blush dropped, thicker smile - reads as a cat at 32px).
- **Four PNG rasters** exported with the verified Inkscape 1.4.4 commands, IHDR-verified byte-exact at 512x512 / 192x192 / 180x180 / 32x32 - matching the manifest `sizes` strings exactly (Pitfall 2 gray-globe guard). Metadata-clean chunk sets (T-03-03).
- **Manifest:** `src/manifest.webmanifest` with the exact MDN required-member set, locked values (HandyChecker / de / standalone / false / #E8863A / #FFF6EC) and all-relative paths (`start_url "."`, `scope "."`, `src "icons/..."`) - subpath-safe by construction, byte-equal passthrough into `_site/`.
- **Installability member-check over the built site:** manifest members/values asserted, six icons served under `_site/icons/`, manifest sizes == real PNG pixels, Pattern-3 head wiring proven on all 4 built pages, zero-external-host gate re-proven over 9 built text files.

## Task Commits

Each task was committed atomically:

1. **Task 1: Hand-author the Happi SVG source, maskable icon and favicon** - `996dabe` (feat) - 3 SVGs, safe-zone-proven
2. **Task 2: Derive the four PNG rasters via Inkscape CLI** - `3e98ea5` (feat) - 4 PNGs + tools/strip-png-meta.cjs
3. **Task 3: Manifest.webmanifest + installability assertion over the built site** - `c64ce15` (feat) - manifest, member-check green

## Files Created/Modified

- `src/icons-src/happi-source.svg` - the ONE hand-authored Happi art source (never served)
- `src/icons/icon-maskable.svg` - full-bleed maskable, art inside the 80% safe zone
- `src/icons/favicon.svg` - simplified cat face for bookmarks/tabs
- `src/icons/icon-512.png`, `src/icons/icon-192.png` - Chromium-required `any` icons (IHDR-verified)
- `src/icons/apple-touch-icon.png` - 180x180 iOS home-screen icon
- `src/icons/favicon-32.png` - 32px classic favicon
- `tools/strip-png-meta.cjs` - PNG metadata-hygiene step for every future regen (deviation, see below)
- `src/manifest.webmanifest` - subpath-safe required members, locked light palette

## Decisions Made

- **Head geometry r=152 at (256,272), not literal ~r180 at (256,256):** the action's head radius carries a "~" (approximate); the binding constraints are a recognizable cat + all art inside the 204.8px safe-zone circle + locked hexes. A literal r180 head leaves ear tips only ~25px of room beyond the head edge - geometrically unable to read as a cat. r152 centered 16px below canvas center gives real ears (tips at 203.1 from center) while keeping every shape inside the safe zone.
- **PNG metadata hygiene as a committed pipeline step:** Inkscape 1.4.4 unconditionally stamps exports with `tEXt Software\0www.inkscape.org` and offers no suppression flag. `tools/strip-png-meta.cjs` drops only ancillary metadata chunks (tEXt/iTXt/zTXt/eXIf) - IHDR dimensions and IDAT pixel data are untouched (re-verified post-strip) - so the "never hand-resize or pixel-edit" rule holds. Committed so any future art change reproduces the full pipeline: 4 Inkscape exports + strip.
- **Verify payloads strengthened, never weakened:** Task 3's check adds byte-equality (passthrough), `lang: de`, the exact three-tuple icon set, a sizes-vs-real-pixels cross-check, and an icons-src leak check beyond the plan's literal assertions; Task 1's check requires the xmlns identifier and tests fetchable references instead of raw `http://` substrings.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] Task 1 verify literal contradicts its own mandated xmlns**
- **Found during:** Task 1 (first verify design)
- **Issue:** The plan's automated check rejects any `http://` substring, while the action mandates `xmlns="http://www.w3.org/2000/svg"` - a standalone SVG without that namespace does not render in browsers, so the two plan elements cannot both hold
- **Fix:** Require the xmlns identifier and reject *fetchable* external references instead (`<image`, `<use`, `xlink:href`, `url(`, `@import`, `<script`, any `href=`) - strictly stronger for the plan's actual intent ("self-contained, no fonts, no raster embeds")
- **Files modified:** none (verification tooling only)
- **Verification:** all three SVGs pass the refined check
- **Committed in:** n/a (temp verify script; repo unchanged)

**2. [Rule 2 + Rule 3 - Blocking] Inkscape's unconditional tEXt metadata stamp in shipped binaries**
- **Found during:** Task 2 (metadata-hygiene chunk scan)
- **Issue:** All four PNGs carried `tEXt Software\0www.inkscape.org`; Inkscape 1.4 CLI has no flag to suppress it. The threat register dispositions T-03-03 (metadata in shipped public-repo binaries) as `mitigate`, and the strengthened gate failed
- **Fix:** Added `tools/strip-png-meta.cjs` (strips only tEXt/iTXt/zTXt/eXIf chunks, never IHDR/IDAT), ran it on all four PNGs, re-verified dimensions byte-exact post-strip
- **Files modified:** tools/strip-png-meta.cjs (new) + the four PNGs (metadata chunks removed, pixels untouched)
- **Verification:** `OK png dims` with clean chunk sets on all four files
- **Committed in:** 3e98ea5

**3. [Rule 3 - Blocking] PowerShell range-operator parsing corrupted the ledger measurement**
- **Found during:** close-out measurement
- **Issue:** `$LEDGER..HEAD` in a native-command argument was mangled by PowerShell's `..` range parsing (`Get-Content` returned a String, so `$L[0]` indexed its first character) - a rev-list count of 0 was reported falsely
- **Fix:** Brace-quoted `"${L}..HEAD"` refs; re-measured: 3 commits from ledger `fff19b2` to `c64ce15`
- **Files modified:** none (tooling only)
- **Committed in:** n/a

---

**Total deviations:** 3 auto-fixed (none touched planned scope; deviation 2 added one repo file beyond the plan's list)
**Impact on plan:** All shipped deliverables match the plan exactly; the icon set, manifest and head wiring are as specified. No scope creep beyond the one justified pipeline script.

## Issues Encountered

- Inkscape 1.4.4 adds a `tEXt Software` chunk to every PNG export with no CLI suppression flag - handled by the committed strip step (Deviation 2).
- The plan's literal `node -e` verify payloads cannot run through PowerShell 5.1 (embedded-quote mangling, D-12 class) - all three verify payloads ran byte-identical from temp script files, per the established 01-01/01-02 pattern.
- Interim `/themen/` topic-card dead-ends remain open (Phases 2/3) - unchanged, tracked in `.planning/WINDOWS.md` entry 1.
- The end-of-phase human check (A8) - opening icon-maskable.svg and the favicon at actual size in a browser - is carried to phase close-out (coverage D7); the safe-zone math and the 32px simplification are machine-proven in the meantime.

## Known Stubs

None - every created file is complete: the three SVGs are full art, the four PNGs are real rasters, the manifest is the complete locked member set, and the strip script is functional (ran this session). No placeholders, no empty data sources, no TODOs in shipped files.

## User Setup Required

None - the icon pipeline is entirely local (Inkscape already installed); no accounts, keys, or external services are involved (D-13).

## Next Phase Readiness

- Plan 01-04 (deploy): `_site/` now ships `manifest.webmanifest` + all six icons; the relative manifest needs **no change** whether the repo is named `handychecker` (current `pathPrefix`) or deployed at a root. 01-04 adds the Actions workflow, repo creation, and the live-URL installability re-check (Lighthouse/DevTools manifest panel on the real phone).
- The install path is proven at the member level before the first deploy (plan gate); the live-URL check is the remaining half of success criterion 4.
- Zero-host gate extended this plan to `.webmanifest`/`.svg` - future plans must keep it green over the enlarged scope.
- REQUIREMENTS.md: PWA-01 marking deferred by the shared-ID gate (also declared by plan 01-04); plan-level completion recorded in this SUMMARY's `requirements-completed`.

---
*Phase: 01-foundation-shell-pwa-identity-first-deploy*
*Completed: 2026-09-28*