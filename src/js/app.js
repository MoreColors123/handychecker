// HandyChecker – Selbstcheck-Ankündigung + lineare Schrittführung
// (SELF-01; Quick 261001-l4e: geführte Themenseite).
//
// Zwei Aufgaben, in dieser Reihenfolge:
//   1. Selbstcheck-Ankündigung (bestehend, unverändert): CSS :has() zeigt die
//      Reflexion ohne JS; dieses Skript ergänzt die aria-live-Ankündigung und
//      einen winzigen Fallback für Browser OHNE :has().
//   2. Lineare Schrittführung: wenn das <main data-flow> trägt, wird aus den
//      [data-step]-Abschnitten ein Ein-Schritt-nach-dem-anderen-Fluss mit einem
//      gemeinsamen „Weiter"-Knopf. Ohne den Marker bleibt jede andere Seite
//      unberührt (früher Ausstieg). Alle Schritte sind ohne JS voll sichtbar –
//      Verstecken passiert ausschließlich hier zur Laufzeit.
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

    // Fokus auf die erste Überschrift/das erste Legend des Schritts.
    var focusEl = steps[i].querySelector("h1, h2, legend");
    if (focusEl) {
      focusEl.setAttribute("tabindex", "-1");
      focusEl.focus();
    }
  }

  next.addEventListener("click", function () {
    if (current < steps.length - 1) show(current + 1);
  });

  show(0);
})();
