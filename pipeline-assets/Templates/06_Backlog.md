---
# ═══════════════════════════════════════════════════════════════════════════════
# TEMPLATE: Backlog
# STAGE: 06 - Engineering
# PURPOSE: Prioritized development tasks and technical debt
# ═══════════════════════════════════════════════════════════════════════════════
tags:
  - type/backlog
  - type/engineering
  - project/{{project}}
  - stage/06-engineering
aliases:
  - "{{project}} Tasks"
cssclass: backlog
# ─────────────────────────────────────────────────────────────────────────────
lead: "Prioritized development backlog with estimates and ownership"
banner: ""
icon: "📝"
created: "{{date:YYYY-MM-DD}}"
modified: "{{date:YYYY-MM-DD}}"
template:
  name: "Backlog"
  version: "2.0"
  stage: "06"
# ─────────────────────────────────────────────────────────────────────────────
project: "{{project}}"
status: active
---

# Backlog — {{project}}

> [!note] `= this.icon`
> `= this.lead`

## Priority Legend

| Priority | Meaning |
|----------|---------|
| **P0** | Must have (blocking) |
| **P1** | Should have (important) |
| **P2** | Nice to have |
| **P3** | Future consideration |

## P0 — Critical

| ID | Task | Est | Owner | Status |
|----|------|-----|-------|--------|
| | | | | ⚪ |

## P1 — Important

| ID | Task | Est | Owner | Status |
|----|------|-----|-------|--------|
| | | | | ⚪ |

## P2 — Backlog

| ID | Task | Est | Status |
|----|------|-----|--------|
| | | | ⚪ |

## Technical Debt

| ID | Issue | Impact | Status |
|----|-------|--------|--------|
| | | | ⚪ |

## Icebox

- [ ] 
- [ ] 

---

## All Open Tasks

```dataview
TASK FROM "Projects/{{project}}"
WHERE !completed
SORT priority ASC
```

---
## Back Matter

**Source**:: [[PRD]], [[MVP Spec]]
**References**:: [[Current Sprint]], [[Tech Stack]]
**Used By**:: [[Status Dashboard]]

---
**Open Questions**
- ❓ 

**Action Items**
- [ ] Groom weekly
