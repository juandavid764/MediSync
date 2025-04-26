import { test, expect } from '@playwright/test';

// Historia de usuario: 
//"Como usuario no registrado, quiero acceder a un formulario para registrarme, de modo que pueda crear una cuenta en la plataforma."
// Se valida que l hacer click en "Registrarse", Se muestre el formulario de registro, y estén presentes todos los inputs necesarios.
test('Mostrar formulario de registro y validar inputs por name', async ({ page }) => {
  // 1. Ir a la página de login
  await page.goto('http://localhost:5173/authPage');

  // 2. Hacer click en el botón de registro
  await page.locator('#registro').click();

  // 3. Validar los inputs por su name
  await expect(page.locator('input[name="nombre"]')).toBeVisible();
  await expect(page.locator('input[name="direccion"]')).toBeVisible();
  await expect(page.locator('input[name="telefono"]')).toBeVisible();
  await expect(page.locator('input[name="fecha_nac"]')).toBeVisible();
  await expect(page.locator('input[name="email"]')).toBeVisible();
  await expect(page.locator('input[name="contrasena"]')).toBeVisible();
  await expect(page.locator('input[name="cuidad"]')).toBeVisible(); // *ojo* ciudad tiene un typo
  await expect(page.locator('input[name="tipo_doc"]')).toBeVisible();
  await expect(page.locator('input[name="num_doc"]')).toBeVisible();
  await expect(page.locator('input[name="usuario"]')).toBeVisible();
});
