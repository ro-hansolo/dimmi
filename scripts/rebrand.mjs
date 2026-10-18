#!/usr/bin/env node
// Dimmi rebrand: swaps user-visible "Handy" strings for "Dimmi".
// Idempotent — re-run after merging upstream (git merge upstream/main).
// Leaves code identifiers, data formats and credit/donation text untouched.
import { readFileSync, writeFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

const root = new URL("..", import.meta.url).pathname;
const swap = (s) => s.replace(/\bHandy\b(?!['’]s local speech)/g, "Dimmi");
let changed = 0;

// 1. Locale strings (skip the donate block: that money goes to Handy's author).
const localesDir = join(root, "src/i18n/locales");
for (const lang of readdirSync(localesDir)) {
  const file = join(localesDir, lang, "translation.json");
  let src;
  try { src = readFileSync(file, "utf8"); } catch { continue; }
  let inDonate = false;
  const out = src.split("\n").map((line) => {
    if (line.includes('"supportDevelopment"')) inDonate = true;
    if (inDonate) { if (/^\s*}/.test(line)) inDonate = false; return line; }
    return swap(line);
  }).join("\n");
  if (out !== src) { writeFileSync(file, out); changed++; }
}

// 2. A few literal strings in native/UI code.
const literal = [
  ["src-tauri/src/tray.rs", [['format!("Handy v{} (Dev)"', 'format!("Dimmi v{} (Dev)"'], ['format!("Handy v{}"', 'format!("Dimmi v{}"']]],
  ["src-tauri/src/lib.rs", [['.title("Handy")', '.title("Dimmi")']]],
  ["src-tauri/src/cli.rs", [['about = "Handy - Speech to Text"', 'about = "Dimmi - Speech to Text"']]],
  ["src/components/settings/about/AboutSettings.tsx", [['openUrl("https://github.com/cjpais/Handy")', 'openUrl("https://github.com/ro-hansolo/dimmi")']]],
];
for (const [rel, pairs] of literal) {
  const file = join(root, rel);
  let src = readFileSync(file, "utf8"); const before = src;
  for (const [a, b] of pairs) src = src.split(a).join(b);
  if (src !== before) { writeFileSync(file, src); changed++; }
}
console.log(`rebrand: ${changed} file(s) updated`);
