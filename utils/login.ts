import { Page, expect } from '@playwright/test';

async function login(
  page: Page,
  orgurl: string,
  username: string,
  password: string,

): Promise<void> {

  await page.goto(orgurl);
  await page.getByPlaceholder('Email, phone, or Skype').click();
  await page.getByPlaceholder('Email, phone, or Skype').fill(username);
  await page.getByRole('button', { name: 'Next' }).click();
  await page.getByPlaceholder('Password').click();
  await page.getByPlaceholder('Password').fill(password);
  await page.getByRole('button', { name: 'Sign in' }).click();
  // expect(page.getByRole('button', { name: 'Yes' })).toBeVisible();
  // await page.getByRole('button', { name: 'Yes' }).press('Enter');
  await page.getByText('Stay signed in so you don\'t').click();
  await page.waitForTimeout(2000);
  await page.locator('//button[text()=\'Yes\']').click();
  console.log('Logged In');

  // await page.context().newPage();

  // const salesHubPage = await page.locator('//a[@title = \'Sales Hub\']').getAttribute('href');
  // let promisePage = page.context().waitForEvent('page', p => p.url() == `${salesHubPage}`);
  // await page.locator('//a[@title = \'Sales Hub\']').click();
  // const newPage = await promisePage;
  // console.log('New page opened');
  // await newPage.waitForLoadState();
  // await newPage.bringToFront();

}

export default login;