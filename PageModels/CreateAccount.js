import {Selector, t} from 'testcafe';

class CreateAccount {
    constructor() {
        this.registerAccountLink = Selector('a').withAttribute('href', '/new-account');
        this.firstNameInput = Selector('input').withAttribute('name', 'first_name');
        this.lastNameInput = Selector('input').withAttribute('name', 'last_name');
        this.emailInput = Selector('input').withAttribute('name', 'email_address');
        this.passwordInput = Selector('input').withAttribute('name', 'password');
        this.createAccountButton = Selector('button');
    }

    async submitUserAccount(options = {}) {
        this.lastName=options.lastName
        // Maximize window, check create account link is available and go to create a new account
        await t.maximizeWindow()
               .expect(this.registerAccountLink.visible).ok()
               .click(this.registerAccountLink)
               // Check user is redirected to the expected page
               .expect(Selector('h3').innerText).eql('Create new account');

        // Fill in registration fields
        await t.typeText(this.firstNameInput, 'fsfsfs')
                .typeText(this.lastNameInput, this.lastName)
                .typeText(this.emailInput, 'Peter')
                .typeText(this.passwordInput, 'Peter')
                // Confirm registration
                .click(this.createAccountButton)

        const firstNameError = await Selector('label').withText('Email address').parent(0).find('p');
        await t.expect(firstNameError.innerText).eql('No valid value provided')
    }
}

export default new CreateAccount();