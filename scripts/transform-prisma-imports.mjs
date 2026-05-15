#!/usr/bin/env node
import { readFileSync, writeFileSync } from "node:fs";
import { execSync } from "node:child_process";

const files = execSync(
  `grep -rl 'from "@/lib/db"' src`,
  { encoding: "utf8" }
)
  .split("\n")
  .filter(Boolean);

let changed = 0;

for (const file of files) {
  const src = readFileSync(file, "utf8");
  if (!/import\s*\{\s*prisma\s*\}\s*from\s*"@\/lib\/db"\s*;?/.test(src)) continue;

  let out = src.replace(
    /import\s*\{\s*prisma\s*\}\s*from\s*"@\/lib\/db"\s*;?/,
    `import { getPrisma } from "@/lib/db";`
  );

  // Inject `const prisma = await getPrisma();` into each function body that
  // mentions `prisma.` somewhere inside it. We use a brace-matching scan to
  // find each function body.
  const fnRegex =
    /(export\s+async\s+function\s+\w+\s*\([^)]*\)\s*(?::\s*[^{]+)?\s*\{|async\s+function\s+\w+\s*\([^)]*\)\s*(?::\s*[^{]+)?\s*\{)/g;

  const insertions = [];
  let match;
  while ((match = fnRegex.exec(out))) {
    const openIdx = match.index + match[0].length - 1; // position of `{`
    // find matching `}` for this body
    let depth = 1;
    let i = openIdx + 1;
    while (i < out.length && depth > 0) {
      const c = out[i];
      if (c === "{") depth++;
      else if (c === "}") depth--;
      i++;
    }
    const bodyEnd = i;
    const body = out.slice(openIdx + 1, bodyEnd);
    if (/\bprisma\./.test(body)) {
      insertions.push(openIdx + 1);
    }
  }

  // Apply insertions back-to-front so indices stay valid.
  insertions.sort((a, b) => b - a);
  for (const idx of insertions) {
    out = out.slice(0, idx) + "\n  const prisma = await getPrisma();" + out.slice(idx);
  }

  if (out !== src) {
    writeFileSync(file, out);
    changed++;
    console.log(`updated ${file} (${insertions.length} injections)`);
  }
}

console.log(`\nDone. ${changed} files updated.`);
