// @ts-check
import { test, expect } from '@playwright/test';

test('Ingreso exitoso al perfil de administrador', async ({ page }) => {
  // 1. Ir a la página de autenticación
  await page.goto('http://localhost:5173/authPage');

  // 2. Llenar los campos de email y contraseña del admin
  const inputs = await page.locator('input');
  await inputs.nth(0).fill('admin1@medisync.com');
  await inputs.nth(1).fill('adminpass1'); 

  // 3. Hacer clic en el botón "Ingresar"
  await page.getByRole('button', { name: /ingresar/i }).click();

  // 4. Esperar a que la URL cambie a /profile
  await page.waitForURL('**/profile');
  await expect(page).toHaveURL(/\/profile$/);

  // 5. Verificar que se muestra el perfil de administrador
  await expect(page.getByText(/Perfil de Administrador/i)).toBeVisible();
  await expect(page.getByText(/admin1@medisync.com/i)).toBeVisible();
});
