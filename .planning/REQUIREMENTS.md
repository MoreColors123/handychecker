# Requirements: HandyChecker

**Defined:** 2026-09-28
**Core Value:** Das HandyChecker macht die Gefahren von zu viel Smartphone-Nutzung für ein Kind (10–12) verständlich und fühlbar — und lässt sie dabei gestärkt zurück, eigene gesündere Entscheidungen zu treffen (nicht verängstigt oder belehrt).

## v1 Requirements

Anforderungen für den ersten Launch. Jede Anforderung mappt auf Roadmap-Phasen.

### Inhalt (CONT)

- [ ] **CONT-01**: Die Website bietet Kind-gerechte deutsche Inhalte zu den fünf Themenbereichen – Bildschirmzeit & Balance, Schlaf, Aufmerksamkeit & Fokus, Körper (Haltung/Augen), Datenschutz & Daten
- [ ] **CONT-02**: Jedes Thema folgt dem Muster „Fakten zuerst, kurze Abschnitte" – 2–3 Sätze pro Idee, maximal eine Zahl pro Abschnitt, keine Textwände
- [ ] **CONT-03**: Fakten pro Thema sind quellenbasiert (pädiatrische Quellen wie AAP/Mayo/Schlaf-Forschung), abgesicherte und Relativierungs-Hedging bei Korrelationsaussagen
- [ ] **CONT-04**: Jedes Thema enthält einen Balance-Abschnitt („Was ist daran eigentlich gut?") gegen einseitige Anti-Handy-Botschaften

### Selbstcheck (SELF)

- [x] **SELF-01**: Wiederverwendbarer Selbstcheck pro Thema („Wie ist das bei dir?") – beschreibende Antwortoptionen, nie bewertet, nie beschämend, rein clientseitig

### Tipps (TIPS)

- [x] **TIPS-01**: „Was kann ich tun?"-Tipp-Box auf jedem Thema – 1–3 konkrete, machbare Aktionen (z. B. „Handy schläft in der Küche"), Efficacy vor Fakten

### PWA / App-Gefühl (PWA)

- [x] **PWA-01**: Home-Screen-App-Gefühl – Web-App-Manifest + vollständiges Icon-Set (192/512 PNG, maskable SVG, apple-touch-icon 180×180, Favicon) + iOS-Meta-Tags; ohne App-Store installierbar
- [x] **PWA-02**: Mobile-first, responsives Layout mit großen Tap-Zielen (≥48 px) und gut lesbarer Schrift auf kleinen Bildschirmen

### Recht (LEGAL)

- [x] **LEGAL-01**: Impressum-Seite (mit §5-DDG-konformem Impressum; Eltern-Daten, nie Kind-Daten)
- [x] **LEGAL-02**: Kindgerechte Datenschutzerklärung („hier wird nichts gespeichert – die Seite kann das nicht") + kurzer Eltern-Hinweis; Launch-Gate vor dem ersten öffentlichen URL

### Stimme & Stil (VOICE)

- [ ] **VOICE-01**: Friendly-Guide-Persona + Style-Guide (Voice-Spec) werden definiert, BEVOR die Massen-Kopien geschrieben werden – die Anti-Vorlese-Garantie

### Datenschutz-Fundament (PRIV)

- [x] **PRIV-01**: Null Daten – keine Accounts, keine Analysen, keine Tracking-Cookies, keine Drittanbieter-Einbettungen; selbst gehostete Assets (System-/selbst gehostete Schriften); Quiz-Zustand nur in-memory oder localStorage (geräteintern, nie übertragen)

## v2 Requirements

Auf späteren Release verschoben. Verfolgt, aber nicht im aktuellen Roadmap.

### Missionen

- **MISS-01**: Offline-Reality-Missionen („Missionen") pro Thema – einmalige echte Welt-Herausforderungen, keine Streaks/punkte-für-Login

### Zertifikat

- **CERT-01**: „Handy-Profi"-Zertifikat – druckbar nach Abschluss aller sechs Selbstchecks, nur localStorage

### Familienvertrag

- **FAMI-01**: Druckbarer Familien-Medienvertrag + Schlaf-Pakt – kind-initiierte Version, aus bestehenden Inhalten abgeleitet

### Teilen

- **SHAR-01**: Teilen-Karten für Freunde – eine je Thema, Deutsch, über Messenger teilbar

### Mythen

- **MYTH-01**: Mythen-Klärung & Fun-Facts („Stimmt das eigentlich?") pro Thema

### Social Media & Gefühle (deferred topic)

- **SOCL-01**: Thema „Social Media & Gefühle" (Vergleich, FOMO, Likes-Dopamin, Selbstwert) — **deferred**: Tochter hat aktuell noch keinen Zugang zu Sozialen Medien; aufnehmen, sobald das Thema relevant wird (echter Zugang beginnt). Content-Pattern (Inhalt → Selbstcheck → Tipp-Box) ist identisch zu den v1-Themen.

## Out of Scope

Ausdrücklich ausgeschlossen. Dokumentiert, um Scope Creep zu verhindern.

| Feature | Grund |
|---------|-------|
| Szenario-Entscheidungsspiele (Social-Thema) | Hohe Komplexität (Multi-Branch); warten bis Kernmuster mit echter Leserin validiert ist |
| „Für Eltern"-Seite | Vertrauensstütze – aber erst nachdem die Kinder-Seite funktioniert; kein Eltern-Dashboard (das wäre ein Anti-Feature) |
| Statisches FAQ / „Frag dich selbst" | Nur aus echten Fragen aufbauen; niemals ein Live-Postfach |
| Accounts / Login / personalisierter Fortschritt | GDPR Art. 8: Unter-16-Zustimmung in DE nicht zulässig; Widerspricht Vertrauensversprechen |
| Analysen / Tracking-Cookies / Werbe-Netzwerke | Jedwede Erfassung eines Kindes widerspricht dem Zweck |
| Kommentare / Chat / UGC | Braucht Backend + Moderation; Kindersicherheits-Risiko |
| Engagement-Gamification (Streaks, Benachrichtigungen, Punkte) | Heuchelei gegen die eigene Botschaft; erhöht die Bildschirmzeit |
| Angst-Kommunikation („Handy macht süchtig!") | Fear Appeal ohne Efficacy erzeugt Avoidance; Kinder verwerfen Übertreibungen |
| Diagnose-Selbstchecks („Bist du schon süchtig?") | Selbstbild-Schaden bei 10–12-Jährigen; faktisch falsch |
| Eltern-Vorleseton / Bewertende Quizzes | Der Kind-Verschließt-die-Seite-Faktor |
| Drittanbieter-Einbettungen (YouTube, Google Fonts, Social-Buttons) | Jede Einbettung ist eine Datenerfassungs-Pipeline vom Kind-Gerät (LG München: DSGVO-Verstoß) |
| In-App-Käufe / Sponsoren / Monetarisierung | Ethisch falsch für Gesundheitsbildung eines Kindes; JMStV/COPPA-sensibel |

## Traceability

Welche Phasen welche Anforderungen abdecken. Wird bei der Roadmap-Erstellung aktualisiert.

| Requirement | Phase | Status |
|-------------|-------|--------|
| CONT-01 | Phase 3 | Pending |
| CONT-02 | Phase 3 | Pending |
| CONT-03 | Phase 3 | Pending |
| CONT-04 | Phase 3 | Pending |
| SELF-01 | Phase 2 | Complete |
| TIPS-01 | Phase 2 | Complete |
| PWA-01 | Phase 1 | Complete |
| PWA-02 | Phase 1 | Complete |
| LEGAL-01 | Phase 1 | Complete |
| LEGAL-02 | Phase 1 | Complete |
| VOICE-01 | Phase 2 | Pending |
| PRIV-01 | Phase 1 | Complete |

**Coverage:**
- v1 requirements: 12 total
- Mapped to phases: 12 (Phase 4 is the hardware-verification boundary closing PWA-01/PWA-02/PRIV-01 — see ROADMAP.md Coverage note)
- Unmapped: 0 ✓

---
*Requirements defined: 2026-09-28*
*Last updated: 2026-09-28 after roadmap creation*
