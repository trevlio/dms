import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('localhost:3000');
  const locator = page.locator('h1');
  await expect(locator).toContainText('Hello World');
});
