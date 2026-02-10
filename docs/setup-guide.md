# Setup guide — Pipeline without CLI

If you prefer not to run the CLI, you can achieve the same vault structure by copying the pipeline assets manually.

## Source and target paths

Clone the repository and copy from the `pipeline-assets/` folder into your vault root:

| Source (in repo) | Target (in vault) |
|------------------|-------------------|
| `pipeline-assets/Dashboard.md` | `Dashboard.md` |
| `pipeline-assets/Templates/*` | `Templates/` |
| `pipeline-assets/cursor/rules/*` | `.cursor/rules/` |
| `pipeline-assets/cursor/skills/*` | `.cursor/skills/` |
| `pipeline-assets/cursor/agents/*` | `.cursor/agents/` |
| `pipeline-assets/project-folders/*` | `Projects/` |

**Merge-only**: Do not overwrite existing files in your vault unless you intend to replace them.

## Optional: .github and .obsidian

The CLI does **not** install `.github` or `.obsidian` in v1. To add them:

- **.github**: Copy from the repo’s `.github` (if present) into your vault for issue templates and workflows.
- **.obsidian**: Configure Obsidian (appearance, plugins, themes) in your vault’s `.obsidian` folder; you can copy a reference `.obsidian` from another vault or set it up manually.

## Result

After copying, your vault will have:

- **Dashboard.md** — Command center note
- **Templates/** — Project and meeting templates (.md and .canvas)
- **.cursor/** — Rules, skills, and agents for Cursor
- **Projects/** — Empty stage folders (00_Status & Roadmap through 09_Assets, Archive)

This matches the result of running `pipeline setup [vault-path]`.
