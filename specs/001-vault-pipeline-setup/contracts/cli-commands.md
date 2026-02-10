# CLI Command Contract

**Feature**: 001-vault-pipeline-setup  
**Date**: 2025-02-10  
**Purpose**: Command surface and options for the pipeline CLI; used for implementation and tests.

---

## Entry point

- **Name**: `pipeline` (or as defined in `package.json` `bin`).
- **Invocation**: `pipeline [command] [options]` or `npx pipeline [command] [options]`.
- **Exit codes**: 0 = success; 1 = generic error; 2 = invalid path or validation failure.

---

## Commands

### setup

Install the project planning pipeline into a vault.

**Usage**: `pipeline setup [vault-path]`

**Arguments**:

| Argument     | Required | Description |
|-------------|----------|-------------|
| vault-path  | No       | Target vault directory. If omitted, current working directory is used. |

**Options**:

| Option        | Short | Type    | Default | Description |
|---------------|-------|---------|---------|-------------|
| --overwrite   | -f    | boolean | false   | Overwrite existing files. Default is merge-only (skip existing). |
| --no-color    | —     | boolean | false   | Disable colored output (e.g. for CI). |
| --help        | -h    | —       | —       | Show help for setup. |

**Behavior**:

- Resolve vault path: if `vault-path` provided, use it (after resolving to absolute); else use `process.cwd()`.
- Validate: path must exist and be a directory; else exit 2 with message.
- Copy pipeline-assets into vault: merge-only unless --overwrite. Count copied, skipped, overwritten.
- Output: optional banner (boxen/ASCII); progress or summary; success message or error.
- Exit 0 on success; non-zero on validation or copy failure.

---

### version

Print CLI version.

**Usage**: `pipeline version`

**Options**: None (--help may be supported).

**Behavior**: Print version string (e.g. from package.json). Exit 0.

---

### help (default)

Show global help or command-specific help.

**Usage**: `pipeline` or `pipeline --help` or `pipeline -h` or `pipeline help [command]`

**Behavior**: List subcommands and global options; if command given, show that command’s help. Exit 0.

---

## Global options

| Option   | Short | Description |
|----------|-------|-------------|
| --help   | -h    | Show help. |
| --no-color | —   | Disable colored output. |

---

## Test contract

- Invoking `pipeline --help` or `pipeline -h` must print usage and list at least `setup` and `version`.
- Invoking `pipeline setup --help` must print setup-specific usage and options.
- Invoking `pipeline setup /nonexistent` must exit non-zero (e.g. 2).
- Invoking `pipeline setup` in an empty directory must exit 0 and create at least Projects/, Templates/, .cursor/, Dashboard.md.
- Invoking `pipeline setup` again in the same directory (merge-only) must exit 0 and overwrite no existing files (skipped count > 0 if files exist).
