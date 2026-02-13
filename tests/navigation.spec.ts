import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/LoginPage';
import { DashboardPage } from './pages/DashboardPage';
import { authData } from './data/auth.data';

test.describe('Navegación del sistema @regression', () => {
  
  test('TC-NAV-001: Given a logged-in user, when they navigate to Performance, then the correct module should load', async ({ page }) => {
    // 1. Inicialización de las páginas
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);

    // 2. Precondición: El usuario debe estar logueado 
    await loginPage.goto();
    await loginPage.login(authData.validUser.username, authData.validUser.password);

    // 3. Acción: Navegar usando el método dinámico 
    await dashboardPage.navigateToModule('Performance');

    // 4. Validaciones (Assertions) 
    // Validación técnica: URL específica
    await expect(page).toHaveURL(/.*performance\/searchEvaluatePerformanceReview/);
    
    // Validación visual: El encabezado correcto
    const header = page.getByRole('heading', { name: 'Performance' });
    await expect(header).toBeVisible();
  });

  

});