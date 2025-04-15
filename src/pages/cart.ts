import { Page,Locator, expect} from '@playwright/test';
import {logger} from '../utils/logger';


export class Cart{
    page: Page;
    stuffedFrogRow: Locator;
    fluffyBunnyRow: Locator;
    valentineBearRow: Locator;
    teddyBearRow: Locator;
    handmadeDollRow: Locator;
    smileyBearRow: Locator;
    funnyCowRow: Locator;
    smileyFaceRow: Locator;
    totalPrice: Locator;

    constructor(page: Page){
        this.page = page;
        this.stuffedFrogRow = page.locator('tr:has-text("Stuffed Frog")');
        this.fluffyBunnyRow = page.locator('tr:has-text("Fluffy Bunny")');
        this.valentineBearRow = page.locator('tr:has-text("Valentine Bear")');
        this.teddyBearRow = page.locator('tr:has-text("Teddy Bear")');
        this.handmadeDollRow = page.locator('tr:has-text("Handmade Doll")');
        this.smileyBearRow = page.locator('tr:has-text("Smiley Bear")');;
        this.funnyCowRow = page.locator('tr:has-text("Funny Cow")');
        this.smileyFaceRow = page.locator('tr:has-text("Smiley Face")');
        this.totalPrice = page.locator('.total');
    }

    async getItemRow(itemName: string): Promise<Locator> {
        switch (itemName) {
            case 'Stuffed Frog':
                return this.stuffedFrogRow;
            case 'Fluffy Bunny':
                return this.fluffyBunnyRow;
            case 'Valentine Bear':
                return this.valentineBearRow;
            case 'Teddy Bear':
                return this.teddyBearRow;
            case 'Handmade Doll':
                return this.handmadeDollRow;
            case 'Smiley Bear':
                return this.smileyBearRow;
            case 'Funny Cow':
                return this.funnyCowRow;
            case 'Smiley Face':
                return this.smileyFaceRow;
            default:
                throw new Error(`Item "${itemName}" not found in the cart page object.`);
        }
    }

    async getItemPrice(itemName: string): Promise<string> {
        const itemRow = await this.getItemRow(itemName);
        const priceElement = itemRow.locator('td:nth-child(2)');
        const priceText = await priceElement.textContent();
        if (priceText === null) {
            throw new Error(`Could not retrieve price for item "${itemName}".`);
        }
        logger.info(priceText)
        return priceText;
    }

    async getItemQuantity(itemName: string): Promise<string> {
        const itemRow = await this.getItemRow(itemName);
        const quantityElement = itemRow.locator('td:nth-child(3) input');
        const quantity = await quantityElement.inputValue();
        logger.info(quantity);
        return quantity;
    }

    async getItemSubtotal(itemName: string): Promise<string> {
        const itemRow = await this.getItemRow(itemName);
        const subtotalElement = itemRow.locator('td:nth-child(4)');
        const subtotalText = await subtotalElement.textContent();
        if (subtotalText === null) {
            throw new Error(`Could not retrieve subtotal for item "${itemName}".`);
        }
        logger.info(subtotalText);
        return subtotalText;
    }

    async getTotalPrice(): Promise<string> {
        const totalText = await this.totalPrice.textContent();
        if (totalText === null) {
            throw new Error(`Could not retrieve Total amount.`);
        }
        logger.info(totalText);
        return totalText;
    }
    
}