// @ts-check
import { test, expect } from '@playwright/test';

test('Acceso restringido a /profile sin autenticación redirige a /authPage', async ({ page }) => {
  // 1. Intentar acceder directamente a la ruta protegida
  await page.goto('http://localhost:5173/profile');

  // 2. Verificar que el usuario es redirigido a la página de autenticación
  await expect(page).toHaveURL(/\/authPage$/);

  // 3. Verificar que se muestra el formulario de login
  await expect(page.getByRole('heading', { name: /iniciar sesión/i })).toBeVisible();
});
