import { Locator, Page } from "@playwright/test";


export class OrdersPage {
    readonly rand_num_95: string | number;
    readonly page: Page;
    readonly ordersMenuButton: Locator;
    readonly newButton: Locator;
    readonly orderName: Locator;
    readonly priceList: Locator;
    readonly adv_Lookup: Locator;
    readonly pickAnElementFromAdvFind: Locator;
    readonly doneButton_advFind: Locator;
    readonly scheduleCalendarIcon: Locator;
    readonly scheduleDeliveryDate: Locator;
    readonly shippingMethodDropdown: Locator;
    readonly paymentTermsDropdown: Locator;
    readonly freightTermsDropdown: Locator;
    readonly billingStreet1: Locator;
    readonly billingStreet2: Locator;
    readonly billingProvince: Locator;
    readonly billingPostalCode: Locator;
    readonly billingRegion: Locator;
    readonly shippingStreet1: Locator;
    readonly shippingStreet2: Locator;
    readonly shippingProvince: Locator;
    readonly shippingPostalCode: Locator;
    readonly shippingRegion: Locator;
    readonly opportunityLookup: Locator;
    readonly quoteLookup: Locator;
    readonly customerLookup: Locator;
    private ordersElement: Locator;

    readonly orderDescription: Locator;
    readonly saveButton: Locator;


    constructor(page: Page, rand_number_95: number) {
        this.page = page;
        this.rand_num_95 = rand_number_95;
        this.ordersMenuButton = page.getByLabel('Orders').locator('div');
        this.newButton = page.locator("//button[@aria-label='New']");
        this.orderName = page.getByLabel('Name');
        this.priceList = page.getByLabel('Search Records for Price List');
        this.adv_Lookup = page.getByLabel('Advanced lookup');
        this.pickAnElementFromAdvFind = page.locator("//div[@class='ag-center-cols-container']//i[contains(@class,'ms-Checkbox')]");
        this.doneButton_advFind = page.getByRole('button', { name: 'Done' });
        this.scheduleCalendarIcon = page.locator("(//i[contains(@class,'DatePicker')])[1]");
        this.scheduleDeliveryDate = page.getByRole('gridcell', { name: '30, January,' });
        this.shippingMethodDropdown = page.getByLabel('Shipping Method');
        this.paymentTermsDropdown = page.getByLabel('Payment Terms');
        this.freightTermsDropdown = page.getByLabel('Freight Terms');
        this.billingStreet1 = page.getByLabel('Bill To Street 1');
        this.billingStreet2 = page.getByLabel('Bill To Street 2');
        this.billingProvince = page.getByLabel('Bill To State/Province');
        this.billingPostalCode = page.getByLabel('Bill To ZIP/Postal Code');
        this.billingRegion = page.getByLabel('Bill To Country/Region');
        this.shippingStreet1 = page.getByLabel('Ship To Street 1');
        this.shippingStreet2 = page.getByLabel('Ship To Street 2');
        this.shippingProvince = page.getByLabel('Ship To State/Province');
        this.shippingPostalCode = page.getByLabel('Ship To ZIP/Postal Code');
        this.shippingRegion = page.getByLabel('Ship To Country/Region');
        this.opportunityLookup = page.getByLabel('Opportunity, Lookup', { exact: true });
        this.quoteLookup = page.getByLabel('Quote, Lookup', { exact: true });
        this.customerLookup = page.getByLabel('Potential Customer, Lookup', { exact: true });
        this.orderDescription = page.getByRole('textbox', { name: 'DESCRIPTION' });
        this.saveButton = page.getByLabel('Save (Ctrl+S)');

    }

    // async goTo() {
    //     await this.page.goto('https://org1e1ce0b9.crm8.dynamics.com/main.aspx?appid=ed54a927-6cac-ee11-a569-000d3a0a75a6&pagetype=control&controlName=MscrmControls.AcceleratedSales.AnchorShellControl');
    // }

    async navigateToOrders() {
        await this.ordersMenuButton.nth(3).click();
        await this.newButton.click();
    }

    async enterOrderDetail() {
        await this.orderName.click();
        await this.orderName.fill('Order - ' + this.rand_num_95);
        await this.orderName.screenshot({path:'./captures/OrderName.png'});
        await this.priceList.click();
        await this.adv_Lookup.click();
        await this.pickAnElementFromAdvFind.nth(1).click();
        await this.doneButton_advFind.click();
    }

    async shippingDates() {
        await this.scheduleCalendarIcon.click();
        await this.scheduleDeliveryDate.click();
    }

    async billing_ShippingInfo() {
        await this.shippingMethodDropdown.selectOption('5');
        await this.paymentTermsDropdown.selectOption('2');
        await this.freightTermsDropdown.selectOption('2');
        await this.billingStreet1.click();
        await this.billingStreet1.fill('Street - 1');
        await this.billingStreet2.click();
        await this.billingStreet2.fill('Street - 2');
        await this.billingProvince.click();
        await this.billingProvince.fill('MI');
        await this.billingPostalCode.click();
        await this.billingPostalCode.fill('368' + this.rand_num_95);
        await this.billingRegion.click();
        await this.billingRegion.fill('NA');
        await this.shippingStreet1.click();
        await this.shippingStreet1.fill('Street - 1');
        await this.shippingStreet2.click();
        await this.shippingStreet2.fill('Street - 2');
        await this.shippingProvince.click();
        await this.shippingProvince.fill('TN');
        await this.shippingPostalCode.click();
        await this.shippingPostalCode.fill('726' + this.rand_num_95);
        await this.shippingRegion.click();
        await this.shippingRegion.fill('NA');
    }

    async salesInfo() {
        await this.opportunityLookup.click();
        await this.page.getByPlaceholder('Look for Opportunity').press('Enter');
        await this.page.getByLabel('18 Airpot Coffee Makers for').click();
        await this.quoteLookup.click();
        await this.page.getByPlaceholder('Look for Quote').press('Enter');
        await this.page.getByLabel('Quote 113, Test - 32 Contact').click();
        await this.customerLookup.click();
        await this.page.getByPlaceholder('Look for records').press('Enter');
        await this.page.getByLabel('Cacilia Viera, cacilia@').click();
    }

    async fillDescription() {
        await this.orderDescription.click();
        await this.orderDescription.fill('test');
    }

    async saveOrders() {
        await this.saveButton.click();
    }

    async captureScreen() {
        await this.page.waitForTimeout(4000);
        await this.page.screenshot({ path: './captures/OrderPage.png' });
    }


}