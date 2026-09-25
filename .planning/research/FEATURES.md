# Feature Research

**Domain:** Child-focused digital-safety & healthy-screen-time education websites (German-language, ages 10–12)
**Researched:** 2026-09-25
**Confidence:** MEDIUM (findings cross-verified across ≥2 independent sources; single-source claims tagged LOW)

## Feature Landscape

### Table Stakes (Users Expect These)

Features a kid-facing digital-safety site needs or it feels broken/incomplete. These are the patterns *every* serious player in this domain ships (klicksafe, Internet-ABC, Handysektor, freii, Be Internet Awesome, eSafety, Common Sense).

| Feature | Why Expected | Complexity | Notes |
|---------|--------------|------------|-------|
| Age-appropriate German content on all six topics (screen time & balance, sleep, attention & focus, body effects, social media & feelings, privacy & data) | The product *is* this content. Every competitor segments copy by age (Internet-ABC 6–12, klicksafe per-age guidance, freii 11–15). For a 10–12 German reader: du-form, short paragraphs, concrete images — not abstract claims. | MEDIUM | Authoring cost, not code. 10–12 is the "reading-to-learn" band; grade 4–6 equivalents in Germany (KLASSEN 3-6 Lernmodule, Max & Min@ program grades 4–6) confirm depth. **Tone fit: core** — facts must land before encouragement. |
| Interactive self-check questions per topic | The single most common interactive pattern in the ecosystem: Internet-ABC Surfschein driving-license quiz + Quiz/Umfrage inside all 15 Lernmodule, klicksafe Quiz (e.g. "Digitale Abhängigkeit"), freii daily quizzes, eSafety kids' quizzes, Common Sense 20-minute lesson activities. A static text dump reads as broken/incomplete. | LOW–MEDIUM | One reusable quiz component (multiple-choice + "how does that fit you?" answers) served on every topic page. Pure client-side JS; no persistence needed. **Tone fit: core** — framed as curiosity/experiment, never an exam. |
| Concrete "Was kann ich tun?" tip boxes | Efficacy is what makes facts work: the fear-appeal meta-analyses (Witte & Allen 2000; Ruiter et al. 2014) show information + high-efficacy action steps drive behavior change, while fear or facts *without* actionable steps produce avoidance/reactance. Every site ships actionable tips (Internet-ABC "Tipps für Eltern", freii challenges, eSafety 10 tips). | LOW | Projected as "what should I do?" boxes per PROJECT.md. Each box = 1–3 concrete, doable actions (e.g. "Handy schläft in der Küche"). **Tone fit: core** — encouragement is only credible when paired with a next step. |
| Mobile-first layout + home-screen-app feel (PWA) | The opening device is a smartphone (PROJECT.md). Counter-example that proves the expectation: eSafety's Robo Raven game requires 1024×768 desktop and *cannot* be played on phones — a child-facing learning product that fails on mobile feels broken. | MEDIUM | Web manifest + installable shell; large tap targets; readable type on small screens. |
| German legal basics: Impressum + Datenschutzerklärung (kids' version + short parent note) | Legally required in Germany for any website; child-directed sites additionally ship *kindgerechte* privacy statements (Internet-ABC has a dedicated "Datenschutzerklärung für Kinder"; klicksafe same pattern). Missing Impressum = looks illegitimate to parents who pre-screen. | LOW | Static pages; the kids' version must say "hier wird nichts gespeichert – die Seite kann das nicht" in child language. |
| Zero data collection: no accounts, no analytics, no tracking cookies, no ad embeds | GDPR Art. 8: a child's own consent is only valid from 16 (Germany has not lowered the default); under 16 parental consent is required — machinery we don't want. COPPA (US, under 13) adds verifiable-consent obligations incl. IP addresses as personal data. Collecting nothing sidesteps all of it and matches the ecosystem norm (Internet-ABC is "werbefrei", freii runs "vollständig anonym"). | LOW (engineering) / MEDIUM (discipline) | Self-host fonts and assets; zero external requests at runtime (no Google Fonts, no YouTube embeds, no analytics). Quiz state stays in-memory or localStorage (on-device, never transmitted). **Differentiator for parents: a privacy statement that is literally true.** |
| Friendly guide character/mascot as narrative anchor | Kids' sites anchor identity and tone in a character: Internet-ABC's squirrel Flizzy, freii's four peer-like guides, eSafety's Mighty Heroes, Interland's Internauts. Gives the "friendly guide, not lecture" voice a face and separates kids' content from parent content. | MEDIUM | A mascot/guide whose copy voice is defined in the style guide; used consistently across all topics. **Tone fit: core.** |
| Big, playful, non-scary design (large type, high contrast, short sections) | 10–12 German reading comfort and emotional safety. The fear-appeal research applies to *design* too: dense, alarming layouts trigger the same avoidance. All leading kid sites use generous spacing, warm palettes, short blocks. | LOW–MEDIUM | Provide child-friendly visuals (own illustrations/SVG, no stock photos of crying children). |

### Differentiators (Competitive Advantage)

Features that set the product apart. The German institutional players (klicksafe, Internet-ABC, Handysektor) are **excellent but parent/teacher-centric, information-heavy, and rarely built for a child to open alone on her own phone.** That gap is where HandyChecker competes.

| Feature | Value Proposition | Complexity | Notes |
|---------|-------------------|------------|-------|
| Genuinely non-lecturing voice backed by research | freii's core design insight (SWR interview): kids *are* willing to engage with screen-time themes "wenn es eben nicht von ihren Eltern kommt" — the message landing from a guide/peer persona instead of a parent is what unlocks engagement. Common Sense's slogan: "Kids Deserve More Than Lectures About Screen Time." This is the exact PROJECT.md tone goal. | MEDIUM | Voice discipline across all copy: neutral observations ("viele Kinder kennen das") instead of commands ("du solltest…"). **Tone fit: THE differentiator.** |
| Self-check as empowerment/experiment, not diagnosis | Common Sense Healthy Habits lessons build self-awareness and self-management strategies ("recognize attention thieves"); self-checks that ask "wie ist das bei dir?" give the child agency over her own data — unlike "Bist du schon süchtig?" quizzes (see Anti-Features). | LOW–MEDIUM | Answer options that are descriptive, not scored-as-good/bad; playful result copy ("du kennst deine Gewohnheiten schon gut!"), no ranking, no shaming. **Tone fit: core.** |
| Offline reality-challenges ("Missionen") | Almost all static info sites only inform; behavior research says knowledge alone doesn't change behavior (JH Bloomberg summary). The players that *do* change behavior use small real-world missions: freii's 21-day mostly-offline daily challenges, Handysektor's "Real Life Challenge", klicksafe's "#AUSzeit – Digital Detox Challenge". A child-owned static site can ship exactly this with zero backend. | MEDIUM | Per-topic one-off missions ("Heute schläft dein Handy in der Küche", "Beim Essen liegt das Handy im anderen Raum"). No streaks, no points-for-logging-in (see Anti-Features). **Tone fit: strong** — gentle encouragement is "try this once, see how it feels." |
| Fun facts + myth-busting ("Stimmt das eigentlich?") | Facts-first is the PROJECT.md decision. klicksafe's FactProtect framing (facts let kids classify) and kids' demonstrated distrust of exaggeration ("They overdo it. They lie." — JH Bloomberg) argue for verified, surprising, age-appropriate facts plus myth-busting ("Mythos: LED-Filter schützt deine Augen"). | LOW | 1–2 "Wusstest du schon?" callouts per topic + 1 myth-buster box. Source each fact; German sources where possible (klicksafe, Internet-ABC, DGKJ guidance). **Tone fit: core** — facts first. |
| Printable family media contract + sleep pact | The Mediennutzungsvertrag (Internet-ABC × klicksafe, Pädi 2015 award) is the most-adopted German tool of this kind: age-specific rule templates, parent rules included, printable. A child-*initiated* version ("Ich schlage meiner Familie einen Vertrag vor") is empowering and turns the site into a family conversation starter — matching the shareable-with-family goal. | MEDIUM | Static print-friendly contract page with per-topic clauses; the sleep pact ("Handy schläft außerhalb des Zimmers") is a natural first clause. **Tone fit: good** — child proposes, family agrees, nobody lectures. |
| Completion certificate ("Handy-Profi") | Certificates/awards are a proven closeout pattern: Surfschein ("Führerschein für das Internet"), Medienführerschein Bayern Urkunden, eSafety completion certificates. Gives a natural ending and a shareable artifact — with none of the engagement-mechanics downsides. | LOW–MEDIUM | Shown after all six topic self-checks complete (track in localStorage only); printable via CSS; friend-shareable. |
| Share-with-friends tip cards | PROJECT.md requires German-only, shareable with friends/classmates. No institutional German site is built for peer-to-peer sharing; a set of small, self-contained tip cards ("3 Tipps für besseren Schlaf – zum Weiterschicken") is genuinely differentiating for the stated audience. | MEDIUM | Each topic yields 1 card (static image/text block); share via German messaging apps from the phone. No account, no backend. |
| Scenario decision games ("Was würdest du tun?") | eSafety's Cybersmart Challenge and Interland's mini-worlds use realistic dilemmas with immediate feedback — the highest-engagement format in the domain, and the natural home for social-media & feelings content (comparison, FOMO, likes). | HIGH | Two-to-three-branch "choose your path" mini-scenarios inside the social-media topic; reuse the self-check engine. Defer: see MVP. |

### Anti-Features (Commonly Requested, Often Problematic)

Features that seem good (and that parents/educators routinely ask for) but actively harm this product's goal. The downstream consumer (requirement definition) should treat these as **explicit non-requirements**.

| Feature | Why Requested | Why Problematic | Alternative |
|---------|---------------|-----------------|-------------|
| Fear / scare messaging ("Handy macht süchtig und dein Gehirn kaputt") | Parents want the danger to *stick*; shock is memorable | Fear appeals only work when paired with high-efficacy action steps; without them they produce defensive avoidance and reactance (Witte & Allen meta-analysis; NIH panel: scare tactics "have not proven effective and can even cause harm"). Kids detect exaggeration and discard the message entirely ("They overdo it. They lie."). Contradicts PROJECT.md core value ("not scared"). | Facts first, then a concrete small action ("dein Gehirn gewöhnt sich an schnelle Belohnung – eine Pause hilft ihm, sich zu erholen"). Efficacy, not shock. |
| Engagement-driven gamification: streaks, notifications, daily-login rewards, points for time-on-site, leaderboards | "Kids love games"; engagement metrics look like success | The site is *about* the dopamine mechanics of attention-capture apps. Recreating them (streaks, badges for returning, notifications) is hypocritical, teaches the wrong lesson, and literally increases the child's screen time. freii gamifies only *offline* action (quizzes/points for completing real-world missions). | One-shot quizzes, offline missions, completion certificate. Nothing that calls the child back to the screen. |
| Data collection: accounts, login, analytics, tracking cookies, ad networks, "personalized progress" | Personalization and progress tracking feel valuable; parents like dashboards | GDPR Art. 8: under-16s cannot consent themselves in Germany (default 16, not lowered) — parental consent machinery required; COPPA (meaningful for any US-hosted asset) adds verifiable-consent burden; IP address alone counts as personal data. A child should never be asked to accept a privacy policy. Also: "tracking the child" contradicts PROJECT.md privacy constraint and the trust the site preaches. | Fully static, zero data. Quiz state in localStorage only (never transmitted). The privacy page can then honestly say: "Diese Seite kann nichts über dich speichern." |
| Third-party embeds (YouTube videos, Google Fonts, social share buttons, embedded maps) | Videos/external content are easy wins; "optimierte" fonts look nicer | Each embed is a data-collection pipeline from a child's device to a US platform (GDPR transfer issues) — contradicts the zero-data promise. Also bloats the static host and slows mobile load. | Self-host assets (SVG/CSS animations instead of video; system/self-hosted fonts). Short explainer copy replaces video in v1. |
| Stigmatizing self-diagnosis quizzes ("Bist du schon süchtig? Bist du gefährdet?") | A quick "risk check" feels responsible | 10–12-year-olds are forming self-concept; labeling a child "addicted" or "at risk" is psychologically harmful and factually wrong (klicksafe explicitly distinguishes long use ≠ addiction). freii's stance: "nicht verteufeln" (SWR). | Descriptive self-checks ("Wie fühlst du dich nach einer langen Handy-Session?") with empathetic framing ("das kennen viele Kinder – und es gibt einen einfachen Trick"). |
| Parent-lecture voice / guilt framing ("Du solltest wirklich…", "Immer nur am Handy!") | It's what a worried parent naturally writes | The core business risk: the site is built by the parent, founded on freii's finding that the message must NOT come from the parent. Lecture tone = the child closes the site after one visit. | Guide persona bookended by "viele Kinder kennen das" + curiosity ("Hast du schon mal bemerkt…?"). |
| Evaluation-style quizzes with right/wrong scoring and shaming results ("Falsch! Schon wieder am Handy!") | Quizzes feel educational | Judging answers makes kids feel examined, not helped; wrongness triggers shut-down, not learning. Also creates a "correct lifestyle" the child will feel guilty about failing. | "Wie ist das bei dir?" answer options; result copy is observational and encouraging, never scored-against-a-norm. |
| User-generated content: open comments, question mailboxes, chat | Kids love being heard; "community!" | Requires a backend, moderation staffing, and child-safety vector (unknown users, PII in messages) — all rejected by PROJECT.md (no backend, no data). Even pseudonymous comment boxes (Internet-ABC pattern) need moderation infrastructure we won't have. | Printed/static "Frag dich selbst" reflection boxes + family discussion prompts ("Sprich mit deinen Eltern darüber – hier sind 3 Fragen"). |
| Text walls / statistics dumps ("48 Stunden pro Woche! 80% aller Kinder…!") | Data feels authoritative | Research: didactic knowledge alone doesn't change behavior; long walls kill child retention; alarming statistics trigger the fear-response problem. | 2–3 sentences per idea, one number max per section, visual callouts, interactive element after every short section. |
| In-app purchases / paid extras / sponsors | Monetization | Child-directed commercial content is legally sensitive (COPPA/GDPR marketing restrictions, JMStV considerations) and ethically wrong for a health-education product for one child + friends. | Nothing to buy, ever. Free static host per PROJECT.md. |

## Feature Dependencies

```
[German content, six topics]
    └──requires──> [Per-topic structure: facts + self-check + tip box]   (content pattern)
                         └──requires──> [Self-check quiz component (JS)]
                                              └──enhances──> [Scenario games in social-media topic]
                                              └──enhances──> [Completion certificate]

[Friendly guide persona]
    └──requires──> [Style guide (voice + mascot design)]  ──enhances──> [ALL copy + design]

[Home-screen app feel (PWA manifest + mobile CSS)]
    └──requires──> [Content available offline/installable]

[Zero-data foundation (no embeds, self-hosted assets)]
    └──required by──> [Kids' Datenschutzerklärung story]  (must be literally true)
    └──required by──> [Trust/credibility of every feature]

[Offline missions]  ──enhances──> [Tip boxes]            (missions put tips into action)
[Family contract printable]  └──requires──> [Screen-time + sleep content]  +  [print CSS]
[Share cards]  └──requires──> [Per-topic distilled tip content]

[Impressum + Datenschutz]  └──required at──> [First public URL (v1 launch gate)]
```

### Dependency Notes

- **All six topics require the shared per-topic pattern** (facts → self-check → tip box): the pattern is the skeleton; topics are content instances. This makes topic *number* cheap once the pattern and components exist — a reason to ship all six from the start (PROJECT.md lists all six as Active).
- **Self-check component is the load-bearing interactive**: it serves topic self-checks, the scenario game variant, and the certificate trigger. Build it once, reuse everywhere. It must work with *zero* persistence except optional localStorage (certificate + "this session's completed topics"); no server.
- **Guide persona and style guide precede most copy**: the "friendly guide, not a lecture" tone only survives if every writer (including the model generating copy) writes to the same voice spec. This is a Phase-1 content artifact, not decoration.
- **Privacy foundation gates everything**: any third-party embed or future "personalization" would invalidate the kids' privacy story and the trust claim. Treat the zero-data rule as a hard architectural constraint (matches ARCHITECTURE.md).
- **Certificate depends on completion tracking**: localStorage-based set of finished topics; must survive a reload but never leave the device (no sync — a sync feature would be an anti-feature).
- **Family contract and share cards are cheap derivations** of already-written topic content; schedule them late in v1.x, not as separate content projects.
- **No conflicts**: offline missions conflict with *engagement gamification* (streaks/notifications) — do missions, not streaks. Scenario games conflict with *text walls* — if scenarios ship, the social-media topic shrinks its prose accordingly.

## MVP Definition

### Launch With (v1)

Minimum viable product — what validates the concept for the one child + friends.

- [ ] **PWA shell with home-screen-app feel + mobile-first layout** — she opens it from her home screen like an app (PROJECT.md Active requirement); installable without an app store
- [ ] **All six topic pages in German, facts-first, short sections** — screen time & balance, sleep, attention & focus, body effects, social media & feelings, privacy & data (all six are Active requirements; content grows after launch, structure must not)
- [ ] **Self-check quiz component, 1–2 questions sets per topic** — the one reusable interactive; descriptive "how is it for you?" answers, no scoring/shame (table stake + tone core)
- [ ] **"Was kann ich tun?" tip boxes on every topic** — 1–3 concrete actions each; efficacy is what makes facts land (table stake)
- [ ] **Friendly guide persona + style guide** — mascot/voice defined before mass copy-writing; the anti-lecture guarantee (differentiator #1)
- [ ] **Impressum + Datenschutzerklärung (kids' version + short parent note)** — German legal baseline + the "we store nothing" trust story (table stake; v1 launch gate)
- [ ] **Zero third-party embeds / zero analytics** — self-hosted fonts/assets; localStorage-only state (privacy foundation)

### Add After Validation (v1.x)

Features to add once the core site is being used.

- [ ] **Offline missions ("Missionen")** — per-topic one-off real-world challenges ("Heute schläft dein Handy in der Küche"); the behavior-change differentiator; trigger: child reports trying a tip (conversational validation, not telemetry)
- [ ] **Completion certificate ("Handy-Profi")** — printable after all six self-checks, localStorage-only; trigger: first topic fully traversed
- [ ] **Printable family media contract + sleep pact** — child-initiated family agreement; trigger: sleep topic + a parent saying "they discussed it at home"
- [ ] **Share-with-friends tip cards** — one per topic, German, messaging-app shareable; trigger: friend/classmate mentions the site (PROJECT.md shareability goal)
- [ ] **Myth-buster + fun-fact callouts** ("Stimmt das eigentlich?") — per topic; trigger: content QA pass after first child feedback

### Future Consideration (v2+)

- [ ] **Scenario decision games** in the social-media topic — highest-engagement format but HIGH complexity (multi-branch logic + additional writing); defer until the core pattern is proven with the actual reader
- [ ] **Minimal "Für Eltern" page** (what this site is, why the voice is gentle, the privacy truth) — aids parental trust/install; NOT a parent dashboard (that would be an anti-feature); only after the child-facing site works
- [ ] **FAQ / "Frag dich selbst" collection** (static answers to questions she asks — built manually from real questions, never a live mailbox) — trigger: repeated real questions with no answer

**Explicitly never:** accounts, analytics, comments/chat, personalized dashboards, purchasable extras, fear-based content, engagement mechanics (see Anti-Features).

## Feature Prioritization Matrix

| Feature | User Value | Implementation Cost | Priority |
|---------|------------|---------------------|----------|
| Six-topic German content (facts-first pattern) | HIGH | MEDIUM | P1 |
| Self-check quiz component (reusable, no scoring) | HIGH | LOW–MEDIUM | P1 |
| "Was kann ich tun?" tip boxes | HIGH | LOW | P1 |
| PWA home-screen shell + mobile-first CSS | HIGH | MEDIUM | P1 |
| Impressum + Datenschutzerklärung (kids + parents) | MEDIUM (legal: gating) | LOW | P1 |
| Friendly guide persona + style guide | HIGH | MEDIUM | P1 |
| Zero-data foundation (no embeds, self-hosted) | HIGH (trust) | LOW | P1 |
| Offline missions | HIGH (differentiator) | MEDIUM | P2 |
| Completion certificate | MEDIUM | LOW–MEDIUM | P2 |
| Family media contract + sleep pact printable | MEDIUM | MEDIUM | P2 |
| Share-with-friends tip cards | MEDIUM | MEDIUM | P2 |
| Myth-buster + fun-fact callouts | MEDIUM | LOW | P2 |
| Scenario decision games (social topic) | MEDIUM–HIGH | HIGH | P3 |
| "Für Eltern" minimal page | MEDIUM (trust) | LOW | P3 |
| Static FAQ ("Frag dich selbst") | LOW–MEDIUM | LOW–MEDIUM | P3 |

**Priority key:**
- P1: Must have for launch
- P2: Should have, add when possible
- P3: Nice to have, future consideration

## Competitor Feature Analysis

| Feature | klicksafe | Internet-ABC | Handysektor | freii (Villa Schöpflin) | Be Internet Awesome / Interland | eSafety Kids (AU) | Our Approach |
|---------|-----------|--------------|-------------|------------------------|--------------------------------|--------------------|--------------|
| Target age | Kids/Juveniles/Parents split | 6–12 | ~11–13 | 11–15 (+parents) | 8–12 / grades 2–8 | 5–12 | 10–12 only |
| German content | Yes | Yes | Yes | Yes | DE available | No (EN) | German-only |
| Topics: screen time, sleep, attention, body, social media, privacy | Broad topic pages (Bildschirmzeit 6-12y, Mediensucht) | Lernmodule incl. "YouTube, Streaming und Bildschirmzeiten", Datenschutz | Sucht topic, Kurz-AGBs, WhatsApp-Stress | 21 daily themes incl. sleep, gaming, social | Digital Wellbeing packet, Mindful Mountain | Time online, privacy, cyberbullying | All six explicitly (PROJECT.md) |
| Interactive learning | Quizzes (e.g. Digitale Abhängigkeit), checklists | 15 Lernmodule w/ Quiz+Umfrage, Surfschein, games | Videos, Real Life Challenge | Daily videos + quizzes + offline challenges, points | 4 mini-games (Interland), pledge | Mighty Heroes game + videos + Cybersmart Challenge | Reusable self-check component + offline missions |
| Self-checks / diagnostics | Checkliste "Mediensucht erkennen" (parents) | Surfschein quiz | — | Short Selbsttest challenges | — | "Be Secure" quiz | Descriptive self-checks, no diagnosis, no shame |
| Concrete tip boxes | Yes (Tipps für Eltern) | Yes | Yes (Erste-Hilfe-Kasten) | Yes (daily missions) | Yes (tips, activities) | Yes (10 tips, Easy Read) | "Was kann ich tun?" boxes on every topic |
| Home-screen app feel / mobile | — | — | — | Web-App (mobile) | Browser game | Game is desktop-only (1024×768) — anti-pattern | PWA, installable, mobile-first |
| Accounts / data | Newsletter (opt-in) | Kids' newsletter, fantasy names only | Cookies (technical) | Fully anonymous, no accounts | Explicit: no login, no personal info | No login (session progress only) | Zero data, zero accounts, zero embeds |
| Certificates / awards | — | Surfschein ("Führerschein") | — | — | Internet Awesome Pledge/certificate | Completion certificates | "Handy-Profi" certificate (after 6 topics) |
| Family involvement | Mediennutzungsvertrag (joint w/ Internet-ABC), parent materials | Mediennutzungsvertrag, Elternbereich | — | Separate parent version, family challenges | Family magazine (Highlights) | Conversation starters for parents | Child-initiated printable family contract |
| Shareable with peers | — | — | — | School/class mode | Classroom focus | Classroom focus | Tip cards shareable via messaging apps |
| Tone | Informative/factual | Playful, mascot Flizzy | Peer-like ("auf Augenhöhe") | Guide-based, explicitly "nicht verteufeln", anti-lecture | Playful empowerment ("Awesome") | Superpowers framing | Friendly guide, facts + gentle encouragement (PROJECT.md) |

## Sources

- **German ecosystem (MEDIUM, cross-verified):**
  - klicksafe.de / klicksafe.eu — initiative overview, Bildschirmzeit 6–12 guidance (45–60 min/day for 9–12y), klicksafe für Kinder portal, Quiz & Materialien pages, Mediensucht guide "Always on?!", "Das können Familien gegen problematischen Medienkonsum tun"
  - Internet-ABC (internet-abc.de, NLM/Niedersachsen Landesmedienanstalt, LfM NRW) — 15 Lernmodule (Quiz/Umfrage elements), Surfschein, Spiele (Viren-Scanner, Smartphone-Spiel), Frag-uns + Datenschutzerklärung für Kinder, Digitale Pinnwand, Bildschirmzeit guidance (11–12y: max 90 min/day or ~10h weekly budget), Mediennutzungsvertrag tool (Pädi 2015)
  - Handysektor.de (LFK Baden-Württemberg) + mpfs.de/handysektor — Kurz-AGBs, Erklärvideos, Real Life Challenge, digitaler Erste-Hilfe-Kasten, Unterrichtsmaterialien
  - fragFINN.de + seitenstark.de — whitelisted kid search/network, FINNreporter
  - Villa Schöpflin freii (schoepflin-stiftung.de, SWR Aktuell 2025-09, dpa via krankenkassen.de, Deutsches Ärzteblatt 2026-03) — 21-day program, 4 guides, offline challenges, anonymous, anti-lecture design insight; "Max & Min@" KKH program (grades 4–6, story-embedded prevention)
  - Medienführerschein Bayern (medienfuehrerschein.bayern) — Urkunden/certificates, digital platform mein.medienfuehrerschein
  - Stiftung Warentest test 02/2025 via web.de — iOS Bildschirmzeit limits bypassable (context for tip boxes)
  - SCHAU HIN! (schau-hin.info) — parent-facing initiative
- **International (MEDIUM, cross-verified):**
  - Be Internet Awesome / Interland (beinternetawesome.withgoogle.com, blog.google 2026) — no-login/no-data, ISTE-aligned curriculum, certificates, Roblox world, Highlights magazine (1M students)
  - Common Sense Media / Common Sense Education (commonsensemedia.org, commonsense.org) — Digital Literacy & Well-Being Curriculum K-12 (Harvard Project Zero), Healthy Habits Mind/Body/Environment, "Kids Deserve More Than Lectures" slogan
  - eSafety Commissioner Australia (esafety.gov.au/kids) — Mighty Heroes, Robo Raven game (desktop-only caveat), Cybersmart Challenge, certificates, Easy Read booklets, conversation starters
  - Childnet (childnet.com), Internet Matters (internetmatters.org) — UK family-facing resources
  - KidsHealth/Nemours (kidshealth.org) — "How the Body Works" movies + quizzes (body-effects analog)
- **Privacy/legal (MEDIUM, cross-verified):**
  - GDPR Art. 8 (gdpr.eu, dsgvo-gesetz.de, gdprhub.eu) — consent age 16 default in Germany, Member States may lower to 13 (Germany has not), Recital 38
  - COPPA / FTC (ftc.gov, consumer.ftc.gov, digital.gov) — verifiable parental consent, persistent identifiers (IP) as personal data
- **Fear-appeals research (MEDIUM–HIGH, peer-reviewed):**
  - Witte & Allen 2000 meta-analysis (Health Educ Behav, PubMed) — strong fear + high efficacy → change; fear + low efficacy → avoidance/reactance
  - Ruiter et al. 2014 "Sixty years of fear appeal research" (Int J Psychol, PubMed)
  - JH Bloomberg "Risky Business" — scare tactics ineffective/harmful; teen distrust of exaggeration; "knowledge improves knowledge, not behavior"
  - EDC brief "Not Your Mother's Scare Tactics" — fear-based messaging effectiveness unproven
  - Limbu & Huhmann 2024 (Vaccines) — fear appeals in vaccination messaging review

---
*Feature research for: HandyChecker — child-focused smartphone-safety website (German, 10–12)*
*Researched: 2026-09-25*