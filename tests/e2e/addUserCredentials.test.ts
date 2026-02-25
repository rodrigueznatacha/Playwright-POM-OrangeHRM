import { test } from '@TestBase';

test.describe('Agregar Credenciales de Usuario @regression', () => {

	test.beforeEach(async ({ loginPage }) => {
		await loginPage.loginSuccess();
	});

	test('TC-ADD-001 - Given a user is logged in, when they navigate to the user management page and add new credentials, then the new credentials should be saved successfully', async () => {
	console.log('Test de agregar credenciales de usuario - Pendiente de implementación');
	// Aquí iría la implementación del test utilizando los métodos de las páginas correspondientes
	});
});
