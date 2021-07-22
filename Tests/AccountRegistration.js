import {Selector} from 'testcafe';
import createAccount from '/BettyBlocks/BettyBlocks/PageModels/CreateAccount';

fixture`Account Registration Test`
    .page`https://ui-test-app.betty.app/login`;

test('Test account registration', async t => {

    await createAccount.submitUserAccount({lastName:"fjgjjshsjk"});
});