import { TerminalApp } from './terminal.js';

const terminalInput = document.querySelector('.terminal-input');
const terminalPrefix = document.querySelector('.terminal-prefix');

const terminalApp = new TerminalApp();

terminalInput.addEventListener('keydown', function(event) {
  if (event.key === 'Enter') {
    const command = terminalPrefix.textContent + ' ' + terminalInput.value;
    terminalApp.processCommand(command);
    terminalInput.value = '';
  }
});
