import { Command } from "./types"
import simpleGit from "simple-git/promise";
import chalk from "chalk";
import repoList from "../repo.json";

const git = simpleGit(__dirname);

const cloneCommand: Command = {
  name: "clone",
  methodToCall: (args) => {
    const appName = args['_'][1]
    const method = args['p'] || "ssh"
    if (repoList[appName]) {
      const repoUrl = repoList[appName][method]
      if (!repoUrl) {
        return console.log(chalk.red(`${method} schema not found for ${appName}`))
      }
      console.log(chalk.green(`cloning ${appName} from ${repoUrl}`))
      git.outputHandler((_, stdout, stderr) => {
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

export default cloneCommand;