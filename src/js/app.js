// HandyChecker – Selbstcheck-Ankündigung + lineare Schrittführung + Quiz-Gate
// (SELF-01; Quick 261001-l4e: geführte Themenseite).
//
// Drei Aufgaben, in dieser Reihenfolge:
//   1. Selbstcheck-Ankündigung (bestehend, unverändert): CSS :has() zeigt die
//      Reflexion ohne JS; dieses Skript ergänzt die aria-live-Ankündigung und
//      einen winzigen Fallback für Browser OHNE :has().
//   2. Lineare Schrittführung: wenn das <main data-flow> trägt, wird aus den
//      [data-step]-Abschnitten ein Ein-Schritt-nach-dem-anderen-Fluss mit einem
//      gemeinsamen „Weiter"-Knopf. Ohne den Marker bleibt jede andere Seite
//      unberührt (früher Ausstieg). Alle Schritte sind ohne JS voll sichtbar –
//      Verstecken passiert ausschließlich hier zur Laufzeit.
//   3. Quiz-Gate: der Selbstcheck startet erst auf „Los geht's!", zeigt dann
//      eine Frage nach der anderen, deckt jede Reflexion sofort auf und führt
//      per „Weiter" zur nächsten Frage bzw. am Ende zu den Tipps. Der
//      „Weiter"-Knopf erscheint erst, wenn die aktuelle Frage beantwortet ist.
//
// Keine dauerhafte Speicherung, kein Senden: Antworten und Schrittstand leben
// im DOM (Radio checked / hidden-Attribut), Reload = vergessen. Einzige
// Ausnahme sind sitzungsgebundene Merker („hc-done-<thema>"), die nur
// festhalten, ob DIESES Thema in diesem Besuch schon geschafft ist – sie enden
// mit dem Schließen des Browsers und gelten pro Thema (nicht seitenweit).
// Text wird nur per
// textContent geschrieben, neue Knoten nur per createElement/appendChild.
(function () {
  // --- 1. Selbstcheck-Ankündigung (unverändert) -----------------------------
  var groups = document.querySelectorAll(".selfcheck__group");

  if (groups.length) {
    var hasHas =
      typeof CSS !== "undefined" &&
      typeof CSS.supports === "function" &&
      CSS.supports("selector(:has(*))");

    groups.forEach(function (group) {
      var section = group.closest(".selfcheck");
      var live = section ? section.querySelector(".selfcheck__live") : null;

      group.addEventListener("change", function (e) {
        var input = e.target;
        var option = input.closest(".selfcheck__option");
        if (!option) return;

        // Antwort festhalten: die erste Wahl gilt. Alle Radio-Optionen der
        // Frage werden gesperrt, damit danach nichts mehr umgeschaltet werden
        // kann (JS-Upgrade; ohne JS bleiben die Optionen umschaltbar).
        group.querySelectorAll('input[type="radio"]').forEach(function (r) {
          r.disabled = true;
        });

        var label = option.querySelector("label");
        var reflection = option.querySelector(".selfcheck__reflection");

        // Fallback für Engines ohne :has(): nur die gewählte Reflexion zeigen.
        if (!hasHas) {
          group.querySelectorAll(".selfcheck__reflection").forEach(function (r) {
            r.style.display = "none";
          });
          if (reflection) reflection.style.display = "block";
        }

        if (live) {
          var text = label ? label.textContent.trim() : "";
          if (reflection) text += " – " + reflection.textContent.trim();
          live.textContent = text; // announced; nothing stored, nothing sent
        }
      });
    });
  }

  // --- 2. Lineare Schrittführung (nur mit [data-flow]) ----------------------
  var flow = document.querySelector("[data-flow]");
  if (!flow) return;

  var steps = Array.prototype.slice.call(flow.querySelectorAll("[data-step]"));
  if (steps.length < 2) return;

  // Ein einziges, geteiltes Navigations-Element für alle Schritte.
  var nav = document.createElement("div");
  nav.className = "stepper-nav";

  // Der Fortschritt („Frage x von y") ist ein eigenes Element: im Quiz steht
  // er ÜBER der Frage, nicht im Nav-Block am Seitenende.
  var progress = document.createElement("p");
  progress.className = "stepper-progress";
  progress.setAttribute("hidden", "");

  var next = document.createElement("button");
  next.type = "button";
  next.className = "stepper-next";
  next.textContent = "Weiter";

  nav.appendChild(next);

  var current = 0;

  function setProgress(text) {
    progress.textContent = text || "";
  }

  // --- 3. Selbstcheck als lineares Quiz -------------------------------------
  // Der Selbstcheck-Schluss („Wie ist das bei dir?" + Startknopf) steht unten
  // auf der Fakten-Seite; die Fragen selbst bilden einen EIGENEN Schritt
  // (.quiz): „Los geht's!" öffnet die Quiz-Seite, auf der „Frage x von y"
  // ÜBER der Frage steht.
  var selfcheckStep = flow.querySelector(".selfcheck");
  var quizStep = flow.querySelector(".quiz[data-step]");
  var quizGroups = quizStep
    ? Array.prototype.slice.call(quizStep.querySelectorAll(".selfcheck__group"))
    : [];
  var live = quizStep ? quizStep.querySelector(".selfcheck__live") : null;

  // Kleine Zahlwort-Tabelle, damit der Gate-Text die Fragenanzahl nie falsch nennt.
  var numeral = {
    1: "eine",
    2: "zwei",
    3: "drei",
    4: "vier",
    5: "fünf",
    6: "sechs",
    7: "sieben",
    8: "acht",
  };

  var quizOn = false; // Start gedrückt, Quiz läuft
  var qIndex = 0; // aktuell sichtbare Frage (0-basiert)

  var gate = null;
  var startBtn = null;

  var quizIdx = quizStep ? steps.indexOf(quizStep) : -1;

  if (selfcheckStep && quizStep && quizGroups.length) {
    var n = quizGroups.length;

    gate = selfcheckStep.querySelector(".quiz-gate");
    if (!gate) {
      gate = document.createElement("p");
      gate.className = "quiz-gate";
    }
    gate.textContent = (numeral[n] || n) + " Fragen – ganz ohne richtig oder falsch.";

    startBtn = selfcheckStep.querySelector(".quiz-start");
    if (!startBtn) {
      startBtn = document.createElement("button");
      startBtn.type = "button";
      startBtn.className = "quiz-start";
    }
    startBtn.textContent = "Los geht's!";

    if (!selfcheckStep.contains(gate) || !selfcheckStep.contains(startBtn)) {
      var heading = selfcheckStep.querySelector("h2");
      var anchor = heading || null;
      if (anchor && anchor.parentNode) {
        anchor.parentNode.insertBefore(gate, anchor.nextSibling);
        anchor.parentNode.insertBefore(startBtn, gate.nextSibling);
      } else {
        selfcheckStep.insertBefore(gate, selfcheckStep.firstChild);
        selfcheckStep.insertBefore(startBtn, gate.nextSibling);
      }
    }

    // Vor dem Start: nur Überschrift + Gate + Start sind zu sehen.
    quizGroups.forEach(function (g) {
      g.setAttribute("hidden", "");
    });
    if (live) live.setAttribute("hidden", "");

    function focusQuizGroup(idx) {
      var legend = quizGroups[idx].querySelector("legend");
      if (legend) {
        legend.setAttribute("tabindex", "-1");
        legend.focus();
      }
    }

    startBtn.addEventListener("click", function () {
      quizOn = true;
      qIndex = 0;
      gate.setAttribute("hidden", "");
      startBtn.setAttribute("hidden", "");
      if (live) live.removeAttribute("hidden");
      quizGroups.forEach(function (g) {
        g.setAttribute("hidden", "");
      });
      quizGroups[0].removeAttribute("hidden");
      // Fortschritt ÜBER der ersten Frage platzieren. Der Weiter-Knopf
      // unten erscheint erst nach der Antwort – show() macht den Schritt-
      // wechsel auf die Quiz-Seite und fokussiert die erste Frage.
      if (quizGroups[0].parentNode) {
        quizGroups[0].parentNode.insertBefore(progress, quizGroups[0]);
      }
      progress.removeAttribute("hidden");
      setProgress("Frage 1 von " + quizGroups.length);
      show(quizIdx);
    });

    // „Weiter" erst zeigen, wenn die aktuelle Frage beantwortet ist – die
    // bestehende Ankündigung feuert zuerst (früher registriert), dann das hier.
    quizGroups.forEach(function (group, idx) {
      group.addEventListener("change", function () {
        if (quizOn && idx === qIndex) next.removeAttribute("hidden");
      });
    });
  }

  function advanceQuiz() {
    qIndex += 1;
    if (qIndex < quizGroups.length) {
      quizGroups.forEach(function (g) {
        g.setAttribute("hidden", "");
      });
      quizGroups[qIndex].removeAttribute("hidden");
      next.setAttribute("hidden", ""); // bis diese Frage beantwortet ist
      setProgress("Frage " + (qIndex + 1) + " von " + quizGroups.length);
      focusQuizGroup(qIndex);
    } else {
      quizOn = false;
      setProgress("");
      quizGroups.forEach(function (g) {
        g.setAttribute("hidden", "");
      });
      // Dieses Thema ist für diesen Besuch geschafft: ein Merker PRO THEMA
      // (aus der URL abgeleitet), kein Personenbezug, kein Senden.
      try {
        sessionStorage.setItem(topicKey, "1");
      } catch (e) {}
      // „Noch einmal" ab sofort auf dem Endscreen – und erledigte Themen
      // (inklusive diesem) verschwinden dort aus der Karten-Liste.
      addDoneNote(steps[steps.length - 1]);
      addReplay(steps[steps.length - 1]);
      if (current < steps.length - 1) show(current + 1);
    }
  }

  function show(i) {
    current = i;

    steps.forEach(function (step, idx) {
      if (idx === i) {
        step.removeAttribute("hidden");
      } else {
        step.setAttribute("hidden", "");
      }
    });

    // Das geteilte Nav wandert in den aktuellen Schritt ...
    steps[i].appendChild(nav);

    // ... und verschwindet auf dem letzten Schritt.
    if (i === steps.length - 1) {
      nav.setAttribute("hidden", "");
    } else {
      nav.removeAttribute("hidden");
    }

    // Vor dem Start des Selbstchecks bleibt der Weiter-Knopf verborgen –
    // auf der Fakten-Seite führt nur „Los geht's!" in das Quiz.
    if (selfcheckStep && steps[i].contains(selfcheckStep) && !quizOn) {
      nav.setAttribute("hidden", "");
    }

    // Auf der Quiz-Seite erscheint der Weiter-Knopf erst nach der Antwort;
    // der Fortschritt steht schon ÜBER der Frage und wird nicht geleert.
    if (steps[i] === quizStep) {
      next.setAttribute("hidden", "");
    } else {
      setProgress("");
      progress.setAttribute("hidden", "");
    }

    // Fokus auf die erste Überschrift/das erste Legend des Schritts.
    var focusEl = steps[i].querySelector("h1, h2, legend");
    if (focusEl) {
      focusEl.setAttribute("tabindex", "-1");
      focusEl.focus();
    }
  }

  next.addEventListener("click", function () {
    if (quizOn) {
      advanceQuiz();
      return;
    }
    if (current < steps.length - 1) show(current + 1);
  });

  // --- 4. Sitzungs-Merker: fertiges Thema direkt am Ende öffnen (B1–B2) ------
  // Ein Schlüssel PRO THEMA (aus der URL), nur für diesen Besuch, ohne
  // Personenbezug. Ist er da, springt die Seite direkt zum letzten Schritt und
  // bietet „Noch einmal" an; der Knopf leert ALLE Themen-Merker und führt zur
  // Themenübersicht (./themen/) — die Runde beginnt von vorn. Der alte
  // generische Schlüssel "hc-done" wird beim Laden entfernt (Migration).
  var slugMatch = location.pathname.match(/themen\/([^\/]+)/);
  var topicKey = "hc-done-" + (slugMatch ? slugMatch[1] : "topic");
  try {
    if (sessionStorage.getItem("hc-done")) {
      sessionStorage.removeItem("hc-done");
    }
  } catch (e) {}

  var done = null;
  try {
    done = sessionStorage.getItem(topicKey);
  } catch (e) {
    done = null;
  }

  // Erledigte Themen (hc-done-<slug>) fliegen aus der End-Kartenliste:
  // jede Sektion wird nur einmal gemacht; „Noch einmal" bietet das
  // Wiederholen an (Knopf kommt separat, siehe addReplay).
  try {
    flow.querySelectorAll(".topic-cards a").forEach(function (a) {
      var m = (a.getAttribute("href") || "").match(/themen\/([^\/]+)/);
      if (m && sessionStorage.getItem("hc-done-" + m[1])) {
        var li = a.closest("li");
        if (li) li.setAttribute("hidden", "");
      }
    });
  } catch (e) {}

  // Alle Themen durchgespielt? Dann ein warmer Hinweis über dem
  // Noch-einmal-Knopf (Text vom Nutzer, 2026-10-06 — wörtlich).
  function addDoneNote(lastStep) {
    if (lastStep.querySelector(".done-note")) return;
    var cards = lastStep.querySelector(".topic-cards");
    if (!cards) return;
    var anyOpen = false;
    cards.querySelectorAll("a").forEach(function (a) {
      var li = a.closest("li");
      if (li && !li.hasAttribute("hidden") && (a.getAttribute("href") || "").indexOf("themen/") > -1) anyOpen = true;
    });
    if (anyOpen) return;
    var note = document.createElement("p");
    note.className = "done-note";
    note.textContent = "Du hast alle Themen durchgemacht – richtig stark! Wenn du möchtest, kannst du die Runde gerne nochmal drehen – oder jemand anderer!";
    cards.parentNode.insertBefore(note, cards.nextSibling);
  }

  // Knopf-Erzeugung in einer Funktion: genutzt beim Endscreen-Sprung (Merker
  // vorhanden) und direkt nach dem Durchspielen (advanceQuiz). Idempotent.
  function addReplay(lastStep) {
    if (lastStep.querySelector(".replay")) return;
    var cards = lastStep.querySelector(".topic-cards");
    var replay = document.createElement("button");
    replay.type = "button";
    replay.className = "quiz-start replay";
    replay.textContent = "Noch einmal";
    replay.addEventListener("click", function () {
      // Noch einmal = die ganze Runde von vorn: alle Themen-Merker löschen
      // und zurück zur Themenübersicht (./themen/), von wo sie neu wählt.
      try {
        var kill = [];
        for (var i = 0; i < sessionStorage.length; i++) {
          var k = sessionStorage.key(i);
          if (k && k.indexOf("hc-done-") === 0) kill.push(k);
        }
        kill.forEach(function (key) {
          sessionStorage.removeItem(key);
        });
      } catch (e) {}
      var cut = location.pathname.indexOf("themen/");
      location.href = cut > -1 ? location.pathname.slice(0, cut) + "themen/" : location.pathname;
    });
    var anchor = lastStep.querySelector(".done-note") || cards;
    if (anchor && anchor.parentNode) {
      anchor.parentNode.insertBefore(replay, anchor.nextSibling);
    } else {
      lastStep.appendChild(replay);
    }
  }

  if (done) {
    addDoneNote(steps[steps.length - 1]);
    addReplay(steps[steps.length - 1]);
    show(steps.length - 1);
  } else {
    show(0);
  }
})();
