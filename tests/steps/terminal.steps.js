const { Builder, By } = require('selenium-webdriver');
const { expect } = require('chai');

const APP_URL = 'http://localhost:8080';

describe('Terminal commands', function () {
  this.timeout(10000); 

  let driver;

  before(async function () {
    driver = await new Builder().forBrowser('chrome').build();
  });

  after(async function () {
    await driver.quit();
  });

  beforeEach(async function () {
    await driver.get(APP_URL);
    await driver.findElement(By.id('terminal-input')).sendKeys('');
  });

  it('should execute the echo command', async function () {
    const command = 'echo hello';
    await driver.findElement(By.id('terminal-input')).sendKeys(command, '\n');
    const output = await driver.findElement(By.id('terminal-output')).getText();
    expect(output).to.include('hello');
  });

  it('should execute the clear command', async function () {
    const command = 'clear';
    await driver.findElement(By.id('terminal-input')).sendKeys(command, '\n');
    
    try {
      const outputDiv = await driver.findElement(By.id('terminal-output'));
      const output = await outputDiv.getText();
      expect(output).to.be.empty;
    } catch (error) {
      // If terminal-output is not found, the test will pass
      expect(error.name).to.equal('NoSuchElementError');
    }
  });

  it('should handle unknown commands', async function () {
    const command = 'unknown command';
    await driver.findElement(By.id('terminal-input')).sendKeys(command, '\n');
    const output = await driver.findElement(By.id('terminal-output')).getText();
    expect(output).to.include('Unknown command');
  });
});