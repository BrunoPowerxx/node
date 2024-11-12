import { test } from '@playwright/test';
import { ai } from '@zerostep/playwright';
import fs from 'fs';
import headless from 'headless';


test.describe('zerostep example', () => {

  test('captures screenshot after navigating to page', async ({ page }) => {
    const aiArgs = { page, test };
    await page.goto('https://whatsmyuseragent.com/');
    await page.waitForLoadState('networkidle');

    const screenshotDir = '/app/results';
    if (!fs.existsSync(screenshotDir)) {
      fs.mkdirSync(screenshotDir, { recursive: true });
    }

    await page.screenshot({ path: `${screenshotDir}/search_results.png`, fullPage: true });
    console.log("Screenshot taken and saved to /app/results");
  });
});
