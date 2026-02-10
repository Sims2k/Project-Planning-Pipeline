# Feature Specification: Obsidian Vault Pipeline Setup

**Feature Branch**: `001-vault-pipeline-setup`  
**Created**: 2025-02-10  
**Status**: Draft  
**Input**: User description: open source CLI to set up project planning pipeline in an Obsidian vault; users clone from GitHub and set up via CLI or setup guide; README in Obsidian-style markdown as knowledge base; detailed docs; example structure from Project-Brain (rules, skills, agents, templates, project folders) but no private example project content pushed.

## Clarifications

### Session 2025-02-10

- Q: Where should the user run the CLI install command? → A: From anywhere: user can run from the vault directory (current directory = vault) or from the repo (or elsewhere) and pass the vault path as an argument (e.g. `pipeline setup /path/to/vault`).
- Q: When the target vault already has folders like .cursor or Templates, what should the install do by default? → A: Merge only: add missing folders and files; never overwrite existing files. If a file already exists, skip it. Optional flag (e.g. --overwrite or --force) can allow overwriting.
- Q: For the first release, should the CLI install optional pieces like .github and .obsidian? → A: Out of scope for v1: only minimal install (Projects, Templates, .cursor, Dashboard) via CLI; .github and .obsidian documented in the setup guide for manual copy if desired; CLI support can be added later.
- Q: Which platforms must the CLI support in the first release? → A: All three: Windows, macOS, and Linux from day one.
- Q: Should the setup guide produce exactly the same result as the CLI install? → A: Equivalent: the guide must produce a vault that is functionally equivalent (same folders, same template set, same .cursor layout) so users get the same experience; minor differences (e.g. file order, comments) are acceptable.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - One-Command Pipeline Install (Priority: P1)

A user has created an Obsidian vault (or will create one) and wants to add the project planning pipeline so they can plan software projects with Cursor using the same structure, templates, and AI guidance (rules, skills, agents) as the reference design. They clone the open source repository from GitHub, open a terminal in their vault directory (or in the cloned repo), and run a single CLI command (or a small set of commands) to install the pipeline into their vault. After running it, their vault contains the expected folders (e.g. Projects/, Templates/), Cursor configuration (.cursor/rules, .cursor/skills, .cursor/agents), a root Dashboard, and optionally GitHub templates (.github). They can open the vault in Obsidian and in Cursor and start creating projects.

**Why this priority**: The primary value is "get the pipeline into my vault with minimal steps"; without this, the product has no core use case.

**Independent Test**: Can be fully tested by cloning the repo, navigating to a test vault directory, running the CLI install (e.g. `setup` or `init`), and verifying that the vault now contains the documented structure and that no existing user files were overwritten without confirmation.

**Acceptance Scenarios**:

1. **Given** an empty directory that will become (or is) an Obsidian vault, **When** the user runs the documented CLI install command from that directory, **Then** the directory contains at least: a Projects folder, a Templates folder, .cursor with rules/skills/agents, and a root Dashboard or equivalent entry note.
2. **Given** a vault that already has a Projects folder with user content, **When** the user runs the CLI install, **Then** the system either creates only missing items or prompts for confirmation before overwriting, and does not silently overwrite user files.
3. **Given** the user runs the CLI with a standard help flag (e.g. --help or -h), **Then** the user sees usage information and available subcommands.

---

### User Story 2 - Setup Without CLI (Setup Guide) (Priority: P2)

A user prefers not to run a CLI (e.g. they are on a platform where the CLI is not yet supported, or they want to understand each step). They follow a written setup guide that lists the exact steps: clone the repository, copy which folders/files into their vault, and where to place them. By following the guide, they achieve the same end state as User Story 1 (pipeline structure and Cursor config in their vault).

**Why this priority**: Ensures the pipeline is usable even if the CLI is unavailable or the user wants a manual, transparent process.

**Independent Test**: Can be tested by a person (or automated test) following only the written guide with a fresh vault and verifying the resulting structure matches the specification.

**Acceptance Scenarios**:

1. **Given** the setup guide and an empty vault directory, **When** the user follows every step in the guide, **Then** the vault contains a functionally equivalent structure to the CLI install (same folders—Projects, Templates, .cursor—same template set, same .cursor layout, and Dashboard); minor differences (e.g. file order) are acceptable.
2. **Given** the setup guide, **When** the user reads it, **Then** they can identify the source (clone path or artifact) and the target (vault path) for each copied element without guessing.

---

### User Story 3 - README as Obsidian-Style Knowledge Base (Priority: P1)

A user or contributor wants to understand how to use the project planning pipeline and how it fits with Obsidian and Cursor. They read the README (and any linked docs). The README is written in Markdown suitable for consumption in Obsidian (e.g. headings, lists, callouts, links) and explains: what the pipeline is, how to install it (clone + CLI or setup guide), how the vault is organized (project folders, stages, templates), how Cursor rules and skills are used, and how to plan software projects (or similar) within the vault. The README can be copied into the vault or linked so it can serve as a knowledge base for the projects they plan.

**Why this priority**: Documentation is the contract for an open source project; without it, adoption and correct use are impossible.

**Independent Test**: Can be tested by reading the README and successfully performing install and first-project creation using only that documentation, and by opening the README in Obsidian and confirming it renders and links correctly.

**Acceptance Scenarios**:

1. **Given** the README, **When** a new user reads it from top to bottom, **Then** they can complete install (via CLI or guide) and create a first project folder with the correct stage structure without external help.
2. **Given** the README, **When** viewed in Obsidian (or a Markdown viewer that supports the same conventions), **Then** headings, lists, callouts, and internal/external links render correctly and support navigation.
3. **Given** any user-facing change to the pipeline (new folder, new command, breaking change), **When** the change is released, **Then** the README (or linked docs) is updated to reflect it so the documentation remains the single source of truth.

---

### User Story 4 - Discoverable CLI (Priority: P2)

A user has cloned the repository and wants to know what the CLI can do. They run the CLI with no arguments or with a help flag and see a clear list of commands (e.g. setup, init, version) and how to get more help per command. Exit codes are consistent (e.g. 0 for success, non-zero for failure) so the CLI can be used in scripts.

**Why this priority**: Reduces support burden and enables scripted or automated setup.

**Independent Test**: Can be tested by invoking the CLI with --help and -h and verifying output describes subcommands and options; and by running a successful install and a failing case (e.g. missing path) and checking exit codes.

**Acceptance Scenarios**:

1. **Given** the CLI executable/entry point, **When** the user runs it with no arguments or with a global help flag, **Then** the user sees a short description and a list of subcommands.
2. **Given** a subcommand (e.g. setup), **When** the user runs it with a help flag, **Then** the user sees that subcommand's options and usage.
3. **Given** a successful run of an install command, **When** the command exits, **Then** the exit code is 0; given a run that fails (e.g. invalid path or refusal to overwrite), **Then** the exit code is non-zero.

---

### Edge Cases

- What happens when the target directory is not empty and already contains a `.cursor` or `Templates` folder? The system MUST use merge-only behavior by default: add missing files and folders, skip existing files. Overwrite only when the user passes an explicit opt-in flag (e.g. `--overwrite`).
- What happens when the user runs the CLI from a directory that is not the vault? When no path argument is provided, the CLI treats the current directory as the vault; when the user intends a different vault, they MUST pass the vault path as an argument. The CLI SHOULD validate that the target path exists and is a directory (or prompt) before proceeding.
- What happens when the repository is cloned into a location that is not the vault? The setup guide and CLI MUST describe or support a flow where the user either runs the CLI from the vault with the repo elsewhere, or copies artifacts from the repo into the vault, so that the vault remains the single place where the pipeline is applied.
- How are optional elements (e.g. .github issue templates, Obsidian config snippets) handled? For v1: they are out of scope for the CLI; the setup guide MUST document how to copy them manually. Later releases MAY add CLI flags for optional installs.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The system MUST be installable by cloning a public GitHub repository; the clone MUST contain everything needed to run the CLI and/or follow the setup guide.
- **FR-002**: The system MUST provide a way to install the pipeline into a user-chosen Obsidian vault directory, either via a CLI command or via a step-by-step setup guide. The guide MUST produce a functionally equivalent result (same folders, same template set, same .cursor layout) so users get the same experience; minor differences (e.g. file order, comments) are acceptable.
- **FR-003**: The installed pipeline MUST create (or merge into) at least: a folder structure for projects (e.g. Projects/ with stage-based subfolders), a Templates folder with note templates, and Cursor configuration under .cursor (rules, skills, agents) consistent with the reference design (Obsidian note rules, canvas rules, project structure, templates, and optional git/workflow rules). For the first release (v1), the CLI install scope is this minimal set only; .github and .obsidian are out of scope for the CLI and MUST be documented in the setup guide for manual copy if desired.
- **FR-004**: The system MUST provide a root-level entry note (e.g. Dashboard) that orients the user and links to key areas, consistent with Obsidian and the reference design.
- **FR-005**: The system MUST NOT overwrite or delete existing user files in the vault without explicit user confirmation or an explicit opt-in (e.g. flag or prompt). By default, install MUST be merge-only: add missing folders and files only; skip any file that already exists. An optional flag (e.g. `--overwrite` or `--force`) MAY allow overwriting when the user opts in.
- **FR-006**: The README MUST be the primary user-facing documentation and MUST explain: what the pipeline is, how to install it (clone + CLI or setup guide), vault organization (projects, stages, templates), and how to use it with Obsidian and Cursor for project planning.
- **FR-007**: The README and any linked docs MUST be written in Markdown that follows Obsidian-friendly conventions (headings, lists, callouts, wikilinks or standard links) so they can be used as a knowledge base inside the vault.
- **FR-008**: The CLI MUST support a help mode (e.g. --help or -h) that shows usage and available subcommands; subcommands SHOULD have their own help.
- **FR-009**: The CLI MUST use consistent exit codes (0 for success, non-zero for failure) so that scripted or automated use is possible.
- **FR-010**: The repository MUST follow open source norms: include a LICENSE, CONTRIBUTING (or equivalent), and optionally CODE_OF_CONDUCT and issue/PR templates, and maintain a clear directory layout so contributors can find and extend the pipeline.
- **FR-011**: The CLI install command MUST support two invocation modes: (1) run from the vault directory, in which case the current working directory is the target vault; (2) run from any directory with an explicit vault path argument (e.g. `setup /path/to/vault`), so that the vault can be targeted without changing directory.
- **FR-012**: The CLI MUST be runnable on Windows, macOS, and Linux in the first release (v1); implementation MUST be portable across these platforms.

### Key Entities

- **Vault**: The Obsidian vault directory; the root folder that Obsidian opens. It receives the pipeline structure (Projects, Templates, .cursor, Dashboard).
- **Pipeline**: The set of folders, templates, Cursor rules, skills, and agents that implement the project planning workflow (stages 00–08, project MOC, canvases, etc.).
- **Template**: A Markdown (or canvas) file used as a starting point for notes in a given stage (e.g. PRD, Persona, Lean Canvas); stored in Templates/ and copied or instantiated into project folders.
- **Rule Set**: The collection of Cursor rules (.cursor/rules) that govern note format, canvas format, project structure, and templates so that AI and humans follow the same conventions.
- **CLI Command**: A single invocable entry (e.g. setup, init) that performs one or more install steps (copy files, create folders) into a target vault path.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: A new user who has never used the pipeline can complete a full install (clone + CLI or clone + setup guide) and open a working vault in Obsidian with the expected structure in under 15 minutes using only the README.
- **SC-002**: The README and setup guide are sufficient for at least 90% of users to install without opening an issue or asking for help (measurable by reduced support requests or by a short post-install survey).
- **SC-003**: No user loses existing vault content due to the install process; overwrites occur only after explicit confirmation or opt-in (verifiable by design review and test cases).
- **SC-004**: Contributors can add or modify a rule, template, or agent and submit a change using the documented CONTRIBUTING flow; the repository structure makes it clear where to add templates, rules, and CLI code.

## Assumptions

- Users have Obsidian installed (or will install it) and understand how to open a folder as a vault.
- Users have (or will have) Cursor installed and are interested in using the vault with Cursor for project planning (e.g. software projects).
- The reference design (Project-Brain) defines the desired structure and conventions; the open source repo will ship a generic version of that structure without the private example project content.
- The CLI may be implemented in a portable way (e.g. script or single-binary) so that users without a heavy runtime can still run it after cloning. It MUST support Windows, macOS, and Linux from day one.
- Documentation is maintained in the same repository as the code and templates, and is updated when user-facing behavior or structure changes.
