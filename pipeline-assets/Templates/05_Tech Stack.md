---
# ═══════════════════════════════════════════════════════════════════════════════
# TEMPLATE: Tech Stack
# STAGE: 05 - Technical
# PURPOSE: Technology choices with architecture and deployment details
# ═══════════════════════════════════════════════════════════════════════════════
tags:
  - type/technical
  - type/architecture
  - project/{{project}}
  - stage/05-technical
aliases:
  - "{{project}} Tech Spec"
cssclass: technical
# ─────────────────────────────────────────────────────────────────────────────
lead: "Technology stack decisions with architecture diagrams and rationale"
banner: ""
icon: "🛠️"
created: "{{date:YYYY-MM-DD}}"
modified: "{{date:YYYY-MM-DD}}"
template:
  name: "Tech Stack"
  version: "2.0"
  stage: "05"
# ─────────────────────────────────────────────────────────────────────────────
project: "{{project}}"
status: active
phase: design
---

# Tech Stack — {{project}}

> [!note] `= this.icon`
> `= this.lead`

## Architecture

![[Architecture.canvas]]

## Stack Summary

| Layer | Technology | Rationale |
|-------|------------|-----------|
| Frontend | | |
| Backend | | |
| Database | | |
| Hosting | | |
| CI/CD | | |
| Analytics | | |

## Design Principles

1. **Cheap**: Minimize costs pre-revenue
2. **Flexible**: Avoid vendor lock-in
3. **Simple**: Start with simplest solution
4. **Scalable**: Can grow without rewrite

## Data Models

### Entity: [Name]
```json
{
  "id": "uuid",
  "created_at": "timestamp"
}
```

## API Design

### `GET /endpoint`
- **Auth**: Required / Public
- **Response**: `{ data: [...] }`

## Security

- [ ] HTTPS everywhere
- [ ] Input validation
- [ ] Rate limiting
- [ ] Secrets management

## Performance Targets

| Metric | Target |
|--------|--------|
| LCP | <2.5s |
| FID | <100ms |
| CLS | <0.1 |
| Lighthouse | >90 |

---
## Back Matter

**Source**:: [[Decision Log]], [[PRD]]
**References**:: [[Deploy Guide]], [[Architecture.canvas]]
**Used By**:: [[Backlog]], [[Current Sprint]]

---
**Open Questions**
- ❓ 

**Action Items**
- [ ] Set up development environment
- [ ] Document deployment process
