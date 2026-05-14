---
name: init-game-docs
description: Use when the user asks to initialize game design documentation, start a new game concept project, or scaffold the standard Dumont-style document structure (Game Idea, Core Mechanic, Exposé, Game Concept, Functional Design, Logical Concept, Interface Concept, Balancing, Change Log). Creates one folder per document type, each containing the matching template file.
metadata:
  author: chrtmnn <c@hrtmnn.com>
  version: 0.1.0
allowed-tools:
  - Bash(node *)
  - Read
  - Write
---

# init-game-docs

Bootstraps a fresh set of game design documents based on the Daniel Dumont workshop methodology
("From Idea to Concept", Making Games Magazin 03/2010–02/2011). For every template defined in
`assets/game_concept_templates_dumont.md`, the skill creates a same-named folder and writes the
template file inside it.

## When to use

- User starts a new game concept project from scratch
- User asks to "initialize", "scaffold", or "set up" game documentation
- User wants the full Dumont stack of design documents in one go
- Typical phrasings: "init game docs", "neue game-docs anlegen", "start a new game concept",
  "set up the design documents"

## When NOT to use

- A `game-docs/` folder (or the chosen target) already contains substantive work — the skill is
  for fresh initialization, not patching individual documents
- User wants to edit a single existing template (use direct file edits instead)
- User asks about the methodology itself rather than scaffolding files — point them to
  `assets/game_concept_templates_dumont.md`

## Instructions

1. **Confirm the target directory.** Ask the user where the docs should be created if not
   specified. Default: `./game-docs/` relative to the current working directory.

2. **Check for collisions.** If the target already contains any of the document folders
   (e.g. `01_GameIdea/`), warn the user. The script will skip existing files by default — make
   the user aware before running.

3. **Run the scaffolding script:**

   ```bash
   node skills/init-game-docs/scripts/init.mjs [target-directory]
   ```

   The script:
   - reads `assets/game_concept_templates_dumont.md`
   - extracts every template from section 3 (heading pattern `## 3.X \`<name>.md\``)
   - creates one folder per template (named after the file, without extension)
   - writes the template content into `<folder>/<name>.md`
   - skips files that already exist (no overwrite)

4. **Report the resulting structure** to the user. List the created folders and note any that
   were skipped because they already existed.

5. **Suggest the next step.** The Dumont working order is: Game Idea → Core Mechanic → Exposé →
   Game Concept → Functional/Logical/Interface/Balancing in parallel → Change Log throughout.
   Recommend the user start by filling `01_GameIdea/01_GameIdea.md`.

## Output structure

```
<target-directory>/
├── 01_GameIdea/01_GameIdea.md
├── 02_CoreMechanic/02_CoreMechanic.md
├── 03_Exposé/03_Exposé.md
├── 04_GameConcept/04_GameConcept.md
├── 05_FunctionalDesign/05_FunctionalDesign.md
├── 06_LogicalConcept/06_LogicalConcept.md
├── 07_InterfaceConcept/07_InterfaceConcept.md
├── 08_BalancingAndParameters/08_BalancingAndParameters.md
└── 09_ChangeLog/09_ChangeLog.md
```

## References

- `assets/game_concept_templates_dumont.md` — full template definitions (sections 3.1–3.9) plus
  the workshop's recommended working order and short rules (sections 4 and 5)
- `scripts/init.mjs` — extraction and scaffolding script invoked in step 3
