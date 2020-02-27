const simpleGit = require("simple-git/promise")(__dirname);
const parseArgs = require("minimist");
const chalk = require("chalk");

const repoList = require("./repo.json")

const commands = [
  {
    name: "clone",
    methodToCall: (args) => {
      const appName = args['_'][1]
      let method = args['p'] || "ssh"
      if (repoList[appName]) {
        const repoUrl = repoList[appName][method]
        if (!repoUrl) {
          return console.log(chalk.red(`${method} schema not found for ${appName}`))
        }
        console.log(chalk.green(`cloning ${appName} from ${repoUrl}`))
        simpleGit.outputHandler(function (_, stdout, stderr) {
          stdout.pipe(process.stdout);
          stderr.pipe(process.stderr);
        })
        .clone(repoList[appName][method])
        .then(() => console.log(chalk.green(`successfully cloned ${appName} from ${repoUrl}`)))
        .catch((error) => console.log(chalk.red(error)))
      } else {
        console.log(`project ${chalk.red(appName)} doesn't found`)
      }
    }
  }
]

const getCommand = commandName => commands.find(command => command.name == commandName)

const argsPassed = parseArgs(process.argv.slice(2))
const commandToExecute = argsPassed['_'][0]

const commandInstance = getCommand(commandToExecute)

if (commandInstance) {
  commandInstance.methodToCall(argsPassed)
} else {
  console.log(`command ${chalk.red(commandToExecute)} doesn't found`)
}