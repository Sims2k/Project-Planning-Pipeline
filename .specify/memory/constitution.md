<!--
Sync Impact Report
==================
Version change: 1.0.0 → 1.0.1
Modified principles: None (clarifications only)
Added/expanded: Additional Constraints (merge-only default, cross-platform CLI);
  CLI & Installability (invocation modes, setup guide equivalence)
Removed sections: None
Source: Spec and plan from 001-vault-pipeline-setup (clarifications session, FR-002, FR-005,
  FR-011, FR-012; research.md and plan.md technical context)
Templates: No template changes required
Follow-up TODOs: None
-->

# Project Planning Pipeline Constitution

## Core Principles

### I. Obsidian-First

All generated content and project structure MUST follow Obsidian conventions and styling
guidelines. Outputs MUST use valid Markdown, frontmatter where appropriate, and a vault
layout consistent with Obsidian best practices (folders, linking, optional Dataview/callouts).
The tool MUST understand Obsidian semantics and community norms. The tool MUST NOT perform
destructive or overwriting operations on user vault content without explicit user consent
or confirmation.

**Rationale**: Users run the pipeline inside an Obsidian vault; compatibility and
predictability are essential for adoption and safety.

### II. CLI & Installability

The tool MUST be installable via clone-from-GitHub. Project structure setup MUST be
achievable through a CLI and/or a step-by-step setup guide. The setup guide MUST
produce a functionally equivalent result to the CLI (same folders, template set,
.cursor layout) so users get the same experience regardless of path. The CLI install
MUST support two invocation modes: run from the vault directory (current directory
as target) or run from any directory with an explicit vault path argument. The CLI
MUST follow established best practices: subcommands, `--help` and usage output,
clear exit codes (0 success, non-zero failure), optional configuration file, and
human-readable output with machine-readable (e.g. JSON) options where useful.

**Rationale**: Users expect to clone the repo and run a small set of commands or
follow a guide to get a working project planning pipeline; a well-behaved CLI reduces
support burden and improves scriptability.

### III. Research & Specification

Features and design decisions MUST be grounded in detailed research (Obsidian
documentation, CLI standards, target user workflows). Understanding MUST be documented
in specs and plans; implementation MUST NOT proceed without a clear rationale and
alignment with that research.

**Rationale**: A research-backed approach ensures the pipeline stays relevant to
Obsidian and to real-world project planning needs, and avoids speculative or
fragile design.

### IV. Documentation as Contract

The README MUST be the primary user-facing documentation. It MUST be updated with
every meaningful user-facing change and kept in sync with the repository (pushed to
GitHub). New features or breaking changes MUST be reflected in the README before or
with the corresponding release.

**Rationale**: The project is distributed and open source; the README is the first
and often only reference for install, setup, and usage—keeping it accurate is
non-negotiable for trust and collaboration.

### V. Open Source Structure

The repository MUST follow open source community norms: include CONTRIBUTING (or
equivalent contribution guidance), LICENSE, and CODE_OF_CONDUCT where appropriate;
use issue and pull request templates; maintain a clear directory layout; and use
semantic versioning for releases so collaborators and users can rely on a
well-structured, predictable project.

**Rationale**: The project is intended for collaboration; standard OSS structure
lowers friction for contributors and maintains a single source of truth for
governance and process.

## Additional Constraints

- **Obsidian compatibility**: Document supported Obsidian version or environment
  (e.g. core features only vs. plugin-dependent) so users know what to expect.
- **Vault safety**: No automatic overwrite or delete of existing user files
  without explicit opt-in or confirmation. Default install behavior MUST be
  merge-only: add missing folders and files only; skip any file that already exists.
  Overwrite only when the user explicitly opts in (e.g. via a flag or prompt).
- **Technology choices**: Prefer a portable CLI (e.g. script-based or single-binary)
  so users can run the tool without heavy runtime requirements after clone.
- **Cross-platform CLI**: The CLI MUST be runnable on Windows, macOS, and Linux
  for the first release so that all users can install from clone without
  platform-specific workarounds.

## Development Workflow

- All pull requests MUST be checked for compliance with this constitution;
  violations MUST be justified or resolved before merge.
- User-facing changes (new commands, setup steps, config, breaking changes) MUST
  be accompanied by README (or docs) updates in the same PR or release.
- Contribution flow (how to open issues, propose features, submit PRs) MUST be
  described in CONTRIBUTING or the README.

## Governance

This constitution supersedes ad-hoc practices for the Project Planning Pipeline
repository. Amendments require a documented change, version bump per semantic
versioning below, and update of this file and any dependent templates or commands.
All PRs and reviews MUST verify compliance with the principles above; complexity or
exceptions MUST be justified. For day-to-day implementation guidance, use the
specs, plans, and tasks produced by the speckit workflow; the constitution defines
the non-negotiable rules those artifacts must satisfy.

**Versioning**: MAJOR = backward-incompatible governance or principle removal/redefinition;
MINOR = new principle or materially expanded section; PATCH = clarifications, wording,
typo fixes.

**Version**: 1.0.1 | **Ratified**: 2025-02-10 | **Last Amended**: 2025-02-10
