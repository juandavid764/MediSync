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

test('Logout del médico redirige a /authPage', async ({ page }) => {
  await page.goto('http://localhost:5173/authPage');

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

//logout paciente 
test('Logout del paciente redirige a /authPage', async ({ page }) => {
  await page.goto('http://localhost:5173/authPage');

  await page.fill('input[type="email"]', TEST_USERS.PACIENTE.email);
  await page.fill('input[type="password"]', TEST_USERS.PACIENTE.password);
  await page.click('button[type="submit"]');

  await page.waitForURL(new RegExp(TEST_USERS.PACIENTE.expectedRedirect));

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
