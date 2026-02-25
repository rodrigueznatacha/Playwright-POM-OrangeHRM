import { test as driver } from '@playwright/test';
import { LoginPage } from '@pages/LoginPage';
//import { DashboardPage } from './DashboardPage';

const test = driver.extend<{ 
	loginPage: LoginPage;
	//dashboard: DashboardPage;
}>({
	loginPage: async ({ page }, use) => {
		await use (new LoginPage(page));
	},

	//dashboard: async ({ page }, use) => {
	//	await use ( new DashboardPage(page));
	//}
});

export { test };