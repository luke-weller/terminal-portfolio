import { terminalBody } from '../terminal.js';
import { Command } from './Command.js';

export class ClearCommand extends Command {
  constructor() {
    super('clear', 'Clear the terminal screen');
  }

  execute() {
    terminalBody.textContent = '';
  }
}