import { Locator, Page } from "@playwright/test";
// import { rand_num_95 } from "../test/Order_POM.spec";

export class InvoicesPage {
    readonly page: Page;
    readonly rand_number_95: number;
    readonly invoicesMenuButton: Locator;
    readonly newButton: Locator;
    readonly invoiceName: Locator;
    readonly rand_num_95: string | number;
    readonly priceList: Locator;
    readonly adv_Lookup: Locator;
    readonly pickElementFromAdvFind: Locator;
    readonly doneButton_advFind: Locator;
    readonly scheduleCalendarIcon: Locator;
    readonly scheduleDeliveryDate: Locator;
    readonly scheduledDueDatefield: Locator;
    readonly scheduledDueDate: Locator;
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
    readonly orderLookup: Locator;
    readonly customerLookup: Locator;

    readonly orderDescription: Locator;
    readonly saveButton: Locator;

    constructor(page: Page, rand_num_95: number) {
        this.page = page;
        this.rand_num_95 = rand_num_95;
        this.invoicesMenuButton = page.getByLabel('Invoices').locator('div');
        this.newButton = page.locator("//button[@aria-label='New']");
        this.invoiceName = page.getByLabel('Name');
        this.priceList = page.getByLabel('Search Records for Price List');
        this.adv_Lookup = page.getByLabel('Advanced lookup');
        this.pickElementFromAdvFind = page.locator("//div[@class='ag-center-cols-container']//i[contains(@class,'ms-Checkbox')]");
        this.doneButton_advFind = page.getByRole('button', { name: 'Done' });
        this.scheduleCalendarIcon = page.locator("(//i[contains(@class,'DatePicker')])[1]");
        this.scheduleDeliveryDate = page.getByRole('gridcell', { name: '30, January,' });
        this.scheduledDueDatefield = page.getByLabel('Date of Due Date');
        this.scheduledDueDate = page.getByRole('gridcell', { name: '2, February,' });
        this.shippingMethodDropdown = page.getByLabel('Shipping Method');
        this.paymentTermsDropdown = page.getByLabel('Payment Terms');
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
        this.orderLookup = page.getByLabel('Order, Lookup', { exact: true });
        this.customerLookup = page.getByLabel('Customer, Lookup', { exact: true });
        this.orderDescription = page.getByRole('textbox', { name: 'DESCRIPTION' });
        this.saveButton = page.getByLabel('Save (Ctrl+S)');

    }

    async navigateToInvoices() {
        await this.invoicesMenuButton.nth(3).click();
        await this.newButton.click();
    }

    async enterInvoiceDetail() {
        await this.invoiceName.click();
        await this.invoiceName.fill('Invoice - ' + this.rand_num_95);
        await this.invoiceName.screenshot({path:'./captures/OrderName.png'});
        await this.priceList.click();
        await this.adv_Lookup.click();
        await this.pickElementFromAdvFind.nth(1).click();
        await this.doneButton_advFind.click();
    }

    async shippingDates() {
        await this.scheduleCalendarIcon.click();
        await this.scheduleDeliveryDate.click();
        await this.scheduledDueDatefield.click();
        await this.scheduledDueDate.click();
    }

    async billing_ShippingInfo() {
        await this.shippingMethodDropdown.selectOption('5');
        await this.paymentTermsDropdown.selectOption('2');
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
        await this.shippingStreet1.fill('Street - ' + this.rand_num_95);
        await this.shippingStreet2.click();
        await this.shippingStreet2.fill('Street - ' + this.rand_num_95);
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
        await this.orderLookup.click();
        await this.page.getByPlaceholder('Look for Order').press('Enter');
        await this.page.locator('(//UL[@ARIA-LABEL=\'Lookup results\']/li)[1]').click();
        await this.customerLookup.click();
        await this.page.getByPlaceholder('Look for records').press('Enter');
        await this.page.getByLabel('Cacilia Viera, cacilia@').click();
    }

    async fillDescription() {
        await this.orderDescription.click();
        await this.orderDescription.fill('test');
    }

    async saveInvoices() {
        await this.saveButton.click();
    }

    async captureScreen() {
        await this.page.waitForTimeout(4000);
        await this.page.screenshot({ path: './captures/InvoicePage.png' });
    }
}

