---
# ═══════════════════════════════════════════════════════════════════════════════
# TEMPLATE: Project MOC (Map of Content)
# STAGE: 00 - Project Root
# PURPOSE: Central navigation hub linking all project documentation
# ═══════════════════════════════════════════════════════════════════════════════
tags:
  - type/moc
  - project/{{title}}
  - stage/00-status
aliases:
  - "{{title}}"
  - "{{title}} Project"
cssclass: project-moc
# ─────────────────────────────────────────────────────────────────────────────
# NOTE METADATA
# ─────────────────────────────────────────────────────────────────────────────
lead: "One-line business value hypothesis for this project"
banner: "![[banner-project.jpg]]"
icon: "🚀"
created: "{{date:YYYY-MM-DD}}"
modified: "{{date:YYYY-MM-DD}}"
template:
  name: "Project MOC"
  version: "2.0"
  stage: "00"
# ─────────────────────────────────────────────────────────────────────────────
# PROJECT METADATA
# ─────────────────────────────────────────────────────────────────────────────
project: "{{title}}"
status: active          # active | paused | completed | archived
phase: discovery        # discovery | validation | build | growth | scale
priority: 3             # 1=critical, 2=high, 3=medium, 4=low, 5=someday
owner: ""
stakeholders: []
started: "{{date:YYYY-MM-DD}}"
deadline: ""
repo: ""
---

# {{title}} — Project Hub

![[banner-project.jpg]]

> [!abstract] `= this.icon` Business Value Hypothesis
> `= this.lead`

## Quick Navigation

| Stage | Area | Key Documents |
|-------|------|---------------|
| 00 | Status & Roadmap | [[Status Dashboard]] · [[Roadmap]] · [[Decision Log]] |
| 01 | Market Analysis | [[Market Overview]] · [[Competitor Map]] · [[SWOT Analysis]] |
| 02 | User Research | [[Persona - Primary]] · [[Empathy Map]] · [[Interview Notes]] |
| 03 | Product | [[PRD]] · [[Lean Canvas]] · [[Value Proposition Canvas]] |
| 04 | Design | [[UX Flow]] · [[Wireframes]] · [[Copy Playbook]] |
| 05 | Technical | [[Tech Stack]] · [[Architecture.canvas]] · [[Deploy Guide]] |
| 06 | Engineering | [[Backlog]] · [[Current Sprint]] · [[Validation Plan]] |
| 07 | Analytics | [[KPIs]] · [[Experiment Log]] · [[Channel Tests]] |
| 08 | Legal | [[GDPR Notes]] · [[Privacy Policy]] |

## Project Pulse

### Recent Activity
```dataview
TABLE type AS "Type", modified AS "Updated"
FROM "Projects/{{title}}"
WHERE file.name != this.file.name
SORT modified DESC
LIMIT 8
```

### Open Tasks
```dataview
TASK FROM "Projects/{{title}}"
WHERE !completed
SORT priority ASC
LIMIT 10
```

## Key Metrics

| Metric | Target | Current | Status |
|--------|--------|---------|--------|
| Signups | 200 | — | ⚪ |
| Conversion | ≥5% | — | ⚪ |
| WTP Signal | ≥20% | — | ⚪ |

## External Links

- **Repository**: [GitHub](...)
- **Design**: [Figma](...)
- **Analytics**: [Plausible](...)
- **Automation**: [n8n](...)

---
## Back Matter

**Source**:: 
**References**:: [[Dashboard]]
**Terms**:: 
**Used By**:: 

---
**Open Questions**
- ❓ 

**Action Items**
- [ ] 
