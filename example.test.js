import { test } from '@playwright/test';
import { ai } from '@zerostep/playwright';
import fs from 'fs';

test('zerostep example', async ({ page }) => {
  await page.goto('https://supabets.com/');

  // Create the arguments object required by ai()
  const aiArgs = { page, test };

  // Get the header text from the site
  const headerText = await ai('Get the header text', aiArgs);

  // Go to Google and perform a search with the header text
  await page.goto('https://google.com/');
  await ai(`Type "${headerText}" in the search box`, aiArgs);
  await ai('Press enter', aiArgs);

  // Wait for the search results page to load
  await page.waitForLoadState('networkidle');

  // Create a directory to save the screenshot if it doesn't exist
  const screenshotDir = '/app/results';
  if (!fs.existsSync(screenshotDir)) {
    fs.mkdirSync(screenshotDir, { recursive: true });
  }

  // Capture a full-page screenshot of the results
  await page.screenshot({ path: `${screenshotDir}/search_results.png`, fullPage: true });
});
 
