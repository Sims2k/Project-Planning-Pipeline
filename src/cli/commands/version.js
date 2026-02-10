const path = require('path');
const fs = require('fs');

function getVersion() {
  const pkgPath = path.resolve(__dirname, '..', '..', '..', 'package.json');
  const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
  return pkg.version || '0.0.0';
}

function versionCommand() {
  console.log(getVersion());
  process.exit(0);
}

module.exports = { versionCommand, getVersion };
