// Perform a basic Protractor test for any examples that don't have
// their own specific tests.

import * as fs from 'fs';
import * as globby from 'globby';
import * as path from 'path';
import { browser } from 'protractor';

import { checkConsole } from './e2e-kit';

const dirs = globby.sync([
  '{0,1,2,3,4,5,6,7,8,9}*',
  '!*SKIP*/**'
], { onlyDirectories: true, deep: 0 });

const dirsWithSpecs = globby.sync([
  '{0,1,2,3,4,5,6,7,8,9}*/*/**.e2e-spec.ts',
  '!*SKIP*/**'
], { deep: 3 })
  .map(filePath => filePath.split('/')[0]);

const dirsWithoutSpecs = dirs
  .filter(d => dirsWithSpecs.indexOf(d) < 0);

// This section is used only when Oasis Digital tests the curriculum
// using some machinery to perform AOT for each example. With an
// Angular CLI project, you can easily execute protractor tests on AOT
// output.
// Are any AOT index files present?
const aotPresent = !!dirs.find(dir => {
  const aotFileName = path.join(dir, 'aot-index.html');
  return fs.existsSync(aotFileName);
});

if (aotPresent) {
  describe('Examples without specific E2E tests (AOT)', async () => {
    for (let dir of dirsWithoutSpecs) {
      const aotFileName = path.join(dir, 'aot-index.html');
      it('should have no errors on ' + dir, async () => {
        await browser.waitForAngularEnabled(true);
        await browser.get('/' + aotFileName);
        await browser.sleep(200); // so a human can watch slightly
        expect(await checkConsole()).toEqual('');
      });
    }
  });
}

describe('Examples without specific E2E tests (JIT)', async () => {
  for (let dir of dirsWithoutSpecs) {
    it('should have no errors on ' + dir, async () => {
      await browser.waitForAngularEnabled(true);
      await browser.get('/' + dir);
      expect(await checkConsole()).toEqual('');
    });
  }
});
