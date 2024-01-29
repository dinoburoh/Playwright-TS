import { test, expect } from '@playwright/test';
import dotenv from 'dotenv';
dotenv.config();
import { delay, navigateToApps, sleep, stringFormat, waitUntilAppIdle } from '../../utils/common';
import page from '../../globals/global-setup';
import login from '../../utils/login';
import { InvoicesPage } from '../pages/Invoices_page.spec';

const authFile = '/storage-state/storageState.json';
const username = process.env.DYN365_USERNAME ?? '';
const password = process.env.DYN365_PASSWORD ?? '';
const orgurl = process.env.DYN365_ORGURL ?? '';



test.describe('Invoice creation', () => {
    let appId = process.env.SH_APPID as string;
    // test.beforeAll(async ({ page }) => {
    //     await page.waitForLoadState();
    //     await page.keyboard.down('Control');
    //     for (let i = 0; i < 4; i++) {
    //         await page.keyboard.press('-');
    //     }
    //     await page.keyboard.up('Control');
    //     await login(page, orgurl as string, username, password);
    //     // expect(page.getByText('Sales Hub')).toBeVisible();
    //     await sleep(7);

    // });


    test('Create invoices', async ({ page }) => {

        await page.waitForLoadState();

        await page.keyboard.down('Control');
        for (let i = 0; i < 4; i++) {
            await page.keyboard.press('-');
        }
        await page.keyboard.up('Control');


        await login(page, orgurl as string, username, password);

        const newPage = await page.context().newPage();
        await navigateToApps(newPage, stringFormat(appId), 'Sales Hub');
        console.log('Order creation started');

        const rand_num_95 = Math.floor(Math.random() * 96) + 1;
        console.log('Random number ' + rand_num_95);

        const invoicesPage = new InvoicesPage(newPage, rand_num_95);
        
        await invoicesPage.navigateToInvoices();
        await invoicesPage.enterInvoiceDetail();
        await invoicesPage.shippingDates();
        await invoicesPage.billing_ShippingInfo();
        await invoicesPage.salesInfo();
        await invoicesPage.fillDescription();
        await invoicesPage.saveInvoices();
        await invoicesPage.captureScreen();

    })

})
