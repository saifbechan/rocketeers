import { expect, test } from '@playwright/test';

test.describe('Home Page', () => {
  test('should load the home page with simulation and contact section', async ({
    page,
  }) => {
    // Navigate to the home page
    await page.goto('/');

    // Check if the canvas is present
    // The canvas is created by p5.js and assigned the custom role "rocketeers"
    const canvas = page.locator('canvas[role="rocketeers"]');
    await expect(canvas).toBeAttached({ timeout: 15000 });
    await expect(canvas).toBeVisible();

    // Check if the contact section is present
    const contact = page.locator('[aria-label="Contact information"]');
    await expect(contact).toBeVisible();
  });
});
