const chalk = require('chalk');

const noColor = process.env.PIPELINE_NO_COLOR === '1';

function success(msg) {
  return noColor ? msg : chalk.green(msg);
}
function warning(msg) {
  return noColor ? msg : chalk.yellow(msg);
}
function error(msg) {
  return noColor ? msg : chalk.red(msg);
}
function info(msg) {
  return noColor ? msg : chalk.blue(msg);
}

module.exports = { success, warning, error, info };
