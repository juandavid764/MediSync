// @ts-check
import { test, expect } from '@playwright/test';

test('Login erroneo', async ({ page }) => {
    await page.goto('http://localhost:5174/authPage');
    await page.fill('input[name="email"]', 'valentina@test.com');
    await page.fill('input[name="password"]', '123456');
    await page.click('text=Ingresar');
    await expect(page).toHaveURL(/.*dashboard/); // o donde redirija
  });
  