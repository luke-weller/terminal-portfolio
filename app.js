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

class Command {
  execute(argument) {}
  getCommandName() {}
  getHelpText() {}
}

class HelpCommand extends Command {
  execute() {
    const helpText = `
      Available commands:
      clear - Clear the terminal screen
      echo <text> - Print the provided text
      time - Display the current time
      help - Display this help message
    `;
    addOutputToTerminal(helpText);
  }
  getCommandName() {
    return 'help';
  }
  getHelpText() {
    return 'Display this help message';
  }
}

class ClearCommand extends Command {
  execute() {
    clearTerminal();
  }
  getCommandName() {
    return 'clear';
  }
  getHelpText() {
    return 'Clear the terminal screen';
  }
}

class EchoCommand extends Command {
  execute(argument) {
    addOutputToTerminal(argument);
  }
  getCommandName() {
    return 'echo';
  }
  getHelpText() {
    return 'Print the provided text';
  }
}

const commands = new Map();
commands.set('clear', new ClearCommand());
commands.set('help', new HelpCommand());
commands.set('echo', new EchoCommand());

function clearTerminal() {
  terminalBody.innerHTML = '';
}

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