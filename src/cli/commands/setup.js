const { resolveVaultPath } = require('../../resolve-path.js');
const { copyPipeline } = require('../../install/copy-pipeline.js');
const { showBanner } = require('../../ui/banner.js');
const { success, error: errStyle } = require('../../ui/colors.js');

const EXIT_SUCCESS = 0;
const EXIT_ERROR = 1;
const EXIT_INVALID_PATH = 2;

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

  showBanner();

  let result;
  try {
    result = copyPipeline(vaultPath, opts.overwrite === true);
  } catch (e) {
    console.error(errStyle(e.message));
    process.exit(EXIT_ERROR);
  }

  console.log(success(`Done. Copied: ${result.copied}, Skipped: ${result.skipped}, Overwritten: ${result.overwritten}`));
  process.exit(EXIT_SUCCESS);
}

module.exports = { setupCommand };
