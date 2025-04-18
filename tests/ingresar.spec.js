// @ts-check
import { test, expect } from '@playwright/test';


// Historia de usuario 1: 
// Como usuario registrado, quiero ingresar a mi cuenta con mi correo electrónico y contraseña, para acceder a mi perfil personal.

test('Login erróneo muestra mensaje de error', async ({ page }) => {
  await page.goto('http://localhost:5174/authPage');

  // Llena los inputs. No tienen `name`, así que usamos roles o selectores más específicos
  const inputs = await page.locator('input');
  await inputs.nth(0).fill('valentina@test.com');
  await inputs.nth(1).fill('123456');

  // Hacer click en el botón "Ingresar"
  await page.getByRole('button', { name: /ingresar/i }).click();

  // Esperar que aparezca el mensaje de error
  await expect(page.getByText(/usuario o contraseña incorrectos/i)).toBeVisible();

  // Confirmar que no redirige a /profile
  await expect(page).not.toHaveURL(/profile/);

  
});
// Historia de usuario 2: 
// Como usuario registrado, quiero que el sistema me informe si mi correo electrónico o contraseña son incorrectos,
// para corregir mis credenciales y poder acceder a mi cuenta.

test('Login exitoso redirige al perfil y muestra mensaje de bienvenida', async ({ page }) => {
  // Navegar a la página de autenticación
  await page.goto('http://localhost:5174/authPage');

  // Llenar los campos de email y contraseña
  const inputs = await page.locator('input');
  await inputs.nth(0).fill('cgomez@medisync.com');
  await inputs.nth(1).fill('pass123');

  // Hacer clic en el botón "Ingresar"
  await page.getByRole('button', { name: /ingresar/i }).click();

  // Esperar a que la URL cambie a /profile
  await page.waitForURL('**/profile');

  // Verificar que la URL actual sea la esperada
  await expect(page).toHaveURL(/\/profile$/);
});

