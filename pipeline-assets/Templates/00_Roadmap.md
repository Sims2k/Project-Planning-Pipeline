---
# ═══════════════════════════════════════════════════════════════════════════════
# TEMPLATE: Roadmap
# STAGE: 00 - Status & Roadmap
# PURPOSE: High-level timeline with phases, milestones, and decision gates
# ═══════════════════════════════════════════════════════════════════════════════
tags:
  - type/roadmap
  - project/{{project}}
  - stage/00-status
aliases:
  - "{{project}} Roadmap"
cssclass: roadmap
# ─────────────────────────────────────────────────────────────────────────────
lead: "Phase-based roadmap with milestones and decision gates"
banner: "![[banner-roadmap.jpg]]"
icon: "🗺️"
created: "{{date:YYYY-MM-DD}}"
modified: "{{date:YYYY-MM-DD}}"
template:
  name: "Roadmap"
  version: "2.0"
  stage: "00"
# ─────────────────────────────────────────────────────────────────────────────
project: "{{project}}"
status: active
phase: discovery
---

# {{project}} — Roadmap

> [!note] `= this.icon` 
> `= this.lead`

## Visual Timeline

![[Roadmap.canvas]]

## Phase Details

### Phase 1: Discovery & Validation (2-4 weeks)
**Goal**: Prove market demand before building

**Deliverables**:
- [ ] Market Overview
- [ ] Persona profiles (2-3)
- [ ] Landing page live
- [ ] Traffic experiment running

**Gate**: 200 signups OR ≥5% conversion + ≥20% WTP

---

### Phase 2: Prototype (4-8 weeks)
**Goal**: Convert signups into engaged users

**Deliverables**:
- [ ] Interactive demo
- [ ] A/B tested landing
- [ ] Email sequence

**Gate**: Engagement metrics sufficient

---

### Phase 3: MVP (2-4 months)
**Goal**: First paying customers

**Deliverables**:
- [ ] User accounts
- [ ] Core features
- [ ] Payment integration

**Gate**: Paying users + positive unit economics

---

### Phase 4: Growth (ongoing)
**Goal**: Scale what works

**Deliverables**:
- [ ] Mobile app
- [ ] Integrations
- [ ] Growth loops

## Milestones

| Milestone | Target Date | Status |
|-----------|-------------|--------|
| Landing live | | ⚪ |
| 100 signups | | ⚪ |
| First payment | | ⚪ |

---
## Back Matter

**Source**:: [[{{project}} MOC]]
**References**:: [[Status Dashboard]], [[Decision Log]]
**Used By**:: [[Backlog]]

---
**Open Questions**
- ❓ 

**Action Items**
- [ ] Review roadmap weekly
