# Tasks: Obsidian Vault Pipeline Setup

**Input**: Design documents from `specs/001-vault-pipeline-setup/`  
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/, quickstart.md  

**Tests**: Integration test included for setup command (plan.md); no TDD requested in spec.  

**Organization**: Tasks grouped by user story for independent implementation and testing.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: User story (US1, US2, US3, US4)
- Include exact file paths in descriptions

## Path Conventions

- Single project: `bin/`, `src/`, `pipeline-assets/`, `tests/` at repository root (per plan.md)

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [x] T001 Create project structure per plan: bin/, src/cli/, src/cli/commands/, src/install/, src/ui/, pipeline-assets/, tests/unit/, tests/integration/
- [x] T002 Initialize Node.js project in package.json: name, version, "bin": {"pipeline": "bin/pipeline.js"}, scripts (start, test), dependencies (commander, chalk or picocolors, boxen)
- [x] T003 [P] Add .gitignore at repo root for node_modules, .env, coverage, OS files

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [x] T004 Implement vault path resolution in src/resolve-path.js: accept path arg or cwd, resolve to absolute, validate path exists and is directory; return path or throw/exit
- [x] T005 Implement merge-only decision in src/install/merge-only.js: given source path, target path, and overwrite flag, return copy | skip | overwrite
- [x] T006 Create CLI entry bin/pipeline.js with shebang #!/usr/bin/env node and require of src/cli/index.js
- [x] T007 Implement Commander program in src/cli/index.js: create program, global --help/-h, register setup and version commands, parse and run
- [x] T008 [P] Implement version command in src/cli/commands/version.js: print version from package.json, exit 0
- [x] T009 Implement repo/assets resolution so CLI finds pipeline-assets when run from any directory (e.g. in src/install/paths.js or resolve-path.js: resolve repo root from __dirname or process and return path to pipeline-assets/)

**Checkpoint**: Foundation ready — user story implementation can begin

---

## Phase 3: User Story 1 — One-Command Pipeline Install (Priority: P1) 🎯 MVP

**Goal**: User runs CLI install (from vault or with path) and gets Projects/, Templates/, .cursor, Dashboard; merge-only by default; optional --overwrite.

**Independent Test**: Run `pipeline setup` in empty dir; verify Projects/, Templates/, .cursor, Dashboard.md exist; run again and verify no files overwritten.

### Implementation for User Story 1

- [x] T010 [US1] Implement setup command in src/cli/commands/setup.js: accept [vault-path], --overwrite, --no-color; resolve vault path via src/resolve-path.js; call copy-pipeline; output summary
- [x] T011 [US1] Implement copy-pipeline in src/install/copy-pipeline.js: walk pipeline-assets/, for each file apply merge-only decision, copy/skip/overwrite into vault; return counts (copied, skipped, overwritten)
- [x] T012 [P] [US1] Implement banner in src/ui/banner.js (boxen welcome) and colors in src/ui/colors.js (chalk/picocolors helpers for success/warning/error/info)
- [x] T013 [US1] Populate pipeline-assets/ from reference design: Dashboard.md, Templates/ (all .md and .canvas), cursor/rules/, cursor/skills/, cursor/agents/, project-folders/ (empty stage dirs 00_ through 09_Assets, Archive); exclude .github, .obsidian, and private project content (e.g. Projects/Life-In-Weeks)
- [x] T014 [US1] Wire setup command to show banner at start and colored summary (copied/skipped/overwritten) at end in src/cli/commands/setup.js
- [x] T015 [US1] Ensure setup exits with 0 on success and non-zero (e.g. 2 for invalid path) on validation or copy failure in src/cli/commands/setup.js
- [x] T016 [P] [US1] Add integration test in tests/integration/setup.test.js: run setup in temp dir, assert Projects/, Templates/, .cursor/, Dashboard.md exist; run setup again, assert no overwrite (e.g. mtime unchanged or skipped count > 0)

**Checkpoint**: User Story 1 complete — one-command install works and is testable

---

## Phase 4: User Story 2 — Setup Without CLI (Priority: P2)

**Goal**: User can follow a written setup guide to achieve the same structure as the CLI install.

**Independent Test**: Follow guide in fresh vault; verify same folders and key files as CLI install.

### Implementation for User Story 2

- [x] T017 [US2] Write setup guide in docs/setup-guide.md (or README section): step-by-step copy of pipeline-assets/ into vault (source paths and target paths)
- [x] T018 [US2] Document in setup guide: source paths (pipeline-assets/Dashboard.md, pipeline-assets/Templates/, pipeline-assets/cursor/ → .cursor/, pipeline-assets/project-folders/ → Projects/); optional .github and .obsidian manual copy

**Checkpoint**: User Story 2 complete — setup guide produces equivalent result

---

## Phase 5: User Story 3 — README as Obsidian-Style Knowledge Base (Priority: P1)

**Goal**: README is primary docs: what the pipeline is, install (CLI or guide), vault organization, Cursor/Obsidian usage; Obsidian-friendly Markdown.

**Independent Test**: New user completes install and first project using only README; README renders correctly in Obsidian.

### Implementation for User Story 3

- [x] T019 [US3] Write README.md at repo root: what the pipeline is, how to install (clone + npx/global CLI or setup guide), vault organization (Projects, stages, Templates, .cursor), how to use with Obsidian and Cursor for project planning
- [x] T020 [US3] Use Obsidian-friendly Markdown in README.md: headings, lists, callouts, internal/external links so it can serve as knowledge base in vault
- [x] T021 [US3] Add README section for creating first project: how to create project folder with stage structure (00_ through 09_Assets, Archive)

**Checkpoint**: User Story 3 complete — README enables install and first project

---

## Phase 6: User Story 4 — Discoverable CLI (Priority: P2)

**Goal**: User sees subcommands and help; exit codes consistent for scripting.

**Independent Test**: `pipeline` and `pipeline --help` list setup and version; `pipeline setup --help` shows options; exit 0 on success, non-zero on failure.

### Implementation for User Story 4

- [x] T022 [US4] Ensure global help: when no args or --help/-h, program shows description and list of subcommands (setup, version) in src/cli/index.js
- [x] T023 [US4] Ensure setup --help shows usage and options (vault-path, --overwrite, --no-color) in src/cli/commands/setup.js
- [x] T024 [US4] Document exit codes in README.md (0 success; non-zero for failure, e.g. 2 for invalid path)

**Checkpoint**: User Story 4 complete — CLI is discoverable and scriptable

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: OSS structure and validation

- [x] T025 [P] Add LICENSE and CONTRIBUTING.md at repo root per FR-010 (open source structure)
- [x] T026 Document supported platforms (Windows, macOS, Linux) in README.md and/or verify CLI runnable on all three per FR-012 (cross-platform)
- [x] T027 Run quickstart.md validation: verify bin/pipeline.js, src/cli/, src/install/, src/ui/, pipeline-assets/ exist and README matches usage
- [x] T028 [P] Documentation pass: ensure README.md and docs/setup-guide.md reflect final CLI usage, paths, manual .github/.obsidian steps, and note that an optional CLI config file may be added in a future release (per constitution); user-facing changes reflected

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — start immediately
- **Foundational (Phase 2)**: Depends on Setup — BLOCKS all user stories
- **User Stories (Phases 3–6)**: Depend on Foundational; US2, US3, US4 can proceed in parallel after US1 if desired (US1 is MVP)
- **Polish (Phase 7)**: Depends on completion of user stories

### User Story Dependencies

- **US1 (P1)**: After Foundational — no dependency on other stories
- **US2 (P2)**: After Foundational — references pipeline-assets layout from US1
- **US3 (P1)**: After Foundational — can be written in parallel with US1 once structure is known
- **US4 (P2)**: After US1 (help/exit codes are part of CLI built in US1); can be tightened in Phase 6

### Within User Story 1

- Path resolution and merge-only before copy-pipeline; copy-pipeline before setup command; pipeline-assets populated before integration test

### Parallel Opportunities

- T003 [P] with T002; T008 [P] with T004–T007; T012 [P] (banner + colors); T016 [P] (integration test); T025 [P], T028 [P] in Polish

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup  
2. Complete Phase 2: Foundational  
3. Complete Phase 3: User Story 1  
4. **STOP and VALIDATE**: Run `pipeline setup` in temp dir, confirm structure and merge-only  
5. Optionally add Phase 5 (README) so users can install from docs

### Incremental Delivery

1. Setup + Foundational → CLI skeleton and path/merge logic  
2. US1 → One-command install (MVP)  
3. US3 → README (enables self-serve install)  
4. US2 → Setup guide (manual path)  
5. US4 → Help/exit code polish  
6. Polish → LICENSE, CONTRIBUTING, validation  

---

## Notes

- [P] = parallelizable; [USn] = maps to user story for traceability  
- pipeline-assets content must match reference design (Project-Brain) minus private project and .github/.obsidian for v1  
- Exit codes: 0 success, 1 generic error, 2 invalid path (per contracts/cli-commands.md)
