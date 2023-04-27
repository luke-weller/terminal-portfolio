const terminalBody = document.querySelector('.terminal-body');
const terminalInput = document.querySelector('.terminal-input');
const terminalPrefix = document.querySelector('.terminal-prefix');

function addOutputToTerminal(output) {
  const outputDiv = document.createElement('div');
  outputDiv.classList.add('terminal-output');
  outputDiv.textContent = output;
  terminalBody.appendChild(outputDiv);
}

const commands = new Map();

function clearTerminal() {
  terminalBody.innerHTML = '';
}

function echoText(text) {
  addOutputToTerminal(text);
}

function getCurrentDate() {
  addOutputToTerminal(new Date().toLocaleString());
}

commands.set('clear', clearTerminal);
commands.set('echo', echoText);
commands.set('date', getCurrentDate);
// add more commands here as needed

function processInput(input) {
  const [command, argument] = input.trim().split(' ');

  if (commands.has(command)) {
    commands.get(command)(argument);
  } else {
    addOutputToTerminal(`Unknown command: ${command}`);
  }

  terminalInput.value = '';
}

terminalInput.addEventListener('keydown', function(event) {
  if (event.key === 'Enter') {
    processInput(terminalPrefix.textContent + ' ' + terminalInput.value);
  }
});
