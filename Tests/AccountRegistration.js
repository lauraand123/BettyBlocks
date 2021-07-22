import {Selector} from 'testcafe';

const registerAccountLink = Selector('a').withAttribute('href', '/new-account');
const firstName = Selector('input').withAttribute('name', 'first_name');
const lastName = Selector('input').withAttribute('name', 'last_name');
const email = Selector('input').withAttribute('name', 'email_address');
const password = Selector('input').withAttribute('name', 'password');
const createAccountButton = Selector('button');

fixture`Account Registration Test`
    .page`https://ui-test-app.betty.app/login`;

test('Test account registration', async t => {
    // Maximize window and click create new account button
    await t.maximizeWindow()
           .expect(registerAccountLink.visible).ok()
           .click(registerAccountLink);
    // Check user is redirected to the expected page
    await t.expect(Selector('h3').innerText).eql('Create new account')

    // Fill in registration fields
    await
    //typeText(firstName,'')
          t.typeText(firstName,'gd')
           .typeText(lastName, 'Peter')
           .typeText(email, 'Peter')
           .typeText(password, 'Peter')
    // Confirm registration
           .click(createAccountButton)

    const firstNameError= await Selector('label').withText('Email address').parent(0).find('p');
    await t.expect(firstNameError.innerText).eql('No valid value provided')
});