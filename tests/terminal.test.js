import { expect } from "chai";
import { getCurrentTime } from "../src/terminal.js";
import { driver, APP_URL, By } from "./webdriver.js";

describe("Terminal", function () {
  this.timeout(10000);

  beforeEach(async function () {
    await driver.get(APP_URL);
    await driver.findElement(By.id("terminal-input")).sendKeys("");
  });

  it("should return the current time in the format HH:MM", function () {
    // Arrange
    const date = new Date();
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const expectedTime = `${hours}:${minutes}`;

    // Act
    const currentTime = getCurrentTime();

    // Assert
    expect(currentTime).to.equal(expectedTime);
  });
});
