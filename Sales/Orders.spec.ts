import { test, expect } from '@playwright/test';
import dotenv from 'dotenv';
dotenv.config();
import { navigateToApps, stringFormat, waitUntilAppIdle } from '../utils/common';


test.describe('ORDER and Invoices creation', () => {
    test.describe.configure({ mode: 'serial' });
    let appId = process.env.SH_APPID as string;
    // test.beforeEach(async ({ page }) => {
    //     // await navigateToApps(page, stringFormat(appId), 'Sales Hub');
    // });

    test('Create orders', async ({ page }) => {
        // await page.frameLocator('iframe[title="AppLandingPage"]').locator('#app-tile-ellipsis-btn-Sec_1_Item_9').click();
        let r_number = Math.ceil(Math.random() * 86);
        
        await page.goto('https://org1e1ce0b9.crm8.dynamics.com/main.aspx?appid=ed54a927-6cac-ee11-a569-000d3a0a75a6&pagetype=control&controlName=MscrmControls.AcceleratedSales.AnchorShellControl');
        await page.getByLabel('Orders').locator('div').nth(3).click();
        await page.locator("//button[@aria-label='New']").click();
        await page.locator("//input[@aria-label='Name']").click();
        await page.locator("//input[@aria-label='Name']").fill('Order - ' + r_number);
        await page.getByLabel('Search Records for Price List').click();
        await page.getByLabel('Advanced lookup').click();
        // await page.locator("//div[@class='ag-center-cols-container']//div[@aria-rowindex='" + r_number + "']").click();

        //div[contains(@class,'containerEditableStyles')]/div[contains(@class,'ms-Stack']

        console.log(await page.locator("//div[contains(@class,'containerEditableStyles')]/div[contains(@class,'ms-Stack')]").count());
        // console.log(el_List);

        // let el_Count = Math.floor(Math.random() * el_List.length);
        // await el_List[el_Count].click();
        // await page.getByRole('button', { name: 'Done' }).press('Enter');

        // await page.locator("(//i[contains(@class,'DatePicker')])[1]").click();
        // await page.getByLabel('25,January,').click();



        // await page.frameLocator('iframe[title="AppLandingPage"]').locator('#ellipsisFlyoutOverlay').click({
        //     button: 'right'
        // });
        // await page.goto('https://org1e1ce0b9.crm8.dynamics.com/main.aspx?appid=ed54a927-6cac-ee11-a569-000d3a0a75a6&pagetype=control&controlName=MscrmControls.AcceleratedSales.AnchorShellControl');
        // await page.getByLabel('Quotes').locator('div').nth(3).click();


    })

})
