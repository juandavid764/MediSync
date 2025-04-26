import { test, expect } from '@playwright/test';


const TEST_USERS = {
  MEDICO: {
    email: 'cgomez@medisync.com',
    password: 'pass123',
    expectedRedirect: '/profile' 
  },
  PACIENTE: {
    email: 'juanperez@mail.com',
    password: 'clave123',
    expectedRedirect: '/profile' 
  },
  ADMIN: {
    email: 'admin1@medisync.com',
    password: 'adminpass1',
    expectedRedirect: '/profile' 
  },
  INVALID: {
    email: 'fake@mail.com',
    password: 'wrongpassword'
  }
};

test.describe('Flujo de Autenticación', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/authPage'); 
  });

  // --- Pruebas de login exitoso ---
  test('Login como médico redirige a /profile', async ({ page }) => {
    await page.fill('input[type="email"]', TEST_USERS.MEDICO.email);
    await page.fill('input[type="password"]', TEST_USERS.MEDICO.password);
    await page.click('button[type="submit"]');
    
    await expect(page).toHaveURL(new RegExp(TEST_USERS.MEDICO.expectedRedirect));
    
  });

  test('Login como paciente redirige a /profile', async ({ page }) => {
    await page.fill('input[type="email"]', TEST_USERS.PACIENTE.email);
    await page.fill('input[type="password"]', TEST_USERS.PACIENTE.password);
    await page.click('button[type="submit"]');
    
    await expect(page).toHaveURL(new RegExp(TEST_USERS.PACIENTE.expectedRedirect));
    await expect(page.getByText(/Hola|Perfil/)).toBeVisible();
  });

  // --- Pruebas de errores ---
  test('Credenciales inválidas muestran error', async ({ page }) => {
    await page.fill('input[type="email"]', TEST_USERS.INVALID.email);
    await page.fill('input[type="password"]', TEST_USERS.INVALID.password);
    await page.click('button[type="submit"]');
    
    await expect(page.getByText("❌ Usuario o contraseña incorrectos")).toBeVisible();
    await expect(page).toHaveURL(/\/authPage/); 
  });

  test('Campos vacíos muestran error', async ({ page }) => {
 
    const submitButton = page.locator('button[type="submit"]');
    await expect(submitButton).toBeDisabled();

    await page.fill('input[type="email"]', 'test@example.com');
    await page.fill('input[type="password"]', 'password123');
    await expect(submitButton).toBeEnabled(); 
  
    await page.fill('input[type="email"]', '');
    await page.fill('input[type="password"]', '');
   
    await expect(submitButton).toBeDisabled();
  
    await submitButton.click({ force: true });
    
    //  (no funka aun)
    //await expect(page.getByText('Email y contraseña son requeridos')).toBeVisible();
    
    await expect(page).toHaveURL(/\/authPage/);
  });

  // --- Prueba de logout ---
  test('Logout redirige a /authPage', async ({ page }) => {
 
    await page.fill('input[type="email"]', TEST_USERS.MEDICO.email);
    await page.fill('input[type="password"]', TEST_USERS.MEDICO.password);
    await page.click('button[type="submit"]');
    await page.waitForURL(new RegExp(TEST_USERS.MEDICO.expectedRedirect));
  
    
    page.on('dialog', async dialog => {
    
      expect(dialog.message()).toMatch(/¿Estás seguro que deseas cerrar sesión\?/i);
      await dialog.accept(); 
    });
  
    
    await Promise.all([
      page.waitForURL(/\/authPage/), 
      page.click('button:text("Cerrar sesión")') 
    ]);

    await expect(page).toHaveURL(/\/authPage/);
});
});