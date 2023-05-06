import { ClearCommand } from './commands/clear.js';
import { EchoCommand } from './commands/echo.js';

export const commands = new Map();
commands.set('clear', new ClearCommand());
commands.set('echo', new EchoCommand());
