# Phase 1: Foundation Shell, PWA Identity & First Deploy - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-09-28
**Phase:** 1-Foundation Shell, PWA Identity & First Deploy
**Areas discussed:** Name & address, The mascot / guide, Look & feel, Hosting & privacy

---

## Name & Address

| Option | Description | Selected |
|--------|-------------|----------|
| HandyChecker is fine | Keep the working title the research has been using | |
| Let me name it | Provide a different name | |
| Ask her / decide later | Joint decision with daughter | |

**User's choice:** User first chose "Let me name it", then in a follow-up free-text decision settled: *"i won't pay for a domain here. let's call the site 'HandyChecker' anyway."*

**Notes:** Working title confirmed as final name. Free address only — no paid domain. This keeps the host's free HTTPS URL (GitHub Pages fits the public-source acceptance).

---

## The Mascot / Guide

| Option | Description | Selected |
|--------|-------------|----------|
| An animal | Friendly animal — warm, familiar, easy to draw | ✓ |
| A robot / gadget | Friendly gadget — fits smartphone topic | |
| Symbol only | Clean symbol, no character | |
| Something else | User's own idea | |

**User's choice:** An animal, then specifically **Cat**, then the free-text decision: *"The cat's name is 'Happi' and it is a ginger cat."*

**Notes:** Guide identity = Happi, a ginger cat. This is the friendly-guide persona anchor for the whole site (research: kids engage when the message doesn't come from parents). Mascot motif should appear in the Phase 1 icon set/favicon where feasible.

---

## Look & Feel

| Option | Description | Selected |
|--------|-------------|----------|
| Warm & cozy (Recommended) | Soft colors, rounded shapes, slightly playful | ✓ |
| Calm & minimal | Clean, gentle, tidy | |
| Bright & fun | Bold, bouncy, game-like | |

**User's choice:** Warm & cozy. Palette direction: warm ginger-cat tones (oranges/peaches/cream).

Then — night mode question:

| Option | Description | Selected |
|--------|-------------|----------|
| Both, day + night | Light warm + soft dark night theme | |
| Light only | One warm light theme, simple | ✓ |
| Dark first | Dark default for night reading | |

**User's choice:** **Light only**, with the rationale: *"light only, because there is no smartphone allowed in bed"*.

**Notes:** No dark/night theme at all — simplifies the Phase 1 design-token set; also models the "phone sleeps elsewhere" habit the site teaches.

---

## Hosting & Privacy

| Option | Description | Selected |
|--------|-------------|----------|
| Private source (Recommended) | Netlify/Cloudflare, source private | |
| Public source is fine | GitHub Pages — simplest, source public | ✓ |
| Explain more | Understand the tradeoff first | |

**User's choice:** **Public source is fine** — GitHub Pages' public-repo model is acceptable (the research's Pitfall 10 was discussed; the owner consciously accepted it).

**Notes:** Free static host with automatic HTTPS; GitHub Pages primary. Legal pages: parent's minimal data in Impressum only, never the child's; kindgerechte Datenschutzerklärung ("hier wird nichts gespeichert – die Seite kann das nicht") + short parent note. No secrets exist by design.

---

## Security / Workflow Constraints (carried forward from project handoff)

The session's security review (per the discussion workflow's mandatory layer) confirmed and carried these constraints into the phase:

| Item | Status |
|------|--------|
| Subagent `model=` | Must be omitted — `anthropic/claude-sonnet-5` unavailable in this runtime; inherited model validated |
| Secrets / API keys | None exist — static site, zero backend, no tokens in repo or planning docs |
| Planning-doc integrity | All writes via `gsd_run query commit` with explicit file lists; `.planning/` consistent |
| Windows shell quoting | JSON with embedded `"` must go via stdin or Node spawn wrapper, never a quoted shell arg |

---

## the agent's Discretion

- Mascot illustration style and exact color hexes (within "warm & cozy + ginger cat")
- Host finalization (GitHub Pages default vs Cloudflare) — either is acceptable to the user
- Home page layout detail (cards grid etc.) — standard pattern, planner discretion

## Deferred Ideas

- No paid domain — declined; can be added later via DNS if she shares it widely
- Dark/night theme — declined (no phone in bed); not a v2 item
- OG meta tags / share previews — Phase 4
- Service worker / offline — Phase 4 decision (default no-SW in v1)
- Missions, certificate, family contract, share cards, myth-busters, social-media topic — v2 backlog (in REQUIREMENTS.md)