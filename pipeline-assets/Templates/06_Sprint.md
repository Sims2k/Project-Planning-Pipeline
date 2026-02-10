---
# ═══════════════════════════════════════════════════════════════════════════════
# TEMPLATE: Sprint
# STAGE: 06 - Engineering
# PURPOSE: Time-boxed work cycle with goals and retrospective
# ═══════════════════════════════════════════════════════════════════════════════
tags:
  - type/sprint
  - type/engineering
  - project/{{project}}
  - stage/06-engineering
aliases:
  - "Sprint {{date:YYYY-MM-DD}}"
cssclass: sprint
# ─────────────────────────────────────────────────────────────────────────────
lead: "2-week sprint with goals, tasks, and retrospective"
banner: ""
icon: "🏃"
created: "{{date:YYYY-MM-DD}}"
modified: "{{date:YYYY-MM-DD}}"
template:
  name: "Sprint"
  version: "2.0"
  stage: "06"
# ─────────────────────────────────────────────────────────────────────────────
project: "{{project}}"
status: active
sprint_start: "{{date:YYYY-MM-DD}}"
sprint_end: ""
capacity_hours: 40
---

# Sprint — {{date:YYYY-MM-DD}}

> [!abstract] `= this.icon` Sprint Goal
> What must we accomplish?

## Details

| | |
|---|---|
| **Start** | `= this.sprint_start` |
| **End** | `= this.sprint_end` |
| **Capacity** | `= this.capacity_hours` hours |

## Sprint Backlog

### Must Complete (P0)
- [ ] Task 1 (Xh)
- [ ] Task 2 (Xh)

### Should Complete (P1)
- [ ] Task 3 (Xh)

### Stretch
- [ ] Task 4 (Xh)

## Daily Log

### Day 1
- **Done**: 
- **Today**: 
- **Blockers**: 

## Metrics

| Metric | Target | Actual |
|--------|--------|--------|
| Tasks Done | | |
| Hours Spent | | |

## Retrospective

### What went well?
- 

### What could improve?
- 

### Action Items
- [ ] 

---
## Back Matter

**Source**:: [[Backlog]]
**References**:: [[PRD]]
**Used By**:: [[Status Dashboard]]

---
**Open Questions**
- ❓ 

**Action Items**
- [ ] Complete retrospective
