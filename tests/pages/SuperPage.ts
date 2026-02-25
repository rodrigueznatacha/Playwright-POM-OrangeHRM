import { expect, type Expect, type Locator, type Page } from '@playwright/test';
import * as dotenv from 'dotenv';
dotenv.config();

const USERNAME = process.env.ORANGE_USERNAME
const PASSWORD = process.env.ORANGE_PASSWORD

export class SuperPage {
	page: Page;
	popup: (text?: string) => Locator;
	optionDropdown: (contextElement: Locator) => Locator;
	autoInputDropdown: (contextElement: Locator) => Locator;
	input: (contextElement: Locator) => Locator;
	dropdown: (contextElement: Locator) => Locator;
	dropdownOptions: (contextElement: Locator) => Locator;
	password: string | undefined;
	username: string | undefined;
	expect: Expect;
	
	constructor(page: Page) {
		this.page = page;
		this.expect = expect;
		this.username = USERNAME;
		this.password = PASSWORD;
		
		//*--- UI Locator utilities ---*//
		this.popup = (text?: string ) => this.page.getByRole('dialog', { name: text });
		this.optionDropdown = (contextElement: Locator) => contextElement.locator('.oxd-select-text-input');
		this.autoInputDropdown = (contextElement: Locator) => contextElement.locator('input');
		this.input = (contextElement: Locator) => contextElement.locator('.oxd-input');	
		this.dropdown = (contextElement: Locator) => contextElement.getByRole('listbox');
		this.dropdownOptions = (contextElement: Locator) => this.dropdown(contextElement).getByRole('option').filter({ hasNotText: '-- Select --' });
		this.input = (contextElement: Locator) => contextElement.locator('.oxd-input');
	}

	getCredentials(){
		const username = this.username;
		const password = this.password;
		
		if(!username || !password){
			throw new Error('Missing CREDENTIALS in .env file');
		}
		return { username, password};	
	}

	async goHome(){
		await this.page.goto('/');
	}

	async getPopup(name?: string) {
		const popup = this.popup(name);
		await expect(popup).toBeVisible();

		return popup;
	}

	async selectDropdownOption(contextElement: Locator, option: string) {
		await this.optionDropdown(contextElement).click(); // Open dropdown	
		const dropdown = this.dropdown(contextElement);
		await this.expect(dropdown).toBeVisible(); // Verify dropdown is visible
		await this.expect(dropdown).toHaveAttribute('loading', 'false'); // Verify dropdown has finished loading options
		await this.dropdownOptions(contextElement).filter({ hasText: option }).first().click(); // Select option from dropdown
		await this.expect(dropdown).not.toBeVisible(); // Verify dropdown is closed after selection
	}

	async selectDropdownInput(contextElement: Locator, searchingText: string) {
		await this.autoInputDropdown(contextElement).fill(searchingText); // trigger autocomplete options
		const dropdown = this.dropdown(contextElement);
		await this.expect(dropdown).toBeVisible(); // Verify dropdown is visible
		await this.dropdownOptions(contextElement).filter({ hasText: searchingText }).first().click(); // Select option from dropdown
		await this.expect(dropdown).not.toBeVisible(); // Verify dropdown is closed after selection
	}
}