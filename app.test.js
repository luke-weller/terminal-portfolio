/**
 * @jest-environment jsdom
 */

const { processCommand } = require('./app');

test('processCommand function returns expected output', () => {
    // Arrange
    // Set up the HTML elements
    document.body.innerHTML = `
      <div id="output"></div>
      <div id="input-line">
        <div id="prompt">&gt;</div>
        <input type="text" id="command" />
      </div>
    `;
    const commandInput = document.getElementById('command');
    const output = document.getElementById('output');

    // Verify
    // Check that the HTML elements were created successfully
    expect(commandInput).not.toBeNull();
    expect(output).not.toBeNull();
  
    // Act
    // Simulate the user entering a command
    commandInput.value = 'test command';
    const event = new KeyboardEvent('keydown', { key: 'Enter' });
    commandInput.dispatchEvent(event);
  
    // Assert
    // Check that the output is correct
    const expected = 'You entered: test command';
    const actual = processCommand('test command');
    expect(actual).toContain(expected);
  
  });