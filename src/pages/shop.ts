import { Page,Locator, expect} from '@playwright/test';
import {logger} from '../utils/logger';


export class Shop{
    page: Page;
    stuffedFrog: Locator;
    fluffyBunny: Locator;
    valentineBear: Locator;
    teddyBear: Locator;
    handmadeDoll: Locator;
    smileyBear: Locator;
    funnyCow: Locator;
    smileyFace: Locator;

    constructor(page: Page){
        this.page = page;
        this.teddyBear = page.locator('#product-1');
        this.stuffedFrog = page.locator('#product-2');
        this.handmadeDoll = page.locator('#product-3');
        this.fluffyBunny = page.locator('#product-4');
        this.smileyBear = page.locator('#product-5');
        this.funnyCow = page.locator('#product-6');
        this.valentineBear = page.locator('#product-7');
        this.smileyFace = page.locator('#product-8');
    }


    async getItem(itemName: string): Promise<Locator> {
        switch (itemName) {
            case 'Stuffed Frog':
                return this.stuffedFrog;
            case 'Fluffy Bunny':
                return this.fluffyBunny;
            case 'Valentine Bear':
                return this.valentineBear;
            case 'Teddy Bear':
                return this.teddyBear;
            case 'Handmade Doll':
                return this.handmadeDoll;
            case 'Smiley Bear':
                return this.smileyBear;
            case 'Funny Cow':
                return this.funnyCow;
            case 'Smiley Face':
                return this.smileyFace;
            default:
                throw new Error(`Item "${itemName}" not found in the cart page.`);
        }
    }

    async buyItem(itemName: string) {
        try{
            const item = await this.getItem(itemName);
            const buyButton = await item.getByRole('link', { name: 'Buy' });
            await expect(buyButton).toBeVisible();
            await expect(buyButton).toBeEnabled();
            await buyButton.click();
            logger.info(`${itemName} bought`);
        }catch (error){
            logger.error('Error in clicking Buy button.', error);
            throw error;
        }
    }

}