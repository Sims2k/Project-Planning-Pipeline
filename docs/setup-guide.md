# Manual setup (without CLI)

You can get the same vault structure by copying from the repo’s `pipeline-assets/` folder.

## 1. Shared assets

Copy into your vault root:

| Source | Target |
|--------|--------|
| `pipeline-assets/Dashboard.md` | `Dashboard.md` |
| `pipeline-assets/Templates/*` | `Templates/` |
| `pipeline-assets/cursor/rules/*` | `.cursor/rules/` |
| `pipeline-assets/cursor/skills/*` | `.cursor/skills/` |
| `pipeline-assets/cursor/agents/*` | `.cursor/agents/` |

Create an empty `Projects/` directory in the vault.

## 2. Adding a project

For each project, create a folder under `Projects/` with your project name, then copy the stage structure into it:

- **Target:** `Projects/<YourProjectName>/`
- **Source:** Copy the contents of `pipeline-assets/project-folders/` into that folder.

So you get `Projects/<YourProjectName>/00_Status & Roadmap/`, `01_Market Analysis/`, … `09_Assets/`, `Archive/`, and `06_Engineering/Sprints/` (each can contain a `.gitkeep` or stay empty).

Do not overwrite existing files unless you intend to replace them.

## Optional

- **.github** / **.obsidian**: Not included in pipeline-assets. Add or configure them in your vault as needed.
