## UML
        +------------------------+
        |       TerminalApp       |
        +------------------------+
        |+processCommand(command)|
        +------------------------+

                    /\
                    |
                    |
        +--------------------------+
        |        Command            |
        +--------------------------+
        |+execute(): void           |
        |+getCommandName(): string  |
        |+getHelpText(): string     |
        |#description: string       |
        +--------------------------+

            /            |           \
            /            |            \
+---------------+ +---------------+ +---------------+
|   HelpCommand  | |  ClearCommand | |   EchoCommand   |
+---------------+ +---------------+ +---------------+
|+execute(): void| |+execute(): void| |+execute(): void|
+---------------+ +---------------+ +---------------+


## Development workflow:

- Make changes to your code on your local machine.
- Push your changes to a new branch in your GitHub repository.
- Create a pull request (PR) for your changes from the new branch to the main branch.
- GitHub Actions will run the test.yml workflow on your changes. If the tests pass, the PR will be approved and merged into main. If the tests fail, you will need to fix the issues and repeat step 3 and 4.
- After the PR is merged into main, GitHub Actions will run the prod.yml workflow to deploy your changes to the production environment.