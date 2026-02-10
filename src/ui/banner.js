const { info } = require('./colors.js');

const title = 'Project Planning Pipeline';
const subtitle = 'Setting up your vault: Projects · Templates · .cursor · Dashboard';

function renderBanner() {
  const text = `${title}\n${subtitle}`;
  const lines = text.split('\n');
  const width = Math.max(...lines.map((l) => l.length), 50);
  const padding = 1;
  const top = '╭' + '─'.repeat(width + padding * 2) + '╮';
  const bottom = '╰' + '─'.repeat(width + padding * 2) + '╯';
  const pad = ' '.repeat(padding);
  const body = lines
    .map((line) => '│' + pad + line.padEnd(width) + pad + '│')
    .join('\n');
  const margin = '\n';
  return margin + info(top) + '\n' + info(body) + '\n' + info(bottom) + margin;
}

function showBanner() {
  console.log(renderBanner());
}

module.exports = { renderBanner, showBanner };
