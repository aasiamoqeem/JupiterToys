import { test, expect } from '@playwright/test';
import {logger} from '../utils/logger';
import {Menu } from '../pages/menu';
import {Shop } from '../pages/shop';
import {Contact} from '../pages/contact';
import {Cart} from '../pages/cart';

const baseURL = 'https://jupiter.cloud.planittesting.com';
let page; 
let menuPage: Menu;
let contactPage: Contact;
let cartPage: Cart;
let shopPage: Shop;



test.beforeEach(async ({ browser }) => {
    page = await browser.newPage();
    await page.goto(baseURL);
    menuPage = new Menu(page);
    contactPage = new Contact(page);
    cartPage = new Cart(page);
    shopPage =  new Shop(page);
});
    
test.afterAll(async () => {
    if (page) await page.close(); 
});

test('Validate Errors', async () => {
    await test.step('Navigate to Contact page', async () => {
        await menuPage.clickMenu('Contact');
    });

    await test.step('Click submit', async() => {
        await contactPage.clickButton('Submit');
    });

    await test.step('Verify error messages', async () => {
        await contactPage.clickButton('Submit');
        const alertBanner = await contactPage.checkErrors('Alert Banner');
        logger.info(await alertBanner.textContent());
        await expect(alertBanner).toBeVisible();
        await expect(await alertBanner.textContent()).toContain("- but we won't get it unless");
        const forenameError = await contactPage.checkErrors('Forename Error');
        logger.info(await forenameError.textContent());
        await expect(forenameError).toBeVisible();
        await expect(await forenameError.textContent()).toBe('Forename is required');
        const emailError = await contactPage.checkErrors('Email Error');
        logger.info(await emailError.textContent());
        expect(await emailError.textContent()).toBe('Email is required');
        const messageError = await contactPage.checkErrors('Message Error');
        logger.info(await messageError.textContent());
        expect(await messageError.textContent()).toBe('Message is required');
    });

    await test.step('Populate mandatory fields', async () => {
        await contactPage.enterDetails('Jill', 'Forename');
        logger.info('Name entered')
        await contactPage.enterDetails('jill@gmail.com', 'Email');
        await contactPage.enterDetails('Hello', 'Message');
    });

    await test.step('Validate Errors are gone', async () => {
        const alertBanner = await contactPage.checkErrors('Alert Banner');
        await expect(await alertBanner.textContent()).toContain('- tell it how it is');
        await expect(await contactPage.checkErrors('Forename Error')).toBeHidden();
        await expect(await contactPage.checkErrors('Email Error')).toBeHidden();
        await expect(await contactPage.checkErrors('Message Error')).toBeHidden();
    });

});


test(`Run 5 Successful Submission Test`, async () => {
    test.setTimeout(60000); // 60 seconds
    for (let i=1; i<=5; i++){
        console.log(`Run ${i}/5 test`)
        
        if (i> 1){
            await contactPage.clickButton('Back');
        }
        else {
                await menuPage.clickMenu('Contact');
        }

        await test.step('Populate mandatory fields', async () => {
        await contactPage.enterDetails('Jill', 'Forename');
        await contactPage.enterDetails('jill@gmail.com', 'Email');
        await contactPage.enterDetails('Hello', 'Message');
        });

        await test.step('Click submit', async() => {
            await contactPage.clickButton('Submit');
        });

        await test.step('Validate Successful Submission message', async () => {
            const progressBar = await contactPage.checkErrors('Progress Bar');
            if (await progressBar.isVisible({ timeout: 5000 })) {
                await expect(progressBar).toBeHidden({ timeout: 40000 });
            }
            const alertBanner = await contactPage.checkErrors('Alert Banner');
            logger.info(await alertBanner.textContent());
            await expect(await alertBanner.textContent()).toContain('Thanks Jill, we appreciate your feedback.');
        });
    }
});


test('Verify Price', async() => {
    await test.step('Buy items', async () => {
        await menuPage.clickMenu('Shop');

        for (let i = 0; i <= 1; i++) {
            await shopPage.buyItem('Stuffed Frog');
        }
        
        for (let i = 0; i <= 4; i++) {
            await shopPage.buyItem('Fluffy Bunny');
        }

        for (let i = 0; i <= 2; i++) {
            await shopPage.buyItem('Valentine Bear');
        }
    });

    await test.step('Navigate to Cart page', async () => {
        await menuPage.clickMenu('Cart');
    });

    const stuffedFrogSubtotalText= await cartPage.getItemSubtotal(`Stuffed Frog`);
    const fluffyBunnySubtotalText = await cartPage.getItemSubtotal(`Fluffy Bunny`);
    const valentineBearSubtotalText = await cartPage.getItemSubtotal(`Valentine Bear`);

    await test.step('Verify subtotal for each product', async () => {
        
        await expect (stuffedFrogSubtotalText).toEqual('$21.98');
        await expect (fluffyBunnySubtotalText).toEqual('$49.95');
        await expect (valentineBearSubtotalText).toEqual('$44.97');
    });
    await test.step('Verify price for each product', async () => {
        
        const stuffedFrog = await cartPage.getItemPrice(`Stuffed Frog`);
        const fluffyBunny = await cartPage.getItemPrice(`Fluffy Bunny`);
        const valentineBear = await cartPage.getItemPrice(`Valentine Bear`);
        expect (stuffedFrog).toEqual('$10.99');
        expect (fluffyBunny).toEqual('$9.99');
        expect (valentineBear).toEqual('$14.99');
    });
    await test.step('Verify total price', async () => {
        const stuffedFrogSubtotal = parseFloat(stuffedFrogSubtotalText.replace('$', ''));
        const fluffyBunnySubtotal = parseFloat(fluffyBunnySubtotalText.replace('$', ''));
        const valentineBearSubtotal = parseFloat(valentineBearSubtotalText.replace('$', ''));

        const expectedTotal = (stuffedFrogSubtotal + fluffyBunnySubtotal + valentineBearSubtotal).toFixed(1);
        const totalPrice = await cartPage.getTotalPrice();
        const actualTotal = totalPrice.replace('Total: ', '');

        expect(actualTotal).toEqual(expectedTotal);
    });



})

