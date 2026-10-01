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
// Keine Speicherung, kein Senden: Antworten und Schrittstand leben im DOM
// (Radio checked / hidden-Attribut), Reload = vergessen. Text wird nur per
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

  var progress = document.createElement("p");
  progress.className = "stepper-progress";

  var next = document.createElement("button");
  next.type = "button";
  next.className = "stepper-next";
  next.textContent = "Weiter";

  nav.appendChild(progress);
  nav.appendChild(next);

  var current = 0;

  function setProgress(text) {
    progress.textContent = text || "";
  }

  // --- 3. Selbstcheck als lineares Quiz -------------------------------------
  // Der Selbstcheck ist kein eigener Schritt mehr: er schließt die Fakten-
  // Seite unten ab („Wie ist das bei dir?" + Startknopf). Sein Schritt ist
  // der umgebende .step--facts-Wrapper.
  var selfcheckStep = flow.querySelector(".selfcheck");
  var quizGroups = selfcheckStep
    ? Array.prototype.slice.call(selfcheckStep.querySelectorAll(".selfcheck__group"))
    : [];
  var live = selfcheckStep ? selfcheckStep.querySelector(".selfcheck__live") : null;

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

  if (selfcheckStep && quizGroups.length) {
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
      nav.removeAttribute("hidden");
      next.removeAttribute("hidden");
      setProgress("Frage 1 von " + quizGroups.length);
      focusQuizGroup(0);
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

    setProgress("");

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

  show(0);
})();
