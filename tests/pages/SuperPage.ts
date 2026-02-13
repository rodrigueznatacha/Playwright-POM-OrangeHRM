import { expect, type Locator, type Page } from '@playwright/test';
import * as dotenv from 'dotenv';
dotenv.config();

const USERNAMRE = process.env.ORANGE_USERNAME ?? new Error('missing ORANGE_USERNAME environment variable');
const PASSWORD = process.env.ORANGE_PASSWORD ?? new Error('missing ORANGE_PASSWORD environment variable');

export class SuperPage {
	page: Page;
	popup: (text?: string) => Locator;
	password: string | Error;
	username: string | Error;
	
	constructor(page: Page) {
		this.page = page;
		this.username = USERNAMRE;
		this.password = PASSWORD;
		
		//*--- Locator utilities ---*//
		this.popup = (text?: string ) => this.page.getByRole('dialog', { name: text });
		
	}

	async getPopup(name?: string) {
		const popup = this.popup(name);
		await expect(popup).toBeVisible();

		return popup;
	}
}