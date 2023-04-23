const terminal = document.getElementById('terminal');
const commandInput = document.getElementById('command');
const output = document.getElementById('output');

function processCommand(input) {
  if (input === 'clear') {
    if (output !== null) {
      output.innerText = '';
    }
    return '';
  }
  return `You entered: ${input}`;
}

function printOutput(text) {
  if (output === null) {
    return;
  }
  output.innerText += `${text}\n`;
  terminal.scrollTop = terminal.scrollHeight;
}

document.addEventListener('DOMContentLoaded', function() {
  
  commandInput.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
      event.preventDefault();
      const input = commandInput.value;
      commandInput.value = '';
      if (input === '') {
        return;
      }
      printOutput(`> ${input}`);
      const outputText = processCommand(input);
      printOutput(outputText);
    }
  });
  commandInput.focus();
});


module.exports = { processCommand, printOutput };