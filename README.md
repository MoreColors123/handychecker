# HandyChecker

> 🔗 **Direktlink / Direct link:** **https://morecolors123.github.io/handychecker/**

---

## Was ist das? (Deutsch)

**HandyChecker** ist eine kleine, deutschsprachige Info-Website für Kinder (10–12 Jahre) zum Thema sinnvoller Smartphone-Umgang. Durch alle Seiten führt **Happi**, die Handy-Katze 🧡 — ein freundlicher Guide, der nie belehrt, nie Angst macht und nie bewertet.

Die Themenseiten sind bewusst wie eine kleine App aufgebaut:

- **Schritt für Schritt:** Die Inhalte erscheinen einzeln per „Weiter"-Knopf — erst die Fakten, dann der Selbstcheck, dann Tipps und eine echte Betrachtung („Was ist daran eigentlich gut?").
- **Selbstcheck mit Startknopf:** Die Fragen („Wie ist das bei dir?") starten bewusst per Knopf und kommen einzeln. Auf eine Antwort hin erscheint sofort eine freundliche Reflexion von Happi.
- **Kein Richtig oder Falsch:** Antworten werden nie bewertet,never scored — es gibt keine Punkte, kein Ergebnis, keine Vergleiche.
- **Themen:** Aktuell ist „Bildschirmzeit & Balance" vollständig ausgebaut; vier weitere Themen (Schlaf, Aufmerksamkeit & Fokus, Körper, Datenschutz & Daten) folgen. Alle Inhalte auf Deutsch.

### Datenschutz

- Keine Accounts, keine Cookies, kein Tracking, keine Analyse-Werkzeuge
- Es wird **nichts dauerhaft gespeichert und nichts gesendet** — auch die Selbstcheck-Antworten nicht (sie leben nur im aktuellen Seitenbesuch). Ein kleiner Marker merkt sich für die Dauer dieses Besuchs, welche Themen schon geschafft sind — beim Schließen des Browsers ist er wieder weg.
- Keine einzigen externen Anfragen (keine CDN-Schriften, keine Dritten) — Systemfonts only
- Die Seite kann wie eine App auf dem Smartphone installiert werden (PWA) und funktioniert nach dem ersten Besuch auch offline

---

## What is this? (English)

**HandyChecker** is a small, German-language information website for kids aged 10–12 about mindful smartphone use. A friendly ginger cat named **Happi** 🧡 guides through every page — a warm companion that never lectures, never scares, and never judges.

The topic pages deliberately feel like a small app:

- **Step by step:** content appears one piece at a time via a „Weiter" (Next) button — facts first, then a self-check, then tips and a genuine counterweight section („What's actually good about it?").
- **Self-check with a start button:** the questions („How is it for you?") begin only after tapping start and appear one at a time. Tapping an answer instantly shows a friendly reflection from Happi.
- **No right or wrong:** answers are never scored — no points, no verdicts, no comparisons.
- **Topics:** „Bildschirmzeit & Balance" (screen time & balance) is fully built out; four more topics (sleep, attention & focus, body, data & privacy) follow. All content is in German.

### Privacy

- No accounts, no cookies, no tracking, no analytics
- **Nothing durable is stored and nothing is sent** — not even self-check answers (they live only in the current visit). A small session-only marker remembers which topics you finished this visit — gone when the browser closes.
- Zero third-party requests (no CDN fonts, no external services) — system fonts only
- Installable on a phone like an app (PWA); works offline after the first visit

---

## Technik / Tech

- Static site built with [Eleventy (11ty)](https://www.11ty.dev/) — plain HTML + one CSS file + a small vanilla-JS enhancer; zero runtime dependencies
- PWA layer: web app manifest + cache-first service worker + maskable icons
- **Deploy:** GitHub Actions (`.github/workflows/deploy.yml`) builds on every push to `main` and publishes the `_site/` output to GitHub Pages
- Voice rulebook: `docs/stimme-und-stil.md` — Happi's German voice & style guide that all copy must follow (no imperatives, no judgment, no fear)

## Entwicklung / Development

Requires Node.js ≥ 18 (22 LTS recommended).

```bash
npm install          # once — Eleventy is the only dependency (dev only)
npm run dev          # local dev server → http://localhost:8080/handychecker/
npm run build        # production build into _site/
npm run check:voice  # machine gate: verifies Happi's friendly-guide voice rules
```

### Struktur / Structure

```
src/                 templates (*.njk), data (_data/topics.json), css/, js/
docs/                stimme-und-stil.md (voice & style guide, German)
scripts/             voice-check.js (copy gate)
.github/workflows/   deploy.yml (GitHub Pages deployment)
```

---

*Ein privates Familienprojekt / A private family project.*