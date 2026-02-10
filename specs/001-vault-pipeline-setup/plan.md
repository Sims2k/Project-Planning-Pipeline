# Implementation Plan: Obsidian Vault Pipeline Setup

**Branch**: `001-vault-pipeline-setup` | **Date**: 2025-02-10 | **Spec**: [spec.md](./spec.md)  
**Input**: Feature specification from `specs/001-vault-pipeline-setup/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.cursor/commands/speckit.plan.md` for the execution workflow.

## Summary

Deliver an open-source CLI that installs a project planning pipeline into a user’s Obsidian vault: clone the repo, run one command (from the vault or with a path), and get Projects/, Templates/, .cursor (rules, skills, agents), and Dashboard. Tech stack: Node.js + Commander.js, with colored output and minimal ASCII/boxen UI. Merge-only by default; optional --overwrite. Reference structure and content from C:\Dev\Project-Brain (no private example project). v1 scope: minimal install only; .github and .obsidian documented in setup guide for manual copy.

## Technical Context

**Language/Version**: Node.js LTS 20.x or 22.x  
**Primary Dependencies**: Commander.js (subcommands, help, options), chalk or picocolors (colored output), boxen (bordered boxes), optional figlet (ASCII banner)  
**Storage**: N/A (file system only; read from repo assets, write to vault path)  
**Testing**: Node.js built-in test runner (node:test) or Jest; integration tests with temp directories  
**Target Platform**: Windows, macOS, Linux (FR-012)  
**Project Type**: Single project — CLI plus bundled pipeline assets  
**Performance Goals**: Install completes in seconds (file/directory copy)  
**Constraints**: No overwrite without explicit opt-in; portable; minimal dependencies; runnable via `npx` or global install  
**Scale/Scope**: Single vault per invocation; ~30 templates, 7 rules, 4 skills, 15+ agent files

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

Verify alignment with `.specify/memory/constitution.md`:

- **Obsidian-First**: Outputs and structure follow Obsidian conventions; no destructive vault ops without consent. ✅ Merge-only default; --overwrite opt-in.
- **CLI & Installability**: Setup achievable via clone + CLI or setup guide; CLI has subcommands, --help, clear exit codes. ✅ Commander.js; setup, version, help.
- **Research & Specification**: Design grounded in research; rationale documented in spec/plan. ✅ research.md and this plan.
- **Documentation as Contract**: README updated for any user-facing change; kept in sync with repo. ✅ README in scope; docs in repo.
- **Open Source Structure**: CONTRIBUTING, LICENSE, clear layout, issue/PR templates, semantic versioning. ✅ In scope (FR-010).

## Project Structure

### Documentation (this feature)

```text
specs/001-vault-pipeline-setup/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── contracts/            # Phase 1 output (CLI command contract)
└── tasks.md             # Phase 2 output (/speckit.tasks)
```

### Source Code (repository root)

```text
bin/
  pipeline.js            # CLI entry (#!/usr/bin/env node); or cli.js

src/                     # Or lib/
  cli/
    index.js             # Commander program, register commands
    commands/
      setup.js           # setup [path] --overwrite
      version.js         # version
  install/
    copy-pipeline.js     # Copy pipeline-assets into vault path
    merge-only.js        # Decide copy vs skip per file
  ui/
    banner.js            # ASCII/boxen welcome
    colors.js            # chalk/picocolors helpers
  resolve-path.js        # Resolve vault path (cwd vs argument)

pipeline-assets/         # Bundled content (from Project-Brain, no private project)
  Dashboard.md
  Templates/             # All .md and .canvas
  cursor/
    rules/               # .mdc files
    skills/              # skill-name/SKILL.md
    agents/              # README.md + role .md files
  project-folders/       # Empty stage dirs (00_... through 09_Assets, Archive) or .gitkeep

tests/
  unit/
  integration/           # Temp vault, run setup, assert structure and merge behavior

package.json             # bin.pipeline, dependencies, scripts
README.md
CONTRIBUTING.md
LICENSE
```

**Structure Decision**: Single Node.js project. CLI lives under `bin/` and `src/cli/`; install logic under `src/install/`; pipeline content under `pipeline-assets/` so the CLI can find it relative to the repo root (e.g. `path.join(__dirname, '..', 'pipeline-assets')`). This supports “run from anywhere” by resolving repo root from the executable or from a known file next to the assets.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

No violations. Left blank.
