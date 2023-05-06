import { addOutputToTerminal } from "./terminal.js";
import { terminalBody } from './terminal.js';

export class Command {
    constructor(name, description) {
      this.name = name;
      this.description = description;
    }
  
    execute(_argument) {
      throw new Error('Command.execute() method must be implemented by child classes');
    }
  }
  
  export class ClearCommand extends Command {
    constructor() {
      super('clear', 'Clear the terminal screen');
    }
  
    execute() {
      terminalBody.textContent = '';
    }
  }
  
  export class EchoCommand extends Command {
    constructor() {
      super('echo', 'Print the provided text');
    }
  
    execute(argument) {
      addOutputToTerminal(argument);
    }
  }
  
  export const commands = new Map();
  commands.set('clear', new ClearCommand());
  commands.set('echo', new EchoCommand());
  