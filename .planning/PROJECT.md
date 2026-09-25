# HandyChecker

## What This Is

A small, German-language information website for a 10–12 year old girl (the owner's daughter) about the dangers of smartphone overuse. She opens it on her smartphone like a home-screen app and learns — through facts, small self-check questions, and practical tip boxes — why mindful phone use matters and what she can do about it. The tone is a friendly guide, never a lecture.

## Core Value

The site must make the dangers of smartphone overuse understandable and relatable to a child (10–12), while leaving her feeling empowered to make her own healthier choices — not scared or lectured.

## Business Context

<!-- OPTIONAL — only for monetized or customer-facing projects. Delete this section otherwise. -->

## Requirements

### Validated

<!-- Shipped and confirmed valuable. -->

(None yet — ship to validate)

### Active

<!-- Current scope. Building toward these. -->

- [ ] Kid-friendly German content on all six danger topics (screen time, sleep, attention, body, social media & feelings, privacy)
- [ ] Works as a home-screen app feel (installable PWA-style) on a smartphone
- [ ] Facts + interactive elements: self-check questions and "what should I do?" tip boxes
- [ ] Friendly-guide voice that informs and encourages without feeling like a lecture
- [ ] German-only content, shareable with friends/classmates
- [ ] Hosted on a free static host with a real URL she can bookmark

### Out of Scope

<!-- Explicit boundaries. Includes reasoning to prevent re-adding. -->

- Multi-language support (English, etc.) — German-only by design; bilingual adds scope without serving the audience
- Personal data collection, accounts, or login — no reason to collect anything from a child
- Complex gamification/backend — a static, honest site fits the goal; no servers or databases
- Content for younger children (6–9) or teens (13+) — the language and tone are tuned to 10–12

## Context

- Built for one child but designed to be shareable with friends/classmates (German-only).
- Domains covered: screen time & balance, sleep, attention & focus, body effects (posture, eyes), social media & feelings (comparison, FOMO, likes-dopamine), privacy & data.
- Tone decision: facts first, gentle encouragement second ("Both, mixed" goal). Voice is a friendly guide, not a parent lecture — important because the owner is the parent.
- Format decision: "Facts + interactive tips" — short sections, small self-check questions, and "what should I do?" tip boxes.
- Delivery decision: installable feel on her phone (home-screen app), hosted on free static hosting (e.g. GitHub Pages / Netlify) behind a real URL.
- For 2026, static-site tooling (e.g. plain HTML/CSS/JS or a lightweight generator) plus a web manifest is sufficient for the "home-screen app" feel — no app stores.

## Constraints

- **Content language**: German — all user-facing copy is German (webpage + interactive texts)
- **Audience**: 10–12 year old — reading level, tone, and design must fit a child, not an adult
- **Privacy**: no data collection, no accounts, no analytics that track the child
- **Hosting**: free static host; the site must be reachable via a normal URL on her phone
- **Scope**: intentionally small — a focused information site, not a platform

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Facts + encouragement (mixed goal) | Inform her AND gently motivate healthier habits | — Pending |
| Focused on age 10–12 | Right depth/level between playful and preachy | — Pending |
| Friendly-guide voice | Avoids "dad lecture" feel for a parent-built site | — Pending |
| Home-screen app feel (PWA-style) | She opens it like an app from her phone | — Pending |
| Free static hosting | Real URL, zero cost, no backend | — Pending |
| German only, shareable | Serves her and friends; avoids multi-language scope | — Pending |

## Evolution

This document evolves at phase transitions and milestone boundaries.

**After each phase transition** (via `/gsd-transition`):
1. Requirements invalidated? → Move to Out of Scope with reason
2. Requirements validated? → Move to Validated with phase reference
3. New requirements emerged? → Add to Active
4. Decisions to log? → Add to Key Decisions
5. "What This Is" still accurate? → Update if drifted

**After each milestone** (via `/gsd-complete-milestone`):
1. Full review of all sections
2. Core Value check — still the right priority?
3. Audit Out of Scope — reasons still valid?
4. Update Context with current state

---
*Last updated: 2026-09-25 after initialization*