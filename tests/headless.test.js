import { test } from '@playwright/test';
import { ai } from '@zerostep/playwright';
import fs from 'fs';
import headless from 'headless';


test.describe('zerostep example', () => {

  test('captures screenshot after navigating to page', async ({ page }) => {
    const aiArgs = { page, test };
    await page.goto('https://new.hollywoodbets.net/');
    await page.waitForLoadState('networkidle');
    
    const htmlContent = await page.content();
    const outputDir = '/app/results';
    
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    };
    fs.writeFileSync(`${outputDir}/page_content.html`, htmlContent, 'utf-8');
    console.log("HTML content saved to /app/results/page_content.html");
    
    await page.screenshot({ path: `${outputDir}/search_results1.png`, fullPage: true });
    console.log("Screenshot taken and saved to /app/results/search_results1.png");
                    
    await ai('Click on the checkbox (Verify you are human)', aiArgs).catch( e => {
      console.log("Failed to click checkbox", e.message);
    });
    await page.waitForTimeout(5000);
    await page.waitForLoadState('networkidle');
    // const screenshotDir = '/app/results';
    // if (!fs.existsSync(screenshotDir)) {
    //  fs.mkdirSync(screenshotDir, { recursive: true });
    // }

    await page.screenshot({ path: `${outputDir}/search_results2.png`, fullPage: true });
    console.log("Screenshot taken and saved to /app/results/search_results2.png");
  });
});
