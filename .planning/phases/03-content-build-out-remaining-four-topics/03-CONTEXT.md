# Phase 3: Content Build-Out - Remaining Four Topics - Context

**Gathered:** 2026-10-02
**Status:** Ready for planning

<domain>
## Phase Boundary

Fill the four remaining v1 topics with complete, source-backed German kid content: **Schlaf, Aufmerksamkeit & Fokus, Körper (Haltung/Augen), Datenschutz & Daten**. Each topic follows the facts-first pattern proven in Phase 2 (Bildschirmzeit & Balance): facts → self-check questions → tips → balance section, all in Happi's voice, all calibrated to the girl's ACTUAL life. The technical layer is DONE (template renders every topic from `src/_data/topics.json`; guided flow, quiz engine, voice gate all built) — this phase is content work at scale, not widget work.

</domain>

<decisions>
## Implementation Decisions

### Kalibrierung: Schlaf (user answers 2026-10-02)
- **D-01:** Das Handy schläft nachts AUSSERHALB ihres Zimmers (Familienregel, schon etabliert). — Die Schlaf-Seite validiert diese Regel ("Das klappt bei dir schon — weißt du, warum das so gut ist?") statt sie zu fordern.
- **D-02:** Einschlafzeit ist IMMER fest (auch am Wochenende). — Fakten dürfen feste Rhythmen erwähnen, aber als bereits vorhandene Stärke, nicht als Anweisung.
- **D-03:** Handy-vorm-Schlafen ist KEIN Thema für sie: sie hat das Handy vor dem Schlafen und nachts NICHT dabei (wörtlich: "das ist nicht relevant, das handy hat sie nicht dabei, und vor dem schlafengehen auch nicht"). — VERBOTEN: der Klassiker "kein Handy vorm Einschlafen" als Handlungsaufforderung, Quizfragen über eine Realität, die sie nicht hat (z. B. "Wie lange scrollst du nachts?"). Der Inhalt erzählt stattdessen WARUM Schlaf wichtig ist + warum die Familienregel eine gute ist, von der sie schon profitiert.

### Kalibrierung: Aufmerksamkeit & Fokus
- **D-04:** Bei HAUSAUFGABEN ist das Handy weg bis fertig (schon etabliert). — Das Thema validiert diese Gewohnheit + erklärt Fakten (Konzentration braucht Pausen; Mitteilungen unterbrechen). Tipps dürfen NICHT neu beibringen, was sie schon macht — Tipps zielen auf Nachbarn (z. B. kurze Pause-Idee, wenn sie an eine Wand stößt).

### Kalibrierung: Körper
- **D-05:** Keine bekannten Beschwerden (Augen/Hals/Kopfschmerzen nicht bekannt). — Inhalt bleibt hedged ("kann dazu führen"); die Quizfragen fragen nach GEFÜHL ("Wie fühlen sich deine Augen an?"), nicht nach Verhalten, das es vielleicht gar nicht gibt.

### Kalibrierung: Datenschutz & Daten
- **D-06:** Sie nutzt wirklich: Spotify, Maps, Signal (überwiegend), Google mit safesearch, Wikipedia. Kein soziales Netzwerk, kein YouTube-Kanal-Betrieb. — Das Thema wird konkret auf DIESEN Apps aufgebaut: Maps kennt den Weg (und den Ort), Spotify kennt den Geschmack, Signal speichert absichtlich fast nichts, Wikipedia sammelt kaum. Neugier statt Angst: "Apps geben dir etwas — und wissen dafür etwas von dir. Manche speichern fast nichts. Das ist der Unterschied." Kein Warn-Ton, keine Internet-Gefahren-Geschichten.

### Umfang (alle vier Themen)
- **D-07:** Referenzformat für ALLE vier Themen — exakt das Format des Referenzthemas Bildschirmzeit & Balance: 3 Fakten (je 2–3 Sätze, max. eine Zahl pro Abschnitt), 3 Quizfragen (je 3 Optionen mit Beobachtungs-Reflexionen, nie bewertend), 2 Tipps (Happi-Einladungen "Eine Idee von mir: …", 1–2 kleine heute-machbare Soloschritte, keine Wiederholung dessen, was sie schon macht), 1 Balance-Abschnitt ("Was ist daran eigentlich gut?").

### Selbstcheck-Mechanik (aus Phase 2 übernommen, unverändert)
- **D-08:** Quiz-Fragen kalibriert auf ihr Leben (wie das 45-Min-Deal bei Bildschirmzeit), Antworten = Optionen, die sich für sie richtig anfühlen; Reflexionen sind beobachtend ("Das kennen viele Kinder so…"), NIE bewertend/preisend; nie ein Ergebnis/Score.

### the agent's Discretion
- **Quellen-Sichtbarkeit (vom User nicht diskutiert gewählt):** CONT-03 verlangt quellenbasierte Fakten (AAP, Mayo, Schlaf-Forschung). Die Quellen steuern die FORMULIERUNG beim Schreiben (abgesichert, korrekt), erscheinen aber NICHT als Quellennamen auf der Kind-Seite. Ggf. "Kinderärzte sagen…" als natürliche Erwähnung erlaubt; keine Fußzeilen mit Zitaten.
- **Quizfrage-Themen pro Fach:** Der Agent wählt die konkreten 3 Fragen pro Thema aus den Kalibrierungs-Fakten (D-01..D-06) — Muster des Referenzthemas: 1 Frage zum Kern-Verhalten, 1 zum Fühlen, 1 offen/relativierend.
- **Reihenfolge der Themen auf der Übersichtsseite:** bleibt wie in topics.json; der Agent darf die JSON-Reihenfolge so lassen (Schlaf, Aufmerksamkeit, Körper, Datenschutz).

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Voice & copy rules (verbindlich für JEDE Zeile Content)
- `docs/stimme-und-stil.md` — Happi-Stimme: "ich" zu "du", keine Imperative, kein Urteil/Preis, keine Angst; Verboten/Stattdessen-Liste; Checkliste

### Muster & Kalibrierung (Referenzthema)
- `src/_data/topics.json` — Bildschirmzeit & Balance ist DAS Format-Muster (Fakten/Quiz/Tipps/Balance-Struktur, Ton, Kalibrierung); die vier neuen Themen ergänzen dieselbe JSON-Struktur
- `.planning/phases/02-interactive-widgets-reference-topic-voice-spec/02-CONTEXT.md` — Phase-2-Entscheidungen D-01..D-12 (Selbstcheck-Mechanik, Tipps-Stil, Kalibrierungs-Quelle 45-Min-Deal/Musik-ausgenommen)

### Phase-Scope & Anforderungen
- `.planning/ROADMAP.md` § "Phase 3: Content Build-Out - Remaining Four Topics" — Goal, Success Criteria (CONT-01..04), Mode mvp
- `.planning/REQUIREMENTS.md` § Content (CONT) — CONT-01..CONT-04 wörtlich

### Technischer Rahmen (fertig gebaut — nicht neu bauen)
- `src/themen.njk` — Template: rendert JEDEN Topic aus JSON (facts → selfcheck → tips → balance → topic-cards);guided-flow-Schritte; neue Themen brauchen KEIN Template-Editing
- `src/js/app.js` — Quiz-Engine: Start-Gate, eine Frage nach der anderen, "Frage x von N" über der Frage, Antwort-Sperre; funktioniert mit beliebig vielen Fragen pro Thema
- `docs/stimme-und-stil.md` Checkliste + `npm run check:voice` — Maschinen-Gate, muss nach jeder Content-Änderung grün sein

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `src/_data/topics.json` (bare array): neue Themen = neue JSON-Objekte mit `slug`, `title`, `facts[]`, `selfcheck.questions[]`, `tips[]`, `balance` — Template rendert automatisch; `intro`-Feld wird auf Themenseiten NICHT mehr gerendert (Happi-Begrüßung lebt auf der Übersichtsseite)
- Slugs existieren bereits: `schlaf`, `aufmerksamkeit`, `koerper`, `datenschutz` (jetzt "kommt bald"-Stubs; sie verschwinden automatisch, sobald `facts` gesetzt ist)
- `src/_includes/happi-illus.svg` + Header-Mark: erscheinen automatisch; keine Bild-Arbeit nötig

### Established Patterns
- Referenzthema Ton: Happi "ich" → Kind "du"; Reflexionen beobachtend; Tipps als "Eine Idee von mir: …"; Balance-Abschnitt kontert Einseitigkeit ("Handys sind nicht nur schlecht…", Musik-Ausnahme)
- Musik/Spotify ist von der Bildschirmzeit ausgenommen — in Datenschutz/Fokus-Themen darf darauf verwiesen werden (ihre Realität)
- Fakten-Muster: max. eine Zahl pro Abschnitt; Korrelationen gehedged ("kann dazu führen"); nie "du bist süchtig"

### Integration Points
- Neue JSON-Einträge → 4 neue `/themen/<slug>/`-Seiten verschwinden aus den "bald"-Badges automatisch; Übersichtsseite + Karten aktualisieren sich selbst
- `npm run check:voice` muss nach dem Content-Schreiben grün sein (Imperativ-Scan + Verbotene Konstruktionen)

</code_context>

<specifics>
## Specific Ideas

- Schlaf-Seite als "Deine Familienregel ist eine gute"-Erzählung — selten bei Kinder-Inhalten, aber exakt ihre Realität (D-01..D-03)
- Datenschutz-Seite mit ihren echten Apps (Maps/Spotify/Signal/Wikipedia) als Beispiele — konkret, neugierig, ohne Gefahren-Erzählung (D-06)
- Fokus-Seite: Pausen als Idee einführen (sie hat die Handy-Disziplin schon) — z. B. "Wenn du an eine Wand stößt: kurze Pause, dann weiter" statt "Handy weglegen" (das macht sie schon)

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 03-Content Build-Out - Remaining Four Topics*
*Context gathered: 2026-10-02*
