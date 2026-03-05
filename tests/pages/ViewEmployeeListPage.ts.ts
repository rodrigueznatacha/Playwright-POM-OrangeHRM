import type { Locator, Page } from '@playwright/test';
import { SuperPage } from './SuperPage';

export class PIMPage extends SuperPage {
	employeeNameInputDropdown: Locator;
	noRecordsMessage: Locator;
    searchButton: Locator;

	constructor(page: Page) {
		super(page);

		this.employeeNameInputDropdown= this.page.locator('.oxd-grid-item').filter({ hasText: 'Employee Name' });
		this.noRecordsMessage = this.page.getByText('No Records Found');
        this.searchButton = this.page.getByRole('button', { name: 'Search' });
	}

	async checkEmployeeNotFound(employeeName: string) {

		await this.selectDropdownInput(this.employeeNameInputDropdown, employeeName);
        await this.searchButton.click();
		await this.expect(this.page.locator('.oxd-table-loader')).not.toBeVisible();
		return await this.noRecordsMessage.isVisible();
	}

	async gotoPIMTab(){
		await this.page.locator('.oxd-main-menu-item').getByText('PIM', { exact: true }).click();
		await this.expect(this.page).toHaveURL('index.php/pim/viewEmployeeList');
	}

	async gotoSaveEmployee(){
		await this.page.locator('button', { hasText: 'Add' }).click();
		await this.expect(this.page).toHaveURL('index.php/pim/addEmployee');

	}

	
}	



// https://opensource-demo.orangehrmlive.com/web/index.php/pim/viewEmployeeList