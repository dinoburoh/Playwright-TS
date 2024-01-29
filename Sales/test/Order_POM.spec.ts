import { test, expect } from '@playwright/test';
import dotenv from 'dotenv';
dotenv.config();
import { delay, navigateToApps, sleep, stringFormat, waitUntilAppIdle } from '../../utils/common';
import { OrdersPage } from '../pages/Orders_page.spec';
import page from '../../globals/global-setup';
import login from '../../utils/login';
import { InvoicesPage } from '../pages/Invoices_page.spec';

const authFile = '/storage-state/storageState.json';
const username = process.env.DYN365_USERNAME ?? '';
const password = process.env.DYN365_PASSWORD ?? '';
const orgurl = process.env.DYN365_ORGURL ?? '';
export let rand_num_95: string | number;



test.describe('Order creation', () => {
    let appId = process.env.SH_APPID as string;
    // test.beforeAll(async ({ page }) => {
    //   await page.waitForLoadState();
    //   await page.keyboard.down('Control');
    //   for (let i = 0; i < 4; i++) {
    //     await page.keyboard.press('-');
    //   }
    //   await page.keyboard.up('Control');

    //   await login(page, orgurl as string, username, password);

    //   await sleep(7);
      
    // });

    test('Create orders', async ({ page }) => {

        // await page.frameLocator('iframe[title="AppLandingPage"]').locator('#app-tile-ellipsis-btn-Sec_1_Item_9').click();
        // let r_number_upto_85 = Math.ceil(Math.random() * 86);
        // const newPage = await browser.newPage();
        // console.log('New page opened');
        // const salesHubPage = await page.locator('//a[@title = \'Sales Hub\']').getAttribute('href');
        // let promisePage = page.context().waitForEvent('page', p => p.url() == `${salesHubPage}`);
        // await page.click('//a[@title = \'Sales Hub\']', { modifiers: ['Control'] });
        // const newPage = await promisePage;
        // await newPage.waitForLoadState();
        // await newPage.bringToFront();
        // await newPage.click('//a[@title = \'Sales Hub\']');


        await page.waitForLoadState();

        await page.keyboard.down('Control');
        for (let i = 0; i < 4; i++) {
          await page.keyboard.press('-');
        }
        await page.keyboard.up('Control');

        await login(page, orgurl as string, username, password);
        await sleep(7);
       
        const newPage = await page.context().newPage();

        await navigateToApps(newPage, stringFormat(appId), 'Sales Hub');  
        console.log('Order creation started');

        rand_num_95 = Math.floor(Math.random() * 96) + 1;
        console.log('Random number ' + rand_num_95);

        const ordersPage = new OrdersPage(newPage, rand_num_95);
        
        // ordersPage.goTo();
        await ordersPage.navigateToOrders();
        await ordersPage.enterOrderDetail();
        await ordersPage.shippingDates();
        await ordersPage.billing_ShippingInfo();
        await ordersPage.salesInfo();
        await ordersPage.fillDescription();
        await ordersPage.saveOrders();
        await ordersPage.captureScreen();

        newPage.close();

    })

    

})
