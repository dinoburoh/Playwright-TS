import { Browser, expect, Page } from "@playwright/test";
// import {  CommandBarGlobalButtonsSelectors, FormSelectors} from "../selectors/caseCRUDSelectors.json";

/* String format.
* @param str String, needs to be formatted.
* @param args Arguments, needs to be placed properly in the string.
*/
export const stringFormat = (str: string, ...args: any[]) =>
	str.replace(/{(\d+)}/g, (match, index) => args[index].toString() || "");

export async function waitUntilAppIdle(page: Page) {
	// eslint-disable-next-line no-restricted-syntax
	try {
		await page.waitForFunction(() => (window as any).UCWorkBlockTracker?.isAppIdle());
	} catch (e: any) {
		console.log("waitUntilIdle failed, ignoring.., error: " + e?.message);
	}
}

export const delay = (ms: any) => new Promise((resolve) => setTimeout(resolve, ms));

export async function navigateToApps(page: Page, appId: string, appName: string) {
	console.log('Navigate to ' + appName.toString() + ' - Start');
	// const context = await browser.newContext();
	// const page = await browser.newPage();
	// await page.waitForTimeout(10000);
	// expect(page.getByText('Sales Hub')).toBeVisible();
	// const salesHubPage = await page.locator('//a[@title = \'Sales Hub\']').getAttribute('href');
	
	// await page.pause();
	// let promisePage = page.context().waitForEvent('page', p => p.url() == `${salesHubPage}`);
	// await page.click('//a[@title = \'Sales Hub\']', { modifiers: ['Control'] });
	
	page.goto('https://org1e1ce0b9.crm8.dynamics.com/main.aspx?appid=' + appId.toString());
	
	// await page.waitForTimeout(5000);
	
	// const newPage = await promisePage;
	// await newPage.waitForLoadState();
	// await newPage.bringToFront();

	// const [newPage] = await Promise.all([
	// 	context.waitForEvent('page'),
	// 	page.evaluate((salesHubPage) => window.open(salesHubPage, '_blank'), salesHubPage)]);

	// await page.goto('https://org1e1ce0b9.crm8.dynamics.com/main.aspx?appid=ed54a927-6cac-ee11-a569-000d3a0a75a6');
	expect(page.getByRole('button', { name: appName })).toBeTruthy();
	console.log('Navigated to ' + appName.toString() + '- Success');
}

/**
 * Explicit wait for required seconds.
 * @param seconds #Seconds need to be waited.
 */
export const sleep = (seconds: any) => new Promise((resolve) => setTimeout(resolve, (seconds || 1) * 1000));

/**
 * Wait to load global commandbar.
 * @param page Page reference.
 */
export async function waitForGlobalComamndBarLoad(page: Page) {
	// await page.waitForSelector(CommandBarGlobalButtonsSelectors.CommandBarSelector);
	// Wait for command buttons to be stable (Wait for last loading element).
	//    await page.waitForSelector(CommandBarGlobalButtonsSelectors.AccountManager);
}
/**
 * Expand global quick create flyout.
 * @param page Page reference.
 */
export async function expandGlobalQuickCreateFlyout(page: Page) {
	// Wait to load global commandbar.
	await waitForGlobalComamndBarLoad(page);

	// Click on global quick create launcher button.
	// const quickCreateLauncher = await page.waitForSelector(CommandBarGlobalButtonsSelectors.QuickCreateLauncher);
	// await quickCreateLauncher.waitForElementState("stable");
	// await quickCreateLauncher.click();

	// Wait to laod the quick create launcher flyout.
	// await page.waitForSelector(CommandBarGlobalButtonsSelectors.QuickCreateLauncherFlyout);
}

/**
 * Open global quick create form.
 * @param page Page reference.
 * @param entityLogicalName Logical name of entity/activity, for which quick create form needs to be opened.
 * @param isActivity Is it activity - true/false. Default - false.
 * @param waitToLoadQuickCreateForm Wait to load quick create form. Default - `true`.
 */
export async function openGlobalQuickCreateForm(
	page: Page,
	entityLogicalName: string,
	isActivity = false,
	waitToLoadQuickCreateForm = true
): Promise<void> {
	// Expand global quick create flyout.
	await expandGlobalQuickCreateFlyout(page);

	if (isActivity) {
		// Click on Activities button to get all the list of activities.
		// await page.click(stringFormat(CommandBarGlobalButtonsSelectors.QuickCreateLauncherFlyoutButton, "Activities"));

		// Wait to load Activities flyout.
		// await page.waitForSelector(CommandBarGlobalButtonsSelectors.QuickCreateLauncherActivitiesFlyout);
	}

	// Click on required entity/activity button to open the quick create form.
	// await page.click(stringFormat(CommandBarGlobalButtonsSelectors.QuickCreateLauncherFlyoutButton, entityLogicalName));

	if (waitToLoadQuickCreateForm) {
		// Wait to laod the quick create form.
		await waitForQuickCreateFormLoad(page);
	}
}

/**
 * Wait to load the quick create form.
 * @param page Page reference.
 */
export async function waitForQuickCreateFormLoad(page: Page): Promise<void> {
	// Wait for the dom-content load.
	await waitForDomContentLoad(page);

	// Wait for quick create form load.
	// await page.waitForSelector(FormSelectors.QuickCreateFormSelector);

	// Wait until app is idle.
	await waitUntilAppIdle(page);
}
/**
 * Wait for dom-content load.
 * @param page Page reference.
 * @param loadTimeout Page load timeout. Default - 1 minute.
 */
export async function waitForDomContentLoad(
	page: Page,
	loadTimeout: number = TimeOut.NavigationTimeout
): Promise<void> {
	await page.waitForLoadState(LoadState.DomContentLoaded, { timeout: loadTimeout });
}

/**
 * Load state conditions.
 */
export enum LoadState {
	DomContentLoaded = "domcontentloaded",
	Load = "load",
	NetworkIdle = "networkidle",
}

/**
 * Timeout for multiple scenarios.
 */
export enum TimeOut {
	DefaultLoopWaitTime = 5000, // 5 secs
	DefaultWaitTime = 30000, // 30 secs
	DefaultMaxWaitTime = 180000, // 3 minutes
	DefaultWaitTimeForValidation = 30000, // 30 secs
	ElementWaitTime = 2000, // 2 secs
	ExpectRetryDefaultWaitTime = 30000, // 30 secs
	LoadTimeOut = 60000, // 1 minute
	NavigationTimeout = 60000, // 60 secs (1 minute)
	PageLoadTimeOut = 30000, // 30 secs
	TestTimeout = 360000, // 360000 ms (6 minutes)
	TestTimeoutMax = 6000000, // 6000000 ms (10 minutes)
	OneMinuteTimeOut = 60000, // 1 minute
	TwoMinutesTimeout = 120000, // 2 minutes
	ThreeMinutesTimeout = 180000, // 3 minutes
	FourMinutesTimeout = 240000, // 4 minutes
	FiveMinutesTimeout = 300000, // 5 minutes
}


