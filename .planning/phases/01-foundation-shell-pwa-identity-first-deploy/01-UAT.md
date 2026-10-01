---
status: testing
phase: 01-foundation-shell-pwa-identity-first-deploy
source: [01-VERIFICATION.md]
started: 2026-10-01T08:20:00Z
updated: 2026-10-01T08:20:00Z
---

## Current Test

number: 1
name: Narrow-viewport check (SC5): no horizontal scroll, cards ≥48px
expected: |
  Open https://morecolors123.github.io/handychecker/ at 320–430 px (her phone or DevTools emulation) and swipe horizontally. No horizontal scrolling; five topic cards tappable, each ≥48×48 px; footer legal links ≥48×48 px.
awaiting: user response

## Tests

### 1. Narrow-viewport check (SC5)
expected: Open the live site at 320–430 px on her phone (or DevTools device emulation at 320/390/430) and swipe horizontally — no horizontal scroll; five topic cards tappable, each ≥48×48 px; footer legal links ≥48×48 px
result: [pending]

### 2. Fresh-browser network tab on her phone (SC3 human half)
expected: Open the live URL in a brand-new browser profile, watch the network tab while loading home + Impressum + Datenschutz — zero requests to any third-party domain (all requests to morecolors123.github.io only)
result: [pending]

### 3. Install prompt on the actual Android device (SC4 human half)
expected: Open the live URL in Android Chrome — Chrome offers install (menu or automatic prompt); manifest panel clean; installed home-screen icon shows the Happi cat (not a gray globe)
result: [pending]

### 4. Icon visual check (A8)
expected: Open the installed home-screen icon (and src/icons/icon-maskable.svg + favicon-32.png at actual size) — the cat is recognizable, nothing clipped out of the safe-zone circle, the 32 px favicon still reads as a cat
result: [pending]

### 5. LEGAL-02 launch gate (owner)
expected: The four Impressum bracket placeholders ([Name der Eltern] / [Straße und Hausnummer] / [PLZ] [Ort] / [E-Mail-Adresse der Eltern]) in src/impressum.njk replaced with real parent data, rebuilt, pushed — URL only shared AFTER this
result: [pending]

## Summary

total: 5
passed: 0
issues: 0
pending: 5
skipped: 0
blocked: 0

## Gaps
