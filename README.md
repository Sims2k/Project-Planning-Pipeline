# Project Planning Pipeline

> A CLI that sets up a **project planning pipeline** inside your **Obsidian vault**: Projects, Templates, .cursor (rules, skills, agents), and a Dashboard. Use it with **Cursor** and **Obsidian** for structured project documentation.

---

## What you get

- **Dashboard** — Central command center note
- **Templates** — Stage-based project and meeting templates (.md and .canvas)
- **.cursor** — Rules, skills, and agents for Cursor
- **Projects** — Empty stage folders (00_Status & Roadmap through 09_Assets, Archive) ready for new projects

Merge-only by default: existing files in your vault are not overwritten unless you opt in.

---

## Install

1. **Clone the repo**
   ```bash
   git clone https://github.com/Sims2k/Project-Planning-Pipeline.git
   cd Project-Planning-Pipeline
   ```

2. **Run the CLI** (from the repo or with a path to your vault)
   - **From the vault directory**, point npx at the cloned repo (replace with your path to the clone):
     ```bash
     npx /path/to/Project-Planning-Pipeline setup
     ```
   - **From inside the cloned repo**, run setup and pass your vault path:
     ```bash
     cd Project-Planning-Pipeline
     npm install
     node bin/pipeline.js setup C:\path\to\your\vault
     ```
   - **Or install globally** from the cloned repo and run `pipeline` from anywhere:
     ```bash
     cd Project-Planning-Pipeline
     npm install -g .
     pipeline setup
     ```
     (From inside your vault folder, or `pipeline setup C:\path\to\vault` from anywhere.)

3. **Without CLI** — See [Setup guide (manual)](docs/setup-guide.md) to copy `pipeline-assets/` into your vault by hand.

---

## CLI usage

| Command | Description |
|--------|-------------|
| `pipeline` / `pipeline --help` | Show help and list commands |
| `pipeline setup [vault-path]` | Install the pipeline into a vault (default: current directory) |
| `pipeline version` | Print CLI version |

**Options for `setup`**

| Option | Description |
|--------|-------------|
| `-f, --overwrite` | Overwrite existing files (default: merge-only, skip existing) |
| `--no-color` | Disable colored output (e.g. for CI) |

**Exit codes**

| Code | Meaning |
|------|--------|
| 0 | Success |
| 1 | Generic error (e.g. copy failure) |
| 2 | Invalid path or validation failure (e.g. path does not exist or is not a directory) |

---

## Vault organization

- **Projects/** — One folder per project. Each project uses the same stage structure (00_Status & Roadmap, 01_Market Analysis, … 09_Assets, Archive).
- **Templates/** — Reusable note and canvas templates for each stage.
- **.cursor/** — Cursor rules, skills, and agents that apply when working in the vault.
- **Dashboard.md** — Entry point for projects, metrics, and experiments (Obsidian + Dataview).

---

## Creating your first project

1. Under **Projects/**, create a new folder with your project name (e.g. `My Product`).
2. Copy the stage structure from **Projects** (or from `pipeline-assets/project-folders/`):  
   `00_Status & Roadmap`, `01_Market Analysis`, `02_User Research`, `03_Product`, `04_Design`, `05_Technical`, `06_Engineering`, `07_Analytics & Growth`, `08_Legal & Privacy`, `09_Assets`, `Archive`. Optionally add `06_Engineering/Sprints/`.
3. Create a **Project MOC** (Map of Content) in the project root using the template **Templates → 00_Project MOC.md**, and link it from the Dashboard.
4. Use **Templates** and **.cursor** rules/skills/agents when writing notes and running Cursor in the vault.

---

## Platform support

The CLI is supported on **Windows**, **macOS**, and **Linux** (Node.js LTS 20 or 22). Run from the repo or with an absolute/relative vault path.

---

## Documentation

- [Setup guide (manual copy)](docs/setup-guide.md) — Same result as the CLI without running it.
- This README is written in Obsidian-friendly Markdown (headings, lists, links) so you can use it as a knowledge base note in your vault.

---

## Optional config (future)

An optional CLI config file may be added in a future release (e.g. default vault path, theme). The current release uses command-line options only.

---

## License

MIT — see [LICENSE](LICENSE).
