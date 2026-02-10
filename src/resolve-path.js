const path = require('path');
const fs = require('fs');

/**
 * Resolve vault path: use provided path or cwd. Validate it exists and is a directory.
 * @param {string|undefined} vaultPath - Optional path argument (vault directory)
 * @returns {string} Absolute path to vault directory
 * @throws {Error} If path does not exist or is not a directory (exit 2 by caller)
 */
function resolveVaultPath(vaultPath) {
  const raw = vaultPath ? path.resolve(vaultPath) : process.cwd();
  const resolved = path.resolve(raw);
  if (!fs.existsSync(resolved)) {
    const err = new Error(`Vault path does not exist: ${resolved}`);
    err.code = 'ENOENT';
    throw err;
  }
  const stat = fs.statSync(resolved);
  if (!stat.isDirectory()) {
    const err = new Error(`Vault path is not a directory: ${resolved}`);
    err.code = 'ENOTDIR';
    throw err;
  }
  return resolved;
}

module.exports = { resolveVaultPath };
