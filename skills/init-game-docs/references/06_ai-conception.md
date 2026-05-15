# Workshop Part 6 — AI Conception

> **Source:** Making Games Magazin 02/2011, pp. 30–34 · **Author:** Daniel Dumont
> **Use:** Background for skills supporting AI behavior design within the Game Concept

---

## TL;DR

Same decomposition trick as elsewhere: large system → small understandable pieces. Unit of decomposition for AI: **Situation → Reaction**. The hard part is **describing situations** (the AI's "senses"); reactions are easy. Multi-object AI handled by **adding AI layers**. Long scripted reactions are **maneuvers**. Goal: an AI that *appears* simulative while being concept-able in clean, balanceable chunks.

---

## Agent Cheat Sheet

### AI styles

| Style | Behavior | Use |
|---|---|---|
| Fully simulated | Object freely picks from action list per situation | Rare in games |
| Scripted | Fixed sequence, varies per user behavior | End-bosses; patrols |
| **Mixed (recommended)** | Script until disturbed; situation-based thereafter | Most AI |

> No real game contains a "real AI" in the strong sense. Games check action lists and pick one. Modern shooters trend toward **more scripting**, not less.

### Core method: Situation → Reaction

| Conception phase | Game runtime |
|---|---|
| Describe situations | Determine current situation |
| Define reactions per situation | Look up matching reactions |
| Clarify selection method | Pick one reaction (random or sorted) |

### Hard problem identification

> Situations are the AI's senses. What the AI cannot perceive, it cannot respond to.

| Easy | Hard |
|---|---|
| Reactions (imagine yourself doing it) | Situations (must be precise math/logic) |
| Action choice | Detecting which situation applies |
| Action execution | Computing required parameters efficiently |

### Situation hygiene

| Rule | Reason |
|---|---|
| Describe situation-evaluation parameters in their own section | Feasibility/cost transparent |
| Reuse parameters across situations | Smaller implementation; easier balancing |
| Describe situations as simply as possible | Easier testing, robust runtime |
| Use as few situations as possible | Recheck for merge candidates |
| Watch parameter cost | Some (e.g., shortest path with dynamic objects) require heavy compute or specialized AI tools |

### Multi-match resolution (when multiple situations match)

| Strategy | Behavior | Trade-offs |
|---|---|---|
| Test all, pick randomly | Tests every situation, remembers matches, random pick | Variety; harder to test |
| **Sort by importance, early-exit** (preferred) | Iterate in order; first positive match wins | Deterministic for given state; more performant; safer balancing |

### Mandatory rule

> At least one situation must always match. **Define a default situation with a default behavior** in the concept.

Without this, AI does nothing.

### Maneuvers (extended scripted reactions)

| Property | Note |
|---|---|
| Run like a script | No situation checks during execution |
| Always play to completion | Cannot be interrupted |
| Length range | Typically 5–10 seconds |
| Risk grows with length | Player may exploit; AI looks "stupid" |
| Situation params can still flow in | E.g., overtake adapts to current car position |

### Multiple players against one boss (Sacred 2 method)

Greatest-threat formula:

```
threat_value(player) =
    A * received_damage_since_last_focus
  + B * hits_received_without_reaction_since_last_focus
  + C * angle_position           [front = max, back = min]
  + D * inverse_distance         [close = max]
```

| Variable | Meaning |
|---|---|
| Received damage | Total damage from this player since last focus |
| Hits without reaction | Hit count since last focus |
| Angle | Max when player directly in front; min when behind. Boss stays facing frontal attackers |
| Inverse distance | Max when close. Boss prefers nearby threats |

**Tuning rule:** B must be large enough that **every player eventually rotates into focus**, even one hitting weakly from far behind.

**Reduction trick:** once a player is picked, treat fight as single-player versus that player. Then layer multi-player awareness onto specific actions:
- Fireball: check if other players near the focused one
- Lava stream: check if other players stand between boss and focused one

### AI layers (many-body problem)

| Situation | Method |
|---|---|
| 20 AI objects interacting | Cannot fit in one situation list — add another AI layer |
| Restriction | Only group situations of similar nature (e.g., same kind of AI object) |

#### Two-layer setup — shooter squad example

| Layer | Job |
|---|---|
| Individual AI | Detect own situation, pick reaction (attack/cover/flank) |
| Squad AI | Evaluate possible actions across team; **modify Individual AI's weighting** — does NOT issue direct commands |

| Squad AI observes | Squad AI weights |
|---|---|
| Player has low HP | "Take cover" → lower (push for kill) |
| Squad covers too small an angular range | "Flank" → higher |

#### Two-layer setup — Dumont's own games

| Game | Layer 1 (Individual) | Layer 2 (Group) |
|---|---|---|
| Darkstar One | Ship AI (ant principle) — own survival, attacks from target list, may modify priorities | Wing AI — assigns priorities for all targets, produces target list |
| Patrizier IV | Each trader picks own best route | Higher AI — considers trader count, ship count, ship size, businesses |

### Closing rules

| Rule | Reason |
|---|---|
| Verbalize first, formalize math later | Vision precedes implementation detail |
| Describe situations as simply as possible | Easier testing/balancing; robust runtime |
| Use as few situations as possible | Merge redundant; cull low-importance |
| Watch stability — no yo-yo reactions | Reaction A must not trigger Reaction ¬A next tick |
| Always have a default situation | AI must always have something to do |

### Anti-patterns

| Failure mode | Diagnostic | Fix |
|---|---|---|
| "Smart AI" without decomposition | One giant logic blob | Force Situation → Reaction split |
| Elaborate reactions, vague situations | Reactions detailed; situations hand-waved | Pivot focus to situations — the actual problem |
| No default situation | AI can fail to act | Add immediately |
| Long scripted moves | Maneuvers >10 sec | Allow but flag exploit risk |
| Many-body AI without layers | 20-object logic in one place | Add group/squad layer |
| Parameters repeated across situations | Code/concept duplication | Extract; reuse |
| Situations multiply without bound | Indistinguishable cases | Merge or cull |
| Reactions create yo-yo | A→¬A→A | Flag stability risk |
| Tries to build "real AI" with no action list | Theoretical purity, no benefit | Reality check — games don't need it |
| Boss vs. multi-player with naive targeting | Most players ignored | Apply greatest-threat formula |

---

## Diagnostic moves

1. **Inventory situations** — list all distinct situations the AI must perceive
2. **For each, define reactions + selection method** (random vs. sorted-by-importance)
3. **If multi-object interaction**, introduce a group-AI layer that modifies weightings (not commands)

---

## Cross-references

| Topic | See |
|---|---|
| Mechanic dictates situation set | Part 2 |
| AI rules in the Logical Concept | Part 4 |
| Situation-parameter balancing | Part 5 (Extreme Balancing) |
