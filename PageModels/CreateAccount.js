import {Selector, t} from 'testcafe';

class CreateAccount {
    constructor() {
        this.registerAccountLink = Selector('a').withAttribute('href', '/new-account');
        this.firstNameInput = Selector('input').withAttribute('name', 'first_name');
        this.lastNameInput = Selector('input').withAttribute('name', 'last_name');
        this.emailInput = Selector('input').withAttribute('name', 'email_address');
        this.passwordInput = Selector('input').withAttribute('name', 'password');
        this.createAccountButton = Selector('button').withAttribute('type', 'submit');
    }

    async createNewUserAccount(options = {}, submitForm = true) {
        this.lastName = options.lastName;
        this.firstName = options.firstName;
        this.email = options.email;
        this.password = options.password;

        // Maximize window, check create account link is available and go to create a new account
        await t.maximizeWindow()
            .expect(this.registerAccountLink.visible).ok()
            .click(this.registerAccountLink)
            // Check user is redirected to the expected page
            .expect(Selector('h3').innerText).eql('Create new account');

        // Fill in registration fields
        if (options.firstName) await t.typeText(this.firstNameInput, this.firstName);
        if (options.lastName) await t.typeText(this.lastNameInput, this.lastName);
        if (options.email) await t.typeText(this.emailInput, this.email);
        if (options.password) await t.typeText(this.passwordInput, this.password);

        // Confirm send form if true
        if (submitForm) await t.click(this.createAccountButton);
    }

    async checkValidationMessages(options={}){
        this.firstNameValidationMessage= options.firstNameValidationMessage;
        this.lastNameValidationMessage = options.lastNameValidationMessage;
        this.emailValidationMessage= options.emailValidationMessage;
        this.passwordValidationMessage = options.passwordValidationMessage;
        if(options.firstNameValidationMessage) {
            const firstNameValidationMessageBox = await Selector('label').withText('First Name').parent(0).find('p');
            await t.expect(firstNameValidationMessageBox.innerText).eql(this.firstNameValidationMessage);
        }
        if(options.lastNameValidationMessage) {
            const lastNameValidationMessageBox = await Selector('label').withText('First Name').parent(0).find('p');
            await t.expect(lastNameValidationMessageBox.innerText).eql(this.lastNameValidationMessage);
        }
        if(options.emailValidationMessage) {
            const emailValidationMessageBox = await Selector('label').withText('Email address').parent(0).find('p');
            await t.expect(emailValidationMessageBox.innerText).eql(this.emailValidationMessage);
        }
        if(options.passwordValidationMessage) {
            const passwordValidationMessageBox = await Selector('label').withText('Email address').parent(0).find('p');
            await t.expect(passwordValidationMessageBox.innerText).eql(this.passwordValidationMessage);
        }
    }
}

export default new CreateAccount();