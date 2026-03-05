import { test } from '@TestBase';
import { faker } from '@faker-js/faker';

test.describe('ADMIN - Agregar Credenciales de Usuario al empleado @regression', () => {

	test.beforeEach(async ({ loginPage, addUserPage }) => {
		await loginPage.loginSuccess();
		await addUserPage.gotoAdminTab();

	});

	test('TC-ADMIN-001 - Given a user is logged in, when they navigate to the user management page and add new credentials, then the new credentials should be saved successfully', async ({ page, expect, addUserPage }) => {
		
		const expectedUsername = faker.string.alphanumeric(8);  // Generate unique username

		//1. PRECONDITION: Verify the user to be created does not exist in the system
		await test.step('Verify user is not in the system', 
		
		async () => {
			await page.locator('.oxd-input-group').filter({ hasText: 'Username' }).locator('input').fill(expectedUsername);
        	await page.getByRole('button', { name: 'Search' }).click();
            
            // Validamos explícitamente que la tabla responda "No Records Found"
			await expect(page.locator('span').filter({ hasText: 'No Records Found' })).toBeVisible({ timeout: 10000 });
        });
		
		//2. ACTION: Navigate to the add user page and fill in the form with new credentials
		await addUserPage.gotoSaveSystemUser();
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

		// 🧹 4. POSTCONDICIÓN: Eliminar el usuario creado
        await test.step('Postcondición: Eliminar el usuario generado por Faker', async () => {
            // 1. Volvemos a buscar el usuario por si acaso (buenas prácticas para asegurar el estado)
            await page.locator('.oxd-input-group').filter({ hasText: 'Username' }).locator('input').fill(expectedUsername);
            await page.getByRole('button', { name: 'Search' }).click();

            // 2. Localizamos la fila exacta que contiene a nuestro usuario
            const userRow = page.locator('.oxd-table-card').filter({ hasText: expectedUsername });
            await expect(userRow).toBeVisible({ timeout: 10000 });

            // 3. Hacemos clic en el icono del basurero (trash) dentro de ESA fila
            await userRow.locator('.bi-trash').click();

            // 4. Confirmamos la eliminación en el Pop-up/Modal
            await page.getByRole('button', { name: 'Yes, Delete' }).click();

            // 5. Validación final: Aseguramos que el sistema vuelve a estar limpio
            // Usamos la aserción estricta que arreglamos antes
            await expect(page.locator('span').filter({ hasText: 'No Records Found' })).toBeVisible({ timeout: 10000 });
        });
	});
});
