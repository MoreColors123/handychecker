#!/usr/bin/env node
// Strip ancillary metadata chunks (tEXt/iTXt/zTXt/eXIf) from PNG files.
// Pixel data, dimensions and the remaining chunk CRCs are never touched -
// this is provenance hygiene for the public repo (threat T-03-03), not an
// image edit. Inkscape 1.4.4 stamps every export with tEXt "Software:
// www.inkscape.org" and offers no CLI flag to suppress it, so this runs
// after every Inkscape regen:
//   node tools/strip-png-meta.cjs src/icons/*.png
// Usage: node tools/strip-png-meta.cjs <png> [<png>...]
"use strict";
const fs = require("fs");
const STRIP = new Set(["tEXt", "iTXt", "zTXt", "eXIf"]);
let stripped = 0;
const files = process.argv.slice(2);
if (files.length === 0) {
  console.error("usage: node tools/strip-png-meta.cjs <png> [<png>...]");
  process.exit(1);
}
for (const file of files) {
  const b = fs.readFileSync(file);
  if (b.toString("ascii", 1, 4) !== "PNG") {
    console.error(file + ": not a PNG");
    process.exit(1);
  }
  const out = [b.subarray(0, 8)]; // PNG signature
  let i = 8;
  let last = "";
  while (i < b.length) {
    if (i + 8 > b.length) {
      console.error(file + ": truncated chunk header");
      process.exit(1);
    }
    const len = b.readUInt32BE(i);
    const type = b.toString("ascii", i + 4, i + 8);
    const end = i + 12 + len; // len + type + data + CRC
    if (end > b.length) {
      console.error(file + ": chunk overruns file (corrupt/truncated)");
      process.exit(1);
    }
    last = type;
    if (STRIP.has(type)) {
      stripped++;
    } else {
      out.push(b.subarray(i, end));
    }
    i = end;
  }
  if (last !== "IEND") {
    console.error(file + ": missing IEND - not writing");
    process.exit(1);
  }
  fs.writeFileSync(file, Buffer.concat(out));
  console.log(file + ": clean");
}
console.log("stripped " + stripped + " metadata chunk(s)");