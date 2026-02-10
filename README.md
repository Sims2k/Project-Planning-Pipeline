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

## Prerequisites

- **Node.js** 20 or later (includes npm). Check with `node -v` and `npm -v`.

---

## Install

### One command (you’re already in your vault)

If you’re in your vault folder, this is all you need — no path, no clone, no global install:

```bash
npx github:Sims2k/Project-Planning-Pipeline setup
```

It installs the pipeline into the **current directory**. Done.

---

### Other ways to run it

Pick one of the following. Each uses the GitHub repo (no npm publish required).

**Run once from anywhere (npx, no install)**

```bash
# From your vault folder
npx github:Sims2k/Project-Planning-Pipeline setup

# From anywhere — pass the vault path
npx github:Sims2k/Project-Planning-Pipeline setup C:\path\to\your\vault
```

---

### Install globally (recommended if you use it often)

Install once from GitHub; then the `pipeline` command is available everywhere.

```bash
npm install -g github:Sims2k/Project-Planning-Pipeline
```

Then run:

```bash
# From your vault folder
pipeline setup

# Or from anywhere
pipeline setup C:\path\to\your\vault
```

To update later: run the same `npm install -g github:Sims2k/Project-Planning-Pipeline` again.

---

### Clone and run from source

Useful if you want to hack on the repo or run without network access.

```bash
git clone https://github.com/Sims2k/Project-Planning-Pipeline.git
cd Project-Planning-Pipeline
npm install
```

Run the CLI from the repo directory:

```bash
node bin/pipeline.js setup
```

Or install this clone globally so `pipeline` is on your PATH:

```bash
cd Project-Planning-Pipeline
npm install -g .
pipeline setup
```

---

### Without the CLI

See [Setup guide (manual)](docs/setup-guide.md) to copy `pipeline-assets/` into your vault by hand (same result as the CLI).

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
