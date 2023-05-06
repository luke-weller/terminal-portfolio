import { addOutputToTerminal } from '../terminal.js';
import { Command } from './Command.js';

export class EchoCommand extends Command {
  constructor() {
    super('echo', 'Print the provided text');
  }

  execute(argument) {
    addOutputToTerminal(argument);
  }
}
