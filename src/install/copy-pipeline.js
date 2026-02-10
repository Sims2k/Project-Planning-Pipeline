const fs = require('fs');
const path = require('path');
const { getPipelineAssetsPath } = require('./paths.js');
const { decideFileOperation } = require('./merge-only.js');

/**
 * Map relative path under pipeline-assets to vault-relative path.
 * When projectName is set, project-folders go under Projects/<projectName>/.
 * When projectName is not set, project-folders are skipped (returns null).
 * - Dashboard.md -> Dashboard.md
 * - Templates/x -> Templates/x
 * - cursor/* -> .cursor/*
 * - project-folders/x -> Projects/<projectName>/x (or null if no projectName)
 */
function assetRelToVaultRel(assetRel, projectName) {
  const normalized = path.normalize(assetRel).replace(/\\/g, '/');
  if (normalized === 'Dashboard.md') return 'Dashboard.md';
  if (normalized.startsWith('Templates/')) return normalized;
  if (normalized.startsWith('cursor/')) return '.cursor/' + normalized.slice('cursor/'.length);
  if (normalized.startsWith('project-folders/')) {
    if (!projectName || !projectName.trim()) return null;
    const rest = normalized.slice('project-folders/'.length);
    return 'Projects/' + projectName.trim() + '/' + rest;
  }
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
 * When projectName is provided, stage folders are created under Projects/<projectName>/.
 * When not provided, only shared assets (Dashboard, Templates, .cursor) are copied and Projects/ is created empty.
 * @param {string} vaultPath - Absolute path to vault
 * @param {boolean} overwrite - If true, overwrite existing files
 * @param {string} [projectName] - Optional. If set, create Projects/<projectName>/ with stage folders (00_..., 09_Assets, Archive).
 * @returns {{ copied: number, skipped: number, overwritten: number }}
 */
function copyPipeline(vaultPath, overwrite, projectName) {
  const assetsPath = getPipelineAssetsPath();
  const files = listFiles(assetsPath, assetsPath);
  let copied = 0, skipped = 0, overwritten = 0;

  for (const { absolute: sourcePath, relative: assetRel } of files) {
    const vaultRel = assetRelToVaultRel(assetRel, projectName);
    if (vaultRel === null) continue; // skip project-folders when no project name

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

  // Ensure Projects/ exists even when no project name (so user can add projects later)
  const projectsDir = path.join(vaultPath, 'Projects');
  if (!fs.existsSync(projectsDir)) {
    fs.mkdirSync(projectsDir, { recursive: true });
  }

  return { copied, skipped, overwritten };
}

module.exports = { copyPipeline, assetRelToVaultRel, listFiles };
