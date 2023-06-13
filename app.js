const terminalBody = document.querySelector(".terminal-body");
const terminalInput = document.querySelector(".terminal-input");
const terminalPrefix = document.querySelector(".terminal-prefix");

const commandHistory = [];
let commandIndex = -1;

function addOutputToTerminal(output) {
  const outputDiv = document.createElement("div");
  outputDiv.classList.add("terminal-output");
  const timeDiv = document.createElement("div");
  timeDiv.classList.add("time");
  timeDiv.textContent = getCurrentTime();
  outputDiv.appendChild(timeDiv);

  if (typeof output === "string") {
    outputDiv.appendChild(document.createTextNode(output));
  } else if (typeof output === "object") {
    const jsonText = JSON.stringify(output, null, 2);
    const preElement = document.createElement("pre");
    preElement.classList.add("json-content");
    preElement.textContent = jsonText;
    outputDiv.appendChild(preElement);
  }

  terminalBody.appendChild(outputDiv);
}

const commands = {
  clear: clearTerminal,
  echo: echoText,
  help: showHelp,
  testapi: jsonApiTest,
};

function clearTerminal() {
  terminalBody.innerHTML = "";
}

function echoText(text) {
  addOutputToTerminal(text);
}

function getCurrentTime() {
  const date = new Date();
  const time = date.toLocaleTimeString("en-US", {
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
  });
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
    addOutputToTerminal(helpText.content);
  }
}

async function fetchDataFromAPI(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(
        `Failed to fetch data from API (${response.status} ${response.statusText})`
      );
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Error fetching data from API: ${error.message}`);
  }
}

async function jsonApiTest(url) {
  if (!url) {
    addOutputToTerminal("Please provide a URL.");
    return;
  }

  try {
    addOutputToTerminal("Fetching data from API...");
    const data = await fetchDataFromAPI(url);
    if (data !== null) {
      addOutputToTerminal(data);
    } else {
      addOutputToTerminal("No JSON response found.");
    }
  } catch (error) {
    addOutputToTerminal(`Error: ${error.message}`);
  }
}

function processInput(input) {
  const [command, ...args] = input.trim().split(" ");
  const argument = args.join(" ");

  if (command === "") {
    return; // Ignore empty commands
  }

  if (command === "clear") {
    clearTerminal();
    terminalInput.value = "";
    return;
  }

  commandHistory.push(input);
  commandIndex = commandHistory.length;

  if (command in commands) {
    const commandFunction = commands[command];

    try {
      if (command === "testapi" || command === "help" || command === "echo") {
        commandFunction(argument);
      } else {
        commandFunction();
      }
    } catch (error) {
      addOutputToTerminal(`Error: ${error.message}`);
    }
  } else {
    addOutputToTerminal(`Unknown command: ${command}`);
  }

  terminalInput.value = "";
}

function navigateCommandHistory(direction) {
  if (commandHistory.length === 0) {
    return;
  }

  if (direction === "up" && commandIndex > 0) {
    commandIndex--;
  } else if (direction === "down" && commandIndex < commandHistory.length - 1) {
    commandIndex++;
  }

  terminalInput.value = commandHistory[commandIndex] || "";
}

terminalInput.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    processInput(terminalPrefix.textContent + " " + terminalInput.value);
  } else if (event.key === "ArrowUp") {
    navigateCommandHistory("up");
  } else if (event.key === "ArrowDown") {
    navigateCommandHistory("down");
  }
});

document.addEventListener("DOMContentLoaded", () => {
  terminalInput.focus();
});
