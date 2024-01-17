import { test, expect } from '@playwright/test';
import dotenv from 'dotenv';
dotenv.config();
import { navigateToApps, stringFormat, waitUntilAppIdle } from '../utils/common';


test.describe('QUOTES and ORDER creation', () => {
    test.describe.configure({ mode: 'serial' });
    let appId = process.env.SH_APPID as string;
    test.beforeEach(async ({ page }) => {
        await navigateToApps(page, stringFormat(appId), 'Sales Hub');
    });

    test('Create quotes', async ({ page }) => {
        // await page.frameLocator('iframe[title="AppLandingPage"]').locator('#app-tile-ellipsis-btn-Sec_1_Item_9').click();
        let r_number = Math.floor(Math.random() * 86) + 2;
        await page.goto('https://org1e1ce0b9.crm8.dynamics.com/main.aspx?appid=ed54a927-6cac-ee11-a569-000d3a0a75a6&pagetype=control&controlName=MscrmControls.AcceleratedSales.AnchorShellControl');
        await page.getByLabel('Quotes').locator('div').nth(3).click();
        await page.locator("//button[@aria-label='New']").click();
        await page.locator("//input[@aria-label='Name']").click();
        await page.locator("//input[@aria-label='Name']").fill('Quote - ' + r_number);
        await page.getByLabel('Search Records for Price List').click();
        await page.getByLabel('Advanced lookup').click();
        await page.locator("//div[@class='ag-center-cols-container']//div[@aria-rowindex='" + r_number + "']").click();


        // await page.frameLocator('iframe[title="AppLandingPage"]').locator('#ellipsisFlyoutOverlay').click({
        //     button: 'right'
        // });
        // await page.goto('https://org1e1ce0b9.crm8.dynamics.com/main.aspx?appid=ed54a927-6cac-ee11-a569-000d3a0a75a6&pagetype=control&controlName=MscrmControls.AcceleratedSales.AnchorShellControl');
        // await page.getByLabel('Quotes').locator('div').nth(3).click();


    })

})
