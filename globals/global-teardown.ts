import { chromium, FullConfig, Page } from '@playwright/test';

async function globalTeardown(page: Page) {
	console.log("##[section]Teardown Playwright Test Environment.");
	// await page.close();
}
export default globalTeardown;