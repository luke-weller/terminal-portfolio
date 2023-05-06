import { ClearCommand } from './commands/clear.js';
import { EchoCommand } from './commands/echo.js';
import { HelpCommand } from './commands/help.js';


export const commands = new Map();
commands.set('clear', new ClearCommand());
commands.set('echo', new EchoCommand());
commands.set('help', new HelpCommand(commands));
