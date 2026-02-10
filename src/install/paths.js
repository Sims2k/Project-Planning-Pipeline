const path = require('path');
const fs = require('fs');

/**
 * Resolve repo root: from __dirname we are in src/install/, so repo is ../..
 * Then pipeline-assets is at repoRoot/pipeline-assets.
 * Works when running via node bin/pipeline.js (bin -> node loads src/cli/index.js which requires from src/install).
 * @returns {string} Absolute path to pipeline-assets directory
 */
function getPipelineAssetsPath() {
  // When required from src/cli/commands/setup.js -> src/install/copy-pipeline.js -> paths.js
  // __dirname is .../src/install
  const repoRoot = path.resolve(__dirname, '..', '..');
  const assetsPath = path.join(repoRoot, 'pipeline-assets');
  if (!fs.existsSync(assetsPath)) {
    throw new Error(`pipeline-assets not found at ${assetsPath}`);
  }
  return assetsPath;
}

module.exports = { getPipelineAssetsPath };
