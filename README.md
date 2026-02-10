# Project Planning Pipeline

CLI to set up a project planning pipeline in an Obsidian vault: Dashboard, Templates, `.cursor` (rules, skills, agents), and a `Projects/` directory. Use with Cursor and Obsidian for structured project documentation.

**Prerequisites:** Node.js 20+ (includes npm).

---

## Install

From your vault directory:

```bash
npx github:Sims2k/Project-Planning-Pipeline setup
```

This installs shared assets only (Dashboard, Templates, `.cursor`, empty `Projects/`). To create your first project, add the project name with `--project`:

```bash
npx github:Sims2k/Project-Planning-Pipeline setup --project "My Project"
```

Replace `"My Project"` with your project name. The CLI creates `Projects/My Project/` and all stage folders inside it. To add more projects, run the same command with a different name.

**From another directory:** pass the vault path as the first argument:

```bash
npx github:Sims2k/Project-Planning-Pipeline setup C:\path\to\vault --project "My Project"
```

**Global install:** `npm install -g github:Sims2k/Project-Planning-Pipeline` then run `pipeline setup` or `pipeline setup --project "My Project"` from anywhere.

---

## CLI reference

| Command | Description |
|--------|-------------|
| `pipeline setup` | Install pipeline into current directory (shared assets only). |
| `pipeline setup --project "Project Name"` | Install and create `Projects/Project Name/` with stage folders. |
| `pipeline setup [vault-path]` | Use `vault-path` instead of current directory. |
| `pipeline setup [vault-path] --project "Project Name"` | Vault path + project name. |
| `pipeline version` | Print version. |
| `pipeline --help` | Show all options. |

**Setup options:** `-p, --project <name>` (project name); `-f, --overwrite` (overwrite existing files); `--no-color`.

**Exit codes:** 0 success, 1 error, 2 invalid path.

---

## Vault layout

- **Dashboard.md** — Command center.
- **Templates/** — Stage-based note and canvas templates.
- **.cursor/** — Rules, skills, agents for Cursor.
- **Projects/** — One folder per project (e.g. `Projects/My Project/`), each with stages: 00_Status & Roadmap … 09_Assets, Archive.

After creating a project, add a Project MOC in that folder using **Templates → 00_Project MOC.md** and link it from the Dashboard.

---

## Manual setup

Without the CLI: [docs/setup-guide.md](docs/setup-guide.md) describes how to copy `pipeline-assets/` into your vault and how to add project folders manually.

---

## Credits

Vault layout and Dashboard design draw on the [Obsidian Zettelkasten Starter Kit](https://github.com/groepl/Obsidian-Zettelkasten-Starter-Kit) and [Obsidian-Templates](https://github.com/groepl/Obsidian-Templates) (Edmund Gröpl).

---

## License

MIT — [LICENSE](LICENSE).
