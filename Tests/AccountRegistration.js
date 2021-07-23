import {Selector} from 'testcafe';
import createAccount from '/BettyBlocks/BettyBlocks/PageModels/CreateAccount';

// Import the user data from the JSON file.
const VALIDATION_MESSAGES = require('/BettyBlocks/BettyBlocks/Fixtures/validationMessages');
const TEST_EMAILS = require('/BettyBlocks/BettyBlocks/Fixtures/emails');

fixture`Account Registration Test`
    .page`https://ui-test-app.betty.app/login`;

 TEST_EMAILS.forEach(value => {
    test('Test invalid email input', async t => {
     await createAccount.createNewUserAccount({email: value});
     await createAccount.checkValidationMessages({emailValidationMessage: VALIDATION_MESSAGES.invalidEmail})
      });
 });
