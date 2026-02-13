import { type Locator, type Page } from '@playwright/test';

export class PIMPage {
  readonly page: Page;
  readonly addButton: Locator;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly saveButton: Locator;
  readonly fileInput: Locator;
  readonly statusDropdown: Locator;
  readonly searchButton: Locator;
  readonly tableRows: Locator;
  readonly selectAllCheckbox: Locator;
  readonly deleteSelectedButton: Locator;
  readonly confirmDeleteButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.addButton = page.getByRole('button', { name: 'Add' });
    this.firstNameInput = page.getByPlaceholder('First Name');
    this.lastNameInput = page.getByPlaceholder('Last Name');
    this.saveButton = page.getByRole('button', { name: 'Save' });
    this.fileInput = page.locator('input[type="file"]');
    

    this.statusDropdown = page.locator('.oxd-select-wrapper').nth(0);
    this.searchButton = page.getByRole('button', { name: 'Search' });
    this.tableRows = page.locator('.oxd-table-card');
    this.selectAllCheckbox = page.locator('.oxd-table-header').getByRole('checkbox');
    this.deleteSelectedButton = page.getByRole('button', { name: 'Delete Selected' });
    this.confirmDeleteButton = page.getByRole('button', { name: 'Yes, Delete' });
  }

  async addEmployeeWithPhoto(firstName: string, lastName: string, filePath: string) {
    await this.addButton.click();
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.fileInput.setInputFiles(filePath); 
    await this.saveButton.click();
  }
}