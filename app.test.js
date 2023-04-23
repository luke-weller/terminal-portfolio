/**
 * @jest-environment jsdom
 */

const { processCommand, printOutput } = require('./app');

let dom;
let commandInput;
let output;

beforeAll(() => {
  document.body.innerHTML = `
    <div id="terminal">
      <div id="output"></div>
      <div id="input-line">
        <div id="prompt">></div>
        <input type="text" id="command" autofocus />
      </div>
    </div>
  `;
  output = document.getElementById('output');
  commandInput = document.getElementById('command');
});

beforeEach(() => {
  commandInput.value = '';
  output.innerText = '';
});

describe('Terminal', () => {
  it('should return the correct output for a non-clear input', () => {
    // Arrange
    const userInput = 'help';

    // Act
    const result = processCommand(userInput);

    // Assert
    expect(result).toBe('You entered: help');
  });

  it('should clear the output when input is "clear"', () => {
    // Arrange
    const userInput = 'clear';
    commandInput.value = 'You entered: help';
  
    // Act
    const result = processCommand(userInput);
  
    // Assert
    expect(result).toBe('');

  });

  it('shoud not print an output if empty input', () => {
    // Arrange
    commandInput.value = '';
    const event = new KeyboardEvent('keydown', { key: 'Enter' });

    // Act
    commandInput.dispatchEvent(event);

    // Assert
    const expectedOutput = '';
    const actualOutput = output.innerText;
    expect(actualOutput).toBe(expectedOutput);
  });
});

afterAll(() => {
  global.document = null;
  dom = null;
});

afterEach(() => {
  commandInput.value = '';
  output.innerText = '';
});
