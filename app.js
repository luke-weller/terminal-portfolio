const terminalBody = document.querySelector('.terminal-body');
const terminalInput = document.querySelector('.terminal-input');
const terminalPrefix = document.querySelector('.terminal-prefix');

function addOutputToTerminal(output) {
  const time = getCurrentTime();
  const outputDiv = document.createElement('div');
  outputDiv.classList.add('terminal-output');

  if (Array.isArray(output)) {
    output.forEach((item) => {
      const itemDiv = document.createElement('div');
      itemDiv.textContent = item;
      outputDiv.appendChild(itemDiv);
    });
  } else {
    outputDiv.textContent = output;
  }

  const timeDiv = document.createElement('div');
  timeDiv.classList.add('time');
  timeDiv.textContent = time;
  outputDiv.insertBefore(timeDiv, outputDiv.firstChild);

  terminalBody.appendChild(outputDiv);
}

export class Command {
  constructor(name, description) {
    this.name = name;
    this.description = description;
  }

  execute(_argument) {
    throw new Error('Command.execute() method must be implemented by child classes');
  }
}

class ClearCommand extends Command {
  constructor() {
    super('clear', 'Clear the terminal screen');
  }

  execute() {
    terminalBody.textContent = '';
  }
}

class EchoCommand extends Command {
  constructor() {
    super('echo', 'Print the provided text');
  }

  execute(argument) {
    addOutputToTerminal(argument);
  }
}

const commands = new Map();
commands.set('clear', new ClearCommand());
commands.set('echo', new EchoCommand());

function getCurrentTime() {
  const date = new Date();
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const time = `${hours}:${minutes}`;
  return time;
}

class TerminalApp {
  processCommand(command) {
    const [name, arg] = command.trim().split(' ');
    const cmd = commands.get(name);
    if (cmd) {
      cmd.execute(arg);
    } else {
      addOutputToTerminal(`Unknown command: ${name}`);
    }
  }
}

terminalInput.addEventListener('keydown', function(event) {
  if (event.key === 'Enter') {
    const command = terminalPrefix.textContent + ' ' + terminalInput.value;
    terminalApp.processCommand(command);
    terminalInput.value = '';
  }
});

const terminalApp = new TerminalApp();