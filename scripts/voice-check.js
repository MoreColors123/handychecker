// Voice gate for HandyChecker copy (VOICE-01 / D-07).
// Run: npm.cmd run check:voice
//
// Scans src/_data/topics.json (the copy source of truth; the same strings are
// rendered into the built HTML) for two classes of voice violation:
//   1. the Verboten constructions listed in docs/stimme-und-stil.md §Abgestufte
//      Sprache (parsed from the spec so the spec stays the single source of truth)
//   2. du-imperatives at the START of a tip or reflection sentence
//      (Leg/Lass/Probier/Vergiss/Mach/Nimm …), the class that slipped the
//      original three-phrase gate (CR-01).
//
// No build required: topics.json is the source the templates consume.
// Exits non-zero (1) on any violation so it can gate CI / the verify step.

const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const topicsPath = path.join(root, "src", "_data", "topics.json");
const specPath = path.join(root, "docs", "stimme-und-stil.md");

function readUtf8(p) {
  return fs.readFileSync(p, "utf8");
}

const topics = JSON.parse(readUtf8(topicsPath));
const spec = readUtf8(specPath);

// --- 1. Parse the Verboten dash-bullets from the spec -------------------------
const verboten = [];
let inVerboten = false;
for (const line of spec.split(/\r?\n/)) {
  if (/^###\s+Verboten/i.test(line)) {
    inVerboten = true;
    continue;
  }
  if (/^###\s+/.test(line)) {
    inVerboten = false;
  }
  if (inVerboten) {
    const m = line.match(/^\s*-\s*"(.+)"\s*$/);
    if (m) verboten.push(m[1]);
  }
}

// --- 2. Collect the child-facing copy strings we gate -------------------------
const strings = [];
topics.forEach(function (topic) {
  if (topic.tips && Array.isArray(topic.tips.items)) {
    topic.tips.items.forEach(function (item) {
      strings.push({ where: topic.slug + " tips", text: item.text });
    });
  }
  if (topic.selfcheck && Array.isArray(topic.selfcheck.questions)) {
    topic.selfcheck.questions.forEach(function (q) {
      if (Array.isArray(q.options)) {
        q.options.forEach(function (opt) {
          strings.push({
            where: topic.slug + " selfcheck/" + opt.id,
            text: opt.reflection,
          });
        });
      }
    });
  }
});

// --- 3. Check banned constructions + imperative clause starts -----------------
const failures = [];
// du-imperative verb stems at the start of a clause.
const imperative = /^\s*(Leg|Lass|Probier(e)?|Vergiss|Mach|Nimm)\b/i;
// The spec sanctions "Probiere aus…" as an invitation *wrapper*; strip it so the
// gate scans the clause underneath (the exact CR-01 shape: "Probiere aus: Leg …").
const sanctionedPrefix = /^\s*probier(e)?\s+aus\s*:\s*/i;

function clauses(text) {
  // Split on sentence punctuation, a colon, or a spaced en/em dash so an
  // imperative after a colon ("Probiere aus: Leg …") is also a clause start.
  return text
    .replace(sanctionedPrefix, "")
    .split(/[:.!?]+|\s+[–—]\s+/)
    .filter(function (c) {
      return c.trim();
    });
}

strings.forEach(function (s) {
  verboten.forEach(function (banned) {
    if (s.text.toLowerCase().indexOf(banned.toLowerCase()) !== -1) {
      failures.push(
        'VEBOTEN "' + banned + '" in ' + s.where + ": " + s.text
      );
    }
  });
  clauses(s.text).forEach(function (sentence) {
    const m = sentence.match(imperative);
    if (m) {
      failures.push(
        "IMPERATIV '" + m[1] + "' am Satzanfang in " + s.where + ": " + sentence.trim()
      );
    }
  });
});

if (failures.length) {
  console.error("Voice gate FAILED (" + failures.length + " issue(s)):");
  failures.forEach(function (f) {
    console.error("  - " + f);
  });
  process.exit(1);
}

console.log(
  "Voice gate PASSED: " +
    strings.length +
    ' copy string(s) checked against ' +
    verboten.length +
    " Verboten construction(s) + imperative-start scan."
);
