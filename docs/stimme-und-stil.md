# Stimme & Stil – so klingt HandyChecker

Diese Datei ist die Stimmen- und Stil-Referenz für alle Texte auf HandyChecker.
Sie liegt absichtlich außerhalb von `src/` – Eleventy serviert sie nie; sie ist für
die Autorin bzw. den Prüfer im Repository gedacht. Jeder Text (Fakten, Selbstcheck,
Tipps) wird vor dem Veröffentlichen hiergegen geprüft.

## Persona: Happi

Happi ist die Handy-Katze und erzählt als Figur in der Ich-Form. Happi duzt die
Leserin und spricht sie direkt als „du" an („Ich hab da mal was ausprobiert…").

- warm, neugierig und humorvoll – ein freundlicher Begleiter, kein Lehrer
- konkrete Alltagsbilder statt abstrakter Statistiken (Küche, Schulranzen, Bett)
- erzählt gern kleine eigene Erlebnisse, auch mal selbstironisch
- niemals von oben herab, nie besserwisserisch

## Abgestufte Sprache

Aussagen werden abgestuft und gehedged formuliert, besonders bei Zusammenhängen.
Keine absoluten Ursachen-Behauptungen, keine Angstmache – „kann dazu führen"
statt „macht". Die folgenden Konstruktionen sind verboten bzw. erlaubt:

### Verboten

- "du bist süchtig"
- "Handy macht krank"
- "zerstört"

### Stattdessen

- "kann dazu führen"
- "das ist ein Zeichen, dass…"
- "viele Kinder kennen das"

## Keine Vorträge

- keine Imperative wie „du sollst" oder „du musst"
- keine Schuld-Frames („weil du …")
- kein Richtig oder Falsch, keine Bewertung
- keine Diagnose-Selbsttests („Bist du süchtig?")
- keine Angst- oder Schreck-Botschaften
- Vorschläge sind Einladungen („Probiere aus…"), keine Befehle

## Aufbau

- Fakten zuerst: erst informieren, dann ermutigen
- 2–3 Sätze pro Idee, kurze Abschnitte, keine Textwände
- maximal eine Zahl pro Abschnitt
- jeder Abschnitt endet handlungsorientiert
- jedes Thema hat einen Balance-Abschnitt („Was ist daran eigentlich gut?")

## Selbstcheck-Antworten

- Antwortoptionen sind beschreibend, nie bewertet
- Reflexionen sind beobachtend und ermutigend („viele Kinder kennen das")
- nie ein Punktestand, Urteil, Ranking oder eine Diagnose
- jede Antwort ist in Ordnung – es gibt kein Richtig oder Falsch
- die Antworten bleiben rein im Gerät (kein Senden, kein Speichern)

## Kalibrierung

Diese Familiendaten sind die feste Grundlage für Antwortoptionen und Tipps. Sie
sind konkret und echt – keine generischen Medienverbands-Bänder.

- Nutzung: 30–60 Minuten pro Tag – und täglich unterschiedlich
- Familien-Regel: 45 Minuten Bildschirmzeit
- Musik (Spotify) ist ausgenommen: „Musik ist was anderes"

Antwortoptionen und Tipps müssen auf diese echten Zahlen zeigen. (Externer Anker
als Kontext: klicksafe nennt 45–60 Minuten pro Tag für 9- bis 12-Jährige – die
Familienzahlen regeln aber.)

## Stepper & Knöpfe

Die Themenseite führt Schritt für Schritt: Intro → Fakten → Selbstcheck → Tipps →
Balance → „Weiter geht's". Die Knöpfe dafür sind die einzigen erlaubten Imperative
und laden nur zum Weitergehen ein – sie fordern nichts und drängen nicht.

Die beiden Knopfbeschriftungen:

- **Weiter** – führt zum nächsten Schritt; innerhalb des Selbstchecks von Frage zu Frage.
- **Los geht's!** – startet den Selbstcheck, bevor die Fragen sichtbar werden.

Weitere feste Textbausteine:

- Fortschritt im Selbstcheck: „Frage x von N" – zählt nur die Fragen und nie eine Leistung.
- Selbstcheck-Einstieg (Gate): „drei Fragen – ganz ohne richtig oder falsch."
  (die Zahl kommt aus der Fragenanzahl; bei vier Fragen steht dort „vier").

Regeln:

- Nur nach vorne einladen, nie drängen – kein Druck, kein Countdown, keine Punkte.
- Der Fortschritt bezieht sich auf die Fragen, nicht auf die Person.
- Keine Antwort wird bewertet; es gibt kein Richtig oder Falsch.
- Diese Bausteine stehen in `src/js/app.js` (nicht in `topics.json`) und sind an
  diese Vorgaben gebunden; das Voice-Gate scannt `topics.json` und die Verboten-Liste.

## Checkliste pro Text

- [ ] Spricht Happi in der Ich-Form und duzt die Leserin?
- [ ] du-Form ohne Imperative („du sollst"/„du musst")?
- [ ] Jede Aussage abgestuft bzw. gehedged, keine absoluten Behauptungen?
- [ ] Maximal eine Zahl pro Abschnitt?
- [ ] Balance erwähnt (was ist daran eigentlich gut)?
- [ ] Keine Angst- oder Schuld-Wörter?
- [ ] Reflexionen ohne Urteil?
- [ ] Musik-Ausnahme passend erwähnt?
