const fs = require('fs');
const path = require('path');
const { getPipelineAssetsPath } = require('./paths.js');
const { decideFileOperation } = require('./merge-only.js');

/**
 * Map relative path under pipeline-assets to vault-relative path.
 * - Dashboard.md -> Dashboard.md
 * - Templates/x -> Templates/x
 * - cursor/rules/x -> .cursor/rules/x
 * - cursor/skills/x -> .cursor/skills/x
 * - cursor/agents/x -> .cursor/agents/x
 * - project-folders/x -> Projects/x
 */
function assetRelToVaultRel(assetRel) {
  const normalized = path.normalize(assetRel).replace(/\\/g, '/');
  if (normalized === 'Dashboard.md') return 'Dashboard.md';
  if (normalized.startsWith('Templates/')) return normalized;
  if (normalized.startsWith('cursor/')) return '.cursor/' + normalized.slice('cursor/'.length);
  if (normalized.startsWith('project-folders/')) return 'Projects/' + normalized.slice('project-folders/'.length);
  return normalized;
}

/**
 * Recursively list all files under dir (relative to base).
 * @param {string} base - Base directory (absolute)
 * @param {string} dir - Current dir (absolute)
 * @param {string} rel - Relative path from base
 * @returns {Array<{absolute: string, relative: string}>}
 */
function listFiles(base, dir, rel = '') {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files = [];
  for (const e of entries) {
    const abs = path.join(dir, e.name);
    const r = rel ? path.join(rel, e.name) : e.name;
    if (e.isFile()) {
      files.push({ absolute: abs, relative: r.replace(/\\/g, '/') });
    } else if (e.isDirectory()) {
      files.push(...listFiles(base, abs, r));
    }
  }
  return files;
}

/**
 * Copy pipeline-assets into vault. Merge-only unless overwrite is true.
 * @param {string} vaultPath - Absolute path to vault
 * @param {boolean} overwrite - If true, overwrite existing files
 * @returns {{ copied: number, skipped: number, overwritten: number }}
 */
function copyPipeline(vaultPath, overwrite) {
  const assetsPath = getPipelineAssetsPath();
  const files = listFiles(assetsPath, assetsPath);
  let copied = 0, skipped = 0, overwritten = 0;

  for (const { absolute: sourcePath, relative: assetRel } of files) {
    const vaultRel = assetRelToVaultRel(assetRel);
    const targetPath = path.join(vaultPath, vaultRel);

    const op = decideFileOperation(sourcePath, targetPath, overwrite);
    if (op === 'skip') {
      skipped++;
      continue;
    }

    const targetDir = path.dirname(targetPath);
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }
    fs.copyFileSync(sourcePath, targetPath);
    if (op === 'overwrite') overwritten++;
    else copied++;
  }

  return { copied, skipped, overwritten };
}

module.exports = { copyPipeline, assetRelToVaultRel, listFiles };
