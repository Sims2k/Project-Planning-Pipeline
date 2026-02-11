# Project Planning Pipeline

A **project planning pipeline for Cursor** that lives in **Obsidian**. Obsidian is well suited for planning and ideation; I use it to keep project context (roadmaps, PRDs, decisions) in one place and give my Cursor IDE that context. I also found that Cursor can help a lot with ideation and project planning at many steps—so this project exists to set up that loop: an Obsidian vault with a Dashboard, stage-based templates, and Cursor rules, skills, and agents (`.cursor/`) that work on the same notes. It’s especially useful for **digital or software projects**, but you can adapt it by adding your own agents, skills, rules, or folder structures.

This repo provides a CLI that installs the pipeline into a vault: a Dashboard, `Templates/`, `.cursor/`, and a `Projects/` directory where each project gets its own folder with a standard stage layout (Status & Roadmap, Market Analysis, Product, Design, Engineering, etc.).

**Requirements:** Node.js 20+ (npm included).

**Guide:** For a step-by-step guide and more context on using the pipeline for personal or business projects, see https://oliseus.com/digital-odyssey/posts/project-planning-pipeline/ on the Oliseus blog.

---

## How to set up (end-to-end)

This is the usual way to get from an empty folder to a vault with your first project.

1. **Use a folder as your vault**  
   Open or create the folder that will be your Obsidian vault (e.g. `C:\Vaults\MyBrain` or `~/vaults/my-brain`).

2. **Install the pipeline (shared assets only)**  
   In a terminal, go to that folder and run:
   ```bash
   cd C:\Vaults\MyBrain
   npx github:Sims2k/Project-Planning-Pipeline setup
   ```
   You get: `Dashboard.md`, `Templates/`, `.cursor/`, and an empty `Projects/` directory.

3. **Create your first project**  
   Run setup again with a project name. The name is the folder that will appear under `Projects/`:
   ```bash
   npx github:Sims2k/Project-Planning-Pipeline setup --project "My First Project"
   ```
   The CLI creates `Projects/My First Project/` and all stage folders inside it (00_Status & Roadmap through 09_Assets, Archive).

4. **Add more projects anytime**  
   Run the same command with a different name:
   ```bash
   npx github:Sims2k/Project-Planning-Pipeline setup --project "Another Project"
   ```
   Existing files are left unchanged (merge-only).

5. **Optional next steps**  
   In Obsidian, open the vault folder. Create a Project MOC in each project folder using **Templates → 00_Project MOC.md** and link it from the Dashboard.

**If you are not in the vault directory:** pass the vault path as the first argument:
```bash
npx github:Sims2k/Project-Planning-Pipeline setup C:\Vaults\MyBrain --project "My First Project"
```

**Global install:** `npm install -g github:Sims2k/Project-Planning-Pipeline` — then you can run `pipeline setup` and `pipeline setup --project "Name"` from any directory (use a vault path when not inside the vault).

---

## CLI reference

| Command | Description |
|--------|-------------|
| `pipeline setup` | Install into current directory (shared assets only). |
| `pipeline setup --project "Project Name"` | Install and create `Projects/Project Name/` with stage folders. |
| `pipeline setup [vault-path]` | Use `vault-path` as the vault (e.g. `C:\Vaults\MyBrain`). |
| `pipeline setup [vault-path] --project "Project Name"` | Vault path and project name together. |
| `pipeline version` | Print version. |
| `pipeline --help` | Show all options. |

Options: `-p, --project <name>` (project folder name); `-f, --overwrite` (overwrite existing files); `--no-color`. Exit codes: 0 success, 1 error, 2 invalid path.

---

## Vault layout

After setup you have:

- **Dashboard.md** — Command center note.
- **Templates/** — Note and canvas templates per stage.
- **.cursor/** — Rules, skills, and agents for Cursor.
- **Projects/** — One folder per project (e.g. `Projects/My First Project/`), each with: 00_Status & Roadmap, 01_Market Analysis, … 09_Assets, Archive (and 06_Engineering/Sprints).

---

## Obsidian community plugins

To make the Dashboard, templates, and charts work as intended, install these Obsidian community plugins (Settings → Community plugins → Browse and install):

**Recommended (needed for pipeline features):**

- **DataView** — Required for Dashboard queries (tables, lists from your notes). [Obsidian-Templates](https://github.com/groepl/Obsidian-Templates) and the [Obsidian Zettelkasten Starter Kit](https://github.com/groepl/Obsidian-Zettelkasten-Starter-Kit) both rely on it.
- **Templates** — So you can insert notes from the `Templates/` folder (e.g. 00_Project MOC, PRD, Backlog). Use Obsidian’s core Templates plugin or a community alternative and set the template folder to `Templates`.
- **Charts** — For charts and graphs in notes (e.g. in the Dashboard or project notes).
- **Banners** — For banner images in note headers (referred to in some templates).

**Optional (Zettelkasten-style workflow):**

The [Obsidian Zettelkasten Starter Kit](https://github.com/groepl/Obsidian-Zettelkasten-Starter-Kit) recommends Banners, Charts, and DataView. [Obsidian-Templates](https://github.com/groepl/Obsidian-Templates) lists additional plugins (e.g. Frontmatter Tag Suggest, Update Time on Edit, Wikipedia, Auto Link Title, Tag Wrangler). Install any of these if you want the same workflow as in those guides.

After installing, enable the plugins in Settings → Community plugins and restart Obsidian if prompted.

---

## Setup without the CLI

To build the same structure by hand (e.g. no Node.js): clone this repo and copy from `pipeline-assets/` into your vault root.

- **Shared:** `Dashboard.md` → vault root; `Templates/*` → `Templates/`; `cursor/rules/*` → `.cursor/rules/`; `cursor/skills/*` → `.cursor/skills/`; `cursor/agents/*` → `.cursor/agents/`. Create an empty `Projects/` folder.
- **Per project:** Create `Projects/<YourProjectName>/` and copy the contents of `pipeline-assets/project-folders/` into it (stage folders 00_… through 09_Assets, Archive, and 06_Engineering/Sprints).

Do not overwrite existing files unless you intend to replace them. `.github` and `.obsidian` are not in pipeline-assets; add or configure them in the vault if needed.

---

## Contributing and collaboration

Ideas and collaboration are welcome. If you have a suggestion to improve this project or want to work on it together, please reach out (e.g. via GitHub discussions or issues). See **[CONTRIBUTING.md](CONTRIBUTING.md)** for how to set up the repo, run the CLI and tests, and submit changes.

Contributions that add **compatibility with other coding agents** (e.g. Windsurf, Cline, or other AI IDEs) are especially valuable—I have limited time besides study to extend this and make it useful for more people, so community help is appreciated.

---

## Credits

Vault layout and Dashboard design draw on the [Obsidian Zettelkasten Starter Kit](https://github.com/groepl/Obsidian-Zettelkasten-Starter-Kit) and [Obsidian-Templates](https://github.com/groepl/Obsidian-Templates) (Edmund Gröpl).

---

## License

MIT — [LICENSE](LICENSE).
