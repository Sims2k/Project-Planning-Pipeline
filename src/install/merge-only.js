const fs = require('fs');
const path = require('path');

/** @typedef {'copy'|'skip'|'overwrite'} FileOperation */

/**
 * Decide whether to copy, skip, or overwrite a file when installing into the vault.
 * @param {string} sourcePath - Absolute path to source file
 * @param {string} targetPath - Absolute path to target file in vault
 * @param {boolean} overwrite - If true, allow overwriting existing files
 * @returns {FileOperation}
 */
function decideFileOperation(sourcePath, targetPath, overwrite) {
  if (!fs.existsSync(targetPath)) {
    return 'copy';
  }
  const stat = fs.statSync(targetPath);
  if (!stat.isFile()) {
    return 'copy'; // e.g. target is a dir; caller may create file
  }
  if (overwrite) {
    return 'overwrite';
  }
  return 'skip';
}

module.exports = { decideFileOperation };
