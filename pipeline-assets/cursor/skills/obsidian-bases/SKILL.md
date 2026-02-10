---
name: obsidian-bases
description: Create and edit Obsidian Bases (.base files) with views, filters, formulas, and summaries for project tracking. Use when working with .base files, creating database-like views of notes, project dashboards, experiment trackers, or when the user mentions Bases, table views, card views, filters, or formulas in Obsidian.
---

# Obsidian Bases Skill

This skill enables skills-compatible agents to create and edit valid Obsidian Bases (`.base` files) including views, filters, formulas, and project tracking configurations.

## Overview

Obsidian Bases are YAML-based files that define dynamic views of notes in an Obsidian vault. A Base file can contain multiple views, global filters, formulas, property configurations, and custom summaries.

## File Format

Base files use the `.base` extension and contain valid YAML.

## Complete Schema

```yaml
# Global filters apply to ALL views
filters:
  and: []
  or: []
  not: []

# Formula properties computed across all views
formulas:
  formula_name: 'expression'

# Property display configuration
properties:
  property_name:
    displayName: "Display Name"

# Custom summary formulas
summaries:
  custom_summary: 'values.mean().round(3)'

# View definitions
views:
  - type: table | cards | list | map
    name: "View Name"
    limit: 10
    groupBy:
      property: property_name
      direction: ASC | DESC
    filters:
      and: []
    order:
      - file.name
      - property_name
    summaries:
      property_name: Sum
```

---

## Project Tracking Bases

### Project Dashboard Base

Track all notes in a project with status and phase filtering.

```yaml
# Project Dashboard Base
# Tracks all notes in a project folder

filters:
  and:
    - file.inFolder("Projects/My-Project")
    - 'file.ext == "md"'

formulas:
  days_old: '(now() - file.ctime).days'
  last_updated: 'file.mtime.relative()'
  type_icon: |
    if(file.hasTag("type/moc"), "🗺️",
    if(file.hasTag("type/prd"), "📋",
    if(file.hasTag("type/experiment"), "🧪",
    if(file.hasTag("type/decision"), "⚖️",
    if(file.hasTag("type/persona"), "👤",
    if(file.hasTag("type/canvas"), "📊", "📝"))))))

properties:
  status:
    displayName: "Status"
  phase:
    displayName: "Phase"
  formula.type_icon:
    displayName: ""
  formula.last_updated:
    displayName: "Updated"

views:
  - type: table
    name: "All Project Notes"
    order:
      - formula.type_icon
      - file.name
      - status
      - phase
      - formula.last_updated
    groupBy:
      property: status
      direction: ASC

  - type: table
    name: "Recent Activity"
    limit: 15
    order:
      - formula.type_icon
      - file.name
      - formula.last_updated
    filters:
      and:
        - 'file.mtime > now() - "14d"'

  - type: cards
    name: "Active Notes"
    filters:
      and:
        - 'status == "active"'
    order:
      - file.name
      - phase
      - formula.last_updated
```

### Experiment Tracker Base

Track validation experiments with hypothesis status.

```yaml
# Experiment Tracker Base
# Tracks all validation experiments

filters:
  and:
    - file.hasTag("type/experiment")
    - 'file.ext == "md"'

formulas:
  days_running: 'if(experiment_status == "running", (now() - file.ctime).days, "")'
  status_icon: |
    if(experiment_status == "planned", "📝",
    if(experiment_status == "running", "🔄",
    if(experiment_status == "complete", "✅",
    if(experiment_status == "stopped", "⏹️", "❓"))))
  result_icon: |
    if(result == "validated", "✅",
    if(result == "invalidated", "❌",
    if(result == "partial", "⚠️", "")))

properties:
  experiment_status:
    displayName: "Status"
  formula.status_icon:
    displayName: ""
  formula.result_icon:
    displayName: "Result"
  formula.days_running:
    displayName: "Days"

views:
  - type: table
    name: "All Experiments"
    order:
      - formula.status_icon
      - file.name
      - experiment_status
      - formula.days_running
      - formula.result_icon
    groupBy:
      property: experiment_status
      direction: ASC

  - type: table
    name: "Running Experiments"
    filters:
      and:
        - 'experiment_status == "running"'
    order:
      - file.name
      - formula.days_running
      - target_metric
      - current_value

  - type: table
    name: "Completed"
    filters:
      and:
        - 'experiment_status == "complete"'
    order:
      - file.name
      - formula.result_icon
      - learnings
```

### Sprint Tracker Base

Track sprint tasks and burndown.

```yaml
# Sprint Tracker Base
# Tracks tasks in current sprint

filters:
  and:
    - file.inFolder("Projects/My-Project/06_Engineering/Sprints")

formulas:
  completion_rate: |
    if(total_tasks > 0, 
      ((completed_tasks / total_tasks) * 100).round(0).toString() + "%",
      "")
  days_remaining: |
    if(sprint_end, 
      (date(sprint_end) - today()).days,
      "")
  status_icon: |
    if(status == "active", "🏃",
    if(status == "complete", "✅",
    if(status == "planned", "📝", "⏸️")))

properties:
  formula.status_icon:
    displayName: ""
  formula.completion_rate:
    displayName: "Progress"
  formula.days_remaining:
    displayName: "Days Left"

views:
  - type: table
    name: "Sprint Overview"
    order:
      - formula.status_icon
      - file.name
      - sprint_start
      - sprint_end
      - formula.completion_rate
      - formula.days_remaining

  - type: table
    name: "Current Sprint"
    filters:
      and:
        - 'status == "active"'
    order:
      - file.name
      - formula.completion_rate
      - formula.days_remaining
```

### Decision Log Base

Track architecture and business decisions.

```yaml
# Decision Log Base
# Tracks all ADRs and decisions

filters:
  and:
    - file.hasTag("type/decision")
    - 'file.ext == "md"'

formulas:
  status_icon: |
    if(adr_status == "accepted", "✅",
    if(adr_status == "proposed", "📝",
    if(adr_status == "deprecated", "⚠️",
    if(adr_status == "superseded", "🔄", "❓"))))
  age: 'file.ctime.relative()'

properties:
  adr_id:
    displayName: "ID"
  adr_status:
    displayName: "Status"
  formula.status_icon:
    displayName: ""
  formula.age:
    displayName: "Age"

views:
  - type: table
    name: "All Decisions"
    order:
      - formula.status_icon
      - adr_id
      - file.name
      - adr_status
      - decision_date
    groupBy:
      property: adr_status
      direction: ASC

  - type: table
    name: "Accepted"
    filters:
      and:
        - 'adr_status == "accepted"'
    order:
      - adr_id
      - file.name
      - decision_date

  - type: table
    name: "Needs Review"
    filters:
      or:
        - 'adr_status == "proposed"'
        - 'adr_status == "deprecated"'
    order:
      - adr_id
      - file.name
      - formula.age
```

### KPI Tracker Base

Track key performance indicators.

```yaml
# KPI Tracker Base
# Tracks key metrics across projects

filters:
  and:
    - file.hasTag("type/kpi")

formulas:
  progress: |
    if(target > 0 && current,
      ((current / target) * 100).round(0).toString() + "%",
      "")
  status_icon: |
    if(current >= target, "🟢",
    if(current >= target * 0.7, "🟡",
    if(current >= target * 0.3, "🟠", "🔴")))
  gap: |
    if(target && current,
      (target - current).toString(),
      "")

properties:
  formula.status_icon:
    displayName: ""
  formula.progress:
    displayName: "Progress"
  formula.gap:
    displayName: "Gap"

views:
  - type: table
    name: "All KPIs"
    order:
      - formula.status_icon
      - file.name
      - metric_name
      - current
      - target
      - formula.progress

  - type: table
    name: "At Risk"
    filters:
      and:
        - 'current < target * 0.7'
    order:
      - file.name
      - formula.progress
      - formula.gap
```

### Persona Index Base

Track and compare user personas.

```yaml
# Persona Index Base
# Lists all personas with key attributes

filters:
  and:
    - file.hasTag("type/persona")

formulas:
  type_badge: |
    if(persona_type == "primary", "🎯 Primary",
    if(persona_type == "secondary", "📌 Secondary", "📎 Tertiary"))

properties:
  persona_type:
    displayName: "Type"
  formula.type_badge:
    displayName: "Segment"

views:
  - type: cards
    name: "Persona Gallery"
    order:
      - banner
      - file.name
      - formula.type_badge
      - lead

  - type: table
    name: "Persona List"
    order:
      - formula.type_badge
      - file.name
      - project
    groupBy:
      property: persona_type
      direction: ASC
```

---

## Filter Syntax

### Basic Filters

```yaml
# Single filter
filters: 'status == "done"'

# AND - all must be true
filters:
  and:
    - 'status == "done"'
    - 'priority > 3'

# OR - any can be true
filters:
  or:
    - file.hasTag("book")
    - file.hasTag("article")

# NOT - exclude matching
filters:
  not:
    - file.hasTag("archived")
```

### Common Filter Patterns

```yaml
# By tag
filters:
  and:
    - file.hasTag("type/experiment")

# By folder
filters:
  and:
    - file.inFolder("Projects/My-Project")

# By date range (last 7 days)
filters:
  and:
    - 'file.mtime > now() - "7d"'

# By property value
filters:
  and:
    - 'status == "active"'
    - 'priority >= 3'

# Combined
filters:
  or:
    - and:
        - file.hasTag("important")
        - 'status != "done"'
    - 'priority == 1'
```

---

## Formula Reference

### Date Calculations

```yaml
formulas:
  # Days since created
  days_old: '(now() - file.ctime).days'
  
  # Days until due
  days_until_due: 'if(due_date, (date(due_date) - today()).days, "")'
  
  # Relative time
  last_updated: 'file.mtime.relative()'
  
  # Formatted date
  created_fmt: 'file.ctime.format("YYYY-MM-DD")'
```

### Conditional Logic

```yaml
formulas:
  # Icon based on status
  status_icon: 'if(done, "✅", "⏳")'
  
  # Multi-condition
  priority_label: |
    if(priority == 1, "🔴 Critical",
    if(priority == 2, "🟠 High",
    if(priority == 3, "🟡 Medium", "🟢 Low")))
  
  # Boolean check
  is_overdue: 'if(due, date(due) < today() && status != "done", false)'
```

### String & Number

```yaml
formulas:
  # Percentage
  progress: '((current / target) * 100).round(0).toString() + "%"'
  
  # String formatting
  formatted_price: 'if(price, "$" + price.toFixed(2), "")'
  
  # Link count
  connections: 'file.links.length + file.backlinks.length'
```

---

## Summary Formulas

### Built-in Summaries

| Name | Type | Description |
|------|------|-------------|
| `Average` | Number | Mean |
| `Sum` | Number | Total |
| `Min` | Number | Smallest |
| `Max` | Number | Largest |
| `Median` | Number | Middle value |
| `Earliest` | Date | First date |
| `Latest` | Date | Last date |
| `Filled` | Any | Non-empty count |
| `Unique` | Any | Unique count |

### Custom Summaries

```yaml
summaries:
  weighted_avg: 'values.filter(value.isType("number")).mean().round(2)'
  completion_rate: |
    values.filter(value == true).length / values.length * 100
```

---

## View Types

### Table View

```yaml
views:
  - type: table
    name: "Project Notes"
    limit: 20
    order:
      - file.name
      - status
      - formula.last_updated
    groupBy:
      property: status
      direction: ASC
    summaries:
      priority: Average
```

### Cards View

```yaml
views:
  - type: cards
    name: "Gallery"
    order:
      - banner
      - file.name
      - lead
```

### List View

```yaml
views:
  - type: list
    name: "Quick List"
    order:
      - file.name
      - status
```

---

## Embedding Bases

```markdown
<!-- Embed entire base -->
![[MyBase.base]]

<!-- Embed specific view -->
![[MyBase.base#View Name]]
```

---

## YAML Quoting Rules

- Single quotes for expressions with double quotes: `'if(done, "Yes", "No")'`
- Use `|` for multi-line formulas
- Escape special characters in regex: `'/^\d{4}/.matches(file.basename)'`

---

## References

- [Bases Syntax](https://help.obsidian.md/bases/syntax)
- [Functions](https://help.obsidian.md/bases/functions)
- [Views](https://help.obsidian.md/bases/views)
- [Formulas](https://help.obsidian.md/formulas)
