#!/usr/bin/env node
/**
 * init.mjs
 *
 * Scaffolds the Dumont-style game design document folder structure.
 *
 * Reads ../assets/game_concept_templates_dumont.md, extracts every template
 * defined in section 3 (heading pattern: `## 3.X \`<filename>.md\``),
 * and writes one folder + one file per template into the target directory.
 *
 * Usage:
 *   node init.mjs [target-directory]
 *
 * Default target: ./game-docs   (relative to the caller's CWD)
 *
 * Behavior:
 *   - Creates folders idempotently (mkdir -p).
 *   - Skips files that already exist — never overwrites user work.
 *   - Exits with code 1 on missing template file or zero parsed templates.
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const TEMPLATE_FILE = path.resolve(
  __dirname,
  "../assets/game_concept_templates_dumont.md"
);
const targetArg = process.argv[2] ?? "game-docs";
const target = path.resolve(process.cwd(), targetArg);

function parseTemplates(text) {
  const templates = [];
  // Matches headings like:  ## 3.1 `01_GameIdea.md`
  const headingRe = /^##\s+3\.\d+\s+`([^`]+\.md)`\s*$/gm;
  // Matches the next fenced code block. Accepts any language tag (md, markdown, …) or none.
  const codeBlockRe = /```\w*\s*\n([\s\S]*?)\n```/;

  let m;
  while ((m = headingRe.exec(text)) !== null) {
    const filename = m[1];
    const remaining = text.slice(m.index + m[0].length);
    const codeMatch = remaining.match(codeBlockRe);
    if (codeMatch) {
      templates.push({ filename, content: codeMatch[1] });
    }
  }
  return templates;
}

function main() {
  if (!fs.existsSync(TEMPLATE_FILE)) {
    console.error(`✖  Template file not found: ${TEMPLATE_FILE}`);
    process.exit(1);
  }

  const text = fs.readFileSync(TEMPLATE_FILE, "utf8");
  const templates = parseTemplates(text);

  if (templates.length === 0) {
    console.error(`✖  No templates parsed from ${TEMPLATE_FILE}`);
    console.error(`   Expected headings like:  ## 3.1 \`01_GameIdea.md\``);
    process.exit(1);
  }

  fs.mkdirSync(target, { recursive: true });

  const created = [];
  const skipped = [];

  for (const { filename, content } of templates) {
    const folderName = filename.replace(/\.md$/, "");
    const folderPath = path.join(target, folderName);
    const filePath = path.join(folderPath, filename);

    if (fs.existsSync(filePath)) {
      skipped.push(filePath);
      continue;
    }

    fs.mkdirSync(folderPath, { recursive: true });
    fs.writeFileSync(filePath, content, "utf8");
    created.push(filePath);
  }

  for (const p of created) {
    console.log(`✓  ${path.relative(process.cwd(), p)}`);
  }
  for (const p of skipped) {
    console.log(`-  skipped (exists): ${path.relative(process.cwd(), p)}`);
  }

  const rel = path.relative(process.cwd(), target) || ".";
  console.log(`\nCreated ${created.length} document(s) in ${rel}.`);
  if (skipped.length > 0) {
    console.log(`Skipped ${skipped.length} existing file(s).`);
  }
}

main();
