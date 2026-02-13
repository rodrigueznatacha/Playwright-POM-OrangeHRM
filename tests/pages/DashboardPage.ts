import { type Locator, type Page } from '@playwright/test';

export class DashboardPage {
  readonly page: Page;
  readonly sideMenuItems: Locator;

  constructor(page: Page) {
    this.page = page;
    // Localizamos todos los elementos del menú lateral por su rol
    this.sideMenuItems = page.getByRole('listitem');
  }

  /**
   * Navega a un módulo específico del menú lateral
   * @param moduleName Nombre del módulo (ej: 'PIM', 'Admin', 'Leave')
   */
  async navigateToModule(moduleName: string) {
    await this.page.getByRole('link', { name: moduleName }).click();
  }
}