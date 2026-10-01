// HandyChecker – Selbstcheck-Verbesserer (SELF-01).
// Basis: CSS :has() zeigt die Reflexion ohne JS (in :has()-fähigen Browsern).
// Dieses Skript ergänzt zwei Dinge:
//   1. Screenreader-Ankündigung über die aria-live-Region.
//   2. Einen winzigen Fallback für Browser OHNE :has() – dort wird die
//      gewählte Reflexion per Inline-Style eingeblendet.
// Keine Speicherung: Antworten leben im DOM (Radio checked), Reload = vergessen.
(function () {
  var groups = document.querySelectorAll(".selfcheck__group");
  if (!groups.length) return;

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
})();
