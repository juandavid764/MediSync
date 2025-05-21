// @ts-check
import { test, expect } from '@playwright/test';

test('Cambiar entre formulario de registro e iniciar sesión', async ({ page }) => {
  // 1. Ir a la página de autenticación
  await page.goto('http://localhost:5173/authPage');

  // 2. Hacer clic en el botón para ir a registro
  await page.getByRole('button', { name: /Regístrate/i }).click();

  // 3. Verificar que el formulario de registro es visible
  await expect(page.getByRole('heading', { name: /registro/i })).toBeVisible();
  await expect(page.getByLabel('Nombre')).toBeVisible();

  // 4. Hacer clic en el botón para volver a iniciar sesión
  await page.getByRole('button', { name: /Inicia sesión/i }).click();

  // 5. Verificar que el formulario de login es visible
  await expect(page.getByRole('heading', { name: /iniciar sesión/i })).toBeVisible();
  await expect(page.getByLabel('Email')).toBeVisible();
});
