const terminal = document.getElementById('terminal');
const commandInput = document.getElementById('command');
const output = document.getElementById('output');

function processCommand(input) {
  if (input === 'clear') {
    output.innerHTML = '';
    return '';
  }
  return `You entered: ${input}`;
}

function printOutput(text) {
  output.innerHTML += `${text}<br>`;
  terminal.scrollTop = terminal.scrollHeight;
}
  
commandInput.addEventListener('keydown', function(event) {
  if (event.key === 'Enter') {
    event.preventDefault();
    const input = commandInput.value;
    commandInput.value = '';
    if (input === '') {
      return;
    }
    printOutput(`<span id="prompt">&gt;</span> ${input}`);
    const outputText = processCommand(input);
    printOutput(outputText);
  }
});

commandInput.focus();