const { Command } = require('commander');
const { setupCommand } = require('./commands/setup.js');
const { versionCommand } = require('./commands/version.js');

const program = new Command();

program
  .name('pipeline')
  .description('Set up a project planning pipeline in an Obsidian vault (Projects, Templates, .cursor, Dashboard)')
  .option('--no-color', 'Disable colored output')
  .hook('preAction', (thisCommand) => {
    const opts = thisCommand.opts();
    if (opts.color === false) {
      process.env.PIPELINE_NO_COLOR = '1';
    }
  });

program
  .command('setup')
  .description('Install the pipeline into a vault (merge-only by default; use --overwrite to replace existing files)')
  .argument('[vault-path]', 'Target vault directory (default: current directory)')
  .option('-p, --project <name>', 'Project name: create Projects/<name>/ with stage folders (run again with different names for multiple projects)')
  .option('-f, --overwrite', 'Overwrite existing files')
  .option('--no-color', 'Disable colored output')
  .action(setupCommand);

program
  .command('version')
  .description('Print CLI version')
  .action(versionCommand);

program.parse();

// If no command (e.g. just "pipeline" or "pipeline --help"), Commander shows help automatically.
if (!process.argv.slice(2).length) {
  program.outputHelp();
}
