# Phase 1: Foundation Shell, PWA Identity & First Deploy - Context

**Gathered:** 2026-09-28
**Status:** Ready for planning

<domain>
## Phase Boundary

This phase delivers the **installable foundation shell** of HandyChecker — the skeleton everything else renders inside. Concretely: the Eleventy project structure; design tokens + base CSS; the German mobile-first home page listing all five topic areas as tappable cards; the PWA identity (web manifest, full icon set, iOS meta tags, in-app "Start/Zurück" affordance); the Impressum + kindgerechte Datenschutzerklärung pages; and the **first public deploy** to a free static host with automatic HTTPS, so installability can be validated on the real phone.

Scoped requirements: **PWA-01, PWA-02, LEGAL-01, LEGAL-02, PRIV-01**.
</domain>

<decisions>
## Implementation Decisions

### Naming & Online Identity
- **D-01:** Site name is **HandyChecker** (user-approved; replaces the working-title status). — **Reversibility:** costly — renaming later means updating manifest/title/meta on a published URL, but is not contract-breaking pre-launch.
- **D-02:** **No paid domain.** The site lives at the free host's default address (GitHub Pages / equivalent free HTTPS URL). Custom `.de` domain explicitly declined (≈10 €/yr not justified). — **Reversibility:** reversible — a short domain can be added later via DNS.

### Guide / Mascot
- **D-03:** The friendly guide is **Happi, a ginger cat** 🧡 — the single narrative anchor across all pages and copy. The cat is the "friendly guide, not a parent" voice embodiment (research: kids engage when the message does not come from parents).
- **D-04:** All user-facing copy speaks through/with the guide persona — never a lecture or fear tone. Voice spec (VOICE-01) is Phase 2's job, but the mascot identity is locked now so Phase 1's shell (tokens, home page, favicon/manifest icon motif) matches it.

### Look & Feel
- **D-05:** Overall mood: **warm & cozy** — warm, friendly palette, rounded shapes, slightly playful, non-clinical, non-scary (fits "ginger cat" accents). Distinctly NOT a bright game-style or a cold minimal look.
- **D-06:** **Light theme only — no dark/night mode.** The user's reasoning: *no smartphone is allowed in bed*. This also simplifies the design-token set in Phase 1. (The parent explicitly decided no night reading.)
- **D-07:** Palette direction: warm tones echoing the ginger cat (oranges/peaches/cream) with a warm accent for Happi. Design tokens are Phase 1 deliverables — the planner should derive a small, warm, kid-friendly token set from this direction.

### Hosting & Privacy
- **D-08:** **Public source is fine** — the user accepts GitHub Pages' public-repo model (source world-readable). Privacy concern about the child's site being on a public repo was discussed (research Pitfall 10) and consciously accepted by the owner. — **Reversibility:** reversible pre-launch — host/repo-visibility can change before the first share.
- **D-09:** Hosting: free static host with automatic HTTPS (GitHub Pages primary, matching the public-source acceptance; Cloudflare Pages as alternative). No accounts, no data collection, no backend — zero-data rule (PRIV-01) is a hard architectural constraint this phase must establish.
- **D-10:** Legal pages carry **only the parent's minimal data** (Impressum §5 DDG), never the child's; the Datenschutzerklärung is kindgerecht ("hier wird nichts gespeichert – die Seite kann das nicht") plus a short parent note. Launch gate: live before the first public URL is shared.

### Security / Workflow Carried-Forward Constraints
- **D-13:** Secrets: none exist by design (static site, no backend). No API keys or tokens are stored in the repo or planning docs.

### the agent's Discretion
- **D-11:** [informational — orchestration-session constraint, not a build decision; no plan task implements this] Subagent spawns must **omit `model=`** — `anthropic/claude-sonnet-5` is unavailable in this runtime; inherited model works (researchers succeeded without it).
- **D-12:** [informational — orchestration-session constraint, not a build decision; no plan task implements this] Windows shell mangles embedded `"` in gsd-tools JSON args — pass config JSON via stdin or a Node spawn wrapper, never as a quoted shell argument.
- Mascot illustration style and exact color hexes (planner/researcher discretion within "warm & cozy + ginger cat").
- Host choice finalization (GitHub Pages vs Cloudflare) — user accepted either; default GitHub Pages unless planning finds a reason to prefer Cloudflare.
- Home page layout detail (cards grid etc.) — standard pattern, planner discretion.

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Phase definition & requirements
- `.planning/ROADMAP.md` § Phase 1 — Goal, Mode, success criteria, UI hint (must preserve)
- `.planning/REQUIREMENTS.md` — PWA-01, PWA-02, LEGAL-01, LEGAL-02, PRIV-01 (the phase's scope)

### Research (stack & pitfalls)
- `.planning/research/STACK.md` — Eleventy 3.1.6, PWA manifest checklist (192/512 icons, start_url, display, prefer_related_applications:false), iOS meta, system-fonts GDPR rule, hosting comparison
- `.planning/research/SUMMARY.md` § Phase 1 — foundation-shell rationale, PWA identity as Phase 1 deliverable, no-SW default
- `.planning/research/ARCHITECTURE.md` — component boundaries, `themen/<slug>/` structure, tokens.css/site.css, install page
- `.planning/research/FEATURES.md` — home-screen app feel + zero-data foundation + Impressum/Datenschutz as P1 launch gate
- `.planning/research/PITFALLS.md` #7 Install page, #8 manifest/icons as tested deliverable, #10 host privacy, #11 Impressum + zero-tracking rule

### Project constraints
- `.planning/PROJECT.md` — Core Value, Constraints (German, 10–12, privacy, free static host, small scope)

No external specs — requirements fully captured in decisions above.
</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- None yet — greenfield repo (only `.planning/` docs and `AGENTS.md` exist). No code to reuse.

### Established Patterns
- Research pattern set (not code): `tokens.css` + `site.css` design tokens; `themen/<slug>/index.html` per-topic URL structure; progressive enhancement; data-in-HTML/generic-JS. Eleventy 3.1.6 chosen over plain HTML (STACK-vs-ARCHITECTURE gap resolved toward Eleventy in SUMMARY.md).

### Integration Points
- First deploy pipeline → free static host (GitHub Pages primary; private-repo alternative Cloudflare if planning flags it).
- Manifest + icon set must be served from first deploy so installability is testable on the real Android phone immediately.

</code_context>

<specifics>
## Specific Ideas

- The home page lists **five** topic cards (social media topic is deferred to v2 — recent requirement change, see REQUIREMENTS.md SOCL-01).
- **Happi the ginger cat** should appear in the icon set / favicon motif where feasible so the home-screen icon already reflects the guide.
- "Start/Zurück" in-app navigation is mandatory for standalone/installable mode (no browser chrome — research Pitfall 12).
- Impressum carries parent's data only; Datenschutz says "nothing is stored" — must be literally true (zero third-party requests).
- Target device is **Android** (user confirmed) — the install-path priority is Android Chrome add-to-home-screen/manifest install; iOS is secondary/best-effort.

</specifics>

<deferred>
## Deferred Ideas

- **No paid domain** — declined by user; could be added later (DNS) if she shares it widely.
- **Dark/night theme** — explicitly deferred/declined: no phone in bed. Not a v2 item either unless habits change.
- **OG meta tags / messenger share previews** — Phase 4 (shareability polish), not Phase 1.
- **Service worker / offline** — Phase 4 decision (default no-SW in v1 unless Android Chrome automatic prompt wanted).
- **Missions, certificate, family contract, share cards, myth-busters, social-media topic** — v2 backlog (already in REQUIREMENTS.md).

None — discussion stayed within phase scope; deferred items are the documented v2 backlog.

</deferred>

---

*Phase: 1-Foundation Shell, PWA Identity & First Deploy*
*Context gathered: 2026-09-28*