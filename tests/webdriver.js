import { Builder, until, By } from 'selenium-webdriver';

const APP_URL = 'http://localhost:8080';
let driver;

before(async function () {
  driver = await new Builder().forBrowser('chrome').build();
});

after(async function () {
  await driver.quit();
});

export { driver, APP_URL, until, By };
