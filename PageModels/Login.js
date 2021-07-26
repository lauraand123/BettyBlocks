import {Selector, t} from 'testcafe';

class Login {
    constructor() {
        this.emailInput = Selector('input').withAttribute('name', 'email_address');
        this.passwordInput = Selector('input').withAttribute('name', 'password');
        this.loginButton = Selector('button').withAttribute('type', 'submit');
    }

    async userlogin(options = {}, submitForm = true) {
        this.email = options.email;
        this.password = options.password;

        // Fill in login fields
        if (options.email) await t.typeText(this.emailInput, this.email);
        if (options.password) await t.typeText(this.passwordInput, this.password);

        // Confirm send form if true
        if (submitForm) await t.click(this.loginButton);
    }
}

export default new Login();