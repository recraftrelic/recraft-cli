const simpleGit = require("simple-git/promise")(__dirname);
const parseArgs = require("minimist");
const chalk = require("chalk");
const availableCommands = require("./commands/index");

const repoList = require("./repo.json")

const getCommand = commandName => availableCommands.find(command => command.name === commandName)

const argsPassed = parseArgs(process.argv.slice(2))
const commandToExecute = argsPassed['_'][0]

const commandInstance = getCommand(commandToExecute)

if (commandInstance) {
  commandInstance.methodToCall(argsPassed)
} else {
  console.log(`command ${chalk.red(commandToExecute)} doesn't found`)
}