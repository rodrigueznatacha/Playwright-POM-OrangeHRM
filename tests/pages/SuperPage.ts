import { expect, type Expect, type Locator, type Page } from '@playwright/test';
import * as dotenv from 'dotenv';
dotenv.config();

const USERNAME = process.env.ORANGE_USERNAME
const PASSWORD = process.env.ORANGE_PASSWORD

export class SuperPage {
	page: Page;
	popup: (text?: string) => Locator;
	password: string | undefined;
	username: string | undefined;
	expect: Expect;
	
	constructor(page: Page) {
		this.page = page;
		this.expect = expect;
		this.username = USERNAME;
		this.password = PASSWORD;
		
		//*--- Locator utilities ---*//
		this.popup = (text?: string ) => this.page.getByRole('dialog', { name: text });
		
	}

	getCredentials(){
		const username = this.username;
		const password = this.password;
		
		if(!username || !password){
			throw new Error('Missing CREDENTIALS in .env file');
		}
		return { username, password};	
	}

	async getPopup(name?: string) {
		const popup = this.popup(name);
		await expect(popup).toBeVisible();

		return popup;
	}
}