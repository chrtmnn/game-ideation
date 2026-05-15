# Workshop Part 3 — The Exposé

> **Source:** Making Games Magazin 05/2010, pp. 44–47 (chapters 1–8 in print; 9–16 published online) · **Author:** Daniel Dumont
> **Use:** Background for skills supporting `03_Exposé.md`

---

## TL;DR

The Exposé is "much more than the Game Idea, much less than the Game Concept". A **16-chapter document, ~20 pages, 1–3 weeks** of work for a 1–2-year project. Reveals weaknesses early, locks USPs, structures the path to the full Concept, doubles as publisher pitch. Pre-built question structure removes the burden of designing a template.

---

## Agent Cheat Sheet

### Structure — 16 chapters (mandatory order)

| # | Chapter | Imports/derives from | Key output |
|---|---|---|---|
| 1 | Idea & Vision Statement | Part 1 + Part 2 verbatim | Vision + mechanic |
| 2 | USPs | Part 1 §5 (sharpened) | 3 surprising, memorable differentiators |
| 3 | Player Tasks | New | Task distribution table (start/mid/end) |
| 4 | Gameplay Example | New | 60-sec narrated core situation |
| 5 | Visual Presentation | Part 1 §4 (deepened) | Setting, style, character, reference images |
| 6 | Core Features | Part 2 binding-features list | Must-haves only + reward systems |
| 7 | Additional Features | New | Cuttable "nice-to-haves" |
| 8 | Interface | New | HUD sketch, controls, screen list |
| 9 | Game World and Story | New | Structure, factions, locations |
| 10 | Game Structure | New | Segments, modes, missions, phases |
| 11 | List of All Game Modes | New | Mandatory vs. optional |
| 12 | Target Audience and Platforms | New | Who, where, requirements |
| 13 | Critical Points | New | Risks, fragile assumptions |
| 14 | Team Size and Structure | New | Roles, criticality |
| 15 | Tools and Middleware | New | Engines, technical foundation |
| 16 | Development Timeframe | New | Duration, milestones |

### Chapter-specific rules

#### §2 USPs — pass/fail tests

| Rule | Fail if |
|---|---|
| Must be easy to understand and memorable | Need >1 sentence to explain |
| Must be **surprising** | Press/players already expect it ("good AI", "nice graphics") |
| 1–3 USPs only | More than 3 |
| Locked at Exposé sign-off | Drift afterwards |

#### §3 Player Tasks — required deliverable

- **Task distribution table** with columns `start / mid / end` (if tasks shift over time)
- Rule: *the more time a user spends on a task, the more interestingly it must be designed*
- Time-spent heuristics:

| Player spends time on | Required quality |
|---|---|
| One dialog (trade, dialog interface) | Perfect |
| Large world | Visually rich + varied |
| Combat-heavy (pure shooter) | Tight combat |
| Combat in mixed game (Fallout 3, Borderlands) | Less critical (skills/stats also carry it) |

- General rule: **larger task → larger dev effort → higher quality required**
- If team can't deliver a planned task, find substitutes (e.g., teleporters to reduce open-world time)

#### §4 Gameplay Example — 60 seconds

| Must cover | Form |
|---|---|
| Detailed flow | Plain prose |
| What player sees | Sentence each |
| Camera movement | Sentence each |
| Player thoughts + decisions + why | Inline |
| Controls used | Inline |
| Sound/music/effects | Inline |

- Game-time: 10–20 sec real. Exposé description must be richer = 60 sec narrated.
- Style: concise, not marketing copy.

#### §5 Visual Presentation — required questions

- Setting / style / protagonist appeal / environment appeal
- Visual variety / effects / staged moments / how player is rewarded visually
- **Use reference images** from films/games/photos. Describe deltas. Don't draw your own.
- Reference images convey **mood**, not detail.
- Final question: can team + budget deliver this?

#### §6 Core Features — discipline

> Only what is **essential** goes here. Everything else → §7.

- Decompose every mechanic into atomic features (Part 2 method)
- **Reward systems** mandatory. Plan all three horizons:

| Horizon | Example (Diablo) |
|---|---|
| Short-term (~1 min) | Mow down monsters, collect loot |
| Medium-term (~30 min) | Level up, learn skills |
| Long-term (hours) | End-of-chapter cutscene, new biome, new enemy types |

- Other reward categories: gripping/funny story, gameplay/enemy progression, visual upgrades, achievements/titles/trophies, community visibility (leaderboards, statues, medals)

#### §7 Additional Features — purpose

- Two reasons to identify cuttable features:
  1. Must-haves list shrinks → focus
  2. Project becomes **scalable** → adjust secondary-feature scope to time/budget

#### §8 Interface — principle

> The complexity of the game must match the complexity of the interface.

- Goal: **simplest possible interface for the most complex possible game**
- When too much info / too many controls → **reduce game complexity**, not bloat interface
- Required deliverables:

| Deliverable | Form |
|---|---|
| HUD overview | Boxes + labels on screen mockup |
| Key/controller mapping | One example noted (will change) |
| Screen/menu list | Plain list. Some games: 1 menu. Others: 30–40 |
| Control philosophies | e.g., "right-click radial menu opens all areas" |
| Interaction model | World / objects / NPCs |
| Physics-relevant gameplay | yes/no |

### Document properties (all chapters)

| Property | Value |
|---|---|
| Total length | ~20 pages (1–2-year project) |
| Effort | 1–3 weeks (with experience) |
| Audience | Internal team; later: publisher |
| Function | Reveals weaknesses, locks USPs, structures concept work |

### Anti-patterns

| Failure mode | Diagnostic | Fix |
|---|---|---|
| Treats Exposé as marketing copy | Polished language, no weaknesses surfaced | Reframe as internal weakness-finder |
| Skips Gameplay Example | "Too hard to write" | Insist — biggest learning |
| Lists non-essential in §6 | >10 features in core | Move surplus to §7 |
| USPs every game claims | "Beautiful graphics", "smart AI" | Reject; demand surprise |
| Interface complexity ≈ game complexity | UI requires expert knowledge | Reduce game complexity |
| Generic visuals | No reference images | Demand mood-board with deltas |
| No Critical Points list | §13 empty | Force — gates kickoff |
| Writes Exposé before Game Idea stable | §1 can't be filled cleanly | Block; finish stage 1 first |

### Diagnostic moves

1. Run `Part 1 + Part 2 → §1` import check
2. Inspect §2 USPs against the four pass tests (memorable / surprising / ≤3 / locked)
3. Verify §3 has a task distribution table with start/mid/end columns
4. Verify §4 narrates ~60 seconds with all required dimensions covered
5. Verify §6 has reward systems for all three time horizons
6. Verify §13 actually lists risks (not "none")

---

## Quick reference — USP examples

| Qualifies as USP | Does NOT qualify |
|---|---|
| New graphical effects of a novel kind | "Beautiful graphics" |
| Massive living world | "Many things to do" |
| Genre revival (dormant genre returning) | "Refined controls" |
| Surprising hybrid mechanic | "Solid AI" |

---

## Cross-references

| Topic | See |
|---|---|
| §1 imports | Part 1 + Part 2 |
| §6 decomposition method | Part 2 |
| §8 expansion (parallel doc) | Part 4 — Interface Concept |
| §13 → project kickoff gate | Part 4 (Concept) |
| USP discipline | Part 1 §5 |
