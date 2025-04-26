import { test, expect } from '@playwright/test';

test.describe('Página de Inicio - HomePage', () => {
  test.beforeEach(async ({ page }) => {

    await page.goto('http://localhost:5173/');
  });

  test('Debe mostrar la estructura básica correctamente', async ({ page }) => {

    await expect(page.getByRole('heading', { 
      name: 'Bienvenido a MediSync', 
      level: 1 
    })).toBeVisible();


    const descriptionText = 'Tu plataforma confiable para la gestión de información médica. Por favor, inicia sesión o regístrate para acceder a todas nuestras funcionalidades.';
    await expect(page.getByText(descriptionText)).toBeVisible();


    const authButton = page.getByRole('button', { 
      name: 'Iniciar Sesión / Registrarse' 
    });
    await expect(authButton).toBeVisible();
  });

  test('El botón debe redirigir a /authPage', async ({ page }) => {
 
    await Promise.all([
      page.waitForURL('**/authPage'),
      page.click('button:has-text("Iniciar Sesión / Registrarse")')
    ]);
  });

  test('Debe ser responsive', async ({ page }) => {

    await page.setViewportSize({ width: 375, height: 667 });
    
    await expect(page.getByRole('heading')).toBeVisible();
    await expect(page.getByRole('button')).toBeVisible();
    
   
    const description = page.locator('p');
    const { width } = await description.boundingBox();
    expect(width).toBeLessThanOrEqual(375);
  });
});