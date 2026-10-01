// HandyChecker – Selbstcheck-Verbesserer (SELF-01).
// Das Widget funktioniert OHNE dieses Skript (CSS :has() zeigt die Reflexion).
// Dieses Skript NUR: Screenreader-Ankündigung über die aria-live-Region.
// Keine Speicherung: Antworten leben im DOM (Radio checked), Reload = vergessen.
(function () {
  var groups = document.querySelectorAll(".selfcheck__group");
  if (!groups.length) return;
  groups.forEach(function (group) {
    var section = group.closest(".selfcheck");
    var live = section ? section.querySelector(".selfcheck__live") : null;
    if (!live) return;
    group.addEventListener("change", function (e) {
      var input = e.target;
      if (!input.matches('input[type="radio"]')) return;
      var option = input.closest(".selfcheck__option");
      if (!option) return;
      var label = option.querySelector("label");
      var reflection = option.querySelector(".selfcheck__reflection");
      var text = label ? label.textContent.trim() : "";
      if (reflection) text += " – " + reflection.textContent.trim();
      live.textContent = text; // announced; nothing stored, nothing sent
    });
  });
})();
