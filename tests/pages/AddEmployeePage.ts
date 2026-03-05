import { SuperPage } from './SuperPage';

export class AddEmployeePage extends SuperPage {

	private readonly firstNameInput = this.page.getByPlaceholder('First Name');
    private readonly middleNameInput = this.page.getByPlaceholder('Middle Name');
	private readonly lastNameInput = this.page.getByPlaceholder('Last Name');
	private readonly saveButton = this.page.getByRole('button', { name: 'Save' });


	async fillAddEmployeeFields(arg?: {
		firstName?: string;
		middleName?: string;
		lastName?: string;
	},) {	
		 if(arg){
			arg.firstName && await this.firstNameInput.fill(arg.firstName);
			arg.middleName && await this.middleNameInput.fill(arg.middleName);
			arg.lastName && await this.lastNameInput.fill(arg.lastName);
		 }
		 await this.saveButton.click();
	}
	
}

