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
test('Renderizado del perfil del paciente', async ({ page }) => {
  await page.goto('http://localhost:5173/authPage');

  await page.fill('input[type="email"]', TEST_USERS.PACIENTE.email);
  await page.fill('input[type="password"]', TEST_USERS.PACIENTE.password);
  await page.click('button[type="submit"]');

  await expect(page).toHaveURL(new RegExp(TEST_USERS.PACIENTE.expectedRedirect));
  await expect(page.getByText(/Perfil de Paciente/)).toBeVisible(); // Ajusta el texto según tu interfaz
});
