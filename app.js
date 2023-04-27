const terminalBody = document.querySelector('.terminal-body');
const terminalInput = document.querySelector('.terminal-input');
const terminalPrefix = document.querySelector('.terminal-prefix');

function addOutputToTerminal(output) {
  const outputDiv = document.createElement('div');
  outputDiv.classList.add('terminal-output');
  const timeDiv = document.createElement('div');
  timeDiv.classList.add('time');
  timeDiv.textContent = getCurrentTime();
  outputDiv.appendChild(timeDiv);
  outputDiv.appendChild(document.createTextNode(output));
  terminalBody.appendChild(outputDiv);
}


const commands = new Map();

function clearTerminal() {
  terminalBody.innerHTML = '';
}

function echoText(text) {
  addOutputToTerminal(text);
}

function getCurrentTime() {
  const date = new Date();
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const time = `${hours}:${minutes}`;
  return time;
}

function showHelp() {
  const helpText = `
    Available commands:
    clear - Clear the terminal screen
    echo <text> - Print the provided text
    time - Display the current time
    help - Display this help message
  `;
  addOutputToTerminal(helpText);
}

commands.set('clear', clearTerminal);
commands.set('echo', echoText);
commands.set('time', getCurrentTime);
commands.set('help', showHelp);


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
