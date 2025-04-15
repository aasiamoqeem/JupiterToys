import { Page,Locator, expect} from '@playwright/test';
import {logger} from '../utils/logger';
import { link } from 'fs';


export class Contact{
    page: Page;
    alertBanner: Locator;
    forename: Locator;
    surname: Locator;
    email: Locator;
    telephone: Locator;
    message: Locator;
    forenameError: Locator;
    emailError: Locator;
    messageError: Locator;
    submit: Locator;
    progressBar: Locator;
    backButton: Locator;
    
    constructor(page: Page){
        this.page = page;
        this.alertBanner = page.locator('.alert');
        this.forename = page.locator('#forename');
        this.surname = page.locator('#surname');
        this.email = page.locator('#email');
        this.telephone = page.locator('#telephone');
        this.message = page.locator('#message');
        this.forenameError = page.locator('#forename-err');
        this.emailError = page.locator('#email-err');
        this.messageError = page.locator('#message-err');
        this.submit = page.getByRole('link', { name: 'Submit' })
        this.progressBar = page.locator('.progress');
        this.backButton = page.getByRole('link', { name: '« Back' })
    }

    async clickButton(buttonName: string){
        try{
            if (buttonName === 'Submit'){
                await this.submit.click();
                logger.info('Submit button clicked.')
            }
            else if (buttonName == 'Back'){
                await this.backButton.click();
                logger.info('Back button clicked.')
            }
            
        }catch (error){
            logger.error('Error in clicking Submit button.', error);
            throw error;
        }
    }

    async checkErrors(errorMessage: string){
        switch (errorMessage) {
            case 'Alert Banner':
                return this.alertBanner;
            case 'Forename Error':
                return this.forenameError;
            case 'Email Error':
                return this.emailError;
            case 'Message Error':
                return this.messageError;
            case 'Progress Bar':
                return this.progressBar;
            default:
                throw new Error(`No "${errorMessage}" is shown.`);
        }
    }


    async enterDetails(value: string, field: string){
        try{
            switch (field) {
                case 'Forename':
                    await this.forename.click();
                    await this.forename.fill(value);
                    break;
                case 'Surname':
                    await this.surname.click();
                    await this.surname.fill(value);
                    break;
                case 'Email':
                    await this.email.click();
                    await this.email.fill(value);
                    break;
                case 'Telephone':
                    await this.telephone.click();
                    await this.telephone.fill(value);
                    break;
                case 'Message':
                    await this.message.click();
                    await this.message.fill(value);
                    break;
            }
            
        }catch (error){
            logger.error('Error in entering Details.', error);
            throw error;
        }
    }
    

}