---
# ═══════════════════════════════════════════════════════════════════════════════
# TEMPLATE: Decision Log (ADR)
# STAGE: 00 - Status & Roadmap
# PURPOSE: Architecture Decision Record with context and consequences
# ═══════════════════════════════════════════════════════════════════════════════
tags:
  - type/decision
  - type/adr
  - project/{{project}}
  - stage/00-status
aliases:
  - "ADR-{{number}}"
cssclass: adr
# ─────────────────────────────────────────────────────────────────────────────
lead: "Architecture/business decision with context, options, and consequences"
banner: ""
icon: "⚖️"
created: "{{date:YYYY-MM-DD}}"
modified: "{{date:YYYY-MM-DD}}"
template:
  name: "Decision Log"
  version: "2.0"
  stage: "00"
# ─────────────────────────────────────────────────────────────────────────────
project: "{{project}}"
adr_id: "ADR-{{number}}"
adr_status: proposed    # proposed | accepted | deprecated | superseded
decision_date: ""
supersedes: ""
superseded_by: ""
---

# ADR-{{number}}: {{title}}

> [!note] `= this.icon` Status: `= this.adr_status`
> `= this.lead`

## Context

What problem are we solving? What constraints exist?

- 
- 

## Options Considered

### Option A: [Name]
| Pros | Cons |
|------|------|
| | |

### Option B: [Name]
| Pros | Cons |
|------|------|
| | |

## Decision

**Chosen**: Option [X]

**Rationale**: 

## Consequences

| Type | Impact |
|------|--------|
| ✅ Positive | |
| ⚠️ Negative | |
| ➡️ Neutral | |

## Implementation

- [ ] Task 1
- [ ] Task 2

---
## Back Matter

**Source**:: [[Tech Stack]], [[PRD]]
**References**:: [[Architecture.canvas]]
**Supersedes**:: `= this.supersedes`
**Superseded By**:: `= this.superseded_by`
**Used By**:: [[Backlog]]

---
**Open Questions**
- ❓ 

**Action Items**
- [ ] Implement decision
- [ ] Update documentation
