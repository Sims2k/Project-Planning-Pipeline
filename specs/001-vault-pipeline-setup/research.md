# Research: Obsidian Vault Pipeline Setup CLI

**Feature**: 001-vault-pipeline-setup  
**Date**: 2025-02-10  
**Purpose**: Resolve technical context and align with modern CLI best practices and reference design (Project-Brain).

---

## 1. Technology Stack for Cross-Platform CLI

### Decision

**Node.js (LTS 20.x or 22.x) with Commander.js for the CLI.** Use **chalk** (or **picocolors**) for colored output, **boxen** for bordered boxes, and optionally **figlet** or a small ASCII-art banner for a minimal branded welcome. No database or remote API; file system only.

### Rationale

- **Cross-platform**: Node.js runs on Windows, macOS, and Linux with a single codebase; satisfies FR-012. Users who clone the repo typically have or can install Node (common for developers and Obsidian/Cursor users). Optional: document `npx` so users can run without global install.
- **Ecosystem**: Commander.js is the de facto standard for Node CLIs (subcommands, --help, options); create-vite, create-next-app, and similar setup tools use it. Aligns with constitution (CLI best practices).
- **Minimal and simple**: No backend, no DB; just copy files and create directories. Keeps the tool easy to reason about and maintain.
- **Portable**: Constitution prefers "portable CLI (script or single-binary)". Node is script-based; optional later: Single Executable Application (SEA) or pkg for a single binary if we want zero-runtime install.

### Alternatives Considered

| Alternative | Pros | Rejected Because |
|-------------|------|------------------|
| Python + Typer + Rich | Rich colors, single-language | Less universal for "clone and run" among JS/TS ecosystem; two runtimes to document (Node already common for tooling). |
| Shell (bash/pwsh) | No runtime, portable | Harder to maintain one codebase for Win/Mac/Linux; weaker UX (ASCII/colors more fragmented). |
| Go/Rust binary | Single binary, fast | Heavier build/release and contribution barrier; overkill for file-copy setup. |

---

## 2. CLI UI: ASCII Art and Coloring

### Decision

- **Colors**: Use **chalk** (or **picocolors** for smaller footprint) for success (green), warning (yellow), error (red), info (cyan). Style key messages (e.g. "Pipeline installed successfully") and step labels.
- **Boxes**: Use **boxen** for a short welcome banner at start of `setup` (e.g. "Project Planning Pipeline") and optionally for success summary.
- **ASCII art**: Optional small banner (e.g. **figlet** or a 3–5 line ASCII logo) at first run or `--help` to give a minimal branded feel. Keep it minimal so terminal stays readable.

### Rationale

- User asked for "UI features like ASCII art and coloring for the setup guide"; modern CLI tools (create-vite, etc.) use colored output and sometimes a small logo.
- Minimal and simple: no TUI; just styled stdout. Scriptable use (e.g. CI) can be supported via `--no-color` or `CI=1` to disable colors.

### Alternatives Considered

| Alternative | Pros | Rejected Because |
|-------------|------|------------------|
| Inquirer (prompts) | Interactive | Spec favors "minimal"; merge-only default reduces need for prompts; can add later. |
| Full TUI (blessed, ink) | Rich UI | Overkill for a setup copy; increases complexity and dependency surface. |

---

## 3. Reference Structure: Project-Brain (C:\Dev\Project-Brain)

The following layout is the source of truth for what the pipeline installs (v1 minimal set). No private project content (e.g. Life-In-Weeks) is shipped; only structure and shared assets.

### Installed by CLI (v1)

| Source (Project-Brain) | Installed into vault | Notes |
|------------------------|----------------------|--------|
| `Dashboard.md` | `Dashboard.md` | Root entry note; Obsidian frontmatter, Dataview, links. |
| `Templates/*.md`, `Templates/*.canvas` | `Templates/` | All stage templates (00_–07_, XX_); .canvas files alongside .md. |
| `.cursor/rules/*.mdc` | `.cursor/rules/` | obsidian-notes, canvas-files, project-structure, guidelines, templates, git-workflow, github-sync. |
| `.cursor/skills/*/SKILL.md` | `.cursor/skills/<name>/` | obsidian-bases, obsidian-json-canvas, obsidian-markdown, project-documentation. |
| `.cursor/agents/*.md` | `.cursor/agents/` | README.md + role files (e.g. product-manager, backend-developer). |
| — | `Projects/` | Empty stage folders only (00_Status & Roadmap … 09_Assets, Archive); no example project. |

### Project folder structure (created empty)

```
Projects/
  00_Status & Roadmap/
  01_Market Analysis/
  02_User Research/
  03_Product/
  04_Design/
  05_Technical/
  06_Engineering/
    Sprints/
  07_Analytics & Growth/
  08_Legal & Privacy/
  09_Assets/
  Archive/
```

Placeholders (e.g. `.gitkeep`) in empty project stage folders are acceptable so the structure is visible and Git-friendly.

### Explicitly out of scope for v1 CLI

- `.github/` (issue/PR templates) — setup guide only.
- `.obsidian/` (plugins, themes, snippets) — setup guide only.

---

## 4. Best Practices Applied

- **Subcommands**: `setup [path]`, `version`, default or explicit `help`. Commander.js provides this.
- **Options**: `--overwrite` / `--force` for overwrite; `--help`, `-h`; optional `--no-color` for scriptability.
- **Exit codes**: 0 success, non-zero failure (e.g. 1 generic error, 2 invalid path).
- **Merge-only default**: Copy only missing files; skip existing; overwrite only with explicit flag.
- **Path resolution**: If `path` omitted, use `process.cwd()`; else validate path exists and is a directory before copying.
- **Repository layout**: CLI entry in `bin/` or `dist/`; pipeline assets (templates, .cursor content) in a dedicated folder (e.g. `pipeline-assets/` or `templates/` at repo root) so the CLI can resolve paths relative to the repo when run from anywhere.

---

## 5. Testing Strategy

- **Unit**: Functions that resolve vault path, decide copy/skip/overwrite for a file, and list files to install.
- **Integration**: Run CLI against a temp directory; assert folder structure and presence of key files; assert no overwrite without `--overwrite`; assert exit codes.
- **Contract**: CLI command surface (subcommands, options) documented in contracts/ and validated by tests.

---

## 6. Summary of Resolved Items

| Technical Context Item | Resolution |
|------------------------|------------|
| Language/Version | Node.js LTS 20.x or 22.x |
| Primary Dependencies | Commander.js, chalk (or picocolors), boxen, optional figlet |
| Storage | N/A (file system only) |
| Testing | Node.js test runner (e.g. node:test) or Jest; integration tests with temp dirs |
| Target Platform | Windows, macOS, Linux |
| Project Type | Single project (CLI + pipeline assets) |
| Performance Goals | Install completes in seconds (file copy) |
| Constraints | No overwrite without opt-in; portable; minimal deps |
| Scale/Scope | Single vault per invocation; dozens of templates/rules/skills/agents |
