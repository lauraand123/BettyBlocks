import {Selector} from 'testcafe';
import createAccount from '../PageModels/CreateAccount';
import loginPage from '../PageModels/Login';

// Import the test data from the JSON file.
const VALIDATION_MESSAGES = require('../TestData/validationMessages');

const validPassword = "aA123!op";
const validEmail = "test@test.com";
const firstName = "Test123!";
const lastName = "jfgsjfgjs";

let invalidEmails = ["plainaddress",
        "#@%^%#$@#$@#.com",
        "@test.com",
        ".email@example.com.",
        "email@111.222.333.44444",
        "email@example.web",
        "email@111.222.333.44444",
        "email@example..com",
        "Abc..123@example.com]"],
    invalidPasswords = ["    ", "adf", "fbsegsjgsjghkshgkls", "fasggsdg46564745",
        "qwer1234", "@$@#%#^$^", "!#!@#!ASADvv", "12345678", "1!Asd"];

let randomValidEmail = createAccount.generateEmail();

// Tests for the user story: "As a new customer I want to register a new account, so that I can use the application"
fixture`Account Registration Test`
    .page`https://ui-test-app.betty.app/login`;

test
    .before(async t => {
        await t
        // Here I should clean the database and delete the previously created accounts
        // !!!! As this couldn't be implemented, the test that creates a valid account uses a fucntion which generates random emails
    })

test('Test validation messages for create account with all empty fields', async t => {
    await createAccount.createNewUserAccount();
    await createAccount.checkValidationMessages({
        firstNameValidationMessage: VALIDATION_MESSAGES.emptyField,
        lastNameValidationMessage: VALIDATION_MESSAGES.emptyField,
        passwordValidationMessage: VALIDATION_MESSAGES.emptyField,
        emailValidationMessage: VALIDATION_MESSAGES.emptyField
    })
});

test('Test validation messages for create account with empty first name and last name and with valid email and password', async t => {
    await createAccount.createNewUserAccount({email: validEmail, password: validPassword});
    await createAccount.checkValidationMessages({
        firstNameValidationMessage: VALIDATION_MESSAGES.emptyField,
        lastNameValidationMessage: VALIDATION_MESSAGES.emptyField,
    })
});

test('Test validation messages for create account with first name, last name, invalid email and no password', async t => {
    await createAccount.createNewUserAccount({firstName: firstName, lastName: lastName, email: invalidEmails[0]});
    await createAccount.checkValidationMessages({
        emailValidationMessage: VALIDATION_MESSAGES.invalidEmail,
        passwordValidationMessage: VALIDATION_MESSAGES.emptyField,
    })
});

test('Test validation messages for create account with first name, last name, valid email and no password', async t => {
    await createAccount.createNewUserAccount({firstName: firstName, lastName: lastName, email: validEmail});
    await createAccount.checkValidationMessages({
        passwordValidationMessage: VALIDATION_MESSAGES.emptyField,
    })
});

invalidEmails.forEach(email => {
    test('Test create account by inserting different invalid email values and check validation message', async t => {
        await createAccount.createNewUserAccount({
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: validPassword
        });
        await createAccount.checkValidationMessages({
            emailValidationMessage: VALIDATION_MESSAGES.invalidEmail
        })
    });
});

invalidPasswords.forEach(password => {
    test('Test create account by inserting different invalid password values and check validation message', async t => {
        await createAccount.createNewUserAccount({
            firstName: firstName,
            lastName: lastName,
            email: validEmail,
            password: password
        });
        await createAccount.checkValidationMessages({
            emailValidationMessage: VALIDATION_MESSAGES.invalidPassword
        })
    });
});

test('Test create account by inserting firstName equal to lastname and equal to password and check validation message', async t => {
    await createAccount.createNewUserAccount({
        firstName: firstName,
        lastName: firstName,
        email: validEmail,
        password: firstName
    });
    // here it should actually be a message stating that you can't create an account with the first name and last name equal to password for security reasons
    await t.expect(await Selector('div').withText('error: This email already exists').visible).ok();
});

test('Test create account with all valid inputs and check validation message and redirection to login page', async t => {
    // As I am not allowed to delete the database I use a function to generate a random valid email, but this is a bad practice as the database is being populated  and never cleaned
    await createAccount.createNewUserAccount({
        firstName: firstName,
        lastName: lastName,
        email: randomValidEmail,
        password: validPassword
    });
    await t.expect(await Selector('div').withText('Your account has been created, you can now login here').visible).ok()
        .expect(Selector('h3').innerText).eql('Login flow');
});

test('Test the user can login with the previously created account', async t => {
    await loginPage.userlogin({
        email: randomValidEmail,
        password: validPassword
    });
    await t.expect(Selector('h3').innerText).eql('Welcome  ' + firstName + ' ' + lastName);
});