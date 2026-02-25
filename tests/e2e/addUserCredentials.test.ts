import { test } from '@TestBase';
import { faker } from '@faker-js/faker';

test.describe('ADMIN - Agregar Credenciales de Usuario al empleado @regression', () => {

	test.beforeEach(async ({ loginPage, addUserPage }) => {
		await loginPage.loginSuccess();
		await addUserPage.gotoAdminTab();

	});

	test('TC-ADMIN-001 - Given a user is logged in, when they navigate to the user management page and add new credentials, then the new credentials should be saved successfully', async ({ page, expect, addUserPage }) => {
		await addUserPage.gotoSaveSystemUser();
		const expectedUsername = faker.internet.username()  // Generate unique username
		await addUserPage.fillAddUserFields	({
			userRole: 'Admin',
			employeeName: 'Peter',
			status: 'Enabled',
			username: expectedUsername,
			password: 'Peterpassword123',
			confirmPassword: 'Peterpassword123'
		});

		await expect(page).toHaveURL(/.*viewSystemUsers/); // Verify redirection to user list page after saving (Regex)
		
		const table = page.getByRole('table');
    	await expect(table).toBeVisible({ timeout: 15000 });

		const createdUserInTable = table.getByText(expectedUsername);
		await expect(createdUserInTable).toBeVisible();
	});
});
