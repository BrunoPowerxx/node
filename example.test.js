import { test } from '@playwright/test';
import { ai } from '@zerostep/playwright';
import fs from 'fs';

test('zerostep example', async ({ page }) => {
  // await page.goto('https://supabets.com/');
  const aiArgs = { page, test };
  // const headerText = await ai('Get the header text', aiArgs);
  await page.goto('https://new.hollywoodbets.net/');
  // await ai(`Type "${headerText}" in the search box`, aiArgs);
  // await ai('Press enter', aiArgs);
  await page.waitForLoadState('networkidle');
  const screenshotDir = '/app/results';
  if (!fs.existsSync(screenshotDir)) {
    fs.mkdirSync(screenshotDir, { recursive: true });
  }
  await page.screenshot({ path: `${screenshotDir}/search_results.png`, fullPage: true });
});
 
