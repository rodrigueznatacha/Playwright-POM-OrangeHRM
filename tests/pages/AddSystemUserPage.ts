import type { Locator, Page } from '@playwright/test';
import { SuperPage } from './SuperPage';

export class AddSystemUserPage extends SuperPage {

	adminTab: Locator;
	addButton: Locator;
	userRoleOptionDropdown: Locator;
	employeeNameInputDropdown: Locator;
	statusOptionDropdown: Locator;
	userNameInput: Locator;
	passwordInput: Locator;
	confirmPasswordInput: Locator;
	saveButton: Locator;

	constructor(page: Page) {
		super(page);	
		this.adminTab = this.page.locator('.oxd-main-menu-item').getByText('Admin', { exact: true });
		this.addButton = this.page.locator('button', { hasText: 'Add' });
		
		 this.userRoleOptionDropdown= this.page.locator('.oxd-grid-item').filter({ hasText: 'User Role' });
		 this.employeeNameInputDropdown= this.page.locator('.oxd-grid-item').filter({ hasText: 'Employee Name' });
		 this.statusOptionDropdown= this.page.locator('.oxd-grid-item').filter({ hasText: 'Status' });
		 this.userNameInput= this.page.locator('.oxd-grid-item').filter({ hasText: 'Username' });
		 this.passwordInput= this.page.locator('.oxd-grid-item').filter({ has: this.page.getByText('Password', { exact: true }) });
		 this.confirmPasswordInput= this.page.locator('.oxd-grid-item').filter({ hasText: 'Confirm Password' });
		 this.saveButton= this.page.locator('button[type=submit]', { hasText: 'Save' });
	}

	async fillAddUserFields(arg?: {
		userRole?: 'Admin' | 'ESS';
		employeeName?: string;
		status?: 'Enabled' | 'Disabled';
		username?: string;
		password?: string;
		confirmPassword?: string;
	},) {

		 if(arg){
			arg.userRole && await this.selectDropdownOption(this.userRoleOptionDropdown, arg.userRole);
			arg.employeeName && await this.selectDropdownInput(this.employeeNameInputDropdown, arg.employeeName);
			arg.status && await this.selectDropdownOption(this.statusOptionDropdown, arg.status);
			arg.username && await this.input(this.userNameInput).fill(arg.username);
			arg.password && await this.input(this.passwordInput).fill(arg.password);
			arg.confirmPassword && await this.input(this.confirmPasswordInput).fill(arg.confirmPassword);	
		 }
		await this.saveButton.click();
		return arg;

	}

	async gotoAdminTab(){
		await this.adminTab.click();
		await this.expect(this.page).toHaveURL('index.php/admin/viewSystemUsers');

	}

	async gotoSaveSystemUser(){
		await this.addButton.click();
		await this.expect(this.page).toHaveURL('index.php/admin/saveSystemUser');
	}
}

//import { SuperPage } from './SuperPage';
//import { Page, Locator } from '@playwright/test';

//export class AddSystemUserPage extends SuperPage {
    
    // Todo encapsulado, limpio y en una sola línea
//    private readonly adminTab = this.page.locator('.oxd-main-menu-item').getByText('Admin', { exact: true });
//    private readonly addButton = this.page.locator('button', { hasText: 'Add' });
//    private readonly userRoleOptionDropdown = this.page.locator('.oxd-grid-item').filter({ hasText: 'User Role' });
//    private readonly employeeNameInputDropdown = this.page.locator('.oxd-grid-item').filter({ hasText: 'Employee Name' });
//    private readonly statusOptionDropdown = this.page.locator('.oxd-grid-item').filter({ hasText: 'Status' });
//    private readonly userNameInput = this.page.locator('.oxd-grid-item').filter({ hasText: 'Username' });
//    private readonly passwordInput = this.page.locator('.oxd-grid-item').filter({ has: this.page.getByText('Password', { exact: true }) });
//    private readonly confirmPasswordInput = this.page.locator('.oxd-grid-item').filter({ hasText: 'Confirm Password' });
//    private readonly saveButton = this.page.locator('button[type=submit]', { hasText: 'Save' });

    // ¡Adiós al constructor verboso! Todo el trabajo pesado lo hace SuperPage.
//}