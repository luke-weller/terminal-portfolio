import { expect } from "chai";
import { driver, APP_URL, By, until } from "./webdriver.js";

describe("Comands", function () {
  this.timeout(10000);

  beforeEach(async function () {
    await driver.get(APP_URL);
    await driver.findElement(By.id("terminal-input")).sendKeys("");
  });

  it("should display the input text in the terminal output when the echo command is executed", async function () {
    // Arrange
    const command = "echo hello";

    // Act
    await driver.findElement(By.id("terminal-input")).sendKeys(command, "\n");
    const output = await driver.findElement(By.id("terminal-output")).getText();

    // Assert
    expect(output).to.include("hello");
  });

  it("should clear the terminal output from the terminal when the clear command is executed", async function () {
    // Arrange
    const command = "clear";

    // Act
    await driver.findElement(By.id("terminal-input")).sendKeys(command, "\n");

    // Assert
    try {
      const outputDiv = await driver.findElement(By.id("terminal-output"));
      const output = await outputDiv.getText();
      expect(output).to.be.empty;
    } catch (error) {
      // If terminal-output is not found, the test will pass
      expect(error.name).to.equal("NoSuchElementError");
    }
  });

  it("should display the unknown command output when the executed command is not recognised", async function () {
    // Arrange
    const command = "unknown command";

    // Act
    await driver.findElement(By.id("terminal-input")).sendKeys(command, "\n");
    const output = await driver.findElement(By.id("terminal-output")).getText();

    // Assert
    expect(output).to.include("Unknown command");
  });

  it('should display help text in the terminal when "help" command is entered', async () => {
    // Arrange
    const command = "help";
    const expectedTexts = ["help", "clear", "echo"];

    // Act
    await driver.findElement(By.id("terminal-input")).sendKeys(`${command}\n`);
    const outputDiv = await driver.wait(
      until.elementLocated(By.id("terminal-output")),
      2000
    );
    const text = await outputDiv.getText();

    // Assert
    expect(text).to.include(...expectedTexts);
  });
});
