---
# ═══════════════════════════════════════════════════════════════════════════════
# TEMPLATE: Status Dashboard
# STAGE: 00 - Status & Roadmap
# PURPOSE: Project-level metrics, phase tracking, and decision gates
# ═══════════════════════════════════════════════════════════════════════════════
tags:
  - type/dashboard
  - project/{{project}}
  - stage/00-status
aliases:
  - "{{project}} Dashboard"
cssclass: dashboard
# ─────────────────────────────────────────────────────────────────────────────
lead: "Real-time project status with phase tracking and decision gates"
banner: "![[banner-dashboard.jpg]]"
icon: "📊"
created: "{{date:YYYY-MM-DD}}"
modified: "{{date:YYYY-MM-DD}}"
template:
  name: "Status Dashboard"
  version: "2.0"
  stage: "00"
# ─────────────────────────────────────────────────────────────────────────────
project: "{{project}}"
status: active
phase: discovery
---

# {{project}} — Status Dashboard

> [!info] `= this.icon` Current Phase: `= this.phase`
> `= this.lead`

## Phase Progress

| Phase | Status | Gate Criteria | Decision |
|-------|--------|---------------|----------|
| 1. Discovery | 🟡 Active | Market + Personas complete | — |
| 2. Validation | ⚪ Pending | 200 signups, ≥20% WTP | — |
| 3. Build | ⚪ Pending | Engagement metrics met | — |
| 4. Growth | ⚪ Pending | Positive unit economics | — |

## Key Metrics

```dataview
TABLE 
  target AS "Target",
  current AS "Current", 
  status AS "Status"
FROM "Projects/{{project}}/07_Analytics & Growth"
WHERE type = "kpi"
```

## Recent Decisions

```dataview
TABLE status AS "Status", created AS "Date"
FROM "Projects/{{project}}"
WHERE type = "decision"
SORT created DESC
LIMIT 5
```

## This Week's Focus

```dataview
TASK FROM "Projects/{{project}}/06_Engineering/Sprints"
WHERE !completed
LIMIT 10
```

---
## Back Matter

**Source**:: [[{{project}} MOC]]
**References**:: [[Roadmap]], [[Decision Log]]
**Used By**:: [[Dashboard]]

---
**Open Questions**
- ❓ 

**Action Items**
- [ ] Update weekly
