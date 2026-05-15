# Workshop Part 5 — Early Balancing & Extreme Balancing

> **Source:** Making Games Magazin 01/2011, pp. 32–35 · **Author:** Daniel Dumont
> **Use:** Background for skills supporting `08_BalancingAndParameters.md` and parameter work in `04_GameConcept.md`

---

## TL;DR

Theoretical balancing happens **before** implementation. The method **Extreme Balancing** focuses on **extreme situations** under **extreme assumptions**, working backwards from desired game-feel into parameters. Once extremes are balanced, normal cases follow. Does not replace play testing — makes it faster and tells you which knob to turn first.

---

## Agent Cheat Sheet

### Why theoretical balancing (Dumont's three reasons)

1. Some balancing problems can't be solved by trial-and-error
2. Working out parameters sharpens the designer's understanding of the feature
3. A complete feature description must contain all formulas, parameters, relationships

### Method: Extreme Balancing

Two core ideas:

#### 1. Extreme Situations

| Pick | Reject |
|---|---|
| Player attacks one enemy head-on, all weapons firing | Average fights |
| Player sits on enemy's tail and won't let go | Mixed engagements |
| Moments of peak fun / peak tension | Mid-difficulty scenarios |

> If extremes balance, normal situations balance too.

#### 2. Extreme Assumptions

| Approach | Example |
|---|---|
| Don't tune values to reach result | Hull/shield ratio: 3 cases (small/large/equal) |
| Bake result directly into calculation | Equal hull+shield = warning + retreat option |

Worked through: shield/hull ratio. Three cases:

| Case | Shield vs. Hull | Outcome |
|---|---|---|
| A | Small shield, large hull | Shield melts fast → no gameplay role |
| B | Large shield, small hull | Shield gone = ship doomed |
| C | Equal | Shield loss = warning → tactical decision |

Only C gives good game-feel → set hull = shield. **Extreme assumption** baked in.

### Working backwards rule

> Don't tune values to reach a desired result. Define the desired flow first; let it drive value computations.

### What survives real play (and what doesn't)

| Element | Survives real chaos? |
|---|---|
| Exact theoretical values | No — many parameters overlap, "blurring" traces |
| Direction of progression | Yes — combat duration shrinking, weapon power growing |
| Chosen formula shapes | Yes — linear/quadratic/exponential intent persists |

> Real chaos is **intentional**. It blurs the traces the balancing would otherwise leave.

### Curve choice cheat sheet

| Goal | Shape |
|---|---|
| Steady incremental progression | Linear |
| Slowing growth | Square root / log |
| Accelerating growth | Quadratic / exponential |
| Power curve over long timeframes | Exponential (Darkstar One total HP / DPS) |

> With linear, quadratic, and exponential, you can really get everything done.

### Anti-patterns

| Failure mode | Diagnostic | Fix |
|---|---|---|
| Trial-and-error tuning | "Let's just try values" | Force extreme situations + assumptions first |
| Tuning many parameters to one outcome | 5 knobs for 1 effect | Bake outcome into formula |
| Diverse units with diverse stats | Confusing balance | Collapse defense to HP, offense to damage |
| Linear progression by default | No curve discussion | Ask intended shape; show diagram |
| Skips formulas ("values change later") | Concept has only target numbers | Insist on relationships; values placeholder |
| Tuning during implementation only | No theoretical work | Some problems can only be solved theoretically |
| No diagrams | Curves invisible | Add — exposes unintended shapes |

### Three diagnostic moves

1. Identify the 2–3 most demanding situations
2. State an extreme assumption (equality/ratio) that bakes in desired feel
3. Pick one anchor parameter, derive the rest, sanity-check the curve

---

## Worked example: Darkstar One ship progression

### Driving constraints

- Ship levels up like an RPG character
- Each level unlocks new weapon classes, more weapon mounts, higher shield/hull
- Enemy strength must scale to keep difficulty
- Player must defeat multiple enemies sequentially
- Combat must not last too long per enemy

### Stage table (first six ship levels)

| Ship Level | Weapon Class | Shield Class | Weapons |
|---|---|---|---|
| 0 | 1 | 1 | 1 |
| 1 | 2 | 1 | 1 |
| 2 | 2 | 2 | 1 |
| 3 | 3 | 2 | 2 |
| 4 | 3 | 3 | 2 |
| 5 | 3 | 3 | 2 |

Notes:
- Classes upgrade **faster early than late** — keeps early ramp exciting
- Weapon and shield classes don't upgrade simultaneously — player has something to optimize at every level

### Balancing table

| Ship Level | Hull HP | Shield HP | Damage/s | Total/s | Hits & Duration |
|---|---|---|---|---|---|
| 0 | 100 | 100 | 20.00 | 20.00 | 10.00 |
| 1 | 115 | 100 | 28.80 | 28.80 | 7.47 |
| 2 | 132 | 132 | 28.80 | 28.80 | 9.17 |
| 3 | 152 | 132 | 34.56 | 69.12 | 4.11 |
| 4 | 175 | 175 | 34.56 | 69.12 | 5.06 |
| 5 | 201 | 175 | 34.56 | 69.12 | 5.44 |

### Derivation

| Step | Rule | Value |
|---|---|---|
| 1 | Anchor parameter | Hull HP @ L0 = 100 (arbitrary) |
| 2 | Hull growth per level | +15% (players notice this magnitude) |
| 3 | Shield HP = Hull HP | But shield only updates when shield class upgrades |
| 4 | Weapon damage = (Shield+Hull) / 10 | At L0: 20 damage/s |
| 5 | Combat duration | min 10s @ L0 (extreme assumption: always in firing arc) |
| 6 | Later weapon classes decouple from hull | +20% weapon growth → asynchronous evolution |
| 7 | Total damage | = damage × weapon count |
| 8 | Combat duration + required hits | Derived |

### Critical assumption

> All fired shots hit. In reality they don't, so duration will be higher. Live-game tuning later multiplies received player damage by 0.5–2.0 to adjust difficulty + enemy density.

### Why decreasing combat duration matters

| Phase | Enemies per fight | Required combat duration |
|---|---|---|
| Early | 1 | Longer (player still learning) |
| Mid | 2-3 | Medium |
| Late | ~5 average | Short — player picks off enemies sequentially while holding others off |

---

## Further applications

### Production / consumption systems

| Step | Action |
|---|---|
| 1 | Define end-state **consumption** target |
| 2 | Compute required **inputs** under varying assumptions → demand profile |
| 3 | **Then** derive production from that profile |

Reverse-engineer from output to input.

### Strategy game units

| Property | Expression |
|---|---|
| All defensive abilities | Express as HP |
| All offensive abilities | Express as damage |
| Range, movement | Auxiliary derived quantities (e.g., "damage taken until in range") |

Example: ranged unit deals **one-time bonus damage** = damage taken by a melee unit before it closes. Movement is folded into damage calc upfront.

---

## What still needs play testing

| Replaces? | Not replaced |
|---|---|
| Initial parameter relationships | Player feel |
| Curve shapes | Coarse player-strength tuning (factor 0.5–2.0 on received damage) |
| Identifying tunable knobs | Final tuning per knob |

---

## Cross-references

| Topic | See |
|---|---|
| Why formulas belong in concept | Part 4 (Concept) precision principle |
| What "extreme" means for situations | Defined by core mechanic — Part 2 |
| Method extended to AI behaviors | Part 6 (situation/reaction balancing) |
