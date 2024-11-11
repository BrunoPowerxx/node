import { test } from '@playwright/test';
import { ai } from '@zerostep/playwright';
import fs from 'fs';
import headless from 'headless';

let xvfbStarted = false;

async function startXvfb() {
  return new Promise((resolve, reject) => {
    headless((err, childProcess, servernum) => {
      if (err) {
        console.error('Error starting Xvfb:', err);
        reject(err);
      } else {
        console.log('Xvfb running on server number', servernum);
        xvfbStarted = true;
        resolve();
      }
    });
  });
}

test.describe('zerostep example', () => {
  test.beforeAll(async () => {
    if (!xvfbStarted) {
      await startXvfb();
    }
  });

  test('captures screenshot after navigating to page', async ({ page }) => {
    const aiArgs = { page, test };
    await page.goto('https://new.hollywoodbets.net/');
    await page.waitForLoadState('networkidle');

    const screenshotDir = '/app/results';
    if (!fs.existsSync(screenshotDir)) {
      fs.mkdirSync(screenshotDir, { recursive: true });
    }

    await page.screenshot({ path: `${screenshotDir}/search_results.png`, fullPage: true });
    console.log("Screenshot taken and saved to /app/results");
  });
});
