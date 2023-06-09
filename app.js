const terminalBody = document.querySelector(".terminal-body");
const terminalInput = document.querySelector(".terminal-input");
const terminalPrefix = document.querySelector(".terminal-prefix");

function addOutputToTerminal(output) {
  const outputDiv = document.createElement("div");
  outputDiv.classList.add("terminal-output");
  const timeDiv = document.createElement("div");
  timeDiv.classList.add("time");
  timeDiv.textContent = getCurrentTime();
  outputDiv.appendChild(timeDiv);

  // If the output is a string, display it as-is
  if (typeof output === "string") {
    outputDiv.appendChild(document.createTextNode(output));
  }
  // If the output is an object, display it as formatted JSON
  else if (typeof output === "object") {
    const jsonText = JSON.stringify(output, null, 2);
    const preElement = document.createElement("pre");
    preElement.classList.add("json-content");
    preElement.textContent = jsonText;
    outputDiv.appendChild(preElement);
  }

  terminalBody.appendChild(outputDiv);
}

const commands = new Map();

function clearTerminal() {
  terminalBody.innerHTML = "";
}

function echoText(text) {
  addOutputToTerminal(text);
}

function getCurrentTime() {
  const date = new Date();
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const time = `${hours}:${minutes}`;
  return time;
}

function showHelp(command) {
  const helpText = {
    title: "Available commands",
    content: {
      clear: "Clear the terminal screen",
      echo: "Print the provided text",
      help: "Display this help message",
      testapi: "Display a test JSON response",
    },
  };

  if (command) {
    const commandHelp = helpText.content[command];
    if (commandHelp) {
      addOutputToTerminal(`${command}: ${commandHelp}`);
    } else {
      addOutputToTerminal(`Unknown command: ${command}`);
    }
  } else {
    addOutputToTerminal(helpText);
  }
}

async function fetchDataFromAPI(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    return null;
  }
}

async function testAPI(url) {
  if (!url) {
    addOutputToTerminal("No URL provided.");
    return;
  }

  addOutputToTerminal("Fetching data from API...");
  const data = await fetchDataFromAPI(url);
  if (data !== null) {
    addOutputToTerminal(data);
  } else {
    addOutputToTerminal("No JSON response found.");
  }
}

commands.set("clear", clearTerminal);
commands.set("echo", echoText);
commands.set("help", showHelp);
commands.set("testapi", testAPI);

async function processInput(input) {
  const [command, ...args] = input.trim().split(" ");
  const argument = args.join(" ");

  if (commands.has(command)) {
    const commandFunction = commands.get(command);

    if (command === "testapi") {
      commandFunction(argument);
    } else if (command === "help") {
      showHelp(argument);
    } else {
      commandFunction();
    }
  } else {
    addOutputToTerminal(`Unknown command: ${command}`);
  }

  terminalInput.value = "";
}

terminalInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    processInput(terminalPrefix.textContent + " " + terminalInput.value);
  }
});

document.addEventListener("DOMContentLoaded", function () {
  terminalInput.focus();
});
