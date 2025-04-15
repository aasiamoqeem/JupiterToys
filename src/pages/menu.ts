import { Page,Locator, expect} from '@playwright/test';
import {logger} from '../utils/logger';


export class Menu{
    page: Page;
    home: Locator;
    shop: Locator;
    contact: Locator;
    login: Locator;
    cart: Locator;

    constructor(page: Page){
        this.page = page;
        this.home = page.getByRole('link', { name: 'Home' });
        this.shop = page.getByRole('link', { name: 'Shop', exact: true });
        this.contact = page.getByRole('link', { name: 'Contact' });
        this.login = page.getByRole('link', { name: 'Login' });
        this.cart = page.getByRole('link', { name: 'Cart' });

    }

    async clickMenu(menuItem: string){
        try{
            switch (menuItem) {
                case 'Home':
                    await this.home.click();
                    break;
                case 'Shop':
                    await this.shop.click();
                    break;
                case 'Contact':
                    await this.contact.click();
                    break;
                case 'Login':
                    await this.login.click();
                    break;
                case 'Cart':
                    await this.cart.click();
                    break;
                default:
                throw new Error(`"${menuItem}" not found.`);
            }
            logger.info(`${menuItem} menu item clicked.`);
        }catch (error){
            logger.error('Error in clicking Home menu.', error);
            throw error;
        }
    }
}