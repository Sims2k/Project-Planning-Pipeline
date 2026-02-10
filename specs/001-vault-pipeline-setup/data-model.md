# Data Model: Obsidian Vault Pipeline Setup

**Feature**: 001-vault-pipeline-setup  
**Date**: 2025-02-10  
**Purpose**: Logical entities and layout for the CLI and pipeline; no persistent database.

---

## 1. Entities

### Vault (target)

- **Description**: The Obsidian vault directory that receives the pipeline.
- **Attributes**:
  - `path` (string, required): Absolute or resolved path to the vault root.
  - `exists` (boolean): Whether the path exists and is a directory.
- **Validation**: Path MUST exist and be a directory before install; CLI resolves path from argument or `process.cwd()`.

### Pipeline (artifact bundle)

- **Description**: The set of files and folders shipped in the repo and copied into the vault.
- **Attributes**:
  - `root` (string): Repository-relative path to pipeline-assets (e.g. `pipeline-assets/`).
  - `contents`: Logical groups — Dashboard (1 file), Templates (many .md/.canvas), cursor (rules, skills, agents), project-folders (empty stage dirs).
- **No persistence**: Represented in code as a manifest or directory walk; not stored in a DB.

### InstallResult (per run)

- **Description**: Outcome of a single `setup` run.
- **Attributes**:
  - `success` (boolean): All steps completed without fatal error.
  - `copied` (number): Count of files copied.
  - `skipped` (number): Count of files skipped (already present, merge-only).
  - `overwritten` (number): Count of files overwritten (only when --overwrite).
  - `errors` (array of strings): Non-fatal messages; fatal errors abort and set exit code non-zero.
- **Lifecycle**: Created at start of setup, updated during copy, used for exit code and optional summary output.

### FileOperation (per file)

- **Description**: Decision for one source file when installing.
- **Values**: `copy` (target missing), `skip` (target exists, merge-only), `overwrite` (target exists, user opted in).
- **Rules**: Default merge-only → copy if target missing, else skip; with --overwrite → copy or overwrite.

---

## 2. Pipeline asset layout (logical)

Mirrors Project-Brain; no private project content.

```text
pipeline-assets/
  Dashboard.md
  Templates/
    00_*.md, 01_*.md, ... 07_*.md, XX_*.md
    *.canvas (paired with templates)
  cursor/
    rules/       → .cursor/rules/   (*.mdc)
    skills/      → .cursor/skills/   (<name>/SKILL.md)
    agents/      → .cursor/agents/   (README.md, *.md)
  project-folders/
    00_Status & Roadmap/
    01_Market Analysis/
    ...
    09_Assets/
    Archive/
    (optional Sprints/ under 06_Engineering)
```

Mapping to vault: `pipeline-assets/*` → vault root; `pipeline-assets/cursor/*` → vault `/.cursor/`; `pipeline-assets/project-folders/*` → vault `/Projects/` (as empty structure or with .gitkeep).

---

## 3. State transitions

- **Vault path**: unresolved → resolved (valid directory) or invalid (exit non-zero).
- **Install**: not started → in progress (copy/skip/overwrite per file) → completed (InstallResult), or failed (error + non-zero exit).

---

## 4. Validation rules (from spec)

- Target path MUST be a directory.
- Merge-only: do not overwrite existing files unless --overwrite.
- Exit code 0 on full success; non-zero on invalid path, fatal copy error, or user refusal.
