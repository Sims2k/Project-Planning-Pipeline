---
# ═══════════════════════════════════════════════════════════════════════════════
# TEMPLATE: Experiment
# STAGE: 07 - Analytics & Growth
# PURPOSE: Hypothesis-driven validation experiment
# ═══════════════════════════════════════════════════════════════════════════════
tags:
  - type/experiment
  - type/validation
  - project/{{project}}
  - stage/07-analytics
aliases: []
cssclass: experiment
# ─────────────────────────────────────────────────────────────────────────────
lead: "Hypothesis-driven experiment with metrics and decision criteria"
banner: ""
icon: "🧪"
created: "{{date:YYYY-MM-DD}}"
modified: "{{date:YYYY-MM-DD}}"
template:
  name: "Experiment"
  version: "2.0"
  stage: "07"
# ─────────────────────────────────────────────────────────────────────────────
project: "{{project}}"
status: active
experiment_status: running  # planned | running | complete | stopped
---

# Experiment: {{title}}

> [!experiment] `= this.icon` Hypothesis
> **IF** we [action],  
> **THEN** we expect [outcome],  
> **BECAUSE** [reasoning].

## Setup

| | |
|---|---|
| **Variable** | |
| **Control** | |
| **Variant** | |
| **Duration** | |
| **Sample Size** | |

## Success Criteria

| Metric | Minimum | Target | Stretch |
|--------|---------|--------|---------|
| | | | |

## Results

| Metric | Control | Variant | Δ | Significant? |
|--------|---------|---------|---|--------------|
| | | | | |

## Learnings

- **Validated**: 
- **Invalidated**: 
- **Surprising**: 

## Decision

```
IF met → PROCEED
ELIF partial → ITERATE  
ELSE → PIVOT/STOP
```

**Decision**: 

---
## Back Matter

**Source**:: [[Validation Plan]]
**References**:: [[KPIs]]
**Used By**:: [[Decision Log]], [[Status Dashboard]]

---
**Open Questions**
- ❓ 

**Action Items**
- [ ] 
