# Contributing to Project Planning Pipeline

Thank you for considering contributing.

## Development setup

1. Clone the repository and install dependencies:
   ```bash
   npm install
   ```

2. Run the CLI from the repo root:
   ```bash
   node bin/pipeline.js setup [path]
   ```

3. Run tests:
   ```bash
   npm test
   ```

## Project structure

- **bin/pipeline.js** — CLI entry point
- **src/cli/** — Commander program and commands (setup, version)
- **src/install/** — Copy logic, merge-only, path resolution
- **src/ui/** — Banner and colors
- **pipeline-assets/** — Bundled vault content (Dashboard, Templates, .cursor, project-folders)
- **tests/integration/** — Integration tests for the setup command

## Submitting changes

- Open an issue or pull request on the repository.
- Keep changes aligned with the spec and plan in `specs/001-vault-pipeline-setup/`.
- Ensure `npm test` passes.

## Code and docs

- Follow existing style (CommonJS, Node.js LTS).
- Update README and docs when changing user-facing behavior.
