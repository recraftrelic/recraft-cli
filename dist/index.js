var simpleGit = require("simple-git/promise")(__dirname);
var parseArgs = require("minimist");
var chalk = require("chalk");
var availableCommands = require("./commands/index");
var repoList = require("./repo.json");
var getCommand = function (commandName) { return availableCommands.find(function (command) { return command.name === commandName; }); };
var argsPassed = parseArgs(process.argv.slice(2));
var commandToExecute = argsPassed['_'][0];
var commandInstance = getCommand(commandToExecute);
if (commandInstance) {
    commandInstance.methodToCall(argsPassed);
}
else {
    console.log("command " + chalk.red(commandToExecute) + " doesn't found");
}
//# sourceMappingURL=index.js.map