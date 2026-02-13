import type { Locator, Page } from '@playwright/test';
import { SuperPage } from './SuperPage';

export class LoginPage extends SuperPage {
	usernameInput: Locator;
	passwordInput: Locator;
	submitButton: Locator;
	
	constructor(page: Page) {
		super(page);
		this.usernameInput = this.page.locator('input[name="username"]');
		this.passwordInput = this.page.locator('input[name="password"]');
		this.submitButton = this.page.locator('button[type="submit"]');	
	}

	async login(username?: string, password ?: string) {
		username &&  await this.usernameInput.fill(username);
		password && await this.passwordInput.fill(password);
		await this.submitButton.click();
		await this.page.waitForLoadState('domcontentloaded');
	}
}
/* import {  } from "module";mport { type Locator, type Page } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;

  constructor(page: Page) {
    this.page = page;
    // Localizadores usando placeholders y roles 
    this.usernameInput = page.getByPlaceholder('Username');
    this.passwordInput = page.getByPlaceholder('Password');
    this.loginButton = page.getByRole('button', { name: 'Login' });
  }

  async goto() {
    await this.page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
  }

  async login(user: string, pass: string) {
    await this.usernameInput.fill(user);
    await this.passwordInput.fill(pass);
    await this.loginButton.click();
  }
} */
