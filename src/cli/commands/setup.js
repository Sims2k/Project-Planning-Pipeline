const path = require('path');
const { resolveVaultPath } = require('../../resolve-path.js');
const { copyPipeline } = require('../../install/copy-pipeline.js');
const { showBanner } = require('../../ui/banner.js');
const { success, error: errStyle } = require('../../ui/colors.js');

const EXIT_SUCCESS = 0;
const EXIT_ERROR = 1;
const EXIT_INVALID_PATH = 2;

/** Reject names that could be path traversal or invalid. */
function validateProjectName(name) {
  if (!name || typeof name !== 'string') return null;
  const trimmed = name.trim();
  if (!trimmed) return null;
  if (trimmed.includes('..') || trimmed.includes('/') || trimmed.includes('\\')) return null;
  if (path.isAbsolute(trimmed)) return null;
  return trimmed;
}

function setupCommand(vaultPathArg, opts) {
  if (opts.color === false) {
    process.env.PIPELINE_NO_COLOR = '1';
  }

  let vaultPath;
  try {
    vaultPath = resolveVaultPath(vaultPathArg);
  } catch (e) {
    console.error(errStyle(e.message));
    process.exit(EXIT_INVALID_PATH);
  }

  const projectName = opts.project ? validateProjectName(opts.project) : undefined;
  if (opts.project != null && opts.project !== '' && !projectName) {
    console.error(errStyle('Invalid project name: use a single folder name (no path separators or "..").'));
    process.exit(EXIT_INVALID_PATH);
  }

  showBanner();

  let result;
  try {
    result = copyPipeline(vaultPath, opts.overwrite === true, projectName);
  } catch (e) {
    console.error(errStyle(e.message));
    process.exit(EXIT_ERROR);
  }

  const msg = projectName
    ? `Done. Copied: ${result.copied}, Skipped: ${result.skipped}, Overwritten: ${result.overwritten} (project: Projects/${projectName}/)`
    : `Done. Copied: ${result.copied}, Skipped: ${result.skipped}, Overwritten: ${result.overwritten}`;
  console.log(success(msg));
  process.exit(EXIT_SUCCESS);
}

module.exports = { setupCommand };
