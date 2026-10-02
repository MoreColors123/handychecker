---
status: testing
phase: 02-interactive-widgets-reference-topic-voice-spec
source: [02-VERIFICATION.md]
started: 2026-10-01T15:30:00Z
updated: 2026-10-01T15:30:00Z
---

## Current Test

number: 1
name: Guided flow (facts page → Start-gated linear quiz)
expected: |
  Open https://morecolors123.github.io/handychecker/themen/bildschirmzeit/ on her phone: tapping the topic card leads DIRECTLY to the facts page — all three facts on ONE page ending with "Wie ist das bei dir?" (no intermediate landing step). The quiz starts only via "Los geht's!" and opens as its OWN page; questions come one at a time — tap an answer, Happi's reflection appears INSTANTLY and the choice locks (other options disabled), "Weiter" leads on. Tips and balance follow step by step; topic cards appear at the very end. Nothing is scored, ranked, or judged. Works unaided.
awaiting: user response

## Tests

### 1. Guided flow (facts page → Start-gated linear quiz)
expected: Open https://morecolors123.github.io/handychecker/themen/bildschirmzeit/ on her phone — tapping the topic card leads DIRECTLY to the facts page: all three facts on one page ending with "Wie ist das bei dir?" (no landing step); quiz gated behind "Los geht's!" and opens as its OWN page with "Frage x von 3" above each question; tap an answer, reflection appears instantly, choice locks, "Weiter" leads on (button only appears after answering); tips → balance step by step; topic cards last; never scored; completable unaided; radio + text stay on one row on narrow screens
result: [pending]

### 2. Copy tone: Happi sounds like a warm guide, never a lecture (SC3 + CR-01/WR-01 rewrites)
expected: Read the reference topic as if you were 10–12: Happi speaks as "ich" and feels warm/curious — no commands ("Leg/Lass/Probier" imperatives are gone, tips are invitations like "Eine Idee von mir: …"), no praising/judging of answers, no fear. The tips feel doable-today. (This is the human confirmation the fixer flagged.)
result: [pending]

### 3. Happi visible (start + overview heroes, header mark elsewhere)
expected: The start page and the topics overview show the big Happi illustration; every page EXCEPT the topics overview shows a small Happi mark in the header (on the overview the big icon sits right below instead); the cat is recognizable and cute at hero size, the mark reads clean at 320px width, nothing clipped
result: [pending]

### 4. Weiter-path + stub honesty (SC4 + WR-04)
expected: The topic page's LAST step (after the guided flow) shows the four next-topic cards + "Zurück zur Startseite"; the four stub cards show a "bald" badge (topics overview + topic page) so the promise is honest; tapping a stub card lands on a friendly "kommt bald" stub page with Happi
result: [pending]

### 6. Two-step entry: start page → topics overview
expected: Opening https://morecolors123.github.io/handychecker/ shows ONLY Happi's icon + the greeting ("Hier wächst Schritt für Schritt… Nichts wird gespeichert: Diese Seite kann das gar nicht.") + a compact "Start" button (fits its text, not stretched); tapping it leads to the topics overview at /themen/ with Happi's big icon, the "kribbelig im Kopf" greeting (NO "Ich bin Happi" heading) ending in "Welches Thema möchtest du zuerst anschauen?", a small ← arrow back in the header, and the topic cards (4 of them with "bald" badges)
result: [pending]

### 5. Voice spec + style guide reviewable (SC3)
expected: docs/stimme-und-stil.md exists in the repo with 7 sections, the Verboten/Stattdessen list, and the calibration (30–60 min varies, 45-min family rule, Spotify exempt) — a reviewer can check any future copy against it
result: [pending]

## Summary

total: 6
passed: 0
issues: 0
pending: 6
skipped: 0
blocked: 0

## Gaps