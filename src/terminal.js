import { commands } from "./commands.js";

export const terminalBody =
  typeof document !== "undefined"
    ? document.querySelector(".terminal-body")
    : null;

export function addOutputToTerminal(output) {
  const time = getCurrentTime();

  const outputDiv = document.createElement("div");
  outputDiv.setAttribute("id", "terminal-output");
  outputDiv.classList.add("terminal-output");

  if (Array.isArray(output)) {
    output.forEach((item) => {
      const itemDiv = document.createElement("div");
      itemDiv.textContent = item;
      outputDiv.appendChild(itemDiv);
    });
  } else {
    outputDiv.textContent = output;
  }

  const timeDiv = document.createElement("div");
  timeDiv.classList.add("time");
  timeDiv.textContent = time;
  outputDiv.insertBefore(timeDiv, outputDiv.firstChild);

  terminalBody.appendChild(outputDiv);
}

export function getCurrentTime() {
  const date = new Date();
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const time = `${hours}:${minutes}`;
  return time;
}

export class TerminalApp {
  processCommand(command) {
    const [name, arg] = command.trim().split(" ");
    const cmd = commands.get(name);
    if (!cmd) {
      addOutputToTerminal(`Unknown command: ${name}`);
      return;
    }
    cmd.execute(arg);
  }
}
