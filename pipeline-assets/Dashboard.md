---
tags:
  - type/dashboard
aliases:
  - Home
  - Index
cssclass: dashboard
lead: Central command center for all projects, tasks, and insights
icon: 🎯
created: 2026-02-02
modified: 2026-02-02
updated: 2026-02-06T11:48
---

# 🎯 Project Brain — Command Center

> [!abstract] Welcome
> Your personal knowledge system for project documentation. Track projects, experiments, decisions, and tasks from one place.

---

## 🚀 Active Projects

```dataview
TABLE WITHOUT ID
  "[[" + file.name + "|" + project + "]]" AS "Project",
  phase AS "Phase",
  status AS "Status",
  file.mtime AS "Updated"
FROM "Projects"
WHERE type = "moc" AND status = "active"
SORT file.mtime DESC
```

### Project Health Overview

| Project | Phase | Progress | Next Milestone |
|---------|-------|----------|----------------|
| [[Life-In-Weeks MOC\|Life-In-Weeks]] | Discovery | 🟡 In Progress | 200 signups |

---

## 📊 Metrics at a Glance

### Key Performance Indicators

```dataview
TABLE WITHOUT ID
  file.link AS "Metric",
  target AS "Target",
  current AS "Current",
  choice(current >= target, "🟢", choice(current >= target * 0.7, "🟡", "🔴")) AS "Status"
FROM "Projects"
WHERE contains(tags, "type/kpi")
LIMIT 10
```

### Validation Progress

| Gate | Criteria | Status |
|------|----------|--------|
| Phase 1 | 200 signups OR ≥5% conversion | ⚪ Pending |
| Phase 2 | Engagement metrics met | ⚪ Pending |
| Phase 3 | Paying users + unit economics | ⚪ Pending |

---

## 🧪 Active Experiments

```dataview
TABLE WITHOUT ID
  file.link AS "Experiment",
  project AS "Project",
  experiment_status AS "Status",
  dateformat(file.ctime, "MMM dd") AS "Started"
FROM "Projects"
WHERE contains(tags, "type/experiment") AND experiment_status = "running"
SORT file.ctime DESC
```

### Recent Experiment Results

```dataview
TABLE WITHOUT ID
  file.link AS "Experiment",
  result AS "Result",
  dateformat(file.mtime, "MMM dd") AS "Completed"
FROM "Projects"
WHERE contains(tags, "type/experiment") AND experiment_status = "complete"
SORT file.mtime DESC
LIMIT 5
```

---

## ⚖️ Recent Decisions

```dataview
TABLE WITHOUT ID
  file.link AS "Decision",
  adr_status AS "Status",
  project AS "Project",
  dateformat(file.ctime, "MMM dd") AS "Date"
FROM "Projects"
WHERE contains(tags, "type/decision")
SORT file.ctime DESC
LIMIT 5
```

---

## ✅ Critical Tasks

> [!warning] Priority Tasks
> Tasks requiring immediate attention.

```dataview
TASK
FROM "Projects"
WHERE !completed AND (contains(text, "P0") OR contains(text, "🔴"))
LIMIT 10
```

### All Open Tasks by Project

```dataview
TASK
FROM "Projects"
WHERE !completed
GROUP BY project
LIMIT 20
```

---

## 📈 Recent Activity

### Recently Modified Notes

```dataview
TABLE WITHOUT ID
  file.link AS "Note",
  choice(contains(tags, "type/moc"), "🗺️",
    choice(contains(tags, "type/prd"), "📋",
    choice(contains(tags, "type/experiment"), "🧪",
    choice(contains(tags, "type/decision"), "⚖️",
    choice(contains(tags, "type/persona"), "👤",
    choice(contains(tags, "type/canvas"), "📊", "📝")))))) AS "",
  project AS "Project",
  dateformat(file.mtime, "MMM dd HH:mm") AS "Modified"
FROM "Projects"
WHERE file.name != "Dashboard"
SORT file.mtime DESC
LIMIT 10
```

### Recently Created Notes

```dataview
TABLE WITHOUT ID
  file.link AS "Note",
  project AS "Project",
  dateformat(file.ctime, "MMM dd") AS "Created"
FROM "Projects"
SORT file.ctime DESC
LIMIT 5
```

---

## 🗂️ Quick Navigation

### By Stage

| Stage | Purpose | Jump To |
|-------|---------|---------|
| 00 | Status & Roadmap | [[Life-In-Weeks MOC#Lifecycle Navigation\|→]] |
| 01 | Market Analysis | [[Market_Overview\|→]] |
| 02 | User Research | [[Persona_Reflective_High_Performer\|→]] |
| 03 | Product | [[MVP_Spec\|→]] |
| 04 | Design | [[UX_Flow\|→]] |
| 05 | Technical | [[Tech_Stack\|→]] |
| 06 | Engineering | [[Backlog\|→]] |
| 07 | Analytics | [[KPIs\|→]] |

### Templates

| Category | Templates |
|----------|-----------|
| Strategy | [[03_Lean Canvas\|Lean Canvas]], [[03_Business Model Canvas\|BMC]], [[03_Value Proposition Canvas\|VPC]] |
| Research | [[02_Persona\|Persona]], [[02_Empathy Map\|Empathy Map]], [[01_SWOT Analysis\|SWOT]] |
| Product | [[03_PRD\|PRD]], [[04_UX Flow\|UX Flow]], [[05_Tech Stack\|Tech Stack]] |
| Execution | [[06_Backlog\|Backlog]], [[06_Sprint\|Sprint]], [[07_Experiment\|Experiment]] |

---

## 📉 Vault Statistics

### Content Overview

```dataviewjs
const projects = dv.pages('"Projects"').length;
const templates = dv.pages('"Templates"').length;
const experiments = dv.pages('"Projects"').where(p => p.tags && p.tags.includes("type/experiment")).length;
const decisions = dv.pages('"Projects"').where(p => p.tags && p.tags.includes("type/decision")).length;

dv.table(
  ["Metric", "Count"],
  [
    ["📁 Project Notes", projects],
    ["📝 Templates", templates],
    ["🧪 Experiments", experiments],
    ["⚖️ Decisions", decisions]
  ]
);
```

### Notes by Type

```dataview
TABLE WITHOUT ID
  length(rows) AS "Count",
  rows.file.tags[0] AS "Type"
FROM "Projects"
FLATTEN file.tags AS tag
WHERE startswith(tag, "type/")
GROUP BY tag
SORT length(rows) DESC
LIMIT 10
```

---

## 🔗 External Links

| Resource | Link |
|----------|------|
| 📦 Repository | [GitHub](https://github.com/Sims2k/Project-Brain) |
| 📚 Cursor Rules | `.cursor/rules/` |
| 🛠️ Cursor Skills | `.cursor/skills/` |

---

## 💡 Quick Actions

- [ ] Review [[Life-In-Weeks MOC\|Life-In-Weeks]] project status
- [ ] Check [[KPIs\|KPIs]] for latest metrics
- [ ] Update [[Backlog\|Backlog]] priorities
- [ ] Review open [[Experiment_Log\|experiments]]

---

*Last updated: `= this.modified`*
