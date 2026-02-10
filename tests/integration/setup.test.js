const { describe, it, beforeEach, afterEach } = require('node:test');
const assert = require('node:assert');
const { mkdtempSync, rmSync, existsSync, statSync } = require('fs');
const { tmpdir } = require('os');
const path = require('path');
const { execSync } = require('child_process');

const repoRoot = path.resolve(__dirname, '..', '..');
const pipelineBin = path.join(repoRoot, 'bin', 'pipeline.js');

function runSetup(vaultPath, extraArgs = []) {
  const args = ['node', pipelineBin, 'setup', vaultPath, ...extraArgs];
  return execSync(args.join(' '), { encoding: 'utf8', cwd: repoRoot });
}

describe('setup command', () => {
  let tmpDir;

  beforeEach(() => {
    tmpDir = mkdtempSync(path.join(tmpdir(), 'pipeline-setup-'));
  });

  afterEach(() => {
    try {
      rmSync(tmpDir, { recursive: true });
    } catch (_) {}
  });

  it('creates Projects/, Templates/, .cursor/, Dashboard.md in vault', () => {
    runSetup(tmpDir);
    assert.ok(existsSync(path.join(tmpDir, 'Projects')));
    assert.ok(existsSync(path.join(tmpDir, 'Templates')));
    assert.ok(existsSync(path.join(tmpDir, '.cursor')));
    assert.ok(existsSync(path.join(tmpDir, 'Dashboard.md')));
  });

  it('merge-only: second run does not overwrite (skipped count > 0)', () => {
    runSetup(tmpDir);
    const dashboardStat = statSync(path.join(tmpDir, 'Dashboard.md'));
    const out = runSetup(tmpDir);
    assert.ok(/Skipped: [1-9]/.test(out));
    const dashboardStatAfter = statSync(path.join(tmpDir, 'Dashboard.md'));
    assert.strictEqual(dashboardStatAfter.mtimeMs, dashboardStat.mtimeMs);
  });

  it('invalid path exits non-zero', () => {
    const badPath = path.join(tmpDir, 'does-not-exist');
    try {
      runSetup(badPath);
      assert.fail('Expected setup to throw for invalid path');
    } catch (e) {
      assert.ok(e.status !== 0);
    }
  });
});
