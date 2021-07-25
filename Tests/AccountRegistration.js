import {Selector} from 'testcafe';
import createAccount from '../PageModels/CreateAccount';

// Import the test data from the JSON file.
const VALIDATION_MESSAGES = require('../TestData/validationMessages');
const TEST_DATASET = require('../TestData/registerAccountData');

const validPassword = "aA123!op";
const validEmail = "test@test.com";
const firstName = "testsdf";
const lastName = "jfgsjfgjs";
const invalidEmail="testtest.com";

// Tests for the user story: "As a new customer I want to register a new account, so that I can use the application"
fixture`Account Registration Test`
    .page`https://ui-test-app.betty.app/login`;

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
 await createAccount.createNewUserAccount({firstName: firstName, lastName: lastName, email: invalidEmail});
 await createAccount.checkValidationMessages({
     emailValidationMessage: VALIDATION_MESSAGES.invalidEmail,
     passwordValidationMessage: VALIDATION_MESSAGES.emptyField,
 })
});

test('Test validation messages for create account with first name, last name, valid email and no password', async t => {
    await createAccount.createNewUserAccount({firstName: firstName, lastName: lastName, email:validEmail});
    await createAccount.checkValidationMessages({
        passwordValidationMessage: VALIDATION_MESSAGES.emptyField,
    })
});

TEST_DATASET.forEach(dataset => {
    test('Test create account by inserting different invalid email values as per the test data json file and check validation messages', async t => {
        await createAccount.createNewUserAccount({
            firstName: dataset.firstName,
            lastName: dataset.lastName,
            email: dataset.email,
            password: dataset.password
        });
        await createAccount.checkValidationMessages({
            emailValidationMessage: VALIDATION_MESSAGES.invalidEmail
        })
    });
});
