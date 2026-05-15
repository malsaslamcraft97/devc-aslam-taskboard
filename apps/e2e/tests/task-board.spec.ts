import { test, expect } from '@playwright/test';

test('renders the task board heading', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: /my task board/i })).toBeVisible();
});
