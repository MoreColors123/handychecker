---
status: testing
phase: 02-interactive-widgets-reference-topic-voice-spec
source: [02-VERIFICATION.md]
started: 2026-10-01T15:30:00Z
updated: 2026-10-01T15:30:00Z
---

## Current Test

number: 1
name: Guided linear flow + self-check (Start button, one question at a time)
expected: |
  Open https://morecolors123.github.io/handychecker/themen/bildschirmzeit/ on her phone: the page starts with Happi's intro and each section appears step by step via a "Weiter" button (facts → quiz → tips → balance → topic cards at the very end). The quiz begins only after tapping the Start button ("Los geht's!"); questions come one at a time — tap an answer, Happi's reflection appears INSTANTLY, then "Weiter" leads on. Nothing is scored, ranked, or judged; options feel like HER life (45-min deal, varies daily, music exempt). Works unaided.
awaiting: user response

## Tests

### 1. Guided linear flow + self-check (Start button, one question at a time)
expected: Open https://morecolors123.github.io/handychecker/themen/bildschirmzeit/ on her phone — page reveals step by step via "Weiter" (intro → facts → quiz → tips → balance → topic cards last); quiz gated behind a Start button; questions one at a time — tap an answer, reflection appears instantly, "Weiter" leads on; never scored; options feel like her life (45-min deal, music exempt); completable unaided
result: [pending]

### 2. Copy tone: Happi sounds like a warm guide, never a lecture (SC3 + CR-01/WR-01 rewrites)
expected: Read the reference topic as if you were 10–12: Happi speaks as "ich" and feels warm/curious — no commands ("Leg/Lass/Probier" imperatives are gone, tips are invitations like "Eine Idee von mir: …"), no praising/judging of answers, no fear. The tips feel doable-today. (This is the human confirmation the fixer flagged.)
result: [pending]

### 3. Happi visible everywhere (D-11/D-12 + visual quality)
expected: Home page shows a Happi illustration; the Bildschirmzeit page shows one; EVERY page (incl. legal pages and 404) shows a small Happi mark in the header — the cat is recognizable and cute at hero size, the mark reads clean at 320px width, nothing clipped
result: [pending]

### 4. Weiter-path + stub honesty (SC4 + WR-04)
expected: The topic page's LAST step (after the guided flow) shows the four next-topic cards + "Zurück zur Startseite"; the four stub cards show a "bald" badge (home + topic page) so the promise is honest; tapping a stub card lands on a friendly "kommt bald" stub page with Happi
result: [pending]

### 5. Voice spec + style guide reviewable (SC3)
expected: docs/stimme-und-stil.md exists in the repo with 7 sections, the Verboten/Stattdessen list, and the calibration (30–60 min varies, 45-min family rule, Spotify exempt) — a reviewer can check any future copy against it
result: [pending]

## Summary

total: 5
passed: 0
issues: 0
pending: 5
skipped: 0
blocked: 0

## Gaps