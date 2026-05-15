# Workshop Part 4 — The Game Concept (Spielkonzept)

> **Source:** Making Games Magazin 06/2010, pp. 38–41 · **Author:** Daniel Dumont
> **Use:** Background for skills supporting `04_GameConcept.md` and all sub-documents

---

## TL;DR

The Game Concept is the implementation-grade design doc. **Never "done" at project start** — continuously maintained, complete only at end of dev. Always ahead of implementation. Split into **Logical Concept + Functional Design + Interface Concept**, developed in parallel. Three iron rules: no implementation without detailed concept, ideas official only after entering the concept, working change management.

---

## Agent Cheat Sheet

### Required properties of the Concept

| # | Property |
|---|---|
| 1 | Complete, concise, comprehensible description of game content |
| 2 | Maintained during development; finalized only at end of dev |
| 3 | **Always ahead of implementation** |
| 4 | Leaves little room for interpretation |

### "Detailed concept" (Feinkonzept) definition

> A game area is in detailed concept when no further meaningful additions can be made to improve its implementability.

### The three iron rules

| Rule | What it prevents |
|---|---|
| No implementation without detailed concept | Untracked design drift; missed feedback opportunities |
| Ideas official only after entering the concept | Wild growth; undocumented changes |
| Working change management | Trust erosion; downward spiral of disuse |

> **Horror scenario:** *a change lands in the game without being documented in the concept.*

### Top 5 benefits (Dumont's list, unordered)

1. Vision retention over multi-year development
2. Planning precision (better detail → better estimates)
3. Pre-implementation feedback from artists/programmers
4. Full design control + parameter lock for later balancing
5. QA test case basis — even unfamiliar testers can run them

### Sub-document split

| Sub-doc | Contains | Format |
|---|---|---|
| **Logical Concept** | Feature rules, world control, conditions, formulas, parameters, every fixed word | Word/text |
| **Functional Design** | What the player sees/does (gameplay flow, screens, controls) | Word/text |
| **Interface Concept** | HUD, screens, camera, control mapping | PowerPoint mockups |

- Logical Concept is **largest and most expensive**.
- Interface Concept developed **simultaneously** — they constrain each other.

### Structure rules

| Rule | Reason |
|---|---|
| Build from Exposé chapter-by-chapter | Reuse Exposé descriptions as chapter intros |
| Max 2 levels below each top-level chapter | Keep flat; small chunks → easier completion |
| Use forward references over deep nesting | Preserve overview |
| Extract shared parameter tables (e.g., per-class stats) | Avoid duplication across similar entities |

### Form rules

| Do | Don't |
|---|---|
| Plain language | Complicated explanations |
| Examples for complex ideas | Walls of text |
| Bullets, tables, illustrations, diagrams | Emphasis (bold/italic/color) beyond headings |
| Simple PowerPoint sketches | "Pretty" formatting |

### Detail-depth discipline (recap from Part 1)

- Uniform depth increase across all chapters
- Never drill one feature while others are still vague
- Start with broad chapter/sub-chapter scaffold

### Precision principle

> If anyone could still ask questions, the description is not complete.

- Includes all special cases and inter-feature dependencies
- Formulas/calculations belong in the concept — even rough; values come later
- Goal: identify relevant parameters + their relationships, not final values

### Change management — minimal viable process

| Step | Action |
|---|---|
| 1 | Mark changes inline (e.g., blue color) |
| 2 | Publish weekly versions with date in filename: `Konzept_17Jun2010` |
| 3 | After publication, clear marking, continue locally |
| 4 | Provide reader macro to jump color-marked sections |

### Constraints

| Constraint | Rule |
|---|---|
| Marking visibility | All changes must be marked |
| Readability | Marking must not reduce readability |
| Context preservation | Changes stay in concept context, not in sidecar docs |

### Anti-patterns

| Failure mode | Diagnostic | Fix |
|---|---|---|
| Treats concept as one-time doc | "Done" declared at project start | Reframe — concept grows; complete at end of dev |
| Implements before detailed-concept | Code lands without spec | Block; require detailed-concept status |
| Deep nesting (5+ levels) | Sub-sub-sub-sub | Flatten — max 2 below top |
| One feature in extreme depth, others vague | Inconsistent depth | Force uniform progression |
| Many similar entities described inline | 20 ship types, 20 detailed sections | Extract base table + per-entity deltas |
| Skips formulas ("we'll tune later") | "TBD" markers everywhere | Insist — relationships are structural |
| Heavy formatting (colors, bold) | Visual noise | Cut to plain text + headings only |
| Edge cases left implicit | "What if X happens?" unanswered | Demand explicit treatment |
| Change history absent | No version control | Set up weekly snapshot + inline marking |
| Change lands in game, not in concept | Horror scenario | Backfill immediately; remind of iron rule 2 |
| Interface designed independently | UI work happens after logic | Force parallel development |
| Complex game + complex interface | Player needs manual | Reduce **game** complexity, not interface |

---

## Worked example: Patrizier 4 concept structure

```
15  Ships and Convoys
  15.1  Ship types
  15.2  Convoys
  15.3  Shipyard
    15.3.1   Cost and build materials
    15.3.2   Shipyard bonus
    15.3.3   Build time
    15.3.4   Repair
    15.3.5   Ship upgrades
    15.3.6   Display of upgrade options
    15.3.7   Upgrade duration
    15.3.8   Large shipyard
    15.3.9   Ships in stock
    15.3.10  Rank-dependent ship prices
    15.3.11  Selling ships
  15.4  Crew
  15.5  Captains
  15.6  Mentors
  15.7  Upkeep
  15.8  Ship wear and tear
  15.9  Emergency repair

16  Player Progression
  16.1  Reputation
    16.1.1   Calculating reputation in a city
    16.1.2   Feedback to the user
    16.1.3   Starting reputation
    16.1.4   Reputation in the Hanseatic League
    16.1.5   Reputation loss through missions
  16.2  Rank
    16.2.1   Display of rank counter
    16.2.2   Rank tiers
    16.2.3   Tooltip
    16.2.4   Unlocks via rank
    16.2.5   Norm amount
  16.3  Guilds
    16.3.1   Membership
    16.3.2   Privileges
```

One game element (shipyard) can need 10+ sub-chapters. Short sections help later processing.

---

## Worked example: Patrizier 4 beggar formula

```
Allowed beggars         = 2 + Citizens * QoL / 5000
Daily inflow (if room)  = 0.2 * sqrt(Citizens) + 2
Daily outflow           = 0.1 * sqrt(Citizens) + 1
```

- Simple formulas, but the insight is structural: only `Citizens` matters; `sqrt` caps growth in large cities.
- Values can be tuned later; relationships belong in the concept now.

---

## Interface Concept method

| Step | Action |
|---|---|
| 1 | Pre-visualize in PowerPoint (text boxes, blocks, primitive buttons) |
| 2 | Lay out at correct sizes in rough screens |
| 3 | Verify space + clarity |
| 4 | Later: graphic artist replaces with real assets, programmer assembles |

---

## Cross-references

| Topic | See |
|---|---|
| Concept structure ← Exposé chapters | Part 3 |
| Detail-depth principle | Part 1 |
| Formula/parameter relationships expanded | Part 5 (Balancing) |
| AI/logic description method | Part 6 |
| Precision principle ("anyone could still ask") | Applies to all detailed-design stages |
