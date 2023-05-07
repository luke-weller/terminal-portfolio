Feature: Terminal commands
  As a user
  I want to be able to execute commands in the terminal
  So that I can interact with the application

  Scenario: Echo command
    Given the terminal is open
    When the user types "echo  hello"
    Then the terminal output should contain "hello"

  Scenario: Clear command
    Given the terminal is open
    When the user types "clear"
    Then the terminal output should be empty

  Scenario: Unknown command
    Given the terminal is open
    When the user types an unknown command
    Then the terminal output should contain "Unknown command"

