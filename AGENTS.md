# Project overview

`game-ideation-skills` is a collection of AI agent skills that walk a solo game developer
through Daniel Dumont's six-stage methodology *"Von der Idee zum Konzept"* (Making Games
Magazin 2010–2011), from a raw game idea to an implementation-grade Game Concept.

Skills are distributed via [skills.sh](https://skills.sh) (`npx skills add chrtmnn/game-ideation`)
and are also installable as a Claude Code plugin via `.claude-plugin/marketplace.json`. The
`init-game-docs` skill is the **foundation** — it owns the shared workshop reference files
that all other stage-specific skills read via relative sibling paths.

## Tech stack

- Node.js ≥ 18, ES modules (`"type": "module"`)
- No runtime dependencies — pure stdlib (`node:fs`, `node:path`, `node:crypto`, `node:url`)
- Skill format: Markdown with YAML frontmatter per the [agentskills.io](https://agentskills.io/specification) spec
- CI: GitHub Actions

## Repository layout

| Path | Purpose |
|---|---|
| `skills/init-game-docs/` | Foundation skill — scaffolds the Dumont document structure and hosts shared workshop references |
| `skills/init-game-docs/SKILL.md` | Skill manifest (frontmatter + instructions) |
| `skills/init-game-docs/scripts/init.mjs` | Scaffolding script that extracts templates from the assets file and creates the doc folder tree |
| `skills/init-game-docs/assets/game_concept_templates_dumont.md` | Source of all document templates (sections 3.1 – 3.9) |
| `skills/init-game-docs/references/` | English summaries of all six Dumont workshop parts + a DE↔EN glossary; consumed by sibling skills via `../init-game-docs/references/...` |
| `skills/write-game-idea/SKILL.md` | Stage 1 skill — co-develops `01_GameIdea.md` with the user |
| `skills/write-core-mechanic/SKILL.md` | Stage 2 skill — co-develops `02_CoreMechanic.md` with the user |
| `skills/write-game-expose/SKILL.md` | Stage 3 skill — co-develops the 16-chapter `03_Exposé.md` with the user |
| `skills/write-game-concept/SKILL.md` | Stage 4 skill — co-develops `04_GameConcept.md` (umbrella for the Functional Design / Logical Concept / Interface Concept sub-documents) |
| `scripts/validate-skills.mjs` | Skill validator: frontmatter checks, name-matches-folder, duplicate detection, sibling-reference resolution |
| `.claude-plugin/marketplace.json` | Claude Code marketplace catalog — lists `game-ideation` as a single plugin pointing to the repo root |
| `.claude-plugin/plugin.json` | The plugin manifest declared by `marketplace.json`. Skills are auto-discovered from `skills/` |
| `.github/workflows/validate-skills.yml` | CI workflow running the validator on push/PR |
| `README.md` | User-facing intro: methodology context, three-stage flow, dependency model, install instructions |

## Development setup

```bash
git clone https://github.com/chrtmnn/game-ideation.git
cd game-ideation
# No dependencies to install. Stdlib only.
```

## Build, test, lint

There is no build step. Validation is the only check.

```bash
# Validate all skills (frontmatter, name conventions, sibling refs)
npm run validate

# Smoke-test the init-game-docs scaffolder against a throwaway target
node skills/init-game-docs/scripts/init.mjs /tmp/game-docs-test
```

## Key conventions

- **Skill folder name = frontmatter `name` field.** Enforced by the validator. Names are kebab-case (`^[a-z0-9]+(?:-[a-z0-9]+)*$`).
- **Frontmatter is the [agentskills.io](https://agentskills.io/specification) spec**, not the older `triggers`/`tags` shape. Required: `name`, `description`. Optional: `metadata` (author, version), `allowed-tools`, `argument-hint`, `model`.
- **Description format:** `"Use when the user asks to..."` style. Length: 40 – 1024 chars. Include both English and German trigger phrases for cross-language matching.
- **Sibling-skill references:** stage skills read foundation files via `../init-game-docs/references/<file>.md`. The validator resolves these on each run.
- **Allowed-tools patterns:** include both `Bash(...)` and `PowerShell(...)` variants so skills run cross-platform without permission prompts.
- **Skill documents are written for AI agents**, not humans — dense tables, decision matrices, anti-pattern lists. Prose-readability is a non-goal.
- **Detail discipline (Dumont rule):** anything not belonging to the current workshop stage gets parked in a per-document `*_notes.md` sidecar. Stage skills harvest their own stage section from all earlier sidecars at session start and mark processed items with strike-through instead of deleting them.
- **Stage skills share one SKILL.md template.** All `write-*` skills follow the same section order: intro + Dumont framing → When to use / When NOT to use → Persona table → Working principles → Instructions (locate documents → build on earlier stages → iterate section-by-section → cross-check with stage gate) → Document structure table → Detail capture (`*_notes.md`) → Anti-patterns table → References → Example session opener. New stage skills (`write-balancing`, `write-ai-conception`) must copy this structure; `skills/write-core-mechanic/SKILL.md` is a good reference.
- **CRLF tolerant.** Repo is developed on Windows. The validator normalizes line endings before parsing frontmatter; new scripts should follow suit.
- **Version field is single-source.** `package.json` `version`, `.claude-plugin/marketplace.json` plugin entry `version`, and `.claude-plugin/plugin.json` `version` must always be equal. Bump all three together on any release.

## Important files

| File | Why it matters |
|---|---|
| `skills/init-game-docs/assets/game_concept_templates_dumont.md` | Single source of truth for all nine document templates. `init.mjs` parses headings `## 3.X \`<name>.md\``. Adding or renaming a template here changes the scaffolded output |
| `skills/init-game-docs/references/00_glossary.md` | DE↔EN terminology authority. Every skill should defer to this when translating user input |
| `skills/init-game-docs/references/01_game-idea.md` … `06_ai-conception.md` | Compressed workshop summaries — each starts with TL;DR + Agent Cheat Sheet that doubles as skill operating rules |
| `scripts/validate-skills.mjs` | Single quality gate. Failing CI almost always means: frontmatter shape, folder/name mismatch, or a broken `../init-game-docs/...` path after a rename |
| `.claude-plugin/marketplace.json` + `.claude-plugin/plugin.json` | Together form a one-plugin Claude Code marketplace. The marketplace's `name` is `chrtmnn-game-ideation`; the plugin's `name` is `game-ideation`. All skills are auto-discovered from `skills/<name>/SKILL.md` |

## Gotchas

- **`init-game-docs` is a hard prerequisite** for every other stage skill. Stage skills depend on sibling files at `../init-game-docs/references/...`. The dependency is documented in skill descriptions and validated by the resolver, but **not enforced at install time** — neither skills.sh nor Claude Code installs dependencies automatically.
- **Skills.sh is auto-discovery via GitHub, not a registry.** No submission process. Repo just needs `SKILL.md` files with valid frontmatter at standard locations (`skills/<name>/`).
- **`marketplace.json` is invisible to skills.sh.** It only serves the Claude Code plugin system. Both can coexist on the same repo.
- **The validator's sibling-ref check** scans for backtick-quoted ``../<other-skill>/...`` patterns in any SKILL.md. If you add a non-quoted reference, it won't be checked. If you add a quoted reference that's just a code example, it *will* fail. Quote intentionally.
- **CRLF on Windows:** git config translates LF↔CRLF on checkout/commit. The validator normalizes internally, but external tools (linters, other parsers) might not. Use Unix line endings if writing new tooling.
