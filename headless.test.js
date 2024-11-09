import { test } from '@playwright/test';
import { ai } from '@zerostep/playwright';
import fs from 'fs';
import headless from 'headless';

headless((err, childProcess, servernum) => {
  if (err) {
    console.error('Error starting Xvfb:', err);
    return;
  }

  console.log('Xvfb running on server number', servernum);

  test('zerostep example', async ({ page }) => {
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
