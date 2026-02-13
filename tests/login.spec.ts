import { test, expect } from '@playwright/test';
import { LoginPage } from '@pages/LoginPage'; 
import { authData } from '@data/auth.data';

test.describe('Módulo de Autenticación @regression', () => {
  
  test('TC-LOG-001 - Given a user is on the login page, when they enter valid credentials, then they should be redirected to the dashboard', async ({ page }) => {
    // ✅ CORRECCIÓN 2: Nombre de variable estándar 'loginPage'
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    // Asegúrate de que authData tenga los datos correctos
    await loginPage.login(authData.validUser.username, authData.validUser.password);

    // Validación de URL
    await expect(page).toHaveURL(/.*dashboard/);
    // Validación Visual (Heading)
    await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
  });

  test('TC-LOG-002 - Given a user is on the login page, when they enter invalid credentials, then an error message should be displayed', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login(authData.invalidUser.username, authData.invalidUser.password);

    // Validación del mensaje de error
    const errorMessage = page.getByText('Invalid credentials');
    await expect(errorMessage).toBeVisible();
  });

});
