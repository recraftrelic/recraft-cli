import minimist from "minimist";
import chalk from "chalk";
import availableCommands from "./commands";

const getCommand = commandName => availableCommands.find(command => command.name === commandName)

const argsPassed = minimist(process.argv.slice(2))
const commandToExecute = argsPassed['_'][0]

const commandInstance = getCommand(commandToExecute)

if (commandInstance) {
  commandInstance.methodToCall(argsPassed)
} else {
  console.log(`command ${chalk.red(commandToExecute)} doesn't found`)
}