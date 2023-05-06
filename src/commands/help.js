import { addOutputToTerminal } from '../terminal.js';
import { Command } from './Command.js';

export class HelpCommand extends Command {
  constructor(commands) {
    super('help', 'List available commands and their descriptions');
    this.commands = commands;
  }

  execute() {
    const outputItems = [];

    this.commands.forEach(command => {
      outputItems.push(`${command.name}: ${command.description}`);
    });

    addOutputToTerminal(outputItems);
  }
}
