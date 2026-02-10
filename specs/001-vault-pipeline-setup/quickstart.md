# Quickstart: Implementing the Vault Pipeline CLI

**Feature**: 001-vault-pipeline-setup  
**Audience**: Developers implementing the CLI and pipeline assets.

---

## Prerequisites

- Node.js LTS 20.x or 22.x
- Git (for clone and repo layout)
- Access to reference vault: `C:\Dev\Project-Brain` (for copying pipeline-assets content; do not commit private project content)

---

## Repo layout (after implementation)

```text
<repo-root>/
  bin/pipeline.js       # Entry: #!/usr/bin/env node
  src/cli/              # Commander program, setup, version
  src/install/          # Copy logic, merge-only
  src/ui/               # Banner, colors
  pipeline-assets/      # Dashboard, Templates, cursor, project-folders
  tests/
  package.json          # bin, scripts, dependencies
  README.md
```

---

## Implementation order

1. **Scaffold**: `package.json` with `bin`, dependencies (commander, chalk or picocolors, boxen), and scripts (start, test).
2. **Path resolution**: Given repo root (e.g. from `__dirname` or env), resolve vault path (argument or cwd); validate directory.
3. **Pipeline assets**: Populate `pipeline-assets/` from Project-Brain (Dashboard, Templates, .cursor → cursor/, project folder names only under project-folders/). Exclude .github, .obsidian, and any Life-In-Weeks (or other private) content.
4. **Copy + merge**: For each asset, if target exists and not --overwrite → skip; else copy. Track copied/skipped/overwritten.
5. **CLI**: Register `setup [path]` and `version`; --overwrite, --no-color, --help; banner and colored summary.
6. **Tests**: Unit (path resolve, merge decision); integration (temp dir, setup, assert structure and no overwrite without flag).
7. **README + setup guide**: Install instructions (clone, npx or global), CLI usage, and manual steps for .github/.obsidian.

---

## Key files to create

| File | Purpose |
|------|--------|
| bin/pipeline.js | Shebang, require main CLI. |
| src/cli/index.js | Commander program, register setup + version. |
| src/cli/commands/setup.js | Parse path/options, call install, output result. |
| src/install/copy-pipeline.js | Walk pipeline-assets, copy/skip/overwrite into vault. |
| src/install/merge-only.js | Given source and target path, return copy | skip | overwrite. |
| src/ui/banner.js | Optional ASCII/boxen welcome. |
| pipeline-assets/* | Content from Project-Brain (no private project). |

---

## Validation before PR

- [ ] `pipeline --help` and `pipeline setup --help` show expected usage.
- [ ] `pipeline setup` in empty dir creates Projects/, Templates/, .cursor/, Dashboard.md.
- [ ] Second `pipeline setup` in same dir overwrites nothing (merge-only).
- [ ] `pipeline setup /invalid` exits non-zero.
- [ ] README explains install (clone + npx or global) and points to setup guide for manual .github/.obsidian.
