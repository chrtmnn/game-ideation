// scripts/validate-skills.mjs
import fs from "node:fs";
import path from "node:path";

const repoRoot = process.cwd();
const roots = [
  "skills"
];

const nameRe = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const seen = new Set();
let errors = 0;

function readFrontmatter(file) {
  // Normalize CRLF → LF so the regex works regardless of platform line endings.
  const text = fs.readFileSync(file, "utf8").replace(/\r\n/g, "\n");
  const match = text.match(/^---\n([\s\S]*?)\n---\n?/);
  if (!match) return null;

  const fm = {};
  for (const line of match[1].split("\n")) {
    const m = line.match(/^([a-zA-Z0-9_-]+):\s*(.*)$/);
    if (m) fm[m[1]] = m[2].replace(/^["']|["']$/g, "").trim();
  }
  return fm;
}

function validateSkill(skillDir) {
  const skillFile = path.join(skillDir, "SKILL.md");
  if (!fs.existsSync(skillFile)) return;

  const rel = path.relative(repoRoot, skillDir);
  const dirName = path.basename(skillDir);
  const fm = readFrontmatter(skillFile);

  if (!fm) {
    console.error(`✖  ${rel}: missing YAML frontmatter`);
    errors++;
    return;
  }

  if (!fm.name) {
    console.error(`✖  ${rel}: missing name`);
    errors++;
  } else {
    if (!nameRe.test(fm.name)) {
      console.error(`✖  ${rel}: invalid name "${fm.name}"`);
      errors++;
    }
    if (fm.name !== dirName) {
      console.error(`✖  ${rel}: name must match folder name "${dirName}"`);
      errors++;
    }
    if (seen.has(fm.name)) {
      console.error(`✖  ${rel}: duplicate skill name "${fm.name}"`);
      errors++;
    }
    seen.add(fm.name);
  }

  if (!fm.description || fm.description.length < 40) {
    console.error(`✖  ${rel}: description is missing or too vague`);
    errors++;
  }

  if (fm.description && fm.description.length > 1024) {
    console.error(`✖  ${rel}: description exceeds 1024 characters`);
    errors++;
  }

  // Sibling-skill reference check: every `../<other-skill>/...` path mentioned
  // in the SKILL.md body must resolve to an existing file.
  const body = fs.readFileSync(skillFile, "utf8");
  const siblingRefRe = /`(\.\.\/[a-z0-9-]+\/[^`\s]+)`/g;
  const checked = new Set();
  let m;
  while ((m = siblingRefRe.exec(body)) !== null) {
    const ref = m[1];
    if (checked.has(ref)) continue;
    checked.add(ref);
    const resolved = path.resolve(skillDir, ref);
    if (!fs.existsSync(resolved)) {
      console.error(`✖  ${rel}: broken sibling reference "${ref}"`);
      errors++;
    }
  }

  console.log(`✓  ${rel}`);
}

function scan(root) {
  const abs = path.join(repoRoot, root);
  if (!fs.existsSync(abs)) return;

  for (const entry of fs.readdirSync(abs, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const dir = path.join(abs, entry.name);

    if (fs.existsSync(path.join(dir, "SKILL.md"))) {
      validateSkill(dir);
    } else {
      for (const nested of fs.readdirSync(dir, { withFileTypes: true })) {
        if (nested.isDirectory()) validateSkill(path.join(dir, nested.name));
      }
    }
  }
}

for (const root of roots) scan(root);

if (errors > 0) {
  console.error(`\n${errors} validation error(s).`);
  process.exit(1);
}

console.log(`\nValidated ${seen.size} skill(s).`);
