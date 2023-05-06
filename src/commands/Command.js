export class Command {
    constructor(name, description) {
      this.name = name;
      this.description = description;
    }
  
    execute(_argument) {
      throw new Error('Command.execute() method must be implemented by child classes');
    }
  }